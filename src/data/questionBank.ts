// Auto-extracted from assets/js/question-bank.js
import { ModuleQuestion } from "./generatedModules";

export interface SkillGuideEntry {
  label: string;
  href: string;
}

export interface QuestionBankModule {
  title: string;
  levels: {
    simple: ModuleQuestion[];
    intermediate: ModuleQuestion[];
    complex: ModuleQuestion[];
  };
}

export const SKILL_GUIDE: Record<string, SkillGuideEntry> = {
  "pos-noun": {
    "label": "Noun",
    "href": "00-foundation/01-parts-of-speech.html#materi-simple"
  },
  "pos-verb": {
    "label": "Verb",
    "href": "00-foundation/01-parts-of-speech.html#materi-simple"
  },
  "pos-adjective": {
    "label": "Adjective",
    "href": "00-foundation/01-parts-of-speech.html#materi-simple"
  },
  "pos-adverb": {
    "label": "Adverb",
    "href": "00-foundation/01-parts-of-speech.html#materi-simple"
  },
  "svo-order": {
    "label": "Urutan SVO",
    "href": "00-foundation/02-sentence-svo.html#materi-simple"
  },
  "to-be-form": {
    "label": "Bentuk to be",
    "href": "00-foundation/03-to-be.html#materi-simple"
  },
  "articles-a-an": {
    "label": "Penggunaan a / an",
    "href": "00-foundation/04-articles.html#materi-simple"
  },
  "articles-the": {
    "label": "Penggunaan the",
    "href": "00-foundation/04-articles.html#materi-intermediate"
  },
  "articles-zero": {
    "label": "Tanpa article",
    "href": "00-foundation/04-articles.html#materi-complex"
  },
  "plural-noun": {
    "label": "Noun plural",
    "href": "00-foundation/05-nouns-plural.html#materi-simple"
  },
  "pronoun-subject": {
    "label": "Pronoun subjek",
    "href": "00-foundation/06-pronouns.html#materi-simple"
  },
  "pronoun-object": {
    "label": "Pronoun objek",
    "href": "00-foundation/06-pronouns.html#materi-intermediate"
  },
  "present-simple-form": {
    "label": "Bentuk Present Simple",
    "href": "00-foundation/07-present-simple.html#materi-simple"
  },
  "present-simple-3s": {
    "label": "Verb + -s / -es",
    "href": "00-foundation/07-present-simple.html#materi-intermediate"
  },
  "present-simple-neg-q": {
    "label": "Negatif & pertanyaan Present Simple",
    "href": "00-foundation/07-present-simple.html#materi-complex"
  },
  "present-continuous-form": {
    "label": "Bentuk Present Continuous",
    "href": "00-foundation/08-present-continuous.html#materi-simple"
  },
  "preposition-basic": {
    "label": "Preposisi dasar",
    "href": "00-foundation/09-prepositions-basic.html#materi-simple"
  },
  "there-is-are": {
    "label": "There is / There are",
    "href": "00-foundation/10-there-is-are.html#materi-simple"
  },
  "can-ability": {
    "label": "Can untuk kemampuan",
    "href": "00-foundation/11-can-cannot.html#materi-simple"
  },
  "question-form": {
    "label": "Pertanyaan dasar",
    "href": "00-foundation/12-questions-basic.html#materi-simple"
  },
  "past-simple-regular": {
    "label": "Past Simple beraturan",
    "href": "01-elementary/01-past-simple.html#materi-simple"
  },
  "past-simple-irregular": {
    "label": "Past Simple tidak beraturan",
    "href": "01-elementary/01-past-simple.html#materi-intermediate"
  },
  "past-continuous": {
    "label": "Past Continuous",
    "href": "01-elementary/02-past-continuous.html#materi-simple"
  },
  "future-will-going": {
    "label": "Will vs Going to",
    "href": "01-elementary/03-future-will-going-to.html#materi-simple"
  },
  "comparative": {
    "label": "Comparative",
    "href": "01-elementary/04-comparatives.html#materi-simple"
  },
  "quantifier": {
    "label": "Quantifier",
    "href": "01-elementary/05-quantifiers.html#materi-simple"
  },
  "modal-basic": {
    "label": "Modal dasar",
    "href": "01-elementary/06-modals-basic.html#materi-simple"
  },
  "adverb-frequency": {
    "label": "Adverb frekuensi",
    "href": "01-elementary/07-adverbs-frequency.html#materi-simple"
  },
  "present-perfect": {
    "label": "Present Perfect",
    "href": "01-elementary/08-present-perfect-intro.html#materi-simple"
  },
  "preposition-dependent": {
    "label": "Preposisi dependen",
    "href": "01-elementary/09-prepositions-advanced.html#materi-simple"
  },
  "conjunction-basic": {
    "label": "Conjunction dasar",
    "href": "01-elementary/10-conjunctions-basic.html#materi-simple"
  },
  "present-perfect-vs-past": {
    "label": "Present Perfect vs Past Simple",
    "href": "02-intermediate/01-present-perfect-vs-past.html#materi-simple"
  },
  "present-perfect-continuous": {
    "label": "Present Perfect Continuous",
    "href": "02-intermediate/02-present-perfect-continuous.html#materi-simple"
  },
  "past-perfect": {
    "label": "Past Perfect",
    "href": "02-intermediate/03-past-perfect.html#materi-simple"
  },
  "passive-basic": {
    "label": "Passive voice dasar",
    "href": "02-intermediate/04-passive-basic.html#materi-simple"
  },
  "conditional-1-2": {
    "label": "Conditional Type 1 & 2",
    "href": "02-intermediate/05-conditionals-1-2.html#materi-simple"
  },
  "relative-clause": {
    "label": "Relative clause",
    "href": "02-intermediate/06-relative-clauses.html#materi-simple"
  },
  "reported-speech": {
    "label": "Reported speech dasar",
    "href": "02-intermediate/07-reported-speech-basic.html#materi-simple"
  },
  "gerund-infinitive": {
    "label": "Gerund vs Infinitive",
    "href": "02-intermediate/08-gerund-infinitive.html#materi-simple"
  },
  "modal-possibility": {
    "label": "Modal kemungkinan",
    "href": "02-intermediate/09-modals-possibility.html#materi-simple"
  },
  "phrasal-verb": {
    "label": "Phrasal verb",
    "href": "02-intermediate/10-phrasal-verbs-basic.html#materi-simple"
  },
  "question-tag": {
    "label": "Question tag",
    "href": "02-intermediate/11-question-tags.html#materi-simple"
  },
  "used-to-would": {
    "label": "Used to / Would",
    "href": "02-intermediate/12-used-to-would.html#materi-simple"
  },
  "past-perfect-continuous": {
    "label": "Past Perfect Continuous",
    "href": "03-upper-intermediate/01-past-perfect-continuous.html#materi-simple"
  },
  "future-perfect-continuous": {
    "label": "Future Perfect Continuous",
    "href": "03-upper-intermediate/02-future-perfect-continuous.html#materi-simple"
  },
  "conditional-3-mixed": {
    "label": "Conditional Type 3 & Mixed",
    "href": "03-upper-intermediate/03-conditionals-3-mixed.html#materi-simple"
  },
  "passive-advanced": {
    "label": "Passive lanjutan",
    "href": "03-upper-intermediate/04-passive-advanced.html#materi-simple"
  },
  "reported-speech-advanced": {
    "label": "Reported speech lanjutan",
    "href": "03-upper-intermediate/05-reported-speech-advanced.html#materi-simple"
  },
  "inversion-basic": {
    "label": "Inversion dasar",
    "href": "03-upper-intermediate/06-inversion-basic.html#materi-simple"
  },
  "cleft-sentence": {
    "label": "Cleft sentence",
    "href": "03-upper-intermediate/07-cleft-sentences.html#materi-simple"
  },
  "participle-clause": {
    "label": "Participle clause",
    "href": "03-upper-intermediate/08-participle-clauses.html#materi-simple"
  },
  "modal-perfect": {
    "label": "Modal perfect",
    "href": "03-upper-intermediate/09-modal-perfect.html#materi-simple"
  },
  "relative-clause-advanced": {
    "label": "Relative clause lanjutan",
    "href": "03-upper-intermediate/10-relative-clauses-advanced.html#materi-simple"
  },
  "linking-words": {
    "label": "Linking words",
    "href": "03-upper-intermediate/11-linking-words.html#materi-simple"
  },
  "nominalization-intro": {
    "label": "Nominalization dasar",
    "href": "03-upper-intermediate/12-nominalization-intro.html#materi-simple"
  },
  "complex-subordination": {
    "label": "Complex subordination",
    "href": "04-advanced-formal/01-complex-subordination.html#materi-simple"
  },
  "nominalization": {
    "label": "Nominalization lanjutan",
    "href": "04-advanced-formal/02-nominalization.html#materi-simple"
  },
  "hedging": {
    "label": "Hedging",
    "href": "04-advanced-formal/03-hedging.html#materi-simple"
  },
  "formal-register": {
    "label": "Formal register",
    "href": "04-advanced-formal/04-formal-register.html#materi-simple"
  },
  "collocation": {
    "label": "Collocation",
    "href": "04-advanced-formal/05-collocations.html#materi-simple"
  },
  "advanced-connectors": {
    "label": "Advanced connectors",
    "href": "04-advanced-formal/06-advanced-connectors.html#materi-simple"
  },
  "inversion-emphasis": {
    "label": "Inversion penekanan",
    "href": "04-advanced-formal/07-inversion-emphasis.html#materi-simple"
  },
  "ellipsis-substitution": {
    "label": "Ellipsis & substitution",
    "href": "04-advanced-formal/08-ellipsis-substitution.html#materi-simple"
  },
  "cohesion-coherence": {
    "label": "Cohesion & coherence",
    "href": "04-advanced-formal/09-cohesion-coherence.html#materi-simple"
  },
  "formal-email-report": {
    "label": "Formal email & report",
    "href": "04-advanced-formal/10-formal-email-report.html#materi-simple"
  },
  "academic-conventions": {
    "label": "Academic conventions",
    "href": "04-advanced-formal/11-academic-conventions.html#materi-simple"
  },
  "editing-precision": {
    "label": "Editing & precision",
    "href": "04-advanced-formal/12-editing-precision.html#materi-simple"
  }
};

