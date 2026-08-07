"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

interface FooterColumn {
    heading: string;
    links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
    {
        heading: "Fundraise",
        links: [
            { label: "Categories", href: "/campaigns" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Sign up as a Non-Profit", href: "/signup" },
        ],
    },
    {
        heading: "Discover",
        links: [
            { label: "Campaigns", href: "/campaigns" },
            { label: "Partners", href: "/partners" },
            { label: "About Us", href: "/about" },
        ],
    },
    {
        heading: "Legal",
        links: [
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "FAQ", href: "/faq" },
        ],
    },
    {
        heading: "Contact",
        links: [
            {
                label: "support@ayugiving.org",
                href: "mailto:support@ayugiving.org",
                external: true,
            },
            {
                label: "partners@ayugiving.org",
                href: "mailto:partners@ayugiving.org",
                external: true,
            },
        ],
    },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
    if (link.external) {
        return (
            <a href={link.href} className="hover:underline transition-colors">
                {link.label}
            </a>
        );
    }
    // Internal destinations don't exist in the prototype, so they're inert.
    return (
        <Link href="#" className="hover:underline transition-colors">
            {link.label}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-[#FFFCF5] py-14 md:py-16 text-[#0F1C1C] flex flex-col items-center px-4 xl:px-0">
            <div className="w-full max-w-7xl flex flex-col lg:grid lg:grid-cols-6 gap-10 lg:gap-8">
                {/* Brand block */}
                <div className="col-span-2 flex flex-col gap-4">
                    <Image
                        src="/ayu-logo.png"
                        alt="Ayu Giving"
                        width={170}
                        height={50}
                    />
                    <p className="max-w-sm leading-relaxed">
                        Empowering communities to create change through
                        transparent, secure, and compassionate fundraising.
                    </p>
                </div>

                {/* Desktop columns */}
                {COLUMNS.map((col) => (
                    <div key={col.heading} className="hidden lg:block">
                        <h2 className="text-base font-bold mb-4">
                            {col.heading}
                        </h2>
                        <ul className="space-y-3">
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <FooterLinkItem link={link} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Mobile accordions */}
                <div className="lg:hidden w-full space-y-2">
                    {COLUMNS.map((col) => (
                        <Disclosure key={col.heading} as="div" className="py-1">
                            <DisclosureButton className="group flex w-full items-center justify-between">
                                <h2 className="text-base font-bold">
                                    {col.heading}
                                </h2>
                                <IoChevronDownOutline className="size-5 group-data-open:rotate-180 transition-transform" />
                            </DisclosureButton>
                            <DisclosurePanel className="mt-3">
                                <ul className="space-y-3 pb-2">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <FooterLinkItem link={link} />
                                        </li>
                                    ))}
                                </ul>
                            </DisclosurePanel>
                        </Disclosure>
                    ))}
                </div>
            </div>

            {/* Copyright row */}
            <div className="mt-12 md:mt-14 w-full max-w-7xl pt-6 border-t border-neutral-300 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Ayu Giving. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
