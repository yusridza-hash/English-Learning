import React, { useState } from "react";
import { ModuleQuestion } from "../data/generatedModules";

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
}

export const GuidedQuestionItem: React.FC<GuidedQuestionItemProps> = ({
  question,
  questionIndex,
  state,
  onUpdateState,
  fallbackSecondHint = "Periksa lagi pola grammar yang dibahas pada materi.",
}) => {
  const [selectedTokens, setSelectedTokens] = useState<number[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [feedbackState, setFeedbackState] = useState<"pass" | "retry" | "review" | undefined>(undefined);
  const [fieldsetState, setFieldsetState] = useState<"pass" | "retry" | "review" | undefined>(undefined);

  const getCorrectAnswerText = (): string => {
    return Array.isArray(question.answer)
      ? question.answer.map((tokenIndex) => question.options[tokenIndex]).join(" ")
      : question.options[question.answer];
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

  const handleBuildReset = () => {
    if (state.completed) return;
    setSelectedTokens([]);
  };

  return (
    <fieldset className="question guided-question" data-state={fieldsetState}>
      <legend>
        {questionIndex + 1}. {question.prompt}
      </legend>

      {question.dialogue && (
        <div className="guided-dialogue">
          {question.dialogue.map(([speaker, line], idx) => (
            <p key={idx} className={`guided-dialogue-line${idx % 2 ? " is-reply" : ""}`}>
              <b>{speaker}</b>
              <span>{line}</span>
            </p>
          ))}
        </div>
      )}

      {question.draft && (
        <p className="guided-draft">
          <span>Draft</span>
          {question.draft}
        </p>
      )}

      {question.type === "build" ? (
        <div className="guided-build-activity">
          <div className="guided-built" aria-live="polite">
            {selectedTokens.map((tIdx, i) => (
              <span key={`${tIdx}-${i}`} className="guided-selected-word">
                {question.options[tIdx]}
              </span>
            ))}
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
          <button
            type="button"
            className="check-quiz guided-build-check"
            disabled={state.completed || selectedTokens.length !== question.options.length}
            onClick={() => handleAnswer(selectedTokens.slice())}
          >
            Periksa susunan
          </button>{" "}
          <button
            type="button"
            className="guided-reset"
            disabled={state.completed}
            onClick={handleBuildReset}
          >
            Ulangi susunan
          </button>
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

      <p
        className="guided-question-feedback"
        aria-live="polite"
        data-state={feedbackState}
        hidden={!feedbackText}
      >
        {feedbackText}
      </p>
    </fieldset>
  );
};
