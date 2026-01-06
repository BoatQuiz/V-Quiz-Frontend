import { useState } from "react";

type QuestionCardProps = {
  question: string;
  options: string[];
  correctIndex: number | null;
  onAnswer: (selectedIndex: number) => void;
};

export function QuestionCard({
  question,
  options,
  correctIndex,
  onAnswer,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const locked = selectedIndex !== null; //Lås efter första klicket

  return (
    <section className="space-y-3">
      <p className="font-medium text-gray-900 text-center">{question}</p>

      <div className="space-y-3 mt-4">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = correctIndex !== null && index === correctIndex;

          const baseClasses =
            "w-full rounded-2xl border px-4 py-3 text-center text-sm font-medium bg-white transition transform";

          let stateClasses = " border-gray-200 hover:bg-slate-50";

          // När användaren valt något (då har vi selectedIndex)
          if (selectedIndex !== null && correctIndex !== null) {
            if (isSelected && isCorrect) {
              stateClasses = " border-green-500 bg-green-50 scale-[1.02]";
            } else if (isSelected && !isCorrect) {
              stateClasses = " border-red-500 bg-red-50 scale-[1.02]";
            } else if (!isSelected && isCorrect) {
              stateClasses = " border-green-300 bg-green-50/40";
            } else {
              stateClasses = " border-gray-200 bg-white opacity-80";
            }
          }

          return (
            <button
              key={`${index}-${option}`}
              type="button"
              disabled={locked} // lås efter första klicket
              onClick={() => {
                setSelectedIndex(index);
                onAnswer(index); // Skickar till API
              }}
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
