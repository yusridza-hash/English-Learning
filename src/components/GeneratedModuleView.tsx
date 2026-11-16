import React, { useEffect, useMemo, useState } from "react";
import { GeneratedModuleContent } from "../data/generatedModules";
import { getStagePedagogy } from "../data/lessonEnrichment";
import { ensureModuleLoaded, isModuleLoaded, SKILL_GUIDE } from "../data/questionBank";
import { getRandomizedLevelQuestions } from "../utils/questionRandomizer";
import { buildStages } from "../utils/stageBuilder";
import {
  getChecks,
  parseModuleResumeHash,
  recordModuleHistory,
  saveChecks,
  saveScore,
  subLevelFromAnchor,
  SubLevelKey,
} from "../utils/storage";
import { QuestionProgressState } from "./GuidedQuestionItem";
import {
  LessonConceptCards,
  LessonExampleCard,
  LessonFormulaBox,
  LessonParagraphBlock,
  LessonStageMemoryFooter,
  RichText,
} from "./LessonRichContent";
import { QuizLevelConfig } from "./LevelQuizModal";
import { LevelQuizSummarySection } from "./LevelQuizSummarySection";
import { OfflineIndicator, PWAInstallButton } from "./PWAControls";
import { FavoriteModuleButton, SidebarToggleButton } from "./SidebarControls";
import { SpeakButton } from "./SpeakButton";
import { ThemeToggle } from "./ThemeToggle";
import { ViewportToggle } from "./ViewportToggle";

interface GeneratedModuleViewProps {
  moduleKey: string;
  content: GeneratedModuleContent;
  onNavigate: (path: string) => void;
}

const STAGE_TITLES: Record<"simple" | "intermediate" | "complex", string> = {
  simple: "Simple",
  intermediate: "Intermediate",
  complex: "Complex",
};

