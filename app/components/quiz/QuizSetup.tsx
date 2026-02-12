"use client";

import { GetMetaData } from "@/app/actions/GetMetaData";
import { GetQuizProfile } from "@/app/actions/GetQuizProfile";
import { MetaData, QuizProfile } from "@/types/quiz";
import { useEffect, useState } from "react";
import { MetaDataSelector } from "./MetaDataSelector";
import { SaveUser } from "../ui/buttons/SaveUser";
import { PostUserProfile } from "@/app/actions/PostUserProfile";

export function QuizSetup() {
    const [profile, setProfile] = useState<QuizProfile | null>(null);
    const [metaData, setMetadData] = useState<MetaData | null>(null);

    const [selectedAudience, setSelectedAudience] = useState<string | null>(
        null,
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        GetQuizProfile().then((p) => {
            setProfile(p);
            setSelectedAudience(p.Audience);
            setSelectedCategories(p.Categories);
        });

        GetMetaData().then(setMetadData);
    }, []);

    if (!profile || !metaData) return <p>Loading...</p>;
    console.log(profile);
    console.log(selectedAudience);
    console.log(selectedCategories);

    const handleSave = async () => {
        if (!selectedAudience || selectedCategories.length === 0) {
            alert("Please select audience and at least one category");
            return;
        }

        const payload = {
            audience: selectedAudience,
            categories: selectedCategories,
        };

        await PostUserProfile(payload)
        console.log(payload);
    };
    return (
        <div>
            <MetaDataSelector
                metaData={metaData}
                selectedAudience={selectedAudience}
                selectedCategories={selectedCategories}
                onAudienceChange={(a) => {
                    setSelectedAudience(a);
                    setSelectedCategories([]);
                }}
                onCategoryToggle={(c) =>
                    setSelectedCategories((prev) =>
                        prev.includes(c)
                            ? prev.filter((x) => x !== c)
                            : [...prev, c],
                    )
                }
            />
            <SaveUser onClick={handleSave} />
        </div>
    );
}
