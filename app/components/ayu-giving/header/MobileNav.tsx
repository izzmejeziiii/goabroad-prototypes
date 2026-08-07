"use client";

import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../utils";
import { PROTOTYPE_PATHNAME } from "../data";

// Logged-out shell only. The live component also renders the session avatar,
// the role-aware dashboard sections and the logout dialog; all of those hang
// off next-auth, which this prototype doesn't run.
interface MobileNavProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
}

const PUBLIC_LINKS = [
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
    {
        href: "/about",
        label: "About",
        match: (p: string) => p === "/about",
    },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#1f5a2c]">
            {children}
        </p>
    );
}

const MobileNav = forwardRef<HTMLDivElement, MobileNavProps>(function MobileNav(
    { id, isOpen, onClose },
    ref,
) {
    const pathname = PROTOTYPE_PATHNAME;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const panelClasses = `lg:hidden fixed top-0 left-0 h-full w-full z-50 bg-white shadow-xl shadow-black/10 flex flex-col transition-transform duration-300 ease-out ${
        isOpen
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none"
    }`;

    const backdropClasses = `lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-out ${
        isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
    }`;

    if (!mounted) return null;

    return createPortal(
        <>
            <div
                className={backdropClasses}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                id={id}
                ref={ref}
                className={panelClasses}
                role="navigation"
                aria-label="Mobile navigation"
                aria-hidden={!isOpen}
            >
                <div className="flex items-center justify-between px-6 py-4">
                    <Link
                        href="#"
                        className="flex items-center gap-2"
                        onClick={onClose}
                    >
                        <Image
                            src="/ayu-logo.png"
                            alt="Ayu Giving"
                            width={130}
                            height={56}
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-[#1a1f1c] min-h-11 min-w-11 flex items-center justify-center hover:opacity-70 transition-opacity"
                        aria-label="Close menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 px-6 pb-6 flex flex-col gap-6 overflow-y-auto">
                    <section className="flex flex-col gap-2">
                        <SectionHeading>Main Links</SectionHeading>
                        <ul className="flex flex-col">
                            {PUBLIC_LINKS.map((link) => {
                                const active = link.match(pathname);
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href="#"
                                            onClick={onClose}
                                            className={cn(
                                                "block py-2 font-medium transition-colors",
                                                active
                                                    ? "text-[#1f5a2c] font-bold"
                                                    : "text-neutral-600 hover:text-[#1f5a2c]",
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className="flex flex-col gap-3 pt-6 border-t border-[#e8ecea]">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center rounded-md border border-[#e8ecea] bg-white px-6 py-3 text-sm font-semibold text-[#1A3628] hover:border-[#1f5a2c] hover:text-[#1f5a2c] transition-colors min-h-11"
                            onClick={onClose}
                        >
                            Log In
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center rounded-md bg-[#1f5a2c] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1f5a2c] transition-colors text-center min-h-11"
                            onClick={onClose}
                        >
                            Start Fundraising
                        </Link>
                    </section>
                </nav>
            </div>
        </>,
        document.body,
    );
});

export default MobileNav;
