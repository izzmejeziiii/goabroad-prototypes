"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import {
    MAX_COMPARE,
    MIN_COMPARE,
    useCompare,
} from "./compare-context";

/**
 * Sits above a grid of program cards.
 *
 * V1: the "Compare Programs" toggle, and once compare mode is on, the running
 * count with the Compare / Cancel pair.
 * V2: a one-line hint — selection lives on the cards and in the bottom tray.
 */
export default function CompareSectionBar({
    /** Search results move the in-progress panel into the filter rail at xl. */
    hideOnDesktop = false,
}: {
    hideOnDesktop?: boolean;
} = {}) {
    const {
        version,
        compareMode,
        startCompareMode,
        cancelCompareMode,
        selected,
        remove,
        canCompare,
        openCompare,
        clear,
    } = useCompare();

    if (version === "v2") {
        return (
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <MdCompareArrows className="text-cobalt-500 h-5 w-5 shrink-0" />
                <span>
                    Tap the compare icon on up to {MAX_COMPARE} programs to see them
                    side by side.
                </span>
                {!!selected.length && (
                    <button
                        onClick={clear}
                        className="text-cobalt-500 hover:text-cobalt-600 font-bold underline"
                    >
                        Clear {selected.length} selected
                    </button>
                )}
            </div>
        );
    }

    if (!compareMode) {
        return (
            <div className="flex justify-start md:justify-end">
                <button
                    onClick={startCompareMode}
                    className="border-cobalt-500 text-cobalt-500 hover:border-cobalt-600 hover:text-cobalt-600 focus:ring-primary-200 flex h-10 w-full items-center justify-center gap-2 rounded-md border bg-white px-5 text-sm font-bold transition-all duration-300 hover:bg-slate-100 focus:outline-none focus:ring-4 md:w-auto"
                >
                    <MdCompareArrows className="h-4 w-4" />
                    Compare Programs
                </button>
            </div>
        );
    }

    return (
        <div
            className={clsx(
                "flex flex-col gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between",
                { "xl:hidden": hideOnDesktop },
            )}
        >
            <div className="flex shrink-0 flex-col gap-0.5">
                <p className="text-sm font-bold text-slate-700">
                    Select {MIN_COMPARE}–{MAX_COMPARE} programs to compare
                </p>
                <p className="text-xs text-slate-500">
                    {selected.length} of {MAX_COMPARE} selected
                    {selected.length >= MAX_COMPARE && " — maximum reached"}
                </p>
            </div>
            {/* What's been picked so far, with outlined slots for the rest */}
            <ul className="flex min-w-0 flex-1 items-stretch gap-2 overflow-x-auto md:justify-center">
                {selected.map((program) => (
                    <li
                        key={program.id}
                        className="flex min-h-[44px] w-[180px] shrink-0 items-start justify-between gap-2 rounded border border-slate-200 bg-white px-2 py-1.5"
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
                {Array.from({ length: MAX_COMPARE - selected.length }).map(
                    (_, index) => (
                        <li
                            key={`empty-${index}`}
                            className="min-h-[44px] w-[180px] shrink-0 rounded border border-dashed border-slate-300"
                        />
                    ),
                )}
            </ul>
            <div className="flex shrink-0 items-center gap-3">
                <button
                    onClick={cancelCompareMode}
                    className="text-sm font-bold text-neutral-700 underline"
                >
                    Cancel
                </button>
                <button
                    onClick={openCompare}
                    disabled={!canCompare}
                    className={clsx(
                        "focus:ring-primary-200 flex h-10 flex-1 items-center justify-center gap-2 rounded-md px-6 text-sm font-bold text-white focus:outline-none focus:ring-4 md:flex-none",
                        canCompare
                            ? "bg-roman-500 hover:bg-red-500 focus:bg-red-500 focus:ring-red-200"
                            : "cursor-not-allowed bg-slate-300",
                    )}
                >
                    Compare{selected.length ? ` (${selected.length})` : ""}
                </button>
            </div>
        </div>
    );
}

/** V2's bottom tray: the selected programs, with the Compare call to action. */
export function CompareTray() {
    const { version, selected, remove, clear, canCompare, openCompare, isOpen } =
        useCompare();
    const trayRef = useRef<HTMLDivElement>(null);
    const [collapsed, setCollapsed] = useState(false);
    const showTray = version === "v2" && !!selected.length && !isOpen;

    // The mobile filter pill, the Online Advisor bubble and the version toggle
    // all live at the bottom of the viewport — lift them above the tray, by
    // however tall the tray actually is.
    useEffect(() => {
        document.body.classList.toggle("compare-tray-open", showTray);
        if (!showTray) {
            document.body.style.removeProperty("--compare-tray-height");
            return () => document.body.classList.remove("compare-tray-open");
        }

        const measure = () => {
            const height = trayRef.current?.offsetHeight ?? 0;
            document.body.style.setProperty(
                "--compare-tray-height",
                `${height}px`,
            );
        };
        const initial = setTimeout(measure, 0);
        const observer = new ResizeObserver(measure);
        if (trayRef.current) observer.observe(trayRef.current);
        window.addEventListener("resize", measure);
        return () => {
            clearTimeout(initial);
            observer.disconnect();
            window.removeEventListener("resize", measure);
            document.body.classList.remove("compare-tray-open");
            document.body.style.removeProperty("--compare-tray-height");
        };
    }, [showTray, collapsed]);

    if (!showTray) return null;

    return (
        <div
            ref={trayRef}
            className="z-ultraverse-5 fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white shadow-[0_-6px_16px_-8px_rgba(15,23,42,0.25)]"
        >
            <div
                className={clsx(
                    "mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 transition-all duration-300 ease-in-out md:flex-row md:items-center md:justify-center md:gap-6 xl:px-0",
                    collapsed ? "py-3" : "py-3 md:py-6",
                    "relative",
                )}
            >
                <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    aria-label={
                        collapsed ? "Expand selection" : "Collapse selection"
                    }
                    aria-expanded={!collapsed}
                    className="absolute -top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow transition-colors hover:bg-slate-100 hover:text-slate-900 xl:right-0"
                >
                    <HiChevronDown
                        className={clsx(
                            "h-5 w-5 transition-transform",
                            collapsed && "rotate-180",
                        )}
                    />
                </button>
                {/* Cards keep their own width and sit together — the group is
                    centred rather than stretched across the page. */}
                <div
                    className={clsx(
                        "flex w-full min-w-0 items-stretch gap-3 overflow-x-auto transition-all duration-300 md:w-auto md:flex-initial md:gap-6",
                        // Room for the remove buttons hanging off the corners.
                        collapsed && "pr-3 pt-3",
                    )}
                >
                    {selected.map((program) => (
                        <div
                            key={program.id}
                            className={clsx(
                                // The wrapper doesn't clip, so the shrunk card's
                                // remove button can hang off the corner.
                                "relative w-[220px] shrink-0 transition-all duration-300 ease-in-out md:w-[285px]",
                                collapsed
                                    ? "h-[72px] md:h-[80px]"
                                    : "h-[130px] md:h-[150px]",
                            )}
                        >
                            <div className="absolute inset-0 overflow-hidden rounded-lg bg-slate-700">
                                {!!program.image && (
                                    <Image
                                        src={program.image}
                                        alt={program.imageAlt}
                                        fill
                                        sizes="(max-width: 768px) 220px, 285px"
                                        className="object-cover"
                                    />
                                )}
                                {/* Keeps the title legible over any photo */}
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/45 to-slate-900/10" />
                                <div
                                    className={clsx(
                                        "absolute inset-x-0 bottom-0 flex flex-col gap-1 transition-all duration-300",
                                        collapsed ? "p-2" : "p-3",
                                    )}
                                >
                                    <p
                                        className={clsx(
                                            "text-sm font-bold leading-tight text-white",
                                            collapsed
                                                ? "line-clamp-1"
                                                : "line-clamp-2",
                                        )}
                                    >
                                        {program.title}
                                    </p>
                                    <p className="flex items-center gap-1.5 text-xs text-white/90">
                                        <span className="truncate">
                                            {program.providerName}
                                        </span>
                                        {program.isVerified && (
                                            <FaCheckCircle className="text-fern-500 h-3.5 w-3.5 shrink-0" />
                                        )}
                                    </p>
                                </div>
                            </div>
                            <button
                                aria-label={`Remove ${program.title}`}
                                onClick={() => remove(program.id)}
                                className={clsx(
                                    // Sits on the card while expanded, hangs off
                                    // the corner once the tray is shrunk.
                                    "absolute flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-600 shadow transition-all duration-300 hover:text-slate-900",
                                    collapsed ? "-right-2 -top-2" : "right-2 top-2",
                                )}
                            >
                                <IoClose className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                    {/* Empty slots show how many more can be added. */}
                    {Array.from({ length: MAX_COMPARE - selected.length }).map(
                        (_, index) => (
                            <div
                                key={`empty-${index}`}
                                className={clsx(
                                    "hidden w-[285px] shrink-0 rounded-lg border-2 border-dashed border-slate-300 transition-all duration-300 ease-in-out md:block",
                                    collapsed ? "h-[80px]" : "h-[150px]",
                                )}
                            />
                        ),
                    )}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <button
                        onClick={clear}
                        className="text-sm font-bold text-neutral-700 underline"
                    >
                        Clear
                    </button>
                    <button
                        onClick={openCompare}
                        disabled={!canCompare}
                        className={clsx(
                            "focus:ring-primary-200 flex h-10 flex-1 items-center justify-center gap-2 rounded-md px-6 text-sm font-bold text-white focus:outline-none focus:ring-4 md:flex-none",
                            canCompare
                                ? "bg-roman-500 hover:bg-red-500 focus:bg-red-500 focus:ring-red-200"
                                : "cursor-not-allowed bg-slate-300",
                        )}
                    >
                        <MdCompareArrows className="h-4 w-4" />
                        Compare ({selected.length})
                    </button>
                </div>
            </div>
        </div>
    );
}
