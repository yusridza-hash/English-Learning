import React, { useEffect, useMemo, useState } from "react";
import { ModuleQuestion } from "../data/generatedModules";
import { QUESTION_BANK, SKILL_GUIDE } from "../data/questionBank";
import { saveScore } from "../utils/storage";

interface WordChoiceBankViewProps {
  onNavigate: (path: string) => void;
}

type LevelKey = "simple" | "intermediate" | "complex";
const LEVEL_ORDER: LevelKey[] = ["simple", "intermediate", "complex"];
const LEVEL_LABELS: Record<LevelKey, string> = {
  simple: "Basic",
  intermediate: "Intermediate",
  complex: "Advanced",
};

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
  const moduleKeys = useMemo(() => Object.keys(QUESTION_BANK), []);
  const [currentModuleKey, setCurrentModuleKey] = useState<string>(moduleKeys[0] || "");
  const [currentLevelFilter, setCurrentLevelFilter] = useState<"all" | LevelKey>("all");
  const [questionStates, setQuestionStates] = useState<Record<string, BankQuestionState>>({});

  useEffect(() => {
    document.body.dataset.module = "word-choice-bank";
    document.title = "Bank Soal — English Learning";
  }, []);

  const summaryRows = useMemo(() => {
    const levelStats: Record<LevelKey, number> = { simple: 0, intermediate: 0, complex: 0 };
    moduleKeys.forEach((key) => {
      LEVEL_ORDER.forEach((lvl) => {
        const qs = QUESTION_BANK[key]?.levels[lvl] || [];
        levelStats[lvl] += qs.length;
      });
    });
    return [
      { name: "Basic (simple)", count: levelStats.simple },
      { name: "Intermediate", count: levelStats.intermediate },
      { name: "Advanced (complex)", count: levelStats.complex },
    ];
  }, [moduleKeys]);

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
  }, [currentModuleKey, levelsToShow]);

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
        nextState = {
          ...st,
          attempts: nextAttempts,
          completed: true,
          correct: false,
          points: 0,
          feedbackText: `Salah. Jawaban benar: ${correctAnswerText}. ${q.explanation || ""}`,
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
      <nav>
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          English · Learning
        </a>
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          Kurikulum
        </a>
      </nav>

      <main className="question-bank page">
        <p className="level">Bank Soal · 58 Modul</p>
        <h1>Bank Soal Terintegrasi</h1>
        <p className="module-intro">
          Latihan pemahaman untuk semua 58 modul, dari basic hingga advanced. Setiap soal
          dilengkapi penjelasan dan petunjuk kesalahan. Skor disimpan otomatis dan ditampilkan di
          dashboard.
        </p>

        <section id="bankSelector" className="bank-selector">
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
        </section>

        <section id="bankOverview" className="bank-overview">
          <h2>Ringkasan Modul</h2>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Jumlah Modul</th>
                <th>Jumlah Soal</th>
                <th>Target Skor</th>
              </tr>
            </thead>
            <tbody id="bankSummaryBody">
              {summaryRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{moduleKeys.length}</td>
                  <td>{row.count}</td>
                  <td>80%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="bankContent" className="bank-content">
          {!currentMod ? (
            <p>Pilih modul dari daftar di atas untuk melihat soal.</p>
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

                return (
                  <section
                    key={`${currentModuleKey}-${levelKey}`}
                    className="bank-level-section"
                    id={`bank-${levelKey}`}
                  >
                    <h2>
                      {LEVEL_LABELS[levelKey]} · {currentMod.title}
                    </h2>
                    <form
                      className="bank-quiz"
                      id={`bankForm-${levelKey}`}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      {levelQuestions.map((q, i) => {
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
                            <legend>
                              {i + 1}. {q.prompt}
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
                                          ? { borderColor: "#000", background: "#f7f7f7" }
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
