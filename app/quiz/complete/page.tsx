"use client";
import { GetSessionSummary } from "@/app/actions/GetSessionSummary";
import { PrimaryButton } from "@/app/components/ui/buttons/PrimaryButton";
import { useQuiz } from "@/app/context/quizContext";
import { Summary } from "@/types/summary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function CompletePage() {
  const router = useRouter();
  const { session, username } = useQuiz();
  const [summary, setSummary] = useState<Summary | null>(null);
  const handleStart = () => {
    router.push("/quiz");
  };

  useEffect(() => {
    async function fetchSummary() {
      const data = await GetSessionSummary(
        session?.id ?? "",
      );
    //   const data = await GetSessionSummary(
    //     "f6d84fe4-da0a-4534-92a3-55f771538d0f",
    //   );
      console.log("Session Summary:", data);
      setSummary(data);
    }
    fetchSummary();
  }, []);

  return (
    <div>
      <div className="border p-2.5 border-gray-Card-background bg-white-Card-background rounded-xl text-center mb-2.5">
        <p className="font-bold">Thank you {username}</p>
        <p className="font-medium">Your score is</p>
        <p className="text-blue-Primary-button font-extrabold">
          {session?.score ?? 0} av 10
        </p>
        <p>{summary?.Audience} Test</p>
        <p>{summary?.TotalQuestions} Questions</p>
        <p>
          {summary?.Categories.map((category) => (
            <div>
              <p>{category.Category}</p>
              <p>
                {category.Correct}/{category.Total}
              </p>
              <p>{category.Percent}%</p>
            </div>
          ))}
        </p>
      </div>
      <PrimaryButton onClick={handleStart}>Back to game</PrimaryButton>
    </div>
  );
}
