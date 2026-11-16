import React, { useEffect, useState } from "react";
import { getStagePedagogy } from "../data/lessonEnrichment";
import { PILOT_SKILL_GUIDE, PRESENT_SIMPLE_LEVELS } from "../data/presentSimplePilot";
import { getRandomizedLevelQuestions } from "../utils/questionRandomizer";
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
import { LessonStageMemoryFooter } from "./LessonRichContent";
import { QuizLevelConfig } from "./LevelQuizModal";
import { LevelQuizSummarySection } from "./LevelQuizSummarySection";
import { OfflineIndicator, PWAInstallButton } from "./PWAControls";
import { FavoriteModuleButton, SidebarToggleButton } from "./SidebarControls";
import { SpeakButton } from "./SpeakButton";
import { ThemeToggle } from "./ThemeToggle";
import { ViewportToggle } from "./ViewportToggle";

interface PresentSimplePilotViewProps {
  onNavigate: (path: string) => void;
}

const MODULE_KEY = "00-foundation/07-present-simple";

function buildPilotQuizLevels(): QuizLevelConfig[] {
  return PRESENT_SIMPLE_LEVELS.map((lvl, idx) => ({
    key: lvl.key,
    label: `0${idx + 1} · ${lvl.title}`,
    title: lvl.title,
    description: lvl.description,
    materialId: `materi-${lvl.key}`,
    quizId: `latihan-${lvl.key}`,
    questions: getRandomizedLevelQuestions(MODULE_KEY, lvl.key, lvl.questions, 10),
  }));
}

