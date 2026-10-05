"use client";

import { GetMetaData } from "@/app/actions/GetMetaData";
import { GetQuizProfile } from "@/app/actions/GetQuizProfile";
import { CategorySelection, MetaData, QuizProfile } from "@/types/quiz";
import { useEffect, useState } from "react";
import { MetaDataSelector } from "./MetaDataSelector";
import { SaveUser } from "../ui/buttons/SaveUser";
import { PostUserProfile } from "@/app/actions/PostUserProfile";
import { useRouter } from "next/navigation";
import { toggleCategory, toggleSubcategory, toggleTopic } from "./Selection";

export function QuizSetup() {
    const [profile, setProfile] = useState<QuizProfile | null>(null);
    const [metaData, setMetaData] = useState<MetaData | null>(null);
    const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
    const [selection, setSelection] = useState<CategorySelection[]>([]);
    const router = useRouter();

    useEffect(() => {
        GetQuizProfile().then((p) => {
            setProfile(p);
            setSelectedAudience(p.Audience);
            // Profilen sparar än så länge bara kategorinamn
            setSelection(p.Categories.map((name) => ({ Name: name, Subcategories: [] })));
        });

        GetMetaData().then(setMetaData);
    }, []);

    if (!profile || !metaData) return <p>Loading...</p>;

    const handleSave = async () => {
        if (!selectedAudience || selection.length === 0) {
            alert("Please select audience and at least one category");
            return;
        }

        const payload = {
            audience: selectedAudience,
            // Tills backend tar emot hela trädet
            categories: selection.map((c) => c.Name),
        };

        await PostUserProfile(payload);
        router.push("/quiz");
    };

    return (
        <div>
            <MetaDataSelector
                metaData={metaData}
                selectedAudience={selectedAudience}
                selection={selection}
                onAudienceChange={(a) => {
                    setSelectedAudience(a);
                    setSelection([]);
                }}
                onCategoryToggle={(cat) => setSelection((s) => toggleCategory(s, cat))}
                onSubcategoryToggle={(cat, sub) => setSelection((s) => toggleSubcategory(s, cat, sub))}
                onTopicToggle={(cat, sub, t) => setSelection((s) => toggleTopic(s, cat, sub, t))}
            />
            <SaveUser onClick={handleSave} className="mt-2" />
        </div>
    );
}