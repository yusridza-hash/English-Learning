import fs from "node:fs";
import path from "node:path";

const qbRaw = fs.readFileSync("src/data/questionBank.ts", "utf8");
const baseMatch = qbRaw.match(/export const QUESTION_BANK:[\s\S]*?= (\{[\s\S]*?\n\});/);
export const BASE_BANK = baseMatch ? eval(`(${baseMatch[1]})`) : {};

export function sigOf(q) {
  return `${q.type || "choice"}::${String(q.prompt || "").trim().toLowerCase()}`;
}

export function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Deterministic option rotation so correct answers distribute evenly across 0, 1, 2
 * without mutating correctness.
 */
export function makeChoice({ prompt, correct, distractors, explanation, hints, skill }) {
  if (!prompt || !correct || !explanation) {
    throw new Error(`Invalid choice item: ${prompt}`);
  }
  const uniqueOpts = [correct];
  for (const d of distractors) {
    if (d && !uniqueOpts.includes(d)) uniqueOpts.push(d);
  }
  if (uniqueOpts.length < 3) {
    throw new Error(`Choice item needs 3 unique options (${prompt}): ${JSON.stringify(uniqueOpts)}`);
  }
  const shift = hashStr(prompt) % 3;
  const opts = [uniqueOpts[0], uniqueOpts[1], uniqueOpts[2]];
  const rotated = opts.map((_, idx) => opts[(idx + shift) % 3]);
  const answer = rotated.indexOf(correct);
  return {
    type: "choice",
    prompt: prompt.trim(),
    options: rotated,
    answer,
    explanation: explanation.trim(),
    hints,
    skill,
  };
}

export function makeDialogue({ prompt, speakerA, lineA, speakerB, lineB, correct, distractors, explanation, hints, skill }) {
  if (!prompt || !lineA || !lineB || !correct || !explanation) {
    throw new Error(`Invalid dialogue item: ${prompt}`);
  }
  const uniqueOpts = [correct];
  for (const d of distractors) {
    if (d && !uniqueOpts.includes(d)) uniqueOpts.push(d);
  }
  if (uniqueOpts.length < 3) {
    throw new Error(`Dialogue item needs 3 unique options (${prompt}): ${JSON.stringify(uniqueOpts)}`);
  }
  const shift = hashStr(`${prompt}|${lineA}|${lineB}`) % 3;
  const opts = [uniqueOpts[0], uniqueOpts[1], uniqueOpts[2]];
  const rotated = opts.map((_, idx) => opts[(idx + shift) % 3]);
  const answer = rotated.indexOf(correct);
  return {
    type: "dialogue",
    prompt: prompt.trim(),
    dialogue: [
      [speakerA, lineA],
      [speakerB, lineB],
    ],
    options: rotated,
    answer,
    explanation: explanation.trim(),
    hints,
    skill,
  };
}

export function makeEdit({ prompt, draft, correct, distractors, explanation, hints, skill }) {
  if (!prompt || !draft || !correct || !explanation || draft.trim() === correct.trim()) {
    throw new Error(`Invalid edit item: ${prompt} | draft=${draft}`);
  }
  const uniqueOpts = [correct];
  for (const d of distractors) {
    if (d && !uniqueOpts.includes(d)) uniqueOpts.push(d);
  }
  if (uniqueOpts.length < 3) {
    throw new Error(`Edit item needs 3 unique options (${prompt}): ${JSON.stringify(uniqueOpts)}`);
  }
  const shift = hashStr(`${prompt}|${draft}`) % 3;
  const opts = [uniqueOpts[0], uniqueOpts[1], uniqueOpts[2]];
  const rotated = opts.map((_, idx) => opts[(idx + shift) % 3]);
  const answer = rotated.indexOf(correct);
  return {
    type: "edit",
    prompt: prompt.trim(),
    draft: draft.trim(),
    options: rotated,
    answer,
    explanation: explanation.trim(),
    hints,
    skill,
  };
}

export function makeBuild({ prompt, targetSentence, explanation, hints, skill }) {
  if (!prompt || !targetSentence || !explanation || targetSentence.trim().split(/\s+/).length < 3) {
    throw new Error(`Invalid build item: ${prompt} | ${targetSentence}`);
  }
  return {
    type: "build",
    prompt: prompt.trim(),
    targetSentence: targetSentence.trim(),
    explanation: explanation.trim(),
    hints,
    skill,
  };
}

