import { FlagProvider } from "./context/flagContext";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Vetting-Quiz",
  description: "Frågesport för vetting och säkerhet inom sjöfart.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FlagProvider>{children}</FlagProvider>
      </body>
    </html>
  );
}
