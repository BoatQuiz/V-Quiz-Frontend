import React from "react";
import TopBar from "../components/ui/TopBar";
import SettingsBar from "../components/ui/SettingsBar";

export default function QuizShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-wrapper pt-8 flex flex-col gap-2.5">
      <div className="max-w-xl mx-auto w-full flex flex-col gap-2.5">
        <SettingsBar/>
        <TopBar />
        <main>{children}</main>
      </div>
    </div>
  );
}