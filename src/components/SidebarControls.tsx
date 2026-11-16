import React, { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/storage";

export type SidebarFilterTab = "all" | "favorites" | "proses" | "lulus";

export const OPEN_SIDEBAR_EVENT = "el_open_sidebar";

export function openModuleSidebar(tab?: SidebarFilterTab): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(OPEN_SIDEBAR_EVENT, {
        detail: tab ? { tab } : undefined,
      })
    );
  }
}

interface SidebarToggleButtonProps {
  className?: string;
}

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ className = "" }) => {
  return (
    <button
      type="button"
      className={`sidebar-toggle-btn ${className}`.trim()}
      onClick={() => openModuleSidebar()}
      aria-label="Buka menu daftar modul kurikulum"
      title="Buka daftar 58 modul & favorit"
    >
      <span aria-hidden="true">☰</span>
      <span>Modul</span>
    </button>
  );
};

interface FavoriteModuleButtonProps {
  moduleKey: string;
  compact?: boolean;
  className?: string;
}

export const FavoriteModuleButton: React.FC<FavoriteModuleButtonProps> = ({
  moduleKey,
  compact = false,
  className = "",
}) => {
  const [fav, setFav] = useState<boolean>(() => isFavorite(moduleKey));

  useEffect(() => {
    setFav(isFavorite(moduleKey));
    const sync = () => setFav(isFavorite(moduleKey));
    window.addEventListener("el_storage_sync", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("el_storage_sync", sync);
      window.removeEventListener("focus", sync);
    };
  }, [moduleKey]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = toggleFavorite(moduleKey);
    setFav(nextState);
  };

  return (
    <button
      type="button"
      className={`favorite-toggle-btn ${fav ? "is-favorited" : ""} ${compact ? "is-compact" : ""} ${className}`.trim()}
      onClick={handleClick}
      aria-pressed={fav}
      aria-label={fav ? "Hapus modul dari favorit" : "Tandai modul sebagai favorit"}
      title={fav ? "Hapus dari favorit" : "Pin ke favorit sidebar"}
    >
      <span aria-hidden="true">{fav ? "★" : "☆"}</span>
      {!compact && <span>{fav ? "Terfavorit" : "Favoritkan"}</span>}
    </button>
  );
};
