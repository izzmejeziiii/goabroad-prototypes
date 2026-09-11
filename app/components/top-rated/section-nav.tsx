"use client";

import { useEffect, useRef, useState } from "react";

export type NavItem = {
    id: string;
    label: string;
};

/* Which section the reader is in: the last anchor (in document order) whose
   top has passed the sticky strip. Anchors use scroll-mt-24 (96px), so measure
   just below that. Timer-throttled rather than rAF-throttled so the spy keeps
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
        // without firing a scroll event — re-measure to catch it.
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

/* Section strip, styled after the tab rail under the /mygoabroad hero (the
   same strip /editorial-guidelines uses). Here it is fixed to the top of the
   viewport and stays tucked away until the reader has scrolled to the first
   section — the scroll-spy's `active` is null above it — then slides in and
   follows them down the page. Scrolls horizontally on narrow screens instead
   of wrapping. */
export default function SectionNav({
    items,
    label,
}: {
    items: NavItem[];
    label: string;
}) {
    const active = useActiveSection(items.map((item) => item.id));
    const visible = active !== null;
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
        <div
            className={`fixed inset-x-0 top-0 z-20 w-full border-b border-slate-200 bg-white/95 backdrop-blur transition-transform duration-300 motion-reduce:transition-none ${
                visible ? "translate-y-0 shadow-sm" : "-translate-y-full"
            }`}
            aria-hidden={!visible}
            inert={!visible}
        >
            <div className="mx-auto max-w-7xl px-4 xl:px-0">
                <nav
                    ref={navRef}
                    aria-label={label}
                    className="scrollbar-hide flex gap-6 overflow-x-auto sm:gap-8"
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
                                className={`shrink-0 border-b-2 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                                    isActive
                                        ? "border-cobalt-500 text-cobalt-600"
                                        : "border-transparent text-slate-500 hover:text-neutral-800"
                                }`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
