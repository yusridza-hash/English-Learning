import React, { useEffect, useState } from "react";
import { LegacyModuleData } from "../data/legacyModules";
import { getStagePedagogy } from "../data/lessonEnrichment";
import { QUESTION_BANK, SKILL_GUIDE } from "../data/questionBank";
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

interface LegacyModuleViewProps {
  data: LegacyModuleData;
  onNavigate: (path: string) => void;
}

type LevelKey = "simple" | "intermediate" | "complex";
const LEVEL_KEYS: LevelKey[] = ["simple", "intermediate", "complex"];
const LEVEL_META: Record<LevelKey, { num: string; title: string; desc: string }> = {
  simple: {
    num: "01",
    title: "Simple",
    desc: "Pola dasar, bentuk inti, dan identifikasi kalimat.",
  },
  intermediate: {
    num: "02",
    title: "Intermediate",
    desc: "Negatif, pertanyaan, perubahan konteks, dan struktur lanjutan.",
  },
  complex: {
    num: "03",
    title: "Complex",
    desc: "Aplikasi konteks nyata, penyuntingan kalimat, dan pilihan makna.",
  },
};

function buildLegacyQuizLevels(moduleKey: string): QuizLevelConfig[] {
  const qb = QUESTION_BANK[moduleKey];
  return LEVEL_KEYS.map((lvlKey) => {
    const meta = LEVEL_META[lvlKey];
    const baseQs = qb?.levels?.[lvlKey] || [];
    return {
      key: lvlKey,
      label: `${meta.num} · ${meta.title}`,
      title: meta.title,
      description: meta.desc,
      materialId: `materi-${lvlKey}`,
      quizId: `latihan-${lvlKey}`,
      questions: getRandomizedLevelQuestions(moduleKey, lvlKey, baseQs, 10),
    };
  });
}

