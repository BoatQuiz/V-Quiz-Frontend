"use client";

import { useEffect, useState } from "react";
import { useFlag } from "../context/flagContext";
import { GetFlagReason } from "../actions/GetFlagReason";
import { FlagReason } from "@/types/flag";
import { SendFlag } from "../actions/SendFlag";
import { useRouter } from "next/navigation";
import TopBar from "../components/ui/TopBar";
import { PrimaryButton } from "../components/ui/buttons/PrimaryButton";

export default function Flagpage() {
    const { flagged } = useFlag();
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState<FlagReason[]>([]);
    const [selectReason, setSelectReason] = useState<string[]>([]);
    const [comment, setComment] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function load() {
            const list = await GetFlagReason();
            setReason(list);
        }
        load();
    }, []);

    function toggleReason(key: string) {
        setSelectReason((prev) =>
            prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]
        );
    }

    async function handleSubmit() {
        setLoading(true);
        await SendFlag({
            questionId: flagged!.questionId,
            userId: null,
            comment: comment || null,
            reasons: selectReason,
        });
        setLoading(false);
        router.push("/quiz");
    }

    if (!flagged) return <p className="text-red-500">Ingen fråga att visa</p>;
    return (
        <div>
            <TopBar />
            <div className="border m-2.5 border-gray-Card-background rounded-xl p-2.5 flex flex-col gap-2.5">
                <div className="border p-2.5 rounded-lg border-gray-Card-background bg-gray-Page-background text-center font-extrabold text-lg text-blue-Primary-button">
                    <p>{flagged?.question}</p>
                </div>
                <div className="w-full flex justify-center border border-gray-Card-background rounded-xl bg-gray-Page-background">
                    <div className="p-2.5 rounded-lg text-center font-extrabold text-lg text-blue-Primary-button flex flex-col items-start">
                        {reason.map((r) => (
                            <label key={r.Key}>
                                <input
                                    type="checkbox"
                                    value={r.Key}
                                    checked={selectReason.includes(r.Key)}
                                    onChange={() => toggleReason(r.Key)}
                                />{" "}
                                {r.Key}
                            </label>
                        ))}
                    </div>
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border border-gray-Card-background rounded-xl p-2.5"
                    placeholder="Skriv en kommentar"></textarea>
                <PrimaryButton onClick={handleSubmit} disabled={loading}>
                    {loading ? "Skickar..." : "Skicka"}
                </PrimaryButton>
            </div>
        </div>
    );
}
