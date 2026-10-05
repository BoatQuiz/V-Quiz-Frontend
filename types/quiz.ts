export interface ApiQuestion {
    QuestionId: string;
    QuestionText: string;
    Options: string[];
    TimeLimitMs?: number;
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


export type MetaData = {
    Audiences: AudienceMetaData[];
}

export type TopicMetaData = {
    Name: string;
    Count: number;
}

export type SubcategoryMetaData = {
    Name: string;
    Count: number;
    Topics: TopicMetaData[];
}

export type CategoryMetaData = {
    Name: string;
    Count: number;
    Subcategories: SubcategoryMetaData[];
}

export type AudienceMetaData = {
    Name: string;
    Categories: CategoryMetaData[];
}

export type QuizProfile = {
    Audience: string;
    Categories: string[];
}

export type CategoryLevel = "Easy" | "Medium" | "Hard";

export type CategoryStat = {
    RecentAnswers: boolean[];
    Percent: number;
    Level: CategoryLevel;
};

export type SubcategorySelection = {
    Name: string;
    Topics: string[];
};

export type CategorySelection = {
    Name: string;
    Subcategories: SubcategorySelection[];
};


export type CategoryStats = Record<string, Record<string, CategoryStat>>;