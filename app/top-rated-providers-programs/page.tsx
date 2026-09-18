import type { Metadata } from "next";
import Image from "next/image";
import { HiChatBubbleLeftEllipsis, HiCheckBadge, HiStar } from "react-icons/hi2";
import ArchiveTimeline from "../components/top-rated/archive-timeline";
import BackToTop from "../components/top-rated/back-to-top";
import TopRatedBadge from "../components/top-rated/badge";
import CardSlider from "../components/top-rated/card-slider";
import { badgeUrl } from "../components/top-rated/cdn";
import {
    directories,
    getDirectory,
    meta,
    notableMentions,
    previousYears,
    previousYearsSection,
    programsSection,
    providerGroups,
    providers,
    providersSection,
    topRatedPrograms,
    year,
} from "../components/top-rated/data";
import DirectoryCard from "../components/top-rated/directory-card";
import Hero from "../components/top-rated/hero";
import HowItWorks from "../components/top-rated/how-it-works";
import NextSteps from "../components/top-rated/next-steps";
import ProgramBadge from "../components/top-rated/program-badge";
import ProviderCard from "../components/top-rated/provider-card";
import ProviderSideNav, {
    type SideNavItem,
} from "../components/top-rated/provider-side-nav";
import RankLegend from "../components/top-rated/rank-legend";
import SectionHead from "../components/top-rated/section-head";

export const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
};

const format = new Intl.NumberFormat("en-US");

/* Every directory's Top Rated Programs together, for the figures beside the
   programs heading (the hero's figures are the providers'). */
const allPrograms = Object.values(topRatedPrograms).flat();
const programAverage =
    allPrograms.reduce((sum, p) => sum + p.rating, 0) / allPrograms.length;
const programReviews = allPrograms.reduce((sum, p) => sum + p.reviews, 0);

/* Jump links for the providers section: one per directory group (matching
   the `providers-<id>` anchors below), then the notable mentions. Category
   level only — the winners under each change every year. */
const sideNavItems: SideNavItem[] = [
    ...providerGroups.flatMap((group) => {
        const directory = getDirectory(group.directoryId);
        return directory?.providersHeading
            ? [
                  {
                      id: `providers-${group.directoryId}`,
                      label: directory.cardTitle,
                      icon: directory.icon,
                  },
              ]
            : [];
    }),
    { id: "notable-mentions", label: "Notable Mentions" },
];

