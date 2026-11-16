# Modular Question Packs Guide (For All AI Agents & Contributors)

Folder ini (`/src/data/question-packs/`) menggunakan **Auto-Discovery (`import.meta.glob`)**.
Setiap file `.json` atau `.ts` yang ditaruh di dalam folder ini (atau subfoldernya) akan **otomatis terbaca, divalidasi, dan digabungkan** ke dalam `QUESTION_BANK` tanpa perlu mengubah file registrasi mana pun.

## Cara 1: Menambahkan File JSON Murni (`.pack.json`) — Paling Mudah untuk Semua AI

Buat file baru dengan nama bebas di dalam `/src/data/question-packs/`, misalnya:
`/src/data/question-packs/01-elementary/01-past-simple.pack.json`

```json
{
  "moduleKey": "01-elementary/01-past-simple",
  "title": "Past Simple",
  "mode": "append",
  "levels": {
    "simple": [
      {
        "type": "choice",
        "prompt": "They ___ the client meeting yesterday afternoon.",
        "options": ["attended", "attend", "attending"],
        "answer": 0,
        "explanation": "Yesterday afternoon menandai waktu lampau yang selesai, gunakan V2 attended.",
        "hints": ["Perhatikan penanda waktu yesterday afternoon.", "Gunakan bentuk lampau (V2)."],
        "skill": "past-simple-form"
      },
      {
        "type": "build",
        "prompt": "Susun kata menjadi kalimat Past Simple yang benar.",
        "targetSentence": "We submitted the final report last night.",
        "explanation": "Kalimat positif Past Simple: Subject + V2 (submitted) + Object + keterangan waktu.",
        "hints": ["Mulai dengan subject We.", "Letakkan keterangan waktu last night di akhir."]
      }
    ],
    "intermediate": [],
    "complex": []
  }
}
```

> **Tips Khusus Soal Tipe `"build"`**:
> AI tidak perlu menghitung indeks array token secara manual! Cukup tulis `"type": "build"` dan `"targetSentence": "Kalimat bahasa Inggris yang benar."`, maka sistem otomatis memecah kata, mengacak bank kata, dan membuat kunci jawaban indeksnya secara presisi.

---

## Cara 2: Menambahkan File TypeScript (`.pack.ts`) dengan Helper

Gunakan helper `defineQuestionPack`, `qChoice`, `qDialogue`, `qEdit`, dan `qBuild` dari `../questionPackSchema`:

```ts
import { defineQuestionPack, qChoice, qDialogue, qEdit, qBuild } from "../questionPackSchema";

export default defineQuestionPack({
  moduleKey: "02-intermediate/04-passive-basic",
  mode: "append",
  levels: {
    simple: [
      qChoice(
        "All incoming packages ___ at the security desk.",
        ["inspect", "are inspected", "inspected"],
        1,
        "Packages menerima tindakan (pasif rutin): are + V3 (inspected)."
      ),
      qBuild(
        "Susun kalimat pasif berikut.",
        "The report was written by the analyst.",
        "Past Simple Passive: was/were + V3 + by agent."
      )
    ]
  }
});
```

---

## Cara 3: Import Langsung Lewat UI Aplikasi (`Word Bank` -> `AI Question Pack Studio`)

1. Buka menu **Word Bank** di navigasi atas aplikasi.
2. Buka panel **AI Question Pack Studio (Modular Loader)**.
3. Pilih modul dan klik **`📋 Salin Prompt AI`** untuk menyalin prompt siap pakai ke ChatGPT / Claude / Gemini.
4. Tempel (*paste*) hasil JSON dari AI ke kotak input lalu klik **`✓ Validasi & Tambahkan ke Bank Soal`**.
