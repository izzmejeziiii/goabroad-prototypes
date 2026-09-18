"use client";

import { useEffect, useRef, useState } from "react";

export type SideNavItem = {
    id: string;
    label: string;
    /** Key into the directory icon map; kept for callers, unused here. */
    icon?: string;
};

/* Which group the reader is in: the last anchor (in document order) whose
   top has passed the sticky offset — or null before the first group and
   again once the last group has scrolled off the top, so the mobile strip
   knows when to show. Group anchors use scroll-mt-24 (96px), so measure
   just below that. Timer-throttled so it keeps working in backgrounded
   tabs; the first measure is deferred so no state is set synchronously
   inside the effect, and a late re-measure catches the browser's own
   #anchor scroll on load. */
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
            const last = document.getElementById(list[list.length - 1]);
            if (last && last.getBoundingClientRect().bottom <= 120) current = null;
            setActive(current);
        };
        const schedule = () => {
            if (timer === undefined) timer = window.setTimeout(measure, 80);
        };
        schedule();
        const late = window.setTimeout(measure, 500);
        // Capture-phase listener on the document, so a scroll inside any
        // container (not only the window) re-measures too; scrollend where
        // the browser has it; and a slow safety-net tick, so the strip can
        // never be left showing after the groups have gone by.
        const opts = { capture: true, passive: true } as const;
        document.addEventListener("scroll", schedule, opts);
        document.addEventListener("scrollend", schedule, opts);
        window.addEventListener("resize", schedule);
        const tick = window.setInterval(measure, 400);
        return () => {
            document.removeEventListener("scroll", schedule, opts);
            document.removeEventListener("scrollend", schedule, opts);
            window.removeEventListener("resize", schedule);
            window.clearTimeout(late);
            window.clearInterval(tick);
            if (timer !== undefined) window.clearTimeout(timer);
        };
    }, [key]);

    return active;
}

const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Smooth-scroll to an anchor (instant for readers who prefer reduced
   motion) while keeping anchor semantics: hash in the URL, back-button
   entry. scrollIntoView respects the anchors' scroll-margin. */
function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" });
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

/* Jump links for the Top Rated Providers section.

   From lg up: a sticky side rail styled like the Quick Links sidebar on
   /ads-specs (itself modelled on goabroad.com's article Table of Contents):
   a slate card, one chevron row per directory group with the in-view group
   filled cobalt, then the notable mentions. Category level only — the
   winners under each change every year.

   Below lg: a tab strip fixed to the top of the viewport that exists only
   while the reader is inside the provider groups — it slides in when the
   first group reaches the top and away once the last has passed, and takes
   no room in the page otherwise (Jezi's call). Styled like goabroad.com's
   programme-page tabs (Overview · Details · Reviews …): text tabs with a
   cobalt underline on the current group, scrolling sideways and keeping the
   current tab in view (reviewer's request for mobile). */
export default function ProviderSideNav({ items }: { items: SideNavItem[] }) {
    const active = useActiveSection(items.map((item) => item.id));
    const navRef = useRef<HTMLElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    // Keep the highlighted row visible inside the sidebar's own scroll box
    // when the list is taller than the viewport, and the current tab
    // centred in the mobile strip — without touching the page's scroll.
    useEffect(() => {
        if (!active) return;
        const behavior = reduceMotion() ? "auto" : "smooth";
        const nav = navRef.current;
        const row = nav?.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
        if (nav && row && nav.scrollHeight > nav.clientHeight) {
            nav.scrollTo({
                top: row.offsetTop + row.offsetHeight / 2 - nav.clientHeight / 2,
                behavior,
            });
        }
        const strip = tabsRef.current;
        const tab = strip?.querySelector<HTMLElement>(
            `[data-anchor="${active}"]`,
        );
        if (strip && tab) {
            strip.scrollTo({
                left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
                behavior,
            });
        }
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

            {/* Phones and tablets: the fixed tab strip, present only while a
                group is the active one. */}
            <nav
                aria-label="Top Rated Provider categories"
                aria-hidden={active === null}
                inert={active === null}
                className={`fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur transition-all duration-200 lg:hidden ${
                    active === null
                        ? "pointer-events-none -translate-y-full opacity-0"
                        : "translate-y-0 opacity-100"
                }`}
            >
                <div
                    ref={tabsRef}
                    className="flex overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {items.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                data-anchor={item.id}
                                aria-current={isActive ? "true" : undefined}
                                onClick={(e) => smoothScrollTo(e, item.id)}
                                className={`-mb-px shrink-0 border-b-2 px-3.5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                                    isActive
                                        ? "border-cobalt-500 text-cobalt-700"
                                        : "border-transparent text-slate-600 hover:text-cobalt-600"
                                }`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
