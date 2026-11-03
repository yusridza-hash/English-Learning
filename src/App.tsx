import React, { useCallback, useEffect, useState } from "react";
import { DashboardView } from "./components/DashboardView";
import { GeneratedModuleView } from "./components/GeneratedModuleView";
import { LegacyModuleView } from "./components/LegacyModuleView";
import { LogsView } from "./components/LogsView";
import { PresentSimplePilotView } from "./components/PresentSimplePilotView";
import { WordChoiceBankView } from "./components/WordChoiceBankView";
import { MODULE_CONTENT } from "./data/generatedModules";
import { LEGACY_MODULES } from "./data/legacyModules";

function normalizeRoute(rawPath: string): { route: string; hash: string } {
  const [pathPart, hashPart = ""] = rawPath.split("#");
  let cleaned = pathPart
    .trim()
    .replace(/^https?:\/\/[^/]+/, "")
    .replace(/^\.\.\//, "")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "")
    .replace(/\.html$/i, "");

  if (!cleaned || cleaned === "index") {
    cleaned = "index";
  }

  return { route: cleaned, hash: hashPart };
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const { route } = normalizeRoute(window.location.pathname + window.location.hash);
    return route;
  });

  const scrollToHash = useCallback((hash: string) => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, []);

  const handleNavigate = useCallback(
    (targetHref: string) => {
      const { route, hash } = normalizeRoute(targetHref);
      setCurrentRoute(route);

      const urlPath =
        route === "index"
          ? "/"
          : `/${route}.html${hash ? `#${hash}` : ""}`;
      window.history.pushState({ route, hash }, "", urlPath);
      scrollToHash(hash);
    },
    [scrollToHash]
  );

  useEffect(() => {
    const onPopState = () => {
      const { route, hash } = normalizeRoute(window.location.pathname + window.location.hash);
      setCurrentRoute(route);
      scrollToHash(hash);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [scrollToHash]);

  if (currentRoute === "index") {
    return <DashboardView onNavigate={handleNavigate} />;
  }

  if (currentRoute === "word-choice-bank") {
    return <WordChoiceBankView onNavigate={handleNavigate} />;
  }

  if (currentRoute === "logs/vocab-log") {
    return <LogsView mode="vocab" onNavigate={handleNavigate} />;
  }

  if (currentRoute === "logs/error-journal") {
    return <LogsView mode="error" onNavigate={handleNavigate} />;
  }

  if (currentRoute === "00-foundation/07-present-simple") {
    return <PresentSimplePilotView onNavigate={handleNavigate} />;
  }

  if (LEGACY_MODULES[currentRoute]) {
    return <LegacyModuleView data={LEGACY_MODULES[currentRoute]} onNavigate={handleNavigate} />;
  }

  if (MODULE_CONTENT[currentRoute]) {
    return (
      <GeneratedModuleView
        moduleKey={currentRoute}
        content={MODULE_CONTENT[currentRoute]}
        onNavigate={handleNavigate}
      />
    );
  }

  return <DashboardView onNavigate={handleNavigate} />;
};

export default App;
