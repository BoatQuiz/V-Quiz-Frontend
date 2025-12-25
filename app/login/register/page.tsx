"use client";

import { RegisterUser } from "@/app/actions/RegisterAction";
import { PrimaryButton } from "@/app/components/ui/buttons/PrimaryButton";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);
    const inputCss =
        "bg-white-Card-background border border-gray-Input-border text-gray-Placeholder-text p-2.5 rounded-xl";
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!username || !password || !confirmPassword) {
            setError("All fieldes must be filled");
            return;
        }

        if (password != confirmPassword) {
            setError("Password dont match");
            return;
        }
        await RegisterUser({username, password})
        redirect("/login")
    }
    return (
        <div className="bg-white-Card-background m-3">
            <div className="border border-gray-Input-border rounded-xl bg-gray-Card-background p-2.5 text-center">
                <h1 className="font-bold text-2xl">Register user</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        className={inputCss}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className={inputCss}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={inputCss}
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <PrimaryButton type="submit">Register User</PrimaryButton>
                </form>
            </div>
        </div>
    );
}
