"use server";

import { apiFetch } from "@/lib/apiClient";
import { revalidatePath } from "next/cache";
import {
    SubmitAnswerRequest,
    SubmitAnswerResponse,
} from "@/types/quiz";

export async function SubmitAnswerAction(
    payload: SubmitAnswerRequest
): Promise<SubmitAnswerResponse> {
    const result = await apiFetch<SubmitAnswerResponse>("/quiz/submitAnswer", {
        method: "POST",
        body: payload,
    });

    if (result.Data?.IsLastQuestion) {
        revalidatePath("/progress");
    }

    return result;
}