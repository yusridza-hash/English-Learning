(() => {
  const key = document.body.dataset.module;
  const generatedModule = document.getElementById("generatedModule");
  const moduleContent = window.MODULE_CONTENT?.[key];

  if (generatedModule && moduleContent) {
    initializeGeneratedModule(moduleContent);
    return;
  }

  initializeLegacyModule();

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function initializeLegacyModule() {
    const checklist = [...document.querySelectorAll("[data-check]")];
    const quiz = document.getElementById("quizForm");
    const result = document.getElementById("quizResult");
    if (!quiz || !result) return;

    const savedChecks = JSON.parse(localStorage.getItem("el_check") || "{}");
    const savedScores = JSON.parse(localStorage.getItem("el_quiz") || "{}");
    checklist.forEach((item, index) => {
      item.checked = Boolean((savedChecks[key] || [])[index]);
      item.addEventListener("change", () => {
        const checks = JSON.parse(localStorage.getItem("el_check") || "{}");
        checks[key] = checklist.map((checkbox) => checkbox.checked);
        localStorage.setItem("el_check", JSON.stringify(checks));
      });
    });

    if (savedScores[key] != null) {
      result.textContent = `Skor terakhir: ${savedScores[key]}%`;
      result.dataset.state = savedScores[key] >= 80 ? "pass" : "retry";
    }

    quiz.addEventListener("submit", (event) => {
      event.preventDefault();
      const questions = [...quiz.querySelectorAll(".question")];
      const answered = questions.filter((question) => question.querySelector("input:checked"));
      if (answered.length !== questions.length) {
        result.textContent = `Jawab semua pertanyaan terlebih dahulu (${answered.length}/${questions.length}).`;
        result.dataset.state = "retry";
        return;
      }
      const correct = questions.filter((question) => question.querySelector("input:checked").dataset.correct === "true").length;
      const score = Math.round((correct / questions.length) * 100);
      const scores = JSON.parse(localStorage.getItem("el_quiz") || "{}");
      scores[key] = score;
      localStorage.setItem("el_quiz", JSON.stringify(scores));
      result.textContent = `Skor: ${score}% (${correct}/${questions.length}). ${score >= 80 ? "LULUS. Bagus, lanjutkan." : "Belum lulus. Baca ulang materi lalu coba lagi."}`;
      result.dataset.state = score >= 80 ? "pass" : "retry";
    });
  }

  function buildStages(content) {
    const enrichment = window.MODULE_ENRICHMENT?.[key] || {};
    return [
      { key: "simple", label: "01 · Simple", materialId: "materi-simple", quizId: "latihan-simple", section: content.sections[0], questions: expandPractice([ ...content.quiz.slice(0, 2), ...(enrichment.quiz?.simple || []) ], content, "simple") },
      { key: "intermediate", label: "02 · Intermediate", materialId: "materi-intermediate", quizId: "latihan-intermediate", section: content.sections[1], questions: expandPractice([ ...content.quiz.slice(2, 4), ...(enrichment.quiz?.intermediate || []) ], content, "intermediate") },
      { key: "complex", label: "03 · Complex", materialId: "materi-complex", quizId: "latihan-complex", section: enrichment.complex || content.sections[1], questions: expandPractice([ content.quiz[4], ...(enrichment.quiz?.complex || []) ].filter(Boolean), content, "complex") }
    ];
  }

  function inferSkill(content, question, level) {
    const text = `${content.title} ${content.focus} ${question.prompt} ${question.explanation}`.toLowerCase();
    const rules = [
      [/article|a \/ an|\bthe\b/, "articles", "Articles: pilihan dan konteks"],
      [/plural|countable|uncountable|noun/, "noun-forms", "Bentuk noun dan jumlah"],
      [/pronoun|possessive|reflexive/, "pronouns", "Fungsi dan rujukan pronoun"],
      [/preposition|\bat\b|\bon\b|\bin\b/, "prepositions", "Pilihan preposition"],
      [/question|wh-word|auxiliary/, "question-forms", "Susunan pertanyaan"],
      [/negative|doesn't|don't|negatif/, "negatives", "Bentuk negatif"],
      [/passive|past participle|\bv3\b/, "passive-form", "Bentuk passive"],
      [/conditional|\bif\b|would have/, "conditional-form", "Struktur conditional"],
      [/reported speech|reporting verb|say\/tell/, "reported-speech", "Reported speech"],
      [/gerund|infinitive|verb-ing/, "verb-pattern", "Pola gerund dan infinitive"],
      [/collocation/, "collocations", "Collocation dan pasangan kata"],
      [/inversion/, "inversion", "Inversion dan auxiliary"],
      [/relative clause|relative pronoun/, "relative-clauses", "Relative clause"],
      [/modal|\bcan\b|\bmust\b|\bshould\b/, "modals", "Makna dan bentuk modal"],
      [/future|\bwill\b|going to/, "future-forms", "Bentuk future"],
      [/past|yesterday|lampau/, "past-forms", "Bentuk past"],
      [/comparative|superlative|than\b/, "comparisons", "Bentuk perbandingan"],
      [/quantifier|much|many|few|little/, "quantifiers", "Pemilihan quantifier"],
      [/adverb|frequency|usually|often|never/, "adverb-position", "Posisi adverb"],
      [/linking word|connector|however|therefore/, "connectors", "Pilihan connector"],
      [/nominalization|nominalisation|nominal/, "nominalization", "Nominalization"],
      [/hedging|may indicate|might/, "hedging", "Kekuatan klaim"],
      [/\bam\b|\bis\b|\bare\b|to be/, "be-forms", "Kecocokan subject dan be"]
    ];
    const match = rules.find(([pattern]) => pattern.test(text));
    return match
      ? { key: match[1], label: match[2] }
      : { key: `${level}-core`, label: `${content.title}: konsep ${level}` };
  }

  function expandPractice(questions, content, level) {
    if (!questions.length) return questions;
    const expanded = questions.map((question) => {
      const skill = inferSkill(content, question, level);
      return { ...question, skill: question.skill || skill.key, skillLabel: question.skillLabel || skill.label, skillAnchor: question.skillAnchor || `materi-${level}` };
    });
    const modes = ["dialogue", "edit", "build", "choice"];
    let variant = 0;

    while (expanded.length < 10) {
      const source = questions[variant % questions.length];
      const skill = inferSkill(content, source, level);
      const question = { ...source, options: [...source.options], skill: source.skill || skill.key, skillLabel: source.skillLabel || skill.label, skillAnchor: source.skillAnchor || `materi-${level}` };
      const mode = modes[variant % modes.length];
      const wrongIndex = question.options.findIndex((_, index) => index !== question.answer);
      const wrongOption = question.options[wrongIndex];

      if (mode === "dialogue" && !question.dialogue) {
        question.prompt = `Pilih respons rekan kerja yang tepat berdasarkan aturan ${content.focus}.`;
        question.dialogue = [["Rekan kerja", source.prompt], ["Kamu", "Respons yang sesuai:"]];
        question.type = "dialogue";
      } else if (mode === "edit" && !question.draft) {
        if (source.prompt.includes("___")) {
          question.draft = source.prompt.replace("___", wrongOption);
          question.prompt = "Sunting draft rutinitas kerja berikut. Pilih perbaikannya.";
          question.type = "edit";
        } else if (question.options.some((option) => /^[A-Z].*[.!?]$/.test(option))) {
          question.draft = question.options[wrongIndex];
          question.prompt = "Rekanmu menulis kalimat berikut. Pilih revisi yang tepat.";
          question.type = "edit";
        } else {
          question.prompt = `Dalam catatan kerja tentang ${content.focus}, ${source.prompt}`;
        }
      } else if (mode === "build" && Number.isInteger(question.answer)) {
        const answerText = question.options[question.answer];
        const tokens = answerText.match(/\S+/g);
        if (tokens && tokens.length > 1 && /[.!?]$/.test(answerText)) {
          question.options = [...tokens].reverse();
          question.answer = tokens.map((_, index) => tokens.length - index - 1);
          question.prompt = `Susun kata untuk membentuk contoh yang tepat tentang ${content.focus}.`;
          question.type = "build";
        } else {
          question.prompt = `Terapkan pola ${content.focus}: ${source.prompt}`;
        }
      } else {
        question.prompt = `Latihan konteks ${variant + 1} (${content.focus}): ${source.prompt}`;
      }

      expanded.push(question);
      variant += 1;
    }

    return expanded;
  }

  function initializeGeneratedModule(content) {
    const stages = buildStages(content);
    renderModuleMaterial(content, stages);
    const savedChecks = JSON.parse(localStorage.getItem("el_check") || "{}");
    const checklist = [...document.querySelectorAll("[data-check]")];
    const quizContainer = document.getElementById("generatedQuiz");
    const progress = document.getElementById("generatedQuizProgress");
    const overall = document.getElementById("generatedQuizResult");
    const states = stages.map((stage) => stage.questions.map(() => ({ attempts: 0, points: 0, correct: false, completed: false })));

    checklist.forEach((item, index) => {
      item.checked = Boolean((savedChecks[key] || [])[index]);
      item.addEventListener("change", () => {
        const checks = JSON.parse(localStorage.getItem("el_check") || "{}");
        checks[key] = checklist.map((checkbox) => checkbox.checked);
        localStorage.setItem("el_check", JSON.stringify(checks));
      });
    });

    stages.forEach((stage, levelIndex) => quizContainer.appendChild(renderQuizStage(stage, levelIndex)));

    function renderModuleMaterial(module, moduleStages) {
      const renderSection = (section, anchor) => `
        <section class="lesson-stage" id="${anchor}">
          <h2>${escapeHtml(section.title)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          ${section.examples?.map((example) => `<p class="example">${escapeHtml(example)}</p>`).join("") || ""}
          ${section.rule ? `<p class="rule"><b>${escapeHtml(section.rule)}</b></p>` : ""}
        </section>`;
      const material = moduleStages.map((stage) => `
        <p class="level">${stage.label}</p>
        ${renderSection(stage.section, stage.materialId)}
        <a class="guided-shortcut" href="#${stage.quizId}">Uji pemahaman ${stage.key} →</a>`).join("");
      const checkItems = module.checklist.map((item) => `<li><label><input type="checkbox" data-check> ${escapeHtml(item)}</label></li>`).join("");
      const questionCount = moduleStages.reduce((sum, stage) => sum + stage.questions.length, 0);
      generatedModule.innerHTML = `
        <p class="level">${escapeHtml(module.level)} / ${escapeHtml(module.number)}</p>
        <h1>${escapeHtml(module.title)}</h1>
        <p class="module-intro">${escapeHtml(module.intro)}</p>
        <p class="module-meta"><span>Fokus: ${escapeHtml(module.focus)}</span><span>3 tahap belajar</span><span>${questionCount} soal</span><span>Target: 80%</span></p>
        <nav class="guided-jump" aria-label="Navigasi materi dan latihan">
          ${moduleStages.map((stage) => `<a href="#${stage.materialId}">Materi ${stage.key}</a><a href="#${stage.quizId}">Kuis ${stage.key}</a>`).join("")}
        </nav>
        ${material}
        <section><h2>Cek pemahaman</h2><ul class="checklist">${checkItems}</ul></section>
        <section class="guided-practice-area"><p class="level">Latihan setelah materi</p><h2>Kuis bertahap</h2><p id="generatedQuizProgress" class="guided-quiz-progress" aria-live="polite">0 dari ${questionCount} soal diperiksa</p><div id="generatedQuiz"></div><p id="generatedQuizResult" class="guided-overall" aria-live="polite"></p></section>
        <footer class="footer-link"><a href="../index.html">← Kembali ke kurikulum</a></footer>`;
    }

    function renderQuizStage(stage, levelIndex) {
      const section = document.createElement("section");
      section.className = "guided-question-level";
      section.id = stage.quizId;
      section.innerHTML = `
        <p class="level">${stage.label} · ${stage.questions.length} soal</p>
        <h3>${escapeHtml(stage.key)}: latihan dan feedback</h3>
        <p>${escapeHtml(content.focus)}</p>
        <p class="guided-level-progress" id="generated-${stage.key}-progress" aria-live="polite">0/${stage.questions.length} soal diperiksa</p>
        <div class="guided-level-questions"></div>
        <p class="guided-level-result" id="generated-${stage.key}-result" aria-live="polite"></p>
        <a class="guided-shortcut guided-back" href="#${stage.materialId}">← Kembali ke materi ${escapeHtml(stage.key)}</a>`;
      const questions = section.querySelector(".guided-level-questions");
      stage.questions.forEach((question, questionIndex) => {
        questions.appendChild(renderQuestion(question, levelIndex, questionIndex));
      });
      return section;
    }

    function renderQuestion(question, levelIndex, questionIndex) {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "question guided-question";
      fieldset.innerHTML = `<legend>${questionIndex + 1}. ${escapeHtml(question.prompt)}</legend>`;
      if (question.dialogue) {
        const dialogue = document.createElement("div");
        dialogue.className = "guided-dialogue";
        dialogue.innerHTML = question.dialogue.map(([speaker, line], index) => `<p class="guided-dialogue-line${index % 2 ? " is-reply" : ""}"><b>${escapeHtml(speaker)}</b><span>${escapeHtml(line)}</span></p>`).join("");
        fieldset.appendChild(dialogue);
      }
      if (question.draft) {
        const draft = document.createElement("p");
        draft.className = "guided-draft";
        draft.innerHTML = `<span>Draft</span>${escapeHtml(question.draft)}`;
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
      if (question.type === "build") renderBuild(question, activity, fieldset, feedback, levelIndex, questionIndex);
      else question.options.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "guided-answer-choice";
        button.textContent = option;
        button.addEventListener("click", () => answer(question, optionIndex, fieldset, feedback, levelIndex, questionIndex));
        activity.appendChild(button);
      });
      return fieldset;
    }

    function renderBuild(question, activity, fieldset, feedback, levelIndex, questionIndex) {
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
      check.addEventListener("click", () => answer(question, selected.slice(), fieldset, feedback, levelIndex, questionIndex));
      reset.addEventListener("click", () => {
        selected.length = 0;
        built.replaceChildren();
        bank.querySelectorAll("button").forEach((button) => { button.disabled = false; });
        check.disabled = true;
      });
      activity.append(built, bank, check, reset);
    }

    function answer(question, selection, fieldset, feedback, levelIndex, questionIndex) {
      const state = states[levelIndex][questionIndex];
      if (state.completed) return;
      const correct = Array.isArray(question.answer)
        ? selection.length === question.answer.length && selection.every((token, index) => token === question.answer[index])
        : selection === question.answer;
      if (correct) {
        state.points = Math.max(1, 3 - state.attempts);
        state.correct = true;
        state.completed = true;
        feedback.textContent = `Tepat · ${state.points}/3 poin. ${escapeHtml(question.explanation)}`;
        feedback.dataset.state = "pass";
        feedback.hidden = false;
        lockQuestion(fieldset, true);
        updateStage(levelIndex);
        return;
      }
      state.attempts += 1;
      if (state.attempts < 3) {
        const optionHint = Array.isArray(selection) ? null : question.wrongFeedback?.[selection];
        const targetedHint = Array.isArray(optionHint) ? optionHint[state.attempts - 1] : optionHint;
        const fallback = ["Periksa subject dan petunjuk waktu pada kalimat.", "Periksa lagi pola grammar yang dibahas pada materi."];
        const hint = targetedHint || question.hints?.[state.attempts - 1] || question.skillHint?.[state.attempts - 1] || fallback[state.attempts - 1];
        feedback.textContent = `${state.attempts === 1 ? "Belum tepat." : "Coba lagi."} ${escapeHtml(hint)}`;
        feedback.dataset.state = "retry";
        feedback.hidden = false;
        fieldset.dataset.state = "retry";
        return;
      }
      state.completed = true;
      const answerText = Array.isArray(question.answer) ? question.answer.map((token) => question.options[token]).join(" ") : question.options[question.answer];
      feedback.textContent = `Jawaban: ${answerText}. ${question.explanation}`;
      feedback.dataset.state = "review";
      feedback.hidden = false;
      lockQuestion(fieldset, false);
      updateStage(levelIndex);
    }

    function lockQuestion(fieldset, correct) {
      fieldset.querySelectorAll("button").forEach((button) => { button.disabled = true; });
      fieldset.dataset.state = correct ? "pass" : "review";
    }

    function updateStage(levelIndex) {
      const stage = stages[levelIndex];
      const state = states[levelIndex];
      const completed = state.filter((question) => question.completed).length;
      const correct = state.filter((question) => question.correct).length;
      const points = state.reduce((sum, question) => sum + question.points, 0);
      document.getElementById(`generated-${stage.key}-progress`).textContent = `${completed}/${stage.questions.length} soal diperiksa`;
      if (completed === stage.questions.length) renderStageResult(stage, state, correct, points);
      updateOverall();
    }

    function renderStageResult(stage, state, correct, points) {
      const result = document.getElementById(`generated-${stage.key}-result`);
      result.replaceChildren();
      const summary = document.createElement("p");
      summary.textContent = `Hasil ${stage.key}: ${correct}/${stage.questions.length} benar · ${points}/${stage.questions.length * 3} poin.`;
      result.appendChild(summary);
      result.dataset.state = points >= stage.questions.length * 3 * .8 ? "pass" : "retry";
      const skills = new Map();
      stage.questions.forEach((question, index) => {
        const skill = question.skill || stage.key;
        const tally = skills.get(skill) || { correct: 0, count: 0 };
        tally.count += 1;
        if (state[index].correct) tally.correct += 1;
        skills.set(skill, tally);
      });
      const weakSkills = [...skills.entries()].filter(([, tally]) => tally.correct / tally.count < .8);
      const advice = document.createElement("p");
      advice.className = "guided-skill-review";
      if (weakSkills.length) {
        advice.append("Topik untuk diulang: ");
        weakSkills.forEach(([skill, tally], index) => {
          if (index) advice.append(" · ");
          const skillQuestion = stage.questions.find((question) => question.skill === skill);
          const guide = window.MODULE_SKILLS?.[key]?.[skill] || { label: skillQuestion?.skillLabel || content.title, anchor: skillQuestion?.skillAnchor || stage.materialId };
          const link = document.createElement("a");
          link.href = `#${guide.anchor || stage.materialId}`;
          link.textContent = `${guide.label} (${tally.correct}/${tally.count})`;
          advice.appendChild(link);
        });
      } else {
        advice.textContent = "Semua topik di level ini sudah mencapai 80% atau lebih.";
      }
      result.appendChild(advice);
    }

    function updateOverall() {
      const all = states.flat();
      const completed = all.filter((question) => question.completed).length;
      progress.textContent = `${completed} dari ${all.length} soal diperiksa`;
      if (completed !== all.length) return;
      const earned = all.reduce((sum, question) => sum + question.points, 0);
      const score = Math.round((earned / (all.length * 3)) * 100);
      const scores = JSON.parse(localStorage.getItem("el_quiz") || "{}");
      scores[key] = score;
      localStorage.setItem("el_quiz", JSON.stringify(scores));
      overall.textContent = `Skor akhir: ${score}% (${earned}/${all.length * 3} poin). ${score >= 80 ? "LULUS. Nilai tersimpan di dashboard." : "Belum lulus. Pelajari topik yang ditandai lalu ulangi latihan."}`;
      overall.dataset.state = score >= 80 ? "pass" : "retry";
    }
  }
})();
