import Image from "next/image";
import Link from "next/link";
import {
    HiArchiveBox,
    HiChatBubbleLeftEllipsis,
    HiCheck,
    HiChevronRight,
    HiOutlineArrowLeft,
    HiOutlineArrowRight,
    HiStar,
} from "react-icons/hi2";
import TopRatedBadge from "./badge";
import { photoUrl } from "./cdn";
import {
    directories,
    pageTitle,
    programArchiveYears,
    topRatedPrograms,
    year,
} from "./data";
import CardSlider from "./card-slider";
import DirectoryCard from "./directory-card";
import NextSteps from "./next-steps";
import ProgramCard from "./program-card";
import SectionHead from "./section-head";
import type { Directory } from "./types";
import YearCard from "./year-card";

const format = new Intl.NumberFormat("en-US");

/* Page furniture for the badge card beside the summary: the doc's
   methodology (verified reviews, last 12 months, minimum count, top scores
   across criteria) as three checks. */
const badgeCriteria = [
    "Verified reviews submitted on GoAbroad in the past 12 months",
    "Met the minimum number of reviews for the year",
    "Top scores across multiple review criteria",
];

export const directoryPath = (directory: Directory, listYear?: number) =>
    listYear === undefined || listYear === year
        ? `/top-rated-providers-programs/${directory.id}`
        : `/top-rated-providers-programs/${directory.id}/${listYear}`;

/** The doc's H1 ("Top Rated Study Abroad Programs of 2025") for another year. */
export const titleForYear = (directory: Directory, listYear: number) =>
    directory.pageTitle.replace(String(year), String(listYear));

/* One directory's Top Rated Programs page — the current list, or one of the
   previous years' lists at /<directory>/<year> (the requirement added after
   the doc: "page/links of previous year of per directory top rated
   programs"). Both share this view: the current list carries the doc's
   summary, an archived list carries a notice pointing back to the current
   one, and each links to the other years at the bottom. The program lists
   are dummy data here, so an archive year shows the same programs. */