export const LegacyModuleView: React.FC<LegacyModuleViewProps> = ({ data, onNavigate }) => {
  const [checks, setChecks] = useState<boolean[]>(() => {
    const saved = getChecks()[data.key] || [];
    return data.checklist.map((_, idx) => Boolean(saved[idx]));
  });

  const [writingDraft, setWritingDraft] = useState<string>("");
  const [quizLevels, setQuizLevels] = useState<QuizLevelConfig[]>(() =>
    buildLegacyQuizLevels(data.key)
  );
  const [sessionSeed, setSessionSeed] = useState<number[]>([0, 0, 0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);

  const [questionStates, setQuestionStates] = useState<QuestionProgressState[][]>(() =>
    quizLevels.map((lvl) =>
      lvl.questions.map(() => ({
        attempts: 0,
        points: 0,
        correct: false,
        completed: false,
      }))
    )
  );

  useEffect(() => {
    document.body.dataset.module = data.key;
    document.title = `${data.title} — English Learning`;
    const savedChecks = getChecks()[data.key] || [];
    setChecks(data.checklist.map((_, idx) => Boolean(savedChecks[idx])));
    setWritingDraft("");
    const initialLevels = buildLegacyQuizLevels(data.key);
    setQuizLevels(initialLevels);
    setSessionSeed([0, 0, 0]);
    setQuestionStates(
      initialLevels.map((lvl) =>
        lvl.questions.map(() => ({
          attempts: 0,
          points: 0,
          correct: false,
          completed: false,
        }))
      )
    );

    const applyResumeState = () => {
      const parsed = parseModuleResumeHash(window.location.hash);
      recordModuleHistory({
        moduleKey: data.key,
        moduleTitle: data.title,
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
    return () => window.removeEventListener("el_route_change", applyResumeState);
  }, [data]);

  const handleCheckChange = (index: number, checked: boolean) => {
    const next = checks.map((val, i) => (i === index ? checked : val));
    setChecks(next);
    saveChecks(data.key, next);
  };

  const handleOpenLevelModal = (levelIndex: number) => {
    const subLevel: SubLevelKey = LEVEL_KEYS[levelIndex] || "simple";
    recordModuleHistory({
      moduleKey: data.key,
      moduleTitle: data.title,
      activityType: "quiz",
      subLevel,
      anchorId: `latihan-${subLevel}`,
    });
    setActiveLevelIndex(levelIndex);
    setModalOpen(true);
  };

  const handleRandomizeLevel = (levelIndex: number) => {
    const lvlKey = LEVEL_KEYS[levelIndex];
    if (!lvlKey) return;
    const baseQs = QUESTION_BANK[data.key]?.levels?.[lvlKey] || [];
    const newQuestions = getRandomizedLevelQuestions(data.key, lvlKey, baseQs, 10);

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
      if (allStates.length > 0 && completedCount === allStates.length) {
        const earned = allStates.reduce((sum, q) => sum + q.points, 0);
        const score = Math.round((earned / (allStates.length * 3)) * 100);
        saveScore(data.key, score);
      }

      return next;
    });
  };

  const handleJumpToMaterial = (anchorId: string) => {
    recordModuleHistory({
      moduleKey: data.key,
      moduleTitle: data.title,
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
      moduleKey: data.key,
      moduleTitle: data.title,
      activityType: "material",
      subLevel,
      anchorId,
    });
  };

  const renderPopUpTrigger = (levelIndex: number, title: string) => {
    const stageKey: SubLevelKey = LEVEL_KEYS[levelIndex] || "simple";
    const pedagogy = getStagePedagogy({
      moduleKey: data.key,
      stageKey,
      moduleTitle: data.title,
      focus: data.title,
    });
    return (
      <>
        <LessonStageMemoryFooter pedagogy={pedagogy} />
        <div className="toolbar-actions" style={{ marginTop: ".9rem" }}>
          <button
            type="button"
            className="check-quiz"
            style={{ marginTop: 0 }}
            onClick={() => handleOpenLevelModal(levelIndex)}
          >
            ▸ Uji Pemahaman {title} (Pop-up) →
          </button>
        </div>
      </>
    );
  };

  const renderMaterialSections = () => {
    switch (data.key) {
      case "00-foundation/04-articles":
        return (
          <>
            <section className="guided-lesson" id="materi-simple">
              <p className="level">01 · Simple</p>
              <h2>1. A atau an: satu benda, belum spesifik</h2>
              <p>
                Gunakan <b>a/an</b> untuk kata benda tunggal yang dapat dihitung ketika pendengar
                belum tahu benda yang mana. Pilih berdasarkan <b>bunyi awal</b>, bukan huruf awal.
              </p>
              <div className="columns">
                <div>
                  <h3>A + bunyi konsonan</h3>
                  <p className="example">
                    a <b>book</b> · a <b>university</b> · a <b>European</b> city{" "}
                    <SpeakButton text="a book, a university, a European city" />
                  </p>
                  <p className="note">University dan European diawali bunyi /y/.</p>
                </div>
                <div>
                  <h3>An + bunyi vokal</h3>
                  <p className="example">
                    an <b>apple</b> · an <b>hour</b> · an <b>honest</b> answer{" "}
                    <SpeakButton text="an apple, an hour, an honest answer" />
                  </p>
                  <p className="note">Pada hour dan honest, huruf h tidak dibunyikan.</p>
                </div>
              </div>
              <p className="rule">
                I saw <b>a dog</b> in the park. Seekor anjing, belum diketahui yang mana.{" "}
                <SpeakButton text="I saw a dog in the park." />
              </p>
              {renderPopUpTrigger(0, "Simple")}
            </section>
            <section className="guided-lesson" id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. The: benda yang spesifik</h2>
              <p>
                Gunakan <b>the</b> saat benda sudah disebut, konteksnya jelas, atau hanya ada satu
                yang dimaksud.
              </p>
              <p className="example">
                I saw <b>a dog</b>. <b>The dog</b> was chasing a ball.{" "}
                <SpeakButton text="I saw a dog. The dog was chasing a ball." />
              </p>
              <p className="example">
                Please close <b>the door</b>. (Kita tahu pintu yang dimaksud.){" "}
                <SpeakButton text="Please close the door." />
              </p>
              <p className="example">
                <b>The sun</b> is bright today. (Unik dalam konteks.){" "}
                <SpeakButton text="The sun is bright today." />
              </p>
              {renderPopUpTrigger(1, "Intermediate")}
            </section>
            <section className="guided-lesson" id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Tanpa article atau article tertentu</h2>
              <p>
                Jangan gunakan article untuk kata benda jamak atau tak terhitung saat
                membicarakannya secara umum. Gunakan <b>the</b> kembali ketika noun menjadi spesifik
                karena konteks atau klausa penjelas.
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Umum</th>
                      <th>Spesifik</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Books are useful. <SpeakButton text="Books are useful." />
                      </td>
                      <td>
                        The books on my desk are new.{" "}
                        <SpeakButton text="The books on my desk are new." />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Water is important. <SpeakButton text="Water is important." />
                      </td>
                      <td>
                        The water in this bottle is cold.{" "}
                        <SpeakButton text="The water in this bottle is cold." />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="example">
                We received <b>feedback</b> after the workshop. <b>The feedback we received</b> was
                useful.{" "}
                <SpeakButton text="We received feedback after the workshop. The feedback we received was useful." />
              </p>
              <p className="note">
                Kata tak terhitung seperti information, advice, dan furniture tidak memakai a/an
                secara langsung.
              </p>
              {renderPopUpTrigger(2, "Complex")}
            </section>
          </>
        );

      case "01-elementary/01-past-simple":
        return (
          <>
            <section className="guided-lesson" id="materi-simple">
              <p className="level">01 · Simple</p>
              <h2>1. Kalimat positif</h2>
              <p>
                Untuk kata kerja beraturan, umumnya tambahkan <b>-ed</b>. Kata kerja tidak beraturan
                memiliki bentuk khusus.
              </p>
              <div className="columns">
                <div>
                  <h3>Regular verbs</h3>
                  <p className="example">
                    work → <b>worked</b> · live → <b>lived</b> · study → <b>studied</b>{" "}
                    <SpeakButton text="worked, lived, studied" />
                  </p>
                </div>
                <div>
                  <h3>Irregular verbs</h3>
                  <p className="example">
                    go → <b>went</b> · see → <b>saw</b> · buy → <b>bought</b>{" "}
                    <SpeakButton text="went, saw, bought" />
                  </p>
                </div>
              </div>
              <p className="rule">
                We <b>visited</b> our grandparents last weekend. Bentuk lampau sama untuk semua
                subjek. <SpeakButton text="We visited our grandparents last weekend." />
              </p>
              {renderPopUpTrigger(0, "Simple")}
            </section>
            <section className="guided-lesson" id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. Negatif dan pertanyaan</h2>
              <p>
                Gunakan <b>did not (didn&apos;t)</b> atau <b>did</b> untuk semua subjek. Setelahnya,
                pakai kata kerja bentuk dasar.
              </p>
              <p className="example">
                She <b>didn&apos;t go</b> to class yesterday. (Bukan <i>didn&apos;t went</i>.){" "}
                <SpeakButton text="She didn't go to class yesterday." />
              </p>
              <p className="example">
                <b>Did</b> you <b>see</b> the message? — Yes, I did. / No, I didn&apos;t.{" "}
                <SpeakButton text="Did you see the message? Yes, I did." />
              </p>
              <p className="note">
                Kata kerja be berbeda: I/he/she/it <b>was</b>; you/we/they <b>were</b>. Negatifnya
                wasn&apos;t/weren&apos;t; pertanyaannya Was/Were di depan subjek.
              </p>
              {renderPopUpTrigger(1, "Intermediate")}
            </section>
            <section className="guided-lesson" id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Penanda waktu dan urutan cerita</h2>
              <p>
                Penanda waktu seperti yesterday, last night, two days ago, in 2020, dan when I was a
                child menunjukkan periode yang selesai.
              </p>
              <p className="example">
                They <b>moved</b> here in 2020. <b>Did</b> you call me yesterday?{" "}
                <SpeakButton text="They moved here in 2020. Did you call me yesterday?" />
              </p>
              <p className="example">
                The driver <b>missed</b> the turn, stopped near a station, and <b>asked</b> for
                directions.{" "}
                <SpeakButton text="The driver missed the turn, stopped near a station, and asked for directions." />
              </p>
              <p className="note">
                Dalam narasi, gunakan Past Simple untuk menyampaikan tindakan berurutan yang
                selesai.
              </p>
              {renderPopUpTrigger(2, "Complex")}
            </section>
          </>
        );

      case "02-intermediate/04-passive-basic":
        return (
          <>
            <section className="guided-lesson" id="materi-simple">
              <p className="level">01 · Simple</p>
              <h2>1. Mengubah fokus kalimat</h2>
              <p>
                Kalimat aktif menonjolkan pelaku; kalimat pasif menonjolkan benda/orang yang
                menerima tindakan.
              </p>
              <div className="columns">
                <div>
                  <h3>Active</h3>
                  <p>Subject + verb + object</p>
                  <p className="example">
                    <b>The chef</b> prepares <b>the meal</b>.{" "}
                    <SpeakButton text="The chef prepares the meal." />
                  </p>
                </div>
                <div>
                  <h3>Passive</h3>
                  <p>Object + be + V3 (+ by agent)</p>
                  <p className="example">
                    <b>The meal</b> is prepared (by the chef).{" "}
                    <SpeakButton text="The meal is prepared by the chef." />
                  </p>
                </div>
              </div>
              <p className="rule">
                Object pada kalimat aktif berpindah menjadi subject pasif. Pelaku dengan <b>by</b>{" "}
                bisa dihilangkan jika tidak diketahui atau tidak penting.
              </p>
              {renderPopUpTrigger(0, "Simple")}
            </section>
            <section className="guided-lesson" id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. Pilih be sesuai tense</h2>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Tense</th>
                      <th>Rumus pasif</th>
                      <th>Contoh</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Present Simple</td>
                      <td>am/is/are + V3</td>
                      <td>
                        The rooms <b>are cleaned</b> daily.{" "}
                        <SpeakButton text="The rooms are cleaned daily." />
                      </td>
                    </tr>
                    <tr>
                      <td>Past Simple</td>
                      <td>was/were + V3</td>
                      <td>
                        The bridge <b>was built</b> in 1990.{" "}
                        <SpeakButton text="The bridge was built in 1990." />
                      </td>
                    </tr>
                    <tr>
                      <td>Future (will)</td>
                      <td>will be + V3</td>
                      <td>
                        The results <b>will be announced</b> tomorrow.{" "}
                        <SpeakButton text="The results will be announced tomorrow." />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note">
                V3 kata kerja beraturan biasanya berakhiran -ed; kata kerja tidak beraturan punya
                bentuk khusus: make/made/made, write/wrote/written.
              </p>
              <p className="example">
                The technician checks each device. → Each device <b>is checked</b> before shipment.{" "}
                <SpeakButton text="Each device is checked before shipment." />
              </p>
              {renderPopUpTrigger(1, "Intermediate")}
            </section>
            <section className="guided-lesson" id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Pasif dalam laporan dan proses</h2>
              <p>
                Gunakan pasif ketika proses atau hasil lebih penting daripada pelaku, misalnya dalam
                laporan, berita, dan instruksi.
              </p>
              <p className="example">
                The package <b>was delivered</b> this morning. The test results{" "}
                <b>will be shared</b> with the client tomorrow.{" "}
                <SpeakButton text="The package was delivered this morning. The test results will be shared with the client tomorrow." />
              </p>
              <p className="example">
                English <b>is spoken</b> in many countries. (Pelakunya umum.){" "}
                <SpeakButton text="English is spoken in many countries." />
              </p>
              <p className="note">
                Tidak semua kata kerja cocok dijadikan pasif. Kata kerja tanpa object, seperti
                arrive atau sleep, umumnya tidak membentuk pasif.
              </p>
              {renderPopUpTrigger(2, "Complex")}
            </section>
          </>
        );

      case "03-upper-intermediate/03-conditionals-3-mixed":
        return (
          <>
            <section className="guided-lesson" id="materi-simple">
              <p className="level">01 · Simple</p>
              <h2>1. Third conditional</h2>
              <p>
                Gunakan untuk kondisi lampau yang tidak terjadi dan hasil lampau yang juga tidak
                terjadi.
              </p>
              <p className="rule">
                <b>If + past perfect, would have + past participle</b>
              </p>
              <p className="example">
                If we <b>had left</b> earlier, we <b>would have caught</b> the train.{" "}
                <SpeakButton text="If we had left earlier, we would have caught the train." />
              </p>
              <p className="note">
                Faktanya: we didn&apos;t leave earlier, so we didn&apos;t catch the train. Klausa if
                dapat diletakkan di depan atau belakang. Jika di depan, gunakan koma.
              </p>
              <p className="example">
                She <b>would have passed</b> if she <b>had studied</b>.{" "}
                <SpeakButton text="She would have passed if she had studied." />
              </p>
              {renderPopUpTrigger(0, "Simple")}
            </section>
            <section className="guided-lesson" id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. Mixed: masa lalu → keadaan sekarang</h2>
              <p>Kondisi lampau yang berbeda menghasilkan keadaan sekarang yang berbeda.</p>
              <p className="rule">
                <b>If + past perfect, would + base verb</b>
              </p>
              <p className="example">
                If I <b>had taken</b> that job, I <b>would live</b> abroad now.{" "}
                <SpeakButton text="If I had taken that job, I would live abroad now." />
              </p>
              <p className="example">
                If the airline had stored our luggage correctly, we would have our equipment now.{" "}
                <SpeakButton text="If the airline had stored our luggage correctly, we would have our equipment now." />
              </p>
              <p className="note">
                Fakta: I didn&apos;t take that job, so I don&apos;t live abroad now.
              </p>
              {renderPopUpTrigger(1, "Intermediate")}
            </section>
            <section className="guided-lesson" id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Mixed: keadaan sekarang → masa lalu</h2>
              <p>
                Kondisi umum atau keadaan sekarang menjelaskan hasil yang berbeda di masa lalu.
              </p>
              <p className="rule">
                <b>If + past simple, would have + past participle</b>
              </p>
              <p className="example">
                If he <b>were</b> more careful, he <b>wouldn&apos;t have made</b> that mistake.{" "}
                <SpeakButton text="If he were more careful, he wouldn't have made that mistake." />
              </p>
              <p className="example">
                If the office were better organized, the team wouldn&apos;t have missed
                yesterday&apos;s deadline.{" "}
                <SpeakButton text="If the office were better organized, the team wouldn't have missed yesterday's deadline." />
              </p>
              <p className="note">
                Untuk situasi hipotetis, were dapat digunakan dengan semua subjek dalam ragam
                formal: If I were you...
              </p>
              {renderPopUpTrigger(2, "Complex")}
            </section>
          </>
        );

      case "04-advanced-formal/03-hedging":
        return (
          <>
            <section className="guided-lesson" id="materi-simple">
              <p className="level">01 · Simple</p>
              <h2>1. Seberapa kuat klaimmu?</h2>
              <p>
                Pilih ungkapan berdasarkan kekuatan bukti. Klaim mutlak mudah dibantah jika data
                hanya menunjukkan kecenderungan.
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Kepastian</th>
                      <th>Ungkapan</th>
                      <th>Contoh</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kuat, tidak mutlak</td>
                      <td>clearly, demonstrates</td>
                      <td>
                        The results <b>clearly demonstrate</b> a difference.{" "}
                        <SpeakButton text="The results clearly demonstrate a difference." />
                      </td>
                    </tr>
                    <tr>
                      <td>Moderat</td>
                      <td>suggest, indicate, appear to</td>
                      <td>
                        The results <b>suggest</b> a possible difference.{" "}
                        <SpeakButton text="The results suggest a possible difference." />
                      </td>
                    </tr>
                    <tr>
                      <td>Terbatas/bersyarat</td>
                      <td>may, might, could</td>
                      <td>
                        This approach <b>may</b> improve retention.{" "}
                        <SpeakButton text="This approach may improve retention." />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note">
                Jangan menumpuk hedge tanpa alasan: “It might possibly perhaps...” biasanya
                melemahkan kalimat secara berlebihan.
              </p>
              {renderPopUpTrigger(0, "Simple")}
            </section>
            <section className="guided-lesson" id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. Cara melakukan hedging</h2>
              <h3>Modal verbs</h3>
              <p className="example">
                These changes <b>may reduce</b> processing time.{" "}
                <SpeakButton text="These changes may reduce processing time." />
              </p>
              <h3>Reporting verbs</h3>
              <p className="example">
                The findings <b>suggest that</b> sleep affects recall.{" "}
                <SpeakButton text="The findings suggest that sleep affects recall." />
              </p>
              <h3>Adverbs dan pembatas</h3>
              <p className="example">
                The effect is <b>generally</b> stronger in younger adults.{" "}
                <SpeakButton text="The effect is generally stronger in younger adults." />
              </p>
              <h3>Kata sifat dengan klausa</h3>
              <p className="example">
                It is <b>likely that</b> costs will increase.{" "}
                <SpeakButton text="It is likely that costs will increase." />
              </p>
              <p className="example">
                In a preliminary survey, 6 of 10 participants preferred the new layout; the result{" "}
                <b>may indicate</b> a trend.{" "}
                <SpeakButton text="In a preliminary survey, 6 of 10 participants preferred the new layout; the result may indicate a trend." />
              </p>
              {renderPopUpTrigger(1, "Intermediate")}
            </section>
            <section className="guided-lesson" id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Sesuaikan klaim dengan bukti</h2>
              <p>
                Hedge harus sesuai bukti, bukan sekadar membuat nada terdengar formal. Bedakan hasil
                pengamatan, interpretasi penulis, dan kesimpulan yang belum dapat dibuktikan.
              </p>
              <p className="example">Terlalu mutlak: This proves that the policy works.</p>
              <p className="example">
                Lebih terukur: These results <b>suggest that</b> the policy may be effective in this
                context.{" "}
                <SpeakButton text="These results suggest that the policy may be effective in this context." />
              </p>
              <p className="example">
                A small pilot study found fewer missed appointments; larger trials are needed before
                claiming a general effect.{" "}
                <SpeakButton text="A small pilot study found fewer missed appointments; larger trials are needed before claiming a general effect." />
              </p>
              <p className="rule">
                Hindari hedge jika fakta sudah pasti dan tidak kontroversial. Ketepatan lebih
                penting daripada terdengar ragu.
              </p>
              {renderPopUpTrigger(2, "Complex")}
            </section>
          </>
        );

      default:
        return null;
    }
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
          <p className="level">{data.levelLabel}</p>
          <FavoriteModuleButton moduleKey={data.key} />
        </div>
        <h1>{data.title}</h1>
        <p className="module-intro">{data.intro}</p>
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

        {renderMaterialSections()}

        <LevelQuizSummarySection
          moduleKey={data.key}
          moduleTitle={data.title}
          levels={quizLevels}
          questionStates={questionStates}
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
          <h2>Tulis contoh kalimatmu sendiri</h2>
          <p>
            Buat 2–3 kalimat menggunakan pola <b>{data.title}</b> dalam konteks pekerjaan, studi,
            atau aktivitas sehari-hari, lalu tandai checklist pemahaman di bawah.
          </p>
          <label className="guided-writing-label" htmlFor="legacyGuidedWriting">
            Latihan menulis mandiri
          </label>
          <textarea
            id="legacyGuidedWriting"
            rows={4}
            value={writingDraft}
            onChange={(e) => setWritingDraft(e.target.value)}
            placeholder={`Tulis kalimat dengan pola ${data.title}...`}
          />
          {writingDraft.trim() && (
            <div style={{ marginTop: ".5rem" }}>
              <SpeakButton text={writingDraft} label="Dengarkan Tulisanmu" />
            </div>
          )}
          <fieldset className="guided-selfcheck">
            <legend>Cek pemahaman</legend>
            {data.checklist.map((item, idx) => (
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
          <a
            href={data.footerLeft.href}
            onClick={(e) => handleLinkClick(e, data.footerLeft.href)}
          >
            {data.footerLeft.label}
          </a>
          <a
            href={data.footerRight.href}
            onClick={(e) => handleLinkClick(e, data.footerRight.href)}
          >
            {data.footerRight.label}
          </a>
        </footer>
      </main>
    </>
  );
};
