import React, { useEffect, useMemo, useRef, useState } from "react";
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
  getChecks,
  getErrorJournal,
  getScores,
  getVocabLog,
  importAllData,
  ModuleStatus,
  statusOf,
} from "../utils/storage";
import { GuidedQuestionItem, QuestionProgressState } from "./GuidedQuestionItem";
import { OfflineIndicator, PWAInstallButton } from "./PWAControls";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardViewProps {
  onNavigate: (path: string) => void;
}

interface DailyReviewItem {
  id: string;
  moduleKey: string;
  moduleTitle: string;
  levelKey: "simple" | "intermediate" | "complex";
  question: ModuleQuestion;
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
  const [vocabCount, setVocabCount] = useState<number>(() => getVocabLog().length);
  const [errorCount, setErrorCount] = useState<number>(() => getErrorJournal().length);


  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ModuleStatus>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  // Daily Spaced Repetition state
  const [dailyActive, setDailyActive] = useState(false);
  const [dailyItems, setDailyItems] = useState<DailyReviewItem[]>([]);
  const [dailyStates, setDailyStates] = useState<QuestionProgressState[]>([]);

  // Speech & Backup state
  const [speechRateMode, setSpeechRateModeState] = useState<"normal" | "slow">(() =>
    getSpeechRate() < 1 ? "slow" : "normal"
  );
  const [voiceInfo, setVoiceInfo] = useState(() => getSpeechVoiceInfo());


  const refreshData = () => {
    setScores(getScores());
    setChecks(getChecks());
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
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handleFocus);
    window.addEventListener("visibilitychange", handleVisibility);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoiceInfo(getSpeechVoiceInfo());
      };
    }
    return () => {
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

  const filteredCurriculum = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CURRICULUM.filter((lvl) => levelFilter === "all" || lvl.id === levelFilter)
      .map((level) => {
        const matchedModules = level.modules.filter(([mod, title], idx) => {
          const key = `${level.id}/${mod}`;
          const st = statusOf(key, scores, checks);
          if (statusFilter !== "all" && st !== statusFilter) return false;
          if (!q) return true;
          const numStr = String(idx + 1).padStart(2, "0");
          return (
            title.toLowerCase().includes(q) ||
            mod.toLowerCase().includes(q) ||
            level.title.toLowerCase().includes(q) ||
            numStr.includes(q)
          );
        });
        return {
          ...level,
          matchedModules,
        };
      })
      .filter((level) => level.matchedModules.length > 0);
  }, [searchQuery, statusFilter, levelFilter, scores, checks]);

  const totalMatchedModules = useMemo(
    () => filteredCurriculum.reduce((acc, lvl) => acc + lvl.matchedModules.length, 0),
    [filteredCurriculum]
  );

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
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importAllData(content);
      if (res.ok) {
        setScores(getScores());
        setChecks(getChecks());
        setVocabCount(getVocabLog().length);
        setErrorCount(getErrorJournal().length);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };



  return (
    <>
      <OfflineIndicator />
      <nav>
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
        Basic → Complex · 5 Level · 58 Modul · <span id="builtCounter">{BUILT.size}</span>/58 dibangun
      </p>

      <section id="overview">
        <h2>Progress</h2>
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
          dikerjakan · <b>BELUM DITULIS</b> = file modul belum dibuat
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
            title="Unduh seluruh riwayat skor, checklist, kosakata, dan error journal ke berkas JSON"
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

      <section id="levels">
        <h2>Daftar Modul ({totalMatchedModules} / {TOTAL_MODULES})</h2>

        <div className="curriculum-filter-bar">
          <input
            type="search"
            className="filter-search-input"
            placeholder="Cari modul atau topik (mis. articles, passive, hedging, conditional)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari modul kurikulum"
          />
          <select
            className="filter-level-select"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            aria-label="Filter berdasarkan level"
          >
            <option value="all">Semua Level (0–4)</option>
            {CURRICULUM.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.title}
              </option>
            ))}
          </select>
          <div className="filter-status-group" role="group" aria-label="Filter status modul">
            {(
              [
                ["all", "Semua"],
                ["belum", "Belum"],
                ["proses", "Proses"],
                ["lulus", "Lulus"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`filter-pill ${statusFilter === key ? "is-active" : ""}`}
                onClick={() => setStatusFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div id="levelList">
          {filteredCurriculum.length === 0 ? (
            <p className="empty">
              Tidak ada modul yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
            </p>
          ) : (
            filteredCurriculum.map((level) => (
              <details key={level.id} className="level-group" open>
                <summary>
                  <span className="level-title">{level.title}</span>
                  {level.ieltsBand && (
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        padding: "0.15rem 0.5rem",
                        border: "1px solid var(--line, #ccc)",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        fontWeight: 600,
                        background: "var(--bg-soft, #f7f7f7)",
                      }}
                    >
                      {level.ieltsBand}
                    </span>
                  )}
                  <span className="level-desc" style={{ marginLeft: "auto" }}>
                    {level.desc} ({level.matchedModules.length})
                  </span>
                </summary>
                <table className="module-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Modul</th>
                      <th>Status</th>
                      <th>Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {level.matchedModules.map(([mod, title]) => {
                      const origIndex = level.modules.findIndex(([m]) => m === mod);
                      const key = `${level.id}/${mod}`;
                      const path = `${level.id}/${mod}.html`;
                      const st = statusOf(key, scores, checks);
                      const score = scores[key];
                      const isBuilt = BUILT.has(key);

                      const statusLabel =
                        st === "unbuilt"
                          ? "— BELUM DITULIS"
                          : st === "lulus"
                          ? "✓ LULUS"
                          : st === "proses"
                          ? "· PROSES"
                          : "— BELUM";

                      return (
                        <tr key={key} className={`mod-${st}`}>
                          <td className="mod-num">{String(origIndex + 1).padStart(2, "0")}</td>
                          <td className="mod-title">
                            {isBuilt ? (
                              <a href={path} onClick={(e) => handleLinkClick(e, path)}>
                                {title}
                              </a>
                            ) : (
                              <span style={{ color: "var(--soft)" }}>{title}</span>
                            )}
                          </td>
                          <td className="mod-status">{statusLabel}</td>
                          <td className="mod-score">{score != null ? `${score}%` : "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </details>
            ))
          )}
        </div>
      </section>

      <section id="quiz-log">
        <h2>Riwayat Quiz</h2>
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
              {quizEntries.map(([k, s]) => (
                <tr key={k}>
                  <td>
                    <a
                      href={`${k}.html`}
                      onClick={(e) => handleLinkClick(e, `${k}.html`)}
                    >
                      {k}
                    </a>
                  </td>
                  <td>{s}%</td>
                  <td>{s >= 80 ? "LULUS" : "ULANGI"}</td>
                </tr>
              ))}
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
