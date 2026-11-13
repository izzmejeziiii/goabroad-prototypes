import { adSections, totalAdCount } from "../ads-specs/data";
import { directories } from "../top-rated/data";
import { invoices } from "../invoice-tool/data";

/* ------------------------------------------------------------------ */
/* Areas — the four routes the library's prototypes sit on             */
/* ------------------------------------------------------------------ */

export type AreaId = "portal" | "public" | "advertising" | "partners";

export type Area = {
    id: AreaId;
    label: string;
    /** Marker / route colour. Text never sits in this colour on white
        except where the token passes AA (cobalt, fern-700, roman-700). */
    color: string;
    /** A text-safe shade of the same family for labels on white. */
    ink: string;
};

export const areas: Area[] = [
    { id: "portal", label: "Provider portal", color: "#0a5e85", ink: "#084b6a" },
    { id: "public", label: "Public site", color: "#68af74", ink: "#4a7c52" },
    { id: "advertising", label: "Advertising", color: "#faa929", ink: "#b2781d" },
    { id: "partners", label: "Partner sites", color: "#dc625a", ink: "#9c4640" },
];

export const areaById = Object.fromEntries(areas.map((a) => [a.id, a])) as Record<
    AreaId,
    Area
>;

/* ------------------------------------------------------------------ */
/* Prototypes                                                           */
/* ------------------------------------------------------------------ */

export type InnerPage = {
    label: string;
    href: string;
    /** Small secondary line, e.g. an invoice number. */
    meta?: string;
};

export type PageGroup = {
    label: string;
    pages: InnerPage[];
};

export type Prototype = {
    /** Two-digit address; typing it on the landing page jumps there. */
    number: string;
    id: string;
    href: string;
    /** Route the live preview loads; defaults to `href`. */
    preview?: string;
    title: string;
    /** Kept word for word from the original landing page cards. */
    description: string;
    badge: string;
    area: AreaId;
    /** Inner pages worth jumping straight to, grouped. */
    groups: PageGroup[];
    /** For prototypes that switch versions on the page instead of by URL. */
    versionsNote?: string;
};

const adminProvider: InnerPage[] = [
    ["Dashboard", "/admin/dashboard"],
    ["Programs", "/admin/programs"],
    ["New program", "/admin/programs/new"],
    ["Ads", "/admin/ads"],
    ["Inquiries", "/admin/inquiries"],
    ["Contacts", "/admin/contacts"],
    ["Contact manager", "/admin/contact-manager"],
    ["Invoices", "/admin/invoices"],
    ["Reviews", "/admin/reviews"],
    ["Review widget", "/admin/reviews/widget"],
    ["Verification", "/admin/verification"],
    ["MyGoAbroad", "/admin/mygoabroad"],
    ["Profile", "/admin/profile"],
    ["FAQ", "/admin/faq"],
    ["Activity logs", "/admin/activitylogs"],
].map(([label, href]) => ({ label, href }));

const adminStaff: InnerPage[] = [
    ["Staff dashboard", "/admin/staff/dashboard"],
    ["Clients", "/admin/staff/clients"],
    ["Articles", "/admin/staff/articles"],
    ["Guides", "/admin/staff/guides"],
    ["Interviews", "/admin/staff/interviews"],
    ["Collections", "/admin/staff/collections"],
    ["Scholarships", "/admin/staff/scholarships"],
    ["Ranking", "/admin/staff/ranking"],
    ["Rank performance", "/admin/staff/rank-performance"],
    ["Sales summary", "/admin/staff/sales-summary"],
    ["Sales goals", "/admin/staff/sales-goals"],
    ["Sales directory", "/admin/staff/sales-directory"],
    ["Sales by sale type", "/admin/staff/sales-by-sale-type"],
    ["Invoice items summary", "/admin/staff/invoice-items-summary"],
    ["Stats", "/admin/staff/stats"],
    ["Site tools", "/admin/staff/site-tools"],
    ["URL verifiers", "/admin/staff/url-verifiers"],
    ["Online advisor", "/admin/staff/online-advisor"],
    ["Review widget", "/admin/staff/review-widget"],
    ["MyGoAbroad", "/admin/staff/mygoabroad"],
].map(([label, href]) => ({ label, href }));

