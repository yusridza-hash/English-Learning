import { BUILT } from "../data/curriculum";

export function getScores(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem("el_quiz") || "{}");
  } catch {
    return {};
  }
}

export function saveScore(moduleKey: string, score: number): void {
  const scores = getScores();
  scores[moduleKey] = score;
  localStorage.setItem("el_quiz", JSON.stringify(scores));
}

export function getChecks(): Record<string, boolean[]> {
  try {
    return JSON.parse(localStorage.getItem("el_check") || "{}");
  } catch {
    return {};
  }
}

export function saveChecks(moduleKey: string, checkedArray: boolean[]): void {
  const checks = getChecks();
  checks[moduleKey] = checkedArray;
  localStorage.setItem("el_check", JSON.stringify(checks));
}

export function resetAllProgress(): void {
  localStorage.removeItem("el_quiz");
  localStorage.removeItem("el_check");
}

export type ModuleStatus = "unbuilt" | "lulus" | "proses" | "belum";

export function statusOf(
  key: string,
  scores: Record<string, number> = getScores(),
  checks: Record<string, boolean[]> = getChecks()
): ModuleStatus {
  if (!BUILT.has(key)) return "unbuilt";
  const score = scores[key] || 0;
  const modChecks = checks[key] || [];
  const checked = modChecks.filter(Boolean).length;
  if (score >= 80 && checked >= 3) return "lulus";
  if (score > 0 || checked > 0) return "proses";
  return "belum";
}

export interface VocabEntry {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  moduleKey: string;
  createdAt: string;
}

export interface ErrorJournalEntry {
  id: string;
  moduleKey: string;
  wrongSentence: string;
  correctSentence: string;
  ruleNote: string;
  createdAt: string;
}

export function getVocabLog(): VocabEntry[] {
  try {
    return JSON.parse(localStorage.getItem("el_vocab") || "[]");
  } catch {
    return [];
  }
}

export function saveVocabLog(entries: VocabEntry[]): void {
  localStorage.setItem("el_vocab", JSON.stringify(entries));
}

export function getErrorJournal(): ErrorJournalEntry[] {
  try {
    return JSON.parse(localStorage.getItem("el_errors") || "[]");
  } catch {
    return [];
  }
}

export function saveErrorJournal(entries: ErrorJournalEntry[]): void {
  localStorage.setItem("el_errors", JSON.stringify(entries));
}
