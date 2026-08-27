import type { Metadata } from "next";
import {
    HiCheckCircle,
    HiOutlineArrowRight,
    HiOutlineEnvelope,
    HiXCircle,
} from "react-icons/hi2";
import Breadcrumbs from "../components/reusable/breadcrumbs";
import {
    commitment,
    coreValues,
    intro,
    pageTitle,
    programSelection,
    publishing,
    purpose,
    sections,
    writers,
} from "../components/editorial-guidelines/data";
import HeroIllustration from "../components/editorial-guidelines/hero-illustration";
import { GuidelineIcon } from "../components/editorial-guidelines/icons";
import SectionNav from "../components/editorial-guidelines/section-nav";
import TrustIllustration from "../components/editorial-guidelines/trust-illustration";
import {
    PurposeIllustration,
    ValuesCompass,
    WritersIllustration,
} from "../components/editorial-guidelines/section-illustrations";

export const metadata: Metadata = {
    title: "Editorial Guidelines | GoAbroad Prototypes",
    description:
        "The principles that guide everything published on GoAbroad.com — our purpose, editorial values, what we publish, how we feature programs, and who writes for us.",
};

/* Kicker + heading, the same rhythm every section on /ads-specs uses: small
   uppercase cobalt kicker (sun on the dark band), bold heading under it. */
function SectionHead({
    kicker,
    title,
    tone = "light",
}: {
    kicker: string;
    title: string;
    tone?: "light" | "dark";
}) {
    const dark = tone === "dark";
    return (
        <>
            <p
                className={`text-sm font-semibold tracking-widest uppercase ${
                    dark ? "text-sun-500" : "text-cobalt-500"
                }`}
            >
                {kicker}
            </p>
            <h2
                className={`mt-1 text-2xl font-bold tracking-tight sm:text-3xl ${
                    dark ? "text-white" : "text-neutral-800"
                }`}
            >
                {title}
            </h2>
        </>
    );
}

