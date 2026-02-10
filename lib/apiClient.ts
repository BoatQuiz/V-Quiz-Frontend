import { cookies, headers } from "next/headers";

//const API_BASE_URL =
    //"https://v-quiz-func-f4hgg0d0bkd0azdp.swedencentral-01.azurewebsites.net/api";
    //"http://localhost:7240/api"
    //"/api";

 async function getBaseUrl() {
    // körs i browser
    if (typeof window !== "undefined") {
        return "";
    }

    //Körs på server
    const h = await headers()
    const host = h.get("host");
    

    return `http://${host}`
}

export async function apiFetch<TResponse>(
    endpoint: string,
    options?: RequestInit,
): Promise<TResponse> {
    const baseUrl = await getBaseUrl();
    const cookieHeader = (await cookies()).toString();

    const res = await fetch(`${baseUrl}/api${endpoint}`, {
        ...options,
        
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
            ...(options?.headers || {}),
        },
        cache: "no-store",
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok && res.status >= 500) {
        throw new Error(`API Error ${res.status}`);
    }

    return data as TResponse;
}
