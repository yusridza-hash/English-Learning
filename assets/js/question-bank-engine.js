
const skillGuide = window.SKILL_GUIDE || {};
const moduleSelect = document.getElementById("moduleSelect");
const levelFilter = document.getElementById("levelFilter");
const container = document.getElementById("bankContent");
const summaryBody = document.getElementById("bankSummaryBody");

const levelOrder = ["simple", "intermediate", "complex"];
const levelLabels = { simple: "Basic", intermediate: "Intermediate", complex: "Advanced" };

const moduleKeys = Object.keys(bank);
moduleKeys.forEach((key) => {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = `${key} — ${bank[key].title}`;
  moduleSelect.appendChild(opt);
});

const levelStats = { simple: 0, intermediate: 0, complex: 0 };
let totalModules = 0;
let totalQuestions = 0;
moduleKeys.forEach((key) => {
  totalModules++;
  levelOrder.forEach((levelKey) => {
    const qs = bank[key].levels[levelKey] || [];
    levelStats[levelKey] += qs.length;
    totalQuestions += qs.length;
  });
});

const levels = [
  { name: "Basic (simple)", count: levelStats.simple },
  { name: "Intermediate", count: levelStats.intermediate },
  { name: "Advanced (complex)", count: levelStats.complex },
];
levels.forEach((lvl) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${lvl.name}</td><td>${totalModules}</td><td>${lvl.count}</td><td>80%</td>`;
  summaryBody.appendChild(tr);
});

let currentModuleKey = null;
let currentLevelFilter = "all";
let questionStates = {};
let currentTotalQuestions = 0;

if (!bank) {
  document.getElementById("bankContent").innerHTML =
    "<p>Soal untuk modul ini belum tersedia. Silakan tambahkan data di question-bank.js.</p>";
  return;
}

const container = document.getElementById("bankContent");
function render() {
    container.innerHTML = "";
    if (!currentModuleKey || !bank[currentModuleKey]) {
      container.innerHTML = "<p>Pilih modul dari daftar di atas untuk melihat soal.</p>";
      return;
    }

    const mod = bank[currentModuleKey];
    const levelsToShow = currentLevelFilter === "all" ? levelOrder : [currentLevelFilter];

    questionStates = {};
    currentTotalQuestions = 0;

    levelsToShow.forEach((levelKey) => {
      const levelQuestions = mod.levels[levelKey] || [];
      if (!levelQuestions.length) return;

      currentTotalQuestions += levelQuestions.length;

      const section = document.createElement("section");
      section.className = "bank-level-section";
      section.id = `bank-${levelKey}`;

      const header = document.createElement("h2");
      header.textContent = `${levelLabels[levelKey]} · ${mod.title}`;
      section.appendChild(header);

      const form = document.createElement("form");
      form.className = "bank-quiz";
      form.id = `bankForm-${levelKey}`;

      levelQuestions.forEach((q, i) => {
        const stateKey = `${levelKey}-${i}`;
        questionStates[stateKey] = { completed: false, correct: false, points: 0, attempts: 0 };

        const fieldset = document.createElement("fieldset");
        fieldset.className = "bank-question";
        fieldset.dataset.level = levelKey;
        fieldset.dataset.index = i;

        const legend = document.createElement("legend");
        legend.textContent = `${i + 1}. ${q.prompt}`;
        fieldset.appendChild(legend);

        if (q.type === "dialogue" && q.dialogue) {
          const dialogue = document.createElement("div");
          dialogue.className = "bank-dialogue";
          q.dialogue.forEach(([speaker, line]) => {
            const dLine = document.createElement("div");
            dLine.className = "bank-dialogue-line";
            const speakerEl = document.createElement("b");
            speakerEl.textContent = speaker + ":";
            const lineEl = document.createElement("span");
            lineEl.textContent = line;
            dLine.appendChild(speakerEl);
            dLine.appendChild(lineEl);
            dialogue.appendChild(dLine);
          });
          fieldset.appendChild(dialogue);
        }

        if (q.type === "edit" && q.draft) {
          const draft = document.createElement("div");
          draft.className = "bank-draft";
          const label = document.createElement("span");
          label.textContent = "Edit kalimat ini:";
function attachListeners() {
    document.querySelectorAll(".bank-hints-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const levelKey = e.target.dataset.level;
        const index = parseInt(e.target.dataset.index, 10);
        const q = bank[currentModuleKey].levels[levelKey][index];
        const hintsContainer = document.getElementById(`hints-${levelKey}-${index}`);
        if (!q.hints) return;
        hintsContainer.innerHTML = "";
        q.hints.forEach((hint, hIdx) => {
          if (questionStates[`${levelKey}-${index}`].attempts > hIdx) {
            const p = document.createElement("p");
            p.className = "bank-hint";
            p.textContent = `Petunjuk ${hIdx + 1}: ${hint}`;
            hintsContainer.appendChild(p);
          }
        });
      });
    });

    document.querySelectorAll(".bank-check-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const levelKey = e.target.dataset.level;
        const index = parseInt(e.target.dataset.index, 10);
        checkAnswer(levelKey, index);
      });
    });

    document.querySelectorAll(".bank-answer-choice input").forEach((input) => {
      input.addEventListener("change", () => {
        const fieldset = input.closest(".bank-question");
        const levelKey = fieldset.dataset.level;
        const index = parseInt(fieldset.dataset.index, 10);
        const feedback = document.getElementById(`feedback-${levelKey}-${index}`);
        feedback.innerHTML = "";
        feedback.className = "bank-feedback";
      });
    });
  }
          const draftText = document.createElement("div");
          draftText.className = "bank-draft-text";
          draftText.textContent = q.draft;
          draft.appendChild(label);
          draft.appendChild(draftText);
          fieldset.appendChild(draft);
        }

        const choices = document.createElement("div");
        choices.className = "bank-answer-choices";

        q.options.forEach((opt, optIndex) => {
          const label = document.createElement("label");
          label.className = "bank-answer-choice";
          const input = document.createElement("input");
          input.type = "radio";
          input.name = `q-${levelKey}-${i}`;
          input.value = optIndex;
          input.dataset.optionIndex = optIndex;
          input.dataset.correct = optIndex === q.answer || (Array.isArray(q.answer) && q.answer.includes(optIndex));
          label.appendChild(input);
function checkAnswer(levelKey, index) {
    const stateKey = `${levelKey}-${index}`;
    const state = questionStates[stateKey];
    if (state.completed) return;

    state.attempts++;
    const fieldset = document.querySelector(`.bank-question[data-level="${levelKey}"][data-index="${index}"]`);
    const selected = fieldset.querySelector("input:checked");
    const feedback = document.getElementById(`feedback-${levelKey}-${index}`);
    const q = bank[currentModuleKey].levels[levelKey][index];

    feedback.innerHTML = "";

    if (!selected) {
      feedback.textContent = "Pilih jawaban terlebih dahulu.";
      feedback.className = "bank-feedback bank-feedback-retry";
      return;
    }

    const selectedIndex = parseInt(selected.value, 10);
    const isCorrect = selected.dataset.correct === "true";

    if (isCorrect) {
      state.completed = true;
      state.correct = true;
      state.points = state.attempts === 1 ? 3 : state.attempts === 2 ? 2 : 1;
      fieldset.dataset.state = "pass";
      feedback.textContent = `Benar! ${q.explanation}`;
      feedback.className = "bank-feedback bank-feedback-pass";
      selected.closest(".bank-answer-choice").style.borderColor = "#000";
      selected.closest(".bank-answer-choice").style.background = "#f7f7f7";
    } else {
      if (state.attempts >= 3) {
        state.completed = true;
        state.correct = false;
        state.points = 0;
        fieldset.dataset.state = "review";
        const correctAnswerText = Array.isArray(q.answer)
          ? q.answer.map((idx) => q.options[idx]).join(" ")
          : q.options[q.answer];
        feedback.textContent = `Salah. Jawaban benar: ${correctAnswerText}. ${q.explanation}`;
        feedback.className = "bank-feedback bank-feedback-review";
        if (q.wrongFeedback && q.wrongFeedback[selectedIndex]) {
          const wf = document.createElement("p");
          wf.className = "bank-wrong-feedback";
          wf.textContent = `Petunjuk: ${q.wrongFeedback[selectedIndex][0]}`;
          feedback.appendChild(wf);
        }
      } else {
        fieldset.dataset.state = "retry";
        const hint = q.hints && q.hints[state.attempts - 1] ? q.hints[state.attempts - 1] : "Coba lagi.";
        feedback.textContent = `Salah. ${hint}`;
        feedback.className = "bank-feedback bank-feedback-retry";
        if (q.wrongFeedback && q.wrongFeedback[selectedIndex]) {
          const wf = document.createElement("p");
          wf.className = "bank-wrong-feedback";
          wf.textContent = q.wrongFeedback[selectedIndex][Math.min(state.attempts - 1, q.wrongFeedback[selectedIndex].length - 1)];
          feedback.appendChild(wf);
        }
      }
function updateProgress() {
    const levelsToShow = currentLevelFilter === "all" ? levelOrder : [currentLevelFilter];
    levelsToShow.forEach((levelKey) => {
      const levelQuestions = bank[currentModuleKey].levels[levelKey] || [];
      const result = document.getElementById(`result-${levelKey}`);
      if (!result) return;

      const completed = levelQuestions.filter((_, i) => questionStates[`${levelKey}-${i}`].completed).length;
      const correct = levelQuestions.filter((_, i) => questionStates[`${levelKey}-${i}`].correct).length;
      const points = levelQuestions.reduce((sum, _, i) => sum + questionStates[`${levelKey}-${i}`].points, 0);

      result.innerHTML = "";
      if (completed === levelQuestions.length) {
        const pct = Math.round((points / (levelQuestions.length * 3)) * 100);
        const p = document.createElement("p");
        p.textContent = `Hasil ${levelLabels[levelKey]}: ${correct}/${levelQuestions.length} benar · ${points}/${levelQuestions.length * 3} poin (${pct}%).`;
        result.appendChild(p);
        result.dataset.state = pct >= 80 ? "pass" : "retry";

        const skillTotals = {};
        levelQuestions.forEach((q, i) => {
          const st = `${levelKey}-${i}`;
          const skill = q.skill;
          if (!skillTotals[skill]) skillTotals[skill] = { correct: 0, count: 0 };
          skillTotals[skill].count += 1;
          if (questionStates[st].correct) skillTotals[skill].correct += 1;
        });
        const weakSkills = Object.entries(skillTotals).filter(([, t]) => t.correct / t.count < 0.8);
        if (weakSkills.length) {
          const advice = document.createElement("p");
          advice.className = "bank-skill-review";
          advice.textContent = "Topik untuk diulang: ";
          weakSkills.forEach(([skill, t], idx) => {
            if (idx) advice.textContent += " · ";
            const link = document.createElement("a");
            link.href = skillGuide[skill] ? skillGuide[skill].href : "#";
            link.textContent = `${skillGuide[skill] ? skillGuide[skill].label : skill} (${t.correct}/${t.count})`;
            advice.appendChild(link);
          });
          result.appendChild(advice);
        }
      } else {
        result.textContent = `${completed}/${levelQuestions.length} soal diperiksa`;
        result.dataset.state = "retry";
      }
    });

    updateOverall();
  }
      selected.disabled = true;
    }

    updateProgress();
  }
          const text = document.createElement("span");
          text.textContent = opt;
          label.appendChild(text);
          choices.appendChild(label);
        });

function updateOverall() {
    const allStates = Object.values(questionStates);
    const completedCount = allStates.filter((s) => s.completed).length;
    const overall = document.getElementById("bankOverall");

    if (completedCount !== currentTotalQuestions) {
      overall.textContent = `${completedCount} dari ${currentTotalQuestions} soal diperiksa`;
      overall.dataset.state = "retry";
      return;
    }

    const earned = allStates.reduce((sum, s) => sum + s.points, 0);
    const score = Math.round((earned / (currentTotalQuestions * 3)) * 100);

    const scores = JSON.parse(localStorage.getItem("el_quiz") || "{}");
// Event listeners for selectors
  moduleSelect.addEventListener("change", (e) => {
    currentModuleKey = e.target.value;
    render();
  });

  levelFilter.addEventListener("change", (e) => {
    currentLevelFilter = e.target.value;
    if (currentModuleKey) render();
  });

  // Auto-select first module if available
  if (moduleKeys.length > 0) {
    moduleSelect.value = moduleKeys[0];
    currentModuleKey = moduleKeys[0];
    render();
  }
})();

const bank = window.QUESTION_BANK || {};
const skillGuide = window.SKILL_GUIDE || {};
const moduleSelect = document.getElementById("moduleSelect");
const levelFilter = document.getElementById("levelFilter");
const container = document.getElementById("bankContent");
const summaryBody = document.getElementById("bankSummaryBody");

const levelOrder = ["simple", "intermediate", "complex"];
const levelLabels = { simple: "Basic", intermediate: "Intermediate", complex: "Advanced" };

const moduleKeys = Object.keys(bank);