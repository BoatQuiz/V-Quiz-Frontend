import { CategorySelection } from "@/types/quiz";

export function toggleCategory(sel: CategorySelection[], cat:string): CategorySelection[] {
    return sel.some((c) => c.Name === cat)
        ? sel.filter((c) => c.Name !== cat)
        : [...sel, { Name: cat, Subcategories: [] }];
}

export function toggleSubcategory(sel: CategorySelection[], cat:string, sub:string): CategorySelection[] {
    return sel.map((c) => {
        if (c.Name !== cat) return c;
        const exists = c.Subcategories.some((s) => s.Name === sub);
        return {
            ...c,
            Subcategories: exists
                ? c.Subcategories.filter((s) => s.Name !== sub)
                : [...c.Subcategories, { Name: sub, Topics: [] }]
        };
    });
}

export function toggleTopic(sel: CategorySelection[], cat: string, sub: string, topic: string): CategorySelection[] {
    return sel.map((c) => {
        if (c.Name !== cat) return c;
        return {
            ...c,
            Subcategories: c.Subcategories.map((s) => {
                if (s.Name !== sub) return s;
                return {
                    ...s,
                    Topics: s.Topics.includes(topic)
                        ? s.Topics.filter((t) => t !== topic)
                        : [...s.Topics, topic],
                };
            }),
        };
    });
}