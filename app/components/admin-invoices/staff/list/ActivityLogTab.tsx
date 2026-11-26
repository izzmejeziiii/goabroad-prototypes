"use client";

import clsx from "clsx";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import type { InvoiceActivity } from "../../types";
import { absoluteDateFormatter, relativeDateFormatter } from "./time";

/* The drawer's Activity Log tab: src/views/Client/Invoices/ActivityLogTab.js
   renders src/components/ActivityLogPanel for the invoice. Each entry is a
   bordered card: initials avatar (#295d82, "?" for the system), the action
   pill, the actor and their type badge, "No field changes", the relative
   time (absolute on hover) and an expand chevron. The demo's activities are
   one-line actions with no field diffs, so they map onto the panel's action
   labels where one fits and show their own text otherwise. */

const LABELS: [RegExp, string, string][] = [
    [/^Created invoice as draft/, "Draft Saved", "bg-[#FAA929]/15 text-[#b2781d]"],
    [/^Created invoice/, "Created", "bg-[#68AF74]/15 text-[#4A7C52]"],
    [/^Sent invoice/, "Invoice Sent", ""],
    [/^Sent payment reminder/, "Invoice Reminder Sent", ""],
    [/^Recorded/, "Payment Recorded", ""],
    [/^Status changed to Overdue/, "Marked Overdue", ""],
    [/^Status changed to Paid/, "Invoice Paid", ""],
    [/^Voided/, "Voided", ""],
];

const ACTOR_TYPES: Record<string, [string, string]> = {
    internal: ["Admin", "bg-slate-100 text-slate-600"],
    system: ["System", "bg-gray-100 text-gray-500"],
    processor: ["Payment Processor", "bg-indigo-100 text-indigo-700"],
};

const initialsOf = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join("");

const Entry = ({ activity }: { activity: InvoiceActivity }) => {
    const [expanded, setExpanded] = useState(false);
    const match = LABELS.find(([re]) => re.test(activity.action));
    const label = match ? match[1] : activity.action;
    const tone = match?.[2] || "bg-slate-100 text-slate-700";
    const isSystem = activity.user === "System";
    const actorName = activity.user || "System";
    const actorType = isSystem ? "system" : activity.user === "Stripe" ? "processor" : "internal";

    return (
        <div className={clsx("shrink-0 rounded-lg border border-solid bg-white transition-colors", expanded ? "!border-slate-300" : "!border-slate-200")}>
            <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className={clsx(
                    "group/entry flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50",
                    expanded ? "rounded-t-lg bg-slate-50" : "rounded-lg",
                )}
            >
                <span
                    aria-hidden="true"
                    className={clsx(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                        isSystem ? "bg-slate-400" : "bg-[#295d82]",
                    )}
                >
                    {isSystem ? "?" : initialsOf(actorName)}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="flex flex-wrap items-center gap-2">
                        <span className={clsx("whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", tone)}>
                            {label}
                        </span>
                        <span className="truncate text-sm font-semibold text-slate-800">{actorName}</span>
                        <span
                            className={clsx(
                                "rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide",
                                ACTOR_TYPES[actorType][1],
                            )}
                        >
                            {ACTOR_TYPES[actorType][0]}
                        </span>
                    </span>
                    <span className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                        <span className="italic">No field changes</span>
                    </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 self-center">
                    <span className="group relative whitespace-nowrap text-xs text-slate-400">
                        {relativeDateFormatter(activity.date_created)}
                        <span className="pointer-events-none absolute right-0 top-full z-20 mt-1 hidden whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs font-normal normal-case tracking-normal text-white group-hover:block">
                            {absoluteDateFormatter(activity.date_created)}
                        </span>
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors group-hover/entry:bg-slate-100">
                        <MdExpandMore className={clsx("!h-5 !w-5 transition-transform", expanded && "rotate-180")} />
                    </span>
                </span>
            </button>
            {expanded && (
                <div className="border-0 border-t border-solid !border-slate-200 px-4 py-3 pl-[60px]">
                    <p className="m-0 text-sm italic text-gray-400">No field changes recorded.</p>
                </div>
            )}
        </div>
    );
};

const ActivityLogTab = ({ activities }: { activities: InvoiceActivity[] }) => {
    const logs = [...activities].sort((a, b) => b.date_created.localeCompare(a.date_created) || b.id - a.id);
    return (
        <div className="flex w-full flex-col gap-4">
            {logs.length === 0 && <p className="m-0 text-sm text-gray-400">No activity yet.</p>}
            {logs.length > 0 && (
                <div className="flex max-h-[calc(100vh-160px)] flex-col gap-2 overflow-y-auto pr-1">
                    {logs.map((entry) => (
                        <Entry key={entry.id} activity={entry} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivityLogTab;