export default function EditorialGuidelinesPage() {
    const [
        purposeSection,
        valuesSection,
        publishSection,
        programsSection,
        writersSection,
        commitmentSection,
    ] = sections;
    const teamCard = writers.contributors.find((c) => c.featured);
    const otherContributors = writers.contributors.filter((c) => !c.featured);

    return (
        <div className="w-full bg-white">
            {/* Hero — the /mygoabroad redesign pattern: light slate band,
                cobalt kicker, dark headline, illustration column on the right. */}
            <header className="w-full overflow-hidden bg-slate-100">
                <Breadcrumbs
                    link="editorial-guidelines"
                    page="Editorial Guidelines"
                />
                <div className="mx-auto max-w-7xl px-4 xl:px-0">
                    <div className="flex flex-col-reverse md:flex-row md:items-stretch">
                        <div className="flex flex-1 flex-col items-start pt-6 pb-10 text-left md:justify-center md:py-12 md:pr-12">
                            <h1 className="text-4xl leading-tight font-bold text-neutral-900 lg:text-5xl">
                                {pageTitle}
                            </h1>
                        </div>
                        <div className="hidden shrink-0 md:block md:w-[45%] md:self-stretch md:py-8">
                            <div className="flex h-full w-full items-center justify-center">
                                <HeroIllustration className="h-auto w-full max-w-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <SectionNav sections={sections} />

            {/* The document's opening statement. Unnumbered and absent from the
                jump strip: it introduces the six principles rather than being
                one of them. */}
            <section className="w-full bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 xl:px-0">
                    {/* Centred, unlike every numbered section below it — this is
                        the page's opening statement, so it gets its own shape.
                        Left-aligned on phones, where centred body copy is hard
                        to read at that measure. */}
                    <div className="flex flex-col items-center text-left sm:text-center">
                        <TrustIllustration className="hidden h-auto w-full max-w-[280px] sm:block" />
                        <div className="mt-8 max-w-3xl">
                            <SectionHead
                                kicker={intro.kicker}
                                title={intro.heading}
                            />
                            <p className="mt-6 text-lg leading-relaxed text-slate-600">
                                {intro.paragraphs[0]}
                            </p>
                            <p className="mt-4 leading-relaxed text-slate-600">
                                {intro.paragraphs[1]}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 01 — Our Purpose */}
            <section
                id={purposeSection.id}
                className="w-full scroll-mt-24 bg-white"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                        <div className="flex-1">
                            <SectionHead
                                kicker={purposeSection.kicker}
                                title={purposeSection.title}
                            />
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                                {purpose.paragraphs[0]}
                            </p>
                            <p className="mt-8 max-w-2xl rounded-xl border-l-4 border-sun-500 bg-slate-50 px-6 py-5 text-lg leading-relaxed font-medium text-neutral-800">
                                {purpose.paragraphs[1]}
                            </p>
                        </div>
                        <div className="hidden shrink-0 lg:block lg:w-[36%]">
                            <PurposeIllustration className="mx-auto h-auto w-full max-w-sm" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 02 — Our Core Editorial Values */}
            <section
                id={valuesSection.id}
                className="w-full scroll-mt-24 bg-slate-100"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    <SectionHead
                        kicker={valuesSection.kicker}
                        title={valuesSection.title}
                    />
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {coreValues.map((value) => (
                            <div
                                key={value.id}
                                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-cobalt-500">
                                    <GuidelineIcon
                                        name={value.icon}
                                        className="h-6 w-6"
                                    />
                                </span>
                                <h3 className="text-lg font-semibold text-neutral-800">
                                    {value.name}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-500">
                                    {value.text}
                                </p>
                            </div>
                        ))}
                        {/* Five values leave a hole at the end of the grid —
                            a compass tile closes it rather than a gap. */}
                        <div
                            aria-hidden
                            className="hidden items-center justify-center rounded-xl bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500 p-8 sm:flex"
                        >
                            <ValuesCompass className="h-auto w-full max-w-[190px]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 03 — What We Publish, and What We Don’t */}
            <section
                id={publishSection.id}
                className="w-full scroll-mt-24 bg-white"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    <SectionHead
                        kicker={publishSection.kicker}
                        title={publishSection.title}
                    />
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-fern-200 bg-fern-500/5 p-7">
                            <p className="text-lg font-semibold text-neutral-800">
                                {publishing.doLead}
                            </p>
                            <ul className="mt-5 space-y-4">
                                {publishing.doItems.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-3 leading-relaxed text-slate-600"
                                    >
                                        <HiCheckCircle
                                            aria-hidden
                                            className="mt-0.5 h-5 w-5 shrink-0 text-fern-600"
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-roman-200 bg-roman-500/5 p-7">
                            <p className="text-lg font-semibold text-neutral-800">
                                {publishing.dontLead}
                            </p>
                            <ul className="mt-5 space-y-4">
                                {publishing.dontItems.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-3 leading-relaxed text-slate-600"
                                    >
                                        <HiXCircle
                                            aria-hidden
                                            className="mt-0.5 h-5 w-5 shrink-0 text-roman-600"
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 04 — How We Select and Feature Programs */}
            <section
                id={programsSection.id}
                className="w-full scroll-mt-24 bg-slate-100"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                        <div className="flex-1">
                            <SectionHead
                                kicker={programsSection.kicker}
                                title={programsSection.title}
                            />
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                                {programSelection.opening}
                            </p>
                        </div>
                        {/* The highlight takes the illustration's slot beside
                            the description instead of stacking under it — as an
                            aside to the standard rather than the next, louder
                            thing the reader hits. */}
                        <p className="shrink-0 rounded-xl border-l-4 border-cobalt-500 bg-white px-6 py-5 leading-relaxed font-medium text-neutral-800 shadow-sm lg:w-[40%]">
                            {programSelection.callout}
                        </p>
                    </div>
                    {/* Sub-lead for the grid: weighted so it reads as the
                        heading of the criteria rather than as a third body
                        paragraph indistinguishable from the two around it. */}
                    <p className="mt-12 max-w-3xl text-lg font-semibold text-neutral-800">
                        {programSelection.criteriaLead}
                    </p>
                    {/* Two columns rather than five full-width rows: it halves
                        the measure (those rows ran to ~1150px), drops the
                        trailing whitespace on the short criteria, and the last
                        one spans both so the grid ends flush. Icon sits beside
                        the label here, not above it, so this reads differently
                        from the values and contributor grids. */}
                    <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                        {programSelection.criteria.map((criterion, i) => (
                            <li
                                key={criterion.label}
                                className={`rounded-xl border border-slate-200 bg-white p-6 ${
                                    i === programSelection.criteria.length - 1
                                        ? "sm:col-span-2"
                                        : ""
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-cobalt-500">
                                        <GuidelineIcon
                                            name={criterion.icon}
                                            className="h-5 w-5"
                                        />
                                    </span>
                                    <h3 className="font-semibold text-neutral-800">
                                        {criterion.label}
                                    </h3>
                                </div>
                                <p className="mt-3 leading-relaxed text-slate-600">
                                    {criterion.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                    {/* Plain prose, so the highlight up beside the description
                        stays the section's only emphasised block. Full width,
                        squaring up with the criteria grid above it. */}
                    <p className="mt-8 leading-relaxed text-slate-600">
                        {programSelection.closing}
                    </p>
                </div>
            </section>

            {/* 05 — Who Writes for GoAbroad */}
            <section
                id={writersSection.id}
                className="w-full scroll-mt-24 bg-white"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                        <div className="flex-1">
                            <SectionHead
                                kicker={writersSection.kicker}
                                title={writersSection.title}
                            />
                            <h3 className="mt-6 text-xl font-bold text-cobalt-500 sm:text-2xl">
                                {writers.heading}
                            </h3>
                            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                                {writers.lead}
                            </p>
                        </div>
                        <div className="hidden shrink-0 lg:block lg:w-[34%]">
                            <WritersIllustration className="mx-auto h-auto w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {otherContributors.map((contributor) => (
                            <div
                                key={contributor.label}
                                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-cobalt-500">
                                    <GuidelineIcon
                                        name={contributor.icon}
                                        className="h-6 w-6"
                                    />
                                </span>
                                <h4 className="text-lg font-semibold text-neutral-800">
                                    {contributor.label}
                                </h4>
                                <p className="text-sm leading-relaxed text-slate-500">
                                    {contributor.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    {teamCard && (
                        <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500 p-7 sm:flex-row sm:gap-7 sm:p-9">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                                <GuidelineIcon
                                    name={teamCard.icon}
                                    className="h-6 w-6"
                                />
                            </span>
                            <div className="min-w-0">
                                <h4 className="text-lg font-semibold text-white">
                                    {teamCard.label}
                                </h4>
                                <p className="mt-2 leading-relaxed text-white/80">
                                    {teamCard.text}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 06 — Our Commitment to You. Full-bleed closing band on the
                cobalt gradient, bookending the light hero and running flush
                into the footer. */}
            <section
                id={commitmentSection.id}
                className="w-full scroll-mt-24 bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    {/* The promise on the left, the way to hold us to it on the
                        right. The heading lives inside the left column so the
                        panel centres against the whole column rather than
                        hanging off the bottom of the paragraphs. Splitting at
                        `md` would squeeze the panel too narrow, so it waits for
                        `lg` and stacks until then. */}
                    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12">
                        <div>
                            <SectionHead
                                kicker={commitmentSection.kicker}
                                title={commitmentSection.title}
                                tone="dark"
                            />
                            <p className="mt-6 text-lg leading-relaxed text-white/90">
                                {commitment.paragraphs[0]}
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-white/80">
                                {commitment.paragraphs[1]}
                            </p>
                        </div>

                        {/* Translucent rather than a solid white card, so it
                            reads as part of the gradient instead of a hole
                            punched in it. The whole panel is the mailto, so the
                            email is a span, not a nested link. */}
                        <a
                            href={`mailto:${commitment.contactEmail}`}
                            className="group flex flex-col gap-5 rounded-2xl bg-white/10 p-6 ring-1 ring-white/20 transition-colors hover:bg-white/15 hover:ring-white/40 sm:p-7"
                        >
                            <span className="flex items-start gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
                                    <HiOutlineEnvelope
                                        aria-hidden
                                        className="h-6 w-6"
                                    />
                                </span>
                                <span className="text-lg leading-snug font-semibold text-white">
                                    {commitment.contactQuestion}
                                </span>
                            </span>
                            <span className="flex items-center gap-4">
                                <span className="flex-1 text-lg leading-relaxed text-white/80">
                                    {commitment.contactAction}{" "}
                                    <span className="font-semibold text-white underline decoration-sun-500 decoration-2 underline-offset-4">
                                        {commitment.contactEmail}
                                    </span>
                                    .
                                </span>
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-cobalt-500 transition-transform group-hover:translate-x-1">
                                    <HiOutlineArrowRight
                                        aria-hidden
                                        className="h-5 w-5"
                                    />
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
