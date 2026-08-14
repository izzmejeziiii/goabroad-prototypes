"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const navLabels: Record<string, string> = {
    search: "Search",
    programs: "Programs",
    guides: "Guide",
    faqs: "FAQs",
    reviews: "Reviews",
    interviews: "Interviews",
};

// Production keeps this fixed display order regardless of the order the page
// declares its active sections in.
const navOrder = ["search", "programs", "guides", "faqs", "reviews", "interviews"];

const scrollToHash = (hash: string) => {
    const element = document.getElementById(hash);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - 180;
    window.scrollTo({ top, behavior: "smooth" });
};

/**
 * Section nav that pins under the header. Production drives the active pill
 * with react-scrollspy-navigation; this walks the same section ids on scroll.
 */
export default function StickySecondaryNav({
    activeSections,
    className,
    /** Cleared by the prototype banner plus the sticky site header. */
    topClass = "top-[124px] lg:top-[126px]",
}: {
    activeSections: string[];
    className?: string;
    topClass?: string;
}) {
    const navList = navOrder
        .filter((hash) => activeSections.includes(hash))
        .map((hash) => ({ hash, label: navLabels[hash] }));
    const [active, setActive] = useState(navList[0]?.hash ?? "search");

    useEffect(() => {
        const onScroll = () => {
            const marker = window.scrollY + 148 + 80;
            let current = navList[0]?.hash ?? "";
            for (const item of navList) {
                const element = document.getElementById(item.hash);
                if (element && element.getBoundingClientRect().top + window.scrollY <= marker) {
                    current = item.hash;
                }
            }
            setActive((prev) => (prev === current ? prev : current));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSections]);

    return (
        <div
            className={clsx(
                "z-outerspace sticky w-full border-b border-gray-200 bg-slate-200 shadow-xl",
                topClass,
                className,
            )}
        >
            <div className="mx-auto max-w-7xl">
                <nav className="flex gap-4 overflow-x-auto px-4 py-4 lg:gap-6">
                    {navList.map((link, index) => (
                        <a
                            key={`link-${index}`}
                            href={`#${link.hash}`}
                            className={clsx(
                                "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-neutral-700 hover:text-white lg:flex",
                                active === link.hash
                                    ? "bg-neutral-700 text-white"
                                    : "text-gray-700",
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToHash(link.hash);
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}
