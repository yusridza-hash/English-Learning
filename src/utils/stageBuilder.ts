import {
  GeneratedModuleContent,
  MODULE_ENRICHMENT,
  ModuleQuestion,
  ModuleSection,
} from "../data/generatedModules";
import { QUESTION_BANK } from "../data/questionBank";

export interface BuiltModuleStage {
  key: "simple" | "intermediate" | "complex";
  label: string;
  materialId: string;
  quizId: string;
  section: ModuleSection;
  questions: ModuleQuestion[];
}

export function inferSkill(
  content: GeneratedModuleContent,
  question: ModuleQuestion,
  level: string
): { key: string; label: string } {
  const text = `${content.title} ${content.focus} ${question.prompt} ${question.explanation || ""}`.toLowerCase();
  const rules: [RegExp, string, string][] = [
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
    [/\bam\b|\bis\b|\bare\b|to be/, "be-forms", "Kecocokan subject dan be"],
  ];
  const match = rules.find(([pattern]) => pattern.test(text));
  return match
    ? { key: match[1], label: match[2] }
    : { key: `${level}-core`, label: `${content.title}: konsep ${level}` };
}

function getExplanationForQuestion(
  moduleKey: string,
  question: ModuleQuestion,
  content: GeneratedModuleContent
): string {
  if (question.explanation) return question.explanation;
  const qbMod = QUESTION_BANK[moduleKey];
  if (qbMod) {
    const allQbQuestions = [
      ...(qbMod.levels.simple || []),
      ...(qbMod.levels.intermediate || []),
      ...(qbMod.levels.complex || []),
    ];
    const found = allQbQuestions.find((q) => q.prompt === question.prompt);
    if (found?.explanation) return found.explanation;
  }
  const ansText = Array.isArray(question.answer)
    ? question.answer.map((i) => question.options[i]).join(" ")
    : question.options[question.answer];
  return `Pilihan "${ansText}" sesuai dengan aturan ${content.focus}.`;
}

export function expandPractice(
  moduleKey: string,
  questions: ModuleQuestion[],
  content: GeneratedModuleContent,
  level: "simple" | "intermediate" | "complex"
): ModuleQuestion[] {
  if (!questions.length) return questions;

  const expanded: ModuleQuestion[] = questions.map((question) => {
    const skill = inferSkill(content, question, level);
    const explanation = getExplanationForQuestion(moduleKey, question, content);
    return {
      ...question,
      explanation,
      skill: question.skill || skill.key,
      skillLabel: question.skillLabel || skill.label,
      skillAnchor: question.skillAnchor || `materi-${level}`,
    };
  });

  const modes: ("dialogue" | "edit" | "build" | "choice")[] = ["dialogue", "edit", "build", "choice"];
  let variant = 0;

  while (expanded.length < 10) {
    const source = questions[variant % questions.length];
    const skill = inferSkill(content, source, level);
    const baseExplanation = getExplanationForQuestion(moduleKey, source, content);
    const question: ModuleQuestion = {
      ...source,
      options: [...source.options],
      explanation: baseExplanation,
      skill: source.skill || skill.key,
      skillLabel: source.skillLabel || skill.label,
      skillAnchor: source.skillAnchor || `materi-${level}`,
    };
    const mode = modes[variant % modes.length];
    const wrongIndex = question.options.findIndex((_, index) => index !== question.answer);
    const wrongOption = question.options[wrongIndex];

    if (mode === "dialogue" && !question.dialogue) {
      question.prompt = `Pilih respons rekan kerja yang tepat berdasarkan aturan ${content.focus}.`;
      question.dialogue = [
        ["Rekan kerja", source.prompt],
        ["Kamu", "Respons yang sesuai:"],
      ];
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
    } else if (mode === "build" && typeof question.answer === "number") {
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

export function buildStages(moduleKey: string, content: GeneratedModuleContent): BuiltModuleStage[] {
  const enrichment = MODULE_ENRICHMENT[moduleKey] || {};
  return [
    {
      key: "simple",
      label: "01 · Simple",
      materialId: "materi-simple",
      quizId: "latihan-simple",
      section: content.sections[0],
      questions: expandPractice(
        moduleKey,
        [...content.quiz.slice(0, 2), ...(enrichment.quiz?.simple || [])],
        content,
        "simple"
      ),
    },
    {
      key: "intermediate",
      label: "02 · Intermediate",
      materialId: "materi-intermediate",
      quizId: "latihan-intermediate",
      section: content.sections[1],
      questions: expandPractice(
        moduleKey,
        [...content.quiz.slice(2, 4), ...(enrichment.quiz?.intermediate || [])],
        content,
        "intermediate"
      ),
    },
    {
      key: "complex",
      label: "03 · Complex",
      materialId: "materi-complex",
      quizId: "latihan-complex",
      section: enrichment.complex || content.sections[2] || content.sections[1],
      questions: expandPractice(
        moduleKey,
        [content.quiz[4], ...(enrichment.quiz?.complex || [])].filter(Boolean),
        content,
        "complex"
      ),
    },
  ];
}