export function expandFromPatterns(patterns) {
  const seen = new Set();
  const dedupPrompt = (basePrompt, disambiguator) => {
    const clean = String(basePrompt || "").trim();
    if (!seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      return clean;
    }
    const combined = `${clean} — ${disambiguator}`;
    if (!seen.has(combined.toLowerCase())) {
      seen.add(combined.toLowerCase());
      return combined;
    }
    let k = 2;
    while (seen.has(`${combined} (#${k})`.toLowerCase())) k++;
    const finalP = `${combined} (#${k})`;
    seen.add(finalP.toLowerCase());
    return finalP;
  };

  const choice = (patterns.choice || []).map((p, idx) =>
    makeChoice({
      ...p,
      prompt: dedupPrompt(p.prompt, `Konteks #${idx + 1}`),
    })
  );

  const dialogue = (patterns.dialogue || []).map((p) => {
    const cleanBase = p.prompt.replace(/\.$/, "");
    const linePart = p.lineB.includes("___")
      ? `${p.lineA} / ${p.lineB}`
      : p.lineB;
    const uniquePrompt = `${cleanBase}: "${linePart}"`;
    return makeDialogue({
      ...p,
      prompt: dedupPrompt(uniquePrompt, `${p.speakerA}/${p.speakerB}: ${p.lineA}`),
    });
  });

  const edit = (patterns.edit || []).map((p) => {
    const cleanBase = p.prompt.replace(/\.$/, "");
    const uniquePrompt = `${cleanBase}: "${p.draft}"`;
    return makeEdit({
      ...p,
      prompt: dedupPrompt(uniquePrompt, p.skill || "revisi"),
    });
  });

  const build = (patterns.build || []).map((p) => {
    const words = String(p.targetSentence || "").trim().split(/\s+/);
    const sortedTag = [...words]
      .sort((a, b) => a.length - b.length || a.localeCompare(b))
      .slice(0, 3)
      .join(" · ");
    const cleanBase = p.prompt.replace(/\.$/, "");
    const prompt = seen.has(p.prompt.trim().toLowerCase())
      ? dedupPrompt(`${cleanBase} (${words.length} kata; fokus: ${sortedTag}).`, words.join(" ").slice(0, 24))
      : dedupPrompt(p.prompt, `${words.length} kata`);
    return makeBuild({
      ...p,
      prompt,
    });
  });

  return { choice, dialogue, edit, build };
}

export function packPool({
  skill,
  hints = ["Perhatikan struktur klausa dan kesesuaian bentuk kata.", "Sesuaikan pilihan dengan konteks kalimat."],
  choices = [],
  dialogues = [],
  edits = [],
  builds = [],
}) {
  return expandFromPatterns({
    choice: choices.map(([prompt, correct, b1, b2, explanation, sk, h]) => ({
      prompt,
      correct,
      distractors: [b1, b2],
      explanation,
      hints: h || hints,
      skill: sk || skill,
    })),
    dialogue: dialogues.map(([speakerA, lineA, speakerB, lineB, correct, b1, b2, explanation, sk, h]) => ({
      prompt: "Lengkapi percakapan berikut dengan bentuk yang tepat.",
      speakerA,
      lineA,
      speakerB,
      lineB,
      correct,
      distractors: [b1, b2],
      explanation,
      hints: h || hints,
      skill: sk || skill,
    })),
    edit: edits.map(([draft, correct, b1, explanation, sk, h]) => ({
      prompt: "Perbaiki kesalahan tata bahasa pada kalimat berikut.",
      draft,
      correct,
      distractors: [b1, draft],
      explanation,
      hints: h || hints,
      skill: sk || skill,
    })),
    build: builds.map(([meaningId, targetSentence, explanation, sk, h]) => ({
      prompt: `Susun kata bahasa Inggris untuk makna: "${meaningId}".`,
      targetSentence,
      explanation,
      hints: h || hints,
      skill: sk || skill,
    })),
  });
}

/**
 * Picks items sequentially up to `needed` using a balanced 4-type schedule:
 * ~35% choice (7/20), ~25% dialogue (5/20), ~25% edit (5/20), ~15% build (3/20).
 */
export function selectBalancedPool(candidatesByType, existingSigs, needed) {
  const schedule = [
    "choice", "dialogue", "edit", "choice", "build",
    "choice", "dialogue", "edit", "choice", "dialogue",
    "edit", "build", "choice", "dialogue", "edit",
    "choice", "dialogue", "edit", "choice", "build",
  ];

  const queues = {
    choice: (candidatesByType.choice || []).filter((q) => {
      const s = sigOf(q);
      return !existingSigs.has(s);
    }),
    dialogue: (candidatesByType.dialogue || []).filter((q) => {
      const s = sigOf(q);
      return !existingSigs.has(s);
    }),
    edit: (candidatesByType.edit || []).filter((q) => {
      const s = sigOf(q);
      return !existingSigs.has(s);
    }),
    build: (candidatesByType.build || []).filter((q) => {
      const s = sigOf(q);
      return !existingSigs.has(s);
    }),
  };

  const result = [];
  const localSeen = new Set(existingSigs);
  let cursor = 0;

  while (result.length < needed) {
    const preferred = schedule[cursor % schedule.length];
    cursor++;

    let chosen = null;
    const order = [preferred, "choice", "dialogue", "edit", "build"];
    for (const t of order) {
      while (queues[t].length > 0) {
        const candidate = queues[t].shift();
        const sig = sigOf(candidate);
        if (!localSeen.has(sig)) {
          localSeen.add(sig);
          chosen = candidate;
          break;
        }
      }
      if (chosen) break;
    }

    if (!chosen) {
      throw new Error(
        `Insufficient unique candidates! Needed ${needed}, got ${result.length}. Remaining: ` +
          JSON.stringify({
            choice: queues.choice.length,
            dialogue: queues.dialogue.length,
            edit: queues.edit.length,
            build: queues.build.length,
          })
      );
    }
    result.push(chosen);
  }

  return result;
}

