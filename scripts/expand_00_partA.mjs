import {
  expandFromPatterns,
  updateModulePack,
} from "./_qb_helpers.mjs";

// 1. 00-foundation/01-parts-of-speech
function buildPosSimple() {
  const nounBank = [
    ["deadline", "batas waktu", "The project ___ is Friday afternoon.", "verb", "adjective"],
    ["budget", "anggaran", "Our department approved the annual ___.", "adverb", "preposition"],
    ["conference", "konferensi", "She attended an international ___ in Singapore.", "verb", "conjunction"],
    ["receipt", "struk pembayaran", "Please keep the printed ___ for reimbursement.", "adverb", "adjective"],
    ["candidate", "kandidat", "Every ___ completed the written assessment.", "verb", "adverb"],
    ["laboratory", "laboratorium", "The research ___ opens at seven.", "adjective", "adverb"],
    ["shipment", "pengiriman barang", "The morning ___ arrived ahead of schedule.", "verb", "preposition"],
    ["syllabus", "silabus", "Students downloaded the updated course ___.", "adverb", "verb"],
    ["itinerary", "rencana perjalanan", "Our travel ___ includes two train transfers.", "adjective", "conjunction"],
    ["agreement", "perjanjian", "Both partners signed the written ___.", "adverb", "verb"],
  ];
  const adjBank = [
    ["reliable", "andal", "The technician recommended a ___ printer.", "noun", "adverb"],
    ["efficient", "efisien", "We need an ___ workflow for data entry.", "adverb", "noun"],
    ["crowded", "ramai", "The central station gets ___ around five.", "verb", "adverb"],
    ["accurate", "akurat", "The report contains ___ sales figures.", "noun", "adverb"],
    ["flexible", "fleksibel", "Many employees prefer ___ working hours.", "adverb", "verb"],
    ["urgent", "mendesak", "The supervisor sent an ___ message this morning.", "noun", "adverb"],
    ["spacious", "luas", "They booked a ___ meeting room upstairs.", "verb", "noun"],
    ["affordable", "terjangkau", "The hostel offers ___ rooms near campus.", "adverb", "noun"],
  ];
  const verbBank = [
    ["submit", "mengumpulkan", "All interns must ___ their logs by noon.", "noun", "adjective"],
    ["verify", "memverifikasi", "Accountants ___ every invoice before payment.", "adjective", "adverb"],
    ["arrange", "mengatur", "Can you ___ the chairs before the seminar?", "noun", "adverb"],
    ["inspect", "memeriksa", "Engineers ___ the bridge structure twice a year.", "adverb", "noun"],
    ["deliver", "mengantarkan", "The courier will ___ the parcel before three.", "adjective", "noun"],
    ["revise", "merevisi", "Authors often ___ the opening paragraph.", "adverb", "adjective"],
    ["install", "memasang", "Technicians ___ new security software tonight.", "noun", "adverb"],
    ["attend", "menghadiri", "All supervisors ___ the weekly briefing.", "adjective", "preposition"],
  ];
  const advBank = [
    ["carefully", "dengan teliti", "She read the contract ___ before signing.", "adjective", "noun"],
    ["politely", "dengan sopan", "The receptionist answered every question ___.", "noun", "verb"],
    ["promptly", "dengan segera", "Please reply to client emails ___.", "adjective", "noun"],
    ["quietly", "dengan tenang", "Students worked ___ inside the reading hall.", "noun", "adjective"],
    ["clearly", "dengan jelas", "The instructor explained the diagram ___.", "adjective", "verb"],
    ["regularly", "secara teratur", "The clinic checks air filters ___.", "noun", "adjective"],
  ];

  const choice = [
    ...nounBank.map(([w, id, sent, d1, d2]) => ({
      prompt: `Dalam kalimat "${sent.replace("___", w)}", kata "${w}" termasuk kelas kata...`,
      correct: "noun",
      distractors: [d1, d2],
      explanation: `"${w}" (${id}) merujuk pada benda, hal, atau konsep sehingga berfungsi sebagai noun.`,
      hints: ["Identifikasi apakah kata tersebut merujuk pada hal atau benda.", "Kata benda = noun."],
      skill: "pos-noun",
    })),
    ...adjBank.map(([w, id, sent, d1, d2]) => ({
      prompt: `Dalam kalimat "${sent.replace("___", w)}", kata "${w}" berfungsi sebagai...`,
      correct: "adjective",
      distractors: [d1, d2],
      explanation: `"${w}" (${id}) menerangkan sifat kata benda di sebelahnya sehingga merupakan adjective.`,
      hints: ["Lihat kata benda setelah kata ini.", "Kata yang menerangkan noun disebut adjective."],
      skill: "pos-adjective",
    })),
    ...verbBank.map(([w, id, sent, d1, d2]) => ({
      prompt: `Pada kalimat "${sent.replace("___", w)}", kelas kata "${w}" adalah...`,
      correct: "verb",
      distractors: [d1, d2],
      explanation: `"${w}" (${id}) menyatakan tindakan atau aktivitas subjek sehingga tergolong verb.`,
      hints: ["Kata ini menyatakan aksi subjek.", "Kata kerja = verb."],
      skill: "pos-verb",
    })),
    ...advBank.map(([w, id, sent, d1, d2]) => ({
      prompt: `Kata "${w}" pada kalimat "${sent.replace("___", w)}" tergolong...`,
      correct: "adverb",
      distractors: [d1, d2],
      explanation: `"${w}" (${id}) menerangkan cara kata kerja dilakukan dan berakhiran -ly, sehingga merupakan adverb.`,
      hints: ["Perhatikan akhiran -ly yang menerangkan cara kerja.", "Kata keterangan cara = adverb."],
      skill: "pos-adverb",
    })),
  ];

  const speakers = ["Rina", "Budi", "Sari", "Dimas", "Nadia"];
  const dialogue = [
    ["reliable", "reliably", "reliability", "a ___ delivery service", "adjective", "noun", "adverb", "pos-adjective"],
    ["carefully", "careful", "care", "check the figures ___", "adverb", "adjective", "noun", "pos-adverb"],
    ["approval", "approve", "approved", "wait for written ___", "noun", "verb", "adjective", "pos-noun"],
    ["confirm", "confirmation", "confirming", "We need to ___ the flight", "verb", "noun", "adjective", "pos-verb"],
    ["polite", "politely", "politeness", "Our staff always stay ___", "adjective", "adverb", "noun", "pos-adjective"],
    ["quickly", "quick", "quickness", "The technician fixed it ___", "adverb", "adjective", "noun", "pos-adverb"],
    ["decision", "decide", "decisive", "The board made a final ___", "noun", "verb", "adjective", "pos-noun"],
    ["organize", "organization", "organized", "Please ___ the seminar files", "verb", "noun", "adjective", "pos-verb"],
    ["accurate", "accurately", "accuracy", "Enter the ___ room number", "adjective", "adverb", "noun", "pos-adjective"],
    ["clearly", "clear", "clarity", "Write the labels ___", "adverb", "adjective", "noun", "pos-adverb"],
    ["presentation", "present", "presentable", "Prepare the slides for the ___", "noun", "verb", "adjective", "pos-noun"],
    ["review", "reviewer", "reviewable", "Did the manager ___ the draft?", "verb", "noun", "adjective", "pos-verb"],
    ["quiet", "quietly", "quietness", "Keep the study room ___", "adjective", "adverb", "noun", "pos-adjective"],
    ["promptly", "prompt", "promptness", "Reply to the client ___", "adverb", "adjective", "noun", "pos-adverb"],
    ["schedule", "scheduled", "scheduling", "Check the updated train ___", "noun", "adjective", "verb", "pos-noun"],
    ["prepare", "preparation", "prepared", "Let us ___ the handout now", "verb", "noun", "adjective", "pos-verb"],
    ["spacious", "space", "spaciously", "They rented a ___ studio", "adjective", "noun", "adverb", "pos-adjective"],
    ["safely", "safe", "safety", "Store the chemicals ___", "adverb", "adjective", "noun", "pos-adverb"],
    ["equipment", "equip", "equipped", "Lock the lab ___ after class", "noun", "verb", "adjective", "pos-noun"],
    ["submit", "submission", "submissive", "Students must ___ the essay", "verb", "noun", "adjective", "pos-verb"],
  ].map(([good, bad1, bad2, ctx, pos, pBad1, pBad2, skill], idx) => ({
    prompt: "Pilih bentuk kata dengan kelas kata yang tepat untuk melengkapi dialog.",
    speakerA: speakers[idx % speakers.length],
    lineA: `Can we finish this task before 4 PM?`,
    speakerB: speakers[(idx + 1) % speakers.length],
    lineB: `Yes, let's make sure we handle "${ctx.replace("___", "___")}" properly.`,
    correct: good,
    distractors: [bad1, bad2],
    explanation: `Konteks frasa "${ctx.replace("___", good)}" membutuhkan ${pos} ("${good}"), bukan ${pBad1} atau ${pBad2}.`,
    hints: [`Tentukan apakah rumpang membutuhkan ${pos}.`, `Pilih kata "${good}".`],
    skill,
  }));

  const edit = [
    ["She explained the procedure very clear.", "She explained the procedure very clearly.", "She explained the procedure very clarity.", "Gunakan adverb 'clearly' untuk menerangkan verb 'explained'.", "pos-adverb"],
    ["He is a very reliability colleague.", "He is a very reliable colleague.", "He is a very reliably colleague.", "Sebelum noun 'colleague', gunakan adjective 'reliable'.", "pos-adjective"],
    ["Please complete the form careful.", "Please complete the form carefully.", "Please complete the form carefulness.", "Untuk menerangkan verb 'complete', gunakan adverb 'carefully'.", "pos-adverb"],
    ["The manager made a wise decide.", "The manager made a wise decision.", "The manager made a wise decisive.", "Setelah adjective 'wise', dibutuhkan noun 'decision'.", "pos-noun"],
    ["We need to organization the files today.", "We need to organize the files today.", "We need to organized the files today.", "Setelah 'need to', gunakan base verb 'organize'.", "pos-verb"],
    ["The train arrived quick at Platform 2.", "The train arrived quickly at Platform 2.", "The train arrived quickness at Platform 2.", "Untuk menerangkan kata kerja 'arrived', gunakan adverb 'quickly'.", "pos-adverb"],
    ["This report contains accuracy data.", "This report contains accurate data.", "This report contains accurately data.", "Sebelum noun 'data', gunakan adjective 'accurate'.", "pos-adjective"],
    ["Please write your explain on page two.", "Please write your explanation on page two.", "Please write your explanatory on page two.", "Setelah possessive 'your', gunakan noun 'explanation'.", "pos-noun"],
    ["The nurse spoke gentle to the patient.", "The nurse spoke gently to the patient.", "The nurse spoke gentleness to the patient.", "Untuk menerangkan verb 'spoke', gunakan adverb 'gently'.", "pos-adverb"],
    ["Every member must participation in the vote.", "Every member must participate in the vote.", "Every member must participant in the vote.", "Setelah modal 'must', gunakan verb dasar 'participate'.", "pos-verb"],
    ["That was an extreme helpful workshop.", "That was an extremely helpful workshop.", "That was an extremity helpful workshop.", "Untuk menerangkan adjective 'helpful', gunakan adverb 'extremely'.", "pos-adverb"],
    ["Our team achieved great succeed this year.", "Our team achieved great success this year.", "Our team achieved great successful this year.", "Setelah adjective 'great', dibutuhkan noun 'success'.", "pos-noun"],
    ["The hotel has a comfort lobby.", "The hotel has a comfortable lobby.", "The hotel has a comfortably lobby.", "Sebelum noun 'lobby', gunakan adjective 'comfortable'.", "pos-adjective"],
    ["The interns listened attentive during orientation.", "The interns listened attentively during orientation.", "The interns listened attention during orientation.", "Menerangkan verb 'listened' memerlukan adverb 'attentively'.", "pos-adverb"],
    ["They will announcement the winner tomorrow.", "They will announce the winner tomorrow.", "They will announced the winner tomorrow.", "Setelah 'will', gunakan base verb 'announce'.", "pos-verb"],
    ["We received an immediacy reply from HR.", "We received an immediate reply from HR.", "We received an immediately reply from HR.", "Sebelum noun 'reply', gunakan adjective 'immediate'.", "pos-adjective"],
    ["His analyze of the chart was thorough.", "His analysis of the chart was thorough.", "His analytical of the chart was thorough.", "Setelah 'His', dibutuhkan noun 'analysis'.", "pos-noun"],
    ["Pack the fragile glassware safe.", "Pack the fragile glassware safely.", "Pack the fragile glassware safety.", "Untuk menerangkan verb 'Pack', gunakan adverb 'safely'.", "pos-adverb"],
    ["Can you translation this short memo?", "Can you translate this short memo?", "Can you translator this short memo?", "Setelah 'Can you', gunakan base verb 'translate'.", "pos-verb"],
    ["The new library is quietness and bright.", "The new library is quiet and bright.", "The new library is quietly and bright.", "Setelah linking verb 'is', gunakan adjective 'quiet'.", "pos-adjective"],
  ].map(([draft, correct, bad, exp, skill]) => ({
    prompt: "Perbaiki kesalahan kelas kata pada kalimat berikut.",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Periksa kelas kata yang tidak tepat pada kalimat draft.", "Cocokkan noun/verb/adjective/adverb dengan posisinya."],
    skill,
  }));

  const build = [
    ["The diligent analyst checked the figures carefully.", "Article + adj + noun + verb + object + adverb.", "pos-adverb"],
    ["Our polite receptionist greeted every visitor warmly.", "Possessive + adj + noun + verb + object + adverb.", "pos-adverb"],
    ["Students must submit their lab reports promptly.", "Subject + modal + verb + object + adverb.", "pos-verb"],
    ["A skilled mechanic repaired the broken engine quickly.", "Subject frasa benda + verb + object + adverb.", "pos-adjective"],
    ["The local museum displays rare historical maps.", "Subject + verb + adj + adj + noun.", "pos-noun"],
    ["Senior engineers test the new bridge regularly.", "Adj + noun + verb + object + adverb.", "pos-adverb"],
    ["Every candidate needs strong communication skills.", "Determiner + noun + verb + object frasa benda.", "pos-noun"],
    ["The helpful librarian arranged the reference books neatly.", "Subject + verb + object + adverb.", "pos-adverb"],
    ["Modern hospitals use reliable digital equipment.", "Adj + noun + verb + adj + noun.", "pos-adjective"],
    ["Our coordinator prepared an accurate travel itinerary.", "Subject + verb + article + adj + noun.", "pos-noun"],
    ["Careful editors review every manuscript thoroughly.", "Adj + noun + verb + object + adverb.", "pos-adverb"],
    ["The quiet study room opens early daily.", "Subject + verb + adverb.", "pos-adverb"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kata-kata ini menjadi kalimat bahasa Inggris yang tepat secara kelas kata.",
    targetSentence,
    explanation: exp,
    hints: ["Letakkan subject noun phrase di awal, lalu verb.", "Taruh adverb of manner/frequency di posisi akhir."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildPosIntermediate() {
  const items = [
    ["sign", "verb", "noun", "adverb", "Please ___ the attendance sheet.", "Setelah 'Please', dibutuhkan kata kerja dasar (verb)."],
    ["signature", "noun", "verb", "adjective", "Your ___ is required at the bottom.", "Setelah 'Your', dibutuhkan kata benda (noun)."],
    ["record", "verb", "noun", "adjective", "We ___ all seminar sessions on video.", "Posisi setelah subjek 'We' membutuhkan verb."],
    ["record", "noun", "verb", "adverb", "Keep a clear ___ of daily expenses.", "Setelah 'a clear', kata 'record' berfungsi sebagai noun."],
    ["approve", "verb", "noun", "adjective", "Directors ___ the budget every December.", "Posisi predikat membutuhkan verb."],
    ["approval", "noun", "verb", "adverb", "Final ___ takes two working days.", "Subjek kalimat ini berbentuk noun."],
    ["compare", "verb", "adjective", "noun", "Always ___ prices before ordering supplies.", "Kalimat perintah memakai verb dasar."],
    ["comparison", "noun", "verb", "adverb", "This chart shows a clear ___.", "Setelah 'a clear', dibutuhkan noun."],
    ["comparative", "adjective", "verb", "adverb", "They wrote a ___ study of two cities.", "Sebelum noun 'study', dibutuhkan adjective."],
    ["produce", "verb", "noun", "adverb", "This factory can ___ 500 units daily.", "Setelah modal 'can', gunakan verb dasar."],
    ["production", "noun", "verb", "adjective", "Factory ___ increased by ten percent.", "Subjek kalimat menggunakan noun."],
    ["productive", "adjective", "adverb", "noun", "We had a very ___ planning meeting.", "Sebelum noun 'meeting', gunakan adjective."],
    ["productively", "adverb", "adjective", "noun", "The remote team worked ___ all week.", "Menerangkan verb 'worked' memakai adverb."],
    ["inform", "verb", "noun", "adjective", "Please ___ passengers of any gate change.", "Setelah 'Please', gunakan verb dasar."],
    ["information", "noun", "verb", "adverb", "Check the travel ___ board upstairs.", "Head noun dari frasa adalah 'information' (noun)."],
    ["informative", "adjective", "adverb", "verb", "The keynote speech was highly ___.", "Setelah 'was highly', gunakan adjective."],
    ["educate", "verb", "noun", "adjective", "Public campaigns ___ citizens on recycling.", "Predikat jamak memakai verb."],
    ["education", "noun", "adjective", "verb", "Higher ___ opens broader career paths.", "Subjek frasa ini berupa noun."],
    ["educational", "adjective", "adverb", "noun", "They visited an ___ science center.", "Sebelum noun 'science center', gunakan adjective."],
    ["manage", "verb", "noun", "adverb", "Supervisors ___ daily warehouse shifts.", "Predikat kalimat memakai verb."],
    ["management", "noun", "verb", "adjective", "Good time ___ reduces exam stress.", "Subjek membutuhkan noun."],
    ["manageable", "adjective", "adverb", "verb", "Break large tasks into ___ steps.", "Sebelum noun 'steps', gunakan adjective."],
    ["analyze", "verb", "noun", "adjective", "Researchers ___ survey responses carefully.", "Predikat kalimat membutuhkan verb."],
    ["analysis", "noun", "verb", "adverb", "Her statistical ___ revealed a clear trend.", "Subjek setelah possessive 'Her' adalah noun."],
    ["analytical", "adjective", "adverb", "noun", "This role requires strong ___ thinking.", "Sebelum noun 'thinking', gunakan adjective."],
    ["create", "verb", "noun", "adjective", "Designers ___ clean user interfaces.", "Predikat memakai verb."],
    ["creation", "noun", "verb", "adverb", "The ___ of new jobs boosted growth.", "Setelah 'The', dibutuhkan noun."],
    ["creative", "adjective", "adverb", "verb", "She offered a ___ solution to the issue.", "Sebelum noun 'solution', gunakan adjective."],
    ["creatively", "adverb", "adjective", "noun", "The team solved the layout puzzle ___.", "Menerangkan verb 'solved' memakai adverb."],
    ["protect", "verb", "noun", "adjective", "Strong passwords ___ user accounts.", "Predikat kalimat membutuhkan verb."],
  ];

  const choice = items.map(([word, pos, d1, d2, sent, exp]) => ({
    prompt: `Dalam kalimat "${sent.replace("___", word)}", kata "${word}" berfungsi sebagai...`,
    correct: pos,
    distractors: [d1, d2],
    explanation: exp,
    hints: ["Perhatikan posisi kata terhadap subjek, kata kerja, atau kata sandang.", `Tentukan fungsi gramatikal "${word}".`],
    skill: `pos-${pos}`,
  }));

  const dlgItems = [
    ["recommendation", "recommend", "recommended", "write a strong ___ for the intern", "noun", "pos-noun"],
    ["responsibly", "responsible", "responsibility", "handle customer data ___", "adverb", "pos-adverb"],
    ["confident", "confidently", "confidence", "sound ___ during the interview", "adjective", "pos-adjective"],
    ["coordinate", "coordination", "coordinated", "Who will ___ the airport pickup?", "verb", "pos-verb"],
    ["improvement", "improve", "improved", "notice a steady ___ in accuracy", "noun", "pos-noun"],
    ["accurately", "accurate", "accuracy", "measure the ingredients ___", "adverb", "pos-adverb"],
    ["competitive", "compete", "competitively", "set a ___ subscription price", "adjective", "pos-adjective"],
    ["verify", "verification", "verified", "Did you ___ the bank transfer?", "verb", "pos-verb"],
    ["attendance", "attend", "attentive", "record daily student ___", "noun", "pos-noun"],
    ["fluently", "fluent", "fluency", "speak two languages ___", "adverb", "pos-adverb"],
    ["practical", "practically", "practice", "give ___ examples in class", "adjective", "pos-adjective"],
    ["expand", "expansion", "expansive", "plan to ___ the branch next year", "verb", "pos-verb"],
    ["solution", "solve", "solvable", "find a lasting ___ together", "noun", "pos-noun"],
    ["independently", "independent", "independence", "complete the lab assignment ___", "adverb", "pos-adverb"],
    ["affordable", "afford", "affordability", "choose an ___ hotel near the venue", "adjective", "pos-adjective"],
    ["confirm", "confirmation", "confirmed", "Could you ___ the meeting room?", "verb", "pos-verb"],
    ["maintenance", "maintain", "maintained", "schedule regular server ___", "noun", "pos-noun"],
    ["courteously", "courteous", "courtesy", "greet all guests ___", "adverb", "pos-adverb"],
    ["essential", "essentially", "essence", "bring all ___ documents tomorrow", "adjective", "pos-adjective"],
    ["finalize", "final", "finally", "We should ___ the guest list tonight", "verb", "pos-verb"],
  ];

  const dialogue = dlgItems.map(([good, b1, b2, ctx, pos, skill], idx) => ({
    prompt: "Lengkapi percakapan dengan bentuk kata (word family) yang tepat.",
    speakerA: ["Ayu", "Rama", "Tara", "Kevin"][idx % 4],
    lineA: "What do we still need to do for tomorrow's workshop?",
    speakerB: ["Bagas", "Lina", "Hana", "Dewi"][idx % 4],
    lineB: `We need to ${ctx.replace("___", "___")} before five o'clock.`,
    correct: good,
    distractors: [b1, b2],
    explanation: `Posisi rumpang memerlukan ${pos} yang tepat, yaitu "${good}".`,
    hints: [`Analisis kelas kata yang dibutuhkan pada "${ctx}".`, `Pilih bentuk ${pos} "${good}".`],
    skill,
  }));

  const edit = [
    ["The finance team gave a very clearly presentation.", "The finance team gave a very clear presentation.", "The finance team gave a very clarity presentation.", "Sebelum noun 'presentation', gunakan adjective 'clear'.", "pos-adjective"],
    ["Every applicant must submission a portfolio.", "Every applicant must submit a portfolio.", "Every applicant must submissive a portfolio.", "Setelah modal 'must', gunakan verb 'submit'.", "pos-verb"],
    ["She answered all technical questions confident.", "She answered all technical questions confidently.", "She answered all technical questions confidence.", "Menerangkan verb 'answered' membutuhkan adverb 'confidently'.", "pos-adverb"],
    ["We appreciate your cooperate during the audit.", "We appreciate your cooperation during the audit.", "We appreciate your cooperative during the audit.", "Setelah possessive 'your', gunakan noun 'cooperation'.", "pos-noun"],
    ["The new system runs smooth on older devices.", "The new system runs smoothly on older devices.", "The new system runs smoothness on older devices.", "Menerangkan verb 'runs' memakai adverb 'smoothly'.", "pos-adverb"],
    ["This course provides practice training for nurses.", "This course provides practical training for nurses.", "This course provides practically training for nurses.", "Sebelum noun 'training', gunakan adjective 'practical'.", "pos-adjective"],
    ["Please signature the delivery slip upon arrival.", "Please sign the delivery slip upon arrival.", "Please signal the delivery slip upon arrival.", "Setelah 'Please', dibutuhkan kata kerja 'sign'.", "pos-verb"],
    ["Customer satisfied is our top priority.", "Customer satisfaction is our top priority.", "Customer satisfy is our top priority.", "Posisi subjek membutuhkan noun 'satisfaction'.", "pos-noun"],
    ["The committee reviewed the proposal thorough.", "The committee reviewed the proposal thoroughly.", "The committee reviewed the proposal thoroughness.", "Untuk menerangkan 'reviewed', gunakan adverb 'thoroughly'.", "pos-adverb"],
    ["He showed great determine during recovery.", "He showed great determination during recovery.", "He showed great determined during recovery.", "Setelah adjective 'great', dibutuhkan noun 'determination'.", "pos-noun"],
    ["Our goal is to efficiency reduce paper waste.", "Our goal is to efficiently reduce paper waste.", "Our goal is to efficient reduce paper waste.", "Menerangkan verb 'reduce' membutuhkan adverb 'efficiently'.", "pos-adverb"],
    ["They built a success online bookstore.", "They built a successful online bookstore.", "They built a successfully online bookstore.", "Sebelum noun phrase 'online bookstore', gunakan adjective 'successful'.", "pos-adjective"],
    ["Could you clarification the second chart?", "Could you clarify the second chart?", "Could you clarity the second chart?", "Setelah 'Could you', gunakan base verb 'clarify'.", "pos-verb"],
    ["The lecturer spoke concise about climate data.", "The lecturer spoke concisely about climate data.", "The lecturer spoke conciseness about climate data.", "Menerangkan verb 'spoke' membutuhkan adverb 'concisely'.", "pos-adverb"],
    ["Regular inspect keeps factory machines safe.", "Regular inspection keeps factory machines safe.", "Regular inspectable keeps factory machines safe.", "Setelah adjective 'Regular', subjek memakai noun 'inspection'.", "pos-noun"],
    ["We expect a significance rise in summer bookings.", "We expect a significant rise in summer bookings.", "We expect a significantly rise in summer bookings.", "Sebelum noun 'rise', gunakan adjective 'significant'.", "pos-adjective"],
    ["Please verification your email address first.", "Please verify your email address first.", "Please verifiable your email address first.", "Setelah 'Please', gunakan verb 'verify'.", "pos-verb"],
    ["The courier handled the fragile parcel gentle.", "The courier handled the fragile parcel gently.", "The courier handled the fragile parcel gentleness.", "Untuk menerangkan verb 'handled', gunakan adverb 'gently'.", "pos-adverb"],
    ["Good prepare helps speakers stay calm.", "Good preparation helps speakers stay calm.", "Good preparatory helps speakers stay calm.", "Setelah adjective 'Good', dibutuhkan noun 'preparation'.", "pos-noun"],
    ["The guide gave us help advice on transit.", "The guide gave us helpful advice on transit.", "The guide gave us helpfully advice on transit.", "Sebelum noun 'advice', gunakan adjective 'helpful'.", "pos-adjective"],
  ].map(([draft, correct, bad, exp, skill]) => ({
    prompt: "Identifikasi dan perbaiki kesalahan word family pada kalimat ini.",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Cek kesesuaian akhiran kata dengan posisi gramatikalnya.", "Pastikan noun/verb/adj/adv tidak tertukar."],
    skill,
  }));

  const build = [
    ["Careful planning ensures smooth project execution.", "Adjective + noun + verb + adjective + noun.", "pos-noun"],
    ["The senior auditor examined every financial statement thoroughly.", "Subject + verb + object + adverb.", "pos-adverb"],
    ["Clear communication prevents costly workplace misunderstandings.", "Adjective + noun + verb + object.", "pos-adjective"],
    ["Experienced teachers explain complex concepts simply.", "Adjective + noun + verb + object + adverb.", "pos-adverb"],
    ["Regular maintenance protects expensive laboratory equipment.", "Subject + verb + adjective + noun phrase.", "pos-noun"],
    ["Our marketing team designs persuasive digital campaigns.", "Subject + verb + adjective + noun.", "pos-adjective"],
    ["Accurate translations require deep cultural understanding.", "Adjective + noun + verb + object.", "pos-noun"],
    ["Prompt replies build strong client trust.", "Adjective + noun + verb + object.", "pos-adjective"],
    ["Students can download supplementary reading materials online.", "Subject + modal + verb + object + adverb.", "pos-verb"],
    ["Reliable public transit reduces urban traffic congestion.", "Subject + verb + adjective + noun.", "pos-noun"],
    ["Skilled technicians resolve network errors efficiently.", "Subject + verb + object + adverb.", "pos-adverb"],
    ["Honest feedback helps young professionals grow steadily.", "Subject + verb + object + verb + adverb.", "pos-adverb"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun frasa berikut menjadi kalimat akademik/profesional dengan word class yang tepat.",
    targetSentence,
    explanation: exp,
    hints: ["Tempatkan adjective sebelum noun yang diterangkannya.", "Letakkan adverb of manner di akhir klausa."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildPosComplex() {
  const choice = [
    ["Before we ___ the contract, review every annex.", "finalize", "finalization", "finally", "verb", "Setelah subjek 'we', dibutuhkan transitive verb 'finalize'."],
    ["The ___ of the bridge took fourteen months.", "construction", "construct", "constructive", "noun", "Setelah 'The', posisi head noun membutuhkan 'construction'."],
    ["Her argument was ___ supported by survey evidence.", "empirically", "empirical", "empiricism", "adverb", "Untuk menerangkan past participle 'supported', gunakan adverb 'empirically'."],
    ["We need a ___ estimate before requesting funds.", "realistic", "realistically", "realism", "adjective", "Sebelum noun 'estimate', gunakan adjective 'realistic'."],
    ["The committee remains ___ about next quarter's target.", "optimistic", "optimism", "optimistically", "adjective", "Linking verb 'remains' diikuti predicate adjective 'optimistic'."],
    ["Noise levels dropped ___ after the acoustic upgrade.", "noticeably", "noticeable", "notice", "adverb", "Menerangkan kata kerja 'dropped' membutuhkan adverb 'noticeably'."],
    ["Strict ___ of safety rules prevents workplace injuries.", "enforcement", "enforce", "enforceable", "noun", "Setelah adjective 'Strict', subjek berupa noun 'enforcement'."],
    ["New policies will ___ small exporters across regions.", "benefit", "beneficial", "beneficially", "verb", "Setelah modal 'will', gunakan verb 'benefit'."],
    ["That museum houses an ___ collection of textiles.", "impressive", "impress", "impressively", "adjective", "Sebelum noun 'collection', gunakan adjective 'impressive'."],
    ["Participants rated the workshop ___ useful for daily work.", "highly", "high", "height", "adverb", "Menerangkan adjective 'useful' (meaning 'very') memakai adverb 'highly'."],
    ["The lab awaits official ___ from the ethics board.", "authorization", "authorize", "authoritative", "noun", "Setelah adjective 'official', objek membutuhkan noun 'authorization'."],
    ["Both studies ___ similar patterns in urban commuting.", "demonstrate", "demonstration", "demonstrative", "verb", "Subjek jamak 'Both studies' diikuti verb 'demonstrate'."],
    ["The instructions sounded ___ at first, yet proved simple.", "complicated", "complicate", "complication", "adjective", "Linking verb 'sounded' diikuti adjective 'complicated'."],
    ["Journalists must verify sources ___ before publishing.", "independently", "independent", "independence", "adverb", "Menerangkan verb 'verify' membutuhkan adverb 'independently'."],
    ["A sharp ___ in electricity costs affected factories.", "increase", "increasingly", "increased", "noun", "Setelah 'A sharp', dibutuhkan noun 'increase'."],
    ["Managers should ___ clear goals before each sprint.", "establish", "establishment", "established", "verb", "Setelah modal 'should', gunakan base verb 'establish'."],
    ["The report offers a ___ summary of regional trade.", "concise", "concisely", "conciseness", "adjective", "Sebelum noun 'summary', gunakan adjective 'concise'."],
    ["Fuel efficiency improved ___ following engine tuning.", "significantly", "significant", "significance", "adverb", "Menerangkan verb 'improved' memakai adverb 'significantly'."],
    ["Lack of ___ often delays cross-team projects.", "coordination", "coordinate", "coordinated", "noun", "Setelah preposisi 'of', gunakan noun 'coordination'."],
    ["These sensors ___ air quality every ten seconds.", "monitor", "monitoring", "monitorable", "verb", "Subjek 'These sensors' membutuhkan finite verb 'monitor'."],
    ["The candidate appeared ___ despite the tough questions.", "calm", "calmly", "calmness", "adjective", "Linking verb 'appeared' diikuti predicate adjective 'calm'."],
    ["The software updates ___ whenever the laptop restarts.", "automatically", "automatic", "automation", "adverb", "Menerangkan verb 'updates' memakai adverb 'automatically'."],
    ["Wide public ___ helped pass the transit bill.", "support", "supportive", "supportively", "noun", "Setelah 'Wide public', head noun yang tepat adalah 'support'."],
    ["Could the analyst ___ the outlier values in Table 3?", "explain", "explanation", "explanatory", "verb", "Setelah 'Could the analyst', gunakan bare infinitive 'explain'."],
    ["This manual gives ___ guidelines for remote staff.", "comprehensive", "comprehensively", "comprehension", "adjective", "Sebelum noun 'guidelines', gunakan adjective 'comprehensive'."],
    ["The parcel arrived ___ intact despite heavy rain.", "surprisingly", "surprising", "surprise", "adverb", "Menerangkan adjective 'intact' membutuhkan adverb 'surprisingly'."],
    ["The seminar encouraged lively ___ among attendees.", "discussion", "discuss", "discursive", "noun", "Setelah adjective 'lively', objek memakai noun 'discussion'."],
    ["Volunteers ___ food packages across five districts.", "distribute", "distribution", "distributive", "verb", "Posisi predikat subjek jamak membutuhkan verb 'distribute'."],
    ["The design looks ___ from a distance, yet feels sturdy.", "fragile", "fragility", "fragilely", "adjective", "Linking verb 'looks' diikuti adjective 'fragile'."],
    ["Please store confidential records ___ inside locked cabinets.", "securely", "secure", "security", "adverb", "Menerangkan verb 'store' memakai adverb 'securely'."],
  ].map(([dummy, correct, b1, b2, pos, exp]) => ({
    prompt: dummy.includes("___") ? dummy : dummy,
    correct,
    distractors: [b1, b2],
    explanation: exp,
    hints: [`Tentukan apakah rumpang membutuhkan ${pos}.`, `Perhatikan kata sebelum dan sesudah rumpang.`],
    skill: `pos-${pos}`,
  }));

  const dialogue = [
    ["confident", "confidently", "confidence", "Why did the presenter seem so ___ today?", "Linking verb 'seem' diikuti adjective 'confident'."],
    ["confidently", "confident", "confidence", "Because she spoke ___ after three rehearsals.", "Verb 'spoke' diterangkan oleh adverb 'confidently'."],
    ["reliability", "reliable", "reliably", "Is server ___ our main concern right now?", "Subjek frasa 'server ___' membutuhkan noun 'reliability'."],
    ["reliably", "reliable", "reliability", "Yes, the database must run ___ during peak hours.", "Verb 'run' diterangkan adverb 'reliably'."],
    ["clarify", "clarification", "clear", "Could you ___ paragraph four before printing?", "Setelah 'Could you', gunakan verb 'clarify'."],
    ["clarification", "clarify", "clarity", "Sure, I will add a short ___ at the bottom.", "Setelah 'a short', gunakan noun 'clarification'."],
    ["economical", "economically", "economy", "Is rail freight still an ___ option for cargo?", "Sebelum noun 'option', gunakan adjective 'economical'."],
    ["economically", "economical", "economy", "Yes, it moves heavy goods ___ over long distances.", "Menerangkan verb 'moves' menggunakan adverb 'economically'."],
    ["expand", "expansion", "expansive", "Does the clinic plan to ___ its weekend hours?", "Setelah 'plan to', gunakan base verb 'expand'."],
    ["expansion", "expand", "expansively", "Yes, the ___ starts next month.", "Setelah 'the', posisi subjek membutuhkan noun 'expansion'."],
    ["responsive", "responsively", "response", "How ___ is the new support portal?", "Kata tanya 'How ___ is...' meminta adjective 'responsive'."],
    ["responsively", "responsive", "response", "Agents reply quite ___ to urgent tickets.", "Menerangkan verb 'reply' memakai adverb 'responsively'."],
    ["evaluate", "evaluation", "evaluative", "When will the panel ___ the final prototypes?", "Setelah 'will the panel', gunakan verb 'evaluate'."],
    ["evaluation", "evaluate", "evaluative", "The formal ___ begins Monday morning.", "Setelah 'The formal', subjek memakai noun 'evaluation'."],
    ["consistent", "consistently", "consistency", "Is the sensor reading ___ across trials?", "Setelah 'is ...', predikat sifat membutuhkan adjective 'consistent'."],
    ["consistently", "consistent", "consistency", "Yes, it records temperatures ___ every hour.", "Menerangkan verb 'records' memakai adverb 'consistently'."],
    ["justify", "justification", "justifiable", "How did they ___ the higher shipping fee?", "Setelah 'did they', gunakan base verb 'justify'."],
    ["justification", "justify", "justifiably", "They sent a written ___ citing fuel prices.", "Setelah 'a written', objek membutuhkan noun 'justification'."],
    ["flexible", "flexibly", "flexibility", "Are the new lab hours ___ enough for interns?", "Predicate adjective setelah 'Are ...' adalah 'flexible'."],
    ["flexibility", "flexible", "flexibly", "Yes, students appreciate the extra ___.", "Setelah 'the extra', objek memakai noun 'flexibility'."],
  ].map(([good, b1, b2, lineB, exp], idx) => ({
    prompt: "Pilih kata dengan kelas kata tepat dalam konteks diskusi kerja/akademik.",
    speakerA: idx % 2 === 0 ? "Mentor" : "Intern",
    lineA: "Let's review the project notes before the meeting.",
    speakerB: idx % 2 === 0 ? "Intern" : "Mentor",
    lineB,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Cek apakah konteks butuh linking verb + adj, verb + adv, atau determiner + noun.", "Perhatikan akhiran kata."],
    skill: "pos-order",
  }));

  const edit = [
    ["The proposal sounded convincingly to the investors.", "The proposal sounded convincing to the investors.", "The proposal sounded convince to the investors.", "Linking verb 'sounded' diikuti adjective 'convincing', bukan adverb.", "pos-adjective"],
    ["She felt happily after winning the scholarship.", "She felt happy after winning the scholarship.", "She felt happiness after winning the scholarship.", "Linking verb 'felt' diikuti adjective 'happy'.", "pos-adjective"],
    ["The soup smells wonderfully in the kitchen.", "The soup smells wonderful in the kitchen.", "The soup smells wonder in the kitchen.", "Linking verb 'smells' membutuhkan adjective 'wonderful'.", "pos-adjective"],
    ["We worked hardly to finish before the audit.", "We worked hard to finish before the audit.", "We worked hardness to finish before the audit.", "'Hard' (giat) adalah adverb yang tepat; 'hardly' bermakna 'hampir tidak'.", "pos-adverb"],
    ["The director spoke high of the volunteer team.", "The director spoke highly of the volunteer team.", "The director spoke height of the volunteer team.", "Idiom 'speak highly of' memakai adverb 'highly'.", "pos-adverb"],
    ["His sudden decide surprised the committee.", "His sudden decision surprised the committee.", "His sudden decisive surprised the committee.", "Setelah 'His sudden', dibutuhkan noun 'decision'.", "pos-noun"],
    ["The report is extreme detailed and useful.", "The report is extremely detailed and useful.", "The report is extremity detailed and useful.", "Adjective 'detailed' harus diterangkan oleh adverb 'extremely'.", "pos-adverb"],
    ["They must obedience all laboratory rules.", "They must obey all laboratory rules.", "They must obedient all laboratory rules.", "Setelah modal 'must', gunakan verb 'obey'.", "pos-verb"],
    ["The data remained steadily throughout December.", "The data remained steady throughout December.", "The data remained steadiness throughout December.", "Linking verb 'remained' diikuti adjective 'steady'.", "pos-adjective"],
    ["He arrived lately to the morning briefing.", "He arrived late to the morning briefing.", "He arrived lateness to the morning briefing.", "'Late' berarti terlambat; 'lately' berarti akhir-akhir ini.", "pos-adverb"],
    ["Regularly exercise strengthens cardiovascular health.", "Regular exercise strengthens cardiovascular health.", "Regularize exercise strengthens cardiovascular health.", "Sebelum noun 'exercise', gunakan adjective 'Regular'.", "pos-adjective"],
    ["The new policy will simplified tax reporting.", "The new policy will simplify tax reporting.", "The new policy will simple tax reporting.", "Setelah 'will', gunakan base verb 'simplify'.", "pos-verb"],
    ["Our team handled the crisis calm and fairly.", "Our team handled the crisis calmly and fairly.", "Our team handled the crisis calmness and fairly.", "Paralel dengan 'fairly' dan menerangkan 'handled', gunakan 'calmly'.", "pos-adverb"],
    ["Economic stable attracts long-term investors.", "Economic stability attracts long-term investors.", "Economic stabilize attracts long-term investors.", "Setelah adjective 'Economic', subjek memerlukan noun 'stability'.", "pos-noun"],
    ["The lecture became bored after an hour.", "The lecture became boring after an hour.", "The lecture became boredom after an hour.", "Sesuatu yang menyebabkan bosan memakai adjective 'boring'.", "pos-adjective"],
    ["Please wide share this announcement with staff.", "Please widely share this announcement with staff.", "Please widen share this announcement with staff.", "Menerangkan verb 'share' memakai adverb 'widely'.", "pos-adverb"],
    ["They discussed the propose during lunch.", "They discussed the proposal during lunch.", "They discussed the proposed during lunch.", "Setelah 'the', dibutuhkan noun 'proposal'.", "pos-noun"],
    ["The software seemed reliably during testing.", "The software seemed reliable during testing.", "The software seemed reliance during testing.", "Linking verb 'seemed' diikuti adjective 'reliable'.", "pos-adjective"],
    ["Engineers must precision calibrate every gauge.", "Engineers must precisely calibrate every gauge.", "Engineers must precise calibrate every gauge.", "Menerangkan verb 'calibrate' membutuhkan adverb 'precisely'.", "pos-adverb"],
    ["Clear communicate fosters healthy teamwork.", "Clear communication fosters healthy teamwork.", "Clear communicative fosters healthy teamwork.", "Setelah adjective 'Clear', subjek memakai noun 'communication'.", "pos-noun"],
  ].map(([draft, correct, bad, exp, skill]) => ({
    prompt: "Sunting kalimat berikut untuk memperbaiki jebakan kelas kata (linking verb, adverb khusus, atau noun phrase).",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Perhatikan apakah kata kerja di kalimat adalah linking verb (seem/sound/feel/remain).", "Bedakan pasangan adverb khusus seperti hard/hardly dan late/lately."],
    skill,
  }));

  const build = [
    ["The preliminary findings appeared surprisingly consistent across cohorts.", "Linking verb 'appeared' + adverb + adjective.", "pos-adjective"],
    ["Independent reviewers evaluate every research manuscript objectively.", "Adj + noun + verb + object + adverb.", "pos-adverb"],
    ["Transparent governance strengthens public confidence significantly.", "Subject noun phrase + verb + object + adverb.", "pos-noun"],
    ["The new diagnostic tool performs remarkably accurately.", "Subject + verb + adv + adv.", "pos-adverb"],
    ["Clear visual summaries make complex data accessible.", "Verb 'make' + object + adjective.", "pos-adjective"],
    ["Strict quality assurance guarantees consistent product reliability.", "Subject + verb + adjective + noun phrase.", "pos-noun"],
    ["Experienced coordinators adapt project schedules flexibly.", "Subject + verb + object + adverb.", "pos-adverb"],
    ["The renovated auditorium sounds extraordinarily clear today.", "Linking verb 'sounds' + adv + adj + adv.", "pos-adjective"],
    ["Careful statistical analysis reveals subtle market shifts.", "Subject + verb + adj + noun phrase.", "pos-noun"],
    ["Automated backups protect critical company records reliably.", "Subject + verb + object + adverb.", "pos-adverb"],
    ["Public libraries provide free educational resources universally.", "Subject + verb + object + adverb.", "pos-adjective"],
    ["The revised policy remains surprisingly flexible for trainees.", "Linking verb 'remains' + adv + adj.", "pos-adjective"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kata-kata ini menjadi kalimat kompleks dengan posisi parts of speech yang presisi.",
    targetSentence,
    explanation: exp,
    hints: ["Pastikan adjective berada sebelum noun atau setelah linking verb.", "Adverb dapat menerangkan adjective maupun verb."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

// 2. 00-foundation/02-sentence-svo
function buildSvoSimple() {
  const triples = [
    ["Our intern", "updates", "the inventory spreadsheet", "our intern", "updates"],
    ["The librarian", "organizes", "reference journals", "the librarian", "organizes"],
    ["My neighbor", "waters", "the balcony plants", "my neighbor", "waters"],
    ["The baker", "prepares", "fresh sourdough loaves", "the baker", "prepares"],
    ["A technician", "checks", "the backup generator", "a technician", "checks"],
    ["The receptionist", "greets", "morning visitors", "the receptionist", "greets"],
    ["Our coach", "reviews", "weekly fitness logs", "our coach", "reviews"],
    ["The accountant", "verifies", "travel receipts", "the accountant", "verifies"],
    ["Two mechanics", "repair", "delivery vans", "two mechanics", "repair"],
    ["Local farmers", "supply", "organic vegetables", "local farmers", "supply"],
    ["The designer", "creates", "clean icons", "the designer", "creates"],
    ["Our coordinator", "schedules", "client calls", "our coordinator", "schedules"],
    ["The pharmacist", "labels", "prescription bottles", "the pharmacist", "labels"],
    ["Junior analysts", "collect", "survey responses", "junior analysts", "collect"],
    ["The curator", "arranges", "historic photographs", "the curator", "arranges"],
    ["The courier", "delivers", "legal documents", "the courier", "delivers"],
    ["Our chef", "cooks", "seasonal soups", "our chef", "cooks"],
    ["The tutor", "explains", "grammar patterns", "the tutor", "explains"],
    ["Night guards", "monitor", "campus gates", "night guards", "monitor"],
    ["The editor", "proofreads", "news articles", "the editor", "proofreads"],
    ["Volunteers", "sort", "donated textbooks", "volunteers", "sort"],
    ["The dentist", "examines", "patient X-rays", "the dentist", "examines"],
    ["Our pilot", "checks", "weather charts", "our pilot", "checks"],
    ["The florist", "wraps", "wedding bouquets", "the florist", "wraps"],
    ["The cashier", "scans", "grocery items", "the cashier", "scans"],
    ["Musicians", "practice", "concert pieces", "musicians", "practice"],
    ["The architect", "sketches", "floor plans", "the architect", "sketches"],
    ["Lab assistants", "clean", "glass beakers", "lab assistants", "clean"],
    ["The driver", "follows", "highway signs", "the driver", "follows"],
    ["Our manager", "approves", "leave requests", "our manager", "approves"],
  ];

  const choice = triples.map(([s, v, o], i) => {
    const cap = s.charAt(0).toUpperCase() + s.slice(1);
    const low = s.toLowerCase();
    return {
      prompt: `Pilih kalimat dengan urutan Subject–Verb–Object (SVO) yang benar (konteks ${i + 1}):`,
      correct: `${cap} ${v} ${o}.`,
      distractors: [`${cap} ${o} ${v}.`, `${v.charAt(0).toUpperCase() + v.slice(1)} ${low} ${o}.`],
      explanation: `Urutan kalimat aktif bahasa Inggris adalah Subject (${cap}) + Verb (${v}) + Object (${o}).`,
      hints: ["Mulai dengan subjek pelaku.", "Kata kerja selalu langsung mengikuti subjek sebelum objek."],
      skill: "svo-order",
    };
  });

  const dialogue = triples.slice(0, 20).map(([s, v, o], idx) => {
    const low = s.toLowerCase();
    return {
      prompt: "Pilih jawaban dengan urutan SVO yang alami.",
      speakerA: ["Dina", "Riko", "Maya", "Adi"][idx % 4],
      lineA: `Who handles ${o} in this office?`,
      speakerB: ["Tono", "Sinta", "Bayu", "Lia"][idx % 4],
      lineB: `___ every weekday.`,
      correct: `${s} ${v} ${o}`,
      distractors: [`${s} ${o} ${v}`, `${v} ${low} ${o}`],
      explanation: `Susunan benar adalah Subject (${s}) + Verb (${v}) + Object (${o}).`,
      hints: ["Ikuti pola S + V + O.", "Jangan meletakkan objek di antara subjek dan kata kerja."],
      skill: "svo-order",
    };
  });

  const edit = triples.slice(0, 20).map(([s, v, o]) => ({
    prompt: "Perbaiki susunan SVO pada kalimat berikut.",
    draft: `${s} ${o} ${v}.`,
    correct: `${s} ${v} ${o}.`,
    distractors: [`${o.charAt(0).toUpperCase() + o.slice(1)} ${v} ${s.toLowerCase()}.`, `${v.charAt(0).toUpperCase() + v.slice(1)} ${s.toLowerCase()} ${o}.`],
    explanation: `Dalam bahasa Inggris, verb (${v}) diletakkan sebelum object (${o}), bukan di akhir kalimat.`,
    hints: ["Pindahkan kata kerja ke posisi tepat setelah subjek.", "Urutan baku: Subject + Verb + Object."],
    skill: "svo-order",
  }));

  const build = triples.slice(10, 22).map(([s, v, o]) => ({
    prompt: "Susun kata-kata ini mengikuti pola Subject + Verb + Object.",
    targetSentence: `${s} ${v} ${o}.`,
    explanation: `Subject (${s}) + Verb (${v}) + Object (${o}).`,
    hints: [`Mulai dengan subjek "${s}".`, `Ikuti dengan verb "${v}" lalu objek.`],
    skill: "svo-order",
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildSvoIntermediate() {
  const items = [
    ["The secretary", "placed", "the signed contract", "on the desk", "every morning"],
    ["Our trainer", "sent", "the workshop slides", "to all trainees", "before noon"],
    ["The analyst", "checked", "quarterly revenue", "in the main report", "yesterday"],
    ["Two students", "returned", "the borrowed laptops", "to the lab", "at five"],
    ["The chef", "served", "warm vegetable soup", "in ceramic bowls", "for lunch"],
    ["Our team", "held", "the product briefing", "in Room 3B", "on Monday"],
    ["The guard", "locked", "the side entrance", "at the warehouse", "at midnight"],
    ["She", "booked", "two train tickets", "online", "this morning"],
    ["They", "moved", "the extra chairs", "into the hallway", "before the event"],
    ["The nurse", "recorded", "blood pressure readings", "on the chart", "every hour"],
    ["Our driver", "parked", "the delivery truck", "behind the building", "at dawn"],
    ["The tutor", "gave", "useful feedback", "to every student", "after class"],
    ["The editor", "posted", "the revised schedule", "on the board", "early today"],
    ["We", "stored", "spare cables", "inside the blue cabinet", "last week"],
    ["The clerk", "stamped", "each customs form", "at Counter 4", "promptly"],
    ["Engineers", "tested", "the alarm system", "across all floors", "last night"],
    ["My colleague", "shared", "the meeting notes", "in our chat group", "after lunch"],
    ["The guide", "met", "our tour group", "outside the station", "at eight"],
    ["Volunteers", "packed", "emergency kits", "at the community hall", "on Sunday"],
    ["The host", "welcomed", "international guests", "at the main lobby", "warmly"],
    ["I", "read", "the safety manual", "on the train", "this morning"],
    ["The designer", "uploaded", "the final logo", "to the shared drive", "last night"],
    ["Our supervisor", "signed", "the travel forms", "in her office", "before leaving"],
    ["Students", "completed", "the listening quiz", "in the language lab", "on Friday"],
    ["The mechanic", "replaced", "the worn brake pads", "at the garage", "this afternoon"],
    ["We", "discussed", "the budget draft", "during the briefing", "today"],
    ["The intern", "printed", "twenty handouts", "for the seminar", "ten minutes ago"],
    ["Our neighbor", "bought", "fresh fruit", "at the street market", "this morning"],
    ["The committee", "announced", "the award winners", "at the ceremony", "last night"],
    ["They", "fixed", "the broken projector", "before the lecture", "quickly"],
  ];

  const choice = items.map(([s, v, o, p, t]) => ({
    prompt: "Pilih kalimat dengan urutan SVO + Place + Time yang benar:",
    correct: `${s} ${v} ${o} ${p} ${t}.`,
    distractors: [
      `${s} ${p} ${v} ${o} ${t}.`,
      `${s} ${v} ${t} ${p} ${o}.`,
    ],
    explanation: `Pola standar klausa lengkap: Subject (${s}) + Verb (${v}) + Object (${o}) + Place (${p}) + Time (${t}).`,
    hints: ["Jangan pisahkan verb dan object dengan keterangan tempat/waktu.", "Urutan keterangan baku: Place sebelum Time."],
    skill: "svo-order",
  }));

  const dialogue = items.slice(0, 20).map(([s, v, o, p, t], idx) => ({
    prompt: "Pilih respons dengan urutan Subject–Verb–Object–Adverbial yang benar.",
    speakerA: ["Lina", "Arman", "Siti", "Eko"][idx % 4],
    lineA: `Did anyone take care of ${o}?`,
    speakerB: ["Rafi", "Nina", "Bima", "Putri"][idx % 4],
    lineB: `Yes, ___ ${t}.`,
    correct: `${s.toLowerCase()} ${v} ${o} ${p}`,
    distractors: [`${s.toLowerCase()} ${p} ${v} ${o}`, `${v} ${s.toLowerCase()} ${o} ${p}`],
    explanation: `Urutan benar adalah Subject + Verb + Object + Place sebelum keterangan waktu.`,
    hints: ["Pertahankan S + V + O tetap berdekatan.", "Letakkan tempat sebelum waktu."],
    skill: "svo-order",
  }));

  const edit = items.slice(0, 20).map(([s, v, o, p, t]) => ({
    prompt: "Perbaiki kalimat berikut karena posisi keterangan memisahkan Verb dan Object.",
    draft: `${s} ${v} ${p} ${o} ${t}.`,
    correct: `${s} ${v} ${o} ${p} ${t}.`,
    distractors: [`${s} ${p} ${v} ${o} ${t}.`, `${o} ${s.toLowerCase()} ${v} ${p} ${t}.`],
    explanation: `Dalam bahasa Inggris, Object (${o}) harus langsung mengikuti Verb (${v}) sebelum keterangan tempat (${p}).`,
    hints: ["Pindahkan object tepat setelah kata kerja.", "Place diletakkan setelah object."],
    skill: "svo-order",
  }));

  const build = items.slice(10, 22).map(([s, v, o, p, t]) => ({
    prompt: "Susun kalimat lengkap dengan urutan S + V + O + Place + Time.",
    targetSentence: `${s} ${v} ${o} ${p} ${t}.`,
    explanation: `Subject (${s}) + Verb (${v}) + Object (${o}) + Place (${p}) + Time (${t}).`,
    hints: ["Mulai dengan Subject + Verb + Object.", "Tempatkan keterangan tempat sebelum keterangan waktu."],
    skill: "svo-order",
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildSvoComplex() {
  const items = [
    ["The courier", "handed", "the receptionist", "a sealed envelope", "a sealed envelope to the receptionist"],
    ["Our mentor", "gave", "the new interns", "clear instructions", "clear instructions to the new interns"],
    ["The bank", "sent", "every cardholder", "a security notice", "a security notice to every cardholder"],
    ["The professor", "showed", "the lab group", "the microscope slides", "the microscope slides to the lab group"],
    ["Our HR team", "offered", "the top candidate", "a permanent contract", "a permanent contract to the top candidate"],
    ["The travel agent", "booked", "our directors", "window seats", "window seats for our directors"],
    ["She", "wrote", "the supplier", "a polite reminder", "a polite reminder to the supplier"],
    ["He", "brought", "his teammates", "fresh coffee", "fresh coffee for his teammates"],
    ["The IT desk", "assigned", "each employee", "a temporary badge", "a temporary badge to each employee"],
    ["The librarian", "lent", "the researcher", "three rare volumes", "three rare volumes to the researcher"],
    ["Our chef", "made", "the conference guests", "a special lunch", "a special lunch for the conference guests"],
    ["The host", "told", "the audience", "an inspiring story", "an inspiring story to the audience"],
    ["The coordinator", "emailed", "all speakers", "the stage schedule", "the stage schedule to all speakers"],
    ["My colleague", "passed", "me", "the attendance folder", "the attendance folder to me"],
    ["The agency", "paid", "freelance writers", "a fair bonus", "a fair bonus to freelance writers"],
    ["The coach", "taught", "the junior squad", "a faster drill", "a faster drill to the junior squad"],
    ["The clerk", "issued", "the applicant", "a numbered receipt", "a numbered receipt to the applicant"],
    ["Our neighbor", "baked", "the volunteers", "banana bread", "banana bread for the volunteers"],
    ["The presenter", "asked", "the panelists", "two sharp questions", "two sharp questions to the panelists"],
    ["The clinic", "mailed", "new patients", "an intake packet", "an intake packet to new patients"],
    ["The director", "promised", "the staff", "flexible Fridays", "flexible Fridays to the staff"],
    ["She", "bought", "her sister", "a noise-canceling headset", "a noise-canceling headset for her sister"],
    ["The trainer", "demonstrated", "the safety steps", "clearly for us", "the safety steps for us"],
    ["Our lead", "explained", "the new workflow", "to the team", "the new workflow to the team"],
    ["The lecturer", "described", "the experiment", "to first-year students", "the experiment to first-year students"],
    ["He", "reported", "the software bug", "to engineering", "the software bug to engineering"],
    ["The guide", "introduced", "the visitors", "to the museum director", "the visitors to the museum director"],
    ["The manager", "mentioned", "the schedule shift", "to all drivers", "the schedule shift to all drivers"],
    ["She", "suggested", "a simpler layout", "to the client", "a simpler layout to the client"],
    ["The doctor", "recommended", "daily walks", "to his patients", "daily walks to his patients"],
  ];

  const choice = items.slice(0, 22).map(([s, v, io, doObj]) => ({
    prompt: "Pilih kalimat bertipe Indirect Object + Direct Object (S + V + IO + DO) yang tepat:",
    correct: `${s} ${v} ${io} ${doObj}.`,
    distractors: [`${s} ${v} ${doObj} ${io}.`, `${s} ${io} ${v} ${doObj}.`],
    explanation: `Dalam pola ditransitive tanpa preposisi, Indirect Object (${io}) mendahului Direct Object (${doObj}): ${s} ${v} ${io} ${doObj}.`,
    hints: ["Siapa penerimanya (IO) muncul lebih dulu sebelum bendanya (DO) jika tanpa 'to/for'.", "Jangan menaruh objek sebelum kata kerja."],
    skill: "svo-order",
  }));

  // Add 8 explain/suggest/mention/report trap questions (cannot use S+V+IO+DO without "to")
  for (const [s, v, obj, toRecip] of items.slice(22, 30)) {
    choice.push({
      prompt: `Manakah kalimat yang benar untuk kata kerja "${v}" (tidak bisa memakai dua objek langsung tanpa preposisi)?`,
      correct: `${s} ${v} ${obj} ${toRecip}.`,
      distractors: [`${s} ${v} ${toRecip.replace(/^(to|for) /, "")} ${obj}.`, `${s} ${obj} ${v} ${toRecip}.`],
      explanation: `Verb seperti "${v}" mewajibkan pola ${v} + Direct Object + to/for + Recipient.`,
      hints: [`"${v}" selalu diikuti objek langsung dulu baru 'to/for'.`, "Hindari pola S + V + orang + benda untuk kata kerja ini."],
      skill: "svo-order",
    });
  }

  const dialogue = items.slice(0, 20).map(([s, v, io, doObj, alt], idx) => ({
    prompt: "Pilih kalimat balasan dengan susunan objek ganda yang benar.",
    speakerA: idx % 2 === 0 ? "Supervisor" : "Staff",
    lineA: `Did ${s.toLowerCase()} deliver the item on time?`,
    speakerB: idx % 2 === 0 ? "Staff" : "Supervisor",
    lineB: `Yes, ___ this morning.`,
    correct: `${s.toLowerCase()} ${v} ${io} ${doObj}`,
    distractors: [`${s.toLowerCase()} ${v} ${doObj} ${io}`, `${s.toLowerCase()} ${io} ${v} ${doObj}`],
    explanation: `Tanpa preposisi "to/for", susunan yang benar adalah ${s.toLowerCase()} ${v} ${io} ${doObj} (atau ${alt}).`,
    hints: ["Gunakan pola S + V + penerima + barang.", "Pastikan verb langsung diikuti penerima."],
    skill: "svo-order",
  }));

  const edit = [
    ...items.slice(0, 12).map(([s, v, io, doObj]) => ({
      prompt: "Perbaiki urutan Indirect Object dan Direct Object yang terbalik.",
      draft: `${s} ${v} ${doObj} ${io}.`,
      correct: `${s} ${v} ${io} ${doObj}.`,
      distractors: [`${s} ${io} ${v} ${doObj}.`, `${io.charAt(0).toUpperCase() + io.slice(1)} ${v} ${s.toLowerCase()} ${doObj}.`],
      explanation: `Tanpa "to/for", penerima (${io}) harus mendahului objek benda (${doObj}).`,
      hints: ["Tukar posisi objek langsung dan objek tidak langsung.", "Atau tambahkan 'to' sebelum penerima."],
      skill: "svo-order",
    })),
    ...items.slice(22, 30).map(([s, v, obj, toRecip]) => ({
      prompt: `Perbaiki kalimat dengan verb "${v}" agar tidak menyalahi aturan objek preposisional.`,
      draft: `${s} ${v} ${toRecip.replace(/^(to|for) /, "")} ${obj}.`,
      correct: `${s} ${v} ${obj} ${toRecip}.`,
      distractors: [`${s} ${toRecip.replace(/^(to|for) /, "")} ${v} ${obj}.`, `${s} ${v} ${toRecip} ${obj}.`],
      explanation: `Verb "${v}" tidak menerima indirect object langsung tanpa preposisi; gunakan "${s} ${v} ${obj} ${toRecip}".`,
      hints: [`"${v}" mengikuti pola S + V + DO + to/for + penerima.`, "Tambahkan preposisi setelah objek langsung."],
      skill: "svo-order",
    })),
  ];

  const build = items.slice(0, 12).map(([s, v, io, doObj]) => ({
    prompt: "Susun kalimat berobjek ganda (S + V + Indirect Object + Direct Object).",
    targetSentence: `${s} ${v} ${io} ${doObj}.`,
    explanation: `Subject (${s}) + Verb (${v}) + Indirect Object (${io}) + Direct Object (${doObj}).`,
    hints: ["Mulai dengan Subject + Verb.", "Letakkan penerima sebelum objek benda."],
    skill: "svo-order",
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

// 3. 00-foundation/03-to-be
function buildToBeSimple() {
  const subjects = [
    ["I", "am", "is", "are", "ready for the morning shift"],
    ["She", "is", "are", "am", "an experienced lab technician"],
    ["He", "is", "am", "are", "in the main conference room"],
    ["It", "is", "are", "am", "a two-hour flight to Jakarta"],
    ["We", "are", "is", "am", "from the regional branch"],
    ["They", "are", "is", "am", "grateful for your quick help"],
    ["You", "are", "is", "am", "on the morning roster"],
    ["The printer", "is", "are", "am", "out of black ink"],
    ["These manuals", "are", "is", "am", "available at the front desk"],
    ["My laptop", "is", "are", "am", "on the wooden table"],
    ["The interns", "are", "is", "am", "very punctual this week"],
    ["Our office", "is", "are", "am", "near the central station"],
    ["The packages", "are", "is", "am", "ready for dispatch"],
    ["Your passport", "is", "are", "am", "inside the front pocket"],
    ["The trainees", "are", "is", "am", "in Lecture Hall B"],
    ["That museum", "is", "are", "am", "open on Sundays"],
    ["Both elevators", "are", "is", "am", "under maintenance today"],
    ["The schedule", "is", "are", "am", "posted on the wall"],
    ["Her parents", "are", "is", "am", "proud of her progress"],
    ["This chair", "is", "are", "am", "comfortable for long study"],
    ["The windows", "are", "is", "am", "clean and bright"],
    ["Our supervisor", "is", "are", "am", "currently on leave"],
    ["The classrooms", "are", "is", "am", "equipped with projectors"],
    ["Monday", "is", "are", "am", "our busiest delivery day"],
    ["These shoes", "are", "is", "am", "too tight for walking"],
    ["The library", "is", "are", "am", "quiet after six"],
    ["My notes", "are", "is", "am", "organized by date"],
    ["The ticket", "is", "are", "am", "valid for three days"],
    ["Two doctors", "are", "is", "am", "on duty tonight"],
    ["The coffee", "is", "are", "am", "freshly brewed"],
  ];

  const choice = subjects.map(([subj, good, b1, b2, pred]) => ({
    prompt: `${subj} ___ ${pred}.`,
    correct: good,
    distractors: [b1, b2],
    explanation: `Subjek "${subj}" berpasangan dengan to be "${good}" dalam Present Simple.`,
    hints: ["Cek apakah subjek tunggal, jamak, atau 'I'.", "I -> am; he/she/it/singular -> is; we/you/they/plural -> are."],
    skill: "to-be-form",
  }));

  const dialogue = subjects.slice(0, 20).map(([subj, good, b1, b2, pred], idx) => ({
    prompt: "Pilih bentuk 'to be' yang tepat untuk melengkapi percakapan.",
    speakerA: idx % 2 === 0 ? "Receptionist" : "Colleague",
    lineA: `Where is everything right now?`,
    speakerB: idx % 2 === 0 ? "Colleague" : "Receptionist",
    lineB: `${subj} ___ ${pred}.`,
    correct: good,
    distractors: [b1, b2],
    explanation: `Subjek "${subj}" memerlukan to be "${good}".`,
    hints: ["Identifikasi jumlah subjek sebelum rumpang.", "Gunakan am/is/are sesuai subjek."],
    skill: "to-be-form",
  }));

  const edit = subjects.slice(0, 20).map(([subj, good, b1, b2, pred]) => ({
    prompt: "Perbaiki kesalahan penggunaan 'to be' pada kalimat ini.",
    draft: `${subj} ${b1} ${pred}.`,
    correct: `${subj} ${good} ${pred}.`,
    distractors: [`${subj} ${b2} ${pred}.`, `${subj} be ${pred}.`],
    explanation: `Subjek "${subj}" tidak cocok dengan "${b1}"; gunakan "${good}".`,
    hints: ["Periksa kesesuaian subject dan to be.", `Ganti "${b1}" dengan bentuk yang sesuai untuk "${subj}".`],
    skill: "to-be-form",
  }));

  const build = subjects.slice(10, 22).map(([subj, good, , , pred]) => ({
    prompt: "Susun kalimat nominal dengan 'to be' yang benar.",
    targetSentence: `${subj} ${good} ${pred}.`,
    explanation: `Subject (${subj}) + to be (${good}) + complement (${pred}).`,
    hints: [`Mulai dengan "${subj} ${good}".`, "Lanjutkan dengan pelengkap kalimat."],
    skill: "to-be-form",
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildToBeIntermediate() {
  const negQ = [
    ["Is the seminar room", "Are the seminar room", "Am the seminar room", "available at 2 PM?"],
    ["Are the new badges", "Is the new badges", "Am the new badges", "ready at reception?"],
    ["Am I", "Is I", "Are I", "on the afternoon team?"],
    ["The printer isn't", "The printer aren't", "The printer am not", "connected to Wi-Fi."],
    ["Those invoices aren't", "Those invoices isn't", "Those invoices am not", "signed by finance yet."],
    ["Wasn't the flight", "Weren't the flight", "Isn't the flight", "delayed yesterday evening?"],
    ["We weren't", "We wasn't", "We aren't", "in Berlin last Tuesday."],
    ["She wasn't", "She weren't", "She isn't", "at her desk ten minutes ago."],
    ["Were the participants", "Was the participants", "Are the participants", "satisfied with yesterday's tour?"],
    ["Was the museum", "Were the museum", "Is the museum", "crowded last weekend?"],
    ["You aren't", "You isn't", "You am not", "responsible for that delay."],
    ["Is your passport", "Are your passport", "Were your passport", "still valid until December?"],
    ["Are both reports", "Is both reports", "Was both reports", "attached to this email?"],
    ["The parking lot wasn't", "The parking lot weren't", "The parking lot aren't", "full earlier this morning."],
    ["The delivery trucks weren't", "The delivery trucks wasn't", "The delivery trucks isn't", "parked outside yesterday."],
    ["I'm not", "I isn't", "I aren't", "available for overtime tonight."],
    ["Isn't this street", "Aren't this street", "Weren't this street", "closed for repairs today?"],
    ["Aren't the trainees", "Isn't the trainees", "Wasn't the trainees", "scheduled for orientation now?"],
    ["Was that lecture", "Were that lecture", "Are that lecture", "recorded last Thursday?"],
    ["Were your luggage bags", "Was your luggage bags", "Is your luggage bags", "inspected at customs yesterday?"],
    ["My manager isn't", "My manager aren't", "My manager am not", "in the building right now."],
    ["These instructions aren't", "These instructions isn't", "These instructions wasn't", "clear enough for beginners."],
    ["Is the pharmacy", "Are the pharmacy", "Were the pharmacy", "open 24 hours?"],
    ["Are the test scores", "Is the test scores", "Was the test scores", "posted online yet?"],
    ["He wasn't", "He weren't", "He aren't", "present at last week's meeting."],
    ["They weren't", "They wasn't", "They isn't", "late for Monday's train."],
    ["Is the air conditioning", "Are the air conditioning", "Were the air conditioning", "working properly today?"],
    ["Are the conference chairs", "Is the conference chairs", "Was the conference chairs", "arranged in rows?"],
    ["The hotel Wi-Fi wasn't", "The hotel Wi-Fi weren't", "The hotel Wi-Fi aren't", "stable last night."],
    ["The laboratory samples weren't", "The laboratory samples wasn't", "The laboratory samples isn't", "labeled yesterday."],
  ];

  const choice = negQ.map(([good, b1, b2, rest]) => ({
    prompt: `___ ${rest}`,
    correct: good,
    distractors: [b1, b2],
    explanation: `Pilihan "${good}" sesuai dengan jumlah subjek dan konteks waktu (Present vs Past) pada kalimat.`,
    hints: ["Perhatikan apakah subjek tunggal/jamak dan apakah waktunya sekarang atau lampau.", "Cek kata kerja bantu to be pada kalimat tanya/negatif."],
    skill: "to-be-form",
  }));

  const dialogue = negQ.slice(0, 20).map(([good, b1, b2, rest], idx) => ({
    prompt: "Lengkapi dialog tanya-jawab dengan bentuk negatif atau pertanyaan 'to be' yang tepat.",
    speakerA: idx % 2 === 0 ? "Coordinator" : "Assistant",
    lineA: "Let me double-check the status before we start.",
    speakerB: idx % 2 === 0 ? "Assistant" : "Coordinator",
    lineB: `___ ${rest}`,
    correct: good,
    distractors: [b1, b2],
    explanation: `Bentuk "${good}" tepat untuk subjek dan keterangan waktunya.`,
    hints: ["Perhatikan apakah pertanyaan/pernyataan merujuk ke masa sekarang atau lampau.", "Sesuaikan is/are/was/were dengan subjeknya."],
    skill: "to-be-form",
  }));

  const edit = negQ.slice(0, 20).map(([good, b1, b2, rest]) => ({
    prompt: "Perbaiki kesalahan bentuk negatif/pertanyaan 'to be' berikut.",
    draft: `${b1} ${rest}`,
    correct: `${good} ${rest}`,
    distractors: [`${b2} ${rest}`, `${good} not ${rest}`],
    explanation: `Bentuk "${b1}" tidak sesuai subjek/waktu; perbaikannya adalah "${good}".`,
    hints: ["Periksa kesesuaian subjek tunggal/jamak.", "Cek penanda waktu lampau (yesterday, last week) vs sekarang."],
    skill: "to-be-form",
  }));

  const build = [
    ["Are the new conference badges ready at reception?", "Pertanyaan Present Simple to be: Are + plural subject + complement?", "to-be-form"],
    ["Was the morning flight delayed because of fog?", "Pertanyaan Past Simple to be: Was + singular subject + complement?", "to-be-form"],
    ["The laboratory samples were not labeled yesterday.", "Negatif Past Simple to be: plural subject + were not.", "to-be-form"],
    ["Our branch office is not open on public holidays.", "Negatif Present Simple to be.", "to-be-form"],
    ["Were the workshop participants satisfied with the handbook?", "Pertanyaan Past Simple to be jamak.", "to-be-form"],
    ["Is the central library quiet on weekday evenings?", "Pertanyaan Present Simple to be tunggal.", "to-be-form"],
    ["Those signed receipts are not in the blue folder.", "Negatif Present Simple to be jamak.", "to-be-form"],
    ["I was not available during yesterday's phone call.", "Negatif Past Simple 'I was not'.", "to-be-form"],
    ["Are both main elevators working properly this morning?", "Pertanyaan Present Simple to be jamak.", "to-be-form"],
    ["The hotel Wi-Fi was not stable last night.", "Negatif Past Simple to be tunggal.", "to-be-form"],
    ["Were your luggage bags inspected at customs yesterday?", "Pertanyaan Past Simple to be jamak.", "to-be-form"],
    ["My supervisor is not in her office right now.", "Negatif Present Simple to be tunggal.", "to-be-form"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kata-kata ini menjadi kalimat tanya atau negatif dengan 'to be' yang benar.",
    targetSentence,
    explanation: exp,
    hints: ["Untuk pertanyaan, letakkan am/is/are/was/were sebelum subjek.", "Untuk negatif, letakkan 'not' tepat setelah to be."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildToBeComplex() {
  const items = [
    ["The data from both surveys", "is", "are", "were", "stored on an encrypted server.", "Head noun 'The data' (sebagai uncountable mass noun) atau gunakan konteks subjek preposisional."],
    ["Each of the twenty applicants", "is", "are", "were", "'Each' selalu tunggal sehingga memakai 'is'."],
    ["Neither the manager nor the interns", "were", "was", "is", "informed about yesterday's change.", "Pada 'neither...nor', verb mengikuti subjek terdekat ('the interns' -> jamak -> 'were')."],
    ["Either the printer or the scanner", "is", "are", "were", "scheduled for replacement today.", "Pada 'either...or', kedua subjek tunggal sehingga memakai 'is'."],
    ["The quality of these raw materials", "is", "are", "were", "essential for product durability.", "Subjek inti adalah 'The quality' (tunggal), bukan 'materials'."],
    ["A group of visiting researchers", "is", "are", "were", "currently touring the robotics lab.", "Head noun 'A group' bersifat tunggal ('is')."],
    ["All of the equipment in Room 4", "is", "are", "were", "calibrated every Monday morning.", "'Equipment' adalah uncountable noun sehingga selalu memakai 'is'."],
    ["The number of remote applicants", "is", "are", "were", "higher this semester than last year.", "'The number of + plural' selalu tunggal ('is')."],
    ["A number of senior analysts", "are", "is", "was", "attending the summit in Tokyo.", "'A number of + plural' bermakna beberapa (jamak) sehingga memakai 'are'."],
    ["Every single laptop in the lab", "is", "are", "were", "protected by two-factor login.", "'Every' selalu diikuti to be tunggal ('is')."],
    ["Not only the documents but also the laptop", "was", "were", "are", "recovered at the lost-and-found desk.", "Pada 'not only...but also', verb mengikuti subjek terdekat ('the laptop' -> 'was')."],
    ["The luggage left near Gate 9", "was", "were", "are", "checked by airport security yesterday.", "'Luggage' adalah uncountable noun sehingga memakai 'was'."],
    ["Several boxes of printed brochures", "are", "is", "was", "waiting near the service elevator.", "Head noun 'Several boxes' berbentuk jamak ('are')."],
    ["Fifty percent of the budget", "is", "are", "were", "allocated to staff training.", "Persentase dari uncountable noun ('budget') memakai to be tunggal ('is')."],
    ["Fifty percent of the participants", "are", "is", "was", "joining from overseas time zones.", "Persentase dari plural noun ('participants') memakai to be jamak ('are')."],
    ["The instructions on page three", "are", "is", "was", "clearer than the old version.", "Head noun 'The instructions' berbentuk jamak ('are')."],
    ["News of the merger", "is", "are", "were", "spreading quickly across departments.", "'News' tampak berakhiran -s tetapi uncountable tunggal ('is')."],
    ["Mathematics", "is", "are", "were", "a core requirement for data science.", "Nama bidang studi berakhiran -s selalu tunggal ('is')."],
    ["The staff members in customer care", "are", "is", "was", "trained to handle urgent refunds.", "'The staff members' jamak sehingga memakai 'are'."],
    ["That series of workshops", "was", "were", "are", "remarkably helpful for new hires.", "Head noun 'That series' berbentuk tunggal ('was')."],
    ["None of the information", "is", "are", "were", "missing from the final archive.", "'Information' uncountable sehingga 'None of the information' memakai 'is'."],
    ["Both the itinerary and the boarding pass", "are", "is", "was", "saved inside the travel app.", "Dua subjek dihubungkan 'and' menjadi jamak ('are')."],
    ["The feedback from last week's clients", "was", "were", "are", "overwhelmingly positive.", "'Feedback' uncountable noun -> memakai 'was'."],
    ["Economics", "is", "are", "were", "central to understanding market policy.", "Bidang ilmu 'Economics' bersifat tunggal ('is')."],
    ["Two-thirds of the survey responses", "were", "was", "is", "submitted before Friday evening.", "Pecahan dari plural noun ('responses') memakai to be jamak ('were')."],
    ["The furniture inside the new lounge", "is", "are", "were", "modern and durable.", "'Furniture' adalah uncountable noun tunggal ('is')."],
    ["Either my colleagues or the supervisor", "is", "are", "were", "attending the morning call.", "Subjek terdekat setelah 'or' adalah 'the supervisor' (tunggal) -> 'is'."],
    ["Neither the coordinator nor the mentors", "are", "is", "was", "available this afternoon.", "Subjek terdekat setelah 'nor' adalah 'the mentors' (jamak) -> 'are'."],
    ["The advice in that handbook", "is", "are", "were", "practical for first-time travelers.", "'Advice' adalah uncountable noun -> memakai 'is'."],
    ["Five kilometers", "is", "are", "were", "a manageable daily walking distance.", "Satuan jarak sebagai satu kesatuan ukuran memakai to be tunggal ('is')."],
  ];

  // Clean up item 0 rest/exp alignment
  items[0] = ["The price of both flights", "is", "are", "were", "still reasonable this morning.", "Head noun adalah 'The price' (tunggal), bukan 'flights'."];
  items[1] = ["Each of the twenty applicants", "is", "are", "were", "scheduled for a brief interview.", "'Each' selalu tunggal sehingga memakai 'is'."];

  const choice = items.map(([subj, good, b1, b2, pred, exp]) => ({
    prompt: `${subj} ___ ${pred}`,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Temukan head noun (kata benda inti) sebelum preposisi 'of/in/on'.", "Perhatikan uncountable noun dan aturan neither...nor / a number of."],
    skill: "to-be-form",
  }));

  const dialogue = items.slice(0, 20).map(([subj, good, b1, b2, pred, exp], idx) => ({
    prompt: "Pilih bentuk 'to be' yang akurat pada subjek kompleks.",
    speakerA: idx % 2 === 0 ? "Auditor" : "Lead",
    lineA: "Can you confirm the latest status for me?",
    speakerB: idx % 2 === 0 ? "Lead" : "Auditor",
    lineB: `Yes, ${subj.charAt(0).toLowerCase() + subj.slice(1)} ___ ${pred}`,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Jangan terkecoh kata benda di dalam frasa 'of ...'.", "Cocokkan to be dengan head noun-nya."],
    skill: "to-be-form",
  }));

  const edit = items.slice(0, 20).map(([subj, good, b1, , pred, exp]) => ({
    prompt: "Sunting kesalahan agreement 'to be' pada subjek frasa kompleks berikut.",
    draft: `${subj} ${b1} ${pred}`,
    correct: `${subj} ${good} ${pred}`,
    distractors: [`${subj} be ${pred}`, `${subj} been ${pred}`],
    explanation: exp,
    hints: ["Identifikasi kata benda inti subjek sebelum frasa preposisi.", "Cek aturan uncountable noun dan each/neither/the number of."],
    skill: "to-be-form",
  }));

  const build = items.slice(0, 12).map(([subj, good, , , pred, exp]) => ({
    prompt: "Susun kalimat dengan subject–verb agreement 'to be' tingkat lanjut.",
    targetSentence: `${subj} ${good} ${pred}`,
    explanation: exp,
    hints: ["Susun frasa subjek lengkap di awal kalimat.", `Ikuti dengan to be "${good}" lalu pelengkap.`],
    skill: "to-be-form",
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

// 4. 00-foundation/04-articles
function buildArticlesSimple() {
  const anPairs = [
    ["an", "a", "the", "umbrella", "diawali bunyi vokal /ʌ/", "articles-a-an"],
    ["an", "a", "the", "hour-long briefing", "huruf 'h' pada 'hour' tidak dibaca (bunyi vokal /aʊ/)", "articles-a-an"],
    ["an", "a", "the", "honest feedback form", "huruf 'h' pada 'honest' bisu sehingga berbunyi vokal", "articles-a-an"],
    ["an", "a", "the", "MBA graduate", "singkatan 'MBA' dilafalkan /ɛm biː eɪ/ (bunyi vokal)", "articles-a-an"],
    ["an", "a", "the", "urgent email", "'urgent' berawal bunyi vokal /ɜː/", "articles-a-an"],
    ["an", "a", "the", "airport shuttle", "'airport' berawal bunyi vokal /eə/", "articles-a-an"],
    ["an", "a", "the", "invoice number", "'invoice' berawal bunyi vokal /ɪ/", "articles-a-an"],
    ["an", "a", "the", "elevator keycard", "'elevator' berawal bunyi vokal /e/", "articles-a-an"],
    ["an", "a", "the", "IT specialist", "singkatan 'IT' dilafalkan /aɪ tiː/ (bunyi vokal)", "articles-a-an"],
    ["an", "a", "the", "envelope", "'envelope' berawal bunyi vokal /e/", "articles-a-an"],
    ["a", "an", "the", "university campus", "'university' berawal bunyi konsonan /j/ (juː)", "articles-a-an"],
    ["a", "an", "the", "European client", "'European' berawal bunyi konsonan /j/", "articles-a-an"],
    ["a", "an", "the", "one-day pass", "'one' berawal bunyi konsonan /w/", "articles-a-an"],
    ["a", "an", "the", "uniform badge", "'uniform' berawal bunyi konsonan /j/", "articles-a-an"],
    ["a", "an", "the", "useful handbook", "'useful' berawal bunyi konsonan /j/", "articles-a-an"],
    ["a", "an", "the", "laptop charger", "'laptop' berawal bunyi konsonan /l/", "articles-a-an"],
    ["a", "an", "the", "receipt", "'receipt' berawal bunyi konsonan /r/", "articles-a-an"],
    ["a", "an", "the", "meeting room", "'meeting' berawal bunyi konsonan /m/", "articles-a-an"],
    ["a", "an", "the", "train ticket", "'train' berawal bunyi konsonan /t/", "articles-a-an"],
    ["a", "an", "the", "hospital clinic", "'hospital' dibaca dengan /h/ berbunyi konsonan", "articles-a-an"],
    ["a", "an", "the", "unique solution", "'unique' berawal bunyi konsonan /j/", "articles-a-an"],
    ["an", "a", "the", "online portal", "'online' berawal bunyi vokal /ɒ/", "articles-a-an"],
    ["an", "a", "the", "annual audit", "'annual' berawal bunyi vokal /æ/", "articles-a-an"],
    ["a", "an", "the", "printer cable", "'printer' berawal bunyi konsonan /p/", "articles-a-an"],
    ["an", "a", "the", "HR coordinator", "singkatan 'HR' dilafalkan /eɪtʃ/ (bunyi vokal)", "articles-a-an"],
    ["a", "an", "the", "hotel voucher", "'hotel' berawal bunyi konsonan /h/", "articles-a-an"],
    ["an", "a", "the", "unsigned contract", "'unsigned' berawal bunyi vokal /ʌ/", "articles-a-an"],
    ["a", "an", "the", "user guide", "'user' berawal bunyi konsonan /j/", "articles-a-an"],
    ["an", "a", "the", "emergency exit", "'emergency' berawal bunyi vokal /ɪ/", "articles-a-an"],
    ["a", "an", "the", "weekly summary", "'weekly' berawal bunyi konsonan /w/", "articles-a-an"],
  ];

  const choice = anPairs.map(([good, bad, , noun, reason, skill]) => ({
    prompt: `We need ___ ${noun} for today's orientation.`,
    correct: good,
    distractors: [bad, "— (tanpa article)"],
    explanation: `Gunakan "${good}" karena frasa "${noun}" ${reason}.`,
    hints: ["Fokus pada bunyi pengucapan awal kata, bukan sekadar huruf tulisannya.", "Bunyi vokal -> an; bunyi konsonan -> a."],
    skill,
  }));

  const dialogue = anPairs.slice(0, 20).map(([good, bad, , noun, reason, skill], idx) => ({
    prompt: "Pilih article 'a' atau 'an' yang tepat sesuai bunyi awal kata.",
    speakerA: idx % 2 === 0 ? "Intern" : "Trainer",
    lineA: "What should I bring to the front desk?",
    speakerB: idx % 2 === 0 ? "Trainer" : "Intern",
    lineB: `Please bring ___ ${noun}.`,
    correct: good,
    distractors: [bad, "— (tanpa article)"],
    explanation: `Pilih "${good}" karena "${noun}" ${reason}.`,
    hints: ["Ucapkan kata setelah rumpang dalam hati.", "Bunyi vokal memakai 'an', bunyi konsonan (/j/, /w/, /h/) memakai 'a'."],
    skill,
  }));

  const edit = anPairs.slice(0, 20).map(([good, bad, , noun, reason, skill]) => ({
    prompt: "Perbaiki kesalahan pemakaian 'a' atau 'an' pada kalimat ini.",
    draft: `She requested ${bad} ${noun} before noon.`,
    correct: `She requested ${good} ${noun} before noon.`,
    distractors: [`She requested ${noun} before noon.`, `She requested those ${noun} before noon.`],
    explanation: `Gunakan "${good} ${noun}" karena ${reason}.`,
    hints: ["Periksa bunyi awal kata benda tunggal setelah article.", `Ganti "${bad}" menjadi "${good}".`],
    skill,
  }));

  const build = anPairs.slice(0, 12).map(([good, , , noun, reason, skill]) => ({
    prompt: "Susun kalimat dengan article 'a' atau 'an' yang tepat.",
    targetSentence: `Please bring ${good} ${noun} tomorrow.`,
    explanation: `Article "${good}" digunakan karena "${noun}" ${reason}.`,
    hints: ["Awali dengan 'Please bring'.", "Pasangkan article dengan frasa benda tunggal."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildArticlesIntermediate() {
  const pairs = [
    ["a", "the", "an", "I bought a notebook yesterday. ___ notebook has numbered pages.", "The", "A", "An", "Penyebutan kedua ('notebook' yang sudah disebut sebelumnya) memakai 'The'."],
    ["a", "the", "an", "Please close ___ door behind you; it is noisy outside.", "the", "a", "an", "Kedua pembicara tahu pintu spesifik mana yang dimaksud -> 'the'."],
    ["a", "the", "an", "There is ___ package on reception, and ___ package is for Maya.", "a / the", "the / a", "an / the", "Penyebutan pertama memakai 'a', penyebutan kedua merujuk spesifik memakai 'the'."],
    ["a", "the", "an", "Can you pass ___ stapler next to your keyboard?", "the", "a", "an", "Bendanya spesifik ('next to your keyboard') sehingga memakai 'the'."],
    ["a", "the", "an", "She booked ___ hotel near the station. ___ hotel includes breakfast.", "a / The", "the / A", "an / The", "Hotel disebut pertama kali ('a'), lalu dirujuk ulang ('The')."],
    ["a", "the", "an", "___ sun rises early during summer months.", "The", "A", "An", "Benda unik di alam semesta ('sun') memakai 'The'."],
    ["a", "the", "an", "Please read ___ third paragraph of the memo.", "the", "a", "an", "Bilangan bertingkat (ordinal: first, second, third) memakai 'the'."],
    ["a", "the", "an", "This is ___ fastest route to the airport.", "the", "a", "an", "Bentuk superlative ('fastest') selalu didahului 'the'."],
    ["a", "the", "an", "We hired ___ engineer. ___ engineer starts next Monday.", "an / The", "the / An", "a / The", "'engineer' berawal bunyi vokal -> 'an'; penyebutan kedua -> 'The'."],
    ["a", "the", "an", "Look at ___ whiteboard; the agenda is written there.", "the", "a", "an", "Papan tulis spesifik di ruang kelas/rapat memakai 'the'."],
    ["a", "the", "an", "He ordered ___ espresso and ___ croissant; ___ espresso was hot.", "an / a / the", "a / an / a", "the / a / an", "Penyebutan awal 'an/a', lalu merujuk kembali espresso spesifik memakai 'the'."],
    ["a", "the", "an", "Who is ___ director of the finance department?", "the", "a", "an", "Jabatan tunggal spesifik di departemen memakai 'the'."],
    ["a", "the", "an", "I lost ___ USB drive I borrowed from you.", "the", "a", "an", "'USB drive' sudah spesifik ('I borrowed from you') sehingga memakai 'the'."],
    ["a", "the", "an", "She works at ___ clinic on Oak Street. ___ clinic opens at 7.", "a / The", "the / A", "an / The", "Penyebutan awal 'a clinic', lalu spesifik 'The clinic'."],
    ["a", "the", "an", "Turn off ___ lights when leaving the lab.", "the", "a", "an", "Lampu spesifik di ruangan lab memakai 'the'."],
    ["a", "the", "an", "That was ___ best workshop of the semester.", "the", "a", "an", "Superlative 'best' wajib didahului 'the'."],
    ["a", "the", "an", "We saw ___ empty desk in ___ corner of the hall.", "an / the", "a / a", "the / a", "'empty desk' tidak spesifik ('an'); 'the corner of the hall' spesifik ('the')."],
    ["a", "the", "an", "Send me ___ link to the recording from Friday.", "the", "a", "an", "Tautan rekaman spesifik dari hari Jumat memakai 'the'."],
    ["a", "the", "an", "Could you check ___ battery level on the tablet?", "the", "a", "an", "Merujuk level baterai spesifik pada tablet itu -> 'the'."],
    ["a", "the", "an", "Our branch needs ___ new printer because ___ old one broke.", "a / the", "the / a", "an / the", "'a new printer' umum; 'the old one' merujuk printer lama yang spesifik."],
    ["a", "the", "an", "Please sign at ___ bottom of page two.", "the", "a", "an", "Frasa posisi spesifik 'at the bottom of' memakai 'the'."],
    ["a", "the", "an", "He found ___ umbrella near ___ main entrance.", "an / the", "a / a", "the / an", "'an umbrella' (pertama disebut), 'the main entrance' (pintu utama yang spesifik)."],
    ["a", "the", "an", "Let's meet at ___ cafe across from our office.", "the", "a", "an", "Lokasi didefinisikan jelas ('across from our office') -> 'the'."],
    ["a", "the", "an", "Is ___ elevator on the left working today?", "the", "a", "an", "Lift spesifik ('on the left') memakai 'the'."],
    ["a", "the", "an", "She gave me ___ useful tip; ___ tip saved me an hour.", "a / the", "an / a", "the / a", "'a useful tip' (awal bunyi /j/) lalu penyebutan kedua 'the tip'."],
    ["a", "the", "an", "We climbed to ___ top of the observatory.", "the", "a", "an", "'the top of' merujuk titik puncak spesifik -> 'the'."],
    ["a", "the", "an", "I need ___ pen—any pen will do.", "a", "the", "an", "Pen mana saja (tidak spesifik) memakai 'a'."],
    ["a", "the", "an", "Read ___ first chapter before Wednesday's seminar.", "the", "a", "an", "Ordinal 'first' wajib memakai 'the'."],
    ["a", "the", "an", "___ moon looked bright above the harbor.", "The", "A", "An", "Benda langit unik ('moon') memakai 'The'."],
    ["a", "the", "an", "Here is ___ invoice you requested earlier.", "the", "a", "an", "Faktur spesifik yang sudah diminta sebelumnya -> 'the'."],
  ];

  const choice = pairs.map(([, , , prompt, good, b1, b2, exp]) => ({
    prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Bedakan penyebutan pertama (a/an) dan penyebutan kedua/spesifik (the).", "Superlative dan bilangan bertingkat memakai 'the'."],
    skill: "articles-the",
  }));

  const dialogue = [
    ["a", "the", "an", "Do you have ___ spare adapter I can borrow?", "Penyebutan umum ('a spare adapter' yang mana saja)."],
    ["the", "a", "an", "Yes, take ___ black adapter on my desk.", "Benda spesifik ('black adapter on my desk') memakai 'the'."],
    ["the", "a", "an", "Did you send ___ quarterly report to finance?", "Laporan spesifik yang sudah diketahui kedua pembicara -> 'the'."],
    ["an", "a", "the", "Not yet, I am waiting for ___ updated table.", "'updated' berawal bunyi vokal dan belum spesifik -> 'an'."],
    ["the", "a", "an", "Where is ___ key to the storage cabinet?", "Kunci spesifik lemari penyimpanan -> 'the'."],
    ["a", "the", "an", "Check inside ___ small tray near the door.", "Jika ada banyak atau umum/tersebut pertama kali atau cek konteks spesifik."],
    ["the", "a", "an", "Who won ___ first prize in the design contest?", "Bilangan bertingkat 'first' memakai 'the'."],
    ["a", "the", "an", "A student from ___ engineering college in Bandung.", "Menyebut salah satu kampus ('an'!) Wait—engineering starts with /e/!"],
    ["an", "a", "the", "She works at ___ international agency downtown.", "'international' diawali bunyi vokal -> 'an'."],
    ["the", "a", "an", "Is that ___ agency near the city library?", "Merujuk agensi yang baru saja disebut -> 'the'."],
    ["the", "a", "an", "Please turn down ___ volume on the speaker.", "Volume pada speaker tertentu -> 'the'."],
    ["the", "a", "an", "Sure, let me grab ___ remote on the shelf.", "Remote spesifik di rak -> 'the'."],
    ["a", "the", "an", "We need ___ quiet table to discuss the draft.", "Meja tenang yang mana saja (tidak spesifik) -> 'a'."],
    ["the", "a", "an", "Let's sit at ___ corner booth by the window.", "Booth spesifik di sudut dekat jendela -> 'the'."],
    ["the", "a", "an", "What was ___ best part of the training?", "Superlative 'best' selalu memakai 'the'."],
    ["a", "the", "an", "Honestly, ___ hands-on group exercise at the end.", "Penyebutan baru hal umum -> 'a'."],
    ["an", "a", "the", "Did the clinic hire ___ experienced nurse?", "'experienced' diawali bunyi vokal /ɪ/ -> 'an'."],
    ["the", "a", "an", "Yes, ___ nurse starts next Tuesday.", "Penyebutan kedua ('nurse' yang baru dibahas) -> 'the'."],
    ["the", "a", "an", "Could you close ___ blinds on the east window?", "Tirai spesifik di jendela timur -> 'the'."],
    ["the", "a", "an", "Done! Now ___ screen is much easier to read.", "Layar proyektor spesifik di ruangan itu -> 'the'."],
  ].map(([good, b1, b2, lineB, exp], idx) => {
    // Fix item 5/7 cleanly
    if (idx === 5) {
      good = "the"; b1 = "a"; b2 = "an";
      lineB = "It is in ___ top drawer of the desk.";
      exp = "'the top drawer' merujuk laci paling atas yang spesifik.";
    }
    if (idx === 7) {
      good = "an"; b1 = "a"; b2 = "the";
      lineB = "A junior team from ___ architecture school in Surabaya.";
      exp = "'architecture' berawal bunyi vokal dan belum spesifik sebelumnya -> 'an'.";
    }
    return {
      prompt: "Lengkapi percakapan dengan article a / an / the yang tepat.",
      speakerA: idx % 2 === 0 ? "Rina" : "Budi",
      lineA: "Let's check the details before we begin.",
      speakerB: idx % 2 === 0 ? "Budi" : "Rina",
      lineB,
      correct: good,
      distractors: [b1, b2],
      explanation: exp,
      hints: ["Tanyakan apakah pendengar sudah tahu benda spesifik mana yang dimaksud.", "Jika sudah jelas/unik/disebut ulang, pilih 'the'."],
      skill: "articles-the",
    };
  });

  const edit = [
    ["I read a article yesterday. A article was clear.", "I read an article yesterday. The article was clear.", "I read an article yesterday. A article was clear.", "Penyebutan awal 'an article', penyebutan kedua 'The article'.", "articles-the"],
    ["She is a fastest runner on the track team.", "She is the fastest runner on the track team.", "She is an fastest runner on the track team.", "Superlative 'fastest' wajib didahului 'the'.", "articles-the"],
    ["Please turn off a projector when the class ends.", "Please turn off the projector when the class ends.", "Please turn off an projector when the class ends.", "Proyektor spesifik di kelas memakai 'the'.", "articles-the"],
    ["We stayed at the nice hotel; a hotel was quiet.", "We stayed at a nice hotel; the hotel was quiet.", "We stayed at an nice hotel; the hotel was quiet.", "Pertama kali disebut memakai 'a', penyebutan kedua 'the'.", "articles-the"],
    ["Read a second page carefully before signing.", "Read the second page carefully before signing.", "Read an second page carefully before signing.", "Bilangan bertingkat 'second' memakai 'the'.", "articles-the"],
    ["A moon looked remarkably clear last night.", "The moon looked remarkably clear last night.", "An moon looked remarkably clear last night.", "Benda unik ('moon') memakai 'The'.", "articles-the"],
    ["Pass me a blue folder sitting on your chair.", "Pass me the blue folder sitting on your chair.", "Pass me an blue folder sitting on your chair.", "Folder sudah diidentifikasi spesifik ('sitting on your chair') -> 'the'.", "articles-the"],
    ["He sent me an email. An email had two files.", "He sent me an email. The email had two files.", "He sent me a email. The email had two files.", "Penyebutan kedua dari 'an email' memakai 'The email'.", "articles-the"],
    ["That was a most informative session today.", "That was the most informative session today.", "That was an most informative session today.", "Superlative 'most informative' membutuhkan 'the'.", "articles-the"],
    ["Check a battery icon on the top right corner.", "Check the battery icon on the top right corner.", "Check an battery icon on the top right corner.", "Ikon spesifik pada layar memakai 'the'.", "articles-the"],
    ["Can you open a window right behind you?", "Can you open the window right behind you?", "Can you open an window right behind you?", "Jendela spesifik ('right behind you') memakai 'the'.", "articles-the"],
    ["This is a best hotel price we found online.", "This is the best hotel price we found online.", "This is an best hotel price we found online.", "Superlative 'best' memakai 'the'.", "articles-the"],
    ["She bought a umbrella and the raincoat; a umbrella is blue.", "She bought an umbrella and a raincoat; the umbrella is blue.", "She bought a umbrella and a raincoat; a umbrella is blue.", "Gunakan 'an umbrella' pada penyebutan pertama dan 'the umbrella' pada penyebutan kedua.", "articles-the"],
    ["We met at a main entrance of the museum.", "We met at the main entrance of the museum.", "We met at an main entrance of the museum.", "Pintu masuk utama spesifik museum memakai 'the'.", "articles-the"],
    ["Sign on a dotted line at the bottom.", "Sign on the dotted line at the bottom.", "Sign on an dotted line at the bottom.", "Garis titik-titik spesifik pada formulir memakai 'the'.", "articles-the"],
    ["Look at a chart on page five.", "Look at the chart on page five.", "Look at an chart on page five.", "Bagan spesifik di halaman lima memakai 'the'.", "articles-the"],
    ["He ordered a sandwich. A sandwich tasted fresh.", "He ordered a sandwich. The sandwich tasted fresh.", "He ordered the sandwich. A sandwich tasted fresh.", "Penyebutan kedua memakai 'The sandwich'.", "articles-the"],
    ["I visited a new branch; a branch is huge.", "I visited a new branch; the branch is huge.", "I visited the new branch; a branch is huge.", "Penyebutan kedua merujuk kembali cabang tersebut -> 'the branch'.", "articles-the"],
    ["Who is a lead engineer on Project Alpha?", "Who is the lead engineer on Project Alpha?", "Who is an lead engineer on Project Alpha?", "Posisi tunggal spesifik pada proyek tertentu memakai 'the'.", "articles-the"],
    ["Please replace a ink cartridge in Printer 2.", "Please replace the ink cartridge in Printer 2.", "Please replace an ink cartridge in Printer 2.", "Kartrid spesifik di Printer 2 memakai 'the'.", "articles-the"],
  ].map(([draft, correct, bad, exp, skill]) => ({
    prompt: "Perbaiki kesalahan article (a / an / the) dalam kalimat berikut.",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Cek apakah benda sudah spesifik atau merupakan penyebutan kedua.", "Gunakan 'the' untuk superlative dan bilangan bertingkat."],
    skill,
  }));

  const build = [
    ["The new intern reviewed the monthly invoice carefully.", "Merujuk intern dan invoice spesifik dengan 'the'.", "articles-the"],
    ["She booked a quiet room near the station.", "Kamar belum spesifik ('a'), stasiun sudah spesifik ('the').", "articles-the"],
    ["Please read the third paragraph of the report.", "Ordinal 'third' dan report spesifik memakai 'the'.", "articles-the"],
    ["This is the fastest route to the terminal.", "Superlative 'fastest' dan terminal tujuan memakai 'the'.", "articles-the"],
    ["He bought a laptop and the charger worked.", "Penyebutan pertama 'a', penyebutan charger spesifik 'the'.", "articles-the"],
    ["Turn off the projector after the afternoon briefing.", "Benda spesifik di ruang rapat memakai 'the'.", "articles-the"],
    ["An experienced auditor checked the annual financial records.", "'An' untuk penyebutan umum, 'the' untuk catatan spesifik.", "articles-the"],
    ["Can you pass the blue folder beside you?", "Objek spesifik didefinisikan posisinya -> 'the'.", "articles-the"],
    ["The sun shines brightly over the southern harbor.", "Benda unik ('The sun') dan pelabuhan spesifik ('the').", "articles-the"],
    ["We found a seat near the emergency exit.", "Kursi acak ('a seat'), pintu keluar spesifik ('the emergency exit').", "articles-the"],
    ["Send me the link to the recorded lecture.", "Tautan rekaman spesifik memakai 'the'.", "articles-the"],
    ["That was the best presentation of the workshop.", "Superlative 'the best' dan workshop spesifik.", "articles-the"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kata-kata ini dengan penempatan article 'a / an / the' yang tepat.",
    targetSentence,
    explanation: exp,
    hints: ["Letakkan article tepat sebelum noun phrase-nya.", "Superlative dan benda spesifik memakai 'the'."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildArticlesComplex() {
  const zeroVsThe = [
    ["___ information travels rapidly across digital networks.", "Ø (tanpa article)", "The", "An", "Pernyataan umum tentang uncountable noun 'information' tidak memakai article (zero article)."],
    ["___ information in yesterday's audit was incomplete.", "The", "Ø (tanpa article)", "An", "Karena dibatasi spesifik ('in yesterday's audit'), gunakan 'The'."],
    ["___ electric buses reduce urban air pollution.", "Ø (tanpa article)", "The", "A", "Plural noun untuk generalisasi umum tidak memakai article."],
    ["___ electric buses on Route 4 run until midnight.", "The", "Ø (tanpa article)", "A", "Dibuat spesifik dengan 'on Route 4', sehingga memakai 'The'."],
    ["Staff members need ___ clear safety equipment.", "Ø (tanpa article)", "a", "an", "'Equipment' uncountable dan bermakna umum -> tanpa article."],
    ["___ equipment in Laboratory B requires calibration.", "The", "Ø (tanpa article)", "An", "Peralatan spesifik ('in Laboratory B') memakai 'The'."],
    ["She travels to work by ___ train every weekday.", "Ø (tanpa article)", "the", "a", "Pola sarana transportasi umum 'by + transport' (by train/bus/plane) tanpa article."],
    ["Do you usually eat ___ breakfast before seven?", "Ø (tanpa article)", "the", "a", "Nama waktu makan umum (breakfast, lunch, dinner) tidak memakai article."],
    ["___ breakfast served at that hotel was delicious.", "The", "Ø (tanpa article)", "A", "Sarapan spesifik ('served at that hotel') memakai 'The'."],
    ["Students attend ___ university to build research skills.", "Ø (tanpa article)", "the", "a", "Merujuk fungsi institusi secara umum (attend university/go to school/in hospital) -> tanpa article."],
    ["Visitors parked near ___ university across the bridge.", "the", "Ø (tanpa article)", "an", "Merujuk gedung fisik kampus spesifik -> pakai 'the'."],
    ["___ patience is essential when training new interns.", "Ø (tanpa article)", "The", "A", "Konsep abstrak umum ('patience') tidak memakai article."],
    ["___ advice she gave me saved the whole project.", "The", "Ø (tanpa article)", "An", "Nasihat spesifik ('she gave me') memakai 'The'."],
    ["We rarely receive ___ feedback after online forms.", "Ø (tanpa article)", "a", "the", "'Feedback' uncountable umum tanpa article."],
    ["___ feedback from Friday's seminar was encouraging.", "The", "Ø (tanpa article)", "A", "Umpan balik spesifik ('from Friday's seminar') memakai 'The'."],
    ["He speaks ___ Japanese fluently at client meetings.", "Ø (tanpa article)", "the", "a", "Nama bahasa tanpa kata 'language' tidak memakai article."],
    ["They discussed ___ history during the afternoon lecture.", "Ø (tanpa article)", "the", "a", "Mata pelajaran atau bidang akademik umum tanpa article."],
    ["___ history of coastal trade shaped this port city.", "The", "Ø (tanpa article)", "A", "Karena dispesifikkan ('of coastal trade'), gunakan 'The'."],
    ["Clean ___ water is vital for rural clinics.", "Ø (tanpa article)", "the", "a", "Substansi umum ('Clean water') tidak memakai article."],
    ["___ water in this flask contains dissolved minerals.", "The", "Ø (tanpa article)", "A", "Air spesifik ('in this flask') memakai 'The'."],
    ["Most commuters go home at ___ night after shifts.", "Ø (tanpa article)", "the", "a", "Ekspresi tetap 'at night' tanpa article (berbeda dengan 'in the morning')."],
    ["___ passengers on Flight 204 boarded on time.", "The", "Ø (tanpa article)", "A", "Penumpang spesifik ('on Flight 204') memakai 'The'."],
    ["___ passengers generally prefer direct flights.", "Ø (tanpa article)", "The", "A", "Generalisasi seluruh penumpang secara umum memakai zero article."],
    ["Our team communicates via ___ email for audit trails.", "Ø (tanpa article)", "an", "the", "Pola 'via email / by email' sebagai media umum tanpa article."],
    ["___ coffee keeps many researchers awake late.", "Ø (tanpa article)", "The", "A", "Minuman secara umum ('coffee') memakai zero article."],
    ["___ coffee on the meeting table is already cold.", "The", "Ø (tanpa article)", "A", "Kopi spesifik di meja rapat memakai 'The'."],
    ["Many companies invest in ___ renewable energy.", "Ø (tanpa article)", "a", "the", "Konsep energi terbarukan secara umum tanpa article."],
    ["___ software we installed yesterday runs smoothly.", "The", "Ø (tanpa article)", "A", "Perangkat lunak spesifik ('we installed yesterday') memakai 'The'."],
    ["___ luggage cannot be left unattended in terminals.", "Ø (tanpa article)", "The", "A", "Pernyataan umum tentang uncountable 'luggage' tanpa article."],
    ["___ Mount Fuji attracts climbers from many countries.", "Ø (tanpa article)", "The", "A", "Nama gunung tunggal (Mount Fuji) tidak memakai 'the' (berbeda dengan pegunungan seperti the Alps)."],
  ];

  const choice = zeroVsThe.map(([prompt, good, b1, b2, exp]) => ({
    prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Cek apakah kata benda bermakna umum (zero article) atau dibatasi frasa spesifik (the).", "Perhatikan uncountable noun dan ekspresi tetap seperti by train / at night."],
    skill: "articles-zero",
  }));

  const dialogue = zeroVsThe.slice(0, 20).map(([prompt, good, b1, b2, exp], idx) => ({
    prompt: "Pilih penggunaan zero article (Ø) atau 'the' yang tepat dalam dialog.",
    speakerA: idx % 2 === 0 ? "Analyst" : "Trainer",
    lineA: "Let's review this sentence for the newsletter.",
    speakerB: idx % 2 === 0 ? "Trainer" : "Analyst",
    lineB: prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Amati apakah ada frasa penjelas spesifik setelah kata benda.", "Generalisasi plural/uncountable tidak memakai 'the'."],
    skill: "articles-zero",
  }));

  const edit = [
    ["The information is valuable in modern business.", "Information is valuable in modern business.", "An information is valuable in modern business.", "Pernyataan umum dengan uncountable noun 'information' memakai zero article.", "articles-zero"],
    ["She goes to the university by the bus daily.", "She goes to university by bus daily.", "She goes to a university by a bus daily.", "'go to university' (belajar) dan 'by bus' memakai zero article.", "articles-zero"],
    ["The patience helps teachers support young learners.", "Patience helps teachers support young learners.", "A patience helps teachers support young learners.", "Kata benda abstrak umum 'Patience' tidak memakai article.", "articles-zero"],
    ["We usually eat the lunch in the cafeteria.", "We usually eat lunch in the cafeteria.", "We usually eat a lunch in the cafeteria.", "Nama waktu makan umum 'lunch' tidak memakai article.", "articles-zero"],
    ["The water is essential for all living organisms.", "Water is essential for all living organisms.", "A water is essential for all living organisms.", "Pernyataan umum ilmiah memakai zero article 'Water'.", "articles-zero"],
    ["He sent me an useful advice about interviews.", "He sent me useful advice about interviews.", "He sent me a useful advice about interviews.", "'Advice' adalah uncountable noun sehingga tidak boleh memakai 'a/an'.", "articles-zero"],
    ["The equipment are very expensive to replace.", "Equipment is very expensive to replace.", "An equipment is very expensive to replace.", "'Equipment' uncountable tunggal dan bermakna umum tanpa article.", "articles-zero"],
    ["They studied the biology at high school.", "They studied biology at high school.", "They studied a biology at high school.", "Nama mata pelajaran umum tidak memakai article.", "articles-zero"],
    ["The dogs are loyal companions for families.", "Dogs are loyal companions for families.", "A dogs are loyal companions for families.", "Generalisasi plural noun 'Dogs' memakai zero article.", "articles-zero"],
    ["I never drink a coffee after six in evening.", "I never drink coffee after six in the evening.", "I never drink the coffee after six in evening.", "'coffee' umum tanpa article, sedangkan 'in the evening' memakai 'the'.", "articles-zero"],
    ["She climbed the Mount Rinjani last August.", "She climbed Mount Rinjani last August.", "She climbed a Mount Rinjani last August.", "Nama puncak gunung tunggal tidak memakai 'the'.", "articles-zero"],
    ["We discussed the climate change in general terms.", "We discussed climate change in general terms.", "We discussed a climate change in general terms.", "Konsep umum 'climate change' tidak memakai article.", "articles-zero"],
    ["The happiness cannot be measured by salary alone.", "Happiness cannot be measured by salary alone.", "A happiness cannot be measured by salary alone.", "Abstrak umum 'Happiness' memakai zero article.", "articles-zero"],
    ["Drivers should rest at the night on long trips.", "Drivers should rest at night on long trips.", "Drivers should rest at a night on long trips.", "Ekspresi baku adalah 'at night' tanpa article.", "articles-zero"],
    ["Did you bring a luggage for the two-day trip?", "Did you bring luggage for the two-day trip?", "Did you bring luggages for the two-day trip?", "'Luggage' uncountable sehingga tidak memakai 'a' atau '-s'.", "articles-zero"],
    ["The Japanese is taught in this language center.", "Japanese is taught in this language center.", "A Japanese is taught in this language center.", "Nama bahasa secara umum tidak memakai 'the'.", "articles-zero"],
    ["Students gained an experience during summer internships.", "Students gained experience during summer internships.", "Students gained a experience during summer internships.", "'Experience' (pengalaman kerja secara umum) uncountable tanpa 'a/an'.", "articles-zero"],
    ["The technology evolves rapidly across industries.", "Technology evolves rapidly across industries.", "A technology evolves rapidly across industries.", "Konsep umum 'Technology' tidak memakai article.", "articles-zero"],
    ["Our company ships parcels by the air freight.", "Our company ships parcels by air freight.", "Our company ships parcels by an air freight.", "Setelah 'by' untuk moda pengiriman/transportasi, gunakan zero article.", "articles-zero"],
    ["The research shows that sleep improves memory.", "Research shows that sleep improves memory.", "A research shows that sleep improves memory.", "Pernyataan umum dengan uncountable 'Research' memakai zero article.", "articles-zero"],
  ].map(([draft, correct, bad, exp, skill]) => ({
    prompt: "Sunting kesalahan zero article / uncountable noun pada kalimat berikut.",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Hapus 'a/an/the' sebelum uncountable atau generalisasi umum.", "Perhatikan ekspresi baku seperti at night, by bus, eat lunch."],
    skill,
  }));

  const build = [
    ["Information travels rapidly across global digital networks.", "Uncountable umum 'Information' memakai zero article.", "articles-zero"],
    ["The information in yesterday's audit was incomplete.", "Spesifik ('in yesterday's audit') wajib memakai 'The'.", "articles-zero"],
    ["Most university students commute by public bus daily.", "'by public bus' memakai zero article.", "articles-zero"],
    ["Clean water remains vital for rural health clinics.", "Substansi umum 'Clean water' tanpa article.", "articles-zero"],
    ["The equipment in Laboratory B requires weekly calibration.", "Dibatasi lokasi spesifik -> 'The equipment'.", "articles-zero"],
    ["Patience and clarity help instructors guide beginners effectively.", "Konsep abstrak umum tanpa article.", "articles-zero"],
    ["The feedback from Friday's workshop sounded very encouraging.", "Feedback spesifik -> 'The feedback'.", "articles-zero"],
    ["Colleagues usually discuss urgent updates via email.", "'via email' tanpa article.", "articles-zero"],
    ["Electric buses reduce noise pollution in crowded cities.", "Generalisasi jamak tanpa article.", "articles-zero"],
    ["The breakfast served at our hotel included fruit.", "Sarapan spesifik -> 'The breakfast'.", "articles-zero"],
    ["Good advice helps young analysts avoid costly mistakes.", "Uncountable 'Good advice' tanpa 'a/an'.", "articles-zero"],
    ["The history of maritime trade shaped this region.", "Dibatasi 'of maritime trade' -> 'The history'.", "articles-zero"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kalimat berikut dengan aturan zero article dan 'the' yang tepat.",
    targetSentence,
    explanation: exp,
    hints: ["Generalisasi abstrak/plural tidak memakai article.", "Tambahkan 'the' hanya jika ada pembatas spesifik."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

// 5. 00-foundation/05-nouns-plural
function buildNounsPluralSimple() {
  const words = [
    ["book", "books", "bookes", "book's", "akhiran konsonan standar + -s"],
    ["desk", "desks", "deskes", "desk's", "noun reguler + -s"],
    ["laptop", "laptops", "laptopes", "laptop's", "noun reguler + -s"],
    ["bus", "buses", "buss", "busies", "berakhiran -s ditambah -es"],
    ["box", "boxes", "boxs", "boxies", "berakhiran -x ditambah -es"],
    ["watch", "watches", "watchs", "watchies", "berakhiran -ch ditambah -es"],
    ["dish", "dishes", "dishs", "dishies", "berakhiran -sh ditambah -es"],
    ["class", "classes", "classs", "classies", "berakhiran -ss ditambah -es"],
    ["city", "cities", "citys", "cityes", "konsonan + y -> ubah y menjadi -ies"],
    ["company", "companies", "companys", "companyes", "konsonan + y -> -ies"],
    ["policy", "policies", "policys", "policyes", "konsonan + y -> -ies"],
    ["story", "stories", "storys", "storyes", "konsonan + y -> -ies"],
    ["day", "days", "daies", "dayes", "vokal + y -> langsung + -s"],
    ["key", "keys", "keies", "keyes", "vokal + y -> langsung + -s"],
    ["survey", "surveys", "surveies", "surveyes", "vokal + y -> langsung + -s"],
    ["tray", "trays", "traies", "trayes", "vokal + y -> langsung + -s"],
    ["knife", "knives", "knifes", "knifs", "-fe berubah menjadi -ves"],
    ["leaf", "leaves", "leafs", "leafes", "-f berubah menjadi -ves"],
    ["shelf", "shelves", "shelfs", "shelfes", "-f berubah menjadi -ves"],
    ["half", "halves", "halfs", "halfes", "-f berubah menjadi -ves"],
    ["tomato", "tomatoes", "tomatos", "tomato's", "kata benda -o tertentu + -es"],
    ["potato", "potatoes", "potatos", "potato's", "kata benda -o tertentu + -es"],
    ["photo", "photos", "photoes", "photies", "singkatan photograph ('photo') hanya + -s"],
    ["piano", "pianos", "pianoes", "pianies", "alat musik -o ('piano') hanya + -s"],
    ["memo", "memos", "memoes", "memies", "singkatan memorandum ('memo') hanya + -s"],
    ["quiz", "quizzes", "quizes", "quizs", "-z menggandakan z + -es -> quizzes"],
    ["branch", "branches", "branchs", "branchies", "berakhiran -ch -> + -es"],
    ["budget", "budgets", "budgetes", "budget's", "noun reguler + -s"],
    ["factory", "factories", "factorys", "factoryes", "konsonan + y -> -ies"],
    ["tax", "taxes", "taxs", "taxies", "berakhiran -x -> + -es"],
  ];

  const choice = words.map(([sg, pl, b1, b2, rule]) => ({
    prompt: `Bentuk jamak (plural) yang benar untuk kata "${sg}" adalah...`,
    correct: pl,
    distractors: [b1, b2],
    explanation: `Kata "${sg}" menjadi "${pl}" karena aturan: ${rule}.`,
    hints: ["Perhatikan huruf akhir kata benda.", "Jangan gunakan apostrof ('s) untuk bentuk jamak."],
    skill: "plural-noun",
  }));

  const dialogue = words.slice(0, 20).map(([sg, pl, b1, b2, rule], idx) => ({
    prompt: "Pilih bentuk jamak yang benar untuk melengkapi percakapan.",
    speakerA: idx % 2 === 0 ? "Staff" : "Manager",
    lineA: `How many ${sg}s? Wait—we need more than one ${sg} today.`,
    speakerB: idx % 2 === 0 ? "Manager" : "Staff",
    lineB: `Please prepare five ___ before the session.`,
    correct: pl,
    distractors: [b1, b2],
    explanation: `Setelah angka "five", gunakan plural "${pl}" (${rule}).`,
    hints: [`Ubah "${sg}" menjadi bentuk jamak.`, "Perhatikan ejaan akhir kata."],
    skill: "plural-noun",
  }));
  // Make speakerA line natural without spoiling plural
  dialogue.forEach((d, idx) => {
    const sg = words[idx][0];
    d.lineA = `Is one ${sg} enough for all guests?`;
    d.lineB = `No, please bring several ___ right away.`;
  });

  const edit = words.slice(0, 20).map(([sg, pl, b1, , rule]) => ({
    prompt: "Perbaiki kesalahan ejaan bentuk jamak pada kalimat ini.",
    draft: `We ordered three ${b1} for the main hall.`,
    correct: `We ordered three ${pl} for the main hall.`,
    distractors: [`We ordered three ${sg} for the main hall.`, `We ordered three ${sg}'s for the main hall.`],
    explanation: `Bentuk jamak dari "${sg}" adalah "${pl}" (${rule}).`,
    hints: [`Cek ejaan plural dari "${sg}".`, "Jangan gunakan apostrof untuk jamak."],
    skill: "plural-noun",
  }));

  const build = words.slice(0, 12).map(([, pl, , , rule]) => ({
    prompt: "Susun kalimat dengan kata benda jamak (plural noun) yang tepat.",
    targetSentence: `The office received several new ${pl} yesterday.`,
    explanation: `Kata "several" diikuti bentuk jamak "${pl}" (${rule}).`,
    hints: ["Mulai dengan 'The office received'.", "Letakkan 'yesterday' di akhir kalimat."],
    skill: "plural-noun",
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildNounsPluralIntermediate() {
  const irreg = [
    ["child", "children", "childs", "childrens"],
    ["person", "people", "persons", "peoples"],
    ["man", "men", "mans", "mens"],
    ["woman", "women", "womans", "womens"],
    ["foot", "feet", "foots", "feets"],
    ["tooth", "teeth", "tooths", "teeths"],
    ["mouse", "mice", "mouses", "mices"],
    ["goose", "geese", "gooses", "geeses"],
    ["ox", "oxen", "oxes", "oxs"],
    ["sheep", "sheep", "sheeps", "sheepes"],
    ["deer", "deer", "deers", "deeres"],
    ["fish", "fish", "fishs", "fishe's"],
    ["aircraft", "aircraft", "aircrafts", "aircraftes"],
    ["series", "series", "serieses", "seriess"],
    ["species", "species", "specieses", "speciess"],
    ["analysis", "analyses", "analysises", "analysiss"],
    ["crisis", "crises", "crisises", "crisiss"],
    ["thesis", "theses", "thesises", "thesiss"],
    ["criterion", "criteria", "criterions", "criterias"],
    ["phenomenon", "phenomena", "phenomenons", "phenomenas"],
  ];

  const uncount = [
    ["information", "informations", "an information", "uncountable noun tidak ditambah -s atau a/an"],
    ["equipment", "equipments", "an equipment", "uncountable noun selalu berbentuk tunggal"],
    ["furniture", "furnitures", "a furniture", "uncountable noun tidak dijamakkan dengan -s"],
    ["luggage", "luggages", "a luggage", "uncountable noun untuk seluruh bagasi"],
    ["advice", "advices", "an advice", "uncountable noun memakai 'pieces of advice' jika dihitung"],
    ["traffic", "traffics", "a traffic", "uncountable noun lalu lintas"],
    ["research", "researches", "a research", "uncountable noun dalam konteks akademik"],
    ["knowledge", "knowledges", "a knowledge", "uncountable noun pengetahuan"],
    ["software", "softwares", "a software", "uncountable noun perangkat lunak"],
    ["feedback", "feedbacks", "a feedback", "uncountable noun umpan balik"],
  ];

  const choice = [
    ...irreg.map(([sg, pl, b1, b2]) => ({
      prompt: `Bentuk plural tidak beraturan (irregular plural) untuk "${sg}" adalah...`,
      correct: pl,
      distractors: [b1, b2],
      explanation: `"${sg}" memiliki bentuk jamak khusus yaitu "${pl}" (bukan + -s/-es).`,
      hints: ["Kata ini termasuk irregular plural atau zero-plural.", "Hindari penambahan -s biasa."],
      skill: "plural-noun",
    })),
    ...uncount.map(([u, b1, b2, rule]) => ({
      prompt: `Bentuk uncountable noun baku untuk konteks kalimat "The department still needs additional ___ this month" adalah...`,
      correct: u,
      distractors: [b1, b2],
      explanation: `"${u}" adalah ${rule}.`,
      hints: ["Kata ini tidak dapat dihitung satu per satu (uncountable).", "Jangan tambahkan -s atau a/an."],
      skill: "plural-noun",
    })),
  ];

  const dialogue = [
    ...irreg.slice(0, 12).map(([sg, pl, b1, b2], idx) => ({
      prompt: "Lengkapi percakapan dengan irregular plural yang benar.",
      speakerA: idx % 2 === 0 ? "Guide" : "Researcher",
      lineA: `Did your log mention only one ${sg} in that case?`,
      speakerB: idx % 2 === 0 ? "Researcher" : "Guide",
      lineB: `No, our report recorded several ___ in total.`,
      correct: pl,
      distractors: [b1, b2],
      explanation: `Jamak dari "${sg}" adalah "${pl}".`,
      hints: [`Gunakan irregular plural dari "${sg}".`, "Jangan tambahkan -s sembarangan."],
      skill: "plural-noun",
    })),
    ...uncount.slice(0, 8).map(([u, b1, b2, rule], idx) => ({
      prompt: "Pilih bentuk uncountable noun yang tepat dalam dialog.",
      speakerA: idx % 2 === 0 ? "Intern" : "Lead",
      lineA: "What else should we verify before launching?",
      speakerB: idx % 2 === 0 ? "Lead" : "Intern",
      lineB: `We still need reliable ___ from the team.`,
      correct: u,
      distractors: [b1, b2],
      explanation: `"${u}" merupakan ${rule}.`,
      hints: ["Uncountable noun tidak memakai akhiran -s.", "Gunakan bentuk dasarnya saja."],
      skill: "plural-noun",
    })),
  ];

  const edit = [
    ["Several childs attended the safety workshop.", "Several children attended the safety workshop.", "Several childrens attended the safety workshop.", "Jamak tidak beraturan dari 'child' adalah 'children'."],
    ["Five persons joined the morning tour.", "Five people joined the morning tour.", "Five peoples joined the morning tour.", "Bentuk jamak umum dari 'person' adalah 'people'."],
    ["Two mans repaired the backup cable.", "Two men repaired the backup cable.", "Two mens repaired the backup cable.", "Jamak dari 'man' adalah 'men'."],
    ["Three womans chaired the seminar panels.", "Three women chaired the seminar panels.", "Three womens chaired the seminar panels.", "Jamak dari 'woman' adalah 'women'."],
    ["The hallway measures twelve foots wide.", "The hallway measures twelve feet wide.", "The hallway measures twelve feets wide.", "Jamak dari 'foot' adalah 'feet'."],
    ["Waiters cleaned the lab after mouses appeared.", "Waiters cleaned the lab after mice appeared.", "Waiters cleaned the lab after mices appeared.", "Jamak dari 'mouse' adalah 'mice'."],
    ["Four gooses walked beside the campus pond.", "Four geese walked beside the campus pond.", "Four geeses walked beside the campus pond.", "Jamak dari 'goose' adalah 'geese'."],
    ["Twenty sheeps grazed across the green hill.", "Twenty sheep grazed across the green hill.", "Twenty sheepes grazed across the green hill.", "'Sheep' memiliki bentuk tunggal dan jamak yang sama."],
    ["Three aircrafts landed safely despite heavy fog.", "Three aircraft landed safely despite heavy fog.", "Three aircraftes landed safely despite heavy fog.", "'Aircraft' adalah zero-plural (tidak ditambah -s)."],
    ["The committee reviewed four strict criterions.", "The committee reviewed four strict criteria.", "The committee reviewed four strict criterias.", "Jamak akademik dari 'criterion' adalah 'criteria'."],
    ...uncount.map(([u, b1, b2, rule]) => [
      `The coordinators reviewed ${b1} before noon.`,
      `The coordinators reviewed ${u} before noon.`,
      `The coordinators reviewed ${b2} before noon.`,
      `"${u}" adalah ${rule}.`,
    ]),
  ].map(([draft, correct, bad, exp]) => ({
    prompt: "Perbaiki kesalahan irregular plural atau uncountable noun pada kalimat ini.",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Cek bentuk jamak tidak beraturan atau sifat uncountable noun.", "Hapus akhiran -s/a/an yang keliru."],
    skill: "plural-noun",
  }));

  const build = [
    ["Three senior analysts completed both laboratory analyses.", "Irregular plural 'analyses' dari 'analysis'.", "plural-noun"],
    ["The airline lost two pieces of heavy luggage.", "'Luggage' dihitung memakai 'pieces of luggage'.", "plural-noun"],
    ["Several new aircraft landed safely despite fog.", "'Aircraft' memiliki bentuk sama untuk singular & plural.", "plural-noun"],
    ["The selection committee reviewed four strict criteria.", "'Criteria' adalah jamak dari 'criterion'.", "plural-noun"],
    ["Our interns received helpful feedback from mentors.", "Uncountable 'feedback' tanpa -s.", "plural-noun"],
    ["Many local children visited the science museum.", "Irregular plural 'children' dari 'child'.", "plural-noun"],
    ["Modern offices need reliable wireless network equipment.", "Uncountable 'equipment' tetap tunggal.", "plural-noun"],
    ["Two endangered species live inside this forest.", "'Species' bentuk tunggal dan jamaknya sama.", "plural-noun"],
    ["The museum guards checked all visitor bags.", "Regular plural + possessive context.", "plural-noun"],
    ["Clear statistical data supports these environmental theses.", "Irregular plural 'theses' dari 'thesis'.", "plural-noun"],
    ["Heavy traffic delayed three morning delivery vans.", "Uncountable 'traffic' memakai bentuk dasar.", "plural-noun"],
    ["Ten experienced women joined the engineering board.", "Irregular plural 'women' dari 'woman'.", "plural-noun"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kalimat dengan irregular plural atau uncountable noun yang benar.",
    targetSentence,
    explanation: exp,
    hints: ["Perhatikan ejaan jamak tidak beraturan.", "Jangan menambahkan -s pada uncountable noun."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildNounsPluralComplex() {
  const items = [
    ["Five pieces of luggage", "are", "is", "were", "waiting at Baggage Claim 3.", "Karena dihitung memakai 'pieces' (jamak), verb yang tepat adalah 'are'."],
    ["All of the luggage", "is", "are", "were", "stored safely in the locker.", "'Luggage' uncountable -> memakai verb tunggal 'is'."],
    ["These safety criteria", "are", "is", "was", "updated every fiscal year.", "'Criteria' adalah plural (dari criterion) -> memakai 'are'."],
    ["That single criterion", "is", "are", "were", "the most decisive factor.", "'Criterion' berbentuk tunggal -> memakai 'is'."],
    ["The team's statistical analyses", "reveal", "reveals", "is revealing", "a steady upward trend.", "'Analyses' adalah jamak dari 'analysis' -> verb jamak 'reveal'."],
    ["This preliminary analysis", "shows", "show", "are showing", "promising results.", "'Analysis' berbentuk tunggal -> verb tunggal 'shows'."],
    ["My new scissors", "are", "is", "was", "on the cutting mat.", "Benda berpasangan seperti 'scissors/glasses/trousers' selalu jamak ('are')."],
    ["A pair of safety glasses", "is", "are", "were", "required inside the workshop.", "Subjek intinya 'A pair' (tunggal) -> memakai 'is'."],
    ["Recent research", "indicates", "indicate", "are indicating", "strong demand for solar power.", "'Research' uncountable noun tunggal -> 'indicates'."],
    ["Two recent studies", "indicate", "indicates", "is indicating", "a clear shift in habits.", "'Studies' countable jamak -> 'indicate'."],
    ["Our new office furniture", "looks", "look", "are looking", "clean and ergonomic.", "'Furniture' uncountable tunggal -> 'looks'."],
    ["Several pieces of equipment", "need", "needs", "is needing", "immediate calibration today.", "'Pieces' (jamak) -> verb jamak 'need'."],
    ["All laboratory equipment", "needs", "need", "are needing", "annual certification.", "'Equipment' uncountable tunggal -> 'needs'."],
    ["Those rare natural phenomena", "occur", "occurs", "is occurring", "only near polar latitudes.", "'Phenomena' adalah bentuk jamak dari 'phenomenon' -> 'occur'."],
    ["This rare phenomenon", "occurs", "occur", "are occurring", "once every decade.", "'Phenomenon' bentuk tunggal -> 'occurs'."],
    ["Many city residents", "have", "has", "is having", "switched to electric bicycles.", "'Residents' plural -> 'have'."],
    ["Much technical information", "is", "are", "were", "available in the appendix.", "'Much + uncountable' -> tunggal 'is'."],
    ["Few external applicants", "meet", "meets", "is meeting", "all language requirements.", "'Few + countable plural' -> verb jamak 'meet'."],
    ["Little practical advice", "was", "were", "are", "offered during the short call.", "'Little + uncountable' -> tunggal 'was'."],
    ["Both economic crises", "affected", "affecting", "was affecting", "regional shipping routes.", "Bentuk lampau jamak yang tepat adalah finite verb 'affected'."],
    ["The acoustics in this hall", "are", "is", "was", "exceptional for lectures.", "'Acoustics' (sifat akustik ruangan) menggunakan verb jamak 'are'."],
    ["Physics", "is", "are", "were", "mandatory for civil engineering majors.", "Nama mata kuliah/ilmu 'Physics' selalu tunggal ('is')."],
    ["The headquarters", "is", "are", "were", "located near the central harbor.", "'Headquarters' sebagai satu gedung pusat memakai verb tunggal 'is'."],
    ["Three international means of transport", "connect", "connects", "is connecting", "the island to the mainland.", "'Means' bisa jamak ('Three ... means') -> 'connect'."],
    ["One efficient means of transport", "connects", "connect", "are connecting", "both terminals.", "'One ... means' bersifat tunggal -> 'connects'."],
    ["Your trousers", "are", "is", "was", "hanging in the wardrobe.", "'Trousers' selalu plural -> 'are'."],
    ["The news about tax exemptions", "was", "were", "are", "welcomed by small shops.", "'News' selalu uncountable tunggal -> 'was'."],
    ["Many endangered fish", "live", "lives", "is living", "around coral reefs.", "'Many ... fish' bermakna jamak -> 'live'."],
    ["Our alumni", "support", "supports", "is supporting", "annual student scholarships.", "'Alumni' adalah bentuk jamak dari 'alumnus/alumna' -> 'support'."],
    ["Each piece of evidence", "points", "point", "are pointing", "to the same conclusion.", "'Each piece' tunggal -> 'points'."],
  ];

  const choice = items.map(([subj, good, b1, b2, rest, exp]) => ({
    prompt: `${subj} ___ ${rest}`,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Cek apakah subjeknya plural Yunani/Latin (-a/-es/-i), benda berpasangan, atau uncountable.", "Perhatikan 'a pair of' dan 'pieces of' sebagai penentu jumlah."],
    skill: "plural-noun",
  }));

  const dialogue = items.slice(0, 20).map(([subj, good, b1, b2, rest, exp], idx) => ({
    prompt: "Lengkapi percakapan akademik/kantor dengan agreement noun yang tepat.",
    speakerA: idx % 2 === 0 ? "Editor" : "Analyst",
    lineA: "Should we update this line before publishing?",
    speakerB: idx % 2 === 0 ? "Analyst" : "Editor",
    lineB: `Yes: "${subj} ___ ${rest}"`,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Kenali bentuk singular vs plural yang tidak umum (criteria/criterion, analyses/analysis).", "Perhatikan head noun setelah 'of'."],
    skill: "plural-noun",
  }));

  const edit = items.slice(0, 20).map(([subj, good, b1, , rest, exp]) => ({
    prompt: "Sunting kesalahan kesesuaian kata benda jamak/uncountable dengan kata kerjanya.",
    draft: `${subj} ${b1} ${rest}`,
    correct: `${subj} ${good} ${rest}`,
    distractors: [`${subj} be ${rest}`, `${subj} been ${rest}`],
    explanation: exp,
    hints: ["Periksa apakah kata benda di subjek sebenarnya tunggal atau jamak.", `Ganti "${b1}" menjadi "${good}".`],
    skill: "plural-noun",
  }));

  const build = items.slice(0, 12).map(([subj, good, , , rest, exp]) => ({
    prompt: "Susun kalimat kompleks dengan kesesuaian noun dan verb yang akurat.",
    targetSentence: `${subj} ${good} ${rest}`,
    explanation: exp,
    hints: ["Tempatkan frasa subjek utuh di awal kalimat.", `Cocokkan verb "${good}" dengan bentuk noun-nya.`],
    skill: "plural-noun",
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

// 6. 00-foundation/06-pronouns
function buildPronounsSimple() {
  const pairs = [
    ["We asked ___ to confirm the room booking.", "her", "she", "hers", "Setelah verb 'asked', posisi objek memakai object pronoun 'her'."],
    ["___ prepared the monthly inventory sheet.", "They", "Them", "Their", "Posisi subjek kalimat memerlukan subject pronoun 'They'."],
    ["Please send the updated itinerary to ___.", "me", "I", "my", "Setelah preposisi 'to', gunakan object pronoun 'me'."],
    ["That black briefcase belongs to ___.", "him", "he", "his", "Setelah preposisi 'to', gunakan object pronoun 'him'."],
    ["___ is the senior nurse on the night shift.", "She", "Her", "Hers", "Posisi subjek sebelum 'is' membutuhkan 'She'."],
    ["The manager thanked ___ for staying late.", "us", "we", "our", "Setelah verb 'thanked', gunakan object pronoun 'us'."],
    ["___ forgot to lock the supply cabinet.", "He", "Him", "His", "Posisi subjek membutuhkan 'He'."],
    ["Can you help ___ carry these archive boxes?", "them", "they", "their", "Setelah verb 'help', gunakan object pronoun 'them'."],
    ["I saw ___ at the central train station.", "you", "your", "yours", "Posisi objek memakai 'you' (bukan possessive 'your')."],
    ["___ open the library at eight sharp.", "We", "Us", "Our", "Posisi subjek memakai 'We'."],
    ["Please give ___ a call before leaving.", "me", "I", "mine", "Object pronoun setelah 'give' adalah 'me'."],
    ["My supervisor invited ___ to the briefing.", "him", "he", "his", "Objek dari 'invited' adalah 'him'."],
    ["___ works smoothly after the software patch.", "It", "Its", "It's", "Subjek benda tunggal memakai subject pronoun 'It'."],
    ["Leave the signed invoices with ___.", "her", "she", "hers", "Setelah preposisi 'with', gunakan object pronoun 'her'."],
    ["___ are waiting near Gate 5.", "They", "Them", "Theirs", "Subjek sebelum 'are' memakai 'They'."],
    ["The tutor praised ___ for clear handwriting.", "us", "we", "ours", "Objek dari 'praised' adalah 'us'."],
    ["Did you email ___ the revised budget?", "them", "they", "theirs", "Indirect object setelah 'email' memakai 'them'."],
    ["___ checked every receipt twice yesterday.", "I", "Me", "My", "Subjek kalimat memerlukan 'I'."],
    ["Wait for ___ outside the main entrance.", "us", "we", "our", "Setelah preposisi 'for', gunakan 'us'."],
    ["___ has a meeting with the client at noon.", "He", "Him", "His", "Subjek sebelum 'has' memakai 'He'."],
    ["The courier handed ___ the sealed parcel.", "me", "I", "mine", "Objek penerima setelah 'handed' memakai 'me'."],
    ["___ need extra chairs for the seminar.", "We", "Us", "Our", "Subjek sebelum 'need' adalah 'We'."],
    ["Could you remind ___ about Friday's deadline?", "her", "she", "hers", "Objek dari 'remind' adalah 'her'."],
    ["I met ___ during last month's workshop.", "him", "he", "his", "Objek dari 'met' adalah 'him'."],
    ["___ contains all safety guidelines.", "It", "Its", "Them", "Subjek benda tunggal adalah 'It'."],
    ["Tell ___ to arrive ten minutes early.", "them", "they", "their", "Objek setelah 'Tell' adalah 'them'."],
    ["___ always brings her own reusable cup.", "She", "Her", "Hers", "Subjek sebelum 'always brings' adalah 'She'."],
    ["The security guard guided ___ to Room 201.", "us", "we", "our", "Objek setelah 'guided' adalah 'us'."],
    ["Please pass ___ the blue marker.", "me", "I", "my", "Indirect object adalah 'me'."],
    ["___ finished the translation ahead of schedule.", "They", "Them", "Their", "Subjek kalimat adalah 'They'."],
  ];

  const choice = pairs.map(([prompt, good, b1, b2, exp]) => ({
    prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Cek apakah rumpang berada di posisi subjek (pelaku) atau objek (setelah verb/preposisi).", "Subject: I/we/they/he/she; Object: me/us/them/him/her."],
    skill: good.match(/^(I|We|They|He|She|It)$/i) ? "pronoun-subject" : "pronoun-object",
  }));

  const dialogue = pairs.slice(0, 20).map(([prompt, good, b1, b2, exp], idx) => ({
    prompt: "Pilih subject atau object pronoun yang tepat.",
    speakerA: idx % 2 === 0 ? "Lia" : "Budi",
    lineA: "How should we handle this update?",
    speakerB: idx % 2 === 0 ? "Budi" : "Lia",
    lineB: prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Lihat apakah kata ganti berada sebelum verb (subject) atau setelah verb/preposisi (object).", "Pilih pronoun sesuai fungsinya."],
    skill: "pronoun-object",
  }));

  const edit = pairs.slice(0, 20).map(([prompt, good, b1, , exp]) => ({
    prompt: "Perbaiki kesalahan subject/object pronoun pada kalimat berikut.",
    draft: prompt.replace("___", b1),
    correct: prompt.replace("___", good),
    distractors: [prompt.replace("___", b1 === "I" ? "my" : b1 === "me" ? "my" : "it"), prompt.replace("___", "one")],
    explanation: exp,
    hints: ["Cek apakah posisi kata ganti adalah pelaku atau penerima/setelah preposisi.", `Ganti "${b1}" menjadi "${good}".`],
    skill: "pronoun-object",
  }));

  const build = [
    ["They sent us the revised travel itinerary.", "Subject (They) + verb + object pronoun (us) + direct object.", "pronoun-object"],
    ["She asked him to print the handouts.", "Subject (She) + verb + object pronoun (him).", "pronoun-object"],
    ["Please give me a call before noon.", "Verb + indirect object pronoun (me).", "pronoun-object"],
    ["We met them near the central library.", "Subject (We) + verb + object pronoun (them).", "pronoun-object"],
    ["He left the signed forms with her.", "Preposisi 'with' diikuti object pronoun 'her'.", "pronoun-object"],
    ["The coordinator invited us to the workshop.", "Verb 'invited' diikuti object pronoun 'us'.", "pronoun-object"],
    ["Can you help me carry these boxes?", "Verb 'help' diikuti object pronoun 'me'.", "pronoun-object"],
    ["I saw him at the station yesterday.", "Subject (I) + verb + object pronoun (him).", "pronoun-object"],
    ["The librarian handed them three reference books.", "Indirect object pronoun 'them' setelah verb.", "pronoun-object"],
    ["Wait for her outside the seminar hall.", "Preposisi 'for' diikuti 'her'.", "pronoun-object"],
    ["She thanked us for our timely feedback.", "Object pronoun 'us' setelah 'thanked'.", "pronoun-object"],
    ["We reminded him about Friday's safety briefing.", "Object pronoun 'him' setelah 'reminded'.", "pronoun-object"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kalimat menggunakan subject dan object pronoun yang tepat.",
    targetSentence,
    explanation: exp,
    hints: ["Letakkan subject pronoun di awal klausa.", "Object pronoun selalu setelah kata kerja atau preposisi."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildPronounsIntermediate() {
  const items = [
    ["That blue notebook on the desk is ___.", "mine", "my", "me", "Possessive pronoun berdiri sendiri tanpa noun -> 'mine'."],
    ["Is this ___ boarding pass or someone else's?", "your", "yours", "you", "Possessive adjective sebelum noun 'boarding pass' -> 'your'."],
    ["Our office is larger than ___.", "theirs", "their", "them", "Membandingkan milik tanpa mengulang noun 'office' -> 'theirs'."],
    ["Each laptop has ___ own charging cable.", "its", "it's", "it", "Possessive adjective untuk benda adalah 'its' (tanpa apostrof!)."],
    ["I cut ___ while opening the cardboard box.", "myself", "me", "mine", "Subjek dan objek orang yang sama ('I') memakai reflexive pronoun 'myself'."],
    ["She taught ___ how to build spreadsheets.", "herself", "her", "hers", "Subjek 'She' melakukan aksi kepada dirinya sendiri -> 'herself'."],
    ["We introduced ___ to the visiting clients.", "ourselves", "us", "our", "Subjek 'We' -> reflexive jamak 'ourselves'."],
    ["The interns organized the whole booth by ___.", "themselves", "theirself", "them", "'by themselves' berarti secara mandiri tanpa bantuan."],
    ["Whose badge is this? Is it ___?", "hers", "her", "she", "Berdiri sendiri di akhir kalimat tanpa noun -> 'hers'."],
    ["He repaired the jammed printer ___.", "himself", "his", "him", "Reflexive penekanan untuk 'He' adalah 'himself'."],
    ["The company updated ___ privacy policy last month.", "its", "it's", "their", "Perusahaan tunggal memakai possessive 'its'."],
    ["Don't blame ___ for the sudden power outage.", "yourself", "you", "your", "Kalimat perintah kepada 'you' -> reflexive 'yourself'."],
    ["These safety helmets are ___, not theirs.", "ours", "our", "us", "Berdiri sendiri tanpa noun -> possessive pronoun 'ours'."],
    ["You must bring ___ own ID card to enter.", "your", "yours", "yourself", "Sebelum 'own ID card', gunakan possessive adjective 'your'."],
    ["Look at the cat; ___ cleaning ___ paws.", "it's / its", "its / it's", "its / its", "'it's' = it is; 'its' = milik (paws)."],
    ["Did all guests enjoy ___ at the reception?", "themselves", "them", "their", "Idiom 'enjoy themselves' untuk subjek jamak 'guests'."],
    ["The decision is entirely ___ to make.", "yours", "your", "you", "Berdiri sendiri setelah 'is' -> 'yours'."],
    ["He forgot ___ umbrella inside the taxi.", "his", "him", "himself", "Sebelum noun 'umbrella', gunakan possessive adjective 'his'."],
    ["Make ___ comfortable while waiting for the doctor.", "yourself", "you", "yours", "Idiom 'make yourself comfortable'."],
    ["The machine turns ___ off after ten minutes.", "itself", "it", "its", "Subjek benda tunggal melakukan aksi pada dirinya -> 'itself'."],
    ["I am sure this folder is not ___; mine is green.", "hers", "her", "she", "Berdiri sendiri tanpa noun -> 'hers'."],
    ["We brought ___ laptops to the seminar.", "our", "ours", "us", "Sebelum noun 'laptops', gunakan 'our'."],
    ["Please remind ___ to double-check our figures.", "ourselves", "us", "our", "Jika subjek 'we' (imperative/refleksif) atau gunakan konteks 'Let us remind ourselves'."],
    ["They built that prototype completely by ___.", "themselves", "themself", "them", "'Themself' tidak baku; bentuk jamak yang benar adalah 'themselves'."],
    ["My report is longer than ___.", "his", "him", "he", "Possessive pronoun untuk 'he' adalah 'his' (miliknya)."],
    ["Always lock ___ locker before going to lunch.", "your", "yours", "you", "Sebelum noun 'locker', gunakan 'your'."],
    ["The director ___ signed every certificate.", "herself", "her", "hers", "Intensive pronoun menegaskan subjek 'The director' -> 'herself' (atau himself)."],
    ["That desk in the corner is ___.", "mine", "my", "me", "Berdiri sendiri di akhir kalimat -> 'mine'."],
    ["Students should challenge ___ with harder tasks.", "themselves", "them", "their", "Subjek jamak 'Students' -> 'themselves'."],
    ["A friend of ___ works at the central bank.", "mine", "my", "me", "Double possessive: 'a friend of mine/yours/hers'."],
  ];
  items[22] = ["Let us remind ___ to back up the files daily.", "ourselves", "us", "our", "Objek refleksif dari 'us' adalah 'ourselves'."];

  const choice = items.map(([prompt, good, b1, b2, exp]) => ({
    prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Bedakan possessive adjective (+ noun) vs possessive pronoun (tanpa noun).", "Gunakan reflexive (-self/-selves) bila subjek dan objek sama."],
    skill: "pronoun-object",
  }));

  const dialogue = items.slice(0, 20).map(([prompt, good, b1, b2, exp], idx) => ({
    prompt: "Pilih possessive atau reflexive pronoun yang tepat dalam dialog.",
    speakerA: idx % 2 === 0 ? "Colleague" : "Mentor",
    lineA: "Let me double-check whose item or responsibility this is.",
    speakerB: idx % 2 === 0 ? "Mentor" : "Colleague",
    lineB: prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Perhatikan apakah ada noun setelah rumpang.", "Hati-hati membedakan 'its' (milik) dan 'it's' (it is)."],
    skill: "pronoun-object",
  }));

  const edit = [
    ["This blue folder is my, not yours.", "This blue folder is mine, not yours.", "This blue folder is me, not yours.", "Tanpa noun di belakangnya, gunakan possessive pronoun 'mine'."],
    ["The dog hurt it's paw on the gravel.", "The dog hurt its paw on the gravel.", "The dog hurt itselfs paw on the gravel.", "'its' tanpa apostrof adalah bentuk kepemilikan."],
    ["They completed the setup by theirselves.", "They completed the setup by themselves.", "They completed the setup by themself.", "Bentuk baku reflexive jamak adalah 'themselves'."],
    ["He fixed the broken shelf by hisself.", "He fixed the broken shelf by himself.", "He fixed the broken shelf by him.", "'Hisself' tidak baku; gunakan 'himself'."],
    ["Our proposal is stronger than their.", "Our proposal is stronger than theirs.", "Our proposal is stronger than them.", "Bandingkan dua milik tanpa mengulang noun -> 'theirs'."],
    ["She introduced her to the new interns.", "She introduced herself to the new interns.", "She introduced hers to the new interns.", "Subjek 'She' memperkenalkan dirinya sendiri -> 'herself'."],
    ["A colleague of my recommended this tool.", "A colleague of mine recommended this tool.", "A colleague of me recommended this tool.", "Pola baku: 'a colleague of mine'."],
    ["These safety glasses are our.", "These safety glasses are ours.", "These safety glasses are us.", "Di akhir kalimat tanpa noun, gunakan 'ours'."],
    ["Did you prepare this meal by you?", "Did you prepare this meal by yourself?", "Did you prepare this meal by yours?", "Makna 'sendirian/tanpa bantuan' memakai 'by yourself'."],
    ["The printer turns it off automatically.", "The printer turns itself off automatically.", "The printer turns its off automatically.", "Subjek 'The printer' mematikan dirinya sendiri -> 'itself'."],
    ["Is that tablet your or Maya's?", "Is that tablet yours or Maya's?", "Is that tablet you or Maya's?", "Tanpa noun setelahnya, gunakan 'yours'."],
    ["We should prepare us for the audit.", "We should prepare ourselves for the audit.", "We should prepare our for the audit.", "Subjek 'We' mempersiapkan diri sendiri -> 'ourselves'."],
    ["Its important to verify every invoice.", "It's important to verify every invoice.", "Its' important to verify every invoice.", "'It's' = It is (singkatan subjek + to be)."],
    ["The interns blamed them for the delay.", "The interns blamed themselves for the delay.", "The interns blamed theirselves for the delay.", "Menyalahkan diri sendiri memakai 'themselves'."],
    ["Whose notebook is this? It is her.", "Whose notebook is this? It is hers.", "Whose notebook is this? It is she.", "Possessive pronoun tanpa noun -> 'hers'."],
    ["He gave me him old transit card.", "He gave me his old transit card.", "He gave me himself old transit card.", "Sebelum noun phrase 'old transit card', gunakan 'his'."],
    ["We enjoyed us at the company picnic.", "We enjoyed ourselves at the company picnic.", "We enjoyed our at the company picnic.", "Idiom 'enjoy oneself' untuk 'We' adalah 'enjoyed ourselves'."],
    ["That seat near the window is mines.", "That seat near the window is mine.", "That seat near the window is my.", "'Mine' tidak pernah ditambah -s."],
    ["Every department has it's own budget.", "Every department has its own budget.", "Every department has itself own budget.", "Kepemilikan benda tunggal memakai 'its'."],
    ["You can pour you some fresh coffee.", "You can pour yourself some fresh coffee.", "You can pour yours some fresh coffee.", "Menuangkan untuk diri sendiri memakai 'yourself'."],
  ].map(([draft, correct, bad, exp]) => ({
    prompt: "Perbaiki kesalahan possessive atau reflexive pronoun berikut.",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Cek bentuk baku reflexive (-self/-selves) dan 'its' vs 'it's'.", "Tanpa noun di belakang, pakai mine/yours/hers/ours/theirs."],
    skill: "pronoun-object",
  }));

  const build = [
    ["The interns organized the whole booth by themselves.", "'by themselves' berarti secara mandiri.", "pronoun-object"],
    ["Every laptop has its own protective sleeve.", "Possessive 'its' tanpa apostrof.", "pronoun-object"],
    ["Our final proposal is clearer than theirs.", "Possessive pronoun 'theirs' tanpa mengulang noun.", "pronoun-object"],
    ["She taught herself how to analyze spreadsheets.", "Reflexive 'herself' untuk subjek 'She'.", "pronoun-object"],
    ["A friend of mine works at that clinic.", "Pola 'a friend of mine'.", "pronoun-object"],
    ["This blue security badge is definitely yours.", "Possessive pronoun 'yours' di akhir kalimat.", "pronoun-object"],
    ["The printer shuts itself down after midnight.", "Reflexive 'itself' untuk benda tunggal.", "pronoun-object"],
    ["We introduced ourselves to the visiting mentors.", "Reflexive jamak 'ourselves' untuk 'We'.", "pronoun-object"],
    ["Make yourself comfortable while waiting for boarding.", "Idiom 'Make yourself comfortable'.", "pronoun-object"],
    ["That corner desk is mine, not his.", "Possessive pronouns 'mine' dan 'his'.", "pronoun-object"],
    ["The director herself signed every training certificate.", "Intensive pronoun 'herself' untuk penekanan.", "pronoun-object"],
    ["Don't blame yourself for the network outage.", "Reflexive 'yourself' pada kalimat imperatif.", "pronoun-object"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kalimat menggunakan possessive atau reflexive pronoun yang tepat.",
    targetSentence,
    explanation: exp,
    hints: ["Pastikan tidak menulis 'its' dengan apostrof untuk kepemilikan.", "Gunakan -self/-selves jika pelaku dan penerima sama."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

function buildPronounsComplex() {
  const items = [
    ["Between you and ___, the deadline looks unrealistic.", "me", "I", "myself", "Setelah preposisi 'Between', kedua objek memakai object pronoun -> 'me'."],
    ["My colleague and ___ will present the prototype tomorrow.", "I", "me", "myself", "Posisi subjek majemuk sebelum verb 'will present' memakai 'I'."],
    ["Everyone must bring ___ own laptop to the lab.", "their", "him", "them", "Untuk indefinite singular umum ('Everyone') dalam bahasa Inggris modern/IELTS, gunakan gender-neutral 'their'."],
    ["___ did the committee select for the scholarship?", "Whom", "Who", "Whose", "Dalam ragam formal sebagai objek ('select whom'), gunakan 'Whom'."],
    ["___ submitted the cleanest architectural draft?", "Who", "Whom", "Whose", "Posisi subjek kata kerja 'submitted' memakai 'Who'."],
    ["The manager asked both Maya and ___ to stay.", "me", "I", "myself", "Posisi objek dari 'asked' memakai 'me' (jangan pakai 'myself' sebagai pengganti 'me')."],
    ["It was ___ who spotted the accounting error.", "she", "her", "hers", "Dalam ragam formal setelah 'It was ... who', gunakan subject form 'she' (atau dalam informal 'her')."],
    ["Nobody left ___ badge at reception yesterday.", "their", "him", "them", "Indefinite pronoun 'Nobody' mengambil possessive netral 'their'."],
    ["One should always back up ___ research files.", "one's", "their's", "your's", "Jika subjeknya 'One' secara konsisten, bentuk kepemilikan formal adalah 'one's'."],
    ["The two departments regularly share data with ___.", "each other", "themselves", "them", "Hubungan timbal balik antar pihak memakai reciprocal pronoun 'each other'."],
    ["All three teams congratulated ___ after the launch.", "one another", "itself", "them", "Aksi timbal balik di antara lebih dari dua pihak memakai 'one another' / 'each other'."],
    ["To ___ should we address the formal complaint?", "whom", "who", "whose", "Setelah preposisi 'To', bentuk objek formal wajib 'whom'."],
    ["___ smartphone is ringing inside the seminar hall?", "Whose", "Who's", "Whom", "Menanyakan kepemilikan sebelum noun 'smartphone' memakai 'Whose'."],
    ["___ responsible for locking the main archive?", "Who's", "Whose", "Whom", "'Who's' adalah singkatan dari 'Who is'."],
    ["Please forward the contract to either David or ___.", "me", "I", "myself", "Setelah preposisi 'to', gunakan object pronoun 'me'."],
    ["Neither of the interns brought ___ security pass.", "their", "they", "them", "'Neither of ...' diikuti possessive netral 'their' (atau 'his/her' formal)."],
    ["The award was divided equally among ___.", "us", "we", "ourselves", "Setelah preposisi 'among', gunakan object pronoun 'us'."],
    ["Someone forgot ___ umbrella near Counter 2.", "their", "them", "they", "Possessive untuk 'Someone' memakai 'their' sebelum noun 'umbrella'."],
    ["Just between you and ___, sales rose faster.", "me", "I", "myself", "Preposisi 'between' selalu diikuti object pronoun ('you and me')."],
    ["She is taller than ___ am.", "I", "me", "myself", "Sebelum kata kerja 'am', wajib menggunakan subject pronoun 'I'."],
    ["Both the intern and ___ checked the figures.", "I", "me", "my", "Posisi subjek majemuk sebelum 'checked' memakai 'I'."],
    ["The client wrote directly to my supervisor and ___.", "me", "I", "myself", "Setelah preposisi 'to', gunakan object pronoun 'me'."],
    ["___ do you think will lead the next audit?", "Who", "Whom", "Whose", "'Who' adalah subjek bagi 'will lead' (sisipan 'do you think' tidak mengubah kasus subjek)."],
    ["The candidate ___ we interviewed yesterday accepted.", "whom", "whose", "which", "Relative pronoun sebagai objek dari 'we interviewed' dalam ragam formal memakai 'whom'."],
    ["Every participant received ___ certificate via email.", "their", "they", "them", "Possessive sebelum noun 'certificate' -> 'their'."],
    ["This is the colleague ___ laptop stopped working.", "whose", "who's", "whom", "Menunjukkan kepemilikan ('whose laptop') -> 'whose'."],
    ["We rely on ___ to verify daily lab logs.", "them", "they", "themselves", "Setelah preposisi 'on', gunakan object pronoun 'them'."],
    ["She runs faster than ___ does.", "he", "him", "himself", "Sebelum auxiliary 'does', subjeknya adalah 'he'."],
    ["Anyone wishing to attend must register ___ name.", "their", "them", "they", "Sebelum noun 'name', possessive untuk 'Anyone' memakai 'their'."],
    ["Please send replies to Sarah or ___ by Friday.", "me", "I", "myself", "Setelah preposisi 'to', gunakan 'me'."],
  ];

  const choice = items.map(([prompt, good, b1, b2, exp]) => ({
    prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Hapus nama orang pertama untuk menguji pronoun kedua (mis. 'asked [Maya and] me').", "Setelah preposisi (between/to/for/with), selalu pakai object pronoun."],
    skill: "pronoun-object",
  }));

  const dialogue = items.slice(0, 20).map(([prompt, good, b1, b2, exp], idx) => ({
    prompt: "Pilih pronoun baku yang tepat dalam komunikasi formal/akademik.",
    speakerA: idx % 2 === 0 ? "Auditor" : "Coordinator",
    lineA: "Can we clarify the wording in this memo?",
    speakerB: idx % 2 === 0 ? "Coordinator" : "Auditor",
    lineB: prompt,
    correct: good,
    distractors: [b1, b2],
    explanation: exp,
    hints: ["Periksa apakah kata ganti berfungsi sebagai subjek, objek preposisi, atau kepemilikan.", "Jangan memakai 'myself' jika bukan refleksif."],
    skill: "pronoun-object",
  }));

  const edit = [
    ["Between you and I, this timeline is tight.", "Between you and me, this timeline is tight.", "Between you and myself, this timeline is tight.", "Preposisi 'Between' selalu diikuti object pronoun 'me'."],
    ["My colleague and me drafted the audit memo.", "My colleague and I drafted the audit memo.", "My colleague and myself drafted the audit memo.", "Posisi subjek majemuk memakai 'I'."],
    ["Please send the files to Maya or myself.", "Please send the files to Maya or me.", "Please send the files to Maya or I.", "Setelah preposisi 'to', gunakan 'me', bukan 'myself'."],
    ["Who's luggage is waiting near Gate 4?", "Whose luggage is waiting near Gate 4?", "Whom luggage is waiting near Gate 4?", "Menanyakan kepemilikan memakai 'Whose', bukan 'Who's' (who is)."],
    ["To who did you forward the signed contract?", "To whom did you forward the signed contract?", "To whose did you forward the signed contract?", "Setelah preposisi 'To', gunakan bentuk objek 'whom'."],
    ["Him and his partner launched a small studio.", "He and his partner launched a small studio.", "Himself and his partner launched a small studio.", "Posisi subjek kalimat memakai 'He'."],
    ["The manager praised John and I for accuracy.", "The manager praised John and me for accuracy.", "The manager praised John and myself for accuracy.", "Objek dari 'praised' memakai 'me'."],
    ["Neither of the reports had their cover page.", "Neither of the reports had its cover page.", "Neither of the reports had it's cover page.", "Untuk benda tunggal ('Neither of the reports'), gunakan 'its'."],
    ["Whose going to chair tomorrow's seminar?", "Who's going to chair tomorrow's seminar?", "Whom going to chair tomorrow's seminar?", "Makna 'Who is going' disingkat menjadi 'Who's'."],
    ["The two teams compete against themselves weekly.", "The two teams compete against each other weekly.", "The two teams compete against theirselves weekly.", "Aksi timbal balik antar dua pihak memakai 'each other'."],
    ["She speaks faster than me do.", "She speaks faster than I do.", "She speaks faster than myself do.", "Sebelum kata kerja 'do', gunakan subjek 'I'."],
    ["Give the extra keys to whoever needs it.", "Give the extra keys to whoever needs them.", "Give the extra keys to whomever needs it.", "'keys' bersifat jamak sehingga dirujuk dengan 'them'."],
    ["One should protect your password carefully.", "One should protect one's password carefully.", "One should protect you password carefully.", "Jaga konsistensi pronoun 'One ... one's'."],
    ["Did you invite Sarah and I to lunch?", "Did you invite Sarah and me to lunch?", "Did you invite Sarah and myself to lunch?", "Objek dari 'invite' adalah 'me'."],
    ["Me and my team completed the inventory early.", "My team and I completed the inventory early.", "My team and me completed the inventory early.", "Posisi subjek memakai 'I' dan sopan diletakkan kedua."],
    ["Every trainee brought his or her's notebook.", "Every trainee brought their notebook.", "Every trainee brought themself notebook.", "'her's' tidak ada; gunakan 'their' atau 'his or her'."],
    ["Whom is responsible for the backup server?", "Who is responsible for the backup server?", "Whose is responsible for the backup server?", "Posisi subjek pertanyaan memakai 'Who'."],
    ["The award belongs to we who worked overtime.", "The award belongs to us who worked overtime.", "The award belongs to our who worked overtime.", "Setelah preposisi 'to', gunakan object pronoun 'us'."],
    ["That is the researcher who's paper won.", "That is the researcher whose paper won.", "That is the researcher whom paper won.", "Kepemilikan sebelum noun 'paper' memakai 'whose'."],
    ["Please ask both him and I before editing.", "Please ask both him and me before editing.", "Please ask both he and I before editing.", "Setelah verb 'ask', kedua objek memakai bentuk objek ('him and me')."],
  ].map(([draft, correct, bad, exp]) => ({
    prompt: "Sunting kesalahan penggunaan pronoun majemuk, kasus objek, atau kepemilikan formal berikut.",
    draft,
    correct,
    distractors: [bad, draft],
    explanation: exp,
    hints: ["Uji klausa majemuk dengan menghilangkan salah satu nama.", "Bedakan whose (milik) vs who's (who is) dan who vs whom."],
    skill: "pronoun-object",
  }));

  const build = [
    ["Between you and me, the deadline seems tight.", "Preposisi 'Between' diikuti object pronouns 'you and me'.", "pronoun-object"],
    ["My colleague and I presented the final prototype.", "Subjek majemuk memakai 'I'.", "pronoun-subject"],
    ["To whom should we address this formal inquiry?", "Preposisi 'To' + object pronoun formal 'whom'.", "pronoun-object"],
    ["The two departments share research data with each other.", "Reciprocal pronoun 'each other'.", "pronoun-object"],
    ["Please forward the agenda to Maya or me.", "Setelah preposisi 'to' gunakan 'me'.", "pronoun-object"],
    ["Whose laptop was left inside Seminar Room 3?", "Kepemilikan sebelum noun memakai 'Whose'.", "pronoun-object"],
    ["Everyone must submit their signed form by Friday.", "Possessive netral 'their' untuk 'Everyone'.", "pronoun-object"],
    ["That is the analyst whose chart clarified everything.", "Relative possessive 'whose'.", "pronoun-object"],
    ["The supervisor thanked both David and me warmly.", "Objek majemuk memakai 'me'.", "pronoun-object"],
    ["Who do you think will lead the briefing?", "Subjek klausa 'will lead' memakai 'Who'.", "pronoun-subject"],
    ["One should verify one's references before submitting essays.", "Konsistensi subjek formal 'One ... one's'.", "pronoun-object"],
    ["She speaks slightly faster than I usually do.", "Subjek klausa pembanding memakai 'I'.", "pronoun-subject"],
  ].map(([targetSentence, exp, skill]) => ({
    prompt: "Susun kalimat formal berikut dengan pilihan pronoun yang tepat.",
    targetSentence,
    explanation: exp,
    hints: ["Gunakan 'I' untuk subjek dan 'me' setelah verb/preposisi.", "Gunakan 'whose' untuk kepemilikan dan 'whom' setelah preposisi."],
    skill,
  }));

  return expandFromPatterns({ choice, dialogue, edit, build });
}

const MODULES = [
  ["00-foundation/01-parts-of-speech", { simple: buildPosSimple, intermediate: buildPosIntermediate, complex: buildPosComplex }],
  ["00-foundation/02-sentence-svo", { simple: buildSvoSimple, intermediate: buildSvoIntermediate, complex: buildSvoComplex }],
  ["00-foundation/03-to-be", { simple: buildToBeSimple, intermediate: buildToBeIntermediate, complex: buildToBeComplex }],
  ["00-foundation/04-articles", { simple: buildArticlesSimple, intermediate: buildArticlesIntermediate, complex: buildArticlesComplex }],
  ["00-foundation/05-nouns-plural", { simple: buildNounsPluralSimple, intermediate: buildNounsPluralIntermediate, complex: buildNounsPluralComplex }],
  ["00-foundation/06-pronouns", { simple: buildPronounsSimple, intermediate: buildPronounsIntermediate, complex: buildPronounsComplex }],
];

for (const [key, builders] of MODULES) {
  const rep = updateModulePack(key, builders, 100);
  console.log(key, rep);
}
