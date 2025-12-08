"use server";

import { apiFetch } from "@/lib/apiClient";
import { FlagRequest, FlagResponse } from "@/types/flag";

export async function FlagQuestion(
    payload: FlagRequest
): Promise<FlagResponse> {
    return apiFetch<FlagResponse>("/flag/question", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
