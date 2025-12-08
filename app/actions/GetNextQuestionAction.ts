"use server";

import { apiFetch } from "@/lib/apiClient";
import { ApiSession, QuizResponse } from "@/types/quiz";

export async function GetNextQuestion(
    payload: ApiSession
): Promise<QuizResponse> {
    return apiFetch<QuizResponse>("/quiz/getNextQuestion", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
