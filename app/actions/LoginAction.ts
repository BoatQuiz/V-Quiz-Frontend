"use server";

import { apiFetch } from "@/lib/apiClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type LoginResponse = {
    userId : string;
    username : string;
}

export async function Login(formData: FormData): Promise<void> {
    const Username = formData.get("username")?.toString() ?? "";
    const Password = formData.get("password")?.toString() ?? "";
    console.log("Från formAction: ", { Username, Password });
    const response = await apiFetch<LoginResponse>("/user/login", {
        method: "POST",
        body: JSON.stringify({ Username, Password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const { userId, username: name } = response;

    (await cookies()).set(
        "user_identity",
        JSON.stringify({ userId, username: name }),
        { path: "/" }
    );
    redirect("/quiz");
}
