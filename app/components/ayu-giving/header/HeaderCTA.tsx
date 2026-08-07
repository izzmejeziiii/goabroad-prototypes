"use client";

import { useState } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";

// Logged-out state only. The live component branches on the next-auth session
// to render a Donate pill, an avatar dropdown of role-aware dashboard links and
// a logout dialog; none of that has a backend here.
function HamburgerIcon({ open }: { open: boolean }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div
                className={`block h-0.5 w-6 bg-current transition-transform duration-300 ease-out ${
                    open ? "translate-y-2 rotate-45" : ""
                }`}
            />
            <div
                className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ease-out ${
                    open ? "opacity-0" : "opacity-100"
                }`}
            />
            <div
                className={`block h-0.5 w-6 bg-current transition-transform duration-300 ease-out ${
                    open ? "-translate-y-2 -rotate-45" : ""
                }`}
            />
        </div>
    );
}

export function HeaderCTA() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <nav className="hidden lg:flex items-center gap-3 shrink-0">
                <Link
                    href="#"
                    className="rounded-md border border-[#1a1f1c] px-4.5 py-2.5 text-[#1a1f1c] hover:text-[#1f5a2c] font-medium text-sm"
                >
                    Log In
                </Link>
                <Link
                    href="#"
                    className="rounded-md bg-[#1f5a2c] px-4.5 py-2.5 text-sm font-semibold text-white hover:bg-[#1f5a2c] transition-colors"
                >
                    Start Fundraising
                </Link>
            </nav>
            <button
                data-mobile-toggle
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="lg:hidden text-[#1a1f1c] flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu-logged-out"
            >
                <HamburgerIcon open={mobileMenuOpen} />
            </button>
            <MobileNav
                id="mobile-menu-logged-out"
                isOpen={mobileMenuOpen}
                onClose={closeMobileMenu}
            />
        </>
    );
}
