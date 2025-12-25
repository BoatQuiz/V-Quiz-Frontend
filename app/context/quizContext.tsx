"use client";

import { createContext, useContext, useState } from "react";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({
    children,
    initialUserId,
    initialUsername,
}: {
    children: React.ReactNode;
    initialUserId: string | null;
    initialUsername: string | null;
}) {
    const [session, setSession] = useState<QuizSession | null>(null);
    const [currentQuestion, setCurrentQuestion] =
        useState<QuizQuestionMeta | null>(null);
    const [userId, setUserId] = useState<string | null>(initialUserId);
    const [username, setUsername] = useState<string|null>(initialUsername);

    return (
        <QuizContext.Provider
            value={{
                session,
                setSession,
                currentQuestion,
                setCurrentQuestion,
                userId,
                setUserId,
                username,
                setUsername,
            }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const ctx = useContext(QuizContext);
    if (!ctx) throw new Error("useQuiz must be used inside <QuizProvider>");
    return ctx;
}