export const prototypes: Prototype[] = [
    {
        number: "01",
        id: "admin",
        href: "/admin",
        preview: "/admin/dashboard",
        title: "Admin Dashboard",
        description:
            "Full click-through prototype of the redesigned provider portal (access level 1) — login, dashboard, programs, invoices, checkout, reviews, verification, and more. Static flow, GoAbroad brand.",
        badge: "Level 1 · Full flow",
        area: "portal",
        groups: [
            {
                label: "Sign in",
                pages: [
                    { label: "Login", href: "/admin/login" },
                    { label: "Forgot password", href: "/admin/forgot-password" },
                ],
            },
            { label: "Provider portal", pages: adminProvider },
            { label: "Staff side", pages: adminStaff },
        ],
    },
    {
        number: "02",
        id: "advertise",
        href: "/advertise",
        title: "Advertise",
        description:
            "Explore five design versions for the Advertise experience. Compare layouts, interactive comparisons, and messaging approaches.",
        badge: "5 versions",
        area: "advertising",
        groups: [],
        versionsNote: "Switch between Versions 1–5 with the selector on the page.",
    },
    {
        number: "03",
        id: "advertise-guide",
        href: "/advertise-guide",
        title: "Advertise Guide",
        description:
            "Browse two guide variants to help users understand how to advertise effectively. Step-by-step and alternative flows.",
        badge: "2 versions",
        area: "advertising",
        groups: [],
        versionsNote: "Switch versions with the selector on the page.",
    },
    {
        number: "04",
        id: "program-listing",
        href: "/program-listing",
        title: "Program Listing",
        description:
            "Edit-mode mockup of a provider's program listing page — hero, highlights, quick details, reviews, FAQ, and related programs.",
        badge: "3 versions",
        area: "portal",
        groups: [],
        versionsNote: "Switch between design versions V1–V3 with the toggle on the page.",
    },
    {
        number: "05",
        id: "ads-specs",
        href: "/ads-specs",
        title: "Advertising Specs 2025",
        description: `One-page reference for every GoAbroad ad placement — image sizes, character limits, auto-pulled components, and tips for all ${totalAdCount} ad types, with quick links to jump to each one.`,
        badge: "Specs reference",
        area: "advertising",
        groups: adSections.map((section) => ({
            label: section.title,
            pages: section.ads.map((ad) => ({
                label: ad.name,
                href: `/ads-specs#${ad.id}`,
                meta: ad.code,
            })),
        })),
    },
    {
        number: "06",
        id: "program-comparison",
        href: "/program-comparison/directory",
        title: "Program Comparison",
        description:
            "The live study abroad directory rebuilt as a prototype — hero search, provider carousels, featured programs, guide, FAQs, reviews, and interviews. The hero's search button leads to the search results page. Base for the program comparison work.",
        badge: "Directory + search results",
        area: "public",
        groups: [
            {
                label: "Pages",
                pages: [
                    { label: "Study abroad directory", href: "/program-comparison/directory" },
                    { label: "Search results", href: "/program-comparison/search-results" },
                ],
            },
        ],
        versionsNote: "Switch between compare flows V1–V4 with the toggle on the page.",
    },
    {
        number: "07",
        id: "ayu-giving",
        href: "/ayu-giving",
        title: "AYU Giving — Campaign Detail",
        description:
            "The AYU Giving campaign detail page rebuilt as a static prototype — hero, story, updates, organizer card, related campaigns, and the full donate sidebar. Dummy content, AYU brand.",
        badge: "Campaign page",
        area: "partners",
        groups: [],
    },
    {
        number: "08",
        id: "editorial-guidelines",
        href: "/editorial-guidelines",
        title: "Editorial Guidelines",
        description:
            "The reader-facing editorial guidelines page — our purpose, core editorial values, what we publish and what we don't, how programs get featured, who writes for GoAbroad, and our commitment to readers. Copy taken verbatim from the 2026 article strategy doc.",
        badge: "Trust & transparency",
        area: "public",
        groups: [],
    },
    {
        number: "09",
        id: "top-rated",
        href: "/top-rated-providers-programs",
        title: "Top Rated Providers & Programs",
        description:
            "The annual Top Rated Providers and the Top Rated Programs consolidated on one page — header photo, what the awards are, program cards per category linking to eleven directory pages, ranked provider cards with ratings and Read Reviews CTAs, notable mentions, previous years, and next steps. Copy from the requirements doc; the winners are dummy data.",
        badge: "Main page + 11 directory pages",
        area: "public",
        groups: [
            {
                label: "Main page",
                pages: [{ label: "Top Rated main page", href: "/top-rated-providers-programs" }],
            },
            {
                label: "Directory pages",
                pages: directories.map((d) => ({
                    label: d.cardTitle,
                    href: `/top-rated-providers-programs/${d.id}`,
                })),
            },
        ],
    },
    {
        number: "10",
        id: "invoice-tool",
        href: "/invoice-tool",
        title: "Invoice Tool",
        description:
            "A no-login page where clients find a GoAbroad invoice by number and email, then pay it — card with a billing-address fee check, bank transfer, wire, Wise, or PayPal. Covers open, overdue, partly paid, waiting-to-match, over-the-card-limit, and paid invoices. Modelled on the staged GHL payments portal; demo data.",
        badge: "Lookup + payment flow",
        area: "portal",
        groups: [
            {
                label: "Lookup",
                pages: [{ label: "Find an invoice", href: "/invoice-tool" }],
            },
            {
                label: "Demo invoices",
                pages: invoices.map((inv) => ({
                    label: inv.scenario,
                    href: `/invoice-tool/${inv.token}`,
                    meta: inv.number,
                })),
            },
        ],
    },
    {
        number: "11",
        id: "lead-threshold",
        href: "/lead-threshold",
        title: "Lead Threshold",
        description:
            "The client admin dashboard from gacom-admin-redesign PR 784, copied as is, as the base for limiting free accounts to 5 viewable leads a year and the upgrade flow. Demo data for a free (Basic) account.",
        badge: "Client admin copy",
        area: "portal",
        groups: [
            {
                label: "Client admin",
                pages: [
                    { label: "Dashboard", href: "/lead-threshold" },
                    { label: "Leads", href: "/lead-threshold/leads" },
                ],
            },
            {
                label: "Upgrade flow",
                pages: [
                    { label: "V1 · Request", href: "/lead-threshold?upgrade=request" },
                    { label: "V2 · Plan picker", href: "/lead-threshold?upgrade=plans" },
                ],
            },
        ],
        versionsNote:
            "Switch the upgrade flow between V1 (request) and V2 (plan picker) with the toggle at the bottom of the page.",
    },
];

