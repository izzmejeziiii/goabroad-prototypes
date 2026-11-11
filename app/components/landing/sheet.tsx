"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { areaById, lastUpdated, pageCount, previewSrc, type Prototype } from "./data";
import { LivePreview } from "./live-preview";
import { PageLinks } from "./shared";

/* ------------------------------------------------------------------ */
/* Detail sheet — bigger, clickable preview and every inner page        */
/* ------------------------------------------------------------------ */

export function Sheet({ p, onClose }: { p: Prototype | null; onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null);
    const [src, setSrc] = useState<string | null>(null);
    const [shownFor, setShownFor] = useState<string | null>(null);

    // Each time a new prototype opens, start on its own preview.
    if ((p?.id ?? null) !== shownFor) {
        setShownFor(p?.id ?? null);
        setSrc(p ? previewSrc(p) : null);
    }

    useEffect(() => {
        const d = ref.current;
        if (!d) return;
        if (p && !d.open) d.showModal();
        if (!p && d.open) d.close();
    }, [p]);

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === ref.current) ref.current?.close();
            }}
            aria-label={p ? p.title : "Prototype"}
            className="mt-0 mr-0 mb-0 ml-auto h-dvh max-h-none w-full max-w-5xl overflow-hidden bg-white p-0 shadow-2xl backdrop:bg-slate-900/40 open:flex sm:rounded-l-2xl"
        >
            {p && src && (
                <div className="flex h-full w-full flex-col">
                    <div className="flex items-start gap-4 border-b border-slate-200 px-5 py-4 sm:px-8">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-semibold text-slate-900">{p.title}</h2>
                            <p className="mt-0.5 text-sm text-slate-500">
                                {areaById[p.area].label} · {p.badge}
                                {lastUpdated(p) && <> · Updated {lastUpdated(p)}</>}
                            </p>
                        </div>
                        <Link
                            href={p.href}
                            className="hidden shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex"
                        >
                            Open prototype
                            <ArrowRight aria-hidden className="h-4 w-4" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => ref.current?.close()}
                            className="-mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:outline-none"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
                        <div className="overflow-hidden rounded-xl bg-slate-100 p-2">
                            <div className="flex items-center justify-between gap-3 px-2 pt-0.5 pb-2">
                                <span className="truncate font-mono text-xs text-slate-600">{src}</span>
                                <Link
                                    href={src}
                                    target="_blank"
                                    className="inline-flex shrink-0 items-center gap-1 rounded-sm text-xs font-semibold text-cobalt-600 hover:text-cobalt-700 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:outline-none"
                                >
                                    New tab
                                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                            <div className="h-[56dvh] min-h-[320px] overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.12)]">
                                <LivePreview
                                    key={src}
                                    src={src}
                                    title={p.title}
                                    interactive
                                    eager
                                    fill
                                    responsive
                                    virtualWidth={1440}
                                    className="h-full"
                                />
                            </div>
                        </div>

                        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                            <div>
                                <p className="text-[15px] leading-relaxed text-slate-700">{p.description}</p>
                                <Link
                                    href={p.href}
                                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:hidden"
                                >
                                    Open prototype
                                    <ArrowRight aria-hidden className="h-4 w-4" />
                                </Link>
                            </div>
                            {(pageCount(p) > 0 || p.versionsNote) && (
                                <div>
                                    <h3 className="mb-2 text-sm font-semibold text-slate-900">
                                        {pageCount(p) ? `Inner pages (${pageCount(p)})` : "Versions"}
                                    </h3>
                                    {pageCount(p) > 0 && (
                                        <p className="mb-3 text-xs text-slate-500">Pick one to load it in the preview above.</p>
                                    )}
                                    <PageLinks
                                        prototype={p}
                                        activeHref={src}
                                        onPick={(pg) => setSrc(pg.href)}
                                        className="-ml-2"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </dialog>
    );
}
