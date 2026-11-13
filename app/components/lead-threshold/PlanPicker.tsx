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
import { currentPlanId, lockedLeadCount, plans, type Plan } from "./data";
import { FOCUS_RING, SECONDARY_BUTTON } from "./ui";

/* V2 of "Upgrade to unlock": a plan comparison before the request goes to
   the account manager. Nothing is bought here; the client picks the plan
   they're interested in and the request names it. Built on Headless UI's
   Dialog and RadioGroup (gacom-admin has @headlessui/react too).

   The cards sell the one thing the client came for: each upgrade says how
   many of *their* waiting leads it unlocks (in GoAbroad orange). The current
   plan sits above as a quiet strip, the tiers read left to right, and
   Enterprise closes the row as a dark cobalt card. Each card is one big
   radio with a "Choose …" footer that turns into "Selected". */

const SEND_BUTTON = `inline-flex items-center justify-center gap-2 rounded-lg bg-sun-500 px-5 py-2 text-sm font-semibold text-cobalt-700 transition-colors hover:bg-sun-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sun-500 ${FOCUS_RING}`;

const leadsWord = lockedLeadCount === 1 ? "lead" : "leads";

const PlanCard = ({ plan }: { plan: Plan }) => {
    const dark = plan.id === "enterprise";
    // The lead line is the unlock chip; the rest are the tier's highlights.
    const features = plan.features.slice(1);

    return (
        <Radio
            value={plan.id}
            className={clsx(
                "group relative flex cursor-pointer flex-col rounded-2xl border p-5 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none data-[focus]:ring-2 data-[focus]:ring-offset-2",
                dark
                    ? "border-cobalt-700 bg-cobalt-700 text-white data-[checked]:ring-2 data-[checked]:ring-sun-500 data-[checked]:ring-offset-2 data-[focus]:ring-sun-500"
                    : "border-slate-200 bg-white hover:border-slate-300 data-[checked]:border-cobalt-500 data-[checked]:ring-1 data-[checked]:ring-cobalt-500 data-[focus]:ring-cobalt-500",
            )}
        >
            <div className="flex flex-col gap-1">
                <p
                    className={clsx(
                        "text-base font-bold",
                        dark ? "text-white" : "text-neutral-800",
                    )}
                >
                    {plan.name}
                </p>
                <p
                    className={clsx(
                        "text-sm leading-snug",
                        dark ? "text-white/75" : "text-slate-500",
                    )}
                >
                    {plan.tagline}
                </p>
            </div>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-1.5">
                <span
                    className={clsx(
                        "font-bold tracking-tight",
                        plan.price.startsWith("$")
                            ? "text-3xl tabular-nums"
                            : "text-xl",
                        dark ? "text-white" : "text-neutral-800",
                    )}
                >
                    {plan.price}
                </span>
                {plan.priceNote && (
                    <span
                        className={clsx(
                            "text-sm",
                            dark ? "text-white/75" : "text-slate-500",
                        )}
                    >
                        {plan.priceNote}
                    </span>
                )}
            </p>

            {/* The reason to upgrade, in the client's own numbers */}
            <p
                className={clsx(
                    "mt-4 flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold",
                    dark
                        ? "bg-white/10 text-sun-500"
                        : "border border-highlight-200 bg-highlight-50 text-highlight-800",
                )}
            >
                <MdLockOpen className="size-4 shrink-0" aria-hidden="true" />
                Unlocks {lockedLeadCount} {leadsWord}
            </p>

            <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className={clsx(
                            "flex gap-2 text-sm leading-snug",
                            dark ? "text-white/85" : "text-slate-600",
                        )}
                    >
                        <MdCheck
                            className={clsx(
                                "mt-0.5 size-4 shrink-0",
                                dark ? "text-sun-500" : "text-cobalt-500",
                            )}
                            aria-hidden="true"
                        />
                        {feature}
                    </li>
                ))}
            </ul>

            {/* Looks like a button; the whole card is the radio */}
            <span
                className={clsx(
                    "mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                    dark
                        ? "bg-white/10 text-white group-hover:bg-white/15 group-data-[checked]:bg-sun-500 group-data-[checked]:text-cobalt-700"
                        : "border border-slate-300 text-neutral-800 group-hover:border-slate-400 group-data-[checked]:border-cobalt-500 group-data-[checked]:bg-cobalt-500 group-data-[checked]:text-white",
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
                                <div className="flex flex-col gap-4 px-6 pb-2 pt-6 sm:px-8 sm:pt-8">
                                    <div className="flex flex-col gap-1 pr-10">
                                        <DialogTitle className="text-2xl font-bold tracking-tight text-neutral-800">
                                            {lockedLeadCount} {leadsWord} are
                                            waiting for you
                                        </DialogTitle>
                                        <p className="text-sm leading-relaxed text-slate-600">
                                            Every plan below shows you every
                                            lead, all year. Pick the one
                                            you&apos;re interested in and your
                                            account manager will help you
                                            upgrade.
                                        </p>
                                    </div>

                                    {/* Where they are now: a quiet strip, not
                                        a competing card */}
                                    {current && (
                                        <div className="flex flex-col gap-2 rounded-xl bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                                            <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-800">
                                                <MdLock
                                                    className="size-4 text-slate-400"
                                                    aria-hidden="true"
                                                />
                                                You&apos;re on {current.name} ·{" "}
                                                {current.price}
                                            </span>
                                            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                                                {current.features.map((feature) => (
                                                    <li key={feature}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <RadioGroup
                                    value={selected}
                                    onChange={setSelected}
                                    aria-label="Plans"
                                    className="grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-5"
                                >
                                    {upgrades.map((plan) => (
                                        <PlanCard key={plan.id} plan={plan} />
                                    ))}
                                </RadioGroup>

                                {/* Sticky so Send stays in reach when the
                                    dialog is taller than the window */}
                                <div className="sticky bottom-0 flex flex-col-reverse gap-3 rounded-b-2xl border-t border-slate-100 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                                    <p className="text-sm text-slate-500">
                                        No payment now. Your account manager
                                        follows up on your request.
                                    </p>
                                    <div className="flex flex-wrap justify-end gap-2">
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
