"use client";

import * as React from "react";
import { FiCheck } from "react-icons/fi";
import { cn } from "../utils";

// Radix's <Checkbox.Root> renders a button[role=checkbox] carrying a
// data-state attribute, which is what the styling below keys off. This
// prototype has no Radix dependency, so the same element and the same
// data-state contract are reproduced by hand.
type CheckboxProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onChange" | "type"
> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
};

export function Checkbox({
    className,
    checked = false,
    onCheckedChange,
    disabled,
    ...props
}: CheckboxProps) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            data-state={checked ? "checked" : "unchecked"}
            onClick={() => onCheckedChange?.(!checked)}
            className={cn(
                "peer h-5 w-5 shrink-0 rounded border border-[#e8ecea] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5a2c]/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#1f5a2c] data-[state=checked]:border-[#1f5a2c] data-[state=checked]:text-white transition-colors",
                className,
            )}
            {...props}
        >
            {checked && (
                <span className="flex items-center justify-center text-current">
                    <FiCheck className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
            )}
        </button>
    );
}
