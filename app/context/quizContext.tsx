"use client";

import { ApiQuestion } from "@/types/quiz";
import type { QuizContextType, QuizSession } from "@/types/context";
import { createContext, useContext, useState } from "react";
import { Logout } from "@/app/actions/LogoutAction";

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
        useState<ApiQuestion | null>(null);
    const [questionStartTime, setQuestionStartTime] =
        useState<number | null>(null);
    const [userId, setUserId] = useState<string | null>(initialUserId);
    const [username, setUsername] = useState<string|null>(initialUsername);

    const logout = async () => {
        setSession(null);
        setCurrentQuestion(null);
        setQuestionStartTime(null);
        setUserId(null);
        setUsername(null);

        await Logout();
    };


    return (
        <QuizContext.Provider
            value={{
                session,
                setSession,
                currentQuestion,
                setCurrentQuestion,
                questionStartTime,
                setQuestionStartTime,
                userId,
                setUserId,
                username,
                setUsername,
                logout,
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
