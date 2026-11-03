import { ModuleQuestion } from "./generatedModules";

export interface PilotLevel {
  key: "simple" | "intermediate" | "complex";
  title: string;
  description: string;
  questions: ModuleQuestion[];
}

const makeQuestion = (
  prompt: string,
  options: string[],
  answer: number | number[],
  explanation: string,
  extra: Partial<ModuleQuestion> = {}
): ModuleQuestion => ({
  prompt,
  options,
  answer,
  explanation,
  ...extra,
});

const rawLevels: PilotLevel[] = [
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
      makeQuestion("Susun kalimat rutinitas ini.", ["every morning", "checks", "He", "the schedule."], [2, 1, 3, 0], "Susunannya: He checks the schedule every morning. He memakai checks.", { type: "build", hints: ["Mulai dengan subject He.", "Setelah He, gunakan checks sebelum object."] }),
    ],
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
      makeQuestion("How often does your manager ___ for work?", ["travels", "travel", "travelling"], 1, "Setelah does gunakan verb dasar travel. How often menanyakan frekuensi."),
    ],
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
      makeQuestion("Pilih revisi jadwal yang paling akurat.", ["Our office opens at eight, and the support team doesn't accept calls after six.", "Our office is opening at eight every day, and the support team don't accepts calls after six.", "Does our office opens at eight, and the support team doesn't accepts calls after six."], 0, "Jadwal dan kebijakan umum memakai Present Simple; team doesn't accept memakai verb dasar.", { type: "edit", draft: "Our office is opening at eight every day. The support team don't accepts calls after six.", hints: ["Kalimat ini menyatakan jadwal tetap dan kebijakan umum.", "Perbaiki bentuk jadwal, subject support team, dan verb setelah doesn't."], wrongFeedback: { 1: "Untuk jadwal tetap gunakan opens. Support team memakai doesn't accept, bukan don't accepts.", 2: "Ini ringkasan jadwal, bukan pertanyaan. Gunakan office opens; setelah doesn't, pakai accept." } }),
    ],
  },
];

const questionSkills = [
  ["agreement", "base-form", "base-form", "agreement", "agreement", "irregular-have", "agreement", "verb-spelling", "verb-spelling", "agreement"],
  ["negative-does", "verb-after-does", "question-order", "verb-after-does", "negative-does", "negative-does", "negative-does", "short-answer", "question-order", "verb-after-does"],
  ["schedules", "routine-vs-now", "agreement", "negative-does", "stative-verbs", "frequency-order", "routine-vs-now", "schedules", "question-order", "routine-vs-now"],
];

export const PILOT_SKILL_GUIDE: Record<string, { label: string; href: string }> = {
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
  "frequency-order": { label: "Posisi frequency adverb", href: "#materi-frequency" },
};

export const PILOT_SKILL_HINTS: Record<string, string[]> = {
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
  "frequency-order": ["Tentukan apakah kalimat memakai main verb atau be.", "Frequency adverb biasanya sebelum main verb, tetapi sesudah be."],
};

export const PRESENT_SIMPLE_LEVELS: PilotLevel[] = rawLevels.map((level, levelIndex) => ({
  ...level,
  questions: level.questions.map((q, qIndex) => {
    const skill = questionSkills[levelIndex][qIndex];
    return {
      ...q,
      skill,
      skillHint: PILOT_SKILL_HINTS[skill],
    };
  }),
}));
