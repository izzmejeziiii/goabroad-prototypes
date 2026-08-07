"use client";

import { useState } from "react";

export default function ToggleGroup({
    options,
    multiple = false,
    defaultValue = [],
}: {
    options: string[];
    multiple?: boolean;
    defaultValue?: string[];
}) {
    const [sel, setSel] = useState<string[]>(defaultValue);

    const toggle = (o: string) =>
        setSel((prev) =>
            multiple
                ? prev.includes(o)
                    ? prev.filter((x) => x !== o)
                    : [...prev, o]
                : [o],
        );

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((o) => {
                const active = sel.includes(o);
                return (
                    <button
                        key={o}
                        type="button"
                        onClick={() => toggle(o)}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                            active
                                ? "border-cobalt-500 bg-cobalt-500 text-white"
                                : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                        }`}
                    >
                        {o}
                    </button>
                );
            })}
        </div>
    );
}
