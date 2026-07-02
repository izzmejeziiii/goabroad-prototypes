"use client";

import { MdInfoOutline } from "react-icons/md";
import { BRAND_BLUE } from "../data";

export const Switch = ({
    checked,
    onChange,
    label,
    hint,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    hint?: string;
}) => (
    <label className="flex items-center gap-2 cursor-pointer group">
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0"
            style={{
                backgroundColor: checked ? BRAND_BLUE : "#cbd5e1",
            }}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    checked ? "translate-x-[18px]" : "translate-x-[2px]"
                }`}
            />
        </button>
        <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
            {label}
            {hint && (
                <span title={hint}>
                    <MdInfoOutline className="w-3.5 h-3.5 text-slate-400" />
                </span>
            )}
        </span>
    </label>
);
