import React, { useEffect, useState } from "react";
import { LegacyModuleData } from "../data/legacyModules";
import { getChecks, getScores, saveChecks, saveScore } from "../utils/storage";

interface LegacyModuleViewProps {
  data: LegacyModuleData;
  onNavigate: (path: string) => void;
}

export const LegacyModuleView: React.FC<LegacyModuleViewProps> = ({ data, onNavigate }) => {
  const [checks, setChecks] = useState<boolean[]>(() => {
    const saved = getChecks()[data.key] || [];
    return data.checklist.map((_, idx) => Boolean(saved[idx]));
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [resultText, setResultText] = useState<string>("");
  const [resultState, setResultState] = useState<"pass" | "retry" | undefined>(undefined);

  useEffect(() => {
    document.body.dataset.module = data.key;
    document.title = `${data.title} — English Learning`;
    const savedChecks = getChecks()[data.key] || [];
    setChecks(data.checklist.map((_, idx) => Boolean(savedChecks[idx])));
    setSelectedOptions({});

    const savedScores = getScores();
    if (savedScores[data.key] != null) {
      const sc = savedScores[data.key];
      setResultText(`Skor terakhir: ${sc}%`);
      setResultState(sc >= 80 ? "pass" : "retry");
    } else {
      setResultText("");
      setResultState(undefined);
    }
  }, [data]);

  const handleCheckChange = (index: number, checked: boolean) => {
    const next = checks.map((val, i) => (i === index ? checked : val));
    setChecks(next);
    saveChecks(data.key, next);
  };

  const allQuestions = data.stages.flatMap((s) => s.questions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answeredCount = allQuestions.filter((q) => selectedOptions[q.name] != null).length;
    if (answeredCount !== allQuestions.length) {
      setResultText(
        `Jawab semua pertanyaan terlebih dahulu (${answeredCount}/${allQuestions.length}).`
      );
      setResultState("retry");
      return;
    }

    const correctCount = allQuestions.filter((q) => {
      const chosenIdx = selectedOptions[q.name];
      return Boolean(q.options[chosenIdx]?.correct);
    }).length;

    const score = Math.round((correctCount / allQuestions.length) * 100);
    saveScore(data.key, score);
    setResultText(
      `Skor: ${score}% (${correctCount}/${allQuestions.length}). ${
        score >= 80 ? "LULUS. Bagus, lanjutkan." : "Belum lulus. Baca ulang materi lalu coba lagi."
      }`
    );
    setResultState(score >= 80 ? "pass" : "retry");
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const renderMaterialSections = () => {
    switch (data.key) {
      case "00-foundation/04-articles":
        return (
          <>
            <section id="materi-simple">
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
                    a <b>book</b> · a <b>university</b> · a <b>European</b> city
                  </p>
                  <p className="note">University dan European diawali bunyi /y/.</p>
                </div>
                <div>
                  <h3>An + bunyi vokal</h3>
                  <p className="example">
                    an <b>apple</b> · an <b>hour</b> · an <b>honest</b> answer
                  </p>
                  <p className="note">Pada hour dan honest, huruf h tidak dibunyikan.</p>
                </div>
              </div>
              <p className="rule">
                I saw <b>a dog</b> in the park. Seekor anjing, belum diketahui yang mana.
              </p>
            </section>
            <section id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. The: benda yang spesifik</h2>
              <p>
                Gunakan <b>the</b> saat benda sudah disebut, konteksnya jelas, atau hanya ada satu
                yang dimaksud.
              </p>
              <p className="example">
                I saw <b>a dog</b>. <b>The dog</b> was chasing a ball.
              </p>
              <p className="example">
                Please close <b>the door</b>. (Kita tahu pintu yang dimaksud.)
              </p>
              <p className="example">
                <b>The sun</b> is bright today. (Unik dalam konteks.)
              </p>
            </section>
            <section id="materi-complex">
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
                      <td>Books are useful.</td>
                      <td>The books on my desk are new.</td>
                    </tr>
                    <tr>
                      <td>Water is important.</td>
                      <td>The water in this bottle is cold.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="example">
                We received <b>feedback</b> after the workshop. <b>The feedback we received</b> was
                useful.
              </p>
              <p className="note">
                Kata tak terhitung seperti information, advice, dan furniture tidak memakai a/an
                secara langsung.
              </p>
            </section>
          </>
        );

      case "01-elementary/01-past-simple":
        return (
          <>
            <section id="materi-simple">
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
                    work → <b>worked</b>
                  </p>
                  <p className="example">
                    live → <b>lived</b>
                  </p>
                  <p className="example">
                    study → <b>studied</b>
                  </p>
                </div>
                <div>
                  <h3>Irregular verbs</h3>
                  <p className="example">
                    go → <b>went</b>
                  </p>
                  <p className="example">
                    see → <b>saw</b>
                  </p>
                  <p className="example">
                    buy → <b>bought</b>
                  </p>
                </div>
              </div>
              <p className="rule">
                We <b>visited</b> our grandparents last weekend. Bentuk lampau sama untuk semua
                subjek.
              </p>
            </section>
            <section id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. Negatif dan pertanyaan</h2>
              <p>
                Gunakan <b>did not (didn&apos;t)</b> atau <b>did</b> untuk semua subjek. Setelahnya,
                pakai kata kerja bentuk dasar.
              </p>
              <p className="example">
                She <b>didn&apos;t go</b> to class yesterday. (Bukan <i>didn&apos;t went</i>.)
              </p>
              <p className="example">
                <b>Did</b> you <b>see</b> the message?
              </p>
              <p className="example">Yes, I did. / No, I didn&apos;t.</p>
              <p className="note">
                Kata kerja be berbeda: I/he/she/it <b>was</b>; you/we/they <b>were</b>. Negatifnya
                wasn&apos;t/weren&apos;t; pertanyaannya Was/Were di depan subjek.
              </p>
            </section>
            <section id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Penanda waktu dan urutan cerita</h2>
              <p>
                Penanda waktu seperti yesterday, last night, two days ago, in 2020, dan when I was a
                child menunjukkan periode yang selesai.
              </p>
              <p className="example">
                They <b>moved</b> here in 2020. <b>Did</b> you call me yesterday?
              </p>
              <p className="example">
                The driver <b>missed</b> the turn, stopped near a station, and <b>asked</b> for
                directions.
              </p>
              <p className="note">
                Dalam narasi, gunakan Past Simple untuk menyampaikan tindakan berurutan yang
                selesai.
              </p>
            </section>
          </>
        );

      case "02-intermediate/04-passive-basic":
        return (
          <>
            <section id="materi-simple">
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
                    <b>The chef</b> prepares <b>the meal</b>.
                  </p>
                </div>
                <div>
                  <h3>Passive</h3>
                  <p>Object + be + V3 (+ by agent)</p>
                  <p className="example">
                    <b>The meal</b> is prepared (by the chef).
                  </p>
                </div>
              </div>
              <p className="rule">
                Object pada kalimat aktif berpindah menjadi subject pasif. Pelaku dengan <b>by</b>{" "}
                bisa dihilangkan jika tidak diketahui atau tidak penting.
              </p>
            </section>
            <section id="materi-intermediate">
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
                        The rooms <b>are cleaned</b> daily.
                      </td>
                    </tr>
                    <tr>
                      <td>Past Simple</td>
                      <td>was/were + V3</td>
                      <td>
                        The bridge <b>was built</b> in 1990.
                      </td>
                    </tr>
                    <tr>
                      <td>Future (will)</td>
                      <td>will be + V3</td>
                      <td>
                        The results <b>will be announced</b> tomorrow.
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
                The technician checks each device. → Each device <b>is checked</b> before shipment.
              </p>
            </section>
            <section id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Pasif dalam laporan dan proses</h2>
              <p>
                Gunakan pasif ketika proses atau hasil lebih penting daripada pelaku, misalnya dalam
                laporan, berita, dan instruksi.
              </p>
              <p className="example">
                The package <b>was delivered</b> this morning. The test results{" "}
                <b>will be shared</b> with the client tomorrow.
              </p>
              <p className="example">
                English <b>is spoken</b> in many countries. (Pelakunya umum.)
              </p>
              <p className="note">
                Tidak semua kata kerja cocok dijadikan pasif. Kata kerja tanpa object, seperti
                arrive atau sleep, umumnya tidak membentuk pasif.
              </p>
            </section>
          </>
        );

      case "03-upper-intermediate/03-conditionals-3-mixed":
        return (
          <>
            <section id="materi-simple">
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
                If we <b>had left</b> earlier, we <b>would have caught</b> the train.
              </p>
              <p className="note">
                Faktanya: we didn&apos;t leave earlier, so we didn&apos;t catch the train. Klausa if
                dapat diletakkan di depan atau belakang. Jika di depan, gunakan koma.
              </p>
              <p className="example">
                She <b>would have passed</b> if she <b>had studied</b>.
              </p>
            </section>
            <section id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. Mixed: masa lalu → keadaan sekarang</h2>
              <p>Kondisi lampau yang berbeda menghasilkan keadaan sekarang yang berbeda.</p>
              <p className="rule">
                <b>If + past perfect, would + base verb</b>
              </p>
              <p className="example">
                If I <b>had taken</b> that job, I <b>would live</b> abroad now.
              </p>
              <p className="example">
                If the airline had stored our luggage correctly, we would have our equipment now.
              </p>
              <p className="note">
                Fakta: I didn&apos;t take that job, so I don&apos;t live abroad now.
              </p>
            </section>
            <section id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Mixed: keadaan sekarang → masa lalu</h2>
              <p>
                Kondisi umum atau keadaan sekarang menjelaskan hasil yang berbeda di masa lalu.
              </p>
              <p className="rule">
                <b>If + past simple, would have + past participle</b>
              </p>
              <p className="example">
                If he <b>were</b> more careful, he <b>wouldn&apos;t have made</b> that mistake.
              </p>
              <p className="example">
                If the office were better organized, the team wouldn&apos;t have missed
                yesterday&apos;s deadline.
              </p>
              <p className="note">
                Untuk situasi hipotetis, were dapat digunakan dengan semua subjek dalam ragam
                formal: If I were you...
              </p>
            </section>
          </>
        );

      case "04-advanced-formal/03-hedging":
        return (
          <>
            <section id="materi-simple">
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
                        The results <b>clearly demonstrate</b> a difference.
                      </td>
                    </tr>
                    <tr>
                      <td>Moderat</td>
                      <td>suggest, indicate, appear to</td>
                      <td>
                        The results <b>suggest</b> a possible difference.
                      </td>
                    </tr>
                    <tr>
                      <td>Terbatas/bersyarat</td>
                      <td>may, might, could</td>
                      <td>
                        This approach <b>may</b> improve retention.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note">
                Jangan menumpuk hedge tanpa alasan: “It might possibly perhaps...” biasanya
                melemahkan kalimat secara berlebihan.
              </p>
            </section>
            <section id="materi-intermediate">
              <p className="level">02 · Intermediate</p>
              <h2>2. Cara melakukan hedging</h2>
              <h3>Modal verbs</h3>
              <p className="example">
                These changes <b>may reduce</b> processing time.
              </p>
              <h3>Reporting verbs</h3>
              <p className="example">
                The findings <b>suggest that</b> sleep affects recall.
              </p>
              <h3>Adverbs dan pembatas</h3>
              <p className="example">
                The effect is <b>generally</b> stronger in younger adults.
              </p>
              <h3>Kata sifat dengan klausa</h3>
              <p className="example">
                It is <b>likely that</b> costs will increase.
              </p>
              <p className="example">
                In a preliminary survey, 6 of 10 participants preferred the new layout; the result{" "}
                <b>may indicate</b> a trend.
              </p>
            </section>
            <section id="materi-complex">
              <p className="level">03 · Complex</p>
              <h2>3. Sesuaikan klaim dengan bukti</h2>
              <p>
                Hedge harus sesuai bukti, bukan sekadar membuat nada terdengar formal. Bedakan hasil
                pengamatan, interpretasi penulis, dan kesimpulan yang belum dapat dibuktikan.
              </p>
              <p className="example">Terlalu mutlak: This proves that the policy works.</p>
              <p className="example">
                Lebih terukur: These results <b>suggest that</b> the policy may be effective in this
                context.
              </p>
              <p className="example">
                A small pilot study found fewer missed appointments; larger trials are needed before
                claiming a general effect.
              </p>
              <p className="rule">
                Hindari hedge jika fakta sudah pasti dan tidak kontroversial. Ketepatan lebih
                penting daripada terdengar ragu.
              </p>
            </section>
          </>
        );

      default:
        return null;
    }
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

      <main className="module-page">
        <p className="level">{data.levelLabel}</p>
        <h1>{data.title}</h1>
        <p className="module-intro">{data.intro}</p>
        <p className="module-meta">
          {data.meta.map((m, idx) => (
            <span key={idx}>{m}</span>
          ))}
        </p>

        {renderMaterialSections()}

        <section>
          <h2>Cek pemahaman</h2>
          <ul className="checklist">
            {data.checklist.map((item, idx) => (
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

        <section>
          <h2>Kuis bertahap</h2>
          <form className="quiz" id="quizForm" onSubmit={handleSubmit}>
            {data.stages.map((stage) => (
              <div key={stage.title} className="quiz-stage">
                <h3>{stage.title}</h3>
                {stage.questions.map((q) => (
                  <fieldset key={q.name} className="question">
                    <legend>
                      {q.num}. {q.prompt}
                    </legend>
                    {q.options.map((opt, optIdx) => (
                      <label key={optIdx} className="option">
                        <input
                          type="radio"
                          name={q.name}
                          data-correct={opt.correct ? "true" : undefined}
                          checked={selectedOptions[q.name] === optIdx}
                          onChange={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [q.name]: optIdx,
                            }))
                          }
                        />{" "}
                        {opt.label}
                      </label>
                    ))}
                  </fieldset>
                ))}
              </div>
            ))}
            <div>
              <button className="check-quiz quiz-submit" type="submit">
                Periksa jawaban
              </button>
              <p className="result" id="quizResult" aria-live="polite" data-state={resultState}>
                {resultText}
              </p>
            </div>
          </form>
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
