import React, { useEffect, useState } from "react";
import { CURRICULUM } from "../data/curriculum";
import {
  ErrorJournalEntry,
  getErrorJournal,
  getVocabLog,
  saveErrorJournal,
  saveVocabLog,
  VocabEntry,
} from "../utils/storage";

interface LogsViewProps {
  mode: "vocab" | "error";
  onNavigate: (path: string) => void;
}

export const LogsView: React.FC<LogsViewProps> = ({ mode, onNavigate }) => {
  const [vocabList, setVocabList] = useState<VocabEntry[]>(() => getVocabLog());
  const [errorList, setErrorList] = useState<ErrorJournalEntry[]>(() => getErrorJournal());

  // Vocab form state
  const [word, setWord] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("noun");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [moduleKey, setModuleKey] = useState("00-foundation/01-parts-of-speech");

  // Error form state
  const [errModuleKey, setErrModuleKey] = useState("00-foundation/07-present-simple");
  const [wrongSentence, setWrongSentence] = useState("");
  const [correctSentence, setCorrectSentence] = useState("");
  const [ruleNote, setRuleNote] = useState("");

  useEffect(() => {
    document.body.dataset.module = mode === "vocab" ? "logs/vocab-log" : "logs/error-journal";
    document.title =
      mode === "vocab"
        ? "Vocab Log — English Learning"
        : "Error Journal — English Learning";
  }, [mode]);

  const allModules = CURRICULUM.flatMap((lvl) =>
    lvl.modules.map(([mod, title]) => ({
      key: `${lvl.id}/${mod}`,
      label: `${lvl.id}/${mod} — ${title}`,
    }))
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleAddVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim()) return;
    const entry: VocabEntry = {
      id: `${Date.now()}`,
      word: word.trim(),
      partOfSpeech,
      meaning: meaning.trim(),
      example: example.trim(),
      moduleKey,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const next = [entry, ...vocabList];
    setVocabList(next);
    saveVocabLog(next);
    setWord("");
    setMeaning("");
    setExample("");
  };

  const handleDeleteVocab = (id: string) => {
    const next = vocabList.filter((item) => item.id !== id);
    setVocabList(next);
    saveVocabLog(next);
  };

  const handleAddError = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wrongSentence.trim() || !correctSentence.trim()) return;
    const entry: ErrorJournalEntry = {
      id: `${Date.now()}`,
      moduleKey: errModuleKey,
      wrongSentence: wrongSentence.trim(),
      correctSentence: correctSentence.trim(),
      ruleNote: ruleNote.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const next = [entry, ...errorList];
    setErrorList(next);
    saveErrorJournal(next);
    setWrongSentence("");
    setCorrectSentence("");
    setRuleNote("");
  };

  const handleDeleteError = (id: string) => {
    const next = errorList.filter((item) => item.id !== id);
    setErrorList(next);
    saveErrorJournal(next);
  };

  return (
    <>
      <nav>
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          ENGLISH · LEARNING
        </a>
        <a
          href="word-choice-bank.html"
          onClick={(e) => handleLinkClick(e, "word-choice-bank.html")}
        >
          Word Bank
        </a>
        <a
          href="logs/vocab-log.html"
          onClick={(e) => handleLinkClick(e, "logs/vocab-log.html")}
        >
          Vocab Log
        </a>
        <a
          href="logs/error-journal.html"
          onClick={(e) => handleLinkClick(e, "logs/error-journal.html")}
        >
          Error Journal
        </a>
      </nav>

      {mode === "vocab" ? (
        <main className="module-page">
          <p className="level">Catatan Belajar · Kosakata &amp; Kolokasi</p>
          <h1>Vocab Log</h1>
          <p className="module-intro">
            Catat kosakata baru, kelas kata, arti, dan contoh penggunaannya dalam kalimat dari
            modul yang sedang kamu pelajari.
          </p>

          <section>
            <h2>Tambah Kosakata</h2>
            <form onSubmit={handleAddVocab}>
              <input
                type="text"
                placeholder="Kata / kolokasi (mis. conduct research)"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                required
              />
              <select
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
              >
                <option value="noun">noun</option>
                <option value="verb">verb</option>
                <option value="adjective">adjective</option>
                <option value="adverb">adverb</option>
                <option value="preposition">preposition</option>
                <option value="collocation">collocation / phrase</option>
              </select>
              <input
                type="text"
                placeholder="Arti bahasa Indonesia"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                required
              />
              <select
                value={moduleKey}
                onChange={(e) => setModuleKey(e.target.value)}
              >
                {allModules.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>
              <textarea
                style={{ gridColumn: "1 / -1" }}
                rows={2}
                placeholder="Contoh kalimat dalam konteks..."
                value={example}
                onChange={(e) => setExample(e.target.value)}
              />
              <button type="submit">Simpan Kosakata</button>
            </form>
          </section>

          <section>
            <h2>Daftar Kosakata ({vocabList.length})</h2>
            {vocabList.length === 0 ? (
              <p className="empty">Belum ada kosakata yang dicatat.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Kata</th>
                      <th>Kelas</th>
                      <th>Arti &amp; Contoh</th>
                      <th>Modul</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vocabList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <b>{item.word}</b>
                        </td>
                        <td>
                          <code>{item.partOfSpeech}</code>
                        </td>
                        <td>
                          <div>{item.meaning}</div>
                          {item.example && (
                            <div style={{ color: "var(--muted)", fontSize: ".88rem" }}>
                              <i>{item.example}</i>
                            </div>
                          )}
                        </td>
                        <td>
                          <a
                            href={`${item.moduleKey}.html`}
                            onClick={(e) => handleLinkClick(e, `${item.moduleKey}.html`)}
                          >
                            {item.moduleKey}
                          </a>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="guided-reset"
                            onClick={() => handleDeleteVocab(item.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <footer className="footer-link">
            <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
              ← Kembali ke kurikulum
            </a>
          </footer>
        </main>
      ) : (
        <main className="module-page">
          <p className="level">Catatan Belajar · Evaluasi &amp; Perbaikan</p>
          <h1>Error Journal</h1>
          <p className="module-intro">
            Dokumentasikan kalimat yang sering keliru beserta perbaikannya dan aturan grammar yang
            mendasarinya agar kesalahan tidak berulang.
          </p>

          <section>
            <h2>Catat Kesalahan &amp; Perbaikan</h2>
            <form onSubmit={handleAddError}>
              <select
                style={{ gridColumn: "1 / -1" }}
                value={errModuleKey}
                onChange={(e) => setErrModuleKey(e.target.value)}
              >
                {allModules.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Kalimat salah (✗ mis. He doesn't checks email)"
                value={wrongSentence}
                onChange={(e) => setWrongSentence(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Perbaikan benar (✓ mis. He doesn't check email)"
                value={correctSentence}
                onChange={(e) => setCorrectSentence(e.target.value)}
                required
              />
              <textarea
                style={{ gridColumn: "1 / -1" }}
                rows={2}
                placeholder="Catatan aturan grammar (mis. Setelah doesn't, verb kembali ke bentuk dasar)"
                value={ruleNote}
                onChange={(e) => setRuleNote(e.target.value)}
              />
              <button type="submit">Simpan ke Error Journal</button>
            </form>
          </section>

          <section>
            <h2>Riwayat Perbaikan ({errorList.length})</h2>
            {errorList.length === 0 ? (
              <p className="empty">Belum ada catatan di Error Journal.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Kalimat Salah (✗)</th>
                      <th>Perbaikan (✓)</th>
                      <th>Aturan &amp; Modul</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="guided-error">{item.wrongSentence}</span>
                        </td>
                        <td>
                          <b>{item.correctSentence}</b>
                        </td>
                        <td>
                          {item.ruleNote && <div>{item.ruleNote}</div>}
                          <div>
                            <a
                              href={`${item.moduleKey}.html`}
                              onClick={(e) => handleLinkClick(e, `${item.moduleKey}.html`)}
                            >
                              {item.moduleKey}
                            </a>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="guided-reset"
                            onClick={() => handleDeleteError(item.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <footer className="footer-link">
            <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
              ← Kembali ke kurikulum
            </a>
          </footer>
        </main>
      )}
    </>
  );
};
