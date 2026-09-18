import { HiCheck } from "react-icons/hi2";

/* Page furniture: the doc's methodology ("the most outstanding reviews from
   program participants") as three checks. */
const criteria = [
    "Verified reviews submitted on GoAbroad in the past 12 months",
    "Met the minimum number of reviews for the year",
    "The most outstanding ratings in their category",
];

/* Beside the Top Rated Providers heading: how the list works, on the same
   cobalt panel as the programs figures — what a provider needs to earn a
   place, as three sun checks. The notable mentions are reached from the
   Quick Links like every other group; a jump tile here pulled more
   attention than the directories themselves (reviewer feedback), so it is
   gone. The lists below run three providers per category without places:
   earlier feedback took the "1st/2nd/3rd" pills off the cards, so the
   podium that explained them went too. */
export default function RankLegend({ categoryCount }: { categoryCount: number }) {
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
        </aside>
    );
}