export const GeneratedModuleView: React.FC<GeneratedModuleViewProps> = ({
  moduleKey,
  content,
  onNavigate,
}) => {
  const [bankReadyVersion, setBankReadyVersion] = useState<number>(0);
  const [bankLoading, setBankLoading] = useState<boolean>(() => !isModuleLoaded(moduleKey));
  const [bankLoadError, setBankLoadError] = useState<string>("");

  const baseStages = useMemo(
    () => buildStages(moduleKey, content),
    [moduleKey, content, bankReadyVersion]
  );

  const buildRandomizedConfig = (stagesToUse = baseStages): QuizLevelConfig[] =>
    stagesToUse.map((stage) => ({
      key: stage.key,
      label: stage.label,
      title: STAGE_TITLES[stage.key],
      description: `${content.focus} — tahap ${STAGE_TITLES[stage.key]}.`,
      materialId: stage.materialId,
      quizId: stage.quizId,
      questions: getRandomizedLevelQuestions(moduleKey, stage.key, stage.questions, 10),
    }));

  const [checks, setChecks] = useState<boolean[]>(() => {
    const saved = getChecks()[moduleKey] || [];
    return content.checklist.map((_, idx) => Boolean(saved[idx]));
  });

  const [writingDraft, setWritingDraft] = useState<string>("");
  const [quizLevels, setQuizLevels] = useState<QuizLevelConfig[]>(() => buildRandomizedConfig());
  const [sessionSeed, setSessionSeed] = useState<number[]>([0, 0, 0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);

  const [states, setStates] = useState<QuestionProgressState[][]>(() =>
    quizLevels.map((stage) =>
      stage.questions.map(() => ({
        attempts: 0,
        points: 0,
        correct: false,
        completed: false,
      }))
    )
  );

  const loadModuleBank = (cancelledCheck?: () => boolean) => {
    if (isModuleLoaded(moduleKey)) {
      setBankLoading(false);
      setBankLoadError("");
      return;
    }
    setBankLoading(true);
    setBankLoadError("");
    ensureModuleLoaded(moduleKey)
      .then(() => {
        if (cancelledCheck?.()) return;
        const freshStages = buildStages(moduleKey, content);
        const freshLevels = buildRandomizedConfig(freshStages);
        setBankReadyVersion((v) => v + 1);
        setStates((prevStates) => {
          const hasStarted = prevStates.flat().some((s) => s.attempts > 0 || s.completed);
          if (hasStarted) return prevStates;
          setQuizLevels(freshLevels);
          return freshLevels.map((stage) =>
            stage.questions.map(() => ({
              attempts: 0,
              points: 0,
              correct: false,
              completed: false,
            }))
          );
        });
        setBankLoading(false);
      })
      .catch(() => {
        if (cancelledCheck?.()) return;
        setBankLoading(false);
        setBankLoadError("Gagal memuat bank soal penuh level ini. Cek koneksi atau muat ulang.");
      });
  };

  useEffect(() => {
    document.body.dataset.module = moduleKey;
    document.title = `${content.title} — English Learning`;
    const saved = getChecks()[moduleKey] || [];
    setChecks(content.checklist.map((_, idx) => Boolean(saved[idx])));
    setWritingDraft("");

    const freshStages = buildStages(moduleKey, content);
    const freshLevels = buildRandomizedConfig(freshStages);
    setQuizLevels(freshLevels);
    setStates(
      freshLevels.map((stage) =>
        stage.questions.map(() => ({
          attempts: 0,
          points: 0,
          correct: false,
          completed: false,
        }))
      )
    );
    setSessionSeed([0, 0, 0]);

    let cancelled = false;
    loadModuleBank(() => cancelled);

    const applyResumeState = () => {
      const parsed = parseModuleResumeHash(window.location.hash);
      recordModuleHistory({
        moduleKey,
        moduleTitle: content.title,
        levelTitle: content.level,
        activityType: parsed.activityType,
        subLevel: parsed.subLevel,
        anchorId: parsed.anchorId,
      });
      if (parsed.openQuizModal) {
        setActiveLevelIndex(parsed.levelIndex);
        setModalOpen(true);
      } else {
        setModalOpen(false);
        setActiveLevelIndex(0);
      }
    };

    applyResumeState();
    window.addEventListener("el_route_change", applyResumeState);
    return () => {
      cancelled = true;
      window.removeEventListener("el_route_change", applyResumeState);
    };
  }, [moduleKey, content]);

  const handleCheckChange = (index: number, checked: boolean) => {
    const next = checks.map((val, i) => (i === index ? checked : val));
    setChecks(next);
    saveChecks(moduleKey, next);
  };

  const handleOpenLevelModal = async (levelIndex: number) => {
    const levelKey: SubLevelKey = baseStages[levelIndex]?.key || "simple";
    recordModuleHistory({
      moduleKey,
      moduleTitle: content.title,
      levelTitle: content.level,
      activityType: "quiz",
      subLevel: levelKey,
      anchorId: `latihan-${levelKey}`,
    });
    if (!isModuleLoaded(moduleKey)) {
      await ensureModuleLoaded(moduleKey).catch(() => undefined);
      setBankReadyVersion((v) => v + 1);
    }
    setActiveLevelIndex(levelIndex);
    setModalOpen(true);
  };

  const handleRandomizeLevel = async (levelIndex: number) => {
    await ensureModuleLoaded(moduleKey).catch(() => undefined);
    const freshStages = buildStages(moduleKey, content);
    const baseStage = freshStages[levelIndex];
    if (!baseStage) return;
    const newQuestions = getRandomizedLevelQuestions(
      moduleKey,
      baseStage.key,
      baseStage.questions,
      10
    );

    setQuizLevels((prev) =>
      prev.map((lvl, idx) => (idx === levelIndex ? { ...lvl, questions: newQuestions } : lvl))
    );
    setStates((prev) =>
      prev.map((lvlStates, idx) =>
        idx === levelIndex
          ? newQuestions.map(() => ({
              attempts: 0,
              points: 0,
              correct: false,
              completed: false,
            }))
          : lvlStates
      )
    );
    setSessionSeed((prev) => prev.map((s, idx) => (idx === levelIndex ? s + 1 : s)));
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
      if (completed === all.length && all.length > 0) {
        const earned = all.reduce((sum, q) => sum + q.points, 0);
        const score = Math.round((earned / (all.length * 3)) * 100);
        saveScore(moduleKey, score);
      }

      return next;
    });
  };

  const handleJumpToMaterial = (anchorId: string) => {
    recordModuleHistory({
      moduleKey,
      moduleTitle: content.title,
      levelTitle: content.level,
      activityType: "material",
      subLevel: subLevelFromAnchor(anchorId),
      anchorId,
    });
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          Kurikulum
        </a>
        <a href="challenge-knowledge.html" onClick={(e) => handleLinkClick(e, "challenge-knowledge.html")}>
          Challenge
        </a>
        <a href="word-choice-bank.html" onClick={(e) => handleLinkClick(e, "word-choice-bank.html")}>
          Word Bank
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

      <main className="module-page guided-learning" id="generatedModule">
        <div className="module-header-top">
          <p className="level">
            {content.level} / {content.number}
          </p>
          <FavoriteModuleButton moduleKey={moduleKey} />
        </div>
        <h1>{content.title}</h1>
        <p className="module-intro">{content.intro}</p>
        <p className="module-meta">
          <span>Fokus: {content.focus}</span>
          <span>3 tahap belajar</span>
          <span>Latihan: Pop-up 30 soal (Acak Bank Soal)</span>
          <span>Target: 80%</span>
        </p>

        <nav className="guided-jump" aria-label="Navigasi materi dan latihan">
          {baseStages.map((stage, idx) => (
            <React.Fragment key={stage.key}>
              <a
                href={`#${stage.materialId}`}
                onClick={() =>
                  recordModuleHistory({
                    moduleKey,
                    moduleTitle: content.title,
                    levelTitle: content.level,
                    activityType: "material",
                    subLevel: stage.key,
                    anchorId: stage.materialId,
                  })
                }
              >
                Materi {STAGE_TITLES[stage.key]}
              </a>
              <a
                href={`#${stage.quizId}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenLevelModal(idx);
                }}
              >
                ▸ Pop-up Kuis {STAGE_TITLES[stage.key]}
              </a>
            </React.Fragment>
          ))}
        </nav>

        {baseStages.map((stage, idx) => {
          const pedagogy = getStagePedagogy({
            moduleKey,
            stageKey: stage.key,
            moduleTitle: content.title,
            focus: content.focus,
            existingRule: stage.section.rule,
          });
          const formulaToDisplay = pedagogy.formula || stage.section.rule;

          return (
            <React.Fragment key={stage.key}>
              <p className="level">{stage.label}</p>
              <section className="lesson-stage guided-lesson" id={stage.materialId}>
                <h2>{stage.section.title}</h2>

                {pedagogy.introLead && (
                  <p className="lesson-lead-box">
                    <RichText text={pedagogy.introLead} />
                  </p>
                )}

                {pedagogy.concepts && pedagogy.concepts.length > 0 ? (
                  <LessonConceptCards concepts={pedagogy.concepts} />
                ) : (
                  stage.section.paragraphs.map((paragraph, pIdx) => (
                    <LessonParagraphBlock key={pIdx} text={paragraph} />
                  ))
                )}

                {stage.section.examples && stage.section.examples.length > 0 && (
                  <div className="lesson-examples-block">
                    <p className="lesson-sublabel">Contoh &amp; Pemakaian Kalimat</p>
                    {stage.section.examples.map((example, eIdx) => (
                      <LessonExampleCard key={eIdx} example={example} />
                    ))}
                  </div>
                )}

                {formulaToDisplay && (
                  <LessonFormulaBox formula={formulaToDisplay} note={pedagogy.formulaNote} />
                )}

                <LessonStageMemoryFooter pedagogy={pedagogy} hideFormula />

                <div className="toolbar-actions" style={{ marginTop: ".9rem" }}>
                  <button
                    type="button"
                    className="check-quiz"
                    style={{ marginTop: 0 }}
                    onClick={() => handleOpenLevelModal(idx)}
                  >
                    ▸ Uji Pemahaman {STAGE_TITLES[stage.key]} (Pop-up) →
                  </button>
                </div>
              </section>
            </React.Fragment>
          );
        })}

        {bankLoading && (
          <p className="note" role="status" aria-live="polite">
            Memuat bank soal level ini (100+ soal per tingkat)...
          </p>
        )}
        {bankLoadError && (
          <div className="warn" role="alert" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span>{bankLoadError}</span>
            <button type="button" className="filter-pill" onClick={() => loadModuleBank()}>
              ↻ Coba Muat Ulang
            </button>
          </div>
        )}

        <LevelQuizSummarySection
          moduleKey={moduleKey}
          moduleTitle={content.title}
          levels={quizLevels}
          questionStates={states}
          sessionSeed={sessionSeed}
          modalOpen={modalOpen}
          activeLevelIndex={activeLevelIndex}
          skillGuide={SKILL_GUIDE}
          onOpenLevelModal={handleOpenLevelModal}
          onCloseModal={() => setModalOpen(false)}
          onRandomizeLevel={handleRandomizeLevel}
          onUpdateQuestionState={handleUpdateQuestionState}
          onJumpToMaterial={handleJumpToMaterial}
        />

        <section className="guided-mission">
          <p className="level">Refleksi mandiri</p>
          <h2>Terapkan dalam kalimat nyata</h2>
          <p>
            Tulis 2–3 kalimat menggunakan pola <b>{content.title}</b> ({content.focus}), lalu
            centang daftar pemahaman di bawah ini.
          </p>
          <label className="guided-writing-label" htmlFor="generatedWriting">
            Latihan menulis mandiri
          </label>
          <textarea
            id="generatedWriting"
            rows={4}
            value={writingDraft}
            onChange={(e) => setWritingDraft(e.target.value)}
            placeholder={`Tulis contoh kalimat dengan ${content.title}...`}
          />
          {writingDraft.trim() && (
            <div style={{ marginTop: ".5rem" }}>
              <SpeakButton text={writingDraft} label="Dengarkan Tulisanmu" />
            </div>
          )}
          <fieldset className="guided-selfcheck">
            <legend>Cek pemahaman</legend>
            {content.checklist.map((item, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  data-check
                  checked={Boolean(checks[idx])}
                  onChange={(e) => handleCheckChange(idx, e.target.checked)}
                />{" "}
                {item}
              </label>
            ))}
          </fieldset>
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
