"use server";

import { apiFetch } from "@/lib/apiClient";
import { SaveUserProfileDto } from "@/types/userType";

export async function PostUserProfile(
    payload: SaveUserProfileDto,
): Promise<SaveUserProfileDto> {

    console.log("Type:", typeof payload)
    console.log("payload", payload)

    return apiFetch<SaveUserProfileDto>("/user/UpdateQuizProfile", {
        method: "POST",
        body: payload,
    });
}
