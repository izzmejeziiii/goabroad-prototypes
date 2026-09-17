import { Poppins } from "next/font/google";

/* The badge sets "TOP RATED" and the year in a bold geometric sans; Poppins
   Bold matches the dated original's digits closely. Loaded only here. */
const poppins = Poppins({ subsets: ["latin"], weight: "700", display: "swap" });

/* Geometry measured from the design team's badge (588×436, "2025" baked
   in, ribbon left blank for the category): the ribbon runs y=223–309 and
   x=87–499 between its notches; the year's digits fill a 76×24 box centred
   at x=293.5 with their baseline at y=346, on shield colour #983535. */
const BADGE = {
    width: 588,
    height: 436,
    shield: "#983535",
    ribbon: { centerX: 293, centerY: 266, innerWidth: 370, fontSize: 36 },
    year: { x: 293.5, baseline: 346, width: 76, fontSize: 34, box: [250, 318, 88, 34] },
};

/* GoAbroad's Top Rated PROGRAMS badge — a different mark from the provider
   badge (maroon shield, gold edge, sun ribbon). The ribbon carries the
   directory's name and the year is rendered live over the artwork's own,
   so every directory and year gets its badge without a new image. Sized by
   the className; scales as one piece because the text lives inside the
   SVG's viewBox. */
export default function ProgramBadge({
    category,
    year,
    className,
    label,
}: {
    /** The directory's name as it reads on the ribbon, e.g. "Teach Abroad". */
    category: string;
    year: number;
    className?: string;
    label?: string;
}) {
    // Long names shrink to stay between the ribbon's notches.
    const fontSize = Math.min(
        BADGE.ribbon.fontSize,
        Math.floor(BADGE.ribbon.innerWidth / (category.length * 0.62)),
    );
    const [bx, by, bw, bh] = BADGE.year.box;
    return (
        <svg
            viewBox={`0 0 ${BADGE.width} ${BADGE.height}`}
            className={className}
            role="img"
            aria-label={label ?? `GoAbroad Top Rated ${category} Programs ${year}`}
        >
            <image
                href="/images/top-rated/program-badge.png"
                width={BADGE.width}
                height={BADGE.height}
            />
            <text
                x={BADGE.ribbon.centerX}
                y={BADGE.ribbon.centerY + fontSize * 0.36}
                textAnchor="middle"
                className={poppins.className}
                fontSize={fontSize}
                fill="#ffffff"
            >
                {category}
            </text>
            {/* Cover the artwork's baked-in year with shield colour, then
                set the page's year in its place. */}
            <rect x={bx} y={by} width={bw} height={bh} fill={BADGE.shield} />
            <text
                x={BADGE.year.x}
                y={BADGE.year.baseline}
                textAnchor="middle"
                textLength={BADGE.year.width}
                lengthAdjust="spacing"
                className={poppins.className}
                fontSize={BADGE.year.fontSize}
                fill="#ffffff"
            >
                {year}
            </text>
        </svg>
    );
}
