import {
    HiMapPin,
    HiOutlineArrowUpRight,
    HiPaperAirplane,
} from "react-icons/hi2";
import type { YearLink } from "./types";

const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
});

export type TimelineStop = {
    year: string;
    title: string;
    /** Small line beside the year: an announcement date, or "You are here". */
    meta: string;
    href: string;
    action: string;
    external: boolean;
    /** The stop the reader is on — sun ring and sun meta. */
    current: boolean;
};

type Stop = TimelineStop;

/* The main page's stops: this year's lists, then each previous year's
   announcement article with its publish date. */
export function articleStops(
    links: YearLink[],
    currentYear: number,
    currentHref: string,
): TimelineStop[] {
    return [
        {
            year: String(currentYear),
            title: `Top Rated Providers & Programs of ${currentYear}`,
            meta: "You are here",
            href: currentHref,
            action: "This year's lists",
            external: false,
            current: true,
        },
        ...links.map((link) => ({
            year: link.label.match(/\d{4}$/)?.[0] ?? "",
            title: link.label,
            meta: link.date ? dateFormat.format(new Date(link.date)) : "",
            href: link.href,
            action: "Read the article",
            external: true,
            current: false,
        })),
    ];
}

/* A directory page's stops: every year that has a list for the
   directory, newest first, with the page's own year marked as where the
   reader is. */
export function yearStops({
    years,
    hereYear,
    hereHref,
    titleFor,
    hrefFor,
}: {
    years: number[];
    hereYear: number;
    hereHref: string;
    titleFor: (year: number) => string;
    hrefFor: (year: number) => string;
}): TimelineStop[] {
    return years.map((y) => {
        const here = y === hereYear;
        return {
            year: String(y),
            title: titleFor(y),
            meta: here ? "You are here" : "",
            href: here ? hereHref : hrefFor(y),
            action: here ? "This list" : "View the list",
            external: false,
            current: here,
        };
    });
}

/* Stops per row on the desktop route unless the caller says otherwise. */
const DEFAULT_PER_ROW = 4;

/* One milestone card: the year large, when it was announced, the article's
   title, and the link line. A coloured top edge ties the card to its stop
   on the route — sun for this year, cobalt for the rest. */