export const pageCount = (p: Prototype) =>
    p.groups.reduce((n, g) => n + g.pages.length, 0);

export const previewSrc = (p: Prototype) => p.preview ?? p.href;

/* ------------------------------------------------------------------ */
/* Search                                                               */
/* ------------------------------------------------------------------ */

const norm = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "");

export type SearchHit = {
    prototype: Prototype;
    /** Inner pages whose label matched the query (empty for no query). */
    pages: InnerPage[];
};

/** Every word in the query has to appear somewhere in the prototype:
    its number, title, badge, description, area, route, or an inner page. */
export function search(query: string, area: AreaId | "all"): SearchHit[] {
    const words = norm(query).split(/\s+/).filter(Boolean);
    return prototypes
        .filter((p) => area === "all" || p.area === area)
        .flatMap((p) => {
            if (!words.length) return [{ prototype: p, pages: [] }];
            const pages = p.groups.flatMap((g) => g.pages);
            const haystack = norm(
                [
                    p.number,
                    p.title,
                    p.badge,
                    p.description,
                    areaById[p.area].label,
                    p.href,
                    ...pages.map((pg) => `${pg.label} ${pg.meta ?? ""}`),
                ].join(" "),
            );
            if (!words.every((w) => haystack.includes(w))) return [];
            const pageHits = pages.filter((pg) => {
                const h = norm(`${pg.label} ${pg.meta ?? ""}`);
                return words.some((w) => h.includes(w));
            });
            return [{ prototype: p, pages: pageHits }];
        });
}

/* ------------------------------------------------------------------ */
/* History — first and latest commit touching each prototype's route    */
/* and components (git log, 2026-11-11). Update when a prototype ships. */
/* ------------------------------------------------------------------ */

export const history: Record<string, { added: string; updated: string }> = {
    admin: { added: "2026-08-07", updated: "2026-08-07" },
    advertise: { added: "2026-03-13", updated: "2026-03-13" },
    "advertise-guide": { added: "2026-03-12", updated: "2026-06-25" },
    "program-listing": { added: "2026-06-25", updated: "2026-07-02" },
    "ads-specs": { added: "2026-08-11", updated: "2026-08-20" },
    "program-comparison": { added: "2026-08-14", updated: "2026-10-13" },
    "ayu-giving": { added: "2026-08-07", updated: "2026-08-07" },
    "editorial-guidelines": { added: "2026-08-27", updated: "2026-08-27" },
    "top-rated": { added: "2026-09-11", updated: "2026-09-24" },
    "invoice-tool": { added: "2026-11-11", updated: "2026-11-11" },
};

const fullFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const formatDate = (iso: string) => fullFmt.format(new Date(iso));

/** "Sep 24, 2026", or null for a prototype with no entry in `history` yet. */
export const lastUpdated = (p: Prototype) => (history[p.id] ? formatDate(history[p.id].updated) : null);
