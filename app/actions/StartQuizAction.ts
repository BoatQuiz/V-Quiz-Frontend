"use server";

import { apiFetch } from "@/lib/apiClient";
import { QuizResponse } from "@/types/quiz";

export async function StartQuizAction(): Promise<QuizResponse> {
  return apiFetch<QuizResponse>("/quiz/start");
}

// Denna kontaktar apiFetch för att hämta hem första frågan, kommer bygga ut med fler som gör på samma sätt för att posta svar eller för att hämta nästa fråga