export default function TopRatedProvidersProgramsPage() {
    return (
        <div className="w-full bg-white">
            <Hero />

            {/* What the awards are; the CTA jumps past the program cards to
                the provider list, as the doc specifies. */}
            <HowItWorks />

            {/* Top Rated Programs — one card per directory, each linking to
                that directory's list of winners. */}
            <section
                id="top-rated-programs"
                className="w-full scroll-mt-24 bg-slate-100"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    {/* Head as two columns from lg: the doc's copy left, and
                        this year's program figures right so the row doesn't
                        trail off into blank space. */}
                    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
                        <div>
                            <SectionHead
                                kicker={programsSection.kicker}
                                title={programsSection.heading}
                                as="h3"
                            />
                            <p className="mt-6 text-lg leading-relaxed text-slate-600">
                                {programsSection.paragraph}
                            </p>
                            <p className="mt-6 text-lg font-semibold text-neutral-800">
                                {programsSection.lead}
                            </p>
                        </div>
                        {/* The figures on a cobalt panel — the hero's dotted
                            field and glass tiles, so the card carries the
                            page's colour into the section instead of a plain
                            table. (A slate-800 version was tried and
                            reverted.) */}
                        <aside
                            aria-label={`The ${year} Top Rated Programs at a glance`}
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
                                The {year} list at a glance
                            </p>
                            <dl className="relative mt-6 space-y-5">
                                {[
                                    {
                                        icon: HiCheckBadge,
                                        value: format.format(
                                            allPrograms.length,
                                        ),
                                        label: "programs earned the badge",
                                    },
                                    {
                                        icon: HiStar,
                                        value: programAverage.toFixed(2),
                                        label: "average rating across them",
                                    },
                                    {
                                        icon: HiChatBubbleLeftEllipsis,
                                        value: format.format(programReviews),
                                        label: "verified reviews behind them",
                                    },
                                ].map(({ icon: Icon, value, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-4"
                                    >
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sun-500 ring-1 ring-white/20 backdrop-blur">
                                            <Icon
                                                aria-hidden
                                                className="h-6 w-6"
                                            />
                                        </span>
                                        <div className="flex flex-col-reverse">
                                            <dt className="mt-0.5 text-sm text-white/75">
                                                {label}
                                            </dt>
                                            <dd className="text-3xl leading-none font-bold tabular-nums">
                                                {value}
                                            </dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>
                        </aside>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {directories.map((directory) => (
                            <DirectoryCard
                                key={directory.id}
                                directory={directory}
                                programCount={
                                    topRatedPrograms[directory.id].length
                                }
                                year={year}
                            />
                        ))}
                        {/* Eleven cards leave a hole at the end of the grid —
                            a badge card closes it rather than a gap. It
                            carries the Top Rated PROGRAMS badge (this is the
                            programs section) with the live year. */}
                        <div
                            aria-hidden
                            className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-cobalt-500/30 bg-slate-100 p-4 text-center sm:gap-4 sm:p-6"
                        >
                            <ProgramBadge
                                year={year}
                                className="w-[42%] drop-shadow-md sm:w-[46%]"
                            />
                            {/* Sized so this card never sets its row taller
                                than the category cards beside it. */}
                            <p className="text-xs leading-snug font-semibold text-cobalt-700 sm:text-base">
                                Every badge is earned from verified participant
                                reviews.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Rated Providers — the doc's ten H4 groups, three ranked
                providers each, then the notable mentions. */}
            <section
                id="top-rated-providers"
                className="w-full scroll-mt-24 bg-white"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    {/* Head as two columns from lg: the doc's copy left, and a
                        podium legend of how the list is ranked right, plus
                        the notable mentions. */}
                    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
                        <div>
                            <SectionHead
                                kicker={providersSection.kicker}
                                title={providersSection.heading}
                                as="h3"
                            />
                            <p className="mt-6 text-lg leading-relaxed text-slate-600">
                                {providersSection.paragraphBefore}
                                <strong className="font-semibold text-neutral-800">
                                    {providersSection.paragraphBold}
                                </strong>
                                {providersSection.paragraphAfter}
                            </p>
                        </div>
                        <RankLegend categoryCount={providerGroups.length} />
                    </div>

                    {/* The list itself: a sticky side rail of jump links
                        (one per directory group, then the notable mentions)
                        on the left of the groups from lg up — the right edge
                        already belongs to the legend card above. On smaller
                        screens the rail is a fixed tab strip that appears
                        only while the groups are on screen, so it takes no
                        room here. */}
                    <div className="mt-12 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start lg:gap-12">
                        <ProviderSideNav items={sideNavItems} />
                        <div>
                            {providerGroups.map((group, index) => {
                                const directory = getDirectory(group.directoryId);
                                if (!directory?.providersHeading) return null;
                                return (
                                    <div
                                        key={group.directoryId}
                                        id={`providers-${group.directoryId}`}
                                        className={`scroll-mt-24 ${
                                            index > 0
                                                ? "mt-14 border-t border-slate-200 pt-14"
                                                : ""
                                        }`}
                                    >
                                        {/* Heading and this category's badge.
                                            A "See the Top Rated … Programs"
                                            link used to sit under the heading;
                                            it read as "more providers" on
                                            phones, so it is gone (reviewer).
                                            Categories without a dated badge on
                                            the CDN use year-less artwork with
                                            the year drawn live (Degree Abroad)
                                            or, failing that, the generic
                                            provider badge (Volunteer Abroad,
                                            until the design team supplies
                                            its artwork). */}
                                        <div className="flex items-center justify-between gap-6">
                                            <h4 className="text-xl font-bold tracking-tight text-neutral-800 sm:text-2xl">
                                                {directory.providersHeading}
                                            </h4>
                                            {directory.badge ? (
                                                <Image
                                                    src={badgeUrl(directory.badge)}
                                                    alt={`GoAbroad Top Rated Provider ${year} – ${directory.cardTitle} badge`}
                                                    width={75}
                                                    height={80}
                                                    className="h-20 w-auto shrink-0"
                                                />
                                            ) : (
                                                <TopRatedBadge
                                                    year={year}
                                                    variant={directory.badgeVariant}
                                                    label={`GoAbroad Top Rated Provider ${year} – ${directory.cardTitle} badge`}
                                                    className="h-20 w-auto shrink-0"
                                                />
                                            )}
                                        </div>
                                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {group.providers.map((alias) => {
                                                const provider = providers[alias];
                                                if (!provider) return null;
                                                return (
                                                    <ProviderCard
                                                        key={alias}
                                                        provider={provider}
                                                        priority={index === 0}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Notable mentions */}
                            <div
                                id="notable-mentions"
                                className="mt-14 scroll-mt-24 border-t border-slate-200 pt-14"
                            >
                                {/* A slider, like goabroad.com's featured
                                    provider rows: heading, badge, and
                                    previous/next buttons over a snap-
                                    scrolling track of the ten cards — the
                                    same photo cards as the winners, minus
                                    the place pill. */}
                                <CardSlider
                                    label="notable mentions"
                                    header={
                                        <>
                                            <h4 className="text-xl font-bold tracking-tight text-neutral-800 sm:text-2xl">
                                                {providersSection.notableHeading}
                                            </h4>
                                            <p className="mt-2 text-sm text-slate-500">
                                                {notableMentions.length}{" "}
                                                providers
                                            </p>
                                        </>
                                    }
                                    aside={
                                        <Image
                                            src={badgeUrl(
                                                providersSection.notableBadge,
                                            )}
                                            alt={`GoAbroad Top Rated Provider ${year} – Notable Mention badge`}
                                            width={80}
                                            height={80}
                                            className="h-20 w-auto shrink-0"
                                        />
                                    }
                                >
                                    {notableMentions.flatMap((alias) => {
                                        const provider = providers[alias];
                                        return provider
                                            ? [
                                                  <ProviderCard
                                                      key={alias}
                                                      provider={provider}
                                                  />,
                                              ]
                                            : [];
                                    })}
                                </CardSlider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Previous years */}
            <section
                id="previous-years"
                className="w-full scroll-mt-24 bg-slate-100"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    {/* The ten announcements as a clickable timeline, headed
                        by this year's lists (reviewer's request, in place of
                        article cards whose covers were all different). */}
                    <SectionHead
                        kicker={previousYearsSection.kicker}
                        title={previousYearsSection.heading}
                    />
                    <div className="mt-12">
                        <ArchiveTimeline
                            links={previousYears}
                            currentYear={year}
                            currentHref="#top-rated-programs"
                        />
                    </div>
                </div>
            </section>

            <NextSteps id="next-steps" />
            <BackToTop />
        </div>
    );
}
