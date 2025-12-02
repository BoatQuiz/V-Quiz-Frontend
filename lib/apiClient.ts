const API_BASE_URL =
    "https://v-quiz-func-f4hgg0d0bkd0azdp.swedencentral-01.azurewebsites.net/api";

export async function apiFetch<TResponse>(
    endpoint: string,
    options?: RequestInit
): Promise<TResponse> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error ${res.status}: ${text}`);
    }

    return res.json() as Promise<TResponse>;
}
