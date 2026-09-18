import type { IconType } from "react-icons";
import {
    HiOutlineArrowRight,
    HiOutlineBookmarkSquare,
    HiOutlineNewspaper,
    HiOutlineSparkles,
} from "react-icons/hi2";
import TopRatedBadge from "./badge";
import { nextStepsSection, providerCta, year, type TextSegment } from "./data";
import SectionHead from "./section-head";

/* Page furniture around the doc's copy: a warmer lead under the heading, and
   a short title plus icon per step, drawn from each sentence's own verbs
   (find/save/compare, match, stay inspired). The sentences themselves are
   the doc's, verbatim. */
const lead =
    "You've just met the providers and programs real travelers rated highest. Here's how to turn that into a trip of your own.";

const stepMeta: { title: string; icon: IconType }[] = [
    { title: "Find, save, compare", icon: HiOutlineBookmarkSquare },
    { title: "Get matched", icon: HiOutlineSparkles },
    { title: "Stay inspired", icon: HiOutlineNewspaper },
];

type LinkSegment = Exclude<TextSegment, string>;

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* The doc's sentence with its linked phrases set in bold; the links move to
   the buttons beneath, so each step has something to press. */
function Sentence({ segments }: { segments: TextSegment[] }) {
    return (
        <>
            {segments.map((segment, i) =>
                typeof segment === "string" ? (
                    <span key={i}>{segment}</span>
                ) : (
                    <strong key={i} className="font-semibold text-neutral-900">
                        {segment.text}
                    </strong>
                ),
            )}
        </>
    );
}

/* One next step as an action card: three in a row at equal height, with a
   sun arrow on each card's right edge carrying the eye to the next. The
   ghost numeral in the corner is the only step number (Jezi asked for the
   stair-step offsets and the small "01" kicker to go). */
function StepCard({
    segments,
    index,
    last,
}: {
    segments: TextSegment[];
    index: number;
    last: boolean;
}) {
    const { title, icon: Icon } = stepMeta[index] ?? {
        title: `Step ${index + 1}`,
        icon: HiOutlineSparkles,
    };
    const links = segments.filter(
        (s): s is LinkSegment => typeof s !== "string",
    );
    return (
        <li className="relative transition-transform hover:-translate-y-1">
            {/* The card body clips the ghost numeral; the arrow sits outside
                it so it can overhang the edge. */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-xl shadow-cobalt-700/25 sm:p-7">
                <span
                    aria-hidden
                    className="pointer-events-none absolute -top-3 right-4 text-8xl leading-none font-black text-slate-100 select-none tabular-nums"
                >
                    0{index + 1}
                </span>

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-sun-500 text-cobalt-700">
                    <Icon aria-hidden className="h-7 w-7" />
                </span>
                <h3 className="relative mt-6 text-2xl font-bold tracking-tight text-neutral-900">
                    <span className="sr-only">Step {index + 1}: </span>
                    {title}
                </h3>
                <p className="relative mt-3 leading-relaxed text-slate-600">
                    <Sentence segments={segments} />
                </p>
                <div className="relative mt-auto flex flex-col gap-2.5 pt-7">
                    {links.map((link, i) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener"
                            className={`group inline-flex items-center justify-between gap-3 rounded-lg px-5 py-3 font-semibold transition-colors ${
                                i === 0
                                    ? "bg-cobalt-500 text-white hover:bg-cobalt-600"
                                    : "border border-cobalt-500 text-cobalt-500 hover:bg-slate-50"
                            }`}
                        >
                            {link.cta ?? capitalise(link.text)}
                            <HiOutlineArrowRight
                                aria-hidden
                                className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                            />
                        </a>
                    ))}
                </div>
            </div>

            {/* Arrow into the next step: off the right edge when the cards
                sit in a row, off the bottom edge (pointing down) when they
                stack on phones. */}
            {!last && (
                <>
                    <span
                        aria-hidden
                        className="absolute top-1/2 -right-4 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-sun-500 text-cobalt-700 shadow-md ring-4 ring-cobalt-600 md:flex"
                    >
                        <HiOutlineArrowRight className="h-4 w-4" />
                    </span>
                    <span
                        aria-hidden
                        className="absolute -bottom-4 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-sun-500 text-cobalt-700 shadow-md ring-4 ring-cobalt-600 md:hidden"
                    >
                        <HiOutlineArrowRight className="h-4 w-4 rotate-90" />
                    </span>
                </>
            )}
        </li>
    );
}

/* Closing band on the cobalt gradient, bookending the hero. A warm lead, the
   doc's three next steps as a row of action cards with real buttons,
   and the provider call-out beneath carrying the badge a provider would be
   working towards. Shared by the main page and every directory page. */
export default function NextSteps({ id }: { id?: string }) {
    const steps = nextStepsSection.items;
    return (
        <section
            id={id}
            className="relative w-full scroll-mt-24 overflow-hidden bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500"
        >
            <div
                aria-hidden
                className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.12)_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_90%_0%,black_5%,transparent_55%)]"
            />
            <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                <div className="max-w-2xl">
                    <SectionHead
                        kicker={nextStepsSection.kicker}
                        title={nextStepsSection.heading}
                        tone="dark"
                    />
                    <p className="mt-5 text-lg leading-relaxed text-white/80">
                        {lead}
                    </p>
                </div>

                <ol className="mt-12 grid gap-8 md:grid-cols-3">
                    {steps.map((segments, i) => (
                        <StepCard
                            key={i}
                            segments={segments}
                            index={i}
                            last={i === steps.length - 1}
                        />
                    ))}
                </ol>

                {/* For providers, laid out to the reviewer's mock: next
                    year's badge (the one a provider would be earning), a
                    bold headline, a lighter line under it, and a sun "Get
                    started" button. The whole banner is the link. */}
                <a
                    href={providerCta.href}
                    target="_blank"
                    rel="noopener"
                    className="group mt-12 flex flex-col gap-6 rounded-2xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/15 hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
                >
                    {/* Badge above the words on phones, beside them from sm. */}
                    <span className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                        <TopRatedBadge
                            year={year + 1}
                            className="w-16 shrink-0 drop-shadow-lg transition-transform group-hover:-rotate-3 sm:w-20"
                        />
                        <span>
                            <span className="block text-xs font-semibold tracking-widest uppercase text-sun-500">
                                For providers
                            </span>
                            <h3 className="mt-1 text-xl leading-snug font-bold text-white sm:text-2xl">
                                {providerCta.heading}
                            </h3>
                            <span className="mt-1.5 block text-sm leading-relaxed text-white/80 sm:text-base">
                                {providerCta.subheading}
                            </span>
                        </span>
                    </span>
                    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-sun-500 px-6 py-3 font-semibold text-cobalt-700 transition-colors group-hover:bg-sun-300">
                        {providerCta.linkText}
                        <HiOutlineArrowRight
                            aria-hidden
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                    </span>
                </a>
            </div>
        </section>
    );
}
