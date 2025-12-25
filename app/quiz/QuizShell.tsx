

import React from "react";
import { QuizProvider } from "../context/quizContext";
import TopBar from "../components/ui/TopBar";
import { cookies } from "next/headers";

export default async function QuizShell({ children }: { children: React.ReactNode }) {
  const cookie = (await cookies()).get("user_identity")
  const parsed = cookie ? JSON.parse(cookie.value):null;
  return (
    <QuizProvider
    initialUserId={parsed?.userId ?? null}
    initialUsername={parsed?.username ?? null}>
      <div className="bg-gray-Page-background p-2.5 flex flex-col gap-2.5">
        <TopBar />
        <main>{children}</main>
      </div>
    </QuizProvider>
  );
}
