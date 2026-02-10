'use server'

import { apiFetch } from "@/lib/apiClient"
import { ApiResponse, QuizProfile } from "@/types/quiz"

export async function GetQuizProfile() : Promise<QuizProfile> {
    const res = await apiFetch<ApiResponse<QuizProfile>>("/user/quiz-profile");
    if (!res.Success || !res.Data) {
        throw new Error(res.Message || "Faild to fetch metadata")
    }
    return res.Data;
}