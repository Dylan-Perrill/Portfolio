"use client";
import { useState } from "react";

/*
Usage:
<Quiz
  title="Guess the Mountain"
  items={[
    {
      question: "What is the name of the mountain?",
      choices: ["Denali", "The Grand Teton", "Mt. Hood", "Pikes Peak"],
      answer: "The Grand Teton" // can also be index: 1
    },
    {
      question: "What state is it located in?",
      choices: ["Montana", "Wyoming", "Colorado", "Idaho"],
      answer: "Wyoming"
    },
    {
      question: "Approximate elevation?",
      choices: ["11,300 ft", "12,900 ft", "13,775 ft", "14,500 ft"],
      answer: "13,775 ft"
    }
  ]}
/>
*/

export default function Quiz({ title, items = [], questions, answers }) {
  // Backwards compatibility (if old props passed: questions + answers arrays)
  const derived =
    items.length
      ? items
      : (questions || []).map((q, i) => ({
          question: q,
          choices: [],
          answer: answers?.[i]
        }));

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null); // choice selected
  const [feedback, setFeedback] = useState(null); // "correct" | "incorrect"
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [locked, setLocked] = useState(false); // after answering

  const current = derived[index];

  function normalize(v) {
    return String(v)
      .toLowerCase()
      .replace(/feet|ft\.?|,/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function check(choiceVal) {
    if (locked || finished) return;
    setSelected(choiceVal);
    const answerVal =
      typeof current.answer === "number"
        ? current.choices[current.answer]
        : current.answer;
    const correct = normalize(choiceVal) === normalize(answerVal);
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
    setLocked(true);
  }

  function next() {
    if (index + 1 >= derived.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setFeedback(null);
      setLocked(false);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setFeedback(null);
    setScore(0);
    setFinished(false);
    setLocked(false);
  }

  // Open-ended fallback (no choices)
  const isOpenEnded = !current.choices || current.choices.length === 0;

  return (
    <div className="quiz card" style={{ marginTop: "2rem" }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>

      {!finished && (
        <div>
          <p style={{ marginTop: 0 }}>
            <strong>
              Question {index + 1} of {derived.length}:
            </strong>{" "}
            {current.question}
          </p>

          {isOpenEnded ? (
            <OpenEnded
              current={current}
              locked={locked}
              feedback={feedback}
              onResult={(correct) => {
                setFeedback(correct ? "correct" : "incorrect");
                if (correct) setScore((s) => s + 1);
                setLocked(true);
              }}
              normalize={normalize}
            />
          ) : (
            <div style={{ display: "grid", gap: "0.5rem", marginTop: "0.75rem" }}>
              {current.choices.map((c, i) => {
                const answerVal =
                  typeof current.answer === "number"
                    ? current.choices[current.answer]
                    : current.answer;
                const isSelected = selected === c;
                const isCorrectChoice =
                  locked && normalize(c) === normalize(answerVal);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => check(c)}
                    disabled={locked}
                    style={{
                      textAlign: "left",
                      color: "white",
                      fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                      padding: "0.6rem 0.75rem",
                      border: "1px solid var(--border,#ccc)",
                      borderRadius: "6px",
                      cursor: locked ? "default" : "pointer",
                      background: isSelected
                        ? isCorrectChoice
                          ? "rgba(0,160,0,0.15)"
                          : "rgba(200,0,0,0.15)"
                        : isCorrectChoice
                        ? "rgba(0,160,0,0.15)"
                        : "var(--card-bg,#111)",
                      outline: isSelected ? "2px solid #666" : "none",
                      transition: "background .15s"
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          )}

          {locked && (
            <div style={{ marginTop: "0.75rem" }}>
              <p
                style={{
                  fontWeight: "bold",
                  color: feedback === "correct" ? "green" : "crimson",
                  margin: 0
                }}
              >
                {feedback === "correct" ? "Correct!" : "Incorrect."}
              </p>
              {isOpenEnded && (
                <p style={{ margin: "0.25rem 0 0" }}>
                  Correct answer:{" "}
                  <em>
                    {typeof current.answer === "number"
                      ? current.choices[current.answer]
                      : current.answer}
                  </em>
                </p>
              )}
              <button
                className="btn secondary"
                style={{ marginTop: "0.75rem" }}
                onClick={next}
              >
                {index + 1 === derived.length ? "Finish" : "Next"}
              </button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div>
          <p style={{ marginTop: 0 }}>
            Score: {score} / {derived.length} (
            {Math.round((score / derived.length) * 100)}%)
          </p>
          <button className="btn" onClick={restart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

function OpenEnded({ current, locked, feedback, onResult, normalize }) {
  const [val, setVal] = useState("");

  function submit(e) {
    e.preventDefault();
    if (locked) return;
    const answerVal =
      typeof current.answer === "number"
        ? current.choices[current.answer]
        : current.answer;
    const correct = normalize(val) === normalize(answerVal);
    onResult(correct);
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        disabled={locked}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Your answer..."
        style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        required
      />
      {!locked && (
        <button className="btn" type="submit" style={{ marginTop: "0.5rem" }}>
          Submit
        </button>
      )}
    </form>
  );
}