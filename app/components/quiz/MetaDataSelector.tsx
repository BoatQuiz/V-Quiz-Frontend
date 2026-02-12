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
        <ul>
            {metaData.Audiences.map((a) => {
                const isSelected = selectedAudience === a.Name;
                return (
                    <li key={a.Name}>
                        <label>
                            <input
                                type="radio"
                                name="audience"
                                checked={isSelected}
                                onChange={() => onAudienceChange(a.Name)}
                            />
                            {a.Name}
                        </label>
                        {isSelected && (
                            <ul>
                                {a.Categories.map((c) => (
                                    <li key={c}>
                                        <label>
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
                                ))}
                            </ul>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
