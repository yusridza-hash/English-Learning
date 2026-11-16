import React, { useEffect, useMemo, useRef, useState } from "react";
import { CURRICULUM } from "../data/curriculum";
import { ensureModuleLoaded, QUESTION_BANK } from "../data/questionBank";
import {
  clearCustomQuestionPacks,
  deleteCustomPack,
  getCustomQuestionPacks,
  QuestionPack,
  saveCustomQuestionPack,
  StoredCustomPack,
  toggleCustomPackActive,
} from "../data/questionPackSchema";
import {
  exportAllData,
  importAllData,
  resetAllProgress,
} from "../utils/storage";
import { OfflineIndicator, PWAInstallButton } from "./PWAControls";
import { SidebarToggleButton } from "./SidebarControls";
import { ThemeToggle } from "./ThemeToggle";
import { ViewportToggle } from "./ViewportToggle";

interface QuestionBankManagementViewProps {
  onNavigate: (path: string) => void;
}

const DISABLED_MODULES_KEY = "el_disabled_modules";

function getDisabledModules(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(DISABLED_MODULES_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveDisabledModules(map: Record<string, boolean>): void {
  localStorage.setItem(DISABLED_MODULES_KEY, JSON.stringify(map));
}

export const QuestionBankManagementView: React.FC<QuestionBankManagementViewProps> = ({
  onNavigate,
}) => {
  const [disabledMap, setDisabledMap] = useState<Record<string, boolean>>(() => getDisabledModules());
  const [selectedModuleKey, setSelectedModuleKey] = useState<string>("00-foundation/07-present-simple");
  const [customPacks, setCustomPacks] = useState<StoredCustomPack[]>(() => getCustomQuestionPacks());
  const [statusMessage, setStatusMessage] = useState<{ ok: boolean; text: string } | null>(null);
  
  // Backup & Reset state
  const [backupMessage, setBackupMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const backupInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.body.dataset.module = "question-bank";
    document.title = "Question Bank Management — English Learning";
  }, []);

  const allModuleKeys = useMemo(() => Object.keys(QUESTION_BANK), []);

  const refreshPacks = () => {
    setCustomPacks(getCustomQuestionPacks());
  };

  // Curriculum Group Toggling
  const handleToggleLevel = (levelId: string, forceStatus?: boolean) => {
    const level = CURRICULUM.find(l => l.id === levelId);
    if (!level) return;

    const next = { ...disabledMap };
    const currentLevelModules = level.modules.map(([m]) => `${level.id}/${m}`);
    
    // Determine if we are enabling or disabling all
    const allDisabled = currentLevelModules.every(m => disabledMap[m]);
    const shouldDisable = forceStatus !== undefined ? !forceStatus : !allDisabled;

    currentLevelModules.forEach(m => {
      next[m] = shouldDisable;
    });

    setDisabledMap(next);
    saveDisabledModules(next);
    setStatusMessage({
      ok: true,
      text: `Seluruh modul di "${level.title}" berhasil ${shouldDisable ? "dinonaktifkan" : "diaktifkan kembali"}.`,
    });
  };

  const handleToggleSingleModule = (key: string) => {
    const next = { ...disabledMap, [key]: !disabledMap[key] };
    setDisabledMap(next);
    saveDisabledModules(next);
    setStatusMessage({
      ok: true,
      text: `Modul "${key}" berhasil ${next[key] ? "dinonaktifkan" : "diaktifkan"}.`,
    });
  };

  // Custom Pack Handlers
  const handleToggleActiveCustom = (id: string, moduleKey: string, currentActive: boolean) => {
    toggleCustomPackActive(id);
    refreshPacks();
    setStatusMessage({
      ok: true,
      text: `Pack kustom "${moduleKey}" berhasil ${currentActive ? "dinonaktifkan" : "diaktifkan kembali"}.`,
    });
  };

  const handleDeleteCustom = (id: string, moduleKey: string) => {
    if (window.confirm(`Hapus pack kustom untuk modul "${moduleKey}" dari penyimpanan?`)) {
      deleteCustomPack(id);
      refreshPacks();
      setStatusMessage({
        ok: true,
        text: `Pack kustom "${moduleKey}" berhasil dihapus.`,
      });
    }
  };

  const handleClearAllCustom = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus seluruh pack kustom yang pernah diunggah?")) {
      clearCustomQuestionPacks();
      refreshPacks();
      setStatusMessage({
        ok: true,
        text: "Semua pack kustom telah dibersihkan.",
      });
    }
  };

  // Export Handlers
  const handleExportJSON = async (moduleKey?: string, customPack?: QuestionPack) => {
    let pack: QuestionPack;
    let filename: string;

    if (customPack) {
      pack = customPack;
      filename = `${pack.moduleKey.replace(/\//g, "--")}-custom-pack.json`;
    } else {
      const targetKey = moduleKey || selectedModuleKey;
      await ensureModuleLoaded(targetKey);
      const modData = QUESTION_BANK[targetKey];
      if (!modData) {
        setStatusMessage({ ok: false, text: "Modul tidak ditemukan." });
        return;
      }
      pack = {
        moduleKey: targetKey,
        title: modData.title,
        mode: "replace",
        levels: {
          simple: modData.levels.simple || [],
          intermediate: modData.levels.intermediate || [],
          complex: modData.levels.complex || [],
        },
      };
      filename = `${targetKey.replace(/\//g, "--")}-question-pack.json`;
    }

    const jsonStr = JSON.stringify(pack, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ ok: true, text: `Export JSON untuk "${pack.moduleKey}" berhasil diunduh.` });
  };

  const handleExportCSV = async (moduleKey?: string) => {
    const targetKey = moduleKey || selectedModuleKey;
    await ensureModuleLoaded(targetKey);
    const modData = QUESTION_BANK[targetKey];
    if (!modData) {
      setStatusMessage({ ok: false, text: "Modul tidak ditemukan." });
      return;
    }

    const rows: string[][] = [
      ["moduleKey", "level", "type", "prompt", "options", "answer", "explanation", "hints", "dialogue", "draft", "skill"],
    ];

    (["simple", "intermediate", "complex"] as const).forEach((lvl) => {
      const qs = modData.levels[lvl] || [];
      qs.forEach((q) => {
        const optionsStr = (q.options || []).join("|");
        const answerStr = Array.isArray(q.answer) ? q.answer.join("|") : String(q.answer ?? 0);
        const hintsStr = (q.hints || []).join("|");
        const dialogueStr = (q.dialogue || []).map(([s, l]) => `${s}:${l}`).join("|");
        rows.push([
          targetKey,
          lvl,
          q.type || "choice",
          `"${(q.prompt || "").replace(/"/g, '""')}"`,
          `"${optionsStr.replace(/"/g, '""')}"`,
          answerStr,
          `"${(q.explanation || "").replace(/"/g, '""')}"`,
          `"${hintsStr.replace(/"/g, '""')}"`,
          `"${dialogueStr.replace(/"/g, '""')}"`,
          `"${(q.draft || "").replace(/"/g, '""')}"`,
          `"${(q.skill || "").replace(/"/g, '""')}"`,
        ]);
      });
    });

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const slug = targetKey.replace(/\//g, "--");
    a.href = url;
    a.download = `${slug}-questions.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ ok: true, text: `Export CSV untuk "${targetKey}" berhasil diunduh.` });
  };

  const handleDownloadCSVTemplate = () => {
    const templateRows = [
      "moduleKey,level,type,prompt,options,answer,explanation,hints,dialogue,draft,skill",
      '"00-foundation/07-present-simple","simple","choice","My sister ___ to work at 8.","goes|go|is go","0","Sister setara he/she/it, gunakan -es.","Perhatikan subject tunggal","","","present-simple-form"',
      '"00-foundation/07-present-simple","simple","build","Susun kalimat berikut.","every morning|checks|He|the schedule.","2|1|3|0","Subject + verb + object.","Mulai dengan subject He","","","present-simple-order"',
      '"00-foundation/07-present-simple","intermediate","dialogue","Lengkapi percakapan.","doesn\'t feel|don\'t feel","0","Ani adalah subjek tunggal, gunakan doesn\'t.","Lihat subjek kalimat terakhir","Budi:How is your sister?|Ani:She ___ well today.","","present-simple-negation"',
      '"00-foundation/07-present-simple","complex","edit","Perbaiki kesalahan grammar.","","","Keterangan waktu everyday menunjukkan kebiasaan (Present Simple), bukan Continuous.","Lihat everyday","","She is drinking coffee everyday.","present-simple-usage"',
    ];
    const blob = new Blob([templateRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "question-pack-template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ ok: true, text: "Template CSV berhasil diunduh. AI lain dapat memakai format ini." });
  };

  const handleDownloadAIGuide = () => {
    const keysList = CURRICULUM.flatMap(l => l.modules.map(([m]) => `${l.id}/${m}`));
    const content = `PANDUAN METADATA UNTUK AI AGENT (ENGLISH LEARNING APP)
=====================================================

1. DAFTAR VALID moduleKey (58 MODUL):
------------------------------------
${keysList.join("\n")}

2. PARAMETER KOLOM CSV:
-----------------------
- moduleKey: Harus sesuai daftar di atas.
- level: Harus salah satu dari: simple, intermediate, complex.
- type: Harus salah satu dari: choice, build, dialogue, edit.
- prompt: Teks soal. Gunakan "___" (tiga underscore) untuk rumpang pada tipe choice/dialogue.
- options: Pilihan jawaban dipisah dengan "|" (pipe). Contoh: "go|goes|going".
- answer: 
    - Tipe choice/dialogue/edit: Angka index (mulai dari 0).
    - Tipe build: Urutan index dipisah "|" (pipe). Contoh: "2|1|0|3".
- explanation: Penjelasan tata bahasa/alasan jawaban benar.
- hints: Petunjuk bertahap dipisah dengan "|".
- dialogue: Format "Speaker:Line|Speaker:Line". Contoh: "A:How are you?|B:I am ___."
- draft: Kalimat yang salah khusus untuk tipe "edit".
- skill: ID anchor materi (opsional).

3. ATURAN PENTING:
------------------
- Gunakan double-quote (") jika teks mengandung koma.
- Pastikan jumlah kolom konsisten (11 kolom).
- Mode upload "Append" akan menambahkan soal baru, "Replace" akan mengganti.
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PANDUAN-DATA-AI.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ ok: true, text: "Panduan Metadata AI (PANDUAN-DATA-AI.txt) berhasil diunduh." });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      if (file.name.endsWith(".json")) {
        try {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed === "object" && parsed.moduleKey) {
            saveCustomQuestionPack(parsed as QuestionPack, file.name);
            refreshPacks();
            setStatusMessage({
              ok: true,
              text: `Pack JSON "${file.name}" untuk modul "${parsed.moduleKey}" berhasil di-upload!`,
            });
          } else {
            setStatusMessage({ ok: false, text: "Format JSON Question Pack tidak valid." });
          }
        } catch {
          setStatusMessage({ ok: false, text: "Gagal mem-parsing file JSON." });
        }
      } else if (file.name.endsWith(".csv")) {
        try {
          const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
          const modMap: Record<string, { simple: any[]; intermediate: any[]; complex: any[] }> = {};
          for (let i = 1; i < lines.length; i++) {
            const row: string[] = [];
            let inQuote = false, currentVal = "";
            for (let c = 0; c < lines[i].length; c++) {
              if (lines[i][c] === '"') { inQuote = !inQuote; }
              else if (lines[i][c] === "," && !inQuote) { row.push(currentVal); currentVal = ""; }
              else { currentVal += lines[i][c]; }
            }
            row.push(currentVal);
            if (row.length >= 7) {
              const [mKey, lvl, type, prompt, optRaw, ansRaw, exp, hintRaw, diaRaw, dr, sk] = row;
              if (!mKey || !lvl || !prompt) continue;
              if (!modMap[mKey]) modMap[mKey] = { simple: [], intermediate: [], complex: [] };

              // Parse Dialogue: Speaker:Line|Speaker:Line
              let dialogue: [string, string][] | undefined = undefined;
              if (diaRaw && diaRaw.includes(":")) {
                dialogue = diaRaw.split("|").map(part => {
                  const colonIdx = part.indexOf(":");
                  if (colonIdx === -1) return ["", part.trim()];
                  return [part.slice(0, colonIdx).trim(), part.slice(colonIdx + 1).trim()];
                }) as [string, string][];
              }

              const q = {
                type: (type || "choice") as any,
                prompt: prompt.trim(),
                options: (optRaw || "").split("|").map(s => s.trim()).filter(Boolean),
                answer: type === "build" ? ansRaw.split("|").map(Number) : Number(ansRaw || 0),
                explanation: (exp || "").trim(),
                hints: (hintRaw || "").split("|").map(s => s.trim()).filter(Boolean),
                dialogue,
                draft: (dr || "").trim() || undefined,
                skill: (sk || "").trim() || undefined,
              };
              if (lvl === "simple" || lvl === "intermediate" || lvl === "complex") modMap[mKey][lvl].push(q);
            }
          }
          Object.entries(modMap).forEach(([mKey, lvls]) => {
            saveCustomQuestionPack({ moduleKey: mKey, title: mKey, mode: "append", levels: lvls }, file.name);
          });
          refreshPacks();
          setStatusMessage({ ok: true, text: `Berhasil mengimpor pack CSV "${file.name}"!` });
        } catch (err) {
          setStatusMessage({ ok: false, text: `Gagal membaca CSV: ${String(err)}` });
        }
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  // Backup & Reset Handlers
  const handleExportBackup = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `english-learning-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupMessage({ ok: true, text: `Backup berhasil diunduh (${dateStr}).` });
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === "string" ? reader.result : "";
      const result = importAllData(content);
      setBackupMessage({ ok: result.ok, text: result.message });
      if (result.ok) {
        refreshPacks();
        setDisabledMap(getDisabledModules());
      }
      if (backupInputRef.current) backupInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setConfirmingReset(false);
    refreshPacks();
    setDisabledMap({});
    setStatusMessage({ ok: true, text: "Seluruh data progress dan kustom telah dibersihkan." });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      <OfflineIndicator />
      <nav>
        <SidebarToggleButton />
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          ENGLISH · LEARNING
        </a>
        <a href="challenge-knowledge.html" onClick={(e) => handleLinkClick(e, "challenge-knowledge.html")}>
          Challenge
        </a>
        <a href="question-bank.html" onClick={(e) => handleLinkClick(e, "question-bank.html")}>
          Question Bank
        </a>
        <a href="word-choice-bank.html" onClick={(e) => handleLinkClick(e, "word-choice-bank.html")}>
          Word Bank
        </a>
        <a href="logs/vocab-log.html" onClick={(e) => handleLinkClick(e, "logs/vocab-log.html")}>
          Vocab Log
        </a>
        <a href="logs/error-journal.html" onClick={(e) => handleLinkClick(e, "logs/error-journal.html")}>
          Error Journal
        </a>
        <div className="nav-utilities">
          <ViewportToggle />
          <PWAInstallButton />
          <ThemeToggle />
        </div>
      </nav>

      <main className="module-page">
        <p className="level">Manajemen Pusat · Question Bank Studio</p>
        <h1>Question Bank Management</h1>
        <p className="module-intro">
          Kelola seluruh sumber data (Update) bank soal kurikulum dan pack kustom. 
          Anda juga dapat mencadangkan progress belajar atau mereset data aplikasi di sini.
        </p>

        {(statusMessage || backupMessage) && (
          <p
            className="guided-overall"
            data-state={(statusMessage?.ok || backupMessage?.ok) ? "pass" : "retry"}
            role="status"
          >
            {statusMessage?.text || backupMessage?.text}
          </p>
        )}

        {/* Section 1: Data Source Management (Unified Table) */}
        <section>
          <h2>Manajemen Sumber Data (Data Updates)</h2>
          <p style={{ fontSize: ".9rem", color: "var(--muted)", marginBottom: "1rem" }}>
            Tabel di bawah menggabungkan modul kurikulum bawaan (per level) dan pack soal kustom yang diunggah.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nama Update / Sumber</th>
                  <th>Versi / Waktu Upload</th>
                  <th>Jumlah Modul</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* Built-in Curriculum Grouped by Level */}
                {CURRICULUM.map((level) => {
                  const currentLevelModules = level.modules.map(([m]) => `${level.id}/${m}`);
                  const disabledCount = currentLevelModules.filter(m => disabledMap[m]).length;
                  const totalInLevel = currentLevelModules.length;
                  const isActive = disabledCount === 0;
                  const isPartial = disabledCount > 0 && disabledCount < totalInLevel;

                  return (
                    <tr key={level.id} style={disabledCount === totalInLevel ? { opacity: 0.5 } : undefined}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{level.title}</div>
                        <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>{level.desc}</div>
                      </td>
                      <td>
                        <span style={{ fontFamily: "var(--mono)", fontSize: ".85rem" }}>v1.0 Built-in</span>
                      </td>
                      <td>{totalInLevel} Modul</td>
                      <td>
                        <span className={`mod-status ${isActive ? "mod-lulus" : isPartial ? "mod-proses" : "mod-belum"}`}>
                          {isActive ? "Aktif" : isPartial ? "Parsial" : "Nonaktif"}
                        </span>
                      </td>
                      <td>
                        <div className="toolbar-actions">
                          <button
                            type="button"
                            className="filter-pill"
                            onClick={() => handleToggleLevel(level.id)}
                          >
                            {isActive ? "Nonaktifkan Semua" : "Aktifkan Semua"}
                          </button>
                          <details style={{ fontSize: ".8rem" }}>
                            <summary style={{ cursor: "pointer", color: "var(--ink)" }}>Detail</summary>
                            <div style={{ marginTop: ".5rem", maxHeight: "150px", overflowY: "auto", border: "1px solid var(--line)", padding: ".5rem" }}>
                              {level.modules.map(([m, t]) => {
                                const key = `${level.id}/${m}`;
                                const isDisabled = !!disabledMap[key];
                                return (
                                  <div key={key} style={{ display: "flex", justifyContent: "space-between", marginBottom: ".25rem", opacity: isDisabled ? 0.5 : 1 }}>
                                    <span style={{ fontSize: ".7rem" }}>{t}</span>
                                    <button 
                                      className="speak-btn" 
                                      style={{ padding: "0 .25rem", fontSize: ".6rem" }}
                                      onClick={() => handleToggleSingleModule(key)}
                                    >
                                      {isDisabled ? "ON" : "OFF"}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </details>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Custom Packs */}
                {customPacks.map((item) => {
                  const isActive = item.isActive !== false;
                  const uploadDateStr = new Date(item.uploadedAt).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                  return (
                    <tr key={item.id} style={!isActive ? { opacity: 0.5 } : undefined}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{item.filename}</div>
                        <code style={{ fontSize: ".7rem" }}>{item.pack.moduleKey}</code>
                      </td>
                      <td>
                        <span style={{ fontFamily: "var(--mono)", fontSize: ".85rem" }}>{uploadDateStr}</span>
                      </td>
                      <td>1 Pack (Custom)</td>
                      <td>
                        <span className={`mod-status ${isActive ? "mod-lulus" : "mod-belum"}`}>
                          {isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td>
                        <div className="toolbar-actions">
                          <button
                            type="button"
                            className="filter-pill"
                            onClick={() => handleToggleActiveCustom(item.id, item.pack.moduleKey, isActive)}
                          >
                            {isActive ? "Deactive" : "Active"}
                          </button>
                          <button
                            type="button"
                            className="guided-reset"
                            style={{ padding: ".3rem .6rem", fontSize: ".8rem" }}
                            onClick={() => handleDeleteCustom(item.id, item.pack.moduleKey)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {customPacks.length > 0 && (
            <button
              type="button"
              className="guided-reset"
              style={{ marginTop: "1rem" }}
              onClick={handleClearAllCustom}
            >
              Hapus Semua Pack Kustom
            </button>
          )}
        </section>

        {/* Section 2: Upload & Templates */}
        <section>
          <h2>Upload &amp; Export Tool</h2>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <div style={{ flex: "1 1 300px" }}>
              <h3>Upload Pack Baru</h3>
              <p style={{ fontSize: ".85rem", color: "var(--muted)", marginBottom: ".75rem" }}>
                Tambah soal baru (.json / .csv) ke bank soal.
              </p>
              <button
                type="button"
                className="check-quiz"
                onClick={() => fileInputRef.current?.click()}
              >
                ↑ Upload Pack Soal
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>

            <div style={{ flex: "1 1 300px" }}>
              <h3>Export &amp; Template</h3>
              <p style={{ fontSize: ".85rem", color: "var(--muted)", marginBottom: ".75rem" }}>
                Unduh template CSV atau export modul kurikulum.
              </p>
              <div style={{ display: "flex", gap: ".5rem" }}>
                <select
                  className="filter-level-select"
                  style={{ flex: 1 }}
                  value={selectedModuleKey}
                  onChange={(e) => setSelectedModuleKey(e.target.value)}
                >
                  {allModuleKeys.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
                <button className="speak-btn" onClick={() => handleExportJSON(selectedModuleKey)}>JSON</button>
              </div>
              <button
                type="button"
                className="guided-reset"
                style={{ width: "100%", marginTop: ".5rem", padding: ".5rem" }}
                onClick={handleDownloadCSVTemplate}
              >
                ↓ Unduh Template CSV (Format)
              </button>
              <button
                type="button"
                className="check-quiz"
                style={{ width: "100%", marginTop: ".5rem", padding: ".5rem", background: "var(--ink)", color: "var(--paper)" }}
                onClick={handleDownloadAIGuide}
              >
                ↓ Unduh Panduan AI (Metadata)
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Backup & Restore (Moved from Dashboard) */}
        <section>
          <h2>Cadangkan &amp; Pulihkan Data (Export / Import JSON)</h2>
          <p style={{ fontSize: ".9rem", color: "var(--muted)" }}>
            Simpan seluruh progress kuis, checklist, Vocab Log, dan Error Journal ke file <code>.json</code>.
          </p>
          <div className="toolbar-actions" style={{ marginTop: ".75rem" }}>
            <button
              type="button"
              className="check-quiz"
              style={{ marginTop: 0 }}
              onClick={handleExportBackup}
            >
              ↓ Export Progress (.json)
            </button>
            <button
              type="button"
              className="guided-reset"
              onClick={() => backupInputRef.current?.click()}
            >
              ↑ Import Progress (.json)
            </button>
            <input
              ref={backupInputRef}
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImportBackup}
            />
          </div>
        </section>

        {/* Section 4: Reset Application */}
        <section>
          <h2>Reset Aplikasi</h2>
          <p style={{ fontSize: ".9rem", color: "var(--muted)" }}>
            Menghapus semua progress dan data kustom. Tindakan ini tidak bisa dibatalkan.
          </p>
          {!confirmingReset ? (
            <button
              type="button"
              className="check-quiz"
              style={{ marginTop: ".75rem" }}
              onClick={() => setConfirmingReset(true)}
            >
              Hapus Semua Data Aplikasi
            </button>
          ) : (
            <div style={{ display: "flex", gap: ".75rem", alignItems: "center", marginTop: ".75rem" }}>
              <button type="button" className="check-quiz" onClick={handleConfirmReset}>
                Ya, Reset Sekarang
              </button>
              <button type="button" className="guided-reset" onClick={() => setConfirmingReset(false)}>
                Batal
              </button>
            </div>
          )}
        </section>

        <footer className="footer-link">
          <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
            ← Kembali ke kurikulum
          </a>
        </footer>
      </main>
    </>
  );
};
