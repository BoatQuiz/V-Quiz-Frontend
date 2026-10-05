"use client";

import { MetaData, CategorySelection } from "@/types/quiz";

type Props = {
    metaData: MetaData;
    selectedAudience: string | null;
    selection: CategorySelection[];
    onAudienceChange: (audience: string) => void;
    onCategoryToggle: (category: string) => void;
    onSubcategoryToggle: (category: string, subcategory: string) => void;
    onTopicToggle: (category: string, subcategory: string, topic: string) => void;
};

const rowClass = (checked: boolean) =>
    `flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
        checked
            ? "border-blue-Primary-button bg-blue-Primary-button/5"
            : "border-gray-Input-border bg-white"
    }`;

export function MetaDataSelector({
    metaData,
    selectedAudience,
    selection,
    onAudienceChange,
    onCategoryToggle,
    onSubcategoryToggle,
    onTopicToggle,
}: Props) {
    return (
        <ul className="space-y-4">
            {metaData.Audiences.map((a) => {
                const isSelected = selectedAudience === a.Name;
                return (
                    <li key={a.Name}>
                        <div
                            className={`rounded-2xl border p-4 transition ${
                                isSelected
                                    ? "border-blue-Primary-button bg-gray-Page-background"
                                    : "border-gray-Card-background bg-white-Card-background"
                            }`}>
                            <label className="flex items-center gap-3 cursor-pointer font-semibold">
                                <input
                                    type="radio"
                                    name="audience"
                                    checked={isSelected}
                                    onChange={() => onAudienceChange(a.Name)}
                                />
                                <span>{a.Name}</span>
                            </label>

                            {isSelected && (
                                <ul className="mt-4 space-y-2 pl-6">
                                    {a.Categories.map((c) => {
                                        const catSel = selection.find((s) => s.Name === c.Name);
                                        return (
                                            <li key={c.Name}>
                                                <label className={rowClass(!!catSel)}>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!catSel}
                                                        onChange={() => onCategoryToggle(c.Name)}
                                                    />
                                                    <span>{c.Name}</span>
                                                    <span className="ml-auto text-sm opacity-60">{c.Count}</span>
                                                </label>

                                                {/* Subcategories */}
                                                {catSel && c.Subcategories.length > 0 && (
                                                    <ul className="mt-2 space-y-2 pl-6">
                                                        {c.Subcategories.map((s) => {
                                                            const subSel = catSel.Subcategories.find((x) => x.Name === s.Name);
                                                            return (
                                                                <li key={s.Name}>
                                                                    <label className={rowClass(!!subSel)}>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={!!subSel}
                                                                            onChange={() => onSubcategoryToggle(c.Name, s.Name)}
                                                                        />
                                                                        <span>{s.Name}</span>
                                                                        <span className="ml-auto text-sm opacity-60">{s.Count}</span>
                                                                    </label>

                                                                    {/* Topics */}
                                                                    {subSel && s.Topics.length > 0 && (
                                                                        <ul className="mt-2 space-y-2 pl-6">
                                                                            {s.Topics.map((t) => {
                                                                                const topicSel = subSel.Topics.includes(t.Name);
                                                                                return (
                                                                                    <li key={t.Name}>
                                                                                        <label className={rowClass(topicSel)}>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={topicSel}
                                                                                                onChange={() => onTopicToggle(c.Name, s.Name, t.Name)}
                                                                                            />
                                                                                            <span>{t.Name}</span>
                                                                                            <span className="ml-auto text-sm opacity-60">{t.Count}</span>
                                                                                        </label>
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
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