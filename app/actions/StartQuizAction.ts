"use server";

import { apiFetch } from "@/lib/apiClient";
import { StartQuizResponse } from "@/types/quiz";

export async function StartQuizAction(): Promise<StartQuizResponse> {
    return apiFetch<StartQuizResponse>("/quiz/start");
}


// Denna kontaktar apiFetch för att hämta hem första frågan, kommer bygga ut med fler som gör på samma sätt för att posta svar eller för att hämta nästa fråga