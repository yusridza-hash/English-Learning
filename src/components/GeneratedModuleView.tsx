import React, { useEffect, useMemo, useState } from "react";
import { GeneratedModuleContent } from "../data/generatedModules";
import { buildStages } from "../utils/stageBuilder";
import { getChecks, saveChecks, saveScore } from "../utils/storage";
import { GuidedQuestionItem, QuestionProgressState } from "./GuidedQuestionItem";

interface GeneratedModuleViewProps {
  moduleKey: string;
  content: GeneratedModuleContent;
  onNavigate: (path: string) => void;
}

export const GeneratedModuleView: React.FC<GeneratedModuleViewProps> = ({
  moduleKey,
  content,
  onNavigate,
}) => {
  const stages = useMemo(() => buildStages(moduleKey, content), [moduleKey, content]);

  const [checks, setChecks] = useState<boolean[]>(() => {
    const saved = getChecks()[moduleKey] || [];
    return content.checklist.map((_, idx) => Boolean(saved[idx]));
  });

  const [states, setStates] = useState<QuestionProgressState[][]>(() =>
    stages.map((stage) =>
      stage.questions.map(() => ({
        attempts: 0,
        points: 0,
        correct: false,
        completed: false,
      }))
    )
  );

  useEffect(() => {
    document.body.dataset.module = moduleKey;
    document.title = `${content.title} — English Learning`;
    const saved = getChecks()[moduleKey] || [];
    setChecks(content.checklist.map((_, idx) => Boolean(saved[idx])));
    setStates(
      stages.map((stage) =>
        stage.questions.map(() => ({
          attempts: 0,
          points: 0,
          correct: false,
          completed: false,
        }))
      )
    );
  }, [moduleKey, content, stages]);

  const handleCheckChange = (index: number, checked: boolean) => {
    const next = checks.map((val, i) => (i === index ? checked : val));
    setChecks(next);
    saveChecks(moduleKey, next);
  };

  const handleUpdateQuestionState = (
    levelIndex: number,
    questionIndex: number,
    nextState: QuestionProgressState
  ) => {
    setStates((prev) => {
      const next = prev.map((lvl, lIdx) =>
        lIdx === levelIndex
          ? lvl.map((qState, qIdx) => (qIdx === questionIndex ? nextState : qState))
          : lvl
      );

      const all = next.flat();
      const completed = all.filter((q) => q.completed).length;
      if (completed === all.length) {
        const earned = all.reduce((sum, q) => sum + q.points, 0);
        const score = Math.round((earned / (all.length * 3)) * 100);
        saveScore(moduleKey, score);
      }

      return next;
    });
  };

  const questionCount = stages.reduce((sum, stage) => sum + stage.questions.length, 0);
  const all = states.flat();
  const totalCompleted = all.filter((q) => q.completed).length;
  const totalEarned = all.reduce((sum, q) => sum + q.points, 0);
  const allDone = totalCompleted === all.length && all.length > 0;
  const finalScore = allDone ? Math.round((totalEarned / (all.length * 3)) * 100) : 0;

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

      <main className="module-page" id="generatedModule">
        <p className="level">
          {content.level} / {content.number}
        </p>
        <h1>{content.title}</h1>
        <p className="module-intro">{content.intro}</p>
        <p className="module-meta">
          <span>Fokus: {content.focus}</span>
          <span>3 tahap belajar</span>
          <span>{questionCount} soal</span>
          <span>Target: 80%</span>
        </p>

        <nav className="guided-jump" aria-label="Navigasi materi dan latihan">
          {stages.map((stage) => (
            <React.Fragment key={stage.key}>
              <a href={`#${stage.materialId}`}>Materi {stage.key}</a>
              <a href={`#${stage.quizId}`}>Kuis {stage.key}</a>
            </React.Fragment>
          ))}
        </nav>

        {stages.map((stage) => (
          <React.Fragment key={stage.key}>
            <p className="level">{stage.label}</p>
            <section className="lesson-stage" id={stage.materialId}>
              <h2>{stage.section.title}</h2>
              {stage.section.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
              {stage.section.examples?.map((example, eIdx) => (
                <p key={eIdx} className="example">
                  {example}
                </p>
              ))}
              {stage.section.rule && (
                <p className="rule">
                  <b>{stage.section.rule}</b>
                </p>
              )}
            </section>
            <a className="guided-shortcut" href={`#${stage.quizId}`}>
              Uji pemahaman {stage.key} →
            </a>
          </React.Fragment>
        ))}

        <section>
          <h2>Cek pemahaman</h2>
          <ul className="checklist">
            {content.checklist.map((item, idx) => (
              <li key={idx}>
                <label>
                  <input
                    type="checkbox"
                    data-check
                    checked={Boolean(checks[idx])}
                    onChange={(e) => handleCheckChange(idx, e.target.checked)}
                  />{" "}
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="guided-practice-area">
          <p className="level">Latihan setelah materi</p>
          <h2>Kuis bertahap</h2>
          <p id="generatedQuizProgress" className="guided-quiz-progress" aria-live="polite">
            {totalCompleted} dari {questionCount} soal diperiksa
          </p>

          <div id="generatedQuiz">
            {stages.map((stage, levelIndex) => {
              const stageStates = states[levelIndex] || [];
              const completed = stageStates.filter((q) => q.completed).length;
              const correct = stageStates.filter((q) => q.correct).length;
              const points = stageStates.reduce((sum, q) => sum + q.points, 0);
              const isStageDone = completed === stage.questions.length;
              const isStagePass = points >= stage.questions.length * 3 * 0.8;

              const skills = new Map<string, { correct: number; count: number }>();
              if (isStageDone) {
                stage.questions.forEach((question, qIdx) => {
                  const sk = question.skill || stage.key;
                  const tally = skills.get(sk) || { correct: 0, count: 0 };
                  tally.count += 1;
                  if (stageStates[qIdx]?.correct) tally.correct += 1;
                  skills.set(sk, tally);
                });
              }
              const weakSkills = [...skills.entries()].filter(
                ([, tally]) => tally.correct / tally.count < 0.8
              );

              return (
                <section
                  key={`${moduleKey}-${stage.key}`}
                  className="guided-question-level"
                  id={stage.quizId}
                >
                  <p className="level">
                    {stage.label} · {stage.questions.length} soal
                  </p>
                  <h3>{stage.key}: latihan dan feedback</h3>
                  <p>{content.focus}</p>
                  <p
                    className="guided-level-progress"
                    id={`generated-${stage.key}-progress`}
                    aria-live="polite"
                  >
                    {completed}/{stage.questions.length} soal diperiksa
                  </p>
                  <div className="guided-level-questions">
                    {stage.questions.map((question, qIdx) => (
                      <GuidedQuestionItem
                        key={`${moduleKey}-${stage.key}-${qIdx}`}
                        question={question}
                        questionIndex={qIdx}
                        state={
                          stageStates[qIdx] || {
                            attempts: 0,
                            points: 0,
                            correct: false,
                            completed: false,
                          }
                        }
                        onUpdateState={(nextState) =>
                          handleUpdateQuestionState(levelIndex, qIdx, nextState)
                        }
                      />
                    ))}
                  </div>
                  <div
                    className="guided-level-result"
                    id={`generated-${stage.key}-result`}
                    aria-live="polite"
                    data-state={isStageDone ? (isStagePass ? "pass" : "retry") : undefined}
                  >
                    {isStageDone && (
                      <>
                        <p>
                          Hasil {stage.key}: {correct}/{stage.questions.length} benar · {points}/
                          {stage.questions.length * 3} poin.
                        </p>
                        <p className="guided-skill-review">
                          {weakSkills.length > 0 ? (
                            <>
                              Topik untuk diulang:{" "}
                              {weakSkills.map(([skill, tally], idx) => {
                                const skillQuestion = stage.questions.find(
                                  (q) => q.skill === skill
                                );
                                const label = skillQuestion?.skillLabel || content.title;
                                const anchor = skillQuestion?.skillAnchor || stage.materialId;
                                return (
                                  <React.Fragment key={skill}>
                                    {idx > 0 && " · "}
                                    <a href={`#${anchor}`}>
                                      {label} ({tally.correct}/{tally.count})
                                    </a>
                                  </React.Fragment>
                                );
                              })}
                            </>
                          ) : (
                            "Semua topik di level ini sudah mencapai 80% atau lebih."
                          )}
                        </p>
                      </>
                    )}
                  </div>
                  <a className="guided-shortcut guided-back" href={`#${stage.materialId}`}>
                    ← Kembali ke materi {stage.key}
                  </a>
                </section>
              );
            })}
          </div>

          <p
            id="generatedQuizResult"
            className="guided-overall"
            aria-live="polite"
            data-state={allDone ? (finalScore >= 80 ? "pass" : "retry") : undefined}
          >
            {allDone
              ? `Skor akhir: ${finalScore}% (${totalEarned}/${all.length * 3} poin). ${
                  finalScore >= 80
                    ? "LULUS. Nilai tersimpan di dashboard."
                    : "Belum lulus. Pelajari topik yang ditandai lalu ulangi latihan."
                }`
              : ""}
          </p>
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
