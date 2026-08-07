"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../utils";
import { HeaderCTA } from "./HeaderCTA";
import HeaderNav from "./HeaderNav";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    // The live header goes transparent-on-cream only on the homepage; a campaign
    // detail page is never the homepage, so it stays white here.
    const isHomepage = false;

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 8);
        }
        // Initialize from current scroll position (covers SPA navigation +
        // refreshing midway down a page).
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const hasWhiteBg = !isHomepage || scrolled;
    const hasShadow = scrolled;

    return (
        <div
            className={cn(
                "w-full sticky z-50 px-4 xl:px-0 transition-all duration-300 ease-out top-0 py-3",
                hasWhiteBg ? "bg-white shadow-md" : "bg-[#FFFCF5]",
                hasShadow && "shadow-md",
            )}
        >
            <header
                className={cn(
                    "w-full flex max-w-7xl items-center justify-between mx-auto transition-all duration-300 ease-out bg-transparent rounded-none border border-transparent shadow-none py-2 px-0",
                )}
            >
                <Link href="#" className="flex items-center gap-2 group">
                    <Image
                        src="/ayu-logo.png"
                        alt="Ayu Giving"
                        width={140}
                        height={56}
                        priority
                    />
                </Link>
                <HeaderNav />
                <HeaderCTA />
            </header>
        </div>
    );
}
