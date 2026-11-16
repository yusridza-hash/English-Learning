import React, { useEffect, useMemo, useRef, useState } from "react";
import { CURRICULUM, TOTAL_MODULES } from "../data/curriculum";
import {
  formatRelativeTime,
  getChecks,
  getFavorites,
  getModuleHistory,
  getModuleMeta,
  getScores,
  ModuleHistoryEntry,
  statusOf,
  toggleFavorite,
} from "../utils/storage";
import { OPEN_SIDEBAR_EVENT, SidebarFilterTab } from "./SidebarControls";

interface ModuleSidebarDrawerProps {
  currentRoute: string;
  onNavigate: (path: string) => void;
}

export const ModuleSidebarDrawer: React.FC<ModuleSidebarDrawerProps> = ({
  currentRoute,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SidebarFilterTab>("all");

  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [history, setHistory] = useState<ModuleHistoryEntry[]>(() => getModuleHistory());
  const [scores, setScores] = useState<Record<string, number>>(() => getScores());
  const [checks, setChecks] = useState<Record<string, boolean[]>>(() => getChecks());

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const syncData = () => {
    setFavorites(getFavorites());
    setHistory(getModuleHistory());
    setScores(getScores());
    setChecks(getChecks());
  };

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const custom = e as CustomEvent<{ tab?: SidebarFilterTab } | undefined>;
      if (custom.detail?.tab) {
        setActiveTab(custom.detail.tab);
      }
      syncData();
      setIsOpen(true);
    };

    window.addEventListener(OPEN_SIDEBAR_EVENT, handleOpen);
    window.addEventListener("el_storage_sync", syncData);
    window.addEventListener("focus", syncData);

    return () => {
      window.removeEventListener(OPEN_SIDEBAR_EVENT, handleOpen);
      window.removeEventListener("el_storage_sync", syncData);
      window.removeEventListener("focus", syncData);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  const latestHistoryKey = history[0]?.moduleKey || null;
  const historyMap = useMemo(() => {
    const map: Record<string, ModuleHistoryEntry> = {};
    history.forEach((h) => {
      map[h.moduleKey] = h;
    });
    return map;
  }, [history]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const pinnedFavorites = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return favorites
      .map((key) => {
        const meta = getModuleMeta(key);
        return { key, ...meta };
      })
      .filter((item) => {
        if (!q) return true;
        return (
          item.moduleTitle.toLowerCase().includes(q) ||
          item.levelTitle.toLowerCase().includes(q) ||
          item.key.toLowerCase().includes(q)
        );
      });
  }, [favorites, searchQuery]);

  const filteredLevels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CURRICULUM.map((level) => {
      const matched = level.modules
        .map(([mod, title], idx) => {
          const key = `${level.id}/${mod}`;
          return {
            key,
            mod,
            title,
            num: String(idx + 1).padStart(2, "0"),
          };
        })
        .filter((item) => {
          const st = statusOf(item.key, scores, checks);
          if (activeTab === "favorites" && !favoriteSet.has(item.key)) return false;
          if (activeTab === "proses" && st !== "proses") return false;
          if (activeTab === "lulus" && st !== "lulus") return false;
          if (!q) return true;
          return (
            item.title.toLowerCase().includes(q) ||
            item.mod.toLowerCase().includes(q) ||
            level.title.toLowerCase().includes(q) ||
            item.num.includes(q)
          );
        });
      return {
        ...level,
        matched,
      };
    }).filter((level) => level.matched.length > 0);
  }, [searchQuery, activeTab, scores, checks, favoriteSet]);

  const handleOpenModule = (key: string) => {
    setIsOpen(false);
    onNavigate(`${key}.html`);
  };

  const handleNavAction = (path: string) => {
    setIsOpen(false);
    onNavigate(path);
  };

  const handleStarClick = (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(key);
    syncData();
  };

  const renderStatusMeta = (key: string) => {
    const st = statusOf(key, scores, checks);
    const sc = scores[key];
    const parts: string[] = [];
    if (key === latestHistoryKey) {
      parts.push("Terakhir");
    }
    if (st === "lulus") {
      parts.push(`Lulus ${sc ?? 80}%`);
    } else if (st === "proses") {
      parts.push(sc != null ? `Proses ${sc}%` : "Proses");
    } else if (sc != null) {
      parts.push(`${sc}%`);
    }
    return parts.join(" · ");
  };

  if (!isOpen) return null;

  const showPinnedSection =
    pinnedFavorites.length > 0 && (activeTab === "all" || activeTab === "favorites");

  return (
    <div
      className="sidebar-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <aside
        className="sidebar-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Daftar Modul Kurikulum"
      >
        <div className="sidebar-header">
          <div>
            <p className="sidebar-kicker">Kurikulum · {TOTAL_MODULES} Modul</p>
            <h2 className="sidebar-title">Daftar Modul</h2>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Tutup daftar modul"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-controls">
          <div className="sidebar-search-wrap">
            <input
              ref={searchInputRef}
              type="search"
              className="sidebar-search-input"
              placeholder="Cari modul, grammar, atau IELTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari modul di sidebar"
            />
          </div>

          <div className="sidebar-tabs" role="tablist" aria-label="Filter modul">
            {(
              [
                ["all", "Semua"],
                ["favorites", `Favorit (${favorites.length})`],
                ["proses", "Proses"],
                ["lulus", "Lulus"],
              ] as const
            ).map(([tabKey, label]) => (
              <button
                key={tabKey}
                type="button"
                role="tab"
                aria-selected={activeTab === tabKey}
                className={`sidebar-tab-btn ${activeTab === tabKey ? "is-active" : ""}`}
                onClick={() => setActiveTab(tabKey)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-scroll-area">
          {showPinnedSection && (
            <div className="sidebar-pinned-section">
              <div className="sidebar-section-label">
                <span>★ Favorit Terpin</span>
                <span className="sidebar-mono-num">{pinnedFavorites.length}</span>
              </div>
              <ul className="sidebar-module-list">
                {pinnedFavorites.map((item) => {
                  const isActive = currentRoute === item.key;
                  const hist = historyMap[item.key];
                  const statusMeta = renderStatusMeta(item.key);
                  return (
                    <li
                      key={`pin-${item.key}`}
                      className={`sidebar-module-row ${isActive ? "is-current" : ""}`}
                    >
                      <button
                        type="button"
                        className="sidebar-module-trigger"
                        onClick={() => handleOpenModule(item.key)}
                      >
                        <span className="sidebar-module-name">
                          {item.moduleTitle}
                        </span>
                        <span className="sidebar-module-sub">
                          {item.levelTitle}
                          {statusMeta ? ` · ${statusMeta}` : ""}
                          {hist ? ` · ${formatRelativeTime(hist.openedAt)}` : ""}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="sidebar-star-btn is-favorited"
                        onClick={(e) => handleStarClick(e, item.key)}
                        aria-label={`Hapus ${item.moduleTitle} dari favorit`}
                        title="Lepas pin favorit"
                      >
                        ★
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeTab === "favorites" && favorites.length === 0 ? (
            <div className="sidebar-empty-state">
              <p>Belum ada modul favorit.</p>
              <p className="sidebar-empty-hint">
                Ketuk ikon <b>☆</b> pada modul mana saja untuk mem-pinnya di bagian atas sidebar.
              </p>
            </div>
          ) : filteredLevels.length === 0 ? (
            <div className="sidebar-empty-state">
              <p>Tidak ada modul yang cocok dengan filter saat ini.</p>
              <button
                type="button"
                className="sidebar-reset-filter-btn"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
              >
                Reset Pencarian &amp; Filter
              </button>
            </div>
          ) : (
            filteredLevels.map((level, lvlIdx) => {
              const containsCurrent = level.matched.some((m) => m.key === currentRoute);
              const shouldExpand =
                Boolean(searchQuery.trim()) ||
                activeTab !== "all" ||
                containsCurrent ||
                (currentRoute === "index" && lvlIdx === 0);

              return (
                <details
                  key={`${level.id}-${activeTab}-${searchQuery ? "search" : "browse"}`}
                  className="sidebar-level-group"
                  open={shouldExpand}
                >
                  <summary className="sidebar-level-summary">
                    <div className="sidebar-level-heading">
                      <span className="sidebar-level-name">{level.title}</span>
                      <span className="sidebar-level-meta">
                        {level.ieltsBand} · {level.matched.length} modul
                      </span>
                    </div>
                  </summary>
                  <ul className="sidebar-module-list">
                    {level.matched.map((item) => {
                      const isActive = currentRoute === item.key;
                      const isFav = favoriteSet.has(item.key);
                      const statusMeta = renderStatusMeta(item.key);
                      return (
                        <li
                          key={item.key}
                          className={`sidebar-module-row ${isActive ? "is-current" : ""}`}
                        >
                          <button
                            type="button"
                            className="sidebar-module-trigger"
                            onClick={() => handleOpenModule(item.key)}
                          >
                            <span className="sidebar-module-name">
                              <span className="sidebar-module-num">{item.num}</span>
                              {item.title}
                            </span>
                            {(statusMeta || isActive) && (
                              <span className="sidebar-module-sub">
                                {isActive ? "Sedang dibuka" : ""}
                                {isActive && statusMeta ? " · " : ""}
                                {statusMeta}
                              </span>
                            )}
                          </button>
                          <button
                            type="button"
                            className={`sidebar-star-btn ${isFav ? "is-favorited" : ""}`}
                            onClick={(e) => handleStarClick(e, item.key)}
                            aria-pressed={isFav}
                            aria-label={
                              isFav
                                ? `Hapus ${item.title} dari favorit`
                                : `Tambah ${item.title} ke favorit`
                            }
                            title={isFav ? "Hapus dari favorit" : "Tandai favorit"}
                          >
                            {isFav ? "★" : "☆"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              );
            })
          )}
        </div>

        <div className="sidebar-footer">
          <button type="button" onClick={() => handleNavAction("index.html")}>
            Beranda Tracker
          </button>
          <button type="button" onClick={() => handleNavAction("word-choice-bank.html")}>
            Word Bank
          </button>
          <button type="button" onClick={() => handleNavAction("logs/vocab-log.html")}>
            Vocab Log
          </button>
          <button type="button" onClick={() => handleNavAction("logs/error-journal.html")}>
            Error Journal
          </button>
        </div>
      </aside>
    </div>
  );
};
