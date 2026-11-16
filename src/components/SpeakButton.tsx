import React, { useState } from "react";
import { speakEnglish } from "../utils/speech";

interface SpeakButtonProps {
  text: string;
  label?: string;
  rate?: number;
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  label = "Listen",
  rate,
  className = "",
}) => {
  const [speaking, setSpeaking] = useState(false);

  if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSpeaking(true);
    speakEnglish(text, {
      rate,
      onEnd: () => setSpeaking(false),
    });
  };

  return (
    <button
      type="button"
      className={`speak-btn ${speaking ? "is-speaking" : ""} ${className}`.trim()}
      onClick={handleClick}
      title="Dengarkan pelafalan bahasa Inggris (mendukung suara sistem offline)"
      aria-label={`Dengarkan pelafalan: ${text}`}
    >
      {speaking ? "▪ Playing..." : `▸ ${label}`}
    </button>
  );
};
