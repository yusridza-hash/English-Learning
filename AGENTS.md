# English Learning: Module Authoring Guide

This file is the canonical instruction for AI agents extending this project. Use the Present Simple pilot as the reference for the learning flow, not as permission to change every module at once.

## Reference Implementation

- Pilot page: `00-foundation/07-present-simple.html`
- Pilot quiz engine: `assets/js/present-simple-quiz.js`
- Shared visual system: `assets/css/style.css`
- Keep changes limited to the requested module unless the user explicitly asks for a broader rollout.

## Learning Sequence

1. Present the teaching material before the exercises.
2. Organize material into three levels: Simple, Intermediate, and Complex.
3. Explain the core pattern, when it is used, how its form changes, and common mistakes. Move from basic forms to context-dependent choices.
4. Use realistic examples from daily, work, travel, or academic contexts as appropriate. Include Indonesian translations when they help explain meaning.
5. Put all level quizzes after the material. Do not interleave quizzes into the explanation.
6. Add a direct shortcut from each material level to its matching quiz, and a return link from that quiz to the material. Do not force learners through a locked sequence; they may jump ahead and return to review.
7. Finish with an optional real-world writing or speaking task. Treat it as reflection/self-check; do not claim to grade free text automatically unless a reliable rubric is implemented.

For the Present Simple pilot, keep these anchor IDs:

- Material: `materi-simple`, `materi-intermediate`, `materi-complex`
- Quiz: `latihan-simple`, `latihan-intermediate`, `latihan-complex`

## Quiz Design

- Include at least 10 questions for each level. The pilot has 30 questions total.
- Avoid a radio-only quiz. Use a pedagogically appropriate mix of direct choices, dialogue completion, sentence building, and editing/correction tasks.
- Each question needs one unambiguous answer and a concise explanation that teaches the rule or reasoning.
- Provide up to two progressive, topic-specific hints that do not reveal the answer. The engine may use its generic fallback if hints are omitted, but new questions should supply specific hints.
- Give feedback per question. First and second mistakes should offer hints; after the third mistake, show the answer and explanation so the learner can continue.
- The pilot awards 3 points for a correct first try, 2 after one mistake, 1 after two mistakes, and 0 after three mistakes. Normalize earned points to a 0-100 module score.
- Save the module score to `localStorage` key `el_quiz` only after all quiz questions have been resolved. The dashboard pass threshold is 80% plus three completed checklist items.

### Question Data Shape

The pilot uses `makeQuestion(prompt, options, answer, explanation, extra = {})` in `assets/js/present-simple-quiz.js`.

- Default type: a set of answer choices; `answer` is the correct option index.
- Dialogue: pass `type: "dialogue"` and `dialogue: [[speaker, line], ...]` in `extra`.
- Edit/correction: pass `type: "edit"` and a `draft` sentence in `extra`.
- Sentence building: pass `type: "build"`; `options` is the word-token bank and `answer` is an array of token indices in the target order.
- Add `hints: [firstHint, secondHint]` in `extra` when appropriate.
- Tag each question with a `skill` key. Add the key to the pilot's skill guide with a concise label and the matching material anchor.
- Use `wrongFeedback: { optionIndex: [firstHint, secondHint] }` when a distractor represents a specific misconception. Hints should guide reasoning without immediately revealing the answer.

When authoring new data, ensure every build token is used exactly once and the answer index/order matches the displayed choices.
Each level's result should summarize weak skills and link directly to the relevant material section. Keep the learner free to jump between level material and its quiz.

## Progress and File Contract

- Keep each page's `body[data-module]` equal to its `level/module` key.
- Preserve the module URL convention: `{level}/{module}.html`.
- Keep quiz scores in `el_quiz` and checklist arrays in `el_check`; do not rename or clear these keys.
- Checklist items must use `data-check`, so existing dashboard completion logic can find them.
- Do not add a key to `BUILT` unless the corresponding module page exists.
- The pilot is self-contained and uses its own quiz engine. Other modules currently use the shared renderer in `assets/js/module.js`; do not replace or alter that shared behavior to implement a single-module experiment.

## Visual and Accessibility Rules

- Preserve the project's editorial black-and-white palette. Use existing tokens such as `--ink`, `--paper`, `--muted`, `--line`, `--hairline`, and `--bg-soft`.
- Do not copy the reference page's blue, teal, yellow, dark-mode palette, rounded-card treatment, or external font dependency.
- Scope pilot-specific styles under `.guided-learning`; avoid changing unrelated modules.
- Keep sections unframed; use strong rules, spacing, tables, and restrained callouts. Keep corners sharp in line with `--radius: 0px`.
- Use semantic headings, fieldsets/legends for question groups, keyboard-operable buttons, visible focus, and `aria-live` feedback. Respect reduced-motion settings.
- Make anchor shortcuts and all quiz controls usable on narrow screens without horizontal page overflow.

## Validation Checklist

Before declaring a module expansion complete:

- Confirm material appears before its quiz and covers all three levels.
- Confirm each level has at least 10 questions and the answer key matches every question.
- Confirm the material-to-quiz and quiz-to-material links target real IDs.
- Test choice, dialogue, build, and edit interactions that the module uses, including hints, explanations, retry limits, and score calculation.
- Confirm score/checklist persistence uses `el_quiz` and `el_check` and the dashboard still computes status correctly.
- Run file diagnostics and check mobile/desktop for overflow.
