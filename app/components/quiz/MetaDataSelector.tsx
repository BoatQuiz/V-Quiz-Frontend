"use client";

import { MetaData } from "@/types/quiz";

type Props = {
    metaData: MetaData;
    selectedAudience: string | null;
    selectedCategories: string[];
    onAudienceChange: (audience: string) => void;
    onCategoryToggle: (category: string) => void;
};

export function MetaDataSelector({
    metaData,
    selectedAudience,
    selectedCategories,
    onAudienceChange,
    onCategoryToggle,
}: Props) {
    return (
        <ul className="space-y-4">
            {metaData.Audiences.map((a) => {
                const isSelected = selectedAudience === a.Name;
                return (
                    // AudienceCard
                    <li key={a.Name}>
                        <div
                            className={`rounded-2xl border p-4 transition
                ${
                    isSelected
                        ? "border-blue-Primary-button bg-gray-Page-background"
                        : "border-gray-Card-background bg-white-Card-background"
                }`}>
                            {/* Header Radio + Name */}
                            <label className="flex items-center gap-3 cursor-pointer font-semibold">
                                <input
                                    type="radio"
                                    name="audience"
                                    checked={isSelected}
                                    onChange={() => onAudienceChange(a.Name)}
                                />
                                <span>{a.Name}</span>
                            </label>

                            {/* Categories */}
                            {isSelected && (
                                <ul className="mt-4 space-y-2 pl-6">
                                    {a.Categories.map((c) => {
                                        const checked =
                                            selectedCategories.includes(c);
                                        return (
                                            <li key={c}>
                                                <label 
                                                className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${ checked ? "border-blue-Primary-button bg-blue-Primary-button/5" : "border-gray-Input-border bg-white"}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(
                                                            c,
                                                        )}
                                                        onChange={() =>
                                                            onCategoryToggle(c)
                                                        }
                                                    />
                                                    {c}
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
