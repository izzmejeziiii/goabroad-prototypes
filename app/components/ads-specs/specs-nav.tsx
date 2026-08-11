"use client";

import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export type NavSection = {
    id: string;
    label: string;
    ads: { id: string; code: string; name: string }[];
};

/* Track which anchor is in view so the sidebar can highlight it: the deepest
   anchor (in document order) whose top has passed the sticky-offset line.
   Anchors use scroll-mt-28 (112px), so measure slightly below that. */
function useActiveAnchor(ids: string[]) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        // Timer-throttled rather than rAF-throttled so the spy keeps
        // working in backgrounded/hidden tabs, where rAF never fires.
        let pending = 0;
        const measure = () => {
            pending = 0;
            let current: string | null = null;
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 140) current = id;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!pending) pending = window.setTimeout(measure, 80);
        };

        measure();
        // The browser's own #anchor scroll on load can happen after mount
        // without firing a scroll event — re-measure once to catch it.
        const lateMeasure = window.setTimeout(measure, 500);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            clearTimeout(lateMeasure);
            if (pending) clearTimeout(pending);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids.join(",")]);

    return active;
}

/* Mobile-only sticky jump menu — place at the top of the page, outside the
   sidebar column, so `sticky` tracks the whole page scroll. */
/* Radix Select locks body scrolling while the menu is open and releases it
   just after closing — a smooth scroll started under the lock goes nowhere.
   Wait for the release before jumping. */
function scrollToAnchorAfterUnlock(id: string, attempt = 0) {
    const locked =
        document.body.hasAttribute("data-scroll-locked") ||
        getComputedStyle(document.body).overflow === "hidden";
    if (locked && attempt < 20) {
        setTimeout(() => scrollToAnchorAfterUnlock(id, attempt + 1), 25);
    } else {
        scrollToAnchor(id);
    }
}

export function MobileJumpNav({ sections }: { sections: NavSection[] }) {
    // Only surface the jump bar once the reader has reached the ad-type
    // sections; before that it just covers the hero and overview.
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const firstAdId = sections.find((s) => s.ads.length > 0)?.id;
        let pending = 0;
        const measure = () => {
            pending = 0;
            const el = firstAdId ? document.getElementById(firstAdId) : null;
            setVisible(!!el && el.getBoundingClientRect().top <= 140);
        };
        const onScroll = () => {
            if (!pending) pending = window.setTimeout(measure, 80);
        };

        measure();
        const lateMeasure = window.setTimeout(measure, 500);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            clearTimeout(lateMeasure);
            if (pending) clearTimeout(pending);
        };
    }, [sections]);

    return (
        <div
            inert={!visible}
            className={`fixed inset-x-0 top-0 z-20 border-b border-cobalt-600/50 bg-cobalt-500/95 px-4 py-3 backdrop-blur transition-all duration-200 lg:hidden ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-full opacity-0"
            }`}
        >
            <p className="mb-1.5 text-[11px] font-semibold tracking-wider text-white/80 uppercase">
                Jump to an ad type
            </p>
            <Select onValueChange={(value) => scrollToAnchorAfterUnlock(value)}>
                <SelectTrigger aria-label="Jump to an ad type">
                    <SelectValue placeholder="Select a section or ad…" />
                </SelectTrigger>
                <SelectContent>
                    {sections.map((section) =>
                        section.ads.length === 0 ? (
                            <SelectItem key={section.id} value={section.id}>
                                {section.label}
                            </SelectItem>
                        ) : (
                            <SelectGroup key={section.id}>
                                <SelectLabel>{section.label}</SelectLabel>
                                {section.ads.map((ad) => (
                                    <SelectItem key={ad.id} value={ad.id}>
                                        {ad.code}: {ad.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ),
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}

/* Smooth-scroll to an anchor (instant for users who prefer reduced motion).
   scrollIntoView respects the anchors' scroll-margin. */
function scrollToAnchor(id: string) {
    const target = document.getElementById(id);
    if (!target) return false;
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    return true;
}

/* Keep normal anchor semantics: hash in the URL, back-button entry. */
function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (!scrollToAnchor(id)) return;
    e.preventDefault();
    history.pushState(null, "", `#${id}`);
}

/* Desktop sidebar with scrollspy highlighting. */
export default function SpecsSidebar({ sections }: { sections: NavSection[] }) {
    const allIds = sections.flatMap((section) => [
        section.id,
        ...section.ads.map((ad) => ad.id),
    ]);
    const active = useActiveAnchor(allIds);
    const navRef = useRef<HTMLElement>(null);

    // Keep the highlighted link vertically centered in the sidebar's own
    // scroll box (clamped at the ends of the list). Scrolling the nav
    // directly — rather than scrollIntoView({block:"center"}) — avoids
    // also re-centering the link in the window and hijacking page scroll.
    useEffect(() => {
        if (!active) return;
        const nav = navRef.current;
        const link = nav?.querySelector<HTMLElement>(`a[href="#${active}"]`);
        if (!nav || !link) return;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        nav.scrollTo({
            top: link.offsetTop + link.offsetHeight / 2 - nav.clientHeight / 2,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }, [active]);

    return (
        <nav
            ref={navRef}
            aria-label="Ad specs sections"
            className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick links
            </p>
            <ul className="space-y-4">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            onClick={(e) => smoothScrollTo(e, section.id)}
                            className={`-ml-4 block border-l-4 pl-3 text-sm font-bold transition-colors ${
                                active === section.id
                                    ? "border-sun-500 text-cobalt-600"
                                    : section.ads.some(
                                            (ad) => ad.id === active,
                                        )
                                      ? "border-transparent text-cobalt-600"
                                      : "border-transparent text-slate-800 hover:text-brand-500"
                            }`}
                        >
                            {section.label}
                        </a>
                        {section.ads.length > 0 && (
                            <ul className="mt-1.5 space-y-0.5 border-l border-slate-200">
                                {section.ads.map((ad) => (
                                    <li key={ad.id}>
                                        <a
                                            href={`#${ad.id}`}
                                            onClick={(e) =>
                                                smoothScrollTo(e, ad.id)
                                            }
                                            className={`-ml-px block border-l-4 py-1 pl-3 text-[13px] leading-snug transition-colors ${
                                                active === ad.id
                                                    ? "border-sun-500 font-bold text-cobalt-600"
                                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                                            }`}
                                        >
                                            <span className="font-semibold">
                                                {ad.code}
                                            </span>{" "}
                                            · {ad.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
