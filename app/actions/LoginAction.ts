"use server";

import { apiFetch } from "@/lib/apiClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/quiz";
import { LoginUserDto } from "@/types/login";

export async function Login(formData: FormData): Promise<void> {
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const response = await apiFetch<ApiResponse<LoginUserDto>>("/user/login", {
        method: "POST",
        body: JSON.stringify({ 
            Username: username, 
            Password: password 
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.Success || !response.Data) {
        throw new Error(response.Message ?? "Login failed");
    }

    const { Id, Username } = response.Data;

    (await cookies()).set(
        "user_identity",
        JSON.stringify({ userId: Id, username: Username }),
        { path: "/" }
    );
    redirect("/quiz");
}
