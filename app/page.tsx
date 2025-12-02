"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/app/components/ui/buttons/PrimaryButton";
import QuizTester from "./components/QuizTester";

export default function HomePage() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/quiz");
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">V-Quiz</h1>
      <p className="text-lg text-gray-600">
        Frågesport för vetting och säkerhet inom sjöfart.
      </p>
     
      <div className="p-6">
        <PrimaryButton onClick={() => alert("Start game!")}>
          Start game
        </PrimaryButton>
        <QuizTester />
        <PrimaryButton onClick={handleStart}>Start game</PrimaryButton>
      </div>
    </main>
  );
}
