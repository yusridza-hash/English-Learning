window.MODULE_ENRICHMENT = Object.assign(window.MODULE_ENRICHMENT || {}, {
  "00-foundation/01-parts-of-speech": {
    complex: { title: "3. Complex: fungsi kata dalam teks nyata", paragraphs: ["Dalam instruksi kerja, tentukan kelas kata dari peran dan posisinya. Kata yang sama dapat berpindah kelas, jadi baca seluruh kalimat dan tanyakan fungsi yang dijalankannya."], examples: ["Please email the updated schedule. (email = verb); I sent an email. (email = noun).", "The careful reviewer checked the figures carefully. (careful = adjective; carefully = adverb)."] },
    quiz: {
      simple: [{ prompt: "Pada ‘The driver opened the door’, opened adalah...", options: ["verb", "noun", "adjective"], answer: 0 }],
      intermediate: [{ prompt: "Pada ‘They arrived after lunch’, after berfungsi sebagai...", options: ["preposition", "verb", "adjective"], answer: 0 }],
      complex: [{ prompt: "Pada ‘Please email me the report’, email adalah...", options: ["noun", "verb", "adverb"], answer: 1 }]
    }
  }
});
window.MODULE_CONTENT = Object.assign(window.MODULE_CONTENT || {}, {
  "00-foundation/01-parts-of-speech": {
    level: "Level 0 · Foundation",
    number: "01",
    title: "Parts of Speech",
    intro: "Parts of speech mengelompokkan kata berdasarkan fungsi dalam kalimat. Mengenali fungsinya membantu kita menyusun kalimat dan memilih bentuk kata yang tepat.",
    focus: "fungsi kata dalam kalimat",
    sections: [
      {
        title: "1. Delapan kelas kata utama",
        paragraphs: ["Noun menamai orang/benda/ide; pronoun menggantikan noun; verb menyatakan tindakan atau keadaan; adjective menjelaskan noun; adverb menjelaskan verb, adjective, atau adverb lain; preposition menunjukkan hubungan; conjunction menghubungkan bagian kalimat; interjection menyatakan seruan."],
        examples: ["The curious student reads quietly. → student (noun), curious (adjective), reads (verb), quietly (adverb).", "She put the book on the table and smiled. → she (pronoun), on (preposition), and (conjunction)."]
      },
      {
        title: "2. Fungsi bergantung konteks",
        paragraphs: ["Satu kata dapat memiliki kelas berbeda sesuai penggunaannya. Lihat posisi dan perannya dalam kalimat, bukan hanya bentuk katanya."],
        examples: ["I like the clean room. (clean = adjective)", "Please clean the room. (clean = verb)", "We arrived after lunch. (after = preposition)", "We arrived after the meeting ended. (after = conjunction)"]
      },
      {
        title: "3. Temukan pola dasar",
        paragraphs: ["Kalimat sederhana sering memiliki subject (biasanya noun/pronoun), verb, lalu object atau pelengkap. Kata sifat dan keterangan memberi informasi tambahan."],
        rule: "The young athlete trains diligently."
      }
    ],
    checklist: ["Aku bisa membedakan noun, pronoun, dan verb.", "Aku bisa mengenali adjective dan adverb dari fungsinya.", "Aku memahami bahwa kelas kata dapat berubah menurut konteks."],
    quiz: [
      { prompt: "Pada ‘The child laughed loudly’, kata loudly adalah...", options: ["noun", "adverb", "adjective"], answer: 1 },
      { prompt: "Kata yang menggantikan noun disebut...", options: ["pronoun", "preposition", "conjunction"], answer: 0 },
      { prompt: "Pada ‘a noisy street’, noisy berfungsi sebagai...", options: ["verb", "adjective", "adverb"], answer: 1 },
      { prompt: "Kata yang menghubungkan dua gagasan, seperti but, disebut...", options: ["conjunction", "interjection", "noun"], answer: 0 },
      { prompt: "Pada ‘They play tennis’, kata play adalah...", options: ["preposition", "verb", "adjective"], answer: 1 }
    ]
  }
});
