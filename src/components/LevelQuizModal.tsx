import React, { useEffect, useState } from "react";
import { ModuleQuestion } from "../data/generatedModules";
import { GuidedQuestionItem, QuestionProgressState } from "./GuidedQuestionItem";

export interface SkillGuideMap {
  [skillKey: string]: {
    label: string;
    href: string;
  };
}

export interface QuizLevelConfig {
  key: "simple" | "intermediate" | "complex";
  label: string;
  title: string;
  description: string;
  materialId: string;
  quizId: string;
  questions: ModuleQuestion[];
}

interface LevelQuizModalProps {
  isOpen: boolean;
  moduleKey: string;
  moduleTitle: string;
  levels: QuizLevelConfig[];
  activeLevelIndex: number;
  questionStates: QuestionProgressState[][];
  sessionSeed: number[];
  skillGuide?: SkillGuideMap;
  fallbackSecondHint?: string;
  onClose: () => void;
  onSelectLevel: (levelIndex: number) => void;
  onRandomizeLevel: (levelIndex: number) => void;
  onUpdateQuestionState: (
    levelIndex: number,
    questionIndex: number,
    nextState: QuestionProgressState
  ) => void;
  onJumpToMaterial: (anchorId: string) => void;
}

export const LevelQuizModal: React.FC<LevelQuizModalProps> = ({
  isOpen,
  moduleKey,
  moduleTitle,
  levels,
  activeLevelIndex,
  questionStates,
  sessionSeed,
  skillGuide = {},
  fallbackSecondHint,
  onClose,
  onSelectLevel,
  onRandomizeLevel,
  onUpdateQuestionState,
  onJumpToMaterial,
}) => {
  const [viewMode, setViewMode] = useState<"step" | "list">("step");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);

  const currentLevel = levels[activeLevelIndex] || levels[0];
  const currentStates = questionStates[activeLevelIndex] || [];
  const currentSeed = sessionSeed[activeLevelIndex] || 0;

  // Reset step index when switching level or randomizing
  useEffect(() => {
    const firstIncomplete = currentStates.findIndex((s) => !s?.completed);
    setCurrentStepIndex(firstIncomplete >= 0 ? firstIncomplete : 0);
  }, [activeLevelIndex, currentSeed]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !currentLevel) return null;

  const totalQuestions = currentLevel.questions.length;
  const completedCount = currentStates.filter((s) => s?.completed).length;
  const correctCount = currentStates.filter((s) => s?.correct).length;
  const points = currentStates.reduce((acc, s) => acc + (s?.points || 0), 0);
  const isLevelDone = totalQuestions > 0 && completedCount === totalQuestions;
  const levelScorePct =
    totalQuestions > 0 ? Math.round((points / (totalQuestions * 3)) * 100) : 0;
  const levelPassed = levelScorePct >= 80;

  // Compute weak skills when level is completed
  const skillTotals = new Map<string, { correct: number; count: number; label?: string; anchor?: string }>();
  if (isLevelDone) {
    currentLevel.questions.forEach((q, qIdx) => {
      const sk = q.skill || currentLevel.key;
      const entry = skillTotals.get(sk) || {
        correct: 0,
        count: 0,
        label: q.skillLabel,
        anchor: q.skillAnchor,
      };
      entry.count += 1;
      if (currentStates[qIdx]?.correct) entry.correct += 1;
      skillTotals.set(sk, entry);
    });
  }
  const weakSkills = [...skillTotals.entries()].filter(
    ([, tally]) => tally.correct / tally.count < 0.8
  );

  const safeStepIndex = Math.min(Math.max(0, currentStepIndex), Math.max(0, totalQuestions - 1));
  const stepQuestion = currentLevel.questions[safeStepIndex];
  const stepState = currentStates[safeStepIndex] || {
    attempts: 0,
    points: 0,
    correct: false,
    completed: false,
  };

  return (
    <div
      className="quiz-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Uji pemahaman ${currentLevel.title} — ${moduleTitle}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="quiz-modal-panel guided-learning">
        {/* Top bar */}
        <header className="quiz-modal-header">
          <div>
            <p className="level" style={{ marginBottom: ".2rem" }}>
              Uji Pemahaman Terhubung Bank Soal · {moduleTitle}
            </p>
            <h2 style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
              {currentLevel.label} — {currentLevel.title}
            </h2>
          </div>
          <div className="quiz-modal-header-actions">
            <button
              type="button"
              className="filter-pill"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              title="Lihat rangkuman rumus inti materi level ini"
            >
              📖 {showCheatSheet ? "Tutup Rumus" : "Rumus Singkat"}
            </button>
            <button
              type="button"
              className="filter-pill"
              onClick={() => onRandomizeLevel(activeLevelIndex)}
              title="Ambil dan acak ulang soal serta opsi jawaban dari Bank Soal untuk level ini"
            >
              ↻ Acak Soal Baru
            </button>
            <button
              type="button"
              className="filter-pill"
              onClick={onClose}
              title="Tutup pop-up dan kembali ke posisi bacaan materi (Esc)"
            >
              ✕ Tutup Kuis
            </button>
          </div>
        </header>

        {/* Level Switcher Tabs + View Mode Toggle */}
        <div className="quiz-modal-subheader">
          <div className="quiz-level-tabs" role="tablist" aria-label="Pilih level kuis">
            {levels.map((lvl, idx) => {
              const stList = questionStates[idx] || [];
              const doneCnt = stList.filter((s) => s?.completed).length;
              const pts = stList.reduce((acc, s) => acc + (s?.points || 0), 0);
              const pct =
                lvl.questions.length > 0
                  ? Math.round((pts / (lvl.questions.length * 3)) * 100)
                  : 0;
              const isDone = lvl.questions.length > 0 && doneCnt === lvl.questions.length;

              return (
                <button
                  key={lvl.key}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeLevelIndex}
                  className={`quiz-level-tab ${idx === activeLevelIndex ? "is-active" : ""}`}
                  onClick={() => onSelectLevel(idx)}
                >
                  <span>{lvl.title}</span>
                  <span className="quiz-level-tab-meta">
                    {isDone ? `${pct}%` : `${doneCnt}/${lvl.questions.length}`}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="quiz-viewmode-toggle">
            <button
              type="button"
              className={`filter-pill ${viewMode === "step" ? "is-active" : ""}`}
              onClick={() => setViewMode("step")}
            >
              1 Soal / Layar
            </button>
            <button
              type="button"
              className={`filter-pill ${viewMode === "list" ? "is-active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              Semua ({totalQuestions})
            </button>
          </div>
        </div>

        {/* Mini Cheat-Sheet Drawer */}
        {showCheatSheet && (
          <div
            style={{
              padding: "1rem",
              background: "var(--bg-soft, #f7f7f7)",
              border: "1px solid var(--line, #e0e0e0)",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <strong style={{ textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                Rangkuman Inti · {currentLevel.label} ({currentLevel.title})
              </strong>
              <button
                type="button"
                className="filter-pill"
                style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}
                onClick={() => setShowCheatSheet(false)}
              >
                Tutup Panel
              </button>
            </div>
            <p style={{ margin: "0 0 0.5rem 0" }}>{currentLevel.description}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                Butuh penjelasan mendalam dari guru?
              </span>
              <button
                type="button"
                className="filter-pill"
                style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}
                onClick={() => {
                  setShowCheatSheet(false);
                  onJumpToMaterial(currentLevel.materialId);
                }}
              >
                ↗ Lompat ke Teks Materi Lengkap
              </button>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="quiz-modal-progress-row" aria-live="polite">
          <span>
            Progress {currentLevel.title}: <b>{completedCount}/{totalQuestions}</b> soal selesai ·{" "}
            <b>{correctCount}</b> benar · <b>{points}/{totalQuestions * 3}</b> poin
          </span>
          <span>Variasi Acak #{currentSeed + 1}</span>
        </div>

        {/* Question Step Dots (when in step mode) */}
        {viewMode === "step" && totalQuestions > 0 && (
          <div className="quiz-step-dots" role="navigation" aria-label="Nomor soal">
            {currentLevel.questions.map((_, qIdx) => {
              const qSt = currentStates[qIdx];
              const statusClass = qSt?.completed
                ? qSt.correct
                  ? "is-pass"
                  : "is-review"
                : qSt?.attempts
                ? "is-retry"
                : "";
              return (
                <button
                  key={qIdx}
                  type="button"
                  className={`quiz-step-dot ${
                    qIdx === safeStepIndex ? "is-current" : ""
                  } ${statusClass}`.trim()}
                  onClick={() => setCurrentStepIndex(qIdx)}
                  aria-label={`Soal ${qIdx + 1}`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="quiz-modal-body">
          {viewMode === "step" && stepQuestion ? (
            <div className="quiz-step-container">
              <GuidedQuestionItem
                key={`${moduleKey}-${currentLevel.key}-seed${currentSeed}-q${safeStepIndex}`}
                question={stepQuestion}
                questionIndex={safeStepIndex}
                state={stepState}
                onUpdateState={(nextState) =>
                  onUpdateQuestionState(activeLevelIndex, safeStepIndex, nextState)
                }
                fallbackSecondHint={fallbackSecondHint}
                moduleKey={moduleKey}
              />

              <div className="quiz-step-nav">
                <button
                  type="button"
                  className="guided-reset"
                  disabled={safeStepIndex === 0}
                  onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                >
                  ← Soal Sebelumnya
                </button>
                <span style={{ fontFamily: "var(--mono)", fontSize: ".78rem", color: "var(--muted)" }}>
                  Soal {safeStepIndex + 1} / {totalQuestions}
                </span>
                {safeStepIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    className="check-quiz"
                    style={{ marginTop: 0 }}
                    onClick={() =>
                      setCurrentStepIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
                    }
                  >
                    Soal Berikutnya →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="filter-pill"
                    onClick={() => onRandomizeLevel(activeLevelIndex)}
                  >
                    ↻ Acak Soal Baru
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="guided-level-questions">
              {currentLevel.questions.map((question, qIdx) => (
                <GuidedQuestionItem
                  key={`${moduleKey}-${currentLevel.key}-seed${currentSeed}-q${qIdx}`}
                  question={question}
                  questionIndex={qIdx}
                  state={
                    currentStates[qIdx] || {
                      attempts: 0,
                      points: 0,
                      correct: false,
                      completed: false,
                    }
                  }
                  onUpdateState={(nextState) =>
                    onUpdateQuestionState(activeLevelIndex, qIdx, nextState)
                  }
                  fallbackSecondHint={fallbackSecondHint}
                  moduleKey={moduleKey}
                />
              ))}
            </div>
          )}

          {/* Level Completion Banner inside Modal */}
          {isLevelDone && (
            <div
              className="guided-overall"
              data-state={levelPassed ? "pass" : "retry"}
              aria-live="polite"
            >
              <p style={{ marginBottom: ".4rem" }}>
                <b>
                  Hasil Level {currentLevel.title}: {levelScorePct}% ({correctCount}/
                  {totalQuestions} benar · {points}/{totalQuestions * 3} poin) —{" "}
                  {levelPassed ? "✓ LULUS LEVEL INI" : "BELUM MENCAPAI 80%"}
                </b>
              </p>
              {weakSkills.length > 0 ? (
                <p className="guided-skill-review" style={{ marginBottom: ".65rem" }}>
                  Topik untuk diulang:{" "}
                  {weakSkills.map(([skillKey, tally], idx) => {
                    const guide = skillGuide[skillKey];
                    const label = guide?.label || tally.label || skillKey;
                    const rawHref = guide?.href || tally.anchor || currentLevel.materialId;
                    const anchorId = rawHref.includes("#")
                      ? rawHref.split("#")[1]
                      : rawHref.replace(/^#/, "");
                    return (
                      <React.Fragment key={skillKey}>
                        {idx > 0 && " · "}
                        <a
                          href={`#${anchorId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onJumpToMaterial(anchorId);
                          }}
                        >
                          {label} ({tally.correct}/{tally.count})
                        </a>
                      </React.Fragment>
                    );
                  })}
                </p>
              ) : (
                <p style={{ marginBottom: ".65rem" }}>
                  Semua konsep di level {currentLevel.title} sudah dikuasai dengan baik!
                </p>
              )}

              <div className="toolbar-actions" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="filter-pill"
                  onClick={() => onRandomizeLevel(activeLevelIndex)}
                >
                  ↻ Latih Ulang {currentLevel.title} (Soal Acak Baru)
                </button>
                {correctCount < totalQuestions && (
                  <button
                    type="button"
                    className="filter-pill"
                    style={{ borderColor: "var(--ink, #111)", fontWeight: 600 }}
                    onClick={() => {
                      // Reset only questions that were not answered correctly
                      currentStates.forEach((st, qIdx) => {
                        if (!st?.correct) {
                          onUpdateQuestionState(activeLevelIndex, qIdx, {
                            attempts: 0,
                            points: 0,
                            correct: false,
                            completed: false,
                          });
                        }
                      });
                      const firstWrong = currentStates.findIndex((st) => !st?.correct);
                      if (firstWrong >= 0) setCurrentStepIndex(firstWrong);
                    }}
                    title="Coba jawab kembali hanya soal yang belum dijawab dengan benar"
                  >
                    ★ Ulangi Khusus Soal yang Salah ({totalQuestions - correctCount} Soal)
                  </button>
                )}
                {activeLevelIndex < levels.length - 1 && (
                  <button
                    type="button"
                    className="check-quiz"
                    style={{ marginTop: 0 }}
                    onClick={() => onSelectLevel(activeLevelIndex + 1)}
                  >
                    Lanjut ke Level {levels[activeLevelIndex + 1].title} →
                  </button>
                )}
                <button
                  type="button"
                  className="guided-reset"
                  onClick={() => onJumpToMaterial(currentLevel.materialId)}
                >
                  ← Kembali ke Materi {currentLevel.title}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
