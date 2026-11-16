export type SubLevelKey = "simple" | "intermediate" | "complex";

export interface ConceptItem {
  name: string;
  subtitle?: string;
  explanation: string;
  subTypes?: string;
  clue?: string;
  example: string;
  exampleNote?: string;
  wrong?: string;
  right?: string;
}

export interface ContrastPair {
  wrong: string;
  right: string;
  note: string;
}

export interface StagePedagogy {
  introLead?: string;
  concepts?: ConceptItem[];
  formula?: string;
  formulaNote?: string;
  contrasts?: ContrastPair[];
  memoryTip: string;
  commonTrap: string;
}

export type ModulePedagogyMap = Partial<Record<SubLevelKey, StagePedagogy>>;

export const LESSON_ENRICHMENT: Record<string, ModulePedagogyMap> = {
  "00-foundation/01-parts-of-speech": {
    simple: {
      introLead:
        "**Parts of Speech** adalah *peran kerja* sebuah kata di dalam kalimat. Kata yang sama bisa berpindah kelas tergantung posisinya—jadi jangan hanya menghafal arti kamus, tapi kenali **fungsi**, **posisi**, dan **ciri akhirannya**.",
      concepts: [
        {
          name: "1. Noun (Kata Benda)",
          subtitle: "Penamaan Orang, Benda, Tempat & Ide",
          explanation:
            "Menamai **segala hal yang bisa menjadi pokok pembicaraan**, baik yang terlihat oleh mata maupun konsep abstrak.",
          subTypes:
            "**Concrete** (*table, manager, train*) vs **Abstract** (__success__, __information__, __happiness__). Juga terbagi menjadi **Countable** (bisa dihitung) dan **Uncountable** (tidak bisa dihitung: *water, advice*).",
          clue:
            "Akhiran populer: __-tion__ (*education*), __-ment__ (*agreement*), __-ness__ (*kindness*), __-ity__ (*quality*). Biasa berdiri sebagai **Subject** atau **Object** setelah *a/an/the* atau *my*.",
          example: "The manager reviewed the final decision.",
          exampleNote: "manager (noun konkret) · decision (noun abstrak berakhiran -ion)",
        },
        {
          name: "2. Pronoun (Kata Ganti)",
          subtitle: "Pengganti Noun agar Kalimat Tidak Berulang",
          explanation:
            "Menggantikan *Noun* yang sudah jelas rujukannya supaya kalimat terdengar alami dan ringkas.",
          subTypes:
            "**Subject** (*I, you, he, she, it, we, they*) vs **Object** (*me, you, him, her, it, us, them*) vs **Possessive** (*my/mine, their/theirs*).",
          clue:
            "Sebelum *Verb* wajib pakai **Subject Pronoun** (`I`, `he`, `they`); setelah *Verb* atau *Preposition* wajib pakai **Object Pronoun** (`me`, `him`, `them`).",
          example: "She called him before the meeting started.",
          exampleNote: "she (subject pronoun) · him (object pronoun setelah verb called)",
          wrong: "Me and Andi sent the file.",
          right: "Andi and I sent the file.",
        },
        {
          name: "3. Verb (Kata Kerja)",
          subtitle: "Jantung Kalimat: Aksi atau Kondisi",
          explanation:
            "Menunjukkan **tindakan** atau **keadaan/eksistensi**. Tanpa *Verb*, susunan kata bahasa Inggris **belum menjadi kalimat utuh**.",
          subTypes:
            "**Action Verb** (*write, run, deliver*) vs **Linking/State Verb** (`am/is/are`, *seem, feel, know, own*).",
          clue:
            "Tes cepat: coba ubah ke bentuk lampau (*V2*) atau tambah *-ing*. Kata yang berubah mengikuti waktu kalimat itulah *Verb*-nya.",
          example: "She designs websites and feels proud.",
          exampleNote: "designs (action verb) · feels (linking/state verb)",
        },
        {
          name: "4. Adjective (Kata Sifat)",
          subtitle: "Pemberi Sifat, Ukuran, Warna, atau Jumlah pada Noun",
          explanation:
            "Menjelaskan atau membatasi makna **Noun** atau **Pronoun** (menjawab pertanyaan *'yang seperti apa?'*).",
          subTypes:
            "Deskriptif (*curious, reliable, clean*) maupun pembatas (*many, several, this*).",
          clue:
            "Akhiran khas: __-ful__ (*careful*), __-ous__ (*curious*), __-able__ (*reliable*), __-ive__ (*active*). Posisi terbalik dari bahasa Indonesia: letakkan **sebelum Noun** (`Adjective + Noun`) atau setelah `to be`.",
          example: "The curious student keeps a tidy notebook.",
          exampleNote: "curious menjelaskan student · tidy menjelaskan notebook",
          wrong: "We stayed in a hotel modern.",
          right: "We stayed in a modern hotel.",
        },
        {
          name: "5. Adverb (Kata Keterangan)",
          subtitle: "Penjelas Cara, Waktu, Tempat & Tingkat",
          explanation:
            "Menjelaskan **Verb** (bagaimana cara melakukannya), **Adjective** (seberapa tingginya), **Adverb lain**, atau kalimat utuh.",
          subTypes:
            "**Manner** (*quietly, fast*), **Frequency** (*usually, never*), **Degree** (*very, extremely*), **Time/Place** (*yesterday, here*).",
          clue:
            "Banyak dibentuk dari `Adjective + `__`-ly`__ (*careful → carefully*, *quiet → quietly*). Namun hati-hati dengan bentuk tak beraturan seperti *good → well* dan *fast → fast*.",
          example: "The team worked remarkably fast.",
          exampleNote: "remarkably (menjelaskan adverb fast) · fast (menjelaskan verb worked)",
          wrong: "Your plan sounds well.",
          right: "Your plan sounds good.",
        },
        {
          name: "6. Preposition (Kata Depan)",
          subtitle: "Penghubung Noun dengan Bagian Kalimat Lain",
          explanation:
            "Menunjukkan hubungan **tempat, waktu, arah, atau alat** antara sebuah *Noun/Pronoun* dengan kalimat.",
          subTypes:
            "*in, on, at, under, before, after, with, despite, because of*.",
          clue:
            "Aturan emas: setelah **Preposition** wajib berupa **Noun, Pronoun, atau Verb-ing**—tidak pernah diikuti kalimat lengkap (`Subject + Verb`).",
          example: "She put the report on the desk before noon.",
          exampleNote: "on + the desk (noun phrase) · before + noon (noun)",
        },
        {
          name: "7. Conjunction (Kata Hubung)",
          subtitle: "Perekat Antarkata, Frasa, atau Klausa Lengkap",
          explanation:
            "Menghubungkan dua gagasan sejajar (*and, but, or, so*) atau menunjukkan hubungan sebab-akibat/waktu antar klausa (*because, although, when, after*).",
          subTypes:
            "**Coordinating** (FANBOYS: *for, and, nor, but, or, yet, so*) vs **Subordinating** (*because, although, if, while*).",
          clue:
            "Jika diikuti **Subject + Verb**, kata seperti *after, before, until* berfungsi sebagai **Conjunction** (bukan Preposition).",
          example: "They checked the figures and sent the email because the deadline was near.",
          exampleNote: "and menghubungkan dua verb · because menghubungkan dua klausa lengkap",
        },
        {
          name: "8. Interjection (Kata Seru)",
          subtitle: "Ungkapan Emosi Spontan",
          explanation:
            "Mengekspresikan reaksi tiba-tiba seperti kaget, kagum, atau kecewa. Biasanya berdiri terpisah di awal kalimat dengan tanda seru atau koma.",
          clue:
            "Tidak terikat aturan tata bahasa inti kalimat (tidak memengaruhi *Subject* maupun *Verb*).",
          example: "Wow, you finished the entire draft before lunch!",
          exampleNote: "Wow = interjection penanda kagum",
        },
      ],
      formula: "Kalimat Inti = Subject (Noun/Pronoun) + Verb + [Object / Complement]",
      formulaNote:
        "Tambahkan **Adjective** sebelum Noun dan **Adverb** untuk menerangkan Verb atau Adjective.",
      memoryTip:
        "Gunakan jembatan **PAN-VAP-CI**: **P**ronoun-**A**djective-**N**oun (kelompok benda), **V**erb-**A**dverb (kelompok aksi), **P**reposition-**C**onjunction (kata hubung), **I**nterjection (seruan). Saat ragu, cek kata *setelahnya*—apakah berupa benda atau kalimat lengkap.",
      commonTrap:
        "Penutur Indonesia sering menyangka semua kata berakhiran `-ly` pasti Adverb (padahal *friendly* dan *lovely* adalah **Adjective**!), serta tertukar memakai `me` sebagai subjek (*Me and Budi...* ✗ → *Budi and I...* ✓).",
    },
    intermediate: {
      introLead:
        "Di bahasa Inggris, satu kata bisa menjadi **\"kata bunglon\"** yang berganti kelas sesuai tugasnya di kalimat. Jangan tebak dari bentuk tulisannya—**uji posisi dan kata di sebelahnya**.",
      contrasts: [
        {
          wrong: "✗ Clean the room is very important. (Memakai Verb dasar sebagai Subject)",
          right: "✓ Cleaning the room is important. / I like the clean room.",
          note: "`clean` di belakang `the` + noun `room` adalah **Adjective** (*bersih*), sedangkan `Please clean the room` adalah **Verb** (*bersihkan*).",
        },
        {
          wrong: "✗ After the meeting, we went home. (Mengira `after` di sini adalah Conjunction)",
          right: "✓ after + the meeting (Preposition) vs after + the meeting ended (Conjunction)",
          note: "Ikuti rumus uji: ketemu **Noun saja → Preposition**; ketemu **Subject + Verb → Conjunction**.",
        },
      ],
      formula: "Uji Posisi: [The/A/My + ___ + Noun] = Adjective  |  [Subject + ___ + Object] = Verb",
      memoryTip:
        "Setiap melihat kata bermakna ganda (*work, clean, water, book, fast*), tutupi kata itu dan lihat tetangganya: ada **the/a** tanpa benda lain di belakangnya? Berarti itu **Noun** (`book`). Memberi perintah atau ikut subjek? Itu **Verb** (`Book a ticket`).",
      commonTrap:
        "Hati-hati dengan pasangan kata yang terlihat mirip namun beda kelas: *affect* (**Verb**: memengaruhi) vs *effect* (**Noun**: dampak/efek); *advise* (**Verb**) vs *advice* (**Noun**).",
    },
    complex: {
      introLead:
        "Pada level kerja profesional dan tes **IELTS Reading/Writing**, kamu bisa menebak kelas kata yang asing—dan memilih bentukan kata yang tepat di kalimat rumpang—hanya dari **Word Families** (keluarga akhiran kata).",
      concepts: [
        {
          name: "Strategi Word Families (Satu Akar, Empat Peran)",
          subtitle: "Dari Verb → Noun → Adjective → Adverb",
          explanation:
            "Perhatikan bagaimana satu akar kata berubah peran lewat akhiran (*suffix*): **create** (*Verb*) → **creation** (*Noun*) → **creative** (*Adjective*) → **creatively** (*Adverb*).",
          clue:
            "Jika di kalimat ada pola `Verb + ___` lalu diikuti benda, periksa apakah butuh **Adjective** (*creative solutions*) atau jika ditaruh di belakang Verb butuh **Adverb** (*solved it creatively*).",
          example: "The careful reviewer checked the financial figures carefully.",
          exampleNote: "careful (Adj sebelum noun) · carefully (Adv menerangkan cara memeriksa)",
        },
      ],
      formula: "Pola Rumpang Akademis: The + [Adverb] + [Adjective] + [Noun] + [Verb] + [Adverb]",
      memoryTip:
        "Saat ragu mengisi soal *sentence completion* IELTS, tentukan dulu **kelas kata apa yang hilang** sebelum mencari artinya—apakah posisi itu butuh *Noun* (`-tion/-ment`), *Adjective* (`-ive/-al`), atau *Adverb* (`-ly`).",
      commonTrap:
        "Banyak siswa menaruh **Noun** di tempat yang butuh **Adjective** (*important decision* ✓, bukan *importance decision* ✗) atau sebaliknya lupa mengubah Verb menjadi Noun setelah `the` (*the creation* ✓, bukan *the create* ✗).",
    },
  },

  "00-foundation/02-sentence-svo": {
    simple: {
      introLead:
        "Kalimat bahasa Inggris dibangun di atas kerangka wajib **S + V + (O)**. Berbeda dengan bahasa Indonesia yang terkadang boleh tanpa kata kerja (*'Saya sibuk'*), kalimat Inggris **wajib punya Verb** (termasuk `to be`).",
      formula: "Subject (Pelaku) + Verb (Aksi/Keadaan) + Object (Sasaran) + [Keterangan Tempat/Waktu]",
      contrasts: [
        {
          wrong: "✗ Yesterday the technician the cable replaced.",
          right: "✓ The technician replaced the cable yesterday.",
          note: "Jangan memindahkan **Object** ke depan **Verb** atau memutus pasangan `Subject → Verb` dengan keterangan waktu di tengah tanpa alasan.",
        },
      ],
      memoryTip:
        "Ingat urutan **Siapa → Melakukan Apa → Kepada Siapa → Di Mana / Kapan**. Waktu (`yesterday`, `every day`) hampir selalu diletakkan di **paling belakang** atau **paling awal**, jarang menyempil di antara Verb dan Object.",
      commonTrap:
        "Kesalahan paling sering: menaruh keterangan di antara **Verb** dan **Object** (`I like very much coffee` ✗ → `I like coffee very much` ✓).",
    },
    intermediate: {
      formula: "Transitive Verb + Object  vs  Intransitive Verb + [Tanpa Object]",
      memoryTip:
        "Untuk cek apakah sebuah verb punya **Object**, ajukan pertanyaan *'apa?'* atau *'siapa?'* sesudah verb. *Opened* what? *The door* (Object). *Arrived* what? Tidak ada! (*before noon* adalah keterangan waktu, bukan Object).",
      commonTrap:
        "Jangan menganggap semua kata setelah verb adalah Object—frasa berawalan preposisi seperti *at the station* atau *in the morning* adalah **Adverbial (Keterangan)**, bukan Object.",
    },
    complex: {
      formula: "Subject (Noun Phrase) + Auxiliary/Main Verb + Object + Place before Time",
      memoryTip:
        "Jika ada banyak keterangan di belakang kalimat, gunakan rumus **MPT (Manner – Place – Time)**: *She spoke **calmly** (M) **in the room** (P) **yesterday** (T)*.",
      commonTrap:
        "Jangan membalik urutan Object ke posisi depan hanya untuk penekanan (*This report I finished* ✗); gunakan struktur **Passive Voice** bila ingin menyorot objek di depan kalimat.",
    },
  },

  "00-foundation/03-to-be": {
    simple: {
      introLead:
        "`To be` (`am / is / are`) berfungsi sebagai **jembatan penghubung** ketika kalimat **tidak memiliki kata kerja aksi**—yaitu saat kita menjelaskan sifat (*adjective*), identitas (*noun*), atau lokasi (*preposition*).",
      formula: "I + am  |  He / She / It / Tunggal + is  |  You / We / They / Jamak + are",
      contrasts: [
        {
          wrong: "✗ The office very quiet today. (Menghilangkan to be)",
          right: "✓ The office is very quiet today.",
          note: "Bahasa Indonesia sering menulis *'Kantor sangat sepi'*, tetapi bahasa Inggris **wajib** memakai `is` di depan kata sifat *quiet*.",
        },
      ],
      memoryTip:
        "Pakai tes satu detik: kalau kalimatmu hanya berisi **Kata Benda (`a student`)**, **Kata Sifat (`ready`)**, atau **Lokasi (`at home`)**, berarti **wajib panggil `am/is/are`**!",
      commonTrap:
        "Jangan mencampur `to be` dengan `Verb 1` aktif sekaligus (*She is work here* ✗ → *She works here* ✓ atau *She is working here* ✓).",
    },
    intermediate: {
      formula: "Negatif: Subject + am/is/are + not  |  Tanya: Am/Is/Are + Subject + ...?",
      memoryTip:
        "Kalimat dengan `to be` **tidak butuh** kata bantu `do/does`! Cukup pindahkan `is/are` ke depan subjek untuk bertanya (*Is the room ready?* ✓, bukan *Does the room ready?* ✗).",
      commonTrap:
        "Subjek yang diakhiri keterangan panjang tetap mengacu pada inti subjek pertama (*The books on the shelf **are** new*, bukan *is*).",
    },
    complex: {
      formula: "Formal Writing: hindari kontraksi berlebihan (use `is not / are not`)",
      memoryTip:
        "Dalam chat kerja pakai kontraksi agar hangat (*We aren't ready*), sedangkan dalam laporan formal atau esai IELTS tulis lengkap (*The data are not consistent*).",
      commonTrap:
        "Perhatikan **Uncountable Noun** (*information, advice, equipment*)—bentuknya selalu dianggap **tunggal** sehingga memakai `is`, bukan `are` (*The information is clear* ✓).",
    },
  },

  "00-foundation/04-articles": {
    simple: {
      formula: "a + bunyi konsonan  |  an + bunyi vokal (a, i, u, e, o)  |  the + sudah spesifik/diketahui",
      memoryTip:
        "Patokan memilih **a** vs **an** adalah **BUNYI saat diucapkan**, bukan huruf pertamanya! *An hour* (dibaca *auer* = vokal) ✓, *a university* (dibaca *yoo-niversity* = konsonan `y`) ✓.",
      commonTrap:
        "Sering tertukar: menulis *a hour* atau *an university* karena hanya melihat huruf awal, bukan bunyi pengucapan.",
    },
    intermediate: {
      formula: "Pertama disebut → a/an  |  Sudah sama-sama tahu / unik → the",
      memoryTip:
        "Bayangkan obrolan nyata: saat baru pertama mengenalkan benda ke pendengar pakai **a/an** (*I bought a laptop*), kalimat berikutnya langsung berubah menjadi **the** (*The laptop is fast*).",
      commonTrap:
        "Jangan memakai `the` untuk menyatakan hal umum dalam bentuk jamak (*The cats like fish* ✗ ketika maksudnya semua kucing secara umum → *Cats like fish* ✓).",
    },
    complex: {
      formula: "Zero Article (Ø): Uncountable/Plural umum · Negara tunggal · Bahasa & Mata pelajaran",
      memoryTip:
        "Ingat **Zero Article untuk hal general & abstrak** (*Education matters*, *She studies biology*), tapi pakai **the** untuk negara berbentuk kumpulan/republik (*the UK, the USA, the Philippines*).",
      commonTrap:
        "Kata benda tunggal yang bisa dihitung (**Singular Countable Noun**) **tidak pernah boleh tampil telanjang** tanpa *a/an/the/my/this* (*She sent email* ✗ → *She sent an email* ✓).",
    },
  },

  "00-foundation/05-nouns-plural": {
    simple: {
      formula: "Umum: + s  |  -s/-sh/-ch/-x/-o: + es  |  Konsonan+y: y → ies  |  Irregular: men/children",
      memoryTip:
        "Jika kata berakhir dengan bunyi mendesis (`s, sh, ch, x`), tambahkan **`-es`** agar mudah diucapkan (*box → boxes*, *watch → watches*). Untuk kata tak beraturan (*child → children, person → people*), hafalkan sekaligus berpasangan.",
      commonTrap:
        "Jangan menaruh `-s` pada irregular noun yang sudah jamak (*childrens* ✗, *peoples* ✗, *informations* ✗).",
    },
    intermediate: {
      formula: "Vokal + y → + s (days, keys)  |  Konsonan + y → ies (cities, stories)",
      memoryTip:
        "Lihat huruf tepat sebelum `y`: kalau ada huruf hidup (`a, e, i, o, u`) jangan ubah `y` (*boy → boys*), kalau huruf mati barulah `y` berubah menjadi `ies` (*city → cities*).",
      commonTrap:
        "Kata benda berpasangan seperti *scissors, glasses, trousers* selalu berbentuk jamak dan pakai `are`, kecuali diawali `a pair of ...` yang kembali tunggal (*is*).",
    },
    complex: {
      formula: "each / every + Noun Tunggal  vs  many / several / a number of + Noun Jamak",
      memoryTip:
        "Kata penunjuk **each** dan **every** selalu menarik noun kembali ke bentuk **tunggal** meski maknanya mencakup banyak orang (*Each student gets a card* ✓).",
      commonTrap:
        "Menganggap **Uncountable Noun** (*advice, luggage, equipment, feedback*) punya bentuk jamak (*many feedbacks* ✗ → *much feedback / pieces of feedback* ✓).",
    },
  },

  "00-foundation/06-pronouns": {
    simple: {
      formula: "Subject (I, he, she, they) + Verb + Object (me, him, her, them)",
      contrasts: [
        {
          wrong: "✗ Her and I visited the client.",
          right: "✓ She and I visited the client.",
          note: "Sebelum kata kerja *visited* adalah posisi Subject—pakai `She`, bukan `Her`.",
        },
      ],
      memoryTip:
        "Saat subjeknya dua orang (*Rina and I/me*), coba hilangkan nama orang pertama di pikiranmu: mana yang benar, *Me visited* atau *I visited*? Pasti **I visited** → maka jawabannya *Rina and I*!",
      commonTrap:
        "Tertukar menggunakan `it's` (= *it is*, dengan apostrof) saat ingin menyatakan kepemilikan (*The cat licked its paw* ✓, tanpa apostrof!).",
    },
    intermediate: {
      formula: "Possessive Adjective + Noun (my book)  vs  Possessive Pronoun berdiri sendiri (mine)",
      memoryTip:
        "**My / Your / Their** sifatnya selalu *gandengan tangan* dengan benda di belakangnya (`my phone`), sedangkan **Mine / Yours / Theirs** berdiri **sendiri** tanpa benda di belakangnya (`This is mine`).",
      commonTrap:
        "Menulis `hers book` atau `theirs car` ✗—yang benar **her book / their car** ✓.",
    },
    complex: {
      formula: "Reflexive Pronoun (-self / -selves): Subject & Object merujuk orang yang sama",
      memoryTip:
        "Pakai **-self / -selves** hanya bila pelaku dan korban aksinya orang yang sama (*She taught herself coding*) atau untuk penekanan (*I fixed it myself*).",
      commonTrap:
        "Menulis bentuk `hisself` atau `theirself` ✗—bentuk baku yang benar adalah **himself** dan **themselves** ✓.",
    },
  },

  "00-foundation/07-present-simple": {
    simple: {
      formula: "I / You / We / They + Verb 1  |  He / She / It / Tunggal + Verb + -s/-es",
      memoryTip:
        "Ingat aturan **Orang Ketiga Tunggal Suka Huruf S**: kalau subjeknya satu orang/benda selain *I/you* (`She, Mira, The office`), tempelkan **`-s / -es`** pada kata kerjanya!",
      commonTrap:
        "Melupakan akhiran `-s/-es` pada subjek tunggal (*Mira check the email* ✗ → *Mira **checks** the email* ✓) atau menaruh `is` di depan V1 (*She is works here* ✗).",
    },
    intermediate: {
      formula: "Negatif/Tanya: do / does + Verb Dasar (hilangkan -s pada Verb utama!)",
      memoryTip:
        "Bayangkan `does` sebagai magnet yang **menyedot huruf -s** dari kata kerja! Begitu muncul `does / doesn't`, kata kerjanya wajib kembali telanjang (*Does she work?* ✓, bukan *Does she works?* ✗).",
      commonTrap:
        "Masih menempelkan `-s` setelah `doesn't` (*He doesn't likes coffee* ✗ → *He doesn't like coffee* ✓) dan salah menaruh `always/usually` sebelum `to be` (*She always is late* ✗ → *She is always late* ✓).",
    },
    complex: {
      formula: "Rutinitas / Fakta / Jadwal / Stative Verb → Present Simple  |  Sementara saat ini → Continuous",
      memoryTip:
        "Waspadai kata kerja perasaan/pikiran (**Stative Verbs**: *know, understand, own, need, belong*). Walau sedang berlangsung sekarang, hampir selalu pakai **Present Simple** (*I understand now* ✓).",
      commonTrap:
        "Memakai `-ing` untuk jadwal resmi yang tetap (*The train is leaving at 08:00 every day* ✗ → *The train leaves at 08:00* ✓) atau *I am knowing* ✗.",
    },
  },

  "00-foundation/08-present-continuous": {
    simple: {
      formula: "Subject + am / is / are + Verb-ing (sedang berlangsung sekarang)",
      memoryTip:
        "Formula wajib **kembar dua**: `to be` + `V-ing`. Kalau salah satunya hilang (*She working* ✗ atau *She is work* ✗), kalimatnya langsung patah!",
      commonTrap:
        "Lupa menyertakan `am/is/are` sebelum `V-ing` (*I writing an email now* ✗ → *I am writing an email now* ✓).",
    },
    intermediate: {
      formula: "Temporary Trend: This week / currently / right now → Present Continuous",
      memoryTip:
        "Meski tidak terjadi tepat detik ini di depan mata, aktivitas **sementara** minggu/bulan ini (*I'm taking an IELTS course this month*) tetap memakai Present Continuous.",
      commonTrap:
        "Salah mengeja akhiran `-ing`: kata berujung `-e` dibuang `e`-nya (*make → making*, *write → writing*), konsonan tunggal pendek digandakan (*sit → sitting*, *run → running*).",
    },
    complex: {
      formula: "Action (am working) vs Stative (know, want, prefer — jarang pakai -ing)",
      memoryTip:
        "Bedakan makna dinamis vs statis: *have* = memiliki (statis: *I have two laptops*) vs *having* = sedang makan/mengalami aktivitas (*We are having lunch*).",
      commonTrap:
        "Memakai `Present Continuous` untuk kebiasaan sehari-hari (*Every day I am waking up at 6* ✗ → *Every day I wake up at 6* ✓).",
    },
  },

  "00-foundation/09-prepositions-basic": {
    simple: {
      formula: "IN (Luas: bulan, tahun, kota, ruang tertutup) > ON (Sedang: hari, tanggal, permukaan) > AT (Titik Persis: jam, alamat tepat)",
      memoryTip:
        "Bayangkan **Piramida Terbalik IN → ON → AT**: semakin mengerucut ke titik waktu/lokasi paling spesifik, urutannya selalu **IN** (*in 2026 / in Jakarta*) → **ON** (*on Monday / on the table*) → **AT** (*at 09:00 / at the entrance*).",
      commonTrap:
        "Tertukar `in` vs `on` untuk tanggal lengkap (*in July 15th* ✗ → **on** *July 15th* ✓) dan lupa bahwa *morning/afternoon/evening* pakai **in**, tetapi *night* pakai **at** (*at night* ✓).",
    },
    intermediate: {
      formula: "at home / at work / on the bus / in the car",
      memoryTip:
        "Trik kendaraan besar vs kecil: jika kamu **bisa berdiri & berjalan** di dalamnya pakai **on** (*on the bus, on a plane, on a train*), jika harus **duduk membungkuk masuk** pakai **in** (*in a car, in a taxi*).",
      commonTrap:
        "Menaruh `to` sebelum `home` (*go to home* ✗ → *go home* ✓).",
    },
    complex: {
      formula: "Preposition + Gerund (Verb-ing)  — e.g. interested in learning / good at writing",
      memoryTip:
        "Jika setelah preposisi (*in, on, at, for, before, after*) kamu perlu menaruh kata kerja, **ubah otomatis ke `V-ing`** (*Thank you for helping* ✓).",
      commonTrap:
        "Menaruh `V1` telanjang sesudah *for* atau *after* (*after finish work* ✗ → *after finishing work* ✓).",
    },
  },

  "01-elementary/01-past-simple": {
    simple: {
      formula: "Regular: Verb + -ed  |  Irregular: V2 (went, saw, wrote)  |  To Be Past: was / were",
      memoryTip:
        "Past Simple untuk waktu lampau yang **sudah tutup buku/selesai** (*yesterday, last night, in 2020*). Cek saja apakah waktunya masih berlanjut atau sudah putus—kalau sudah putus, pakai **V2**!",
      commonTrap:
        "Menambahkan `-ed` pada verb tidak beraturan (*goed* ✗, *buyed* ✗, *writed* ✗) atau memakai `did` sekaligus V2 (*I did went* ✗).",
    },
    intermediate: {
      formula: "Negatif/Tanya: didn't + Verb 1  |  Did + Subject + Verb 1?",
      memoryTip:
        "Sama seperti magnet `does`, begitu ada **`did` / `didn't`**, bentuk lampau sudah diambil alih oleh `did` sehingga kata kerjanya **wajib kembali ke V1** (*Did you call?* ✓, bukan *Did you called?* ✗).",
      commonTrap:
        "Menggunakan `did` untuk kata sifat (*Did you tired?* ✗ → *Were you tired?* ✓).",
    },
    complex: {
      formula: "Narasi berurutan: First S + V2, then S + V2, finally S + V2",
      memoryTip:
        "Untuk menceritakan kronologi rapat, laporan insiden, atau pengalaman kerja di wawancara, rangkai aksi berurutan secara konsisten dengan **V2** tanpa lompat mendadak ke Present.",
      commonTrap:
        "Tergelincir kembali ke V1 di kalimat kedua saat bercerita kejadian kemarin (*Yesterday I met the client and we discuss the budget* ✗ → *discussed* ✓).",
    },
  },

  "01-elementary/04-comparatives": {
    simple: {
      formula: "Pendek (1 suku kata): adj + -er + than  |  Panjang (2+ suku kata): more + adj + than",
      memoryTip:
        "Hitung ketukan suaranya! Kata pendek (*fast → faster*) cukup tambah `-er`; kata panjang (*expensive → more expensive*) panggil **more** supaya mulut tidak pegal!",
      commonTrap:
        "Memakai penanda ganda sekaligus: *more faster* ✗ atau *most best* ✗.",
    },
    intermediate: {
      formula: "Superlative: the + adj-est  |  the most + adj  |  Bentuk tak beraturan: good → better → best",
      memoryTip:
        "Saat membandingkan **3 hal atau lebih** (*di kelas, di kantor, di dunia*), wajib pakai **`the`** di depan superlative (*the quickest route* ✓).",
      commonTrap:
        "Lupa bahwa *bad → worse → the worst* dan *far → farther/further* tidak mengikuti aturan `-er` biasa.",
    },
    complex: {
      formula: "Setara: as + adj/adv + as  |  Penekanan IELTS Task 1: far / significantly / slightly + comparative",
      memoryTip:
        "Dalam **IELTS Writing Task 1** (mendeskripsikan grafik), tambahkan penguat presisi seperti *slightly higher than* (naik tipis) atau *considerably lower than* (turun tajam) untuk mendongkrak skor Lexical Resource.",
      commonTrap:
        "Memakai kata sifat bentuk comparative sesudah `as ... as` (*as better as* ✗ → *as good as* ✓).",
    },
  },

  "02-intermediate/01-present-perfect-vs-past": {
    simple: {
      formula: "Present Perfect: have/has + V3 (Waktu tak spesifik / masih berdampak)  vs  Past Simple: V2 (Waktu lampau jelas)",
      memoryTip:
        "Tanyakan satu hal: **'Kapan tepatnya terjadi?'** Jika ada stempel waktu mati (*yesterday, in 2019, two days ago*) → wajib **Past Simple (V2)**. Jika fokus pada *pengalaman hidup atau hasil saat ini* tanpa stempel waktu mati → **Present Perfect**!",
      commonTrap:
        "Menggabungkan `have/has + V3` dengan keterangan waktu lampau mati (*I have met him yesterday* ✗ → *I met him yesterday* ✓).",
    },
    intermediate: {
      formula: "already / yet / just / ever / never → Present Perfect  |  for (durasi) vs since (titik awal)",
      memoryTip:
        "Bedakan **FOR** (hitungan lama waktu: *for 3 years*) dengan **SINCE** (tanggal/momen mulainya: *since 2023* / *since I graduated*).",
      commonTrap:
        "Memakai *since* untuk durasi (*since two hours* ✗ → *for two hours* ✓) dan menaruh *yet* pada kalimat positif biasa (*I have finished yet* ✗ → *already* ✓).",
    },
    complex: {
      formula: "IELTS Speaking: Pembuka pengalaman (have/has + V3) → Lanjut detail waktu tertentu (V2)",
      memoryTip:
        "Pola emas percakapan alami: **Buka dengan Present Perfect** (*I've visited Singapore twice*), lalu **lanjutkan detailnya dengan Past Simple** (*Last year, I went there for a conference*).",
      commonTrap:
        "Memakai Present Simple untuk durasi dari dulu sampai sekarang (*I work here since 2021* ✗ → *I have worked here since 2021* ✓).",
    },
  },

  "02-intermediate/04-passive-basic": {
    simple: {
      formula: "Kalimat Pasif = Subject (Sasaran) + To Be (sesuai tenses) + V3 (+ by Pelaku)",
      memoryTip:
        "Rumus inti pasif tidak pernah berubah sepanjang masa: **harus selalu ada keluarga `BE` + `V3`**. Jika `be` hilang, kalimat berubah jadi aktif; jika `V3` hilang, bukan pasif!",
      commonTrap:
        "Menulis pasif tanpa `to be` (*The report sent yesterday* ✗ → *The report **was sent** yesterday* ✓) atau memakai V1/V2 bukan V3 (*was wrote* ✗ → *was written* ✓).",
    },
    intermediate: {
      formula: "Present: is/are + V3  |  Past: was/were + V3  |  Future/Modal: will/must be + V3",
      memoryTip:
        "Untuk mengubah tenses kalimat pasif, **cukup ganti bentuk `BE`-nya saja** (*is sent → was sent → will be sent → has been sent*), sedangkan **V3 di belakang tetap diam**!",
      commonTrap:
        "Mengubah kata kerja tak berobjek (**Intransitive Verbs** seperti *happen, arrive, sleep, die*) menjadi pasif (*An accident was happened* ✗ → *An accident happened* ✓).",
    },
    complex: {
      formula: "Fokus proses ilmiah & IELTS Task 1 Process Diagram: hilangkan 'by people' yang tidak penting",
      memoryTip:
        "Dalam laporan teknis dan diagram proses **IELTS Task 1**, hindari menyebut *by someone/by workers* jika pelakunya sudah jelas dari konteks (*The beans are roasted at 200°C*).",
      commonTrap:
        "Menerjemahkan 'dibuat' menjadi *be make* ✗ alih-alih **is/are made** ✓.",
    },
  },

  "02-intermediate/05-conditionals-1-2": {
    simple: {
      formula: "Tipe 1 (Real Future): If + Present Simple, S + will/can + V1",
      memoryTip:
        "Ingat aturan ketat klausa **`If`**: jangan pernah menaruh `will` tepat di dalam anak kalimat `If`! Simpan `will` untuk kalimat hasilnya (*If it rains, we will stay* ✓).",
      commonTrap:
        "Menulis *If it will rain tomorrow...* ✗ (seharusnya *If it rains tomorrow...* ✓).",
    },
    intermediate: {
      formula: "Tipe 2 (Imajinasi / Tidak Nyata Sekarang): If + Past Simple (V2/were), S + would/could + V1",
      memoryTip:
        "Di Conditional Tipe 2, waktu dimundurkan satu langkah ke `V2/were` bukan karena masa lalu, melainkan sebagai sinyal **'berandai-andai tidak nyata sekarang'** (*If I had more time today, I would help you*).",
      commonTrap:
        "Mencampur Tipe 1 dan Tipe 2 (*If I won the lottery, I will buy a house* ✗ → *would buy* ✓).",
    },
    complex: {
      formula: "Formal Unreal Advice: If I were you, I would... (gunakan `were` untuk semua subjek)",
      memoryTip:
        "Dalam esai IELTS atau surat resmi, gunakan **`If I were` / `If the policy were`** daripada *was* untuk menaikkan nilai akurasi gramatikal.",
      commonTrap:
        "Melupakan koma saat `If` berada di depan kalimat (*If you agree we can start* kurang rapi → *If you agree, we can start*).",
    },
  },

  "03-upper-intermediate/06-inversion-basic": {
    simple: {
      formula: "Negative Adverb di Awal + Auxiliary (do/does/did/have/had) + Subject + Main Verb",
      memoryTip:
        "Bayangkan **Kata Negatif di Depan** (*Never, Rarely, Seldom, Not only*) bertindak seperti magnet kalimat tanya: posisi **Auxiliary** wajib ditarik maju mendahului **Subject** (*Never have I seen...* ✓, bukan *Never I have seen...* ✗).",
      commonTrap:
        "Lupa membalik urutan menjadi seperti pertanyaan setelah meletakkan *Never/Seldom* di awal kalimat.",
    },
    intermediate: {
      formula: "No sooner + had + S + V3 + than ...  |  Hardly + had + S + V3 + when ...",
      memoryTip:
        "Hafalkan pasangannya agar tidak tertukar di soal: **No sooner ... THAN** (pakai *than* seperti perbandingan `-er`), sedangkan **Hardly / Scarcely ... WHEN**!",
      commonTrap:
        "Tertukar memasangkan *No sooner ... when* ✗ atau lupa menyisipkan `did` pada Past Simple biasa (*Rarely did they complain* ✓).",
    },
    complex: {
      formula: "Not only + Aux + S + V, but also ...  |  Little did + S + know ...",
      memoryTip:
        "Inversion hanya diterapkan **sekali** pada klausa pembuka (*Not only did the plan save cost, but it also improved speed* ✓). Jangan menginversi klausa keduanya!",
      commonTrap:
        "Melakukan inversi ganda di kedua bagian kalimat *Not only ... but also*.",
    },
  },

  "04-advanced-formal/03-hedging": {
    simple: {
      formula: "Hedging = may / might / could + V1  |  appears / seems to + V1  |  tends to + V1",
      memoryTip:
        "Dalam tulisan akademis dan IELTS Writing Task 2, klaim yang terlalu mutlak (*all, always, proves*) dianggap lemah secara ilmiah. Gunakan **pelunak klaim (hedging)** untuk menunjukkan sikap objektif berbasis bukti.",
      commonTrap:
        "Menulis *This clearly proves that social media ruins every teenager* ✗ tanpa bukti absolut → gunakan *This **suggests** that social media **may negatively affect** many teenagers* ✓.",
    },
    intermediate: {
      formula: "Adverb Pelunak: largely, primarily, potentially, generally, relatively",
      memoryTip:
        "Ganti kata absolut (*everyone, never, 100%*) dengan kuantifier & adverb terukur (*the majority of, frequently, to some extent*) agar argumen sulit dibantah penguji.",
      commonTrap:
        "Memakai terlalu banyak hedging bertumpuk sekaligus (*It might possibly perhaps tend to seem...* ✗)—cukup 1–2 penanda per kalimat.",
    },
    complex: {
      formula: "Impersonal Academic Frame: It is widely acknowledged that... / The evidence indicates that...",
      memoryTip:
        "Gabungkan **Subjek Impersonal** (*It appears that / Preliminary findings indicate that*) agar tulisan terasa matang di level C1–C2.",
      commonTrap:
        "Memakai bahasa terlalu santai seperti *I guess / Maybe* dalam esai akademis formal.",
    },
  },
};

