// Auto-extracted from assets/js/module-content*.js
export interface ModuleQuestion {
  prompt: string;
  options: string[];
  answer: number | number[];
  explanation?: string;
  type?: "choice" | "dialogue" | "edit" | "build";
  dialogue?: [string, string][];
  draft?: string;
  hints?: string[];
  wrongFeedback?: Record<number, string | string[]>;
  skill?: string;
  skillLabel?: string;
  skillAnchor?: string;
  skillHint?: string[];
}

export interface ModuleSection {
  title: string;
  paragraphs: string[];
  examples?: string[];
  rule?: string;
}

export interface ModuleEnrichmentItem {
  complex?: ModuleSection;
  quiz?: {
    simple?: ModuleQuestion[];
    intermediate?: ModuleQuestion[];
    complex?: ModuleQuestion[];
  };
}

export interface GeneratedModuleContent {
  level: string;
  number: string;
  title: string;
  intro: string;
  focus: string;
  sections: ModuleSection[];
  checklist: string[];
  quiz: ModuleQuestion[];
}

export const MODULE_ENRICHMENT: Record<string, ModuleEnrichmentItem> = {
  "00-foundation/01-parts-of-speech": {
    "complex": {
      "title": "3. Complex: fungsi kata dalam teks nyata",
      "paragraphs": [
        "Dalam instruksi kerja, tentukan kelas kata dari peran dan posisinya. Kata yang sama dapat berpindah kelas, jadi baca seluruh kalimat dan tanyakan fungsi yang dijalankannya."
      ],
      "examples": [
        "Please email the updated schedule. (email = verb); I sent an email. (email = noun).",
        "The careful reviewer checked the figures carefully. (careful = adjective; carefully = adverb)."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Pada ‘The driver opened the door’, opened adalah...",
          "options": [
            "verb",
            "noun",
            "adjective"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pada ‘They arrived after lunch’, after berfungsi sebagai...",
          "options": [
            "preposition",
            "verb",
            "adjective"
          ],
          "answer": 0
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
          "answer": 1
        }
      ]
    }
  },
  "00-foundation/02-sentence-svo": {
    "complex": {
      "title": "3. Complex: SVO dalam konteks nyata",
      "paragraphs": [
        "Dalam email kerja, subject yang jelas membantu pembaca langsung tahu siapa melakukan tindakan. Jangan memindahkan object ke depan kecuali kamu sengaja memakai pasif atau pertanyaan."
      ],
      "examples": [
        "The coordinator (S) sent (V) the updated schedule (O) to all staff.",
        "The courier arrived before noon. Arrived tidak memiliki object; before noon adalah keterangan waktu."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Pada ‘The nurse checked the chart’, subject adalah...",
          "options": [
            "The nurse",
            "checked",
            "the chart"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat dengan urutan SVO.",
          "options": [
            "The technician replaced the cable.",
            "Replaced the technician cable.",
            "The cable replaced the technician."
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Dalam laporan, ‘The meeting lasted an hour’ memiliki object?",
          "options": [
            "Ya, meeting",
            "Ya, an hour",
            "Tidak; lasted dipakai tanpa object"
          ],
          "answer": 2
        }
      ]
    }
  },
  "00-foundation/03-to-be": {
    "complex": {
      "title": "3. Complex: deskripsi dan keadaan",
      "paragraphs": [
        "Be menghubungkan subject dengan adjective, noun, atau lokasi. Dalam percakapan dan pesan, kontraksi is/are umum; hindari menghilangkan be pada deskripsi."
      ],
      "examples": [
        "Your reservation is confirmed, and your seats are near the exit.",
        "The guests aren't ready yet. Are the documents on your desk?"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The instructions ___ clear.",
          "options": [
            "is",
            "are",
            "am"
          ],
          "answer": 1
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
          "answer": 0
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
          "answer": 1
        }
      ]
    }
  },
  "00-foundation/05-nouns-plural": {
    "complex": {
      "title": "3. Complex: jumlah dalam situasi sehari-hari",
      "paragraphs": [
        "Dalam daftar belanja, laporan inventaris, atau instruksi, pastikan angka cocok dengan bentuk noun. Beberapa noun berbentuk plural tetapi merujuk satu benda, seperti scissors."
      ],
      "examples": [
        "We need two boxes, three batteries, and a pair of scissors.",
        "Each child receives one card. Children adalah plural; each child kembali ke singular."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "A hotel has twelve ___ available.",
          "options": [
            "room",
            "rooms",
            "roomes"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat yang tepat.",
          "options": [
            "There are three buses outside.",
            "There are three bus outside.",
            "There is three buses outside."
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Untuk menyebut satu benda ‘scissors’, gunakan...",
          "options": [
            "a scissor",
            "a pair of scissors",
            "one scissors"
          ],
          "answer": 1
        }
      ]
    }
  },
  "00-foundation/06-pronouns": {
    "complex": {
      "title": "3. Complex: rujukan yang jelas",
      "paragraphs": [
        "Saat menulis pesan, pastikan pembaca tahu pronoun merujuk ke siapa atau apa. Gunakan possessive form yang sesuai, dan jangan memakai reflexive sebagai subject biasa."
      ],
      "examples": [
        "Nadia sent her supervisor the draft. She asked for feedback. (She = Nadia jika konteksnya jelas.)",
        "Please contact Maya or me. The final choice is ours."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The manager called ___ . (object pronoun untuk I)",
          "options": [
            "I",
            "me",
            "my"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih kalimat yang benar.",
          "options": [
            "This desk is her.",
            "This desk is hers.",
            "This desk is she."
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih bentuk yang benar: ‘The team completed the task by ___.’",
          "options": [
            "themselves",
            "them",
            "their"
          ],
          "answer": 0
        }
      ]
    }
  },
  "00-foundation/08-present-continuous": {
    "complex": {
      "title": "3. Complex: kegiatan sementara dan rencana",
      "paragraphs": [
        "Present Continuous juga dapat menyatakan pengaturan masa depan yang sudah disepakati. Beberapa stative verbs seperti know dan believe biasanya tidak dipakai dalam bentuk -ing."
      ],
      "examples": [
        "I am meeting the supplier at 10 tomorrow. The appointment is confirmed.",
        "I understand the instructions. (bukan: I am understanding the instructions.)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Listen! The baby ___ .",
          "options": [
            "cries",
            "is crying",
            "cry"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "Rencana yang sudah dijadwalkan: ‘We ___ the dentist tomorrow.’",
          "options": [
            "are seeing",
            "see now",
            "seeing"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat dengan stative verb yang alami.",
          "options": [
            "I am knowing the answer.",
            "I know the answer.",
            "I knowing the answer."
          ],
          "answer": 1
        }
      ]
    }
  },
  "00-foundation/09-prepositions-basic": {
    "complex": {
      "title": "3. Complex: preposisi dalam petunjuk",
      "paragraphs": [
        "Saat memberi petunjuk, gabungkan preposisi dengan lokasi secara konsisten. Ungkapan tetap seperti at home dan on the bus perlu dipelajari sebagai satu unit."
      ],
      "examples": [
        "The clinic is on King Street, next to the pharmacy.",
        "Our team meets at the office in the afternoon."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The keys are ___ the drawer.",
          "options": [
            "in",
            "on",
            "at"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Kita biasanya mengatakan ‘___ the bus’.",
          "options": [
            "in",
            "on",
            "at"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat lokasi yang tepat.",
          "options": [
            "The café is on the corner of Pine Street.",
            "The café is at the corner street Pine.",
            "The café is in the corner street."
          ],
          "answer": 0
        }
      ]
    }
  },
  "00-foundation/10-there-is-are": {
    "complex": {
      "title": "3. Complex: menjelaskan isi tempat",
      "paragraphs": [
        "There is/are berguna saat mendeskripsikan fasilitas, kamar, atau ketersediaan. Pilih bentuk berdasarkan noun yang diperkenalkan, lalu gunakan some/any dengan jumlah yang sesuai."
      ],
      "examples": [
        "There is a lift, and there are two accessible entrances.",
        "Is there any space left in the meeting room?"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "___ an umbrella by the door.",
          "options": [
            "There is",
            "There are",
            "There have"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih pertanyaan ketersediaan yang benar.",
          "options": [
            "Are there any tickets left?",
            "Is there any tickets left?",
            "Do there have tickets left?"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Lengkapi deskripsi: ‘There ___ a desk and two chairs in the room.’",
          "options": [
            "are",
            "is",
            "be"
          ],
          "answer": 1
        }
      ]
    }
  },
  "00-foundation/11-can-cannot": {
    "complex": {
      "title": "3. Complex: kemampuan, izin, dan permintaan",
      "paragraphs": [
        "Makna can dibaca dari konteks: kemampuan, izin, atau permintaan. Untuk permintaan yang lebih sopan, gunakan could you...? Could di sini bukan bentuk lampau kemampuan."
      ],
      "examples": [
        "Could you send the address when you have a moment?",
        "This card can be used on the bus. (fungsi/kemungkinan)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "My little sister ___ read already.",
          "options": [
            "can",
            "cans",
            "is can"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Permintaan yang lebih sopan adalah...",
          "options": [
            "Could you open the window?",
            "You can open the window?",
            "Do you could open the window?"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pada ‘This key can open the side door’, can menyatakan...",
          "options": [
            "kemampuan/fungsi",
            "kewajiban",
            "kejadian lampau"
          ],
          "answer": 0
        }
      ]
    }
  },
  "00-foundation/12-questions-basic": {
    "complex": {
      "title": "3. Complex: pertanyaan langsung dan tidak langsung",
      "paragraphs": [
        "Pertanyaan tidak langsung terdengar lebih sopan. Setelah Could you tell me atau Do you know, gunakan urutan subject lalu verb, bukan inversi pertanyaan langsung."
      ],
      "examples": [
        "Where is the station? → Could you tell me where the station is?",
        "Do you know what time the store closes?"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "___ does the train leave? At six.",
          "options": [
            "What time",
            "Who",
            "Why"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih pertanyaan tidak langsung yang benar.",
          "options": [
            "Could you tell me where the bank is?",
            "Could you tell me where is the bank?",
            "Could you tell where the bank does?"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pada ‘Who called the office?’, mengapa tidak memakai do?",
          "options": [
            "Who adalah subject pertanyaan.",
            "Called tidak bisa menjadi verb.",
            "Office harus menjadi subject."
          ],
          "answer": 0
        }
      ]
    }
  },
  "01-elementary/02-past-continuous": {
    "complex": {
      "title": "3. Complex: menceritakan kejadian",
      "paragraphs": [
        "Dalam cerita, Past Continuous membangun latar dan Past Simple menyampaikan kejadian yang mengubah situasi. Dua aktivitas yang berlangsung bersamaan dapat memakai while."
      ],
      "examples": [
        "I was presenting the budget when the projector stopped working.",
        "While the team was checking the figures, the client was reviewing the draft."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "At noon yesterday, we ___ lunch.",
          "options": [
            "were having",
            "had",
            "was having"
          ],
          "answer": 0
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
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Dua aktivitas berlangsung bersamaan: ‘While I ___ notes, Ana ___ the slides.’",
          "options": [
            "was taking / was preparing",
            "took / prepares",
            "were taking / prepared"
          ],
          "answer": 0
        }
      ]
    }
  },
  "01-elementary/03-future-will-going-to": {
    "complex": {
      "title": "3. Complex: rencana dan keputusan dalam situasi nyata",
      "paragraphs": [
        "Dalam percakapan, alasan memilih bentuk future sering lebih penting daripada penanda waktu. Rencana dapat berubah menjadi keputusan spontan ketika situasi baru muncul."
      ],
      "examples": [
        "We are going to drive, but the road is closed. We'll take the train instead.",
        "The forecast says it will be sunny; look at those clouds, though. It is going to rain."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "I've decided already. I ___ a short course in June.",
          "options": [
            "am going to take",
            "will taking",
            "take yesterday"
          ],
          "answer": 0
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
          "answer": 0
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
          "answer": 1
        }
      ]
    }
  },
  "01-elementary/04-comparatives": {
    "complex": {
      "title": "3. Complex: membandingkan dengan presisi",
      "paragraphs": [
        "Dalam ulasan produk atau pilihan layanan, gunakan much/far + comparative untuk perbedaan besar dan as ... as untuk kesetaraan. Superlative membandingkan satu anggota dengan seluruh kelompok."
      ],
      "examples": [
        "The express route is much faster than the coastal route.",
        "This plan is not as flexible as the annual option; it is the least expensive, though."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "This suitcase is ___ than mine. (light)",
          "options": [
            "lighter",
            "lightest",
            "more light"
          ],
          "answer": 0
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
          "answer": 0
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
          "answer": 0
        }
      ]
    }
  },
  "01-elementary/05-quantifiers": {
    "complex": {
      "title": "3. Complex: memilih jumlah dalam konteks",
      "paragraphs": [
        "Dalam laporan stok atau resep, perhatikan apakah noun dapat dihitung. Fewer dipakai dengan benda yang dapat dihitung; less dengan jumlah atau noun tak terhitung."
      ],
      "examples": [
        "We received fewer applications but less feedback this week.",
        "There is too much noise in the room, and only a few seats are available."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "There are only ___ apples in the bowl.",
          "options": [
            "a little",
            "a few",
            "much"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "We have ___ time, so let's start now.",
          "options": [
            "few",
            "little",
            "many"
          ],
          "answer": 1
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
          "answer": 0
        }
      ]
    }
  },
  "01-elementary/06-modals-basic": {
    "complex": {
      "title": "3. Complex: aturan, larangan, dan pilihan",
      "paragraphs": [
        "Bedakan mustn't (dilarang) dari don't have to (tidak wajib). Dalam petunjuk kerja, perbedaan ini mengubah tindakan yang diharapkan."
      ],
      "examples": [
        "You mustn't share customer passwords. (larangan)",
        "You don't have to print the form; a digital copy is fine. (opsional)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "You ___ wear a seat belt in a car. (aturan wajib)",
          "options": [
            "must",
            "might",
            "would"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "It isn't necessary to bring lunch. You ___ bring lunch.",
          "options": [
            "mustn't",
            "don't have to",
            "can't"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "A sign says ‘No entry’. Visitors ___ enter.",
          "options": [
            "don't have to",
            "mustn't",
            "should"
          ],
          "answer": 1
        }
      ]
    }
  },
  "01-elementary/07-adverbs-frequency": {
    "complex": {
      "title": "3. Complex: frekuensi dalam laporan kebiasaan",
      "paragraphs": [
        "Adverb of frequency membantu menggambarkan pola, bukan satu kejadian. Dengan auxiliary, letakkan adverb setelah auxiliary pertama; dengan be, letakkan sesudah be."
      ],
      "examples": [
        "Our support team has usually responded within one day.",
        "The office is rarely open on public holidays."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "She ___ checks the weather before cycling. (selalu)",
          "options": [
            "always",
            "is always",
            "allways"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "We have ___ used this software before.",
          "options": [
            "never",
            "never have",
            "have never to"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat dengan posisi adverb yang tepat.",
          "options": [
            "The service is often busy after lunch.",
            "The service often is busy after lunch.",
            "Often the service busy is after lunch."
          ],
          "answer": 0
        }
      ]
    }
  },
  "01-elementary/08-present-perfect-intro": {
    "complex": {
      "title": "3. Complex: pengalaman dan waktu yang belum selesai",
      "paragraphs": [
        "Present Perfect cocok untuk periode yang masih berlangsung, seperti today atau this year, jika pengalaman/hasilnya terhubung ke sekarang. Gunakan Past Simple jika waktunya sudah selesai."
      ],
      "examples": [
        "I've answered six emails today. (hari ini masih berlangsung)",
        "I answered six emails yesterday. (kemarin sudah selesai)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Have they ___ the new café yet?",
          "options": [
            "try",
            "tried",
            "trying"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "This year, our team ___ three new clients. (tahun masih berjalan)",
          "options": [
            "has welcomed",
            "welcomed in 2022",
            "welcomes yesterday"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih pasangan yang tepat.",
          "options": [
            "I have called her yesterday.",
            "I called her yesterday.",
            "I have call her yesterday."
          ],
          "answer": 1
        }
      ]
    }
  },
  "01-elementary/09-prepositions-advanced": {
    "complex": {
      "title": "3. Complex: preposisi dalam komunikasi kerja",
      "paragraphs": [
        "Preposition yang salah dapat mengubah hubungan antargagasan. Catat pasangan dalam konteks lengkap, termasuk pola verb-ing setelah preposition."
      ],
      "examples": [
        "The analyst is responsible for checking the figures.",
        "We are looking forward to meeting the new supplier. (to di sini preposition + -ing)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "She is responsible ___ the final report.",
          "options": [
            "for",
            "at",
            "on"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "We look forward to ___ you.",
          "options": [
            "meet",
            "meeting",
            "met"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat dengan pasangan preposition tepat.",
          "options": [
            "They apologized for the delay.",
            "They apologized of the delay.",
            "They apologized at the delay."
          ],
          "answer": 0
        }
      ]
    }
  },
  "01-elementary/10-conjunctions-basic": {
    "complex": {
      "title": "3. Complex: menyusun alasan dan hasil",
      "paragraphs": [
        "Saat menulis penjelasan, pilih because untuk alasan dan so untuk hasil. And/but/or menghubungkan unsur setara; pastikan hubungan logika tidak terbalik."
      ],
      "examples": [
        "The payment failed because the card had expired.",
        "The card had expired, so the payment failed."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "We took a taxi ___ it was raining.",
          "options": [
            "because",
            "so",
            "but"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "The shop was closed, ___ we came back later.",
          "options": [
            "so",
            "because",
            "although"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat yang menyatakan alasan dengan benar.",
          "options": [
            "The flight was delayed because of heavy fog.",
            "The flight was delayed so heavy fog.",
            "Because the flight was delayed, so fog."
          ],
          "answer": 0
        }
      ]
    }
  },
  "02-intermediate/01-present-perfect-vs-past": {
    "complex": {
      "title": "3. Complex: memilih tense dari kronologi",
      "paragraphs": [
        "Dalam laporan kemajuan, cocokkan tense dengan periode yang dimaksud. Periode yang masih terbuka dapat memakai Present Perfect; tanggal/periode selesai memakai Past Simple."
      ],
      "examples": [
        "We have processed 40 orders this week. (minggu masih berlangsung)",
        "We processed 40 orders last week. (minggu telah selesai)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "I ___ the new manager this morning. (pagi masih berlangsung)",
          "options": [
            "have met",
            "met last year",
            "meet"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "The report ___ two days ago.",
          "options": [
            "has arrived",
            "arrived",
            "has arrive"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih pasangan sesuai periode selesai dan belum selesai.",
          "options": [
            "I have called yesterday / I called today (today ongoing)",
            "I called yesterday / I have called twice today",
            "I call yesterday / I have call today"
          ],
          "answer": 1
        }
      ]
    }
  },
  "02-intermediate/02-present-perfect-continuous": {
    "complex": {
      "title": "3. Complex: durasi dan hasil yang terlihat",
      "paragraphs": [
        "Gunakan bentuk continuous untuk proses atau aktivitas berulang yang menimbulkan bukti sekarang. Jika fokusnya hasil selesai atau jumlah, Present Perfect Simple sering lebih tepat."
      ],
      "examples": [
        "The support line has been receiving calls all morning; it is still busy.",
        "We have answered 30 calls so far. (fokus jumlah selesai)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "I ___ English for six months and continue to study.",
          "options": [
            "have been studying",
            "am studied",
            "has studied"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "The floor is wet. Someone ___ it.",
          "options": [
            "has been washing",
            "have wash",
            "is washed"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Fokus pada hasil: ‘She ___ four chapters so far.’",
          "options": [
            "has written",
            "has been writing",
            "is writing"
          ],
          "answer": 0
        }
      ]
    }
  },
  "02-intermediate/03-past-perfect": {
    "complex": {
      "title": "3. Complex: membangun kronologi cerita",
      "paragraphs": [
        "Past Perfect membantu pembaca memahami sebab dan urutan dalam cerita atau laporan insiden. Setelah urutan sudah jelas, Past Simple menjaga narasi tetap ringkas."
      ],
      "examples": [
        "The technician discovered that a cable had come loose, so she restarted the system.",
        "By the time the ambulance arrived, the crowd had called the emergency line."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "I ___ the file before the computer crashed.",
          "options": [
            "had saved",
            "have save",
            "was save"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "When we arrived, the guests ___ dinner.",
          "options": [
            "had already eaten",
            "have already eat",
            "already eat"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Urutan: alarm berbunyi dahulu, lalu petugas tiba. ‘The alarm ___ before the guard arrived.’",
          "options": [
            "had sounded",
            "has sounded",
            "sounds"
          ],
          "answer": 0
        }
      ]
    }
  },
  "02-intermediate/05-conditionals-1-2": {
    "complex": {
      "title": "3. Complex: memilih conditional untuk situasi nyata",
      "paragraphs": [
        "Dalam saran atau perencanaan, type 1 cocok untuk hasil yang mungkin jika syarat terpenuhi; type 2 memberi jarak hipotetis. Past Simple pada type 2 tidak selalu berarti waktu lampau."
      ],
      "examples": [
        "If the supplier confirms today, we will ship tomorrow. (kemungkinan nyata)",
        "If I were the project lead, I would extend testing. (hipotetis)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "If the weather is clear, we ___ outside.",
          "options": [
            "will eat",
            "would ate",
            "ate tomorrow"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Saran hipotetis: ‘If I were you, I ___ the offer.’",
          "options": [
            "will accept",
            "would consider",
            "considered yesterday"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Which sentence describes an unlikely present situation?",
          "options": [
            "If she had more time, she would join us.",
            "If she has time, she will join us.",
            "If she will have time, she joins us."
          ],
          "answer": 0
        }
      ]
    }
  },
  "02-intermediate/06-relative-clauses": {
    "complex": {
      "title": "3. Complex: menghindari pengulangan noun",
      "paragraphs": [
        "Relative clause dapat menggabungkan dua kalimat tanpa mengulang noun. Jika relative pronoun menjadi object pada defining clause, sering kali dapat dihilangkan; jangan hilangkan subject pronoun."
      ],
      "examples": [
        "The invoice (that) you sent is missing a date.",
        "The analyst who prepared the forecast will present it."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The doctor ___ treated me was helpful.",
          "options": [
            "who",
            "where",
            "whose"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Relative pronoun object yang dapat dihilangkan: ‘The book (that) I borrowed...’ adalah...",
          "options": [
            "subject",
            "object",
            "possessive"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih relative clause yang benar.",
          "options": [
            "The person which called is waiting.",
            "The person who called is waiting.",
            "The person where called is waiting."
          ],
          "answer": 1
        }
      ]
    }
  },
  "02-intermediate/07-reported-speech-basic": {
    "complex": {
      "title": "3. Complex: melaporkan informasi secara akurat",
      "paragraphs": [
        "Saat melaporkan percakapan kerja, ubah pronoun dan penanda waktu berdasarkan sudut pandang pelapor. Backshift dapat tidak dilakukan jika informasi masih benar atau konteks waktunya belum berubah."
      ],
      "examples": [
        "“The Earth orbits the Sun.” → The teacher said the Earth orbits the Sun.",
        "“I will send it today.” → He said he would send it that day."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "“I like this café.” → She said she ___ that café.",
          "options": [
            "liked",
            "likes yesterday",
            "liking"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "“We are ready.” → They told us they ___ ready.",
          "options": [
            "are",
            "were",
            "be"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Fakta ilmiah yang masih berlaku: ‘Water boils at 100°C.’ → He said water...",
          "options": [
            "boiled only yesterday",
            "boils at 100°C",
            "is boiling at 100°C always"
          ],
          "answer": 1
        }
      ]
    }
  },
  "02-intermediate/08-gerund-infinitive": {
    "complex": {
      "title": "3. Complex: pola verb mengubah makna",
      "paragraphs": [
        "Beberapa verb menerima gerund atau infinitive dengan perbedaan makna. Stop doing berarti berhenti melakukan kegiatan; stop to do berarti berhenti sejenak untuk melakukan hal lain."
      ],
      "examples": [
        "She stopped checking email after 6 p.m. (berhenti dari kebiasaan)",
        "She stopped to check the address. (berhenti agar dapat memeriksa)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "He finished ___ the application.",
          "options": [
            "to complete",
            "completing",
            "complete"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "They plan ___ a new branch.",
          "options": [
            "opening",
            "open",
            "to open"
          ],
          "answer": 2
        }
      ],
      "complex": [
        {
          "prompt": "‘He stopped ___ because he was exhausted.’ (berhenti berlari)",
          "options": [
            "to run",
            "running",
            "run"
          ],
          "answer": 1
        }
      ]
    }
  },
  "02-intermediate/09-modals-possibility": {
    "complex": {
      "title": "3. Complex: menimbang bukti dan kemungkinan",
      "paragraphs": [
        "Pilih modal berdasarkan bukti, bukan sekadar tingkat formalitas. Kesimpulan kuat memakai must/can't; bukti tidak pasti lebih cocok dengan may, might, atau could."
      ],
      "examples": [
        "Her car is outside and the lights are on; she must be home.",
        "The meeting room is empty, so they may have moved upstairs."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The forecast is uncertain. It ___ snow tonight.",
          "options": [
            "might",
            "mustn't",
            "can't have"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "The door is locked and nobody answers. They ___ be inside.",
          "options": [
            "must",
            "can't",
            "must have"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kesimpulan yang paling kuat dari bukti: ‘All the lights are off; everyone left.’",
          "options": [
            "They must have gone home.",
            "They may leave tomorrow.",
            "They could be arriving now."
          ],
          "answer": 0
        }
      ]
    }
  },
  "02-intermediate/10-phrasal-verbs-basic": {
    "complex": {
      "title": "3. Complex: phrasal verbs dalam percakapan kerja",
      "paragraphs": [
        "Dalam instruksi sehari-hari, phrasal verbs sering terdengar alami. Periksa apakah particle dapat dipisahkan dan letakkan pronoun di posisi yang benar."
      ],
      "examples": [
        "Please fill out the form and hand it in by noon.",
        "We ran out of printer paper, so I ordered more."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Please ___ the form with your contact details.",
          "options": [
            "fill out",
            "look after",
            "turn down"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih posisi pronoun: ‘pick up the package’.",
          "options": [
            "pick up it",
            "pick it up",
            "it pick up"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "‘We ran out of time’ berarti...",
          "options": [
            "waktu kami habis",
            "kami berlari tepat waktu",
            "kami menunda waktu"
          ],
          "answer": 0
        }
      ]
    }
  },
  "02-intermediate/11-question-tags": {
    "complex": {
      "title": "3. Complex: tag untuk memastikan informasi",
      "paragraphs": [
        "Question tag dapat meminta konfirmasi atau menunjukkan keyakinan. Gunakan auxiliary dari klausa utama; intonasi naik biasanya menandakan penutur benar-benar bertanya."
      ],
      "examples": [
        "The deadline is Friday, isn't it? (konfirmasi)",
        "You've already sent the file, haven't you? (mengharapkan persetujuan)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Maya works remotely, ___?",
          "options": [
            "doesn't she",
            "isn't she",
            "does she"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "They haven't replied, ___?",
          "options": [
            "haven't they",
            "have they",
            "did they"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih tag sesuai auxiliary: ‘You can access the portal, ___?’",
          "options": [
            "can't you",
            "don't you",
            "aren't you"
          ],
          "answer": 0
        }
      ]
    }
  },
  "02-intermediate/12-used-to-would": {
    "complex": {
      "title": "3. Complex: membandingkan kebiasaan dulu dan sekarang",
      "paragraphs": [
        "Dalam biografi atau wawancara, used to menandai perubahan dari masa lalu; would memberi nuansa kebiasaan berulang ketika periode lampau telah dikenalkan."
      ],
      "examples": [
        "The shop used to close at five, but it now stays open until eight.",
        "When we lived near the coast, we would walk there every evening."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "There ___ be a cinema here, but it closed years ago.",
          "options": [
            "used to",
            "would to",
            "use"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "When I was a child, my grandfather ___ tell us stories.",
          "options": [
            "would",
            "would to",
            "was tell"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Untuk keadaan ‘know’ di masa lalu, bentuk yang paling tepat adalah...",
          "options": [
            "I would know the answer.",
            "I used to know the answer.",
            "I would to know the answer."
          ],
          "answer": 1
        }
      ]
    }
  },
  "03-upper-intermediate/01-past-perfect-continuous": {
    "complex": {
      "title": "3. Complex: durasi sebagai penyebab",
      "paragraphs": [
        "Gunakan Past Perfect Continuous untuk menjelaskan proses panjang yang menyebabkan keadaan pada titik lampau. Jika ada hitungan hasil yang selesai, pilih Past Perfect Simple."
      ],
      "examples": [
        "The engineers had been testing the pump for hours before it overheated.",
        "They had tested 12 units before the inspection began. (jumlah selesai)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Her eyes were red because she ___ .",
          "options": [
            "had been crying",
            "has cry",
            "was cried"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "The crew ___ for weeks before the launch was postponed.",
          "options": [
            "had been preparing",
            "have prepared",
            "were prepare"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Fokus pada proses penyebab: ‘The road was muddy because it ___ all night.’",
          "options": [
            "had been raining",
            "had rained three inches",
            "has rain"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/02-future-perfect-continuous": {
    "complex": {
      "title": "3. Complex: tenggat versus durasi",
      "paragraphs": [
        "Dalam rencana proyek, Future Perfect menekankan hasil yang selesai sebelum tenggat. Future Perfect Continuous menekankan lama aktivitas berlangsung sampai tenggat itu."
      ],
      "examples": [
        "By Thursday, the team will have submitted the proposal.",
        "By Thursday, the team will have been working on it for six weeks."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "By next spring, the city ___ the new bridge.",
          "options": [
            "will have completed",
            "will completed",
            "has complete"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "At 5 p.m., I ___ for eight hours.",
          "options": [
            "will have been travelling",
            "will travel since",
            "have been travelling tomorrow"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Fokus pada hasil selesai sebelum batas waktu: ‘By noon, we ___ the audit.’",
          "options": [
            "will have completed",
            "will have been completing",
            "complete yesterday"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/04-passive-advanced": {
    "complex": {
      "title": "3. Complex: proses formal dan temuan",
      "paragraphs": [
        "Dalam laporan ilmiah atau kebijakan, passive dapat menonjolkan prosedur dan temuan. Gunakan reporting passive untuk menyampaikan konsensus atau klaim yang diatribusikan."
      ],
      "examples": [
        "The samples are being analyzed at three independent laboratories.",
        "The policy is expected to reduce processing time."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The final decision ___ by the board tomorrow.",
          "options": [
            "will be announced",
            "will announce",
            "is announce"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Choose the reporting passive.",
          "options": [
            "The result is believed to be reliable.",
            "The result believes reliable.",
            "The result is believe reliable."
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Laporan menyatakan para ahli memperkirakan biaya akan turun: ‘Costs ___ to fall.’",
          "options": [
            "are expected",
            "expect",
            "are expecting"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/05-reported-speech-advanced": {
    "complex": {
      "title": "3. Complex: melaporkan rapat dengan atribusi",
      "paragraphs": [
        "Pilih reporting verb yang mencerminkan fungsi ujaran. Gunakan object + infinitive untuk saran/perintah, dan that-clause atau gerund untuk klaim, pengakuan, serta penyangkalan."
      ],
      "examples": [
        "The chair asked participants to submit questions in writing.",
        "The supplier denied having changed the delivery date."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The manager reminded us ___ the form.",
          "options": [
            "to sign",
            "signing",
            "sign"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "“I didn't change the figures.” → He denied ___ the figures.",
          "options": [
            "to change",
            "changing",
            "change"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Instruksi reported speech yang benar: ‘Please don't share the draft.’ → She asked us...",
          "options": [
            "not to share the draft",
            "to not sharing the draft",
            "don't share the draft"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/06-inversion-basic": {
    "complex": {
      "title": "3. Complex: penekanan dalam presentasi formal",
      "paragraphs": [
        "Inversion memberi tekanan dramatis atau formal. Gunakan dengan hemat; bentuk normal sering lebih sesuai untuk percakapan dan tulisan sehari-hari."
      ],
      "examples": [
        "Seldom have we seen such a rapid recovery.",
        "Normal: We have seldom seen such a rapid recovery."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Seldom ___ such a clear explanation.",
          "options": [
            "we hear",
            "do we hear",
            "we do hears"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "Not only ___ the deadline, but she also improved the report.",
          "options": [
            "did she meet",
            "she met",
            "does she met"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih inversion formal yang tepat.",
          "options": [
            "Under no circumstances should the files be shared.",
            "Under no circumstances the files should be shared.",
            "Under no circumstances do shared the files."
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/07-cleft-sentences": {
    "complex": {
      "title": "3. Complex: mengoreksi salah paham",
      "paragraphs": [
        "Cleft sentence dapat mengoreksi asumsi dengan menekankan kontras: bukan orang, waktu, atau alasan yang diduga pembaca. Pilih fokus yang benar-benar penting."
      ],
      "examples": [
        "It wasn't the price that concerned us; it was the delivery date.",
        "What the client needs is a reliable timeline, not another estimate."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Penekanan orang: ‘It was Lina ___ found the error.’",
          "options": [
            "who",
            "where",
            "what"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih what-cleft yang benar.",
          "options": [
            "What we need is a clear schedule.",
            "What we need are a clear schedule.",
            "We need what a clear schedule is."
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Koreksi bahwa waktu, bukan tempat, menjadi masalah: ‘It was the timing ___ caused the delay.’",
          "options": [
            "that",
            "where",
            "who"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/08-participle-clauses": {
    "complex": {
      "title": "3. Complex: meringkas prosedur dan alasan",
      "paragraphs": [
        "Participle clause dapat merangkum langkah yang berurutan atau latar sebab. Pastikan pelaku yang dipahami sama dengan subject klausa utama agar makna tidak menggantung."
      ],
      "examples": [
        "Having reviewed the safety checks, the supervisor approved the restart.",
        "Stored below 5°C, the samples remain stable."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "___ the parcel, the courier left a note.",
          "options": [
            "Delivering",
            "Having delivered",
            "Delivered by"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "___ in a sealed container, the device is protected from dust.",
          "options": [
            "Keeping",
            "Kept",
            "Having keep"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat tanpa dangling participle.",
          "options": [
            "Walking into the room, Maya noticed the lights.",
            "Walking into the room, the lights looked bright to Maya.",
            "Having walking inside, the room was quiet."
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/09-modal-perfect": {
    "complex": {
      "title": "3. Complex: evaluasi keputusan masa lalu",
      "paragraphs": [
        "Modal perfect membedakan fakta yang diketahui dari kesimpulan atau penilaian. Should have sering menilai peluang yang terlewat; must have menyimpulkan kejadian dari bukti."
      ],
      "examples": [
        "The package is still at reception; the driver may have missed the note.",
        "We should have confirmed the room before sending invitations."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The server is down. It ___ overnight.",
          "options": [
            "may have failed",
            "may fails",
            "may failing"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "You ___ the backup before updating the system.",
          "options": [
            "should have made",
            "should make yesterday",
            "must making"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Semua kursi terisi dan acara sudah dimulai. They ___ early.",
          "options": [
            "must have arrived",
            "must arrive tomorrow",
            "can't have arrived"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/10-relative-clauses-advanced": {
    "complex": {
      "title": "3. Complex: relative clause ringkas dalam dokumen",
      "paragraphs": [
        "Reduced clause berguna pada laporan atau instruksi ketika noun jelas. Jangan reduksi jika hubungan waktunya atau pelakunya menjadi ambigu."
      ],
      "examples": [
        "Applicants meeting the criteria will receive an interview invitation.",
        "The data collected during the trial are stored securely."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The employees ___ remotely need secure access.",
          "options": [
            "working",
            "worked by",
            "to work"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "The proposal ___ by the committee is available online.",
          "options": [
            "reviewing",
            "reviewed",
            "review"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih bentuk formal yang benar: ‘the issue ___ we are concerned’",
          "options": [
            "about which",
            "about that",
            "which about"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/11-linking-words": {
    "complex": {
      "title": "3. Complex: menghubungkan klaim dan batasannya",
      "paragraphs": [
        "Dalam argumen, connector perlu menunjukkan hubungan spesifik: konsesi mengakui batas; konsekuensi menunjukkan hasil; tambahan memperluas bukti. Jangan memakai therefore hanya karena dua kalimat berurutan."
      ],
      "examples": [
        "The trial involved few participants; nevertheless, the result merits further study.",
        "The sample was not representative; therefore, the findings should be interpreted cautiously."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The device is expensive; ___, it uses less energy.",
          "options": [
            "nevertheless",
            "therefore",
            "because"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "The data were incomplete; ___, the team repeated the survey.",
          "options": [
            "consequently",
            "whereas",
            "although"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Connector untuk menambahkan bukti pendukung adalah...",
          "options": [
            "Furthermore",
            "Nevertheless",
            "Otherwise"
          ],
          "answer": 0
        }
      ]
    }
  },
  "03-upper-intermediate/12-nominalization-intro": {
    "complex": {
      "title": "3. Complex: memakai nominalization tanpa mengaburkan pelaku",
      "paragraphs": [
        "Nominalization dapat menghubungkan ide sebagai topik kalimat berikutnya. Jika rangkaian noun membuat pelaku atau tindakan sulit ditemukan, ubah kembali menjadi klausa dengan verb."
      ],
      "examples": [
        "The company expanded rapidly. This expansion created 40 jobs.",
        "Clearer than ‘implementation of the plan occurred’: The team implemented the plan."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Nominal dari ‘improve’ adalah...",
          "options": [
            "improvement",
            "improvality",
            "improvingly"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "‘The analysis of the results’ memakai noun dari...",
          "options": [
            "analyze",
            "resulting",
            "analytical"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat yang lebih jelas dan langsung.",
          "options": [
            "The committee approved the proposal.",
            "Approval of the proposal was undertaken by committee members.",
            "The undertaking of approval was by the committee."
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/01-complex-subordination": {
    "complex": {
      "title": "3. Complex: menyeimbangkan sebab dan konsesi",
      "paragraphs": [
        "Subordination membantu menempatkan batasan dan klaim utama dalam hierarki yang jelas. Pastikan pilihan connector mencerminkan hubungan logis, bukan sekadar membuat kalimat terdengar formal."
      ],
      "examples": [
        "Although the trial met its target, the small sample limits how widely the result can be applied.",
        "Because the server was unavailable, the team postponed the release until the security check was complete."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "___ the system was secure, the team delayed the launch to test capacity.",
          "options": [
            "Although",
            "Because",
            "Unless"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih struktur yang benar.",
          "options": [
            "Despite the server was down, we completed the work.",
            "Although the server was down, we completed the work.",
            "Although the server down, completed work."
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Connector yang menunjukkan syarat positif adalah...",
          "options": [
            "provided that",
            "nevertheless",
            "as a result"
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/02-nominalization": {
    "complex": {
      "title": "3. Complex: membangun alur argumen dengan noun",
      "paragraphs": [
        "Nominalization dapat membawa topik dari satu kalimat ke kalimat berikutnya. Gunakan agent atau of-phrase jika diperlukan agar hubungan dan tanggung jawab tetap jelas."
      ],
      "examples": [
        "The agency reduced waiting times. This reduction improved access to care.",
        "The review by the safety board identified two risks. (pelaku tetap jelas)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Nominalisasi dari ‘decide’ adalah...",
          "options": [
            "decision",
            "decidingly",
            "decidement"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih bentuk yang membuat proses menjadi topik kalimat.",
          "options": [
            "The expansion created new jobs.",
            "The company expanded yesterday.",
            "The company will expand."
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Mana yang paling jelas menyebut pelaku evaluasi?",
          "options": [
            "An evaluation was conducted.",
            "The review team evaluated the risks.",
            "Evaluation of risks occurred."
          ],
          "answer": 1
        }
      ]
    }
  },
  "04-advanced-formal/04-formal-register": {
    "complex": {
      "title": "3. Complex: menyesuaikan nada dengan tujuan",
      "paragraphs": [
        "Nada formal yang efektif tetap langsung dan sopan. Pilih tingkat ketegasan sesuai hubungan, urgensi, dan tindakan yang diminta; jangan mengganti kejelasan dengan ungkapan berputar."
      ],
      "examples": [
        "Could you confirm receipt by 3 p.m. so we can finalize the schedule?",
        "The current data do not support that conclusion. (langsung tanpa menyerang pembaca)"
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Pilih verba formal dan jelas untuk ‘look at the proposal’.",
          "options": [
            "review the proposal",
            "check out the proposal",
            "peek the proposal"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Tanggapan profesional yang tegas adalah...",
          "options": [
            "This conclusion is not supported by the data.",
            "Your conclusion is ridiculous.",
            "Whatever, the data says no."
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Permintaan dengan tenggat dan alasan paling efektif adalah...",
          "options": [
            "Please confirm by noon so we can release the report.",
            "Please do it sometime soon.",
            "Confirmation would be good maybe."
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/05-collocations": {
    "complex": {
      "title": "3. Complex: collocation dalam konteks profesional",
      "paragraphs": [
        "Collocation yang alami meningkatkan presisi dan kelancaran. Periksa noun, verb, dan modifier sebagai satu unit, terutama pada laporan dan email formal."
      ],
      "examples": [
        "The board reached a unanimous decision after reviewing the evidence.",
        "The team conducted a thorough analysis and raised serious concerns."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The committee ___ a decision after the review.",
          "options": [
            "made",
            "did",
            "built"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pilih pasangan adjective + noun yang lazim.",
          "options": [
            "strong evidence",
            "powerful evidenceful",
            "hard evidenceful"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih collocation yang tepat dalam laporan.",
          "options": [
            "The study raises serious concerns.",
            "The study lifts strong concerns.",
            "The study makes heavy concerns."
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/06-advanced-connectors": {
    "complex": {
      "title": "3. Complex: menyatakan batas, pengecualian, dan akibat",
      "paragraphs": [
        "Connector lanjutan membantu memperjelas batas argumen. Provided that/as long as membatasi kondisi; notwithstanding mengakui hambatan; hence/consequently menyimpulkan akibat yang logis."
      ],
      "examples": [
        "The estimate is reliable provided that material costs remain stable.",
        "Notwithstanding the delay, the inspection was completed; hence, the site can reopen."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The plan is feasible ___ funding is approved.",
          "options": [
            "provided that",
            "nevertheless",
            "hence"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "___ the delays, the team met the safety requirements.",
          "options": [
            "Notwithstanding",
            "Therefore",
            "Whereas"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Pilih connector akibat yang logis.",
          "options": [
            "The sensor failed; consequently, the test was repeated.",
            "The sensor failed; although, the test was repeated.",
            "The sensor failed; provided that the test was repeated."
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/07-inversion-emphasis": {
    "complex": {
      "title": "3. Complex: menekankan batas atau syarat",
      "paragraphs": [
        "Inversion dapat menandai bahwa hasil hanya terjadi setelah syarat tertentu terpenuhi. Pastikan klausa pembuka tidak dibalik jika inversion hanya diwajibkan pada klausa utama."
      ],
      "examples": [
        "Only after the safety review did the facility reopen.",
        "Not until all signatures are received will the agreement take effect."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Only when the data arrived ___ the pattern.",
          "options": [
            "we noticed",
            "did we notice",
            "we did noticed"
          ],
          "answer": 1
        }
      ],
      "intermediate": [
        {
          "prompt": "Not until the final check ___ the machine.",
          "options": [
            "the operator started",
            "did the operator start",
            "the operator did started"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih inversion yang tepat.",
          "options": [
            "Only after approval can the funds be released.",
            "Only after approval the funds can be released.",
            "Only after approval do released the funds."
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/08-ellipsis-substitution": {
    "complex": {
      "title": "3. Complex: menghindari pengulangan dalam diskusi",
      "paragraphs": [
        "Ellipsis dan substitution membuat dialog lebih ringkas, tetapi rujukan harus mudah dipahami. Jika ada dua kemungkinan antecedent, ulangi noun daripada memakai one/it secara ambigu."
      ],
      "examples": [
        "The north entrance is open; the south one is not.",
        "The first team finished early, and the second did so as well."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "The red folder is missing. The blue ___ is here.",
          "options": [
            "one",
            "so",
            "do"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "They promised to revise the draft, and they did ___.",
          "options": [
            "one",
            "so",
            "it"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Kalimat mana memiliki rujukan substitution paling jelas?",
          "options": [
            "I compared two plans; the cheaper one needs approval.",
            "I compared two plans; it needs approval.",
            "They said it was ready, and that was it."
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/09-cohesion-coherence": {
    "complex": {
      "title": "3. Complex: mengembangkan paragraf argumentatif",
      "paragraphs": [
        "Paragraf yang koheren bergerak dari klaim ke bukti lalu interpretasi. Gunakan istilah kunci secara konsisten dan beri rujukan eksplisit saat memperkenalkan temuan baru."
      ],
      "examples": [
        "Claim: Response time improved. Evidence: Median wait fell from 18 to 11 minutes. Interpretation: The staffing change may have contributed.",
        "Hindari ‘This shows...’ jika pembaca belum tahu apakah this merujuk ke angka, metode, atau kesimpulan."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Dalam paragraf, bukti sebaiknya...",
          "options": [
            "mendukung klaim yang relevan",
            "menggantikan topik",
            "muncul tanpa penjelasan"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Pronoun ‘this’ paling jelas jika...",
          "options": [
            "antecedent-nya mudah dikenali",
            "tidak ada informasi sebelumnya",
            "merujuk tiga ide sekaligus"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Urutan argumen yang koheren adalah...",
          "options": [
            "bukti → klaim tak terkait → topik",
            "klaim → bukti → interpretasi",
            "connector → connector → connector"
          ],
          "answer": 1
        }
      ]
    }
  },
  "04-advanced-formal/10-formal-email-report": {
    "complex": {
      "title": "3. Complex: mengubah temuan menjadi tindakan",
      "paragraphs": [
        "Dokumen untuk pengambil keputusan perlu memisahkan temuan, dampak, dan rekomendasi. Nyatakan siapa melakukan apa dan kapan agar tindak lanjut dapat dilaksanakan."
      ],
      "examples": [
        "Finding: 14% of orders arrived late. Impact: Two clients requested refunds.",
        "Recommendation: Add a dispatch check before 4 p.m.; operations will review results on 30 June."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Informasi utama email permintaan sebaiknya muncul...",
          "options": [
            "di awal",
            "hanya di tanda tangan",
            "setelah beberapa halaman"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Bagian report yang menyarankan tindakan berikutnya adalah...",
          "options": [
            "recommendation",
            "salutation",
            "attachment list"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Rekomendasi yang dapat ditindaklanjuti harus menyebut...",
          "options": [
            "tindakan dan pihak/tenggat yang jelas",
            "opini tanpa alasan",
            "judul tanpa isi"
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/11-academic-conventions": {
    "complex": {
      "title": "3. Complex: mengintegrasikan sumber dan analisis",
      "paragraphs": [
        "Dalam tulisan akademik, jangan hanya menumpuk kutipan. Perkenalkan sumber, jelaskan temuan dengan parafrase akurat, lalu terangkan bagaimana bukti mendukung atau membatasi argumen."
      ],
      "examples": [
        "The survey found a modest association (Lee, 2024); this supports further study but does not establish causation.",
        "Bandingkan temuan dengan sumber lain dan catat batas metode sebelum menyimpulkan."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Klaim empiris sebaiknya didukung oleh...",
          "options": [
            "bukti dan sumber yang relevan",
            "keyakinan pribadi saja",
            "jumlah kata yang banyak"
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Parafrase tetap memerlukan sitasi karena...",
          "options": [
            "gagasannya berasal dari sumber",
            "setiap kalimat harus dikutip",
            "parafrase adalah kutipan langsung"
          ],
          "answer": 0
        }
      ],
      "complex": [
        {
          "prompt": "Jika studi menunjukkan korelasi, hindari menyimpulkan sebab-akibat tanpa...",
          "options": [
            "bukti tambahan yang memadai",
            "connector baru",
            "lebih banyak adjective"
          ],
          "answer": 0
        }
      ]
    }
  },
  "04-advanced-formal/12-editing-precision": {
    "complex": {
      "title": "3. Complex: menyunting paragraf untuk pembaca",
      "paragraphs": [
        "Pada tahap akhir, baca untuk makna dan bukan hanya grammar. Periksa modifier yang salah sasaran, antecedent pronoun, paralelisme daftar, serta angka/nama yang perlu konsisten."
      ],
      "examples": [
        "Dangling: After reviewing the data, the chart was updated. → After reviewing the data, I updated the chart.",
        "Pastikan ‘they’ jelas merujuk ke tim, pelanggan, atau dokumen yang dimaksud."
      ]
    },
    "quiz": {
      "simple": [
        {
          "prompt": "Pilih agreement yang tepat.",
          "options": [
            "The results are clear.",
            "The results is clear.",
            "The result are clear."
          ],
          "answer": 0
        }
      ],
      "intermediate": [
        {
          "prompt": "Daftar paralel adalah...",
          "options": [
            "to plan, writing, and review",
            "planning, writing, and reviewing",
            "plan, writing, and to review"
          ],
          "answer": 1
        }
      ],
      "complex": [
        {
          "prompt": "Pilih kalimat dengan modifier yang jelas.",
          "options": [
            "After checking the figures, I sent the report.",
            "After checking the figures, the report was sent by me.",
            "After checking, the figures sent the report."
          ],
          "answer": 0
        }
      ]
    }
  }
};

export const MODULE_CONTENT: Record<string, GeneratedModuleContent> = {
  "00-foundation/01-parts-of-speech": {
    "level": "Level 0 · Foundation",
    "number": "01",
    "title": "Parts of Speech",
    "intro": "Parts of speech mengelompokkan kata berdasarkan fungsi dalam kalimat. Mengenali fungsinya membantu kita menyusun kalimat dan memilih bentuk kata yang tepat.",
    "focus": "fungsi kata dalam kalimat",
    "sections": [
      {
        "title": "1. Delapan kelas kata utama",
        "paragraphs": [
          "Noun menamai orang/benda/ide; pronoun menggantikan noun; verb menyatakan tindakan atau keadaan; adjective menjelaskan noun; adverb menjelaskan verb, adjective, atau adverb lain; preposition menunjukkan hubungan; conjunction menghubungkan bagian kalimat; interjection menyatakan seruan."
        ],
        "examples": [
          "The curious student reads quietly. → student (noun), curious (adjective), reads (verb), quietly (adverb).",
          "She put the book on the table and smiled. → she (pronoun), on (preposition), and (conjunction)."
        ]
      },
      {
        "title": "2. Fungsi bergantung konteks",
        "paragraphs": [
          "Satu kata dapat memiliki kelas berbeda sesuai penggunaannya. Lihat posisi dan perannya dalam kalimat, bukan hanya bentuk katanya."
        ],
        "examples": [
          "I like the clean room. (clean = adjective)",
          "Please clean the room. (clean = verb)",
          "We arrived after lunch. (after = preposition)",
          "We arrived after the meeting ended. (after = conjunction)"
        ]
      },
      {
        "title": "3. Temukan pola dasar",
        "paragraphs": [
          "Kalimat sederhana sering memiliki subject (biasanya noun/pronoun), verb, lalu object atau pelengkap. Kata sifat dan keterangan memberi informasi tambahan."
        ],
        "rule": "The young athlete trains diligently."
      }
    ],
    "checklist": [
      "Aku bisa membedakan noun, pronoun, dan verb.",
      "Aku bisa mengenali adjective dan adverb dari fungsinya.",
      "Aku memahami bahwa kelas kata dapat berubah menurut konteks."
    ],
    "quiz": [
      {
        "prompt": "Pada ‘The child laughed loudly’, kata loudly adalah...",
        "options": [
          "noun",
          "adverb",
          "adjective"
        ],
        "answer": 1
      },
      {
        "prompt": "Kata yang menggantikan noun disebut...",
        "options": [
          "pronoun",
          "preposition",
          "conjunction"
        ],
        "answer": 0
      },
      {
        "prompt": "Pada ‘a noisy street’, noisy berfungsi sebagai...",
        "options": [
          "verb",
          "adjective",
          "adverb"
        ],
        "answer": 1
      },
      {
        "prompt": "Kata yang menghubungkan dua gagasan, seperti but, disebut...",
        "options": [
          "conjunction",
          "interjection",
          "noun"
        ],
        "answer": 0
      },
      {
        "prompt": "Pada ‘They play tennis’, kata play adalah...",
        "options": [
          "preposition",
          "verb",
          "adjective"
        ],
        "answer": 1
      }
    ]
  },
  "00-foundation/02-sentence-svo": {
    "level": "Level 0 · Foundation",
    "number": "02",
    "title": "Sentence: SVO",
    "intro": "Pola Subject–Verb–Object membantu membentuk kalimat Inggris dasar yang jelas. Urutan kata biasanya lebih tetap daripada dalam bahasa Indonesia.",
    "focus": "urutan subject, verb, object",
    "sections": [
      {
        "title": "1. Kenali subject, verb, object",
        "paragraphs": [
          "Subject (S) adalah pelaku/topik, verb (V) adalah tindakan atau keadaan, dan object (O) menerima tindakan. Tidak semua kalimat membutuhkan object."
        ],
        "examples": [
          "Maya (S) reads (V) novels (O).",
          "The baby (S) sleeps (V). Kalimat ini lengkap tanpa object."
        ]
      },
      {
        "title": "2. Pertahankan urutan kata",
        "paragraphs": [
          "Pada pernyataan aktif, subject umumnya mendahului verb. Object diletakkan sesudah verb transitif."
        ],
        "examples": [
          "They play football. Bukan: Play they football.",
          "We like this song. Like adalah verb; this song adalah object."
        ],
        "rule": "Subject + Verb + Object"
      }
    ],
    "checklist": [
      "Aku bisa menemukan subject dan verb dalam kalimat.",
      "Aku memahami posisi object setelah verb.",
      "Aku tahu bahwa beberapa verb tidak memerlukan object."
    ],
    "quiz": [
      {
        "prompt": "Pada ‘Rina opens the window’, subject-nya adalah...",
        "options": [
          "Rina",
          "opens",
          "the window"
        ],
        "answer": 0
      },
      {
        "prompt": "Pada ‘They speak English’, object-nya adalah...",
        "options": [
          "They",
          "speak",
          "English"
        ],
        "answer": 0
      },
      {
        "prompt": "Kalimat SVO yang benar adalah...",
        "options": [
          "He likes music.",
          "Likes he music.",
          "Music likes he."
        ],
        "answer": 0
      },
      {
        "prompt": "Kalimat ‘The train arrived’ memerlukan object?",
        "options": [
          "Tidak, arrived dapat berdiri tanpa object.",
          "Ya, semua verb perlu object.",
          "Ya, train adalah object."
        ],
        "answer": 0
      },
      {
        "prompt": "Pada ‘We made dinner’, verb-nya adalah...",
        "options": [
          "We",
          "made",
          "dinner"
        ],
        "answer": 0
      }
    ]
  },
  "00-foundation/03-to-be": {
    "level": "Level 0 · Foundation",
    "number": "03",
    "title": "To Be (am / is / are)",
    "intro": "Be menghubungkan subject dengan identitas, keadaan, atau lokasi. Bentuk present-nya menyesuaikan subject.",
    "focus": "am, is, are",
    "sections": [
      {
        "title": "1. Pilih bentuk yang sesuai",
        "paragraphs": [
          "Gunakan am dengan I; is dengan he, she, it atau noun tunggal; are dengan you, we, they atau noun jamak."
        ],
        "examples": [
          "I am ready. She is a teacher.",
          "The keys are on the desk."
        ]
      },
      {
        "title": "2. Negatif dan pertanyaan",
        "paragraphs": [
          "Tambahkan not setelah be untuk membuat negatif. Untuk pertanyaan, pindahkan be ke depan subject."
        ],
        "examples": [
          "He is not tired. / Is he tired?",
          "They aren't at home. / Are they at home?"
        ],
        "rule": "Subject + am/is/are + pelengkap"
      }
    ],
    "checklist": [
      "Aku bisa mencocokkan subject dengan am/is/are.",
      "Aku bisa membuat bentuk negatif dengan not.",
      "Aku bisa membentuk pertanyaan dengan memindahkan be."
    ],
    "quiz": [
      {
        "prompt": "I ___ from Bandung.",
        "options": [
          "am",
          "is",
          "are"
        ],
        "answer": 0
      },
      {
        "prompt": "The students ___ in class.",
        "options": [
          "am",
          "is",
          "are"
        ],
        "answer": 2
      },
      {
        "prompt": "Bentuk negatif ‘She is busy’ adalah...",
        "options": [
          "She not is busy.",
          "She isn't busy.",
          "She doesn't busy."
        ],
        "answer": 1
      },
      {
        "prompt": "Pertanyaan yang benar adalah...",
        "options": [
          "Are you okay?",
          "You are okay?",
          "Do you are okay?"
        ],
        "answer": 0
      },
      {
        "prompt": "My brother ___ a student.",
        "options": [
          "are",
          "am",
          "is"
        ],
        "answer": 2
      }
    ]
  },
  "00-foundation/05-nouns-plural": {
    "level": "Level 0 · Foundation",
    "number": "05",
    "title": "Plural Nouns",
    "intro": "Kata benda jamak menunjukkan lebih dari satu. Kebanyakan cukup mendapat -s, tetapi beberapa ejaan berubah.",
    "focus": "bentuk singular dan plural",
    "sections": [
      {
        "title": "1. Aturan umum",
        "paragraphs": [
          "Tambahkan -s pada kebanyakan noun. Tambahkan -es setelah bunyi/ejaan s, sh, ch, x, atau z. Konsonan + y berubah menjadi -ies."
        ],
        "examples": [
          "book → books; bus → buses; watch → watches",
          "city → cities; tetapi boy → boys karena sebelum y ada vokal."
        ]
      },
      {
        "title": "2. Bentuk tidak beraturan dan jumlah",
        "paragraphs": [
          "Beberapa bentuk perlu dihafal: child/children, person/people, man/men, tooth/teeth. Noun tak terhitung biasanya tidak dijamakkan."
        ],
        "examples": [
          "one child → two children",
          "some information (bukan informations); three pieces of advice"
        ],
        "rule": "Angka lebih dari satu biasanya diikuti noun plural yang dapat dihitung."
      }
    ],
    "checklist": [
      "Aku bisa membentuk plural dengan -s dan -es.",
      "Aku mengenali perubahan konsonan + y menjadi -ies.",
      "Aku memahami bahwa plural irregular dan uncountable punya aturan khusus."
    ],
    "quiz": [
      {
        "prompt": "Bentuk plural dari ‘box’ adalah...",
        "options": [
          "boxs",
          "boxes",
          "boxies"
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk plural dari ‘city’ adalah...",
        "options": [
          "citys",
          "cities",
          "cityes"
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk plural dari ‘child’ adalah...",
        "options": [
          "childs",
          "children",
          "childes"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih frasa yang tepat.",
        "options": [
          "many informations",
          "an advice",
          "two pieces of advice"
        ],
        "answer": 2
      },
      {
        "prompt": "Bentuk plural dari ‘toy’ adalah...",
        "options": [
          "toies",
          "toys",
          "toyes"
        ],
        "answer": 1
      }
    ]
  },
  "00-foundation/06-pronouns": {
    "level": "Level 0 · Foundation",
    "number": "06",
    "title": "Pronouns",
    "intro": "Pronoun menggantikan noun agar kalimat tidak berulang. Bentuknya berubah menurut fungsi dan kepemilikan.",
    "focus": "subject, object, possessive",
    "sections": [
      {
        "title": "1. Subject dan object pronouns",
        "paragraphs": [
          "Subject pronoun melakukan tindakan; object pronoun menerima tindakan atau mengikuti preposition."
        ],
        "examples": [
          "I, you, he, she, it, we, they → subject",
          "me, you, him, her, it, us, them → object: She called me."
        ]
      },
      {
        "title": "2. Menunjukkan kepemilikan",
        "paragraphs": [
          "Possessive adjective harus diikuti noun. Possessive pronoun berdiri sendiri. Reflexive pronoun merujuk kembali ke subject."
        ],
        "examples": [
          "This is my bag. The bag is mine.",
          "He taught himself. (dirinya sendiri)"
        ],
        "rule": "my + noun, tetapi mine tanpa noun"
      }
    ],
    "checklist": [
      "Aku dapat memilih subject atau object pronoun.",
      "Aku dapat membedakan my dari mine.",
      "Aku mengenali penggunaan reflexive pronoun."
    ],
    "quiz": [
      {
        "prompt": "___ lives next door. (subject pronoun)",
        "options": [
          "Her",
          "She",
          "Hers"
        ],
        "answer": 1
      },
      {
        "prompt": "I met ___ at the station. (object pronoun untuk they)",
        "options": [
          "they",
          "their",
          "them"
        ],
        "answer": 2
      },
      {
        "prompt": "This is ___ notebook. (milik saya)",
        "options": [
          "my",
          "mine",
          "me"
        ],
        "answer": 0
      },
      {
        "prompt": "The blue seat is ___. (milik kami)",
        "options": [
          "our",
          "ours",
          "us"
        ],
        "answer": 1
      },
      {
        "prompt": "She made the cake by ___.",
        "options": [
          "herself",
          "her",
          "hers"
        ],
        "answer": 0
      }
    ]
  },
  "00-foundation/08-present-continuous": {
    "level": "Level 0 · Foundation",
    "number": "08",
    "title": "Present Continuous",
    "intro": "Present Continuous menggambarkan kegiatan yang sedang berlangsung atau situasi sementara. Bentuknya memerlukan be dan verb-ing.",
    "focus": "am/is/are + verb-ing",
    "sections": [
      {
        "title": "1. Bentuk kalimat",
        "paragraphs": [
          "Gunakan am/is/are sesuai subject, lalu tambahkan -ing pada verb. Ejaan dapat berubah: make → making; run → running."
        ],
        "examples": [
          "I am studying now.",
          "They are having lunch. She isn't working today."
        ]
      },
      {
        "title": "2. Kapan digunakan?",
        "paragraphs": [
          "Gunakan untuk aktivitas yang sedang terjadi, keadaan sementara, atau perubahan yang sedang berlangsung. Kata now, at the moment, dan currently sering menjadi petunjuk."
        ],
        "examples": [
          "Please wait; I am talking to a client.",
          "The weather is getting warmer."
        ],
        "rule": "Subject + am/is/are + verb-ing"
      }
    ],
    "checklist": [
      "Aku dapat membentuk am/is/are + verb-ing.",
      "Aku dapat menyesuaikan be dengan subject.",
      "Aku tahu Present Continuous cocok untuk kegiatan sementara/sedang berlangsung."
    ],
    "quiz": [
      {
        "prompt": "She ___ dinner right now.",
        "options": [
          "is cooking",
          "cooks",
          "cook"
        ],
        "answer": 0
      },
      {
        "prompt": "We ___ for the bus at the moment.",
        "options": [
          "wait",
          "are waiting",
          "is waiting"
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk -ing dari ‘make’ adalah...",
        "options": [
          "makeing",
          "making",
          "makking"
        ],
        "answer": 1
      },
      {
        "prompt": "Kalimat negatif yang benar adalah...",
        "options": [
          "They aren't listening.",
          "They don't listening.",
          "They not listening."
        ],
        "answer": 0
      },
      {
        "prompt": "Present Continuous paling tepat untuk...",
        "options": [
          "fakta ilmiah umum",
          "kebiasaan harian",
          "aktivitas yang sedang berlangsung"
        ],
        "answer": 2
      }
    ]
  },
  "00-foundation/09-prepositions-basic": {
    "level": "Level 0 · Foundation",
    "number": "09",
    "title": "Prepositions (Basic)",
    "intro": "Preposition menunjukkan hubungan waktu, tempat, dan arah. Aturan dasar membantu, tetapi banyak pasangan kata perlu dipelajari sebagai ungkapan.",
    "focus": "in, on, at; place and time",
    "sections": [
      {
        "title": "1. Preposisi waktu",
        "paragraphs": [
          "Gunakan at untuk jam dan waktu spesifik, on untuk hari/tanggal, dan in untuk bulan, tahun, musim, atau periode panjang."
        ],
        "examples": [
          "at 7:30; on Friday; on 12 May",
          "in July; in 2026; in winter; in the morning"
        ]
      },
      {
        "title": "2. Preposisi tempat",
        "paragraphs": [
          "Secara umum, at menunjuk titik/lokasi kegiatan, on permukaan, dan in ruang atau area yang dibatasi."
        ],
        "examples": [
          "at the station; on the wall; in the kitchen",
          "Konteks menentukan pilihan: at school (kegiatan/lokasi) dan in the school (di dalam gedung)."
        ],
        "rule": "at = titik · on = permukaan · in = area/ruang"
      }
    ],
    "checklist": [
      "Aku dapat memakai at/on/in untuk waktu dasar.",
      "Aku dapat memakai at/on/in untuk lokasi.",
      "Aku tahu bahwa pilihan preposition juga dipengaruhi konteks."
    ],
    "quiz": [
      {
        "prompt": "The meeting starts ___ 9 o'clock.",
        "options": [
          "at",
          "on",
          "in"
        ],
        "answer": 0
      },
      {
        "prompt": "My birthday is ___ Monday.",
        "options": [
          "at",
          "on",
          "in"
        ],
        "answer": 1
      },
      {
        "prompt": "She was born ___ 2001.",
        "options": [
          "at",
          "on",
          "in"
        ],
        "answer": 2
      },
      {
        "prompt": "The picture is ___ the wall.",
        "options": [
          "at",
          "on",
          "in"
        ],
        "answer": 1
      },
      {
        "prompt": "The children are playing ___ the garden.",
        "options": [
          "at",
          "on",
          "in"
        ],
        "answer": 2
      }
    ]
  },
  "00-foundation/10-there-is-are": {
    "level": "Level 0 · Foundation",
    "number": "10",
    "title": "There is / There are",
    "intro": "There is dan there are memperkenalkan keberadaan sesuatu. Pilih is untuk noun tunggal/tak terhitung dan are untuk plural.",
    "focus": "there is / there are",
    "sections": [
      {
        "title": "1. Pernyataan dan jumlah",
        "paragraphs": [
          "There is diikuti noun tunggal atau tak terhitung; there are diikuti noun jamak. A/an dapat dipakai untuk noun tunggal yang dapat dihitung."
        ],
        "examples": [
          "There is a lamp on the desk.",
          "There are three windows. There is some milk in the fridge."
        ]
      },
      {
        "title": "2. Negatif dan pertanyaan",
        "paragraphs": [
          "Tambahkan not setelah is/are untuk negatif. Untuk pertanyaan, pindahkan is/are ke awal."
        ],
        "examples": [
          "There isn't any coffee.",
          "Are there any seats? Yes, there are. / No, there aren't."
        ],
        "rule": "There is + singular/uncountable · There are + plural"
      }
    ],
    "checklist": [
      "Aku bisa mencocokkan is/are dengan noun.",
      "Aku bisa membuat bentuk negatif.",
      "Aku bisa membentuk dan menjawab pertanyaan there is/are."
    ],
    "quiz": [
      {
        "prompt": "___ a bank near here.",
        "options": [
          "There is",
          "There are",
          "They are"
        ],
        "answer": 0
      },
      {
        "prompt": "___ two messages for you.",
        "options": [
          "There is",
          "There are",
          "It is"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih bentuk yang benar untuk milk.",
        "options": [
          "There are some milk.",
          "There is some milk.",
          "There be some milk."
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk pertanyaan yang tepat adalah...",
        "options": [
          "There are any shops?",
          "Are there any shops?",
          "Do there are shops?"
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk negatif ‘There is a problem’ adalah...",
        "options": [
          "There isn't a problem.",
          "There aren't a problem.",
          "There doesn't a problem."
        ],
        "answer": 0
      }
    ]
  },
  "00-foundation/11-can-cannot": {
    "level": "Level 0 · Foundation",
    "number": "11",
    "title": "Can / Cannot",
    "intro": "Can menyatakan kemampuan, kemungkinan, atau izin sederhana. Bentuknya sama untuk semua subject dan diikuti verb dasar.",
    "focus": "can + base verb",
    "sections": [
      {
        "title": "1. Kemampuan dan izin",
        "paragraphs": [
          "Gunakan can + bentuk dasar tanpa to. Can dapat dipakai untuk kemampuan dan meminta/memberi izin dalam konteks sehari-hari."
        ],
        "examples": [
          "My sister can swim.",
          "Can I use your phone? You can sit here."
        ]
      },
      {
        "title": "2. Negatif dan pertanyaan",
        "paragraphs": [
          "Cannot/can't menyatakan tidak mampu atau tidak diizinkan. Untuk bertanya, letakkan can di depan subject."
        ],
        "examples": [
          "He can't drive. Can they join us?",
          "Jawaban singkat: Yes, I can. / No, I can't."
        ],
        "rule": "Subject + can/can't + base verb"
      }
    ],
    "checklist": [
      "Aku bisa memakai can untuk kemampuan.",
      "Aku bisa membuat pertanyaan dan negatif dengan can.",
      "Aku ingat memakai verb dasar setelah can."
    ],
    "quiz": [
      {
        "prompt": "He can ___ three languages.",
        "options": [
          "speaks",
          "speak",
          "to speak"
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk negatif can adalah...",
        "options": [
          "doesn't can",
          "can't",
          "can not to"
        ],
        "answer": 1
      },
      {
        "prompt": "___ you help me, please?",
        "options": [
          "Do",
          "Are",
          "Can"
        ],
        "answer": 2
      },
      {
        "prompt": "Pilih jawaban singkat yang tepat untuk ‘Can she cook?’",
        "options": [
          "Yes, she can.",
          "Yes, she does can.",
          "Yes, she is."
        ],
        "answer": 0
      },
      {
        "prompt": "Kalimat kemampuan yang benar adalah...",
        "options": [
          "They can play chess.",
          "They can plays chess.",
          "They can to play chess."
        ],
        "answer": 0
      }
    ]
  },
  "00-foundation/12-questions-basic": {
    "level": "Level 0 · Foundation",
    "number": "12",
    "title": "Question Forms (Basic)",
    "intro": "Pertanyaan dasar memakai pola berbeda untuk be, do/does, dan kata tanya. Temukan auxiliary verb sebelum menyusun pertanyaan.",
    "focus": "yes/no and wh- questions",
    "sections": [
      {
        "title": "1. Pertanyaan dengan be atau do/does",
        "paragraphs": [
          "Jika kalimat memakai be, pindahkan be ke depan subject. Jika memakai verb biasa, tambahkan do/does; gunakan does untuk he/she/it."
        ],
        "examples": [
          "She is ready. → Is she ready?",
          "They live here. → Do they live here? He works here. → Does he work here?"
        ]
      },
      {
        "title": "2. Wh- questions",
        "paragraphs": [
          "Tambahkan what, where, when, who, why, atau how sebelum auxiliary. Jika who adalah subject, biasanya tidak perlu do/does."
        ],
        "examples": [
          "Where do you work? How does it open?",
          "Who called you? (who adalah subject)"
        ],
        "rule": "Wh-word + auxiliary + subject + base verb?"
      }
    ],
    "checklist": [
      "Aku tahu kapan memakai be atau do/does.",
      "Aku dapat menyusun pertanyaan wh- dengan urutan kata yang benar.",
      "Aku memahami bahwa does diikuti verb dasar."
    ],
    "quiz": [
      {
        "prompt": "___ she at home?",
        "options": [
          "Does",
          "Is",
          "Do"
        ],
        "answer": 1
      },
      {
        "prompt": "___ they play tennis?",
        "options": [
          "Are",
          "Does",
          "Do"
        ],
        "answer": 2
      },
      {
        "prompt": "Where ___ your parents live?",
        "options": [
          "do",
          "does",
          "are"
        ],
        "answer": 0
      },
      {
        "prompt": "Does he ___ coffee?",
        "options": [
          "drinks",
          "drink",
          "drinking"
        ],
        "answer": 1
      },
      {
        "prompt": "Pertanyaan yang benar adalah...",
        "options": [
          "What time does the shop open?",
          "What time the shop does open?",
          "What time do the shop opens?"
        ],
        "answer": 0
      }
    ]
  },
  "01-elementary/02-past-continuous": {
    "level": "Level 1 · Elementary",
    "number": "02",
    "title": "Past Continuous",
    "intro": "Past Continuous menyoroti kegiatan yang sedang berlangsung pada waktu tertentu di masa lalu atau menjadi latar saat peristiwa lain terjadi.",
    "focus": "was/were + verb-ing",
    "sections": [
      {
        "title": "1. Bentuk dan penggunaan",
        "paragraphs": [
          "Gunakan was untuk I/he/she/it dan were untuk you/we/they, lalu verb-ing. Bentuk ini memberi gambaran kegiatan yang sedang berjalan."
        ],
        "examples": [
          "At 9 last night, I was reading.",
          "They were driving home at that time."
        ]
      },
      {
        "title": "2. Dua kejadian di masa lalu",
        "paragraphs": [
          "Past Continuous sering dipakai untuk kegiatan latar yang disela kejadian singkat dalam Past Simple. While biasanya mengenalkan kegiatan yang berlangsung; when sering mengenalkan kejadian yang menyela."
        ],
        "examples": [
          "I was cooking when the phone rang.",
          "While we were walking, it started to rain."
        ],
        "rule": "was/were + verb-ing; kejadian penyela biasanya Past Simple"
      }
    ],
    "checklist": [
      "Aku bisa memilih was atau were.",
      "Aku bisa membentuk verb-ing dengan benar.",
      "Aku bisa menggabungkan kegiatan latar dan kejadian penyela."
    ],
    "quiz": [
      {
        "prompt": "At 8 p.m., she ___ a book.",
        "options": [
          "was reading",
          "read",
          "were reading"
        ],
        "answer": 0
      },
      {
        "prompt": "They ___ when the lights went out.",
        "options": [
          "slept",
          "were sleeping",
          "was sleeping"
        ],
        "answer": 1
      },
      {
        "prompt": "I ___ dinner when you called.",
        "options": [
          "was making",
          "made",
          "were making"
        ],
        "answer": 0
      },
      {
        "prompt": "While I ___, my brother arrived.",
        "options": [
          "studied",
          "was studying",
          "were studying"
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk negatif yang benar adalah...",
        "options": [
          "He wasn't listening.",
          "He didn't listening.",
          "He weren't listening."
        ],
        "answer": 0
      }
    ]
  },
  "01-elementary/03-future-will-going-to": {
    "level": "Level 1 · Elementary",
    "number": "03",
    "title": "Future: will / going to",
    "intro": "Will dan be going to sama-sama membicarakan masa depan, tetapi pilihan sering bergantung pada apakah keputusan spontan, rencana, atau prediksi berbukti.",
    "focus": "will vs be going to",
    "sections": [
      {
        "title": "1. Will",
        "paragraphs": [
          "Gunakan will untuk keputusan spontan, tawaran, janji, atau prediksi/opini tanpa bukti langsung. Bentuknya will + verb dasar."
        ],
        "examples": [
          "The phone is ringing. I'll answer it.",
          "I think our team will win. I'll help you."
        ]
      },
      {
        "title": "2. Be going to",
        "paragraphs": [
          "Gunakan be going to untuk rencana yang sudah diputuskan atau prediksi berdasarkan tanda yang terlihat. Sesuaikan be dengan subject."
        ],
        "examples": [
          "We are going to visit Grandma on Sunday.",
          "Look at those clouds! It is going to rain."
        ],
        "rule": "will + base verb · am/is/are going to + base verb"
      }
    ],
    "checklist": [
      "Aku bisa menggunakan will untuk keputusan spontan dan janji.",
      "Aku bisa menggunakan going to untuk rencana yang sudah ada.",
      "Aku dapat membedakan prediksi opini dan prediksi berbukti."
    ],
    "quiz": [
      {
        "prompt": "The doorbell is ringing. I ___ it.",
        "options": [
          "will get",
          "am going get",
          "will getting"
        ],
        "answer": 0
      },
      {
        "prompt": "We bought the tickets yesterday. We ___ to Bali next week.",
        "options": [
          "will flying",
          "are going to fly",
          "go"
        ],
        "answer": 1
      },
      {
        "prompt": "Look at the dark sky. It ___ soon.",
        "options": [
          "is going to rain",
          "will raining",
          "is rain"
        ],
        "answer": 0
      },
      {
        "prompt": "Which form follows ‘will’?",
        "options": [
          "to + verb",
          "base verb",
          "verb-ing"
        ],
        "answer": 1
      },
      {
        "prompt": "A spontaneous offer is ‘I ___ carry that for you.’",
        "options": [
          "will",
          "am going",
          "going to"
        ],
        "answer": 0
      }
    ]
  },
  "01-elementary/04-comparatives": {
    "level": "Level 1 · Elementary",
    "number": "04",
    "title": "Comparatives & Superlatives",
    "intro": "Comparative membandingkan dua hal; superlative menunjukkan tingkat paling tinggi dalam kelompok. Bentuk adjective bergantung panjang kata dan ejaannya.",
    "focus": "-er / more; -est / most",
    "sections": [
      {
        "title": "1. Comparative",
        "paragraphs": [
          "Adjective pendek biasanya mendapat -er; adjective panjang memakai more. Gunakan than untuk menyebut pembanding."
        ],
        "examples": [
          "small → smaller than; careful → more careful than",
          "Jika berakhir consonant-vowel-consonant, gandakan consonant: big → bigger."
        ]
      },
      {
        "title": "2. Superlative dan bentuk khusus",
        "paragraphs": [
          "Adjective pendek biasanya mendapat the + -est; adjective panjang memakai the most. Bentuk irregular: good/better/the best; bad/worse/the worst."
        ],
        "examples": [
          "This is the tallest building on the street.",
          "Of the three routes, this one is the most convenient."
        ],
        "rule": "Comparative: than · Superlative: the + bentuk tertinggi"
      }
    ],
    "checklist": [
      "Aku bisa membentuk comparative adjective pendek.",
      "Aku bisa memilih more atau -er.",
      "Aku dapat memakai superlative dan mengenali bentuk irregular."
    ],
    "quiz": [
      {
        "prompt": "The blue bag is ___ than the red one. (cheap)",
        "options": [
          "cheaper",
          "cheapest",
          "more cheap"
        ],
        "answer": 0
      },
      {
        "prompt": "This puzzle is ___ than I expected. (difficult)",
        "options": [
          "difficulter",
          "more difficult",
          "most difficult"
        ],
        "answer": 1
      },
      {
        "prompt": "Mount Everest is ___ mountain in the world.",
        "options": [
          "higher",
          "the highest",
          "the most high"
        ],
        "answer": 1
      },
      {
        "prompt": "Good → comparative adalah...",
        "options": [
          "gooder",
          "better",
          "best"
        ],
        "answer": 1
      },
      {
        "prompt": "My room is ___ than yours. (big)",
        "options": [
          "biger",
          "bigger",
          "the biggest"
        ],
        "answer": 1
      }
    ]
  },
  "01-elementary/05-quantifiers": {
    "level": "Level 1 · Elementary",
    "number": "05",
    "title": "Quantifiers",
    "intro": "Quantifiers menunjukkan jumlah atau banyaknya sesuatu. Pilihannya bergantung pada noun yang dapat dihitung atau tak terhitung.",
    "focus": "some, any, much, many, a lot of",
    "sections": [
      {
        "title": "1. Countable dan uncountable",
        "paragraphs": [
          "Many dipakai dengan noun plural yang dapat dihitung; much dengan noun tak terhitung. A lot of dapat dipakai untuk keduanya, terutama dalam percakapan."
        ],
        "examples": [
          "many books; much time; a lot of people / a lot of water",
          "How many chairs? How much sugar?"
        ]
      },
      {
        "title": "2. Some, any, few, little",
        "paragraphs": [
          "Some lazim pada pernyataan dan tawaran; any sering muncul pada pertanyaan/negatif. Few/little berarti hampir tidak ada; a few/a little berarti ada sejumlah kecil."
        ],
        "examples": [
          "There are a few apples. We have little time.",
          "Would you like some tea? I don't have any money."
        ],
        "rule": "many + countable plural · much + uncountable"
      }
    ],
    "checklist": [
      "Aku dapat membedakan countable dan uncountable noun.",
      "Aku bisa memilih many atau much.",
      "Aku memahami perbedaan few/little dengan a few/a little."
    ],
    "quiz": [
      {
        "prompt": "How ___ students are in the class?",
        "options": [
          "much",
          "many",
          "little"
        ],
        "answer": 1
      },
      {
        "prompt": "We don't have ___ milk.",
        "options": [
          "many",
          "much",
          "a few"
        ],
        "answer": 1
      },
      {
        "prompt": "There are ___ cookies left: enough for everyone.",
        "options": [
          "a few",
          "a little",
          "much"
        ],
        "answer": 0
      },
      {
        "prompt": "Would you like ___ coffee?",
        "options": [
          "some",
          "many",
          "few"
        ],
        "answer": 0
      },
      {
        "prompt": "‘Little time’ biasanya berarti...",
        "options": [
          "waktu yang sangat sedikit",
          "banyak waktu",
          "beberapa jam yang pasti"
        ],
        "answer": 0
      }
    ]
  },
  "01-elementary/06-modals-basic": {
    "level": "Level 1 · Elementary",
    "number": "06",
    "title": "Modals (Basic)",
    "intro": "Modal verbs menambahkan makna kemampuan, kewajiban, saran, atau izin. Modal diikuti verb dasar tanpa to.",
    "focus": "can, must, should, may",
    "sections": [
      {
        "title": "1. Arti umum modal",
        "paragraphs": [
          "Can menyatakan kemampuan/izin; must kewajiban kuat; should saran; may izin atau kemungkinan formal. Makna tepat tetap bergantung konteks."
        ],
        "examples": [
          "You should rest. (saran)",
          "Visitors must wear a badge. (aturan)"
        ]
      },
      {
        "title": "2. Bentuk grammar",
        "paragraphs": [
          "Modal tidak berubah menurut subject. Jangan tambahkan -s pada verb sesudahnya. Negatif memakai not; pertanyaan menempatkan modal di depan subject."
        ],
        "examples": [
          "She can speak French. Can she speak French?",
          "You shouldn't park here."
        ],
        "rule": "Subject + modal + base verb"
      }
    ],
    "checklist": [
      "Aku mengenali makna can, must, should, dan may.",
      "Aku ingat memakai verb dasar setelah modal.",
      "Aku bisa membuat pertanyaan dan negatif dengan modal."
    ],
    "quiz": [
      {
        "prompt": "You ___ wear a helmet on this site. It is required.",
        "options": [
          "must",
          "might",
          "could"
        ],
        "answer": 0
      },
      {
        "prompt": "You look tired. You ___ get some rest.",
        "options": [
          "should",
          "mustn't",
          "may not"
        ],
        "answer": 0
      },
      {
        "prompt": "She can ___ the piano.",
        "options": [
          "plays",
          "play",
          "to play"
        ],
        "answer": 1
      },
      {
        "prompt": "___ I borrow your pen, please?",
        "options": [
          "May",
          "Am",
          "Do"
        ],
        "answer": 0
      },
      {
        "prompt": "Bentuk negatif should adalah...",
        "options": [
          "shouldn't",
          "doesn't should",
          "shouldn't to"
        ],
        "answer": 0
      }
    ]
  },
  "01-elementary/07-adverbs-frequency": {
    "level": "Level 1 · Elementary",
    "number": "07",
    "title": "Adverbs of Frequency",
    "intro": "Adverbs of frequency menyatakan seberapa sering suatu hal terjadi. Posisi biasanya sebelum main verb, tetapi sesudah be.",
    "focus": "always to never; word order",
    "sections": [
      {
        "title": "1. Tingkat frekuensi",
        "paragraphs": [
          "Always, usually, often, sometimes, rarely, dan never bergerak dari paling sering ke tidak pernah. Posisi umum di antara subject dan main verb."
        ],
        "examples": [
          "I usually take the train.",
          "They never eat meat."
        ]
      },
      {
        "title": "2. Posisi dalam kalimat",
        "paragraphs": [
          "Dengan be, letakkan adverb setelah be. Dalam kalimat dengan auxiliary, adverb biasanya diletakkan setelah auxiliary pertama."
        ],
        "examples": [
          "She is always polite.",
          "We have never visited Japan."
        ],
        "rule": "main verb: sebelum verb · be: sesudah be"
      }
    ],
    "checklist": [
      "Aku memahami urutan adverb dari always sampai never.",
      "Aku menempatkan adverb sebelum main verb.",
      "Aku menempatkan adverb sesudah be."
    ],
    "quiz": [
      {
        "prompt": "He ___ drinks coffee in the morning. (rutin)",
        "options": [
          "usually",
          "is usually",
          "usual"
        ],
        "answer": 0
      },
      {
        "prompt": "They are ___ late for class.",
        "options": [
          "often",
          "often are",
          "be often"
        ],
        "answer": 0
      },
      {
        "prompt": "She ___ forgets her keys. (tidak pernah)",
        "options": [
          "never",
          "is never",
          "never is"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih urutan yang benar.",
        "options": [
          "We eat often out.",
          "We often eat out.",
          "Often we are eat out."
        ],
        "answer": 1
      },
      {
        "prompt": "Dengan be, frequency adverb biasanya diletakkan...",
        "options": [
          "sebelum subject",
          "sesudah be",
          "setelah object"
        ],
        "answer": 1
      }
    ]
  },
  "01-elementary/08-present-perfect-intro": {
    "level": "Level 1 · Elementary",
    "number": "08",
    "title": "Present Perfect (Intro)",
    "intro": "Present Perfect menghubungkan pengalaman atau kejadian lampau dengan waktu sekarang. Bentuknya have/has + past participle.",
    "focus": "have/has + V3",
    "sections": [
      {
        "title": "1. Pengalaman dan hasil",
        "paragraphs": [
          "Gunakan Present Perfect untuk pengalaman tanpa waktu spesifik, atau hasil lampau yang relevan sekarang. Have untuk I/you/we/they; has untuk he/she/it."
        ],
        "examples": [
          "I have visited Singapore twice.",
          "She has lost her key. (Kuncinya masih hilang.)"
        ]
      },
      {
        "title": "2. Kata ever, never, just",
        "paragraphs": [
          "Ever sering dipakai dalam pertanyaan pengalaman; never menyatakan belum pernah; just menyatakan baru saja. Jangan gunakan waktu lampau yang selesai seperti yesterday dengan Present Perfect."
        ],
        "examples": [
          "Have you ever tried sushi?",
          "He has just arrived. I saw her yesterday. (Past Simple)"
        ],
        "rule": "Subject + have/has + past participle"
      }
    ],
    "checklist": [
      "Aku bisa membentuk have/has + V3.",
      "Aku dapat membedakan pengalaman dari waktu lampau spesifik.",
      "Aku mengenali ever, never, dan just."
    ],
    "quiz": [
      {
        "prompt": "She ___ finished her homework.",
        "options": [
          "have",
          "has",
          "is"
        ],
        "answer": 1
      },
      {
        "prompt": "We have ___ that museum before.",
        "options": [
          "visit",
          "visited",
          "visiting"
        ],
        "answer": 1
      },
      {
        "prompt": "___ you ever eaten Korean food?",
        "options": [
          "Did",
          "Have",
          "Are"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih kalimat Present Perfect yang tepat.",
        "options": [
          "I have seen him yesterday.",
          "I have seen him before.",
          "I saw him before now yesterday."
        ],
        "answer": 1
      },
      {
        "prompt": "He has ___ arrived. He is here now.",
        "options": [
          "just",
          "ago",
          "last"
        ],
        "answer": 0
      }
    ]
  },
  "01-elementary/09-prepositions-advanced": {
    "level": "Level 1 · Elementary",
    "number": "09",
    "title": "Prepositions (Advanced)",
    "intro": "Preposisi lanjutan sering mengikuti adjective atau verb tertentu. Pelajari sebagai pasangan kata, bukan dengan menerjemahkan satu per satu.",
    "focus": "dependent prepositions",
    "sections": [
      {
        "title": "1. Adjective + preposition",
        "paragraphs": [
          "Beberapa adjective memiliki pasangan preposition yang lazim. Pola ini relatif tetap dan sebaiknya dipelajari bersama contoh."
        ],
        "examples": [
          "interested in music; good at maths; afraid of dogs",
          "similar to mine; responsible for the project"
        ]
      },
      {
        "title": "2. Verb + preposition",
        "paragraphs": [
          "Verb tertentu membutuhkan preposition untuk melengkapi maknanya. Preposition tetap diikuti noun/pronoun atau verb-ing."
        ],
        "examples": [
          "listen to music; depend on the weather; wait for us",
          "She apologized for being late."
        ],
        "rule": "adjective/verb + pasangan preposition + noun atau verb-ing"
      }
    ],
    "checklist": [
      "Aku bisa mengenali adjective yang memiliki preposition tetap.",
      "Aku dapat memakai pasangan verb + preposition.",
      "Aku tahu bahwa preposition diikuti noun atau verb-ing."
    ],
    "quiz": [
      {
        "prompt": "I'm interested ___ photography.",
        "options": [
          "on",
          "in",
          "at"
        ],
        "answer": 1
      },
      {
        "prompt": "He is good ___ solving puzzles.",
        "options": [
          "at",
          "in",
          "for"
        ],
        "answer": 0
      },
      {
        "prompt": "It depends ___ the final schedule.",
        "options": [
          "of",
          "on",
          "to"
        ],
        "answer": 1
      },
      {
        "prompt": "She apologized ___ arriving late.",
        "options": [
          "for",
          "to",
          "with"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih pasangan yang lazim.",
        "options": [
          "listen to",
          "listen at",
          "listen for to"
        ],
        "answer": 0
      }
    ]
  },
  "01-elementary/10-conjunctions-basic": {
    "level": "Level 1 · Elementary",
    "number": "10",
    "title": "Conjunctions (Basic)",
    "intro": "Conjunctions menghubungkan kata, frasa, atau klausa. Pilih penghubung sesuai hubungan makna, lalu jaga struktur kedua klausa.",
    "focus": "and, but, or, because, so",
    "sections": [
      {
        "title": "1. Menghubungkan gagasan setara",
        "paragraphs": [
          "And menambah informasi; but menunjukkan kontras; or menawarkan pilihan. Ketiganya dapat menghubungkan unsur yang setara."
        ],
        "examples": [
          "I bought apples and oranges.",
          "We wanted to walk, but it was raining."
        ]
      },
      {
        "title": "2. Sebab dan hasil",
        "paragraphs": [
          "Because mengenalkan alasan; so mengenalkan hasil. Hindari memakai keduanya sekaligus untuk hubungan yang sama dalam satu klausa."
        ],
        "examples": [
          "We stayed home because it was raining.",
          "It was raining, so we stayed home."
        ],
        "rule": "because + sebab · so + hasil"
      }
    ],
    "checklist": [
      "Aku dapat memilih and, but, atau or berdasarkan makna.",
      "Aku dapat menghubungkan sebab dengan because.",
      "Aku dapat menunjukkan hasil dengan so."
    ],
    "quiz": [
      {
        "prompt": "I like tea ___ I don't like coffee.",
        "options": [
          "but",
          "because",
          "or"
        ],
        "answer": 0
      },
      {
        "prompt": "Would you like rice ___ noodles?",
        "options": [
          "and",
          "or",
          "so"
        ],
        "answer": 1
      },
      {
        "prompt": "We left early ___ the roads were busy.",
        "options": [
          "because",
          "so",
          "but"
        ],
        "answer": 0
      },
      {
        "prompt": "The roads were busy, ___ we left early.",
        "options": [
          "because",
          "so",
          "or"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih kalimat yang benar.",
        "options": [
          "Because it rained, so we stayed home.",
          "Because it rained, we stayed home.",
          "It rained because, we stayed home."
        ],
        "answer": 1
      }
    ]
  },
  "02-intermediate/01-present-perfect-vs-past": {
    "level": "Level 2 · Intermediate",
    "number": "01",
    "title": "Present Perfect vs Past Simple",
    "intro": "Present Perfect menghubungkan pengalaman atau hasil dengan sekarang; Past Simple menempatkan kejadian pada waktu lampau yang selesai.",
    "focus": "unfinished relevance vs finished past",
    "sections": [
      {
        "title": "1. Present Perfect",
        "paragraphs": [
          "Gunakan have/has + V3 untuk pengalaman tanpa waktu spesifik, hasil yang masih relevan, atau periode yang belum selesai."
        ],
        "examples": [
          "I have visited Bali twice.",
          "She has worked here since March. (masih bekerja)"
        ]
      },
      {
        "title": "2. Past Simple",
        "paragraphs": [
          "Gunakan Past Simple jika waktu lampau sudah selesai atau disebut secara spesifik. Yesterday, last year, dan in 2020 biasanya meminta Past Simple."
        ],
        "examples": [
          "I visited Bali in 2022.",
          "Did you call him last night? Bukan: Have you called him last night."
        ],
        "rule": "finished time → Past Simple · waktu tak spesifik/relevansi kini → Present Perfect"
      }
    ],
    "checklist": [
      "Aku membentuk kedua tense dengan benar.",
      "Aku mengenali penanda waktu yang sudah selesai.",
      "Aku dapat memilih tense menurut makna konteks."
    ],
    "quiz": [
      {
        "prompt": "I ___ that film twice. (pengalaman, waktu tidak disebut)",
        "options": [
          "have seen",
          "saw yesterday",
          "see"
        ],
        "answer": 0
      },
      {
        "prompt": "We ___ in Surabaya in 2019.",
        "options": [
          "have lived",
          "lived",
          "live"
        ],
        "answer": 1
      },
      {
        "prompt": "Have you ever ___ snow?",
        "options": [
          "saw",
          "see",
          "seen"
        ],
        "answer": 2
      },
      {
        "prompt": "She ___ her keys, so she can't open the door.",
        "options": [
          "has lost",
          "lost last week",
          "loses yesterday"
        ],
        "answer": 0
      },
      {
        "prompt": "Penanda ‘last month’ biasanya dipakai dengan...",
        "options": [
          "Present Perfect",
          "Past Simple",
          "Present Continuous"
        ],
        "answer": 1
      }
    ]
  },
  "02-intermediate/02-present-perfect-continuous": {
    "level": "Level 2 · Intermediate",
    "number": "02",
    "title": "Present Perfect Continuous",
    "intro": "Present Perfect Continuous menekankan durasi atau aktivitas yang berlangsung dari masa lalu hingga sekarang, atau baru saja berhenti dengan bukti saat ini.",
    "focus": "have/has been + verb-ing",
    "sections": [
      {
        "title": "1. Bentuk dan durasi",
        "paragraphs": [
          "Gunakan have/has been + verb-ing. For menyatakan durasi; since menyatakan titik awal."
        ],
        "examples": [
          "They have been waiting for an hour.",
          "I have been learning English since January."
        ]
      },
      {
        "title": "2. Aktivitas dan hasil yang terlihat",
        "paragraphs": [
          "Tense ini menonjolkan proses, bukan jumlah hasil. Stative verbs seperti know dan own biasanya tidak dipakai dalam bentuk continuous."
        ],
        "examples": [
          "Your hands are dirty. Have you been gardening?",
          "I have known her for years. (bukan have been knowing)"
        ],
        "rule": "Subject + have/has been + verb-ing"
      }
    ],
    "checklist": [
      "Aku dapat membentuk have/has been + verb-ing.",
      "Aku membedakan for (durasi) dan since (titik awal).",
      "Aku mengenali verb keadaan yang biasanya tidak continuous."
    ],
    "quiz": [
      {
        "prompt": "She ___ for the bus for twenty minutes.",
        "options": [
          "has been waiting",
          "is waited",
          "have been waiting"
        ],
        "answer": 0
      },
      {
        "prompt": "They have been friends ___ 2018.",
        "options": [
          "for",
          "since",
          "during"
        ],
        "answer": 1
      },
      {
        "prompt": "We ___ all morning, so we need a break.",
        "options": [
          "have been working",
          "are work",
          "has been working"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih bentuk yang paling wajar.",
        "options": [
          "I have been owning this car for years.",
          "I have owned this car for years.",
          "I am owning this car for years."
        ],
        "answer": 1
      },
      {
        "prompt": "For digunakan untuk menyatakan...",
        "options": [
          "titik awal",
          "durasi",
          "waktu selesai"
        ],
        "answer": 1
      }
    ]
  },
  "02-intermediate/03-past-perfect": {
    "level": "Level 2 · Intermediate",
    "number": "03",
    "title": "Past Perfect",
    "intro": "Past Perfect menandai kejadian yang lebih dulu terjadi sebelum titik atau kejadian lain di masa lalu.",
    "focus": "had + past participle",
    "sections": [
      {
        "title": "1. Urutan dua kejadian lampau",
        "paragraphs": [
          "Gunakan had + V3 untuk kejadian yang lebih awal; kejadian yang lebih kemudian biasanya memakai Past Simple."
        ],
        "examples": [
          "The train had left before we reached the station.",
          "She had finished dinner when I arrived."
        ]
      },
      {
        "title": "2. Kapan diperlukan?",
        "paragraphs": [
          "Past Perfect membantu memperjelas urutan, terutama ketika urutannya tidak jelas dari konteks. Tidak perlu memakainya untuk setiap kejadian lampau."
        ],
        "examples": [
          "I realized that I had forgotten my wallet.",
          "After he had called, he sent an email."
        ],
        "rule": "kejadian lebih awal: had + V3 · kejadian berikutnya: Past Simple"
      }
    ],
    "checklist": [
      "Aku bisa membentuk had + V3.",
      "Aku dapat menentukan kejadian yang lebih dahulu.",
      "Aku tidak memakai Past Perfect secara berlebihan."
    ],
    "quiz": [
      {
        "prompt": "By the time we arrived, the film ___.",
        "options": [
          "started",
          "had started",
          "has started"
        ],
        "answer": 1
      },
      {
        "prompt": "She ___ the report before the meeting began.",
        "options": [
          "had written",
          "has written",
          "writes"
        ],
        "answer": 0
      },
      {
        "prompt": "Past participle dari ‘go’ adalah...",
        "options": [
          "went",
          "gone",
          "going"
        ],
        "answer": 1
      },
      {
        "prompt": "I couldn't enter because I ___ my key.",
        "options": [
          "had lost",
          "have lose",
          "was lose"
        ],
        "answer": 0
      },
      {
        "prompt": "Past Perfect terutama menandai...",
        "options": [
          "kebiasaan sekarang",
          "kejadian sebelum titik lampau lain",
          "rencana masa depan"
        ],
        "answer": 1
      }
    ]
  },
  "02-intermediate/05-conditionals-1-2": {
    "level": "Level 2 · Intermediate",
    "number": "05",
    "title": "Conditional Type 1 & 2",
    "intro": "Type 1 membahas kemungkinan nyata di masa depan; type 2 membayangkan situasi sekarang atau masa depan yang tidak nyata/kurang mungkin.",
    "focus": "if + present/past",
    "sections": [
      {
        "title": "1. Conditional type 1",
        "paragraphs": [
          "Gunakan if + Present Simple untuk kondisi yang mungkin terjadi, lalu will + verb dasar untuk hasilnya. Jangan menaruh will di klausa if."
        ],
        "examples": [
          "If it rains, we will stay home.",
          "If you study, you will improve."
        ]
      },
      {
        "title": "2. Conditional type 2",
        "paragraphs": [
          "Gunakan if + Past Simple dan would + verb dasar untuk situasi hipotetis. Were lazim dipakai untuk semua subject dalam gaya formal."
        ],
        "examples": [
          "If I had more time, I would travel.",
          "If she were here, she would know what to do."
        ],
        "rule": "Type 1: if + present, will + base · Type 2: if + past, would + base"
      }
    ],
    "checklist": [
      "Aku dapat membedakan kemungkinan nyata dan hipotetis.",
      "Aku memilih bentuk verb yang tepat pada kedua klausa.",
      "Aku ingat tidak memakai will setelah if."
    ],
    "quiz": [
      {
        "prompt": "If you ___ now, you will catch the bus.",
        "options": [
          "leave",
          "will leave",
          "left"
        ],
        "answer": 0
      },
      {
        "prompt": "If I ___ rich, I would buy a house by the sea.",
        "options": [
          "am",
          "were",
          "will be"
        ],
        "answer": 1
      },
      {
        "prompt": "If she studies tonight, she ___ ready tomorrow.",
        "options": [
          "would be",
          "will be",
          "is being"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih conditional type 2 yang benar.",
        "options": [
          "If he has time, he would help.",
          "If he had time, he would help.",
          "If he will have time, he helps."
        ],
        "answer": 1
      },
      {
        "prompt": "Dalam klausa if type 1, gunakan...",
        "options": [
          "will + verb",
          "Present Simple",
          "would + verb"
        ],
        "answer": 1
      }
    ]
  },
  "02-intermediate/06-relative-clauses": {
    "level": "Level 2 · Intermediate",
    "number": "06",
    "title": "Relative Clauses",
    "intro": "Relative clause memberi informasi tentang noun. Relative pronoun dipilih berdasarkan apakah yang dijelaskan orang, benda, kepemilikan, atau tempat.",
    "focus": "who, which, that, whose, where",
    "sections": [
      {
        "title": "1. Defining relative clauses",
        "paragraphs": [
          "Informasi defining diperlukan untuk mengenali noun dan tidak dipisahkan dengan koma. Who untuk orang; which untuk benda; that dapat dipakai untuk orang/benda dalam defining clause."
        ],
        "examples": [
          "The woman who called you is my manager.",
          "This is the book that I mentioned."
        ]
      },
      {
        "title": "2. Informasi tambahan",
        "paragraphs": [
          "Whose menunjukkan kepemilikan; where menunjukkan tempat. Non-defining clause memberi informasi tambahan, memakai koma, dan tidak menggunakan that."
        ],
        "examples": [
          "The student whose bag was lost reported it.",
          "My car, which I bought last year, is electric."
        ],
        "rule": "who = orang · which = benda · whose = kepemilikan · where = tempat"
      }
    ],
    "checklist": [
      "Aku dapat memilih relative pronoun sesuai noun.",
      "Aku membedakan informasi defining dan tambahan.",
      "Aku tahu that tidak digunakan pada non-defining clause."
    ],
    "quiz": [
      {
        "prompt": "The teacher ___ helped me was kind.",
        "options": [
          "who",
          "where",
          "whose"
        ],
        "answer": 0
      },
      {
        "prompt": "This is the café ___ we first met.",
        "options": [
          "which",
          "where",
          "whose"
        ],
        "answer": 1
      },
      {
        "prompt": "The laptop ___ I bought is lightweight.",
        "options": [
          "who",
          "that",
          "where"
        ],
        "answer": 1
      },
      {
        "prompt": "The writer, ___ lives in Toronto, won an award.",
        "options": [
          "that",
          "who",
          "where"
        ],
        "answer": 1
      },
      {
        "prompt": "The girl ___ bicycle was stolen called the police.",
        "options": [
          "whose",
          "who",
          "which"
        ],
        "answer": 0
      }
    ]
  },
  "02-intermediate/07-reported-speech-basic": {
    "level": "Level 2 · Intermediate",
    "number": "07",
    "title": "Reported Speech (Basic)",
    "intro": "Reported speech menyampaikan kembali ucapan tanpa mengutip kata persis. Pronoun, tense, dan penanda waktu dapat berubah mengikuti konteks pelaporan.",
    "focus": "say/tell and backshift",
    "sections": [
      {
        "title": "1. Statements dan backshift",
        "paragraphs": [
          "Gunakan said (that) untuk melaporkan pernyataan. Jika reporting verb di masa lalu, present sering bergeser ke past; past bergeser ke past perfect."
        ],
        "examples": [
          "“I am tired.” → She said (that) she was tired.",
          "“We live here.” → They said they lived there."
        ]
      },
      {
        "title": "2. Say dan tell",
        "paragraphs": [
          "Tell biasanya diikuti object (tell me/us), sedangkan say tidak langsung memakai object tanpa to. Penanda waktu seperti today dapat berubah menjadi that day jika konteks menuntut."
        ],
        "examples": [
          "He told me that he was busy.",
          "She said that she would call the next day."
        ],
        "rule": "say something · tell someone something"
      }
    ],
    "checklist": [
      "Aku dapat memilih say atau tell dengan struktur benar.",
      "Aku memahami backshift dasar.",
      "Aku bisa menyesuaikan pronoun dan penanda waktu."
    ],
    "quiz": [
      {
        "prompt": "“I am busy.” → He said he ___ busy.",
        "options": [
          "is",
          "was",
          "has been"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih struktur yang benar.",
        "options": [
          "She told that she was tired.",
          "She told me that she was tired.",
          "She said me she was tired."
        ],
        "answer": 1
      },
      {
        "prompt": "“We live here.” → They said they ___ there.",
        "options": [
          "lived",
          "live",
          "have live"
        ],
        "answer": 0
      },
      {
        "prompt": "“I will call tomorrow.” → He said he would call...",
        "options": [
          "tomorrow",
          "the next day",
          "yesterday"
        ],
        "answer": 1
      },
      {
        "prompt": "Bentuk lampau ‘said’ digunakan untuk melaporkan...",
        "options": [
          "ucapan",
          "perintah saja",
          "pertanyaan yes/no saja"
        ],
        "answer": 0
      }
    ]
  },
  "02-intermediate/08-gerund-infinitive": {
    "level": "Level 2 · Intermediate",
    "number": "08",
    "title": "Gerund vs Infinitive",
    "intro": "Gerund adalah verb-ing yang berfungsi seperti noun; infinitive adalah to + verb dasar. Verb tertentu menentukan bentuk yang mengikutinya.",
    "focus": "verb patterns",
    "sections": [
      {
        "title": "1. Verb + gerund",
        "paragraphs": [
          "Beberapa verb lazim diikuti gerund, misalnya enjoy, avoid, finish, dan suggest."
        ],
        "examples": [
          "She enjoys painting.",
          "They avoided discussing the issue."
        ]
      },
      {
        "title": "2. Verb + infinitive",
        "paragraphs": [
          "Verb seperti want, decide, hope, dan plan biasanya diikuti to-infinitive. Pelajari pola bersama verb utamanya."
        ],
        "examples": [
          "We decided to leave early.",
          "He hopes to study abroad."
        ],
        "rule": "enjoy/avoid + verb-ing · want/decide + to + base verb"
      }
    ],
    "checklist": [
      "Aku dapat mengenali verb yang diikuti gerund.",
      "Aku dapat mengenali verb yang diikuti to-infinitive.",
      "Aku memeriksa pola setelah verb utama."
    ],
    "quiz": [
      {
        "prompt": "They enjoy ___ in the sea.",
        "options": [
          "swim",
          "swimming",
          "to swimming"
        ],
        "answer": 1
      },
      {
        "prompt": "I decided ___ a taxi.",
        "options": [
          "taking",
          "take",
          "to take"
        ],
        "answer": 2
      },
      {
        "prompt": "She avoids ___ late.",
        "options": [
          "to arrive",
          "arriving",
          "arrive"
        ],
        "answer": 1
      },
      {
        "prompt": "We hope ___ you soon.",
        "options": [
          "see",
          "seeing",
          "to see"
        ],
        "answer": 2
      },
      {
        "prompt": "Pola umum setelah ‘finish’ adalah...",
        "options": [
          "gerund",
          "to-infinitive",
          "bare infinitive"
        ],
        "answer": 0
      }
    ]
  },
  "02-intermediate/09-modals-possibility": {
    "level": "Level 2 · Intermediate",
    "number": "09",
    "title": "Modals of Possibility",
    "intro": "May, might, dan could menyatakan kemungkinan. Must dan can't dapat menunjukkan kesimpulan logis yang kuat berdasarkan bukti.",
    "focus": "degrees of possibility",
    "sections": [
      {
        "title": "1. Kemungkinan",
        "paragraphs": [
          "May, might, dan could menyatakan bahwa sesuatu mungkin terjadi; might sering terdengar lebih tidak pasti, tetapi tingkatnya bergantung konteks."
        ],
        "examples": [
          "It may rain this afternoon.",
          "She could be on the train; her phone is off."
        ]
      },
      {
        "title": "2. Kesimpulan dari bukti",
        "paragraphs": [
          "Must dapat menyatakan kesimpulan yang sangat mungkin; can't menyatakan sesuatu hampir pasti tidak benar. Modal diikuti verb dasar atau be + pelengkap."
        ],
        "examples": [
          "The lights are on. They must be home.",
          "He can't be asleep; I can hear him."
        ],
        "rule": "modal + base verb · modal + be + adjective/noun"
      }
    ],
    "checklist": [
      "Aku dapat memakai may/might/could untuk kemungkinan.",
      "Aku memahami must/can't sebagai kesimpulan logis.",
      "Aku memakai bentuk verb yang benar setelah modal."
    ],
    "quiz": [
      {
        "prompt": "Take an umbrella. It ___ rain later.",
        "options": [
          "might",
          "mustn't",
          "can't"
        ],
        "answer": 0
      },
      {
        "prompt": "The office is dark and locked. They ___ be there now.",
        "options": [
          "must",
          "can't",
          "may not to"
        ],
        "answer": 1
      },
      {
        "prompt": "She knows every answer. She ___ be well prepared.",
        "options": [
          "must",
          "couldn't",
          "can't not"
        ],
        "answer": 0
      },
      {
        "prompt": "Bentuk yang benar adalah...",
        "options": [
          "He might comes late.",
          "He might come late.",
          "He might to come late."
        ],
        "answer": 1
      },
      {
        "prompt": "Modal yang menyatakan kesimpulan sangat kuat adalah...",
        "options": [
          "must",
          "might",
          "could"
        ],
        "answer": 0
      }
    ]
  },
  "02-intermediate/10-phrasal-verbs-basic": {
    "level": "Level 2 · Intermediate",
    "number": "10",
    "title": "Phrasal Verbs (Basic)",
    "intro": "Phrasal verb menggabungkan verb dengan particle seperti up, off, atau out. Maknanya sering berbeda dari arti kata secara terpisah.",
    "focus": "verb + particle",
    "sections": [
      {
        "title": "1. Makna dalam konteks",
        "paragraphs": [
          "Pelajari phrasal verb bersama arti dan contoh. Banyak yang memiliki makna idiomatis."
        ],
        "examples": [
          "turn off = mematikan: Please turn off the lights.",
          "find out = mengetahui: We found out the answer."
        ]
      },
      {
        "title": "2. Separable dan inseparable",
        "paragraphs": [
          "Object pada phrasal verb separable dapat diletakkan sebelum atau sesudah particle; jika object berupa pronoun, letakkan di tengah. Inseparable tidak dipisah."
        ],
        "examples": [
          "Turn the TV off. / Turn it off.",
          "look after the child (tidak: look the child after)."
        ],
        "rule": "pronoun pada phrasal verb separable berada di antara verb dan particle"
      }
    ],
    "checklist": [
      "Aku dapat memahami makna phrasal verb dari konteks.",
      "Aku dapat membedakan phrasal verb separable dan inseparable.",
      "Aku menempatkan pronoun pada posisi yang benar."
    ],
    "quiz": [
      {
        "prompt": "Please ___ your shoes before entering.",
        "options": [
          "take off",
          "take after",
          "take in"
        ],
        "answer": 0
      },
      {
        "prompt": "Ganti ‘turn off the radio’ dengan pronoun.",
        "options": [
          "turn off it",
          "turn it off",
          "it turn off"
        ],
        "answer": 1
      },
      {
        "prompt": "‘Find out’ paling dekat artinya dengan...",
        "options": [
          "menemukan informasi",
          "menjaga seseorang",
          "memakai pakaian"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih phrasal verb untuk merawat anak.",
        "options": [
          "look up",
          "look after",
          "look out"
        ],
        "answer": 1
      },
      {
        "prompt": "Phrasal verb inseparable berarti...",
        "options": [
          "particle selalu hilang",
          "verb dan particle tidak dipisah object",
          "verb berubah menjadi noun"
        ],
        "answer": 1
      }
    ]
  },
  "02-intermediate/11-question-tags": {
    "level": "Level 2 · Intermediate",
    "number": "11",
    "title": "Question Tags",
    "intro": "Question tag adalah pertanyaan pendek di akhir pernyataan untuk memastikan informasi atau mengundang respons.",
    "focus": "auxiliary + pronoun",
    "sections": [
      {
        "title": "1. Polaritas berlawanan",
        "paragraphs": [
          "Pernyataan positif biasanya diikuti tag negatif; pernyataan negatif diikuti tag positif. Gunakan auxiliary yang sama dan pronoun untuk subject."
        ],
        "examples": [
          "You are ready, aren't you?",
          "She doesn't drive, does she?"
        ]
      },
      {
        "title": "2. Pilih auxiliary yang tepat",
        "paragraphs": [
          "Jika tidak ada auxiliary, gunakan do/does/did. Untuk I am, bentuk tag lazimnya aren't I? Intonasi naik meminta konfirmasi; intonasi turun lebih menunjukkan keyakinan."
        ],
        "examples": [
          "They left early, didn't they?",
          "I'm next, aren't I?"
        ],
        "rule": "positive statement + negative tag · negative statement + positive tag"
      }
    ],
    "checklist": [
      "Aku bisa membalik polaritas pernyataan dan tag.",
      "Aku memilih auxiliary dan pronoun yang sesuai.",
      "Aku memahami fungsi intonasi tag."
    ],
    "quiz": [
      {
        "prompt": "You are coming, ___?",
        "options": [
          "are you",
          "aren't you",
          "don't you"
        ],
        "answer": 1
      },
      {
        "prompt": "He doesn't eat meat, ___?",
        "options": [
          "does he",
          "doesn't he",
          "is he"
        ],
        "answer": 0
      },
      {
        "prompt": "They visited Rome, ___?",
        "options": [
          "didn't they",
          "weren't they",
          "don't they"
        ],
        "answer": 0
      },
      {
        "prompt": "I'm late, ___?",
        "options": [
          "am I",
          "aren't I",
          "don't I"
        ],
        "answer": 1
      },
      {
        "prompt": "Tag untuk pernyataan positif biasanya...",
        "options": [
          "positif",
          "negatif",
          "tanpa auxiliary"
        ],
        "answer": 1
      }
    ]
  },
  "02-intermediate/12-used-to-would": {
    "level": "Level 2 · Intermediate",
    "number": "12",
    "title": "Used to / Would",
    "intro": "Used to dan would dapat menceritakan kebiasaan masa lalu. Used to juga menyatakan keadaan masa lalu yang sekarang sudah berubah.",
    "focus": "past habits and states",
    "sections": [
      {
        "title": "1. Used to",
        "paragraphs": [
          "Gunakan used to + base verb untuk kebiasaan atau keadaan lampau yang tidak lagi benar. Bentuk negatif dan pertanyaan memakai did + use to."
        ],
        "examples": [
          "I used to live near the beach.",
          "Did you use to play tennis? She didn't use to like coffee."
        ]
      },
      {
        "title": "2. Would untuk kebiasaan",
        "paragraphs": [
          "Would + base verb dapat menceritakan tindakan berulang di masa lalu, biasanya setelah konteks masa lalu jelas. Umumnya tidak dipakai untuk keadaan seperti know atau live."
        ],
        "examples": [
          "Every summer, we would visit our cousins.",
          "I used to know him. (bukan: I would know him, untuk keadaan dulu)"
        ],
        "rule": "past state/change: used to · repeated past action: used to atau would"
      }
    ],
    "checklist": [
      "Aku bisa memakai used to untuk kebiasaan dan keadaan lampau.",
      "Aku dapat membentuk pertanyaan dengan did ... use to.",
      "Aku tahu batas penggunaan would untuk keadaan."
    ],
    "quiz": [
      {
        "prompt": "I ___ have long hair, but now it's short.",
        "options": [
          "used to",
          "would to",
          "use"
        ],
        "answer": 0
      },
      {
        "prompt": "Did they ___ live here?",
        "options": [
          "used to",
          "use to",
          "would"
        ],
        "answer": 1
      },
      {
        "prompt": "Every winter, we ___ go skating.",
        "options": [
          "would",
          "would to",
          "were"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih bentuk yang wajar untuk keadaan lampau.",
        "options": [
          "She would own a small shop.",
          "She used to own a small shop.",
          "She would to own a small shop."
        ],
        "answer": 1
      },
      {
        "prompt": "Setelah did, bentuk yang benar adalah...",
        "options": [
          "used to",
          "use to",
          "using to"
        ],
        "answer": 1
      }
    ]
  },
  "03-upper-intermediate/01-past-perfect-continuous": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "01",
    "title": "Past Perfect Continuous",
    "intro": "Past Perfect Continuous menekankan durasi suatu aktivitas yang berlangsung sebelum titik atau kejadian lain di masa lalu.",
    "focus": "had been + verb-ing",
    "sections": [
      {
        "title": "1. Durasi sebelum titik lampau",
        "paragraphs": [
          "Gunakan had been + verb-ing untuk menunjukkan berapa lama aktivitas berlangsung sampai suatu titik di masa lalu. For menyatakan durasi; since menyatakan titik awal."
        ],
        "examples": [
          "She had been studying for three hours before dinner.",
          "They had been living there since 2019 when the company transferred them."
        ]
      },
      {
        "title": "2. Proses dan bukti lampau",
        "paragraphs": [
          "Tense ini menonjolkan proses atau penyebab yang berlangsung sebelumnya. Past Perfect Simple lebih menonjolkan penyelesaian/jumlah hasil."
        ],
        "examples": [
          "His clothes were wet because he had been walking in the rain.",
          "She had written five emails by noon. (jumlah selesai)"
        ],
        "rule": "had been + verb-ing"
      }
    ],
    "checklist": [
      "Aku membentuk had been + verb-ing.",
      "Aku menggunakan for dan since dengan tepat.",
      "Aku membedakan fokus durasi dari hasil yang sudah selesai."
    ],
    "quiz": [
      {
        "prompt": "He was tired because he ___ all day.",
        "options": [
          "had been working",
          "has worked",
          "was work"
        ],
        "answer": 0
      },
      {
        "prompt": "They ___ for an hour before the bus arrived.",
        "options": [
          "had been waiting",
          "have waited",
          "were wait"
        ],
        "answer": 0
      },
      {
        "prompt": "Since menunjukkan...",
        "options": [
          "lamanya durasi",
          "titik awal",
          "jumlah hasil"
        ],
        "answer": 1
      },
      {
        "prompt": "Tense yang paling menonjolkan durasi aktivitas lampau adalah...",
        "options": [
          "Past Perfect Continuous",
          "Past Simple",
          "Present Continuous"
        ],
        "answer": 0
      },
      {
        "prompt": "By 6 p.m., she ___ five reports. (fokus jumlah selesai)",
        "options": [
          "had completed",
          "had been completing",
          "has complete"
        ],
        "answer": 0
      }
    ]
  },
  "03-upper-intermediate/02-future-perfect-continuous": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "02",
    "title": "Future Perfect & Continuous",
    "intro": "Future Perfect menyoroti sesuatu yang sudah selesai sebelum waktu mendatang; Future Perfect Continuous menyoroti durasi aktivitas hingga waktu itu.",
    "focus": "will have + V3 / been + V-ing",
    "sections": [
      {
        "title": "1. Future Perfect",
        "paragraphs": [
          "Gunakan will have + past participle untuk hasil yang akan selesai sebelum batas waktu tertentu. By sering mengenalkan batas tersebut."
        ],
        "examples": [
          "By Friday, we will have finished the project.",
          "She will have left before the office closes."
        ]
      },
      {
        "title": "2. Future Perfect Continuous",
        "paragraphs": [
          "Gunakan will have been + verb-ing untuk menekankan durasi sampai titik di masa depan. Pilih sesuai fokus: hasil selesai atau lamanya proses."
        ],
        "examples": [
          "By June, I will have been working here for ten years.",
          "At noon, they will have been travelling for six hours."
        ],
        "rule": "completed result: will have + V3 · duration: will have been + verb-ing"
      }
    ],
    "checklist": [
      "Aku bisa membentuk Future Perfect.",
      "Aku bisa membentuk Future Perfect Continuous.",
      "Aku dapat memilih bentuk berdasarkan fokus hasil atau durasi."
    ],
    "quiz": [
      {
        "prompt": "By 8 p.m., we ___ the work.",
        "options": [
          "will finish",
          "will have finished",
          "have finished"
        ],
        "answer": 1
      },
      {
        "prompt": "Next month, he ___ here for a year.",
        "options": [
          "will have been living",
          "will living",
          "has been lived"
        ],
        "answer": 0
      },
      {
        "prompt": "Bentuk yang menekankan durasi adalah...",
        "options": [
          "will have built",
          "will have been building",
          "will build"
        ],
        "answer": 1
      },
      {
        "prompt": "By the time you arrive, the meeting ___.",
        "options": [
          "will have started",
          "starts yesterday",
          "has start"
        ],
        "answer": 0
      },
      {
        "prompt": "Dalam Future Perfect, ‘by Friday’ biasanya berarti...",
        "options": [
          "sebelum atau paling lambat Jumat",
          "mulai hari Jumat",
          "selama setiap Jumat"
        ],
        "answer": 0
      }
    ]
  },
  "03-upper-intermediate/04-passive-advanced": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "04",
    "title": "Passive Voice (Advanced)",
    "intro": "Bentuk pasif dapat digunakan bersama modal, aspek continuous, dan reporting verbs untuk menyesuaikan fokus serta tingkat formalitas.",
    "focus": "modal, continuous and reporting passives",
    "sections": [
      {
        "title": "1. Modal dan continuous passive",
        "paragraphs": [
          "Modal passive memakai modal + be + V3. Present continuous passive memakai am/is/are being + V3; past continuous passive memakai was/were being + V3."
        ],
        "examples": [
          "The form must be signed today.",
          "The road is being repaired. The files were being checked."
        ]
      },
      {
        "title": "2. Reporting passive",
        "paragraphs": [
          "Dalam laporan formal, gunakan It is said/believed/expected that... atau subject + be + past participle + to-infinitive."
        ],
        "examples": [
          "It is believed that the painting is authentic.",
          "The painting is believed to be authentic."
        ],
        "rule": "modal + be + V3 · be + being + V3"
      }
    ],
    "checklist": [
      "Aku membentuk passive dengan modal.",
      "Aku mengenali passive continuous.",
      "Aku dapat memakai pola reporting passive."
    ],
    "quiz": [
      {
        "prompt": "All visitors ___ to show identification.",
        "options": [
          "must ask",
          "must be asked",
          "must have asking"
        ],
        "answer": 1
      },
      {
        "prompt": "The new bridge ___ at the moment.",
        "options": [
          "is building",
          "is being built",
          "has build"
        ],
        "answer": 1
      },
      {
        "prompt": "Choose the correct past continuous passive.",
        "options": [
          "The room was being cleaned.",
          "The room was cleaning.",
          "The room had being cleaned."
        ],
        "answer": 0
      },
      {
        "prompt": "Pola reporting passive yang tepat adalah...",
        "options": [
          "It is believed that the plan will work.",
          "It believes that the plan works.",
          "It is believe the plan work."
        ],
        "answer": 0
      },
      {
        "prompt": "The suspect is thought ___ the country.",
        "options": [
          "to leave",
          "to have left",
          "having left"
        ],
        "answer": 1
      }
    ]
  },
  "03-upper-intermediate/05-reported-speech-advanced": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "05",
    "title": "Reported Speech (Advanced)",
    "intro": "Reported speech lanjutan memakai reporting verbs untuk menyatakan saran, perintah, penyangkalan, atau pengakuan dengan pola grammar tertentu.",
    "focus": "reporting verb patterns",
    "sections": [
      {
        "title": "1. Verb + infinitive atau gerund",
        "paragraphs": [
          "Advise, ask, tell, dan encourage dapat memakai object + to-infinitive. Admit, deny, dan suggest lazim memakai gerund atau that-clause."
        ],
        "examples": [
          "She advised me to wait.",
          "He denied taking the document. They suggested that we leave early."
        ]
      },
      {
        "title": "2. Pertanyaan dan instruksi",
        "paragraphs": [
          "Reported question memakai urutan pernyataan, bukan inversi pertanyaan. Instruksi/permintaan dapat memakai tell/ask + object + (not) to-infinitive."
        ],
        "examples": [
          "“Where do you live?” → She asked where I lived.",
          "“Don't touch it.” → He told us not to touch it."
        ],
        "rule": "reported question: reporting verb + wh-word + subject + verb"
      }
    ],
    "checklist": [
      "Aku memilih pola reporting verb yang tepat.",
      "Aku mengubah pertanyaan menjadi urutan pernyataan.",
      "Aku melaporkan perintah positif dan negatif dengan to-infinitive."
    ],
    "quiz": [
      {
        "prompt": "He advised us ___ early.",
        "options": [
          "leave",
          "to leave",
          "leaving"
        ],
        "answer": 1
      },
      {
        "prompt": "“Where is the station?” → She asked me where the station ___.",
        "options": [
          "was",
          "is it",
          "did be"
        ],
        "answer": 0
      },
      {
        "prompt": "They denied ___ the files.",
        "options": [
          "to delete",
          "delete",
          "deleting"
        ],
        "answer": 2
      },
      {
        "prompt": "“Don't wait.” → She told us ___ .",
        "options": [
          "to not waiting",
          "not to wait",
          "not wait to"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih pola yang benar setelah ‘suggest’.",
        "options": [
          "suggested to take a taxi",
          "suggested taking a taxi",
          "suggested us take a taxi"
        ],
        "answer": 1
      }
    ]
  },
  "03-upper-intermediate/06-inversion-basic": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "06",
    "title": "Inversion (Basic)",
    "intro": "Inversion membalik urutan auxiliary dan subject untuk memberi penekanan, terutama setelah ungkapan negatif atau pembatas di awal kalimat.",
    "focus": "negative adverbial + auxiliary + subject",
    "sections": [
      {
        "title": "1. Inversi setelah ungkapan negatif",
        "paragraphs": [
          "Jika never, rarely, seldom, atau little diletakkan di awal untuk penekanan, gunakan pola auxiliary + subject + main verb."
        ],
        "examples": [
          "Never have I seen such a view.",
          "Rarely does she arrive late."
        ]
      },
      {
        "title": "2. Sesuaikan auxiliary",
        "paragraphs": [
          "Jika kalimat asal tidak memiliki auxiliary, gunakan do/does/did. Be dan modal berpindah langsung ke depan subject."
        ],
        "examples": [
          "Not only did he apologize, but he also offered a refund.",
          "Under no circumstances should you open this door."
        ],
        "rule": "negative opener + auxiliary/modal + subject + verb"
      }
    ],
    "checklist": [
      "Aku mengenali ungkapan yang memicu inversion.",
      "Aku dapat memilih auxiliary yang sesuai.",
      "Aku dapat memakai inversion untuk penekanan formal."
    ],
    "quiz": [
      {
        "prompt": "Never ___ such a beautiful garden.",
        "options": [
          "I have seen",
          "have I seen",
          "I saw"
        ],
        "answer": 1
      },
      {
        "prompt": "Rarely ___ the bus late.",
        "options": [
          "does",
          "is",
          "has"
        ],
        "answer": 0
      },
      {
        "prompt": "Not only ___ she win, but she also broke the record.",
        "options": [
          "did",
          "was",
          "has"
        ],
        "answer": 0
      },
      {
        "prompt": "Under no circumstances ___ you share this code.",
        "options": [
          "you should",
          "should",
          "should you"
        ],
        "answer": 2
      },
      {
        "prompt": "Inversion pada gaya formal biasanya dipicu oleh...",
        "options": [
          "adverbial negatif di awal",
          "object di akhir",
          "adjective setelah noun"
        ],
        "answer": 0
      }
    ]
  },
  "03-upper-intermediate/07-cleft-sentences": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "07",
    "title": "Cleft Sentences",
    "intro": "Cleft sentence membagi informasi ke dua bagian untuk menekankan orang, benda, waktu, atau alasan tertentu.",
    "focus": "it-cleft and what-cleft",
    "sections": [
      {
        "title": "1. It-cleft",
        "paragraphs": [
          "Gunakan It is/was + bagian yang ditekankan + that/who + klausa. Who biasanya dipakai untuk orang; that dapat dipakai untuk benda atau waktu."
        ],
        "examples": [
          "It was Maya who found the key.",
          "It was yesterday that we received the results."
        ]
      },
      {
        "title": "2. What-cleft",
        "paragraphs": [
          "What-clause dapat diletakkan di awal; informasi penting mengikuti be. Struktur ini sering menekankan tindakan atau kebutuhan."
        ],
        "examples": [
          "What I need is a quiet place to work.",
          "What surprised us was his quick response."
        ],
        "rule": "It is/was + focus + that/who + clause"
      }
    ],
    "checklist": [
      "Aku dapat membentuk it-cleft.",
      "Aku dapat membentuk what-cleft.",
      "Aku bisa menentukan unsur yang ingin ditekankan."
    ],
    "quiz": [
      {
        "prompt": "Penekanan bahwa Maya yang menelepon: ‘It was Maya ___ called.’",
        "options": [
          "which",
          "who",
          "where"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih it-cleft yang benar.",
        "options": [
          "It was in May that they moved.",
          "It was in May what they moved.",
          "Was it May that they moved."
        ],
        "answer": 0
      },
      {
        "prompt": "What-clause yang benar adalah...",
        "options": [
          "What I need is more time.",
          "What I need are more time.",
          "That I need what more time."
        ],
        "answer": 0
      },
      {
        "prompt": "Cleft sentence terutama digunakan untuk...",
        "options": [
          "menyatakan kepemilikan",
          "memberi penekanan",
          "membuat pertanyaan tag"
        ],
        "answer": 1
      },
      {
        "prompt": "‘It was the manager ___ approved the request.’",
        "options": [
          "who",
          "where",
          "what"
        ],
        "answer": 0
      }
    ]
  },
  "03-upper-intermediate/08-participle-clauses": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "08",
    "title": "Participle Clauses",
    "intro": "Participle clauses meringkas informasi waktu, sebab, atau deskripsi. Subject yang dipahami harus sama dengan subject klausa utama.",
    "focus": "-ing, -ed, having + V3",
    "sections": [
      {
        "title": "1. Present dan past participle",
        "paragraphs": [
          "Bentuk -ing biasanya aktif atau sedang berlangsung; bentuk V3 biasanya pasif atau menerima tindakan."
        ],
        "examples": [
          "Walking home, I saw an old friend. (= While I was walking...)",
          "Built in 1920, the house needs repairs. (= Because it was built...)"
        ]
      },
      {
        "title": "2. Urutan kejadian",
        "paragraphs": [
          "Having + V3 menandai tindakan yang selesai lebih dulu. Hindari dangling participle: pelaku yang melakukan participle harus sama dengan subject klausa utama."
        ],
        "examples": [
          "Having finished the report, Maya sent it to her manager.",
          "Salah: Walking to work, the rain started. (seolah rain yang berjalan)"
        ],
        "rule": "-ing = aktif · V3 = pasif · having + V3 = selesai lebih dahulu"
      }
    ],
    "checklist": [
      "Aku dapat membedakan participle aktif dan pasif.",
      "Aku memakai having + V3 untuk kejadian lebih awal.",
      "Aku memastikan subject participle cocok dengan klausa utama."
    ],
    "quiz": [
      {
        "prompt": "___ the instructions, she assembled the desk.",
        "options": [
          "Reading",
          "Read",
          "Having read"
        ],
        "answer": 2
      },
      {
        "prompt": "___ by a local architect, the library opened in June.",
        "options": [
          "Designing",
          "Designed",
          "Having design"
        ],
        "answer": 1
      },
      {
        "prompt": "Participle -ing biasanya bermakna...",
        "options": [
          "aktif",
          "pasif",
          "masa depan"
        ],
        "answer": 0
      },
      {
        "prompt": "Kalimat mana memiliki dangling participle?",
        "options": [
          "Driving home, I heard the news.",
          "Driving home, the storm began.",
          "Built in 2005, the school is modern."
        ],
        "answer": 1
      },
      {
        "prompt": "Having + V3 menunjukkan tindakan...",
        "options": [
          "yang sedang berlangsung",
          "yang selesai lebih dahulu",
          "yang selalu terjadi"
        ],
        "answer": 1
      }
    ]
  },
  "03-upper-intermediate/09-modal-perfect": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "09",
    "title": "Modal Perfect",
    "intro": "Modal perfect menghubungkan modal dengan kejadian lampau untuk membuat kesimpulan, menyatakan kemungkinan, atau menilai sesuatu yang seharusnya terjadi.",
    "focus": "modal + have + V3",
    "sections": [
      {
        "title": "1. Kesimpulan dan kemungkinan lampau",
        "paragraphs": [
          "Must have + V3 menyatakan kesimpulan kuat; may/might/could have + V3 menyatakan kemungkinan; can't have + V3 menyatakan sesuatu hampir pasti tidak terjadi."
        ],
        "examples": [
          "The lights were off. They must have gone out.",
          "She might have missed the train. He can't have finished already."
        ]
      },
      {
        "title": "2. Kritik atau penyesalan",
        "paragraphs": [
          "Should have + V3 berarti sesuatu seharusnya dilakukan tetapi mungkin tidak dilakukan. Shouldn't have + V3 menilai tindakan lampau sebagai kesalahan."
        ],
        "examples": [
          "You should have called ahead.",
          "I shouldn't have shared that information."
        ],
        "rule": "modal + have + past participle"
      }
    ],
    "checklist": [
      "Aku membentuk modal + have + V3.",
      "Aku membedakan deduction, possibility, dan regret.",
      "Aku memahami makna should have dan shouldn't have."
    ],
    "quiz": [
      {
        "prompt": "The ground is wet. It ___ overnight.",
        "options": [
          "must have rained",
          "must rain",
          "should raining"
        ],
        "answer": 0
      },
      {
        "prompt": "He ___ the email; it was sent to the wrong address.",
        "options": [
          "can't have received",
          "must receive",
          "should receiving"
        ],
        "answer": 0
      },
      {
        "prompt": "You ___ me earlier; I could have helped.",
        "options": [
          "should have told",
          "should tell",
          "must telling"
        ],
        "answer": 0
      },
      {
        "prompt": "They may ___ the wrong turn.",
        "options": [
          "take",
          "have taken",
          "taking"
        ],
        "answer": 1
      },
      {
        "prompt": "‘Shouldn't have said that’ biasanya menyatakan...",
        "options": [
          "saran masa depan",
          "penyesalan/kritik atas masa lalu",
          "kepastian sekarang"
        ],
        "answer": 1
      }
    ]
  },
  "03-upper-intermediate/10-relative-clauses-advanced": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "10",
    "title": "Relative Clauses (Advanced)",
    "intro": "Relative clauses lanjutan memungkinkan klausa direduksi atau preposition ditempatkan sebelum relative pronoun dalam gaya formal.",
    "focus": "reduced clauses and preposition placement",
    "sections": [
      {
        "title": "1. Reduced relative clauses",
        "paragraphs": [
          "Klausa relatif aktif dapat direduksi menjadi present participle; klausa pasif dapat memakai past participle jika makna tetap jelas."
        ],
        "examples": [
          "People living nearby (= who live nearby) may hear the noise.",
          "The documents attached (= that are attached) are confidential."
        ]
      },
      {
        "title": "2. Preposition dan formal style",
        "paragraphs": [
          "Dalam gaya formal, preposition dapat diletakkan sebelum whom/which. Dalam percakapan, preposition biasanya berada di akhir klausa."
        ],
        "examples": [
          "The colleague to whom I spoke was helpful.",
          "The topic which we discussed was important."
        ],
        "rule": "preposition + whom (people) / which (things)"
      }
    ],
    "checklist": [
      "Aku dapat mengenali reduced relative clause.",
      "Aku memilih bentuk participle yang sesuai aktif/pasif.",
      "Aku memahami posisi preposition dalam relative clause formal."
    ],
    "quiz": [
      {
        "prompt": "The woman ___ next door is a doctor. (who lives)",
        "options": [
          "living",
          "lived",
          "to live"
        ],
        "answer": 0
      },
      {
        "prompt": "The files ___ yesterday are on the desk. (that were printed)",
        "options": [
          "printing",
          "printed",
          "print"
        ],
        "answer": 1
      },
      {
        "prompt": "Formal: ‘the person ___ I sent the letter’",
        "options": [
          "to whom",
          "to who",
          "which to"
        ],
        "answer": 0
      },
      {
        "prompt": "Reduced clause ‘students selected for the program’ berasal dari...",
        "options": [
          "students who selected",
          "students who were selected",
          "students whom selecting"
        ],
        "answer": 1
      },
      {
        "prompt": "Preposition-fronting lebih lazim dalam...",
        "options": [
          "ragam formal",
          "percakapan santai saja",
          "judul informal"
        ],
        "answer": 0
      }
    ]
  },
  "03-upper-intermediate/11-linking-words": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "11",
    "title": "Linking Words",
    "intro": "Linking words menunjukkan hubungan antara gagasan. Penghubung yang tepat membuat argumen lebih mudah diikuti dan menghindari hubungan logika yang keliru.",
    "focus": "contrast, cause, result, addition",
    "sections": [
      {
        "title": "1. Kenali hubungan makna",
        "paragraphs": [
          "However dan although menunjukkan kontras; therefore dan as a result menunjukkan hasil; moreover dan furthermore menambahkan gagasan."
        ],
        "examples": [
          "The sample was small. However, the pattern was consistent.",
          "It rained heavily; therefore, the match was postponed."
        ]
      },
      {
        "title": "2. Perhatikan struktur dan tanda baca",
        "paragraphs": [
          "Although diikuti klausa dan tidak berdiri sebagai penghubung dua kalimat dengan titik-koma saja. However dapat mengawali kalimat baru atau diapit koma."
        ],
        "examples": [
          "Although it was late, we continued.",
          "It was late. However, we continued."
        ],
        "rule": "although + clause · however + sentence connector"
      }
    ],
    "checklist": [
      "Aku dapat mengidentifikasi hubungan kontras, sebab, hasil, dan tambahan.",
      "Aku memilih linker menurut logika kalimat.",
      "Aku menggunakan tanda baca sesuai struktur."
    ],
    "quiz": [
      {
        "prompt": "The method is inexpensive. ___, it takes more time.",
        "options": [
          "However",
          "Therefore",
          "Moreover"
        ],
        "answer": 0
      },
      {
        "prompt": "The roads were flooded; ___, school was closed.",
        "options": [
          "although",
          "as a result",
          "whereas"
        ],
        "answer": 1
      },
      {
        "prompt": "___ the evidence was limited, the team reported its findings.",
        "options": [
          "Although",
          "However",
          "Therefore"
        ],
        "answer": 0
      },
      {
        "prompt": "Which word adds another supporting point?",
        "options": [
          "Furthermore",
          "Nevertheless",
          "Consequently"
        ],
        "answer": 0
      },
      {
        "prompt": "Pola yang benar adalah...",
        "options": [
          "Although it was cold, we went out.",
          "Although it was cold. However we went out.",
          "It was cold although. We went out."
        ],
        "answer": 0
      }
    ]
  },
  "03-upper-intermediate/12-nominalization-intro": {
    "level": "Level 3 · Upper-Intermediate",
    "number": "12",
    "title": "Nominalization (Intro)",
    "intro": "Nominalization mengubah verb atau adjective menjadi noun. Teknik ini membantu merangkum proses, tetapi noun yang terlalu padat dapat mengurangi kejelasan.",
    "focus": "verb/adjective → noun",
    "sections": [
      {
        "title": "1. Bentuk nominal",
        "paragraphs": [
          "Banyak noun dibentuk dengan akhiran seperti -tion, -ment, -ity, atau -ance. Ejaan tidak selalu dapat ditebak, jadi periksa kamus."
        ],
        "examples": [
          "decide → decision; improve → improvement",
          "accurate → accuracy; perform → performance"
        ]
      },
      {
        "title": "2. Kapan digunakan?",
        "paragraphs": [
          "Nominalization berguna untuk merujuk proses sebagai topik: The company expanded → The expansion was rapid. Tetap utamakan verb jika kalimat menjadi terlalu abstrak."
        ],
        "examples": [
          "They analyzed the data. → Their analysis of the data...",
          "Clear: We reviewed the plan. Padat: The review of the plan..."
        ],
        "rule": "Nominalization membantu memadatkan, tetapi jangan mengaburkan pelaku/tindakan."
      }
    ],
    "checklist": [
      "Aku mengenali noun hasil nominalization.",
      "Aku dapat mengubah verb/adjective menjadi noun yang umum.",
      "Aku tahu kapan bentuk noun membuat kalimat kurang jelas."
    ],
    "quiz": [
      {
        "prompt": "Nominal dari ‘decide’ adalah...",
        "options": [
          "decision",
          "decidement",
          "decidingly"
        ],
        "answer": 0
      },
      {
        "prompt": "Nominal dari ‘improve’ adalah...",
        "options": [
          "improval",
          "improvement",
          "improveness"
        ],
        "answer": 1
      },
      {
        "prompt": "‘Accurate’ menjadi noun...",
        "options": [
          "accuracy",
          "accuration",
          "accurateity"
        ],
        "answer": 0
      },
      {
        "prompt": "Nominalization digunakan untuk...",
        "options": [
          "membuat semua kalimat pasif",
          "menjadikan proses/ide sebagai noun",
          "menghapus semua verb"
        ],
        "answer": 1
      },
      {
        "prompt": "Kalimat yang paling langsung adalah...",
        "options": [
          "We analyzed the results.",
          "An analysis of the results was undertaken by us.",
          "The undertaking of analysis occurred."
        ],
        "answer": 0
      }
    ]
  },
  "04-advanced-formal/01-complex-subordination": {
    "level": "Level 4 · Advanced-Formal",
    "number": "01",
    "title": "Complex Subordination",
    "intro": "Subordination mengatur hubungan antara gagasan utama dan pendukung. Klausa subordinat menambah sebab, konsesi, syarat, waktu, atau kontras.",
    "focus": "subordinators and clause hierarchy",
    "sections": [
      {
        "title": "1. Pilih hubungan logis",
        "paragraphs": [
          "Because/since menyatakan sebab; although/even though konsesi; whereas/while kontras; unless syarat negatif; once/as soon as waktu."
        ],
        "examples": [
          "Although the sample was small, the pattern was consistent.",
          "Unless costs fall, the project will remain impractical."
        ]
      },
      {
        "title": "2. Susun klausa dengan jelas",
        "paragraphs": [
          "Klausa subordinat di awal biasanya diikuti koma. Klausa yang diletakkan setelah klausa utama umumnya tidak memerlukan koma, kecuali aturan lain menuntutnya."
        ],
        "examples": [
          "Because demand increased, the team expanded production.",
          "The team expanded production because demand increased."
        ],
        "rule": "subordinator + subject + verb · pastikan setiap kalimat punya klausa utama"
      }
    ],
    "checklist": [
      "Aku dapat memilih subordinator sesuai hubungan makna.",
      "Aku menggunakan koma setelah klausa subordinat pembuka.",
      "Aku memastikan kalimat tidak hanya berisi klausa subordinat."
    ],
    "quiz": [
      {
        "prompt": "___ the data were incomplete, the team reported the limitation.",
        "options": [
          "Although",
          "Because of",
          "Despite"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih bentuk yang lengkap.",
        "options": [
          "Unless the plan changes, we will proceed.",
          "Unless the plan changes.",
          "Unless changing the plan, will proceed."
        ],
        "answer": 0
      },
      {
        "prompt": "‘Unless costs fall’ menyatakan...",
        "options": [
          "sebab",
          "syarat negatif",
          "hasil"
        ],
        "answer": 1
      },
      {
        "prompt": "Which linker shows contrast between two clauses?",
        "options": [
          "whereas",
          "therefore",
          "because"
        ],
        "answer": 0
      },
      {
        "prompt": "Klausa subordinat yang diletakkan di awal umumnya diikuti...",
        "options": [
          "koma",
          "titik dua wajib",
          "tanda tanya"
        ],
        "answer": 0
      }
    ]
  },
  "04-advanced-formal/02-nominalization": {
    "level": "Level 4 · Advanced-Formal",
    "number": "02",
    "title": "Nominalization",
    "intro": "Nominalization mengemas tindakan atau kualitas sebagai noun untuk membantu tema dan struktur tulisan formal. Gunakan secukupnya agar pelaku dan tindakan tetap jelas.",
    "focus": "process nouns and information structure",
    "sections": [
      {
        "title": "1. Ubah proses menjadi konsep",
        "paragraphs": [
          "Nominalisasi dapat mengubah verb/adjective menjadi noun, misalnya analyze/analysis, decide/decision, stable/stability."
        ],
        "examples": [
          "The committee reviewed the proposal. → The committee's review of the proposal...",
          "The market became stable. → Market stability..."
        ]
      },
      {
        "title": "2. Jaga kejelasan",
        "paragraphs": [
          "Noun hasil nominalisasi sering diikuti of-phrase. Rangkaian noun yang terlalu panjang dapat menyamarkan pelaku; gunakan verb jika lebih langsung."
        ],
        "examples": [
          "Clear: Researchers measured the response.",
          "Padat: Measurement of the response by researchers..."
        ],
        "rule": "Nominalisasi berguna untuk tema dan ringkasan, bukan untuk menghapus kejelasan."
      }
    ],
    "checklist": [
      "Aku dapat mengenali nominalisasi pada tulisan formal.",
      "Aku bisa mengubah proses menjadi noun yang sesuai.",
      "Aku dapat menyunting rangkaian noun yang terlalu padat."
    ],
    "quiz": [
      {
        "prompt": "Nominalisasi dari ‘analyze’ adalah...",
        "options": [
          "analysis",
          "analyzationly",
          "analyzement"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih bentuk noun yang benar dari ‘stable’.",
        "options": [
          "stability",
          "stablenessity",
          "stabilation"
        ],
        "answer": 0
      },
      {
        "prompt": "Kalimat mana lebih langsung?",
        "options": [
          "The team evaluated the proposal.",
          "An evaluation of the proposal was conducted by the team.",
          "The conducting of proposal evaluation occurred."
        ],
        "answer": 0
      },
      {
        "prompt": "Nominalization dapat membantu...",
        "options": [
          "menjadikan proses sebagai topik",
          "menghilangkan semua subject",
          "mengubah semua verb ke pasif"
        ],
        "answer": 0
      },
      {
        "prompt": "Risiko noun phrase yang terlalu padat adalah...",
        "options": [
          "pelaku/tindakan menjadi kabur",
          "semua kata berubah tense",
          "koma tidak dapat digunakan"
        ],
        "answer": 0
      }
    ]
  },
  "04-advanced-formal/04-formal-register": {
    "level": "Level 4 · Advanced-Formal",
    "number": "04",
    "title": "Formal Register",
    "intro": "Register formal menyesuaikan pilihan kata, struktur, dan nada dengan pembaca serta tujuan. Formal bukan berarti memakai kata panjang atau kuno.",
    "focus": "tone, precision and audience",
    "sections": [
      {
        "title": "1. Pilihan kata dan nada",
        "paragraphs": [
          "Utamakan kata yang tepat dan netral. Hindari slang, singkatan percakapan, dan phrasal verb jika ada alternatif yang lebih presisi."
        ],
        "examples": [
          "Informal: We looked into the issue.",
          "Formal: We investigated the issue."
        ]
      },
      {
        "title": "2. Struktur profesional",
        "paragraphs": [
          "Gunakan permintaan yang sopan dan eksplisit, kontraksi seperlunya dihindari dalam dokumen sangat formal, dan hindari ungkapan bertele-tele."
        ],
        "examples": [
          "Please provide the revised figures by 12 June.",
          "We would appreciate your response by Friday."
        ],
        "rule": "Formal = jelas, sopan, sesuai pembaca; bukan rumit atau kuno."
      }
    ],
    "checklist": [
      "Aku dapat mengenali slang dan ungkapan terlalu santai.",
      "Aku dapat memilih kata profesional yang tetap alami.",
      "Aku menyesuaikan nada dengan tujuan dan pembaca."
    ],
    "quiz": [
      {
        "prompt": "Pilih padanan lebih formal untuk ‘look into the complaint’.",
        "options": [
          "investigate the complaint",
          "check out the complaint",
          "peek at the complaint"
        ],
        "answer": 0
      },
      {
        "prompt": "Permintaan profesional yang jelas adalah...",
        "options": [
          "Send it now.",
          "Please send the revised file by Friday.",
          "You gotta send the file."
        ],
        "answer": 1
      },
      {
        "prompt": "Formal register sebaiknya...",
        "options": [
          "selalu memakai kata kuno",
          "sesuai tujuan dan pembaca",
          "menggunakan kalimat sepanjang mungkin"
        ],
        "answer": 1
      },
      {
        "prompt": "Ungkapan mana paling santai?",
        "options": [
          "We will review the matter.",
          "We'll check it out.",
          "We will assess the matter."
        ],
        "answer": 1
      },
      {
        "prompt": "Tujuan utama register formal adalah...",
        "options": [
          "menambah kompleksitas",
          "menjaga ketepatan dan profesionalitas",
          "menghindari semua kalimat aktif"
        ],
        "answer": 1
      }
    ]
  },
  "04-advanced-formal/05-collocations": {
    "level": "Level 4 · Advanced-Formal",
    "number": "05",
    "title": "Collocations",
    "intro": "Collocation adalah pasangan kata yang lazim muncul bersama. Memilih pasangan alami membuat tulisan terdengar lancar dan tepat.",
    "focus": "natural word partnerships",
    "sections": [
      {
        "title": "1. Pola collocation umum",
        "paragraphs": [
          "Collocation sering berbentuk verb + noun, adjective + noun, adverb + adjective, atau verb + preposition. Pasangan yang benar tidak selalu dapat ditebak dari terjemahan."
        ],
        "examples": [
          "make a decision; conduct research; strong evidence",
          "deeply concerned; depend on; reach an agreement"
        ]
      },
      {
        "title": "2. Belajar dalam konteks",
        "paragraphs": [
          "Catat kata bersama pasangan dan contoh kalimat. Gunakan kamus learner atau korpus untuk memeriksa apakah pasangan terdengar alami."
        ],
        "examples": [
          "heavy rain (bukan strong rain); highly likely (bukan high likely)",
          "The team conducted a survey. (conduct + survey)"
        ],
        "rule": "Pelajari kata sebagai unit bermakna, bukan daftar terjemahan terpisah."
      }
    ],
    "checklist": [
      "Aku mengenali pola collocation umum.",
      "Aku memilih adjective/verb yang berpasangan alami.",
      "Aku dapat memeriksa collocation dari contoh konteks."
    ],
    "quiz": [
      {
        "prompt": "Pilih collocation yang alami.",
        "options": [
          "make a decision",
          "do a decision",
          "build a decision"
        ],
        "answer": 0
      },
      {
        "prompt": "Kita biasanya mengatakan...",
        "options": [
          "strong rain",
          "heavy rain",
          "hard rainly"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih pasangan yang tepat.",
        "options": [
          "conduct research",
          "make research",
          "do a researches"
        ],
        "answer": 0
      },
      {
        "prompt": "Kata keterangan yang lazim: ___ likely.",
        "options": [
          "highly",
          "strongly",
          "deep"
        ],
        "answer": 0
      },
      {
        "prompt": "Cara belajar collocation yang efektif adalah...",
        "options": [
          "menghafal arti kata tanpa konteks",
          "mencatat pasangan kata beserta contoh",
          "mengganti setiap kata dengan sinonim"
        ],
        "answer": 1
      }
    ]
  },
  "04-advanced-formal/06-advanced-connectors": {
    "level": "Level 4 · Advanced-Formal",
    "number": "06",
    "title": "Advanced Connectors",
    "intro": "Advanced connectors menandai konsesi, konsekuensi, syarat, atau batas argumen. Makna dan grammar setelah connector menentukan pilihan yang tepat.",
    "focus": "concession, consequence and condition",
    "sections": [
      {
        "title": "1. Makna dan pola",
        "paragraphs": [
          "Nevertheless/nonetheless menunjukkan kontras; consequently/hence menunjukkan hasil; provided that/as long as menyatakan syarat; notwithstanding biasanya diikuti noun phrase."
        ],
        "examples": [
          "The method is costly; nevertheless, it is reliable.",
          "Funding was delayed; consequently, the launch moved."
        ]
      },
      {
        "title": "2. Hindari connector yang keliru",
        "paragraphs": [
          "Despite/in spite of diikuti noun atau gerund; although/even though diikuti klausa. Connector kalimat seperti therefore biasanya dipisahkan dengan tanda baca yang sesuai."
        ],
        "examples": [
          "Despite the delay, the team finished.",
          "Although the team was delayed, it finished."
        ],
        "rule": "despite + noun/gerund · although + subject + verb"
      }
    ],
    "checklist": [
      "Aku dapat memilih connector berdasarkan hubungan argumen.",
      "Aku membedakan despite dari although.",
      "Aku menggunakan tanda baca pada connector kalimat."
    ],
    "quiz": [
      {
        "prompt": "The evidence was limited; ___, the conclusion remains useful.",
        "options": [
          "nevertheless",
          "therefore",
          "provided that"
        ],
        "answer": 0
      },
      {
        "prompt": "___ the high cost, the project proceeded.",
        "options": [
          "Although",
          "Despite",
          "Nevertheless"
        ],
        "answer": 1
      },
      {
        "prompt": "The launch was delayed; ___, the team revised its schedule.",
        "options": [
          "consequently",
          "whereas",
          "despite"
        ],
        "answer": 0
      },
      {
        "prompt": "Pilih pola yang benar.",
        "options": [
          "Despite the weather was poor, we continued.",
          "Although the weather was poor, we continued.",
          "Despite it was poor weather, we continued."
        ],
        "answer": 1
      },
      {
        "prompt": "‘Provided that’ biasanya memperkenalkan...",
        "options": [
          "syarat",
          "contoh",
          "penegasan ulang"
        ],
        "answer": 0
      }
    ]
  },
  "04-advanced-formal/07-inversion-emphasis": {
    "level": "Level 4 · Advanced-Formal",
    "number": "07",
    "title": "Inversion & Emphasis",
    "intro": "Inversion lanjutan memberi penekanan pada kondisi, urutan, atau derajat. Gunakan hanya ketika struktur dan tujuan retorisnya jelas.",
    "focus": "emphatic inversion patterns",
    "sections": [
      {
        "title": "1. Only after / not until",
        "paragraphs": [
          "Jika only after, not until, atau only when mengawali kalimat, klausa utama memakai inversion (auxiliary sebelum subject). Klausa setelah penghubung tetap berurutan biasa."
        ],
        "examples": [
          "Only after the audit did we find the error.",
          "Not until midnight did the train arrive."
        ]
      },
      {
        "title": "2. So dan such",
        "paragraphs": [
          "So + adjective atau such + noun phrase di awal dapat memicu inversion untuk penekanan formal."
        ],
        "examples": [
          "So convincing was the evidence that the panel agreed.",
          "Such was the demand that the tickets sold out."
        ],
        "rule": "fronted negative/limiting phrase + auxiliary + subject"
      }
    ],
    "checklist": [
      "Aku mengenali pembuka yang memicu inversion.",
      "Aku menempatkan auxiliary sebelum subject.",
      "Aku menggunakan inversion secara terukur untuk penekanan."
    ],
    "quiz": [
      {
        "prompt": "Only after the meeting ___ the decision.",
        "options": [
          "we announced",
          "did we announce",
          "we did announce"
        ],
        "answer": 1
      },
      {
        "prompt": "Not until Monday ___ the results.",
        "options": [
          "the lab released",
          "did the lab release",
          "the lab did released"
        ],
        "answer": 1
      },
      {
        "prompt": "So difficult ___ that few students finished.",
        "options": [
          "the test was",
          "was the test",
          "did the test was"
        ],
        "answer": 1
      },
      {
        "prompt": "Inversion pada ‘Only after the review did we agree’ memberi...",
        "options": [
          "penekanan",
          "kepemilikan",
          "perintah"
        ],
        "answer": 0
      },
      {
        "prompt": "Setelah ‘Only when the data arrived’, klausa utama memakai...",
        "options": [
          "subject + verb biasa",
          "auxiliary + subject",
          "verb-ing tanpa subject"
        ],
        "answer": 1
      }
    ]
  },
  "04-advanced-formal/08-ellipsis-substitution": {
    "level": "Level 4 · Advanced-Formal",
    "number": "08",
    "title": "Ellipsis & Substitution",
    "intro": "Ellipsis menghilangkan unsur yang dapat dipulihkan dari konteks; substitution mengganti unsur itu dengan kata seperti one, do so, atau so/not.",
    "focus": "avoid repetition without ambiguity",
    "sections": [
      {
        "title": "1. Ellipsis",
        "paragraphs": [
          "Unsur berulang dapat dihilangkan setelah auxiliary atau dalam struktur paralel jika maknanya tetap jelas."
        ],
        "examples": [
          "Maya can speak French, and Arif can too. (speak French dihilangkan)",
          "I ordered tea; my colleague, coffee."
        ]
      },
      {
        "title": "2. Substitution",
        "paragraphs": [
          "One/ones mengganti noun countable; do so mengganti tindakan; so/not mengganti klausa setelah verb tertentu."
        ],
        "examples": [
          "I need a pen. Do you have one?",
          "Will the plan work? I hope so. I think not."
        ],
        "rule": "Gunakan pengganti hanya jika rujukannya jelas."
      }
    ],
    "checklist": [
      "Aku dapat mengenali unsur yang dielipsis.",
      "Aku bisa memilih one/ones atau do so.",
      "Aku memastikan rujukan substitution tidak ambigu."
    ],
    "quiz": [
      {
        "prompt": "I need a clean cup. Do you have ___?",
        "options": [
          "one",
          "so",
          "do"
        ],
        "answer": 0
      },
      {
        "prompt": "She said she would call, and she did ___.",
        "options": [
          "one",
          "so",
          "it"
        ],
        "answer": 1
      },
      {
        "prompt": "‘Will they agree?’ ‘I hope ___.’",
        "options": [
          "one",
          "so",
          "do"
        ],
        "answer": 1
      },
      {
        "prompt": "Ellipsis berarti...",
        "options": [
          "menghilangkan unsur yang bisa dipahami dari konteks",
          "mengubah tense",
          "menambahkan kata penghubung"
        ],
        "answer": 0
      },
      {
        "prompt": "Substitution yang baik harus...",
        "options": [
          "selalu mengganti subject",
          "memiliki rujukan yang jelas",
          "menghilangkan konteks"
        ],
        "answer": 1
      }
    ]
  },
  "04-advanced-formal/09-cohesion-coherence": {
    "level": "Level 4 · Advanced-Formal",
    "number": "09",
    "title": "Cohesion & Coherence",
    "intro": "Cohesion menghubungkan bentuk bahasa; coherence membuat alur gagasan masuk akal. Keduanya membantu pembaca mengikuti teks.",
    "focus": "reference, progression and logic",
    "sections": [
      {
        "title": "1. Kohesi antarkalimat",
        "paragraphs": [
          "Gunakan pronoun dengan rujukan yang jelas, pengulangan istilah kunci secara terukur, sinonim yang akurat, dan connector sesuai hubungan."
        ],
        "examples": [
          "The survey included 200 students. These participants... (rujukan jelas)",
          "A vague ‘this’ tanpa noun dapat membuat pembaca menebak rujukannya."
        ]
      },
      {
        "title": "2. Koherensi paragraf",
        "paragraphs": [
          "Mulai dengan gagasan utama, susun dukungan secara logis, dan gunakan pola given-to-new: hubungkan informasi baru ke hal yang sudah dikenalkan."
        ],
        "examples": [
          "Topik → bukti → interpretasi → kaitan dengan klaim.",
          "Connector tidak dapat memperbaiki urutan gagasan yang tidak logis."
        ],
        "rule": "Setiap kalimat perlu berkontribusi pada tujuan paragraf."
      }
    ],
    "checklist": [
      "Aku dapat membuat rujukan pronoun jelas.",
      "Aku dapat menyusun paragraf dengan gagasan utama dan dukungan.",
      "Aku tahu connector saja tidak menjamin coherence."
    ],
    "quiz": [
      {
        "prompt": "Masalah utama ‘This was important’ tanpa konteks sebelumnya adalah...",
        "options": [
          "rujukan this tidak jelas",
          "kurang adjective",
          "tidak ada tense"
        ],
        "answer": 0
      },
      {
        "prompt": "Struktur paragraf yang membantu coherence adalah...",
        "options": [
          "bukti tanpa klaim",
          "gagasan utama lalu dukungan relevan",
          "daftar detail acak"
        ],
        "answer": 1
      },
      {
        "prompt": "Cohesion terutama merujuk pada...",
        "options": [
          "penghubung bahasa antarbagian",
          "kebenaran data",
          "jumlah paragraf"
        ],
        "answer": 0
      },
      {
        "prompt": "Connector yang baik harus...",
        "options": [
          "dipakai di tiap kalimat",
          "mencerminkan hubungan logis",
          "menggantikan semua pronoun"
        ],
        "answer": 1
      },
      {
        "prompt": "Given-to-new berarti...",
        "options": [
          "menghubungkan informasi dikenal dengan informasi baru",
          "mengulang seluruh paragraf",
          "menaruh kesimpulan di awal saja"
        ],
        "answer": 0
      }
    ]
  },
  "04-advanced-formal/10-formal-email-report": {
    "level": "Level 4 · Advanced-Formal",
    "number": "10",
    "title": "Formal Email & Report",
    "intro": "Email dan report formal menuntut tujuan yang jelas, organisasi yang dapat dipindai, nada profesional, dan tindakan lanjutan yang eksplisit.",
    "focus": "audience, structure and action",
    "sections": [
      {
        "title": "1. Email formal",
        "paragraphs": [
          "Pilih subject line spesifik; gunakan sapaan sesuai hubungan; nyatakan tujuan di awal; susun detail dalam paragraf ringkas; tutup dengan permintaan atau next step yang jelas."
        ],
        "examples": [
          "Subject: Request for revised budget by 14 June",
          "I am writing to request the updated budget for the review meeting."
        ]
      },
      {
        "title": "2. Report ringkas",
        "paragraphs": [
          "Report biasanya memiliki judul, tujuan/konteks, temuan berbasis data, dan kesimpulan atau rekomendasi. Pisahkan fakta dari rekomendasi."
        ],
        "examples": [
          "Finding: Response time increased by 12%.",
          "Recommendation: Add one support shift during peak hours."
        ],
        "rule": "pembaca dapat menemukan tujuan, temuan, dan tindakan tanpa membaca ulang"
      }
    ],
    "checklist": [
      "Aku dapat menulis subject line yang spesifik.",
      "Aku menyusun email dengan tujuan dan tindakan yang jelas.",
      "Aku membedakan temuan report dari rekomendasi."
    ],
    "quiz": [
      {
        "prompt": "Subject line paling informatif adalah...",
        "options": [
          "Hello",
          "Request for Q3 sales figures by Friday",
          "Important information"
        ],
        "answer": 1
      },
      {
        "prompt": "Kalimat pembuka email formal yang jelas adalah...",
        "options": [
          "I am writing to request the updated schedule.",
          "Hey, send me that thing.",
          "This email is about some stuff."
        ],
        "answer": 0
      },
      {
        "prompt": "Bagian report yang memuat interpretasi tindakan berikutnya adalah...",
        "options": [
          "recommendation",
          "salutation",
          "subject line"
        ],
        "answer": 0
      },
      {
        "prompt": "Temuan report sebaiknya...",
        "options": [
          "didukung data yang relevan",
          "dicampur dengan opini tanpa label",
          "diletakkan hanya di penutup"
        ],
        "answer": 0
      },
      {
        "prompt": "Tujuan utama struktur email/report adalah...",
        "options": [
          "membuat informasi mudah ditemukan",
          "menambah panjang dokumen",
          "menghindari tujuan eksplisit"
        ],
        "answer": 0
      }
    ]
  },
  "04-advanced-formal/11-academic-conventions": {
    "level": "Level 4 · Advanced-Formal",
    "number": "11",
    "title": "Academic Conventions",
    "intro": "Konvensi akademik membantu penulis menyampaikan klaim yang dapat ditelusuri, membedakan sumber dari analisis, dan menghormati karya orang lain.",
    "focus": "evidence, attribution and integrity",
    "sections": [
      {
        "title": "1. Klaim dan bukti",
        "paragraphs": [
          "Dukung klaim dengan bukti yang relevan dan jelaskan hubungan bukti dengan argumen. Gunakan hedge jika bukti terbatas; jangan menyatakan lebih dari yang ditunjukkan data."
        ],
        "examples": [
          "The results suggest an association, not necessarily causation.",
          "A citation mendukung klaim, tetapi tidak menggantikan penjelasan analitis."
        ]
      },
      {
        "title": "2. Parafrase dan sitasi",
        "paragraphs": [
          "Parafrase mengungkapkan gagasan sumber dengan struktur dan kata-katamu sendiri, tetap mencantumkan sitasi. Ikuti satu gaya sitasi secara konsisten sesuai pedoman tugas."
        ],
        "examples": [
          "Catat sumber saat riset, lalu cocokkan setiap kutipan dengan daftar referensi.",
          "Jangan mengubah beberapa kata saja dan menyebutnya parafrase."
        ],
        "rule": "Atribusikan gagasan, data, dan kata-kata yang berasal dari sumber."
      }
    ],
    "checklist": [
      "Aku menghubungkan klaim dengan bukti relevan.",
      "Aku membedakan parafrase dari salin-tempel.",
      "Aku mencantumkan sumber dan konsisten mengikuti style guide."
    ],
    "quiz": [
      {
        "prompt": "Parafrase yang bertanggung jawab harus...",
        "options": [
          "mengubah beberapa kata saja",
          "menyusun ulang gagasan dan tetap memberi sitasi",
          "menghapus nama sumber"
        ],
        "answer": 1
      },
      {
        "prompt": "Klaim sebab-akibat dari korelasi memerlukan...",
        "options": [
          "kehati-hatian dan bukti tambahan",
          "pernyataan mutlak",
          "penghapusan data"
        ],
        "answer": 0
      },
      {
        "prompt": "Mengapa gaya sitasi harus konsisten?",
        "options": [
          "agar sumber dapat ditelusuri",
          "agar semua paragraf sama panjang",
          "agar sitasi tidak perlu dibaca"
        ],
        "answer": 0
      },
      {
        "prompt": "Sitasi yang benar...",
        "options": [
          "menggantikan analisis penulis",
          "menunjukkan asal gagasan/sumber",
          "hanya dibutuhkan untuk kutipan langsung"
        ],
        "answer": 1
      },
      {
        "prompt": "Jika data hanya menunjukkan hubungan, klaim paling tepat adalah...",
        "options": [
          "X menyebabkan Y",
          "X berasosiasi dengan Y",
          "X selalu menghasilkan Y"
        ],
        "answer": 1
      }
    ]
  },
  "04-advanced-formal/12-editing-precision": {
    "level": "Level 4 · Advanced-Formal",
    "number": "12",
    "title": "Editing & Precision",
    "intro": "Penyuntingan presisi memeriksa agreement, struktur paralel, modifier, pilihan kata, dan tanda baca agar makna tepat serta mudah dipahami.",
    "focus": "grammar, scope and concise wording",
    "sections": [
      {
        "title": "1. Agreement dan parallelism",
        "paragraphs": [
          "Pastikan subject cocok dengan verb, terutama jika frasa panjang memisahkan keduanya. Unsur dalam daftar atau pasangan koordinatif sebaiknya memiliki bentuk grammar paralel."
        ],
        "examples": [
          "The list of changes is attached. (subject: list)",
          "The role requires planning, writing, and editing. (semua gerund)"
        ]
      },
      {
        "title": "2. Modifier dan pilihan kata",
        "paragraphs": [
          "Letakkan modifier dekat unsur yang dijelaskan. Pilih kata dengan makna tepat dan hilangkan pengulangan yang tidak menambah informasi."
        ],
        "examples": [
          "Ambigu: She discussed the report with the manager that was incomplete.",
          "Lebih jelas: She discussed the incomplete report with the manager."
        ],
        "rule": "Periksa siapa melakukan apa, apa yang diterangkan modifier, dan apakah ada makna ganda."
      }
    ],
    "checklist": [
      "Aku dapat memeriksa subject–verb agreement.",
      "Aku dapat memperbaiki struktur daftar yang tidak paralel.",
      "Aku menempatkan modifier dekat kata yang dijelaskannya."
    ],
    "quiz": [
      {
        "prompt": "The list of proposed changes ___ attached.",
        "options": [
          "are",
          "is",
          "were"
        ],
        "answer": 1
      },
      {
        "prompt": "Pilih struktur paralel.",
        "options": [
          "The role involves planning, writing, and editing.",
          "The role involves planning, writing, and to edit.",
          "The role involves to plan, writing, and editing."
        ],
        "answer": 0
      },
      {
        "prompt": "Modifier sebaiknya diletakkan...",
        "options": [
          "sedekat mungkin dengan kata yang diterangkan",
          "selalu di awal paragraf",
          "setelah tanda titik"
        ],
        "answer": 0
      },
      {
        "prompt": "Tujuan editing presisi adalah...",
        "options": [
          "menambah kata sebanyak mungkin",
          "menjaga makna akurat dan jelas",
          "menghapus semua conjunction"
        ],
        "answer": 1
      },
      {
        "prompt": "Kalimat mana paling jelas?",
        "options": [
          "While reviewing the report, the errors were obvious.",
          "While reviewing the report, I noticed several errors.",
          "The report, while reviewing, obvious errors."
        ],
        "answer": 1
      }
    ]
  }
};
