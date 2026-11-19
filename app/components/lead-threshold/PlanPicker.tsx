"use client";

import { useState } from "react";
import clsx from "clsx";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Radio,
    RadioGroup,
} from "@headlessui/react";
import { FiArrowRight } from "react-icons/fi";
import {
    MdCheck,
    MdCheckCircle,
    MdClose,
    MdLock,
    MdLockOpen,
} from "react-icons/md";
import {
    DEMO_TODAY,
    FREE_LEADS_PER_YEAR,
    currentPlanId,
    lockedLeadCount,
    plans,
    viewableLeads,
    type Plan,
} from "./data";
import { FOCUS_RING, SECONDARY_BUTTON } from "./ui";

/* V2 of "Upgrade to unlock": a plan comparison before the request goes to
   the account manager. Nothing is bought here; the client picks the plan
   they're interested in and the request names it. Built on Headless UI's
   Dialog and RadioGroup (gacom-admin has @headlessui/react too).

   The cards sell the one thing the client came for: each upgrade says how
   many of *their* waiting leads it unlocks (in GoAbroad orange). Above them
   the current plan is spelled out loud: "Basic · Free", the free leads used
   up and the leads locked, in coral, so the gap the upgrade closes is
   obvious. The tiers read left to right as a ladder: header bands deepen
   tier by tier up to Enterprise, a dark cobalt card. Each card is one big
   radio with a "Choose …" footer that turns into "Selected". */

// Disabled reads as "not yet" in slate, rather than a faded sun button whose
// label is hard to read.
const SEND_BUTTON = `inline-flex items-center justify-center gap-2 rounded-lg bg-sun-500 px-5 py-2 text-sm font-semibold text-cobalt-700 transition-colors hover:bg-sun-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${FOCUS_RING}`;

const leadsWord = lockedLeadCount === 1 ? "lead" : "leads";

/* Header bands deepen tier by tier, so the row reads as a ladder up to the
   dark Enterprise card. Sky tints of the brightest cobalt (cobalt-500 tints
   read grey). Literal classes so Tailwind sees them. */
const BAND_TINTS = [
    "bg-cobalt-50/[0.06]",
    "bg-cobalt-50/[0.10]",
    "bg-cobalt-50/[0.15]",
    "bg-cobalt-50/[0.20]",
];

