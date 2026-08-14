"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { HiChevronDown, HiMenu } from "react-icons/hi";

const GA_URL = "https://www.goabroad.com";
const JA_URL = "https://www.jobsabroad.com";
const MYG_URL = "https://my.goabroad.com";
const ADMIN_URL = "https://admin.goabroad.com";
const INSURANCE_URL = "https://www.goabroad.com/mygoabroad/insurance";

const GA_LOGO =
    "https://images.goabroad.com/image/upload/h_208,w_272,q_100/v1/images2/goabroad-logo.webp";

const directories = [
    { label: "Study Abroad", href: `${GA_URL}/study-abroad` },
    { label: "Volunteer Abroad", href: `${GA_URL}/volunteer-abroad` },
    { label: "Intern Abroad", href: `${GA_URL}/intern-abroad` },
    { label: "Teach Abroad", href: `${GA_URL}/teach-abroad` },
    { label: "TEFL Courses", href: `${GA_URL}/tefl-courses` },
    { label: "High School Abroad", href: `${GA_URL}/high-school-abroad` },
    { label: "Language Schools", href: `${GA_URL}/language-schools` },
    { label: "Adventure Travel", href: `${GA_URL}/adventure-travel` },
    { label: "Degrees Abroad", href: `${GA_URL}/degrees-abroad` },
    { label: "Gap Year", href: `${GA_URL}/gap-year` },
    { label: "Jobs Abroad", href: JA_URL },
];

const travelResources = [
    { label: "Travel Insurance", href: INSURANCE_URL },
    {
        label: "Accommodation",
        href: `${GA_URL}/travel-resources/accommodations-abroad`,
    },
    {
        label: "Flights & Transportation",
        href: `${GA_URL}/travel-resources/flights-transportation`,
    },
    {
        label: "eSIM & Mobile Data",
        href: `${GA_URL}/travel-resources/mobile-data-abroad`,
    },
    {
        label: "Passports & Visas",
        href: `${GA_URL}/travel-resources/passports-visas`,
    },
    {
        label: "Finances & Credit Cards",
        href: `${GA_URL}/travel-resources/finances-abroad`,
    },
    { label: "Scholarships", href: `${GA_URL}/scholarships-abroad` },
    { label: "Travel Articles", href: `${GA_URL}/articles` },
    { label: "MyGoAbroad", href: MYG_URL },
];

type MenuItem = { label: string; href: string };

