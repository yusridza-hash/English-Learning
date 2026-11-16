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

export function addErrorJournalEntry(entry: {
  moduleKey: string;
  wrongSentence: string;
  correctSentence: string;
  ruleNote: string;
}): boolean {
  const current = getErrorJournal();
  const exists = current.some(
    (item) =>
      item.moduleKey === entry.moduleKey &&
      item.correctSentence.trim().toLowerCase() === entry.correctSentence.trim().toLowerCase() &&
      item.wrongSentence.trim().toLowerCase() === entry.wrongSentence.trim().toLowerCase()
  );
  if (exists) return false;

  const newEntry: ErrorJournalEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    moduleKey: entry.moduleKey,
    wrongSentence: entry.wrongSentence.trim(),
    correctSentence: entry.correctSentence.trim(),
    ruleNote: entry.ruleNote.trim(),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  saveErrorJournal([newEntry, ...current]);
  return true;
}

export interface BackupPayload {
  version: number;
  exportedAt: string;
  el_quiz: Record<string, number>;
  el_check: Record<string, boolean[]>;
  el_vocab: VocabEntry[];
  el_errors: ErrorJournalEntry[];
  el_theme?: string;
}

export function exportAllData(): string {
  const payload: BackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    el_quiz: getScores(),
    el_check: getChecks(),
    el_vocab: getVocabLog(),
    el_errors: getErrorJournal(),
    el_theme: localStorage.getItem("el_theme") || "light",
  };
  return JSON.stringify(payload, null, 2);
}

export function importAllData(jsonText: string): { ok: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonText) as Partial<BackupPayload>;
    if (!parsed || typeof parsed !== "object") {
      return { ok: false, message: "Format file JSON tidak valid." };
    }
    if (parsed.el_quiz && typeof parsed.el_quiz === "object") {
      localStorage.setItem("el_quiz", JSON.stringify(parsed.el_quiz));
    }
    if (parsed.el_check && typeof parsed.el_check === "object") {
      localStorage.setItem("el_check", JSON.stringify(parsed.el_check));
    }
    if (Array.isArray(parsed.el_vocab)) {
      localStorage.setItem("el_vocab", JSON.stringify(parsed.el_vocab));
    }
    if (Array.isArray(parsed.el_errors)) {
      localStorage.setItem("el_errors", JSON.stringify(parsed.el_errors));
    }
    const quizCount = parsed.el_quiz ? Object.keys(parsed.el_quiz).length : 0;
    const vocabCount = Array.isArray(parsed.el_vocab) ? parsed.el_vocab.length : 0;
    const errCount = Array.isArray(parsed.el_errors) ? parsed.el_errors.length : 0;
    return {
      ok: true,
      message: `Data berhasil dipulihkan (${quizCount} skor modul, ${vocabCount} kosakata, ${errCount} catatan Error Journal).`,
    };
  } catch {
    return { ok: false, message: "Gagal membaca file JSON. Pastikan file backup valid." };
  }
}

