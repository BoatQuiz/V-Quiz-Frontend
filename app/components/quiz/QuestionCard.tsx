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

  const locked = selectedIndex !== null;
  const showResult = selectedIndex !== null && correctIndex !== null;

  return (
    <section className="space-y-4">
      {/* Question panel */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-center text-sm sm:text-base font-semibold text-gray-900 leading-relaxed">
          {question}
        </p>
        
      </div>

      {/* Options */}
      <div className="space-y-2 sm:space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = correctIndex !== null && index === correctIndex;

          const base =
          "w-full rounded-2xl border px-4 py-3 sm:py-4 text-left text-sm sm:text-base font-medium bg-white shadow-sm transition active:scale-[0.99]";


          let state = "border-gray-200 hover:border-gray-300 hover:bg-gray-50";

          if (showResult) {
            if (isSelected && isCorrect) {
              state = "border-emerald-400 bg-emerald-50";
            } else if (isSelected && !isCorrect) {
              state = "border-rose-400 bg-rose-50";
            } else if (!isSelected && isCorrect) {
              state = "border-emerald-200 bg-emerald-50/40";
            } else {
              state = "border-gray-100 bg-white opacity-80";
            }
          }


          return (
            <button
              key={`${index}-${option}`}
              type="button"
              disabled={locked}
              onClick={() => {
                setSelectedIndex(index);
                onAnswer(index);
              }}
              className={`${base} ${state} ${locked ? "cursor-default" : ""}`}
            >
              <span className="text-gray-900">{option}</span>
              
            </button>
          );
        })}
      </div>
    </section>
  );
}
