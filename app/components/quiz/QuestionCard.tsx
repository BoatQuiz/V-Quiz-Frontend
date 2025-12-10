import Link from "next/link";
import { useState } from "react";
import { useFlag } from "@/app/context/flagContext";

type QuestionCardProps = {
  question: string;
  options: string[];
  correctIndex: number;
  questionId: string;
};

export function QuestionCard({
  question,
  options,
  correctIndex,
  questionId,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { setFlagged } = useFlag();
  return (
    <section className="space-y-3">
      <Link
        href="/flag"
        onClick={() =>
          setFlagged({ question, options, correctIndex, questionId })
        }
      >
        klicka mig
      </Link>

      <p className="font-medium text-gray-900 text-center">{question}</p>

      <div className="space-y-3 mt-4">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === correctIndex;

          const baseClasses =
            "w-full rounded-2xl border px-4 py-3 text-center text-sm font-medium bg-white transition transform";

          let stateClasses = " border-gray-200 hover:bg-slate-50";

          // Bara efter att användaren valt något
          if (selectedIndex !== null) {
            if (isSelected && isCorrect) {
              // Du har valt rätt svar
              stateClasses = " border-green-500 bg-green-50 scale-[1.02]";
            } else if (isSelected && !isCorrect) {
              // Du har valt fel svar
              stateClasses = " border-red-500 bg-red-50 scale-[1.02]";
            } else if (!isSelected && isCorrect) {
              // Det här är rätt svar, men du klickade någon annan
              stateClasses = " border-green-300 bg-green-50/40";
            } else {
              // Övriga svar efter klick → tona ned lite
              stateClasses = " border-gray-200 bg-white opacity-80";
            }
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={baseClasses + stateClasses}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}
