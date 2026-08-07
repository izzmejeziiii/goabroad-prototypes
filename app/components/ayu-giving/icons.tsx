// Icon set for the AYU Giving campaign-detail prototype.
//
// The source app pulls its UI glyphs from `lucide-react` and its category
// glyphs from a bespoke hand-drawn set. This prototype has neither dependency,
// so both are reproduced here verbatim — same viewBox, same path data, same
// stroke settings — and they inherit color + size from the className the caller
// passes, exactly like the originals.
import type { ComponentType, ReactNode, SVGProps } from "react";

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/* ─────────────────────────── lucide-react glyphs ─────────────────────────── */

/** Mirrors lucide-react's rendered SVG: 24×24, unfilled, 2px round strokes. */
function LucideBase({
    children,
    ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {children}
        </svg>
    );
}

export const BadgeCheck: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
    </LucideBase>
);

export const CalendarDays: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
    </LucideBase>
);

export const Bell: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M10.268 21a2 2 0 0 0 3.464 0" />
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
    </LucideBase>
);

export const Heart: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </LucideBase>
);

export const Share2: Icon = (props) => (
    <LucideBase {...props}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </LucideBase>
);

export const ShieldCheck: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
    </LucideBase>
);

export const Users: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
    </LucideBase>
);

export const Clock: Icon = (props) => (
    <LucideBase {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </LucideBase>
);

export const ChevronDown: Icon = (props) => (
    <LucideBase {...props}>
        <path d="m6 9 6 6 6-6" />
    </LucideBase>
);

export const ChevronRight: Icon = (props) => (
    <LucideBase {...props}>
        <path d="m9 18 6-6-6-6" />
    </LucideBase>
);

export const ArrowLeft: Icon = (props) => (
    <LucideBase {...props}>
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </LucideBase>
);

export const ArrowRight: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </LucideBase>
);

export const X: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </LucideBase>
);

export const Check: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M20 6 9 17l-5-5" />
    </LucideBase>
);

export const StarIcon: Icon = (props) => (
    <LucideBase {...props}>
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </LucideBase>
);

/* ───────────────────────── bespoke category glyphs ───────────────────────── */

/** The category set draws thinner (1.75) strokes than the lucide UI glyphs. */
function IconBase({
    children,
    ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
}

// Environment — a two-leaf sprout on a stem.
const Leaf: Icon = (props) => (
    <IconBase {...props}>
        <path d="M12 21c0-4 0-6 0-9" />
        <path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6Z" />
        <path d="M12 15.5c0-3-2-5-6-5 0 3.5 2.5 5 6 5Z" />
    </IconBase>
);

// Education — a mortarboard graduation cap with a tassel.
const GraduationCap: Icon = (props) => (
    <IconBase {...props}>
        <path d="M12 4 21 8l-9 4-9-4 9-4Z" />
        <path d="M6 10v3.2c0 1.7 2.7 3 6 3s6-1.3 6-3V10" />
        <path d="M21 8v5.5" />
        <path d="M21 13.5c-.6.4-.6 1.5 0 2" />
    </IconBase>
);

// Health — a heart with a heartbeat line running through it.
const HeartPulse: Icon = (props) => (
    <IconBase {...props}>
        <path d="M12 20C6 16 3 12.5 3 9c0-2.5 2-4 4-4 2 0 4 1.5 5 3.5C13 6.5 15 5 17 5c2 0 4 1.5 4 4 0 3.5-3 7-9 11Z" />
        <path d="M6.5 12H9l1.4-2.6L12.6 14 14 11.5h3.5" />
    </IconBase>
);

// Poverty Relief — cupped hands holding a heart.
const HandHeart: Icon = (props) => (
    <IconBase {...props}>
        <path d="M12 11c-1.4-1.9-4-1.6-4 .6 0 1.7 4 4.2 4 4.2s4-2.5 4-4.2c0-2.2-2.6-2.5-4-.6Z" />
        <path d="M4.5 15c0 4 3.6 6 7.5 6s7.5-2 7.5-6" />
    </IconBase>
);

// Community — two people side by side.
const CommunityUsers: Icon = (props) => (
    <IconBase {...props}>
        <circle cx="8.5" cy="8" r="3" />
        <path d="M3.5 20v-1.5C3.5 15.4 6 13.5 8.5 13.5s5 1.9 5 5V20" />
        <circle cx="16.2" cy="8.6" r="2.5" />
        <path d="M15.5 13.7c2.7 0 4.5 1.9 4.5 4.6V20" />
    </IconBase>
);

// General / Other — a sparkle (large four-point star with a small companion).
const Sparkles: Icon = (props) => (
    <IconBase {...props}>
        <path d="M11 3.5c.7 4.6 1.9 5.8 6.5 6.5-4.6.7-5.8 1.9-6.5 6.5-.7-4.6-1.9-5.8-6.5-6.5 4.6-.7 5.8-1.9 6.5-6.5Z" />
        <path d="M17.5 14.5c.3 1.8.7 2.2 2.5 2.5-1.8.3-2.2.7-2.5 2.5-.3-1.8-.7-2.2-2.5-2.5 1.8-.3 2.2-.7 2.5-2.5Z" />
    </IconBase>
);

// Clean water — a droplet.
const Droplet: Icon = (props) => (
    <IconBase {...props}>
        <path d="M12 3.5c3.2 4 6 6.8 6 10.3a6 6 0 0 1-12 0C6 10.3 8.8 7.5 12 3.5Z" />
    </IconBase>
);

// Food / hunger — a bowl with rising steam.
const Bowl: Icon = (props) => (
    <IconBase {...props}>
        <path d="M4 12h16c0 4.4-3.6 8-8 8s-8-3.6-8-8Z" />
        <path d="M9 5c-.7.9-.7 1.9 0 2.8" />
        <path d="M12 4.5c-.7.9-.7 1.9 0 2.8" />
        <path d="M15 5c-.7.9-.7 1.9 0 2.8" />
    </IconBase>
);

// Housing / shelter — a house with a door.
const Home: Icon = (props) => (
    <IconBase {...props}>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M10 20v-5h4v5" />
    </IconBase>
);

const ICONS: Record<string, Icon> = {
    Leaf,
    GraduationCap,
    HeartPulse,
    HandHeart,
    Users: CommunityUsers,
    Sparkles,
    Droplet,
    Bowl,
    Home,
};

export function iconFor(name: string | null | undefined): Icon {
    if (!name) return Sparkles;
    return ICONS[name] ?? Sparkles;
}

/** Human-readable label from a slug. e.g. "poverty-relief" → "Poverty Relief". */
export function formatCategorySlug(slug: string): string {
    if (slug === "arts-culture") return "Arts & Culture";
    if (slug === "other") return "General";
    return slug
        .split("-")
        .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
        .join(" ");
}
