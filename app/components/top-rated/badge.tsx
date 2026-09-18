import { Bebas_Neue } from "next/font/google";

/* The badge's year is set in a tall condensed face that isn't Inter. Bebas
   Neue reproduces the dated original's digits almost exactly — at the size
   that matches their 76px height its natural width is 159px against the
   original's 161px — so it is very likely the face the badge was made with.
   Loaded only for this component. */
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" });

/* Geometry measured from the design team's dated badge (568×609): the year
   is centred on the shield, its baseline sits at y=493, and the digits fill
   a 161×76px box. `textLength` holds the rendered year to that width so the
   overlay stays put even if the font ever falls back. */
const BADGE = {
    width: 568,
    height: 609,
    year: { x: 284, baseline: 493, width: 161, fontSize: 104 },
    red: "#ca4545",
};

/* Year-less artwork from the design team, all on the same 568×609 shield
   with the ribbon at y=290–396, so one year geometry fits every variant.
   `generic` is the plain "TOP RATED" badge; the category variants are for
   categories GoAbroad's CDN has no dated badge for. */
const ART = {
    generic: "/images/top-rated/badge.png",
    "degree-abroad": "/images/top-rated/provider-badge-degree-abroad.png",
} as const;

export type BadgeVariant = keyof typeof ART;

/* GoAbroad's Top Rated badge with the year rendered live on top of the
   year-less artwork, so the page can roll over each year without a new image.
   Sized by the className; scales as one piece because the text lives inside
   the SVG's viewBox. */
export default function TopRatedBadge({
    year,
    variant = "generic",
    className,
    label,
}: {
    year: number;
    variant?: BadgeVariant;
    className?: string;
    /** Accessible name; defaults to "GoAbroad Top Rated {year}". */
    label?: string;
}) {
    return (
        <svg
            viewBox={`0 0 ${BADGE.width} ${BADGE.height}`}
            className={className}
            role="img"
            aria-label={label ?? `GoAbroad Top Rated ${year}`}
        >
            <image
                href={ART[variant]}
                width={BADGE.width}
                height={BADGE.height}
            />
            <text
                x={BADGE.year.x}
                y={BADGE.year.baseline}
                textAnchor="middle"
                textLength={BADGE.year.width}
                lengthAdjust="spacing"
                className={bebas.className}
                fontSize={BADGE.year.fontSize}
                fill={BADGE.red}
            >
                {year}
            </text>
        </svg>
    );
}
