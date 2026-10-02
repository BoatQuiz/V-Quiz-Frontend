import { GetCategoryStats } from "../actions/GetCategoryStats";
import { CategoryStat } from "@/types/quiz";
import SettingsBar from "../components/ui/SettingsBar";

export default async function ProgressPage() {
    const stats = await GetCategoryStats();

    const categories = stats["General"] ?? {};

    return (
        <div className="page-wrapper pt-8 flex flex-col gap-2.5">
            <div className="max-w-xl mx-auto w-full flex flex-col gap-2.5">
                <SettingsBar />

                <div className="app-container">
                    <h1 className="font-bold text-xl text-center">My progress</h1>
                    <p className="text-sm text-gray-Body-text text-center">
                        Based on your correct answers per category
                    </p>

                    {Object.entries(categories).map(([categoryName, stat]) => (
                        <CategoryCard key={categoryName} name={categoryName} stat={stat} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const LEVEL_LABELS = ["Easy", "Medium", "Hard"] as const;

function CategoryCard({ name, stat }: { name: string; stat: CategoryStat }) {
    const hasEnoughData = stat.RecentAnswers.length >= 10;
    const levelLabel = LEVEL_LABELS[stat.Level as unknown as number] ?? "Unknown";

    return (
        <div className="border border-gray-Card-background rounded-xl p-2.5 flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h2 className="font-bold">{name}</h2>
                {hasEnoughData && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-Page-background">
                        {levelLabel}
                    </span>
                )}
            </div>

            {hasEnoughData ? (
                <p className="text-sm">{stat.Percent}% accuracy</p>
            ) : (
                <p className="text-sm text-gray-Placeholder-text">
                    Answer more questions to see your progress ({stat.RecentAnswers.length}/10)
                </p>
            )}
        </div>
    );
}