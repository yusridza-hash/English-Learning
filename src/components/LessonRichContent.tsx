import React from "react";
import { ConceptItem, ContrastPair, StagePedagogy } from "../data/lessonEnrichment";
import { SpeakButton } from "./SpeakButton";

const GRAMMAR_TERM_REGEX =
  /\b(Noun|Pronoun|Verb|Adjective|Adverb|Preposition|Conjunction|Interjection|Subject|Object|Complement|Predicate|Clause|Phrase|Gerund|Infinitive|Participle|Passive|Active|Modal|Auxiliary|Singular|Plural|Countable|Uncountable|Determiner|Hedging|Nominalization|Inversion|Cleft|Cohesion|Collocation)s?\b/g;

const PATTERN_TOKEN_REGEX =
  /(\b(?:V1|V2|V3|V-ing|am\/is\/are|was\/were|do\/does|have\/has|had|must have|might have|should have|could have|would have)\b|(?:\s|^)-(?:s\/-es|es|ed|ing|ies|ly|tion|ment|ness|ity|ful|ous|able|ive)\b)/g;

function highlightPlainText(segment: string, keyPrefix: string): React.ReactNode[] {
  const combined = new RegExp(
    `${GRAMMAR_TERM_REGEX.source}|${PATTERN_TOKEN_REGEX.source}`,
    "g"
  );
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = combined.exec(segment)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(segment.slice(lastIndex, match.index));
    }
    const token = match[0];
    const leadingSpace = token.startsWith(" ") ? " " : "";
    const cleanToken = token.trimStart();

    if (leadingSpace) {
      nodes.push(leadingSpace);
    }

    if (new RegExp(`^${GRAMMAR_TERM_REGEX.source}$`).test(cleanToken)) {
      nodes.push(
        <strong key={`${keyPrefix}-g-${idx++}`} className="edu-term">
          {cleanToken}
        </strong>
      );
    } else {
      nodes.push(
        <span key={`${keyPrefix}-p-${idx++}`} className="edu-underline">
          {cleanToken}
        </span>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < segment.length) {
    nodes.push(segment.slice(lastIndex));
  }

  return nodes.length ? nodes : [segment];
}

