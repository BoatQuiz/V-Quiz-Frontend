"use server";

import { apiFetch } from "@/lib/apiClient";
import { SendFlagRequest, FlagResponse } from "@/types/flag";

export async function FlagQuestion(
    payload: SendFlagRequest
): Promise<FlagResponse> {
    return apiFetch<FlagResponse>("/flag/question", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
