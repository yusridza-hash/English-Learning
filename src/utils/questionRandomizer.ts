import { ModuleQuestion } from "../data/generatedModules";
import { QUESTION_BANK } from "../data/questionBank";

const DECK_HISTORY_KEY = "el_seen_question_deck_v1";
const memoryDeckHistory: Record<string, string[]> = {};

export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function readDeckMap(): Record<string, string[]> {
  if (typeof window === "undefined") return memoryDeckHistory;
  try {
    const raw = window.sessionStorage.getItem(DECK_HISTORY_KEY);
    if (!raw) return memoryDeckHistory;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : memoryDeckHistory;
  } catch {
    return memoryDeckHistory;
  }
}

function writeDeckMap(map: Record<string, string[]>) {
  Object.assign(memoryDeckHistory, map);
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(DECK_HISTORY_KEY, JSON.stringify(map));
  } catch {
    // Fallback gracefully to in-memory map if sessionStorage is restricted
  }
}

export function getQuestionSignature(q: ModuleQuestion): string {
  return `${q.type || "choice"}::${q.prompt.trim().toLowerCase()}::${q.draft || ""}`;
}

/**
 * Picks `count` items prioritizing unseen items first so repeated randomizations
 * rotate evenly through the full question bank before repeating earlier items.
 */
export function pickNonRepeatingQuestions<T>(
  poolKey: string,
  items: T[],
  getSignature: (item: T) => string,
  count: number
): T[] {
  if (items.length === 0 || count <= 0) return [];
  const targetCount = Math.min(count, items.length);

  // Deduplicate incoming pool while preserving shuffled order
  const uniqueMap = new Map<string, T>();
  shuffleArray(items).forEach((item) => {
    const sig = getSignature(item);
    if (!uniqueMap.has(sig)) {
      uniqueMap.set(sig, item);
    }
  });
  const uniqueItems = [...uniqueMap.values()];

  const deckMap = readDeckMap();
  const seenList = Array.isArray(deckMap[poolKey]) ? deckMap[poolKey] : [];
  const seenSet = new Set<string>(seenList);

  const unseen = uniqueItems.filter((item) => !seenSet.has(getSignature(item)));
  const seen = uniqueItems.filter((item) => seenSet.has(getSignature(item)));

  let picked: T[];
  let nextSeenList: string[];

  if (unseen.length >= targetCount) {
    picked = shuffleArray(unseen).slice(0, targetCount);
    nextSeenList = [...seenList, ...picked.map(getSignature)];
  } else {
    const pickedUnseen = shuffleArray(unseen);
    const neededFromSeen = targetCount - pickedUnseen.length;
    // Avoid picking the very most recently seen batch first if enough older ones exist
    const lastBatchCount = Math.min(targetCount, seenList.length);
    const mostRecentSet = new Set(seenList.slice(-lastBatchCount));
    const olderSeen = seen.filter((item) => !mostRecentSet.has(getSignature(item)));
    const latestSeen = seen.filter((item) => mostRecentSet.has(getSignature(item)));
    const recycled = [...shuffleArray(olderSeen), ...shuffleArray(latestSeen)].slice(
      0,
      neededFromSeen
    );
    picked = [...pickedUnseen, ...recycled];
    // Reset cycle cleanly to just this fresh batch
    nextSeenList = picked.map(getSignature);
  }

  deckMap[poolKey] = nextSeenList.slice(-500);
  writeDeckMap(deckMap);
  return picked;
}

/**
 * Shuffles the option order of a single question while keeping the correct answer index
 * (or build token sequence) and wrongFeedback mapping 100% accurate.
 */
export function shuffleQuestionOptions(q: ModuleQuestion): ModuleQuestion {
  const numOptions = q.options.length;
  if (numOptions <= 1) return { ...q };

  // Build index permutation [0, 1, ..., numOptions - 1]
  let perm = shuffleArray(Array.from({ length: numOptions }, (_, idx) => idx));

  if (q.type === "build" && Array.isArray(q.answer)) {
    // Ensure the shuffled word bank is not already in the exact target order
    const targetWords = q.answer.map((origIdx) => q.options[origIdx]);
    let tries = 0;
    while (
      tries < 5 &&
      perm.every((origIdx, newPos) => q.options[origIdx] === targetWords[newPos])
    ) {
      perm = shuffleArray(perm);
      tries++;
    }

    const newOptions = perm.map((origIdx) => q.options[origIdx]);
    // Map each original token index in q.answer to its new index in newOptions
    const origToNew = new Map<number, number>();
    perm.forEach((origIdx, newIdx) => {
      origToNew.set(origIdx, newIdx);
    });
    const newAnswer = q.answer.map((origIdx) => origToNew.get(origIdx) ?? 0);

    return {
      ...q,
      options: newOptions,
      answer: newAnswer,
    };
  }

  if (typeof q.answer === "number") {
    const newOptions = perm.map((origIdx) => q.options[origIdx]);
    const newAnswer = perm.indexOf(q.answer);

    let newWrongFeedback: Record<number, string | string[]> | undefined;
    if (q.wrongFeedback) {
      newWrongFeedback = {};
      Object.entries(q.wrongFeedback).forEach(([origKey, val]) => {
        const origIdx = Number(origKey);
        const mappedIdx = perm.indexOf(origIdx);
        if (mappedIdx !== -1) {
          newWrongFeedback![mappedIdx] = val;
        }
      });
    }

    return {
      ...q,
      options: newOptions,
      answer: newAnswer,
      wrongFeedback: newWrongFeedback,
    };
  }

  return { ...q };
}

/**
 * Pulls questions for a specific module + level from QUESTION_BANK and baseQuestions,
 * deduplicates by prompt+type, prioritizes unseen questions first so repeated "Acak Soal"
 * pulls new questions before cycling, and shuffles options.
 */
export function getRandomizedLevelQuestions(
  moduleKey: string,
  levelKey: "simple" | "intermediate" | "complex",
  baseQuestions: ModuleQuestion[] = [],
  count = 10
): ModuleQuestion[] {
  const bankQuestions = QUESTION_BANK[moduleKey]?.levels?.[levelKey] || [];
  const combinedPool: ModuleQuestion[] = [];
  const seenKeys = new Set<string>();

  const addUnique = (q: ModuleQuestion) => {
    const sig = getQuestionSignature(q);
    if (!seenKeys.has(sig)) {
      seenKeys.add(sig);
      combinedPool.push(q);
    }
  };

  bankQuestions.forEach(addUnique);
  baseQuestions.forEach(addUnique);

  const picked = pickNonRepeatingQuestions(
    `module::${moduleKey}::${levelKey}`,
    combinedPool,
    getQuestionSignature,
    count
  );
  return picked.map((q) => shuffleQuestionOptions(q));
}
