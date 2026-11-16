import React, { useState } from "react";
import { ModuleQuestion } from "../data/generatedModules";
import { addErrorJournalEntry } from "../utils/storage";
import { SpeakButton } from "./SpeakButton";

export interface QuestionProgressState {
  attempts: number;
  points: number;
  correct: boolean;
  completed: boolean;
}

interface GuidedQuestionItemProps {
  question: ModuleQuestion;
  questionIndex: number;
  state: QuestionProgressState;
  onUpdateState: (nextState: QuestionProgressState) => void;
  fallbackSecondHint?: string;
  moduleKey?: string;
}

export const GuidedQuestionItem: React.FC<GuidedQuestionItemProps> = ({
  question,
  questionIndex,
  state,
  onUpdateState,
  fallbackSecondHint = "Periksa lagi pola grammar yang dibahas pada materi.",
  moduleKey = "00-foundation/07-present-simple",
}) => {
  const [selectedTokens, setSelectedTokens] = useState<number[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [feedbackState, setFeedbackState] = useState<"pass" | "retry" | "review" | undefined>(undefined);
  const [fieldsetState, setFieldsetState] = useState<"pass" | "retry" | "review" | undefined>(undefined);
  const [lastWrongText, setLastWrongText] = useState<string>("");
  const [savedToJournal, setSavedToJournal] = useState<boolean>(false);

  const getCorrectAnswerText = (): string => {
    return Array.isArray(question.answer)
      ? question.answer.map((tokenIndex) => question.options[tokenIndex]).join(" ")
      : question.options[question.answer];
  };

  const buildFullSentence = (chosenText: string): string => {
    if (question.prompt.includes("___")) {
      return question.prompt.replace("___", chosenText);
    }
    if (question.dialogue && question.dialogue.length > 0) {
      const lastLine = question.dialogue[question.dialogue.length - 1][1];
      if (lastLine.includes("___")) {
        return lastLine.replace("___", chosenText);
      }
    }
    return chosenText;
  };

  const handleSaveToErrorJournal = () => {
    const correctAns = getCorrectAnswerText();
    const correctFull = buildFullSentence(correctAns);
    const wrongFull =
      lastWrongText ||
      question.draft ||
      question.prompt;
    const rule = question.explanation || fallbackSecondHint;

    addErrorJournalEntry({
      moduleKey,
      wrongSentence: wrongFull,
      correctSentence: correctFull,
      ruleNote: rule,
    });
    setSavedToJournal(true);
  };

  const handleAnswer = (selection: number | number[]) => {
    if (state.completed) return;

    const isCorrect = Array.isArray(question.answer)
      ? Array.isArray(selection) &&
        selection.length === question.answer.length &&
        selection.every((token, idx) => token === (question.answer as number[])[idx])
      : selection === question.answer;

    if (isCorrect) {
      const earnedPoints = Math.max(1, 3 - state.attempts);
      const nextState: QuestionProgressState = {
        attempts: state.attempts,
        points: earnedPoints,
        correct: true,
        completed: true,
      };
      setFeedbackText(`Tepat · ${earnedPoints}/3 poin. ${question.explanation || ""}`);
      setFeedbackState("pass");
      setFieldsetState("pass");
      onUpdateState(nextState);
      return;
    }

    const chosenWrongText = Array.isArray(selection)
      ? selection.map((idx) => question.options[idx]).join(" ")
      : question.options[selection] || "";
    const wrongSentenceCandidate = buildFullSentence(chosenWrongText);
    setLastWrongText(wrongSentenceCandidate);

    const nextAttempts = state.attempts + 1;
    if (nextAttempts < 3) {
      const optionHint = Array.isArray(selection) ? undefined : question.wrongFeedback?.[selection];
      const targetedHint = Array.isArray(optionHint)
        ? optionHint[nextAttempts - 1] || optionHint[0]
        : optionHint;
      const defaultHints = [
        "Periksa subject dan petunjuk waktu pada kalimat.",
        fallbackSecondHint,
      ];
      const hint =
        targetedHint ||
        question.hints?.[nextAttempts - 1] ||
        question.skillHint?.[nextAttempts - 1] ||
        defaultHints[nextAttempts - 1];

      setFeedbackText(`${nextAttempts === 1 ? "Belum tepat." : "Coba lagi."} ${hint}`);
      setFeedbackState("retry");
      setFieldsetState("retry");
      onUpdateState({
        ...state,
        attempts: nextAttempts,
      });
      return;
    }

    const answerText = getCorrectAnswerText().replace(/[.!?]+$/, "");
    setFeedbackText(`Jawaban: ${answerText}. ${question.explanation || ""}`);
    setFeedbackState("review");
    setFieldsetState("review");

    // Auto-save 3-strike mistakes to Error Journal so the learner can review later
    addErrorJournalEntry({
      moduleKey,
      wrongSentence: wrongSentenceCandidate || question.draft || question.prompt,
      correctSentence: buildFullSentence(getCorrectAnswerText()),
      ruleNote: question.explanation || fallbackSecondHint,
    });
    setSavedToJournal(true);

    onUpdateState({
      attempts: nextAttempts,
      points: 0,
      correct: false,
      completed: true,
    });
  };

  const handleTokenClick = (tokenIndex: number) => {
    if (state.completed || selectedTokens.includes(tokenIndex)) return;
    setSelectedTokens((prev) => [...prev, tokenIndex]);
  };

  const handleBuildUndo = () => {
    if (state.completed || selectedTokens.length === 0) return;
    setSelectedTokens((prev) => prev.slice(0, -1));
  };

  const handleRemoveTokenAt = (indexToRemove: number) => {
    if (state.completed) return;
    setSelectedTokens((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleBuildReset = () => {
    if (state.completed) return;
    setSelectedTokens([]);
  };

  const speakableText = state.completed
    ? buildFullSentence(getCorrectAnswerText())
    : question.dialogue
    ? question.dialogue.map(([sp, ln]) => `${sp}: ${ln}`).join(". ")
    : question.draft || question.prompt;

  return (
    <fieldset className="question guided-question" data-state={fieldsetState}>
      <legend className="question-legend-row">
        <span>
          {questionIndex + 1}. {question.prompt}
        </span>
        <SpeakButton text={speakableText} label="Listen" />
      </legend>

      {question.dialogue && (
        <div className="guided-dialogue">
          {question.dialogue.map(([speaker, line], idx) => (
            <p key={idx} className={`guided-dialogue-line${idx % 2 ? " is-reply" : ""}`}>
              <b>{speaker}</b>
              <span>{line}</span>
              <SpeakButton text={line} label={`Dengar ${speaker}`} />
            </p>
          ))}
        </div>
      )}

      {question.draft && (
        <p className="guided-draft" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
          <span>
            <span style={{ fontWeight: 600, marginRight: "0.5rem" }}>Draft:</span>
            {question.draft}
          </span>
          <SpeakButton text={question.draft} label="Dengar draft" />
        </p>
      )}

      {question.type === "build" ? (
        <div className="guided-build-activity">
          <div className="guided-built" aria-live="polite">
            {selectedTokens.length === 0 ? (
              <span className="text-muted" style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
                Pilih kata-kata di bawah untuk menyusun kalimat...
              </span>
            ) : (
              selectedTokens.map((tIdx, i) => (
                <button
                  key={`${tIdx}-${i}`}
                  type="button"
                  className="guided-selected-word"
                  title="Klik untuk menghapus kata ini"
                  disabled={state.completed}
                  onClick={() => handleRemoveTokenAt(i)}
                  style={{ cursor: state.completed ? "default" : "pointer" }}
                >
                  {question.options[tIdx]} <span style={{ opacity: 0.5, fontSize: "0.75em" }}>×</span>
                </button>
              ))
            )}
          </div>
          <div className="guided-word-bank">
            {question.options.map((token, tokenIndex) => {
              const isUsed = selectedTokens.includes(tokenIndex);
              return (
                <button
                  key={tokenIndex}
                  type="button"
                  className="guided-word"
                  disabled={state.completed || isUsed}
                  onClick={() => handleTokenClick(tokenIndex)}
                >
                  {token}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              className="check-quiz guided-build-check"
              disabled={state.completed || selectedTokens.length !== question.options.length}
              onClick={() => handleAnswer(selectedTokens.slice())}
            >
              Periksa susunan
            </button>
            <button
              type="button"
              className="guided-reset"
              disabled={state.completed || selectedTokens.length === 0}
              onClick={handleBuildUndo}
              title="Hapus kata paling belakang"
            >
              ⌫ Hapus kata terakhir
            </button>
            <button
              type="button"
              className="guided-reset"
              disabled={state.completed || selectedTokens.length === 0}
              onClick={handleBuildReset}
            >
              Ulangi semua
            </button>
          </div>
        </div>
      ) : (
        <div className="guided-answer-choices">
          {question.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              type="button"
              className="guided-answer-choice"
              disabled={state.completed}
              onClick={() => handleAnswer(optionIndex)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {feedbackText && (
        <div
          className="guided-question-feedback"
          aria-live="polite"
          data-state={feedbackState}
        >
          <span>{feedbackText}</span>
          {(state.attempts > 0 || feedbackState === "retry" || feedbackState === "review") && (
            <div className="question-feedback-actions">
              <button
                type="button"
                className="journal-save-btn"
                disabled={savedToJournal}
                onClick={handleSaveToErrorJournal}
              >
                {savedToJournal ? "✓ Tersimpan di Error Journal" : "+ Simpan ke Error Journal"}
              </button>
              {state.completed && (
                <SpeakButton
                  text={buildFullSentence(getCorrectAnswerText())}
                  label="Dengar Kalimat Benar"
                />
              )}
            </div>
          )}
        </div>
      )}
    </fieldset>
  );
};
