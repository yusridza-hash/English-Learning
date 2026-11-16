import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CURRICULUM } from "../data/curriculum";
import { ModuleQuestion } from "../data/generatedModules";
import {
  ensureAllLevelsLoaded,
  ensureLevelLoaded,
  getModuleQuestionCountsAudit,
  QUESTION_BANK,
} from "../data/questionBank";
import {
  addErrorJournalEntry,
  ChallengeDifficultyMode,
  ChallengeRecordEntry,
  ChallengeScopeMode,
  ChallengeStats,
  formatRelativeTime,
  getChallengeHistory,
  getChallengeStats,
  getErrorJournal,
  getFavorites,
  getModuleMeta,
  getVocabLog,
  saveChallengeResult,
  SubLevelKey,
} from "../utils/storage";
import { GuidedQuestionItem, QuestionProgressState } from "./GuidedQuestionItem";
import { OfflineIndicator, PWAInstallButton } from "./PWAControls";
import { openModuleSidebar, SidebarToggleButton } from "./SidebarControls";
import { SpeakButton } from "./SpeakButton";
import { ThemeToggle } from "./ThemeToggle";
import { ViewportToggle } from "./ViewportToggle";
import {
  getQuestionSignature,
  pickNonRepeatingQuestions,
  shuffleArray,
  shuffleQuestionOptions,
} from "../utils/questionRandomizer";

interface ChallengeKnowledgeViewProps {
  onNavigate: (path: string) => void;
}

interface ChallengeQuestionItem {
  id: string;
  moduleKey: string;
  moduleTitle: string;
  levelTitle: string;
  subLevel: SubLevelKey;
  question: ModuleQuestion;
}

type ChallengePhase = "setup" | "active" | "results";

const DIFFICULTY_META: Record<
  ChallengeDifficultyMode,
  { title: string; subtitle: string; tagClass: string }
> = {
  simple: {
    title: "Simple",
    subtitle: "Pola inti, aturan dasar, dan pengenalan cepat",
    tagClass: "is-simple",
  },
  intermediate: {
    title: "Intermediate",
    subtitle: "Konteks kalimat, bentuk negatif/tanya & variasi",
    tagClass: "is-intermediate",
  },
  complex: {
    title: "Complex",
    subtitle: "Analisis konteks penuh, nuansa makna & jebakan umum",
    tagClass: "is-complex",
  },
  progressive: {
    title: "Mode Progresif",
    subtitle: "Naik bertahap dari Simple → Intermediate → Complex",
    tagClass: "is-progressive",
  },
};

const SUBLEVEL_LABELS: Record<SubLevelKey, string> = {
  simple: "Simple",
  intermediate: "Intermediate",
  complex: "Complex",
};