export const RichText: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const tokenRegex = /(\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|`[^`]+`|\*[^*]+\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let partIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      parts.push(...highlightPlainText(plain, `pt-${partIdx++}`));
    }

    const raw = match[0];
    if (raw.startsWith("**") && raw.endsWith("**")) {
      const inner = raw.slice(2, -2);
      parts.push(
        <strong key={`b-${partIdx++}`} className="edu-bold">
          {inner}
        </strong>
      );
    } else if (raw.startsWith("__") && raw.endsWith("__")) {
      const inner = raw.slice(2, -2);
      parts.push(
        <span key={`u-${partIdx++}`} className="edu-underline">
          {inner}
        </span>
      );
    } else if (raw.startsWith("~~") && raw.endsWith("~~")) {
      const inner = raw.slice(2, -2);
      parts.push(
        <span key={`s-${partIdx++}`} className="edu-strike">
          {inner}
        </span>
      );
    } else if (raw.startsWith("`") && raw.endsWith("`")) {
      const inner = raw.slice(1, -1);
      parts.push(
        <code key={`c-${partIdx++}`} className="edu-code">
          {inner}
        </code>
      );
    } else if (raw.startsWith("*") && raw.endsWith("*")) {
      const inner = raw.slice(1, -1);
      parts.push(
        <em key={`i-${partIdx++}`} className="edu-italic">
          {inner}
        </em>
      );
    }

    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    parts.push(...highlightPlainText(text.slice(lastIndex), `tail-${partIdx++}`));
  }

  return <>{parts}</>;
};

export const LessonParagraphBlock: React.FC<{ text: string }> = ({ text }) => {
  const clauses = text.split(/;\s+/).filter((c) => c.trim().length > 0);
  if (clauses.length >= 3 && text.length > 90) {
    return (
      <ul className="lesson-points">
        {clauses.map((clause, idx) => {
          const formatted = clause.trim().replace(/\.$/, "");
          const cap = formatted.charAt(0).toUpperCase() + formatted.slice(1);
          return (
            <li key={idx}>
              <RichText text={cap} />.
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <p className="lesson-prose">
      <RichText text={text} />
    </p>
  );
};

export function extractSpeakableEnglish(raw: string): string {
  let working = raw;

  if (working.includes("✓")) {
    const afterCheck = working.split("✓").slice(1).join(" ");
    working = afterCheck;
  }

  if (working.includes("→")) {
    working = working.split("→")[0];
  }

  working = working
    .replace(/\([^)]*=[^)]*\)/g, "")
    .replace(/\([^)]*(?:noun|verb|adjective|adverb|preposition|conjunction|pronoun|subject|object|singular|plural)[^)]*\)/gi, "")
    .replace(/[✗✓▸★⚠]/g, "")
    .trim();

  return working || raw.replace(/[✗✓]/g, "").trim();
}

export const LessonExampleCard: React.FC<{ example: string }> = ({ example }) => {
  const hasArrow = example.includes("→");
  const hasContrastSymbols = example.includes("✗") || example.includes("✓");
  const speakable = extractSpeakableEnglish(example);

  if (hasContrastSymbols) {
    return (
      <div className="lesson-example-card is-contrast">
        <div className="lesson-example-top">
          <div className="lesson-example-main">
            <ContrastLineFormatter text={example} />
          </div>
          {speakable && <SpeakButton text={speakable} />}
        </div>
      </div>
    );
  }

  if (hasArrow) {
    const [leftRaw, ...rightParts] = example.split("→");
    const rightRaw = rightParts.join("→").trim();
    return (
      <div className="lesson-example-card">
        <div className="lesson-example-top">
          <div className="lesson-example-main">
            <RichText text={leftRaw.trim()} />
          </div>
          {speakable && <SpeakButton text={speakable} />}
        </div>
        {rightRaw && (
          <div className="lesson-example-note">
            <span className="lesson-arrow-badge" aria-hidden="true">
              →
            </span>
            <span>
              <RichText text={rightRaw} />
            </span>
          </div>
        )}
      </div>
    );
  }

  // Split trailing parenthetical note e.g. "I like the clean room. (clean = adjective)"
  const parenMatch = example.match(/^(.*?)(\([^()]*=[^()]*\)\.?)$/);
  if (parenMatch) {
    const sentence = parenMatch[1].trim();
    const note = parenMatch[2].replace(/^\(|\)\.?$/g, "").trim();
    return (
      <div className="lesson-example-card">
        <div className="lesson-example-top">
          <div className="lesson-example-main">
            <RichText text={sentence} />
          </div>
          {speakable && <SpeakButton text={speakable} />}
        </div>
        <div className="lesson-example-note">
          <span className="lesson-arrow-badge" aria-hidden="true">
            →
          </span>
          <span>
            <RichText text={note} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-example-card">
      <div className="lesson-example-top">
        <div className="lesson-example-main">
          <RichText text={example} />
        </div>
        {speakable && <SpeakButton text={speakable} />}
      </div>
    </div>
  );
};

const ContrastLineFormatter: React.FC<{ text: string }> = ({ text }) => {
  const segments = text.split(/(?=✗|✓)/g).filter((s) => s.trim());
  return (
    <div className="lesson-inline-contrasts">
      {segments.map((seg, i) => {
        const trimmed = seg.trim();
        if (trimmed.startsWith("✗")) {
          return (
            <div key={i} className="lesson-contrast-line is-wrong">
              <span className="lesson-status-tag is-wrong">SALAH</span>
              <span className="edu-strike">{trimmed.replace(/^✗\s*/, "")}</span>
            </div>
          );
        }
        if (trimmed.startsWith("✓")) {
          return (
            <div key={i} className="lesson-contrast-line is-right">
              <span className="lesson-status-tag is-right">BENAR</span>
              <span className="edu-good-mark">
                <RichText text={trimmed.replace(/^✓\s*/, "")} />
              </span>
            </div>
          );
        }
        return (
          <div key={i}>
            <RichText text={trimmed} />
          </div>
        );
      })}
    </div>
  );
};

export const LessonFormulaBox: React.FC<{ formula: string; note?: string }> = ({
  formula,
  note,
}) => {
  return (
    <div className="lesson-formula-box">
      <div className="lesson-box-label is-formula">Rumus &amp; Pola Inti</div>
      <div className="lesson-formula-text">
        <RichText text={formula} />
      </div>
      {note && (
        <p className="lesson-formula-note">
          <RichText text={note} />
        </p>
      )}
    </div>
  );
};

export const LessonConceptCards: React.FC<{ concepts: ConceptItem[] }> = ({ concepts }) => {
  if (!concepts.length) return null;

  return (
    <div className="lesson-concept-grid">
      {concepts.map((item, idx) => (
        <article key={idx} className="lesson-concept-card">
          <div className="lesson-concept-head">
            <h4>{item.name}</h4>
            {item.subtitle && <span className="lesson-concept-sub">{item.subtitle}</span>}
          </div>

          <p className="lesson-concept-desc">
            <RichText text={item.explanation} />
          </p>

          {(item.subTypes || item.clue) && (
            <div className="lesson-concept-meta">
              {item.subTypes && (
                <div className="lesson-concept-meta-row">
                  <span className="lesson-meta-key">Sub-jenis</span>
                  <span>
                    <RichText text={item.subTypes} />
                  </span>
                </div>
              )}
              {item.clue && (
                <div className="lesson-concept-meta-row">
                  <span className="lesson-meta-key">Ciri &amp; Posisi</span>
                  <span>
                    <RichText text={item.clue} />
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="lesson-concept-example">
            <div className="lesson-example-top">
              <span className="lesson-example-main">
                <span className="lesson-status-tag is-right">CONTOH</span>{" "}
                <RichText text={item.example} />
              </span>
              <SpeakButton text={item.example} />
            </div>
            {item.exampleNote && (
              <div className="lesson-example-note">
                <span className="lesson-arrow-badge" aria-hidden="true">
                  →
                </span>
                <span>
                  <RichText text={item.exampleNote} />
                </span>
              </div>
            )}
          </div>

          {item.wrong && item.right && (
            <div className="lesson-mini-contrast">
              <div className="lesson-contrast-line is-wrong">
                <span className="lesson-status-tag is-wrong">✗ SALAH</span>
                <span className="edu-strike">{item.wrong}</span>
              </div>
              <div className="lesson-contrast-line is-right">
                <span className="lesson-status-tag is-right">✓ BENAR</span>
                <span className="edu-good-mark">
                  <RichText text={item.right} />
                </span>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

export const LessonContrastGrid: React.FC<{ contrasts: ContrastPair[] }> = ({ contrasts }) => {
  if (!contrasts.length) return null;

  return (
    <div className="lesson-contrast-grid">
      {contrasts.map((pair, idx) => (
        <div key={idx} className="lesson-contrast-card">
          <div className="lesson-contrast-line is-wrong">
            <span className="lesson-status-tag is-wrong">✗ SALAH</span>
            <span className="edu-strike">{pair.wrong.replace(/^✗\s*/, "")}</span>
          </div>
          <div className="lesson-contrast-line is-right">
            <span className="lesson-status-tag is-right">✓ BENAR</span>
            <span className="edu-good-mark">
              <RichText text={pair.right.replace(/^✓\s*/, "")} />
            </span>
          </div>
          {pair.note && (
            <p className="lesson-contrast-note">
              <RichText text={pair.note} />
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export const LessonStageMemoryFooter: React.FC<{
  pedagogy: StagePedagogy;
  hideFormula?: boolean;
}> = ({ pedagogy, hideFormula = false }) => {
  return (
    <div className="lesson-pedagogy-footer">
      {!hideFormula && pedagogy.formula && (
        <LessonFormulaBox formula={pedagogy.formula} note={pedagogy.formulaNote} />
      )}

      {pedagogy.contrasts && pedagogy.contrasts.length > 0 && (
        <LessonContrastGrid contrasts={pedagogy.contrasts} />
      )}

      <div className="lesson-memory-grid">
        <div className="lesson-callout-box is-tip">
          <div className="lesson-box-label is-tip">★ Tips Ingat Cepat</div>
          <p>
            <RichText text={pedagogy.memoryTip} />
          </p>
        </div>
        <div className="lesson-callout-box is-trap">
          <div className="lesson-box-label is-trap">⚠ Jebakan Umum</div>
          <p>
            <RichText text={pedagogy.commonTrap} />
          </p>
        </div>
      </div>
    </div>
  );
};