const LEVEL_FALLBACK_TIPS: Record<SubLevelKey, { tipPrefix: string; trapPrefix: string }> = {
  simple: {
    tipPrefix:
      "Fokus pada kerangka inti aturan ini terlebih dahulu. Ucapkan contoh kalimatnya keras-keras dengan tombol Listen agar telinga terbiasa dengan bunyi alaminya.",
    trapPrefix:
      "Jangan menerjemahkan kata demi kata dari bahasa Indonesia; selalu periksa kesesuaian Subject, Verb, dan penanda waktunya.",
  },
  intermediate: {
    tipPrefix:
      "Bandingkan bentuk positif, negatif, dan kalimat tanya sekaligus agar pola perubahannya menempel utuh, bukan terpisah-pisah.",
    trapPrefix:
      "Waspadai perubahan kata kerja bantu (auxiliary) atau urutan kata ketika konteks kalimat berubah menjadi negatif, pertanyaan, atau pengandaian.",
  },
  complex: {
    tipPrefix:
      "Uji aturan ini dalam paragraf nyata atau email kerja—tanyakan 'makna dan nuansa apa yang ingin kusampaikan?' sebelum memilih strukturnya.",
    trapPrefix:
      "Hindari pemakaian pola kaku yang tidak selaras dengan konteks keseluruhan kalimat (periksa keselarasan antar-klausa dan ketepatan register formal/santai).",
  },
};

