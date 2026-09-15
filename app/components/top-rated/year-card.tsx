import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import TopRatedBadge from "./badge";

/* One year of a directory's Top Rated Programs list, as a badge card: the
   real Top Rated badge wearing that year (the year is drawn over the
   year-less artwork, so every card gets its own) on the page's dotted slate
   band with a sun glow, the list's title beneath, and "View the list". The
   current year carries a sun "Current" chip. Replaced a plain card with a
   big cobalt numeral (Jezi: "try another design that still aligns with
   goabroad"). */
export default function YearCard({
    year,
    title,
    href,
    current = false,
}: {
    year: number;
    title: string;
    href: string;
    current?: boolean;
}) {
    return (
        <Link
            href={href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-cobalt-200 hover:shadow-lg hover:shadow-cobalt-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2"
        >
            <span className="relative block overflow-hidden bg-linear-to-br from-slate-200 to-slate-100 px-6 pt-7 pb-5">
                <span
                    aria-hidden
                    className="absolute inset-0 [background-image:radial-gradient(circle,rgba(2,61,88,0.14)_1.5px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_50%_100%,black_20%,transparent_75%)]"
                />
                <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-500/25 blur-2xl"
                />
                <TopRatedBadge
                    year={year}
                    className="relative mx-auto w-24 drop-shadow-xl transition-transform group-hover:-rotate-3"
                />
                {current && (
                    <span className="absolute top-3 right-3 rounded-full bg-sun-500 px-2.5 py-1 text-[11px] font-bold tracking-wider text-cobalt-700 uppercase shadow-sm">
                        Current
                    </span>
                )}
            </span>
            <span className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                    {year}
                </span>
                <span className="mt-1.5 leading-snug font-semibold text-neutral-800 transition-colors group-hover:text-cobalt-600">
                    {title}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-cobalt-500">
                    View the list
                    <HiOutlineArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                </span>
            </span>
        </Link>
    );
}
