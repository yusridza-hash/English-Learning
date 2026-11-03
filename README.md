# English Learning — React Application

Interactive English grammar curriculum and practice application rewritten in React, TypeScript, and Vite.

## Features

- **Curriculum Dashboard**: Tracks progress across 5 levels (`00-foundation` to `04-advanced-formal`) and 58 modules, including completion status (`LULUS`, `PROSES`, `BELUM`), average quiz scores, quiz history log, and progress reset.
- **Guided Learning Modules (58 Modules)**:
  - **Present Simple Pilot (`00-foundation/07-present-simple`)**: Three-stage material (`Simple`, `Intermediate`, `Complex`), 30 interactive questions (multiple choice, dialogue completion, sentence building, and draft editing) with progressive hints, 3-attempt scoring, skill-based review links, and a self-reflection writing & checklist section.
  - **Generated & Structured Modules**: Three-level grammar explanations, examples, rules, self-checklists (`el_check`), and interactive quizzes (`el_quiz`).
- **Integrated Question Bank (`Word Bank`)**: Filterable practice bank across all 58 modules and difficulty levels with explanations, hints, and skill review links.
- **Vocab Log & Error Journal**: Persistent study logs stored in `localStorage` (`el_vocab`, `el_errors`).

## Development

```bash
npm install
npm run dev
```

The development server listens on `http://0.0.0.0:3000`.