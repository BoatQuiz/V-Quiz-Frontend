'use client';

import type { ReactNode, ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ children, className = "", ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={
        "w-full h-[47px] rounded-xl bg-blue-Primary-button text-white font-medium " +
        "flex items-center justify-center shadow-md " +
        "hover:bg-[#182e6e] active:translate-y-px transition " +
        className
      }
    >
      {children}
    </button>
  );
}
