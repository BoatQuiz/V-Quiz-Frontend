"use client";
import { GetSessionSummary } from "@/app/actions/GetSessionSummary";
import { PrimaryButton } from "@/app/components/ui/buttons/PrimaryButton";
import { useQuiz } from "@/app/context/quizContext";
import { Summary } from "@/types/summary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


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
      console.log("Session Summary:", data);
      setSummary(data);
    }
    fetchSummary();
  }, [session]);

  return (
  <div className="max-w-xl mx-auto space-y-4">
    {/* Main Summary Card */}
    <div className="bg-white-Card-background border border-gray-Card-background rounded-2xl p-6 text-center shadow-sm space-y-3">

      <p className="text-lg font-semibold">
        Thank you {username}
      </p>

      <div>
        <p className="text-sm text-gray-500">Your score in {summary?.Audience ?? "this session"}</p>
        <p className="text-4xl font-extrabold text-blue-Primary-button">
          {session?.score ?? 0} / 10
        </p>
      </div>
    </div>

    {/* Category Breakdown */}
    {summary && (
      <div className="grid gap-3">
        {summary.Categories.map((category) => (
          <div
            key={category.Category}
            className="bg-white-Card-background border border-gray-Card-background rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">{category.Category}</p>
              <p className="text-sm text-gray-600">
                {category.Correct}/{category.Total}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-Primary-button h-2 rounded-full transition-all"
                style={{ width: `${category.Percent}%` }}
              />
            </div>

            <p className="text-right text-xs text-gray-500 mt-1">
              {category.Percent}%
            </p>
          </div>
        ))}
      </div>
    )}

    <PrimaryButton onClick={handleStart}>
      Back to game
    </PrimaryButton>
  </div>
);
}
