"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function ChipsBox({
    options,
    placeholder = "Select…",
    defaultSelected = [],
}: {
    options: string[];
    placeholder?: string;
    defaultSelected?: string[];
}) {
    const [sel, setSel] = useState<string[]>(defaultSelected);
    const remaining = options.filter((o) => !sel.includes(o));

    return (
        <div>
            <select
                value=""
                onChange={(e) => {
                    if (e.target.value) setSel((s) => [...s, e.target.value]);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-500/20"
            >
                <option value="">{placeholder}</option>
                {remaining.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            <div className="mt-2 flex min-h-[72px] flex-wrap gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                {sel.length === 0 && (
                    <span className="text-sm text-slate-400">
                        No items selected yet.
                    </span>
                )}
                {sel.map((s) => (
                    <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cobalt-500/10 px-3 py-1 text-xs font-medium text-cobalt-700"
                    >
                        {s}
                        <button
                            type="button"
                            onClick={() =>
                                setSel((x) => x.filter((i) => i !== s))
                            }
                        >
                            <FiX className="h-3 w-3" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
