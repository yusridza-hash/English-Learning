(() => {
  const makeQuestion = (prompt, options, answer, explanation, extra = {}) => ({
    prompt, options, answer, explanation, ...extra
  });

  window.SKILL_GUIDE = {
    "00-foundation/01-parts-of-speech": {
      title: "Parts of Speech",
      levels: {
        simple: [
          makeQuestion("Identify the noun in this sentence.", ["cat", "runs", "quickly"], 0, "'cat' adalah kata benda (noun).", { skill: "pos-noun" }),

  window.SKILL_GUIDE = {
    "pos-noun": { label: "Noun", href: "00-foundation/01-parts-of-speech.html#materi-simple" },
    "pos-verb": { label: "Verb", href: "00-foundation/01-parts-of-speech.html#materi-simple" },
    "pos-adjective": { label: "Adjective", href: "00-foundation/01-parts-of-speech.html#materi-simple" },
    "pos-adverb": { label: "Adverb", href: "00-foundation/01-parts-of-speech.html#materi-simple" },
    "svo-order": { label: "Urutan SVO", href: "00-foundation/02-sentence-svo.html#materi-simple" },
    "to-be-form": { label: "Bentuk to be", href: "00-foundation/03-to-be.html#materi-simple" },
    "articles-a-an": { label: "Penggunaan a / an", href: "00-foundation/04-articles.html#materi-simple" },
    "articles-the": { label: "Penggunaan the", href: "00-foundation/04-articles.html#materi-intermediate" },
    "articles-zero": { label: "Tanpa article", href: "00-foundation/04-articles.html#materi-complex" },
    "plural-noun": { label: "Noun plural", href: "00-foundation/05-nouns-plural.html#materi-simple" },
    "pronoun-subject": { label: "Pronoun subjek", href: "00-foundation/06-pronouns.html#materi-simple" },
    "pronoun-object": { label: "Pronoun objek", href: "00-foundation/06-pronouns.html#materi-intermediate" },
    "present-simple-form": { label: "Bentuk Present Simple", href: "00-foundation/07-present-simple.html#materi-simple" },
    "present-simple-3s": { label: "Verb + -s / -es", href: "00-foundation/07-present-simple.html#materi-intermediate" },
    "present-simple-neg-q": { label: "Negatif & pertanyaan Present Simple", href: "00-foundation/07-present-simple.html#materi-complex" },
    "present-continuous-form": { label: "Bentuk Present Continuous", href: "00-foundation/08-present-continuous.html#materi-simple" },
    "preposition-basic": { label: "Preposisi dasar", href: "00-foundation/09-prepositions-basic.html#materi-simple" },
    "there-is-are": { label: "There is / There are", href: "00-foundation/10-there-is-are.html#materi-simple" },
    "can-ability": { label: "Can untuk kemampuan", href: "00-foundation/11-can-cannot.html#materi-simple" },
    "question-form": { label: "Pertanyaan dasar", href: "00-foundation/12-questions-basic.html#materi-simple" },
    "past-simple-regular": { label: "Past Simple beraturan", href: "01-elementary/01-past-simple.html#materi-simple" },
    "past-simple-irregular": { label: "Past Simple tidak beraturan", href: "01-elementary/01-past-simple.html#materi-intermediate" },
    "past-continuous": { label: "Past Continuous", href: "01-elementary/02-past-continuous.html#materi-simple" },
    "future-will-going": { label: "Will vs Going to", href: "01-elementary/03-future-will-going-to.html#materi-simple" },
    "comparative": { label: "Comparative", href: "01-elementary/04-comparatives.html#materi-simple" },
    "quantifier": { label: "Quantifier", href: "01-elementary/05-quantifiers.html#materi-simple" },
    "modal-basic": { label: "Modal dasar", href: "01-elementary/06-modals-basic.html#materi-simple" },
    "adverb-frequency": { label: "Adverb frekuensi", href: "01-elementary/07-adverbs-frequency.html#materi-simple" },
    "present-perfect": { label: "Present Perfect", href: "01-elementary/08-present-perfect-intro.html#materi-simple" },
    "preposition-dependent": { label: "Preposisi dependen", href: "01-elementary/09-prepositions-advanced.html#materi-simple" },
    "conjunction-basic": { label: "Conjunction dasar", href: "01-elementary/10-conjunctions-basic.html#materi-simple" },
    "present-perfect-vs-past": { label: "Present Perfect vs Past Simple", href: "02-intermediate/01-present-perfect-vs-past.html#materi-simple" },
    "present-perfect-continuous": { label: "Present Perfect Continuous", href: "02-intermediate/02-present-perfect-continuous.html#materi-simple" },
    "past-perfect": { label: "Past Perfect", href: "02-intermediate/03-past-perfect.html#materi-simple" },
    "passive-basic": { label: "Passive voice dasar", href: "02-intermediate/04-passive-basic.html#materi-simple" },
    "conditional-1-2": { label: "Conditional Type 1 & 2", href: "02-intermediate/05-conditionals-1-2.html#materi-simple" },
    "relative-clause": { label: "Relative clause", href: "02-intermediate/06-relative-clauses.html#materi-simple" },
    "reported-speech": { label: "Reported speech dasar", href: "02-intermediate/07-reported-speech-basic.html#materi-simple" },
    "gerund-infinitive": { label: "Gerund vs Infinitive", href: "02-intermediate/08-gerund-infinitive.html#materi-simple" },
    "modal-possibility": { label: "Modal kemungkinan", href: "02-intermediate/09-modals-possibility.html#materi-simple" },
    "phrasal-verb": { label: "Phrasal verb", href: "02-intermediate/10-phrasal-verbs-basic.html#materi-simple" },
    "question-tag": { label: "Question tag", href: "02-intermediate/11-question-tags.html#materi-simple" },
    "used-to-would": { label: "Used to / Would", href: "02-intermediate/12-used-to-would.html#materi-simple" },
    "past-perfect-continuous": { label: "Past Perfect Continuous", href: "03-upper-intermediate/01-past-perfect-continuous.html#materi-simple" },
    "future-perfect-continuous": { label: "Future Perfect Continuous", href: "03-upper-intermediate/02-future-perfect-continuous.html#materi-simple" },
    "conditional-3-mixed": { label: "Conditional Type 3 & Mixed", href: "03-upper-intermediate/03-conditionals-3-mixed.html#materi-simple" },
    "passive-advanced": { label: "Passive lanjutan", href: "03-upper-intermediate/04-passive-advanced.html#materi-simple" },
    "reported-speech-advanced": { label: "Reported speech lanjutan", href: "03-upper-intermediate/05-reported-speech-advanced.html#materi-simple" },
    "inversion-basic": { label: "Inversion dasar", href: "03-upper-intermediate/06-inversion-basic.html#materi-simple" },
    "cleft-sentence": { label: "Cleft sentence", href: "03-upper-intermediate/07-cleft-sentences.html#materi-simple" },
    "participle-clause": { label: "Participle clause", href: "03-upper-intermediate/08-participle-clauses.html#materi-simple" },
    "modal-perfect": { label: "Modal perfect", href: "03-upper-intermediate/09-modal-perfect.html#materi-simple" },
    "relative-clause-advanced": { label: "Relative clause lanjutan", href: "03-upper-intermediate/10-relative-clauses-advanced.html#materi-simple" },
    "linking-words": { label: "Linking words", href: "03-upper-intermediate/11-linking-words.html#materi-simple" },
    "nominalization-intro": { label: "Nominalization dasar", href: "03-upper-intermediate/12-nominalization-intro.html#materi-simple" },
    "complex-subordination": { label: "Complex subordination", href: "04-advanced-formal/01-complex-subordination.html#materi-simple" },
    "nominalization": { label: "Nominalization lanjutan", href: "04-advanced-formal/02-nominalization.html#materi-simple" },
    "hedging": { label: "Hedging", href: "04-advanced-formal/03-hedging.html#materi-simple" },
    "formal-register": { label: "Formal register", href: "04-advanced-formal/04-formal-register.html#materi-simple" },
    "collocation": { label: "Collocation", href: "04-advanced-formal/05-collocations.html#materi-simple" },
    "advanced-connectors": { label: "Advanced connectors", href: "04-advanced-formal/06-advanced-connectors.html#materi-simple" },
    "inversion-emphasis": { label: "Inversion penekanan", href: "04-advanced-formal/07-inversion-emphasis.html#materi-simple" },
    "ellipsis-substitution": { label: "Ellipsis & substitution", href: "04-advanced-formal/08-ellipsis-substitution.html#materi-simple" },
    "cohesion-coherence": { label: "Cohesion & coherence", href: "04-advanced-formal/09-cohesion-coherence.html#materi-simple" },
    "formal-email-report": { label: "Formal email & report", href: "04-advanced-formal/10-formal-email-report.html#materi-simple" },
    "academic-conventions": { label: "Academic conventions", href: "04-advanced-formal/11-academic-conventions.html#materi-simple" },
    "editing-precision": { label: "Editing & precision", href: "04-advanced-formal/12-editing-precision.html#materi-simple" },
  };
  window.QUESTION_BANK = {
    "00-foundation/01-parts-of-speech": {
      title: "Parts of Speech",
      levels: {
        simple: [
          makeQuestion("Pada ‘The child laughed loudly’, kata loudly adalah...", ["noun", "adverb", "adjective"], 1, "Loudly menjelaskan verb laughed, jadi adverb.", { skill: "pos-adverb" }),
          makeQuestion("Kata yang menggantikan noun disebut...", ["pronoun", "preposition", "conjunction"], 0, "Pronoun menggantikan noun.", { skill: "pos-noun" }),
          makeQuestion("Pada ‘a noisy street’, noisy berfungsi sebagai...", ["verb", "adjective", "adverb"], 1, "Noisy menjelaskan noun street, jadi adjective.", { skill: "pos-adjective" }),
        ],
        intermediate: [
          makeQuestion("Pada ‘The nurse checked the chart’, subject adalah...", ["The nurse", "checked", "the chart"], 0, "Subject adalah pelaku: The nurse.", { skill: "svo-order" }),
          makeQuestion("Pilih kalimat dengan urutan SVO.", ["The technician replaced the cable.", "Replaced the technician cable.", "The cable replaced the technician."], 0, "Subject + Verb + Object.", { skill: "svo-order" }),
          makeQuestion("I like the clean room. Kata clean berfungsi sebagai...", ["adjective", "verb", "adverb"], 0, "Clean menjelaskan noun room, jadi adjective.", { skill: "pos-adjective" }),
        ],
        complex: [
          makeQuestion("Pada ‘Please email me the report’, email adalah...", ["noun", "verb", "adverb"], 1, "Email di sini adalah verb (mengirim).", { skill: "pos-verb", wrongFeedback: { 0: ["Email bisa noun, tapi di sini setelah Please menunjukkan perintah/verb."] } }),
          makeQuestion("We arrived after lunch. After berfungsi sebagai...", ["preposition", "conjunction", "adverb"], 0, "After diikuti noun lunch, jadi preposition.", { skill: "svo-order", wrongFeedback: { 1: ["After conjunction jika diikuti klausa lengkap."] } }),
          makeQuestion("The careful reviewer checked carefully. Careful adalah...", ["adjective", "adverb", "noun"], 0, "Careful menjelaskan noun reviewer, jadi adjective.", { skill: "pos-adjective" }),
        ],
      },
    },
    "00-foundation/02-sentence-svo": {
      title: "Sentence: SVO",
      levels: {
        simple: [
          makeQuestion("Subject dalam ‘The coordinator sent the schedule’ adalah...", ["The coordinator", "sent", "the schedule"], 0, "Subject adalah pelaku: The coordinator.", { skill: "svo-order" }),
          makeQuestion("Verb dalam ‘She reads every day’ adalah...", ["She", "reads", "every day"], 1, "Reads adalah kata kerja.", { skill: "pos-verb" }),
          makeQuestion("Objek dalam ‘I sent an email’ adalah...", ["I", "sent", "an email"], 2, "An email adalah objek.", { skill: "svo-order" }),
        ],
        intermediate: [
          makeQuestion("Pilih kalimat dengan urutan SVO yang benar.", ["The technician replaced the cable.", "Replaced the technician cable.", "The cable replaced the technician."], 0, "Subjek + Verb + Objek.", { skill: "svo-order" }),
          makeQuestion("The courier arrived before noon. Arrived memiliki objek?", ["Ya, the courier", "Ya, before noon", "Tidak; arrived tanpa objek"], 2, "Arrived adalah intransitive verb.", { skill: "svo-order" }),
          makeQuestion("Subjek yang jelas membantu pembaca tahu...", ["siapa yang bertindak", "kata lebih banyak", "grammar lebih sulit"], 0, "Subjek jelas menjelaskan pelaku tindakan.", { skill: "svo-order" }),
        ],
        complex: [
          makeQuestion("‘The meeting lasted an hour’ memiliki objek?", ["Ya, meeting", "Ya, an hour", "Tidak; lasted tanpa objek"], 2, "Lasted intransitive; an hour adalah keterangan waktu.", { skill: "svo-order" }),
          makeQuestion("Jangan pindahkan objek ke depan kecuali...", ["kamu pakai pasif atau pertanyaan", "kata panjang", "subject tidak diketahui"], 0, "Hanya dalam pasif atau pertanyaan sengaja.", { skill: "svo-order" }),
          makeQuestion("The coordinator (S) sent (V) the schedule (O). To all staff adalah...", ["objek", "keterangan", "predikat"], 1, "To all staff adalah keterangan, bukan objek.", { skill: "svo-order" }),
        ],
      },
    },
    "00-foundation/03-to-be": {
      title: "To Be (am / is / are)",
      levels: {
        simple: [
          makeQuestion("The instructions ___ clear.", ["is", "are", "am"], 1, "Instructions jamak → are.", { skill: "to-be-form" }),
          makeQuestion("I ___ a student.", ["am", "is", "are"], 0, "I → am.", { skill: "to-be-form" }),
          makeQuestion("He ___ at home.", ["am", "is", "are"], 1, "He → is.", { skill: "to-be-form" }),
        ],
        intermediate: [
          makeQuestion("Pilih pertanyaan yang tepat.", ["Is the room available?", "Does the room available?", "The room is available?"], 0, "Pindahkan is ke depan subject.", { skill: "to-be-form" }),
          makeQuestion("Your reservation ___ confirmed, and your seats ___ near the exit.", ["is / are", "are / is", "are / are"], 0, "Reservation → is; seats → are.", { skill: "to-be-form" }),
          makeQuestion("The guests ___ ready yet.", ["aren't", "isn't", "am not"], 0, "Guests jamak → aren't.", { skill: "to-be-form" }),
        ],
        complex: [
          makeQuestion("Lengkapi pesan: ‘Your booking ___ confirmed.’", ["are", "is", "am"], 1, "Booking tunggal → is.", { skill: "to-be-form" }),
          makeQuestion("Hindari menghilangkan be pada deskripsi karena...", ["kalimat tidak lengkap", "kata lebih banyak", "grammar sulit"], 0, "Tanpa be, kalimat menjadi fragment.", { skill: "to-be-form" }),
          makeQuestion("The guests aren't ready yet. Aren't = ...", ["are not", "is not", "am not"], 0, "Aren't = are not untuk jamak.", { skill: "to-be-form" }),
        ],
      },
    },
    "00-foundation/04-articles": {
      title: "Articles (a / an / the)",
      levels: {
        simple: [
          makeQuestion("She wants ___ orange.", ["an", "a", "the"], 0, "Orange bunyi vokal → an.", { skill: "articles-a-an" }),
          makeQuestion("I bought ___ book. ___ book is on the table.", ["a, The", "the, A", "an, The"], 0, "Pertama a, kemudian The.", { skill: "articles-a-an" }),
          makeQuestion("She is ___ honest person.", ["an", "a", "the"], 0, "Honest bunyi vokal → an.", { skill: "articles-a-an" }),
        ],
        intermediate: [
          makeQuestion("___ water is essential for life. (makna umum)", ["Tanpa article", "The", "A"], 0, "Noun tak terhitung umum tanpa article.", { skill: "articles-zero" }),
          makeQuestion("He studies at ___ university.", ["a", "an", "the"], 0, "University bunyi /y/ → a.", { skill: "articles-a-an" }),
          makeQuestion("Pass me ___ salt on the table.", ["the", "a", "an"], 1, "Salt di meja spesifik → the.", { skill: "articles-the" }),
        ],
        complex: [
          makeQuestion("We waited for ___ hour.", ["an", "a", "the"], 0, "Hour bunyi vokal → an.", { skill: "articles-a-an" }),
          makeQuestion("___ feedback we received after the workshop was useful.", ["The", "A", "Tanpa article"], 0, "Feedback spesifik → The.", { skill: "articles-the" }),
          makeQuestion("Information tidak pakai...", ["a/an langsung", "the", "sama sekali"], 0, "Information tidak pakai a/an langsung.", { skill: "articles-zero", wrongFeedback: { 1: ["The bisa jika spesifik."] } }),
        ],
      },
    },
    "00-foundation/05-nouns-plural": {
      title: "Plural Nouns",
      levels: {
        simple: [
          makeQuestion("A hotel has twelve ___ available.", ["room", "rooms", "roomes"], 1, "Lebih dari satu → rooms.", { skill: "plural-noun" }),
          makeQuestion("Children adalah bentuk...", ["singular", "plural", "tidak diketahui"], 1, "Children jamak dari child.", { skill: "plural-noun" }),
          makeQuestion("We need two boxes. Boxes adalah...", ["singular", "plural", "tidak terhitung"], 1, "Boxes jamak dari box (-es).", { skill: "plural-noun" }),
        ],
        intermediate: [
          makeQuestion("Pilih kalimat tepat.", ["There are three buses outside.", "There are three bus outside.", "There is three buses outside."], 0, "Buses jamak butuh are dan -es.", { skill: "plural-noun" }),
          makeQuestion("Untuk satu benda ‘scissors’, gunakan...", ["a scissor", "a pair of scissors", "one scissors"], 1, "Scissors pluralia tantrum → a pair of.", { skill: "plural-noun" }),
          makeQuestion("Each child receives one card. Each kembali ke...", ["plural", "singular", "tidak berubah"], 1, "Each membuat subjek singular.", { skill: "plural-noun" }),
        ],
        complex: [
          makeQuestion("Pastikan angka cocok dengan bentuk noun karena...", ["jumlah harus sesuai", "kata lebih panjang", "grammar sulit"], 0, "Agreement angka dan noun menjaga kejelasan.", { skill: "plural-noun" }),
          makeQuestion("Noun bentuk plural tapi satu benda, seperti...", ["scissors", "box", "child"], 0, "Scissors satu tapi bentuk plural.", { skill: "plural-noun" }),
          makeQuestion("Bentuk jamak dari ‘study’ adalah...", ["studys", "studies", "study"], 1, "Konsonan + y → ies: studies.", { skill: "plural-noun" }),
        ],
      },
    },
    "00-foundation/06-pronouns": {
      title: "Pronouns",
      levels: {
        simple: [
          makeQuestion("The manager called ___ . (object pronoun untuk I)", ["I", "me", "my"], 1, "Object pronoun untuk I adalah me.", { skill: "pronoun-object" }),
          makeQuestion("This desk is her. / This desk is hers. / This desk is she.", ["This desk is her.", "This desk is hers.", "This desk is she."], 1, "Hers = possessive pronoun berdiri sendiri.", { skill: "pronoun-subject" }),
          makeQuestion("Nadia sent her supervisor the draft. She = ...", ["Nadia", "supervisor", "draft"], 0, "She merujuk pada Nadia.", { skill: "pronoun-subject" }),
        ],
        intermediate: [
          makeQuestion("Pilih kalimat benar.", ["This desk is her.", "This desk is hers.", "This desk is she."], 1, "Hers benar.", { skill: "pronoun-subject" }),
          makeQuestion("Please contact Maya or me. The final choice is ___.", ["ours", "our", "us"], 0, "Ours = possessive pronoun berdiri sendiri.", { skill: "pronoun-subject" }),
          makeQuestion("Jangan pakai reflexive sebagai subject biasa karena...", ["grammar akan salah", "kata lebih panjang", "tidak natural"], 0, "Reflexive bukan untuk subject.", { skill: "pronoun-subject" }),
        ],
        complex: [
          makeQuestion("The team completed the task by ___.", ["themselves", "them", "their"], 0, "By themselves = tim sendiri.", { skill: "pronoun-object" }),
          makeQuestion("Pastikan pembaca tahu pronoun merujuk ke siapa karena...", ["hindari kebingungan rujukan", "kata lebih banyak", "grammar sulit"], 0, "Rujukan tidak jelas membuat bingung.", { skill: "pronoun-subject" }),
          makeQuestion("Gunakan possessive form untuk...", ["menunjukkan kepemilikan", "membuat kalimat panjang", "mengganti verb"], 0, "Possessive menunjukkan kepemilikan.", { skill: "pronoun-subject" }),
        ],
      },
    },
    "00-foundation/07-present-simple": {
      title: "Present Simple",
      levels: {
        simple: [
          makeQuestion("My sister ___ to work at 8 every morning.", ["goes", "go", "is go"], 0, "My sister = she → goes.", { skill: "present-simple-3s" }),
          makeQuestion("I ___ coffee before my shift.", ["drinks", "drink", "am drink"], 1, "I → drink (bentuk dasar).", { skill: "present-simple-form" }),
          makeQuestion("They ___ in a small office.", ["works", "work", "working"], 1, "They → work.", { skill: "present-simple-form" }),
        ],
        intermediate: [
          makeQuestion("She ___ emails after every meeting.", ["don't check", "doesn't check", "doesn't checks"], 1, "She → doesn't + check.", { skill: "present-simple-neg-q" }),
          makeQuestion("Does he ___ from home on Fridays?", ["works", "work", "working"], 1, "Setelah does → work.", { skill: "present-simple-neg-q" }),
          makeQuestion("What time ___ you start work?", ["does", "do", "are"], 1, "You → do.", { skill: "present-simple-neg-q" }),
        ],
        complex: [
          makeQuestion("Pilih kalimat negatif benar.", ["The analyst doesn't review orders at night.", "The analyst don't reviews orders at night.", "The analyst doesn't reviews orders at night."], 0, "Doesn't + review.", { skill: "present-simple-neg-q" }),
          makeQuestion("Pilih respons tepat dalam dialog.", ["No, she doesn't.", "No, she don't.", "No, she isn't."], 0, "She → doesn't.", { skill: "present-simple-neg-q", type: "dialogue", dialogue: [["Arif", "Does Mia drink coffee?"], ["Rita", "No, she ___."]] }),
          makeQuestion("Susun: He / the schedule. / checks / every morning.", ["every morning", "checks", "He", "the schedule."], [2, 1, 3, 0], "He checks the schedule every morning.", { skill: "present-simple-form", type: "build", hints: ["Mulai dengan subject He.", "Setelah He, gunakan checks."] }),
        ],
      },
    },
    "00-foundation/08-present-continuous": {
      title: "Present Continuous",
      levels: {
        simple: [
          makeQuestion("She ___ working at the office today.", ["is", "are", "am"], 0, "She → is + verb-ing.", { skill: "present-continuous-form" }),
          makeQuestion("They ___ having lunch now.", ["is", "are", "am"], 1, "They → are + verb-ing.", { skill: "present-continuous-form" }),
          makeQuestion("I ___ writing a report.", ["am", "is", "are"], 0, "I → am + verb-ing.", { skill: "present-continuous-form" }),
        ],
        intermediate: [
          makeQuestion("Nadia usually works from home, but today she ___ at the office.", ["is working", "works", "worked"], 0, "Sementara hari ini → Present Continuous.", { skill: "present-continuous-form" }),
          makeQuestion("I am understanding the instructions. Benar atau salah?", ["Salah", "Benar", "Tergantung"], 0, "Understand = stative verb, tidak continuous.", { skill: "present-continuous-form", wrongFeedback: { 1: ["Stative verbs biasanya tidak continuous."] } }),
          makeQuestion("The first train ___ at 6:20 tomorrow morning.", ["leaves", "is leaving", "left"], 0, "Jadwal resmi → Present Simple.", { skill: "present-continuous-form" }),
        ],
        complex: [
          makeQuestion("Our support team answers calls until six. This week, two agents ___ the evening shift.", ["are covering", "cover", "covered"], 0, "Sementara minggu ini → Present Continuous.", { skill: "present-continuous-form" }),
          makeQuestion("Baca konteks secara utuh karena...", ["satu paragraf dapat memadukan kebiasaan dan pengecualian", "kata lebih banyak", "grammar sulit"], 0, "Periksa petunjuk waktu dan arti setiap klausa.", { skill: "present-continuous-form" }),
          makeQuestion("Rutinitas, fakta, keadaan, jadwal → Present Simple. Kegiatan sementara sedang berlangsung → ...", ["Present Continuous", "Past Simple", "Future Simple"], 0, "Kegiatan sementara → Present Continuous.", { skill: "present-continuous-form" }),
        ],
      },
    },
    "00-foundation/09-prepositions-basic": {
      title: "Prepositions (Basic)",
      levels: {
        simple: [
          makeQuestion("The book is ___ the table.", ["on", "in", "at"], 0, "Di atas permukaan → on.", { skill: "preposition-basic" }),
          makeQuestion("I live ___ Jakarta.", ["in", "on", "at"], 0, "Kota → in.", { skill: "preposition-basic" }),
          makeQuestion("Meet me ___ 9 a.m.", ["at", "in", "on"], 0, "Jam tertentu → at.", { skill: "preposition-basic" }),
        ],
        intermediate: [
          makeQuestion("The cat is ___ the box.", ["in", "on", "at"], 0, "Di dalam kotak → in.", { skill: "preposition-basic" }),
          makeQuestion("We arrived ___ Monday.", ["on", "in", "at"], 0, "Hari → on.", { skill: "preposition-basic" }),
          makeQuestion("She is good ___ maths.", ["at", "in", "on"], 0, "Good at + noun.", { skill: "preposition-basic" }),
        ],
        complex: [
          makeQuestion("Pilih preposisi untuk waktu: ___ the weekend.", ["at", "on", "in"], 1, "The weekend → on (British) atau at (American).", { skill: "preposition-basic" }),
          makeQuestion("Setiap preposisi memiliki penggunaan khusus karena...", ["konteks dan kolokasi berbeda", "kata lebih banyak", "grammar sulit"], 0, "Preposisi bergantung pada konteks.", { skill: "preposition-basic" }),
          makeQuestion("The meeting starts ___ 9 a.m. ___ Monday.", ["at / on", "on / at", "in / on"], 0, "Jam → at; hari → on.", { skill: "preposition-basic" }),
        ],
      },
    },
    "00-foundation/10-there-is-are": {
      title: "There is / There are",
      levels: {
        simple: [
          makeQuestion("___ a bank near here.", ["There is", "There are", "They are"], 0, "Bank tunggal → There is.", { skill: "there-is-are" }),
          makeQuestion("___ two messages for you.", ["There is", "There are", "It is"], 1, "Messages jamak → There are.", { skill: "there-is-are" }),
          makeQuestion("Pilih bentuk benar untuk milk.", ["There are some milk.", "There is some milk.", "There be some milk."], 1, "Milk tak terhitung → There is.", { skill: "there-is-are" }),
        ],
        intermediate: [
          makeQuestion("Bentuk pertanyaan tepat...", ["There are any shops?", "Are there any shops?", "Do there are shops?"], 1, "Pindahkan are ke depan.", { skill: "there-is-are" }),
          makeQuestion("Bentuk negatif ‘There is a problem’...", ["There isn't a problem.", "There aren't a problem.", "There doesn't a problem."], 0, "There is → There isn't.", { skill: "there-is-are" }),
          makeQuestion("There isn't any coffee. Artinya...", ["Tidak ada kopi", "Ada banyak kopi", "Kopi sudah habis"], 0, "There isn't any = tidak ada.", { skill: "there-is-are" }),
        ],
        complex: [
          makeQuestion("Ada berapa kursi di sini? Jawab: ___", ["There are five chairs.", "There is five chairs.", "Five chairs there are."], 0, "Kursi jamak → There are five chairs.", { skill: "there-is-are" }),
          makeQuestion("Perhatikan noun tunggal atau jamak sebelum memilih is/are karena...", ["subject–verb agreement", "kata lebih banyak", "grammar sulit"], 0, "Agreement there is/are dengan noun.", { skill: "there-is-are" }),
          makeQuestion("Pilih kalimat benar.", ["There is some water in the glass.", "There are some water in the glass.", "There be some water in the glass."], 0, "Water tak terhitung → There is.", { skill: "there-is-are" }),
        ],
      },
    },
    "00-foundation/11-can-cannot": {
      title: "Can / Cannot",
      levels: {
        simple: [
          makeQuestion("He can ___ three languages.", ["speaks", "speak", "to speak"], 1, "Can + verb dasar tanpa to.", { skill: "can-ability" }),
          makeQuestion("Bentuk negatif can adalah...", ["doesn't can", "can't", "can not to"], 1, "Can't = negatif can.", { skill: "can-ability" }),
          makeQuestion("___ you help me, please?", ["Do", "Are", "Can"], 2, "Can untuk meminta tolong.", { skill: "can-ability" }),
        ],
        intermediate: [
          makeQuestion("Jawaban singkat untuk ‘Can she cook?’...", ["Yes, she can.", "Yes, she does can.", "Yes, she is."], 0, "Yes, she can.", { skill: "can-ability" }),
          makeQuestion("Kalimat kemampuan benar...", ["They can play chess.", "They can plays chess.", "They can to play chess."], 0, "Can + play.", { skill: "can-ability" }),
          makeQuestion("Can menyatakan kemampuan, kemungkinan, atau...", ["izin", "waktu", "tempat"], 0, "Can juga untuk izin.", { skill: "can-ability" }),
        ],
        complex: [
          makeQuestion("Bentuknya sama untuk semua subject karena...", ["can tidak berubah bentuk", "can selalu diikuti noun", "can hanya untuk I"], 0, "Can adalah modal auxiliary yang tidak berubah.", { skill: "can-ability" }),
          makeQuestion("He can't drive. Artinya...", ["Dia tidak mampu mengemudi", "Dia suka mengemudi", "Dia akan mengemudi"], 0, "Can't = tidak mampu.", { skill: "can-ability" }),
          makeQuestion("Can I use your phone? Merupakan...", ["meminta izin", "memberi perintah", "mengucapkan terima kasih"], 0, "Can untuk meminta izin.", { skill: "can-ability" }),
        ],
      },
    },
    "00-foundation/12-questions-basic": {
      title: "Question Forms (Basic)",
      levels: {
        simple: [
          makeQuestion("___ she at home?", ["Does", "Is", "Do"], 1, "Dengan to be → Is she at home?", { skill: "question-form" }),
          makeQuestion("___ they play tennis?", ["Are", "Does", "Do"], 2, "They + play → Do they play tennis?", { skill: "question-form" }),
          makeQuestion("Where ___ your parents live?", ["do", "does", "are"], 0, "Parents jamak → do.", { skill: "question-form" }),
        ],
        intermediate: [
          makeQuestion("Does he ___ coffee?", ["drinks", "drink", "drinking"], 1, "Setelah does → drink.", { skill: "question-form" }),
          makeQuestion("Pertanyaan benar...", ["What time does the shop open?", "What time the shop does open?", "What time do the shop opens?"], 0, "Does + subject + verb dasar.", { skill: "question-form" }),
          makeQuestion("Jika who adalah subject, biasanya tidak perlu...", ["do/does", "kata tanya", "tanda tanya"], 0, "Who called you? (who = subject).", { skill: "question-form" }),
        ],
        complex: [
          makeQuestion("Temukan auxiliary sebelum menyusun pertanyaan karena...", ["setiap kalimat pola berbeda", "kata lebih banyak", "grammar sulit"], 0, "Auxiliary menentukan pola.", { skill: "question-form" }),
          makeQuestion("She is ready. → Is she ready? Pola...", ["be di depan subject", "do di depan subject", "tidak ada perubahan"], 0, "Pindahkan be ke depan subject.", { skill: "question-form" }),
          makeQuestion("Wh-word + auxiliary + subject + base verb? Contoh...", ["Where do you work?", "You work where?", "Work you where?"], 0, "Pola wh- question benar.", { skill: "question-form" }),
        ],
      },
    },
    "01-elementary/01-past-simple": {
      title: "Past Simple",
      levels: {
        simple: [
          makeQuestion("We ___ a film last night.", ["watched", "watch", "watching"], 0, "Past Simple regular verb → watched.", { skill: "past-simple-regular" }),
          makeQuestion("He ___ to the office yesterday.", ["went", "goed", "go"], 0, "Go → went (irregular).", { skill: "past-simple-irregular" }),
          makeQuestion("She ___ the window before leaving. (close)", ["closed", "close", "closing"], 0, "Close → closed (regular).", { skill: "past-simple-regular" }),
        ],
        intermediate: [
          makeQuestion("I didn't ___ the answer.", ["know", "knew", "known"], 0, "Setelah didn → verb dasar: know.", { skill: "past-simple-irregular" }),
          makeQuestion("___ they arrive on time?", ["Did", "Were", "Do"], 0, "Did untuk pertanyaan Past Simple.", { skill: "past-simple-regular" }),
          makeQuestion("Did you ___ the new address?", ["remember", "remembered", "remembering"], 0, "Setelah Did → verb dasar: remember.", { skill: "past-simple-irregular" }),
        ],
        complex: [
          makeQuestion("They ___ here in 2020.", ["moved", "move", "moving"], 0, "2020 = waktu lampau selesai → moved.", { skill: "past-simple-irregular" }),
          makeQuestion("The driver ___ the turn, stopped, and asked for directions.", ["missed", "miss", "missing"], 0, "Narasi berurutan → semua Past Simple.", { skill: "past-simple-regular" }),
          makeQuestion("We ___ tired after the trip.", ["were", "did", "was"], 0, "We → were (to be).", { skill: "past-simple-regular" }),
        ],
      },
    },
    "01-elementary/02-past-continuous": {
      title: "Past Continuous",
      levels: {
        simple: [
          makeQuestion("At noon yesterday, we ___ lunch.", ["were having", "had", "was having"], 0, "We → were having (Past Continuous).", { skill: "past-continuous" }),
          makeQuestion("I ___ a shower when the alarm rang.", ["was taking", "took", "were taking"], 0, "I → was taking.", { skill: "past-continuous" }),
          makeQuestion("They ___ playing football when it rained.", ["were", "was", "are"], 0, "They → were.", { skill: "past-continuous" }),
        ],
        intermediate: [
          makeQuestion("The alarm rang while I ___ a shower.", ["was taking", "took", "were taking"], 0, "While + Past Continuous untuk kegiatan yang terganggu.", { skill: "past-continuous" }),
          makeQuestion("We ___ the figures when the client arrived.", ["were checking", "checked", "check"], 0, "While + were checking.", { skill: "past-continuous" }),
          makeQuestion("She ___ not sleeping when I called.", ["was", "were", "did"], 0, "She → was not sleeping.", { skill: "past-continuous" }),
        ],
        complex: [
          makeQuestion("While I ___ notes, Ana ___ the slides.", ["was taking / was preparing", "took / prepares", "were taking / prepared"], 0, "Dua aktivitas bersamaan → both Past Continuous.", { skill: "past-continuous" }),
          makeQuestion("Past Continuous membangun latar, Past Simple menyampaikan...", ["kejadian yang mengubah situasi", "kata lebih banyak", "grammar sulit"], 0, "Latar vs kejadian inti.", { skill: "past-continuous" }),
          makeQuestion("I was presenting the budget when the projector ___.", ["stopped working", "stop work", "stops working"], 0, "Kejadian yang menghentikan → Past Simple.", { skill: "past-continuous" }),
        ],
      },
    },
    "01-elementary/03-future-will-going-to": {
      title: "Future: Will vs Going to",
      levels: {
        simple: [
          makeQuestion("I've decided already. I ___ a short course in June.", ["am going to take", "will taking", "take yesterday"], 0, "Keputusan rencana → am going to take.", { skill: "future-will-going" }),
          makeQuestion("Look at those clouds! It ___ rain.", ["is going to", "will", "went"], 0, "Bukti sekarang → is going to rain.", { skill: "future-will-going" }),
          makeQuestion("The forecast says it ___ sunny tomorrow.", ["will be", "is being", "was"], 0, "Ramalan cuaca → will be.", { skill: "future-will-going" }),
        ],
        intermediate: [
          makeQuestion("A colleague drops a box. You say: ‘I ___ you.’", ["will help", "am going help", "helped"], 0, "Keputusan spontan → will help.", { skill: "future-will-going" }),
          makeQuestion("We ___ driving, but the road is closed. We'll take the train.", ["are going to", "will", "went"], 0, "Rencana lama berubah → were going to / will take.", { skill: "future-will-going" }),
          makeQuestion("We ___ take the train instead. (keputusan spontan)", ["will", "are going to", "went"], 0, "Spontan → will.", { skill: "future-will-going" }),
        ],
        complex: [
          makeQuestion("Rencana lama batal karena jalan ditutup; keputusan baru spontan: ‘We ___ the train.’", ["are going to take", "will take", "will taking"], 1, "Keputusan spontan baru → will take.", { skill: "future-will-going" }),
          makeQuestion("Pilih alasan memilih bentuk future...", ["situasi dan maksud pembicara", "kata lebih banyak", "grammar sulit"], 0, "Konteks menentukan will atau going to.", { skill: "future-will-going" }),
          makeQuestion("The forecast says it will be sunny; look at those clouds, though. It ___ rain.", ["is going to", "will", "is"], 0, "Bukti visual sekarang → is going to.", { skill: "future-will-going" }),
        ],
      },
    },
    "01-elementary/04-comparatives": {
      title: "Comparatives",
      levels: {
        simple: [
          makeQuestion("This suitcase is ___ than mine. (light)", ["lighter", "lightest", "more light"], 0, "Light → lighter (comparative).", { skill: "comparative" }),
          makeQuestion("The new model is ___ than the old one.", ["better", "best", "good"], 0, "Good → better (irregular comparative).", { skill: "comparative" }),
          makeQuestion("This route is ___ than that one.", ["shorter", "shortest", "more short"], 0, "Short → shorter (-er).", { skill: "comparative" }),
        ],
        intermediate: [
          makeQuestion("The new model is ___ more reliable than the old one.", ["much", "most", "many"], 0, "Much + comparative untuk perbedaan besar.", { skill: "comparative" }),
          makeQuestion("This plan is ___ as flexible as the annual option.", ["not as", "not than", "more than"], 0, "Not as ... as untuk kesetaraan negatif.", { skill: "comparative" }),
          makeQuestion("The express route is ___ faster than the coastal route.", ["much", "most", "many"], 0, "Much + faster.", { skill: "comparative" }),
        ],
        complex: [
          makeQuestion("Pilih perbandingan setara.", ["This route is as short as the other one.", "This route is the short as the other.", "This route as shorter than the other."], 0, "As + adjective + as.", { skill: "comparative" }),
          makeQuestion("Superlative membandingkan satu anggota dengan...", ["seluruh kelompok", "satu orang saja", "tidak ada yang lain"], 0, "Superlative = satu vs grup.", { skill: "comparative" }),
          makeQuestion("It is the ___ expensive, though.", ["least", "less", "more"], 0, "Least = superlative negatif.", { skill: "comparative" }),
        ],
      },
    },
    "01-elementary/05-quantifiers": {
      title: "Quantifiers",
      levels: {
        simple: [
          makeQuestion("There are only ___ apples in the bowl.", ["a little", "a few", "much"], 1, "Apples countable → a few.", { skill: "quantifier" }),
          makeQuestion("We have ___ time, so let's start now.", ["few", "little", "many"], 1, "Time uncountable → little.", { skill: "quantifier" }),
          makeQuestion("We received ___ applications but ___ feedback.", ["fewer / less", "less / fewer", "many / much"], 0, "Fewer = countable; less = uncountable.", { skill: "quantifier" }),
        ],
        intermediate: [
          makeQuestion("There is ___ noise in the room.", ["too much", "too many", "too few"], 0, "Noise uncountable → too much.", { skill: "quantifier" }),
          makeQuestion("Only ___ seats are available.", ["a few", "a little", "much"], 0, "Seats countable → a few.", { skill: "quantifier" }),
          makeQuestion("Fewer dipakai dengan noun...", ["dapat dihitung", "tidak dapat dihitung", "semua noun"], 0, "Fewer untuk countable noun.", { skill: "quantifier" }),
        ],
        complex: [
          makeQuestion("Pilih pasangan yang tepat.", ["fewer emails / less time", "less emails / fewer time", "much emails / many time"], 0, "Emails countable → fewer; time uncountable → less.", { skill: "quantifier" }),
          makeQuestion("Dalam laporan stok, perhatikan apakah noun...", ["dapat dihitung atau tidak", "kata lebih banyak", "grammar sulit"], 0, "Countable vs uncountable menentukan quantifier.", { skill: "quantifier" }),
          makeQuestion("Less dipakai dengan...", ["jumlah atau noun tak terhitung", "noun yang dapat dihitung", "semua noun"], 0, "Less untuk uncountable.", { skill: "quantifier" }),
        ],
      },
    },
    "01-elementary/06-modals-basic": {
      title: "Modals (Basic)",
      levels: {
        simple: [
          makeQuestion("You ___ stop at the red light.", ["must", "can", "may"], 0, "Must untuk kewajiban/aturan.", { skill: "modal-basic" }),
          makeQuestion("___ I open the window?", ["Can", "Must", "Should"], 0, "Can untuk meminta izin.", { skill: "modal-basic" }),
          makeQuestion("You ___ see a doctor.", ["should", "must", "can"], 0, "Should untuk saran.", { skill: "modal-basic" }),
        ],
        intermediate: [
          makeQuestion("He ___ speak three languages.", ["can", "must", "should"], 0, "Can untuk kemampuan.", { skill: "modal-basic" }),
          makeQuestion("You ___ not smoke here.", ["must", "can", "should"], 0, "Must not untuk larangan.", { skill: "modal-basic" }),
          makeQuestion("___ we go now?", ["Shall", "Must", "Can"], 0, "Shall untuk menawarkan/usul.", { skill: "modal-basic" }),
        ],
        complex: [
          makeQuestion("Modal diikuti oleh...", ["verb dasar", "verb + -ing", "verb + to"], 0, "Modal + verb dasar (tanpa to).", { skill: "modal-basic" }),
          makeQuestion("Pilih kalimat dengan modal yang tepat.", ["You must wear a helmet.", "You must wearing a helmet.", "You must to wear a helmet."], 0, "Must + wear (bentuk dasar).", { skill: "modal-basic" }),
          makeQuestion("Should digunakan untuk...", ["memberi saran", "mengucapkan selamat", "meminta maaf"], 0, "Should untuk saran/saran.", { skill: "modal-basic" }),
        ],
      },
    },
    "01-elementary/07-adverbs-frequency": {
      title: "Adverbs of Frequency",
      levels: {
        simple: [
          makeQuestion("I ___ go to the gym on Mondays.", ["always", "never", "sometimes"], 0, "Always = 100% frekuensi.", { skill: "adverb-frequency" }),
          makeQuestion("She ___ arrives late. She is always on time.", ["never", "often", "usually"], 0, "Never = 0% frekuensi.", { skill: "adverb-frequency" }),
          makeQuestion("We ___ have lunch at 12 p.m.", ["usually", "never", "rarely"], 0, "Usually = kebiasaan.", { skill: "adverb-frequency" }),
        ],
        intermediate: [
          makeQuestion("Adverb frekuensi biasanya dipakai...", ["sesudah to be, sebelum verb utama", "selalu di awal kalimat", "selalu di akhir kalimat"], 0, "Posisi standar: sesudah be, sebelum verb.", { skill: "adverb-frequency" }),
          makeQuestion("He is ___ late for work.", ["never", "always", "sometimes"], 0, "Is + never (sesudah to be).", { skill: "adverb-frequency" }),
          makeQuestion("They ___ finish their work on time.", ["always", "never", "rarely"], 0, "Always + finish (sebelum verb).", { skill: "adverb-frequency" }),
        ],
        complex: [
          makeQuestion("Pilih kalimat dengan posisi adverb yang tepat.", ["She always comes on time.", "She comes always on time.", "Always she comes on time."], 0, "Always sebelum verb comes.", { skill: "adverb-frequency" }),
          makeQuestion("Adverb frekuensi menunjukkan...", ["seberapa sering sesuatu terjadi", "di mana sesuatu terjadi", "kapan sesuatu terjadi"], 0, "Frekuensi = seberapa sering.", { skill: "adverb-frequency" }),
          makeQuestion("I ___ forget my keys. (jarang)", ["rarely", "always", "usually"], 0, "Rarely = jarang.", { skill: "adverb-frequency" }),
        ],
      },
    },
    "01-elementary/08-present-perfect-intro": {
      title: "Present Perfect (Intro)",
      levels: {
        simple: [
          makeQuestion("She ___ finished her homework.", ["have", "has", "is"], 1, "She → has + V3.", { skill: "present-perfect" }),
          makeQuestion("We have ___ that museum before.", ["visit", "visited", "visiting"], 1, "Have/has + past participle: visited.", { skill: "present-perfect" }),
          makeQuestion("___ you ever eaten Korean food?", ["Did", "Have", "Are"], 1, "Have + ever + V3.", { skill: "present-perfect" }),
        ],
        intermediate: [
          makeQuestion("Pilih kalimat Present Perfect yang tepat.", ["I have seen him yesterday.", "I have seen him before.", "I saw him before now yesterday."], 1, "Before = waktu tidak spesifik → Present Perfect.", { skill: "present-perfect" }),
          makeQuestion("He has ___ arrived. He is here now.", ["just", "ago", "last"], 0, "Just = baru saja → Present Perfect.", { skill: "present-perfect" }),
          makeQuestion("Jangan gabungkan Present Perfect dengan...", ["waktu lampau spesifik seperti yesterday", "kata tambahan", "tanda baca"], 0, "Yesterday pakai Past Simple, bukan Present Perfect.", { skill: "present-perfect" }),
        ],
        complex: [
          makeQuestion("Have you ever tried sushi? Ever artinya...", ["kapan saja dalam hidup", "kemarin", "minggu depan"], 0, "Ever = kapan saja dalam pengalaman hidup.", { skill: "present-perfect" }),
          makeQuestion("Present Perfect digunakan untuk...", ["pengalaman tanpa waktu spesifik", "kejadian hari ini saja", "masa depan"], 0, "Pengalaman hidup tanpa waktu pasti.", { skill: "present-perfect" }),
          makeQuestion("I have seen him before. Before = ...", ["sebelumnya", "kemarin", "besok"], 0, "Before = sebelumnya/kapan saja.", { skill: "present-perfect" }),
        ],
      },
    },
    "01-elementary/09-prepositions-advanced": {
      title: "Prepositions (Advanced)",
      levels: {
        simple: [
          makeQuestion("I'm interested ___ photography.", ["on", "in", "at"], 1, "Interested in + noun.", { skill: "preposition-dependent" }),
          makeQuestion("He is good ___ solving puzzles.", ["at", "in", "for"], 0, "Good at + noun/verb-ing.", { skill: "preposition-dependent" }),
          makeQuestion("It depends ___ the final schedule.", ["of", "on", "to"], 1, "Depends on.", { skill: "preposition-dependent" }),
        ],
        intermediate: [
          makeQuestion("She apologized ___ arriving late.", ["for", "to", "with"], 0, "Apologize for + verb-ing.", { skill: "preposition-dependent" }),
          makeQuestion("Listen ___ music.", ["to", "at", "for"], 0, "Listen to.", { skill: "preposition-dependent" }),
          makeQuestion("Preposition selalu diikuti oleh...", ["noun/pronoun atau verb-ing", "verb dasar", "adjective"], 0, "Preposition + noun/pronoun/verb-ing.", { skill: "preposition-dependent" }),
        ],
        complex: [
          makeQuestion("Pilih pasangan yang lazim.", ["listen to", "listen at", "listen for to"], 0, "Listen to adalah kolokasi lazim.", { skill: "preposition-dependent" }),
          makeQuestion("Dependent preposition dipelajari sebagai...", ["pasangan kata", "kata tunggal", "idiom saja"], 0, "Pelajari verb/adjective + preposition bersama.", { skill: "preposition-dependent" }),
          makeQuestion("She is afraid ___ dogs.", ["of", "at", "in"], 0, "Afraid of + noun.", { skill: "preposition-dependent" }),
        ],
      },
    },
    "01-elementary/10-conjunctions-basic": {
      title: "Conjunctions (Basic)",
      levels: {
        simple: [
          makeQuestion("I like tea ___ I don't like coffee.", ["but", "because", "or"], 0, "But untuk kontras.", { skill: "conjunction-basic" }),
          makeQuestion("Would you like rice ___ noodles?", ["and", "or", "so"], 1, "Or untuk pilihan.", { skill: "conjunction-basic" }),
          makeQuestion("We left early ___ the roads were busy.", ["because", "so", "but"], 0, "Because untuk alasan.", { skill: "conjunction-basic" }),
        ],
        intermediate: [
          makeQuestion("The roads were busy, ___ we left early.", ["because", "so", "or"], 1, "So untuk hasil/akibat.", { skill: "conjunction-basic" }),
          makeQuestion("Pilih kalimat yang benar.", ["Because it rained, so we stayed home.", "Because it rained, we stayed home.", "It rained because, we stayed home."], 1, "Jangan gabungkan because dan so dalam satu klausa.", { skill: "conjunction-basic" }),
          makeQuestion("And digunakan untuk...", ["menambah informasi", "menunjukkan kontras", "menunjukkan hasil"], 0, "And = penambahan.", { skill: "conjunction-basic" }),
        ],
        complex: [
          makeQuestion("Because mengenalkan...", ["alasan/sebab", "hasil", "pilihan"], 0, "Because = sebab.", { skill: "conjunction-basic" }),
          makeQuestion("So mengenalkan...", ["hasil/akibat", "alasan", "pilihan"], 0, "So = hasil.", { skill: "conjunction-basic" }),
          makeQuestion("Hindari memakai because dan so sekaligus karena...", ["satu klausa hanya perlu satu penanda hubungan", "kata lebih banyak", "grammar sulit"], 0, "Redundansi.", { skill: "conjunction-basic" }),
        ],
      },
    },
    "02-intermediate/01-present-perfect-vs-past": {
      title: "Present Perfect vs Past Simple",
      levels: {
        simple: [
          makeQuestion("I ___ the new manager this morning. (pagi masih berlangsung)", ["have met", "met last year", "meet"], 0, "This morning masih berlangsung → have met.", { skill: "present-perfect-vs-past" }),
          makeQuestion("The report ___ two days ago.", ["has arrived", "arrived", "has arrive"], 1, "Two days ago = waktu lampau selesai → arrived.", { skill: "present-perfect-vs-past" }),
          makeQuestion("We ___ 40 orders this week. (minggu masih berlangsung)", ["have processed", "processed last week", "process"], 0, "This week masih berlangsung → have processed.", { skill: "present-perfect-vs-past" }),
        ],
        intermediate: [
          makeQuestion("Pilih pasangan sesuai periode selesai dan belum selesai.", ["I have called yesterday / I called today (today ongoing)", "I called yesterday / I have called twice today", "I call yesterday / I have call today"], 1, "Yesterday = selesai (Past Simple); today = masih berlangsung (Present Perfect).", { skill: "present-perfect-vs-past" }),
          makeQuestion("The report ___ by the team yesterday.", ["was written", "has written", "is written"], 0, "Yesterday → Past Simple passive: was written.", { skill: "present-perfect-vs-past" }),
          makeQuestion("I ___ the file before the computer crashed.", ["had saved", "have save", "was save"], 0, "Before crashed → Past Perfect.", { skill: "present-perfect-vs-past" }),
        ],
        complex: [
          makeQuestion("Cocokkan tense dengan periode yang dimaksud karena...", ["periode terbuka vs selesai berbeda", "kata lebih banyak", "grammar sulit"], 0, "Present Perfect = terbuka; Past Simple = selesai.", { skill: "present-perfect-vs-past" }),
          makeQuestion("We have processed 40 orders this week. Artinya...", ["40 orden diproses minggu ini (masih berlangsung)", "40 orden diproses minggu lalu", "40 orden akan diproses"], 0, "This week = periode terbuka.", { skill: "present-perfect-vs-past" }),
          makeQuestion("We processed 40 orders last week. Artinya...", ["minggu telah selesai", "minggu masih berlangsung", "minggu depan"], 0, "Last week = periode selesai.", { skill: "present-perfect-vs-past" }),
        ],
      },
    },
    "02-intermediate/02-present-perfect-continuous": {
      title: "Present Perfect Continuous",
      levels: {
        simple: [
          makeQuestion("I ___ English for six months and continue to study.", ["have been studying", "am studied", "has studied"], 0, "I → have been studying.", { skill: "present-perfect-continuous" }),
          makeQuestion("The floor is wet. Someone ___ it.", ["has been washing", "have wash", "is washed"], 0, "Has been washing = aktivitas baru selesai dengan bukti sekarang.", { skill: "present-perfect-continuous" }),
          makeQuestion("She ___ for three hours.", ["has been working", "is work", "has work"], 0, "She → has been working.", { skill: "present-perfect-continuous" }),
        ],
        intermediate: [
          makeQuestion("Fokus pada proses atau aktivitas berulang dengan bukti sekarang → ...", ["Present Perfect Continuous", "Past Simple", "Future Simple"], 0, "PPC untuk proses dengan bukti sekarang.", { skill: "present-perfect-continuous" }),
          makeQuestion("The support line has been receiving calls all morning; it is still busy. Artinya...", ["aktivitas masih berlangsung", "aktivitas sudah selesai", "aktivitas belum pernah terjadi"], 0, "Still busy = masih berlangsung.", { skill: "present-perfect-continuous" }),
          makeQuestion("We have answered 30 calls so far. Fokus pada...", ["jumlah selesai", "proses berlangsung", "masa depan"], 0, "Jumlah selesai → Present Perfect Simple.", { skill: "present-perfect-continuous" }),
        ],
        complex: [
          makeQuestion("Jika fokusnya hasil selesai atau jumlah, pilih...", ["Present Perfect Simple", "Past Continuous", "Future Simple"], 0, "Hasil/jumlah selesai → Present Perfect Simple.", { skill: "present-perfect-continuous" }),
          makeQuestion("She ___ four chapters so far.", ["has written", "has been writing", "is writing"], 0, "Four chapters = jumlah selesai → has written.", { skill: "present-perfect-continuous" }),
          makeQuestion("The engineers had been testing the pump for hours before it overheated. Ini adalah...", ["Past Perfect Continuous", "Present Perfect Continuous", "Past Simple"], 0, "Had been testing = PPC untuk durasi di masa lampau.", { skill: "present-perfect-continuous" }),
        ],
      },
    },
    "02-intermediate/03-past-perfect": {
      title: "Past Perfect",
      levels: {
        simple: [
          makeQuestion("I ___ the file before the computer crashed.", ["had saved", "have save", "was save"], 0, "Had saved = aktivitas sebelum peristiwa lampau lainnya.", { skill: "past-perfect" }),
          makeQuestion("When we arrived, the guests ___ dinner.", ["had already eaten", "have already eat", "already eat"], 0, "Had already eaten = sudah selesai sebelum kami tiba.", { skill: "past-perfect" }),
          makeQuestion("The alarm ___ before the guard arrived.", ["had sounded", "has sounded", "sounds"], 0, "Had sounded = alarm berbunyi sebelum guard tiba.", { skill: "past-perfect" }),
        ],
        intermediate: [
          makeQuestion("Past Perfect membantu pembaca memahami...", ["urutan dan sebab dalam cerita", "kata lebih banyak", "grammar sulit"], 0, "PP untuk urutan kejadian lampau.", { skill: "past-perfect" }),
          makeQuestion("The technician discovered that a cable ___ loose.", ["had come", "have come", "comes"], 0, "Had come = sebelum discovered.", { skill: "past-perfect" }),
          makeQuestion("By the time the ambulance arrived, the crowd ___ the emergency line.", ["had called", "have called", "calls"], 0, "Had called = sebelum ambulance tiba.", { skill: "past-perfect" }),
        ],
        complex: [
          makeQuestion("Setelah urutan sudah jelas, gunakan...", ["Past Simple untuk narasi ringkas", "Past Perfect untuk semua kalimat", "Present Simple untuk semua kalimat"], 0, "Past Simple setelah PP untuk efisiensi.", { skill: "past-perfect" }),
          makeQuestion("Pilih urutan yang benar: alarm berbunyi dahulu, lalu petugas tiba.", ["The alarm had sounded before the guard arrived.", "The alarm sounded before the guard had arrived.", "The alarm has sounded before the guard arrived."], 0, "Alarm dulu (had sounded), guard kemudian (arrived).", { skill: "past-perfect" }),
          makeQuestion("Past Perfect membantu...", ["memahami sebab dan urutan", "membuat kalimat lebih panjang", "menghindari verb"], 0, "PP menjelaskan sebab dan urutan.", { skill: "past-perfect" }),
        ],
      },
    },
    "02-intermediate/04-passive-basic": {
      title: "Passive Voice (Basic)",
      levels: {
        simple: [
          makeQuestion("The letter ___ by the manager yesterday.", ["was written", "is written", "will be written"], 0, "Yesterday → was written.", { skill: "passive-basic" }),
          makeQuestion("The window ___ by the boy.", ["was broken", "is broken", "will be broken"], 0, "Was broken = passive Past Simple.", { skill: "passive-basic" }),
          makeQuestion("English ___ all over the world.", ["is spoken", "speaks", "is speaking"], 0, "Is spoken = passive Present Simple.", { skill: "passive-basic" }),
        ],
        intermediate: [
          makeQuestion("Passive voice digunakan untuk...", ["menonjolkan tindakan atau objek", "menyembunyikan subjek", "membuat kalimat lebih pendek"], 0, "Passive untuk fokus pada tindakan/objek.", { skill: "passive-basic" }),
          makeQuestion("The report ___ by the team last week.", ["was written", "is written", "will be written"], 0, "Last week → was written.", { skill: "passive-basic" }),
          makeQuestion("The door ___ every morning.", ["is opened", "opens", "is opening"], 0, "Every morning → Present Simple passive: is opened.", { skill: "passive-basic" }),
        ],
        complex: [
          makeQuestion("Gunakan passive ketika...", ["pelaku tidak penting atau tidak diketahui", "pelaku selalu disebut", "kata lebih banyak"], 0, "Passive untuk menyembunyikan atau mengabaikan pelaku.", { skill: "passive-basic" }),
          makeQuestion("The samples are being analyzed at three laboratories. Ini adalah...", ["Present Continuous passive", "Past Simple passive", "Future Simple passive"], 0, "Are being analyzed = Present Continuous passive.", { skill: "passive-basic" }),
          makeQuestion("Pilih kalimat passive yang benar.", ["The cake was eaten by the children.", "The cake ate by the children.", "The cake was eat by the children."], 0, "Was + eaten (V3) = passive benar.", { skill: "passive-basic" }),
        ],
      },
    },
    "02-intermediate/05-conditionals-1-2": {
      title: "Conditional Type 1 & 2",
      levels: {
        simple: [
          makeQuestion("If the weather is clear, we ___ outside.", ["will eat", "would ate", "ate tomorrow"], 0, "Type 1: if + present, will + verb.", { skill: "conditional-1-2" }),
          makeQuestion("If I were you, I ___ the offer.", ["will accept", "would consider", "considered yesterday"], 1, "Type 2: would + verb dasar.", { skill: "conditional-1-2" }),
          makeQuestion("If it rains, we ___ inside.", ["will stay", "would stay", "stayed"], 0, "Type 1 → will stay.", { skill: "conditional-1-2" }),
        ],
        intermediate: [
          makeQuestion("Type 1 digunakan untuk...", ["kemungkinan nyata", "kemungkinan mustahil", "masa lalu"], 0, "Type 1 = kondisi nyata di masa depan.", { skill: "conditional-1-2" }),
          makeQuestion("Type 2 digunakan untuk situasi...", ["hipotetis / tidak nyata", "fakta", "masa depan pasti"], 0, "Type 2 = hipotetis.", { skill: "conditional-1-2" }),
          makeQuestion("If she studies hard, she ___ the exam.", ["will pass", "would pass", "passed"], 0, "Type 1: will pass.", { skill: "conditional-1-2" }),
        ],
        complex: [
          makeQuestion("Past Simple pada type 2 tidak selalu berarti...", ["waktu lampau", "masa depan", "waktu sekarang"], 0, "Type 2 past simple = jarak hipotetis, bukan lampau.", { skill: "conditional-1-2" }),
          makeQuestion("If the supplier confirms today, we ___ tomorrow.", ["will ship", "would ship", "shipped"], 0, "Type 1: konfirmasi hari ini → kirim besok.", { skill: "conditional-1-2" }),
          makeQuestion("Pilih kalimat type 2 yang benar.", ["If I were rich, I would travel.", "If I am rich, I will travel.", "If I was rich, I travels."], 0, "If I were, I would travel.", { skill: "conditional-1-2" }),
        ],
      },
    },
    "02-intermediate/06-relative-clauses": {
      title: "Relative Clauses",
      levels: {
        simple: [
          makeQuestion("The man ___ lives next door is a doctor.", ["who", "which", "that"], 0, "Who untuk orang.", { skill: "relative-clause" }),
          makeQuestion("The book ___ I bought is interesting.", ["which", "who", "whose"], 0, "Which untuk benda.", { skill: "relative-clause" }),
          makeQuestion("This is the house ___ Jack built.", ["that", "who", "whom"], 0, "That untuk benda/tidak spesifik.", { skill: "relative-clause" }),
        ],
        intermediate: [
          makeQuestion("Who digunakan untuk...", ["orang", "benda", "tempat"], 0, "Who = orang.", { skill: "relative-clause" }),
          makeQuestion("Which digunakan untuk...", ["benda", "orang", "tempat"], 0, "Which = benda/hewan.", { skill: "relative-clause" }),
          makeQuestion("The teacher ___ teaches us is kind.", ["who", "which", "whose"], 0, "Teacher = orang → who.", { skill: "relative-clause" }),
        ],
        complex: [
          makeQuestion("Relative clause memberikan informasi tentang...", ["noun di depannya", "verb di depannya", "adjective di depannya"], 0, "Relative clause menjelaskan noun sebelumnya.", { skill: "relative-clause" }),
          makeQuestion("Defining relative clause tidak memakai...", ["koma", "kata tanya", "tanda seru"], 0, "Defining clause tidak dipisah koma.", { skill: "relative-clause" }),
          makeQuestion("The car ___ won the race is red.", ["that", "who", "whose"], 0, "Car = benda → that.", { skill: "relative-clause" }),
        ],
      },
    },
    "02-intermediate/07-reported-speech-basic": {
      title: "Reported Speech (Basic)",
      levels: {
        simple: [
          makeQuestion("She said she ___ tired.", ["was", "is", "are"], 0, "Present Simple → Past Simple dalam reported speech.", { skill: "reported-speech" }),
          makeQuestion("He said he ___ going.", ["is", "was", "were"], 0, "Am/is → was.", { skill: "reported-speech" }),
          makeQuestion("They said they ___ come.", ["will", "would", "can"], 0, "Will → would.", { skill: "reported-speech" }),
        ],
        intermediate: [
          makeQuestion("'I am hungry,' he said. → He said he ___ hungry.", ["is", "was", "am"], 0, "Is → was (backshift).", { skill: "reported-speech" }),
          makeQuestion("'I will call you,' she said. → She said she ___ call me.", ["will", "would", "can"], 0, "Will → would.", { skill: "reported-speech" }),
          makeQuestion("Reported speech mengubah...", ["tense dan kata ganti", "hanya tense", "hanya kata ganti"], 0, "Tense dan kata ganti berubah.", { skill: "reported-speech" }),
        ],
        complex: [
          makeQuestion("Backshift adalah perubahan...", ["tense ke bentuk lampau", "kata ganti ke objek", "kata tanya ke pernyataan"], 0, "Tense berke belakang satu langkah.", { skill: "reported-speech" }),
          makeQuestion("'I saw her yesterday,' he said. → He said he ___ her the day before.", ["saw", "had seen", "see"], 0, "Saw → had seen (double backshift).", { skill: "reported-speech" }),
          makeQuestion("Pilih reported speech yang benar: 'I am here,' she said.", ["She said she was there.", "She said she is here.", "She said she were there."], 0, "Is → was; here → there.", { skill: "reported-speech" }),
        ],
      },
    },
    "02-intermediate/08-gerund-infinitive": {
      title: "Gerund vs Infinitive",
      levels: {
        simple: [
          makeQuestion("I enjoy ___ to music.", ["listening", "listen", "to listen"], 0, "Enjoy + gerund (-ing).", { skill: "gerund-infinitive" }),
          makeQuestion("I want ___ home.", ["to go", "go", "going"], 0, "Want + infinitive (to + verb).", { skill: "gerund-infinitive" }),
          makeQuestion("She stopped ___ smoke.", ["to", "smoking", "smoke"], 0, "Stopped to smoke = berhenti untuk merokok (tujuan).", { skill: "gerund-infinitive" }),
        ],
        intermediate: [
          makeQuestion("Gerund adalah verb dengan akhiran...", ["-ing", "-ed", "-s"], 0, "Verb + -ing = gerund.", { skill: "gerund-infinitive" }),
          makeQuestion("Infinitive adalah...", ["to + verb dasar", "verb + -ing", "verb + -ed"], 0, "To + verb = infinitive.", { skill: "gerund-infinitive" }),
          makeQuestion("I like ___ coffee.", ["drinking", "drink", "to drinking"], 0, "Like + gerund.", { skill: "gerund-infinitive" }),
        ],
        complex: [
          makeQuestion("Gunakan gerund setelah...", ["preposition", "kata tanya", "conjunction"], 0, "Setelah preposition pakai gerund.", { skill: "gerund-infinitive" }),
          makeQuestion("Gunakan infinitive untuk...", ["menyebutkan tujuan", "mengakhiri kalimat", "memulai paragraf"], 0, "Infinitive untuk tujuan.", { skill: "gerund-infinitive" }),
          makeQuestion("I remember ___ the door. (ingat tindakan yang sudah dilakukan)", ["locking", "to lock", "locked"], 0, "Remember + gerund = ingat telah melakukan.", { skill: "gerund-infinitive" }),
        ],
      },
    },
    "02-intermediate/09-modals-possibility": {
      title: "Modals (Possibility)",
      levels: {
        simple: [
          makeQuestion("It ___ rain tomorrow. (kemungkinan)", ["might", "must", "can't"], 0, "Might untuk kemungkinan.", { skill: "modal-possibility" }),
          makeQuestion("She ___ be at home. (kemungkinan kecil)", ["may", "must", "can't"], 0, "May untuk kemungkinan.", { skill: "modal-possibility" }),
          makeQuestion("He ___ be at work. (pastian tidak)", ["can't", "must", "may"], 0, "Can't untuk ketidakpastian/kemustahilan.", { skill: "modal-possibility" }),
        ],
        intermediate: [
          makeQuestion("Must untuk...", ["kepastian tinggi", "kemungkinan kecil", "ketidakmampuan"], 0, "Must = kepastian/logical deduction.", { skill: "modal-possibility" }),
          makeQuestion("Can't untuk...", ["ketidakmampuan atau ketidakpastian", "kewajiban", "keterampilan"], 0, "Can't = tidak mungkin/tidak mampu.", { skill: "modal-possibility" }),
          makeQuestion("She ___ be tired after working all day.", ["must", "can't", "may"], 0, "Worked all day → must be tired.", { skill: "modal-possibility" }),
        ],
        complex: [
          makeQuestion("Might vs may: keduanya untuk...", ["kemungkinan", "kewajiban", "ketidakmampuan"], 0, "Might dan may untuk kemungkinan.", { skill: "modal-possibility" }),
          makeQuestion("He ___ be the one who called. (tidak mungkin)", ["can't", "must", "may"], 0, "Tidak mungkin → can't.", { skill: "modal-possibility" }),
          makeQuestion("Pilih kalimat dengan modal kemungkinan yang tepat.", ["It might rain.", "It must rain.", "It can't rain."], 0, "Might = kemungkinan (tidak pasti).", { skill: "modal-possibility" }),
        ],
      },
    },
    "02-intermediate/10-phrasal-verbs-basic": {
      title: "Phrasal Verbs (Basic)",
      levels: {
        simple: [
          makeQuestion("Please ___ your shoes before entering.", ["take off", "take after", "take in"], 0, "Take off = melepaskan/sepatu.", { skill: "phrasal-verb" }),
          makeQuestion("I ___ looking for my keys.", ["am", "is", "are"], 0, "Look for = mencari.", { skill: "phrasal-verb" }),
          makeQuestion("Please ___ the lights.", ["turn off", "turn on", "turn up"], 0, "Turn off = mematikan lampu.", { skill: "phrasal-verb" }),
        ],
        intermediate: [
          makeQuestion("Ganti ‘turn off the radio’ dengan pronoun.", ["turn off it", "turn it off", "it turn off"], 1, "Pronoun dipisahkan: turn it off.", { skill: "phrasal-verb" }),
          makeQuestion("'Find out' paling dekat artinya dengan...", ["menemukan informasi", "menjaga seseorang", "memakai pakaian"], 0, "Find out = menemukan informasi.", { skill: "phrasal-verb" }),
          makeQuestion("Pilih phrasal verb untuk merawat anak.", ["look up", "look after", "look out"], 1, "Look after = merawat.", { skill: "phrasal-verb" }),
        ],
        complex: [
          makeQuestion("Phrasal verb inseparable berarti...", ["verb dan particle tidak dipisah object", "particle selalu hilang", "verb berubah menjadi noun"], 0, "Inseparable = tidak bisa dipisahkan oleh object.", { skill: "phrasal-verb" }),
          makeQuestion("Separable phrasal verb dengan pronoun...", ["pronoun dipisahkan di antara verb dan particle", "pronoun selalu di akhir", "tidak bisa dipakai pronoun"], 0, "Pronoun pemisah: turn it off.", { skill: "phrasal-verb" }),
          makeQuestion("Look up = ...", ["mencari informasi", "melihat ke atas", "mempercayai"], 0, "Look up = mencari (dalam kamus/dll).", { skill: "phrasal-verb" }),
        ],
      },
    },
    "02-intermediate/11-question-tags": {
      title: "Question Tags",
      levels: {
        simple: [
          makeQuestion("You are coming, ___?", ["are you", "aren't you", "don't you"], 1, "Positive statement + negative tag.", { skill: "question-tag" }),
          makeQuestion("He doesn't eat meat, ___?", ["does he", "doesn't he", "is he"], 0, "Negative statement + positive tag.", { skill: "question-tag" }),
          makeQuestion("They visited Rome, ___?", ["didn't they", "weren't they", "don't they"], 0, "Visited = Past Simple → didn't they.", { skill: "question-tag" }),
        ],
        intermediate: [
          makeQuestion("I'm late, ___?", ["am I", "aren't I", "don't I"], 1, "I'm → aren't I (eksepsi).", { skill: "question-tag" }),
          makeQuestion("She can swim, ___?", ["can she", "can't she", "does she"], 1, "Can → can't she.", { skill: "question-tag" }),
          makeQuestion("Intonasi naik pada tag meminta...", ["konfirmasi", "keyakinan", "maaf"], 0, "Intonasi naik = meminta konfirmasi.", { skill: "question-tag" }),
        ],
        complex: [
          makeQuestion("Question tag berfungsi untuk...", ["memastikan informasi atau mengundang respons", "mengakhiri kalimat", "memulai percakapan"], 0, "Tag untuk konfirmasi atau undangan respons.", { skill: "question-tag" }),
          makeQuestion("Pernyataan positif biasanya diikuti tag...", ["negatif", "positif", "tanpa auxiliary"], 0, "Positif → negatif tag.", { skill: "question-tag" }),
          makeQuestion("Pernyataan negatif biasanya diikuti tag...", ["positif", "negatif", "tidak ada tag"], 0, "Negatif → positif tag.", { skill: "question-tag" }),
        ],
      },
    },
    "02-intermediate/12-used-to-would": {
      title: "Used to / Would",
      levels: {
        simple: [
          makeQuestion("I ___ have long hair, but now it's short.", ["used to", "would to", "use"], 0, "Used to + base verb untuk kebiasaan lampau.", { skill: "used-to-would" }),
          makeQuestion("Did they ___ live here?", ["used to", "use to", "would"], 1, "Did → use to (tanpa -d).", { skill: "used-to-would" }),
          makeQuestion("Every winter, we ___ go skating.", ["would", "would to", "were"], 0, "Would untuk tindakan berulang lampau.", { skill: "used-to-would" }),
        ],
        intermediate: [
          makeQuestion("Pilih bentuk yang wajar untuk keadaan lampau.", ["She would own a small shop.", "She used to own a small shop.", "She would to own a small shop."], 1, "Keadaan → used to, bukan would.", { skill: "used-to-would" }),
          makeQuestion("Setelah did, bentuk yang benar adalah...", ["used to", "use to", "using to"], 1, "Did + use to.", { skill: "used-to-would" }),
          makeQuestion("Used to menyatakan kebiasaan atau keadaan lampau yang...", ["tidak lagi benar", "masih benar", "akan datang"], 0, "Used to = kebiasaan/keadaan yang sudah berubah.", { skill: "used-to-would" }),
        ],
        complex: [
          makeQuestion("Used to vs would: would tidak dipakai untuk...", ["keadaan (state)", "tindakan berulang", "masa depan"], 0, "Would tidak untuk keadaan seperti know atau live.", { skill: "used-to-would" }),
          makeQuestion("I used to know him. (bukan: I would know him) karena...", ["know adalah keadaan", "know adalah tindakan", "know adalah objek"], 0, "Know = state verb, pakai used to.", { skill: "used-to-would" }),
          makeQuestion("Pilih kalimat yang benar tentang kebiasaan lampau.", ["I used to play tennis every Sunday.", "I would to play tennis every Sunday.", "I use to play tennis every Sunday."], 0, "Used to + play.", { skill: "used-to-would" }),
        ],
      },
    },
    "03-upper-intermediate/01-past-perfect-continuous": {
      title: "Past Perfect Continuous",
      levels: {
        simple: [
          makeQuestion("Her eyes were red because she ___.", ["had been crying", "has cry", "was cried"], 0, "Had been crying = PPC untuk penyebab.", { skill: "past-perfect-continuous" }),
          makeQuestion("The crew ___ for weeks before the launch was postponed.", ["had been preparing", "have prepared", "were prepare"], 0, "Had been preparing = durasi sebelum kejadian lampau.", { skill: "past-perfect-continuous" }),
          makeQuestion("The road was muddy because it ___ all night.", ["had been raining", "had rained three inches", "has rain"], 0, "Had been raining = proses penyebab.", { skill: "past-perfect-continuous" }),
        ],
        intermediate: [
          makeQuestion("PPC untuk durasi sebagai...", ["penyebab keadaan lampau", "keadaan masa depan", "keadaan sekarang"], 0, "PPC menjelaskan proses yang menyebabkan keadaan lampau.", { skill: "past-perfect-continuous" }),
          makeQuestion("They had been testing the pump for hours before it ___.", ["overheated", "overheats", "overheat"], 0, "Before it overheated = PPC lalu Past Simple.", { skill: "past-perfect-continuous" }),
          makeQuestion("Pilih kalimat PPC yang benar.", ["She had been working there for years.", "She has been working there for years.", "She was being working there."], 0, "Had been working = PPC.", { skill: "past-perfect-continuous" }),
        ],
        complex: [
          makeQuestion("Jika ada hitungan hasil yang selesai, pilih...", ["Past Perfect Simple", "Past Perfect Continuous", "Past Simple"], 0, "Hasil/jumlah selesai → PPS, bukan PPC.", { skill: "past-perfect-continuous" }),
          makeQuestion("They had tested 12 units before the inspection began. Fokus pada...", ["jumlah selesai", "proses berlangsung", "masa depan"], 0, "12 units = jumlah selesai → Past Perfect Simple.", { skill: "past-perfect-continuous" }),
          makeQuestion("PPC menekankan...", ["durasi proses", "hasil akhir", "waktu mulai"], 0, "PPC menekankan seberapa lama proses berlangsung.", { skill: "past-perfect-continuous" }),
        ],
      },
    },
    "03-upper-intermediate/02-future-perfect-continuous": {
      title: "Future Perfect Continuous",
      levels: {
        simple: [
          makeQuestion("By next spring, the city ___ the new bridge.", ["will have completed", "will completed", "has complete"], 0, "By + future deadline → will have completed.", { skill: "future-perfect-continuous" }),
          makeQuestion("At 5 p.m., I ___ for eight hours.", ["will have been travelling", "will travel since", "have been travelling tomorrow"], 0, "By 5 p.m. → will have been travelling.", { skill: "future-perfect-continuous" }),
          makeQuestion("By noon, we ___ the audit.", ["will have completed", "will have been completing", "complete yesterday"], 0, "By noon → will have completed.", { skill: "future-perfect-continuous" }),
        ],
        intermediate: [
          makeQuestion("Future Perfect menekankan...", ["hasil yang selesai sebelum tenggat", "keadaan masa lalu", "kewajiban sekarang"], 0, "FP = hasil sebelum tenggat waktu.", { skill: "future-perfect-continuous" }),
          makeQuestion("Future Perfect Continuous menekankan...", ["lama aktivitas sampai tenggat", "hasil akhir", "masa lalu"], 0, "FPC = durasi hingga tenggat.", { skill: "future-perfect-continuous" }),
          makeQuestion("By Thursday, the team will have been working on it for six weeks. Ini adalah...", ["Future Perfect Continuous", "Future Perfect Simple", "Future Simple"], 0, "Will have been working = FPC.", { skill: "future-perfect-continuous" }),
        ],
        complex: [
          makeQuestion("Fokus pada hasil selesai sebelum batas waktu → ...", ["Future Perfect Simple", "Future Perfect Continuous", "Future Simple"], 0, "Hasil selesai → FPS, bukan FPC.", { skill: "future-perfect-continuous" }),
          makeQuestion("Pilih kalimat FPC yang benar.", ["By June, I will have been living here for a year.", "By June, I will live here for a year.", "By June, I am living here for a year."], 0, "Will have been living = FPC.", { skill: "future-perfect-continuous" }),
          makeQuestion("FP vs FPC: FP untuk..., FPC untuk...", ["hasil selesai / durasi proses", "durasi proses / hasil selesai", "masa lalu / masa depan"], 0, "FP = hasil; FPC = durasi.", { skill: "future-perfect-continuous" }),
        ],
      },
    },
    "03-upper-intermediate/03-conditionals-3-mixed": {
      title: "Conditional Type 3 & Mixed",
      levels: {
        simple: [
          makeQuestion("If I had known, I ___ helped you.", ["would have", "will have", "would have help"], 0, "Type 3: would have + V3.", { skill: "conditional-3-mixed" }),
          makeQuestion("If she had studied, she ___ the exam.", ["would have passed", "will pass", "would pass"], 0, "Would have passed = Type 3.", { skill: "conditional-3-mixed" }),
          makeQuestion("If they had left earlier, they ___ the train.", ["would have caught", "will catch", "would catch"], 0, "Would have caught = Type 3.", { skill: "conditional-3-mixed" }),
        ],
        intermediate: [
          makeQuestion("Type 3 digunakan untuk...", ["kondisi lampau yang tidak terwujud", "kondisi masa depan", "kondisi sekarang"], 0, "Type 3 = hipotetis masa lalu.", { skill: "conditional-3-mixed" }),
          makeQuestion("Mixed conditional menggabungkan...", ["if clause lampau dan main clause sekarang", "dua klausa masa depan", "dua klausa lampau"], 0, "Mixed = lampau + sekarang.", { skill: "conditional-3-mixed" }),
          makeQuestion("If I had saved money, I ___ rich now.", ["would be", "will be", "was"], 0, "Mixed: had saved → would be (now).", { skill: "conditional-3-mixed" }),
        ],
        complex: [
          makeQuestion("Type 3 Past Perfect pada if clause menunjukkan...", ["kondisi lampau yang tidak terjadi", "kondisi yang terjadi", "kondisi masa depan"], 0, "Had + V3 = kondisi lampau tidak terwujud.", { skill: "conditional-3-mixed" }),
          makeQuestion("Pilih mixed conditional yang benar.", ["If I had studied harder, I would be a doctor now.", "If I study harder, I would be a doctor now.", "If I had studied harder, I will be a doctor now."], 0, "Had studied → would be (now).", { skill: "conditional-3-mixed" }),
          makeQuestion("Would have + V3 pada main clause menunjukkan...", ["hasil hipotetis lampau", "hasil masa depan", "kewajiban sekarang"], 0, "Would have + V3 = hasil hipotetis lampau.", { skill: "conditional-3-mixed" }),
        ],
      },
    },
    "03-upper-intermediate/04-passive-advanced": {
      title: "Passive Voice (Advanced)",
      levels: {
        simple: [
          makeQuestion("The final decision ___ by the board tomorrow.", ["will be announced", "will announce", "is announce"], 0, "Will be announced = Future Simple passive.", { skill: "passive-advanced" }),
          makeQuestion("Choose the reporting passive.", ["The result is believed to be reliable.", "The result believes reliable.", "The result is believe reliable."], 0, "Is believed to be = reporting passive.", { skill: "passive-advanced" }),
          makeQuestion("Costs ___ to fall.", ["are expected", "expect", "are expecting"], 0, "Are expected = reporting passive.", { skill: "passive-advanced" }),
        ],
        intermediate: [
          makeQuestion("Reporting passive digunakan untuk...", ["menyampaikan konsensus atau klaim", "membunyikan pelaku", "membuat kalimat pendek"], 0, "Reporting passive untuk klaim yang diatribusikan.", { skill: "passive-advanced" }),
          makeQuestion("The samples are being analyzed at three laboratories. Tense...", ["Present Continuous passive", "Past Simple passive", "Future Simple passive"], 0, "Are being analyzed = Present Continuous passive.", { skill: "passive-advanced" }),
          makeQuestion("The policy is expected to reduce processing time. Ini adalah...", ["reporting passive", "active voice", "past passive"], 0, "Is expected = reporting passive.", { skill: "passive-advanced" }),
        ],
        complex: [
          makeQuestion("Dalam laporan ilmiah, passive dapat...", ["menonjolkan prosedur dan temuan", "menyembunyikan semua informasi", "membuat kalimat lebih panjang"], 0, "Passive untuk fokus pada prosedur/temuan.", { skill: "passive-advanced" }),
          makeQuestion("Gunakan reporting passive untuk...", ["konsensus atau klaim yang diatribusikan", "cerita fiksi", "surat pribadi"], 0, "Reporting passive untuk klaim/konsensus.", { skill: "passive-advanced" }),
          makeQuestion("Pilih kalimat passive lanjutan yang benar.", ["The result is believed to be reliable.", "The result believes reliable.", "The result is believe reliable."], 0, "Is believed to be = passive benar.", { skill: "passive-advanced" }),
        ],
      },
    },
    "03-upper-intermediate/05-reported-speech-advanced": {
      title: "Reported Speech (Advanced)",
      levels: {
        simple: [
          makeQuestion("The manager reminded us ___ the form.", ["to sign", "signing", "sign"], 0, "Remind + to-infinitive.", { skill: "reported-speech-advanced" }),
          makeQuestion("“I didn't change the figures.” → He denied ___ the figures.", ["to change", "changing", "change"], 1, "Deny + gerund (-ing).", { skill: "reported-speech-advanced" }),
          makeQuestion("'Please don't share the draft.' → She asked us...", ["not to share the draft", "to not share the draft", "share the draft"], 0, "Ask + not to-infinitive for negative request.", { skill: "reported-speech-advanced" }),
        ],
        intermediate: [
          makeQuestion("Reporting verb untuk saran/perintah diikuti...", ["object + to-infinitive", "that-clause", "gerund saja"], 0, "Ask/tell/remind + object + to-inf.", { skill: "reported-speech-advanced" }),
          makeQuestion("Reporting verb untuk klaim/pengakuan diikuti...", ["that-clause atau gerund", "to-infinitive saja", "tanpa objek"], 0, "Deny/admit/claim + that-clause/gerund.", { skill: "reported-speech-advanced" }),
          makeQuestion("The chair asked participants ___ questions in writing.", ["to submit", "submitting", "submit"], 0, "Ask + to-infinitive.", { skill: "reported-speech-advanced" }),
        ],
        complex: [
          makeQuestion("Pilih reported speech yang benar untuk instruksi negatif.", ["She asked us not to share the draft.", "She asked us to not share the draft.", "She asked us share not the draft."], 0, "Ask + not to-infinitive.", { skill: "reported-speech-advanced" }),
          makeQuestion("Deny digunakan untuk...", ["pengakuan", "penyangkalan", "saran"], 0, "Deny = menyangkal.", { skill: "reported-speech-advanced" }),
          makeQuestion("The supplier denied ___ the delivery date.", ["changing", "to change", "change"], 0, "Denied + changing (gerund).", { skill: "reported-speech-advanced" }),
        ],
      },
    },
    "03-upper-intermediate/06-inversion-basic": {
      title: "Inversion (Basic)",
      levels: {
        simple: [
          makeQuestion("___ have I seen such a beautiful sunset.", ["Never", "Ever", "Always"], 0, "Never + inversion (auxiliary + subject).", { skill: "inversion-basic" }),
          makeQuestion("___ did she realize her mistake.", ["Only then", "Then only", "Only"], 0, "Only then + inversion.", { skill: "inversion-basic" }),
          makeQuestion("___ he arrive, the party began.", ["No sooner had", "Hardly", "Scarcely"], 0, "No sooner had + inversion.", { skill: "inversion-basic" }),
        ],
        intermediate: [
          makeQuestion("Inversion digunakan setelah...", ["kata negatif di awal kalimat", "kata sifat di akhir", "kata benda di tengah"], 0, "Negatif/ekspresif di awal → inversion.", { skill: "inversion-basic" }),
          makeQuestion("Pilih kalimat dengan inversion yang benar.", ["Never have I been so embarrassed.", "I never have been so embarrassed.", "Never I have been so embarrassed."], 0, "Never + auxiliary + subject + verb.", { skill: "inversion-basic" }),
          makeQuestion("Seldom have I seen such courage. Artinya...", ["Saya jarang melihat keberanian seperti itu", "Saya sering melihat keberanian", "Saya selalu melihat keberanian"], 0, "Seldom = jarang.", { skill: "inversion-basic" }),
        ],
        complex: [
          makeQuestion("Inversion membuat kalimat lebih...", ["formal dan dramatis", "informal dan pendek", "sederhana dan biasa"], 0, "Inversion untuk gaya formal/dramatis.", { skill: "inversion-basic" }),
          makeQuestion("Hardly had he entered when the phone rang. Artinya...", ["Dia baru masuk lalu telepon berdering", "Dia sudah lama masuk", "Dia belum masuk"], 0, "Hardly had... when = segera setelah.", { skill: "inversion-basic" }),
          makeQuestion("Pilih kalimat yang menggunakan inversion.", ["Not only is she smart but also kind.", "She is not only smart but also kind.", "Not only she is smart but also kind."], 0, "Not only + auxiliary + subject.", { skill: "inversion-basic" }),
        ],
      },
    },
    "03-upper-intermediate/07-cleft-sentences": {
      title: "Cleft Sentences",
      levels: {
        simple: [
          makeQuestion("___ was John who broke the window.", ["It", "That", "This"], 0, "It-cleft: It was John who...", { skill: "cleft-sentence" }),
          makeQuestion("It was the book ___ I lost.", ["that", "who", "whom"], 0, "It was the book that I lost.", { skill: "cleft-sentence" }),
          makeQuestion("It was in Paris ___ we met.", ["that", "who", "which"], 0, "It was in Paris that we met.", { skill: "cleft-sentence" }),
        ],
        intermediate: [
          makeQuestion("Cleft sentence digunakan untuk...", ["menekankan bagian tertentu", "membuat kalimat pendek", "menghindari subjek"], 0, "Cleft untuk penekanan.", { skill: "cleft-sentence" }),
          makeQuestion("It-cleft pola: It + be + ___ + that-clause.", ["elemen yang ditekankan", "subjek saja", "verb saja"], 0, "It + was/were + elemen + that.", { skill: "cleft-sentence" }),
          makeQuestion("Pilih kalimat cleft yang benar.", ["It was Mary who called me.", "It was Mary called me.", "It was Mary that called me."], 0, "It was Mary who/that called me.", { skill: "cleft-sentence" }),
        ],
        complex: [
          makeQuestion("Wh-cleft pola: ___ + be + to-infinitive.", ["What she wants", "She wants", "What does she want"], 0, "What she wants is to leave.", { skill: "cleft-sentence" }),
          makeQuestion("It-cleft vs wh-cleft: it-cleft menekankan...", ["suatu elemen spesifik", "seluruh kalimat", "hanya verb"], 0, "It-cleft untuk elemen spesifik.", { skill: "cleft-sentence" }),
          makeQuestion("Pilih kalimat cleft yang benar:", ["What I need is a vacation.", "What I need a vacation.", "I need is what a vacation."], 0, "What-clause as subject.", { skill: "cleft-sentence" }),
        ],
      },
    },
    "03-upper-intermediate/08-participle-clauses": {
      title: "Participle Clauses",
      levels: {
        simple: [
          makeQuestion("___ tired, he went to bed early.", ["Feeling", "Feel", "Felt"], 0, "Feeling = present participle clause.", { skill: "participle-clause" }),
          makeQuestion("___ the window, she saw the cat.", ["Looking out", "Look out", "Looked out"], 0, "Looking out = present participle.", { skill: "participle-clause" }),
          makeQuestion("___ by the noise, he couldn't sleep.", ["Disturbed", "Disturbing", "Disturb"], 0, "Disturbed = past participle clause.", { skill: "participle-clause" }),
        ],
        intermediate: [
          makeQuestion("Present participle clause menunjukkan...", ["tindakan yang dilakukan subjek", "tindakan yang dilakukan pada subjek", "tindakan di masa lalu"], 0, "Present participle = aktif (subjek melakukan).", { skill: "participle-clause" }),
          makeQuestion("Past participle clause menunjukkan...", ["tindakan yang dilakukan pada subjek", "tindakan yang dilakukan subjek", "tindakan di masa depan"], 0, "Past participle = pasif (subjek menerima).", { skill: "participle-clause" }),
          makeQuestion("Pilih kalimat dengan participle clause yang benar.", ["Walking home, she found a wallet.", "Home walking, she found a wallet.", "She walking home found a wallet."], 0, "Walking home = participle clause di awal.", { skill: "participle-clause" }),
        ],
        complex: [
          makeQuestion("Participle clause dapat menggantikan...", ["klausa pendek dengan subjek sama", "seluruh kalimat", "hanya kata tanya"], 0, "Participle clause = ringkasan klausa.", { skill: "participle-clause" }),
          makeQuestion("___ all his money, he couldn't buy the ticket.", ["Having lost", "Lost", "Losing"], 0, "Having lost = perfect participle (selesai dulu).", { skill: "participle-clause" }),
          makeQuestion("Pilih kalimat yang benar.", ["Being a student, I get a discount.", "Be a student, I get a discount.", "Been a student, I get a discount."], 0, "Being = present participle.", { skill: "participle-clause" }),
        ],
      },
    },
    "03-upper-intermediate/09-modal-perfect": {
      title: "Modal Perfect",
      levels: {
        simple: [
          makeQuestion("You ___ have told me earlier.", ["should", "must", "can"], 0, "Should have + V3 = saran/kesalahan lampau.", { skill: "modal-perfect" }),
          makeQuestion("She ___ have forgotten about the meeting.", ["must", "can", "should"], 0, "Must have + V3 = kesimpulan tentang lampau.", { skill: "modal-perfect" }),
          makeQuestion("He ___ have been at home.", ["can't", "must", "may"], 0, "Can't have = tidak mungkin di lampau.", { skill: "modal-perfect" }),
        ],
        intermediate: [
          makeQuestion("Should have + V3 untuk...", ["saya menyesal atau saran lampau", "kewajiban sekarang", "kemampuan masa depan"], 0, "Should have = regret/salah lampau.", { skill: "modal-perfect" }),
          makeQuestion("Must have + V3 untuk...", ["kesimpulan logis tentang lampau", "kewajiban sekarang", "kemampuan masa depan"], 0, "Must have = kesimpulan lampau.", { skill: "modal-perfect" }),
          makeQuestion("Can't have + V3 untuk...", ["ketidakmungkinan lampau", "kemampuan sekarang", "kewajiban masa depan"], 0, "Can't have = tidak mungkin lampau.", { skill: "modal-perfect" }),
        ],
        complex: [
          makeQuestion("Modal perfect digunakan untuk...", ["membicara tentang lampau dengan nuansa", "membicara tentang masa depan", "membicara tentang sekarang"], 0, "Modal perfect = lampau dengan nuansi.", { skill: "modal-perfect" }),
          makeQuestion("I ___ have known better.", ["should", "must", "can"], 0, "Should have known = menyesal.", { skill: "modal-perfect" }),
          makeQuestion("Pilih kalimat dengan modal perfect yang benar.", ["She must have been tired.", "She must been tired.", "She must have be tired."], 0, "Must have + been (V3).", { skill: "modal-perfect" }),
        ],
      },
    },
    "03-upper-intermediate/10-relative-clauses-advanced": {
      title: "Relative Clauses (Advanced)",
      levels: {
        simple: [
          makeQuestion("The man ___ car was stolen is angry.", ["whose", "who", "which"], 0, "Whose = possessive relative.", { skill: "relative-clause-advanced" }),
          makeQuestion("The book ___ I recommended is popular.", ["which", "who", "whose"], 0, "Which = benda.", { skill: "relative-clause-advanced" }),
          makeQuestion("This is the place ___ we met.", ["where", "when", "who"], 0, "Where = tempat.", { skill: "relative-clause-advanced" }),
        ],
        intermediate: [
          makeQuestion("Non-defining relative clause dipisah oleh...", ["koma", "titik", "koma dan titik"], 0, "Non-defining = dipisah koma.", { skill: "relative-clause-advanced" }),
          makeQuestion("Whom digunakan untuk...", ["objek orang", "subjek orang", "benda"], 0, "Whom = objek orang.", { skill: "relative-clause-advanced" }),
          makeQuestion("The teacher, ___ is very kind, helps us.", ["who", "which", "whose"], 0, "Non-defining: who untuk orang.", { skill: "relative-clause-advanced" }),
        ],
        complex: [
          makeQuestion("Defining relative clause tidak...", ["dipisah koma", "memakai who", "memakai which"], 0, "Defining tidak pakai koma.", { skill: "relative-clause-advanced" }),
          makeQuestion("Pilih kalimat non-defining yang benar.", ["My brother, who lives in Jakarta, is a doctor.", "My brother who lives in Jakarta is a doctor.", "My brother, who lives in Jakarta is a doctor."], 0, "Non-defining dengan koma di kedua sisi.", { skill: "relative-clause-advanced" }),
          makeQuestion("Reduced relative clause 'students selected for the program' berasal dari...", ["students who were selected", "students who selected", "students whom selecting"], 0, "Who were selected → selected (reduced passive).", { skill: "relative-clause-advanced" }),
        ],
      },
    },
    "03-upper-intermediate/11-linking-words": {
      title: "Linking Words",
      levels: {
        simple: [
          makeQuestion("The method is inexpensive. ___, it takes more time.", ["However", "Therefore", "Moreover"], 0, "However = kontras.", { skill: "linking-words" }),
          makeQuestion("The roads were flooded; ___, school was closed.", ["although", "as a result", "whereas"], 1, "As a result = hasil/akibat.", { skill: "linking-words" }),
          makeQuestion("___ the evidence was limited, the team reported its findings.", ["Although", "However", "Therefore"], 0, "Although = meskipun/kontrasti.", { skill: "linking-words" }),
        ],
        intermediate: [
          makeQuestion("However dan although menunjukkan...", ["kontras", "hasil", "penambahan"], 0, "However/although = kontras.", { skill: "linking-words" }),
          makeQuestion("Therefore dan as a result menunjukkan...", ["hasil", "kontras", "penambahan"], 0, "Therefore/as a result = hasil.", { skill: "linking-words" }),
          makeQuestion("Moreover dan furthermore menunjukkan...", ["penambahan", "kontras", "hasil"], 0, "Moreover/furthermore = tambahan.", { skill: "linking-words" }),
        ],
        complex: [
          makeQuestion("Linking words membantu...", ["menghubungkan gagasan dengan logika", "membuat kalimat lebih panjang", "menghindari subjek"], 0, "Linking words untuk alur logis gagasan.", { skill: "linking-words" }),
          makeQuestion("Although diikuti oleh...", ["klausa", "frasa saja", "kata tunggal"], 0, "Although + clause (subjek + verb).", { skill: "linking-words" }),
          makeQuestion("Pola yang benar adalah...", ["Although it was cold, we went out.", "Although it was cold. However we went out.", "It was cold although. We went out."], 0, "Although + clause, main clause.", { skill: "linking-words" }),
        ],
      },
    },
    "03-upper-intermediate/12-nominalization-intro": {
      title: "Nominalization (Intro)",
      levels: {
        simple: [
          makeQuestion("Nominal dari ‘decide’ adalah...", ["decision", "decidement", "decidingly"], 0, "Decide → decision (-tion).", { skill: "nominalization-intro" }),
          makeQuestion("Nominal dari ‘improve’ adalah...", ["improval", "improvement", "improveness"], 1, "Improve → improvement (-ment).", { skill: "nominalization-intro" }),
          makeQuestion("‘Accurate’ menjadi noun...", ["accuracy", "accuration", "accurateity"], 0, "Accurate → accuracy (-acy).", { skill: "nominalization-intro" }),
        ],
        intermediate: [
          makeQuestion("Nominalization adalah mengubah...", ["verb/adjective menjadi noun", "noun menjadi verb", "verb menjadi adjective"], 0, "Nominalization = verb/adj → noun.", { skill: "nominalization-intro" }),
          makeQuestion("Nominalization berguna untuk...", ["merangkum proses sebagai topik", "membuat kalimat lebih pendek", "menghilangkan verb"], 0, "Nominalization untuk merangkum proses.", { skill: "nominalization-intro" }),
          makeQuestion("Pilih nominalization yang benar.", ["The expansion created new jobs.", "The company expanded yesterday.", "The company will expand."], 0, "The expansion = nominalisasi dari expand.", { skill: "nominalization-intro" }),
        ],
        complex: [
          makeQuestion("Nominalization digunakan untuk...", ["menjadikan proses/ide sebagai noun", "membuat semua kalimat pasif", "menghapus semua verb"], 1, "Nominalization = proses/ide sebagai noun.", { skill: "nominalization-intro" }),
          makeQuestion("Kalimat yang paling langsung adalah...", ["We analyzed the results.", "An analysis of the results was undertaken by us.", "The undertaking of analysis occurred."], 0, "Direct = active voice dengan verb.", { skill: "nominalization-intro" }),
          makeQuestion("Jangan gunakan nominalization berlebihan karena...", ["kalimat menjadi abstrak dan kurang jelas", "kata menjadi lebih sedikit", "grammar menjadi lebih sulit"], 0, "Terlalu banyak nominal → abstrak/sulit dipahami.", { skill: "nominalization-intro" }),
        ],
      },
    },
    "04-advanced-formal/01-complex-subordination": {
      title: "Complex Subordination",
      levels: {
        simple: [
          makeQuestion("___ the system was secure, the team delayed the launch.", ["Although", "Because", "Unless"], 0, "Although = kontrasti meskipun aman.", { skill: "complex-subordination" }),
          makeQuestion("Pilih struktur yang benar.", ["Although the server was down, we completed the work.", "Despite the server was down, we completed the work.", "Although the server down, completed work."], 1, "Although + clause = struktur benar.", { skill: "complex-subordination" }),
          makeQuestion("Connector untuk syarat positif adalah...", ["provided that", "nevertheless", "as a result"], 0, "Provided that = syarat positif.", { skill: "complex-subordination" }),
        ],
        intermediate: [
          makeQuestion("Subordination membantu...", ["menempatkan batasan dan klaim dalam hierarki", "membuat kalimat lebih pendek", "menghindari subjek"], 0, "Subordination = hierarki gagasan.", { skill: "complex-subordination" }),
          makeQuestion("Pilih connector yang menunjukkan sebab.", ["Because", "Although", "However"], 0, "Because = sebab.", { skill: "complex-subordination" }),
          makeQuestion("Pilih connector yang menunjukkan kontras.", ["Although", "Because", "Therefore"], 0, "Although = kontras.", { skill: "complex-subordination" }),
        ],
        complex: [
          makeQuestion("Pastikan pilihan connector mencerminkan...", ["hubungan logis", "panjang kalimat", "kesulitan kata"], 0, "Connector harus sesuai logika.", { skill: "complex-subordination" }),
          makeQuestion("Although the trial met its target, the small sample limits...", ["how widely the result can be applied", "the target was met", "the trial was successful"], 0, "Although = kontrasi antara target dan batasan.", { skill: "complex-subordination" }),
          makeQuestion("Because the server was unavailable, the team postponed...", ["the release until the security check was complete", "the server was fixed", "the team worked overtime"], 0, "Because = sebab penangguhan.", { skill: "complex-subordination" }),
        ],
      },
    },
    "04-advanced-formal/02-nominalization": {
      title: "Nominalization (Advanced)",
      levels: {
        simple: [
          makeQuestion("Nominalisasi dari ‘decide’ adalah...", ["decision", "decidingly", "decidement"], 0, "Decide → decision.", { skill: "nominalization" }),
          makeQuestion("Pilih bentuk yang membuat proses menjadi topik kalimat.", ["The expansion created new jobs.", "The company expanded yesterday.", "The company will expand."], 0, "The expansion = proses sebagai subjek/topik.", { skill: "nominalization" }),
          makeQuestion("Mana yang paling jelas menyebut pelaku evaluasi?", ["An evaluation was conducted.", "The review team evaluated the risks.", "Evaluation of risks occurred."], 1, "The review team = pelaku jelas.", { skill: "nominalization" }),
        ],
        intermediate: [
          makeQuestion("Nominalization dapat membawa topik dari...", ["satu kalimat ke kalimat berikutnya", "satu paragraf ke paragraf lain", "satu halaman ke halaman lain"], 0, "Nominalization untuk kohesi antar kalimat.", { skill: "nominalization" }),
          makeQuestion("Gunakan agent atau of-phrase jika...", ["diperlukan untuk menjaga kejelasan tanggung jawab", "kata lebih banyak", "grammar lebih sulit"], 0, "Agent/of-phrase untuk pelaku yang jelas.", { skill: "nominalization" }),
          makeQuestion("The review by the safety board identified two risks. Pelaku...", ["the safety board", "the review", "two risks"], 0, "The review board = pelaku evaluasi.", { skill: "nominalization" }),
        ],
        complex: [
          makeQuestion("Nominalization membantu membangun...", ["alur argumen dengan noun", "kalimat yang lebih pendek", "kata-kata yang lebih sulit"], 0, "Nominalization untuk alur argumen.", { skill: "nominalization" }),
          makeQuestion("The agency reduced waiting times. This reduction improved access. 'This reduction' merujuk pada...", ["The agency reduced waiting times", "waiting times", "access"], 0, "This reduction = nominalisasi dari 'reduced waiting times'.", { skill: "nominalization" }),
          makeQuestion("Nominalization lanjutan dalam teks formal untuk...", ["membangun alur argumen yang kohesif", "membuat kalimat lebih pendek", "menghindari subjek"], 0, "Nominalization untuk kohesi argumen formal.", { skill: "nominalization" }),
        ],
      },
    },
    "04-advanced-formal/03-hedging": {
      title: "Hedging",
      levels: {
        simple: [
          makeQuestion("Hedging digunakan untuk...", ["menghaluskan klaim", "membuat klaim mutlak", "menghapus klaim"], 0, "Hedging = membuat klaim lebih halus.", { skill: "hedging" }),
          makeQuestion("Pilih kata hedge yang tepat.", ["suggest", "prove", "confirm"], 0, "Suggest = kata hedge.", { skill: "hedging" }),
          makeQuestion("The results suggest an association, not necessarily...", ["causation", "correlation", "observation"], 0, "Association ≠ causation.", { skill: "hedging" }),
        ],
        intermediate: [
          makeQuestion("Gunakan hedge jika bukti...", ["terbatas", "lengkap", "tidak ada"], 0, "Hedge untuk bukti terbatas.", { skill: "hedging" }),
          makeQuestion("Jangan menyatakan lebih dari yang...", ["ditunjukkan data", "dapat dibaca", "dapat ditulis"], 0, "Hindari overclaiming.", { skill: "hedging" }),
          makeQuestion("Pilih kalimat dengan hedge.", ["The data suggest a possible link.", "The data prove a link.", "The data show a definite link."], 0, "Suggest a possible = hedge.", { skill: "hedging" }),
        ],
        complex: [
          makeQuestion("Hedging dalam writing akademis untuk...", ["menghindari klaim yang terlalu kuat", "membuat klaim lebih kuat", "menghapus semua klaim"], 0, "Hedge untuk moderasi klaim.", { skill: "hedging" }),
          makeQuestion("Pilih kata modal untuk hedging.", ["may", "must", "will"], 0, "May = kata hedge.", { skill: "hedging" }),
          makeQuestion("Kalimat dengan hedging yang tepat.", ["It may be the case that...", "It is definitely the case that...", "It is certainly the case that..."], 0, "May be the case = hedge.", { skill: "hedging" }),
        ],
      },
    },
    "04-advanced-formal/04-formal-register": {
      title: "Formal Register",
      levels: {
        simple: [
          makeQuestion("Pilih verba formal untuk ‘look at the proposal’.", ["review the proposal", "check out the proposal", "peek the proposal"], 0, "Review = formal untuk look at.", { skill: "formal-register" }),
          makeQuestion("Tanggapan profesional yang tegas adalah...", ["This conclusion is not supported by the data.", "Your conclusion is ridiculous.", "Whatever, the data says no."], 0, "Not supported by the data = profesional.", { skill: "formal-register" }),
          makeQuestion("Permintaan dengan tenggat dan alasan paling efektif...", ["Please confirm by noon so we can release the report.", "Please do it sometime soon.", "Confirmation would be good maybe."], 0, "Tenggat dan alasan jelas = efektif.", { skill: "formal-register" }),
        ],
        intermediate: [
          makeQuestion("Nada formal yang efektif tetap...", ["langsung dan sopan", "berlebihan dan panjang", "kasar dan singkat"], 0, "Formal = langsung tapi sopan.", { skill: "formal-register" }),
          makeQuestion("Pilih ungkapan formal untuk 'give me the file'.", ["Please send me the file.", "Gimme the file.", "Hand over the file now."], 0, "Please send me = formal.", { skill: "formal-register" }),
          makeQuestion("Formal register disesuaikan dengan...", ["tujuan, hubungan, dan urgensi", "panjang kalimat saja", "kata sulit saja"], 0, "Konteks menentukan nada formal.", { skill: "formal-register" }),
        ],
        complex: [
          makeQuestion("Jangan mengganti kejelasan dengan...", ["ungkapan berbelit-balik", "kata singkat", "kalimat pendek"], 0, "Kejelasan prioritas utama.", { skill: "formal-register" }),
          makeQuestion("Pilih email formal yang tepat.", ["Could you confirm receipt by 3 p.m.?", "Can you send it soon?", "Hey, send me that."], 0, "Could you confirm = formal dan sopan.", { skill: "formal-register" }),
          makeQuestion("The current data do not support that conclusion. Ini adalah...", ["langsung tanpa menyerang pembaca", "serang pembaca", "kata berlebihan"], 0, "Langsung dan profesional.", { skill: "formal-register" }),
        ],
      },
    },
    "04-advanced-formal/05-collocations": {
      title: "Collocations",
      levels: {
        simple: [
          makeQuestion("The board reached a ___ decision.", ["unanimous", "happy", "big"], 0, "Unanimous decision = collocation.", { skill: "collocation" }),
          makeQuestion("The team conducted a ___ analysis.", ["thorough", "fast", "easy"], 0, "Thorough analysis = collocation.", { skill: "collocation" }),
          makeQuestion("Raise ___ concerns.", ["serious", "small", "easy"], 0, "Serious concerns = collocation.", { skill: "collocation" }),
        ],
        intermediate: [
          makeQuestion("Collocation adalah...", ["pasangan kata yang sering dipakai bersama", "kata yang tidak berkaitan", "kata yang sulit"], 0, "Collocation = kata yang kerap bersama.", { skill: "collocation" }),
          makeQuestion("Pilih collocation yang benar.", ["make a decision", "do a decision", "take a decision"], 0, "Make a decision = collocation standar.", { skill: "collocation" }),
          makeQuestion("Pilih collocation yang benar.", ["give a presentation", "do a presentation", "make a presentation"], 0, "Give a presentation = standar.", { skill: "collocation" }),
        ],
        complex: [
          makeQuestion("Collocation yang alami meningkatkan...", ["presisi dan kelancaran", "panjang kalimat", "kesulitan kata"], 0, "Collocation untuk presisi dan fluency.", { skill: "collocation" }),
          makeQuestion("Periksa noun, verb, dan modifier sebagai...", ["satu unit", "kata terpisah", "kalimat terpisah"], 0, "Collocation = satu unit makna.", { skill: "collocation" }),
          makeQuestion("Pilih collocation yang tepat untuk laporan formal.", ["conduct a thorough analysis", "do a thorough analysis", "make a thorough analysis"], 0, "Conduct analysis = formal collocation.", { skill: "collocation" }),
        ],
      },
    },
    "04-advanced-formal/06-advanced-connectors": {
      title: "Advanced Connectors",
      levels: {
        simple: [
          makeQuestion("Pilih connector untuk menambahkan gagasan.", ["Furthermore", "However", "Therefore"], 0, "Furthermore = penambahan.", { skill: "advanced-connectors" }),
          makeQuestion("Pilih connector untuk kontras.", ["Nevertheless", "Therefore", "Moreover"], 0, "Nevertheless = kontras.", { skill: "advanced-connectors" }),
          makeQuestion("Pilih connector untuk hasil.", ["Consequently", "However", "Although"], 0, "Consequently = hasil.", { skill: "advanced-connectors" }),
        ],
        intermediate: [
          makeQuestion("Advanced connectors untuk...", ["menghubungkan gagasan kompleks", "membuat kalimat pendek", "menghindari subjek"], 0, "Connectors untuk gagasan kompleks.", { skill: "advanced-connectors" }),
          makeQuestion("Pilih connector yang tepat untuk alur argumen.", ["Moreover", "However", "Therefore"], 0, "Konteks menentukan connector.", { skill: "advanced-connectors" }),
          makeQuestion("Tanda baca dengan connector...", ["menyesuaikan posisi dan fungsi", "selalu di akhir", "selalu di awal"], 0, "Connector mengikuti aturan tanda baca.", { skill: "advanced-connectors" }),
        ],
        complex: [
          makeQuestion("Connector yang tepat mencegah...", ["hubungan logika yang keliru", "kalimat terlalu pendek", "kata terlalu banyak"], 0, "Connector untuk logika yang benar.", { skill: "advanced-connectors" }),
          makeQuestion("Pilih kalimat dengan connector yang benar.", ["The sample was small. However, the pattern was consistent.", "The sample was small. However the pattern was consistent.", "The sample small. However pattern consistent."], 0, "However + koma di awal kalimat baru.", { skill: "advanced-connectors" }),
          makeQuestion("It rained heavily; therefore, the match was postponed. 'Therefore' diapit...", ["koma", "titik", "tanda tanya"], 0, "Therefore diapit koma setelah titik koma.", { skill: "advanced-connectors" }),
        ],
      },
    },
    "04-advanced-formal/07-inversion-emphasis": {
      title: "Inversion for Emphasis",
      levels: {
        simple: [
          makeQuestion("___ have I seen such a disaster.", ["Never", "Ever", "Always"], 0, "Never + inversion untuk penekanan.", { skill: "inversion-emphasis" }),
          makeQuestion("___ did they realize the error.", ["Only then", "Then only", "Only"], 0, "Only then + inversion.", { skill: "inversion-emphasis" }),
          makeQuestion("Not only ___ he talented, but he is also kind.", ["is", "does", "was"], 0, "Not only + auxiliary + subject.", { skill: "inversion-emphasis" }),
        ],
        intermediate: [
          makeQuestion("Inversion untuk penekanan membuat...", ["kalimat lebih dramatis", "kalimat lebih pendek", "kalimat lebih sederhana"], 0, "Inversion = dramatis/formal.", { skill: "inversion-emphasis" }),
          makeQuestion("Pilih kalimat dengan inversion yang benar.", ["Seldom have I seen such courage.", "I seldom have seen such courage.", "Seldom I have seen such courage."], 0, "Seldom + auxiliary + subject + verb.", { skill: "inversion-emphasis" }),
          makeQuestion("No sooner had he arrived than he left. Artinya...", ["Dia baru tiba lalu pergi", "Dia sudah lama tiba", "Dia belum tiba"], 0, "No sooner... than = segera setelah.", { skill: "inversion-emphasis" }),
        ],
        complex: [
          makeQuestion("Had I known, I would have helped. Artinya...", ["Jika saya tahu, saya akan membantu.", "Saya tahu dan membantu.", "Saya tidak tahu dan tidak membantu."], 0, "Had I known = If I had known (inversion).", { skill: "inversion-emphasis" }),
          makeQuestion("Pilih kalimat dengan inversion untuk penekanan.", ["Rarely does she miss a deadline.", "She rarely misses a deadline.", "She misses a deadline rarely."], 0, "Rarely + does + subject + verb.", { skill: "inversion-emphasis" }),
          makeQuestion("Inversion dalam writing formal untuk...", ["menekankan elemen tertentu", "membuat kalimat informal", "menghilangkan subjek"], 0, "Inversion untuk penekanan formal.", { skill: "inversion-emphasis" }),
        ],
      },
    },
    "04-advanced-formal/08-ellipsis-substitution": {
      title: "Ellipsis & Substitution",
      levels: {
        simple: [
          makeQuestion("Ellipsis adalah...", ["menghilangkan kata yang sudah diketahui", "menambahkan kata baru", "mengganti kata"], 0, "Ellipsis = hapus kata yang understood.", { skill: "ellipsis-substitution" }),
          makeQuestion("Substitution adalah...", ["mengganti kata dengan kata lain", "menghapus kata", "menambahkan kata"], 0, "Substitution = ganti kata (one/do/so).", { skill: "ellipsis-substitution" }),
          makeQuestion("I like tea, and she does ___.", ["too", "also", "as well"], 0, "Does = substitute for like tea.", { skill: "ellipsis-substitution" }),
        ],
        intermediate: [
          makeQuestion("Pilih kalimat dengan ellipsis yang benar.", ["She can sing, and he can too.", "She can sing, and he can sing too.", "She can sing, and he too."], 0, "Can too = ellipsis of 'sing'.", { skill: "ellipsis-substitution" }),
          makeQuestion("One digunakan untuk mengganti...", ["noun tunggal yang disebut sebelumnya", "verb", "adjective"], 0, "One = substitusi noun tunggal.", { skill: "ellipsis-substitution" }),
          makeQuestion("Do so digunakan untuk mengganti...", ["tindakan yang disebut sebelumnya", "noun", "adjective"], 0, "Do so = substitusi tindakan.", { skill: "ellipsis-substitution" }),
        ],
        complex: [
          makeQuestion("Ellipsis dan substitution membantu...", ["menghindari pengulangan kata", "membuat kalimat lebih panjang", "menambah kata baru"], 0, "Hindari pengulangan.", { skill: "ellipsis-substitution" }),
          makeQuestion("Pilih kalimat dengan substitution yang benar.", ["I want the red one.", "I want the red one too.", "I want red one."], 0, "The one = substitusi noun.", { skill: "ellipsis-substitution" }),
          makeQuestion("Ellipsis dalam writing formal untuk...", ["kecakapan dan keefisienan", "panjangan kalimat", "kekompleksan"], 0, "Ellipsis untuk efisiensi.", { skill: "ellipsis-substitution" }),
        ],
      },
    },
    "04-advanced-formal/09-cohesion-coherence": {
      title: "Cohesion & Coherence",
      levels: {
        simple: [
          makeQuestion("Cohesion adalah...", ["konektivitas antar kalimat", "panjang paragraf", "jumlah kata"], 0, "Cohesion = konektivitas.", { skill: "cohesion-coherence" }),
          makeQuestion("Coherence adalah...", ["keutuhan makna dan alur ide", "jumlah kalimat", "kata sulit"], 0, "Coherence = alur ide yang utuh.", { skill: "cohesion-coherence" }),
          makeQuestion("Pilih kata penghubung untuk cohesion.", ["however", "the", "a"], 0, "However = connector untuk cohesion.", { skill: "cohesion-coherence" }),
        ],
        intermediate: [
          makeQuestion("Pronoun demonstratif untuk cohesion:", ["this", "that", "these", "those"], 0, "This/that/these/those = demonstratif.", { skill: "cohesion-coherence" }),
          makeQuestion("Kata hubung untuk alur ide:", ["moreover", "apple", "run"], 0, "Moreover = connector.", { skill: "cohesion-coherence" }),
          makeQuestion("Pilih paragraf yang koheren.", ["Ide tersusun dengan alur logis.", "Kata acak dikumpulkan.", "Kalimat tidak berhubungan."], 0, "Alur logis = koheren.", { skill: "cohesion-coherence" }),
        ],
        complex: [
          makeQuestion("Cohesion tanpa coherence membuat...", ["teks yang sulit dipahami", "teks yang sangat jelas", "teks yang pendek"], 0, "Cohesion tanpa coherence = bingung.", { skill: "cohesion-coherence" }),
          makeQuestion("Pilih teks dengan cohesion dan coherence yang baik.", ["Ide terhubung dengan connector dan pronouns yang tepat.", "Kata acak tanpa hubungannya.", "Kalimat panjang tanpa poin."], 0, "Connector + pronouns yang tepat.", { skill: "cohesion-coherence" }),
          makeQuestion("Substitusi kata untuk cohesion...", ["mengganti kata yang sudah disebut", "menambah kata baru", "menghapus semua kata"], 0, "Substitusi = ganti kata known.", { skill: "cohesion-coherence" }),
        ],
      },
    },
    "04-advanced-formal/10-formal-email-report": {
      title: "Formal Email & Report",
      levels: {
        simple: [
          makeQuestion("Subjek email formal harus...", ["jelas dan spesifik", "panjang dan rumit", "kosong"], 0, "Subjek jelas dan spesifik.", { skill: "formal-email-report" }),
          makeQuestion("Salam pembuka email formal:", ["Dear Mr. Smith,", "Hey there,", "Yo,"], 0, "Dear Mr. Smith = formal.", { skill: "formal-email-report" }),
          makeQuestion("Salam penutup email formal:", ["Sincerely,", "Bye,", "Love,"], 0, "Sincerely = formal.", { skill: "formal-email-report" }),
        ],
        intermediate: [
          makeQuestion("Email formal untuk permintaan:", ["Could you please...", "Give me...", "I want..."], 0, "Could you please = sopan.", { skill: "formal-email-report" }),
          makeQuestion("Tanggapan formal untuk keluhan:", ["We apologize for the inconvenience.", "It's not our problem.", "Whatever."], 0, "We apologize = profesional.", { skill: "formal-email-report" }),
          makeQuestion("Tanggapan formal untuk keluhan:", ["We apologize for the inconvenience.", "It's not our problem.", "Whatever."], 0, "We apologize = profesional.", { skill: "formal-email-report" }),
        ],
        complex: [
          makeQuestion("Laporan formal harus memiliki...", ["struktur yang jelas", "kata slang", "kata singkatan berlebihan"], 0, "Struktur jelas = laporan baik.", { skill: "formal-email-report" }),
          makeQuestion("Ringkasan eksekutif dalam laporan...", ["ringkasan poin utama", "detail teknis semua", "kata sandi"], 0, "Executive summary = poin utama.", { skill: "formal-email-report" }),
          makeQuestion("Pilih penutup email formal yang tepat.", ["I look forward to your reply.", "Talk soon.", "Later."], 0, "Look forward to = formal.", { skill: "formal-email-report" }),
        ],
      },
    },
    "04-advanced-formal/11-academic-conventions": {
      title: "Academic Conventions",
      levels: {
        simple: [
          makeQuestion("Parafrase yang bertanggung jawab harus...", ["menyusun ulang gagasan dan tetap memberi sitasi", "mengubah beberapa kata saja", "menghapus nama sumber"], 1, "Parafrase = susun ulang gagasan + sitasi.", { skill: "academic-conventions" }),
          makeQuestion("Klaim sebab-akibat dari korelasi memerlukan...", ["kehati-hatian dan bukti tambahan", "pernyataan mutlak", "penghapusan data"], 0, "Korelasi ≠ kausalitas, butuh bukti.", { skill: "academic-conventions" }),
          makeQuestion("Mengapa gaya sitasi harus konsisten?", ["agar sumber dapat ditelusuri", "agar semua paragraf sama panjang", "agar sitasi tidak perlu dibaca"], 0, "Konsistensi sitasi = dapat ditelusuri.", { skill: "academic-conventions" }),
        ],
        intermediate: [
          makeQuestion("Sitasi yang benar...", ["menunjukkan asal gagasan/sumber", "menggantikan analisis penulis", "hanya untuk kutipan langsung"], 0, "Sitasi = asal gagasan.", { skill: "academic-conventions" }),
          makeQuestion("Jika data hanya menunjukkan hubungan, klaim paling tepat adalah...", ["X berasosiasi dengan Y", "X menyebabkan Y", "X selalu menghasilkan Y"], 0, "Asosiasi ≠ kausalitas.", { skill: "academic-conventions" }),
          makeQuestion("Parafrase bukan...", ["salin-tempel dengan perubahan kecil", "menyusun ulang gagasan", "memberi sitasi"], 0, "Parafrase bukan salin-tempel.", { skill: "academic-conventions" }),
        ],
        complex: [
          makeQuestion("Klaim dan bukti harus...", ["terhubung dengan bukti relevan", "dibuat tanpa bukti", "disamakan dengan opini"], 0, "Klaim harus didukung bukti.", { skill: "academic-conventions" }),
          makeQuestion("Atribusikan gagasan, data, dan kata-kata yang berasal dari...", ["sumber", "penulis sendiri", "penerbit"], 0, "Atribusikan ke sumber.", { skill: "academic-conventions" }),
          makeQuestion("Parafrase yang bertanggung jawab...", ["menyusun ulang gagasan dan tetap memberi sitasi", "mengubah beberapa kata saja", "menghapus nama sumber"], 0, "Parafrase + sitasi.", { skill: "academic-conventions" }),
        ],
      },
    },
    "04-advanced-formal/12-editing-precision": {
      title: "Editing & Precision",
      levels: {
        simple: [
          makeQuestion("The list of proposed changes ___ attached.", ["are", "is", "were"], 1, "Subject = list (singular) → is.", { skill: "editing-precision" }),
          makeQuestion("Pilih struktur paralel.", ["The role involves planning, writing, and editing.", "The role involves planning, writing, and to edit.", "The role involves to plan, writing, and editing."], 0, "Semua gerund = paralel.", { skill: "editing-precision" }),
          makeQuestion("Modifier sebaiknya diletakkan...", ["sedekat mungkin dengan kata yang diterangkan", "selalu di awal paragraf", "setelah tanda titik"], 0, "Modifier dekat kata yang diterangkan.", { skill: "editing-precision" }),
        ],
        intermediate: [
          makeQuestion("Tujuan editing presisi adalah...", ["menjaga makna akurat dan jelas", "menambah kata sebanyak mungkin", "menghapus semua conjunction"], 1, "Makna akurat dan jelas.", { skill: "editing-precision" }),
          makeQuestion("Kalimat mana paling jelas?", ["While reviewing the report, the errors were obvious.", "While reviewing the report, I noticed several errors.", "The report, while reviewing, obvious errors."], 1, "I noticed = jelas siapa pelakunya.", { skill: "editing-precision" }),
          makeQuestion("Periksa subject–verb agreement terutama jika...", ["frasa panjang memisahkan keduanya", "kata terlalu pendek", "kalimat terlalu sederhana"], 0, "Subject-verb agreement dengan frasa panjang.", { skill: "editing-precision" }),
        ],
        complex: [
          makeQuestion("Editing presisi memeriksa...", ["agreement, parallelism, modifier, pilihan kata", "panjang kalimat saja", "kata sulit saja"], 0, "Editing = agreement, parallelism, modifier, diction.", { skill: "editing-precision" }),
          makeQuestion("Ambigu: She discussed the report with the manager that was incomplete. Lebih jelas:", ["She discussed the incomplete report with the manager.", "She discussed the report with the manager who was incomplete.", "She discussed the report with the manager that incomplete."], 0, "Modifier dekat noun yang diterangkan.", { skill: "editing-precision" }),
          makeQuestion("Tujuan akhir editing presisi:", ["makna tepat dan mudah dipahami", "kalimat sepanjang mungkin", "kata sesulit mungkin"], 0, "Makna tepat dan jelas.", { skill: "editing-precision" }),
        ],
      },
    },
  };

"00-foundation/04-articles": {
  title: "Artikel: a / an / the",
  levels: {
    simple: [
      makeQuestion("Artikel digunakan untuk benda pertama kali disebutkan", ["a", "an", "the"], 0, "Artikel pertama kalinya: gunakan a atau an tergantung bunyi awal", { skill: "articles-a-an" }),
      makeQuestion("Pilih artikel yang tepat untuk 'hour'", ["a", "an", "the"], 1, "Hour dimulai dengan bunyi vokal silang, jadi gunakan 'an'", { skill: "articles-a-an" }),
      makeQuestion("Pilih artikel untuk 'university'", ["a", "an", "the"], 2, "University Bunyi awal konsonan, jadi gunakan 'the' jika sudah diketahui atau 'a' jika pertama", { skill: "articles-a-an" }),
      makeQuestion("Artikel untuk benda berbilangan banyak", ["a", "an", "the"], 1, "'The' digunakan untuk benda yang sudah spesifik atau diketahui keduanya", { skill: "articles-the" }),
      makeQuestion("Pilih artikel yang tepat untuk 'book'", ["a", "an", "the"], 0, "Buku pada kalimat pertama kalinya: gunakan 'a'", { skill: "articles-a-an" }),
      makeQuestion("Artikel untuk benda spesifik yang diketahui", ["a", "an", "the"], 2, "'The' digunakan ketika keduanya sudah tahu benda yang dibicarakan", { skill: "articles-the" }),
      makeQuestion("Pilih artikel untuk 'apple'", ["a", "an", "the"], 0, "Apple dimulai dengan bunyi vokal, jadi gunakan 'an'", { skill: "articles-a-an" }),
      makeQuestion("Artikel nol untuk jam dan hari", ["a", "an", "the"], 2, "Untuk jam: 'It is one o'clock' atau 'It is two o'clock' (tanpa the), untuk hari juga umumnya tanpa the", { skill: "articles-zero" }),
      makeQuestion("Pilih kalimat yang benar: 'I have __ book.'", ["a", "an", "the"], 2, "'The book' = buku yang sudah diketahui", { skill: "articles-the" }),
      makeQuestion("Pilih artikel untuk 'uniform'", ["a", "an", "the"], 1, "Uniform: huruf awal U bunyi konsonan, jadi gunakan 'a'", { skill: "articles-a-an" }),
    ],
    intermediate: [
      makeQuestion("Pilih kalimat yang benar: 'She is ___ engineer.'", ["a", "an", "the"], 1, "'An engineer' = profesi, huruf awal engineer bunyi vokal", { skill: "articles-a-an" }),
      makeQuestion("Pilih artikel untuk 'European'", ["a", "an", "the"], 1, "European dimulai dengan bunyi vokal silang /j/, jadi gunakan 'an'", { skill: "articles-a-an" }),
      makeQuestion("Pilih kalimat yang benar: 'He wants ___ orange.'", ["a", "an", "the"], 0, "'A orange' = pertama kalinya", { skill: "articles-a-an" }),
      makeQuestion("Pilih artikel untuk 'MRI scan'", ["a", "an", "the"], 2, "MRI scan: istilah spesifik yang sudah diketahui, gunakan 'the'", { skill: "articles-the" }),
      makeQuestion("Pilih kalimat yang benar: 'We went to ___ park.'", ["a", "an", "the"], 2, "'The park' = park tertentu yang sudah diketahui", { skill: "articles-the" }),
      makeQuestion("Pilih artikel untuk 'honor'", ["a", "an", "the"], 1, "Honor dimulai dengan bunyi vokal silang, jadi gunakan 'an'", { skill: "articles-a-an" }),
      makeQuestion("Pilih kalimat yang benar: 'Close the door, please.'", ["a", "an", "the"], 2, "'The door' = door yang spesifik dalam konteks", { skill: "articles-the" }),
      makeQuestion("Pilih artikel untuk 'UK'", ["a", "an", "the"], 1, "'An UK' tidak benar, seharusnya 'a UK' karena U dibaca seperti 'you'", { skill: "articles-a-an" }),
      makeQuestion("Pilih kalimat yang benar: 'She is ___ honest girl.'", ["a", "an", "the"], 1, "Honest: huruf awal H buta bunyi, jadi gunakan 'an'", { skill: "articles-a-an" }),
      makeQuestion("Pilih artikel untuk 'FBI agent'", ["a", "an", "the"], 2, "FBI agent: istilah spesifik, gunakan 'the'", { skill: "articles-the" }),
    ],
    complex: [
      makeQuestion("Pilih kalimat yang tepat: '___ situation is under control.'", ["A", "An", "The"], 2, "Situation adalah kata yang diketahui atau sedang dibahas spesifik", { skill: "articles-the" }),
      makeQuestion("Pilih artikel untuk 'minute' (satuan waktu)", ["a", "an", "the"], 1, "Minute dimulai dengan bunyi vokal silang, gunakan 'an'", { skill: "articles-a-an" }),
      makeQuestion("Pilih kalimat yang benar: 'He is ___ university student.'", ["a", "an", "the"], 1, "Tanpa artikel untuk profesi dalam umum: 'He is university student'", { skill: "articles-zero" }),
      makeQuestion("Pilih artikel untuk 'such a'", ["a", "an", "the"], 0, "'Such a' digunakan untuk penekanan kuat", { skill: "articles-a-an" }),
      makeQuestion("Pilih kalimat yang benar: 'I do not have ___ idea.'", ["a", "an", "the"], 0, "Idea dimulai dengan bunyi vokal, gunakan 'an', tapi setelah 'do not' kontruksi menjadi 'a'", { skill: "articles-a-an" }),
      makeQuestion("Pilih artikel untuk 'oh no'", ["a", "an", "the"], 2, "Interjeksi oh no butuh 'the' jika merujuk pada situasi spesifik", { skill: "articles-the" }),
      makeQuestion("Pilih kalimat yang benar: 'She is ___ European.'", ["a", "an", "the"], 1, "European dimulai dengan bunyi vokal silang, gunakan 'an'", { skill: "articles-a-an" }),
      makeQuestion("Pilih artikel untuk 'historic event'", ["a", "an", "the"], 2, "Historical/event tertentu: gunakan 'the'", { skill: "articles-the" }),
      makeQuestion("Pilih kalimat yang tepat: 'He plays ___ piano.'", ["a", "an", "the"], 2, "Main piano = instrument secara umum, gunakan 'the'", { skill: "articles-the" }),
      makeQuestion("Pilih kalimat yang tepat: 'I saw ___ elephant at the zoo.'", ["a", "an", "the"], 2, "Elephant: 'a' dulu kalimat pertama, lalu 'the' jika diketahui", { skill: "articles-a-an" }),
    ],
  },
},

  })();