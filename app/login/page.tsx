"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { PrimaryButton } from "../components/ui/buttons/PrimaryButton";
import { FormValues } from "@/types/login";

export default function LoginPage() {
    const { handleSubmit, register } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    
    return (
        <div className="bg-white-Card-background flex flex-col text-center">
            <div className="bg-gray-Card-background m-3 rounded-xl border border-gray-Input-border">
                <form className="flex flex-col p-3 gap-2.5" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="font-bold text-2xl">Sign In</h1>
                    <input
                        type="text"
                        className="border border-gray-Input-border p-2.5 bg-white-Card-background rounded-xl text-gray-Placeholder-text"
                        placeholder="Username"
                        {...register("username")}
                    />
                    <input
                        type="password"
                        className="border border-gray-Input-border p-2.5 bg-white-Card-background rounded-xl text-gray-Placeholder-text"
                        placeholder="Password"
                        {...register("password")}
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
                Continue without signing in
            </p>
        </div>
    );
}