export const PresentSimplePilotView: React.FC<PresentSimplePilotViewProps> = ({ onNavigate }) => {
  const [checks, setChecks] = useState<boolean[]>(() => {
    const saved = getChecks()[MODULE_KEY] || [];
    return [Boolean(saved[0]), Boolean(saved[1]), Boolean(saved[2])];
  });

  const [quizLevels, setQuizLevels] = useState<QuizLevelConfig[]>(() => buildPilotQuizLevels());
  const [sessionSeed, setSessionSeed] = useState<number[]>([0, 0, 0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);

  const [questionStates, setQuestionStates] = useState<QuestionProgressState[][]>(() =>
    quizLevels.map((level) =>
      level.questions.map(() => ({
        attempts: 0,
        points: 0,
        correct: false,
        completed: false,
      }))
    )
  );

  const [writingDraft, setWritingDraft] = useState<string>("");

  useEffect(() => {
    document.body.dataset.module = MODULE_KEY;
    document.title = "Present Simple — English Learning";

    const applyResumeState = () => {
      const parsed = parseModuleResumeHash(window.location.hash);
      recordModuleHistory({
        moduleKey: MODULE_KEY,
        moduleTitle: "Present Simple",
        levelTitle: "Level 0 · Foundation",
        activityType: parsed.activityType,
        subLevel: parsed.subLevel,
        anchorId: parsed.anchorId,
      });
      if (parsed.openQuizModal) {
        setActiveLevelIndex(parsed.levelIndex);
        setModalOpen(true);
      }
    };

    applyResumeState();
    window.addEventListener("el_route_change", applyResumeState);
    return () => window.removeEventListener("el_route_change", applyResumeState);
  }, []);

  const handleCheckChange = (index: number, checked: boolean) => {
    const next = checks.map((val, i) => (i === index ? checked : val));
    setChecks(next);
    saveChecks(MODULE_KEY, next);
  };

  const handleOpenLevelModal = (levelIndex: number) => {
    const subLevel: SubLevelKey =
      PRESENT_SIMPLE_LEVELS[levelIndex]?.key || "simple";
    recordModuleHistory({
      moduleKey: MODULE_KEY,
      moduleTitle: "Present Simple",
      levelTitle: "Level 0 · Foundation",
      activityType: "quiz",
      subLevel,
      anchorId: `latihan-${subLevel}`,
    });
    setActiveLevelIndex(levelIndex);
    setModalOpen(true);
  };

  const handleRandomizeLevel = (levelIndex: number) => {
    const baseLevel = PRESENT_SIMPLE_LEVELS[levelIndex];
    if (!baseLevel) return;
    const newQuestions = getRandomizedLevelQuestions(
      MODULE_KEY,
      baseLevel.key,
      baseLevel.questions,
      10
    );

    setQuizLevels((prev) =>
      prev.map((lvl, idx) => (idx === levelIndex ? { ...lvl, questions: newQuestions } : lvl))
    );
    setQuestionStates((prev) =>
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
    setQuestionStates((prev) => {
      const next = prev.map((lvl, lIdx) =>
        lIdx === levelIndex
          ? lvl.map((qState, qIdx) => (qIdx === questionIndex ? nextState : qState))
          : lvl
      );

      const allStates = next.flat();
      const completedCount = allStates.filter((q) => q.completed).length;
      if (completedCount === allStates.length && allStates.length > 0) {
        const earned = allStates.reduce((sum, q) => sum + q.points, 0);
        const score = Math.round((earned / (allStates.length * 3)) * 100);
        saveScore(MODULE_KEY, score);
      }

      return next;
    });
  };

  const handleJumpToMaterial = (anchorId: string) => {
    recordModuleHistory({
      moduleKey: MODULE_KEY,
      moduleTitle: "Present Simple",
      levelTitle: "Level 0 · Foundation",
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

  const trackMaterialAnchor = (subLevel: SubLevelKey, anchorId: string) => {
    recordModuleHistory({
      moduleKey: MODULE_KEY,
      moduleTitle: "Present Simple",
      levelTitle: "Level 0 · Foundation",
      activityType: "material",
      subLevel,
      anchorId,
    });
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

      <main className="module-page guided-learning">
        <div className="module-header-top">
          <p className="level">Level 0 · Foundation / 07</p>
          <FavoriteModuleButton moduleKey={MODULE_KEY} />
        </div>
        <h1>Present Simple</h1>
        <p className="module-intro">
          Pelajari bentuk, fungsi, dan pilihan tense-nya. Materi bergerak dari kalimat dasar ke
          percakapan dan konteks yang lebih kompleks.
        </p>
        <div className="guided-context">
          <b>Situasi</b>
          <p>Hari pertamamu di kantor baru. Rekan kerja bertanya tentang rutinitas kerjamu.</p>
        </div>
        <p className="module-meta">
          <span>Materi: 3 level</span>
          <span>Latihan: Pop-up 30 soal (Acak Bank Soal)</span>
          <span>Target: 80%</span>
        </p>

        <nav className="guided-jump" aria-label="Navigasi materi dan latihan">
          <a href="#materi-simple" onClick={() => trackMaterialAnchor("simple", "materi-simple")}>
            Materi Simple
          </a>
          <a
            href="#materi-intermediate"
            onClick={() => trackMaterialAnchor("intermediate", "materi-intermediate")}
          >
            Materi Intermediate
          </a>
          <a href="#materi-complex" onClick={() => trackMaterialAnchor("complex", "materi-complex")}>
            Materi Complex
          </a>
          <a
            href="#latihan-simple"
            onClick={(e) => {
              e.preventDefault();
              handleOpenLevelModal(0);
            }}
          >
            ▸ Pop-up Kuis Simple
          </a>
          <a
            href="#latihan-intermediate"
            onClick={(e) => {
              e.preventDefault();
              handleOpenLevelModal(1);
            }}
          >
            ▸ Pop-up Kuis Intermediate
          </a>
          <a
            href="#latihan-complex"
            onClick={(e) => {
              e.preventDefault();
              handleOpenLevelModal(2);
            }}
          >
            ▸ Pop-up Kuis Complex
          </a>
        </nav>

        <section className="guided-lesson" id="materi-simple">
          <p className="level">01 · Simple</p>
          <h2>Bentuk dasar: kebiasaan, fakta, dan keadaan</h2>
          <p>
            Present Simple dipakai untuk hal yang berulang, fakta umum, keadaan yang relatif tetap,
            dan jadwal. Kalimat positif biasanya memakai bentuk dasar verb. Untuk{" "}
            <b>he, she, it</b> atau satu orang/benda, verb umumnya mendapat <b>-s</b> atau{" "}
            <b>-es</b>.
          </p>
          <h3>1. Rutinitas dan kebiasaan</h3>
          <p>
            Gunakan Present Simple untuk aktivitas yang dilakukan berulang. Keterangan waktu seperti{" "}
            <i>every day</i>, <i>on weekdays</i>, dan <i>once a week</i> sering memperjelas
            kebiasaan.
          </p>
          <p className="guided-example">
            <b>I check customer messages every morning.</b>{" "}
            <SpeakButton text="I check customer messages every morning." />
            <br />
            <span>Aku memeriksa pesan pelanggan setiap pagi.</span>
          </p>
          <p className="guided-example">
            <b>Mira checks the sales report before the meeting.</b>{" "}
            <SpeakButton text="Mira checks the sales report before the meeting." />
            <br />
            <span>Mira memeriksa laporan penjualan sebelum rapat.</span>
          </p>
          <h3>2. Fakta dan keadaan</h3>
          <p>
            Gunakan tense ini untuk fakta umum dan keadaan yang tidak dianggap sementara. Verb
            seperti <i>know, like, need, own</i>, dan <i>understand</i> biasanya tidak dipakai dalam
            bentuk continuous.
          </p>
          <p className="guided-example">
            <b>Water boils at 100°C at sea level.</b>{" "}
            <SpeakButton text="Water boils at 100 degrees Celsius at sea level." />
            <br />
            <span>Air mendidih pada suhu 100°C di permukaan laut.</span>
          </p>
          <p className="guided-example">
            <b>Our office has two meeting rooms.</b>{" "}
            <SpeakButton text="Our office has two meeting rooms." />
            <br />
            <span>Kantor kami memiliki dua ruang rapat.</span>
          </p>
          <h3 id="materi-third-person">3. Rumus kalimat positif</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Bentuk verb</th>
                  <th>Contoh</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>I / you / we / they</td>
                  <td>verb dasar</td>
                  <td>
                    They <b>prepare</b> the orders.
                  </td>
                </tr>
                <tr>
                  <td>he / she / it / noun tunggal</td>
                  <td>verb + s/es</td>
                  <td>
                    The team <b>prepares</b> the orders.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 id="materi-verb-spelling">4. Ejaan untuk he, she, it</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Pola</th>
                  <th>Perubahan</th>
                  <th>Contoh</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kebanyakan verb</td>
                  <td>+ s</td>
                  <td>read → reads; plan → plans</td>
                </tr>
                <tr>
                  <td>Akhiran -s, -sh, -ch, -x, -o</td>
                  <td>+ es</td>
                  <td>watch → watches; go → goes</td>
                </tr>
                <tr>
                  <td>Konsonan + y</td>
                  <td>y → ies</td>
                  <td>study → studies; carry → carries</td>
                </tr>
                <tr>
                  <td>Vokal + y</td>
                  <td>+ s</td>
                  <td>play → plays; enjoy → enjoys</td>
                </tr>
                <tr>
                  <td>Bentuk khusus</td>
                  <td>irregular</td>
                  <td>have → has; do → does</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="guided-rule">
            <b>She studies English, but her colleagues study Indonesian.</b> Periksa subject sebelum
            mengubah ejaan verb.
          </p>
          <LessonStageMemoryFooter
            pedagogy={getStagePedagogy({
              moduleKey: MODULE_KEY,
              stageKey: "simple",
              moduleTitle: "Present Simple",
              focus: "rutinitas, fakta, akhiran -s/-es",
            })}
          />
          <div className="toolbar-actions" style={{ marginTop: ".9rem" }}>
            <button
              type="button"
              className="check-quiz"
              style={{ marginTop: 0 }}
              onClick={() => handleOpenLevelModal(0)}
            >
              ▸ Uji Pemahaman Simple (Pop-up) →
            </button>
          </div>
        </section>

        <section className="guided-lesson" id="materi-intermediate">
          <p className="level">02 · Intermediate</p>
          <h2>Negatif, pertanyaan, dan informasi tambahan</h2>
          <p>
            Untuk main verb biasa, gunakan <b>do</b> atau <b>does</b> sebagai auxiliary. Setelah{" "}
            <i>does</i> atau <i>doesn&apos;t</i>, main verb kembali ke bentuk dasar karena penanda
            orang ketiga sudah ada pada auxiliary.
          </p>
          <h3 id="materi-do-does-negative">1. Kalimat negatif</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Rumus</th>
                  <th>Contoh</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>I / you / we / they</td>
                  <td>do not + verb dasar</td>
                  <td>
                    We <b>don&apos;t work</b> on Sundays.
                  </td>
                </tr>
                <tr>
                  <td>he / she / it</td>
                  <td>does not + verb dasar</td>
                  <td>
                    Rina <b>doesn&apos;t drive</b> to work.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <i>Do not</i> dan <i>does not</i> dapat disingkat menjadi <i>don&apos;t</i> dan{" "}
            <i>doesn&apos;t</i>.
          </p>
          <p className="guided-example">
            <span className="guided-error">✗</span> He doesn&apos;t <i>checks</i> the schedule.
            <br />
            <b>✓ He doesn&apos;t check the schedule.</b>{" "}
            <SpeakButton text="He doesn't check the schedule." />
          </p>
          <h3 id="materi-do-does-question">2. Pertanyaan yes/no dan jawaban singkat</h3>
          <p>
            Letakkan <b>do/does</b> sebelum subject. Gunakan verb dasar setelah subject.
          </p>
          <p className="guided-example">
            <b>Do you review the orders every morning?</b>{" "}
            <SpeakButton text="Do you review the orders every morning? Yes, I do." />
            <br />
            <span>Yes, I do. / No, I don&apos;t.</span>
          </p>
          <p className="guided-example">
            <b>Does Niko work on Sundays?</b>{" "}
            <SpeakButton text="Does Niko work on Sundays? No, he doesn't." />
            <br />
            <span>Yes, he does. / No, he doesn&apos;t.</span>
          </p>
          <h3>3. Pertanyaan dengan kata tanya</h3>
          <p>
            Letakkan <i>what, where, when, how often</i>, atau <i>why</i> di depan do/does.
          </p>
          <p className="guided-example">
            <b>What time does the store open?</b> · <b>Where do your colleagues eat lunch?</b>
          </p>
          <h3 id="materi-frequency">4. Adverbs of frequency</h3>
          <p>
            Kata frekuensi memberi tahu seberapa sering sesuatu terjadi. Urutan umumnya dari sering
            ke tidak pernah: <i>always, usually, often, sometimes, rarely, never</i>.
          </p>
          <ul>
            <li>
              Sebelum main verb: <b>We usually meet on Monday.</b>
            </li>
            <li>
              Sesudah verb <i>be</i>: <b>The office is often quiet after lunch.</b>
            </li>
            <li>
              Sesudah auxiliary pertama: <b>She doesn&apos;t usually drive to work.</b>
            </li>
          </ul>
          <p className="guided-rule">
            <b>Does your manager usually start early?</b> ·{" "}
            <b>My manager doesn&apos;t usually start early.</b>
          </p>
          <LessonStageMemoryFooter
            pedagogy={getStagePedagogy({
              moduleKey: MODULE_KEY,
              stageKey: "intermediate",
              moduleTitle: "Present Simple",
              focus: "kalimat negatif dan tanya do/does",
            })}
          />
          <div className="toolbar-actions" style={{ marginTop: ".9rem" }}>
            <button
              type="button"
              className="check-quiz"
              style={{ marginTop: 0 }}
              onClick={() => handleOpenLevelModal(1)}
            >
              ▸ Uji Pemahaman Intermediate (Pop-up) →
            </button>
          </div>
        </section>

        <section className="guided-lesson" id="materi-complex">
          <p className="level">03 · Complex</p>
          <h2>Pilih tense dari konteks dan maksud</h2>
          <p>
            Untuk memilih tense dengan tepat, tanyakan: apakah ini kebiasaan, jadwal, fakta, atau
            kegiatan yang sedang berlangsung sekarang? Present Simple dan Present Continuous kadang
            muncul bersama karena menjelaskan waktu yang berbeda.
          </p>
          <h3 id="materi-routine-vs-now">1. Rutinitas dibanding kegiatan saat ini</h3>
          <p className="guided-example">
            <b>Nadia usually works from home, but today she is working at the office.</b>{" "}
            <SpeakButton text="Nadia usually works from home, but today she is working at the office." />
            <br />
            <span>
              Kebiasaan: <i>usually works</i>. Situasi sementara hari ini: <i>is working</i>.
            </span>
          </p>
          <p>
            Jangan memilih Present Continuous hanya karena suatu aktivitas berlangsung pada waktu
            tertentu. Jika itu jadwal atau pola berulang, Present Simple lebih sesuai.
          </p>
          <h3 id="materi-schedules-stative">2. Jadwal dan acara terencana</h3>
          <p>
            Jadwal resmi, jam operasional, dan waktu transportasi sering memakai Present Simple
            meskipun waktunya akan datang.
          </p>
          <p className="guided-example">
            <b>The first train leaves at 6:20 tomorrow morning.</b>{" "}
            <SpeakButton text="The first train leaves at 6:20 tomorrow morning." />
            <br />
            <span>Kereta pertama berangkat pukul 6:20 besok pagi. Ini jadwal tetap.</span>
          </p>
          <h3>3. Stative verbs</h3>
          <p>
            Verb yang menyatakan pikiran, perasaan, kepemilikan, atau kebutuhan biasanya memakai
            Present Simple saat maknanya berupa keadaan.
          </p>
          <p className="guided-example">
            <b>I understand the instructions, and I need one more copy.</b>{" "}
            <SpeakButton text="I understand the instructions, and I need one more copy." />
          </p>
          <p className="guided-example">
            <span className="guided-error">✗</span> I am understanding the instructions.
            <br />
            <b>✓ I understand the instructions.</b>
          </p>
          <h3>4. Baca konteks secara utuh</h3>
          <p>
            Dalam email kerja, satu paragraf dapat memadukan kebiasaan, fakta, dan pengecualian
            sementara. Periksa petunjuk waktu dan arti setiap klausa, bukan hanya satu kata.
          </p>
          <p className="guided-example">
            <b>
              Our support team answers calls until six. This week, two agents are covering the
              evening shift.
            </b>{" "}
            <SpeakButton text="Our support team answers calls until six. This week, two agents are covering the evening shift." />
            <br />
            <span>
              Aturan umum memakai <i>answers</i>; pengaturan sementara minggu ini memakai{" "}
              <i>are covering</i>.
            </span>
          </p>
          <p className="guided-rule">
            <b>Rutinitas, fakta, keadaan, atau jadwal → Present Simple.</b>
            <br />
            <b>Kegiatan sementara yang sedang berlangsung → Present Continuous.</b>
          </p>
          <LessonStageMemoryFooter
            pedagogy={getStagePedagogy({
              moduleKey: MODULE_KEY,
              stageKey: "complex",
              moduleTitle: "Present Simple",
              focus: "rutinitas vs sementara dan stative verbs",
            })}
          />
          <div className="toolbar-actions" style={{ marginTop: ".9rem" }}>
            <button
              type="button"
              className="check-quiz"
              style={{ marginTop: 0 }}
              onClick={() => handleOpenLevelModal(2)}
            >
              ▸ Uji Pemahaman Complex (Pop-up) →
            </button>
          </div>
        </section>

        <LevelQuizSummarySection
          moduleKey={MODULE_KEY}
          moduleTitle="Present Simple"
          levels={quizLevels}
          questionStates={questionStates}
          sessionSeed={sessionSeed}
          modalOpen={modalOpen}
          activeLevelIndex={activeLevelIndex}
          skillGuide={PILOT_SKILL_GUIDE}
          fallbackSecondHint="Periksa lagi agreement subject-verb dan posisi auxiliary."
          onOpenLevelModal={handleOpenLevelModal}
          onCloseModal={() => setModalOpen(false)}
          onRandomizeLevel={handleRandomizeLevel}
          onUpdateQuestionState={handleUpdateQuestionState}
          onJumpToMaterial={handleJumpToMaterial}
        />

        <section className="guided-mission">
          <p className="level">Refleksi mandiri</p>
          <h2>Ceritakan rutinitasmu</h2>
          <p>
            Tulis tiga kalimat untuk memperkenalkan hari kerjamu. Setelah selesai, tandai hal yang
            sudah kamu pahami.
          </p>
          <label className="guided-writing-label" htmlFor="guidedWriting">
            Perkenalan singkat
          </label>
          <textarea
            id="guidedWriting"
            rows={5}
            value={writingDraft}
            onChange={(e) => setWritingDraft(e.target.value)}
            placeholder="I start work at ... I usually ... My colleague ..."
          />
          {writingDraft.trim() && (
            <div style={{ marginTop: ".5rem" }}>
              <SpeakButton text={writingDraft} label="Dengarkan Tulisanmu" />
            </div>
          )}
          <fieldset className="guided-selfcheck">
            <legend>Cek pemahaman</legend>
            <label>
              <input
                type="checkbox"
                data-check
                checked={checks[0]}
                onChange={(e) => handleCheckChange(0, e.target.checked)}
              />{" "}
              Aku bisa memilih bentuk verb untuk I dan he/she/it.
            </label>
            <label>
              <input
                type="checkbox"
                data-check
                checked={checks[1]}
                onChange={(e) => handleCheckChange(1, e.target.checked)}
              />{" "}
              Aku bisa membentuk pertanyaan atau negatif dengan do/does.
            </label>
            <label>
              <input
                type="checkbox"
                data-check
                checked={checks[2]}
                onChange={(e) => handleCheckChange(2, e.target.checked)}
              />{" "}
              Aku bisa memakai frequency adverb pada posisi yang tepat.
            </label>
          </fieldset>
        </section>

        <footer className="footer-link">
          <a
            href="00-foundation/04-articles.html"
            onClick={(e) => handleLinkClick(e, "00-foundation/04-articles.html")}
          >
            ← Articles
          </a>
          <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
            Kembali ke kurikulum →
          </a>
        </footer>
      </main>
    </>
  );
};
