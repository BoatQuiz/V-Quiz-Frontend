import "./globals.css";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { QuizProvider } from "./context/quizContext";

export const metadata = {
  title: "Vetting-Quiz",
  description: "Frågesport för vetting och säkerhet inom sjöfart.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookie = (await cookies()).get("user_identity");
  const parsed = cookie ? JSON.parse(cookie.value) : null;

  return (
    <html lang="en">
      <body className="">
        <QuizProvider
          initialUserId={parsed?.userId ?? null}
          initialUsername={parsed?.username ?? null}
        >
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}