import { Poppins } from "next/font/google";

/* The badge sets "TOP RATED" and the year in a bold geometric sans; Poppins
   Bold matches the dated originals' digits closely. Loaded only here. */
const poppins = Poppins({ subsets: ["latin"], weight: "700", display: "swap" });

const SHIELD = "#983535";

/* Two pieces of the design team's artwork, both measured from dated
   originals so the live year lands where the printed one sits:

   - `category` (588×436, "2025" baked in, ribbon left blank): the ribbon
     runs y=223–309 and x=87–499 between its notches; the year's digits fill
     a 76×24 box centred at x=293.5 with their baseline at y=346.
   - `generic` (775×777, "TOP RATED" on the ribbon, no year): in the dated
     twin the year's digits fill a 131×41 box centred at x=388 with their
     baseline at y=603. */
const ART = {
    category: {
        src: "/images/top-rated/program-badge.png",
        width: 588,
        height: 436,
        ribbon: { centerX: 293, centerY: 266, innerWidth: 370, fontSize: 36 },
        year: { x: 293.5, baseline: 346, width: 76, fontSize: 34 },
        /** The artwork's own year, to paint over before drawing ours. */
        bakedYear: { x: 250, y: 318, width: 88, height: 34 },
    },
    generic: {
        src: "/images/top-rated/program-badge-generic.png",
        width: 775,
        height: 777,
        year: { x: 388, baseline: 603, width: 131, fontSize: 58 },
    },
};

/* GoAbroad's Top Rated PROGRAMS badge — a different mark from the provider
   badge (maroon shield, gold edge, sun ribbon). With a `category` the
   ribbon carries the directory's name (the inner pages); without one it is
   the generic "TOP RATED" badge (the main page). Either way the year is
   rendered live over the artwork, so the page rolls over each year without
   a new image. Sized by the className; scales as one piece because the
   text lives inside the SVG's viewBox. */
export default function ProgramBadge({
    category,
    year,
    className,
    label,
}: {
    /** The directory's name as it reads on the ribbon, e.g. "Teach Abroad".
        Omit for the generic badge. */
    category?: string;
    year: number;
    className?: string;
    label?: string;
}) {
    const name =
        label ??
        (category
            ? `GoAbroad Top Rated ${category} Programs ${year}`
            : `GoAbroad Top Rated Programs ${year}`);

    if (!category) {
        const art = ART.generic;
        return (
            <svg
                viewBox={`0 0 ${art.width} ${art.height}`}
                className={className}
                role="img"
                aria-label={name}
            >
                <image href={art.src} width={art.width} height={art.height} />
                <text
                    x={art.year.x}
                    y={art.year.baseline}
                    textAnchor="middle"
                    textLength={art.year.width}
                    lengthAdjust="spacing"
                    className={poppins.className}
                    fontSize={art.year.fontSize}
                    fill="#ffffff"
                >
                    {year}
                </text>
            </svg>
        );
    }

    const art = ART.category;
    // Long names shrink to stay between the ribbon's notches.
    const fontSize = Math.min(
        art.ribbon.fontSize,
        Math.floor(art.ribbon.innerWidth / (category.length * 0.62)),
    );
    const baked = art.bakedYear;
    return (
        <svg
            viewBox={`0 0 ${art.width} ${art.height}`}
            className={className}
            role="img"
            aria-label={name}
        >
            <image href={art.src} width={art.width} height={art.height} />
            <text
                x={art.ribbon.centerX}
                y={art.ribbon.centerY + fontSize * 0.36}
                textAnchor="middle"
                className={poppins.className}
                fontSize={fontSize}
                fill="#ffffff"
            >
                {category}
            </text>
            {/* Cover the artwork's baked-in year with shield colour, then
                set the page's year in its place. */}
            <rect
                x={baked.x}
                y={baked.y}
                width={baked.width}
                height={baked.height}
                fill={SHIELD}
            />
            <text
                x={art.year.x}
                y={art.year.baseline}
                textAnchor="middle"
                textLength={art.year.width}
                lengthAdjust="spacing"
                className={poppins.className}
                fontSize={art.year.fontSize}
                fill="#ffffff"
            >
                {year}
            </text>
        </svg>
    );
}
