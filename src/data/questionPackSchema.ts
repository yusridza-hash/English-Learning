import { ModuleQuestion } from "./generatedModules";

export interface SkillGuideItem {
  label: string;
  href: string;
}

export interface RawBuildQuestionInput extends Partial<ModuleQuestion> {
  prompt: string;
  targetSentence?: string;
  options?: string[];
  answer?: number | number[];
  explanation: string;
}

export interface QuestionPack {
  moduleKey: string;
  title?: string;
  mode?: "append" | "replace";
  skillGuide?: Record<string, SkillGuideItem>;
  levels: {
    simple?: (ModuleQuestion | RawBuildQuestionInput)[];
    intermediate?: (ModuleQuestion | RawBuildQuestionInput)[];
    complex?: (ModuleQuestion | RawBuildQuestionInput)[];
  };
}

const CUSTOM_PACKS_STORAGE_KEY = "el_custom_packs";

/**
 * Helper for TypeScript question pack files in /src/data/question-packs/
 */
export function defineQuestionPack(pack: QuestionPack): QuestionPack {
  return pack;
}

export function qChoice(
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  extra: Partial<ModuleQuestion> = {}
): ModuleQuestion {
  return {
    type: "choice",
    prompt,
    options,
    answer,
    explanation,
    ...extra,
  };
}

export function qDialogue(
  prompt: string,
  dialogue: [string, string][],
  options: string[],
  answer: number,
  explanation: string,
  extra: Partial<ModuleQuestion> = {}
): ModuleQuestion {
  return {
    type: "dialogue",
    prompt,
    dialogue,
    options,
    answer,
    explanation,
    ...extra,
  };
}

export function qEdit(
  prompt: string,
  draft: string,
  options: string[],
  answer: number,
  explanation: string,
  extra: Partial<ModuleQuestion> = {}
): ModuleQuestion {
  return {
    type: "edit",
    prompt,
    draft,
    options,
    answer,
    explanation,
    ...extra,
  };
}

/**
 * Automatically builds a sentence-building question from a target sentence or token array
 * so AI agents never make token-index counting errors.
 */
export function qBuild(
  prompt: string,
  targetSentenceOrTokens: string | string[],
  explanation: string,
  extra: Partial<ModuleQuestion> = {}
): ModuleQuestion {
  const orderedTokens = Array.isArray(targetSentenceOrTokens)
    ? targetSentenceOrTokens.map((t) => t.trim()).filter(Boolean)
    : targetSentenceOrTokens.trim().split(/\s+/);

  // Reverse/interleave tokens deterministically as initial bank order
  const indexed = orderedTokens.map((token, origIdx) => ({ token, origIdx }));
  const scrambled = [...indexed].sort((a, b) => {
    const lenDiff = a.token.length - b.token.length;
    return lenDiff !== 0 ? lenDiff : b.origIdx - a.origIdx;
  });

  const options = scrambled.map((item) => item.token);
  const answer = orderedTokens.map((_, origIdx) =>
    scrambled.findIndex((item) => item.origIdx === origIdx)
  );

  return {
    type: "build",
    prompt,
    options,
    answer,
    explanation,
    ...extra,
  };
}

export function normalizeSingleQuestion(
  raw: ModuleQuestion | RawBuildQuestionInput
): ModuleQuestion | null {
  if (!raw || typeof raw.prompt !== "string" || !raw.prompt.trim()) {
    return null;
  }

  // Support AI shorthand: { type: "build", prompt: "...", targetSentence: "She goes to work.", explanation: "..." }
  if (
    raw.type === "build" &&
    "targetSentence" in raw &&
    typeof raw.targetSentence === "string" &&
    raw.targetSentence.trim()
  ) {
    return qBuild(raw.prompt.trim(), raw.targetSentence.trim(), raw.explanation || "", {
      hints: raw.hints,
      skill: raw.skill,
      skillLabel: raw.skillLabel,
      skillAnchor: raw.skillAnchor,
    });
  }

  if (!Array.isArray(raw.options) || raw.options.length < 2 || raw.answer === undefined) {
    return null;
  }

  if (raw.type === "build") {
    if (!Array.isArray(raw.answer) || raw.answer.length !== raw.options.length) {
      return null;
    }
  } else if (typeof raw.answer === "number") {
    if (raw.answer < 0 || raw.answer >= raw.options.length) {
      return null;
    }
  }

  return {
    prompt: raw.prompt.trim(),
    options: raw.options.map((o) => String(o)),
    answer: raw.answer,
    explanation: raw.explanation || "",
    type: raw.type,
    dialogue: raw.dialogue,
    draft: raw.draft,
    hints: raw.hints,
    wrongFeedback: raw.wrongFeedback,
    skill: raw.skill,
    skillLabel: raw.skillLabel,
    skillAnchor: raw.skillAnchor,
  };
}

