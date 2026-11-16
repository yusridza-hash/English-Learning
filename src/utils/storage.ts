import { BUILT, CURRICULUM } from "../data/curriculum";

export type SubLevelKey = "simple" | "intermediate" | "complex";
export type ActivityType = "material" | "quiz";

export interface ModuleHistoryEntry {
  moduleKey: string;
  moduleTitle: string;
  levelTitle: string;
  activityType: ActivityType;
  subLevel: SubLevelKey;
  anchorId: string;
  latestScore?: number;
  openedAt: string;
}

const STORAGE_SYNC_EVENT = "el_storage_sync";

export function emitStorageSync(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_SYNC_EVENT));
  }
}

export function getModuleMeta(moduleKey: string): {
  moduleTitle: string;
  levelTitle: string;
  ieltsBand: string;
} {
  for (const level of CURRICULUM) {
    const found = level.modules.find(([mod]) => `${level.id}/${mod}` === moduleKey);
    if (found) {
      return {
        moduleTitle: found[1],
        levelTitle: level.title,
        ieltsBand: level.ieltsBand,
      };
    }
  }
  return {
    moduleTitle: moduleKey,
    levelTitle: "Kurikulum",
    ieltsBand: "",
  };
}

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

  // Sync latestScore in el_history if module exists in history
  const history = getModuleHistory();
  const idx = history.findIndex((item) => item.moduleKey === moduleKey);
  if (idx >= 0) {
    history[idx] = {
      ...history[idx],
      latestScore: score,
      openedAt: new Date().toISOString(),
    };
    const [updated] = history.splice(idx, 1);
    localStorage.setItem("el_history", JSON.stringify([updated, ...history].slice(0, 20)));
  }

  emitStorageSync();
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
  emitStorageSync();
}

export function getFavorites(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem("el_favorites") || "[]");
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function isFavorite(moduleKey: string): boolean {
  return getFavorites().includes(moduleKey);
}

export function toggleFavorite(moduleKey: string): boolean {
  const current = getFavorites();
  const exists = current.includes(moduleKey);
  const next = exists ? current.filter((k) => k !== moduleKey) : [moduleKey, ...current];
  localStorage.setItem("el_favorites", JSON.stringify(next));
  emitStorageSync();
  return !exists;
}

export function getModuleHistory(): ModuleHistoryEntry[] {
  try {
    const parsed = JSON.parse(localStorage.getItem("el_history") || "[]");
    return Array.isArray(parsed) ? (parsed as ModuleHistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function recordModuleHistory(params: {
  moduleKey: string;
  moduleTitle?: string;
  levelTitle?: string;
  activityType: ActivityType;
  subLevel: SubLevelKey;
  anchorId: string;
  latestScore?: number;
}): void {
  const meta = getModuleMeta(params.moduleKey);
  const scores = getScores();
  const resolvedScore =
    params.latestScore !== undefined ? params.latestScore : scores[params.moduleKey];

  const entry: ModuleHistoryEntry = {
    moduleKey: params.moduleKey,
    moduleTitle: params.moduleTitle || meta.moduleTitle,
    levelTitle: params.levelTitle || meta.levelTitle,
    activityType: params.activityType,
    subLevel: params.subLevel,
    anchorId: params.anchorId,
    latestScore: resolvedScore,
    openedAt: new Date().toISOString(),
  };

  const current = getModuleHistory().filter((item) => item.moduleKey !== params.moduleKey);
  const next = [entry, ...current].slice(0, 20);
  localStorage.setItem("el_history", JSON.stringify(next));
  emitStorageSync();
}

export function formatRelativeTime(isoString: string): string {
  const timestamp = Date.parse(isoString);
  if (Number.isNaN(timestamp)) return "";
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSec < 60) return "Baru saja";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} mnt lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function subLevelFromAnchor(anchorId: string): SubLevelKey {
  const clean = anchorId.replace(/^#/, "").toLowerCase();
  if (
    clean.includes("complex") ||
    clean.includes("routine-vs-now") ||
    clean.includes("schedules-stative")
  ) {
    return "complex";
  }
  if (
    clean.includes("intermediate") ||
    clean.includes("do-does") ||
    clean.includes("frequency")
  ) {
    return "intermediate";
  }
  return "simple";
}

export function parseModuleResumeHash(rawHash: string): {
  activityType: ActivityType;
  subLevel: SubLevelKey;
  levelIndex: 0 | 1 | 2;
  anchorId: string;
  openQuizModal: boolean;
} {
  const clean = rawHash.replace(/^#/, "").toLowerCase();
  const isResumeQuiz = clean.startsWith("resume-quiz-");
  const isLatihan = clean.startsWith("latihan-");
  const subLevel = subLevelFromAnchor(clean);
  const levelIndex: 0 | 1 | 2 =
    subLevel === "complex" ? 2 : subLevel === "intermediate" ? 1 : 0;

  if (isResumeQuiz || isLatihan) {
    return {
      activityType: "quiz",
      subLevel,
      levelIndex,
      anchorId: `latihan-${subLevel}`,
      openQuizModal: isResumeQuiz,
    };
  }

  return {
    activityType: "material",
    subLevel,
    levelIndex,
    anchorId: clean.startsWith("materi-") ? clean : `materi-${subLevel}`,
    openQuizModal: false,
  };
}

export function resetAllProgress(): void {
  localStorage.removeItem("el_quiz");
  localStorage.removeItem("el_check");
  localStorage.removeItem("el_favorites");
  localStorage.removeItem("el_history");
  emitStorageSync();
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
  emitStorageSync();
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
  emitStorageSync();
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
  el_favorites?: string[];
  el_history?: ModuleHistoryEntry[];
  el_theme?: string;
}

export function exportAllData(): string {
  const payload: BackupPayload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    el_quiz: getScores(),
    el_check: getChecks(),
    el_vocab: getVocabLog(),
    el_errors: getErrorJournal(),
    el_favorites: getFavorites(),
    el_history: getModuleHistory(),
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
    if (Array.isArray(parsed.el_favorites)) {
      localStorage.setItem("el_favorites", JSON.stringify(parsed.el_favorites));
    }
    if (Array.isArray(parsed.el_history)) {
      localStorage.setItem("el_history", JSON.stringify(parsed.el_history));
    }
    emitStorageSync();
    const quizCount = parsed.el_quiz ? Object.keys(parsed.el_quiz).length : 0;
    const vocabCount = Array.isArray(parsed.el_vocab) ? parsed.el_vocab.length : 0;
    const errCount = Array.isArray(parsed.el_errors) ? parsed.el_errors.length : 0;
    const favCount = Array.isArray(parsed.el_favorites) ? parsed.el_favorites.length : 0;
    return {
      ok: true,
      message: `Data berhasil dipulihkan (${quizCount} skor modul, ${vocabCount} kosakata, ${errCount} catatan Error Journal, ${favCount} favorit).`,
    };
  } catch {
    return { ok: false, message: "Gagal membaca file JSON. Pastikan file backup valid." };
  }
}
