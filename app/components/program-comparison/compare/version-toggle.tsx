"use client";

import { useCompare } from "./compare-context";

const BRAND_BLUE = "#295d82";
export const COMPARE_TOGGLE_HEIGHT = 44;

const options = [
    { id: "v1", short: "V1", label: "V1 · Compare mode" },
    { id: "v2", short: "V2", label: "V2 · Quick add" },
] as const;

/**
 * Prototype-only control for flipping between the two comparison flows —
 * the same banner /program-listing uses for its design versions.
 */
export default function CompareVersionToggle() {
    const { version, setVersion, isOpen } = useCompare();

    if (isOpen) return null;

    return (
        <div
            className="fixed left-0 right-0 top-0 z-[60] text-white"
            style={{
                background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, #1f4d6e 100%)`,
                height: COMPARE_TOGGLE_HEIGHT,
            }}
        >
            <div className="flex h-full w-full items-center justify-between gap-3 px-3 sm:gap-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-2 text-xs">
                    <span className="bg-sun-500 inline-flex shrink-0 items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900">
                        Prototype
                    </span>
                    <span className="hidden truncate font-medium text-white/80 sm:inline">
                        This page has two program comparison flows — toggle to
                        compare.
                    </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden text-[10px] font-bold uppercase tracking-wider text-white/70 md:inline">
                        Compare Flow
                    </span>
                    <div className="flex items-center rounded-full bg-white/10 p-0.5">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setVersion(option.id)}
                                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                                    version === option.id
                                        ? "bg-white shadow-sm"
                                        : "text-white/80 hover:text-white"
                                }`}
                                style={
                                    version === option.id
                                        ? { color: BRAND_BLUE }
                                        : {}
                                }
                            >
                                <span className="sm:hidden">{option.short}</span>
                                <span className="hidden sm:inline">
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
