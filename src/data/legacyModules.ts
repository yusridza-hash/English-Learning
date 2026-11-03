export interface LegacyQuizQuestion {
  num: number;
  name: string;
  prompt: string;
  options: { label: string; correct?: boolean }[];
}

export interface LegacyQuizStage {
  title: string;
  questions: LegacyQuizQuestion[];
}

export interface LegacyModuleData {
  key: string;
  levelLabel: string;
  title: string;
  intro: string;
  meta: string[];
  checklist: string[];
  stages: LegacyQuizStage[];
  footerLeft: { href: string; label: string };
  footerRight: { href: string; label: string };
}

export const LEGACY_MODULES: Record<string, LegacyModuleData> = {
  "00-foundation/04-articles": {
    key: "00-foundation/04-articles",
    levelLabel: "Level 0 · Foundation / 04",
    title: "Articles: a, an, the",
    intro: "Articles adalah kata kecil sebelum kata benda. Pilihannya bergantung pada apakah benda itu belum spesifik, sudah diketahui, atau dibicarakan secara umum.",
    meta: ["Fokus: noun phrases", "Waktu: 10 menit", "8 soal", "Target: 80%"],
    checklist: [
      "Aku bisa memilih a atau an berdasarkan bunyi awal.",
      "Aku tahu kapan memakai the untuk sesuatu yang spesifik.",
      "Aku bisa mengenali kata benda yang tidak memakai article umum.",
    ],
    stages: [
      {
        title: "01 · Simple",
        questions: [
          { num: 1, name: "q1", prompt: "She wants ___ orange.", options: [{ label: "an", correct: true }, { label: "a" }] },
          { num: 2, name: "q2", prompt: "I bought ___ book. ___ book is on the table.", options: [{ label: "a, The", correct: true }, { label: "the, A" }] },
          { num: 6, name: "q6", prompt: "She is ___ honest person.", options: [{ label: "an", correct: true }, { label: "a" }] },
        ],
      },
      {
        title: "02 · Intermediate",
        questions: [
          { num: 3, name: "q3", prompt: "___ water is essential for life. (makna umum)", options: [{ label: "Tanpa article", correct: true }, { label: "The" }] },
          { num: 4, name: "q4", prompt: "He studies at ___ university.", options: [{ label: "a", correct: true }, { label: "an" }] },
          { num: 7, name: "q7", prompt: "At dinner, could you pass me ___ salt on the table?", options: [{ label: "the", correct: true }, { label: "a" }] },
        ],
      },
      {
        title: "03 · Complex",
        questions: [
          { num: 5, name: "q5", prompt: "We waited for ___ hour.", options: [{ label: "an", correct: true }, { label: "a" }] },
          { num: 8, name: "q8", prompt: "___ feedback we received after the workshop was useful.", options: [{ label: "The", correct: true }, { label: "A" }] },
        ],
      },
    ],
    footerLeft: { href: "index.html", label: "← Kembali ke kurikulum" },
    footerRight: { href: "00-foundation/07-present-simple.html", label: "Modul berikutnya: Present Simple →" },
  },
  "01-elementary/01-past-simple": {
    key: "01-elementary/01-past-simple",
    levelLabel: "Level 1 · Elementary / 01",
    title: "Past Simple",
    intro: "Past Simple menceritakan peristiwa yang selesai pada waktu lampau. Gunakan kata kerja bentuk lampau di kalimat positif, tetapi bentuk dasar setelah did/didn't.",
    meta: ["Fokus: completed past events", "Waktu: 12 menit", "8 soal", "Target: 80%"],
    checklist: [
      "Aku bisa membentuk kata kerja beraturan dan mengenali kata kerja tidak beraturan.",
      "Aku ingat memakai bentuk dasar setelah did atau didn't.",
      "Aku bisa membuat kalimat dengan was/were.",
    ],
    stages: [
      {
        title: "01 · Simple",
        questions: [
          { num: 1, name: "q1", prompt: "We ___ a film last night.", options: [{ label: "watched", correct: true }, { label: "watch" }] },
          { num: 2, name: "q2", prompt: "He ___ to the office yesterday.", options: [{ label: "went", correct: true }, { label: "goed" }] },
          { num: 6, name: "q6", prompt: "She ___ the window before leaving. (close)", options: [{ label: "closed", correct: true }, { label: "close" }] },
        ],
      },
      {
        title: "02 · Intermediate",
        questions: [
          { num: 3, name: "q3", prompt: "I didn't ___ the answer.", options: [{ label: "know", correct: true }, { label: "knew" }] },
          { num: 4, name: "q4", prompt: "___ they arrive on time?", options: [{ label: "Did", correct: true }, { label: "Were" }] },
          { num: 7, name: "q7", prompt: "Did you ___ the new address?", options: [{ label: "remember", correct: true }, { label: "remembered" }] },
        ],
      },
      {
        title: "03 · Complex",
        questions: [
          { num: 5, name: "q5", prompt: "We ___ tired after the trip.", options: [{ label: "were", correct: true }, { label: "did" }] },
          { num: 8, name: "q8", prompt: "After the driver ___ the wrong turn, we stopped to check the map.", options: [{ label: "took", correct: true }, { label: "take" }] },
        ],
      },
    ],
    footerLeft: { href: "index.html", label: "← Kembali ke kurikulum" },
    footerRight: { href: "index.html", label: "Lihat modul lainnya →" },
  },
  "02-intermediate/04-passive-basic": {
    key: "02-intermediate/04-passive-basic",
    levelLabel: "Level 2 · Intermediate / 04",
    title: "Passive Voice: dasar",
    intro: "Kalimat pasif menempatkan penerima tindakan sebagai fokus. Gunakan be yang sesuai dengan tense, lalu past participle (V3).",
    meta: ["Fokus: be + past participle", "Waktu: 12 menit", "8 soal", "Target: 80%"],
    checklist: [
      "Aku bisa menemukan object yang menjadi fokus kalimat pasif.",
      "Aku bisa mencocokkan be dengan tense dan subject.",
      "Aku tahu kapan pelaku dengan by dapat dihilangkan.",
    ],
    stages: [
      {
        title: "01 · Simple",
        questions: [
          { num: 1, name: "q1", prompt: "The emails ___ every morning.", options: [{ label: "are checked", correct: true }, { label: "is checked" }] },
          { num: 2, name: "q2", prompt: "The window ___ during the storm last night.", options: [{ label: "was broken", correct: true }, { label: "is broken" }] },
          { num: 6, name: "q6", prompt: "The equipment ___ before each trip. (inspect)", options: [{ label: "is inspected", correct: true }, { label: "inspects" }] },
        ],
      },
      {
        title: "02 · Intermediate",
        questions: [
          { num: 3, name: "q3", prompt: "The report will ___ next week.", options: [{ label: "be published", correct: true }, { label: "published" }] },
          { num: 4, name: "q4", prompt: "Passive dari “They make these chairs in Indonesia.”", options: [{ label: "These chairs are made in Indonesia.", correct: true }, { label: "These chairs made in Indonesia." }] },
          { num: 7, name: "q7", prompt: "Active: “The team will publish the results.”", options: [{ label: "The results will be published by the team.", correct: true }, { label: "The results will published by the team." }] },
        ],
      },
      {
        title: "03 · Complex",
        questions: [
          { num: 5, name: "q5", prompt: "Passive dari “Someone stole my bike” adalah:", options: [{ label: "My bike was stolen.", correct: true }, { label: "My bike stolen." }] },
          { num: 8, name: "q8", prompt: "Dalam ‘English is spoken worldwide’, pelaku dihilangkan karena...", options: [{ label: "pelakunya umum dan tidak penting disebutkan", correct: true }, { label: "kalimat pasif tidak boleh memakai pelaku" }] },
        ],
      },
    ],
    footerLeft: { href: "index.html", label: "← Kembali ke kurikulum" },
    footerRight: { href: "index.html", label: "Lihat modul lainnya →" },
  },
  "03-upper-intermediate/03-conditionals-3-mixed": {
    key: "03-upper-intermediate/03-conditionals-3-mixed",
    levelLabel: "Level 3 · Upper-Intermediate / 03",
    title: "Conditional 3 & Mixed",
    intro: "Conditional type 3 membayangkan hasil berbeda di masa lalu. Mixed conditionals menghubungkan kondisi lampau dengan hasil sekarang, atau keadaan sekarang dengan hasil lampau.",
    meta: ["Fokus: unreal past & consequences", "Waktu: 15 menit", "8 soal", "Target: 80%"],
    checklist: [
      "Aku bisa membentuk third conditional dengan past perfect dan would have + V3.",
      "Aku bisa membedakan hasil lampau dari hasil sekarang.",
      "Aku bisa menjelaskan fakta nyata yang tersirat dalam conditional.",
    ],
    stages: [
      {
        title: "01 · Simple",
        questions: [
          { num: 1, name: "q1", prompt: "If I ___ the map, I wouldn't have got lost.", options: [{ label: "had brought", correct: true }, { label: "brought" }] },
          { num: 2, name: "q2", prompt: "They ___ the deadline if they had started earlier.", options: [{ label: "would have met", correct: true }, { label: "would meet" }] },
          { num: 6, name: "q6", prompt: "If we had booked sooner, we ___ money.", options: [{ label: "would have saved", correct: true }, { label: "would save" }] },
        ],
      },
      {
        title: "02 · Intermediate",
        questions: [
          { num: 3, name: "q3", prompt: "If she had accepted the offer, she ___ in Singapore now.", options: [{ label: "would be", correct: true }, { label: "would have been" }] },
          { num: 4, name: "q4", prompt: "If I were more organized, I ___ the document yesterday.", options: [{ label: "wouldn't have forgotten", correct: true }, { label: "wouldn't forget" }] },
          { num: 7, name: "q7", prompt: "If they had invested in training, staff ___ more confident now.", options: [{ label: "would feel", correct: true }, { label: "would have felt" }] },
        ],
      },
      {
        title: "03 · Complex",
        questions: [
          { num: 5, name: "q5", prompt: "“If he had called, I would have helped.” What is implied?", options: [{ label: "He didn't call, so I didn't help.", correct: true }, { label: "He called, so I helped." }] },
          { num: 8, name: "q8", prompt: "If he were more attentive, he ___ the email yesterday.", options: [{ label: "wouldn't have missed", correct: true }, { label: "wouldn't miss" }] },
        ],
      },
    ],
    footerLeft: { href: "index.html", label: "← Kembali ke kurikulum" },
    footerRight: { href: "index.html", label: "Lihat modul lainnya →" },
  },
  "04-advanced-formal/03-hedging": {
    key: "04-advanced-formal/03-hedging",
    levelLabel: "Level 4 · Advanced-Formal / 03",
    title: "Hedging: menyatakan klaim dengan tepat",
    intro: "Dalam tulisan akademik dan profesional, hedging menunjukkan tingkat kepastian secara jujur. Tujuannya bukan membuat tulisan kabur, tetapi menyesuaikan kekuatan klaim dengan bukti.",
    meta: ["Fokus: calibrated claims", "Waktu: 15 menit", "8 soal", "Target: 80%"],
    checklist: [
      "Aku bisa memilih hedge sesuai kekuatan dan cakupan bukti.",
      "Aku tahu cara memakai modal atau reporting verb untuk membatasi klaim.",
      "Aku dapat menghindari klaim mutlak dan hedge berlebihan.",
    ],
    stages: [
      {
        title: "01 · Simple",
        questions: [
          { num: 1, name: "q1", prompt: "Bukti awal terbatas dan perlu penelitian tambahan. Pilih klaim paling tepat.", options: [{ label: "The findings may indicate a possible association.", correct: true }, { label: "The findings prove the cause." }] },
          { num: 2, name: "q2", prompt: "Pilih reporting verb yang lazim dipakai untuk interpretasi berhati-hati.", options: [{ label: "suggest", correct: true }, { label: "guarantee" }] },
          { num: 6, name: "q6", prompt: "Pilot study kecil menunjukkan kecenderungan. Pilih klaim yang sepadan.", options: [{ label: "The results may indicate a trend.", correct: true }, { label: "The results prove the effect for everyone." }] },
        ],
      },
      {
        title: "02 · Intermediate",
        questions: [
          { num: 3, name: "q3", prompt: "Data menunjukkan kecenderungan, bukan kepastian. Kalimat mana paling tepat?", options: [{ label: "The results appear to support this explanation.", correct: true }, { label: "The results unquestionably prove this explanation." }] },
          { num: 4, name: "q4", prompt: "Apa masalah utama dari “It might possibly perhaps be true”?", options: [{ label: "Terlalu banyak hedge untuk satu klaim.", correct: true }, { label: "Tidak ada kata kerja." }] },
          { num: 7, name: "q7", prompt: "Studi observasional menemukan hubungan, bukan sebab-akibat. Hindari klaim bahwa X...", options: [{ label: "causes Y", correct: true }, { label: "is associated with Y" }] },
        ],
      },
      {
        title: "03 · Complex",
        questions: [
          { num: 5, name: "q5", prompt: "Hedging yang baik seharusnya...", options: [{ label: "mencerminkan batas dan kekuatan bukti.", correct: true }, { label: "membuat semua pernyataan terdengar tidak pasti." }] },
          { num: 8, name: "q8", prompt: "Tiga studi terkontrol menunjukkan hasil konsisten. Kalimat paling proporsional adalah...", options: [{ label: "Across these trials, the intervention consistently reduced waiting time.", correct: true }, { label: "The intervention may possibly perhaps have had some effect." }] },
        ],
      },
    ],
    footerLeft: { href: "index.html", label: "← Kembali ke kurikulum" },
    footerRight: { href: "index.html", label: "Lihat modul lainnya →" },
  },
};
