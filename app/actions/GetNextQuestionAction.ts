"use server";

import { apiFetch } from "@/lib/apiClient";
import { ApiSessionRequest, QuizResponse } from "@/types/quiz";

export async function GetNextQuestion(
    payload: ApiSessionRequest
): Promise<QuizResponse> {
    return apiFetch<QuizResponse>("/quiz/getNextQuestion", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