export function getStagePedagogy(params: {
  moduleKey: string;
  stageKey: SubLevelKey;
  moduleTitle: string;
  focus: string;
  existingRule?: string;
}): StagePedagogy {
  const custom = LESSON_ENRICHMENT[params.moduleKey]?.[params.stageKey];
  if (custom) {
    return custom;
  }

  const fb = LEVEL_FALLBACK_TIPS[params.stageKey];
  const focusClean = params.focus.trim();

  const stageSpecificTip =
    params.stageKey === "simple"
      ? `Kunci utama **${params.moduleTitle}** ada pada pola __${focusClean}__. Tandai posisi setiap kata di contoh lalu coba buat 1 kalimat versimu sendiri.`
      : params.stageKey === "intermediate"
      ? `Saat naik ke tahap Intermediate di **${params.moduleTitle}**, perhatikan bagaimana pola __${focusClean}__ menyesuaikan bentuk ketika kalimat berubah konteks atau digabung.`
      : `Di level Complex & IELTS, gunakan **${params.moduleTitle}** (__${focusClean}__) untuk menyusun kalimat yang lebih ringkas, akurat, dan natural secara profesional.`;

  const stageSpecificTrap =
    params.stageKey === "simple"
      ? `Kesalahan umum di **${params.moduleTitle}**: mengabaikan bentuk dasar pola __${focusClean}__ atau meniru susunan bahasa Indonesia secara mentah.`
      : params.stageKey === "intermediate"
      ? `Jebakan umum: lupa menyelaraskan unsur pendamping pada pola __${focusClean}__ saat kalimat menjadi negatif, pertanyaan, atau majemuk.`
      : `Jebakan level lanjut: memaksakan struktur rumit tanpa mengecek kesesuaian register formal/santai maupun hubungan logika antar-klausa.`;

  return {
    formula: params.existingRule || (focusClean ? `Fokus Pola: ${focusClean}` : undefined),
    memoryTip: `${stageSpecificTip} ${fb.tipPrefix}`,
    commonTrap: `${stageSpecificTrap} ${fb.trapPrefix}`,
  };
}
