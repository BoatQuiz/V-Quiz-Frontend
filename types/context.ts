type QuizSession = { 
    id: string;
    score: number; 
    numUsedQuestions: number;
}

type QuizQuestionMeta = {
    id: string;
    text: string;
}

type QuizContextType = {
    session: QuizSession | null;
    setSession: (s: QuizSession) => void;

    currentQuestion : QuizQuestionMeta | null;
    setCurrentQuestion: (p: QuizQuestionMeta | null) => void;
}