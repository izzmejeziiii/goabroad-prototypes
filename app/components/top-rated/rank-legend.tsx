import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { badgeUrl } from "./cdn";
import { MedalDisc } from "./provider-card";

/* The three places as podium steps — first in the middle and tallest, the
   way a podium is built — in DOM order 1, 2, 3 and visual order 2, 1, 3.
   Each step wears a thin cap in its metal, matching the trophy disc. */
const steps: {
    rank: number;
    label: string;
    order: string;
    height: string;
    cap: string;
}[] = [
    {
        rank: 1,
        label: "1st",
        order: "order-2",
        height: "h-32",
        cap: "bg-linear-to-r from-[#f6d565] via-[#e2b53a] to-[#b9871a]",
    },
    {
        rank: 2,
        label: "2nd",
        order: "order-1",
        height: "h-24",
        cap: "bg-linear-to-r from-[#eef0f3] via-[#c3c7cd] to-[#8f949c]",
    },
    {
        rank: 3,
        label: "3rd",
        order: "order-3",
        height: "h-20",
        cap: "bg-linear-to-r from-[#e6a873] via-[#c9803f] to-[#96561f]",
    },
];

/* Beside the Top Rated Providers heading: how the list is ranked, drawn as a
   podium on the same cobalt panel as the programs figures — white steps with
   the gold, silver, and bronze trophy discs the provider cards wear, a sun
   glow behind first place, then the notable mentions as a glass tile that
   jumps to them. */
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
            aria-label="How the Top Rated Providers list is ranked"
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500 p-6 text-white shadow-xl shadow-cobalt-700/20 sm:p-7"
        >
            <div
                aria-hidden
                className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.14)_1.5px,transparent_1.5px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_60%)]"
            />
            {/* Warmth behind the winner's step. */}
            <div
                aria-hidden
                className="absolute top-[52%] left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-500/30 blur-3xl"
            />

            <p className="relative text-xs font-semibold tracking-widest uppercase text-sun-500">
                How the list works
            </p>
            <p className="relative mt-2 text-sm leading-relaxed text-white/80">
                Three places in each of {categoryCount} categories, then the
                notable mentions.
            </p>

            <ol className="relative mt-9 flex items-end gap-2 border-b-2 border-white/30">
                {steps.map(({ rank, label, order, height, cap }) => (
                    <li
                        key={rank}
                        className={`flex flex-1 flex-col items-center ${order}`}
                    >
                        <MedalDisc
                            rank={rank}
                            className="relative z-10 h-11 w-11 shadow-lg shadow-black/25 ring-4 ring-white"
                            iconClassName="h-5 w-5"
                        />
                        <div
                            className={`relative -mt-5 flex w-full flex-col items-center justify-end overflow-hidden rounded-t-xl bg-white pb-3 shadow-lg shadow-black/15 ${height}`}
                        >
                            <span
                                aria-hidden
                                className={`absolute inset-x-0 top-0 h-1.5 ${cap}`}
                            />
                            <span className="text-lg leading-none font-bold text-neutral-900">
                                {label}
                            </span>
                            <span className="mt-1 text-[11px] font-semibold tracking-wider uppercase text-slate-500">
                                place
                            </span>
                        </div>
                    </li>
                ))}
            </ol>

            <a
                href={notableHref}
                className="group relative mt-5 flex items-center gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/15 hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-500"
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
                        Providers recognized beyond the three places
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
