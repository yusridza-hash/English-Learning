import React, { useState } from "react";
import { CURRICULUM } from "../data/curriculum";
import {
  applyQuestionPackToBank,
  DISCOVERED_PACK_FILES,
  QUESTION_BANK,
} from "../data/questionBank";
import {
  clearCustomQuestionPacks,
  generateAIPromptForModule,
  getCustomQuestionPacks,
  saveCustomQuestionPack,
  validateAndNormalizeQuestionPack,
} from "../data/questionPackSchema";

interface AIQuestionPackStudioProps {
  selectedModuleKey: string;
  onPackImported: (targetModuleKey: string) => void;
}

export const AIQuestionPackStudio: React.FC<AIQuestionPackStudioProps> = ({
  selectedModuleKey,
  onPackImported,
}) => {
  const allModules = CURRICULUM.flatMap((lvl) =>
    lvl.modules.map(([mod, title]) => ({
      key: `${lvl.id}/${mod}`,
      title,
      label: `${lvl.id}/${mod} — ${title}`,
    }))
  );

  const [targetModule, setTargetModule] = useState<string>(
    selectedModuleKey || allModules[0]?.key || "00-foundation/07-present-simple"
  );
  const [countPerLevel, setCountPerLevel] = useState<number>(5);
  const [jsonInput, setJsonInput] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [customPacksCount, setCustomPacksCount] = useState<number>(
    () => getCustomQuestionPacks().length
  );

  const selectedModInfo =
    allModules.find((m) => m.key === targetModule) || {
      key: targetModule,
      title: QUESTION_BANK[targetModule]?.title || targetModule,
      label: targetModule,
    };

  const handleCopyPrompt = async () => {
    const promptText = generateAIPromptForModule(
      selectedModInfo.key,
      selectedModInfo.title,
      countPerLevel
    );
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedPrompt(true);
      setStatusMessage({
        ok: true,
        text: `Prompt AI untuk "${selectedModInfo.title}" berhasil disalin! Tempel (paste) ke ChatGPT, Claude, atau Gemini, lalu tempel hasil JSON-nya di bawah.`,
      });
      setTimeout(() => setCopiedPrompt(false), 3000);
    } catch {
      setJsonInput(promptText);
      setStatusMessage({
        ok: true,
        text: "Prompt ditampilkan di kotak teks di bawah. Salin dan berikan ke AI mana pun.",
      });
    }
  };

  const handleLoadTemplate = () => {
    const sample = {
      moduleKey: selectedModInfo.key,
      title: selectedModInfo.title,
      mode: "append",
      levels: {
        simple: [
          {
            type: "choice",
            prompt: `Contoh soal Simple (${selectedModInfo.title}): She ___ every weekday.`,
            options: ["works", "work", "working"],
            answer: 0,
            explanation: "Subject tunggal memakai verb + s.",
            hints: ["Periksa subject kalimat.", "Pilih bentuk untuk she/he/it."],
          },
          {
            type: "build",
            prompt: "Susun kata berikut menjadi kalimat yang benar.",
            targetSentence: "They review the schedule every Monday.",
            explanation: "Urutan SVO + keterangan waktu.",
            hints: ["Mulai dengan subject They.", "Letakkan keterangan waktu di akhir."],
          },
        ],
        intermediate: [],
        complex: [],
      },
    };
    setJsonInput(JSON.stringify(sample, null, 2));
    setStatusMessage(null);
  };

  const handleValidateAndImport = () => {
    const trimmed = jsonInput.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    if (!trimmed) {
      setStatusMessage({
        ok: false,
        text: "Tempelkan JSON Question Pack dari AI terlebih dahulu.",
      });
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      setStatusMessage({
        ok: false,
        text: "Format JSON tidak valid. Pastikan kurung kurawal { ... } lengkap dan tanda kutip benar.",
      });
      return;
    }

    const validation = validateAndNormalizeQuestionPack(parsed);
    if (!validation.ok || !validation.pack) {
      setStatusMessage({
        ok: false,
        text: validation.error || "Gagal memvalidasi Question Pack.",
      });
      return;
    }

    const result = applyQuestionPackToBank(validation.pack);
    if (!result.ok || !result.moduleKey) {
      setStatusMessage({
        ok: false,
        text: result.error || "Gagal menggabungkan Question Pack.",
      });
      return;
    }

    saveCustomQuestionPack(validation.pack);
    setCustomPacksCount(getCustomQuestionPacks().length);
    setStatusMessage({
      ok: true,
      text: `Berhasil! ${result.addedCount} soal baru ditambahkan ke modul "${result.moduleKey}"${
        validation.error ? ` (${validation.error})` : ""
      }. Soal langsung aktif di Pop-up Kuis dan Bank Soal.`,
    });
    onPackImported(result.moduleKey);
  };

  const handleDownloadPackFile = () => {
    const trimmed = jsonInput.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    if (!trimmed) {
      setStatusMessage({
        ok: false,
        text: "Kotak JSON masih kosong. Klik 'Muat Contoh Template' atau tempel hasil AI terlebih dahulu.",
      });
      return;
    }
    try {
      const parsed = JSON.parse(trimmed);
      const validation = validateAndNormalizeQuestionPack(parsed);
      if (!validation.ok || !validation.pack) {
        setStatusMessage({
          ok: false,
          text: validation.error || "JSON belum valid.",
        });
        return;
      }
      const fileSlug = validation.pack.moduleKey.replace(/\//g, "--");
      const blob = new Blob([JSON.stringify(validation.pack, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileSlug}.pack.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMessage({
        ok: true,
        text: `File "${fileSlug}.pack.json" diunduh. Taruh file ini di folder src/data/question-packs/ agar otomatis termuat permanen di repositori!`,
      });
    } catch {
      setStatusMessage({
        ok: false,
        text: "Format JSON belum valid untuk diunduh.",
      });
    }
  };

  const handleClearCustomPacks = () => {
    clearCustomQuestionPacks();
    setCustomPacksCount(0);
    setStatusMessage({
      ok: true,
      text: "Pack kustom di penyimpanan browser dihapus. Muat ulang halaman untuk kembali ke pack bawaan.",
    });
  };

  return (
    <details className="ai-pack-studio" open>
      <summary>
        <span>AI Question Pack Studio · Modular Loader (Untuk Semua AI)</span>
      </summary>

      <div className="ai-pack-studio-body">
        <p style={{ fontSize: ".9rem", color: "var(--muted)", marginBottom: ".85rem" }}>
          Sistem Bank Soal ini mendukung penambahan soal secara modular melalui <b>2 jalur</b>:{" "}
          (1) Menaruh file <code>.pack.json</code> / <code>.pack.ts</code> di folder{" "}
          <code>src/data/question-packs/</code> (otomatis terbaca tanpa registrasi manual), atau{" "}
          (2) Menyalin prompt di bawah ke AI mana pun (ChatGPT, Claude, Gemini, Copilot) lalu
          menempelkan hasil JSON-nya langsung di sini.
        </p>

        {/* Auto-discovered repo packs summary */}
        <div className="ai-pack-meta-bar">
          <span>
            <b>File Pack Modular di Repo:</b> {DISCOVERED_PACK_FILES.length} file aktif (
            {DISCOVERED_PACK_FILES.map((f) => f.moduleKey).join(", ") || "—"})
          </span>
          <span>
            <b>Pack Tambahan di Browser:</b> {customPacksCount} pack
          </span>
        </div>

        {/* Step 1: Copy AI Prompt */}
        <div className="ai-pack-controls">
          <div style={{ flex: 1, minWidth: "220px" }}>
            <label
              htmlFor="aiTargetModule"
              style={{ display: "block", fontFamily: "var(--mono)", fontSize: ".72rem", marginBottom: ".25rem" }}
            >
              1. Pilih Modul Target:
            </label>
            <select
              id="aiTargetModule"
              className="filter-level-select"
              style={{ width: "100%" }}
              value={targetModule}
              onChange={(e) => setTargetModule(e.target.value)}
            >
              {allModules.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="aiCountPerLevel"
              style={{ display: "block", fontFamily: "var(--mono)", fontSize: ".72rem", marginBottom: ".25rem" }}
            >
              Soal / Level:
            </label>
            <select
              id="aiCountPerLevel"
              className="filter-level-select"
              value={countPerLevel}
              onChange={(e) => setCountPerLevel(Number(e.target.value))}
            >
              <option value={3}>3 soal / level (9 total)</option>
              <option value={5}>5 soal / level (15 total)</option>
              <option value={10}>10 soal / level (30 total)</option>
            </select>
          </div>

          <div className="toolbar-actions" style={{ alignSelf: "flex-end" }}>
            <button
              type="button"
              className="check-quiz"
              style={{ marginTop: 0 }}
              onClick={handleCopyPrompt}
            >
              {copiedPrompt ? "✓ Prompt Tersalin!" : "📋 Salin Prompt untuk AI"}
            </button>
            <button
              type="button"
              className="filter-pill"
              onClick={handleLoadTemplate}
            >
              Muat Contoh Template JSON
            </button>
          </div>
        </div>

        {/* Step 2: Paste & Validate JSON */}
        <div style={{ marginTop: ".85rem" }}>
          <label
            htmlFor="aiJsonTextarea"
            style={{ display: "block", fontFamily: "var(--mono)", fontSize: ".72rem", marginBottom: ".3rem" }}
          >
            2. Tempel (Paste) JSON Question Pack Hasil AI di Sini:
          </label>
          <textarea
            id="aiJsonTextarea"
            className="ai-pack-textarea"
            rows={8}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`{\n  "moduleKey": "${selectedModInfo.key}",\n  "mode": "append",\n  "levels": {\n    "simple": [ ... ],\n    "intermediate": [ ... ],\n    "complex": [ ... ]\n  }\n}`}
          />
        </div>

        <div className="toolbar-actions" style={{ marginTop: ".65rem" }}>
          <button
            type="button"
            className="check-quiz"
            style={{ marginTop: 0 }}
            onClick={handleValidateAndImport}
          >
            ✓ Validasi &amp; Tambahkan ke Bank Soal
          </button>
          <button
            type="button"
            className="filter-pill"
            onClick={handleDownloadPackFile}
          >
            ↓ Unduh File .pack.json (Untuk Repo)
          </button>
          {customPacksCount > 0 && (
            <button
              type="button"
              className="guided-reset"
              onClick={handleClearCustomPacks}
            >
              Reset Pack Browser ({customPacksCount})
            </button>
          )}
        </div>

        {statusMessage && (
          <p
            className="guided-overall"
            data-state={statusMessage.ok ? "pass" : "retry"}
            role="status"
          >
            {statusMessage.text}
          </p>
        )}
      </div>
    </details>
  );
};
