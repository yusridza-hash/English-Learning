import React, { useEffect, useState } from "react";
import { BUILT, CURRICULUM, TOTAL_MODULES } from "../data/curriculum";
import { getChecks, getScores, resetAllProgress, statusOf } from "../utils/storage";

interface DashboardViewProps {
  onNavigate: (path: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [scores, setScores] = useState<Record<string, number>>(() => getScores());
  const [checks, setChecks] = useState<Record<string, boolean[]>>(() => getChecks());
  const [confirmingReset, setConfirmingReset] = useState(false);

  const refreshData = () => {
    setScores(getScores());
    setChecks(getChecks());
  };

  useEffect(() => {
    document.body.removeAttribute("data-module");
    document.title = "English Learning — Dashboard";
    refreshData();

    const handleFocus = () => refreshData();
    const handleVisibility = () => {
      if (!document.hidden) refreshData();
    };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  let done = 0;
  let sumScore = 0;
  let countScore = 0;

  CURRICULUM.forEach((level) =>
    level.modules.forEach(([mod]) => {
      const key = `${level.id}/${mod}`;
      const sc = scores[key] || 0;
      const chk = (checks[key] || []).filter(Boolean).length;
      if (sc >= 80 && chk >= 3) done++;
      if (sc > 0) {
        sumScore += sc;
        countScore++;
      }
    })
  );

  const pct = Math.round((done / TOTAL_MODULES) * 100);
  const avgText = countScore ? `${Math.round(sumScore / countScore)}%` : "—";
  const quizEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setConfirmingReset(false);
    refreshData();
  };

  return (
    <>
      <nav>
        <a href="index.html" onClick={(e) => handleLinkClick(e, "index.html")}>
          ENGLISH · LEARNING
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
      </nav>

      <h1>Kurikulum</h1>
      <p className="level">
        Basic → Complex · 5 Level · 58 Modul · <span id="builtCounter">{BUILT.size}</span>/58 dibangun
      </p>

      <section id="overview">
        <h2>Progress</h2>
        <div className="progress-bar">
          <span id="overallBar" style={{ width: `${pct}%` }}></span>
        </div>
        <div className="stat-row">
          <div>
            <span className="stat-label">Modul Lulus</span>
            <span id="statDone">
              {done} / {TOTAL_MODULES} ({pct}%)
            </span>
          </div>
          <div>
            <span className="stat-label">File Dibangun</span>
            <span id="statBuilt">
              {BUILT.size} / {TOTAL_MODULES}
            </span>
          </div>
          <div>
            <span className="stat-label">Skor Rata-rata</span>
            <span id="statAvg">{avgText}</span>
          </div>
        </div>
        <p style={{ fontSize: ".85rem", color: "#555", fontFamily: "var(--mono,monospace)" }}>
          <b>LULUS</b> = quiz ≥ 80% + 3 checklist · <b>PROSES</b> = ada data · <b>BELUM</b> = belum
          dikerjakan · <b>BELUM DITULIS</b> = file modul belum dibuat
        </p>
      </section>

      <section id="levels">
        <h2>Daftar Modul</h2>
        <div id="levelList">
          {CURRICULUM.map((level) => (
            <details key={level.id} className="level-group" open>
              <summary>
                <span className="level-title">{level.title}</span>
                <span className="level-desc">{level.desc}</span>
              </summary>
              <table className="module-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Modul</th>
                    <th>Status</th>
                    <th>Skor</th>
                  </tr>
                </thead>
                <tbody>
                  {level.modules.map(([mod, title], i) => {
                    const key = `${level.id}/${mod}`;
                    const path = `${level.id}/${mod}.html`;
                    const st = statusOf(key, scores, checks);
                    const score = scores[key];
                    const isBuilt = BUILT.has(key);

                    const statusLabel =
                      st === "unbuilt"
                        ? "— BELUM DITULIS"
                        : st === "lulus"
                        ? "✓ LULUS"
                        : st === "proses"
                        ? "· PROSES"
                        : "— BELUM";

                    return (
                      <tr key={key} className={`mod-${st}`}>
                        <td className="mod-num">{String(i + 1).padStart(2, "0")}</td>
                        <td className="mod-title">
                          {isBuilt ? (
                            <a href={path} onClick={(e) => handleLinkClick(e, path)}>
                              {title}
                            </a>
                          ) : (
                            <span style={{ color: "#aaa" }}>{title}</span>
                          )}
                        </td>
                        <td className="mod-status">{statusLabel}</td>
                        <td className="mod-score">{score != null ? `${score}%` : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </details>
          ))}
        </div>
      </section>

      <section id="quiz-log">
        <h2>Riwayat Quiz</h2>
        {quizEntries.length === 0 ? (
          <p id="quizEmpty" className="empty">
            Belum ada quiz yang dikerjakan.
          </p>
        ) : (
          <table id="quizTable">
            <thead>
              <tr>
                <th>Modul</th>
                <th>Skor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quizEntries.map(([k, s]) => (
                <tr key={k}>
                  <td>
                    <a
                      href={`${k}.html`}
                      onClick={(e) => handleLinkClick(e, `${k}.html`)}
                    >
                      {k}
                    </a>
                  </td>
                  <td>{s}%</td>
                  <td>{s >= 80 ? "LULUS" : "ULANGI"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section id="reset">
        <h2>Reset</h2>
        <p style={{ fontSize: ".9rem", color: "#555" }}>
          Menghapus semua progress (skor quiz &amp; checklist). Tidak bisa dibatalkan.
        </p>
        {!confirmingReset ? (
          <button
            id="resetBtn"
            type="button"
            className="check-quiz"
            style={{ marginTop: ".75rem" }}
            onClick={() => setConfirmingReset(true)}
          >
            Hapus semua data
          </button>
        ) : (
          <div style={{ display: "flex", gap: ".75rem", alignItems: "center", marginTop: ".75rem" }}>
            <button
              type="button"
              className="check-quiz"
              onClick={handleConfirmReset}
            >
              Ya, hapus semua progress
            </button>
            <button
              type="button"
              className="guided-reset"
              onClick={() => setConfirmingReset(false)}
            >
              Batal
            </button>
          </div>
        )}
      </section>
    </>
  );
};
