import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

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

// ============================================================
// GLOBAL PWA UPDATE STATE & CONTROLLER
// ============================================================
export interface PWAUpdateState {
  needRefresh: boolean;
  offlineReady: boolean;
  isDismissed: boolean;
  isChecking: boolean;
  isUpdating: boolean;
  statusMessage: string;
}

let updateState: PWAUpdateState = {
  needRefresh: false,
  offlineReady: false,
  isDismissed: false,
  isChecking: false,
  isUpdating: false,
  statusMessage: "",
};

const updateStateListeners = new Set<(state: PWAUpdateState) => void>();

function patchPWAUpdateState(patch: Partial<PWAUpdateState>) {
  updateState = { ...updateState, ...patch };
  updateStateListeners.forEach((cb) => cb(updateState));
}

let activeRegistration: ServiceWorkerRegistration | undefined;
let activeUpdateRunner: ((reloadPage?: boolean) => Promise<void>) | undefined;
let lastAutoCheckAt = 0;
let statusClearTimer: number | undefined;

function scheduleClearStatus(delayMs = 4500) {
  if (typeof window === "undefined") return;
  if (statusClearTimer) window.clearTimeout(statusClearTimer);
  statusClearTimer = window.setTimeout(() => {
    patchPWAUpdateState({ statusMessage: "" });
  }, delayMs);
}

async function resolveRegistration(): Promise<ServiceWorkerRegistration | undefined> {
  if (activeRegistration) return activeRegistration;
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) activeRegistration = reg;
      return reg;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export async function checkForPWAUpdate(options: { manual?: boolean } = {}): Promise<boolean> {
  const manual = !!options.manual;

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    if (manual) {
      patchPWAUpdateState({
        isChecking: false,
        statusMessage: "Sedang offline — hubungkan internet untuk cek update.",
      });
      scheduleClearStatus(5000);
    }
    return false;
  }

  const now = Date.now();
  if (!manual && now - lastAutoCheckAt < 30_000) {
    return false;
  }
  lastAutoCheckAt = now;

  if (updateState.needRefresh) {
    patchPWAUpdateState({ isDismissed: false, statusMessage: "" });
    return true;
  }

  const reg = await resolveRegistration();
  if (!reg) {
    if (manual) {
      patchPWAUpdateState({
        isChecking: false,
        statusMessage: "Service Worker belum aktif di sesi browser ini.",
      });
      scheduleClearStatus(4500);
    }
    return false;
  }

  if (reg.waiting) {
    patchPWAUpdateState({
      needRefresh: true,
      isDismissed: false,
      isChecking: false,
      statusMessage: "",
    });
    return true;
  }

  if (manual) {
    patchPWAUpdateState({
      isChecking: true,
      statusMessage: "Memeriksa pembaruan terbaru...",
    });
  }

  try {
    await reg.update();

    if (reg.waiting) {
      patchPWAUpdateState({
        needRefresh: true,
        isDismissed: false,
        isChecking: false,
        statusMessage: "",
      });
      return true;
    }

    if (reg.installing) {
      const installingWorker = reg.installing;
      await new Promise<void>((resolve) => {
        const timeout = window.setTimeout(resolve, 6000);
        installingWorker.addEventListener("statechange", () => {
          if (installingWorker.state === "installed" || installingWorker.state === "redundant") {
            window.clearTimeout(timeout);
            resolve();
          }
        });
      });

      if (reg.waiting) {
        patchPWAUpdateState({
          needRefresh: true,
          isDismissed: false,
          isChecking: false,
          statusMessage: "",
        });
        return true;
      }
    }

    if (manual) {
      patchPWAUpdateState({
        isChecking: false,
        statusMessage: "Aplikasi sudah memakai versi terbaru.",
      });
      scheduleClearStatus(4000);
    } else {
      patchPWAUpdateState({ isChecking: false });
    }
    return false;
  } catch {
    if (manual) {
      patchPWAUpdateState({
        isChecking: false,
        statusMessage: "Gagal memeriksa update. Coba lagi saat koneksi stabil.",
      });
      scheduleClearStatus(4500);
    } else {
      patchPWAUpdateState({ isChecking: false });
    }
    return false;
  }
}

