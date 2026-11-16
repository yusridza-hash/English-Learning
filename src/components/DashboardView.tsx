import React, { useEffect, useState } from "react";
import { BUILT, CURRICULUM, TOTAL_MODULES } from "../data/curriculum";
import { ModuleQuestion } from "../data/generatedModules";
import { QUESTION_BANK } from "../data/questionBank";
import {
  getSpeechRate,
  getSpeechVoiceInfo,
  setSpeechRateMode,
  speakEnglish,
} from "../utils/speech";
import {
  exportAllData,
  formatRelativeTime,
  getChecks,
  getErrorJournal,
  getFavorites,
  getModuleHistory,
  getModuleMeta,
  getScores,
  getVocabLog,
  importAllData,
  ModuleHistoryEntry,
  SubLevelKey,
} from "../utils/storage";
import { GuidedQuestionItem, QuestionProgressState } from "./GuidedQuestionItem";
import { OfflineIndicator, PWAInstallButton } from "./PWAControls";
import {
  FavoriteModuleButton,
  openModuleSidebar,
  SidebarToggleButton,
} from "./SidebarControls";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardViewProps {
  onNavigate: (path: string) => void;
}

interface DailyReviewItem {
  id: string;
  moduleKey: string;
  moduleTitle: string;
  levelKey: SubLevelKey;
  question: ModuleQuestion;
}

const SUBLEVEL_LABELS: Record<SubLevelKey, string> = {
  simple: "Simple",
  intermediate: "Intermediate",
  complex: "Complex",
};

function buildResumePath(entry: ModuleHistoryEntry): string {
  const hash =
    entry.activityType === "quiz"
      ? `resume-quiz-${entry.subLevel}`
      : entry.anchorId || `materi-${entry.subLevel}`;
  return `${entry.moduleKey}.html#${hash}`;
}

