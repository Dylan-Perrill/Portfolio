"use client";

import { useState } from "react";

export type QuizItem = { question: string; choices: readonly string[]; answer: string };

export function Quiz({ title, items }: { title: string; items: readonly QuizItem[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = items[index];
  const locked = selected !== null;
  const correct = locked && selected === current.answer;

  function choose(choice: string) {
    if (locked || finished) return;
    setSelected(choice);
    if (choice === current.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= items.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <section aria-labelledby="quiz-title" className="border-2 border-ink p-6 md:p-8">
      <h2 id="quiz-title" className="type-title-sm">
        {title}
      </h2>

      {!finished ? (
        <div className="mt-6">
          <p className="text-meta uppercase text-ink-3">
            Question {index + 1} of {items.length}
          </p>
          <p id="quiz-question" className="mt-2 font-extrabold">
            {current.question}
          </p>
          <div role="group" aria-labelledby="quiz-question" className="mt-4 grid gap-2">
            {current.choices.map((c) => {
              const isAnswer = locked && c === current.answer;
              const isWrongPick = locked && c === selected && !isAnswer;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => choose(c)}
                  disabled={locked}
                  aria-pressed={selected === c}
                  className={[
                    "border-2 px-4 py-3 text-left font-semibold transition-colors",
                    isAnswer ? "border-blue bg-blue text-paper" : "",
                    isWrongPick ? "border-ink bg-ink text-paper line-through" : "",
                    !isAnswer && !isWrongPick ? "border-ink hover:bg-ink hover:text-paper disabled:opacity-60 disabled:hover:bg-paper disabled:hover:text-ink" : "",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="mt-4 min-h-6 text-meta font-extrabold uppercase">
            {locked ? (correct ? "Correct." : `Not quite — it's ${current.answer}.`) : ""}
          </p>
          {locked && (
            <button
              type="button"
              onClick={next}
              className="mt-2 border-2 border-ink px-4 py-2 text-meta font-extrabold uppercase hover:bg-ink hover:text-paper"
            >
              {index + 1 === items.length ? "Finish" : "Next"}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-6" aria-live="polite">
          <p className="type-title-sm">
            {score} / {items.length}
          </p>
          <p className="mt-2 text-ink-2">
            {score === items.length ? "You've clearly been there." : "It's the Grand Teton — 13,775 ft, Wyoming."}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-4 border-2 border-ink px-4 py-2 text-meta font-extrabold uppercase hover:bg-ink hover:text-paper"
          >
            Play again
          </button>
        </div>
      )}
    </section>
  );
}
