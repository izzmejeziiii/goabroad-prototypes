"use client";

import { useState } from "react";

export default function CounterInput({
    min,
    max,
    placeholder,
    multiline = false,
    rows = 4,
    defaultValue = "",
}: {
    min?: number;
    max: number;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    defaultValue?: string;
}) {
    const [val, setVal] = useState(defaultValue);
    const under = min != null && val.length > 0 && val.length < min;
    const cls =
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-500/20";

    return (
        <div>
            {multiline ? (
                <textarea
                    rows={rows}
                    maxLength={max}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder={placeholder}
                    className={cls}
                />
            ) : (
                <input
                    maxLength={max}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder={placeholder}
                    className={cls}
                />
            )}
            <div
                className={`mt-1 text-right text-xs ${
                    under ? "text-roman-600" : "text-slate-400"
                }`}
            >
                {val.length}/{max}
                {min ? ` · min ${min}` : ""}
            </div>
        </div>
    );
}