function formatDurationClock(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function buildQuestionAnswerText(q: ModuleQuestion): string {
  return Array.isArray(q.answer)
    ? q.answer.map((idx) => q.options[idx]).join(" ")
    : q.options[q.answer] || "";
}

function buildFullSentenceForJournal(q: ModuleQuestion): string {
  const answerText = buildQuestionAnswerText(q);
  if (q.prompt.includes("___")) {
    return q.prompt.replace("___", answerText);
  }
  if (q.dialogue && q.dialogue.length > 0) {
    const lastLine = q.dialogue[q.dialogue.length - 1][1];
    if (lastLine.includes("___")) {
      return lastLine.replace("___", answerText);
    }
  }
  return answerText;
}

export const ChallengeKnowledgeView: React.FC<ChallengeKnowledgeViewProps> = ({
  onNavigate,
}) => {
  const [phase, setPhase] = useState<ChallengePhase>("setup");
  const [difficultyMode, setDifficultyMode] = useState<ChallengeDifficultyMode>("progressive");
  const [scopeMode, setScopeMode] = useState<ChallengeScopeMode>("random-all");
  const [selectedLevelId, setSelectedLevelId] = useState<string>(CURRICULUM[0]?.id || "00-foundation");
  const [customModuleKeys, setCustomModuleKeys] = useState<string[]>([
    "00-foundation/01-parts-of-speech",
    "00-foundation/07-present-simple",
  ]);
  const [moduleSearch, setModuleSearch] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<10 | 20 | 30>(10);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);

  // Synced counts & records
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [vocabCount, setVocabCount] = useState<number>(() => getVocabLog().length);
  const [errorCount, setErrorCount] = useState<number>(() => getErrorJournal().length);
  const [stats, setStats] = useState<ChallengeStats>(() => getChallengeStats());
  const [history, setHistory] = useState<ChallengeRecordEntry[]>(() => getChallengeHistory());

  // Active challenge state
  const [activeItems, setActiveItems] = useState<ChallengeQuestionItem[]>([]);
  const [activeStates, setActiveStates] = useState<QuestionProgressState[]>([]);
  const [mistakeFlags, setMistakeFlags] = useState<boolean[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [sessionBestStreak, setSessionBestStreak] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [sessionTimeLimitSec, setSessionTimeLimitSec] = useState<number>(600);
  const [timedOut, setTimedOut] = useState<boolean>(false);
  const [confirmEndOpen, setConfirmEndOpen] = useState<boolean>(false);

  const [isStartingChallenge, setIsStartingChallenge] = useState<boolean>(false);
  const [challengeLoadError, setChallengeLoadError] = useState<string>("");

  // Result flags
  const [savedNotice, setSavedNotice] = useState<{
    isNewBestScore: boolean;
    isNewBestStreak: boolean;
  } | null>(null);
  const [batchSavedCount, setBatchSavedCount] = useState<number | null>(null);
  const [savedWrongIds, setSavedWrongIds] = useState<Record<string, boolean>>({});
  const resultSavedRef = useRef<boolean>(false);

  const syncStorage = useCallback(() => {
    setFavorites(getFavorites());
    setVocabCount(getVocabLog().length);
    setErrorCount(getErrorJournal().length);
    setStats(getChallengeStats());
    setHistory(getChallengeHistory());
  }, []);

  useEffect(() => {
    document.body.dataset.module = "challenge-knowledge";
    document.title = "Challenge Knowledge — English Learning";
    syncStorage();

    window.addEventListener("el_storage_sync", syncStorage);
    window.addEventListener("focus", syncStorage);
    return () => {
      window.removeEventListener("el_storage_sync", syncStorage);
      window.removeEventListener("focus", syncStorage);
    };
  }, [syncStorage]);

  const allCurriculumModules = useMemo(
    () =>
      CURRICULUM.flatMap((lvl) =>
        lvl.modules.map(([mod, title], idx) => ({
          key: `${lvl.id}/${mod}`,
          title,
          levelId: lvl.id,
          levelTitle: lvl.title,
          num: String(idx + 1).padStart(2, "0"),
        }))
      ),
    []
  );

  const targetModuleKeys = useMemo(() => {
    if (scopeMode === "favorites") {
      return favorites.filter((key) => Boolean(QUESTION_BANK[key]));
    }
    if (scopeMode === "level") {
      const lvl = CURRICULUM.find((l) => l.id === selectedLevelId);
      return lvl
        ? lvl.modules
            .map(([mod]) => `${lvl.id}/${mod}`)
            .filter((key) => Boolean(QUESTION_BANK[key]))
        : [];
    }
    if (scopeMode === "custom") {
      return customModuleKeys.filter((key) => Boolean(QUESTION_BANK[key]));
    }
    return Object.keys(QUESTION_BANK);
  }, [scopeMode, favorites, selectedLevelId, customModuleKeys]);

  const availablePoolCounts = useMemo(() => {
    let simple = 0;
    let intermediate = 0;
    let complex = 0;

    targetModuleKeys.forEach((key) => {
      const counts = getModuleQuestionCountsAudit(key);
      simple += counts.simple;
      intermediate += counts.intermediate;
      complex += counts.complex;
    });

    const total =
      difficultyMode === "simple"
        ? simple
        : difficultyMode === "intermediate"
        ? intermediate
        : difficultyMode === "complex"
        ? complex
        : simple + intermediate + complex;

    return { simple, intermediate, complex, total };
  }, [targetModuleKeys, difficultyMode]);

  const resolvedScopeLabel = useMemo(() => {
    if (scopeMode === "random-all") return "Acak Semua (58 Modul)";
    if (scopeMode === "favorites") return `Favorit (${targetModuleKeys.length} Modul)`;
    if (scopeMode === "level") {
      const lvl = CURRICULUM.find((l) => l.id === selectedLevelId);
      return lvl ? lvl.title : "Per Level";
    }
    return `${targetModuleKeys.length} Modul Pilihan`;
  }, [scopeMode, targetModuleKeys.length, selectedLevelId]);

  const filteredModulesForPicker = useMemo(() => {
    const q = moduleSearch.trim().toLowerCase();
    return CURRICULUM.map((lvl) => {
      const matched = lvl.modules
        .map(([mod, title], idx) => {
          const modKey = `${lvl.id}/${mod}`;
          const counts = getModuleQuestionCountsAudit(modKey);
          return {
            key: modKey,
            title,
            num: String(idx + 1).padStart(2, "0"),
            count: counts.simple + counts.intermediate + counts.complex,
          };
        })
        .filter((item) => {
          if (!q) return true;
          return (
            item.title.toLowerCase().includes(q) ||
            item.key.toLowerCase().includes(q) ||
            lvl.title.toLowerCase().includes(q)
          );
        });
      return { ...lvl, matched };
    }).filter((lvl) => lvl.matched.length > 0);
  }, [moduleSearch]);

  const buildChallengeSession = useCallback((): ChallengeQuestionItem[] => {
    const pickForSubLevel = (lvl: SubLevelKey, pickCount: number): ChallengeQuestionItem[] => {
      if (pickCount <= 0) return [];
      const items: ChallengeQuestionItem[] = [];
      targetModuleKeys.forEach((key) => {
        const bank = QUESTION_BANK[key];
        if (!bank) return;
        const meta = getModuleMeta(key);
        const qs = bank.levels[lvl] || [];
        qs.forEach((q, qIdx) => {
          items.push({
            id: `${key}-${lvl}-${qIdx}-${Math.random().toString(36).slice(2, 6)}`,
            moduleKey: key,
            moduleTitle: bank.title || meta.moduleTitle,
            levelTitle: meta.levelTitle,
            subLevel: lvl,
            question: shuffleQuestionOptions(q),
          });
        });
      });

      const poolId = `challenge::${scopeMode}::${lvl}`;
      return pickNonRepeatingQuestions(
        poolId,
        items,
        (item) => `${item.moduleKey}::${item.subLevel}::${getQuestionSignature(item.question)}`,
        pickCount
      );
    };

    if (difficultyMode !== "progressive") {
      return pickForSubLevel(difficultyMode, questionCount);
    }

    // Progressive mode: Simple -> Intermediate -> Complex
    const simplePoolCount = availablePoolCounts.simple;
    const interPoolCount = availablePoolCounts.intermediate;
    const complexPoolCount = availablePoolCounts.complex;
    const totalAvail = simplePoolCount + interPoolCount + complexPoolCount;
    const targetCount = Math.min(questionCount, totalAvail);
    if (targetCount === 0) return [];

    const simpleQuota = Math.min(simplePoolCount, Math.ceil(targetCount / 3));
    const complexQuota = Math.min(complexPoolCount, Math.floor(targetCount / 3));
    const interQuota = Math.min(interPoolCount, targetCount - simpleQuota - complexQuota);

    let combined = [
      ...pickForSubLevel("simple", simpleQuota),
      ...pickForSubLevel("intermediate", interQuota),
      ...pickForSubLevel("complex", complexQuota),
    ];

    if (combined.length < targetCount) {
      const pickedKeys = new Set(
        combined.map((i) => `${i.moduleKey}::${i.subLevel}::${getQuestionSignature(i.question)}`)
      );
      const fallbackNeeded = targetCount - combined.length;
      const extras: ChallengeQuestionItem[] = [];
      (["simple", "intermediate", "complex"] as SubLevelKey[]).forEach((lvl) => {
        const allCandidates = pickForSubLevel(lvl, questionCount).filter(
          (i) => !pickedKeys.has(`${i.moduleKey}::${i.subLevel}::${getQuestionSignature(i.question)}`)
        );
        extras.push(...allCandidates);
      });
      combined = [...combined, ...shuffleArray(extras).slice(0, fallbackNeeded)];
      const rank: Record<SubLevelKey, number> = { simple: 0, intermediate: 1, complex: 2 };
      combined.sort((a, b) => rank[a.subLevel] - rank[b.subLevel]);
    }

    return combined;
  }, [targetModuleKeys, scopeMode, difficultyMode, questionCount, availablePoolCounts]);

  const finishChallenge = useCallback(
    (finalStates: QuestionProgressState[], bestStreakVal: number, finalElapsedSec: number, wasTimeout = false) => {
      if (resultSavedRef.current || activeItems.length === 0) {
        setPhase("results");
        return;
      }
      resultSavedRef.current = true;

      const totalQ = activeItems.length;
      const earnedPoints = finalStates.reduce((acc, s) => acc + s.points, 0);
      const maxPoints = totalQ * 3;
      const correctCount = finalStates.filter((s) => s.correct).length;
      const scorePct = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;

      const accuracyByLevel: Partial<Record<SubLevelKey, { correct: number; total: number }>> = {};
      activeItems.forEach((item, idx) => {
        const st = finalStates[idx];
        const bucket = accuracyByLevel[item.subLevel] || { correct: 0, total: 0 };
        bucket.total += 1;
        if (st?.correct) bucket.correct += 1;
        accuracyByLevel[item.subLevel] = bucket;
      });

      const saved = saveChallengeResult({
        difficultyMode,
        scopeMode,
        scopeLabel: resolvedScopeLabel,
        questionCount: totalQ,
        timerEnabled,
        durationSec: finalElapsedSec,
        scorePct,
        earnedPoints,
        maxPoints,
        correctCount,
        bestStreak: bestStreakVal,
        accuracyByLevel,
      });

      setTimedOut(wasTimeout);
      setSavedNotice({
        isNewBestScore: saved.isNewBestScore,
        isNewBestStreak: saved.isNewBestStreak,
      });
      setStats(saved.nextStats);
      setHistory(getChallengeHistory());
      setPhase("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [activeItems, difficultyMode, scopeMode, resolvedScopeLabel, timerEnabled]
  );

  // Active timer loop
  useEffect(() => {
    if (phase !== "active") return;
    const timer = window.setInterval(() => {
      setElapsedSec((prev) => {
        const next = prev + 1;
        if (timerEnabled && next >= sessionTimeLimitSec) {
          window.clearInterval(timer);
          finishChallenge(activeStates, sessionBestStreak, next, true);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, timerEnabled, sessionTimeLimitSec, activeStates, sessionBestStreak, finishChallenge]);

  const handleStartChallenge = async () => {
    setIsStartingChallenge(true);
    setChallengeLoadError("");
    try {
      if (scopeMode === "random-all") {
        await ensureAllLevelsLoaded();
      } else if (scopeMode === "level") {
        await ensureLevelLoaded(selectedLevelId);
      } else {
        const levelIds = Array.from(
          new Set(targetModuleKeys.map((k) => k.split("/")[0]).filter(Boolean))
        );
        await Promise.all(levelIds.map((lvlId) => ensureLevelLoaded(lvlId)));
      }

      const picked = buildChallengeSession();
      if (picked.length === 0) return;

      resultSavedRef.current = false;
      setActiveItems(picked);
      setActiveStates(
        picked.map(() => ({
          attempts: 0,
          points: 0,
          correct: false,
          completed: false,
        }))
      );
      setMistakeFlags(picked.map(() => false));
      setActiveIdx(0);
      setCurrentStreak(0);
      setSessionBestStreak(0);
      setElapsedSec(0);
      setSessionTimeLimitSec(picked.length * 60);
      setTimedOut(false);
      setConfirmEndOpen(false);
      setSavedNotice(null);
      setBatchSavedCount(null);
      setSavedWrongIds({});
      setPhase("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setChallengeLoadError("Gagal memuat bank soal untuk cakupan ini. Silakan coba lagi.");
    } finally {
      setIsStartingChallenge(false);
    }
  };

  const handleUpdateQuestion = (idx: number, nextState: QuestionProgressState) => {
    const hadMistakeAlready = mistakeFlags[idx];
    let nextStreak = currentStreak;
    let nextBest = sessionBestStreak;

    if (!hadMistakeAlready && nextState.attempts > 0) {
      nextStreak = 0;
      setMistakeFlags((prev) => prev.map((v, i) => (i === idx ? true : v)));
    } else if (nextState.completed && nextState.correct && nextState.attempts === 0 && !hadMistakeAlready) {
      nextStreak = currentStreak + 1;
      if (nextStreak > nextBest) {
        nextBest = nextStreak;
      }
    } else if (nextState.completed && !nextState.correct) {
      nextStreak = 0;
    }

    setCurrentStreak(nextStreak);
    setSessionBestStreak(nextBest);

    setActiveStates((prev) => prev.map((s, i) => (i === idx ? nextState : s)));
    setErrorCount(getErrorJournal().length);
  };

  const handleToggleCustomModule = (key: string) => {
    setCustomModuleKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  // Derived metrics for Active & Results screens
  const completedCount = activeStates.filter((s) => s.completed).length;
  const correctCount = activeStates.filter((s) => s.correct).length;
  const earnedPoints = activeStates.reduce((acc, s) => acc + s.points, 0);
  const maxPoints = activeItems.length * 3;
  const scorePct = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;
  const allCompleted = activeItems.length > 0 && completedCount === activeItems.length;

  const remainingSec = Math.max(0, sessionTimeLimitSec - elapsedSec);
  const isTimerLow = timerEnabled && remainingSec <= 60;

  const wrongOrRetriedItems = useMemo(
    () =>
      activeItems
        .map((item, idx) => ({ item, idx, state: activeStates[idx] }))
        .filter(({ state }) => state && (state.attempts > 0 || !state.correct)),
    [activeItems, activeStates]
  );

  const levelBreakdown = useMemo(() => {
    const tiers: SubLevelKey[] = ["simple", "intermediate", "complex"];
    return tiers
      .map((tier) => {
        let total = 0;
        let correct = 0;
        let points = 0;
        activeItems.forEach((item, idx) => {
          if (item.subLevel === tier) {
            total += 1;
            const st = activeStates[idx];
            if (st?.correct) correct += 1;
            if (st) points += st.points;
          }
        });
        return {
          tier,
          label: SUBLEVEL_LABELS[tier],
          total,
          correct,
          pct: total > 0 ? Math.round((points / (total * 3)) * 100) : 0,
        };
      })
      .filter((row) => row.total > 0);
  }, [activeItems, activeStates]);

  const handleSaveSingleToJournal = (item: ChallengeQuestionItem) => {
    const added = addErrorJournalEntry({
      moduleKey: item.moduleKey,
      wrongSentence: item.question.draft || item.question.prompt,
      correctSentence: buildFullSentenceForJournal(item.question),
      ruleNote: item.question.explanation || `Perhatikan pola pada modul ${item.moduleTitle}.`,
    });
    setSavedWrongIds((prev) => ({ ...prev, [item.id]: true }));
    if (added) {
      setErrorCount(getErrorJournal().length);
    }
  };

  const handleSaveAllWrongToJournal = () => {
    let addedCount = 0;
    const marked: Record<string, boolean> = { ...savedWrongIds };
    wrongOrRetriedItems.forEach(({ item }) => {
      const added = addErrorJournalEntry({
        moduleKey: item.moduleKey,
        wrongSentence: item.question.draft || item.question.prompt,
        correctSentence: buildFullSentenceForJournal(item.question),
        ruleNote: item.question.explanation || `Perhatikan pola pada modul ${item.moduleTitle}.`,
      });
      if (added) addedCount += 1;
      marked[item.id] = true;
    });
    setSavedWrongIds(marked);
    setBatchSavedCount(addedCount);
    setErrorCount(getErrorJournal().length);
  };

  const activeItem = activeItems[activeIdx];
  const activeState = activeStates[activeIdx];

  return (
    <>
      <OfflineIndicator />
      <nav>
        <SidebarToggleButton />
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          ENGLISH · LEARNING
        </a>
        <a
          href="challenge-knowledge.html"
          className="is-nav-active"
          onClick={(e) => handleLinkClick(e, "challenge-knowledge.html")}
        >
          Challenge
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
        <div className="nav-utilities">
          <ViewportToggle />
          <PWAInstallButton />
          <ThemeToggle />
        </div>
      </nav>

      <main className="challenge-page">
        <div className="module-header-top">
          <p className="level">Arena Uji Mandiri · 58 Modul · Bank Soal Aktif</p>
          {phase !== "setup" && (
            <button
              type="button"
              className="filter-pill"
              onClick={() => setPhase("setup")}
            >
              ← Pengaturan Challenge
            </button>
          )}
        </div>
        <h1>Challenge Knowledge</h1>
        <p className="module-intro">
          Tantang pemahaman bahasa Inggrismu dari tingkat gampang hingga sulit. Pilih fokus modul,
          atur paket soal 10/20/30, bangun <b>streak beruntun</b>, dan simpan catatan kesalahan ke{" "}
          <b>Error Journal</b>.
        </p>

        {phase === "setup" && (
          <>
            <section className="challenge-records-strip" aria-label="Rekor Pribadi Challenge">
              <div className="stat-row challenge-stat-row-4">
                <div>
                  <span className="stat-label">Rekor Skor</span>
                  <span className="tabular-num">{stats.bestScorePct}%</span>
                </div>
                <div>
                  <span className="stat-label">Streak Terpanjang</span>
                  <span className="tabular-num">{stats.bestStreak} Beruntun</span>
                </div>
                <div>
                  <span className="stat-label">Total Sesi</span>
                  <span className="tabular-num">{stats.totalSessions}</span>
                </div>
                <div>
                  <span className="stat-label">Total Soal Dijawab</span>
                  <span className="tabular-num">{stats.totalAnswered}</span>
                </div>
              </div>
            </section>

            <div className="challenge-setup-grid">
              {/* Left Column: Difficulty, Count, Timer */}
              <section className="challenge-panel">
                <h2>1. Kelas Kesulitan &amp; Paket</h2>

                <div className="challenge-group">
                  <p className="challenge-label">Pilih Tingkat Kesulitan (Gampang → Sulit)</p>
                  <div className="challenge-option-grid">
                    {(
                      ["simple", "intermediate", "complex", "progressive"] as ChallengeDifficultyMode[]
                    ).map((mode) => {
                      const meta = DIFFICULTY_META[mode];
                      const active = difficultyMode === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          className={`challenge-choice-card ${meta.tagClass} ${active ? "is-selected" : ""}`}
                          aria-pressed={active}
                          onClick={() => setDifficultyMode(mode)}
                        >
                          <span className="challenge-choice-title">{meta.title}</span>
                          <span className="challenge-choice-sub">{meta.subtitle}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="challenge-group">
                  <p className="challenge-label">Jumlah Soal</p>
                  <div className="challenge-segmented-row">
                    {([10, 20, 30] as const).map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        className={`filter-pill challenge-seg-btn ${
                          questionCount === cnt ? "is-active" : ""
                        }`}
                        aria-pressed={questionCount === cnt}
                        onClick={() => setQuestionCount(cnt)}
                      >
                        {cnt} Soal
                      </button>
                    ))}
                  </div>
                </div>

                <div className="challenge-group">
                  <p className="challenge-label">Pengaturan Waktu (Opsional)</p>
                  <div className="challenge-segmented-row">
                    <button
                      type="button"
                      className={`filter-pill challenge-seg-btn ${!timerEnabled ? "is-active" : ""}`}
                      aria-pressed={!timerEnabled}
                      onClick={() => setTimerEnabled(false)}
                    >
                      Santai (Tanpa Batas)
                    </button>
                    <button
                      type="button"
                      className={`filter-pill challenge-seg-btn ${timerEnabled ? "is-active" : ""}`}
                      aria-pressed={timerEnabled}
                      onClick={() => setTimerEnabled(true)}
                    >
                      Timer Ujian ({questionCount} Menit)
                    </button>
                  </div>
                  <p className="challenge-helper-note">
                    {timerEnabled
                      ? `Mode ujian aktif: ${questionCount} menit (60 detik/soal) dengan peringatan 1 menit terakhir.`
                      : "Mode fokus santai: durasi tetap dicatat di statistik tanpa batas waktu."}
                  </p>
                </div>

                <div className="challenge-launch-box">
                  <div className="challenge-readiness">
                    <span>
                      Kesiapan Bank Soal: <b className="tabular-num">{availablePoolCounts.total}</b> soal
                      tersedia
                    </span>
                    <span className="challenge-readiness-sub">
                      Simple {availablePoolCounts.simple} · Intermediate{" "}
                      {availablePoolCounts.intermediate} · Complex {availablePoolCounts.complex}
                    </span>
                  </div>

                  {availablePoolCounts.total === 0 ? (
                    <p className="warn" style={{ marginBottom: ".75rem" }}>
                      {scopeMode === "favorites"
                        ? "Belum ada modul favorit. Tandai ☆ di Sidebar atau pilih fokus modul lain."
                        : "Belum ada soal pada filter yang dipilih. Pilih minimal 1 modul atau ubah cakupan."}
                    </p>
                  ) : availablePoolCounts.total < questionCount ? (
                    <p className="note" style={{ marginBottom: ".75rem" }}>
                      Catatan: Filter saat ini memiliki {availablePoolCounts.total} soal (dari target{" "}
                      {questionCount}). Sesi akan memakai seluruh {availablePoolCounts.total} soal yang
                      tersedia.
                    </p>
                  ) : null}

                  {challengeLoadError && (
                    <p className="warn" role="alert" style={{ marginBottom: ".75rem" }}>
                      {challengeLoadError}
                    </p>
                  )}

                  <button
                    type="button"
                    className="check-quiz challenge-start-btn"
                    disabled={availablePoolCounts.total === 0 || isStartingChallenge}
                    onClick={handleStartChallenge}
                  >
                    {isStartingChallenge
                      ? "Memuat Bank Soal Level..."
                      : `▸ Mulai Tantangan (${Math.min(questionCount, availablePoolCounts.total)} Soal) →`}
                  </button>
                </div>
              </section>

              {/* Right Column: Module Focus Selector */}
              <section className="challenge-panel">
                <h2>2. Fokus Cakupan Modul</h2>

                <div className="challenge-group">
                  <p className="challenge-label">Sumber Pertanyaan ({resolvedScopeLabel})</p>
                  <div className="challenge-scope-tabs">
                    <button
                      type="button"
                      className={`filter-pill ${scopeMode === "random-all" ? "is-active" : ""}`}
                      onClick={() => setScopeMode("random-all")}
                    >
                      Acak Semua (58)
                    </button>
                    <button
                      type="button"
                      className={`filter-pill ${scopeMode === "favorites" ? "is-active" : ""}`}
                      onClick={() => setScopeMode("favorites")}
                    >
                      Favorit ★ ({favorites.length})
                    </button>
                    <button
                      type="button"
                      className={`filter-pill ${scopeMode === "level" ? "is-active" : ""}`}
                      onClick={() => setScopeMode("level")}
                    >
                      Per Level
                    </button>
                    <button
                      type="button"
                      className={`filter-pill ${scopeMode === "custom" ? "is-active" : ""}`}
                      onClick={() => setScopeMode("custom")}
                    >
                      Pilih Multi-Modul ({customModuleKeys.length})
                    </button>
                  </div>
                </div>

                {scopeMode === "random-all" && (
                  <div className="lesson-lead-box">
                    Mengambil soal secara acak tanpa duplikasi dari seluruh <b>58 modul</b> (Foundation
                    hingga Advanced &amp; IELTS). Cocok untuk mengukur kesiapan menyeluruh.
                  </div>
                )}

                {scopeMode === "favorites" && (
                  <div className="lesson-lead-box">
                    {favorites.length === 0 ? (
                      <>
                        Kamu belum mem-pin modul favorit (★). Buka{" "}
                        <button
                          type="button"
                          className="tracker-text-action"
                          onClick={() => openModuleSidebar("all")}
                        >
                          ☰ Daftar Modul
                        </button>{" "}
                        lalu ketuk ikon <b>☆</b> untuk menandai modul fokusmu.
                      </>
                    ) : (
                      <>
                        Soal diambil khusus dari <b>{favorites.length} modul favorit</b> yang sudah
                        kamu pin:{" "}
                        {favorites
                          .slice(0, 6)
                          .map((k) => getModuleMeta(k).moduleTitle)
                          .join(" · ")}
                        {favorites.length > 6 ? ` · +${favorites.length - 6} lainnya` : ""}
                      </>
                    )}
                  </div>
                )}

                {scopeMode === "level" && (
                  <div className="challenge-group">
                    <label className="challenge-label" htmlFor="challengeLevelSelect">
                      Pilih Level Kurikulum
                    </label>
                    <select
                      id="challengeLevelSelect"
                      className="filter-level-select challenge-level-select"
                      value={selectedLevelId}
                      onChange={(e) => setSelectedLevelId(e.target.value)}
                    >
                      {CURRICULUM.map((lvl) => (
                        <option key={lvl.id} value={lvl.id}>
                          {lvl.title} ({lvl.ieltsBand} · {lvl.modules.length} modul)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {scopeMode === "custom" && (
                  <div className="challenge-picker-box">
                    <div className="challenge-picker-toolbar">
                      <input
                        type="search"
                        className="filter-search-input"
                        placeholder="Cari modul (mis. Past Simple, Conditional, IELTS)..."
                        value={moduleSearch}
                        onChange={(e) => setModuleSearch(e.target.value)}
                        aria-label="Cari modul untuk Challenge"
                      />
                      <div className="toolbar-actions">
                        <button
                          type="button"
                          className="filter-pill"
                          onClick={() => setCustomModuleKeys(allCurriculumModules.map((m) => m.key))}
                        >
                          Pilih Semua
                        </button>
                        <button
                          type="button"
                          className="filter-pill"
                          onClick={() => setCustomModuleKeys(favorites)}
                          disabled={favorites.length === 0}
                        >
                          Dari Favorit ★
                        </button>
                        <button
                          type="button"
                          className="filter-pill"
                          onClick={() => setCustomModuleKeys([])}
                        >
                          Kosongkan
                        </button>
                      </div>
                    </div>

                    <div className="challenge-module-checklist" role="group" aria-label="Daftar modul multi-pilih">
                      {filteredModulesForPicker.map((lvl) => (
                        <div key={lvl.id} className="challenge-picker-level">
                          <div className="challenge-picker-level-head">
                            <span>{lvl.title}</span>
                            <button
                              type="button"
                              className="tracker-text-action"
                              onClick={() => {
                                const lvlKeys = lvl.matched.map((m) => m.key);
                                const allIn = lvlKeys.every((k) => customModuleKeys.includes(k));
                                setCustomModuleKeys((prev) =>
                                  allIn
                                    ? prev.filter((k) => !lvlKeys.includes(k))
                                    : Array.from(new Set([...prev, ...lvlKeys]))
                                );
                              }}
                            >
                              {lvl.matched.every((m) => customModuleKeys.includes(m.key))
                                ? "Lepas level ini"
                                : "Pilih level ini"}
                            </button>
                          </div>
                          {lvl.matched.map((item) => {
                            const checked = customModuleKeys.includes(item.key);
                            return (
                              <label key={item.key} className="challenge-picker-row">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => handleToggleCustomModule(item.key)}
                                />
                                <span className="challenge-picker-name">
                                  <span className="tabular-num" style={{ color: "var(--muted)", marginRight: ".4rem" }}>
                                    {item.num}
                                  </span>
                                  {item.title}
                                </span>
                                <span className="challenge-picker-count tabular-num">
                                  {item.count} soal
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>

            <section>
              <h2>Riwayat Challenge Terakhir</h2>
              {history.length === 0 ? (
                <p className="empty">
                  Belum ada riwayat sesi Challenge. Selesaikan tantangan pertamamu untuk mencatat
                  rekor skor dan streak beruntun.
                </p>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Waktu</th>
                        <th>Mode &amp; Fokus</th>
                        <th>Skor</th>
                        <th>Benar</th>
                        <th>Streak</th>
                        <th>Durasi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item) => (
                        <tr key={item.id}>
                          <td className="tabular-num">{formatRelativeTime(item.playedAt)}</td>
                          <td>
                            <b>{DIFFICULTY_META[item.difficultyMode]?.title || item.difficultyMode}</b>
                            <div style={{ fontSize: ".8rem", color: "var(--muted)" }}>
                              {item.scopeLabel} · {item.questionCount} soal
                            </div>
                          </td>
                          <td className="tabular-num" style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>
                            {item.scorePct}%
                          </td>
                          <td className="tabular-num" style={{ fontFamily: "var(--mono)" }}>
                            {item.correctCount}/{item.questionCount}
                          </td>
                          <td className="tabular-num" style={{ fontFamily: "var(--mono)" }}>
                            {item.bestStreak}
                          </td>
                          <td className="tabular-num" style={{ fontFamily: "var(--mono)" }}>
                            {formatDurationClock(item.durationSec)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {phase === "active" && activeItem && activeState && (
          <section className="challenge-arena guided-learning">
            <div className="challenge-arena-bar">
              <div className="challenge-arena-metric">
                <span className="stat-label">Progres</span>
                <span className="tabular-num">
                  Soal {activeIdx + 1} / {activeItems.length} ({completedCount} selesai)
                </span>
              </div>

              <div className="challenge-arena-metric">
                <span className="stat-label">Tingkat Soal</span>
                <span className={`challenge-tier-tag is-${activeItem.subLevel}`}>
                  {SUBLEVEL_LABELS[activeItem.subLevel]}
                </span>
              </div>

              <div className="challenge-arena-metric">
                <span className="stat-label">Streak Beruntun</span>
                <span className="challenge-streak-value tabular-num">
                  {currentStreak} <small>(Terbaik sesi: {sessionBestStreak})</small>
                </span>
              </div>

              <div className="challenge-arena-metric">
                <span className="stat-label">Poin Sementara</span>
                <span className="tabular-num">
                  {earnedPoints} / {maxPoints}
                </span>
              </div>

              <div className="challenge-arena-metric">
                <span className="stat-label">{timerEnabled ? "Sisa Waktu" : "Durasi"}</span>
                <span
                  className={`challenge-timer-value tabular-num ${
                    isTimerLow ? "is-critical" : ""
                  }`}
                >
                  {timerEnabled
                    ? formatDurationClock(remainingSec)
                    : formatDurationClock(elapsedSec)}
                </span>
              </div>

              <div className="challenge-arena-actions">
                {!confirmEndOpen ? (
                  <button
                    type="button"
                    className="guided-reset"
                    onClick={() => setConfirmEndOpen(true)}
                  >
                    Akhiri Sesi
                  </button>
                ) : (
                  <div className="toolbar-actions">
                    <button
                      type="button"
                      className="check-quiz"
                      style={{ marginTop: 0, padding: ".35rem .75rem" }}
                      onClick={() => finishChallenge(activeStates, sessionBestStreak, elapsedSec, false)}
                    >
                      Ya, Selesaikan
                    </button>
                    <button
                      type="button"
                      className="guided-reset"
                      onClick={() => setConfirmEndOpen(false)}
                    >
                      Lanjut
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="progress-bar" aria-hidden="true">
              <span
                style={{
                  width: `${Math.round((completedCount / Math.max(1, activeItems.length)) * 100)}%`,
                }}
              />
            </div>

            <div className="quiz-step-dots" style={{ paddingLeft: 0, paddingRight: 0 }}>
              {activeItems.map((item, idx) => {
                const st = activeStates[idx];
                const stateClass = st?.completed
                  ? st.correct
                    ? "is-pass"
                    : "is-review"
                  : st && st.attempts > 0
                  ? "is-retry"
                  : "";
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`quiz-step-dot ${idx === activeIdx ? "is-current" : ""} ${stateClass}`}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Soal ${idx + 1} (${SUBLEVEL_LABELS[item.subLevel]})`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="challenge-question-context">
              <span>{activeItem.levelTitle}</span>
              <span aria-hidden="true">·</span>
              <b>{activeItem.moduleTitle}</b>
              <span aria-hidden="true">·</span>
              <span>Tahap {SUBLEVEL_LABELS[activeItem.subLevel]}</span>
            </div>

            {/* Keep all question items mounted so build tokens, hints, and feedback persist across navigation */}
            <div>
              {activeItems.map((item, idx) => (
                <div key={item.id} hidden={idx !== activeIdx}>
                  <GuidedQuestionItem
                    question={item.question}
                    questionIndex={idx}
                    state={activeStates[idx]}
                    onUpdateState={(next) => handleUpdateQuestion(idx, next)}
                    moduleKey={item.moduleKey}
                  />
                </div>
              ))}
            </div>

            <div className="quiz-step-nav">
              <button
                type="button"
                className="guided-reset"
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              >
                ← Sebelumnya
              </button>

              <div className="toolbar-actions">
                {activeIdx < activeItems.length - 1 ? (
                  <button
                    type="button"
                    className="check-quiz"
                    style={{ marginTop: 0 }}
                    onClick={() => setActiveIdx((prev) => Math.min(activeItems.length - 1, prev + 1))}
                  >
                    Soal Berikutnya →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="check-quiz"
                    style={{ marginTop: 0 }}
                    onClick={() =>
                      finishChallenge(activeStates, sessionBestStreak, elapsedSec, false)
                    }
                  >
                    ✓ Lihat Hasil Challenge →
                  </button>
                )}

                {allCompleted && activeIdx < activeItems.length - 1 && (
                  <button
                    type="button"
                    className="check-quiz"
                    style={{ marginTop: 0 }}
                    onClick={() =>
                      finishChallenge(activeStates, sessionBestStreak, elapsedSec, false)
                    }
                  >
                    ✓ Selesai &amp; Lihat Hasil
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {phase === "results" && (
          <section className="challenge-results">
            {(savedNotice?.isNewBestScore || savedNotice?.isNewBestStreak) && (
              <div className="challenge-record-banner" role="status">
                <b>★ Rekor Pribadi Baru Tercapai!</b>{" "}
                {savedNotice.isNewBestScore ? `Skor tertinggi baru (${scorePct}%). ` : ""}
                {savedNotice.isNewBestStreak
                  ? `Streak terpanjang baru (${sessionBestStreak} benar beruntun).`
                  : ""}
              </div>
            )}

            {timedOut && (
              <p className="warn" role="status">
                Waktu ujian telah berakhir. Jawaban yang sudah dikerjakan telah direkam.
              </p>
            )}

            <div className="stat-row challenge-stat-row-4">
              <div>
                <span className="stat-label">Skor Akhir</span>
                <span className="tabular-num">{scorePct}%</span>
              </div>
              <div>
                <span className="stat-label">Jawaban Benar</span>
                <span className="tabular-num">
                  {correctCount} / {activeItems.length}
                </span>
              </div>
              <div>
                <span className="stat-label">Streak Beruntun</span>
                <span className="tabular-num">{sessionBestStreak}</span>
              </div>
              <div>
                <span className="stat-label">Durasi</span>
                <span className="tabular-num">{formatDurationClock(elapsedSec)}</span>
              </div>
            </div>

            <div className="toolbar-actions" style={{ marginBottom: "1.5rem" }}>
              <button type="button" className="check-quiz" style={{ marginTop: 0 }} onClick={handleStartChallenge}>
                ↻ Tantang Lagi (Pengaturan Sama)
              </button>
              <button type="button" className="guided-reset" onClick={() => setPhase("setup")}>
                ⚙ Ubah Pengaturan Challenge
              </button>
              <button type="button" className="guided-reset" onClick={() => onNavigate("index.html")}>
                ← Kembali ke Dashboard
              </button>
            </div>

            <h2>Akurasi per Kelas Kesulitan</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Tingkat Soal</th>
                    <th>Benar</th>
                    <th>Total</th>
                    <th>Skor Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {levelBreakdown.map((row) => (
                    <tr key={row.tier}>
                      <td>
                        <span className={`challenge-tier-tag is-${row.tier}`}>{row.label}</span>
                      </td>
                      <td className="tabular-num" style={{ fontFamily: "var(--mono)" }}>
                        {row.correct}
                      </td>
                      <td className="tabular-num" style={{ fontFamily: "var(--mono)" }}>
                        {row.total}
                      </td>
                      <td className="tabular-num" style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>
                        {row.pct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tracker-section-head" style={{ marginTop: "2rem" }}>
              <h2>Evaluasi Jawaban &amp; Error Journal ({wrongOrRetriedItems.length})</h2>
              {wrongOrRetriedItems.length > 0 && (
                <button
                  type="button"
                  className="filter-pill"
                  onClick={handleSaveAllWrongToJournal}
                >
                  + Simpan Semua ke Error Journal
                </button>
              )}
            </div>

            {batchSavedCount !== null && (
              <p className="note" aria-live="polite">
                {batchSavedCount > 0
                  ? `${batchSavedCount} catatan baru ditambahkan ke Error Journal.`
                  : "Seluruh soal di bawah sudah tercatat di Error Journal."}
              </p>
            )}

            {wrongOrRetriedItems.length === 0 ? (
              <div className="lesson-lead-box">
                Sempurna! Semua soal pada sesi ini dijawab benar pada percobaan pertama tanpa
                kesalahan.
              </div>
            ) : (
              <div className="challenge-review-list">
                {wrongOrRetriedItems.map(({ item, idx, state }) => {
                  const correctFull = buildFullSentenceForJournal(item.question);
                  const isSaved = Boolean(savedWrongIds[item.id]);
                  return (
                    <article key={item.id} className="challenge-review-card">
                      <div className="challenge-review-meta">
                        <span>
                          Soal #{idx + 1} · {item.moduleTitle} ({SUBLEVEL_LABELS[item.subLevel]})
                        </span>
                        <span className="tabular-num">
                          {state.correct
                            ? `Benar setelah ${state.attempts} kesalahan`
                            : "Perlu dipelajari ulang"}
                        </span>
                      </div>
                      <p style={{ margin: "0 0 .35rem", fontWeight: 600 }}>{item.question.prompt}</p>
                      <p style={{ margin: "0 0 .35rem" }}>
                        <span className="lesson-status-tag is-right">Benar ✓</span>{" "}
                        <b>{correctFull}</b> <SpeakButton text={correctFull} label="Listen" />
                      </p>
                      {item.question.explanation && (
                        <p style={{ margin: "0 0 .6rem", color: "var(--muted)", fontSize: ".9rem" }}>
                          {item.question.explanation}
                        </p>
                      )}
                      <div className="toolbar-actions">
                        <button
                          type="button"
                          className="journal-save-btn"
                          disabled={isSaved}
                          onClick={() => handleSaveSingleToJournal(item)}
                        >
                          {isSaved ? "✓ Tersimpan di Error Journal" : "+ Simpan ke Error Journal"}
                        </button>
                        <button
                          type="button"
                          className="tracker-text-action"
                          onClick={() => onNavigate(`${item.moduleKey}.html#materi-${item.subLevel}`)}
                        >
                          Buka Materi Modul →
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
};
