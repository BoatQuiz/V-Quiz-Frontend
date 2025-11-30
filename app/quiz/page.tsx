"use client";

import { QuestionCard } from "../components/quiz/QuestionCard";

const questionData = {
  text: "What color is the sky a sunny day?",
  options: ["Black", "Blue", "Green", "Red"],
  correctIndex: 1,
};

export default function QuizPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-[390px] rounded-3xl bg-white shadow-md p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">Quiz</h1>

        <QuestionCard
          question={questionData.text}
          options={questionData.options}
          correctIndex={questionData.correctIndex}
        />
      </div>
    </main>
  );
}
