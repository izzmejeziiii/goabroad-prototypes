"use client";

import { useEffect, useRef, useState } from "react";
import type { GuidelineSection } from "./data";

/* Which section the reader is in: the last anchor (in document order) whose top
   has passed the sticky strip. Anchors use scroll-mt-24 (96px), so measure just
   below that. Timer-throttled rather than rAF-throttled so the spy keeps
   working in backgrounded tabs, where rAF never fires. */
function useActiveSection(ids: string[]) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        let pending = 0;
        const measure = () => {
            pending = 0;
            let current: string | null = null;
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 120) current = id;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!pending) pending = window.setTimeout(measure, 80);
        };

        measure();
        // The browser's own #anchor scroll on load can land after mount
        // without firing a scroll event — re-measure to catch it, twice so a
        // slow smooth-scroll doesn't leave the strip on the wrong section.
        const lateMeasures = [100, 500, 1200].map((ms) =>
            window.setTimeout(measure, ms),
        );
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            lateMeasures.forEach(clearTimeout);
            if (pending) clearTimeout(pending);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids.join(",")]);

    return active;
}

/* Keep normal anchor semantics — hash in the URL, back-button entry — while
   scrolling smoothly for readers who haven't asked for reduced motion. */
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

/* Sticky section strip, styled after the tab rail under the /mygoabroad hero.
   Scrolls horizontally on narrow screens instead of wrapping. */
export default function SectionNav({
    sections,
}: {
    sections: GuidelineSection[];
}) {
    const active = useActiveSection(sections.map((s) => s.id));
    const navRef = useRef<HTMLElement>(null);

    /* On narrow screens the strip scrolls, so keep the highlighted label in
       view. Scroll the nav's own box rather than using scrollIntoView, which
       would also scroll the page and fight the reader. */
    useEffect(() => {
        const nav = navRef.current;
        const link = active
            ? nav?.querySelector<HTMLElement>(`[data-anchor="${active}"]`)
            : null;
        if (!nav || !link) return;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        nav.scrollTo({
            left: link.offsetLeft + link.offsetWidth / 2 - nav.clientWidth / 2,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }, [active]);

    return (
        <div className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 xl:px-0">
                <nav
                    ref={navRef}
                    aria-label="Editorial guidelines sections"
                    className="scrollbar-hide flex gap-6 overflow-x-auto sm:gap-8"
                >
                    {sections.map((section) => {
                        const isActive = active === section.id;
                        return (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                data-anchor={section.id}
                                aria-current={isActive ? "true" : undefined}
                                onClick={(e) => smoothScrollTo(e, section.id)}
                                className={`shrink-0 border-b-2 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                                    isActive
                                        ? "border-cobalt-500 text-cobalt-600"
                                        : "border-transparent text-slate-500 hover:text-neutral-800"
                                }`}
                            >
                                {section.navLabel}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