export function validateAndNormalizeQuestionPack(input: unknown): {
  ok: boolean;
  pack?: QuestionPack;
  normalizedLevels?: {
    simple: ModuleQuestion[];
    intermediate: ModuleQuestion[];
    complex: ModuleQuestion[];
  };
  totalAdded?: number;
  error?: string;
} {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Data pack harus berupa objek JSON." };
  }

  const candidate = input as Partial<QuestionPack>;
  if (!candidate.moduleKey || typeof candidate.moduleKey !== "string") {
    return {
      ok: false,
      error: 'Properti "moduleKey" wajib diisi (contoh: "00-foundation/04-articles").',
    };
  }

  if (!candidate.levels || typeof candidate.levels !== "object") {
    return {
      ok: false,
      error: 'Properti "levels" wajib berisi objek { simple, intermediate, complex }.',
    };
  }

  const normalizedLevels: {
    simple: ModuleQuestion[];
    intermediate: ModuleQuestion[];
    complex: ModuleQuestion[];
  } = {
    simple: [],
    intermediate: [],
    complex: [],
  };

  let invalidCount = 0;
  (["simple", "intermediate", "complex"] as const).forEach((lvl) => {
    const arr = candidate.levels?.[lvl];
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        const norm = normalizeSingleQuestion(item);
        if (norm) {
          normalizedLevels[lvl].push(norm);
        } else {
          invalidCount++;
        }
      });
    }
  });

  const totalAdded =
    normalizedLevels.simple.length +
    normalizedLevels.intermediate.length +
    normalizedLevels.complex.length;

  if (totalAdded === 0) {
    return {
      ok: false,
      error:
        "Tidak ada soal valid yang ditemukan. Pastikan setiap soal memiliki prompt, options, answer (atau targetSentence untuk tipe build), dan explanation.",
    };
  }

  return {
    ok: true,
    pack: {
      moduleKey: candidate.moduleKey.trim(),
      title: candidate.title,
      mode: candidate.mode === "replace" ? "replace" : "append",
      skillGuide: candidate.skillGuide,
      levels: normalizedLevels,
    },
    normalizedLevels,
    totalAdded,
    error:
      invalidCount > 0
        ? `${invalidCount} soal dilewati karena format kurang lengkap.`
        : undefined,
  };
}

export interface StoredCustomPack {
  id: string;
  filename: string;
  uploadedAt: string;
  isActive: boolean;
  pack: QuestionPack;
}

export function getCustomQuestionPacks(): StoredCustomPack[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_PACKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: any, idx: number) => {
      if (item && item.pack && typeof item.id === "string") {
        return item as StoredCustomPack;
      }
      return {
        id: `legacy-${idx}-${item.moduleKey || "mod"}`,
        filename: `${item.moduleKey || "imported"}-pack.json`,
        uploadedAt: new Date().toISOString(),
        isActive: true,
        pack: item as QuestionPack,
      };
    });
  } catch {
    return [];
  }
}

