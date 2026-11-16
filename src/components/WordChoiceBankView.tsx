import React, { useEffect, useMemo, useState } from "react";
import { CURRICULUM } from "../data/curriculum";
import { ModuleQuestion } from "../data/generatedModules";
import {
  ensureModuleLoaded,
  getQuestionBankAudit,
  isModuleLoaded,
  QUESTION_BANK,
  SKILL_GUIDE,
} from "../data/questionBank";
import { addErrorJournalEntry, saveScore } from "../utils/storage";
import { AIQuestionPackStudio } from "./AIQuestionPackStudio";
import { OfflineIndicator, PWAInstallButton } from "./PWAControls";
import { SidebarToggleButton } from "./SidebarControls";
import { SpeakButton } from "./SpeakButton";
import { ThemeToggle } from "./ThemeToggle";
import { ViewportToggle } from "./ViewportToggle";

interface WordChoiceBankViewProps {
  onNavigate: (path: string) => void;
}

type LevelKey = "simple" | "intermediate" | "complex";
type QuestionTypeFilter = "all" | "choice" | "dialogue" | "edit" | "build";
const LEVEL_ORDER: LevelKey[] = ["simple", "intermediate", "complex"];
const LEVEL_LABELS: Record<LevelKey, string> = {
  simple: "Basic",
  intermediate: "Intermediate",
  complex: "Advanced",
};
const PAGE_SIZE = 20;

interface BankQuestionState {
  completed: boolean;
  correct: boolean;
  points: number;
  attempts: number;
  selectedOption: number | null;
  selectedTokens: number[];
  showHints: boolean;
  feedbackText: string;
  wrongFeedbackText: string;
  feedbackType: "pass" | "retry" | "review" | null;
}

