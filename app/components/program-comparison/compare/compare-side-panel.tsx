"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { MAX_COMPARE, MIN_COMPARE, useCompare } from "./compare-context";

/**
 * V1's in-progress compare panel for the search results rail.
 *
 * It's absolutely positioned so it lines up with the top of the results grid
 * rather than trailing the filter list, and its box spans exactly that grid —
 * so the panel sticks alongside the cards and stops at the last row. The
 * "Compare Programs" entry button stays above the grid with the cards.
 */
export default function CompareSidePanel() {
    const {
        version,
        compareMode,
        cancelCompareMode,
        selected,
        remove,
        canCompare,
        openCompare,
    } = useCompare();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [box, setBox] = useState<{ top: number; height: number } | null>(null);

    // Track the grid's position in the rail's coordinate space. The observer
    // fires on attach, so the first measurement comes for free, and again
    // whenever Load More or a resize changes the grid.
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const programs = document.getElementById("programs");
        if (!wrapper || !programs) return;

        const measure = () => {
            const rail = wrapper.offsetParent as HTMLElement | null;
            if (!rail) return;
            const railTop = rail.getBoundingClientRect().top;
            const programsRect = programs.getBoundingClientRect();
            setBox({
                top: Math.round(programsRect.top - railTop),
                height: Math.round(programsRect.height),
            });
        };

        // Measure once on the next tick (the observer's first callback waits on
        // a render, which never comes in a background tab), then track changes.
        const initial = setTimeout(measure, 0);
        const observer = new ResizeObserver(measure);
        observer.observe(programs);
        observer.observe(document.body);
        window.addEventListener("resize", measure);
        return () => {
            clearTimeout(initial);
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [compareMode]);

    // The bottom tray covers V2; this panel belongs to the checkbox flow.
    if (version !== "v1" || !compareMode) return null;

    return (
        <div
            ref={wrapperRef}
            className="pointer-events-none absolute inset-x-0 hidden xl:block"
            style={box ? { top: box.top, height: box.height } : undefined}
        >
            <div
                className={clsx(
                    // Pins under the sticky header + section nav, and rides
                    // along until the last result scrolls past.
                    "pointer-events-auto sticky top-[160px] flex max-h-[calc(100vh-200px)] flex-col gap-3 overflow-y-auto rounded-md border border-slate-200 bg-white p-4 shadow-lg",
                )}
            >
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-bold text-slate-700">
                        Select {MIN_COMPARE}–{MAX_COMPARE} programs to compare
                    </p>
                    <p className="text-xs text-slate-500">
                        {selected.length} of {MAX_COMPARE} selected
                        {selected.length >= MAX_COMPARE && " — maximum reached"}
                    </p>
                </div>

                <ul className="flex flex-col gap-1.5">
                    {selected.map((program) => (
                        <li
                            key={program.id}
                            className="flex min-h-[44px] items-start justify-between gap-2 rounded border border-slate-200 bg-slate-50 px-2 py-1.5"
                        >
                            <span className="line-clamp-2 text-xs font-semibold leading-tight text-slate-700">
                                {program.title}
                            </span>
                            <button
                                aria-label={`Remove ${program.title}`}
                                onClick={() => remove(program.id)}
                                className="shrink-0 text-slate-400 hover:text-slate-700"
                            >
                                <IoClose className="h-4 w-4" />
                            </button>
                        </li>
                    ))}
                    {/* Outlined slots for the picks still to come, mirroring
                        the empty cards in V2's tray. */}
                    {Array.from({ length: MAX_COMPARE - selected.length }).map(
                        (_, index) => (
                            <li
                                key={`empty-${index}`}
                                className="min-h-[44px] rounded border border-dashed border-slate-300"
                            />
                        ),
                    )}
                </ul>

                <button
                    onClick={openCompare}
                    disabled={!canCompare}
                    className={clsx(
                        "focus:ring-primary-200 flex h-10 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-bold text-white focus:outline-none focus:ring-4",
                        canCompare
                            ? "bg-roman-500 hover:bg-red-500 focus:bg-red-500 focus:ring-red-200"
                            : "cursor-not-allowed bg-slate-300",
                    )}
                >
                    Compare{selected.length ? ` (${selected.length})` : ""}
                </button>
                <button
                    onClick={cancelCompareMode}
                    className="text-xs font-bold text-neutral-700 underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
