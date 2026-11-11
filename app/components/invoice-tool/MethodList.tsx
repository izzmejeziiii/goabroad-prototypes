"use client";

import { cn } from "@/app/lib/utils";
import type { MethodId } from "./types";

export interface MethodOption {
    id: MethodId;
    name: string;
    note: string;
}

/** Native radios styled as cards, so arrow keys move between methods. */
export default function MethodList({
    options,
    selected,
    onSelect,
}: {
    options: MethodOption[];
    selected: MethodId;
    onSelect: (id: MethodId) => void;
}) {
    return (
        <fieldset>
            <legend className="sr-only">Payment method</legend>
            <ul className="flex flex-col gap-2.5">
                {options.map((option) => {
                    const isSelected = option.id === selected;
                    return (
                        <li key={option.id}>
                            <label
                                className={cn(
                                    "flex cursor-pointer items-center gap-4 rounded-xl border-2 bg-white px-5 py-4 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-cobalt-500/25",
                                    isSelected
                                        ? "border-cobalt-500"
                                        : "border-slate-200 hover:border-slate-300",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value={option.id}
                                    checked={isSelected}
                                    onChange={() => onSelect(option.id)}
                                    className="sr-only"
                                />
                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                    <span className="text-base font-semibold text-slate-900">
                                        {option.name}
                                    </span>
                                    <span className="text-sm tabular-nums text-slate-600">
                                        {option.note}
                                    </span>
                                </span>
                                <span
                                    aria-hidden
                                    className={cn(
                                        "h-5 w-5 flex-none rounded-full transition-all",
                                        isSelected
                                            ? "border-[6px] border-cobalt-500"
                                            : "border-2 border-slate-300",
                                    )}
                                />
                            </label>
                        </li>
                    );
                })}
            </ul>
        </fieldset>
    );
}