export async function applyPWAUpdate(): Promise<void> {
  patchPWAUpdateState({ isUpdating: true, isDismissed: false });

  try {
    if (activeUpdateRunner) {
      await activeUpdateRunner(true);
    } else if (activeRegistration?.waiting) {
      activeRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  } catch {
    // Fallback below will handle page refresh
  }

  // Guarantee installed standalone PWA refreshes even if controllerchange lags
  window.setTimeout(() => {
    window.location.reload();
  }, 1400);
}

export function dismissPWAUpdatePrompt(): void {
  patchPWAUpdateState({ isDismissed: true });
}

export function reopenPWAUpdatePrompt(): void {
  patchPWAUpdateState({ isDismissed: false });
}

export function usePWAUpdateStatus(): PWAUpdateState {
  const [state, setState] = useState<PWAUpdateState>(() => updateState);

  useEffect(() => {
    const listener = (next: PWAUpdateState) => setState(next);
    updateStateListeners.add(listener);
    setState(updateState);
    return () => {
      updateStateListeners.delete(listener);
    };
  }, []);

  return state;
}

// ============================================================
// ROOT UPDATE NOTIFIER COMPONENT (Mount once in App.tsx)
// ============================================================
export const PWAUpdateNotifier: React.FC = () => {
  const intervalRef = useRef<number | undefined>(undefined);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      activeRegistration = registration;

      if (registration.waiting) {
        setNeedRefresh(true);
        patchPWAUpdateState({ needRefresh: true, isDismissed: false });
      }

      // Immediately check server when PWA launches
      void checkForPWAUpdate({ manual: false });

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      // Periodic background check every 10 minutes while app stays open
      intervalRef.current = window.setInterval(() => {
        void checkForPWAUpdate({ manual: false });
      }, 10 * 60 * 1000);
    },
    onNeedRefresh() {
      patchPWAUpdateState({ needRefresh: true, isDismissed: false, isChecking: false });
    },
    onOfflineReady() {
      patchPWAUpdateState({ offlineReady: true });
    },
  });

  useEffect(() => {
    activeUpdateRunner = updateServiceWorker;
  }, [updateServiceWorker]);

  useEffect(() => {
    patchPWAUpdateState({ needRefresh });
  }, [needRefresh]);

  useEffect(() => {
    patchPWAUpdateState({ offlineReady });
  }, [offlineReady]);

  // Auto-hide offlineReady toast cleanly after 6 seconds
  useEffect(() => {
    if (!offlineReady) return;
    const timer = window.setTimeout(() => {
      setOfflineReady(false);
      patchPWAUpdateState({ offlineReady: false });
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [offlineReady, setOfflineReady]);

  // Check for updates automatically when resuming PWA or reconnecting online
  useEffect(() => {
    const handleWakeCheck = () => {
      if (typeof document !== "undefined" && document.hidden) return;
      void checkForPWAUpdate({ manual: false });
    };

    window.addEventListener("focus", handleWakeCheck);
    window.addEventListener("online", handleWakeCheck);
    document.addEventListener("visibilitychange", handleWakeCheck);

    return () => {
      window.removeEventListener("focus", handleWakeCheck);
      window.removeEventListener("online", handleWakeCheck);
      document.removeEventListener("visibilitychange", handleWakeCheck);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const shared = usePWAUpdateStatus();

  const handleCloseOfflineReady = useCallback(() => {
    setOfflineReady(false);
    patchPWAUpdateState({ offlineReady: false });
  }, [setOfflineReady]);

  const showUpdatePrompt = (needRefresh || shared.needRefresh) && !shared.isDismissed;

  return (
    <>
      {showUpdatePrompt && (
        <aside
          className="pwa-update-toast"
          role="alertdialog"
          aria-live="assertive"
          aria-labelledby="pwaUpdateTitle"
          aria-describedby="pwaUpdateDesc"
        >
          <div className="pwa-update-toast-head">
            <strong id="pwaUpdateTitle">Versi baru tersedia</strong>
            <span className="pwa-update-badge">UPDATE</span>
          </div>
          <p id="pwaUpdateDesc" className="pwa-update-toast-desc">
            Ada pembaruan English Learning. Perbarui langsung di sini agar materi &amp; soal terbaru
            aktif tanpa perlu membuka web secara manual.
          </p>
          <div className="pwa-update-toast-actions">
            <button
              type="button"
              className="pwa-update-primary-btn"
              onClick={() => void applyPWAUpdate()}
              disabled={shared.isUpdating}
            >
              {shared.isUpdating ? "Memperbarui..." : "Perbarui sekarang"}
            </button>
            <button
              type="button"
              className="pwa-update-secondary-btn"
              onClick={dismissPWAUpdatePrompt}
              disabled={shared.isUpdating}
            >
              Nanti
            </button>
          </div>
        </aside>
      )}

      {!showUpdatePrompt && offlineReady && (
        <div className="pwa-offline-ready-toast" role="status" aria-live="polite">
          <span>
            <b>Siap Offline</b> — Seluruh materi dan 3.480+ soal sudah tersimpan di perangkat.
          </span>
          <button
            type="button"
            className="pwa-toast-close-btn"
            onClick={handleCloseOfflineReady}
            aria-label="Tutup notifikasi siap offline"
          >
            Tutup
          </button>
        </div>
      )}
    </>
  );
};

// ============================================================
// INSTALL & INLINE UPDATE HOOK + BUTTON (.nav-utilities)
// ============================================================
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
  const updateStatus = usePWAUpdateStatus();
  const [showGuide, setShowGuide] = useState(false);

  // If an update is waiting, always surface quick one-tap access in nav utilities
  if (updateStatus.needRefresh) {
    return (
      <button
        type="button"
        onClick={() => {
          if (updateStatus.isDismissed) {
            reopenPWAUpdatePrompt();
          } else {
            void applyPWAUpdate();
          }
        }}
        className="theme-toggle is-update-ready"
        disabled={updateStatus.isUpdating}
        title="Versi baru English Learning tersedia — klik untuk memperbarui aplikasi"
      >
        {updateStatus.isUpdating ? "↻ Memperbarui..." : "● Update Tersedia"}
      </button>
    );
  }

  // Inside installed standalone PWA, turn this slot into a quick "Cek Update" control
  if (isInstalled) {
    return (
      <button
        type="button"
        onClick={() => void checkForPWAUpdate({ manual: true })}
        className="theme-toggle"
        disabled={updateStatus.isChecking}
        title={updateStatus.statusMessage || "Periksa apakah ada versi terbaru di server"}
      >
        {updateStatus.isChecking
          ? "↻ Mengecek..."
          : updateStatus.statusMessage === "Aplikasi sudah memakai versi terbaru."
            ? "✓ Versi Terbaru"
            : "↻ Cek Update"}
      </button>
    );
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
