"use client";

import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import {
    MAX_COMPARE,
    useCompare,
    type ComparableProgram,
} from "./compare-context";

/**
 * The per-card selector.
 *
 * V1 puts a checkbox where the save heart normally sits, but only once the
 * visitor has pressed "Compare Programs". V2 keeps a compare icon beside the
 * heart at all times. V3 combines the two: V1's checkbox, always on, in the
 * corner the save heart has vacated. V4 leaves the corner to the heart and
 * selects from the card's footer instead — see CompareCardFooter.
 */
export default function CompareControl({
    program,
}: {
    program: ComparableProgram;
}) {
    const { version, compareMode, isSelected, isFull, toggle } = useCompare();
    const selected = isSelected(program.id);
    const disabled = !selected && isFull;

    if (version === "v4") return null;

    if (version === "v1" || version === "v3") {
        // V1 reveals the checkbox only in compare mode; V3 always shows it.
        if (version === "v1" && !compareMode) return null;
        return (
            <label
                className={clsx(
                    // Both take the save button's corner — V1 while compare
                    // mode is on, V3 for good.
                    "z-sky absolute right-2 top-2 flex items-center gap-2 rounded-md bg-white/95 px-2 py-1.5 shadow-md",
                    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    className={clsx(
                        "flex h-5 w-5 items-center justify-center rounded border",
                        selected
                            ? "bg-cobalt-500 border-cobalt-500 text-white"
                            : "border-gray-400 bg-white",
                    )}
                >
                    {selected && <FaCheck className="h-3 w-3" />}
                </span>
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    disabled={disabled}
                    onChange={() => toggle(program)}
                />
                <span className="text-xs font-bold text-slate-700">
                    {selected ? "Selected" : "Compare"}
                </span>
            </label>
        );
    }

    return (
        <div className="z-sky group/compare absolute right-10 top-1">
            <button
                type="button"
                aria-label={
                    selected ? "Remove from comparison" : "Add to comparison"
                }
                aria-pressed={selected}
                disabled={disabled}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle(program);
                }}
                className={clsx(
                    "flex h-7 w-7 items-center justify-center rounded-full shadow-md transition-all duration-300",
                    selected
                        ? "bg-cobalt-500 text-white"
                        : "bg-white/90 text-slate-700 hover:bg-white",
                    disabled && "cursor-not-allowed opacity-50",
                )}
            >
                {selected ? (
                    <FaCheck className="h-3.5 w-3.5" />
                ) : (
                    <MdCompareArrows className="h-4 w-4" />
                )}
            </button>
            <span className="text-nowrap absolute right-9 top-1 hidden rounded-sm bg-neutral-800/90 p-2 text-center text-xs text-white group-hover/compare:block">
                {selected
                    ? "Remove from comparison"
                    : disabled
                      ? "Compare up to 3 programs"
                      : "Add to comparison"}
            </span>
        </div>
    );
}

/**
 * V4's selector: a labelled "Add to compare" row along the bottom of the card,
 * under the two CTAs, so it reads as one of the card's actions and the save
 * heart keeps its corner.
 */
export function CompareCardFooter({ program }: { program: ComparableProgram }) {
    const { version, isSelected, isFull, toggle } = useCompare();

    if (version !== "v4") return null;

    const selected = isSelected(program.id);
    const disabled = !selected && isFull;

    return (
        <label
            className={clsx(
                "has-[:focus-visible]:ring-cobalt-500 flex shrink-0 items-center gap-2.5 rounded-b-md border-t px-4 py-3 text-sm font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset",
                selected
                    ? "border-cobalt-500/30 bg-cobalt-500/5 text-cobalt-600 hover:bg-cobalt-500/10 cursor-pointer"
                    : disabled
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-500"
                      : "cursor-pointer border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
            )}
        >
            <input
                type="checkbox"
                className="sr-only"
                checked={selected}
                disabled={disabled}
                onChange={() => toggle(program)}
            />
            <span
                className={clsx(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                    selected
                        ? "bg-cobalt-500 border-cobalt-500 text-white"
                        : disabled
                          ? "border-slate-300 bg-slate-100"
                          : "border-gray-400 bg-white",
                )}
            >
                {selected && <FaCheck className="h-3 w-3" />}
            </span>
            {selected
                ? "Added to compare"
                : disabled
                  ? `Compare is full (${MAX_COMPARE} of ${MAX_COMPARE})`
                  : "Add to compare"}
        </label>
    );
}
