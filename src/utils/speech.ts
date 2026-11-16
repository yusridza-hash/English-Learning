export interface SpeechVoiceInfo {
  supported: boolean;
  hasOfflineVoice: boolean;
  voiceName: string;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export function selectBestEnglishVoice(): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (!voices.length) return null;

  const englishVoices = voices.filter((v) => /^en(-|_|$)/i.test(v.lang));
  if (!englishVoices.length) return voices[0] || null;

  // Prioritize localService === true so speech works 100% offline without internet
  const offlineUSOrGB = englishVoices.find(
    (v) => v.localService && /^en-(US|GB)/i.test(v.lang)
  );
  if (offlineUSOrGB) return offlineUSOrGB;

  const anyOfflineEnglish = englishVoices.find((v) => v.localService);
  if (anyOfflineEnglish) return anyOfflineEnglish;

  const preferredOnline = englishVoices.find((v) => /^en-(US|GB)/i.test(v.lang));
  return preferredOnline || englishVoices[0];
}

export function getSpeechVoiceInfo(): SpeechVoiceInfo {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return {
      supported: false,
      hasOfflineVoice: false,
      voiceName: "Tidak didukung browser",
    };
  }
  const best = selectBestEnglishVoice();
  if (!best) {
    return {
      supported: true,
      hasOfflineVoice: true,
      voiceName: "System Default English (Offline-capable)",
    };
  }
  return {
    supported: true,
    hasOfflineVoice: Boolean(best.localService),
    voiceName: `${best.name} (${best.lang}${best.localService ? " · Offline" : ""})`,
  };
}

export function getSpeechRate(): number {
  try {
    const saved = localStorage.getItem("el_speech_rate");
    if (saved === "slow") return 0.82;
    return 1.0;
  } catch {
    return 1.0;
  }
}

export function setSpeechRateMode(mode: "normal" | "slow"): void {
  try {
    localStorage.setItem("el_speech_rate", mode);
  } catch {
    // ignore
  }
}

export function cleanTextForSpeech(raw: string): string {
  return raw
    .replace(/_{2,}/g, " blank ")
    .replace(/[✗✓→]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function speakEnglish(
  text: string,
  options?: { rate?: number; onEnd?: () => void }
): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    options?.onEnd?.();
    return false;
  }

  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) {
    options?.onEnd?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = "en-US";
    utterance.rate = options?.rate ?? getSpeechRate();

    const voice = selectBestEnglishVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onend = () => options?.onEnd?.();
    utterance.onerror = () => options?.onEnd?.();

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    options?.onEnd?.();
    return false;
  }
}
