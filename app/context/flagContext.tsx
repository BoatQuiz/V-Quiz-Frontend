"use client";

import { createContext, useContext, useState } from "react";

type FlaggedQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  questionId: string;
} | null;

type FlagContextType = {
  flagged: FlaggedQuestion;
  setFlagged: (data: FlaggedQuestion) => void;
};

const FlagContext = createContext<FlagContextType | undefined>(undefined)

export function FlagProvider({children}: { children: React.ReactNode}) {
    const [flagged, setFlagged] = useState<FlaggedQuestion>(null)

    return (
        <FlagContext.Provider value={{ flagged, setFlagged}}>
            {children}
        </FlagContext.Provider>
    )
}

export function useFlag() {
    const ctx = useContext(FlagContext);
    if(!ctx) {
        throw new Error("useFlag must be used inside <Flagprovider>")
    }
    return ctx;
}