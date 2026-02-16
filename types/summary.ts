export type Summary = {
    TotalQuestions: number;
    TotalCorrect: number;
    Audience: string;
    Categories: CategorySummary[];
}

export type CategorySummary = {
    Category: string;
    Correct: number;
    Total: number;
    Percent: number;
}