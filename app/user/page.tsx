"use client";

import { useEffect, useState } from "react";
import { GetMetaData } from "..//actions/GetMetaData";
import type { MetaData } from "@/types/quiz";


export default function MetaDataClient() {
  const [data, setData] = useState<MetaData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);



  useEffect(() => {
    GetMetaData()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <ul className="m-1">
      {data.Audiences.map((a) => {
        const isSelected = selectedAudience === a.Name;
        return (
          <li key={a.Name}>
            <label className="flex gap-1.5">
              <input
                type="radio"
                name="audience"
                value={a.Name}
                checked={isSelected}
                onChange={() => setSelectedAudience(a.Name)}
              />
              {a.Name}
            </label>

            {isSelected && (
              <ul className="ml-8 mt-2 space-y-1 text-sm text-gray-600">
                {a.Categories.map((c) => (
                  <li key={c}>
                    <label className="flex gap-1.5">
                      <input type="checkbox" name="category" value={c} />
                      {c}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