export function saveCustomQuestionPack(pack: QuestionPack, filename = "question-pack.json"): StoredCustomPack {
  const existing = getCustomQuestionPacks();
  const newItem: StoredCustomPack = {
    id: `pack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    filename,
    uploadedAt: new Date().toISOString(),
    isActive: true,
    pack,
  };
  const next = [...existing, newItem];
  localStorage.setItem(CUSTOM_PACKS_STORAGE_KEY, JSON.stringify(next));
  return newItem;
}

export function toggleCustomPackActive(id: string): void {
  const existing = getCustomQuestionPacks();
  const next = existing.map((item) =>
    item.id === id ? { ...item, isActive: !item.isActive } : item
  );
  localStorage.setItem(CUSTOM_PACKS_STORAGE_KEY, JSON.stringify(next));
}

export function deleteCustomPack(id: string): void {
  const existing = getCustomQuestionPacks();
  const next = existing.filter((item) => item.id !== id);
  localStorage.setItem(CUSTOM_PACKS_STORAGE_KEY, JSON.stringify(next));
}

export function clearCustomQuestionPacks(): void {
  localStorage.removeItem(CUSTOM_PACKS_STORAGE_KEY);
}

export function generateAIPromptForModule(
  moduleKey: string,
  moduleTitle: string,
  countPerLevel = 5
): string {
  return `Buatkan Question Pack JSON untuk modul bahasa Inggris berikut:
- moduleKey: "${moduleKey}"
- title: "${moduleTitle}"
- Jumlah soal: ${countPerLevel} soal per level ("simple", "intermediate", "complex").

ATURAN PEDAGOGIS & FORMAT:
1. Kembalikan HANYA JSON murni yang valid (tanpa teks pengantar di luar blok JSON).
2. Campurkan 4 tipe soal di setiap level:
   - "choice": Pilihan ganda biasa (answer = indeks 0, 1, atau 2).
   - "dialogue": Percakapan 2 orang (tambahkan "dialogue": [["Nama1", "Kalimat"], ["Nama2", "Kalimat ___"]]).
   - "edit": Menyunting kalimat salah (tambahkan "draft": "Kalimat yang salah.").
   - "build": Menyusun kata menjadi kalimat. Cukup isi "type": "build" dan "targetSentence": "Kalimat bahasa Inggris yang benar." (sistem otomatis mengacak token kata).
3. Berikan "explanation" singkat dalam bahasa Indonesia dan 2 "hints" bertahap yang tidak langsung membocorkan jawaban.

CONTOH STRUKTUR JSON YANG WAJIB DIIKUTI:
{
  "moduleKey": "${moduleKey}",
  "title": "${moduleTitle}",
  "mode": "append",
  "levels": {
    "simple": [
      {
        "type": "choice",
        "prompt": "Kalimat soal dengan ___ di sini.",
        "options": ["Opsi A", "Opsi B", "Opsi C"],
        "answer": 0,
        "explanation": "Penjelasan aturan grammar singkat.",
        "hints": ["Petunjuk pertama.", "Petunjuk kedua."],
        "skill": "${moduleKey.split("/")[1] || "core"}-simple"
      },
      {
        "type": "build",
        "prompt": "Susun kata berikut menjadi kalimat yang tepat.",
        "targetSentence": "Tulis kalimat bahasa Inggris yang benar di sini.",
        "explanation": "Penjelasan susunan kalimat.",
        "hints": ["Mulai dengan subject.", "Perhatikan posisi verb."],
        "skill": "${moduleKey.split("/")[1] || "core"}-build"
      }
    ],
    "intermediate": [
      {
        "type": "dialogue",
        "prompt": "Lengkapi respons dalam percakapan kerja berikut.",
        "dialogue": [
          ["Rina", "Pertanyaan atau pernyataan konteks?"],
          ["Bima", "Respons dengan ___ yang tepat."]
        ],
        "options": ["Opsi 1", "Opsi 2", "Opsi 3"],
        "answer": 1,
        "explanation": "Penjelasan mengapa Opsi 2 tepat.",
        "hints": ["Perhatikan konteks waktu.", "Periksa auxiliary."]
      }
    ],
    "complex": [
      {
        "type": "edit",
        "prompt": "Perbaiki kesalahan grammar pada draft email berikut.",
        "draft": "Kalimat bahasa Inggris yang mengandung kesalahan grammar.",
        "options": [
          "Kalimat revisi yang benar.",
          "Kalimat pengecoh 1.",
          "Kalimat pengecoh 2."
        ],
        "answer": 0,
        "explanation": "Penjelasan koreksi kalimat.",
        "hints": ["Cek klausa utama.", "Periksa kesesuaian bentuk kata."]
      }
    ]
  }
}`;
}
