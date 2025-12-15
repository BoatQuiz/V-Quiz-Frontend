'use client'

import { SubmitAnswerAction } from "../actions/SubmitAnswerAction";
import { GetNextQuestion } from "../actions/GetNextQuestionAction";
import { FlagQuestion } from "../actions/FlagQuestionAction";
import { SendFlagRequest } from "@/types/flag";

export default function TestSubmitAnswer() {
    // Om du vill testa mot en annan session så starta ett quiz och ta den sessionId som kommer tillbaka så är det bara att klistra in den här under
    const testSession = "c7017edf-7fad-42d4-b3d2-7167cc7937e3"
    // Här skickas in en PayLoad till Api den skall vi kunna få ut genom att ta info som kommer från frågan med ett sessionId och en QuestionId, Sedan behöver vi mappa vilket nummer som svaret ger. Den skall sedan skickas in och så kommer det tillbaka ett svar

    // Denna funktion funkar att köra 10 gånger per session innan session är fullt och man får ett fel meddelande
    // Det är denna som registrerar vilka frågor som är använda och lägger till det i session
    async function testSubmit() {
        const payload = {
            sessionId: testSession,
            questionId: "q6",
            selectedAnswer: 2,
        };
        console.log("Skickar:", payload);
        const result = await SubmitAnswerAction(payload);
        console.log("Api response", result);
    }

    // Denna funktion kan vi använda när vi skall få en ny fråga, man skickar med ett sessionId så vet den vilka frågor som inte är använda.
    async function getNextQuestion() {
        const payload = { sessionId: testSession };
        console.log("Skickar", payload);
        const result = await GetNextQuestion(payload);
        console.log("Api response", result);
    }

    // Om det är fel på en fråga skall man kunna använda denna, det som skickas in är frågeId, vem som skickar in eller null samt om det finns en kommentar eller null
    async function flagQuestion() {
        const payload: SendFlagRequest = {
    questionId: "q5",
    reasons: ["wrong answer", "typo"],
    userId: "Thomas",
    comment: "Detta är ett test",
  };
        console.log("Skickar", payload);
        const result = await FlagQuestion(payload)
        console.log("Api response", result);
    }
    return (
        <div className="flex gap-2">
            <h2>Testa submit answer</h2>
            <button className="border p-2 " onClick={testSubmit}>Skicka svaret</button>
            <button className="border p-2 " onClick={getNextQuestion}>Hämta nästa fråga</button>
            <button className="border p-2 " onClick={flagQuestion}>Klicka mig för felrapport</button>
        </div>
    );
}
