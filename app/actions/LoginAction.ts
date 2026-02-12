"use server";

import { apiFetch } from "@/lib/apiClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/quiz";
import { LoginResult, LoginUserDto } from "@/types/login";

export async function Login(data: {
    username: string;
    password: string;
}): Promise<LoginResult> {
    const response = await apiFetch<ApiResponse<LoginUserDto>>("/user/login", {
        method: "POST",
        body: {
            Username: data.username,
            Password: data.password,
        },
    });

    if (!response.Success || !response.Data) {
        return {
            success: false,
            message: response.Message || "Login failed",
        };
    }

    const { Id, Username } = response.Data;

    (await cookies()).set(
        "user_identity",
        JSON.stringify({ userId: Id, username: Username }),
        { path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: false
         }
    );
    redirect("/quiz");
}