const PlanCard = ({ plan, tier }: { plan: Plan; tier: number }) => {
    const dark = plan.id === "enterprise";
    // The lead line is the unlock pill; the rest are the tier's highlights.
    const features = plan.features.slice(1);

    return (
        // A subgrid of the row's five tracks (name, price, unlock, features,
        // button), so each part lines up across the cards in a row however
        // its text wraps. Every child is placed on its track explicitly,
        // because the band shares the first two. The one column is capped
        // at the card's width (minmax 0) so nothing can stretch the band
        // past the card's edge.
        <Radio
            value={plan.id}
            className={clsx(
                "group relative row-span-5 grid cursor-pointer grid-cols-[minmax(0,1fr)] grid-rows-subgrid gap-y-0 rounded-2xl border p-5 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none data-[focus]:ring-2 data-[focus]:ring-offset-2",
                dark
                    ? "border-cobalt-700 bg-cobalt-700 text-white data-[checked]:ring-2 data-[checked]:ring-sun-500 data-[checked]:ring-offset-2 data-[focus]:ring-sun-500"
                    : "border-slate-200 bg-white hover:border-slate-300 data-[checked]:border-cobalt-500 data-[checked]:shadow-md data-[checked]:ring-1 data-[checked]:ring-cobalt-500 data-[focus]:ring-cobalt-500",
            )}
        >
            {/* The band behind name and price, out to the card's edges */}
            <span
                aria-hidden="true"
                className={clsx(
                    "col-start-1 row-span-2 row-start-1 -mx-5 -mt-5 rounded-t-[15px]",
                    dark
                        ? "bg-white/[0.06]"
                        : BAND_TINTS[Math.min(tier, BAND_TINTS.length - 1)],
                )}
            />

            <div className="relative col-start-1 row-start-1 flex flex-col gap-1">
                <p
                    className={clsx(
                        "text-lg font-bold tracking-tight",
                        dark ? "text-white" : "text-neutral-800",
                    )}
                >
                    {plan.name}
                </p>
                <p
                    className={clsx(
                        "text-sm leading-snug",
                        dark ? "text-white/75" : "text-slate-600",
                    )}
                >
                    {plan.tagline}
                </p>
            </div>

            <p className="relative col-start-1 row-start-2 mt-4 flex flex-wrap items-baseline gap-x-1.5 pb-8">
                <span
                    className={clsx(
                        "font-bold tracking-tight",
                        plan.price.startsWith("$")
                            ? "text-[2rem] leading-none tabular-nums"
                            : "text-xl",
                        dark ? "text-white" : "text-neutral-800",
                    )}
                >
                    {plan.price}
                </span>
                {plan.priceNote && (
                    <span
                        className={clsx(
                            "text-sm font-medium",
                            dark ? "text-white/75" : "text-slate-600",
                        )}
                    >
                        {plan.priceNote}
                    </span>
                )}
            </p>

            {/* The reason to upgrade, in the client's own numbers, as a pill
                pinned across the band's edge. The lock opens as the card is
                hovered or picked, and the pill turns solid sun once it's the
                plan they're asking for. */}
            <p
                className={clsx(
                    "relative z-10 col-start-1 row-start-3 -mt-[18px] flex h-9 items-center gap-1 justify-self-start whitespace-nowrap rounded-full border px-3 text-sm font-semibold shadow-sm transition-colors duration-200",
                    "group-data-[checked]:border-sun-500 group-data-[checked]:bg-sun-500 group-data-[checked]:text-cobalt-700",
                    dark
                        ? "border-white/15 bg-cobalt-700 text-sun-500"
                        : "border-highlight-200 bg-white text-highlight-800",
                )}
            >
                <MdLock
                    className="size-3.5 shrink-0 group-hover:hidden group-data-[checked]:hidden"
                    aria-hidden="true"
                />
                <MdLockOpen
                    className="hidden size-3.5 shrink-0 group-hover:block group-data-[checked]:block"
                    aria-hidden="true"
                />
                Unlocks {lockedLeadCount} {leadsWord}
            </p>

            <ul className="col-start-1 row-start-4 mt-5 flex flex-col gap-3">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className={clsx(
                            "flex gap-2.5 text-sm leading-snug",
                            dark ? "text-white/85" : "text-slate-700",
                        )}
                    >
                        <span
                            className={clsx(
                                "mt-px grid size-[18px] shrink-0 place-items-center rounded-full",
                                dark
                                    ? "bg-sun-500/15 text-sun-500"
                                    : "bg-fern-500/15 text-fern-700",
                            )}
                            aria-hidden="true"
                        >
                            <MdCheck className="size-3.5" />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>

            {/* Looks like a button; the whole card is the radio */}
            <span
                className={clsx(
                    "col-start-1 row-start-5 mt-6 inline-flex items-center justify-center gap-1.5 self-end rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
                    dark
                        ? "border-sun-500 text-sun-500 group-hover:bg-sun-500/10 group-data-[checked]:bg-sun-500 group-data-[checked]:text-cobalt-700"
                        : "border-cobalt-500 text-cobalt-500 group-hover:bg-cobalt-500/5 group-data-[checked]:bg-cobalt-500 group-data-[checked]:text-white",
                )}
                aria-hidden="true"
            >
                <MdCheck className="hidden size-4 group-data-[checked]:block" />
                <span className="group-data-[checked]:hidden">
                    Choose {plan.name}
                </span>
                <span className="hidden group-data-[checked]:inline">
                    Selected
                </span>
            </span>
        </Radio>
    );
};

/* Blurred stand-ins for the people behind the locked leads, the way the
   dashboard blurs its locked rows: enough to say "real travelers are
   waiting", never who. Not real leads; the client can't see those. */
const WAITING_FACES = [
    { initials: "AL", tone: "bg-cobalt-500/15 text-cobalt-700" },
    { initials: "JS", tone: "bg-highlight-100 text-highlight-800" },
    { initials: "MR", tone: "bg-fern-200 text-fern-700" },
    { initials: "KT", tone: "bg-secondary-100 text-secondary-700" },
    { initials: "DP", tone: "bg-slate-200 text-slate-700" },
];

