"use client";

import React from "react";
import { QuizProvider } from "../context/quizContext";
import TopBar from "../components/ui/TopBar";

export default function QuizShell({ children }: { children: React.ReactNode }) {
  return (
    <QuizProvider>
      <div className="bg-gray-Page-background p-2.5 flex flex-col gap-2.5">
        <TopBar />
        <main>{children}</main>
      </div>
    </QuizProvider>
  );
}
