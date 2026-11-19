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
import { MdCheck, MdClose } from "react-icons/md";
import { PiCrownSimpleFill } from "react-icons/pi";
import {
    FREE_LEADS_PER_YEAR,
    currentPlanId,
    lockedLeadCount,
    plans,
    viewableLeads,
    type Plan,
} from "./data";
import { FOCUS_RING, SECONDARY_BUTTON } from "./ui";

/* V3 of "Upgrade to unlock": a premium side panel instead of V2's grid of
   plan cards. It opens on the client's own numbers (their 5 free leads
   against all of this year's leads), then what every premium plan includes,
   then the tiers as one stacked list where the picked tier opens up to show
   its highlights. The crown (in GoAbroad orange) marks everything premium.
   Like V2, nothing is bought here: the request names the plan and goes to
   the account manager. */

const totalLeads = viewableLeads.length + lockedLeadCount;

// What every paid tier in the 2026 sheet has in common.
const PREMIUM_INCLUDES = [
    `Every lead, all year, including the ${lockedLeadCount} waiting now`,
    "Premium listings on GoAbroad's results pages",
    "A dedicated account manager",
    "Basic or custom inquiry forms",
];

const REQUEST_BUTTON = `inline-flex items-center justify-center gap-2 rounded-lg bg-sun-500 px-5 py-2.5 text-sm font-semibold text-cobalt-700 transition-colors hover:bg-sun-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sun-500 ${FOCUS_RING}`;

const Crown = ({ className }: { className?: string }) => (
    <PiCrownSimpleFill className={className} aria-hidden="true" />
);

const PlanRow = ({ plan }: { plan: Plan }) => (
    <Radio
        value={plan.id}
        className={`group cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:border-slate-300 data-[checked]:border-cobalt-500 data-[checked]:bg-cobalt-500/[0.03] data-[checked]:ring-1 data-[checked]:ring-cobalt-500 ${FOCUS_RING}`}
    >
        <div className="flex items-center gap-3">
            <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 group-data-[checked]:border-cobalt-500"
                aria-hidden="true"
            >
                <span className="size-2.5 rounded-full bg-cobalt-500 opacity-0 group-data-[checked]:opacity-100" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-800">
                    {plan.name}
                </p>
                <p className="truncate text-sm text-slate-500">{plan.tagline}</p>
            </div>
            <p className="shrink-0 text-right">
                <span
                    className={clsx(
                        "block font-bold tracking-tight text-neutral-800",
                        plan.price.startsWith("$")
                            ? "text-lg tabular-nums"
                            : "text-sm",
                    )}
                >
                    {plan.price}
                </span>
                {plan.priceNote && (
                    <span className="block text-xs text-slate-500">
                        {plan.priceNote}
                    </span>
                )}
            </p>
        </div>
        {/* The picked tier opens up to show what sets it apart */}
        <ul className="ml-8 mt-3 hidden flex-col gap-2 border-t border-slate-100 pt-3 group-data-[checked]:flex">
            {plan.features.slice(1).map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-slate-600">
                    <MdCheck
                        className="mt-0.5 size-4 shrink-0 text-cobalt-500"
                        aria-hidden="true"
                    />
                    {feature}
                </li>
            ))}
        </ul>
    </Radio>
);

const PremiumPanel = ({
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
        // Reset after the panel has slid out
        setTimeout(() => {
            setSelected(null);
            setSentPlan(null);
        }, 300);
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
                className="fixed inset-0 bg-slate-900/40 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-y-0 right-0 flex w-full max-w-xl">
                <DialogPanel
                    transition
                    className="relative flex h-full w-full flex-col bg-white shadow-2xl transition duration-300 ease-out data-[closed]:translate-x-full"
                >
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close"
                        className={clsx(
                            "absolute right-4 top-4 z-10 inline-flex rounded-full p-1.5 transition-colors",
                            sentPlan
                                ? "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                : "text-white/80 hover:bg-white/10 hover:text-white",
                            FOCUS_RING,
                            "focus-visible:ring-offset-cobalt-700",
                        )}
                    >
                        <MdClose className="size-5" />
                    </button>

                    {sentPlan ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                            <span className="flex size-16 items-center justify-center rounded-2xl bg-sun-500 text-cobalt-700">
                                <Crown className="size-9" />
                            </span>
                            <DialogTitle className="mt-2 text-2xl font-bold tracking-tight text-neutral-800">
                                Request sent
                            </DialogTitle>
                            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
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
                            <div className="flex-1 overflow-y-auto">
                                {/* Hero: the client's leads, before and after */}
                                <div className="bg-cobalt-700 px-6 pb-7 pt-8 text-white sm:px-8">
                                    <span className="flex size-12 items-center justify-center rounded-xl bg-sun-500 text-cobalt-700">
                                        <Crown className="size-7" />
                                    </span>
                                    <DialogTitle className="mt-5 text-2xl font-bold tracking-tight text-white">
                                        Unlock every lead with a premium
                                        plan
                                    </DialogTitle>
                                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                                        You&apos;ve had {totalLeads} leads
                                        this year. A premium plan shows you
                                        all of them, starting with the{" "}
                                        {lockedLeadCount} waiting now.
                                    </p>

                                    <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
                                        <div className="flex flex-col gap-1 rounded-xl bg-white/10 p-4">
                                            <p className="text-xs font-semibold text-white/70">
                                                {current?.name} ·{" "}
                                                {current?.price}
                                            </p>
                                            <p className="text-2xl font-bold tabular-nums">
                                                {FREE_LEADS_PER_YEAR}
                                            </p>
                                            <p className="text-sm text-white/80">
                                                leads a year
                                            </p>
                                        </div>
                                        <span className="flex items-center text-sun-500">
                                            <FiArrowRight
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <div className="flex flex-col gap-1 rounded-xl bg-sun-500 p-4 text-cobalt-700">
                                            <p className="flex items-center gap-1.5 text-xs font-semibold">
                                                <Crown className="size-3.5" />
                                                Premium
                                            </p>
                                            <p className="text-2xl font-bold tabular-nums">
                                                All {totalLeads}
                                            </p>
                                            <p className="text-sm">
                                                leads, all year
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8 px-6 py-7 sm:px-8">
                                    <section className="flex flex-col gap-3">
                                        <h3 className="text-base font-semibold text-neutral-800">
                                            Included in every premium plan
                                        </h3>
                                        <ul className="flex flex-col gap-2.5">
                                            {PREMIUM_INCLUDES.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex gap-2.5 text-sm text-slate-700"
                                                >
                                                    <Crown className="mt-0.5 size-4 shrink-0 text-sun-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section className="flex flex-col gap-3">
                                        <h3 className="text-base font-semibold text-neutral-800">
                                            Choose your plan
                                        </h3>
                                        <RadioGroup
                                            value={selected}
                                            onChange={setSelected}
                                            aria-label="Plans"
                                            className="flex flex-col gap-2"
                                        >
                                            {upgrades.map((plan) => (
                                                <PlanRow key={plan.id} plan={plan} />
                                            ))}
                                        </RadioGroup>
                                    </section>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
                                <button
                                    type="button"
                                    onClick={send}
                                    disabled={!selectedPlan}
                                    className={REQUEST_BUTTON}
                                >
                                    <Crown className="size-4" />
                                    {selectedPlan
                                        ? `Request ${selectedPlan.name}`
                                        : "Choose a plan above"}
                                </button>
                                <p className="text-center text-xs text-slate-500">
                                    No payment now. Your account manager
                                    follows up on your request.
                                </p>
                            </div>
                        </>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default PremiumPanel;