export const WordChoiceBankView: React.FC<WordChoiceBankViewProps> = ({ onNavigate }) => {
  const [packVersion, setPackVersion] = useState<number>(0);
  const moduleKeys = useMemo(() => Object.keys(QUESTION_BANK), [packVersion]);
  const [currentModuleKey, setCurrentModuleKey] = useState<string>(moduleKeys[0] || "");
  const [currentLevelFilter, setCurrentLevelFilter] = useState<"all" | LevelKey>("all");
  const [typeFilter, setTypeFilter] = useState<QuestionTypeFilter>("all");
  const [pageByLevel, setPageByLevel] = useState<Record<LevelKey, number>>({
    simple: 1,
    intermediate: 1,
    complex: 1,
  });
  const [moduleLoading, setModuleLoading] = useState<boolean>(false);
  const [moduleLoadError, setModuleLoadError] = useState<string>("");
  const [questionStates, setQuestionStates] = useState<Record<string, BankQuestionState>>({});
  const [overviewExpanded, setOverviewExpanded] = useState<boolean>(false);
  const [auditLevelFilter, setAuditLevelFilter] = useState<string>("all");
  const [auditSearch, setAuditSearch] = useState<string>("");

  useEffect(() => {
    document.body.dataset.module = "word-choice-bank";
    document.title = "Bank Soal — English Learning";
  }, []);

  const loadSelectedModule = (key: string, isCancelled?: () => boolean) => {
    if (!key) {
      setModuleLoading(false);
      setModuleLoadError("");
      return;
    }
    if (isModuleLoaded(key)) {
      setModuleLoading(false);
      setModuleLoadError("");
      return;
    }
    setModuleLoading(true);
    setModuleLoadError("");
    ensureModuleLoaded(key)
      .then(() => {
        if (isCancelled?.()) return;
        setModuleLoading(false);
        setPackVersion((v) => v + 1);
      })
      .catch(() => {
        if (isCancelled?.()) return;
        setModuleLoading(false);
        setModuleLoadError("Gagal memuat soal modul ini. Periksa koneksi atau coba muat ulang.");
      });
  };

  useEffect(() => {
    let cancelled = false;
    loadSelectedModule(currentModuleKey, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [currentModuleKey]);

  useEffect(() => {
    setPageByLevel({ simple: 1, intermediate: 1, complex: 1 });
  }, [currentModuleKey, currentLevelFilter, typeFilter]);

  const bankAudit = useMemo(() => getQuestionBankAudit(), [packVersion]);

  const summaryRows = useMemo(() => {
    return [
      { name: "Basic (simple)", count: bankAudit.totalSimple, added: bankAudit.modules.reduce((s, m) => s + m.packAddedByLevel.simple, 0) },
      { name: "Intermediate", count: bankAudit.totalIntermediate, added: bankAudit.modules.reduce((s, m) => s + m.packAddedByLevel.intermediate, 0) },
      { name: "Advanced (complex)", count: bankAudit.totalComplex, added: bankAudit.modules.reduce((s, m) => s + m.packAddedByLevel.complex, 0) },
    ];
  }, [bankAudit]);

  const levelAuditRows = useMemo(() => {
    return CURRICULUM.map((lvl) => {
      const mods = bankAudit.modules.filter((m) => m.levelId === lvl.id);
      const latestMs = mods.reduce((max, m) => {
        const ts = Date.parse(m.updatedAt || "");
        return ts > max ? ts : max;
      }, 0);
      return {
        id: lvl.id,
        title: lvl.title,
        moduleCount: mods.length,
        baseTotal: mods.reduce((s, m) => s + m.baseTotal, 0),
        packAdded: mods.reduce((s, m) => s + m.packAdded, 0),
        simple: mods.reduce((s, m) => s + m.simpleCount, 0),
        intermediate: mods.reduce((s, m) => s + m.intermediateCount, 0),
        complex: mods.reduce((s, m) => s + m.complexCount, 0),
        total: mods.reduce((s, m) => s + m.totalCount, 0),
        updatedAt: latestMs > 0 ? new Date(latestMs).toISOString() : bankAudit.latestUpdatedAt,
      };
    });
  }, [bankAudit]);

  const filteredAuditModules = useMemo(() => {
    const q = auditSearch.trim().toLowerCase();
    return bankAudit.modules.filter((m) => {
      if (auditLevelFilter !== "all" && m.levelId !== auditLevelFilter) return false;
      if (!q) return true;
      return (
        m.moduleKey.toLowerCase().includes(q) ||
        m.moduleTitle.toLowerCase().includes(q) ||
        (m.packPath || "").toLowerCase().includes(q)
      );
    });
  }, [bankAudit.modules, auditLevelFilter, auditSearch]);

  const formatAuditDateTime = (iso: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const levelsToShow: LevelKey[] = useMemo(
    () => (currentLevelFilter === "all" ? LEVEL_ORDER : [currentLevelFilter]),
    [currentLevelFilter]
  );

  useEffect(() => {
    if (!currentModuleKey || !QUESTION_BANK[currentModuleKey]) {
      setQuestionStates({});
      return;
    }
    const mod = QUESTION_BANK[currentModuleKey];
    const initial: Record<string, BankQuestionState> = {};
    levelsToShow.forEach((lvl) => {
      const qs = mod.levels[lvl] || [];
      qs.forEach((_, idx) => {
        initial[`${lvl}-${idx}`] = {
          completed: false,
          correct: false,
          points: 0,
          attempts: 0,
          selectedOption: null,
          selectedTokens: [],
          showHints: false,
          feedbackText: "",
          wrongFeedbackText: "",
          feedbackType: null,
        };
      });
    });
    setQuestionStates(initial);
  }, [currentModuleKey, levelsToShow, packVersion]);

  const currentMod = currentModuleKey ? QUESTION_BANK[currentModuleKey] : null;

  const handleSelectOption = (stateKey: string, optIdx: number) => {
    setQuestionStates((prev) => {
      const st = prev[stateKey];
      if (!st || st.completed) return prev;
      return {
        ...prev,
        [stateKey]: {
          ...st,
          selectedOption: optIdx,
          feedbackText: "",
          wrongFeedbackText: "",
          feedbackType: null,
        },
      };
    });
  };

  const handleToggleToken = (stateKey: string, tokenIdx: number) => {
    setQuestionStates((prev) => {
      const st = prev[stateKey];
      if (!st || st.completed || st.selectedTokens.includes(tokenIdx)) return prev;
      return {
        ...prev,
        [stateKey]: {
          ...st,
          selectedTokens: [...st.selectedTokens, tokenIdx],
          feedbackText: "",
          wrongFeedbackText: "",
          feedbackType: null,
        },
      };
    });
  };

  const handleResetTokens = (stateKey: string) => {
    setQuestionStates((prev) => {
      const st = prev[stateKey];
      if (!st || st.completed) return prev;
      return {
        ...prev,
        [stateKey]: {
          ...st,
          selectedTokens: [],
          feedbackText: "",
          wrongFeedbackText: "",
          feedbackType: null,
        },
      };
    });
  };

  const handleShowHints = (stateKey: string) => {
    setQuestionStates((prev) => {
      const st = prev[stateKey];
      if (!st) return prev;
      return {
        ...prev,
        [stateKey]: {
          ...st,
          showHints: true,
        },
      };
    });
  };

  const handleCheckAnswer = (levelKey: LevelKey, index: number, q: ModuleQuestion) => {
    const stateKey = `${levelKey}-${index}`;
    setQuestionStates((prev) => {
      const st = prev[stateKey];
      if (!st || st.completed) return prev;

      const isBuild = q.type === "build" && Array.isArray(q.answer);
      if (isBuild) {
        if (st.selectedTokens.length !== q.options.length) {
          return {
            ...prev,
            [stateKey]: {
              ...st,
              feedbackText: "Susun semua kata terlebih dahulu.",
              feedbackType: "retry",
            },
          };
        }
      } else if (st.selectedOption == null) {
        return {
          ...prev,
          [stateKey]: {
            ...st,
            feedbackText: "Pilih jawaban terlebih dahulu.",
            feedbackType: "retry",
          },
        };
      }

      const nextAttempts = st.attempts + 1;
      const isCorrect = isBuild
        ? (q.answer as number[]).every((ansIdx, i) => st.selectedTokens[i] === ansIdx)
        : st.selectedOption === q.answer ||
          (Array.isArray(q.answer) && q.answer.includes(st.selectedOption!));

      let nextState: BankQuestionState;

      if (isCorrect) {
        const pts = nextAttempts === 1 ? 3 : nextAttempts === 2 ? 2 : 1;
        nextState = {
          ...st,
          attempts: nextAttempts,
          completed: true,
          correct: true,
          points: pts,
          feedbackText: `Benar! ${q.explanation || ""}`,
          wrongFeedbackText: "",
          feedbackType: "pass",
        };
      } else if (nextAttempts >= 3) {
        const correctAnswerText = Array.isArray(q.answer)
          ? q.answer.map((idx) => q.options[idx]).join(" ")
          : q.options[q.answer];
        const wfEntry =
          st.selectedOption != null && q.wrongFeedback
            ? q.wrongFeedback[st.selectedOption]
            : undefined;
        const wfText = Array.isArray(wfEntry) ? wfEntry[0] : wfEntry || "";
        addErrorJournalEntry({
          moduleKey: currentModuleKey,
          wrongSentence: q.draft || q.prompt,
          correctSentence: q.prompt.includes("___")
            ? q.prompt.replace("___", correctAnswerText)
            : correctAnswerText,
          ruleNote: q.explanation || wfText,
        });
        nextState = {
          ...st,
          attempts: nextAttempts,
          completed: true,
          correct: false,
          points: 0,
          feedbackText: `Salah. Jawaban benar: ${correctAnswerText}. ${q.explanation || ""} (Dicatat ke Error Journal)`,
          wrongFeedbackText: wfText ? `Petunjuk: ${wfText}` : "",
          feedbackType: "review",
        };
      } else {
        const hint =
          q.hints && q.hints[nextAttempts - 1] ? q.hints[nextAttempts - 1] : "Coba lagi.";
        const wfEntry =
          st.selectedOption != null && q.wrongFeedback
            ? q.wrongFeedback[st.selectedOption]
            : undefined;
        const wfText = Array.isArray(wfEntry)
          ? wfEntry[Math.min(nextAttempts - 1, wfEntry.length - 1)]
          : wfEntry || "";
        nextState = {
          ...st,
          attempts: nextAttempts,
          feedbackText: `Salah. ${hint}`,
          wrongFeedbackText: wfText,
          feedbackType: "retry",
        };
      }

      const updatedAll = { ...prev, [stateKey]: nextState };
      const allValues = Object.values(updatedAll);
      if (
        currentMod &&
        allValues.length > 0 &&
        allValues.every((item) => item.completed)
      ) {
        const earned = allValues.reduce((s, item) => s + item.points, 0);
        const score = Math.round((earned / (allValues.length * 3)) * 100);
        saveScore(currentModuleKey, score);
      }

      return updatedAll;
    });
  };

  const allStatesList = Object.values(questionStates);
  const completedTotal = allStatesList.filter((s) => s.completed).length;
  const currentTotalQuestions = allStatesList.length;
  const allCompleted = currentTotalQuestions > 0 && completedTotal === currentTotalQuestions;
  const totalEarned = allStatesList.reduce((s, item) => s + item.points, 0);
  const overallScore = allCompleted
    ? Math.round((totalEarned / (currentTotalQuestions * 3)) * 100)
    : 0;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      <OfflineIndicator />
      <nav>
        <SidebarToggleButton />
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          ENGLISH · LEARNING
        </a>
        <a href="challenge-knowledge.html" onClick={(e) => handleLinkClick(e, "challenge-knowledge.html")}>
          Challenge
        </a>
        <a href="question-bank.html" onClick={(e) => handleLinkClick(e, "question-bank.html")}>
          Question Bank
        </a>
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          Kurikulum
        </a>
        <a href="logs/vocab-log.html" onClick={(e) => handleLinkClick(e, "logs/vocab-log.html")}>
          Vocab Log
        </a>
        <a href="logs/error-journal.html" onClick={(e) => handleLinkClick(e, "logs/error-journal.html")}>
          Error Journal
        </a>
        <div className="nav-utilities">
          <ViewportToggle />
          <PWAInstallButton />
          <ThemeToggle />
        </div>
      </nav>

      <main className="question-bank page">
        <p className="level">Bank Soal · 58 Modul</p>
        <h1>Bank Soal Terintegrasi</h1>
        <p className="module-intro">
          Latihan pemahaman untuk semua 58 modul, dari basic hingga advanced. Setiap soal
          dilengkapi penjelasan dan petunjuk kesalahan. Skor disimpan otomatis dan ditampilkan di
          dashboard.
        </p>

        <AIQuestionPackStudio
          selectedModuleKey={currentModuleKey}
          onPackImported={(importedModuleKey) => {
            setPackVersion((v) => v + 1);
            setCurrentModuleKey(importedModuleKey);
          }}
        />

        <section id="bankSelector" className="bank-selector">
          <div className="bank-selector-row">
            <label htmlFor="moduleSelect">Pilih modul:</label>{" "}
            <select
              id="moduleSelect"
              className="bank-module-select"
              value={currentModuleKey}
              onChange={(e) => setCurrentModuleKey(e.target.value)}
            >
              <option value="">-- Pilih modul --</option>
              {moduleKeys.map((key) => (
                <option key={key} value={key}>
                  {key} — {QUESTION_BANK[key].title}
                </option>
              ))}
            </select>{" "}
            <label htmlFor="levelFilter">Filter tingkat:</label>{" "}
            <select
              id="levelFilter"
              className="bank-level-filter"
              value={currentLevelFilter}
              onChange={(e) => setCurrentLevelFilter(e.target.value as "all" | LevelKey)}
            >
              <option value="all">Semua tingkat</option>
              <option value="simple">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="complex">Advanced</option>
            </select>
          </div>
          <div className="bank-type-filter-bar" role="group" aria-label="Filter tipe soal">
            <span className="bank-type-filter-label">Tipe soal:</span>
            {(
              [
                ["all", "Semua Tipe"],
                ["choice", "Choice"],
                ["dialogue", "Dialogue"],
                ["edit", "Edit / Koreksi"],
                ["build", "Build / Susun"],
              ] as const
            ).map(([tKey, tLabel]) => (
              <button
                key={tKey}
                type="button"
                className={`filter-pill ${typeFilter === tKey ? "is-active" : ""}`}
                aria-pressed={typeFilter === tKey}
                onClick={() => setTypeFilter(tKey)}
              >
                {tLabel}
              </button>
            ))}
          </div>
        </section>

        <section id="bankOverview" className="bank-overview">
          <div className="bank-overview-head">
            <h2>Ringkasan Modul</h2>
            <button
              type="button"
              className="filter-pill"
              aria-expanded={overviewExpanded}
              onClick={() => setOverviewExpanded((v) => !v)}
            >
              {overviewExpanded
                ? "▾ Tutup Rincian Update & Soal Masuk"
                : "▸ Expand: Cek Tanggal Update & Soal Masuk"}
            </button>
          </div>

          <div className="bank-audit-meta-strip">
            <span>
              <b>Total Soal Aktif:</b> {bankAudit.grandTotal.toLocaleString("id-ID")} soal (
              {bankAudit.moduleCount} modul)
            </span>
            <span>
              <b>Soal Masuk dari Pack:</b> +{bankAudit.totalPackAdded.toLocaleString("id-ID")} soal
              ({bankAudit.packFileCount} file pack
              {bankAudit.customPackCount > 0 ? ` + ${bankAudit.customPackCount} pack kustom` : ""})
            </span>
            <span>
              <b>Update Soal Terakhir:</b> {formatAuditDateTime(bankAudit.latestUpdatedAt)}
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Jumlah Modul</th>
                <th>Jumlah Soal</th>
                <th>Soal Masuk (Pack)</th>
                <th>Target Skor</th>
              </tr>
            </thead>
            <tbody id="bankSummaryBody">
              {summaryRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{moduleKeys.length}</td>
                  <td style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>
                    {row.count.toLocaleString("id-ID")}
                  </td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--edu-good)" }}>
                    +{row.added.toLocaleString("id-ID")}
                  </td>
                  <td>80%</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bank-summary-total-row">
                <td>
                  <strong>TOTAL KESELURUHAN</strong>
                </td>
                <td>
                  <strong>{moduleKeys.length}</strong>
                </td>
                <td style={{ fontFamily: "var(--mono)" }}>
                  <strong>{bankAudit.grandTotal.toLocaleString("id-ID")}</strong>
                </td>
                <td style={{ fontFamily: "var(--mono)", color: "var(--edu-good)" }}>
                  <strong>+{bankAudit.totalPackAdded.toLocaleString("id-ID")}</strong>
                </td>
                <td>
                  <strong>80%</strong>
                </td>
              </tr>
            </tfoot>
          </table>

          {overviewExpanded && (
            <div className="bank-audit-expanded" role="region" aria-label="Rincian tanggal update dan soal masuk">
              <div className="bank-audit-build-note">
                <span>
                  <b>Waktu Build Bundle Aktif:</b> {formatAuditDateTime(bankAudit.builtAt)}
                </span>
                <span>
                  <b>Soal Dasar Bawaan:</b> {bankAudit.totalBase.toLocaleString("id-ID")} soal ·{" "}
                  <b>Total Akhir Gabungan:</b> {bankAudit.grandTotal.toLocaleString("id-ID")} soal
                </span>
              </div>

              <h3>1. Rincian per Level Kurikulum</h3>
              <div className="bank-audit-table-wrap">
                <table className="bank-audit-table">
                  <thead>
                    <tr>
                      <th>Level Kurikulum</th>
                      <th>Modul</th>
                      <th>Simple</th>
                      <th>Inter</th>
                      <th>Complex</th>
                      <th>Masuk (Pack)</th>
                      <th>Total Soal</th>
                      <th>Tanggal Update Terakhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {levelAuditRows.map((lvl) => (
                      <tr key={lvl.id}>
                        <td>{lvl.title}</td>
                        <td style={{ fontFamily: "var(--mono)" }}>{lvl.moduleCount}</td>
                        <td style={{ fontFamily: "var(--mono)" }}>{lvl.simple}</td>
                        <td style={{ fontFamily: "var(--mono)" }}>{lvl.intermediate}</td>
                        <td style={{ fontFamily: "var(--mono)" }}>{lvl.complex}</td>
                        <td style={{ fontFamily: "var(--mono)", color: "var(--edu-good)", fontWeight: 700 }}>
                          +{lvl.packAdded}
                        </td>
                        <td style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>{lvl.total}</td>
                        <td style={{ fontFamily: "var(--mono)", fontSize: ".78rem" }}>
                          {formatAuditDateTime(lvl.updatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {bankAudit.customPacks.length > 0 && (
                <>
                  <h3>2. Log Pack Kustom / Impor Lokal ({bankAudit.customPacks.length})</h3>
                  <div className="bank-audit-table-wrap">
                    <table className="bank-audit-table">
                      <thead>
                        <tr>
                          <th>Modul</th>
                          <th>Status</th>
                          <th>Jumlah Soal Masuk</th>
                          <th>Tanggal Impor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bankAudit.customPacks.map((cp) => {
                          const cpCount =
                            (cp.pack.levels.simple?.length || 0) +
                            (cp.pack.levels.intermediate?.length || 0) +
                            (cp.pack.levels.complex?.length || 0);
                          return (
                            <tr key={cp.id}>
                              <td style={{ fontFamily: "var(--mono)" }}>{cp.pack.moduleKey}</td>
                              <td>{cp.isActive !== false ? "Aktif" : "Nonaktif"}</td>
                              <td style={{ fontFamily: "var(--mono)" }}>{cpCount}</td>
                              <td style={{ fontFamily: "var(--mono)", fontSize: ".78rem" }}>
                                {formatAuditDateTime(cp.uploadedAt)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <div className="bank-audit-detail-head">
                <h3>
                  {bankAudit.customPacks.length > 0 ? "3." : "2."} Log Update per Modul &amp; File Pack (
                  {filteredAuditModules.length}/{bankAudit.modules.length})
                </h3>
                <div className="bank-audit-filters">
                  <select
                    aria-label="Filter level audit soal"
                    value={auditLevelFilter}
                    onChange={(e) => setAuditLevelFilter(e.target.value)}
                  >
                    <option value="all">Semua Level</option>
                    {CURRICULUM.map((lvl) => (
                      <option key={lvl.id} value={lvl.id}>
                        {lvl.title}
                      </option>
                    ))}
                  </select>
                  <input
                    type="search"
                    placeholder="Cari modul / nama topik..."
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    aria-label="Cari modul di rincian update soal"
                  />
                </div>
              </div>

              <div className="bank-audit-table-wrap is-scrollable">
                <table className="bank-audit-table">
                  <thead>
                    <tr>
                      <th>Modul</th>
                      <th>Dasar</th>
                      <th>Masuk (Pack)</th>
                      <th>S / I / C</th>
                      <th>Total</th>
                      <th>Tanggal Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAuditModules.map((item) => (
                      <tr key={item.moduleKey}>
                        <td>
                          <button
                            type="button"
                            className="bank-audit-jump-btn"
                            onClick={() => {
                              setCurrentModuleKey(item.moduleKey);
                              document
                                .getElementById("bankSelector")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            <strong>{item.moduleTitle}</strong>
                            <span>{item.moduleKey}</span>
                          </button>
                        </td>
                        <td style={{ fontFamily: "var(--mono)" }}>{item.baseTotal}</td>
                        <td style={{ fontFamily: "var(--mono)", color: "var(--edu-good)", fontWeight: 700 }}>
                          +{item.packAdded}
                        </td>
                        <td style={{ fontFamily: "var(--mono)", fontSize: ".78rem" }}>
                          {item.simpleCount}/{item.intermediateCount}/{item.complexCount}
                        </td>
                        <td style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>
                          {item.totalCount}
                        </td>
                        <td style={{ fontFamily: "var(--mono)", fontSize: ".76rem" }}>
                          {formatAuditDateTime(item.updatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section id="bankContent" className="bank-content">
          {!currentMod ? (
            <p>Pilih modul dari daftar di atas untuk melihat soal.</p>
          ) : moduleLoading ? (
            <div className="note" role="status" aria-live="polite">
              Memuat bank soal modul <b>{currentMod.title}</b> (100+ soal per tingkat)...
            </div>
          ) : moduleLoadError ? (
            <div
              className="warn"
              role="alert"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: ".75rem",
                flexWrap: "wrap",
              }}
            >
              <span>{moduleLoadError}</span>
              <button
                type="button"
                className="filter-pill"
                onClick={() => loadSelectedModule(currentModuleKey)}
              >
                ↻ Muat Ulang
              </button>
            </div>
          ) : (
            <>
              {levelsToShow.map((levelKey) => {
                const levelQuestions = currentMod.levels[levelKey] || [];
                if (!levelQuestions.length) return null;

                const levelStateItems = levelQuestions.map(
                  (_, i) => questionStates[`${levelKey}-${i}`]
                );
                const levelCompleted = levelStateItems.filter((s) => s?.completed).length;
                const levelCorrect = levelStateItems.filter((s) => s?.correct).length;
                const levelPoints = levelStateItems.reduce((s, item) => s + (item?.points || 0), 0);
                const isLevelDone = levelCompleted === levelQuestions.length;
                const levelPct = Math.round((levelPoints / (levelQuestions.length * 3)) * 100);

                const skillTotals: Record<string, { correct: number; count: number }> = {};
                if (isLevelDone) {
                  levelQuestions.forEach((q, i) => {
                    const sk = q.skill || levelKey;
                    if (!skillTotals[sk]) skillTotals[sk] = { correct: 0, count: 0 };
                    skillTotals[sk].count += 1;
                    if (levelStateItems[i]?.correct) skillTotals[sk].correct += 1;
                  });
                }
                const weakSkills = Object.entries(skillTotals).filter(
                  ([, t]) => t.correct / t.count < 0.8
                );

                const indexedQuestions = levelQuestions
                  .map((q, origIdx) => ({ q, origIdx }))
                  .filter(({ q }) => {
                    if (typeFilter === "all") return true;
                    const resolvedType = q.type || "choice";
                    return resolvedType === typeFilter;
                  });

                const totalFiltered = indexedQuestions.length;
                const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
                const rawPage = pageByLevel[levelKey] || 1;
                const currentPage = Math.min(Math.max(1, rawPage), totalPages);
                const startIdx = (currentPage - 1) * PAGE_SIZE;
                const endIdx = Math.min(startIdx + PAGE_SIZE, totalFiltered);
                const visibleQuestions = indexedQuestions.slice(startIdx, endIdx);

                const setLevelPage = (nextPage: number, scrollTop = false) => {
                  const clamped = Math.min(Math.max(1, nextPage), totalPages);
                  setPageByLevel((prev) => ({ ...prev, [levelKey]: clamped }));
                  if (scrollTop) {
                    document
                      .getElementById(`bank-${levelKey}`)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                };

                const jumpToFirstUnanswered = () => {
                  const firstIdx = indexedQuestions.findIndex(
                    ({ origIdx }) => !questionStates[`${levelKey}-${origIdx}`]?.completed
                  );
                  if (firstIdx >= 0) {
                    setLevelPage(Math.floor(firstIdx / PAGE_SIZE) + 1, true);
                  }
                };

                const renderPaginationControls = (scrollOnClick: boolean) => {
                  if (totalFiltered <= PAGE_SIZE && totalFiltered > 0) return null;
                  const pageNumbers: number[] = [];
                  for (let p = 1; p <= totalPages; p++) {
                    if (
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - currentPage) <= 1
                    ) {
                      pageNumbers.push(p);
                    }
                  }
                  return (
                    <div className="bank-pagination" role="navigation" aria-label={`Halaman soal ${LEVEL_LABELS[levelKey]}`}>
                      <span className="bank-pagination-info tabular-num">
                        Menampilkan{" "}
                        {totalFiltered === 0 ? "0" : `${startIdx + 1}–${endIdx}`} dari{" "}
                        {totalFiltered} soal · Hal. {currentPage}/{totalPages}
                      </span>
                      <div className="bank-pagination-buttons">
                        <button
                          type="button"
                          className="filter-pill"
                          disabled={currentPage <= 1}
                          onClick={() => setLevelPage(currentPage - 1, scrollOnClick)}
                        >
                          ← Sebelumnya
                        </button>
                        {pageNumbers.map((p, pIdx) => {
                          const prevP = pageNumbers[pIdx - 1];
                          const showEllipsis = prevP != null && p - prevP > 1;
                          return (
                            <React.Fragment key={p}>
                              {showEllipsis && (
                                <span className="bank-pagination-ellipsis" aria-hidden="true">
                                  …
                                </span>
                              )}
                              <button
                                type="button"
                                className={`filter-pill tabular-num ${
                                  p === currentPage ? "is-active" : ""
                                }`}
                                aria-current={p === currentPage ? "page" : undefined}
                                onClick={() => setLevelPage(p, scrollOnClick)}
                              >
                                {p}
                              </button>
                            </React.Fragment>
                          );
                        })}
                        <button
                          type="button"
                          className="filter-pill"
                          disabled={currentPage >= totalPages}
                          onClick={() => setLevelPage(currentPage + 1, scrollOnClick)}
                        >
                          Berikutnya →
                        </button>
                        {levelCompleted < levelQuestions.length && (
                          <button
                            type="button"
                            className="filter-pill"
                            onClick={jumpToFirstUnanswered}
                          >
                            Lompat Belum Dijawab
                          </button>
                        )}
                      </div>
                    </div>
                  );
                };

                return (
                  <section
                    key={`${currentModuleKey}-${levelKey}`}
                    className="bank-level-section"
                    id={`bank-${levelKey}`}
                  >
                    <div className="bank-level-head">
                      <h2>
                        {LEVEL_LABELS[levelKey]} · {currentMod.title}
                      </h2>
                      <span className="bank-level-count tabular-num">
                        {levelCompleted}/{levelQuestions.length} selesai
                      </span>
                    </div>

                    {renderPaginationControls(false)}

                    {visibleQuestions.length === 0 ? (
                      <p className="empty">
                        Tidak ada soal bertipe "{typeFilter}" pada tingkat{" "}
                        {LEVEL_LABELS[levelKey]} untuk modul ini.
                      </p>
                    ) : (
                      <form
                        className="bank-quiz"
                        id={`bankForm-${levelKey}`}
                        onSubmit={(e) => e.preventDefault()}
                      >
                        {visibleQuestions.map(({ q, origIdx: i }) => {
                          const stateKey = `${levelKey}-${i}`;
                          const st = questionStates[stateKey];
                          if (!st) return null;

                          const isBuild = q.type === "build" && Array.isArray(q.answer);

                          return (
                            <fieldset
                              key={stateKey}
                              className="bank-question"
                              data-level={levelKey}
                              data-index={i}
                              data-state={st.feedbackType || undefined}
                            >
                              <legend className="question-legend-row">
                                <span>
                                  {i + 1}. {q.prompt}
                                </span>
                                <SpeakButton text={q.draft || q.prompt} label="Listen" />
                              </legend>

                            {q.type === "dialogue" && q.dialogue && (
                              <div className="bank-dialogue">
                                {q.dialogue.map(([speaker, line], dIdx) => (
                                  <div
                                    key={dIdx}
                                    className={`bank-dialogue-line${dIdx % 2 ? " is-reply" : ""}`}
                                  >
                                    <b>{speaker}:</b>
                                    <span>{line}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {q.type === "edit" && q.draft && (
                              <div className="bank-draft">
                                <span>Edit kalimat ini:</span>
                                <div className="bank-draft-text">{q.draft}</div>
                              </div>
                            )}

                            {isBuild ? (
                              <div className="guided-build-activity">
                                <div className="guided-built" aria-live="polite">
                                  {st.selectedTokens.map((tIdx, idx) => (
                                    <span key={`${tIdx}-${idx}`} className="guided-selected-word">
                                      {q.options[tIdx]}
                                    </span>
                                  ))}
                                </div>
                                <div className="guided-word-bank">
                                  {q.options.map((token, tokenIdx) => (
                                    <button
                                      key={tokenIdx}
                                      type="button"
                                      className="guided-word"
                                      disabled={
                                        st.completed || st.selectedTokens.includes(tokenIdx)
                                      }
                                      onClick={() => handleToggleToken(stateKey, tokenIdx)}
                                    >
                                      {token}
                                    </button>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  className="guided-reset"
                                  disabled={st.completed}
                                  onClick={() => handleResetTokens(stateKey)}
                                  style={{ marginTop: ".5rem" }}
                                >
                                  Ulangi susunan
                                </button>
                              </div>
                            ) : (
                              <div className="bank-answer-choices">
                                {q.options.map((opt, optIndex) => {
                                  const isSelected = st.selectedOption === optIndex;
                                  const highlightPass = st.completed && st.correct && isSelected;
                                  return (
                                    <label
                                      key={optIndex}
                                      className="bank-answer-choice"
                                      style={
                                        highlightPass
                                          ? { borderColor: "var(--ink)", background: "var(--bg-soft)" }
                                          : undefined
                                      }
                                    >
                                      <input
                                        type="radio"
                                        name={`q-${levelKey}-${i}`}
                                        value={optIndex}
                                        checked={isSelected}
                                        disabled={st.completed}
                                        onChange={() => handleSelectOption(stateKey, optIndex)}
                                      />
                                      <span>{opt}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}

                            {q.hints && q.hints.length > 0 && (
                              <div>
                                <button
                                  type="button"
                                  className="bank-hints-btn"
                                  onClick={() => handleShowHints(stateKey)}
                                >
                                  Tampilkan petunjuk
                                </button>
                                {st.showHints && (
                                  <div id={`hints-${levelKey}-${i}`} className="bank-hints">
                                    {q.hints.map((hint, hIdx) =>
                                      st.attempts > hIdx || st.showHints ? (
                                        <p key={hIdx} className="bank-hint">
                                          Petunjuk {hIdx + 1}: {hint}
                                        </p>
                                      ) : null
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            <div
                              id={`feedback-${levelKey}-${i}`}
                              className={`bank-feedback${
                                st.feedbackType ? ` bank-feedback-${st.feedbackType}` : ""
                              }`}
                            >
                              {st.feedbackText}
                              {st.wrongFeedbackText && (
                                <p className="bank-wrong-feedback">{st.wrongFeedbackText}</p>
                              )}
                            </div>

                            <button
                              type="button"
                              className="bank-check-btn"
                              disabled={st.completed}
                              onClick={() => handleCheckAnswer(levelKey, i, q)}
                            >
                              Periksa jawaban
                            </button>
                            </fieldset>
                          );
                        })}
                      </form>
                    )}

                    {renderPaginationControls(true)}

                    <div
                      id={`result-${levelKey}`}
                      className="bank-level-result"
                      data-state={isLevelDone && levelPct >= 80 ? "pass" : "retry"}
                    >
                      {isLevelDone ? (
                        <>
                          <p>
                            Hasil {LEVEL_LABELS[levelKey]}: {levelCorrect}/{levelQuestions.length}{" "}
                            benar · {levelPoints}/{levelQuestions.length * 3} poin ({levelPct}%).
                          </p>
                          {weakSkills.length > 0 && (
                            <p className="bank-skill-review">
                              Topik untuk diulang:{" "}
                              {weakSkills.map(([skill, t], idx) => {
                                const guide = SKILL_GUIDE[skill];
                                const href = guide ? guide.href : `${currentModuleKey}.html`;
                                const label = guide ? guide.label : skill;
                                return (
                                  <React.Fragment key={skill}>
                                    {idx > 0 && " · "}
                                    <a
                                      href={href}
                                      onClick={(e) => handleLinkClick(e, href)}
                                    >
                                      {label} ({t.correct}/{t.count})
                                    </a>
                                  </React.Fragment>
                                );
                              })}
                            </p>
                          )}
                        </>
                      ) : (
                        `${levelCompleted}/${levelQuestions.length} soal diperiksa`
                      )}
                    </div>
                  </section>
                );
              })}

              <div
                id="bankOverall"
                className="bank-overall"
                data-state={allCompleted && overallScore >= 80 ? "pass" : "retry"}
              >
                {allCompleted
                  ? `Skor akhir: ${overallScore}% (${totalEarned}/${
                      currentTotalQuestions * 3
                    } poin). ${
                      overallScore >= 80
                        ? "LULUS. Skor disimpan di dashboard."
                        : "Belum mencapai 80%. Pelajari kembali topik yang disarankan."
                    }`
                  : `${completedTotal} dari ${currentTotalQuestions} soal diperiksa`}
              </div>
            </>
          )}
        </section>

        <footer className="footer-link">
          <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
            ← Kembali ke kurikulum
          </a>
        </footer>
      </main>
    </>
  );
};
