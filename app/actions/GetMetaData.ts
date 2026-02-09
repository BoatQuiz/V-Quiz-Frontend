'use server'

import { apiFetch } from "@/lib/apiClient";
import { ApiResponse, MetaData } from "@/types/quiz"

export async function GetMetaData() : Promise<MetaData> {
    const res = await apiFetch<ApiResponse<MetaData>>("/quiz/metadata");
    if (!res.Success || !res.Data) {
        throw new Error(res.Message || "Failed to fetch metadata");
    }
    return res.Data;
}