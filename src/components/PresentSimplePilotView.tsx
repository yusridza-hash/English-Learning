import React, { useEffect, useState } from "react";
import { PILOT_SKILL_GUIDE, PRESENT_SIMPLE_LEVELS } from "../data/presentSimplePilot";
import { getChecks, saveChecks, saveScore } from "../utils/storage";
import { GuidedQuestionItem, QuestionProgressState } from "./GuidedQuestionItem";

interface PresentSimplePilotViewProps {
  onNavigate: (path: string) => void;
}

const MODULE_KEY = "00-foundation/07-present-simple";

export const PresentSimplePilotView: React.FC<PresentSimplePilotViewProps> = ({ onNavigate }) => {
  const [checks, setChecks] = useState<boolean[]>(() => {
    const saved = getChecks()[MODULE_KEY] || [];
    return [Boolean(saved[0]), Boolean(saved[1]), Boolean(saved[2])];
  });

  const [questionStates, setQuestionStates] = useState<QuestionProgressState[][]>(() =>
    PRESENT_SIMPLE_LEVELS.map((level) =>
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
  }, []);

  const handleCheckChange = (index: number, checked: boolean) => {
    const next = checks.map((val, i) => (i === index ? checked : val));
    setChecks(next);
    saveChecks(MODULE_KEY, next);
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
      if (completedCount === allStates.length) {
        const earned = allStates.reduce((sum, q) => sum + q.points, 0);
        const score = Math.round((earned / (allStates.length * 3)) * 100);
        saveScore(MODULE_KEY, score);
      }

      return next;
    });
  };

  const allStates = questionStates.flat();
  const totalCompletedCount = allStates.filter((q) => q.completed).length;
  const totalEarned = allStates.reduce((sum, q) => sum + q.points, 0);
  const allCompleted = totalCompletedCount === allStates.length;
  const finalScore = Math.round((totalEarned / (allStates.length * 3)) * 100);

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

      <main className="module-page guided-learning">
        <p className="level">Level 0 · Foundation / 07</p>
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
          <span>Latihan: 30 soal</span>
          <span>Target: 80%</span>
        </p>

        <nav className="guided-jump" aria-label="Navigasi materi dan latihan">
          <a href="#materi-simple">Materi Simple</a>
          <a href="#materi-intermediate">Materi Intermediate</a>
          <a href="#materi-complex">Materi Complex</a>
          <a href="#latihan-simple">Kuis Simple</a>
          <a href="#latihan-intermediate">Kuis Intermediate</a>
          <a href="#latihan-complex">Kuis Complex</a>
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
            <b>I check customer messages every morning.</b>
            <br />
            <span>Aku memeriksa pesan pelanggan setiap pagi.</span>
          </p>
          <p className="guided-example">
            <b>Mira checks the sales report before the meeting.</b>
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
            <b>Water boils at 100°C at sea level.</b>
            <br />
            <span>Air mendidih pada suhu 100°C di permukaan laut.</span>
          </p>
          <p className="guided-example">
            <b>Our office has two meeting rooms.</b>
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
          <a className="guided-shortcut" href="#latihan-simple">
            Uji pemahaman Simple →
          </a>
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
            <b>✓ He doesn&apos;t check the schedule.</b>
          </p>
          <h3 id="materi-do-does-question">2. Pertanyaan yes/no dan jawaban singkat</h3>
          <p>
            Letakkan <b>do/does</b> sebelum subject. Gunakan verb dasar setelah subject.
          </p>
          <p className="guided-example">
            <b>Do you review the orders every morning?</b>
            <br />
            <span>Yes, I do. / No, I don&apos;t.</span>
          </p>
          <p className="guided-example">
            <b>Does Niko work on Sundays?</b>
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
          <a className="guided-shortcut" href="#latihan-intermediate">
            Uji pemahaman Intermediate →
          </a>
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
            <b>Nadia usually works from home, but today she is working at the office.</b>
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
            <b>The first train leaves at 6:20 tomorrow morning.</b>
            <br />
            <span>Kereta pertama berangkat pukul 6:20 besok pagi. Ini jadwal tetap.</span>
          </p>
          <h3>3. Stative verbs</h3>
          <p>
            Verb yang menyatakan pikiran, perasaan, kepemilikan, atau kebutuhan biasanya memakai
            Present Simple saat maknanya berupa keadaan.
          </p>
          <p className="guided-example">
            <b>I understand the instructions, and I need one more copy.</b>
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
            </b>
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
          <a className="guided-shortcut" href="#latihan-complex">
            Uji pemahaman Complex →
          </a>
        </section>

        <section className="guided-practice-area" id="latihan">
          <p className="level">Latihan setelah materi</p>
          <h2>Periksa pemahaman per level</h2>
          <p>
            Setiap level berisi 10 soal. Pilih jawaban untuk semuanya, lalu periksa untuk melihat
            skor dan pembahasan.
          </p>
          <p className="guided-quiz-progress" id="presentSimpleQuizProgress" aria-live="polite">
            {totalCompletedCount} dari {allStates.length} soal diperiksa
          </p>
          <div id="presentSimpleQuiz">
            {PRESENT_SIMPLE_LEVELS.map((level, levelIndex) => {
              const lvlStates = questionStates[levelIndex];
              const completedCount = lvlStates.filter((q) => q.completed).length;
              const correctCount = lvlStates.filter((q) => q.correct).length;
              const points = lvlStates.reduce((sum, q) => sum + q.points, 0);
              const isLevelDone = completedCount === level.questions.length;
              const levelPassed = points >= level.questions.length * 3 * 0.8;

              const skillTotals = new Map<string, { correct: number; count: number }>();
              if (isLevelDone) {
                level.questions.forEach((question, qIdx) => {
                  const sk = question.skill || "agreement";
                  const total = skillTotals.get(sk) || { correct: 0, count: 0 };
                  total.count += 1;
                  if (lvlStates[qIdx].correct) total.correct += 1;
                  skillTotals.set(sk, total);
                });
              }
              const reviewSkills = [...skillTotals.entries()].filter(
                ([, total]) => total.correct / total.count < 0.8
              );

              return (
                <section
                  key={level.key}
                  className="guided-question-level"
                  id={`latihan-${level.key}`}
                >
                  <p className="level">
                    0{levelIndex + 1} · {level.title} · {level.questions.length} soal
                  </p>
                  <h3>{level.title}: latihan dan feedback</h3>
                  <p>{level.description}</p>
                  <p
                    className="guided-level-progress"
                    id={`progress-${level.key}`}
                    aria-live="polite"
                  >
                    {completedCount}/{level.questions.length} soal diperiksa
                  </p>
                  <div className="guided-level-questions" id={`questions-${level.key}`}>
                    {level.questions.map((question, questionIndex) => (
                      <GuidedQuestionItem
                        key={`${level.key}-${questionIndex}`}
                        question={question}
                        questionIndex={questionIndex}
                        state={lvlStates[questionIndex]}
                        onUpdateState={(nextState) =>
                          handleUpdateQuestionState(levelIndex, questionIndex, nextState)
                        }
                        fallbackSecondHint="Periksa lagi agreement subject-verb dan posisi auxiliary."
                      />
                    ))}
                  </div>
                  <div
                    className="guided-level-result"
                    id={`result-${level.key}`}
                    aria-live="polite"
                    data-state={isLevelDone ? (levelPassed ? "pass" : "retry") : undefined}
                  >
                    {isLevelDone && (
                      <>
                        <p>
                          Hasil {level.title}: {correctCount}/{level.questions.length} benar ·{" "}
                          {points}/{level.questions.length * 3} poin.
                        </p>
                        <p className="guided-skill-review">
                          {reviewSkills.length > 0 ? (
                            <>
                              Topik untuk diulang:{" "}
                              {reviewSkills.map(([skill, total], idx) => {
                                const guide = PILOT_SKILL_GUIDE[skill] || {
                                  label: skill,
                                  href: `#materi-${level.key}`,
                                };
                                return (
                                  <React.Fragment key={skill}>
                                    {idx > 0 && " · "}
                                    <a href={guide.href}>
                                      {guide.label} ({total.correct}/{total.count})
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
                  <a className="guided-shortcut guided-back" href={`#materi-${level.key}`}>
                    ← Kembali ke materi {level.title}
                  </a>
                </section>
              );
            })}
          </div>
          <p
            className="guided-feedback"
            id="presentSimpleOverall"
            aria-live="polite"
            data-state={allCompleted ? (finalScore >= 80 ? "pass" : "retry") : undefined}
          >
            {allCompleted
              ? `Skor akhir: ${finalScore}% (${totalEarned}/${allStates.length * 3} poin). ${
                  finalScore >= 80
                    ? "LULUS. Nilai tersimpan di dashboard."
                    : "Belum lulus. Pelajari pembahasan dan ulangi latihan."
                }`
              : ""}
          </p>
        </section>

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
