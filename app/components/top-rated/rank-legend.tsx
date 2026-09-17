import Image from "next/image";
import { HiCheck, HiOutlineArrowRight } from "react-icons/hi2";
import { badgeUrl } from "./cdn";

/* Page furniture: the doc's methodology ("the most outstanding reviews from
   program participants") as three checks. */
const criteria = [
    "Verified reviews submitted on GoAbroad in the past 12 months",
    "Met the minimum number of reviews for the year",
    "The most outstanding ratings in their category",
];

/* Beside the Top Rated Providers heading: how the list works, on the same
   cobalt panel as the programs figures — what a provider needs to earn a
   place, as three sun checks, then the notable mentions as a glass tile
   that jumps to them (the badge that sat beside the checks was removed at
   Jezi's request). The lists below run three providers
   per category without places: feedback on the prototype took the
   "1st/2nd/3rd" pills off the cards, so the podium that explained them
   went too. */
export default function RankLegend({
    categoryCount,
    notableCount,
    notableBadge,
    notableHref,
}: {
    categoryCount: number;
    notableCount: number;
    notableBadge: string;
    notableHref: string;
}) {
    return (
        <aside
            aria-label="How the Top Rated Providers list works"
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500 p-6 text-white shadow-xl shadow-cobalt-700/20 sm:p-7"
        >
            <div
                aria-hidden
                className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.14)_1.5px,transparent_1.5px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_60%)]"
            />
            <div
                aria-hidden
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-sun-500/25 blur-3xl"
            />

            <p className="relative text-xs font-semibold tracking-widest uppercase text-sun-500">
                How the list works
            </p>
            <p className="relative mt-2 text-sm leading-relaxed text-white/80">
                Three providers in each of {categoryCount} categories, then
                the notable mentions.
            </p>

            <ul className="relative mt-6 space-y-3">
                {criteria.map((criterion) => (
                    <li
                        key={criterion}
                        className="flex items-start gap-3 text-sm leading-snug"
                    >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sun-500 text-cobalt-700">
                            <HiCheck aria-hidden className="h-3 w-3" />
                        </span>
                        <span className="text-white/90">{criterion}</span>
                    </li>
                ))}
            </ul>

            <a
                href={notableHref}
                className="group relative mt-6 flex items-center gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/15 hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-500"
            >
                <Image
                    src={badgeUrl(notableBadge)}
                    alt=""
                    width={44}
                    height={48}
                    className="h-12 w-auto shrink-0 drop-shadow-md"
                />
                <span className="flex-1 text-sm font-semibold text-white">
                    {notableCount} Notable Mentions
                    <span className="mt-0.5 block text-xs font-normal text-white/70">
                        Providers recognized beyond the top three
                    </span>
                </span>
                <HiOutlineArrowRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-sun-500 transition-transform group-hover:translate-x-0.5"
                />
            </a>
        </aside>
    );
}