function StopCard({ stop }: { stop: Stop }) {
    return (
        <a
            href={stop.href}
            target={stop.external ? "_blank" : undefined}
            rel={stop.external ? "noopener" : undefined}
            className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-t-4 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cobalt-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2 ${
                stop.current
                    ? "border-sun-500 ring-1 ring-sun-500"
                    : "border-slate-200 border-t-cobalt-500 hover:border-cobalt-200 hover:border-t-cobalt-500"
            }`}
        >
            {/* Faint dotted field in the corner, the page's texture. */}
            <span
                aria-hidden
                className="pointer-events-none absolute -top-2 -right-2 h-24 w-24 [background-image:radial-gradient(circle,rgba(10,94,133,0.16)_1.5px,transparent_1.5px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
            />
            <span className="relative flex items-baseline justify-between gap-3">
                <span
                    className={`text-2xl font-bold tracking-tight tabular-nums ${
                        stop.current ? "text-cobalt-700" : "text-neutral-900"
                    }`}
                >
                    {stop.year}
                </span>
                <span
                    className={`text-xs ${
                        stop.current
                            ? "font-semibold text-sun-700"
                            : "text-slate-500"
                    }`}
                >
                    {stop.meta}
                </span>
            </span>
            <span className="relative mt-1.5 line-clamp-2 text-sm leading-snug font-semibold text-neutral-800 transition-colors group-hover:text-cobalt-600">
                {stop.title}
            </span>
            <span className="relative mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-cobalt-500">
                {stop.action}
                {stop.external && (
                    <HiOutlineArrowUpRight
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                )}
            </span>
        </a>
    );
}

type MarkerKind = "plane" | "pin" | "point";

/* The marker for a stop on the route. The journey runs from 2015 up to
   now: its first stop (2015) is a plain point, the years in between are
   map pins, and this year is the plane on a sun disc, flying in the
   direction of travel — leftward along the desktop row (the route reaches
   this year from 2024 on its right), upward on the phone rail. All three
   sit in the same 40px box so they centre on the line alike. */
function Marker({
    kind,
    heading,
    ring,
    className,
}: {
    kind: MarkerKind;
    /** Which way the plane flies: along the desktop row or up the rail. */
    heading: "left" | "up";
    /** Ring in the section's background colour, so the marker punches a
        gap in the dashed line. */
    ring: string;
    className?: string;
}) {
    return (
        <span
            aria-hidden
            className={`flex h-10 w-10 items-center justify-center ${className ?? ""}`}
        >
            {kind === "plane" ? (
                <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-sun-500 text-cobalt-700 shadow-md shadow-sun-500/40 ring-4 ${ring}`}
                >
                    <HiPaperAirplane
                        className={`h-5 w-5 ${
                            heading === "left" ? "rotate-180" : "-rotate-90"
                        }`}
                    />
                </span>
            ) : kind === "pin" ? (
                <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-cobalt-500 shadow-md ring-4 ${ring}`}
                >
                    <HiMapPin className="h-5 w-5" />
                </span>
            ) : (
                <span
                    className={`h-5 w-5 rounded-full bg-white shadow-[inset_0_0_0_4px_var(--color-cobalt-500)] ring-4 ${ring}`}
                />
            )}
        </span>
    );
}

const markerKind = (index: number, last: number): MarkerKind =>
    index === 0 ? "plane" : index === last ? "point" : "pin";

/* Previous years as a route on a map: a dashed travel line that snakes
   across the section — left to right, a U-turn, right to left — with a
   marker at every stop and a card beneath it carrying the year, a small
   line (date or "You are here"), the title, and the link. Read as a
   journey it runs from the oldest year (a point) through map pins up to
   this year, where the plane sits on a sun disc; laid out newest first, so
   the plane is top-left and the point is the last stop. Phones and
   tablets get the same stops down one vertical dashed rail. Used on the
   main page for the announcement articles and on the directory pages for
   each directory's own past lists (`articleStops` / `yearStops` build the
   stops). No cover images — the articles' covers are all different
   shapes, which is what the reviewer wanted to get away from. */
export default function ArchiveTimeline({
    stops,
    surface = "slate",
    perRow = DEFAULT_PER_ROW,
}: {
    stops: TimelineStop[];
    /** The section's background, so the markers' rings match it. */
    surface?: "slate" | "white";
    /** Stops per row on the desktop route — four on the main page, three
        on the directory pages (Jezi's call). */
    perRow?: number;
}) {
    const ring = surface === "white" ? "ring-white" : "ring-slate-100";
    const rows = Math.ceil(stops.length / perRow);
    const last = stops.length - 1;
    const line = "absolute top-[19px] border-t-2 border-dashed border-cobalt-500/50";

    return (
        <>
            {/* Desktop route: gutter columns either side hold the U-turns. */}
            <ol
                className="hidden lg:grid lg:gap-x-3 lg:gap-y-10"
                style={{
                    gridAutoRows: "1fr",
                    gridTemplateColumns: `3rem repeat(${perRow}, minmax(0, 1fr)) 3rem`,
                }}
            >
                {stops.map((stop, i) => {
                    const row = Math.floor(i / perRow);
                    const pos = i % perRow;
                    const ltr = row % 2 === 0;
                    const col = ltr ? pos : perRow - 1 - pos;
                    const extent =
                        i === 0
                            ? "left-1/2 right-0"
                            : i === last
                              ? ltr
                                  ? "left-0 right-1/2"
                                  : "left-1/2 right-0"
                              : "-left-1.5 -right-1.5";
                    return (
                        <li
                            key={stop.year}
                            className="relative pt-14"
                            style={{ gridColumn: col + 2, gridRow: row + 1 }}
                        >
                            <span aria-hidden className={`${line} ${extent}`} />
                            <Marker
                                kind={markerKind(i, last)}
                                heading="left"
                                ring={ring}
                                className="absolute top-0 left-1/2 -translate-x-1/2"
                            />
                            <StopCard stop={stop} />
                        </li>
                    );
                })}
                {/* U-turns between rows: a dashed half-ring in the gutter on
                    the side the route reaches the end of the row, spanning
                    from this row's line down to the next row's. */}
                {Array.from({ length: rows - 1 }, (_, row) => {
                    const right = row % 2 === 0;
                    return (
                        <li
                            key={`turn-${row}`}
                            aria-hidden
                            className="relative"
                            style={{
                                gridColumn: right ? perRow + 2 : 1,
                                gridRow: `${row + 1} / span 2`,
                            }}
                        >
                            <span
                                className={`absolute top-[19px] h-[calc(50%+1.25rem)] border-2 border-dashed border-cobalt-500/50 ${
                                    right
                                        ? "-left-1.5 right-0 rounded-r-full border-l-0"
                                        : "left-0 -right-1.5 rounded-l-full border-r-0"
                                }`}
                            />
                        </li>
                    );
                })}
            </ol>

            {/* Phone and tablet route: one vertical dashed rail. */}
            <ol className="relative ml-5 space-y-5 border-l-2 border-dashed border-cobalt-500/50 pl-8 lg:hidden">
                {stops.map((stop, i) => (
                    <li key={stop.year} className="relative">
                        <Marker
                            kind={markerKind(i, last)}
                            heading="up"
                            ring={ring}
                            className="absolute top-1 -left-[3.3rem]"
                        />
                        <StopCard stop={stop} />
                    </li>
                ))}
            </ol>
        </>
    );
}
