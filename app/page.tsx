"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/app/components/ui/buttons/PrimaryButton";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/quiz");
  };
  return (
    <main className="p-3 min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-Page-background">
      <h1 className="text-4xl font-bold">V-Quiz</h1>
      <p className="text-lg text-gray-600">
        Frågesport för vetting och säkerhet inom sjöfart.
      </p>

      <div className="w-full">
        <PrimaryButton onClick={handleStart}>Start game</PrimaryButton>
      </div>
      <Link
        href="/login"
        className="text-sm text-gray-500 hover:underline"
      >
        Logga in
      </Link>
    </main>
  );
}
