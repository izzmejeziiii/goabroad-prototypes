"use client";

import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { useCompare, type ComparableProgram } from "./compare-context";

/**
 * The per-card selector.
 *
 * V1 puts a checkbox where the save heart normally sits, but only once the
 * visitor has pressed "Compare Programs". V2 keeps a compare chip beside the
 * heart at all times, so a program can be added without entering a mode first.
 */
export default function CompareControl({ program }: { program: ComparableProgram }) {
    const { version, compareMode, isSelected, isFull, toggle } = useCompare();
    const selected = isSelected(program.id);
    const disabled = !selected && isFull;

    if (version === "v1") {
        if (!compareMode) return null;
        return (
            <label
                className={clsx(
                    // Takes the save button's corner — the heart steps aside
                    // while compare mode is on.
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
