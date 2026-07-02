"use client";

import type { ReactNode } from "react";
import { useVersion } from "./version-context";

export const ChangedBadge = () => (
    <span
        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded text-white shadow-sm"
        style={{ backgroundColor: "#faa929" }}
    >
        Changed
    </span>
);

export const DiffLine = ({
    kind,
    children,
    className = "",
}: {
    kind: "added" | "removed";
    children: ReactNode;
    className?: string;
}) => (
    <div
        className={`flex gap-2 items-start rounded-md px-3 py-2 ${
            kind === "added"
                ? "bg-fern-500/15 border border-fern-300"
                : "bg-roman-500/15 border border-roman-300"
        } ${className}`}
    >
        <span
            className={`font-mono font-bold text-base leading-none mt-0.5 shrink-0 ${
                kind === "added" ? "text-fern-700" : "text-roman-700"
            }`}
        >
            {kind === "added" ? "+" : "−"}
        </span>
        <div
            className={`flex-1 min-w-0 ${
                kind === "removed"
                    ? "text-roman-700 line-through opacity-80"
                    : "text-fern-700"
            }`}
        >
            {children}
        </div>
    </div>
);

export const DiffListItems = ({
    current,
    previous,
}: {
    current: string[];
    previous: string[];
}) => {
    const { omitRemoved } = useVersion();

    if (omitRemoved) {
        // V3: only surface what's currently on the listing. Items added in the
        // recent edit are highlighted green; items already there render neutral.
        return (
            <div className="flex flex-col gap-1.5">
                {current.map((value, i) => {
                    const wasInPrevious = previous.includes(value);
                    if (wasInPrevious) {
                        return (
                            <div
                                key={i}
                                className="flex gap-2 items-start px-3 py-2 text-slate-700"
                            >
                                <span className="font-mono text-base leading-none mt-0.5 shrink-0 text-slate-400">
                                    &nbsp;
                                </span>
                                <span className="flex-1">{value}</span>
                            </div>
                        );
                    }
                    return (
                        <DiffLine key={i} kind="added">
                            {value}
                        </DiffLine>
                    );
                })}
            </div>
        );
    }

    // V2: full GitHub-style diff — removed items (red strikethrough), added
    // items (green +), and unchanged items (neutral).
    const seen = new Set<string>();
    const rows: { kind: "added" | "removed" | "same"; value: string }[] = [];
    previous.forEach((v) => {
        if (current.includes(v)) {
            rows.push({ kind: "same", value: v });
        } else {
            rows.push({ kind: "removed", value: v });
        }
        seen.add(v);
    });
    current.forEach((v) => {
        if (!seen.has(v)) {
            rows.push({ kind: "added", value: v });
        }
    });
    return (
        <div className="flex flex-col gap-1.5">
            {rows.map((r, i) => {
                if (r.kind === "same") {
                    return (
                        <div
                            key={i}
                            className="flex gap-2 items-start px-3 py-2 text-slate-700"
                        >
                            <span className="font-mono text-base leading-none mt-0.5 shrink-0 text-slate-400">
                                &nbsp;
                            </span>
                            <span className="flex-1">{r.value}</span>
                        </div>
                    );
                }
                return (
                    <DiffLine key={i} kind={r.kind}>
                        {r.value}
                    </DiffLine>
                );
            })}
        </div>
    );
};
