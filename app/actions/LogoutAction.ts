"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function Logout() {
    (await cookies()).delete("user_identity");
    revalidatePath("/", "layout");
    redirect("/");
}