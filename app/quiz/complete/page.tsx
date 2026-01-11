"use client";
import { PrimaryButton } from "@/app/components/ui/buttons/PrimaryButton";
import { useQuiz } from "@/app/context/quizContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function CompletePage() {
    const router = useRouter();
    const { session, username } = useQuiz();
    const handleStart = () => {
        router.push("/quiz");
    };
    return (
        <div>
            <div className="border p-2.5 border-gray-Card-background bg-white-Card-background rounded-xl text-center mb-2.5">
                <p className="font-bold">Stort tack för att du ville spela {username}</p>
                <p className="font-medium">Din poäng är </p>
                <p className="text-blue-Primary-button font-extrabold">{session?.score} av 10</p>
            </div>
            <PrimaryButton onClick={handleStart}>Back to game</PrimaryButton>
        </div>
    );
}
