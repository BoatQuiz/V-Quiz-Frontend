export interface ApiQuestion {
    QuestionId: string;
    QuestionText: string;
    Options: string[];
}

export interface ApiSession {
    sessionId: string;
}

export interface StartQuizData {
    Question: ApiQuestion;
    Session: ApiSession;
}

export interface ApiResponse<T> {
    Success: boolean;
    Message: string | null;
    Data: T | null;
}

export type StartQuizResponse = ApiResponse<StartQuizData>;
