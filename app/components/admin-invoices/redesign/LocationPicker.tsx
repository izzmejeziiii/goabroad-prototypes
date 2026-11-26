"use client";

import clsx from "clsx";
import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { inputClass, textLink } from "./ui";

/* Pick several locations at once: a field that opens a searchable list of
   checkboxes. Locations already added for the chosen type and timing are
   marked "Added" (they can still be picked, as in the real editor). */

const LocationPicker = ({
    options,
    value,
    onChange,
    taken,
    disabled,
}: {
    options: string[];
    value: string[];
    onChange: (v: string[]) => void;
    /** Already on the item with this type and timing. */
    taken: Set<string>;
    disabled?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const search = useRef<HTMLInputElement>(null);
    const list = options.filter((o) => o.toLowerCase().includes(q.trim().toLowerCase()));

    useEffect(() => {
        if (!open) return;
        search.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const toggle = (name: string) => onChange(value.includes(name) ? value.filter((v) => v !== name) : [...value, name]);
    const summary =
        value.length === 0
            ? "Any location"
            : value.length <= 2
              ? value.join(", ")
              : `${value.slice(0, 2).join(", ")} +${value.length - 2} more`;

    return (
        <div className="relative">
            <button
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className={clsx(inputClass, "flex items-center justify-between gap-2 pr-2.5 text-left", value.length === 0 && "!text-slate-400")}
            >
                <span className="truncate">{summary}</span>
                <span className="flex shrink-0 items-center gap-1.5">
                    {value.length > 0 && (
                        <span className="rounded-full bg-cobalt-500 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">{value.length}</span>
                    )}
                    <ChevronDown className="size-4 text-slate-400" />
                </span>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-30" aria-hidden onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full z-40 mt-1.5 w-full min-w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                        <div className="relative border-b border-slate-200 p-2">
                            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                            <input
                                ref={search}
                                aria-label="Search locations"
                                className={clsx(inputClass, "pl-8")}
                                placeholder="Search locations"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                        <ul role="listbox" aria-multiselectable="true" className="max-h-64 overflow-y-auto py-1">
                            {list.map((name) => {
                                const added = taken.has(name);
                                const checked = value.includes(name);
                                return (
                                    <li key={name}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={checked}
                                            onClick={() => toggle(name)}
                                            className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
                                        >
                                            <span
                                                className={clsx(
                                                    "grid size-4 shrink-0 place-items-center rounded border",
                                                    checked ? "border-cobalt-500 bg-cobalt-500 text-white" : "border-gray-300 bg-white",
                                                )}
                                            >
                                                {checked && <Check className="size-3" strokeWidth={3} />}
                                            </span>
                                            <span className="flex-1">{name}</span>
                                            {added && <span className="text-xs text-slate-500">Added</span>}
                                        </button>
                                    </li>
                                );
                            })}
                            {list.length === 0 && <li className="px-3 py-2 text-sm text-slate-500">No locations match.</li>}
                        </ul>
                        <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2">
                            <button type="button" className={clsx(textLink, "text-xs")} disabled={!value.length} onClick={() => onChange([])}>
                                Clear
                            </button>
                            <button type="button" className={clsx(textLink, "text-xs")} onClick={() => setOpen(false)}>
                                Done{value.length ? ` · ${value.length} selected` : ""}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LocationPicker;
