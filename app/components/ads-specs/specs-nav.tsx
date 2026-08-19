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

function Chevron({ open, active }: { open: boolean; active: boolean }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                open ? "rotate-90" : ""
            } ${active ? "text-white" : "text-slate-400"}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    );
}

/* Desktop sidebar — styled like goabroad.com's article Table of Contents:
   one accordion row per ad section, the in-view section filled cobalt, and
   the section's ad links revealed inside the open row. */
export default function SpecsSidebar({ sections }: { sections: NavSection[] }) {
    const allIds = sections.flatMap((section) => [
        section.id,
        ...section.ads.map((ad) => ad.id),
    ]);
    const active = useActiveAnchor(allIds);
    const navRef = useRef<HTMLElement>(null);

    // The section the reader is currently in (ads map to their section).
    const activeSection =
        sections.find(
            (s) => s.id === active || s.ads.some((ad) => ad.id === active),
        )?.id ?? null;

    // The open accordion follows the scrollspy, but a manual toggle wins
    // until the reader scrolls into a different section.
    const [manual, setManual] = useState<{ id: string | null } | null>(null);
    const prevSection = useRef(activeSection);
    useEffect(() => {
        if (prevSection.current !== activeSection) {
            prevSection.current = activeSection;
            setManual(null);
        }
    }, [activeSection]);
    const open = manual ? manual.id : activeSection;

    // Keep the highlighted row vertically centered in the sidebar's own
    // scroll box (clamped at the ends of the list). Scrolling the nav
    // directly — rather than scrollIntoView({block:"center"}) — avoids
    // also re-centering the row in the window and hijacking page scroll.
    useEffect(() => {
        if (!active) return;
        const nav = navRef.current;
        const row = nav?.querySelector<HTMLElement>(
            `[data-anchor="${active}"]`,
        );
        if (!nav || !row) return;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        nav.scrollTo({
            top: row.offsetTop + row.offsetHeight / 2 - nav.clientHeight / 2,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }, [active]);

    return (
        <nav
            ref={navRef}
            aria-label="Ad specs sections"
            className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-4"
        >
            <p className="mb-3 px-2 pt-1 text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                Quick Links
            </p>
            <ul className="space-y-1">
                {sections.map((section) => {
                    const isOpen = open === section.id;
                    const isActive = activeSection === section.id;
                    return (
                        <li key={section.id}>
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                data-anchor={section.id}
                                onClick={() =>
                                    setManual({
                                        id: isOpen ? null : section.id,
                                    })
                                }
                                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                    isActive
                                        ? "bg-cobalt-500 font-bold text-white"
                                        : "font-semibold text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                <Chevron open={isOpen} active={isActive} />
                                <span className="truncate">
                                    {section.label}
                                </span>
                            </button>
                            {isOpen && section.ads.length > 0 && (
                                <ul className="mt-1 mb-2 space-y-0.5 pl-4">
                                    {section.ads.map((ad) => (
                                        <li key={ad.id}>
                                            <a
                                                href={`#${ad.id}`}
                                                data-anchor={ad.id}
                                                onClick={(e) =>
                                                    smoothScrollTo(e, ad.id)
                                                }
                                                className={`block min-w-0 rounded-lg px-3 py-1.5 text-[13px] leading-snug transition-colors ${
                                                    active === ad.id
                                                        ? "bg-slate-200 font-semibold text-cobalt-700"
                                                        : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                                                }`}
                                            >
                                                <span className="block truncate">
                                                    <span className="font-semibold">
                                                        {ad.code}
                                                    </span>{" "}
                                                    · {ad.name}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
