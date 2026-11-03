(() => {
  const moduleKey = document.body.dataset.module;
  const makeQuestion = (prompt, options, answer, explanation, extra = {}) => ({ prompt, options, answer, explanation, ...extra });
  const levels = [
    {
      key: "simple",
      title: "Simple",
      description: "Bentuk positif, subject, dan ejaan verb.",
      questions: [
        makeQuestion("My sister ___ to work at 8 every morning.", ["goes", "go", "is go"], 0, "My sister setara dengan she, jadi go berubah menjadi goes."),
        makeQuestion("I ___ coffee before my shift.", ["drinks", "drink", "am drink"], 1, "Dengan subject I, gunakan bentuk dasar: drink."),
        makeQuestion("They ___ in a small office near the station.", ["works", "work", "working"], 1, "They memakai bentuk dasar verb: work."),
        makeQuestion("The store ___ its doors to customers at 9 a.m. every weekday.", ["open", "opens", "is open"], 1, "Jadwal rutin memakai Present Simple; store tunggal mendapat verb + s."),
        makeQuestion("My manager ___ two languages.", ["speak", "speaks", "speaking"], 1, "My manager adalah subject orang ketiga tunggal, jadi gunakan speaks."),
        makeQuestion("We ___ lunch together after the morning meeting.", ["has", "have", "having"], 1, "We memakai have, bukan has."),
        makeQuestion("Lengkapi percakapan tentang jadwal bus.", ["stop", "stops", "stopes"], 1, "Bus tunggal setara dengan it. Bentuk rutinnya adalah stops.", { type: "dialogue", dialogue: [["Maya", "Does this bus stop near the office?"], ["Rudi", "Yes. It ___ here every morning."]] }),
        makeQuestion("Leila ___ business at university.", ["study", "studys", "studies"], 2, "Konsonan + y berubah menjadi -ies: study menjadi studies."),
        makeQuestion("Omar ___ tennis on Wednesdays.", ["plays", "plaies", "play"], 0, "Sebelum y ada vokal a, jadi cukup tambah -s: plays."),
        makeQuestion("Susun kalimat rutinitas ini.", ["every morning", "checks", "He", "the schedule."], [2, 1, 3, 0], "Susunannya: He checks the schedule every morning. He memakai checks.", { type: "build", hints: ["Mulai dengan subject He.", "Setelah He, gunakan checks sebelum object."] })
      ]
    },
    {
      key: "intermediate",
      title: "Intermediate",
      description: "Negatif, pertanyaan, jawaban singkat, dan frequency adverbs.",
      questions: [
        makeQuestion("She ___ emails after every meeting.", ["don't check", "doesn't check", "doesn't checks"], 1, "Untuk she gunakan doesn't + bentuk dasar check."),
        makeQuestion("Does he ___ from home on Fridays?", ["works", "work", "working"], 1, "Setelah does, verb utama kembali ke bentuk dasar: work."),
        makeQuestion("What time ___ you start work?", ["does", "do", "are"], 1, "Dengan subject you, pertanyaan memakai do."),
        makeQuestion("Does your team ___ the office early?", ["leaves", "leave", "leaving"], 1, "Does sudah membawa penanda orang ketiga, jadi gunakan leave."),
        makeQuestion("We ___ lunch in the meeting room on Mondays.", ["don't have", "doesn't have", "aren't have"], 0, "We memakai don't + verb dasar have."),
        makeQuestion("My colleague ___ coffee in the afternoon.", ["doesn't drink", "don't drinks", "doesn't drinks"], 0, "My colleague tunggal memakai doesn't, lalu verb dasar drink."),
        makeQuestion("Pilih kalimat negatif yang benar.", ["The analyst doesn't review orders at night.", "The analyst don't reviews orders at night.", "The analyst doesn't reviews orders at night."], 0, "The analyst = he/she; pola negatifnya doesn't + review."),
        makeQuestion("Pilih respons yang tepat dalam dialog.", ["No, she doesn't.", "No, she don't.", "No, she isn't."], 0, "Mia = she, jadi jawaban singkatnya No, she doesn't.", { type: "dialogue", dialogue: [["Arif", "Does Mia drive to work?"], ["Sita", "___"]] }),
        makeQuestion("Susun pertanyaan untuk menanyakan frekuensi kereta berhenti.", ["How often", "does", "the train", "stop?"], [0, 1, 2, 3], "Urutannya: How often does the train stop? Setelah does, gunakan verb dasar.", { type: "build", hints: ["Letakkan How often di depan.", "Setelah does, susun subject lalu verb dasar."] }),
        makeQuestion("How often does your manager ___ for work?", ["travels", "travel", "travelling"], 1, "Setelah does gunakan verb dasar travel. How often menanyakan frekuensi.")
      ]
    },
    {
      key: "complex",
      title: "Complex",
      description: "Pilih tense dari konteks, bedakan rutinitas dan situasi sementara, lalu sunting contoh nyata.",
      questions: [
        makeQuestion("The first train ___ at 7:15 every weekday.", ["leaves", "is leaving", "leave"], 0, "Jadwal resmi yang berulang biasanya memakai Present Simple: leaves."),
        makeQuestion("Pilih respons yang melengkapi percakapan tentang pekerjaan hari ini.", ["am checking / prepare", "check / am preparing", "checks / prepares"], 0, "At the moment menandai aktivitas sementara; usually menandai kebiasaan.", { type: "dialogue", dialogue: [["Nadia", "What are you doing right now?"], ["Bima", "I ___ customer records, but I usually ___ invoices."]] }),
        makeQuestion("Rafi follows a daily routine. He ___ the team at 9, then ___ the morning brief.", ["meet / send", "meets / sends", "is meeting / is sending"], 1, "Rafi = he. Dua rutinitas memakai meets dan sends."),
        makeQuestion("Temukan dan perbaiki kesalahan pada draft email.", ["My manager doesn't check email at night.", "My manager don't check email at night.", "My manager doesn't checks email at night."], 0, "Manager tunggal memakai doesn't; setelah doesn't, gunakan verb dasar check.", { type: "edit", draft: "My manager don't checks email at night.", hints: ["Manager adalah satu orang, jadi periksa auxiliary-nya.", "Setelah doesn't, main verb harus kembali ke bentuk dasar."], wrongFeedback: { 1: "Don't dipakai untuk I/you/we/they. Manager tunggal memakai doesn't.", 2: "Doesn't sudah membawa penanda he/she/it. Setelahnya gunakan check, bukan checks." } }),
        makeQuestion("Pilih bentuk yang wajar untuk verb keadaan.", ["I am understanding the instructions.", "I understand the instructions.", "I understanding the instructions."], 1, "Understand biasanya menyatakan keadaan, jadi gunakan Present Simple."),
        makeQuestion("Pilih posisi frequency adverb yang tepat.", ["The office is usually quiet after lunch.", "The office usually is quiet after lunch.", "Usually the office quiet is after lunch."], 0, "Dengan be, frequency adverb biasanya diletakkan sesudah be: is usually quiet."),
        makeQuestion("My manager ___ a report every Friday.", ["writes", "is writing", "write"], 0, "Every Friday menandai kebiasaan; manager tunggal memakai writes."),
        makeQuestion("The lab ___ at 9 on Sundays. (jadwal tetap: tutup)", ["doesn't open", "isn't opening", "don't opens"], 0, "Jadwal rutin memakai Present Simple. Bentuk negatifnya doesn't + open."),
        makeQuestion("Susun pertanyaan yang akan dipakai saat rapat.", ["How often", "does", "the team", "meet?"], [0, 1, 2, 3], "Susunannya: How often does the team meet? Gunakan does + subject + verb dasar.", { type: "build", hints: ["Mulai dengan kata tanya frekuensi.", "Pola berikutnya: does + subject + verb dasar."] }),
        makeQuestion("Pilih revisi jadwal yang paling akurat.", ["Our office opens at eight, and the support team doesn't accept calls after six.", "Our office is opening at eight every day, and the support team don't accepts calls after six.", "Does our office opens at eight, and the support team doesn't accepts calls after six."], 0, "Jadwal dan kebijakan umum memakai Present Simple; team doesn't accept memakai verb dasar.", { type: "edit", draft: "Our office is opening at eight every day. The support team don't accepts calls after six.", hints: ["Kalimat ini menyatakan jadwal tetap dan kebijakan umum.", "Perbaiki bentuk jadwal, subject support team, dan verb setelah doesn't."], wrongFeedback: { 1: "Untuk jadwal tetap gunakan opens. Support team memakai doesn't accept, bukan don't accepts.", 2: "Ini ringkasan jadwal, bukan pertanyaan. Gunakan office opens; setelah doesn't, pakai accept." } })
      ]
    }
  ];

  const questionSkills = [
    ["agreement", "base-form", "base-form", "agreement", "agreement", "irregular-have", "agreement", "verb-spelling", "verb-spelling", "agreement"],
    ["negative-does", "verb-after-does", "question-order", "verb-after-does", "negative-does", "negative-does", "negative-does", "short-answer", "question-order", "verb-after-does"],
    ["schedules", "routine-vs-now", "agreement", "negative-does", "stative-verbs", "frequency-order", "routine-vs-now", "schedules", "question-order", "routine-vs-now"]
  ];
  const skillGuide = {
    agreement: { label: "Subject dan verb: he/she/it", href: "#materi-third-person" },
    "base-form": { label: "Subject dengan verb dasar", href: "#materi-simple" },
    "verb-spelling": { label: "Ejaan -s/-es/-ies", href: "#materi-verb-spelling" },
    "irregular-have": { label: "Bentuk khusus have/has", href: "#materi-verb-spelling" },
    "negative-does": { label: "Kalimat negatif dengan do/does", href: "#materi-do-does-negative" },
    "verb-after-does": { label: "Verb dasar setelah does", href: "#materi-do-does-negative" },
    "question-order": { label: "Urutan kata dalam pertanyaan", href: "#materi-do-does-question" },
    "short-answer": { label: "Jawaban singkat do/does", href: "#materi-do-does-question" },
    schedules: { label: "Present Simple untuk jadwal", href: "#materi-schedules-stative" },
    "routine-vs-now": { label: "Rutinitas vs kegiatan sementara", href: "#materi-routine-vs-now" },
    "stative-verbs": { label: "Stative verbs", href: "#materi-schedules-stative" },
    "frequency-order": { label: "Posisi frequency adverb", href: "#materi-frequency" }
  };
  const skillHints = {
    agreement: ["Cocokkan subject tunggal atau jamak dengan bentuk verb.", "Untuk he/she/it pada kalimat positif, periksa akhiran verb."],
    "base-form": ["Periksa subject I/you/we/they.", "Subject tersebut memakai verb dasar tanpa -s."],
    "verb-spelling": ["Perhatikan huruf terakhir verb sebelum menambah akhiran.", "Bedakan konsonan + y dari vokal + y."],
    "irregular-have": ["Have memiliki bentuk khusus untuk orang ketiga tunggal.", "Periksa pasangan have/has pada tabel Simple."],
    "negative-does": ["Cocokkan do/don't atau does/doesn't dengan subject.", "Sesudah doesn't, main verb kembali ke bentuk dasar."],
    "verb-after-does": ["Does sudah membawa penanda orang ketiga.", "Gunakan bentuk dasar pada verb setelah does."],
    "question-order": ["Mulai dengan kata tanya, lalu auxiliary.", "Setelah do/does, urutkan subject lalu verb dasar."],
    "short-answer": ["Jawaban singkat mengulang auxiliary dari pertanyaan.", "Mia = she, jadi pilih bentuk untuk she."],
    schedules: ["Cari petunjuk bahwa ini adalah jadwal berulang.", "Jadwal tetap memakai Present Simple."],
    "routine-vs-now": ["Bandingkan petunjuk waktu pada kedua klausa.", "Usually menandai rutinitas; at the moment menandai kegiatan sekarang."],
    "stative-verbs": ["Pikirkan apakah verb menyatakan tindakan atau keadaan.", "Understand biasanya menyatakan keadaan, bukan aktivitas sementara."],
    "frequency-order": ["Tentukan apakah kalimat memakai main verb atau be.", "Frequency adverb biasanya sebelum main verb, tetapi sesudah be."]
  };
  levels.forEach((level, levelIndex) => level.questions.forEach((question, questionIndex) => {
    question.skill = questionSkills[levelIndex][questionIndex];
    question.skillHint = skillHints[question.skill];
  }));

  const quizContainer = document.getElementById("presentSimpleQuiz");
  const progress = document.getElementById("presentSimpleQuizProgress");
  const overall = document.getElementById("presentSimpleOverall");
  const savedChecks = JSON.parse(localStorage.getItem("el_check") || "{}");
  const checklist = [...document.querySelectorAll("[data-check]")];
  const questionStates = levels.map((level) => level.questions.map(() => ({ attempts: 0, points: 0, correct: false, completed: false })));

  checklist.forEach((item, index) => {
    item.checked = Boolean((savedChecks[moduleKey] || [])[index]);
    item.addEventListener("change", () => {
      const current = JSON.parse(localStorage.getItem("el_check") || "{}");
      current[moduleKey] = checklist.map((checkbox) => checkbox.checked);
      localStorage.setItem("el_check", JSON.stringify(current));
    });
  });

  function renderLevel(level, levelIndex) {
    const section = document.createElement("section");
    section.className = "guided-question-level";
    section.id = `latihan-${level.key}`;
    section.innerHTML = `
      <p class="level">0${levelIndex + 1} · ${level.title} · ${level.questions.length} soal</p>
      <h3>${level.title}: latihan dan feedback</h3>
      <p>${level.description}</p>
      <p class="guided-level-progress" id="progress-${level.key}" aria-live="polite">0/${level.questions.length} soal diperiksa</p>
      <div class="guided-level-questions" id="questions-${level.key}"></div>
      <p class="guided-level-result" id="result-${level.key}" aria-live="polite"></p>
      <a class="guided-shortcut guided-back" href="#materi-${level.key}">← Kembali ke materi ${level.title}</a>`;
    const questionList = section.querySelector(`#questions-${level.key}`);
    level.questions.forEach((question, questionIndex) => {
      questionList.appendChild(renderQuestion(question, levelIndex, questionIndex));
    });
    return section;
  }

  function renderQuestion(question, levelIndex, questionIndex) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question guided-question";
    fieldset.innerHTML = `<legend>${questionIndex + 1}. ${question.prompt}</legend>`;

    if (question.dialogue) {
      const dialogue = document.createElement("div");
      dialogue.className = "guided-dialogue";
      dialogue.innerHTML = question.dialogue.map(([speaker, line], index) => `
        <p class="guided-dialogue-line${index % 2 ? " is-reply" : ""}"><b>${speaker}</b><span>${line}</span></p>`).join("");
      fieldset.appendChild(dialogue);
    }
    if (question.draft) {
      const draft = document.createElement("p");
      draft.className = "guided-draft";
      draft.innerHTML = `<span>Draft</span>${question.draft}`;
      fieldset.appendChild(draft);
    }

    const activity = document.createElement("div");
    activity.className = question.type === "build" ? "guided-build-activity" : "guided-answer-choices";
    fieldset.appendChild(activity);
    const feedback = document.createElement("p");
    feedback.className = "guided-question-feedback";
    feedback.setAttribute("aria-live", "polite");
    feedback.hidden = true;
    fieldset.appendChild(feedback);

    if (question.type === "build") {
      renderWordBuild(question, activity, fieldset, feedback, levelIndex, questionIndex);
    } else {
      question.options.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "guided-answer-choice";
        button.textContent = option;
        button.addEventListener("click", () => answerQuestion(question, optionIndex, fieldset, feedback, levelIndex, questionIndex));
        activity.appendChild(button);
      });
    }
    return fieldset;
  }

  function renderWordBuild(question, activity, fieldset, feedback, levelIndex, questionIndex) {
    const built = document.createElement("div");
    built.className = "guided-built";
    built.setAttribute("aria-live", "polite");
    const bank = document.createElement("div");
    bank.className = "guided-word-bank";
    const selected = [];
    const check = document.createElement("button");
    check.type = "button";
    check.className = "check-quiz guided-build-check";
    check.textContent = "Periksa susunan";
    check.disabled = true;
    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "guided-reset";
    reset.textContent = "Ulangi susunan";

    question.options.forEach((token, tokenIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "guided-word";
      button.textContent = token;
      button.addEventListener("click", () => {
        if (button.disabled) return;
        button.disabled = true;
        selected.push(tokenIndex);
        const word = document.createElement("span");
        word.className = "guided-selected-word";
        word.textContent = token;
        built.appendChild(word);
        check.disabled = selected.length !== question.options.length;
      });
      bank.appendChild(button);
    });
    check.addEventListener("click", () => answerQuestion(question, selected.slice(), fieldset, feedback, levelIndex, questionIndex));
    reset.addEventListener("click", () => {
      selected.length = 0;
      built.replaceChildren();
      bank.querySelectorAll("button").forEach((button) => { button.disabled = false; });
      check.disabled = true;
    });
    activity.append(built, bank, check, reset);
  }

  function answerQuestion(question, selection, fieldset, feedback, levelIndex, questionIndex) {
    const state = questionStates[levelIndex][questionIndex];
    if (state.completed) return;
    const correct = Array.isArray(question.answer)
      ? selection.length === question.answer.length && selection.every((token, index) => token === question.answer[index])
      : selection === question.answer;
    if (correct) {
      state.points = Math.max(1, 3 - state.attempts);
      state.correct = true;
      state.completed = true;
      feedback.textContent = `Tepat · ${state.points}/3 poin. ${question.explanation}`;
      feedback.dataset.state = "pass";
      feedback.hidden = false;
      lockQuestion(fieldset, true);
      updateProgress(levelIndex);
      return;
    }

    state.attempts += 1;
    if (state.attempts < 3) {
      const optionHint = Array.isArray(selection) ? null : question.wrongFeedback?.[selection];
      const targetedHint = Array.isArray(optionHint) ? optionHint[state.attempts - 1] : optionHint;
      const defaultHints = [
        "Periksa subject dan petunjuk waktu pada kalimat.",
        "Periksa lagi agreement subject-verb dan posisi auxiliary."
      ];
      const hint = targetedHint || question.hints?.[state.attempts - 1] || question.skillHint?.[state.attempts - 1] || defaultHints[state.attempts - 1];
      feedback.textContent = `${state.attempts === 1 ? "Belum tepat." : "Coba lagi."} ${hint}`;
      feedback.dataset.state = "retry";
      feedback.hidden = false;
      fieldset.dataset.state = "retry";
      return;
    }

    state.completed = true;
    const answerText = correctAnswer(question).replace(/[.!?]+$/, "");
    feedback.textContent = `Jawaban: ${answerText}. ${question.explanation}`;
    feedback.dataset.state = "review";
    feedback.hidden = false;
    lockQuestion(fieldset, false);
    updateProgress(levelIndex);
  }

  function correctAnswer(question) {
    return Array.isArray(question.answer)
      ? question.answer.map((tokenIndex) => question.options[tokenIndex]).join(" ")
      : question.options[question.answer];
  }

  function lockQuestion(fieldset, correct) {
    fieldset.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    fieldset.dataset.state = correct ? "pass" : "review";
  }

  function updateProgress(levelIndex) {
    const level = levels[levelIndex];
    const state = questionStates[levelIndex];
    const completedCount = state.filter((question) => question.completed).length;
    const correctCount = state.filter((question) => question.correct).length;
    const points = state.reduce((sum, question) => sum + question.points, 0);
    const progressLabel = document.getElementById(`progress-${level.key}`);
    const result = document.getElementById(`result-${level.key}`);
    progressLabel.textContent = `${completedCount}/${level.questions.length} soal diperiksa`;
    if (completedCount === level.questions.length) {
      result.replaceChildren();
      const summary = document.createElement("p");
      summary.textContent = `Hasil ${level.title}: ${correctCount}/${level.questions.length} benar · ${points}/${level.questions.length * 3} poin.`;
      result.appendChild(summary);
      result.dataset.state = points >= level.questions.length * 3 * .8 ? "pass" : "retry";

      const skillTotals = new Map();
      level.questions.forEach((question, index) => {
        const total = skillTotals.get(question.skill) || { correct: 0, count: 0 };
        total.count += 1;
        if (state[index].correct) total.correct += 1;
        skillTotals.set(question.skill, total);
      });
      const reviewSkills = [...skillTotals.entries()].filter(([, total]) => total.correct / total.count < .8);
      const advice = document.createElement("p");
      advice.className = "guided-skill-review";
      if (reviewSkills.length) {
        advice.append("Topik untuk diulang: ");
        reviewSkills.forEach(([skill, total], index) => {
          if (index) advice.append(" · ");
          const link = document.createElement("a");
          link.href = skillGuide[skill].href;
          link.textContent = `${skillGuide[skill].label} (${total.correct}/${total.count})`;
          advice.appendChild(link);
        });
      } else {
        advice.textContent = "Semua topik di level ini sudah mencapai 80% atau lebih.";
      }
      result.appendChild(advice);
    }
    updateOverall();
  }

  function updateOverall() {
    const allStates = questionStates.flat();
    const completedCount = allStates.filter((question) => question.completed).length;
    progress.textContent = `${completedCount} dari ${allStates.length} soal diperiksa`;
    if (completedCount !== allStates.length) return;

    const earned = allStates.reduce((sum, question) => sum + question.points, 0);
    const score = Math.round((earned / (allStates.length * 3)) * 100);
    const scores = JSON.parse(localStorage.getItem("el_quiz") || "{}");
    scores[moduleKey] = score;
    localStorage.setItem("el_quiz", JSON.stringify(scores));
    overall.textContent = `Skor akhir: ${score}% (${earned}/${allStates.length * 3} poin). ${score >= 80 ? "LULUS. Nilai tersimpan di dashboard." : "Belum lulus. Pelajari pembahasan dan ulangi latihan."}`;
    overall.dataset.state = score >= 80 ? "pass" : "retry";
  }

  levels.forEach((level, index) => quizContainer.appendChild(renderLevel(level, index)));
})();
