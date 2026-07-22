"use client";

import { useEffect, useState } from "react";
import { TimeBar } from "../components/quiz/TimeBar";
import { QuestionCard } from "../components/quiz/QuestionCard";
import { StartQuizAction } from "../actions/StartQuizAction";
import type { QuizResponse } from "@/types/quiz";
import { useQuiz } from "../context/quizContext";
import Link from "next/link";
import { SubmitAnswerAction } from "../actions/SubmitAnswerAction";
import { GetNextQuestion } from "../actions/GetNextQuestionAction";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  // Frågan kommer nu från context, ingen egen lokal "question" längre
  const { session, setSession, currentQuestion, setCurrentQuestion, questionStartTime, setQuestionStartTime, userId } = useQuiz();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      // Prevents getting new question when a session is active
      if (session) {
        setLoading(false);
        return;
      }

      const payload = { UserId: userId };
      try {
        const response: QuizResponse = await StartQuizAction(payload);

        if (!response.Success || !response.Data) {
          throw new Error(response.Message ?? "Okänt fel");
        }

        setSession({
          id: response.Data.Session.SessionId,
          score: response.Data.Session.Score,
          numUsedQuestions: response.Data.Session.QuestionsAnswered,
        });

        // Bara EN gång, hela frågan sparas i context
        setCurrentQuestion(response.Data.Question);
        setQuestionStartTime(Date.now());
        setCorrectIndex(null);
      } catch (err) {
        console.error("Error loading quiz question", err);
        setError("Kunde inte hämta första frågan just nu.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [setSession, setCurrentQuestion, userId, session]);

  async function loadNextQuestion(sessionId: string) {
    const payload = { SessionId: sessionId };

    if (session) {
      if (session?.numUsedQuestions == 9) {
        router.push("/quiz/complete");
      }
    }

    const result = await GetNextQuestion(payload);

    if (!result?.Success || !result?.Data) return;

    setCurrentQuestion(result.Data.Question);
    setQuestionStartTime(Date.now());
    setCorrectIndex(null);
  }

  async function handleAnswer(selectedIndex: number) {
    if (!currentQuestion || !session) return;
    if (correctIndex !== null) return;

    const payload = {
      sessionId: session.id,
      questionId: currentQuestion.QuestionId,
      selectedAnswer: selectedIndex,
    };

    const result = await SubmitAnswerAction(payload);

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

  function handleTimeUp() {
    handleAnswer(-1);
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

      {!loading && !error && currentQuestion && (
        <>
          <TimeBar
            key={`timer-${currentQuestion.QuestionId}`}
            duration={currentQuestion.TimeLimitMs ?? 30000}
            onTimeUp={handleTimeUp}
            isRunning={correctIndex === null}
            startTime={questionStartTime}
          />
          <QuestionCard
            key={`card-${currentQuestion.QuestionId}`}
            question={currentQuestion.QuestionText}
            options={currentQuestion.Options}
            correctIndex={correctIndex}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </section>
  );
}