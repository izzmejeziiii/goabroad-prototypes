import Image from "next/image";
import Link from "next/link";
import { HiChevronRight, HiOutlineArrowRight, HiStar } from "react-icons/hi2";
import TopRatedBadge from "./badge";
import { photoUrl } from "./cdn";
import {
    directories,
    hero,
    notableMentions,
    pageTitle,
    providerGroups,
    providers,
    winnerCount,
    year,
} from "./data";

const format = new Intl.NumberFormat("en-US");

/* Backdrop for the mosaic: a field of cobalt dots that fades out from the
   centre, with a cobalt glow behind the tall photo and a sun glow behind the
   squares. Decorative only, so it is hidden on phones where the mosaic sits
   flush under the breadcrumb. */
function Backdrop() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 md:block"
        >
            <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(10,94,133,0.16)_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(closest-side,black_30%,transparent_72%)]" />
            <div className="absolute top-[14%] left-[12%] h-[52%] w-[50%] rounded-full bg-primary-200/45 blur-3xl" />
            <div className="absolute right-[10%] bottom-[12%] h-[42%] w-[40%] rounded-full bg-sun-200/50 blur-3xl" />
        </div>
    );
}

/* A count on the cobalt panel. */
function Stat({ value, label }: { value: number; label: string }) {
    return (
        <div>
            <dt className="sr-only">{label}</dt>
            <dd className="text-3xl font-bold text-white">{value}</dd>
            <dd className="text-sm text-white/70">{label}</dd>
        </div>
    );
}

/* Hero for the main page. Same bones as the /mygoabroad pattern — light
   slate band, breadcrumb in flow, dark headline, photo column on the right —
   but the photo column is a three-photo mosaic with the seal and a rating
   card floating over it, and the headline picks out "Top Rated" in cobalt. */
export default function Hero() {
    const winners = providerGroups
        .flatMap((group) => group.providers)
        .map((alias) => providers[alias])
        .filter(Boolean);
    const averageRating =
        winners.reduce((sum, p) => sum + p.rating, 0) / winners.length;
    const totalReviews = winners.reduce((sum, p) => sum + p.reviews, 0);

    // The doc's H1, with "Top Rated" picked out — the text stays identical.
    const [before, after] = pageTitle.split("Top Rated");
    const [tall, topSquare, bottomSquare] = hero.photos;

    return (
        <header className="relative isolate w-full overflow-hidden bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500">
            {/* Full-bleed cobalt panel — the same gradient as the page's
                closing band — with the mosaic's dotted field repeated in white
                and gathered towards the top-left corner. */}
            <div
                aria-hidden
                className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.14)_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_12%_20%,black_5%,transparent_55%)]"
            />
            <div className="relative mx-auto max-w-7xl px-4 xl:px-0">
                <div className="flex flex-col gap-10 pt-6 pb-12 md:flex-row md:items-center md:gap-14 md:py-16">
                    <div className="flex flex-1 flex-col items-start text-left">
                        <nav
                            aria-label="Breadcrumb"
                            className="text-xs tracking-wide uppercase text-white/70"
                        >
                            <ol className="flex items-center gap-2">
                                <li>
                                    <Link
                                        href="/"
                                        className="font-bold text-white transition-colors hover:text-sun-500"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li aria-hidden>
                                    <HiChevronRight className="h-3.5 w-3.5" />
                                </li>
                                <li aria-current="page">
                                    Top Rated Providers &amp; Programs
                                </li>
                            </ol>
                        </nav>

                        {/* The doc's H1, with "Top Rated" picked out in sun. */}
                        <h1 className="mt-8 text-4xl leading-[1.08] font-bold tracking-tight text-white lg:text-5xl xl:text-[3.5rem]">
                            {before}
                            <span className="text-sun-500">Top Rated</span>
                            {after}
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
                            {hero.lead}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#top-rated-programs"
                                className="inline-flex items-center gap-2 rounded-lg bg-sun-500 px-6 py-3 font-semibold text-cobalt-700 transition-colors hover:bg-sun-300"
                            >
                                {hero.primaryCta}
                                <HiOutlineArrowRight
                                    aria-hidden
                                    className="h-4 w-4"
                                />
                            </a>
                            <a
                                href="#top-rated-providers"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                {hero.secondaryCta}
                            </a>
                        </div>
                        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-8">
                            <Stat
                                value={winnerCount}
                                label="Top Rated Providers"
                            />
                            <Stat
                                value={notableMentions.length}
                                label="Notable Mentions"
                            />
                            <Stat
                                value={directories.length}
                                label="Program categories"
                            />
                        </dl>
                    </div>

                    {/* Mosaic: a tall photo, two squares, the seal on the
                        seam between them, and the rating card overhanging
                        the bottom-left corner. Percent-based so it scales
                        with the column. */}
                    <div className="w-full shrink-0 md:w-[46%]">
                            <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
                                {/* Anchored to the mosaic so it stays behind
                                    the photos at every width; the header's
                                    overflow-hidden clips the overshoot. */}
                                <Backdrop />
                                <HiStar
                                    aria-hidden
                                    className="absolute -top-8 right-[4%] h-6 w-6 text-sun-500/70"
                                />
                                <HiStar
                                    aria-hidden
                                    className="absolute -right-5 bottom-[40%] h-4 w-4 text-sun-500/50"
                                />
                                <HiStar
                                    aria-hidden
                                    className="absolute -bottom-6 left-[42%] h-5 w-5 text-white/40"
                                />

                                <div className="absolute inset-y-0 left-0 w-[64%] overflow-hidden rounded-2xl shadow-xl shadow-cobalt-700/10">
                                    <Image
                                        src={photoUrl(tall.path, 720, 900)}
                                        alt={tall.alt}
                                        fill
                                        priority
                                        sizes="(min-width: 768px) 30vw, 64vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute top-0 right-0 h-[47.5%] w-[33%] overflow-hidden rounded-2xl shadow-lg shadow-cobalt-700/10">
                                    <Image
                                        src={photoUrl(topSquare.path, 400, 460)}
                                        alt={topSquare.alt}
                                        fill
                                        priority
                                        sizes="(min-width: 768px) 15vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute right-0 bottom-0 h-[47.5%] w-[33%] overflow-hidden rounded-2xl shadow-lg shadow-cobalt-700/10">
                                    <Image
                                        src={photoUrl(bottomSquare.path, 400, 460)}
                                        alt={bottomSquare.alt}
                                        fill
                                        priority
                                        sizes="(min-width: 768px) 15vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>

                                <TopRatedBadge
                                    year={year}
                                    className="absolute -top-5 left-[64%] w-[22%] min-w-[84px] -translate-x-1/2 drop-shadow-lg"
                                />

                                <div className="absolute -left-3 bottom-4 flex items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 shadow-lg ring-1 ring-slate-200 sm:-left-6 sm:bottom-5 sm:px-4 sm:py-3">
                                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sun-500/15 text-sun-600 sm:flex">
                                        <HiStar aria-hidden className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xl leading-none font-bold text-neutral-900">
                                            {averageRating.toFixed(2)}
                                            <span className="ml-1 text-sm font-semibold text-slate-500">
                                                / 5
                                            </span>
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            <span className="sm:hidden">
                                                Avg. rating ·{" "}
                                                {format.format(totalReviews)} reviews
                                            </span>
                                            <span className="hidden sm:inline">
                                                Average winner rating across{" "}
                                                {format.format(totalReviews)} reviews
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </header>
    );
}
