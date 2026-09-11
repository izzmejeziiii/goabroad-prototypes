import {
    HiCheckBadge,
    HiOutlineArrowRight,
    HiOutlineCalendarDays,
    HiOutlineUser,
    HiStar,
} from "react-icons/hi2";
import TopRatedBadge from "./badge";
import { intro, year } from "./data";
import SectionHead from "./section-head";

/* A stand-in participant review: avatar, five stars, a rating, and the
   "verified" line. Every dimension is in container-width units (cqw), so the
   whole composition is the same picture at any panel size instead of the
   cards outgrowing the badge on phones. 1cqw ≈ 5px at the panel's 520px max. */
function ReviewCard({
    rating,
    className,
}: {
    rating: string;
    className?: string;
}) {
    return (
        <div
            className={`absolute flex items-center gap-[2.2cqw] rounded-[2.4cqw] bg-white p-[2.4cqw] shadow-lg ring-1 ring-slate-200 ${className ?? ""}`}
        >
            <span className="flex h-[7.5cqw] w-[7.5cqw] shrink-0 items-center justify-center rounded-full bg-primary-50 text-cobalt-500">
                <HiOutlineUser className="h-[4cqw] w-[4cqw]" />
            </span>
            <span className="flex flex-col gap-[1cqw]">
                <span className="flex items-center gap-[1.2cqw]">
                    <span className="flex text-sun-500">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <HiStar key={i} className="h-[2.8cqw] w-[2.8cqw]" />
                        ))}
                    </span>
                    <span className="text-[2.7cqw] leading-none font-bold text-neutral-800">
                        {rating}
                    </span>
                </span>
                <span className="flex items-center gap-[0.8cqw] text-[2.2cqw] leading-none font-medium whitespace-nowrap text-slate-500">
                    <HiCheckBadge className="h-[2.8cqw] w-[2.8cqw] text-fern-600" />
                    Verified review
                </span>
            </span>
        </div>
    );
}

/* The intro's illustration: three review cards feeding the badge along
   dashed paths — the paragraph's "based entirely on participant reviews"
   drawn rather than restated. Decorative, so hidden from assistive tech. */
function ReviewsToBadge() {
    return (
        <div
            aria-hidden
            className="@container relative mx-auto aspect-[7/5] w-full max-w-[520px] overflow-hidden rounded-2xl bg-slate-100"
        >
            <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(10,94,133,0.14)_1.5px,transparent_1.5px)] [background-size:20px_20px] [mask-image:radial-gradient(closest-side,black_35%,transparent_85%)]" />
            <div className="absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-200/50 blur-3xl" />

            {/* Dashed routes from each card's right edge into the badge.
                Coordinates are in container-width units, drawn in a box with
                the panel's 7:5 proportions so they line up with the cards. */}
            <svg
                viewBox="0 0 100 71.43"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full text-cobalt-500/35"
            >
                {[
                    "M43 14 C 51 14, 54 24, 58 29",
                    "M45 37 C 50 37, 54 33, 58 31",
                    "M43 60 C 51 60, 54 42, 58 34",
                ].map((d) => (
                    <path
                        key={d}
                        d={d}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                ))}
            </svg>

            {/* Reviews stack on the left and feed the badge on the right. The
                artwork spans roughly 9% to 91% of the panel's height, so it
                sits centred with matching margins. */}
            <TopRatedBadge
                year={year}
                className="absolute top-[42.5%] left-[72%] w-[30%] -translate-x-1/2 -translate-y-1/2 drop-shadow-xl"
            />
            <span className="absolute top-[71.5%] left-[72%] inline-flex -translate-x-1/2 items-center gap-[1.2cqw] rounded-full bg-white px-[2.4cqw] py-[1.4cqw] text-[2.1cqw] leading-none font-semibold whitespace-nowrap text-cobalt-500 shadow-sm ring-1 ring-slate-200">
                <HiOutlineCalendarDays className="h-[2.8cqw] w-[2.8cqw]" />
                From the past year&apos;s reviews
            </span>

            <ReviewCard rating="5.0" className="top-[9%] left-[4%] -rotate-2" />
            <ReviewCard rating="4.9" className="top-[41.5%] left-[9%] rotate-1" />
            <ReviewCard rating="4.8" className="top-[74%] left-[4%] -rotate-1" />
        </div>
    );
}

/* "What are the Top Rated Providers and Programs?" — the doc's heading,
   paragraph, and CTA on the left, the reviews-to-badge illustration on the
   right. Stacks with the illustration first on phones, like the hero. */
export default function HowItWorks() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-16">
                    <div className="flex-1">
                        <SectionHead kicker={intro.kicker} title={intro.heading} />
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                            {intro.paragraph}
                        </p>
                        <a
                            href="#top-rated-providers"
                            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cobalt-500 px-7 py-3 font-semibold text-white transition-colors hover:bg-cobalt-600"
                        >
                            {intro.cta}
                            <HiOutlineArrowRight aria-hidden className="h-4 w-4" />
                        </a>
                    </div>
                    <div className="w-full shrink-0 lg:w-[44%]">
                        <ReviewsToBadge />
                    </div>
                </div>
            </div>
        </section>
    );
}