export function updateModulePack(moduleKey, buildersByLevel, targetPerLevel = 100) {
  const packPath = path.join("src/data/question-packs", `${moduleKey}.pack.json`);
  const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
  const baseLevels = BASE_BANK[moduleKey]?.levels || { simple: [], intermediate: [], complex: [] };

  const existingAllSigs = new Set();
  for (const lvl of ["simple", "intermediate", "complex"]) {
    for (const q of baseLevels[lvl] || []) existingAllSigs.add(sigOf(q));
    for (const q of pack.levels[lvl] || []) existingAllSigs.add(sigOf(q));
  }

  const report = {};
  for (const lvl of ["simple", "intermediate", "complex"]) {
    const baseArr = baseLevels[lvl] || [];
    const packArr = pack.levels[lvl] || [];
    const lvlSigs = new Set(baseArr.map(sigOf));
    const cleanPackArr = [];
    for (const q of packArr) {
      const s = sigOf(q);
      if (!lvlSigs.has(s)) {
        lvlSigs.add(s);
        cleanPackArr.push(q);
      }
    }

    const currentTotal = lvlSigs.size;
    const needed = Math.max(0, targetPerLevel - currentTotal);
    if (needed > 0) {
      const candidates = buildersByLevel[lvl]();
      const picked = selectBalancedPool(candidates, existingAllSigs, needed);
      for (const q of picked) {
        existingAllSigs.add(sigOf(q));
        cleanPackArr.push(q);
      }
    }
    pack.levels[lvl] = cleanPackArr;
    report[lvl] = baseArr.length + cleanPackArr.length;
  }

  fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n", "utf8");
  return report;
}

export function auditLevelPacks(levelId, minPerLevel = 100) {
  const dir = path.join("src/data/question-packs", levelId);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".pack.json")).sort();
  let totalQuestions = 0;
  const issues = [];

  for (const f of files) {
    const pack = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    const baseLevels = BASE_BANK[pack.moduleKey]?.levels || { simple: [], intermediate: [], complex: [] };
    for (const lvl of ["simple", "intermediate", "complex"]) {
      const seen = new Set((baseLevels[lvl] || []).map(sigOf));
      for (const q of pack.levels[lvl] || []) {
        const s = sigOf(q);
        if (seen.has(s)) {
          issues.push(`Duplicate in ${pack.moduleKey}/${lvl}: ${s}`);
        }
        seen.add(s);

        if (!q.prompt || !q.explanation) {
          issues.push(`Missing prompt/explanation in ${pack.moduleKey}/${lvl}`);
        }
        if (q.type === "build") {
          const words = String(q.targetSentence || "").trim().split(/\s+/);
          if (words.length < 3) {
            issues.push(`Too short build sentence in ${pack.moduleKey}/${lvl}: ${q.targetSentence}`);
          }
        } else {
          if (!Array.isArray(q.options) || q.options.length < 2 || typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length) {
            issues.push(`Bad options/answer in ${pack.moduleKey}/${lvl}: ${q.prompt}`);
          }
          if (new Set(q.options).size !== q.options.length) {
            issues.push(`Duplicate options in ${pack.moduleKey}/${lvl}: ${q.prompt}`);
          }
          if (q.type === "edit" && (!q.draft || q.draft === q.options[q.answer])) {
            issues.push(`Invalid edit draft in ${pack.moduleKey}/${lvl}: ${q.prompt}`);
          }
          if (q.type === "dialogue" && (!Array.isArray(q.dialogue) || q.dialogue.length < 2)) {
            issues.push(`Invalid dialogue in ${pack.moduleKey}/${lvl}: ${q.prompt}`);
          }
        }
      }
      if (seen.size < minPerLevel) {
        issues.push(`Under target (${seen.size}/${minPerLevel}) in ${pack.moduleKey}/${lvl}`);
      }
      totalQuestions += seen.size;
    }
  }

  return { levelId, modules: files.length, totalQuestions, issues };
}
