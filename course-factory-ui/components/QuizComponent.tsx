"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuizComponentProps {
  questions: QuizQuestion[];
}

export default function QuizComponent({ questions }: QuizComponentProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(questionIndex: number, optionIndex: number) {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const score = submitted
    ? questions.filter((q, i) => selectedAnswers[i] === q.answer_index).length
    : 0;

  return (
    <section className="mt-10">
      <h2 className="mb-5 text-lg font-bold text-[#0D0D0D]">Quiz</h2>
      <div className="space-y-5">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="mb-4 font-semibold text-[#0D0D0D]">
              {qIndex + 1}. {question.question}
            </p>
            <ul className="space-y-2">
              {question.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = question.answer_index === oIndex;
                const showResult = submitted && (isSelected || isCorrect);

                return (
                  <li key={oIndex}>
                    <button
                      type="button"
                      onClick={() => handleSelect(qIndex, oIndex)}
                      className={cn(
                        "w-full rounded-xl border-[1.5px] px-4 py-3 text-left text-sm transition-all duration-150",
                        !submitted && isSelected && "border-purple bg-purple-light text-purple-dark",
                        !submitted && !isSelected && "border-[#E5E7EB] text-[#3D3D3D] hover:border-purple hover:text-purple",
                        submitted && showResult && isCorrect && "border-green-brand bg-green-light text-green-brand",
                        submitted && isSelected && !isCorrect && "border-red-400 bg-red-50 text-red-600",
                        submitted && !showResult && "border-gray-100 text-gray-300"
                      )}
                    >
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={Object.keys(selectedAnswers).length < questions.length}
          className="mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #7F77DD 0%, #3C3489 100%)",
          }}
        >
          Check Answers
        </button>
      ) : (
        <p className="mt-6 text-sm font-semibold text-[#3D3D3D]">
          Score: {score} / {questions.length}
        </p>
      )}
    </section>
  );
}
