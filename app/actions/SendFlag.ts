"use server";

import { apiFetch } from "@/lib/apiClient";
import { SendFlagRequest } from "@/types/flag";

export async function SendFlag(data: SendFlagRequest) {
  return apiFetch("/flag/question", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
