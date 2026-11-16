import { ModuleQuestion } from "../data/generatedModules";
import { QUESTION_BANK } from "../data/questionBank";

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
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
 * deduplicates by prompt+type, randomly selects `count` questions, and shuffles options.
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
    const sig = `${q.type || "choice"}::${q.prompt.trim().toLowerCase()}::${q.draft || ""}`;
    if (!seenKeys.has(sig)) {
      seenKeys.add(sig);
      combinedPool.push(q);
    }
  };

  bankQuestions.forEach(addUnique);
  baseQuestions.forEach(addUnique);

  // If pool has fewer than `count`, include remaining items from baseQuestions
  const poolToUse =
    combinedPool.length >= count
      ? combinedPool
      : [...combinedPool, ...baseQuestions.slice(0, count - combinedPool.length)];

  const shuffledQuestions = shuffleArray(poolToUse).slice(0, count);
  return shuffledQuestions.map((q) => shuffleQuestionOptions(q));
}
