"use client";

import { useEffect, useState } from "react";
import { GetFlagReason } from "../actions/GetFlagReason";
import { SendFlag } from "../actions/SendFlag";
import { useFlag } from "../context/flagContext";
import { FlagReason } from "@/types/flag";

export default function FlagPage() {
  const { flagged } = useFlag();
  if (!flagged) {
    return <p className="text-red-600">Ingen fråga skickades</p>
  }

  const f = flagged;
  const [reason, setReason] = useState<FlagReason[]>([]);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const list = await GetFlagReason();
      setReason(list);
    }
    load();
  }, []);

  function toggleReason(key: string) {
    setSelectedReasons((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]
    );
  }

  async function handleSubmit() {
    setLoading(true);

    await SendFlag({
      questionId: flagged!.questionId,
      reasons: selectedReasons,
      userId: null,
      comment: comment || null,
    });
    setLoading(false);
  }

  if (!flagged) return <p>ingen fråga skickades</p>;

  return (
    <div>
      <h1>Flagga fråga</h1>
      <p>
        {" "}
        <strong>ID:</strong> {flagged.questionId}{" "}
      </p>
      <p>
        {" "}
        <strong>Fråga:</strong> {flagged.question}{" "}
      </p>

      <h2>Välj anledning</h2>
      {reason.map((r) => (
        <label key={r.Key} className="block">
          <input
            type="checkbox"
            value={r.Key}
            checked={selectedReasons.includes(r.Key)}
            onChange={() => toggleReason(r.Key)}
          />
          {r.Label}
        </label>
      ))}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Valfri kommentar"
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Skickar..." : "Skicka flagga"}
      </button>
    </div>
  );
}
