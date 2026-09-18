"use client";

import { Children, isValidElement, useState, type ReactNode } from "react";
import { HiChevronDown } from "react-icons/hi2";

/* A grid that shows its first few items and a "Show all" button for the
   rest — for lists that grow slowly over the years (the archive of a
   directory's Top Rated lists), where one visible grid beats a carousel:
   the reader looks a year up rather than browsing. No button when there is
   nothing hidden. */
export default function ExpandableGrid({
    initial,
    noun,
    className,
    children,
}: {
    /** How many items show before the button. */
    initial: number;
    /** Plural noun for the button, e.g. "years". */
    noun: string;
    className: string;
    children: ReactNode;
}) {
    const items = Children.toArray(children);
    const [open, setOpen] = useState(false);
    const shown = open ? items : items.slice(0, initial);
    const hidden = items.length - initial;

    return (
        <>
            <ul className={className}>
                {shown.map((child, i) => (
                    <li key={isValidElement(child) && child.key ? child.key : i}>
                        {child}
                    </li>
                ))}
            </ul>
            {hidden > 0 && !open && (
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg border border-cobalt-500 px-5 py-3 text-sm font-semibold text-cobalt-500 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2"
                    >
                        Show all {items.length} {noun}
                        <HiChevronDown aria-hidden className="h-4 w-4" />
                    </button>
                </div>
            )}
        </>
    );
}
