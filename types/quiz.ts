export interface ApiQuestion {
    QuestionId: string;
    QuestionText: string;
    Options: string[];
}

export interface ApiSession {
    SessionId: string;
    Score: number;
    QuestionsAnswered: number;
}

export interface ApiSessionRequest {
    SessionId: string;
}

export interface QuizData {
    Question: ApiQuestion;
    Session: ApiSession;
}

export interface ApiResponse<T> {
    Success: boolean;
    Message: string | null;
    Data: T | null;
}

export type QuizResponse = ApiResponse<QuizData>;

export interface SubmitAnswerRequest {
    sessionId: string;
    questionId: string;
    selectedAnswer: number;
}

export interface SubmitAnswerData {
    IsCorrect: boolean;
    CorrectIndex: number;
    CorrectAnswer: string;
    IsLastQuestion: boolean;
    Score: number;
    QuestionsAnswered: number;
}

export type SubmitAnswerResponse = ApiResponse<SubmitAnswerData>;

export type AudienceMetaData = {
    Name: string;
    Categories: string[];
}

export type MetaData = {
    Audiences: AudienceMetaData[];
}

export type QuizProfile = {
    Audience: string;
    Categories: string[];
}