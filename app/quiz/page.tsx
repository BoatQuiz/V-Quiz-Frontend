"use client";

import { useEffect, useState } from "react";
import { QuestionCard } from "../components/quiz/QuestionCard";
import { StartQuizAction } from "../actions/StartQuizAction";
import type { ApiQuestion, QuizResponse } from "@/types/quiz";
import { useQuiz } from "../context/quizContext";
import Link from "next/link";
import { SubmitAnswerAction } from "../actions/SubmitAnswerAction";
import { GetNextQuestion } from "../actions/GetNextQuestionAction";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  // Här sparar vi nuvarande fråga från API:t
  const [question, setQuestion] = useState<ApiQuestion | null>(null);
  const { session, setSession, setCurrentQuestion, userId } = useQuiz();

  // State för laddning / fel
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  // Router
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const payload = { UserId: userId };
      try {
        const response: QuizResponse = await StartQuizAction(payload);
        console.log("StartQuizAction response:", response);

        if (!response.Success || !response.Data) {
          throw new Error(response.Message ?? "Okänt fel");
        }

        setSession({
          id: response.Data.Session.SessionId,
          score: response.Data.Session.Score,
          numUsedQuestions: response.Data.Session.QuestionsAnswered,
        });

        setCurrentQuestion({
          id: response.Data.Question.QuestionId,
          text: response.Data.Question.QuestionText,
        });

        // Plocka ut själva frågan från svaret
        setQuestion(response.Data.Question);
        setCorrectIndex(null);
      } catch (err) {
        console.error("Error loading quiz question", err);
        setError("Kunde inte hämta första frågan just nu.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [setSession, setCurrentQuestion, userId]);

  async function loadNextQuestion(sessionId: string) {
    const payload = { SessionId: sessionId };

    // Denna delen skicka vidare till en avsluts sida
    if (session) {
      if (session?.numUsedQuestions == 9) {
        router.push("/quiz/complete");
      }
    }

    const result = await GetNextQuestion(payload);
    console.log("GetNextQuestion response:", result);

    if (!result?.Success || !result?.Data) return;

    setCurrentQuestion({
      id: result.Data.Question.QuestionId,
      text: result.Data.Question.QuestionText,
    });

    setQuestion(result.Data.Question);
    setCorrectIndex(null);
  }

  async function handleAnswer(selectedIndex: number) {
    if (!question || !session) return;
    if (correctIndex !== null) return;

    const payload = {
      sessionId: session.id,
      questionId: question.QuestionId,
      selectedAnswer: selectedIndex,
    };

    const result = await SubmitAnswerAction(payload);
    console.log("SubmitAnswer response:", result);

    if (!result.Success || !result.Data) return;

    setSession({
      ...session,
      score: result.Data.Score,
      numUsedQuestions: result.Data.QuestionsAnswered,
    });

    const apiCorrectIndex = result?.Data?.CorrectIndex;

    if (typeof apiCorrectIndex === "number") {
      setCorrectIndex(apiCorrectIndex);

      const sessionId = session.id;
      setTimeout(() => {
        loadNextQuestion(sessionId);
      }, 1200);
    }
  }

  return (
    <section className="app-container max-w-xl mx-auto">

      <div className="grid grid-cols-[24px_1fr_24px] items-center">
        <div />
        <h1 className="text-xl font-semibold text-center">Quiz</h1>
        <Link href="/quiz/flag" aria-label="Rapportera fel">
          <span className="text-xl hover:opacity-70 flex justify-start">🚩</span>
        </Link>
      </div>

      {loading && (
        <p className="text-sm text-gray-500 text-center">Laddar fråga…</p>
      )}

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {!loading && !error && question && (
        <QuestionCard
          key={question.QuestionId}
          question={question.QuestionText}
          options={question.Options}
          correctIndex={correctIndex}
          onAnswer={handleAnswer}
        />
      )}
    </section>
  );
}
