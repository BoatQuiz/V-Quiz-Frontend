"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Logout() {
    (await cookies()).delete("user_identity");
    redirect("/");
}