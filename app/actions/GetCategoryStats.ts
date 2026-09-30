'use server'

import { apiFetch } from "@/lib/apiClient"
import { CategoryStats } from "@/types/quiz"

export async function GetCategoryStats(): Promise<CategoryStats> {
    const res = await apiFetch<CategoryStats>("/user/stats");
    return res;
}