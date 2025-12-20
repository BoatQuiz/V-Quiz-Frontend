"use client";

import { useEffect, useState } from "react";
import { QuestionCard } from "../components/quiz/QuestionCard";
import { StartQuizAction } from "../actions/StartQuizAction";
import type { ApiQuestion, QuizResponse } from "@/types/quiz";
import { useQuiz } from "../context/quizContext";

export default function QuizPage() {
  // Här sparar vi nuvarande fråga från API:t
  const [question, setQuestion] = useState<ApiQuestion | null>(null);
  const {setSession, setCurrentQuestion} = useQuiz();
  // State för laddning / fel
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response: QuizResponse = await StartQuizAction();
        console.log("StartQuizAction response:", response);

        if (!response.Success || !response.Data) {
          throw new Error(response.Message ?? "Okänt fel");
        }

        setSession({
          id: response.Data.Session.SessionId,
          score: response.Data.Session.Score,
          numUsedQuestions: response.Data.Session.NumUsedQuestions
        });
        setCurrentQuestion({
          id: response.Data.Question.QuestionId,
          text: response.Data.Question.QuestionText,
        });

        // Plocka ut själva frågan från svaret
        setQuestion(response.Data.Question);
      } catch (err) {
        console.error("Error loading quiz question", err);
        setError("Kunde inte hämta första frågan just nu.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="flex flex-col">
      <main className="sm:min-h-screen flex flex-col items-center justify-center bg-gray-Page-background">
        <div className="sm:w-[390px] rounded-3xl bg-white-Card-background shadow-md p-6 space-y-4">
          <h1 className="text-xl font-semibold text-center">Quiz</h1>

          {loading && (
            <p className="text-sm text-gray-500 text-center">Laddar fråga…</p>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {!loading && !error && question && (
            <QuestionCard
              question={question.QuestionText}
              options={question.Options}
              // Låtsas att rätt svar är alternativ 0 ska uppdateras sen
              correctIndex={0}
            />
          )}
        </div>
      </main>
    </div>
  );
}
