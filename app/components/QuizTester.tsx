"use client";

//import { useState } from "react";
import { StartQuizAction } from "../actions/StartQuizAction";
//import { StartQuizResponse } from "@/types/quiz";


//TODO: Denna är bara för att visa hur man skulle kunna hämta info, den skal raderas med tiden men finns nu för demo

export default function QuizTester() {
    //const [result, setResult] = useState<StartQuizResponse | null>(null);

    async function start() {
        const response = await StartQuizAction();
        console.log("Raw API response: ", response)
        console.log("Current question: ", response.Data?.Question.QuestionText)
        console.log("Current answer: ", response.Data?.Question.Options)
        console.log("Current answer: ", response.Data?.Question.QuestionId)
        //setResult(response);
 
    }
    return (
        <div>
            <span>test</span>
            <button
                className="bg-amber-200 border min-h-[50px] min-w-2.5"
                onClick={start}>
                Klicka mig
            </button>
        </div>
    );
}
