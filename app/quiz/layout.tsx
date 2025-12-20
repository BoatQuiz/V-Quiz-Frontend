import QuizShell from "./QuizShell";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QuizShell>{children}</QuizShell>;
}