export const QUESTION_BANK: Record<string, QuestionBankModule> = {
  "00-foundation/01-parts-of-speech": {
    "title": "Parts of Speech",
    "levels": {
      "simple": [
        {
          "prompt": "Pada ‘The child laughed loudly’, kata loudly adalah...",
          "options": [
            "noun",
            "adverb",
            "adjective"
          ],
          "answer": 1,
          "explanation": "Loudly menjelaskan verb laughed, jadi adverb.",
          "skill": "pos-adverb"
        },
        {
          "prompt": "Kata yang menggantikan noun disebut...",
          "options": [
            "pronoun",
            "preposition",
            "conjunction"
          ],
          "answer": 0,
          "explanation": "Pronoun menggantikan noun.",
          "skill": "pos-noun"
        },
        {
          "prompt": "Pada ‘a noisy street’, noisy berfungsi sebagai...",
          "options": [
            "verb",
            "adjective",
            "adverb"
          ],
          "answer": 1,
          "explanation": "Noisy menjelaskan noun street, jadi adjective.",
          "skill": "pos-adjective"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pada ‘The nurse checked the chart’, subject adalah...",
          "options": [
            "The nurse",
            "checked",
            "the chart"
          ],
          "answer": 0,
          "explanation": "Subject adalah pelaku: The nurse.",
          "skill": "svo-order"
        },
        {
          "prompt": "Pilih kalimat dengan urutan SVO.",
          "options": [
            "The technician replaced the cable.",
            "Replaced the technician cable.",
            "The cable replaced the technician."
          ],
          "answer": 0,
          "explanation": "Subject + Verb + Object.",
          "skill": "svo-order"
        },
        {
          "prompt": "I like the clean room. Kata clean berfungsi sebagai...",
          "options": [
            "adjective",
            "verb",
            "adverb"
          ],
          "answer": 0,
          "explanation": "Clean menjelaskan noun room, jadi adjective.",
          "skill": "pos-adjective"
        }
      ],
      "complex": [
        {
          "prompt": "Pada ‘Please email me the report’, email adalah...",
          "options": [
            "noun",
            "verb",
            "adverb"
          ],
          "answer": 1,
          "explanation": "Email di sini adalah verb (mengirim).",
          "skill": "pos-verb",
          "wrongFeedback": {
            "0": [
              "Email bisa noun, tapi di sini setelah Please menunjukkan perintah/verb."
            ]
          }
        },
        {
          "prompt": "We arrived after lunch. After berfungsi sebagai...",
          "options": [
            "preposition",
            "conjunction",
            "adverb"
          ],
          "answer": 0,
          "explanation": "After diikuti noun lunch, jadi preposition.",
          "skill": "svo-order",
          "wrongFeedback": {
            "1": [
              "After conjunction jika diikuti klausa lengkap."
            ]
          }
        },
        {
          "prompt": "The careful reviewer checked carefully. Careful adalah...",
          "options": [
            "adjective",
            "adverb",
            "noun"
          ],
          "answer": 0,
          "explanation": "Careful menjelaskan noun reviewer, jadi adjective.",
          "skill": "pos-adjective"
        }
      ]
    }
  },
  "00-foundation/02-sentence-svo": {
    "title": "Sentence: SVO",
    "levels": {
      "simple": [
        {
          "prompt": "Subject dalam ‘The coordinator sent the schedule’ adalah...",
          "options": [
            "The coordinator",
            "sent",
            "the schedule"
          ],
          "answer": 0,
          "explanation": "Subject adalah pelaku: The coordinator.",
          "skill": "svo-order"
        },
        {
          "prompt": "Verb dalam ‘She reads every day’ adalah...",
          "options": [
            "She",
            "reads",
            "every day"
          ],
          "answer": 1,
          "explanation": "Reads adalah kata kerja.",
          "skill": "pos-verb"
        },
        {
          "prompt": "Objek dalam ‘I sent an email’ adalah...",
          "options": [
            "I",
            "sent",
            "an email"
          ],
          "answer": 2,
          "explanation": "An email adalah objek.",
          "skill": "svo-order"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat dengan urutan SVO yang benar.",
          "options": [
            "The technician replaced the cable.",
            "Replaced the technician cable.",
            "The cable replaced the technician."
          ],
          "answer": 0,
          "explanation": "Subjek + Verb + Objek.",
          "skill": "svo-order"
        },
        {
          "prompt": "The courier arrived before noon. Arrived memiliki objek?",
          "options": [
            "Ya, the courier",
            "Ya, before noon",
            "Tidak; arrived tanpa objek"
          ],
          "answer": 2,
          "explanation": "Arrived adalah intransitive verb.",
          "skill": "svo-order"
        },
        {
          "prompt": "Subjek yang jelas membantu pembaca tahu...",
          "options": [
            "siapa yang bertindak",
            "kata lebih banyak",
            "grammar lebih sulit"
          ],
          "answer": 0,
          "explanation": "Subjek jelas menjelaskan pelaku tindakan.",
          "skill": "svo-order"
        }
      ],
      "complex": [
        {
          "prompt": "‘The meeting lasted an hour’ memiliki objek?",
          "options": [
            "Ya, meeting",
            "Ya, an hour",
            "Tidak; lasted tanpa objek"
          ],
          "answer": 2,
          "explanation": "Lasted intransitive; an hour adalah keterangan waktu.",
          "skill": "svo-order"
        },
        {
          "prompt": "Jangan pindahkan objek ke depan kecuali...",
          "options": [
            "kamu pakai pasif atau pertanyaan",
            "kata panjang",
            "subject tidak diketahui"
          ],
          "answer": 0,
          "explanation": "Hanya dalam pasif atau pertanyaan sengaja.",
          "skill": "svo-order"
        },
        {
          "prompt": "The coordinator (S) sent (V) the schedule (O). To all staff adalah...",
          "options": [
            "objek",
            "keterangan",
            "predikat"
          ],
          "answer": 1,
          "explanation": "To all staff adalah keterangan, bukan objek.",
          "skill": "svo-order"
        }
      ]
    }
  },
  "00-foundation/03-to-be": {
    "title": "To Be (am / is / are)",
    "levels": {
      "simple": [
        {
          "prompt": "The instructions ___ clear.",
          "options": [
            "is",
            "are",
            "am"
          ],
          "answer": 1,
          "explanation": "Instructions jamak → are.",
          "skill": "to-be-form"
        },
        {
          "prompt": "I ___ a student.",
          "options": [
            "am",
            "is",
            "are"
          ],
          "answer": 0,
          "explanation": "I → am.",
          "skill": "to-be-form"
        },
        {
          "prompt": "He ___ at home.",
          "options": [
            "am",
            "is",
            "are"
          ],
          "answer": 1,
          "explanation": "He → is.",
          "skill": "to-be-form"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih pertanyaan yang tepat.",
          "options": [
            "Is the room available?",
            "Does the room available?",
            "The room is available?"
          ],
          "answer": 0,
          "explanation": "Pindahkan is ke depan subject.",
          "skill": "to-be-form"
        },
        {
          "prompt": "Your reservation ___ confirmed, and your seats ___ near the exit.",
          "options": [
            "is / are",
            "are / is",
            "are / are"
          ],
          "answer": 0,
          "explanation": "Reservation → is; seats → are.",
          "skill": "to-be-form"
        },
        {
          "prompt": "The guests ___ ready yet.",
          "options": [
            "aren't",
            "isn't",
            "am not"
          ],
          "answer": 0,
          "explanation": "Guests jamak → aren't.",
          "skill": "to-be-form"
        }
      ],
      "complex": [
        {
          "prompt": "Lengkapi pesan: ‘Your booking ___ confirmed.’",
          "options": [
            "are",
            "is",
            "am"
          ],
          "answer": 1,
          "explanation": "Booking tunggal → is.",
          "skill": "to-be-form"
        },
        {
          "prompt": "Hindari menghilangkan be pada deskripsi karena...",
          "options": [
            "kalimat tidak lengkap",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Tanpa be, kalimat menjadi fragment.",
          "skill": "to-be-form"
        },
        {
          "prompt": "The guests aren't ready yet. Aren't = ...",
          "options": [
            "are not",
            "is not",
            "am not"
          ],
          "answer": 0,
          "explanation": "Aren't = are not untuk jamak.",
          "skill": "to-be-form"
        }
      ]
    }
  },
  "00-foundation/04-articles": {
    "title": "Articles (a / an / the)",
    "levels": {
      "simple": [
        {
          "prompt": "She wants ___ orange.",
          "options": [
            "an",
            "a",
            "the"
          ],
          "answer": 0,
          "explanation": "Orange bunyi vokal → an.",
          "skill": "articles-a-an"
        },
        {
          "prompt": "I bought ___ book. ___ book is on the table.",
          "options": [
            "a, The",
            "the, A",
            "an, The"
          ],
          "answer": 0,
          "explanation": "Pertama a, kemudian The.",
          "skill": "articles-a-an"
        },
        {
          "prompt": "She is ___ honest person.",
          "options": [
            "an",
            "a",
            "the"
          ],
          "answer": 0,
          "explanation": "Honest bunyi vokal → an.",
          "skill": "articles-a-an"
        }
      ],
      "intermediate": [
        {
          "prompt": "___ water is essential for life. (makna umum)",
          "options": [
            "Tanpa article",
            "The",
            "A"
          ],
          "answer": 0,
          "explanation": "Noun tak terhitung umum tanpa article.",
          "skill": "articles-zero"
        },
        {
          "prompt": "He studies at ___ university.",
          "options": [
            "a",
            "an",
            "the"
          ],
          "answer": 0,
          "explanation": "University bunyi /y/ → a.",
          "skill": "articles-a-an"
        },
        {
          "prompt": "Pass me ___ salt on the table.",
          "options": [
            "the",
            "a",
            "an"
          ],
          "answer": 1,
          "explanation": "Salt di meja spesifik → the.",
          "skill": "articles-the"
        }
      ],
      "complex": [
        {
          "prompt": "We waited for ___ hour.",
          "options": [
            "an",
            "a",
            "the"
          ],
          "answer": 0,
          "explanation": "Hour bunyi vokal → an.",
          "skill": "articles-a-an"
        },
        {
          "prompt": "___ feedback we received after the workshop was useful.",
          "options": [
            "The",
            "A",
            "Tanpa article"
          ],
          "answer": 0,
          "explanation": "Feedback spesifik → The.",
          "skill": "articles-the"
        },
        {
          "prompt": "Information tidak pakai...",
          "options": [
            "a/an langsung",
            "the",
            "sama sekali"
          ],
          "answer": 0,
          "explanation": "Information tidak pakai a/an langsung.",
          "skill": "articles-zero",
          "wrongFeedback": {
            "1": [
              "The bisa jika spesifik."
            ]
          }
        }
      ]
    }
  },
  "00-foundation/05-nouns-plural": {
    "title": "Plural Nouns",
    "levels": {
      "simple": [
        {
          "prompt": "A hotel has twelve ___ available.",
          "options": [
            "room",
            "rooms",
            "roomes"
          ],
          "answer": 1,
          "explanation": "Lebih dari satu → rooms.",
          "skill": "plural-noun"
        },
        {
          "prompt": "Children adalah bentuk...",
          "options": [
            "singular",
            "plural",
            "tidak diketahui"
          ],
          "answer": 1,
          "explanation": "Children jamak dari child.",
          "skill": "plural-noun"
        },
        {
          "prompt": "We need two boxes. Boxes adalah...",
          "options": [
            "singular",
            "plural",
            "tidak terhitung"
          ],
          "answer": 1,
          "explanation": "Boxes jamak dari box (-es).",
          "skill": "plural-noun"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat tepat.",
          "options": [
            "There are three buses outside.",
            "There are three bus outside.",
            "There is three buses outside."
          ],
          "answer": 0,
          "explanation": "Buses jamak butuh are dan -es.",
          "skill": "plural-noun"
        },
        {
          "prompt": "Untuk satu benda ‘scissors’, gunakan...",
          "options": [
            "a scissor",
            "a pair of scissors",
            "one scissors"
          ],
          "answer": 1,
          "explanation": "Scissors pluralia tantrum → a pair of.",
          "skill": "plural-noun"
        },
        {
          "prompt": "Each child receives one card. Each kembali ke...",
          "options": [
            "plural",
            "singular",
            "tidak berubah"
          ],
          "answer": 1,
          "explanation": "Each membuat subjek singular.",
          "skill": "plural-noun"
        }
      ],
      "complex": [
        {
          "prompt": "Pastikan angka cocok dengan bentuk noun karena...",
          "options": [
            "jumlah harus sesuai",
            "kata lebih panjang",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Agreement angka dan noun menjaga kejelasan.",
          "skill": "plural-noun"
        },
        {
          "prompt": "Noun bentuk plural tapi satu benda, seperti...",
          "options": [
            "scissors",
            "box",
            "child"
          ],
          "answer": 0,
          "explanation": "Scissors satu tapi bentuk plural.",
          "skill": "plural-noun"
        },
        {
          "prompt": "Bentuk jamak dari ‘study’ adalah...",
          "options": [
            "studys",
            "studies",
            "study"
          ],
          "answer": 1,
          "explanation": "Konsonan + y → ies: studies.",
          "skill": "plural-noun"
        }
      ]
    }
  },
  "00-foundation/06-pronouns": {
    "title": "Pronouns",
    "levels": {
      "simple": [
        {
          "prompt": "The manager called ___ . (object pronoun untuk I)",
          "options": [
            "I",
            "me",
            "my"
          ],
          "answer": 1,
          "explanation": "Object pronoun untuk I adalah me.",
          "skill": "pronoun-object"
        },
        {
          "prompt": "This desk is her. / This desk is hers. / This desk is she.",
          "options": [
            "This desk is her.",
            "This desk is hers.",
            "This desk is she."
          ],
          "answer": 1,
          "explanation": "Hers = possessive pronoun berdiri sendiri.",
          "skill": "pronoun-subject"
        },
        {
          "prompt": "Nadia sent her supervisor the draft. She = ...",
          "options": [
            "Nadia",
            "supervisor",
            "draft"
          ],
          "answer": 0,
          "explanation": "She merujuk pada Nadia.",
          "skill": "pronoun-subject"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat benar.",
          "options": [
            "This desk is her.",
            "This desk is hers.",
            "This desk is she."
          ],
          "answer": 1,
          "explanation": "Hers benar.",
          "skill": "pronoun-subject"
        },
        {
          "prompt": "Please contact Maya or me. The final choice is ___.",
          "options": [
            "ours",
            "our",
            "us"
          ],
          "answer": 0,
          "explanation": "Ours = possessive pronoun berdiri sendiri.",
          "skill": "pronoun-subject"
        },
        {
          "prompt": "Jangan pakai reflexive sebagai subject biasa karena...",
          "options": [
            "grammar akan salah",
            "kata lebih panjang",
            "tidak natural"
          ],
          "answer": 0,
          "explanation": "Reflexive bukan untuk subject.",
          "skill": "pronoun-subject"
        }
      ],
      "complex": [
        {
          "prompt": "The team completed the task by ___.",
          "options": [
            "themselves",
            "them",
            "their"
          ],
          "answer": 0,
          "explanation": "By themselves = tim sendiri.",
          "skill": "pronoun-object"
        },
        {
          "prompt": "Pastikan pembaca tahu pronoun merujuk ke siapa karena...",
          "options": [
            "hindari kebingungan rujukan",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Rujukan tidak jelas membuat bingung.",
          "skill": "pronoun-subject"
        },
        {
          "prompt": "Gunakan possessive form untuk...",
          "options": [
            "menunjukkan kepemilikan",
            "membuat kalimat panjang",
            "mengganti verb"
          ],
          "answer": 0,
          "explanation": "Possessive menunjukkan kepemilikan.",
          "skill": "pronoun-subject"
        }
      ]
    }
  },
  "00-foundation/07-present-simple": {
    "title": "Present Simple",
    "levels": {
      "simple": [
        {
          "prompt": "My sister ___ to work at 8 every morning.",
          "options": [
            "goes",
            "go",
            "is go"
          ],
          "answer": 0,
          "explanation": "My sister = she → goes.",
          "skill": "present-simple-3s"
        },
        {
          "prompt": "I ___ coffee before my shift.",
          "options": [
            "drinks",
            "drink",
            "am drink"
          ],
          "answer": 1,
          "explanation": "I → drink (bentuk dasar).",
          "skill": "present-simple-form"
        },
        {
          "prompt": "They ___ in a small office.",
          "options": [
            "works",
            "work",
            "working"
          ],
          "answer": 1,
          "explanation": "They → work.",
          "skill": "present-simple-form"
        }
      ],
      "intermediate": [
        {
          "prompt": "She ___ emails after every meeting.",
          "options": [
            "don't check",
            "doesn't check",
            "doesn't checks"
          ],
          "answer": 1,
          "explanation": "She → doesn't + check.",
          "skill": "present-simple-neg-q"
        },
        {
          "prompt": "Does he ___ from home on Fridays?",
          "options": [
            "works",
            "work",
            "working"
          ],
          "answer": 1,
          "explanation": "Setelah does → work.",
          "skill": "present-simple-neg-q"
        },
        {
          "prompt": "What time ___ you start work?",
          "options": [
            "does",
            "do",
            "are"
          ],
          "answer": 1,
          "explanation": "You → do.",
          "skill": "present-simple-neg-q"
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat negatif benar.",
          "options": [
            "The analyst doesn't review orders at night.",
            "The analyst don't reviews orders at night.",
            "The analyst doesn't reviews orders at night."
          ],
          "answer": 0,
          "explanation": "Doesn't + review.",
          "skill": "present-simple-neg-q"
        },
        {
          "prompt": "Pilih respons tepat dalam dialog.",
          "options": [
            "No, she doesn't.",
            "No, she don't.",
            "No, she isn't."
          ],
          "answer": 0,
          "explanation": "She → doesn't.",
          "skill": "present-simple-neg-q",
          "type": "dialogue",
          "dialogue": [
            [
              "Arif",
              "Does Mia drink coffee?"
            ],
            [
              "Rita",
              "No, she ___."
            ]
          ]
        },
        {
          "prompt": "Susun: He / the schedule. / checks / every morning.",
          "options": [
            "every morning",
            "checks",
            "He",
            "the schedule."
          ],
          "answer": [
            2,
            1,
            3,
            0
          ],
          "explanation": "He checks the schedule every morning.",
          "skill": "present-simple-form",
          "type": "build",
          "hints": [
            "Mulai dengan subject He.",
            "Setelah He, gunakan checks."
          ]
        }
      ]
    }
  },
  "00-foundation/08-present-continuous": {
    "title": "Present Continuous",
    "levels": {
      "simple": [
        {
          "prompt": "She ___ working at the office today.",
          "options": [
            "is",
            "are",
            "am"
          ],
          "answer": 0,
          "explanation": "She → is + verb-ing.",
          "skill": "present-continuous-form"
        },
        {
          "prompt": "They ___ having lunch now.",
          "options": [
            "is",
            "are",
            "am"
          ],
          "answer": 1,
          "explanation": "They → are + verb-ing.",
          "skill": "present-continuous-form"
        },
        {
          "prompt": "I ___ writing a report.",
          "options": [
            "am",
            "is",
            "are"
          ],
          "answer": 0,
          "explanation": "I → am + verb-ing.",
          "skill": "present-continuous-form"
        }
      ],
      "intermediate": [
        {
          "prompt": "Nadia usually works from home, but today she ___ at the office.",
          "options": [
            "is working",
            "works",
            "worked"
          ],
          "answer": 0,
          "explanation": "Sementara hari ini → Present Continuous.",
          "skill": "present-continuous-form"
        },
        {
          "prompt": "I am understanding the instructions. Benar atau salah?",
          "options": [
            "Salah",
            "Benar",
            "Tergantung"
          ],
          "answer": 0,
          "explanation": "Understand = stative verb, tidak continuous.",
          "skill": "present-continuous-form",
          "wrongFeedback": {
            "1": [
              "Stative verbs biasanya tidak continuous."
            ]
          }
        },
        {
          "prompt": "The first train ___ at 6:20 tomorrow morning.",
          "options": [
            "leaves",
            "is leaving",
            "left"
          ],
          "answer": 0,
          "explanation": "Jadwal resmi → Present Simple.",
          "skill": "present-continuous-form"
        }
      ],
      "complex": [
        {
          "prompt": "Our support team answers calls until six. This week, two agents ___ the evening shift.",
          "options": [
            "are covering",
            "cover",
            "covered"
          ],
          "answer": 0,
          "explanation": "Sementara minggu ini → Present Continuous.",
          "skill": "present-continuous-form"
        },
        {
          "prompt": "Baca konteks secara utuh karena...",
          "options": [
            "satu paragraf dapat memadukan kebiasaan dan pengecualian",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Periksa petunjuk waktu dan arti setiap klausa.",
          "skill": "present-continuous-form"
        },
        {
          "prompt": "Rutinitas, fakta, keadaan, jadwal → Present Simple. Kegiatan sementara sedang berlangsung → ...",
          "options": [
            "Present Continuous",
            "Past Simple",
            "Future Simple"
          ],
          "answer": 0,
          "explanation": "Kegiatan sementara → Present Continuous.",
          "skill": "present-continuous-form"
        }
      ]
    }
  },
  "00-foundation/09-prepositions-basic": {
    "title": "Prepositions (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "The book is ___ the table.",
          "options": [
            "on",
            "in",
            "at"
          ],
          "answer": 0,
          "explanation": "Di atas permukaan → on.",
          "skill": "preposition-basic"
        },
        {
          "prompt": "I live ___ Jakarta.",
          "options": [
            "in",
            "on",
            "at"
          ],
          "answer": 0,
          "explanation": "Kota → in.",
          "skill": "preposition-basic"
        },
        {
          "prompt": "Meet me ___ 9 a.m.",
          "options": [
            "at",
            "in",
            "on"
          ],
          "answer": 0,
          "explanation": "Jam tertentu → at.",
          "skill": "preposition-basic"
        }
      ],
      "intermediate": [
        {
          "prompt": "The cat is ___ the box.",
          "options": [
            "in",
            "on",
            "at"
          ],
          "answer": 0,
          "explanation": "Di dalam kotak → in.",
          "skill": "preposition-basic"
        },
        {
          "prompt": "We arrived ___ Monday.",
          "options": [
            "on",
            "in",
            "at"
          ],
          "answer": 0,
          "explanation": "Hari → on.",
          "skill": "preposition-basic"
        },
        {
          "prompt": "She is good ___ maths.",
          "options": [
            "at",
            "in",
            "on"
          ],
          "answer": 0,
          "explanation": "Good at + noun.",
          "skill": "preposition-basic"
        }
      ],
      "complex": [
        {
          "prompt": "Pilih preposisi untuk waktu: ___ the weekend.",
          "options": [
            "at",
            "on",
            "in"
          ],
          "answer": 1,
          "explanation": "The weekend → on (British) atau at (American).",
          "skill": "preposition-basic"
        },
        {
          "prompt": "Setiap preposisi memiliki penggunaan khusus karena...",
          "options": [
            "konteks dan kolokasi berbeda",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Preposisi bergantung pada konteks.",
          "skill": "preposition-basic"
        },
        {
          "prompt": "The meeting starts ___ 9 a.m. ___ Monday.",
          "options": [
            "at / on",
            "on / at",
            "in / on"
          ],
          "answer": 0,
          "explanation": "Jam → at; hari → on.",
          "skill": "preposition-basic"
        }
      ]
    }
  },
  "00-foundation/10-there-is-are": {
    "title": "There is / There are",
    "levels": {
      "simple": [
        {
          "prompt": "___ a bank near here.",
          "options": [
            "There is",
            "There are",
            "They are"
          ],
          "answer": 0,
          "explanation": "Bank tunggal → There is.",
          "skill": "there-is-are"
        },
        {
          "prompt": "___ two messages for you.",
          "options": [
            "There is",
            "There are",
            "It is"
          ],
          "answer": 1,
          "explanation": "Messages jamak → There are.",
          "skill": "there-is-are"
        },
        {
          "prompt": "Pilih bentuk benar untuk milk.",
          "options": [
            "There are some milk.",
            "There is some milk.",
            "There be some milk."
          ],
          "answer": 1,
          "explanation": "Milk tak terhitung → There is.",
          "skill": "there-is-are"
        }
      ],
      "intermediate": [
        {
          "prompt": "Bentuk pertanyaan tepat...",
          "options": [
            "There are any shops?",
            "Are there any shops?",
            "Do there are shops?"
          ],
          "answer": 1,
          "explanation": "Pindahkan are ke depan.",
          "skill": "there-is-are"
        },
        {
          "prompt": "Bentuk negatif ‘There is a problem’...",
          "options": [
            "There isn't a problem.",
            "There aren't a problem.",
            "There doesn't a problem."
          ],
          "answer": 0,
          "explanation": "There is → There isn't.",
          "skill": "there-is-are"
        },
        {
          "prompt": "There isn't any coffee. Artinya...",
          "options": [
            "Tidak ada kopi",
            "Ada banyak kopi",
            "Kopi sudah habis"
          ],
          "answer": 0,
          "explanation": "There isn't any = tidak ada.",
          "skill": "there-is-are"
        }
      ],
      "complex": [
        {
          "prompt": "Ada berapa kursi di sini? Jawab: ___",
          "options": [
            "There are five chairs.",
            "There is five chairs.",
            "Five chairs there are."
          ],
          "answer": 0,
          "explanation": "Kursi jamak → There are five chairs.",
          "skill": "there-is-are"
        },
        {
          "prompt": "Perhatikan noun tunggal atau jamak sebelum memilih is/are karena...",
          "options": [
            "subject–verb agreement",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Agreement there is/are dengan noun.",
          "skill": "there-is-are"
        },
        {
          "prompt": "Pilih kalimat benar.",
          "options": [
            "There is some water in the glass.",
            "There are some water in the glass.",
            "There be some water in the glass."
          ],
          "answer": 0,
          "explanation": "Water tak terhitung → There is.",
          "skill": "there-is-are"
        }
      ]
    }
  },
  "00-foundation/11-can-cannot": {
    "title": "Can / Cannot",
    "levels": {
      "simple": [
        {
          "prompt": "He can ___ three languages.",
          "options": [
            "speaks",
            "speak",
            "to speak"
          ],
          "answer": 1,
          "explanation": "Can + verb dasar tanpa to.",
          "skill": "can-ability"
        },
        {
          "prompt": "Bentuk negatif can adalah...",
          "options": [
            "doesn't can",
            "can't",
            "can not to"
          ],
          "answer": 1,
          "explanation": "Can't = negatif can.",
          "skill": "can-ability"
        },
        {
          "prompt": "___ you help me, please?",
          "options": [
            "Do",
            "Are",
            "Can"
          ],
          "answer": 2,
          "explanation": "Can untuk meminta tolong.",
          "skill": "can-ability"
        }
      ],
      "intermediate": [
        {
          "prompt": "Jawaban singkat untuk ‘Can she cook?’...",
          "options": [
            "Yes, she can.",
            "Yes, she does can.",
            "Yes, she is."
          ],
          "answer": 0,
          "explanation": "Yes, she can.",
          "skill": "can-ability"
        },
        {
          "prompt": "Kalimat kemampuan benar...",
          "options": [
            "They can play chess.",
            "They can plays chess.",
            "They can to play chess."
          ],
          "answer": 0,
          "explanation": "Can + play.",
          "skill": "can-ability"
        },
        {
          "prompt": "Can menyatakan kemampuan, kemungkinan, atau...",
          "options": [
            "izin",
            "waktu",
            "tempat"
          ],
          "answer": 0,
          "explanation": "Can juga untuk izin.",
          "skill": "can-ability"
        }
      ],
      "complex": [
        {
          "prompt": "Bentuknya sama untuk semua subject karena...",
          "options": [
            "can tidak berubah bentuk",
            "can selalu diikuti noun",
            "can hanya untuk I"
          ],
          "answer": 0,
          "explanation": "Can adalah modal auxiliary yang tidak berubah.",
          "skill": "can-ability"
        },
        {
          "prompt": "He can't drive. Artinya...",
          "options": [
            "Dia tidak mampu mengemudi",
            "Dia suka mengemudi",
            "Dia akan mengemudi"
          ],
          "answer": 0,
          "explanation": "Can't = tidak mampu.",
          "skill": "can-ability"
        },
        {
          "prompt": "Can I use your phone? Merupakan...",
          "options": [
            "meminta izin",
            "memberi perintah",
            "mengucapkan terima kasih"
          ],
          "answer": 0,
          "explanation": "Can untuk meminta izin.",
          "skill": "can-ability"
        }
      ]
    }
  },
  "00-foundation/12-questions-basic": {
    "title": "Question Forms (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "___ she at home?",
          "options": [
            "Does",
            "Is",
            "Do"
          ],
          "answer": 1,
          "explanation": "Dengan to be → Is she at home?",
          "skill": "question-form"
        },
        {
          "prompt": "___ they play tennis?",
          "options": [
            "Are",
            "Does",
            "Do"
          ],
          "answer": 2,
          "explanation": "They + play → Do they play tennis?",
          "skill": "question-form"
        },
        {
          "prompt": "Where ___ your parents live?",
          "options": [
            "do",
            "does",
            "are"
          ],
          "answer": 0,
          "explanation": "Parents jamak → do.",
          "skill": "question-form"
        }
      ],
      "intermediate": [
        {
          "prompt": "Does he ___ coffee?",
          "options": [
            "drinks",
            "drink",
            "drinking"
          ],
          "answer": 1,
          "explanation": "Setelah does → drink.",
          "skill": "question-form"
        },
        {
          "prompt": "Pertanyaan benar...",
          "options": [
            "What time does the shop open?",
            "What time the shop does open?",
            "What time do the shop opens?"
          ],
          "answer": 0,
          "explanation": "Does + subject + verb dasar.",
          "skill": "question-form"
        },
        {
          "prompt": "Jika who adalah subject, biasanya tidak perlu...",
          "options": [
            "do/does",
            "kata tanya",
            "tanda tanya"
          ],
          "answer": 0,
          "explanation": "Who called you? (who = subject).",
          "skill": "question-form"
        }
      ],
      "complex": [
        {
          "prompt": "Temukan auxiliary sebelum menyusun pertanyaan karena...",
          "options": [
            "setiap kalimat pola berbeda",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Auxiliary menentukan pola.",
          "skill": "question-form"
        },
        {
          "prompt": "She is ready. → Is she ready? Pola...",
          "options": [
            "be di depan subject",
            "do di depan subject",
            "tidak ada perubahan"
          ],
          "answer": 0,
          "explanation": "Pindahkan be ke depan subject.",
          "skill": "question-form"
        },
        {
          "prompt": "Wh-word + auxiliary + subject + base verb? Contoh...",
          "options": [
            "Where do you work?",
            "You work where?",
            "Work you where?"
          ],
          "answer": 0,
          "explanation": "Pola wh- question benar.",
          "skill": "question-form"
        }
      ]
    }
  },
  "01-elementary/01-past-simple": {
    "title": "Past Simple",
    "levels": {
      "simple": [
        {
          "prompt": "We ___ a film last night.",
          "options": [
            "watched",
            "watch",
            "watching"
          ],
          "answer": 0,
          "explanation": "Past Simple regular verb → watched.",
          "skill": "past-simple-regular"
        },
        {
          "prompt": "He ___ to the office yesterday.",
          "options": [
            "went",
            "goed",
            "go"
          ],
          "answer": 0,
          "explanation": "Go → went (irregular).",
          "skill": "past-simple-irregular"
        },
        {
          "prompt": "She ___ the window before leaving. (close)",
          "options": [
            "closed",
            "close",
            "closing"
          ],
          "answer": 0,
          "explanation": "Close → closed (regular).",
          "skill": "past-simple-regular"
        }
      ],
      "intermediate": [
        {
          "prompt": "I didn't ___ the answer.",
          "options": [
            "know",
            "knew",
            "known"
          ],
          "answer": 0,
          "explanation": "Setelah didn → verb dasar: know.",
          "skill": "past-simple-irregular"
        },
        {
          "prompt": "___ they arrive on time?",
          "options": [
            "Did",
            "Were",
            "Do"
          ],
          "answer": 0,
          "explanation": "Did untuk pertanyaan Past Simple.",
          "skill": "past-simple-regular"
        },
        {
          "prompt": "Did you ___ the new address?",
          "options": [
            "remember",
            "remembered",
            "remembering"
          ],
          "answer": 0,
          "explanation": "Setelah Did → verb dasar: remember.",
          "skill": "past-simple-irregular"
        }
      ],
      "complex": [
        {
          "prompt": "They ___ here in 2020.",
          "options": [
            "moved",
            "move",
            "moving"
          ],
          "answer": 0,
          "explanation": "2020 = waktu lampau selesai → moved.",
          "skill": "past-simple-irregular"
        },
        {
          "prompt": "The driver ___ the turn, stopped, and asked for directions.",
          "options": [
            "missed",
            "miss",
            "missing"
          ],
          "answer": 0,
          "explanation": "Narasi berurutan → semua Past Simple.",
          "skill": "past-simple-regular"
        },
        {
          "prompt": "We ___ tired after the trip.",
          "options": [
            "were",
            "did",
            "was"
          ],
          "answer": 0,
          "explanation": "We → were (to be).",
          "skill": "past-simple-regular"
        }
      ]
    }
  },
  "01-elementary/02-past-continuous": {
    "title": "Past Continuous",
    "levels": {
      "simple": [
        {
          "prompt": "At noon yesterday, we ___ lunch.",
          "options": [
            "were having",
            "had",
            "was having"
          ],
          "answer": 0,
          "explanation": "We → were having (Past Continuous).",
          "skill": "past-continuous"
        },
        {
          "prompt": "I ___ a shower when the alarm rang.",
          "options": [
            "was taking",
            "took",
            "were taking"
          ],
          "answer": 0,
          "explanation": "I → was taking.",
          "skill": "past-continuous"
        },
        {
          "prompt": "They ___ playing football when it rained.",
          "options": [
            "were",
            "was",
            "are"
          ],
          "answer": 0,
          "explanation": "They → were.",
          "skill": "past-continuous"
        }
      ],
      "intermediate": [
        {
          "prompt": "The alarm rang while I ___ a shower.",
          "options": [
            "was taking",
            "took",
            "were taking"
          ],
          "answer": 0,
          "explanation": "While + Past Continuous untuk kegiatan yang terganggu.",
          "skill": "past-continuous"
        },
        {
          "prompt": "We ___ the figures when the client arrived.",
          "options": [
            "were checking",
            "checked",
            "check"
          ],
          "answer": 0,
          "explanation": "While + were checking.",
          "skill": "past-continuous"
        },
        {
          "prompt": "She ___ not sleeping when I called.",
          "options": [
            "was",
            "were",
            "did"
          ],
          "answer": 0,
          "explanation": "She → was not sleeping.",
          "skill": "past-continuous"
        }
      ],
      "complex": [
        {
          "prompt": "While I ___ notes, Ana ___ the slides.",
          "options": [
            "was taking / was preparing",
            "took / prepares",
            "were taking / prepared"
          ],
          "answer": 0,
          "explanation": "Dua aktivitas bersamaan → both Past Continuous.",
          "skill": "past-continuous"
        },
        {
          "prompt": "Past Continuous membangun latar, Past Simple menyampaikan...",
          "options": [
            "kejadian yang mengubah situasi",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Latar vs kejadian inti.",
          "skill": "past-continuous"
        },
        {
          "prompt": "I was presenting the budget when the projector ___.",
          "options": [
            "stopped working",
            "stop work",
            "stops working"
          ],
          "answer": 0,
          "explanation": "Kejadian yang menghentikan → Past Simple.",
          "skill": "past-continuous"
        }
      ]
    }
  },
  "01-elementary/03-future-will-going-to": {
    "title": "Future: Will vs Going to",
    "levels": {
      "simple": [
        {
          "prompt": "I've decided already. I ___ a short course in June.",
          "options": [
            "am going to take",
            "will taking",
            "take yesterday"
          ],
          "answer": 0,
          "explanation": "Keputusan rencana → am going to take.",
          "skill": "future-will-going"
        },
        {
          "prompt": "Look at those clouds! It ___ rain.",
          "options": [
            "is going to",
            "will",
            "went"
          ],
          "answer": 0,
          "explanation": "Bukti sekarang → is going to rain.",
          "skill": "future-will-going"
        },
        {
          "prompt": "The forecast says it ___ sunny tomorrow.",
          "options": [
            "will be",
            "is being",
            "was"
          ],
          "answer": 0,
          "explanation": "Ramalan cuaca → will be.",
          "skill": "future-will-going"
        }
      ],
      "intermediate": [
        {
          "prompt": "A colleague drops a box. You say: ‘I ___ you.’",
          "options": [
            "will help",
            "am going help",
            "helped"
          ],
          "answer": 0,
          "explanation": "Keputusan spontan → will help.",
          "skill": "future-will-going"
        },
        {
          "prompt": "We ___ driving, but the road is closed. We'll take the train.",
          "options": [
            "are going to",
            "will",
            "went"
          ],
          "answer": 0,
          "explanation": "Rencana lama berubah → were going to / will take.",
          "skill": "future-will-going"
        },
        {
          "prompt": "We ___ take the train instead. (keputusan spontan)",
          "options": [
            "will",
            "are going to",
            "went"
          ],
          "answer": 0,
          "explanation": "Spontan → will.",
          "skill": "future-will-going"
        }
      ],
      "complex": [
        {
          "prompt": "Rencana lama batal karena jalan ditutup; keputusan baru spontan: ‘We ___ the train.’",
          "options": [
            "are going to take",
            "will take",
            "will taking"
          ],
          "answer": 1,
          "explanation": "Keputusan spontan baru → will take.",
          "skill": "future-will-going"
        },
        {
          "prompt": "Pilih alasan memilih bentuk future...",
          "options": [
            "situasi dan maksud pembicara",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Konteks menentukan will atau going to.",
          "skill": "future-will-going"
        },
        {
          "prompt": "The forecast says it will be sunny; look at those clouds, though. It ___ rain.",
          "options": [
            "is going to",
            "will",
            "is"
          ],
          "answer": 0,
          "explanation": "Bukti visual sekarang → is going to.",
          "skill": "future-will-going"
        }
      ]
    }
  },
  "01-elementary/04-comparatives": {
    "title": "Comparatives",
    "levels": {
      "simple": [
        {
          "prompt": "This suitcase is ___ than mine. (light)",
          "options": [
            "lighter",
            "lightest",
            "more light"
          ],
          "answer": 0,
          "explanation": "Light → lighter (comparative).",
          "skill": "comparative"
        },
        {
          "prompt": "The new model is ___ than the old one.",
          "options": [
            "better",
            "best",
            "good"
          ],
          "answer": 0,
          "explanation": "Good → better (irregular comparative).",
          "skill": "comparative"
        },
        {
          "prompt": "This route is ___ than that one.",
          "options": [
            "shorter",
            "shortest",
            "more short"
          ],
          "answer": 0,
          "explanation": "Short → shorter (-er).",
          "skill": "comparative"
        }
      ],
      "intermediate": [
        {
          "prompt": "The new model is ___ more reliable than the old one.",
          "options": [
            "much",
            "most",
            "many"
          ],
          "answer": 0,
          "explanation": "Much + comparative untuk perbedaan besar.",
          "skill": "comparative"
        },
        {
          "prompt": "This plan is ___ as flexible as the annual option.",
          "options": [
            "not as",
            "not than",
            "more than"
          ],
          "answer": 0,
          "explanation": "Not as ... as untuk kesetaraan negatif.",
          "skill": "comparative"
        },
        {
          "prompt": "The express route is ___ faster than the coastal route.",
          "options": [
            "much",
            "most",
            "many"
          ],
          "answer": 0,
          "explanation": "Much + faster.",
          "skill": "comparative"
        }
      ],
      "complex": [
        {
          "prompt": "Pilih perbandingan setara.",
          "options": [
            "This route is as short as the other one.",
            "This route is the short as the other.",
            "This route as shorter than the other."
          ],
          "answer": 0,
          "explanation": "As + adjective + as.",
          "skill": "comparative"
        },
        {
          "prompt": "Superlative membandingkan satu anggota dengan...",
          "options": [
            "seluruh kelompok",
            "satu orang saja",
            "tidak ada yang lain"
          ],
          "answer": 0,
          "explanation": "Superlative = satu vs grup.",
          "skill": "comparative"
        },
        {
          "prompt": "It is the ___ expensive, though.",
          "options": [
            "least",
            "less",
            "more"
          ],
          "answer": 0,
          "explanation": "Least = superlative negatif.",
          "skill": "comparative"
        }
      ]
    }
  },
  "01-elementary/05-quantifiers": {
    "title": "Quantifiers",
    "levels": {
      "simple": [
        {
          "prompt": "There are only ___ apples in the bowl.",
          "options": [
            "a little",
            "a few",
            "much"
          ],
          "answer": 1,
          "explanation": "Apples countable → a few.",
          "skill": "quantifier"
        },
        {
          "prompt": "We have ___ time, so let's start now.",
          "options": [
            "few",
            "little",
            "many"
          ],
          "answer": 1,
          "explanation": "Time uncountable → little.",
          "skill": "quantifier"
        },
        {
          "prompt": "We received ___ applications but ___ feedback.",
          "options": [
            "fewer / less",
            "less / fewer",
            "many / much"
          ],
          "answer": 0,
          "explanation": "Fewer = countable; less = uncountable.",
          "skill": "quantifier"
        }
      ],
      "intermediate": [
        {
          "prompt": "There is ___ noise in the room.",
          "options": [
            "too much",
            "too many",
            "too few"
          ],
          "answer": 0,
          "explanation": "Noise uncountable → too much.",
          "skill": "quantifier"
        },
        {
          "prompt": "Only ___ seats are available.",
          "options": [
            "a few",
            "a little",
            "much"
          ],
          "answer": 0,
          "explanation": "Seats countable → a few.",
          "skill": "quantifier"
        },
        {
          "prompt": "Fewer dipakai dengan noun...",
          "options": [
            "dapat dihitung",
            "tidak dapat dihitung",
            "semua noun"
          ],
          "answer": 0,
          "explanation": "Fewer untuk countable noun.",
          "skill": "quantifier"
        }
      ],
      "complex": [
        {
          "prompt": "Pilih pasangan yang tepat.",
          "options": [
            "fewer emails / less time",
            "less emails / fewer time",
            "much emails / many time"
          ],
          "answer": 0,
          "explanation": "Emails countable → fewer; time uncountable → less.",
          "skill": "quantifier"
        },
        {
          "prompt": "Dalam laporan stok, perhatikan apakah noun...",
          "options": [
            "dapat dihitung atau tidak",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Countable vs uncountable menentukan quantifier.",
          "skill": "quantifier"
        },
        {
          "prompt": "Less dipakai dengan...",
          "options": [
            "jumlah atau noun tak terhitung",
            "noun yang dapat dihitung",
            "semua noun"
          ],
          "answer": 0,
          "explanation": "Less untuk uncountable.",
          "skill": "quantifier"
        }
      ]
    }
  },
  "01-elementary/06-modals-basic": {
    "title": "Modals (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "You ___ stop at the red light.",
          "options": [
            "must",
            "can",
            "may"
          ],
          "answer": 0,
          "explanation": "Must untuk kewajiban/aturan.",
          "skill": "modal-basic"
        },
        {
          "prompt": "___ I open the window?",
          "options": [
            "Can",
            "Must",
            "Should"
          ],
          "answer": 0,
          "explanation": "Can untuk meminta izin.",
          "skill": "modal-basic"
        },
        {
          "prompt": "You ___ see a doctor.",
          "options": [
            "should",
            "must",
            "can"
          ],
          "answer": 0,
          "explanation": "Should untuk saran.",
          "skill": "modal-basic"
        }
      ],
      "intermediate": [
        {
          "prompt": "He ___ speak three languages.",
          "options": [
            "can",
            "must",
            "should"
          ],
          "answer": 0,
          "explanation": "Can untuk kemampuan.",
          "skill": "modal-basic"
        },
        {
          "prompt": "You ___ not smoke here.",
          "options": [
            "must",
            "can",
            "should"
          ],
          "answer": 0,
          "explanation": "Must not untuk larangan.",
          "skill": "modal-basic"
        },
        {
          "prompt": "___ we go now?",
          "options": [
            "Shall",
            "Must",
            "Can"
          ],
          "answer": 0,
          "explanation": "Shall untuk menawarkan/usul.",
          "skill": "modal-basic"
        }
      ],
      "complex": [
        {
          "prompt": "Modal diikuti oleh...",
          "options": [
            "verb dasar",
            "verb + -ing",
            "verb + to"
          ],
          "answer": 0,
          "explanation": "Modal + verb dasar (tanpa to).",
          "skill": "modal-basic"
        },
        {
          "prompt": "Pilih kalimat dengan modal yang tepat.",
          "options": [
            "You must wear a helmet.",
            "You must wearing a helmet.",
            "You must to wear a helmet."
          ],
          "answer": 0,
          "explanation": "Must + wear (bentuk dasar).",
          "skill": "modal-basic"
        },
        {
          "prompt": "Should digunakan untuk...",
          "options": [
            "memberi saran",
            "mengucapkan selamat",
            "meminta maaf"
          ],
          "answer": 0,
          "explanation": "Should untuk saran/saran.",
          "skill": "modal-basic"
        }
      ]
    }
  },
  "01-elementary/07-adverbs-frequency": {
    "title": "Adverbs of Frequency",
    "levels": {
      "simple": [
        {
          "prompt": "I ___ go to the gym on Mondays.",
          "options": [
            "always",
            "never",
            "sometimes"
          ],
          "answer": 0,
          "explanation": "Always = 100% frekuensi.",
          "skill": "adverb-frequency"
        },
        {
          "prompt": "She ___ arrives late. She is always on time.",
          "options": [
            "never",
            "often",
            "usually"
          ],
          "answer": 0,
          "explanation": "Never = 0% frekuensi.",
          "skill": "adverb-frequency"
        },
        {
          "prompt": "We ___ have lunch at 12 p.m.",
          "options": [
            "usually",
            "never",
            "rarely"
          ],
          "answer": 0,
          "explanation": "Usually = kebiasaan.",
          "skill": "adverb-frequency"
        }
      ],
      "intermediate": [
        {
          "prompt": "Adverb frekuensi biasanya dipakai...",
          "options": [
            "sesudah to be, sebelum verb utama",
            "selalu di awal kalimat",
            "selalu di akhir kalimat"
          ],
          "answer": 0,
          "explanation": "Posisi standar: sesudah be, sebelum verb.",
          "skill": "adverb-frequency"
        },
        {
          "prompt": "He is ___ late for work.",
          "options": [
            "never",
            "always",
            "sometimes"
          ],
          "answer": 0,
          "explanation": "Is + never (sesudah to be).",
          "skill": "adverb-frequency"
        },
        {
          "prompt": "They ___ finish their work on time.",
          "options": [
            "always",
            "never",
            "rarely"
          ],
          "answer": 0,
          "explanation": "Always + finish (sebelum verb).",
          "skill": "adverb-frequency"
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat dengan posisi adverb yang tepat.",
          "options": [
            "She always comes on time.",
            "She comes always on time.",
            "Always she comes on time."
          ],
          "answer": 0,
          "explanation": "Always sebelum verb comes.",
          "skill": "adverb-frequency"
        },
        {
          "prompt": "Adverb frekuensi menunjukkan...",
          "options": [
            "seberapa sering sesuatu terjadi",
            "di mana sesuatu terjadi",
            "kapan sesuatu terjadi"
          ],
          "answer": 0,
          "explanation": "Frekuensi = seberapa sering.",
          "skill": "adverb-frequency"
        },
        {
          "prompt": "I ___ forget my keys. (jarang)",
          "options": [
            "rarely",
            "always",
            "usually"
          ],
          "answer": 0,
          "explanation": "Rarely = jarang.",
          "skill": "adverb-frequency"
        }
      ]
    }
  },
  "01-elementary/08-present-perfect-intro": {
    "title": "Present Perfect (Intro)",
    "levels": {
      "simple": [
        {
          "prompt": "She ___ finished her homework.",
          "options": [
            "have",
            "has",
            "is"
          ],
          "answer": 1,
          "explanation": "She → has + V3.",
          "skill": "present-perfect"
        },
        {
          "prompt": "We have ___ that museum before.",
          "options": [
            "visit",
            "visited",
            "visiting"
          ],
          "answer": 1,
          "explanation": "Have/has + past participle: visited.",
          "skill": "present-perfect"
        },
        {
          "prompt": "___ you ever eaten Korean food?",
          "options": [
            "Did",
            "Have",
            "Are"
          ],
          "answer": 1,
          "explanation": "Have + ever + V3.",
          "skill": "present-perfect"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat Present Perfect yang tepat.",
          "options": [
            "I have seen him yesterday.",
            "I have seen him before.",
            "I saw him before now yesterday."
          ],
          "answer": 1,
          "explanation": "Before = waktu tidak spesifik → Present Perfect.",
          "skill": "present-perfect"
        },
        {
          "prompt": "He has ___ arrived. He is here now.",
          "options": [
            "just",
            "ago",
            "last"
          ],
          "answer": 0,
          "explanation": "Just = baru saja → Present Perfect.",
          "skill": "present-perfect"
        },
        {
          "prompt": "Jangan gabungkan Present Perfect dengan...",
          "options": [
            "waktu lampau spesifik seperti yesterday",
            "kata tambahan",
            "tanda baca"
          ],
          "answer": 0,
          "explanation": "Yesterday pakai Past Simple, bukan Present Perfect.",
          "skill": "present-perfect"
        }
      ],
      "complex": [
        {
          "prompt": "Have you ever tried sushi? Ever artinya...",
          "options": [
            "kapan saja dalam hidup",
            "kemarin",
            "minggu depan"
          ],
          "answer": 0,
          "explanation": "Ever = kapan saja dalam pengalaman hidup.",
          "skill": "present-perfect"
        },
        {
          "prompt": "Present Perfect digunakan untuk...",
          "options": [
            "pengalaman tanpa waktu spesifik",
            "kejadian hari ini saja",
            "masa depan"
          ],
          "answer": 0,
          "explanation": "Pengalaman hidup tanpa waktu pasti.",
          "skill": "present-perfect"
        },
        {
          "prompt": "I have seen him before. Before = ...",
          "options": [
            "sebelumnya",
            "kemarin",
            "besok"
          ],
          "answer": 0,
          "explanation": "Before = sebelumnya/kapan saja.",
          "skill": "present-perfect"
        }
      ]
    }
  },
  "01-elementary/09-prepositions-advanced": {
    "title": "Prepositions (Advanced)",
    "levels": {
      "simple": [
        {
          "prompt": "I'm interested ___ photography.",
          "options": [
            "on",
            "in",
            "at"
          ],
          "answer": 1,
          "explanation": "Interested in + noun.",
          "skill": "preposition-dependent"
        },
        {
          "prompt": "He is good ___ solving puzzles.",
          "options": [
            "at",
            "in",
            "for"
          ],
          "answer": 0,
          "explanation": "Good at + noun/verb-ing.",
          "skill": "preposition-dependent"
        },
        {
          "prompt": "It depends ___ the final schedule.",
          "options": [
            "of",
            "on",
            "to"
          ],
          "answer": 1,
          "explanation": "Depends on.",
          "skill": "preposition-dependent"
        }
      ],
      "intermediate": [
        {
          "prompt": "She apologized ___ arriving late.",
          "options": [
            "for",
            "to",
            "with"
          ],
          "answer": 0,
          "explanation": "Apologize for + verb-ing.",
          "skill": "preposition-dependent"
        },
        {
          "prompt": "Listen ___ music.",
          "options": [
            "to",
            "at",
            "for"
          ],
          "answer": 0,
          "explanation": "Listen to.",
          "skill": "preposition-dependent"
        },
        {
          "prompt": "Preposition selalu diikuti oleh...",
          "options": [
            "noun/pronoun atau verb-ing",
            "verb dasar",
            "adjective"
          ],
          "answer": 0,
          "explanation": "Preposition + noun/pronoun/verb-ing.",
          "skill": "preposition-dependent"
        }
      ],
      "complex": [
        {
          "prompt": "Pilih pasangan yang lazim.",
          "options": [
            "listen to",
            "listen at",
            "listen for to"
          ],
          "answer": 0,
          "explanation": "Listen to adalah kolokasi lazim.",
          "skill": "preposition-dependent"
        },
        {
          "prompt": "Dependent preposition dipelajari sebagai...",
          "options": [
            "pasangan kata",
            "kata tunggal",
            "idiom saja"
          ],
          "answer": 0,
          "explanation": "Pelajari verb/adjective + preposition bersama.",
          "skill": "preposition-dependent"
        },
        {
          "prompt": "She is afraid ___ dogs.",
          "options": [
            "of",
            "at",
            "in"
          ],
          "answer": 0,
          "explanation": "Afraid of + noun.",
          "skill": "preposition-dependent"
        }
      ]
    }
  },
  "01-elementary/10-conjunctions-basic": {
    "title": "Conjunctions (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "I like tea ___ I don't like coffee.",
          "options": [
            "but",
            "because",
            "or"
          ],
          "answer": 0,
          "explanation": "But untuk kontras.",
          "skill": "conjunction-basic"
        },
        {
          "prompt": "Would you like rice ___ noodles?",
          "options": [
            "and",
            "or",
            "so"
          ],
          "answer": 1,
          "explanation": "Or untuk pilihan.",
          "skill": "conjunction-basic"
        },
        {
          "prompt": "We left early ___ the roads were busy.",
          "options": [
            "because",
            "so",
            "but"
          ],
          "answer": 0,
          "explanation": "Because untuk alasan.",
          "skill": "conjunction-basic"
        }
      ],
      "intermediate": [
        {
          "prompt": "The roads were busy, ___ we left early.",
          "options": [
            "because",
            "so",
            "or"
          ],
          "answer": 1,
          "explanation": "So untuk hasil/akibat.",
          "skill": "conjunction-basic"
        },
        {
          "prompt": "Pilih kalimat yang benar.",
          "options": [
            "Because it rained, so we stayed home.",
            "Because it rained, we stayed home.",
            "It rained because, we stayed home."
          ],
          "answer": 1,
          "explanation": "Jangan gabungkan because dan so dalam satu klausa.",
          "skill": "conjunction-basic"
        },
        {
          "prompt": "And digunakan untuk...",
          "options": [
            "menambah informasi",
            "menunjukkan kontras",
            "menunjukkan hasil"
          ],
          "answer": 0,
          "explanation": "And = penambahan.",
          "skill": "conjunction-basic"
        }
      ],
      "complex": [
        {
          "prompt": "Because mengenalkan...",
          "options": [
            "alasan/sebab",
            "hasil",
            "pilihan"
          ],
          "answer": 0,
          "explanation": "Because = sebab.",
          "skill": "conjunction-basic"
        },
        {
          "prompt": "So mengenalkan...",
          "options": [
            "hasil/akibat",
            "alasan",
            "pilihan"
          ],
          "answer": 0,
          "explanation": "So = hasil.",
          "skill": "conjunction-basic"
        },
        {
          "prompt": "Hindari memakai because dan so sekaligus karena...",
          "options": [
            "satu klausa hanya perlu satu penanda hubungan",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Redundansi.",
          "skill": "conjunction-basic"
        }
      ]
    }
  },
  "02-intermediate/01-present-perfect-vs-past": {
    "title": "Present Perfect vs Past Simple",
    "levels": {
      "simple": [
        {
          "prompt": "I ___ the new manager this morning. (pagi masih berlangsung)",
          "options": [
            "have met",
            "met last year",
            "meet"
          ],
          "answer": 0,
          "explanation": "This morning masih berlangsung → have met.",
          "skill": "present-perfect-vs-past"
        },
        {
          "prompt": "The report ___ two days ago.",
          "options": [
            "has arrived",
            "arrived",
            "has arrive"
          ],
          "answer": 1,
          "explanation": "Two days ago = waktu lampau selesai → arrived.",
          "skill": "present-perfect-vs-past"
        },
        {
          "prompt": "We ___ 40 orders this week. (minggu masih berlangsung)",
          "options": [
            "have processed",
            "processed last week",
            "process"
          ],
          "answer": 0,
          "explanation": "This week masih berlangsung → have processed.",
          "skill": "present-perfect-vs-past"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih pasangan sesuai periode selesai dan belum selesai.",
          "options": [
            "I have called yesterday / I called today (today ongoing)",
            "I called yesterday / I have called twice today",
            "I call yesterday / I have call today"
          ],
          "answer": 1,
          "explanation": "Yesterday = selesai (Past Simple); today = masih berlangsung (Present Perfect).",
          "skill": "present-perfect-vs-past"
        },
        {
          "prompt": "The report ___ by the team yesterday.",
          "options": [
            "was written",
            "has written",
            "is written"
          ],
          "answer": 0,
          "explanation": "Yesterday → Past Simple passive: was written.",
          "skill": "present-perfect-vs-past"
        },
        {
          "prompt": "I ___ the file before the computer crashed.",
          "options": [
            "had saved",
            "have save",
            "was save"
          ],
          "answer": 0,
          "explanation": "Before crashed → Past Perfect.",
          "skill": "present-perfect-vs-past"
        }
      ],
      "complex": [
        {
          "prompt": "Cocokkan tense dengan periode yang dimaksud karena...",
          "options": [
            "periode terbuka vs selesai berbeda",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "Present Perfect = terbuka; Past Simple = selesai.",
          "skill": "present-perfect-vs-past"
        },
        {
          "prompt": "We have processed 40 orders this week. Artinya...",
          "options": [
            "40 orden diproses minggu ini (masih berlangsung)",
            "40 orden diproses minggu lalu",
            "40 orden akan diproses"
          ],
          "answer": 0,
          "explanation": "This week = periode terbuka.",
          "skill": "present-perfect-vs-past"
        },
        {
          "prompt": "We processed 40 orders last week. Artinya...",
          "options": [
            "minggu telah selesai",
            "minggu masih berlangsung",
            "minggu depan"
          ],
          "answer": 0,
          "explanation": "Last week = periode selesai.",
          "skill": "present-perfect-vs-past"
        }
      ]
    }
  },
  "02-intermediate/02-present-perfect-continuous": {
    "title": "Present Perfect Continuous",
    "levels": {
      "simple": [
        {
          "prompt": "I ___ English for six months and continue to study.",
          "options": [
            "have been studying",
            "am studied",
            "has studied"
          ],
          "answer": 0,
          "explanation": "I → have been studying.",
          "skill": "present-perfect-continuous"
        },
        {
          "prompt": "The floor is wet. Someone ___ it.",
          "options": [
            "has been washing",
            "have wash",
            "is washed"
          ],
          "answer": 0,
          "explanation": "Has been washing = aktivitas baru selesai dengan bukti sekarang.",
          "skill": "present-perfect-continuous"
        },
        {
          "prompt": "She ___ for three hours.",
          "options": [
            "has been working",
            "is work",
            "has work"
          ],
          "answer": 0,
          "explanation": "She → has been working.",
          "skill": "present-perfect-continuous"
        }
      ],
      "intermediate": [
        {
          "prompt": "Fokus pada proses atau aktivitas berulang dengan bukti sekarang → ...",
          "options": [
            "Present Perfect Continuous",
            "Past Simple",
            "Future Simple"
          ],
          "answer": 0,
          "explanation": "PPC untuk proses dengan bukti sekarang.",
          "skill": "present-perfect-continuous"
        },
        {
          "prompt": "The support line has been receiving calls all morning; it is still busy. Artinya...",
          "options": [
            "aktivitas masih berlangsung",
            "aktivitas sudah selesai",
            "aktivitas belum pernah terjadi"
          ],
          "answer": 0,
          "explanation": "Still busy = masih berlangsung.",
          "skill": "present-perfect-continuous"
        },
        {
          "prompt": "We have answered 30 calls so far. Fokus pada...",
          "options": [
            "jumlah selesai",
            "proses berlangsung",
            "masa depan"
          ],
          "answer": 0,
          "explanation": "Jumlah selesai → Present Perfect Simple.",
          "skill": "present-perfect-continuous"
        }
      ],
      "complex": [
        {
          "prompt": "Jika fokusnya hasil selesai atau jumlah, pilih...",
          "options": [
            "Present Perfect Simple",
            "Past Continuous",
            "Future Simple"
          ],
          "answer": 0,
          "explanation": "Hasil/jumlah selesai → Present Perfect Simple.",
          "skill": "present-perfect-continuous"
        },
        {
          "prompt": "She ___ four chapters so far.",
          "options": [
            "has written",
            "has been writing",
            "is writing"
          ],
          "answer": 0,
          "explanation": "Four chapters = jumlah selesai → has written.",
          "skill": "present-perfect-continuous"
        },
        {
          "prompt": "The engineers had been testing the pump for hours before it overheated. Ini adalah...",
          "options": [
            "Past Perfect Continuous",
            "Present Perfect Continuous",
            "Past Simple"
          ],
          "answer": 0,
          "explanation": "Had been testing = PPC untuk durasi di masa lampau.",
          "skill": "present-perfect-continuous"
        }
      ]
    }
  },
  "02-intermediate/03-past-perfect": {
    "title": "Past Perfect",
    "levels": {
      "simple": [
        {
          "prompt": "I ___ the file before the computer crashed.",
          "options": [
            "had saved",
            "have save",
            "was save"
          ],
          "answer": 0,
          "explanation": "Had saved = aktivitas sebelum peristiwa lampau lainnya.",
          "skill": "past-perfect"
        },
        {
          "prompt": "When we arrived, the guests ___ dinner.",
          "options": [
            "had already eaten",
            "have already eat",
            "already eat"
          ],
          "answer": 0,
          "explanation": "Had already eaten = sudah selesai sebelum kami tiba.",
          "skill": "past-perfect"
        },
        {
          "prompt": "The alarm ___ before the guard arrived.",
          "options": [
            "had sounded",
            "has sounded",
            "sounds"
          ],
          "answer": 0,
          "explanation": "Had sounded = alarm berbunyi sebelum guard tiba.",
          "skill": "past-perfect"
        }
      ],
      "intermediate": [
        {
          "prompt": "Past Perfect membantu pembaca memahami...",
          "options": [
            "urutan dan sebab dalam cerita",
            "kata lebih banyak",
            "grammar sulit"
          ],
          "answer": 0,
          "explanation": "PP untuk urutan kejadian lampau.",
          "skill": "past-perfect"
        },
        {
          "prompt": "The technician discovered that a cable ___ loose.",
          "options": [
            "had come",
            "have come",
            "comes"
          ],
          "answer": 0,
          "explanation": "Had come = sebelum discovered.",
          "skill": "past-perfect"
        },
        {
          "prompt": "By the time the ambulance arrived, the crowd ___ the emergency line.",
          "options": [
            "had called",
            "have called",
            "calls"
          ],
          "answer": 0,
          "explanation": "Had called = sebelum ambulance tiba.",
          "skill": "past-perfect"
        }
      ],
      "complex": [
        {
          "prompt": "Setelah urutan sudah jelas, gunakan...",
          "options": [
            "Past Simple untuk narasi ringkas",
            "Past Perfect untuk semua kalimat",
            "Present Simple untuk semua kalimat"
          ],
          "answer": 0,
          "explanation": "Past Simple setelah PP untuk efisiensi.",
          "skill": "past-perfect"
        },
        {
          "prompt": "Pilih urutan yang benar: alarm berbunyi dahulu, lalu petugas tiba.",
          "options": [
            "The alarm had sounded before the guard arrived.",
            "The alarm sounded before the guard had arrived.",
            "The alarm has sounded before the guard arrived."
          ],
          "answer": 0,
          "explanation": "Alarm dulu (had sounded), guard kemudian (arrived).",
          "skill": "past-perfect"
        },
        {
          "prompt": "Past Perfect membantu...",
          "options": [
            "memahami sebab dan urutan",
            "membuat kalimat lebih panjang",
            "menghindari verb"
          ],
          "answer": 0,
          "explanation": "PP menjelaskan sebab dan urutan.",
          "skill": "past-perfect"
        }
      ]
    }
  },
  "02-intermediate/04-passive-basic": {
    "title": "Passive Voice (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "The letter ___ by the manager yesterday.",
          "options": [
            "was written",
            "is written",
            "will be written"
          ],
          "answer": 0,
          "explanation": "Yesterday → was written.",
          "skill": "passive-basic"
        },
        {
          "prompt": "The window ___ by the boy.",
          "options": [
            "was broken",
            "is broken",
            "will be broken"
          ],
          "answer": 0,
          "explanation": "Was broken = passive Past Simple.",
          "skill": "passive-basic"
        },
        {
          "prompt": "English ___ all over the world.",
          "options": [
            "is spoken",
            "speaks",
            "is speaking"
          ],
          "answer": 0,
          "explanation": "Is spoken = passive Present Simple.",
          "skill": "passive-basic"
        }
      ],
      "intermediate": [
        {
          "prompt": "Passive voice digunakan untuk...",
          "options": [
            "menonjolkan tindakan atau objek",
            "menyembunyikan subjek",
            "membuat kalimat lebih pendek"
          ],
          "answer": 0,
          "explanation": "Passive untuk fokus pada tindakan/objek.",
          "skill": "passive-basic"
        },
        {
          "prompt": "The report ___ by the team last week.",
          "options": [
            "was written",
            "is written",
            "will be written"
          ],
          "answer": 0,
          "explanation": "Last week → was written.",
          "skill": "passive-basic"
        },
        {
          "prompt": "The door ___ every morning.",
          "options": [
            "is opened",
            "opens",
            "is opening"
          ],
          "answer": 0,
          "explanation": "Every morning → Present Simple passive: is opened.",
          "skill": "passive-basic"
        }
      ],
      "complex": [
        {
          "prompt": "Gunakan passive ketika...",
          "options": [
            "pelaku tidak penting atau tidak diketahui",
            "pelaku selalu disebut",
            "kata lebih banyak"
          ],
          "answer": 0,
          "explanation": "Passive untuk menyembunyikan atau mengabaikan pelaku.",
          "skill": "passive-basic"
        },
        {
          "prompt": "The samples are being analyzed at three laboratories. Ini adalah...",
          "options": [
            "Present Continuous passive",
            "Past Simple passive",
            "Future Simple passive"
          ],
          "answer": 0,
          "explanation": "Are being analyzed = Present Continuous passive.",
          "skill": "passive-basic"
        },
        {
          "prompt": "Pilih kalimat passive yang benar.",
          "options": [
            "The cake was eaten by the children.",
            "The cake ate by the children.",
            "The cake was eat by the children."
          ],
          "answer": 0,
          "explanation": "Was + eaten (V3) = passive benar.",
          "skill": "passive-basic"
        }
      ]
    }
  },
  "02-intermediate/05-conditionals-1-2": {
    "title": "Conditional Type 1 & 2",
    "levels": {
      "simple": [
        {
          "prompt": "If the weather is clear, we ___ outside.",
          "options": [
            "will eat",
            "would ate",
            "ate tomorrow"
          ],
          "answer": 0,
          "explanation": "Type 1: if + present, will + verb.",
          "skill": "conditional-1-2"
        },
        {
          "prompt": "If I were you, I ___ the offer.",
          "options": [
            "will accept",
            "would consider",
            "considered yesterday"
          ],
          "answer": 1,
          "explanation": "Type 2: would + verb dasar.",
          "skill": "conditional-1-2"
        },
        {
          "prompt": "If it rains, we ___ inside.",
          "options": [
            "will stay",
            "would stay",
            "stayed"
          ],
          "answer": 0,
          "explanation": "Type 1 → will stay.",
          "skill": "conditional-1-2"
        }
      ],
      "intermediate": [
        {
          "prompt": "Type 1 digunakan untuk...",
          "options": [
            "kemungkinan nyata",
            "kemungkinan mustahil",
            "masa lalu"
          ],
          "answer": 0,
          "explanation": "Type 1 = kondisi nyata di masa depan.",
          "skill": "conditional-1-2"
        },
        {
          "prompt": "Type 2 digunakan untuk situasi...",
          "options": [
            "hipotetis / tidak nyata",
            "fakta",
            "masa depan pasti"
          ],
          "answer": 0,
          "explanation": "Type 2 = hipotetis.",
          "skill": "conditional-1-2"
        },
        {
          "prompt": "If she studies hard, she ___ the exam.",
          "options": [
            "will pass",
            "would pass",
            "passed"
          ],
          "answer": 0,
          "explanation": "Type 1: will pass.",
          "skill": "conditional-1-2"
        }
      ],
      "complex": [
        {
          "prompt": "Past Simple pada type 2 tidak selalu berarti...",
          "options": [
            "waktu lampau",
            "masa depan",
            "waktu sekarang"
          ],
          "answer": 0,
          "explanation": "Type 2 past simple = jarak hipotetis, bukan lampau.",
          "skill": "conditional-1-2"
        },
        {
          "prompt": "If the supplier confirms today, we ___ tomorrow.",
          "options": [
            "will ship",
            "would ship",
            "shipped"
          ],
          "answer": 0,
          "explanation": "Type 1: konfirmasi hari ini → kirim besok.",
          "skill": "conditional-1-2"
        },
        {
          "prompt": "Pilih kalimat type 2 yang benar.",
          "options": [
            "If I were rich, I would travel.",
            "If I am rich, I will travel.",
            "If I was rich, I travels."
          ],
          "answer": 0,
          "explanation": "If I were, I would travel.",
          "skill": "conditional-1-2"
        }
      ]
    }
  },
  "02-intermediate/06-relative-clauses": {
    "title": "Relative Clauses",
    "levels": {
      "simple": [
        {
          "prompt": "The man ___ lives next door is a doctor.",
          "options": [
            "who",
            "which",
            "that"
          ],
          "answer": 0,
          "explanation": "Who untuk orang.",
          "skill": "relative-clause"
        },
        {
          "prompt": "The book ___ I bought is interesting.",
          "options": [
            "which",
            "who",
            "whose"
          ],
          "answer": 0,
          "explanation": "Which untuk benda.",
          "skill": "relative-clause"
        },
        {
          "prompt": "This is the house ___ Jack built.",
          "options": [
            "that",
            "who",
            "whom"
          ],
          "answer": 0,
          "explanation": "That untuk benda/tidak spesifik.",
          "skill": "relative-clause"
        }
      ],
      "intermediate": [
        {
          "prompt": "Who digunakan untuk...",
          "options": [
            "orang",
            "benda",
            "tempat"
          ],
          "answer": 0,
          "explanation": "Who = orang.",
          "skill": "relative-clause"
        },
        {
          "prompt": "Which digunakan untuk...",
          "options": [
            "benda",
            "orang",
            "tempat"
          ],
          "answer": 0,
          "explanation": "Which = benda/hewan.",
          "skill": "relative-clause"
        },
        {
          "prompt": "The teacher ___ teaches us is kind.",
          "options": [
            "who",
            "which",
            "whose"
          ],
          "answer": 0,
          "explanation": "Teacher = orang → who.",
          "skill": "relative-clause"
        }
      ],
      "complex": [
        {
          "prompt": "Relative clause memberikan informasi tentang...",
          "options": [
            "noun di depannya",
            "verb di depannya",
            "adjective di depannya"
          ],
          "answer": 0,
          "explanation": "Relative clause menjelaskan noun sebelumnya.",
          "skill": "relative-clause"
        },
        {
          "prompt": "Defining relative clause tidak memakai...",
          "options": [
            "koma",
            "kata tanya",
            "tanda seru"
          ],
          "answer": 0,
          "explanation": "Defining clause tidak dipisah koma.",
          "skill": "relative-clause"
        },
        {
          "prompt": "The car ___ won the race is red.",
          "options": [
            "that",
            "who",
            "whose"
          ],
          "answer": 0,
          "explanation": "Car = benda → that.",
          "skill": "relative-clause"
        }
      ]
    }
  },
  "02-intermediate/07-reported-speech-basic": {
    "title": "Reported Speech (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "She said she ___ tired.",
          "options": [
            "was",
            "is",
            "are"
          ],
          "answer": 0,
          "explanation": "Present Simple → Past Simple dalam reported speech.",
          "skill": "reported-speech"
        },
        {
          "prompt": "He said he ___ going.",
          "options": [
            "is",
            "was",
            "were"
          ],
          "answer": 0,
          "explanation": "Am/is → was.",
          "skill": "reported-speech"
        },
        {
          "prompt": "They said they ___ come.",
          "options": [
            "will",
            "would",
            "can"
          ],
          "answer": 0,
          "explanation": "Will → would.",
          "skill": "reported-speech"
        }
      ],
      "intermediate": [
        {
          "prompt": "'I am hungry,' he said. → He said he ___ hungry.",
          "options": [
            "is",
            "was",
            "am"
          ],
          "answer": 0,
          "explanation": "Is → was (backshift).",
          "skill": "reported-speech"
        },
        {
          "prompt": "'I will call you,' she said. → She said she ___ call me.",
          "options": [
            "will",
            "would",
            "can"
          ],
          "answer": 0,
          "explanation": "Will → would.",
          "skill": "reported-speech"
        },
        {
          "prompt": "Reported speech mengubah...",
          "options": [
            "tense dan kata ganti",
            "hanya tense",
            "hanya kata ganti"
          ],
          "answer": 0,
          "explanation": "Tense dan kata ganti berubah.",
          "skill": "reported-speech"
        }
      ],
      "complex": [
        {
          "prompt": "Backshift adalah perubahan...",
          "options": [
            "tense ke bentuk lampau",
            "kata ganti ke objek",
            "kata tanya ke pernyataan"
          ],
          "answer": 0,
          "explanation": "Tense berke belakang satu langkah.",
          "skill": "reported-speech"
        },
        {
          "prompt": "'I saw her yesterday,' he said. → He said he ___ her the day before.",
          "options": [
            "saw",
            "had seen",
            "see"
          ],
          "answer": 0,
          "explanation": "Saw → had seen (double backshift).",
          "skill": "reported-speech"
        },
        {
          "prompt": "Pilih reported speech yang benar: 'I am here,' she said.",
          "options": [
            "She said she was there.",
            "She said she is here.",
            "She said she were there."
          ],
          "answer": 0,
          "explanation": "Is → was; here → there.",
          "skill": "reported-speech"
        }
      ]
    }
  },
  "02-intermediate/08-gerund-infinitive": {
    "title": "Gerund vs Infinitive",
    "levels": {
      "simple": [
        {
          "prompt": "I enjoy ___ to music.",
          "options": [
            "listening",
            "listen",
            "to listen"
          ],
          "answer": 0,
          "explanation": "Enjoy + gerund (-ing).",
          "skill": "gerund-infinitive"
        },
        {
          "prompt": "I want ___ home.",
          "options": [
            "to go",
            "go",
            "going"
          ],
          "answer": 0,
          "explanation": "Want + infinitive (to + verb).",
          "skill": "gerund-infinitive"
        },
        {
          "prompt": "She stopped ___ smoke.",
          "options": [
            "to",
            "smoking",
            "smoke"
          ],
          "answer": 0,
          "explanation": "Stopped to smoke = berhenti untuk merokok (tujuan).",
          "skill": "gerund-infinitive"
        }
      ],
      "intermediate": [
        {
          "prompt": "Gerund adalah verb dengan akhiran...",
          "options": [
            "-ing",
            "-ed",
            "-s"
          ],
          "answer": 0,
          "explanation": "Verb + -ing = gerund.",
          "skill": "gerund-infinitive"
        },
        {
          "prompt": "Infinitive adalah...",
          "options": [
            "to + verb dasar",
            "verb + -ing",
            "verb + -ed"
          ],
          "answer": 0,
          "explanation": "To + verb = infinitive.",
          "skill": "gerund-infinitive"
        },
        {
          "prompt": "I like ___ coffee.",
          "options": [
            "drinking",
            "drink",
            "to drinking"
          ],
          "answer": 0,
          "explanation": "Like + gerund.",
          "skill": "gerund-infinitive"
        }
      ],
      "complex": [
        {
          "prompt": "Gunakan gerund setelah...",
          "options": [
            "preposition",
            "kata tanya",
            "conjunction"
          ],
          "answer": 0,
          "explanation": "Setelah preposition pakai gerund.",
          "skill": "gerund-infinitive"
        },
        {
          "prompt": "Gunakan infinitive untuk...",
          "options": [
            "menyebutkan tujuan",
            "mengakhiri kalimat",
            "memulai paragraf"
          ],
          "answer": 0,
          "explanation": "Infinitive untuk tujuan.",
          "skill": "gerund-infinitive"
        },
        {
          "prompt": "I remember ___ the door. (ingat tindakan yang sudah dilakukan)",
          "options": [
            "locking",
            "to lock",
            "locked"
          ],
          "answer": 0,
          "explanation": "Remember + gerund = ingat telah melakukan.",
          "skill": "gerund-infinitive"
        }
      ]
    }
  },
  "02-intermediate/09-modals-possibility": {
    "title": "Modals (Possibility)",
    "levels": {
      "simple": [
        {
          "prompt": "It ___ rain tomorrow. (kemungkinan)",
          "options": [
            "might",
            "must",
            "can't"
          ],
          "answer": 0,
          "explanation": "Might untuk kemungkinan.",
          "skill": "modal-possibility"
        },
        {
          "prompt": "She ___ be at home. (kemungkinan kecil)",
          "options": [
            "may",
            "must",
            "can't"
          ],
          "answer": 0,
          "explanation": "May untuk kemungkinan.",
          "skill": "modal-possibility"
        },
        {
          "prompt": "He ___ be at work. (pastian tidak)",
          "options": [
            "can't",
            "must",
            "may"
          ],
          "answer": 0,
          "explanation": "Can't untuk ketidakpastian/kemustahilan.",
          "skill": "modal-possibility"
        }
      ],
      "intermediate": [
        {
          "prompt": "Must untuk...",
          "options": [
            "kepastian tinggi",
            "kemungkinan kecil",
            "ketidakmampuan"
          ],
          "answer": 0,
          "explanation": "Must = kepastian/logical deduction.",
          "skill": "modal-possibility"
        },
        {
          "prompt": "Can't untuk...",
          "options": [
            "ketidakmampuan atau ketidakpastian",
            "kewajiban",
            "keterampilan"
          ],
          "answer": 0,
          "explanation": "Can't = tidak mungkin/tidak mampu.",
          "skill": "modal-possibility"
        },
        {
          "prompt": "She ___ be tired after working all day.",
          "options": [
            "must",
            "can't",
            "may"
          ],
          "answer": 0,
          "explanation": "Worked all day → must be tired.",
          "skill": "modal-possibility"
        }
      ],
      "complex": [
        {
          "prompt": "Might vs may: keduanya untuk...",
          "options": [
            "kemungkinan",
            "kewajiban",
            "ketidakmampuan"
          ],
          "answer": 0,
          "explanation": "Might dan may untuk kemungkinan.",
          "skill": "modal-possibility"
        },
        {
          "prompt": "He ___ be the one who called. (tidak mungkin)",
          "options": [
            "can't",
            "must",
            "may"
          ],
          "answer": 0,
          "explanation": "Tidak mungkin → can't.",
          "skill": "modal-possibility"
        },
        {
          "prompt": "Pilih kalimat dengan modal kemungkinan yang tepat.",
          "options": [
            "It might rain.",
            "It must rain.",
            "It can't rain."
          ],
          "answer": 0,
          "explanation": "Might = kemungkinan (tidak pasti).",
          "skill": "modal-possibility"
        }
      ]
    }
  },
  "02-intermediate/10-phrasal-verbs-basic": {
    "title": "Phrasal Verbs (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "Please ___ your shoes before entering.",
          "options": [
            "take off",
            "take after",
            "take in"
          ],
          "answer": 0,
          "explanation": "Take off = melepaskan/sepatu.",
          "skill": "phrasal-verb"
        },
        {
          "prompt": "I ___ looking for my keys.",
          "options": [
            "am",
            "is",
            "are"
          ],
          "answer": 0,
          "explanation": "Look for = mencari.",
          "skill": "phrasal-verb"
        },
        {
          "prompt": "Please ___ the lights.",
          "options": [
            "turn off",
            "turn on",
            "turn up"
          ],
          "answer": 0,
          "explanation": "Turn off = mematikan lampu.",
          "skill": "phrasal-verb"
        }
      ],
      "intermediate": [
        {
          "prompt": "Ganti ‘turn off the radio’ dengan pronoun.",
          "options": [
            "turn off it",
            "turn it off",
            "it turn off"
          ],
          "answer": 1,
          "explanation": "Pronoun dipisahkan: turn it off.",
          "skill": "phrasal-verb"
        },
        {
          "prompt": "'Find out' paling dekat artinya dengan...",
          "options": [
            "menemukan informasi",
            "menjaga seseorang",
            "memakai pakaian"
          ],
          "answer": 0,
          "explanation": "Find out = menemukan informasi.",
          "skill": "phrasal-verb"
        },
        {
          "prompt": "Pilih phrasal verb untuk merawat anak.",
          "options": [
            "look up",
            "look after",
            "look out"
          ],
          "answer": 1,
          "explanation": "Look after = merawat.",
          "skill": "phrasal-verb"
        }
      ],
      "complex": [
        {
          "prompt": "Phrasal verb inseparable berarti...",
          "options": [
            "verb dan particle tidak dipisah object",
            "particle selalu hilang",
            "verb berubah menjadi noun"
          ],
          "answer": 0,
          "explanation": "Inseparable = tidak bisa dipisahkan oleh object.",
          "skill": "phrasal-verb"
        },
        {
          "prompt": "Separable phrasal verb dengan pronoun...",
          "options": [
            "pronoun dipisahkan di antara verb dan particle",
            "pronoun selalu di akhir",
            "tidak bisa dipakai pronoun"
          ],
          "answer": 0,
          "explanation": "Pronoun pemisah: turn it off.",
          "skill": "phrasal-verb"
        },
        {
          "prompt": "Look up = ...",
          "options": [
            "mencari informasi",
            "melihat ke atas",
            "mempercayai"
          ],
          "answer": 0,
          "explanation": "Look up = mencari (dalam kamus/dll).",
          "skill": "phrasal-verb"
        }
      ]
    }
  },
  "02-intermediate/11-question-tags": {
    "title": "Question Tags",
    "levels": {
      "simple": [
        {
          "prompt": "You are coming, ___?",
          "options": [
            "are you",
            "aren't you",
            "don't you"
          ],
          "answer": 1,
          "explanation": "Positive statement + negative tag.",
          "skill": "question-tag"
        },
        {
          "prompt": "He doesn't eat meat, ___?",
          "options": [
            "does he",
            "doesn't he",
            "is he"
          ],
          "answer": 0,
          "explanation": "Negative statement + positive tag.",
          "skill": "question-tag"
        },
        {
          "prompt": "They visited Rome, ___?",
          "options": [
            "didn't they",
            "weren't they",
            "don't they"
          ],
          "answer": 0,
          "explanation": "Visited = Past Simple → didn't they.",
          "skill": "question-tag"
        }
      ],
      "intermediate": [
        {
          "prompt": "I'm late, ___?",
          "options": [
            "am I",
            "aren't I",
            "don't I"
          ],
          "answer": 1,
          "explanation": "I'm → aren't I (eksepsi).",
          "skill": "question-tag"
        },
        {
          "prompt": "She can swim, ___?",
          "options": [
            "can she",
            "can't she",
            "does she"
          ],
          "answer": 1,
          "explanation": "Can → can't she.",
          "skill": "question-tag"
        },
        {
          "prompt": "Intonasi naik pada tag meminta...",
          "options": [
            "konfirmasi",
            "keyakinan",
            "maaf"
          ],
          "answer": 0,
          "explanation": "Intonasi naik = meminta konfirmasi.",
          "skill": "question-tag"
        }
      ],
      "complex": [
        {
          "prompt": "Question tag berfungsi untuk...",
          "options": [
            "memastikan informasi atau mengundang respons",
            "mengakhiri kalimat",
            "memulai percakapan"
          ],
          "answer": 0,
          "explanation": "Tag untuk konfirmasi atau undangan respons.",
          "skill": "question-tag"
        },
        {
          "prompt": "Pernyataan positif biasanya diikuti tag...",
          "options": [
            "negatif",
            "positif",
            "tanpa auxiliary"
          ],
          "answer": 0,
          "explanation": "Positif → negatif tag.",
          "skill": "question-tag"
        },
        {
          "prompt": "Pernyataan negatif biasanya diikuti tag...",
          "options": [
            "positif",
            "negatif",
            "tidak ada tag"
          ],
          "answer": 0,
          "explanation": "Negatif → positif tag.",
          "skill": "question-tag"
        }
      ]
    }
  },
  "02-intermediate/12-used-to-would": {
    "title": "Used to / Would",
    "levels": {
      "simple": [
        {
          "prompt": "I ___ have long hair, but now it's short.",
          "options": [
            "used to",
            "would to",
            "use"
          ],
          "answer": 0,
          "explanation": "Used to + base verb untuk kebiasaan lampau.",
          "skill": "used-to-would"
        },
        {
          "prompt": "Did they ___ live here?",
          "options": [
            "used to",
            "use to",
            "would"
          ],
          "answer": 1,
          "explanation": "Did → use to (tanpa -d).",
          "skill": "used-to-would"
        },
        {
          "prompt": "Every winter, we ___ go skating.",
          "options": [
            "would",
            "would to",
            "were"
          ],
          "answer": 0,
          "explanation": "Would untuk tindakan berulang lampau.",
          "skill": "used-to-would"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih bentuk yang wajar untuk keadaan lampau.",
          "options": [
            "She would own a small shop.",
            "She used to own a small shop.",
            "She would to own a small shop."
          ],
          "answer": 1,
          "explanation": "Keadaan → used to, bukan would.",
          "skill": "used-to-would"
        },
        {
          "prompt": "Setelah did, bentuk yang benar adalah...",
          "options": [
            "used to",
            "use to",
            "using to"
          ],
          "answer": 1,
          "explanation": "Did + use to.",
          "skill": "used-to-would"
        },
        {
          "prompt": "Used to menyatakan kebiasaan atau keadaan lampau yang...",
          "options": [
            "tidak lagi benar",
            "masih benar",
            "akan datang"
          ],
          "answer": 0,
          "explanation": "Used to = kebiasaan/keadaan yang sudah berubah.",
          "skill": "used-to-would"
        }
      ],
      "complex": [
        {
          "prompt": "Used to vs would: would tidak dipakai untuk...",
          "options": [
            "keadaan (state)",
            "tindakan berulang",
            "masa depan"
          ],
          "answer": 0,
          "explanation": "Would tidak untuk keadaan seperti know atau live.",
          "skill": "used-to-would"
        },
        {
          "prompt": "I used to know him. (bukan: I would know him) karena...",
          "options": [
            "know adalah keadaan",
            "know adalah tindakan",
            "know adalah objek"
          ],
          "answer": 0,
          "explanation": "Know = state verb, pakai used to.",
          "skill": "used-to-would"
        },
        {
          "prompt": "Pilih kalimat yang benar tentang kebiasaan lampau.",
          "options": [
            "I used to play tennis every Sunday.",
            "I would to play tennis every Sunday.",
            "I use to play tennis every Sunday."
          ],
          "answer": 0,
          "explanation": "Used to + play.",
          "skill": "used-to-would"
        }
      ]
    }
  },
  "03-upper-intermediate/01-past-perfect-continuous": {
    "title": "Past Perfect Continuous",
    "levels": {
      "simple": [
        {
          "prompt": "Her eyes were red because she ___.",
          "options": [
            "had been crying",
            "has cry",
            "was cried"
          ],
          "answer": 0,
          "explanation": "Had been crying = PPC untuk penyebab.",
          "skill": "past-perfect-continuous"
        },
        {
          "prompt": "The crew ___ for weeks before the launch was postponed.",
          "options": [
            "had been preparing",
            "have prepared",
            "were prepare"
          ],
          "answer": 0,
          "explanation": "Had been preparing = durasi sebelum kejadian lampau.",
          "skill": "past-perfect-continuous"
        },
        {
          "prompt": "The road was muddy because it ___ all night.",
          "options": [
            "had been raining",
            "had rained three inches",
            "has rain"
          ],
          "answer": 0,
          "explanation": "Had been raining = proses penyebab.",
          "skill": "past-perfect-continuous"
        }
      ],
      "intermediate": [
        {
          "prompt": "PPC untuk durasi sebagai...",
          "options": [
            "penyebab keadaan lampau",
            "keadaan masa depan",
            "keadaan sekarang"
          ],
          "answer": 0,
          "explanation": "PPC menjelaskan proses yang menyebabkan keadaan lampau.",
          "skill": "past-perfect-continuous"
        },
        {
          "prompt": "They had been testing the pump for hours before it ___.",
          "options": [
            "overheated",
            "overheats",
            "overheat"
          ],
          "answer": 0,
          "explanation": "Before it overheated = PPC lalu Past Simple.",
          "skill": "past-perfect-continuous"
        },
        {
          "prompt": "Pilih kalimat PPC yang benar.",
          "options": [
            "She had been working there for years.",
            "She has been working there for years.",
            "She was being working there."
          ],
          "answer": 0,
          "explanation": "Had been working = PPC.",
          "skill": "past-perfect-continuous"
        }
      ],
      "complex": [
        {
          "prompt": "Jika ada hitungan hasil yang selesai, pilih...",
          "options": [
            "Past Perfect Simple",
            "Past Perfect Continuous",
            "Past Simple"
          ],
          "answer": 0,
          "explanation": "Hasil/jumlah selesai → PPS, bukan PPC.",
          "skill": "past-perfect-continuous"
        },
        {
          "prompt": "They had tested 12 units before the inspection began. Fokus pada...",
          "options": [
            "jumlah selesai",
            "proses berlangsung",
            "masa depan"
          ],
          "answer": 0,
          "explanation": "12 units = jumlah selesai → Past Perfect Simple.",
          "skill": "past-perfect-continuous"
        },
        {
          "prompt": "PPC menekankan...",
          "options": [
            "durasi proses",
            "hasil akhir",
            "waktu mulai"
          ],
          "answer": 0,
          "explanation": "PPC menekankan seberapa lama proses berlangsung.",
          "skill": "past-perfect-continuous"
        }
      ]
    }
  },
  "03-upper-intermediate/02-future-perfect-continuous": {
    "title": "Future Perfect Continuous",
    "levels": {
      "simple": [
        {
          "prompt": "By next spring, the city ___ the new bridge.",
          "options": [
            "will have completed",
            "will completed",
            "has complete"
          ],
          "answer": 0,
          "explanation": "By + future deadline → will have completed.",
          "skill": "future-perfect-continuous"
        },
        {
          "prompt": "At 5 p.m., I ___ for eight hours.",
          "options": [
            "will have been travelling",
            "will travel since",
            "have been travelling tomorrow"
          ],
          "answer": 0,
          "explanation": "By 5 p.m. → will have been travelling.",
          "skill": "future-perfect-continuous"
        },
        {
          "prompt": "By noon, we ___ the audit.",
          "options": [
            "will have completed",
            "will have been completing",
            "complete yesterday"
          ],
          "answer": 0,
          "explanation": "By noon → will have completed.",
          "skill": "future-perfect-continuous"
        }
      ],
      "intermediate": [
        {
          "prompt": "Future Perfect menekankan...",
          "options": [
            "hasil yang selesai sebelum tenggat",
            "keadaan masa lalu",
            "kewajiban sekarang"
          ],
          "answer": 0,
          "explanation": "FP = hasil sebelum tenggat waktu.",
          "skill": "future-perfect-continuous"
        },
        {
          "prompt": "Future Perfect Continuous menekankan...",
          "options": [
            "lama aktivitas sampai tenggat",
            "hasil akhir",
            "masa lalu"
          ],
          "answer": 0,
          "explanation": "FPC = durasi hingga tenggat.",
          "skill": "future-perfect-continuous"
        },
        {
          "prompt": "By Thursday, the team will have been working on it for six weeks. Ini adalah...",
          "options": [
            "Future Perfect Continuous",
            "Future Perfect Simple",
            "Future Simple"
          ],
          "answer": 0,
          "explanation": "Will have been working = FPC.",
          "skill": "future-perfect-continuous"
        }
      ],
      "complex": [
        {
          "prompt": "Fokus pada hasil selesai sebelum batas waktu → ...",
          "options": [
            "Future Perfect Simple",
            "Future Perfect Continuous",
            "Future Simple"
          ],
          "answer": 0,
          "explanation": "Hasil selesai → FPS, bukan FPC.",
          "skill": "future-perfect-continuous"
        },
        {
          "prompt": "Pilih kalimat FPC yang benar.",
          "options": [
            "By June, I will have been living here for a year.",
            "By June, I will live here for a year.",
            "By June, I am living here for a year."
          ],
          "answer": 0,
          "explanation": "Will have been living = FPC.",
          "skill": "future-perfect-continuous"
        },
        {
          "prompt": "FP vs FPC: FP untuk..., FPC untuk...",
          "options": [
            "hasil selesai / durasi proses",
            "durasi proses / hasil selesai",
            "masa lalu / masa depan"
          ],
          "answer": 0,
          "explanation": "FP = hasil; FPC = durasi.",
          "skill": "future-perfect-continuous"
        }
      ]
    }
  },
  "03-upper-intermediate/03-conditionals-3-mixed": {
    "title": "Conditional Type 3 & Mixed",
    "levels": {
      "simple": [
        {
          "prompt": "If I had known, I ___ helped you.",
          "options": [
            "would have",
            "will have",
            "would have help"
          ],
          "answer": 0,
          "explanation": "Type 3: would have + V3.",
          "skill": "conditional-3-mixed"
        },
        {
          "prompt": "If she had studied, she ___ the exam.",
          "options": [
            "would have passed",
            "will pass",
            "would pass"
          ],
          "answer": 0,
          "explanation": "Would have passed = Type 3.",
          "skill": "conditional-3-mixed"
        },
        {
          "prompt": "If they had left earlier, they ___ the train.",
          "options": [
            "would have caught",
            "will catch",
            "would catch"
          ],
          "answer": 0,
          "explanation": "Would have caught = Type 3.",
          "skill": "conditional-3-mixed"
        }
      ],
      "intermediate": [
        {
          "prompt": "Type 3 digunakan untuk...",
          "options": [
            "kondisi lampau yang tidak terwujud",
            "kondisi masa depan",
            "kondisi sekarang"
          ],
          "answer": 0,
          "explanation": "Type 3 = hipotetis masa lalu.",
          "skill": "conditional-3-mixed"
        },
        {
          "prompt": "Mixed conditional menggabungkan...",
          "options": [
            "if clause lampau dan main clause sekarang",
            "dua klausa masa depan",
            "dua klausa lampau"
          ],
          "answer": 0,
          "explanation": "Mixed = lampau + sekarang.",
          "skill": "conditional-3-mixed"
        },
        {
          "prompt": "If I had saved money, I ___ rich now.",
          "options": [
            "would be",
            "will be",
            "was"
          ],
          "answer": 0,
          "explanation": "Mixed: had saved → would be (now).",
          "skill": "conditional-3-mixed"
        }
      ],
      "complex": [
        {
          "prompt": "Type 3 Past Perfect pada if clause menunjukkan...",
          "options": [
            "kondisi lampau yang tidak terjadi",
            "kondisi yang terjadi",
            "kondisi masa depan"
          ],
          "answer": 0,
          "explanation": "Had + V3 = kondisi lampau tidak terwujud.",
          "skill": "conditional-3-mixed"
        },
        {
          "prompt": "Pilih mixed conditional yang benar.",
          "options": [
            "If I had studied harder, I would be a doctor now.",
            "If I study harder, I would be a doctor now.",
            "If I had studied harder, I will be a doctor now."
          ],
          "answer": 0,
          "explanation": "Had studied → would be (now).",
          "skill": "conditional-3-mixed"
        },
        {
          "prompt": "Would have + V3 pada main clause menunjukkan...",
          "options": [
            "hasil hipotetis lampau",
            "hasil masa depan",
            "kewajiban sekarang"
          ],
          "answer": 0,
          "explanation": "Would have + V3 = hasil hipotetis lampau.",
          "skill": "conditional-3-mixed"
        }
      ]
    }
  },
  "03-upper-intermediate/04-passive-advanced": {
    "title": "Passive Voice (Advanced)",
    "levels": {
      "simple": [
        {
          "prompt": "The final decision ___ by the board tomorrow.",
          "options": [
            "will be announced",
            "will announce",
            "is announce"
          ],
          "answer": 0,
          "explanation": "Will be announced = Future Simple passive.",
          "skill": "passive-advanced"
        },
        {
          "prompt": "Choose the reporting passive.",
          "options": [
            "The result is believed to be reliable.",
            "The result believes reliable.",
            "The result is believe reliable."
          ],
          "answer": 0,
          "explanation": "Is believed to be = reporting passive.",
          "skill": "passive-advanced"
        },
        {
          "prompt": "Costs ___ to fall.",
          "options": [
            "are expected",
            "expect",
            "are expecting"
          ],
          "answer": 0,
          "explanation": "Are expected = reporting passive.",
          "skill": "passive-advanced"
        }
      ],
      "intermediate": [
        {
          "prompt": "Reporting passive digunakan untuk...",
          "options": [
            "menyampaikan konsensus atau klaim",
            "membunyikan pelaku",
            "membuat kalimat pendek"
          ],
          "answer": 0,
          "explanation": "Reporting passive untuk klaim yang diatribusikan.",
          "skill": "passive-advanced"
        },
        {
          "prompt": "The samples are being analyzed at three laboratories. Tense...",
          "options": [
            "Present Continuous passive",
            "Past Simple passive",
            "Future Simple passive"
          ],
          "answer": 0,
          "explanation": "Are being analyzed = Present Continuous passive.",
          "skill": "passive-advanced"
        },
        {
          "prompt": "The policy is expected to reduce processing time. Ini adalah...",
          "options": [
            "reporting passive",
            "active voice",
            "past passive"
          ],
          "answer": 0,
          "explanation": "Is expected = reporting passive.",
          "skill": "passive-advanced"
        }
      ],
      "complex": [
        {
          "prompt": "Dalam laporan ilmiah, passive dapat...",
          "options": [
            "menonjolkan prosedur dan temuan",
            "menyembunyikan semua informasi",
            "membuat kalimat lebih panjang"
          ],
          "answer": 0,
          "explanation": "Passive untuk fokus pada prosedur/temuan.",
          "skill": "passive-advanced"
        },
        {
          "prompt": "Gunakan reporting passive untuk...",
          "options": [
            "konsensus atau klaim yang diatribusikan",
            "cerita fiksi",
            "surat pribadi"
          ],
          "answer": 0,
          "explanation": "Reporting passive untuk klaim/konsensus.",
          "skill": "passive-advanced"
        },
        {
          "prompt": "Pilih kalimat passive lanjutan yang benar.",
          "options": [
            "The result is believed to be reliable.",
            "The result believes reliable.",
            "The result is believe reliable."
          ],
          "answer": 0,
          "explanation": "Is believed to be = passive benar.",
          "skill": "passive-advanced"
        }
      ]
    }
  },
  "03-upper-intermediate/05-reported-speech-advanced": {
    "title": "Reported Speech (Advanced)",
    "levels": {
      "simple": [
        {
          "prompt": "The manager reminded us ___ the form.",
          "options": [
            "to sign",
            "signing",
            "sign"
          ],
          "answer": 0,
          "explanation": "Remind + to-infinitive.",
          "skill": "reported-speech-advanced"
        },
        {
          "prompt": "“I didn't change the figures.” → He denied ___ the figures.",
          "options": [
            "to change",
            "changing",
            "change"
          ],
          "answer": 1,
          "explanation": "Deny + gerund (-ing).",
          "skill": "reported-speech-advanced"
        },
        {
          "prompt": "'Please don't share the draft.' → She asked us...",
          "options": [
            "not to share the draft",
            "to not share the draft",
            "share the draft"
          ],
          "answer": 0,
          "explanation": "Ask + not to-infinitive for negative request.",
          "skill": "reported-speech-advanced"
        }
      ],
      "intermediate": [
        {
          "prompt": "Reporting verb untuk saran/perintah diikuti...",
          "options": [
            "object + to-infinitive",
            "that-clause",
            "gerund saja"
          ],
          "answer": 0,
          "explanation": "Ask/tell/remind + object + to-inf.",
          "skill": "reported-speech-advanced"
        },
        {
          "prompt": "Reporting verb untuk klaim/pengakuan diikuti...",
          "options": [
            "that-clause atau gerund",
            "to-infinitive saja",
            "tanpa objek"
          ],
          "answer": 0,
          "explanation": "Deny/admit/claim + that-clause/gerund.",
          "skill": "reported-speech-advanced"
        },
        {
          "prompt": "The chair asked participants ___ questions in writing.",
          "options": [
            "to submit",
            "submitting",
            "submit"
          ],
          "answer": 0,
          "explanation": "Ask + to-infinitive.",
          "skill": "reported-speech-advanced"
        }
      ],
      "complex": [
        {
          "prompt": "Pilih reported speech yang benar untuk instruksi negatif.",
          "options": [
            "She asked us not to share the draft.",
            "She asked us to not share the draft.",
            "She asked us share not the draft."
          ],
          "answer": 0,
          "explanation": "Ask + not to-infinitive.",
          "skill": "reported-speech-advanced"
        },
        {
          "prompt": "Deny digunakan untuk...",
          "options": [
            "pengakuan",
            "penyangkalan",
            "saran"
          ],
          "answer": 0,
          "explanation": "Deny = menyangkal.",
          "skill": "reported-speech-advanced"
        },
        {
          "prompt": "The supplier denied ___ the delivery date.",
          "options": [
            "changing",
            "to change",
            "change"
          ],
          "answer": 0,
          "explanation": "Denied + changing (gerund).",
          "skill": "reported-speech-advanced"
        }
      ]
    }
  },
  "03-upper-intermediate/06-inversion-basic": {
    "title": "Inversion (Basic)",
    "levels": {
      "simple": [
        {
          "prompt": "___ have I seen such a beautiful sunset.",
          "options": [
            "Never",
            "Ever",
            "Always"
          ],
          "answer": 0,
          "explanation": "Never + inversion (auxiliary + subject).",
          "skill": "inversion-basic"
        },
        {
          "prompt": "___ did she realize her mistake.",
          "options": [
            "Only then",
            "Then only",
            "Only"
          ],
          "answer": 0,
          "explanation": "Only then + inversion.",
          "skill": "inversion-basic"
        },
        {
          "prompt": "___ he arrive, the party began.",
          "options": [
            "No sooner had",
            "Hardly",
            "Scarcely"
          ],
          "answer": 0,
          "explanation": "No sooner had + inversion.",
          "skill": "inversion-basic"
        }
      ],
      "intermediate": [
        {
          "prompt": "Inversion digunakan setelah...",
          "options": [
            "kata negatif di awal kalimat",
            "kata sifat di akhir",
            "kata benda di tengah"
          ],
          "answer": 0,
          "explanation": "Negatif/ekspresif di awal → inversion.",
          "skill": "inversion-basic"
        },
        {
          "prompt": "Pilih kalimat dengan inversion yang benar.",
          "options": [
            "Never have I been so embarrassed.",
            "I never have been so embarrassed.",
            "Never I have been so embarrassed."
          ],
          "answer": 0,
          "explanation": "Never + auxiliary + subject + verb.",
          "skill": "inversion-basic"
        },
        {
          "prompt": "Seldom have I seen such courage. Artinya...",
          "options": [
            "Saya jarang melihat keberanian seperti itu",
            "Saya sering melihat keberanian",
            "Saya selalu melihat keberanian"
          ],
          "answer": 0,
          "explanation": "Seldom = jarang.",
          "skill": "inversion-basic"
        }
      ],
      "complex": [
        {
          "prompt": "Inversion membuat kalimat lebih...",
          "options": [
            "formal dan dramatis",
            "informal dan pendek",
            "sederhana dan biasa"
          ],
          "answer": 0,
          "explanation": "Inversion untuk gaya formal/dramatis.",
          "skill": "inversion-basic"
        },
        {
          "prompt": "Hardly had he entered when the phone rang. Artinya...",
          "options": [
            "Dia baru masuk lalu telepon berdering",
            "Dia sudah lama masuk",
            "Dia belum masuk"
          ],
          "answer": 0,
          "explanation": "Hardly had... when = segera setelah.",
          "skill": "inversion-basic"
        },
        {
          "prompt": "Pilih kalimat yang menggunakan inversion.",
          "options": [
            "Not only is she smart but also kind.",
            "She is not only smart but also kind.",
            "Not only she is smart but also kind."
          ],
          "answer": 0,
          "explanation": "Not only + auxiliary + subject.",
          "skill": "inversion-basic"
        }
      ]
    }
  },
  "03-upper-intermediate/07-cleft-sentences": {
    "title": "Cleft Sentences",
    "levels": {
      "simple": [
        {
          "prompt": "___ was John who broke the window.",
          "options": [
            "It",
            "That",
            "This"
          ],
          "answer": 0,
          "explanation": "It-cleft: It was John who...",
          "skill": "cleft-sentence"
        },
        {
          "prompt": "It was the book ___ I lost.",
          "options": [
            "that",
            "who",
            "whom"
          ],
          "answer": 0,
          "explanation": "It was the book that I lost.",
          "skill": "cleft-sentence"
        },
        {
          "prompt": "It was in Paris ___ we met.",
          "options": [
            "that",
            "who",
            "which"
          ],
          "answer": 0,
          "explanation": "It was in Paris that we met.",
          "skill": "cleft-sentence"
        }
      ],
      "intermediate": [
        {
          "prompt": "Cleft sentence digunakan untuk...",
          "options": [
            "menekankan bagian tertentu",
            "membuat kalimat pendek",
            "menghindari subjek"
          ],
          "answer": 0,
          "explanation": "Cleft untuk penekanan.",
          "skill": "cleft-sentence"
        },
        {
          "prompt": "It-cleft pola: It + be + ___ + that-clause.",
          "options": [
            "elemen yang ditekankan",
            "subjek saja",
            "verb saja"
          ],
          "answer": 0,
          "explanation": "It + was/were + elemen + that.",
          "skill": "cleft-sentence"
        },
        {
          "prompt": "Pilih kalimat cleft yang benar.",
          "options": [
            "It was Mary who called me.",
            "It was Mary called me.",
            "It was Mary that called me."
          ],
          "answer": 0,
          "explanation": "It was Mary who/that called me.",
          "skill": "cleft-sentence"
        }
      ],
      "complex": [
        {
          "prompt": "Wh-cleft pola: ___ + be + to-infinitive.",
          "options": [
            "What she wants",
            "She wants",
            "What does she want"
          ],
          "answer": 0,
          "explanation": "What she wants is to leave.",
          "skill": "cleft-sentence"
        },
        {
          "prompt": "It-cleft vs wh-cleft: it-cleft menekankan...",
          "options": [
            "suatu elemen spesifik",
            "seluruh kalimat",
            "hanya verb"
          ],
          "answer": 0,
          "explanation": "It-cleft untuk elemen spesifik.",
          "skill": "cleft-sentence"
        },
        {
          "prompt": "Pilih kalimat cleft yang benar:",
          "options": [
            "What I need is a vacation.",
            "What I need a vacation.",
            "I need is what a vacation."
          ],
          "answer": 0,
          "explanation": "What-clause as subject.",
          "skill": "cleft-sentence"
        }
      ]
    }
  },
  "03-upper-intermediate/08-participle-clauses": {
    "title": "Participle Clauses",
    "levels": {
      "simple": [
        {
          "prompt": "___ tired, he went to bed early.",
          "options": [
            "Feeling",
            "Feel",
            "Felt"
          ],
          "answer": 0,
          "explanation": "Feeling = present participle clause.",
          "skill": "participle-clause"
        },
        {
          "prompt": "___ the window, she saw the cat.",
          "options": [
            "Looking out",
            "Look out",
            "Looked out"
          ],
          "answer": 0,
          "explanation": "Looking out = present participle.",
          "skill": "participle-clause"
        },
        {
          "prompt": "___ by the noise, he couldn't sleep.",
          "options": [
            "Disturbed",
            "Disturbing",
            "Disturb"
          ],
          "answer": 0,
          "explanation": "Disturbed = past participle clause.",
          "skill": "participle-clause"
        }
      ],
      "intermediate": [
        {
          "prompt": "Present participle clause menunjukkan...",
          "options": [
            "tindakan yang dilakukan subjek",
            "tindakan yang dilakukan pada subjek",
            "tindakan di masa lalu"
          ],
          "answer": 0,
          "explanation": "Present participle = aktif (subjek melakukan).",
          "skill": "participle-clause"
        },
        {
          "prompt": "Past participle clause menunjukkan...",
          "options": [
            "tindakan yang dilakukan pada subjek",
            "tindakan yang dilakukan subjek",
            "tindakan di masa depan"
          ],
          "answer": 0,
          "explanation": "Past participle = pasif (subjek menerima).",
          "skill": "participle-clause"
        },
        {
          "prompt": "Pilih kalimat dengan participle clause yang benar.",
          "options": [
            "Walking home, she found a wallet.",
            "Home walking, she found a wallet.",
            "She walking home found a wallet."
          ],
          "answer": 0,
          "explanation": "Walking home = participle clause di awal.",
          "skill": "participle-clause"
        }
      ],
      "complex": [
        {
          "prompt": "Participle clause dapat menggantikan...",
          "options": [
            "klausa pendek dengan subjek sama",
            "seluruh kalimat",
            "hanya kata tanya"
          ],
          "answer": 0,
          "explanation": "Participle clause = ringkasan klausa.",
          "skill": "participle-clause"
        },
        {
          "prompt": "___ all his money, he couldn't buy the ticket.",
          "options": [
            "Having lost",
            "Lost",
            "Losing"
          ],
          "answer": 0,
          "explanation": "Having lost = perfect participle (selesai dulu).",
          "skill": "participle-clause"
        },
        {
          "prompt": "Pilih kalimat yang benar.",
          "options": [
            "Being a student, I get a discount.",
            "Be a student, I get a discount.",
            "Been a student, I get a discount."
          ],
          "answer": 0,
          "explanation": "Being = present participle.",
          "skill": "participle-clause"
        }
      ]
    }
  },
  "03-upper-intermediate/09-modal-perfect": {
    "title": "Modal Perfect",
    "levels": {
      "simple": [
        {
          "prompt": "You ___ have told me earlier.",
          "options": [
            "should",
            "must",
            "can"
          ],
          "answer": 0,
          "explanation": "Should have + V3 = saran/kesalahan lampau.",
          "skill": "modal-perfect"
        },
        {
          "prompt": "She ___ have forgotten about the meeting.",
          "options": [
            "must",
            "can",
            "should"
          ],
          "answer": 0,
          "explanation": "Must have + V3 = kesimpulan tentang lampau.",
          "skill": "modal-perfect"
        },
        {
          "prompt": "He ___ have been at home.",
          "options": [
            "can't",
            "must",
            "may"
          ],
          "answer": 0,
          "explanation": "Can't have = tidak mungkin di lampau.",
          "skill": "modal-perfect"
        }
      ],
      "intermediate": [
        {
          "prompt": "Should have + V3 untuk...",
          "options": [
            "saya menyesal atau saran lampau",
            "kewajiban sekarang",
            "kemampuan masa depan"
          ],
          "answer": 0,
          "explanation": "Should have = regret/salah lampau.",
          "skill": "modal-perfect"
        },
        {
          "prompt": "Must have + V3 untuk...",
          "options": [
            "kesimpulan logis tentang lampau",
            "kewajiban sekarang",
            "kemampuan masa depan"
          ],
          "answer": 0,
          "explanation": "Must have = kesimpulan lampau.",
          "skill": "modal-perfect"
        },
        {
          "prompt": "Can't have + V3 untuk...",
          "options": [
            "ketidakmungkinan lampau",
            "kemampuan sekarang",
            "kewajiban masa depan"
          ],
          "answer": 0,
          "explanation": "Can't have = tidak mungkin lampau.",
          "skill": "modal-perfect"
        }
      ],
      "complex": [
        {
          "prompt": "Modal perfect digunakan untuk...",
          "options": [
            "membicara tentang lampau dengan nuansa",
            "membicara tentang masa depan",
            "membicara tentang sekarang"
          ],
          "answer": 0,
          "explanation": "Modal perfect = lampau dengan nuansi.",
          "skill": "modal-perfect"
        },
        {
          "prompt": "I ___ have known better.",
          "options": [
            "should",
            "must",
            "can"
          ],
          "answer": 0,
          "explanation": "Should have known = menyesal.",
          "skill": "modal-perfect"
        },
        {
          "prompt": "Pilih kalimat dengan modal perfect yang benar.",
          "options": [
            "She must have been tired.",
            "She must been tired.",
            "She must have be tired."
          ],
          "answer": 0,
          "explanation": "Must have + been (V3).",
          "skill": "modal-perfect"
        }
      ]
    }
  },
  "03-upper-intermediate/10-relative-clauses-advanced": {
    "title": "Relative Clauses (Advanced)",
    "levels": {
      "simple": [
        {
          "prompt": "The man ___ car was stolen is angry.",
          "options": [
            "whose",
            "who",
            "which"
          ],
          "answer": 0,
          "explanation": "Whose = possessive relative.",
          "skill": "relative-clause-advanced"
        },
        {
          "prompt": "The book ___ I recommended is popular.",
          "options": [
            "which",
            "who",
            "whose"
          ],
          "answer": 0,
          "explanation": "Which = benda.",
          "skill": "relative-clause-advanced"
        },
        {
          "prompt": "This is the place ___ we met.",
          "options": [
            "where",
            "when",
            "who"
          ],
          "answer": 0,
          "explanation": "Where = tempat.",
          "skill": "relative-clause-advanced"
        }
      ],
      "intermediate": [
        {
          "prompt": "Non-defining relative clause dipisah oleh...",
          "options": [
            "koma",
            "titik",
            "koma dan titik"
          ],
          "answer": 0,
          "explanation": "Non-defining = dipisah koma.",
          "skill": "relative-clause-advanced"
        },
        {
          "prompt": "Whom digunakan untuk...",
          "options": [
            "objek orang",
            "subjek orang",
            "benda"
          ],
          "answer": 0,
          "explanation": "Whom = objek orang.",
          "skill": "relative-clause-advanced"
        },
        {
          "prompt": "The teacher, ___ is very kind, helps us.",
          "options": [
            "who",
            "which",
            "whose"
          ],
          "answer": 0,
          "explanation": "Non-defining: who untuk orang.",
          "skill": "relative-clause-advanced"
        }
      ],
      "complex": [
        {
          "prompt": "Defining relative clause tidak...",
          "options": [
            "dipisah koma",
            "memakai who",
            "memakai which"
          ],
          "answer": 0,
          "explanation": "Defining tidak pakai koma.",
          "skill": "relative-clause-advanced"
        },
        {
          "prompt": "Pilih kalimat non-defining yang benar.",
          "options": [
            "My brother, who lives in Jakarta, is a doctor.",
            "My brother who lives in Jakarta is a doctor.",
            "My brother, who lives in Jakarta is a doctor."
          ],
          "answer": 0,
          "explanation": "Non-defining dengan koma di kedua sisi.",
          "skill": "relative-clause-advanced"
        },
        {
          "prompt": "Reduced relative clause 'students selected for the program' berasal dari...",
          "options": [
            "students who were selected",
            "students who selected",
            "students whom selecting"
          ],
          "answer": 0,
          "explanation": "Who were selected → selected (reduced passive).",
          "skill": "relative-clause-advanced"
        }
      ]
    }
  },
  "03-upper-intermediate/11-linking-words": {
    "title": "Linking Words",
    "levels": {
      "simple": [
        {
          "prompt": "The method is inexpensive. ___, it takes more time.",
          "options": [
            "However",
            "Therefore",
            "Moreover"
          ],
          "answer": 0,
          "explanation": "However = kontras.",
          "skill": "linking-words"
        },
        {
          "prompt": "The roads were flooded; ___, school was closed.",
          "options": [
            "although",
            "as a result",
            "whereas"
          ],
          "answer": 1,
          "explanation": "As a result = hasil/akibat.",
          "skill": "linking-words"
        },
        {
          "prompt": "___ the evidence was limited, the team reported its findings.",
          "options": [
            "Although",
            "However",
            "Therefore"
          ],
          "answer": 0,
          "explanation": "Although = meskipun/kontrasti.",
          "skill": "linking-words"
        }
      ],
      "intermediate": [
        {
          "prompt": "However dan although menunjukkan...",
          "options": [
            "kontras",
            "hasil",
            "penambahan"
          ],
          "answer": 0,
          "explanation": "However/although = kontras.",
          "skill": "linking-words"
        },
        {
          "prompt": "Therefore dan as a result menunjukkan...",
          "options": [
            "hasil",
            "kontras",
            "penambahan"
          ],
          "answer": 0,
          "explanation": "Therefore/as a result = hasil.",
          "skill": "linking-words"
        },
        {
          "prompt": "Moreover dan furthermore menunjukkan...",
          "options": [
            "penambahan",
            "kontras",
            "hasil"
          ],
          "answer": 0,
          "explanation": "Moreover/furthermore = tambahan.",
          "skill": "linking-words"
        }
      ],
      "complex": [
        {
          "prompt": "Linking words membantu...",
          "options": [
            "menghubungkan gagasan dengan logika",
            "membuat kalimat lebih panjang",
            "menghindari subjek"
          ],
          "answer": 0,
          "explanation": "Linking words untuk alur logis gagasan.",
          "skill": "linking-words"
        },
        {
          "prompt": "Although diikuti oleh...",
          "options": [
            "klausa",
            "frasa saja",
            "kata tunggal"
          ],
          "answer": 0,
          "explanation": "Although + clause (subjek + verb).",
          "skill": "linking-words"
        },
        {
          "prompt": "Pola yang benar adalah...",
          "options": [
            "Although it was cold, we went out.",
            "Although it was cold. However we went out.",
            "It was cold although. We went out."
          ],
          "answer": 0,
          "explanation": "Although + clause, main clause.",
          "skill": "linking-words"
        }
      ]
    }
  },
  "03-upper-intermediate/12-nominalization-intro": {
    "title": "Nominalization (Intro)",
    "levels": {
      "simple": [
        {
          "prompt": "Nominal dari ‘decide’ adalah...",
          "options": [
            "decision",
            "decidement",
            "decidingly"
          ],
          "answer": 0,
          "explanation": "Decide → decision (-tion).",
          "skill": "nominalization-intro"
        },
        {
          "prompt": "Nominal dari ‘improve’ adalah...",
          "options": [
            "improval",
            "improvement",
            "improveness"
          ],
          "answer": 1,
          "explanation": "Improve → improvement (-ment).",
          "skill": "nominalization-intro"
        },
        {
          "prompt": "‘Accurate’ menjadi noun...",
          "options": [
            "accuracy",
            "accuration",
            "accurateity"
          ],
          "answer": 0,
          "explanation": "Accurate → accuracy (-acy).",
          "skill": "nominalization-intro"
        }
      ],
      "intermediate": [
        {
          "prompt": "Nominalization adalah mengubah...",
          "options": [
            "verb/adjective menjadi noun",
            "noun menjadi verb",
            "verb menjadi adjective"
          ],
          "answer": 0,
          "explanation": "Nominalization = verb/adj → noun.",
          "skill": "nominalization-intro"
        },
        {
          "prompt": "Nominalization berguna untuk...",
          "options": [
            "merangkum proses sebagai topik",
            "membuat kalimat lebih pendek",
            "menghilangkan verb"
          ],
          "answer": 0,
          "explanation": "Nominalization untuk merangkum proses.",
          "skill": "nominalization-intro"
        },
        {
          "prompt": "Pilih nominalization yang benar.",
          "options": [
            "The expansion created new jobs.",
            "The company expanded yesterday.",
            "The company will expand."
          ],
          "answer": 0,
          "explanation": "The expansion = nominalisasi dari expand.",
          "skill": "nominalization-intro"
        }
      ],
      "complex": [
        {
          "prompt": "Nominalization digunakan untuk...",
          "options": [
            "menjadikan proses/ide sebagai noun",
            "membuat semua kalimat pasif",
            "menghapus semua verb"
          ],
          "answer": 1,
          "explanation": "Nominalization = proses/ide sebagai noun.",
          "skill": "nominalization-intro"
        },
        {
          "prompt": "Kalimat yang paling langsung adalah...",
          "options": [
            "We analyzed the results.",
            "An analysis of the results was undertaken by us.",
            "The undertaking of analysis occurred."
          ],
          "answer": 0,
          "explanation": "Direct = active voice dengan verb.",
          "skill": "nominalization-intro"
        },
        {
          "prompt": "Jangan gunakan nominalization berlebihan karena...",
          "options": [
            "kalimat menjadi abstrak dan kurang jelas",
            "kata menjadi lebih sedikit",
            "grammar menjadi lebih sulit"
          ],
          "answer": 0,
          "explanation": "Terlalu banyak nominal → abstrak/sulit dipahami.",
          "skill": "nominalization-intro"
        }
      ]
    }
  },
  "04-advanced-formal/01-complex-subordination": {
    "title": "Complex Subordination",
    "levels": {
      "simple": [
        {
          "prompt": "___ the system was secure, the team delayed the launch.",
          "options": [
            "Although",
            "Because",
            "Unless"
          ],
          "answer": 0,
          "explanation": "Although = kontrasti meskipun aman.",
          "skill": "complex-subordination"
        },
        {
          "prompt": "Pilih struktur yang benar.",
          "options": [
            "Although the server was down, we completed the work.",
            "Despite the server was down, we completed the work.",
            "Although the server down, completed work."
          ],
          "answer": 1,
          "explanation": "Although + clause = struktur benar.",
          "skill": "complex-subordination"
        },
        {
          "prompt": "Connector untuk syarat positif adalah...",
          "options": [
            "provided that",
            "nevertheless",
            "as a result"
          ],
          "answer": 0,
          "explanation": "Provided that = syarat positif.",
          "skill": "complex-subordination"
        }
      ],
      "intermediate": [
        {
          "prompt": "Subordination membantu...",
          "options": [
            "menempatkan batasan dan klaim dalam hierarki",
            "membuat kalimat lebih pendek",
            "menghindari subjek"
          ],
          "answer": 0,
          "explanation": "Subordination = hierarki gagasan.",
          "skill": "complex-subordination"
        },
        {
          "prompt": "Pilih connector yang menunjukkan sebab.",
          "options": [
            "Because",
            "Although",
            "However"
          ],
          "answer": 0,
          "explanation": "Because = sebab.",
          "skill": "complex-subordination"
        },
        {
          "prompt": "Pilih connector yang menunjukkan kontras.",
          "options": [
            "Although",
            "Because",
            "Therefore"
          ],
          "answer": 0,
          "explanation": "Although = kontras.",
          "skill": "complex-subordination"
        }
      ],
      "complex": [
        {
          "prompt": "Pastikan pilihan connector mencerminkan...",
          "options": [
            "hubungan logis",
            "panjang kalimat",
            "kesulitan kata"
          ],
          "answer": 0,
          "explanation": "Connector harus sesuai logika.",
          "skill": "complex-subordination"
        },
        {
          "prompt": "Although the trial met its target, the small sample limits...",
          "options": [
            "how widely the result can be applied",
            "the target was met",
            "the trial was successful"
          ],
          "answer": 0,
          "explanation": "Although = kontrasi antara target dan batasan.",
          "skill": "complex-subordination"
        },
        {
          "prompt": "Because the server was unavailable, the team postponed...",
          "options": [
            "the release until the security check was complete",
            "the server was fixed",
            "the team worked overtime"
          ],
          "answer": 0,
          "explanation": "Because = sebab penangguhan.",
          "skill": "complex-subordination"
        }
      ]
    }
  },
  "04-advanced-formal/02-nominalization": {
    "title": "Nominalization (Advanced)",
    "levels": {
      "simple": [
        {
          "prompt": "Nominalisasi dari ‘decide’ adalah...",
          "options": [
            "decision",
            "decidingly",
            "decidement"
          ],
          "answer": 0,
          "explanation": "Decide → decision.",
          "skill": "nominalization"
        },
        {
          "prompt": "Pilih bentuk yang membuat proses menjadi topik kalimat.",
          "options": [
            "The expansion created new jobs.",
            "The company expanded yesterday.",
            "The company will expand."
          ],
          "answer": 0,
          "explanation": "The expansion = proses sebagai subjek/topik.",
          "skill": "nominalization"
        },
        {
          "prompt": "Mana yang paling jelas menyebut pelaku evaluasi?",
          "options": [
            "An evaluation was conducted.",
            "The review team evaluated the risks.",
            "Evaluation of risks occurred."
          ],
          "answer": 1,
          "explanation": "The review team = pelaku jelas.",
          "skill": "nominalization"
        }
      ],
      "intermediate": [
        {
          "prompt": "Nominalization dapat membawa topik dari...",
          "options": [
            "satu kalimat ke kalimat berikutnya",
            "satu paragraf ke paragraf lain",
            "satu halaman ke halaman lain"
          ],
          "answer": 0,
          "explanation": "Nominalization untuk kohesi antar kalimat.",
          "skill": "nominalization"
        },
        {
          "prompt": "Gunakan agent atau of-phrase jika...",
          "options": [
            "diperlukan untuk menjaga kejelasan tanggung jawab",
            "kata lebih banyak",
            "grammar lebih sulit"
          ],
          "answer": 0,
          "explanation": "Agent/of-phrase untuk pelaku yang jelas.",
          "skill": "nominalization"
        },
        {
          "prompt": "The review by the safety board identified two risks. Pelaku...",
          "options": [
            "the safety board",
            "the review",
            "two risks"
          ],
          "answer": 0,
          "explanation": "The review board = pelaku evaluasi.",
          "skill": "nominalization"
        }
      ],
      "complex": [
        {
          "prompt": "Nominalization membantu membangun...",
          "options": [
            "alur argumen dengan noun",
            "kalimat yang lebih pendek",
            "kata-kata yang lebih sulit"
          ],
          "answer": 0,
          "explanation": "Nominalization untuk alur argumen.",
          "skill": "nominalization"
        },
        {
          "prompt": "The agency reduced waiting times. This reduction improved access. 'This reduction' merujuk pada...",
          "options": [
            "The agency reduced waiting times",
            "waiting times",
            "access"
          ],
          "answer": 0,
          "explanation": "This reduction = nominalisasi dari 'reduced waiting times'.",
          "skill": "nominalization"
        },
        {
          "prompt": "Nominalization lanjutan dalam teks formal untuk...",
          "options": [
            "membangun alur argumen yang kohesif",
            "membuat kalimat lebih pendek",
            "menghindari subjek"
          ],
          "answer": 0,
          "explanation": "Nominalization untuk kohesi argumen formal.",
          "skill": "nominalization"
        }
      ]
    }
  },
  "04-advanced-formal/03-hedging": {
    "title": "Hedging",
    "levels": {
      "simple": [
        {
          "prompt": "Hedging digunakan untuk...",
          "options": [
            "menghaluskan klaim",
            "membuat klaim mutlak",
            "menghapus klaim"
          ],
          "answer": 0,
          "explanation": "Hedging = membuat klaim lebih halus.",
          "skill": "hedging"
        },
        {
          "prompt": "Pilih kata hedge yang tepat.",
          "options": [
            "suggest",
            "prove",
            "confirm"
          ],
          "answer": 0,
          "explanation": "Suggest = kata hedge.",
          "skill": "hedging"
        },
        {
          "prompt": "The results suggest an association, not necessarily...",
          "options": [
            "causation",
            "correlation",
            "observation"
          ],
          "answer": 0,
          "explanation": "Association ≠ causation.",
          "skill": "hedging"
        }
      ],
      "intermediate": [
        {
          "prompt": "Gunakan hedge jika bukti...",
          "options": [
            "terbatas",
            "lengkap",
            "tidak ada"
          ],
          "answer": 0,
          "explanation": "Hedge untuk bukti terbatas.",
          "skill": "hedging"
        },
        {
          "prompt": "Jangan menyatakan lebih dari yang...",
          "options": [
            "ditunjukkan data",
            "dapat dibaca",
            "dapat ditulis"
          ],
          "answer": 0,
          "explanation": "Hindari overclaiming.",
          "skill": "hedging"
        },
        {
          "prompt": "Pilih kalimat dengan hedge.",
          "options": [
            "The data suggest a possible link.",
            "The data prove a link.",
            "The data show a definite link."
          ],
          "answer": 0,
          "explanation": "Suggest a possible = hedge.",
          "skill": "hedging"
        }
      ],
      "complex": [
        {
          "prompt": "Hedging dalam writing akademis untuk...",
          "options": [
            "menghindari klaim yang terlalu kuat",
            "membuat klaim lebih kuat",
            "menghapus semua klaim"
          ],
          "answer": 0,
          "explanation": "Hedge untuk moderasi klaim.",
          "skill": "hedging"
        },
        {
          "prompt": "Pilih kata modal untuk hedging.",
          "options": [
            "may",
            "must",
            "will"
          ],
          "answer": 0,
          "explanation": "May = kata hedge.",
          "skill": "hedging"
        },
        {
          "prompt": "Kalimat dengan hedging yang tepat.",
          "options": [
            "It may be the case that...",
            "It is definitely the case that...",
            "It is certainly the case that..."
          ],
          "answer": 0,
          "explanation": "May be the case = hedge.",
          "skill": "hedging"
        }
      ]
    }
  },
  "04-advanced-formal/04-formal-register": {
    "title": "Formal Register",
    "levels": {
      "simple": [
        {
          "prompt": "Pilih verba formal untuk ‘look at the proposal’.",
          "options": [
            "review the proposal",
            "check out the proposal",
            "peek the proposal"
          ],
          "answer": 0,
          "explanation": "Review = formal untuk look at.",
          "skill": "formal-register"
        },
        {
          "prompt": "Tanggapan profesional yang tegas adalah...",
          "options": [
            "This conclusion is not supported by the data.",
            "Your conclusion is ridiculous.",
            "Whatever, the data says no."
          ],
          "answer": 0,
          "explanation": "Not supported by the data = profesional.",
          "skill": "formal-register"
        },
        {
          "prompt": "Permintaan dengan tenggat dan alasan paling efektif...",
          "options": [
            "Please confirm by noon so we can release the report.",
            "Please do it sometime soon.",
            "Confirmation would be good maybe."
          ],
          "answer": 0,
          "explanation": "Tenggat dan alasan jelas = efektif.",
          "skill": "formal-register"
        }
      ],
      "intermediate": [
        {
          "prompt": "Nada formal yang efektif tetap...",
          "options": [
            "langsung dan sopan",
            "berlebihan dan panjang",
            "kasar dan singkat"
          ],
          "answer": 0,
          "explanation": "Formal = langsung tapi sopan.",
          "skill": "formal-register"
        },
        {
          "prompt": "Pilih ungkapan formal untuk 'give me the file'.",
          "options": [
            "Please send me the file.",
            "Gimme the file.",
            "Hand over the file now."
          ],
          "answer": 0,
          "explanation": "Please send me = formal.",
          "skill": "formal-register"
        },
        {
          "prompt": "Formal register disesuaikan dengan...",
          "options": [
            "tujuan, hubungan, dan urgensi",
            "panjang kalimat saja",
            "kata sulit saja"
          ],
          "answer": 0,
          "explanation": "Konteks menentukan nada formal.",
          "skill": "formal-register"
        }
      ],
      "complex": [
        {
          "prompt": "Jangan mengganti kejelasan dengan...",
          "options": [
            "ungkapan berbelit-balik",
            "kata singkat",
            "kalimat pendek"
          ],
          "answer": 0,
          "explanation": "Kejelasan prioritas utama.",
          "skill": "formal-register"
        },
        {
          "prompt": "Pilih email formal yang tepat.",
          "options": [
            "Could you confirm receipt by 3 p.m.?",
            "Can you send it soon?",
            "Hey, send me that."
          ],
          "answer": 0,
          "explanation": "Could you confirm = formal dan sopan.",
          "skill": "formal-register"
        },
        {
          "prompt": "The current data do not support that conclusion. Ini adalah...",
          "options": [
            "langsung tanpa menyerang pembaca",
            "serang pembaca",
            "kata berlebihan"
          ],
          "answer": 0,
          "explanation": "Langsung dan profesional.",
          "skill": "formal-register"
        }
      ]
    }
  },
  "04-advanced-formal/05-collocations": {
    "title": "Collocations",
    "levels": {
      "simple": [
        {
          "prompt": "The board reached a ___ decision.",
          "options": [
            "unanimous",
            "happy",
            "big"
          ],
          "answer": 0,
          "explanation": "Unanimous decision = collocation.",
          "skill": "collocation"
        },
        {
          "prompt": "The team conducted a ___ analysis.",
          "options": [
            "thorough",
            "fast",
            "easy"
          ],
          "answer": 0,
          "explanation": "Thorough analysis = collocation.",
          "skill": "collocation"
        },
        {
          "prompt": "Raise ___ concerns.",
          "options": [
            "serious",
            "small",
            "easy"
          ],
          "answer": 0,
          "explanation": "Serious concerns = collocation.",
          "skill": "collocation"
        }
      ],
      "intermediate": [
        {
          "prompt": "Collocation adalah...",
          "options": [
            "pasangan kata yang sering dipakai bersama",
            "kata yang tidak berkaitan",
            "kata yang sulit"
          ],
          "answer": 0,
          "explanation": "Collocation = kata yang kerap bersama.",
          "skill": "collocation"
        },
        {
          "prompt": "Pilih collocation yang benar.",
          "options": [
            "make a decision",
            "do a decision",
            "take a decision"
          ],
          "answer": 0,
          "explanation": "Make a decision = collocation standar.",
          "skill": "collocation"
        },
        {
          "prompt": "Pilih collocation yang benar.",
          "options": [
            "give a presentation",
            "do a presentation",
            "make a presentation"
          ],
          "answer": 0,
          "explanation": "Give a presentation = standar.",
          "skill": "collocation"
        }
      ],
      "complex": [
        {
          "prompt": "Collocation yang alami meningkatkan...",
          "options": [
            "presisi dan kelancaran",
            "panjang kalimat",
            "kesulitan kata"
          ],
          "answer": 0,
          "explanation": "Collocation untuk presisi dan fluency.",
          "skill": "collocation"
        },
        {
          "prompt": "Periksa noun, verb, dan modifier sebagai...",
          "options": [
            "satu unit",
            "kata terpisah",
            "kalimat terpisah"
          ],
          "answer": 0,
          "explanation": "Collocation = satu unit makna.",
          "skill": "collocation"
        },
        {
          "prompt": "Pilih collocation yang tepat untuk laporan formal.",
          "options": [
            "conduct a thorough analysis",
            "do a thorough analysis",
            "make a thorough analysis"
          ],
          "answer": 0,
          "explanation": "Conduct analysis = formal collocation.",
          "skill": "collocation"
        }
      ]
    }
  },
  "04-advanced-formal/06-advanced-connectors": {
    "title": "Advanced Connectors",
    "levels": {
      "simple": [
        {
          "prompt": "Pilih connector untuk menambahkan gagasan.",
          "options": [
            "Furthermore",
            "However",
            "Therefore"
          ],
          "answer": 0,
          "explanation": "Furthermore = penambahan.",
          "skill": "advanced-connectors"
        },
        {
          "prompt": "Pilih connector untuk kontras.",
          "options": [
            "Nevertheless",
            "Therefore",
            "Moreover"
          ],
          "answer": 0,
          "explanation": "Nevertheless = kontras.",
          "skill": "advanced-connectors"
        },
        {
          "prompt": "Pilih connector untuk hasil.",
          "options": [
            "Consequently",
            "However",
            "Although"
          ],
          "answer": 0,
          "explanation": "Consequently = hasil.",
          "skill": "advanced-connectors"
        }
      ],
      "intermediate": [
        {
          "prompt": "Advanced connectors untuk...",
          "options": [
            "menghubungkan gagasan kompleks",
            "membuat kalimat pendek",
            "menghindari subjek"
          ],
          "answer": 0,
          "explanation": "Connectors untuk gagasan kompleks.",
          "skill": "advanced-connectors"
        },
        {
          "prompt": "Pilih connector yang tepat untuk alur argumen.",
          "options": [
            "Moreover",
            "However",
            "Therefore"
          ],
          "answer": 0,
          "explanation": "Konteks menentukan connector.",
          "skill": "advanced-connectors"
        },
        {
          "prompt": "Tanda baca dengan connector...",
          "options": [
            "menyesuaikan posisi dan fungsi",
            "selalu di akhir",
            "selalu di awal"
          ],
          "answer": 0,
          "explanation": "Connector mengikuti aturan tanda baca.",
          "skill": "advanced-connectors"
        }
      ],
      "complex": [
        {
          "prompt": "Connector yang tepat mencegah...",
          "options": [
            "hubungan logika yang keliru",
            "kalimat terlalu pendek",
            "kata terlalu banyak"
          ],
          "answer": 0,
          "explanation": "Connector untuk logika yang benar.",
          "skill": "advanced-connectors"
        },
        {
          "prompt": "Pilih kalimat dengan connector yang benar.",
          "options": [
            "The sample was small. However, the pattern was consistent.",
            "The sample was small. However the pattern was consistent.",
            "The sample small. However pattern consistent."
          ],
          "answer": 0,
          "explanation": "However + koma di awal kalimat baru.",
          "skill": "advanced-connectors"
        },
        {
          "prompt": "It rained heavily; therefore, the match was postponed. 'Therefore' diapit...",
          "options": [
            "koma",
            "titik",
            "tanda tanya"
          ],
          "answer": 0,
          "explanation": "Therefore diapit koma setelah titik koma.",
          "skill": "advanced-connectors"
        }
      ]
    }
  },
  "04-advanced-formal/07-inversion-emphasis": {
    "title": "Inversion for Emphasis",
    "levels": {
      "simple": [
        {
          "prompt": "___ have I seen such a disaster.",
          "options": [
            "Never",
            "Ever",
            "Always"
          ],
          "answer": 0,
          "explanation": "Never + inversion untuk penekanan.",
          "skill": "inversion-emphasis"
        },
        {
          "prompt": "___ did they realize the error.",
          "options": [
            "Only then",
            "Then only",
            "Only"
          ],
          "answer": 0,
          "explanation": "Only then + inversion.",
          "skill": "inversion-emphasis"
        },
        {
          "prompt": "Not only ___ he talented, but he is also kind.",
          "options": [
            "is",
            "does",
            "was"
          ],
          "answer": 0,
          "explanation": "Not only + auxiliary + subject.",
          "skill": "inversion-emphasis"
        }
      ],
      "intermediate": [
        {
          "prompt": "Inversion untuk penekanan membuat...",
          "options": [
            "kalimat lebih dramatis",
            "kalimat lebih pendek",
            "kalimat lebih sederhana"
          ],
          "answer": 0,
          "explanation": "Inversion = dramatis/formal.",
          "skill": "inversion-emphasis"
        },
        {
          "prompt": "Pilih kalimat dengan inversion yang benar.",
          "options": [
            "Seldom have I seen such courage.",
            "I seldom have seen such courage.",
            "Seldom I have seen such courage."
          ],
          "answer": 0,
          "explanation": "Seldom + auxiliary + subject + verb.",
          "skill": "inversion-emphasis"
        },
        {
          "prompt": "No sooner had he arrived than he left. Artinya...",
          "options": [
            "Dia baru tiba lalu pergi",
            "Dia sudah lama tiba",
            "Dia belum tiba"
          ],
          "answer": 0,
          "explanation": "No sooner... than = segera setelah.",
          "skill": "inversion-emphasis"
        }
      ],
      "complex": [
        {
          "prompt": "Had I known, I would have helped. Artinya...",
          "options": [
            "Jika saya tahu, saya akan membantu.",
            "Saya tahu dan membantu.",
            "Saya tidak tahu dan tidak membantu."
          ],
          "answer": 0,
          "explanation": "Had I known = If I had known (inversion).",
          "skill": "inversion-emphasis"
        },
        {
          "prompt": "Pilih kalimat dengan inversion untuk penekanan.",
          "options": [
            "Rarely does she miss a deadline.",
            "She rarely misses a deadline.",
            "She misses a deadline rarely."
          ],
          "answer": 0,
          "explanation": "Rarely + does + subject + verb.",
          "skill": "inversion-emphasis"
        },
        {
          "prompt": "Inversion dalam writing formal untuk...",
          "options": [
            "menekankan elemen tertentu",
            "membuat kalimat informal",
            "menghilangkan subjek"
          ],
          "answer": 0,
          "explanation": "Inversion untuk penekanan formal.",
          "skill": "inversion-emphasis"
        }
      ]
    }
  },
  "04-advanced-formal/08-ellipsis-substitution": {
    "title": "Ellipsis & Substitution",
    "levels": {
      "simple": [
        {
          "prompt": "Ellipsis adalah...",
          "options": [
            "menghilangkan kata yang sudah diketahui",
            "menambahkan kata baru",
            "mengganti kata"
          ],
          "answer": 0,
          "explanation": "Ellipsis = hapus kata yang understood.",
          "skill": "ellipsis-substitution"
        },
        {
          "prompt": "Substitution adalah...",
          "options": [
            "mengganti kata dengan kata lain",
            "menghapus kata",
            "menambahkan kata"
          ],
          "answer": 0,
          "explanation": "Substitution = ganti kata (one/do/so).",
          "skill": "ellipsis-substitution"
        },
        {
          "prompt": "I like tea, and she does ___.",
          "options": [
            "too",
            "also",
            "as well"
          ],
          "answer": 0,
          "explanation": "Does = substitute for like tea.",
          "skill": "ellipsis-substitution"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat dengan ellipsis yang benar.",
          "options": [
            "She can sing, and he can too.",
            "She can sing, and he can sing too.",
            "She can sing, and he too."
          ],
          "answer": 0,
          "explanation": "Can too = ellipsis of 'sing'.",
          "skill": "ellipsis-substitution"
        },
        {
          "prompt": "One digunakan untuk mengganti...",
          "options": [
            "noun tunggal yang disebut sebelumnya",
            "verb",
            "adjective"
          ],
          "answer": 0,
          "explanation": "One = substitusi noun tunggal.",
          "skill": "ellipsis-substitution"
        },
        {
          "prompt": "Do so digunakan untuk mengganti...",
          "options": [
            "tindakan yang disebut sebelumnya",
            "noun",
            "adjective"
          ],
          "answer": 0,
          "explanation": "Do so = substitusi tindakan.",
          "skill": "ellipsis-substitution"
        }
      ],
      "complex": [
        {
          "prompt": "Ellipsis dan substitution membantu...",
          "options": [
            "menghindari pengulangan kata",
            "membuat kalimat lebih panjang",
            "menambah kata baru"
          ],
          "answer": 0,
          "explanation": "Hindari pengulangan.",
          "skill": "ellipsis-substitution"
        },
        {
          "prompt": "Pilih kalimat dengan substitution yang benar.",
          "options": [
            "I want the red one.",
            "I want the red one too.",
            "I want red one."
          ],
          "answer": 0,
          "explanation": "The one = substitusi noun.",
          "skill": "ellipsis-substitution"
        },
        {
          "prompt": "Ellipsis dalam writing formal untuk...",
          "options": [
            "kecakapan dan keefisienan",
            "panjangan kalimat",
            "kekompleksan"
          ],
          "answer": 0,
          "explanation": "Ellipsis untuk efisiensi.",
          "skill": "ellipsis-substitution"
        }
      ]
    }
  },
  "04-advanced-formal/09-cohesion-coherence": {
    "title": "Cohesion & Coherence",
    "levels": {
      "simple": [
        {
          "prompt": "Cohesion adalah...",
          "options": [
            "konektivitas antar kalimat",
            "panjang paragraf",
            "jumlah kata"
          ],
          "answer": 0,
          "explanation": "Cohesion = konektivitas.",
          "skill": "cohesion-coherence"
        },
        {
          "prompt": "Coherence adalah...",
          "options": [
            "keutuhan makna dan alur ide",
            "jumlah kalimat",
            "kata sulit"
          ],
          "answer": 0,
          "explanation": "Coherence = alur ide yang utuh.",
          "skill": "cohesion-coherence"
        },
        {
          "prompt": "Pilih kata penghubung untuk cohesion.",
          "options": [
            "however",
            "the",
            "a"
          ],
          "answer": 0,
          "explanation": "However = connector untuk cohesion.",
          "skill": "cohesion-coherence"
        }
      ],
      "intermediate": [
        {
          "prompt": "Pronoun demonstratif untuk cohesion:",
          "options": [
            "this",
            "that",
            "these",
            "those"
          ],
          "answer": 0,
          "explanation": "This/that/these/those = demonstratif.",
          "skill": "cohesion-coherence"
        },
        {
          "prompt": "Kata hubung untuk alur ide:",
          "options": [
            "moreover",
            "apple",
            "run"
          ],
          "answer": 0,
          "explanation": "Moreover = connector.",
          "skill": "cohesion-coherence"
        },
        {
          "prompt": "Pilih paragraf yang koheren.",
          "options": [
            "Ide tersusun dengan alur logis.",
            "Kata acak dikumpulkan.",
            "Kalimat tidak berhubungan."
          ],
          "answer": 0,
          "explanation": "Alur logis = koheren.",
          "skill": "cohesion-coherence"
        }
      ],
      "complex": [
        {
          "prompt": "Cohesion tanpa coherence membuat...",
          "options": [
            "teks yang sulit dipahami",
            "teks yang sangat jelas",
            "teks yang pendek"
          ],
          "answer": 0,
          "explanation": "Cohesion tanpa coherence = bingung.",
          "skill": "cohesion-coherence"
        },
        {
          "prompt": "Pilih teks dengan cohesion dan coherence yang baik.",
          "options": [
            "Ide terhubung dengan connector dan pronouns yang tepat.",
            "Kata acak tanpa hubungannya.",
            "Kalimat panjang tanpa poin."
          ],
          "answer": 0,
          "explanation": "Connector + pronouns yang tepat.",
          "skill": "cohesion-coherence"
        },
        {
          "prompt": "Substitusi kata untuk cohesion...",
          "options": [
            "mengganti kata yang sudah disebut",
            "menambah kata baru",
            "menghapus semua kata"
          ],
          "answer": 0,
          "explanation": "Substitusi = ganti kata known.",
          "skill": "cohesion-coherence"
        }
      ]
    }
  },
  "04-advanced-formal/10-formal-email-report": {
    "title": "Formal Email & Report",
    "levels": {
      "simple": [
        {
          "prompt": "Subjek email formal harus...",
          "options": [
            "jelas dan spesifik",
            "panjang dan rumit",
            "kosong"
          ],
          "answer": 0,
          "explanation": "Subjek jelas dan spesifik.",
          "skill": "formal-email-report"
        },
        {
          "prompt": "Salam pembuka email formal:",
          "options": [
            "Dear Mr. Smith,",
            "Hey there,",
            "Yo,"
          ],
          "answer": 0,
          "explanation": "Dear Mr. Smith = formal.",
          "skill": "formal-email-report"
        },
        {
          "prompt": "Salam penutup email formal:",
          "options": [
            "Sincerely,",
            "Bye,",
            "Love,"
          ],
          "answer": 0,
          "explanation": "Sincerely = formal.",
          "skill": "formal-email-report"
        }
      ],
      "intermediate": [
        {
          "prompt": "Email formal untuk permintaan:",
          "options": [
            "Could you please...",
            "Give me...",
            "I want..."
          ],
          "answer": 0,
          "explanation": "Could you please = sopan.",
          "skill": "formal-email-report"
        },
        {
          "prompt": "Tanggapan formal untuk keluhan:",
          "options": [
            "We apologize for the inconvenience.",
            "It's not our problem.",
            "Whatever."
          ],
          "answer": 0,
          "explanation": "We apologize = profesional.",
          "skill": "formal-email-report"
        },
        {
          "prompt": "Tanggapan formal untuk keluhan:",
          "options": [
            "We apologize for the inconvenience.",
            "It's not our problem.",
            "Whatever."
          ],
          "answer": 0,
          "explanation": "We apologize = profesional.",
          "skill": "formal-email-report"
        }
      ],
      "complex": [
        {
          "prompt": "Laporan formal harus memiliki...",
          "options": [
            "struktur yang jelas",
            "kata slang",
            "kata singkatan berlebihan"
          ],
          "answer": 0,
          "explanation": "Struktur jelas = laporan baik.",
          "skill": "formal-email-report"
        },
        {
          "prompt": "Ringkasan eksekutif dalam laporan...",
          "options": [
            "ringkasan poin utama",
            "detail teknis semua",
            "kata sandi"
          ],
          "answer": 0,
          "explanation": "Executive summary = poin utama.",
          "skill": "formal-email-report"
        },
        {
          "prompt": "Pilih penutup email formal yang tepat.",
          "options": [
            "I look forward to your reply.",
            "Talk soon.",
            "Later."
          ],
          "answer": 0,
          "explanation": "Look forward to = formal.",
          "skill": "formal-email-report"
        }
      ]
    }
  },
  "04-advanced-formal/11-academic-conventions": {
    "title": "Academic Conventions",
    "levels": {
      "simple": [
        {
          "prompt": "Parafrase yang bertanggung jawab harus...",
          "options": [
            "menyusun ulang gagasan dan tetap memberi sitasi",
            "mengubah beberapa kata saja",
            "menghapus nama sumber"
          ],
          "answer": 1,
          "explanation": "Parafrase = susun ulang gagasan + sitasi.",
          "skill": "academic-conventions"
        },
        {
          "prompt": "Klaim sebab-akibat dari korelasi memerlukan...",
          "options": [
            "kehati-hatian dan bukti tambahan",
            "pernyataan mutlak",
            "penghapusan data"
          ],
          "answer": 0,
          "explanation": "Korelasi ≠ kausalitas, butuh bukti.",
          "skill": "academic-conventions"
        },
        {
          "prompt": "Mengapa gaya sitasi harus konsisten?",
          "options": [
            "agar sumber dapat ditelusuri",
            "agar semua paragraf sama panjang",
            "agar sitasi tidak perlu dibaca"
          ],
          "answer": 0,
          "explanation": "Konsistensi sitasi = dapat ditelusuri.",
          "skill": "academic-conventions"
        }
      ],
      "intermediate": [
        {
          "prompt": "Sitasi yang benar...",
          "options": [
            "menunjukkan asal gagasan/sumber",
            "menggantikan analisis penulis",
            "hanya untuk kutipan langsung"
          ],
          "answer": 0,
          "explanation": "Sitasi = asal gagasan.",
          "skill": "academic-conventions"
        },
        {
          "prompt": "Jika data hanya menunjukkan hubungan, klaim paling tepat adalah...",
          "options": [
            "X berasosiasi dengan Y",
            "X menyebabkan Y",
            "X selalu menghasilkan Y"
          ],
          "answer": 0,
          "explanation": "Asosiasi ≠ kausalitas.",
          "skill": "academic-conventions"
        },
        {
          "prompt": "Parafrase bukan...",
          "options": [
            "salin-tempel dengan perubahan kecil",
            "menyusun ulang gagasan",
            "memberi sitasi"
          ],
          "answer": 0,
          "explanation": "Parafrase bukan salin-tempel.",
          "skill": "academic-conventions"
        }
      ],
      "complex": [
        {
          "prompt": "Klaim dan bukti harus...",
          "options": [
            "terhubung dengan bukti relevan",
            "dibuat tanpa bukti",
            "disamakan dengan opini"
          ],
          "answer": 0,
          "explanation": "Klaim harus didukung bukti.",
          "skill": "academic-conventions"
        },
        {
          "prompt": "Atribusikan gagasan, data, dan kata-kata yang berasal dari...",
          "options": [
            "sumber",
            "penulis sendiri",
            "penerbit"
          ],
          "answer": 0,
          "explanation": "Atribusikan ke sumber.",
          "skill": "academic-conventions"
        },
        {
          "prompt": "Parafrase yang bertanggung jawab...",
          "options": [
            "menyusun ulang gagasan dan tetap memberi sitasi",
            "mengubah beberapa kata saja",
            "menghapus nama sumber"
          ],
          "answer": 0,
          "explanation": "Parafrase + sitasi.",
          "skill": "academic-conventions"
        }
      ]
    }
  },
  "04-advanced-formal/12-editing-precision": {
    "title": "Editing & Precision",
    "levels": {
      "simple": [
        {
          "prompt": "The list of proposed changes ___ attached.",
          "options": [
            "are",
            "is",
            "were"
          ],
          "answer": 1,
          "explanation": "Subject = list (singular) → is.",
          "skill": "editing-precision"
        },
        {
          "prompt": "Pilih struktur paralel.",
          "options": [
            "The role involves planning, writing, and editing.",
            "The role involves planning, writing, and to edit.",
            "The role involves to plan, writing, and editing."
          ],
          "answer": 0,
          "explanation": "Semua gerund = paralel.",
          "skill": "editing-precision"
        },
        {
          "prompt": "Modifier sebaiknya diletakkan...",
          "options": [
            "sedekat mungkin dengan kata yang diterangkan",
            "selalu di awal paragraf",
            "setelah tanda titik"
          ],
          "answer": 0,
          "explanation": "Modifier dekat kata yang diterangkan.",
          "skill": "editing-precision"
        }
      ],
      "intermediate": [
        {
          "prompt": "Tujuan editing presisi adalah...",
          "options": [
            "menjaga makna akurat dan jelas",
            "menambah kata sebanyak mungkin",
            "menghapus semua conjunction"
          ],
          "answer": 1,
          "explanation": "Makna akurat dan jelas.",
          "skill": "editing-precision"
        },
        {
          "prompt": "Kalimat mana paling jelas?",
          "options": [
            "While reviewing the report, the errors were obvious.",
            "While reviewing the report, I noticed several errors.",
            "The report, while reviewing, obvious errors."
          ],
          "answer": 1,
          "explanation": "I noticed = jelas siapa pelakunya.",
          "skill": "editing-precision"
        },
        {
          "prompt": "Periksa subject–verb agreement terutama jika...",
          "options": [
            "frasa panjang memisahkan keduanya",
            "kata terlalu pendek",
            "kalimat terlalu sederhana"
          ],
          "answer": 0,
          "explanation": "Subject-verb agreement dengan frasa panjang.",
          "skill": "editing-precision"
        }
      ],
      "complex": [
        {
          "prompt": "Editing presisi memeriksa...",
          "options": [
            "agreement, parallelism, modifier, pilihan kata",
            "panjang kalimat saja",
            "kata sulit saja"
          ],
          "answer": 0,
          "explanation": "Editing = agreement, parallelism, modifier, diction.",
          "skill": "editing-precision"
        },
        {
          "prompt": "Ambigu: She discussed the report with the manager that was incomplete. Lebih jelas:",
          "options": [
            "She discussed the incomplete report with the manager.",
            "She discussed the report with the manager who was incomplete.",
            "She discussed the report with the manager that incomplete."
          ],
          "answer": 0,
          "explanation": "Modifier dekat noun yang diterangkan.",
          "skill": "editing-precision"
        },
        {
          "prompt": "Tujuan akhir editing presisi:",
          "options": [
            "makna tepat dan mudah dipahami",
            "kalimat sepanjang mungkin",
            "kata sesulit mungkin"
          ],
          "answer": 0,
          "explanation": "Makna tepat dan jelas.",
          "skill": "editing-precision"
        }
      ]
    }
  }
};
