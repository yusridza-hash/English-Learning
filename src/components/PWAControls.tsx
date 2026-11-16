import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
const promptListeners = new Set<(e: BeforeInstallPromptEvent | null) => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    promptListeners.forEach((cb) => cb(globalDeferredPrompt));
  });

  window.addEventListener("appinstalled", () => {
    globalDeferredPrompt = null;
    promptListeners.forEach((cb) => cb(null));
  });
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    () => globalDeferredPrompt
  );
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    const handlePromptUpdate = (evt: BeforeInstallPromptEvent | null) => {
      setDeferredPrompt(evt);
    };
    promptListeners.add(handlePromptUpdate);

    if (globalDeferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt);
    }

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      globalDeferredPrompt = null;
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      promptListeners.delete(handlePromptUpdate);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const install = async () => {
    const targetPrompt = deferredPrompt || globalDeferredPrompt;
    if (!targetPrompt) return false;
    await targetPrompt.prompt();
    const { outcome } = await targetPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setDeferredPrompt(null);
      globalDeferredPrompt = null;
      return true;
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    install,
  };
}

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setShowGuide((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="theme-toggle"
        title={
          isIOS
            ? "Petunjuk pasang aplikasi di iPhone / iPad"
            : "Pasang aplikasi agar bisa dibuka langsung dan dipakai offline"
        }
      >
        {isIOS ? "↓ Install iOS" : "↓ Install App"}
      </button>
      {showGuide && (
        <div
          className="pwa-ios-guide"
          role="dialog"
          aria-label="Petunjuk instalasi aplikasi offline"
        >
          {isIOS ? (
            <p>
              <b>Pasang di iPhone / iPad (Offline Ready):</b> 1. Ketuk tombol{" "}
              <b>Share</b> di Safari · 2. Pilih <b>Add to Home Screen</b>.
            </p>
          ) : (
            <p>
              <b>Pasang di Android / Chrome (Offline Ready):</b> 1. Pastikan link dibuka lewat{" "}
              <b>Google Chrome</b> (bukan browser dalam aplikasi) · 2. Ketuk menu{" "}
              <b>⋮</b> di pojok kanan atas · 3. Pilih <b>Install app</b> /{" "}
              <b>Tambahkan ke Layar utama</b>.
            </p>
          )}
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setShowGuide(false)}
          >
            Tutup
          </button>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="offline-banner" role="status" aria-live="polite">
      <b>MODE OFFLINE AKTIF</b> — Seluruh 58 modul, kuis, penyimpanan lokal, dan suara sistem tetap berjalan tanpa internet.
    </div>
  );
};
