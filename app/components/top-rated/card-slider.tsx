"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

/* A row of cards as a slider, the way goabroad.com runs its "Featured
   Program Providers" and article rows: the section's own heading on the
   left, round previous/next buttons on the right, and the cards in a
   snap-scrolling track — three per view on desktop like those rows, two on
   tablets, one and a bit on phones so the next card peeks in. Native
   scrolling, so swiping works everywhere and the buttons just move the
   track by one card. `header` is the heading block; `aside` sits between it
   and the buttons (the notable-mention badge, say). */
const slideWidths = {
    3: "w-[72%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]",
    4: "w-[72%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]",
};

export default function CardSlider({
    label,
    header,
    aside,
    perView = 3,
    children,
}: {
    /** Names the controls for assistive tech, e.g. "notable mentions". */
    label: string;
    header: ReactNode;
    aside?: ReactNode;
    /** Cards per view on desktop — three like goabroad.com's rows, or four
        for smaller cards such as the category postcards. */
    perView?: 3 | 4;
    children: ReactNode;
}) {
    const track = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const update = () => {
            setCanPrev(el.scrollLeft > 1);
            setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
        };
        const initial = window.setTimeout(update, 0);
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.clearTimeout(initial);
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    const step = (direction: 1 | -1) => {
        const el = track.current;
        const card = el?.firstElementChild as HTMLElement | null;
        if (!el || !card) return;
        const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
        el.scrollBy({
            left: direction * (card.offsetWidth + gap),
            behavior: "smooth",
        });
    };

    const buttonClass =
        "flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-cobalt-500 hover:text-cobalt-600 disabled:cursor-default disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2";

    return (
        <div>
            <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">{header}</div>
                <div className="flex shrink-0 items-center gap-5">
                    {aside}
                    <div className="hidden gap-2 sm:flex">
                        <button
                            type="button"
                            aria-label={`Previous ${label}`}
                            disabled={!canPrev}
                            onClick={() => step(-1)}
                            className={buttonClass}
                        >
                            <HiChevronLeft aria-hidden className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label={`Next ${label}`}
                            disabled={!canNext}
                            onClick={() => step(1)}
                            className={buttonClass}
                        >
                            <HiChevronRight aria-hidden className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={track}
                className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
                {Children.map(children, (child) => (
                    <div className={slideWidths[perView]}>{child}</div>
                ))}
            </div>
        </div>
    );
}
