"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import {
    areaById,
    areas,
    lastUpdated,
    pageCount,
    previewSrc,
    prototypes,
    search,
    type AreaId,
    type Prototype,
    type SearchHit,
} from "./data";
import { Sheet } from "./sheet";
import { LivePreview } from "./live-preview";
import { Footer, GA_LOGO, NoResults, SearchBox, useSlashToSearch } from "./shared";

function PeekCard({ hit, onOpen }: { hit: SearchHit; onOpen: () => void }) {
    const p = hit.prototype;
    const pages = pageCount(p);
    return (
        <li className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition-colors hover:border-slate-300">
            <div className="px-6 pt-7 sm:px-8 sm:pt-8">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: areaById[p.area].color }} />
                    {areaById[p.area].label}
                    {lastUpdated(p) && (
                        <>
                            <span aria-hidden>·</span>
                            {lastUpdated(p)}
                        </>
                    )}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                    <Link
                        href={p.href}
                        className="rounded-sm hover:text-cobalt-600 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:outline-none"
                    >
                        {p.title}
                    </Link>
                </h2>
                <p className="mt-1 text-sm text-slate-500">{p.badge}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-pretty text-slate-600">{p.description}</p>
                {hit.pages.length > 0 && (
                    <p className="mt-2 text-xs font-medium text-cobalt-600">
                        Matching pages: {hit.pages.map((pg) => pg.label).join(", ")}
                    </p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                        href={p.href}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        Open prototype
                        <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                    <button
                        type="button"
                        onClick={onOpen}
                        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:outline-none"
                    >
                        {pages ? `Preview · ${pages} pages` : "Preview"}
                    </button>
                </div>
            </div>
            {/* The page, live, peeking up from the card's bottom edge */}
            <button
                type="button"
                onClick={onOpen}
                tabIndex={-1}
                aria-hidden
                className="relative mt-8 block h-64 flex-none px-6 sm:h-72 sm:px-8"
            >
                <span className="absolute inset-x-6 top-0 -bottom-px overflow-hidden rounded-t-xl bg-white shadow-[0_-4px_20px_-8px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 transition-transform duration-300 group-hover:-translate-y-2 sm:inset-x-8">
                    <LivePreview src={previewSrc(p)} title={p.title} fill className="h-full" />
                </span>
            </button>
        </li>
    );
}

export function PeekLayout() {
    const [query, setQuery] = useState("");
    const [area, setArea] = useState<AreaId | "all">("all");
    const [open, setOpen] = useState<Prototype | null>(null);
    const input = useRef<HTMLInputElement>(null);
    useSlashToSearch(input);

    const hits = useMemo(() => search(query, area), [query, area]);

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-5">
                    <Link
                        href="/"
                        className="inline-block rounded-sm focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:outline-none"
                    >
                        <Image src={GA_LOGO} alt="GoAbroad" width={52} height={40} priority />
                    </Link>
                </div>

                <header className="grid gap-8 pt-10 pb-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl">
                            GoAbroad <span className="text-cobalt-600">Design Library</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-pretty text-slate-600">
                            Visual prototypes and design explorations for GoAbroad. Pick a section below to view and
                            compare versions.
                        </p>
                    </div>
                    <SearchBox inputRef={input} value={query} onChange={setQuery} />
                </header>

                <div role="group" aria-label="Filter by area" className="flex flex-wrap gap-2">
                    {[{ id: "all" as const, label: "All" }, ...areas].map((a) => {
                        const on = area === a.id;
                        return (
                            <button
                                key={a.id}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setArea(a.id)}
                                className={cn(
                                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                                    on ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900",
                                )}
                            >
                                {a.label}
                            </button>
                        );
                    })}
                </div>

                <main className="pt-8 pb-24">
                    <p className="sr-only" aria-live="polite">
                        {hits.length} of {prototypes.length} prototypes
                    </p>
                    {hits.length ? (
                        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {hits.map((hit) => (
                                <PeekCard key={hit.prototype.id} hit={hit} onOpen={() => setOpen(hit.prototype)} />
                            ))}
                        </ul>
                    ) : (
                        <NoResults
                            query={query}
                            onClear={() => {
                                setQuery("");
                                setArea("all");
                            }}
                        />
                    )}
                </main>
            </div>

            <Footer />
            <Sheet p={open} onClose={() => setOpen(null)} />
        </div>
    );
}
