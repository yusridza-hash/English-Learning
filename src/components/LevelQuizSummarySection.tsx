import React from "react";
import { QuestionProgressState } from "./GuidedQuestionItem";
import { LevelQuizModal, QuizLevelConfig, SkillGuideMap } from "./LevelQuizModal";

interface LevelQuizSummarySectionProps {
  moduleKey: string;
  moduleTitle: string;
  levels: QuizLevelConfig[];
  questionStates: QuestionProgressState[][];
  sessionSeed: number[];
  modalOpen: boolean;
  activeLevelIndex: number;
  skillGuide?: SkillGuideMap;
  fallbackSecondHint?: string;
  onOpenLevelModal: (levelIndex: number) => void;
  onCloseModal: () => void;
  onRandomizeLevel: (levelIndex: number) => void;
  onUpdateQuestionState: (
    levelIndex: number,
    questionIndex: number,
    nextState: QuestionProgressState
  ) => void;
  onJumpToMaterial: (anchorId: string) => void;
}

export const LevelQuizSummarySection: React.FC<LevelQuizSummarySectionProps> = ({
  moduleKey,
  moduleTitle,
  levels,
  questionStates,
  sessionSeed,
  modalOpen,
  activeLevelIndex,
  skillGuide = {},
  fallbackSecondHint,
  onOpenLevelModal,
  onCloseModal,
  onRandomizeLevel,
  onUpdateQuestionState,
  onJumpToMaterial,
}) => {
  const allStates = questionStates.flat();
  const totalCompleted = allStates.filter((q) => q?.completed).length;
  const totalEarned = allStates.reduce((sum, q) => sum + (q?.points || 0), 0);
  const allDone = allStates.length > 0 && totalCompleted === allStates.length;
  const finalScore = allDone ? Math.round((totalEarned / (allStates.length * 3)) * 100) : 0;

  return (
    <section className="guided-practice-area" id="latihan">
      <p className="level">Latihan setelah materi · Pop-up Interaktif &amp; Bank Soal</p>
      <h2>Uji Pemahaman per Level</h2>
      <p>
        Pilih level di bawah untuk membuka <b>Pop-up Kuis Fokus</b>. Setiap level terhubung ke{" "}
        <b>Bank Soal</b> dan dapat diacak ulang kapan saja agar urutan soal maupun pilihan jawaban
        selalu segar.
      </p>
      <p className="guided-quiz-progress" id="presentSimpleQuizProgress" aria-live="polite">
        Total Progress: {totalCompleted} dari {allStates.length} soal diperiksa
      </p>

      <div className="level-quiz-cards-grid">
        {levels.map((level, levelIndex) => {
          const lvlStates = questionStates[levelIndex] || [];
          const completedCount = lvlStates.filter((q) => q?.completed).length;
          const correctCount = lvlStates.filter((q) => q?.correct).length;
          const points = lvlStates.reduce((sum, q) => sum + (q?.points || 0), 0);
          const totalQ = level.questions.length;
          const isLevelDone = totalQ > 0 && completedCount === totalQ;
          const levelPct = totalQ > 0 ? Math.round((points / (totalQ * 3)) * 100) : 0;
          const levelPassed = isLevelDone && levelPct >= 80;

          const statusBadge = isLevelDone
            ? levelPassed
              ? `✓ LULUS (${levelPct}%)`
              : `· ULANGI (${levelPct}%)`
            : completedCount > 0
            ? `· PROSES (${completedCount}/${totalQ})`
            : `— BELUM (${totalQ} SOAL)`;

          return (
            <section
              key={level.key}
              className="level-quiz-card"
              id={level.quizId}
              data-state={isLevelDone ? (levelPassed ? "pass" : "retry") : undefined}
            >
              <div className="level-quiz-card-top">
                <div>
                  <p className="level" style={{ marginBottom: ".2rem" }}>
                    {level.label} · Variasi #{sessionSeed[levelIndex] + 1}
                  </p>
                  <h3 style={{ marginTop: 0, marginBottom: ".25rem" }}>{level.title}</h3>
                </div>
                <span className="level-quiz-badge">{statusBadge}</span>
              </div>

              <p style={{ fontSize: ".9rem", color: "var(--muted)", marginBottom: ".75rem" }}>
                {level.description}
              </p>

              {completedCount > 0 && (
                <p
                  className="guided-level-progress"
                  id={`progress-${level.key}`}
                  aria-live="polite"
                  style={{ marginBottom: ".75rem" }}
                >
                  {completedCount}/{totalQ} soal diperiksa · {correctCount} benar · {points}/
                  {totalQ * 3} poin ({levelPct}%)
                </p>
              )}

              <div className="toolbar-actions">
                <button
                  type="button"
                  className="check-quiz"
                  style={{ marginTop: 0 }}
                  onClick={() => onOpenLevelModal(levelIndex)}
                >
                  {completedCount === 0
                    ? `▸ Mulai Kuis ${level.title} (Pop-up)`
                    : isLevelDone
                    ? `▸ Lihat Hasil / Buka Pop-up ${level.title}`
                    : `▸ Lanjutkan Kuis ${level.title} (${completedCount}/${totalQ})`}
                </button>
                <button
                  type="button"
                  className="filter-pill"
                  onClick={() => {
                    onRandomizeLevel(levelIndex);
                    onOpenLevelModal(levelIndex);
                  }}
                  title="Acak ulang 10 soal dari Bank Soal untuk level ini lalu buka pop-up"
                >
                  ↻ Acak Soal Baru
                </button>
                <a
                  className="guided-shortcut"
                  style={{ margin: 0 }}
                  href={`#${level.materialId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onJumpToMaterial(level.materialId);
                  }}
                >
                  ← Materi {level.title}
                </a>
              </div>
            </section>
          );
        })}
      </div>

      <p
        className="guided-overall"
        id="presentSimpleOverall"
        aria-live="polite"
        data-state={allDone ? (finalScore >= 80 ? "pass" : "retry") : undefined}
      >
        {allDone
          ? `Skor akhir modul: ${finalScore}% (${totalEarned}/${allStates.length * 3} poin). ${
              finalScore >= 80
                ? "✓ LULUS. Nilai tersimpan di dashboard."
                : "Belum mencapai 80%. Gunakan tombol '↻ Acak Soal Baru' pada level yang masih lemah."
            }`
          : `Selesaikan ketiga level (Simple, Intermediate, Complex) melalui Pop-up untuk menyimpan skor akhir modul ke Dashboard (${totalCompleted}/${allStates.length} soal selesai).`}
      </p>

      <LevelQuizModal
        isOpen={modalOpen}
        moduleKey={moduleKey}
        moduleTitle={moduleTitle}
        levels={levels}
        activeLevelIndex={activeLevelIndex}
        questionStates={questionStates}
        sessionSeed={sessionSeed}
        skillGuide={skillGuide}
        fallbackSecondHint={fallbackSecondHint}
        onClose={onCloseModal}
        onSelectLevel={(idx) => onOpenLevelModal(idx)}
        onRandomizeLevel={onRandomizeLevel}
        onUpdateQuestionState={onUpdateQuestionState}
        onJumpToMaterial={(anchorId) => {
          onCloseModal();
          onJumpToMaterial(anchorId);
        }}
      />
    </section>
  );
};
