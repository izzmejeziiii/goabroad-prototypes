"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FiArrowLeft } from "react-icons/fi";
import { MdCheck, MdCheckCircle, MdRemove } from "react-icons/md";
import {
    BASE_PATH,
    FREE_LEADS_PER_YEAR,
    currentPlanId,
    lockedLeadCount,
    planComparison,
    plans,
    type ComparisonValue,
    type Plan,
} from "./data";
import { FOCUS_RING, TEXT_LINK } from "./ui";

/* V4 of "Upgrade to unlock": the in-app Compare plans page, the upgrade
   flow most SaaS products ship (Slack, Notion, GitHub, HubSpot): the
   locked feature links to a plans page with every tier side by side,
   feature by feature, and a button per plan. Rows come from the 2026 tiers
   sheet (planComparison in data.ts); the client's own plan is the coral
   column. As in V2 and V3, nothing is bought here: "Request" tells the
   account manager which plan the client wants. */

const BACK_HREF = `${BASE_PATH}?upgrade=page`;

const Cell = ({ value, current }: { value: ComparisonValue; current: boolean }) => {
    if (value === true)
        return (
            <MdCheck
                className={clsx(
                    "mx-auto size-5",
                    current ? "text-secondary-700" : "text-cobalt-500",
                )}
                aria-label="Included"
            />
        );
    if (value === false)
        return (
            <MdRemove
                className="mx-auto size-5 text-slate-300"
                aria-label="Not included"
            />
        );
    return <span>{value}</span>;
};

const RequestButton = ({
    plan,
    requested,
    onRequest,
}: {
    plan: Plan;
    requested: boolean;
    onRequest: () => void;
}) => (
    <button
        type="button"
        onClick={onRequest}
        className={clsx(
            "inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
            requested
                ? "border-fern-700 bg-fern-700 text-white"
                : "border-cobalt-500 text-cobalt-500 hover:bg-cobalt-500 hover:text-white",
            FOCUS_RING,
        )}
    >
        {requested && <MdCheck className="size-4" aria-hidden="true" />}
        {requested ? "Requested" : "Request"}
        <span className="sr-only"> {plan.name}</span>
    </button>
);

