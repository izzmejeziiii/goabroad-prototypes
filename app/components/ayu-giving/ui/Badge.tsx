import * as React from "react";
import { cn } from "../utils";

// Same variant set as the source app's `badge.tsx`. Its semantic tokens
// (--primary, --border, --destructive …) live in the AYU theme, which this
// prototype doesn't load globally, so each one is written as its literal color.
const badgeBase =
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";

const badgeVariants = {
    default: "bg-[#1f5a2c] text-white border-transparent",
    secondary: "bg-[#f5ebe0] text-[#1a1f1c] border-transparent",
    outline: "bg-white text-[#1a1f1c] border-[#e8ecea]",
    success: "bg-[#eefbf5] text-[#1f5a2c] border-[#1f5a2c]/30",
    warning: "bg-[#fef3c7] text-[#92400e] border-[#f59e0b]/40",
    destructive: "bg-[#dc2828]/10 text-[#dc2828] border-[#dc2828]/30",
    info: "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(badgeBase, badgeVariants[variant], className)}
            {...props}
        />
    );
}
