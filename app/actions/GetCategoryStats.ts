'use server'

import { apiFetch } from "@/lib/apiClient"
import { ApiResponse, CategoryStats } from "@/types/quiz"

export async function GetCategoryStats(): Promise<CategoryStats> {
    const res = await apiFetch<ApiResponse<CategoryStats>>("/user/stats");
    if (!res.Success || !res.Data) {
        throw new Error(res.Message || "Failed to fetch category stats")
    }
    return res.Data;
}