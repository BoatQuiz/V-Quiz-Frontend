"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

type SecondaryButtonProps = {
    children: ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function SecondaryButton({
    children,
    className = "",
    ...props
}: SecondaryButtonProps) {
    return (
        <button
            {...props}
            className={
                "rounded-xl border border-gray-300 text-gray-700 font-medium flex items-center justify-center hover:bg-gray-100 active:translate-y-px transition " + className
            }>
            {children}
        </button>
    );
}
