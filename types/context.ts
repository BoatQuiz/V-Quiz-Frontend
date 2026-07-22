import { ApiQuestion } from "./quiz";

type QuizSession = {
    id: string;
    score: number;
    numUsedQuestions: number;
};

type QuizContextType = {
    session: QuizSession | null;
    setSession: (s: QuizSession | null) => void;

    currentQuestion: ApiQuestion | null;
    setCurrentQuestion: (p: ApiQuestion | null) => void;

    questionStartTime : number | null;
    setQuestionStartTime: (t: number | null) => void;

    userId: string | null;
    setUserId: (id: string | null) => void;

    username: string | null;
    setUsername: (name: string | null) => void;

    logout: () => void;
};
