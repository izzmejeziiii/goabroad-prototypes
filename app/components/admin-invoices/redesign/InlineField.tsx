"use client";

import clsx from "clsx";
import { Pencil } from "lucide-react";
import { useState, type ReactNode } from "react";

/* A value that reads as text and turns into its field when clicked, then
   back to text when you leave it. For things that are right by default and
   rarely changed (dates, type of sale), so they don't add to the wall of
   inputs but are one click away. */

const InlineField = ({
    label,
    value,
    disabled,
    children,
}: {
    label: string;
    /** What shows when not editing. */
    value: ReactNode;
    disabled?: boolean;
    /** The field, given a function to close it. */
    children: (close: () => void) => ReactNode;
}) => {
    const [editing, setEditing] = useState(false);
    return (
        <div className="grid min-h-10 grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-3">
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd>
                {editing ? (
                    <div
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) setEditing(false);
                        }}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === "Escape") && setEditing(false)}
                    >
                        {children(() => setEditing(false))}
                    </div>
                ) : (
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => setEditing(true)}
                        className={clsx(
                            "group -mx-2 inline-flex max-w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-slate-900 transition-colors",
                            "hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 disabled:cursor-default disabled:hover:bg-transparent",
                        )}
                    >
                        <span className="truncate">{value}</span>
                        {!disabled && (
                            // Always shown, so it's clear the value can change
                            <Pencil className="size-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-cobalt-500 group-focus-visible:text-cobalt-500" />
                        )}
                    </button>
                )}
            </dd>
        </div>
    );
};

export default InlineField;

/** A value that can't be edited here (e.g. the invoice number), lined up
    with the editable ones. */
export const StaticField = ({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) => (
    <div className="grid min-h-10 grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-3">
        <dt className="text-sm text-slate-500">{label}</dt>
        <dd className="flex items-baseline gap-2 whitespace-nowrap py-1.5 text-sm font-medium text-slate-900">
            {value}
            {hint && <span className="text-xs font-normal text-slate-500">{hint}</span>}
        </dd>
    </div>
);