function generateDailyReviewSet(
  scores: Record<string, number>,
  errorModules: string[],
  count = 10
): DailyReviewItem[] {
  const allCandidates: DailyReviewItem[] = [];
  const priorityCandidates: DailyReviewItem[] = [];
  const errorModuleSet = new Set(errorModules);

  Object.entries(QUESTION_BANK).forEach(([moduleKey, modData]) => {
    const isPriority =
      errorModuleSet.has(moduleKey) ||
      (scores[moduleKey] != null && scores[moduleKey] < 80) ||
      scores[moduleKey] != null;

    (["simple", "intermediate", "complex"] as const).forEach((lvl) => {
      const qs = modData.levels[lvl] || [];
      qs.forEach((q, qIdx) => {
        const item: DailyReviewItem = {
          id: `${moduleKey}-${lvl}-${qIdx}-${Math.random().toString(36).slice(2, 6)}`,
          moduleKey,
          moduleTitle: modData.title,
          levelKey: lvl,
          question: q,
        };
        if (isPriority) {
          priorityCandidates.push(item);
        } else {
          allCandidates.push(item);
        }
      });
    });
  });

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const pickedPriority = shuffle(priorityCandidates).slice(0, Math.min(6, count));
  const remainingNeeded = count - pickedPriority.length;
  const pickedGeneral = shuffle(allCandidates).slice(0, remainingNeeded);
  return shuffle([...pickedPriority, ...pickedGeneral]);
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [scores, setScores] = useState<Record<string, number>>(() => getScores());
  const [checks, setChecks] = useState<Record<string, boolean[]>>(() => getChecks());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [history, setHistory] = useState<ModuleHistoryEntry[]>(() => getModuleHistory());
  const [vocabCount, setVocabCount] = useState<number>(() => getVocabLog().length);
  const [errorCount, setErrorCount] = useState<number>(() => getErrorJournal().length);
  const [backupNotice, setBackupNotice] = useState<string>("");

  // Daily Spaced Repetition state
  const [dailyActive, setDailyActive] = useState(false);
  const [dailyItems, setDailyItems] = useState<DailyReviewItem[]>([]);
  const [dailyStates, setDailyStates] = useState<QuestionProgressState[]>([]);

  // Speech settings state
  const [speechRateMode, setSpeechRateModeState] = useState<"normal" | "slow">(() =>
    getSpeechRate() < 1 ? "slow" : "normal"
  );
  const [voiceInfo, setVoiceInfo] = useState(() => getSpeechVoiceInfo());

  const refreshData = () => {
    setScores(getScores());
    setChecks(getChecks());
    setFavorites(getFavorites());
    setHistory(getModuleHistory());
    setVocabCount(getVocabLog().length);
    setErrorCount(getErrorJournal().length);
    setVoiceInfo(getSpeechVoiceInfo());
  };

  useEffect(() => {
    document.body.removeAttribute("data-module");
    document.title = "English Learning — Dashboard";
    refreshData();

    const handleFocus = () => refreshData();
    const handleVisibility = () => {
      if (!document.hidden) refreshData();
    };
    window.addEventListener("el_storage_sync", refreshData);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handleFocus);
    window.addEventListener("visibilitychange", handleVisibility);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoiceInfo(getSpeechVoiceInfo());
      };
    }
    return () => {
      window.removeEventListener("el_storage_sync", refreshData);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handleFocus);
      window.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  let done = 0;
  let sumScore = 0;
  let countScore = 0;

  CURRICULUM.forEach((level) =>
    level.modules.forEach(([mod]) => {
      const key = `${level.id}/${mod}`;
      const sc = scores[key] || 0;
      const chk = (checks[key] || []).filter(Boolean).length;
      if (sc >= 80 && chk >= 3) done++;
      if (sc > 0) {
        sumScore += sc;
        countScore++;
      }
    })
  );

  const pct = Math.round((done / TOTAL_MODULES) * 100);
  const avgText = countScore ? `${Math.round(sumScore / countScore)}%` : "—";
  const quizEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const latestEntry = history[0] || null;
  const recentFive = history.slice(0, 5);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleStartDailyReview = () => {
    const currentErrors = getErrorJournal().map((e) => e.moduleKey);
    const generated = generateDailyReviewSet(scores, currentErrors, 10);
    setDailyItems(generated);
    setDailyStates(
      generated.map(() => ({
        attempts: 0,
        points: 0,
        correct: false,
        completed: false,
      }))
    );
    setDailyActive(true);
  };

  const handleUpdateDailyQuestion = (idx: number, nextState: QuestionProgressState) => {
    setDailyStates((prev) => prev.map((s, i) => (i === idx ? nextState : s)));
    setErrorCount(getErrorJournal().length);
  };

  const dailyCompleted = dailyStates.filter((s) => s.completed).length;
  const dailyCorrect = dailyStates.filter((s) => s.correct).length;
  const dailyPoints = dailyStates.reduce((acc, s) => acc + s.points, 0);
  const dailyDone = dailyItems.length > 0 && dailyCompleted === dailyItems.length;
  const dailyPct = dailyDone ? Math.round((dailyPoints / (dailyItems.length * 3)) * 100) : 0;

  const handleSpeedToggle = (mode: "normal" | "slow") => {
    setSpeechRateMode(mode);
    setSpeechRateModeState(mode);
  };

  const handleExportData = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `english-learning-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setBackupNotice("Cadangan JSON berhasil diunduh.");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importAllData(content);
      setBackupNotice(res.message);
      if (res.ok) {
        refreshData();
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <>
      <OfflineIndicator />
      <nav>
        <SidebarToggleButton />
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          ENGLISH · LEARNING
        </a>
        <a href="question-bank.html" onClick={(e) => handleLinkClick(e, "question-bank.html")}>
          Question Bank
        </a>
        <a href="word-choice-bank.html" onClick={(e) => handleLinkClick(e, "word-choice-bank.html")}>
          Word Bank
        </a>
        <a href="logs/vocab-log.html" onClick={(e) => handleLinkClick(e, "logs/vocab-log.html")}>
          Vocab Log ({vocabCount})
        </a>
        <a href="logs/error-journal.html" onClick={(e) => handleLinkClick(e, "logs/error-journal.html")}>
          Error Journal ({errorCount})
        </a>
        <PWAInstallButton />
        <ThemeToggle />
      </nav>

      <h1>Kurikulum</h1>
      <p className="level">
        Basic → Complex · 5 Level · 58 Modul · IELTS 3.5–8.5+ ·{" "}
        <span id="builtCounter">{BUILT.size}</span>/58 siap
      </p>

      <section id="progress-tracker">
        <div className="tracker-section-head">
          <h2>Progress Tracker &amp; Riwayat</h2>
          <button
            type="button"
            className="filter-pill"
            onClick={() => openModuleSidebar("all")}
          >
            ☰ Jelajahi 58 Modul →
          </button>
        </div>

        {latestEntry ? (
          <div className="tracker-resume-card">
            <div className="tracker-resume-top">
              <div>
                <p className="tracker-kicker">
                  Lanjutkan Terakhir · {formatRelativeTime(latestEntry.openedAt)}
                </p>
                <p className="tracker-level-text">{latestEntry.levelTitle}</p>
                <h3 className="tracker-resume-title">{latestEntry.moduleTitle}</h3>
              </div>
              <FavoriteModuleButton moduleKey={latestEntry.moduleKey} />
            </div>

            <p className="tracker-meta-line">
              <span>
                Titik Terakhir:{" "}
                <b>
                  {latestEntry.activityType === "quiz" ? "Kuis" : "Materi"}{" "}
                  {SUBLEVEL_LABELS[latestEntry.subLevel]}
                </b>
              </span>
              <span>
                Skor Terbaru:{" "}
                <b>
                  {scores[latestEntry.moduleKey] != null
                    ? `${scores[latestEntry.moduleKey]}%`
                    : latestEntry.latestScore != null
                    ? `${latestEntry.latestScore}%`
                    : "Belum ada skor"}
                </b>
              </span>
              <span>
                Checklist:{" "}
                <b>{(checks[latestEntry.moduleKey] || []).filter(Boolean).length}/3</b>
              </span>
            </p>

            <div className="toolbar-actions" style={{ marginTop: "0.75rem" }}>
              <button
                type="button"
                className="check-quiz"
                style={{ marginTop: 0 }}
                onClick={() => onNavigate(buildResumePath(latestEntry))}
              >
                Lanjutkan Belajar →
              </button>
              <button
                type="button"
                className="guided-reset"
                onClick={() => openModuleSidebar("all")}
              >
                Pilih Modul Lain
              </button>
            </div>
          </div>
        ) : (
          <div className="tracker-resume-card tracker-empty-card">
            <p className="tracker-kicker">Belum Ada Riwayat Belajar</p>
            <h3 className="tracker-resume-title">Mulai Sesi Pertamamu</h3>
            <p className="tracker-meta-line">
              Buka salah satu modul lewat tombol <b>☰ Modul</b> di pojok kiri atas untuk mencatat
              posisi materi, kuis, dan skor terbaru secara otomatis.
            </p>
            <div className="toolbar-actions" style={{ marginTop: "0.75rem" }}>
              <button
                type="button"
                className="check-quiz"
                style={{ marginTop: 0 }}
                onClick={() => onNavigate("00-foundation/01-parts-of-speech.html")}
              >
                Mulai Level 0: Parts of Speech →
              </button>
              <button
                type="button"
                className="guided-reset"
                onClick={() => openModuleSidebar("all")}
              >
                ☰ Buka Daftar 58 Modul
              </button>
            </div>
          </div>
        )}

        <div className="tracker-recent-wrap">
          <div className="tracker-subhead">
            <h3>Riwayat 5 Modul Terakhir</h3>
            <span className="tracker-submeta">
              {recentFive.length > 0 ? `${recentFive.length} terakhir` : "Kosong"}
            </span>
          </div>

          {recentFive.length === 0 ? (
            <p className="empty">Belum ada aktivitas modul yang terekam.</p>
          ) : (
            <ul className="tracker-recent-list">
              {recentFive.map((item) => {
                const liveScore =
                  scores[item.moduleKey] != null ? scores[item.moduleKey] : item.latestScore;
                const activityLabel = `${
                  item.activityType === "quiz" ? "Kuis" : "Materi"
                } ${SUBLEVEL_LABELS[item.subLevel]}`;

                return (
                  <li key={`${item.moduleKey}-${item.openedAt}`} className="tracker-recent-row">
                    <button
                      type="button"
                      className="tracker-recent-link"
                      onClick={() => onNavigate(buildResumePath(item))}
                    >
                      <span className="tracker-recent-title">{item.moduleTitle}</span>
                      <span className="tracker-recent-details">
                        {item.levelTitle} · {activityLabel} ·{" "}
                        {liveScore != null ? `Skor ${liveScore}%` : "Belum ada skor"} ·{" "}
                        {formatRelativeTime(item.openedAt)}
                      </span>
                    </button>
                    <FavoriteModuleButton moduleKey={item.moduleKey} compact />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="tracker-favorites-wrap">
          <div className="tracker-subhead">
            <h3>★ Modul Favorit ({favorites.length})</h3>
            <button
              type="button"
              className="tracker-text-action"
              onClick={() => openModuleSidebar("favorites")}
            >
              Kelola di Sidebar →
            </button>
          </div>
          {favorites.length === 0 ? (
            <p className="empty" style={{ padding: "0.35rem 0" }}>
              Belum ada modul favorit. Tandai <b>☆</b> di daftar modul atau di halaman materi agar
              terpin di sini dan di puncak sidebar.
            </p>
          ) : (
            <div className="tracker-favorites-grid">
              {favorites.slice(0, 6).map((favKey) => {
                const meta = getModuleMeta(favKey);
                const sc = scores[favKey];
                return (
                  <div key={favKey} className="tracker-fav-item">
                    <button
                      type="button"
                      className="tracker-fav-open"
                      onClick={() => onNavigate(`${favKey}.html`)}
                    >
                      <span className="tracker-fav-title">{meta.moduleTitle}</span>
                      <span className="tracker-fav-meta">
                        {meta.levelTitle}
                        {sc != null ? ` · ${sc}%` : ""}
                      </span>
                    </button>
                    <FavoriteModuleButton moduleKey={favKey} compact />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="overview">
        <h2>Progress Keseluruhan</h2>
        <div className="progress-bar">
          <span id="overallBar" style={{ width: `${pct}%` }}></span>
        </div>
        <div className="stat-row">
          <div>
            <span className="stat-label">Modul Lulus</span>
            <span id="statDone">
              {done} / {TOTAL_MODULES} ({pct}%)
            </span>
          </div>
          <div>
            <span className="stat-label">File Dibangun</span>
            <span id="statBuilt">
              {BUILT.size} / {TOTAL_MODULES}
            </span>
          </div>
          <div>
            <span className="stat-label">Skor Rata-rata</span>
            <span id="statAvg">{avgText}</span>
          </div>
        </div>
        <p style={{ fontSize: ".85rem", color: "var(--muted)", fontFamily: "var(--mono,monospace)", marginBottom: "0.75rem" }}>
          <b>LULUS</b> = quiz ≥ 80% + 3 checklist · <b>PROSES</b> = ada data · <b>BELUM</b> = belum
          dikerjakan
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px dashed var(--line, #e0e0e0)" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Cadangan Belajar:
          </span>
          <button
            type="button"
            className="filter-pill"
            style={{ fontSize: "0.8rem", padding: "0.25rem 0.65rem" }}
            onClick={handleExportData}
            title="Unduh seluruh riwayat skor, checklist, favorit, tracker, kosakata, dan error journal ke berkas JSON"
          >
            ⤓ Unduh Cadangan (Backup JSON)
          </button>
          <label
            className="filter-pill"
            style={{ fontSize: "0.8rem", padding: "0.25rem 0.65rem", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
            title="Pulihkan progres belajar dari berkas JSON yang pernah diunduh"
          >
            ⤒ Pulihkan Data
            <input
              type="file"
              accept=".json,application/json"
              style={{ display: "none" }}
              onChange={handleImportFile}
            />
          </label>
        </div>
        {backupNotice && (
          <p className="hint" style={{ marginTop: "0.5rem" }} aria-live="polite">
            {backupNotice}
          </p>
        )}
      </section>

      <section id="daily-review">
        <h2>Latihan Harian · Spaced Repetition</h2>
        <p style={{ fontSize: ".95rem", color: "var(--muted)" }}>
          Uji ingatanmu dengan 10 soal campuran lintas modul. Sistem memprioritaskan modul yang
          pernah dicatat di <b>Error Journal</b> atau yang skornya belum mencapai 80%.
        </p>
        <div className="toolbar-actions" style={{ marginBottom: dailyActive ? "1.25rem" : 0 }}>
          <button
            type="button"
            className="check-quiz"
            style={{ marginTop: 0 }}
            onClick={handleStartDailyReview}
          >
            {dailyActive ? "↻ Acak 10 Soal Baru" : "▸ Mulai Latihan Harian (10 Soal)"}
          </button>
          {dailyActive && (
            <button
              type="button"
              className="guided-reset"
              onClick={() => setDailyActive(false)}
            >
              Tutup Latihan Harian
            </button>
          )}
        </div>

        {dailyActive && (
          <div className="daily-review-box guided-learning">
            <p className="guided-quiz-progress" aria-live="polite">
              Progress Latihan Harian: {dailyCompleted} / {dailyItems.length} soal diperiksa ·{" "}
              {dailyCorrect} benar
            </p>
            <div className="guided-level-questions">
              {dailyItems.map((item, idx) => (
                <div key={item.id} className="daily-question-wrap">
                  <div className="daily-question-meta">
                    <span>
                      Modul:{" "}
                      <a
                        href={`${item.moduleKey}.html`}
                        onClick={(e) => handleLinkClick(e, `${item.moduleKey}.html`)}
                      >
                        {item.moduleKey} — {item.moduleTitle}
                      </a>
                    </span>
                    <span>Level: {item.levelKey.toUpperCase()}</span>
                  </div>
                  <GuidedQuestionItem
                    question={item.question}
                    questionIndex={idx}
                    state={dailyStates[idx]}
                    onUpdateState={(nextState) => handleUpdateDailyQuestion(idx, nextState)}
                    moduleKey={item.moduleKey}
                  />
                </div>
              ))}
            </div>
            {dailyDone && (
              <p
                className="guided-overall"
                data-state={dailyPct >= 80 ? "pass" : "retry"}
                aria-live="polite"
              >
                Skor Latihan Harian: {dailyPct}% ({dailyPoints}/{dailyItems.length * 3} poin ·{" "}
                {dailyCorrect}/{dailyItems.length} benar).{" "}
                {dailyPct >= 80
                  ? "Bagus! Pemahaman lintas modulmu sangat solid."
                  : "Beberapa konsep masih perlu diulang. Cek Error Journal untuk daftar perbaikan."}
              </p>
            )}
          </div>
        )}
      </section>

      <section id="quiz-log">
        <h2>Riwayat Skor Kuis</h2>
        {quizEntries.length === 0 ? (
          <p id="quizEmpty" className="empty">
            Belum ada quiz yang dikerjakan.
          </p>
        ) : (
          <table id="quizTable">
            <thead>
              <tr>
                <th>Modul</th>
                <th>Skor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quizEntries.map(([k, s]) => {
                const meta = getModuleMeta(k);
                return (
                  <tr key={k}>
                    <td>
                      <a href={`${k}.html`} onClick={(e) => handleLinkClick(e, `${k}.html`)}>
                        {meta.moduleTitle}
                      </a>
                    </td>
                    <td style={{ fontFamily: "var(--mono)", fontVariantNumeric: "tabular-nums" }}>
                      {s}%
                    </td>
                    <td style={{ fontFamily: "var(--mono)" }}>{s >= 80 ? "LULUS" : "ULANGI"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      <section id="audio-offline">
        <h2>Audio Pengucapan &amp; Mode Offline</h2>
        <p style={{ fontSize: ".9rem", color: "var(--muted)" }}>
          Fitur <b>▸ Listen</b> menggunakan <i>Web Speech API</i> bawaan sistem operasi dan otomatis
          memilih suara lokal (<code>localService: true</code>) agar pelafalan bahasa Inggris tetap
          berfungsi <b>100% offline tanpa internet</b>.
        </p>
        <div className="audio-settings-bar">
          <div>
            <span className="stat-label">Suara Aktif</span>
            <div style={{ fontFamily: "var(--mono)", fontSize: ".82rem", marginTop: ".2rem" }}>
              {voiceInfo.voiceName}
            </div>
          </div>
          <div className="toolbar-actions">
            <button
              type="button"
              className={`filter-pill ${speechRateMode === "normal" ? "is-active" : ""}`}
              onClick={() => handleSpeedToggle("normal")}
            >
              Kecepatan Normal (1.0x)
            </button>
            <button
              type="button"
              className={`filter-pill ${speechRateMode === "slow" ? "is-active" : ""}`}
              onClick={() => handleSpeedToggle("slow")}
            >
              Kecepatan Lambat (0.82x)
            </button>
            <button
              type="button"
              className="speak-btn"
              onClick={() =>
                speakEnglish("Welcome to English Learning. Offline pronunciation is ready.")
              }
            >
              ▸ Tes Suara Offline
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
