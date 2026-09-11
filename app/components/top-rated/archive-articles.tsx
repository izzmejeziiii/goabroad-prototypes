import Image from "next/image";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { photoUrl } from "./cdn";
import type { YearLink } from "./types";

const yearOf = (link: YearLink) => link.label.match(/\d{4}$/)?.[0] ?? "";

/* Previous years as plain article cards — because that is what each link is:
   the article's own cover image, the year as a chip, the doc's link label as
   the title, and "Read the article". Nothing else. Five across on desktop,
   two on tablets and phones. */
export default function ArchiveArticles({ links }: { links: YearLink[] }) {
    return (
        <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
            {links.map((link) => {
                const year = yearOf(link);
                return (
                    <li key={link.label}>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener"
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-cobalt-200 hover:shadow-lg hover:shadow-cobalt-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2"
                        >
                            <span className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-100">
                                {link.image ? (
                                    <Image
                                        src={photoUrl(link.image, 480, 270)}
                                        alt=""
                                        fill
                                        sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <span
                                        aria-hidden
                                        className="flex h-full w-full items-center justify-center bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500 text-3xl font-bold text-white/80"
                                    >
                                        {year}
                                    </span>
                                )}
                                <span className="absolute top-2.5 left-2.5 rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-cobalt-700 shadow-sm tabular-nums">
                                    {year}
                                </span>
                            </span>
                            <span className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
                                <span className="text-sm leading-snug font-semibold text-neutral-800 transition-colors group-hover:text-cobalt-600 sm:text-base">
                                    {link.label}
                                </span>
                                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt-500 sm:text-sm">
                                    Read the article
                                    <HiOutlineArrowUpRight
                                        aria-hidden
                                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </span>
                            </span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
