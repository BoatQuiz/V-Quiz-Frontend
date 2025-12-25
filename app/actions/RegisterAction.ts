'use server'

import { apiFetch } from "@/lib/apiClient"
import { RegisterUserDto } from "@/types/login";
import { ApiResponse } from "@/types/quiz"

export async function RegisterUser(data: { username: string, password: string}): Promise<void> {


    const response = await apiFetch<ApiResponse<RegisterUserDto>>("/user/register", {
        method: "POST",
        body: JSON.stringify({
            Username: data.username,
            Password: data.password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.Success || !response.Data){
        throw new Error(response.Message ?? "Register failed")
    }
}