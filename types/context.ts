type QuizSession = {
    id: string;
    score: number;
    numUsedQuestions: number;
};

type QuizQuestionMeta = {
    id: string;
    text: string;
};

type QuizContextType = {
    session: QuizSession | null;
    setSession: (s: QuizSession | null) => void;

    currentQuestion: QuizQuestionMeta | null;
    setCurrentQuestion: (p: QuizQuestionMeta | null) => void;

    userId: string | null;
    setUserId: (id: string | null) => void;

    username: string | null;
    setUsername: (name: string | null) => void;
};
