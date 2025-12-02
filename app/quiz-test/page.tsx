"use client";

import { useState } from "react";
import { SubmitAnswerAction } from "../actions/SubmitAnswerAction";
import { SubmitAnswerResponse } from "@/types/quiz";

export default function TestSubmitAnswer() {
    const [response, setResponse] = useState<SubmitAnswerResponse | null>(null);

    // Här skickas in en PayLoad till Api den skall vi kunna få ut genom att ta info som kommer från frågan med ett sessionId och en QuestionId, Sedan behöver vi mappa vilket nummer som svaret ger. Den skall sedan skickas in och så kommer det tillbaka ett svar

    // Denna funktion funkar att köra 10 gånger per session innan session är fullt och man får ett fel meddelande
    async function testSubmit() {
        const payload = {
            sessionId: "964daefe-4fde-4490-b2c6-ec89a9fa3080",
            questionId: "q7",
            selectedAnswer: 1,
        };

        console.log("Skickar:", payload);

        const result = await SubmitAnswerAction(payload)

        console.log("Api response", result)
        setResponse(result)
    }
    return <div>
        <h2>Testa submit answer</h2>
        <button onClick={testSubmit}>Kör test</button>
        {response && ( 
            <pre>{JSON.stringify(response, null, 2)}</pre>
         )}
    </div>;
}
