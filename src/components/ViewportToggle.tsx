import React, { useEffect, useState } from "react";
import {
  applyViewportMode,
  getViewportMode,
  setViewportMode,
  ViewportMode,
} from "../utils/storage";

export const ViewportToggle: React.FC = () => {
  const [mode, setMode] = useState<ViewportMode>(() => getViewportMode());

  useEffect(() => {
    const current = getViewportMode();
    applyViewportMode(current);
    setMode(current);

    const handleSync = () => {
      const latest = getViewportMode();
      applyViewportMode(latest);
      setMode(latest);
    };
    window.addEventListener("el_storage_sync", handleSync);
    return () => window.removeEventListener("el_storage_sync", handleSync);
  }, []);

  const handleToggle = () => {
    const next: ViewportMode = mode === "laptop" ? "android" : "laptop";
    setViewportMode(next);
    setMode(next);
  };

  return (
    <button
      type="button"
      className={`theme-toggle viewport-toggle-btn ${mode === "android" ? "is-android" : ""}`}
      onClick={handleToggle}
      aria-pressed={mode === "android"}
      title={
        mode === "laptop"
          ? "Tampilan Laptop aktif (lebar penuh). Klik untuk beralih ke pratinjau layar Android."
          : "Tampilan Android aktif (bingkai ponsel 430px). Klik untuk kembali ke tampilan Laptop penuh."
      }
    >
      {mode === "laptop" ? "💻 Laptop" : "📱 Android"}
    </button>
  );
};
