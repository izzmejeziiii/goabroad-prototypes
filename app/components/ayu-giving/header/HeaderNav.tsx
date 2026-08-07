"use client";

import Link from "next/link";
import { cn } from "../utils";
import { PROTOTYPE_PATHNAME } from "../data";

interface HeaderNavProps {
    isMobileMenuOpen?: boolean;
}

const LINKS = [
    {
        href: "/campaigns",
        label: "Discover",
        match: (p: string) => p.startsWith("/campaigns"),
    },
    {
        href: "/partners",
        label: "Partners",
        match: (p: string) => p.startsWith("/partners"),
    },
    {
        href: "/how-it-works",
        label: "How It Works",
        match: (p: string) => p === "/how-it-works",
    },
    { href: "/about", label: "About", match: (p: string) => p === "/about" },
];

export default function HeaderNav({ isMobileMenuOpen }: HeaderNavProps) {
    // The live component reads usePathname(); here the destinations don't exist,
    // so the links are inert and the active state comes from PROTOTYPE_PATHNAME.
    const pathname = PROTOTYPE_PATHNAME;

    return (
        <nav
            className={cn(
                "flex gap-6 items-center",
                isMobileMenuOpen
                    ? "flex-col"
                    : "hidden lg:flex lg:flex-row w-fit",
            )}
        >
            {LINKS.map((link) => {
                const active = link.match(pathname);
                return (
                    <Link
                        key={link.href}
                        href="#"
                        className={cn(
                            "font-medium transition-colors",
                            active
                                ? "text-[#1f5a2c] font-bold"
                                : "hover:text-[#1f5a2c] text-neutral-600",
                        )}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}