function HeaderDropdownMenu({
    button,
    items,
}: {
    button: React.ReactNode;
    items: MenuItem[];
}) {
    return (
        <Popover as="div" className="relative">
            {({ open, close }) => (
                <>
                    <PopoverButton
                        className={clsx(
                            "inline-flex items-center rounded-md text-base font-semibold text-neutral-700 hover:text-neutral-900",
                            {
                                "focus:outline-none focus:ring-0": !open,
                                "focus:ring-primary-200 focus:ring-2 focus:ring-offset-4":
                                    open,
                            },
                        )}
                    >
                        {button}
                    </PopoverButton>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <PopoverPanel
                            className="z-5 absolute mt-2 flex w-screen max-w-[240px] translate-y-0 flex-col gap-1 rounded-lg bg-white py-2 text-[14px] opacity-100 shadow-2xl ring-1 ring-black/5 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
                            modal={false}
                        >
                            {items.map((item, index) => (
                                <Link
                                    key={`menu-${index}`}
                                    href={item.href}
                                    onClick={() => close()}
                                    className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                >
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            ))}
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}

function SignInDropdown() {
    return (
        <Popover as="div" className="relative">
            {({ open }) => (
                <>
                    <PopoverButton
                        className={clsx(
                            "flex cursor-pointer items-center gap-1 rounded-[3px] border border-solid py-[10px] pl-[15px] pr-[8px] text-sm font-bold leading-4",
                            "border-neutral-700 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900",
                            {
                                "focus:outline-none focus:ring-0": !open,
                                "focus:ring-primary-200 focus:ring-4": open,
                            },
                        )}
                    >
                        Sign In <HiChevronDown size={"20px"} />
                    </PopoverButton>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <PopoverPanel
                            className="z-5 absolute mt-2 flex w-screen max-w-[180px] translate-y-0 flex-col gap-1 rounded-lg bg-white py-2 text-[14px] opacity-100 shadow-2xl ring-1 ring-black/5 lg:left-full lg:ml-0 lg:-translate-x-full"
                            modal={false}
                        >
                            <Link
                                className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                href={`${MYG_URL}/signin`}
                            >
                                Traveler Login
                            </Link>
                            <Link
                                className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                href={ADMIN_URL}
                                target="_blank"
                            >
                                Partner Login
                            </Link>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}

function SiteWideNav() {
    return (
        <div className="relative z-50 h-fit w-full bg-white shadow-md">
            <div className="mx-auto hidden w-full max-w-7xl items-center justify-center px-4 py-4 lg:flex lg:px-0">
                <Link
                    href="/"
                    title="GoAbroad.com"
                    className="mr-[15px] flex h-[50px] w-[85px]"
                >
                    <Image
                        alt="GoAbroad"
                        src={GA_LOGO}
                        width={64}
                        height={49}
                        className="self-center"
                    />
                </Link>
                <nav className="flex w-full items-center justify-end gap-8">
                    <div className="hidden lg:block">
                        <HeaderDropdownMenu
                            button={
                                <p
                                    className="flex items-center text-sm font-bold"
                                    aria-label="Choose Experience"
                                >
                                    Program Types <HiChevronDown size={"20px"} />
                                </p>
                            }
                            items={directories}
                        />
                    </div>
                    <div className="hidden lg:block">
                        <HeaderDropdownMenu
                            button={
                                <p
                                    className="flex items-center text-sm font-bold"
                                    aria-label="Online Programs"
                                >
                                    Travel Resources <HiChevronDown size={"20px"} />
                                </p>
                            }
                            items={travelResources}
                        />
                    </div>
                    <Link
                        className="focus:ring-primary-200 rounded-md text-sm font-bold text-neutral-700 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-4"
                        href={`${GA_URL}/how-it-works`}
                    >
                        How it Works
                    </Link>
                    <Link
                        className="focus:ring-primary-200 rounded-md text-sm font-bold text-neutral-700 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-4"
                        href={`${GA_URL}/onlineadvisor`}
                    >
                        Get Program Matches
                    </Link>
                    <SignInDropdown />
                </nav>
            </div>
        </div>
    );
}

function MobileHeader() {
    return (
        <div className="flex h-[80px] w-full items-center justify-between gap-4 bg-white p-4 md:gap-8">
            <Link href="/" title="GoAbroad.com" className="flex h-[46px] w-[60px]">
                <Image src={GA_LOGO} alt="GoAbroad" width={64} height={49} priority />
            </Link>
            <button
                className="shrink-0 rounded-sm outline-0 focus:shadow-none active:outline-none lg:hidden"
                aria-label="hamburger menu"
            >
                <HiMenu className="text-2xl text-gray-900 md:text-3xl" />
            </button>
        </div>
    );
}

/**
 * Site-wide GoAbroad chrome, matching the production header. Routes that ship
 * their own header (the admin portal, the listing editor, AYU) opt out.
 *
 * The directory prototype additionally gets the production sticky header — its
 * section nav pins 80px down and needs the header sitting above it. Other
 * prototypes have their own sticky pieces, so they keep the static header.
 */
export default function Header() {
    const pathname = usePathname();
    const isSticky = !!pathname?.startsWith("/program-comparison");
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        if (!isSticky) return;
        const onScroll = () => {
            const next = window.scrollY >= 500;
            setShowSticky((prev) => (prev === next ? prev : next));
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isSticky]);

    if (
        pathname?.startsWith("/program-listing") ||
        pathname?.startsWith("/admin") ||
        pathname?.startsWith("/ayu-giving")
    )
        return null;

    return (
        // `pt-11` clears the fixed prototype banner on the comparison routes.
        <div className={clsx("h-auto bg-white", isSticky && "pt-11")}>
            {isSticky && (
                <Transition
                    show={showSticky}
                    enter="transition-all ease-in"
                    leave="transition-all ease-out"
                    className={`${
                        showSticky ? "fixed shadow-md" : "static hidden"
                    } left-0 top-11 z-50 w-full`}
                    as={"div"}
                >
                    <div className="flex h-[80px] w-full items-center justify-between bg-white shadow-md lg:hidden">
                        <MobileHeader />
                    </div>
                    <SiteWideNav />
                </Transition>
            )}
            <SiteWideNav />
            <div className="flex h-[80px] w-full items-center justify-between bg-white shadow-md lg:hidden">
                <MobileHeader />
            </div>
        </div>
    );
}
