import Link from "next/link";
import { totalAdCount } from "./components/ads-specs/data";

type PrototypeCard = {
    href: string;
    title: string;
    description: string;
    badge: string;
    accent: string;
    /** Rendered next to the badge when the path is worth calling out. */
    url?: string;
};

const cards: PrototypeCard[] = [
    {
        href: "/admin",
        title: "Admin Dashboard",
        description:
            "Full click-through prototype of the redesigned provider portal (access level 1) — login, dashboard, programs, invoices, checkout, reviews, verification, and more. Static flow, GoAbroad brand.",
        badge: "Level 1 · Full flow",
        accent: "primary",
    },
    {
        href: "/advertise",
        title: "Advertise",
        description:
            "Explore five design versions for the Advertise experience. Compare layouts, interactive comparisons, and messaging approaches.",
        badge: "5 versions",
        accent: "primary",
    },
    {
        href: "/advertise-guide",
        title: "Advertise Guide",
        description:
            "Browse two guide variants to help users understand how to advertise effectively. Step-by-step and alternative flows.",
        badge: "2 versions",
        accent: "primary",
    },
    {
        href: "/program-listing",
        title: "Program Listing",
        description:
            "Edit-mode mockup of a provider's program listing page — hero, highlights, quick details, reviews, FAQ, and related programs.",
        badge: "3 version",
        accent: "primary",
    },
    {
        href: "/ads-specs",
        url: "/ads-specs",
        title: "Advertising Specs 2025",
        description: `One-page reference for every GoAbroad ad placement — image sizes, character limits, auto-pulled components, and tips for all ${totalAdCount} ad types, with quick links to jump to each one.`,
        badge: "Specs reference",
        accent: "primary",
    },
    {
        href: "/program-comparison/directory",
        url: "/program-comparison/directory",
        title: "Program Comparison",
        description:
            "The live study abroad directory rebuilt as a prototype — hero search, provider carousels, featured programs, guide, FAQs, reviews, and interviews. The hero's search button leads to the search results page. Base for the program comparison work.",
        badge: "Directory + search results",
        accent: "primary",
    },
    {
        href: "/ayu-giving",
        url: "/ayu-giving",
        title: "AYU Giving — Campaign Detail",
        description:
            "The AYU Giving campaign detail page rebuilt as a static prototype — hero, story, updates, organizer card, related campaigns, and the full donate sidebar. Dummy content, AYU brand.",
        badge: "Campaign page",
        accent: "primary",
    },
    {
        href: "/editorial-guidelines",
        url: "/editorial-guidelines",
        title: "Editorial Guidelines",
        description:
            "The reader-facing editorial guidelines page — our purpose, core editorial values, what we publish and what we don't, how programs get featured, who writes for GoAbroad, and our commitment to readers. Copy taken verbatim from the 2026 article strategy doc.",
        badge: "Trust & transparency",
        accent: "primary",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-b from-primary-50/60 via-white to-slate-50/80">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:py-32">
                <header className="text-center mb-16 sm:mb-20">
                    <p className="text-sm font-semibold uppercase tracking-wider text-cobalt-500 mb-4">
                        Prototypes
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        GoAbroad
                        <span className="block text-cobalt-600">
                            Design Library
                        </span>
                    </h1>
                    <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600">
                        Visual prototypes and design explorations for GoAbroad.
                        Pick a section below to view and compare versions.
                    </p>
                </header>

                <section className="grid gap-6 sm:grid-cols-2">
                    {cards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-cobalt-200 hover:shadow-lg hover:shadow-cobalt-500/10 focus:outline-none focus:ring-2 focus:ring-cobalt-500/40 focus:ring-offset-2"
                        >
                            <span
                                className={`absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-10 transition-opacity group-hover:opacity-40 bg-primary-400`}
                            />
                            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {card.badge}
                                {card.url && (
                                    <span className="font-mono text-cobalt-600">
                                        {card.url}
                                    </span>
                                )}
                            </span>
                            <h2 className="text-xl font-semibold text-slate-900 group-hover:text-cobalt-700 transition-colors">
                                {card.title}
                            </h2>
                            <p className="mt-2 flex-1 text-slate-600 leading-relaxed">
                                {card.description}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cobalt-600 group-hover:gap-3 transition-all">
                                View prototype
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </section>

                <footer className="mt-20 text-center text-sm text-slate-500">
                    GoAbroad Prototypes — design explorations only
                </footer>
            </div>
        </div>
    );
}
