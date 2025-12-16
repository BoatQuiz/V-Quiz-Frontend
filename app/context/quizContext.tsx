"use client";

import { createContext, useContext, useState } from "react";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuizQuestionMeta | null>(null);

  return (
    <QuizContext.Provider
      value={{
        session,
        setSession,
        currentQuestion,
        setCurrentQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside <QuizProvider>");
  return ctx;
}