const ComparePlans = () => {
    const [requested, setRequested] = useState<Plan | null>(null);

    // Plan names and prices on one row, buttons on their own row so they
    // line up whatever the price text does. The buttons repeat at the foot.
    const featureHeader = (
        <th scope="col" className="w-48 min-w-44 p-4 text-left">
            <span className="sr-only">Feature</span>
        </th>
    );

    const planInfoRow = (
        <tr>
            {featureHeader}
            {plans.map((plan) => {
                const current = plan.id === currentPlanId;
                return (
                    <th
                        key={plan.id}
                        scope="col"
                        className={clsx(
                            "min-w-36 px-3 pb-3 pt-4 text-left align-top font-normal",
                            current && "rounded-t-xl bg-secondary-50",
                        )}
                    >
                        <span className="flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                                <span className="text-base font-bold text-neutral-800">
                                    {plan.name}
                                </span>
                                {current && (
                                    <span className="rounded-full bg-secondary-700 px-2 py-0.5 text-xs font-semibold text-white">
                                        Your plan
                                    </span>
                                )}
                            </span>
                            <span className="flex flex-wrap items-baseline gap-x-1">
                                <span
                                    className={clsx(
                                        "font-bold tracking-tight text-neutral-800",
                                        plan.price.startsWith("$")
                                            ? "text-2xl tabular-nums"
                                            : "text-base",
                                    )}
                                >
                                    {plan.price}
                                </span>
                                {plan.priceNote && (
                                    <span className="text-xs text-slate-500">
                                        {plan.priceNote}
                                    </span>
                                )}
                            </span>
                        </span>
                    </th>
                );
            })}
        </tr>
    );

    const ctaRow = (position: "top" | "bottom") => (
        <tr>
            {position === "top" ? featureHeader : <td />}
            {plans.map((plan) => {
                const current = plan.id === currentPlanId;
                const Tag = position === "top" ? "th" : "td";
                return (
                    <Tag
                        key={plan.id}
                        className={clsx(
                            "px-3 pb-4 align-bottom font-normal",
                            position === "bottom" && "pt-4",
                            current && "bg-secondary-50",
                            current && position === "bottom" && "rounded-b-xl",
                        )}
                    >
                        {current ? (
                            <span className="inline-flex w-full items-center justify-center rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm font-semibold text-secondary-700">
                                Current plan
                            </span>
                        ) : (
                            <RequestButton
                                plan={plan}
                                requested={requested?.id === plan.id}
                                onRequest={() => setRequested(plan)}
                            />
                        )}
                    </Tag>
                );
            })}
        </tr>
    );

    return (
        <div className="flex flex-col gap-6 py-6 font-inter">
            <Link href={BACK_HREF} className={`${TEXT_LINK} inline-flex items-center gap-1.5 self-start`}>
                <FiArrowLeft className="size-4" aria-hidden="true" />
                Back to dashboard
            </Link>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-800">
                    Compare plans
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-slate-600">
                    You&apos;re on Basic, which shows {FREE_LEADS_PER_YEAR}{" "}
                    leads a year. Every paid plan shows all of them, including
                    the{" "}
                    <span className="font-semibold text-secondary-700">
                        {lockedLeadCount} waiting now
                    </span>
                    .
                </p>
            </div>

            <div aria-live="polite">
                {requested && (
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-fern-200 bg-[#f0f7f1] px-5 py-4">
                        <p className="flex items-center gap-2 text-sm text-slate-700">
                            <MdCheckCircle
                                className="size-5 shrink-0 text-fern-600"
                                aria-hidden="true"
                            />
                            <span>
                                <span className="font-semibold text-neutral-800">
                                    Request sent.
                                </span>{" "}
                                We&apos;ve let your account manager know
                                you&apos;re interested in the{" "}
                                {requested.name} plan. They&apos;ll be in touch
                                to help you upgrade.
                            </span>
                        </p>
                        <Link href={BACK_HREF} className={TEXT_LINK}>
                            Back to dashboard
                        </Link>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full border-collapse text-sm">
                    <caption className="sr-only">
                        GoAbroad plans compared feature by feature
                    </caption>
                    <thead>
                        {planInfoRow}
                        {ctaRow("top")}
                    </thead>
                    {planComparison.map(({ group, rows }) => (
                        <tbody key={group}>
                            <tr>
                                <th
                                    scope="colgroup"
                                    colSpan={plans.length + 1}
                                    className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-sm font-semibold text-neutral-800"
                                >
                                    {group}
                                </th>
                            </tr>
                            {rows.map((row, i) => {
                                const leadsRow = group === "Leads" && i === 0;
                                return (
                                    <tr key={row.label} className="border-t border-slate-100">
                                        <th
                                            scope="row"
                                            className={clsx(
                                                "px-4 py-3 text-left",
                                                leadsRow
                                                    ? "font-semibold text-neutral-800"
                                                    : "font-normal text-slate-700",
                                            )}
                                        >
                                            {row.label}
                                        </th>
                                        {plans.map((plan) => {
                                            const current = plan.id === currentPlanId;
                                            return (
                                                <td
                                                    key={plan.id}
                                                    className={clsx(
                                                        "px-3 py-3",
                                                        typeof row.values[plan.id] !== "string" && "text-center",
                                                        current && "bg-secondary-50",
                                                        !leadsRow
                                                            ? "text-slate-600"
                                                            : current
                                                              ? "font-semibold text-secondary-700"
                                                              : "font-semibold text-fern-700",
                                                    )}
                                                >
                                                    <Cell
                                                        value={row.values[plan.id] ?? false}
                                                        current={current}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    ))}
                    <tfoot className="border-t border-slate-200">
                        {ctaRow("bottom")}
                    </tfoot>
                </table>
            </div>

            <p className="text-sm text-slate-500">
                No payment now. Requesting a plan lets your account manager
                know; they&apos;ll follow up to help you upgrade.
            </p>
        </div>
    );
};

export default ComparePlans;
