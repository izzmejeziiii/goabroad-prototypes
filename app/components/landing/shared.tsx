"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/app/lib/utils";
import type { InnerPage, Prototype } from "./data";

export const GA_LOGO =
    "https://images.goabroad.com/image/upload/h_208,w_272,q_100/v1/images2/goabroad-logo.webp";

/** "/" anywhere on the page focuses the search field. */
export function useSlashToSearch(input: React.RefObject<HTMLInputElement | null>) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
            const el = e.target as HTMLElement | null;
            if (el?.closest("input, textarea, select, [contenteditable='true']")) return;
            e.preventDefault();
            input.current?.focus();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [input]);
}

/**
 * A prototype's inner pages as plain grouped links. With `onPick`, a page
 * loads into the preview beside it instead of navigating away.
 */
export function PageLinks({
    prototype,
    tone = "light",
    activeHref,
    onPick,
    className,
}: {
    prototype: Prototype;
    tone?: "light" | "dark";
    activeHref?: string;
    onPick?: (page: InnerPage) => void;
    className?: string;
}) {
    const dark = tone === "dark";
    const base = cn(
        "group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
        dark ? "focus-visible:ring-sun-500" : "focus-visible:ring-cobalt-500",
    );

    return (
        <div className={cn("flex flex-col gap-5", className)}>
            {prototype.versionsNote && (
                <p className={cn("text-sm", dark ? "text-slate-300" : "text-slate-600")}>{prototype.versionsNote}</p>
            )}
            {prototype.groups.map((group) => (
                <section key={group.label} aria-label={group.label}>
                    <h4 className={cn("mb-1 px-2 text-xs font-semibold", dark ? "text-slate-400" : "text-slate-500")}>
                        {group.label}
                    </h4>
                    <ul className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                        {group.pages.map((page) => {
                            const active = activeHref === page.href;
                            const tint = active
                                ? dark
                                    ? "bg-white/10 font-semibold text-white"
                                    : "bg-slate-100 font-semibold text-slate-900"
                                : dark
                                  ? "text-slate-200 hover:bg-white/5 hover:text-white"
                                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900";
                            const body = (
                                <>
                                    <span className="min-w-0 flex-1 truncate">{page.label}</span>
                                    {page.meta && (
                                        <span className={cn("shrink-0 text-xs tabular-nums", dark ? "text-slate-400" : "text-slate-500")}>
                                            {page.meta}
                                        </span>
                                    )}
                                    {!onPick && (
                                        <ArrowUpRight
                                            aria-hidden
                                            className={cn(
                                                "h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                                                dark ? "text-sun-500" : "text-cobalt-500",
                                            )}
                                        />
                                    )}
                                </>
                            );
                            return (
                                <li key={page.href + page.label}>
                                    {onPick ? (
                                        <button
                                            type="button"
                                            onClick={() => onPick(page)}
                                            aria-current={active ? "page" : undefined}
                                            className={cn(base, tint)}
                                        >
                                            {body}
                                        </button>
                                    ) : (
                                        <Link href={page.href} className={cn(base, tint)}>
                                            {body}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ))}
        </div>
    );
}

export function SearchBox({
    value,
    onChange,
    inputRef,
    variant = "field",
    className,
    placeholder = "Search prototypes or pages",
}: {
    value: string;
    onChange: (v: string) => void;
    inputRef?: React.Ref<HTMLInputElement>;
    /** "pill": soft grey rounded; "field": bordered form field. */
    variant?: "pill" | "field";
    className?: string;
    placeholder?: string;
}) {
    return (
        <label className={cn("relative block", className)}>
            <span className="sr-only">Search prototypes</span>
            <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
            />
            <input
                ref={inputRef}
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Escape") onChange("");
                }}
                placeholder={placeholder}
                autoComplete="off"
                className={cn(
                    "w-full pr-10 pl-10 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none",
                    variant === "pill"
                        ? "h-10 rounded-full border border-transparent bg-slate-100 focus:bg-white"
                        : "h-11 rounded-lg border border-gray-300 bg-white",
                )}
            />
            <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border border-slate-300 bg-white px-1.5 font-sans text-xs text-slate-500">
                /
            </kbd>
        </label>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-slate-200">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
                <p>GoAbroad Prototypes — design explorations only</p>
                <p>
                    Adding a prototype? List it in{" "}
                    <code className="font-mono text-xs text-slate-700">app/components/landing/data.ts</code>
                </p>
            </div>
        </footer>
    );
}

export function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
    return (
        <div className="py-20 text-center">
            <p className="font-semibold text-slate-900">No prototypes match &ldquo;{query}&rdquo;</p>
            <p className="mt-1 text-sm text-slate-600">Try a prototype name, a page like &ldquo;login&rdquo;, or a route.</p>
            <button
                type="button"
                onClick={onClear}
                className="mt-5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:outline-none"
            >
                Clear search
            </button>
        </div>
    );
}
