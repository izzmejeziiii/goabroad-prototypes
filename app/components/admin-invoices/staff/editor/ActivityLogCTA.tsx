"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/ActivityLogCTA.js (the
   small primary Fab with the "Activity Log" tooltip and its DialogBox,
   640–760px wide, "Close") and, inside it, the collapsed entry rows of
   src/components/ActivityLogPanel/ActivityLogPanel.js. The store only has
   a line of text per activity (no field diff), so every entry reads
   "No field changes" and expands to "No field changes recorded." */

import clsx from "clsx";
import { useState } from "react";
import { MdExpandMore, MdReceiptLong } from "react-icons/md";
import { useInvoices } from "../../store";
import type { InvoiceActivity } from "../../types";
import { Button, Dialog, DialogActions, DialogTitle, Tooltip } from "../../mui";
import { Fab } from "./ui/controls";
import { distanceToNow, toDate } from "./utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

/** 'MMM dd, yyyy hh:mm a' */
const absolute = (value: string) => {
    const d = toDate(value);
    if (!d) return "";
    const h = d.getHours() % 12 || 12;
    return `${MONTHS[d.getMonth()]} ${pad(d.getDate())}, ${d.getFullYear()} ${pad(h)}:${pad(d.getMinutes())} ${d.getHours() < 12 ? "AM" : "PM"}`;
};

/** relativeDateFormatter: relative under a week old, absolute after. */
const relative = (value: string) => {
    const d = toDate(value);
    if (!d) return "";
    return Date.now() - d.getTime() >= 7 * 86400000 ? absolute(value) : distanceToNow(d);
};

const initialsOf = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

const ACTOR_TYPE = (user: string) =>
    user === "System"
        ? null
        : user === "Stripe"
          ? { label: "Payment Processor", className: "bg-indigo-100 text-indigo-700" }
          : { label: "Admin", className: "bg-slate-100 text-slate-600" };

const ActivityLogEntry = ({ entry }: { entry: InvoiceActivity }) => {
    const [expanded, setExpanded] = useState(false);
    const isSystem = entry.user === "System";
    const actorName = isSystem ? "System" : entry.user;
    const actorType = ACTOR_TYPE(entry.user);
    return (
        <div
            className={clsx(
                "shrink-0 rounded-lg border bg-white transition-colors",
                expanded ? "!border-slate-300" : "!border-slate-200",
            )}
        >
            <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className={clsx(
                    "group/entry flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50",
                    expanded ? "rounded-t-lg bg-slate-50" : "rounded-lg",
                )}
            >
                <span
                    aria-hidden="true"
                    className={clsx(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                        isSystem ? "bg-slate-400" : "bg-[#295d82]",
                    )}
                >
                    {isSystem ? "?" : initialsOf(actorName)}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="flex flex-wrap items-center gap-2">
                        <span className="whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                            {entry.action}
                        </span>
                        <span className="truncate text-sm font-semibold text-slate-800">{actorName}</span>
                        {actorType && (
                            <span
                                className={clsx(
                                    "rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide",
                                    actorType.className,
                                )}
                            >
                                {actorType.label}
                            </span>
                        )}
                    </span>
                    <span className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                        <span className="italic">No field changes</span>
                    </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 self-center">
                    <span className="group relative whitespace-nowrap text-xs text-slate-400">
                        {relative(entry.date_created)}
                        <span className="pointer-events-none absolute right-0 top-full z-20 mt-1 hidden whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs font-normal normal-case tracking-normal text-white group-hover:block">
                            {absolute(entry.date_created)}
                        </span>
                    </span>
                    <span className="flex size-7 items-center justify-center rounded-full text-slate-500 transition-colors group-hover/entry:bg-slate-100">
                        <MdExpandMore className={clsx("!size-5 transition-transform", expanded && "rotate-180")} />
                    </span>
                </span>
            </button>
            {expanded && (
                <div className="border-t !border-slate-200 px-4 py-3 pl-[60px]">
                    <p className="text-sm italic text-gray-400">No field changes recorded.</p>
                </div>
            )}
        </div>
    );
};

const ActivityLogCTA = ({ invoiceId, className }: { invoiceId: number | null; className?: string }) => {
    const [open, setOpen] = useState(false);
    const { getInvoice } = useInvoices();

    // The signed-in staff member is a manager (access level 3 > 1).
    if (!invoiceId) return null;

    const logs = [...(getInvoice(invoiceId)?.activities ?? [])].sort((a, b) =>
        b.date_created.localeCompare(a.date_created),
    );

    return (
        <>
            <Tooltip title="Activity Log" className={className}>
                <Fab onClick={() => setOpen(true)} dataCy="view-invoice-activity-log" label="Activity Log">
                    <MdReceiptLong className="size-6" />
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="max-w-[760px]"
                paperClassName="min-w-[640px] p-4"
            >
                <DialogTitle align="center">Activity Log</DialogTitle>
                <div className="flex-auto overflow-visible p-4">
                    <div className="flex w-full flex-col gap-4">
                        {logs.length === 0 ? (
                            <p className="text-sm text-gray-400">No activity yet.</p>
                        ) : (
                            <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto pr-1">
                                {logs.map((entry) => (
                                    <ActivityLogEntry key={entry.id} entry={entry} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ActivityLogCTA;
