"use client";

import { PrimaryButton } from "../components/ui/buttons/PrimaryButton";
import { Login } from "../actions/LoginAction";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-white-Card-background flex flex-col text-center">
            <div className="bg-gray-Card-background m-3 rounded-xl border border-gray-Input-border">
                <form action={Login} className="flex flex-col p-3 gap-2.5" >
                    <h1 className="font-bold text-2xl">Sign In</h1>
                    <input
                        type="text"
                        name="username"
                        className="border border-gray-Input-border p-2.5 bg-white-Card-background rounded-xl text-gray-Placeholder-text"
                        placeholder="Username"
                        //{...register("username")}
                    />
                    <input
                        type="password"
                        name="password"
                        className="border border-gray-Input-border p-2.5 bg-white-Card-background rounded-xl text-gray-Placeholder-text"
                        placeholder="Password"
                        //{...register("password")}
                    />
                    <div className="flex justify-between p-1">
                        <div className="flex gap-2.5">
                            <input type="checkbox" />
                            <label htmlFor="checkbox">Remember me</label>
                        </div>
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-700">
                            Forgot password?
                        </span>
                    </div>
                    <PrimaryButton type="submit">Sign In</PrimaryButton>
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-700">
                            Create account
                        </span>
                    </p>
                </form>
            </div>
            <p className="text-gray-Placeholder-text">
                <Link href="/quiz">
                
                Continue without signing in
                </Link>
            </p>
        </div>
    );
}