const WaitingLeads = () => {
    const faces = WAITING_FACES.slice(0, lockedLeadCount);
    const more = lockedLeadCount - faces.length;

    return (
        <span className="flex shrink-0 -space-x-1.5" aria-hidden="true">
            {faces.map(({ initials, tone }) => (
                <span
                    key={initials}
                    className={clsx(
                        "grid size-6 place-items-center overflow-hidden rounded-full text-[10px] font-bold ring-2 ring-secondary-50",
                        tone,
                    )}
                >
                    <span className="blur-[3px]">{initials}</span>
                </span>
            ))}
            {more > 0 && (
                <span className="grid size-6 place-items-center rounded-full bg-white text-[10px] font-bold tabular-nums text-secondary-700 ring-2 ring-secondary-50">
                    +{more}
                </span>
            )}
        </span>
    );
};

/* The client's own plan, made unmissable: coral (GoAbroad's warm accent,
   the -700 shade for text so it passes AA) says "limit reached" without the
   alarm of an error. The meter has one block per free lead, all used up;
   the locked count is what every card below unlocks. */
const CurrentPlan = ({ plan }: { plan: Plan }) => {
    const used = Math.min(viewableLeads.length, FREE_LEADS_PER_YEAR);
    const year = DEMO_TODAY.slice(0, 4);

    return (
        <section
            aria-label="Your current plan"
            className="grid gap-5 rounded-2xl border border-secondary-200 bg-secondary-50 p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8"
        >
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold tracking-tight text-neutral-800">
                            {plan.name}
                        </span>
                        <span className="text-lg font-semibold text-secondary-700">
                            {plan.price}
                        </span>
                    </p>
                    <span className="rounded-full bg-secondary-700 px-2.5 py-0.5 text-xs font-semibold text-white">
                        Your plan
                    </span>
                </div>
                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-slate-600">
                    {plan.features.map((feature, i) => (
                        <li key={feature} className="flex items-center gap-2">
                            {/* A drawn dot in coral-500 (3.3:1 on the
                                strip), not a faint "·" glyph */}
                            {i > 0 && (
                                <span
                                    className="size-1 shrink-0 rounded-full bg-secondary-500"
                                    aria-hidden="true"
                                />
                            )}
                            <span
                                className={
                                    i === 0
                                        ? "font-semibold text-secondary-700"
                                        : undefined
                                }
                            >
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-2 lg:min-w-72">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-semibold text-neutral-800">
                        Free leads used in {year}
                    </span>
                    <span className="font-bold tabular-nums text-secondary-700">
                        {used} of {FREE_LEADS_PER_YEAR}
                    </span>
                </div>
                <div
                    className="grid gap-1"
                    style={{
                        gridTemplateColumns: `repeat(${FREE_LEADS_PER_YEAR}, minmax(0, 1fr))`,
                    }}
                    role="progressbar"
                    aria-label={`Free leads used in ${year}`}
                    aria-valuemin={0}
                    aria-valuemax={FREE_LEADS_PER_YEAR}
                    aria-valuenow={used}
                >
                    {Array.from({ length: FREE_LEADS_PER_YEAR }, (_, i) => (
                        <span
                            key={i}
                            className={clsx(
                                "h-2.5 rounded-full",
                                i < used
                                    ? "bg-secondary-500"
                                    : "bg-white ring-1 ring-inset ring-secondary-200",
                            )}
                        />
                    ))}
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm font-semibold text-secondary-700">
                    <WaitingLeads />
                    <span className="flex items-center gap-1 whitespace-nowrap">
                        <MdLock className="size-4 shrink-0" aria-hidden="true" />
                        {lockedLeadCount} newer {leadsWord} locked
                    </span>
                </p>
            </div>
        </section>
    );
};

const PlanPicker = ({
    open,
    onClose,
    onSent,
}: {
    open: boolean;
    onClose: () => void;
    /** Called with the plan's name once the request is sent. */
    onSent: (planName: string) => void;
}) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [sentPlan, setSentPlan] = useState<Plan | null>(null);
    const current = plans.find((plan) => plan.id === currentPlanId);
    const upgrades = plans.filter((plan) => plan.id !== currentPlanId);
    const selectedPlan = plans.find((plan) => plan.id === selected);

    const close = () => {
        onClose();
        // Reset after the panel has faded out
        setTimeout(() => {
            setSelected(null);
            setSentPlan(null);
        }, 200);
    };

    const send = () => {
        if (!selectedPlan) return;
        setSentPlan(selectedPlan);
        onSent(selectedPlan.name);
    };

    return (
        // lt-root: the dialog portals out of the shell, so it takes the
        // route's base styles (pinned v3 colours, pointer buttons) itself.
        <Dialog open={open} onClose={close} className="lt-root relative z-[1300] font-inter">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-slate-900/40 transition-opacity duration-200 ease-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 overflow-y-auto p-4 sm:p-8">
                <div className="flex min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="relative w-full max-w-6xl rounded-2xl bg-white shadow-xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Close"
                            className={`absolute right-4 top-4 z-10 inline-flex rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 ${FOCUS_RING}`}
                        >
                            <MdClose className="size-5" />
                        </button>

                        {sentPlan ? (
                            <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                                <MdCheckCircle
                                    className="size-12 text-fern-600"
                                    aria-hidden="true"
                                />
                                <DialogTitle className="text-xl font-bold tracking-tight text-neutral-800">
                                    Request sent
                                </DialogTitle>
                                <p className="max-w-md text-sm leading-relaxed text-slate-600">
                                    We&apos;ve let your account manager know
                                    you&apos;re interested in the{" "}
                                    <span className="font-semibold text-neutral-800">
                                        {sentPlan.name}
                                    </span>{" "}
                                    plan. They&apos;ll be in touch to help you
                                    upgrade.
                                </p>
                                <button
                                    type="button"
                                    onClick={close}
                                    className={`${SECONDARY_BUTTON} mt-2`}
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col gap-5 px-6 pb-6 pt-6 sm:px-8 sm:pt-8">
                                    <div className="flex flex-col gap-1.5 pr-10">
                                        <DialogTitle className="text-2xl font-bold tracking-tight text-balance text-neutral-800 sm:text-[1.75rem]">
                                            {/* A sun highlighter stroke under the number */}
                                            <span className="box-decoration-clone bg-[linear-gradient(to_top,var(--color-sun-200)_38%,transparent_38%)] px-0.5">
                                                {lockedLeadCount} {leadsWord}
                                            </span>{" "}
                                            are waiting for you
                                        </DialogTitle>
                                        <p className="text-sm leading-relaxed text-slate-600">
                                            Every plan below shows you every
                                            lead, all year. Pick the one
                                            you&apos;re interested in and your
                                            account manager will help you
                                            upgrade.
                                        </p>
                                    </div>

                                    {current && <CurrentPlan plan={current} />}
                                </div>

                                <RadioGroup
                                    value={selected}
                                    onChange={setSelected}
                                    aria-label="Plans"
                                    // On a slate tray, so the white cards
                                    // lift off it
                                    className="grid gap-4 border-t border-slate-200 bg-slate-50 px-6 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-5"
                                >
                                    {upgrades.map((plan, i) => (
                                        <PlanCard key={plan.id} plan={plan} tier={i} />
                                    ))}
                                </RadioGroup>

                                {/* Sticky so Send stays in reach when the
                                    dialog is taller than the window. The
                                    negative offset matches the scroller's
                                    padding (p-4 / sm:p-8), so it sits flush
                                    with the screen edge instead of letting
                                    the cards scroll through a strip below. */}
                                <div className="sticky -bottom-4 flex sm:-bottom-8 flex-col-reverse gap-3 rounded-b-2xl border-t border-slate-100 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                                    <p className="text-sm text-slate-500">
                                        No payment now. Your account manager
                                        follows up on your request.
                                    </p>
                                    <div className="flex shrink-0 flex-wrap justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={close}
                                            className={SECONDARY_BUTTON}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={send}
                                            disabled={!selectedPlan}
                                            className={SEND_BUTTON}
                                        >
                                            {selectedPlan
                                                ? `Request ${selectedPlan.name}`
                                                : "Choose a plan"}
                                            <FiArrowRight
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default PlanPicker;
