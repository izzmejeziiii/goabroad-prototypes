import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import ArchiveArticles from "../components/top-rated/archive-articles";
import TopRatedBadge from "../components/top-rated/badge";
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
    sections,
    topRatedPrograms,
    year,
} from "../components/top-rated/data";
import DirectoryCard from "../components/top-rated/directory-card";
import Hero from "../components/top-rated/hero";
import HowItWorks from "../components/top-rated/how-it-works";
import NextSteps from "../components/top-rated/next-steps";
import ProviderCard, { NotableCard } from "../components/top-rated/provider-card";
import SectionHead from "../components/top-rated/section-head";
import SectionNav from "../components/top-rated/section-nav";

export const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
};

export default function TopRatedProvidersProgramsPage() {
    return (
        <div className="w-full bg-white">
            <Hero />

            <SectionNav
                items={sections}
                label="Top Rated Providers and Programs sections"
            />

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
                    <SectionHead
                        kicker={programsSection.kicker}
                        title={programsSection.heading}
                        as="h3"
                    />
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                        {programsSection.paragraph}
                    </p>
                    <p className="mt-8 max-w-3xl text-lg font-semibold text-neutral-800">
                        {programsSection.lead}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {directories.map((directory) => (
                            <DirectoryCard
                                key={directory.id}
                                directory={directory}
                                programCount={topRatedPrograms[directory.id].length}
                                year={year}
                            />
                        ))}
                        {/* Eleven cards leave a hole at the end of the grid —
                            a badge card closes it rather than a gap. */}
                        <div
                            aria-hidden
                            className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-cobalt-500/30 bg-slate-100 p-6 text-center"
                        >
                            <TopRatedBadge
                                year={year}
                                className="w-[40%] drop-shadow-md"
                            />
                            <p className="text-sm leading-snug font-semibold text-cobalt-700 sm:text-base">
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
                    <SectionHead
                        kicker={providersSection.kicker}
                        title={providersSection.heading}
                        as="h3"
                    />
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                        {providersSection.paragraphBefore}
                        <strong className="font-semibold text-neutral-800">
                            {providersSection.paragraphBold}
                        </strong>
                        {providersSection.paragraphAfter}
                    </p>

                    <div className="mt-12">
                        {providerGroups.map((group, index) => {
                            const directory = getDirectory(group.directoryId);
                            if (!directory?.providersHeading) return null;
                            return (
                                <div
                                    key={group.directoryId}
                                    className={
                                        index > 0
                                            ? "mt-14 border-t border-slate-200 pt-14"
                                            : ""
                                    }
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        <div>
                                            <h4 className="text-xl font-bold tracking-tight text-neutral-800 sm:text-2xl">
                                                {directory.providersHeading}
                                            </h4>
                                            <Link
                                                href={`/top-rated-providers-programs/${directory.id}`}
                                                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-500 transition-colors hover:text-cobalt-600"
                                            >
                                                See the Top Rated{" "}
                                                {directory.cardTitle.replace(
                                                    / Programs$/,
                                                    "",
                                                )}{" "}
                                                Programs
                                                <HiOutlineArrowRight
                                                    aria-hidden
                                                    className="h-4 w-4"
                                                />
                                            </Link>
                                        </div>
                                        {directory.badge && (
                                            <Image
                                                src={badgeUrl(directory.badge)}
                                                alt={`GoAbroad Top Rated Provider ${year} – ${directory.cardTitle} badge`}
                                                width={75}
                                                height={80}
                                                className="h-20 w-auto shrink-0"
                                            />
                                        )}
                                    </div>
                                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {group.providers.map((alias, rank) => {
                                            const provider = providers[alias];
                                            if (!provider) return null;
                                            return (
                                                <ProviderCard
                                                    key={alias}
                                                    provider={provider}
                                                    rank={rank + 1}
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
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <h4 className="text-xl font-bold tracking-tight text-neutral-800 sm:text-2xl">
                                        {providersSection.notableHeading}
                                    </h4>
                                    <p className="mt-2 text-sm text-slate-500">
                                        {notableMentions.length} providers
                                    </p>
                                </div>
                                <Image
                                    src={badgeUrl(providersSection.notableBadge)}
                                    alt={`GoAbroad Top Rated Provider ${year} – Notable Mention badge`}
                                    width={80}
                                    height={80}
                                    className="h-20 w-auto shrink-0"
                                />
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                                {notableMentions.map((alias) => {
                                    const provider = providers[alias];
                                    if (!provider) return null;
                                    return (
                                        <NotableCard
                                            key={alias}
                                            provider={provider}
                                        />
                                    );
                                })}
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
                    <SectionHead
                        kicker={previousYearsSection.kicker}
                        title={previousYearsSection.heading}
                    />
                    <div className="mt-10">
                        <ArchiveArticles links={previousYears} />
                    </div>
                </div>
            </section>

            <NextSteps id="next-steps" />
        </div>
    );
}
