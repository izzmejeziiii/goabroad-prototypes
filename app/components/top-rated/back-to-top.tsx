"use client";

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

/* A floating "back to top" button that appears once the reader is a
   screen or so down the page — the lists run long, above all on phones
   (reviewer's request). Timer-throttled so it keeps working in
   backgrounded tabs, and the first measure is deferred so no state is set
   synchronously inside the effect. */
export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: number | undefined;
        const measure = () => {
            timer = undefined;
            setVisible(window.scrollY > 720);
        };
        const schedule = () => {
            if (timer === undefined) timer = window.setTimeout(measure, 100);
        };
        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        return () => {
            window.removeEventListener("scroll", schedule);
            if (timer !== undefined) window.clearTimeout(timer);
        };
    }, []);

    const toTop = () => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    };

    return (
        <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            inert={!visible}
            className={`fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-cobalt-500 text-white shadow-lg shadow-cobalt-700/30 ring-2 ring-white transition-all duration-200 hover:bg-cobalt-600 focus:outline-none focus-visible:ring-sun-500 sm:right-6 sm:bottom-6 ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
            }`}
        >
            <HiArrowUp aria-hidden className="h-5 w-5" />
        </button>
    );
}
