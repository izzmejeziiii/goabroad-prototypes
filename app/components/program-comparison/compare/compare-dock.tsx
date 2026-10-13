"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { FaCheckCircle } from "react-icons/fa";
import { HiChevronUp } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import {
    MAX_COMPARE,
    MIN_COMPARE,
    useCompare,
    type ComparableProgram,
} from "./compare-context";

/** The provider's logo as a round avatar, or its initial when there's none. */
function ProviderAvatar({
    program,
    className,
}: {
    program: ComparableProgram;
    className: string;
}) {
    if (!program.providerLogo) {
        return (
            <span
                className={clsx(
                    "flex items-center justify-center bg-slate-200 text-xs font-bold text-slate-600",
                    className,
                )}
            >
                {program.providerName.charAt(0)}
            </span>
        );
    }
    return (
        <Image
            src={program.providerLogo}
            alt=""
            width={40}
            height={40}
            className={clsx("bg-white object-cover", className)}
        />
    );
}

/**
 * V4's floating dock — a compact pill at the bottom of the viewport in place of
 * V2/V3's full-width tray. The picks show as a stack of provider logos with
 * Compare one tap away; the pill opens a panel listing them.
 */
export default function CompareDock() {
    const { version, selected, isOpen } = useCompare();

    if (version !== "v4" || !selected.length || isOpen) return null;

    // Mounted only while there's something to show, so it always arrives
    // folded into the pill.
    return <Dock />;
}

function Dock() {
    const { selected, remove, clear, canCompare, openCompare } = useCompare();
    const [expanded, setExpanded] = useState(false);
    const dockRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const needed = MIN_COMPARE - selected.length;

    // Lift the mobile filter pill and the Online Advisor bubble above the pill,
    // the same way the tray does. Only the pill counts — the panel opens over
    // the page rather than pushing them further up.
    useEffect(() => {
        const body = document.body;
        const measure = () => {
            // The pill floats 16px off the bottom of the viewport.
            const height = (barRef.current?.offsetHeight ?? 0) + 16;
            body.style.setProperty("--compare-tray-height", `${height}px`);
        };
        body.classList.add("compare-tray-open");
        measure();
        const observer = new ResizeObserver(measure);
        if (barRef.current) observer.observe(barRef.current);
        return () => {
            observer.disconnect();
            body.classList.remove("compare-tray-open");
            body.style.removeProperty("--compare-tray-height");
        };
    }, []);

    // Escape or a click anywhere else folds the panel back into the pill.
    useEffect(() => {
        if (!expanded) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setExpanded(false);
        };
        const onPointerDown = (event: PointerEvent) => {
            if (!dockRef.current?.contains(event.target as Node)) {
                setExpanded(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [expanded]);

    return (
        // Sits above the Online Advisor bubble (z-50) so the open panel covers
        // it on narrow screens; the version banner (z-60) stays on top.
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[55] flex justify-center px-4">
            <div
                ref={dockRef}
                className="compare-dock-in pointer-events-auto relative w-full max-w-[420px]"
            >
                {expanded && (
                    <div
                        id="compare-dock-panel"
                        className="compare-dock-in absolute inset-x-0 bottom-full mb-2 flex max-h-[min(440px,calc(100vh-220px))] flex-col gap-3 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-sm font-bold text-slate-700">
                                    Your comparison
                                </p>
                                <p className="text-xs text-slate-500">
                                    Pick {MIN_COMPARE}–{MAX_COMPARE} programs to
                                    see them side by side
                                </p>
                            </div>
                            <button
                                onClick={clear}
                                className="shrink-0 text-xs font-bold text-neutral-700 underline"
                            >
                                Clear all
                            </button>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {selected.map((program) => (
                                <li
                                    key={program.id}
                                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-2"
                                >
                                    <ProviderAvatar
                                        program={program}
                                        className="h-10 w-10 shrink-0 rounded-lg shadow-sm"
                                    />
                                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <p className="line-clamp-2 text-sm font-bold leading-tight text-slate-700">
                                            {program.title}
                                        </p>
                                        <p className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <span className="truncate">
                                                {program.providerName}
                                            </span>
                                            {program.isVerified && (
                                                <FaCheckCircle className="text-fern-500 h-3.5 w-3.5 shrink-0" />
                                            )}
                                        </p>
                                    </div>
                                    <button
                                        aria-label={`Remove ${program.title}`}
                                        onClick={() => remove(program.id)}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                    >
                                        <IoClose className="h-4 w-4" />
                                    </button>
                                </li>
                            ))}
                            {/* Same footprint as a pick, so the list doesn't
                                jump as it fills. */}
                            {Array.from({
                                length: MAX_COMPARE - selected.length,
                            }).map((_, index) => (
                                <li
                                    key={`empty-${index}`}
                                    className="flex h-[58px] items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-3 text-center text-xs text-slate-500"
                                >
                                    Tick &ldquo;Add to compare&rdquo; on another
                                    program
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div
                    ref={barRef}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.35)]"
                >
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        aria-expanded={expanded}
                        aria-controls="compare-dock-panel"
                        className="flex min-w-0 flex-1 items-center gap-2 rounded-full py-1 pl-1 pr-2 text-left transition-colors hover:bg-slate-50 sm:gap-3 sm:pr-3"
                    >
                        <span className="flex shrink-0 -space-x-2">
                            {selected.map((program) => (
                                <ProviderAvatar
                                    key={program.id}
                                    program={program}
                                    className="h-7 w-7 rounded-full ring-2 ring-white sm:h-8 sm:w-8"
                                />
                            ))}
                            {/* One dashed circle per slot still open */}
                            {Array.from({
                                length: MAX_COMPARE - selected.length,
                            }).map((_, index) => (
                                <span
                                    key={`empty-${index}`}
                                    className="h-7 w-7 rounded-full border-2 border-dashed border-slate-300 bg-white sm:h-8 sm:w-8"
                                />
                            ))}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-sm font-bold leading-tight text-slate-700">
                                {selected.length} of {MAX_COMPARE} selected
                            </span>
                            {/* Phones keep the pill to one line; the
                                disabled Compare button says the rest. */}
                            <span className="hidden truncate text-xs text-slate-500 sm:block">
                                {canCompare
                                    ? "Ready to compare"
                                    : `Pick ${needed} more to compare`}
                            </span>
                        </span>
                        <HiChevronUp
                            className={clsx(
                                "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200",
                                expanded && "rotate-180",
                            )}
                        />
                    </button>
                    <button
                        onClick={openCompare}
                        disabled={!canCompare}
                        className={clsx(
                            "flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold text-white focus:outline-none focus:ring-4 sm:px-5",
                            canCompare
                                ? "bg-roman-500 hover:bg-red-500 focus:bg-red-500 focus:ring-red-200"
                                : "cursor-not-allowed bg-slate-300",
                        )}
                    >
                        <MdCompareArrows className="hidden h-4 w-4 sm:block" />
                        Compare
                    </button>
                </div>
            </div>
        </div>
    );
}
