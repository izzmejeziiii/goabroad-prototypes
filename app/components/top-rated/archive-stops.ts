import type { YearLink } from "./types";

/* The stops on the archive route-map timeline, built here on the server
   (the timeline itself is a client component, for its "See more" toggle,
   and a client module's functions can't be called from a server page). */

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
