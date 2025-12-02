"use server";

import { apiFetch } from "@/lib/apiClient";
import {
    SubmitAnswerRequest,
    SubmitAnswerResponse,
} from "@/types/quiz";

export async function SubmitAnswerAction(
    payload: SubmitAnswerRequest
): Promise<SubmitAnswerResponse> {
    return apiFetch<SubmitAnswerResponse>("/quiz/submitAnswer", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
