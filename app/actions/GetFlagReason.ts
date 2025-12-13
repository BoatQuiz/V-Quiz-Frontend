'use server'

import { apiFetch } from "@/lib/apiClient";
import { FlagReason } from "@/types/flag";

export async function GetFlagReason(): Promise<FlagReason[]> {
    return apiFetch<FlagReason[]>("/flag/reasons")
}