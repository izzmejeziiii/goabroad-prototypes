"use client";

import { useEffect, useRef, useState } from "react";
import { HiStar } from "react-icons/hi2";
import { DirectoryIcon } from "./icons";

export type SideNavItem = {
    id: string;
    label: string;
    /** Key into the directory icon map; omitted for the notable mentions. */
    icon?: string;
};

/* Which group the reader is in: the last anchor (in document order) whose
   top has passed the sticky offset. Group anchors use scroll-mt-24 (96px),
   so measure just below that. Timer-throttled so it keeps working in
   backgrounded tabs; the first measure is deferred so no state is set
   synchronously inside the effect, and a late re-measure catches the
   browser's own #anchor scroll on load. */
function useActiveSection(ids: string[]) {
    const [active, setActive] = useState<string | null>(null);
    const key = ids.join("|");

    useEffect(() => {
        const list = key.split("|");
        let timer: number | undefined;
        const measure = () => {
            timer = undefined;
            let current: string | null = null;
            for (const id of list) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 120) current = id;
            }
            setActive(current);
        };
        const schedule = () => {
            if (timer === undefined) timer = window.setTimeout(measure, 80);
        };
        schedule();
        const late = window.setTimeout(measure, 500);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.clearTimeout(late);
            if (timer !== undefined) window.clearTimeout(timer);
        };
    }, [key]);

    return active;
}

/* Smooth-scroll to an anchor (instant for readers who prefer reduced
   motion) while keeping anchor semantics: hash in the URL, back-button
   entry. scrollIntoView respects the anchors' scroll-margin. */
function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.pushState(null, "", `#${id}`);
}

function Chevron({ active }: { active: boolean }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 shrink-0 ${
                active ? "text-white" : "text-slate-400"
            }`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    );
}

/* Jump links for the Top Rated Providers section, styled like the Quick
   Links sidebar on /ads-specs (itself modelled on goabroad.com's article
   Table of Contents): a slate card, one chevron row per directory group
   with the in-view group filled cobalt, then the notable mentions. No
   per-provider links beneath the rows — the winners change every year, so
   the nav stays at the category level (Jezi's call). Below lg the same
   items are a horizontal chip row instead. */
export default function ProviderSideNav({ items }: { items: SideNavItem[] }) {
    const active = useActiveSection(items.map((item) => item.id));
    const navRef = useRef<HTMLElement>(null);

    // Keep the highlighted row visible inside the sidebar's own scroll box
    // when the list is taller than the viewport, without touching the
    // page's scroll position.
    useEffect(() => {
        if (!active) return;
        const nav = navRef.current;
        const row = nav?.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
        if (!nav || !row || nav.scrollHeight <= nav.clientHeight) return;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        nav.scrollTo({
            top: row.offsetTop + row.offsetHeight / 2 - nav.clientHeight / 2,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }, [active]);

    return (
        <>
            {/* Desktop sidebar */}
            <nav
                ref={navRef}
                aria-label="Top Rated Provider categories"
                className="hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-4 lg:sticky lg:top-24 lg:block"
            >
                <p className="mb-3 px-2 pt-1 text-sm font-extrabold tracking-wide uppercase text-neutral-900">
                    Quick Links
                </p>
                <ul className="space-y-1">
                    {items.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    data-anchor={item.id}
                                    aria-current={isActive ? "true" : undefined}
                                    onClick={(e) => smoothScrollTo(e, item.id)}
                                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                        isActive
                                            ? "bg-cobalt-500 font-bold text-white"
                                            : "font-semibold text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <Chevron active={isActive} />
                                    <span className="truncate">
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Phones and tablets: the same groups as a swipeable chip row. */}
            <nav
                aria-label="Top Rated Provider categories"
                className="lg:hidden"
            >
                <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                    {items.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <li key={item.id} className="shrink-0">
                                <a
                                    href={`#${item.id}`}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                                        isActive
                                            ? "border-cobalt-500 bg-cobalt-500 text-white"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-cobalt-500 hover:text-cobalt-600"
                                    }`}
                                >
                                    {item.icon ? (
                                        <DirectoryIcon
                                            name={item.icon}
                                            className={`h-4 w-4 ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-cobalt-500"
                                            }`}
                                        />
                                    ) : (
                                        <HiStar
                                            aria-hidden
                                            className="h-4 w-4 text-sun-500"
                                        />
                                    )}
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
