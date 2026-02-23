'use server';

import { apiFetch } from "@/lib/apiClient";
import { ApiResponse } from "@/types/quiz";
import { Summary } from "@/types/summary";

export async function GetSessionSummary(sessionId: string) : Promise<Summary> {
    const res = await apiFetch<ApiResponse<Summary>>(`/session/${sessionId}/summary`);
    if (!res.Success || !res.Data) {
        throw new Error(res.Message || "Failed to fetch session summary")
    }
    return res.Data;
}