export default function DirectoryPageView({
    directory,
    listYear,
}: {
    directory: Directory;
    listYear: number;
}) {
    const isCurrent = listYear === year;
    const programs = topRatedPrograms[directory.id];
    const others = directories.filter((d) => d.id !== directory.id);
    const averageRating =
        programs.reduce((sum, p) => sum + p.rating, 0) / programs.length;
    const totalReviews = programs.reduce((sum, p) => sum + p.reviews, 0);
    const title = titleForYear(directory, listYear);
    const otherYears = [year, ...programArchiveYears].filter(
        (y) => y !== listYear,
    );

    return (
        <div className="w-full bg-white">
            {/* Full-bleed photo hero: the category photo runs across the whole
                header and fades into cobalt on the left so the H1 sits on
                colour, with the year's numbers for this list as glass chips
                and a jump into the cards. The doc's summary stays together in
                the section below. */}
            <header className="relative isolate w-full overflow-hidden bg-cobalt-700 text-white">
                {/* On phones the photo is a band across the top that fades
                    into the cobalt behind the words; from tablet up it fills
                    the whole header and fades from the left instead. */}
                <div className="absolute inset-x-0 top-0 h-80 md:inset-0 md:h-auto">
                    <Image
                        src={photoUrl(directory.photo.path, 1600, 900)}
                        alt={directory.photo.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center md:object-right"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-b from-cobalt-700/30 via-cobalt-700/40 via-45% to-cobalt-700 md:bg-linear-to-r md:from-cobalt-700 md:via-cobalt-700/75 md:to-cobalt-700/10"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 hidden h-28 bg-linear-to-t from-cobalt-700/80 to-transparent md:block"
                    />
                    {/* Keeps the breadcrumb legible over a bright sky on phones. */}
                    <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-cobalt-700/80 to-transparent md:hidden"
                    />
                </div>

                <div className="relative mx-auto flex max-w-7xl flex-col px-4 pt-6 pb-14 md:min-h-[30rem] md:pt-8 md:pb-16 xl:px-0">
                    <nav
                        aria-label="Breadcrumb"
                        className="text-xs tracking-wide uppercase text-white/70"
                    >
                        <ol className="flex flex-wrap items-center gap-2">
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
                            <li>
                                <Link
                                    href="/top-rated-providers-programs"
                                    className="transition-colors hover:text-white"
                                >
                                    Top Rated Providers &amp; Programs
                                </Link>
                            </li>
                            <li aria-hidden>
                                <HiChevronRight className="h-3.5 w-3.5" />
                            </li>
                            {isCurrent ? (
                                <li aria-current="page">
                                    {directory.cardTitle}
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href={directoryPath(directory)}
                                            className="transition-colors hover:text-white"
                                        >
                                            {directory.cardTitle}
                                        </Link>
                                    </li>
                                    <li aria-hidden>
                                        <HiChevronRight className="h-3.5 w-3.5" />
                                    </li>
                                    <li aria-current="page">{listYear}</li>
                                </>
                            )}
                        </ol>
                    </nav>

                    <div className="mt-52 max-w-3xl md:mt-auto md:pt-20">
                        <h1 className="text-4xl leading-tight font-bold text-white lg:text-5xl">
                            {title}
                        </h1>
                        {/* This year's numbers for the list, then the jump
                            into the cards. */}
                        <dl className="mt-6 flex flex-wrap gap-2">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-sm ring-1 ring-white/20 backdrop-blur">
                                <HiStar aria-hidden className="h-4 w-4 text-sun-500" />
                                <dt className="sr-only">Average rating</dt>
                                <dd>
                                    <span className="font-semibold">
                                        {averageRating.toFixed(2)}
                                    </span>{" "}
                                    <span className="text-white/75">
                                        average rating
                                    </span>
                                </dd>
                            </div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-sm ring-1 ring-white/20 backdrop-blur">
                                <HiChatBubbleLeftEllipsis
                                    aria-hidden
                                    className="h-4 w-4 text-sun-500"
                                />
                                <dt className="sr-only">Reviews</dt>
                                <dd>
                                    <span className="font-semibold">
                                        {format.format(totalReviews)}
                                    </span>{" "}
                                    <span className="text-white/75">
                                        reviews behind this list
                                    </span>
                                </dd>
                            </div>
                        </dl>
                        <a
                            href="#programs"
                            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sun-500 px-6 py-3 font-semibold text-cobalt-700 transition-colors hover:bg-sun-300"
                        >
                            See the {programs.length}{" "}
                            {programs.length === 1 ? "program" : "programs"}
                            <HiOutlineArrowRight
                                aria-hidden
                                className="h-4 w-4"
                            />
                        </a>
                    </div>
                </div>
            </header>

            {/* An archived year: the doc's summary is written for the current
                list, so instead a slim strip fixed to the foot of the hero
                says which year this is and points to the current list. */}
            {!isCurrent && (
                <div className="w-full bg-cobalt-600 text-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between xl:px-0">
                        <p className="flex items-start gap-3 text-sm leading-relaxed sm:items-center">
                            <HiArchiveBox
                                aria-hidden
                                className="mt-0.5 h-5 w-5 shrink-0 text-sun-500 sm:mt-0"
                            />
                            <span>
                                <span className="font-semibold">
                                    You&rsquo;re looking at the {listYear}{" "}
                                    list.
                                </span>{" "}
                                <span className="text-white/80">
                                    These programs earned the badge from
                                    reviews submitted in the year before{" "}
                                    {listYear}.
                                </span>
                            </span>
                        </p>
                        <Link
                            href={directoryPath(directory)}
                            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-cobalt-700 transition-colors hover:bg-sun-500"
                        >
                            See the {year} list
                            <HiOutlineArrowRight
                                aria-hidden
                                className="h-4 w-4"
                            />
                        </Link>
                    </div>
                </div>
            )}

            {isCurrent && (
                /* The current list only. The doc's summary, as one block, verbatim: the paragraphs at
                   one body size (Jezi's call), and the closing one-liner
                   ("Ready to…?") as a sun-ruled callout into the cards. Beside
                   it, a card with the badge the programs earned and what it
                   takes to earn it — page furniture drawn from the methodology
                   paragraph, so the section has a picture and not just prose. */
                <section className="w-full bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 xl:px-0">
                        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
                            <div>
                                <p className="text-sm font-semibold tracking-widest uppercase text-cobalt-500">
                                    About this list
                                </p>
                                {directory.summary.map((paragraph, i) => {
                                    const isClosing =
                                        i === directory.summary.length - 1 &&
                                        paragraph.length < 120;
                                    const className = isClosing
                                        ? "mt-8 border-l-4 border-sun-500 pl-5 text-xl leading-snug font-semibold text-neutral-900 sm:text-2xl"
                                        : `${i === 0 ? "mt-4" : "mt-5"} text-lg leading-relaxed text-slate-600`;
                                    return (
                                        <p key={i} className={className}>
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>

                            <aside
                                aria-label="How programs earn the badge"
                                className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200"
                            >
                                <div className="relative overflow-hidden bg-linear-to-br from-slate-200 to-slate-100 px-6 pt-8 pb-6">
                                    <div
                                        aria-hidden
                                        className="absolute inset-0 [background-image:radial-gradient(circle,rgba(2,61,88,0.14)_1.5px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_50%_100%,black_20%,transparent_75%)]"
                                    />
                                    <div
                                        aria-hidden
                                        className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-500/25 blur-2xl"
                                    />
                                    <TopRatedBadge
                                        year={year}
                                        className="relative mx-auto w-28 drop-shadow-xl"
                                    />
                                </div>
                                <div className="px-6 pt-5 pb-7 sm:px-7">
                                    <p className="text-xs font-semibold tracking-widest uppercase text-cobalt-500">
                                        How programs earn it
                                    </p>
                                    <ul className="mt-4 space-y-3.5">
                                        {badgeCriteria.map((criterion) => (
                                            <li
                                                key={criterion}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt-500 text-white">
                                                    <HiCheck
                                                        aria-hidden
                                                        className="h-3.5 w-3.5"
                                                    />
                                                </span>
                                                <span className="text-sm leading-relaxed text-slate-700">
                                                    {criterion}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            )}

            {/* Program cards — H2s, per the doc. */}
            <section id="programs" className="w-full scroll-mt-24 bg-slate-100">
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    <p className="text-sm font-semibold tracking-widest uppercase text-cobalt-500">
                        Top Rated {directory.cardTitle} Programs of {listYear}
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
                        {programs.length}{" "}
                        {programs.length === 1 ? "program" : "programs"} earned
                        the badge {isCurrent ? "this year" : `in ${listYear}`}
                    </p>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program, i) => (
                            <ProgramCard
                                key={program.id}
                                program={program}
                                priority={i < 3}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* This directory's lists from other years — the requirement
                added after the doc. On the current page: the archive years;
                on an archived page: the current list first, then the rest. */}
            <section className="w-full bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 xl:px-0">
                    <SectionHead
                        kicker={isCurrent ? "Archive" : "Other years"}
                        title={`Top Rated ${directory.cardTitle} Programs from ${
                            isCurrent ? "Previous Years" : "Other Years"
                        }`}
                    />
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {otherYears.map((y) => (
                            <li key={y}>
                                <YearCard
                                    year={y}
                                    title={titleForYear(directory, y)}
                                    href={directoryPath(directory, y)}
                                    current={y === year}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* The other ten directories (this one left out) as the main
                page's own compact postcards, in the shared slider four per
                view — one category card across both pages (Jezi's pick) —
                with the way back to the main page beside the arrows. */}
            <section className="w-full bg-slate-100">
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 xl:px-0">
                    <CardSlider
                        label="categories"
                        perView={4}
                        header={
                            <SectionHead
                                kicker="More Top Rated Programs"
                                title="Explore other categories"
                            />
                        }
                        aside={
                            <Link
                                href="/top-rated-providers-programs"
                                className="hidden items-center gap-2 text-sm font-semibold text-cobalt-500 transition-colors hover:text-cobalt-600 md:inline-flex"
                            >
                                <HiOutlineArrowLeft
                                    aria-hidden
                                    className="h-4 w-4"
                                />
                                All {pageTitle.replace("GoAbroad ", "")}
                            </Link>
                        }
                    >
                        {others.map((other) => (
                            <DirectoryCard
                                key={other.id}
                                directory={other}
                                programCount={topRatedPrograms[other.id].length}
                                year={year}
                            />
                        ))}
                    </CardSlider>
                    <Link
                        href="/top-rated-providers-programs"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cobalt-500 transition-colors hover:text-cobalt-600 md:hidden"
                    >
                        <HiOutlineArrowLeft aria-hidden className="h-4 w-4" />
                        All {pageTitle.replace("GoAbroad ", "")}
                    </Link>
                </div>
            </section>

            <NextSteps />
        </div>
    );
}
