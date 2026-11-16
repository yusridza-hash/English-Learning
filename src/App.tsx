import React, { useCallback, useEffect, useState } from "react";

import { ChallengeKnowledgeView } from "./components/ChallengeKnowledgeView";
import { DashboardView } from "./components/DashboardView";
import { GeneratedModuleView } from "./components/GeneratedModuleView";
import { LegacyModuleView } from "./components/LegacyModuleView";
import { LogsView } from "./components/LogsView";
import { ModuleSidebarDrawer } from "./components/ModuleSidebarDrawer";
import { PWAUpdateNotifier } from "./components/PWAControls";
import { PresentSimplePilotView } from "./components/PresentSimplePilotView";
import { QuestionBankManagementView } from "./components/QuestionBankManagementView";
import { WordChoiceBankView } from "./components/WordChoiceBankView";
import { MODULE_CONTENT } from "./data/generatedModules";
import { LEGACY_MODULES } from "./data/legacyModules";
import { applyViewportMode, getViewportMode } from "./utils/storage";

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
    if (!hash || hash.startsWith("resume-quiz-")) {
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
      window.dispatchEvent(new Event("el_route_change"));
      scrollToHash(hash);
    },
    [scrollToHash]
  );

  useEffect(() => {
    applyViewportMode(getViewportMode());
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const { route, hash } = normalizeRoute(window.location.pathname + window.location.hash);
      setCurrentRoute(route);
      window.dispatchEvent(new Event("el_route_change"));
      scrollToHash(hash);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [scrollToHash]);

  let activeView: React.ReactNode;
  if (currentRoute === "index") {
    activeView = <DashboardView onNavigate={handleNavigate} />;
  } else if (currentRoute === "challenge-knowledge") {
    activeView = <ChallengeKnowledgeView onNavigate={handleNavigate} />;
  } else if (currentRoute === "question-bank") {
    activeView = <QuestionBankManagementView onNavigate={handleNavigate} />;
  } else if (currentRoute === "word-choice-bank") {
    activeView = <WordChoiceBankView onNavigate={handleNavigate} />;
  } else if (currentRoute === "logs/vocab-log") {
    activeView = <LogsView mode="vocab" onNavigate={handleNavigate} />;
  } else if (currentRoute === "logs/error-journal") {
    activeView = <LogsView mode="error" onNavigate={handleNavigate} />;
  } else if (currentRoute === "00-foundation/07-present-simple") {
    activeView = <PresentSimplePilotView onNavigate={handleNavigate} />;
  } else if (LEGACY_MODULES[currentRoute]) {
    activeView = <LegacyModuleView data={LEGACY_MODULES[currentRoute]} onNavigate={handleNavigate} />;
  } else if (MODULE_CONTENT[currentRoute]) {
    activeView = (
      <GeneratedModuleView
        moduleKey={currentRoute}
        content={MODULE_CONTENT[currentRoute]}
        onNavigate={handleNavigate}
      />
    );
  } else {
    activeView = <DashboardView onNavigate={handleNavigate} />;
  }

  return (
    <>
      <ModuleSidebarDrawer currentRoute={currentRoute} onNavigate={handleNavigate} />
      <PWAUpdateNotifier />
      {activeView}
    </>
  );
};

export default App;
