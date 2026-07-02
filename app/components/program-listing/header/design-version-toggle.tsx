"use client";

import type { DesignVersion } from "../types";
import { BRAND_BLUE, DESIGN_TOGGLE_HEIGHT } from "../data";

export const DesignVersionToggle = ({
    value,
    onChange,
}: {
    value: DesignVersion;
    onChange: (v: DesignVersion) => void;
}) => (
    <div
        className="fixed top-0 left-0 right-0 z-[60] text-white"
        style={{
            background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, #1f4d6e 100%)`,
            height: DESIGN_TOGGLE_HEIGHT,
        }}
    >
        <div className="h-full w-full px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-sun-500 text-slate-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[10px]">
                    Prototype
                </span>
                <span className="hidden sm:inline text-white/80 font-medium">
                    This page has multiple header designs — toggle to compare.
                </span>
                <span className="sm:hidden text-white/80 font-medium">
                    Toggle header design:
                </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] uppercase tracking-wider font-bold text-white/70 hidden md:inline">
                    Header Design
                </span>
                <div className="bg-white/10 rounded-full p-0.5 flex items-center">
                    {(
                        [
                            { id: "v1", label: "V1 · Full history" },
                            { id: "v2", label: "V2 · Inline diff" },
                            { id: "v3", label: "V3 · Summary only" },
                        ] as const
                    ).map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onChange(opt.id)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                                value === opt.id
                                    ? "bg-white shadow-sm"
                                    : "text-white/80 hover:text-white"
                            }`}
                            style={
                                value === opt.id
                                    ? { color: BRAND_BLUE }
                                    : {}
                            }
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
