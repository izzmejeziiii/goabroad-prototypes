"use client";

import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { business } from "../../invoice-tool/data";
import { Pill, pageTitle } from "../../invoice-tool/ui";
import { mdyLong, money } from "../format";
import { useDraft } from "./DraftContext";
import {
    discountTotal,
    invoiceTotal,
    itemGross,
    noPlacements,
    placementLabel,
    productName,
    schedule,
    subtotal,
    type Draft,
    type DraftItem,
} from "./draft";

/* The invoice as the client will get it, drawn live from the editor, in
   /invoice-tool's invoice document design (InvoiceDocument, which mirrors
   its PDF): the same header (logo, billing email, "Invoice", number,
   status pill), Billed to beside Invoice date / Due date and a full-width
   field, the item table and the totals with Amount due, with its pieces
   imported from /invoice-tool. Its "How to pay" box holds the message
   instead: paying is for the client admin, not this internal editor. What an
   admin invoice adds sits in the same styles: each item's run dates and
   placements as its description, Terms in the full-width field (where
   /invoice-tool puts "For"), the payment schedule when it's split, and the
   message. The page is laid out at letter width and scaled to fit its
   column, so it reads as a sheet of paper. */

const PAGE_WIDTH = 760;
const MINUS = "−";
const label = "text-xs font-semibold tracking-wide text-slate-500 uppercase";
const ghost = "text-slate-300";

/** Lays the page out at PAGE_WIDTH and scales it down to the column. */
const Paper = ({ children }: { children: ReactNode }) => {
    const outer = useRef<HTMLDivElement>(null);
    const inner = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ scale: 1, height: 0 });
    useEffect(() => {
        const measure = () => {
            if (!outer.current || !inner.current) return;
            const scale = Math.min(1, outer.current.clientWidth / PAGE_WIDTH);
            setSize({ scale, height: inner.current.offsetHeight * scale });
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (outer.current) ro.observe(outer.current);
        if (inner.current) ro.observe(inner.current);
        return () => ro.disconnect();
    }, []);
    return (
        <div ref={outer} style={{ height: size.height || undefined }} className="relative w-full">
            <div
                ref={inner}
                style={{ width: PAGE_WIDTH, transform: `scale(${size.scale})` }}
                className="absolute left-0 top-0 origin-top-left rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08),0_12px_32px_-12px_rgba(15,23,42,0.18)] ring-1 ring-slate-200"
            >
                {children}
            </div>
        </div>
    );
};

const range = (item: DraftItem) => (item.startDate && item.endDate ? `${mdyLong(item.startDate)} – ${mdyLong(item.endDate)}` : "Run dates not set");

/** The invoice document drawn in the editor's live preview. `editing`
    shows placeholders for what isn't filled in yet. */
export const InvoiceDocument = ({
    draft,
    isNew,
    paidTotal,
    className,
    editing,
}: {
    draft: Draft;
    isNew: boolean;
    paidTotal: number;
    className?: string;
    editing?: boolean;
}) => {
    const items = draft.items.filter((i) => i.productId);
    const terms = schedule(draft);
    const total = invoiceTotal(draft);
    const disc = discountTotal(draft);
    const fee = Number(draft.fee) || 0;
    const due = Math.max(0, Math.round((total - paidTotal) * 100) / 100);
    const firstDue = terms.find((t) => t.dueDate)?.dueDate;

    // /invoice-tool's pill: Paid, Overdue, Partly paid (and Void here)
    const pill =
        draft.status === 6 ? (
            <Pill tone="partial">Void</Pill>
        ) : draft.status === 5 || (paidTotal > 0 && due === 0) ? (
            <Pill tone="paid">Paid</Pill>
        ) : draft.status === 4 ? (
            <Pill tone="overdue">Overdue</Pill>
        ) : paidTotal > 0 ? (
            <Pill tone="partial">Partly paid</Pill>
        ) : null;

    // Same rows as /invoice-tool: a subtotal only when something adjusts it
    const totals: { label: string; value: string; tone?: "add" | "deduct" }[] = [];
    if (disc > 0 || fee > 0) totals.push({ label: "Subtotal", value: money(subtotal(draft)) });
    if (disc > 0) totals.push({ label: "Discounts", value: `${MINUS} ${money(disc)}`, tone: "deduct" });
    if (fee > 0) totals.push({ label: draft.feeNote || "Fee", value: `+ ${money(fee)}`, tone: "add" });
    totals.push({ label: "Total", value: money(total) });
    if (paidTotal > 0) totals.push({ label: "Paid", value: `${MINUS} ${money(paidTotal)}`, tone: "deduct" });

    return (
        <article className={clsx("flex flex-col gap-10 font-inter text-slate-700 antialiased", className)}>
            <header className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex flex-col gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={business.logo} alt={business.name} className="h-12 w-auto self-start" />
                    <p className="text-sm text-slate-600">{business.billingEmail}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 text-right">
                    <h1 className={pageTitle}>Invoice</h1>
                    <p className="text-base tabular-nums text-slate-600">
                        {isNew ? <span className={ghost}>Number assigned on save</span> : `#${draft.id}`}
                    </p>
                    {pill ? <div>{pill}</div> : null}
                </div>
            </header>

            <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                <div className="flex flex-col gap-2">
                    <p className={label}>Billed to</p>
                    <address className="flex flex-col text-[15px] not-italic leading-relaxed text-slate-700">
                        <span className={clsx("font-semibold", draft.billingName ? "text-slate-900" : ghost)}>
                            {draft.billingName || "Client name"}
                        </span>
                        {draft.contactEmail && <span>{draft.contactEmail}</span>}
                        {draft.billingAddress
                            ? draft.billingAddress.split("\n").map((line, i) => <span key={i}>{line}</span>)
                            : !draft.billingName && <span className={ghost}>Billing address</span>}
                    </address>
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start">
                    <div className="flex flex-col gap-2">
                        <dt className={label}>Invoice date</dt>
                        <dd className="text-[15px] text-slate-900">{mdyLong(draft.invoiceDate)}</dd>
                    </div>
                    <div className="flex flex-col gap-2">
                        <dt className={label}>{terms.length > 1 ? "First due" : "Due date"}</dt>
                        <dd className="text-[15px] text-slate-900">{firstDue ? mdyLong(firstDue) : <span className={ghost}>Not set</span>}</dd>
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                        <dt className={label}>Terms</dt>
                        <dd className="text-[15px] text-slate-900">
                            {draft.terms === "custom"
                                ? `${terms.length} payment${terms.length === 1 ? "" : "s"}`
                                : draft.terms === "30_days"
                                  ? "30 days"
                                  : "Upon receipt"}
                        </dd>
                    </div>
                </dl>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-[15px]">
                    <thead className="bg-slate-100">
                        <tr className={label}>
                            <th scope="col" className="py-3 pl-5 font-semibold">
                                Description
                            </th>
                            <th scope="col" className="px-4 py-3 text-right font-semibold">
                                Qty
                            </th>
                            <th scope="col" className="px-4 py-3 text-right font-semibold">
                                Unit price
                            </th>
                            <th scope="col" className="py-3 pl-4 pr-5 text-right font-semibold">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 tabular-nums">
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={4} className={clsx(ghost, "py-8 text-center")}>
                                    Items you add show here
                                </td>
                            </tr>
                        )}
                        {items.map((item) => {
                            const none = noPlacements(item.productId);
                            const qty = none ? 1 : item.placements.length;
                            return (
                                <tr key={item.id}>
                                    <td className="py-4 pl-5 align-top">
                                        <span className="block text-slate-900">{productName(item.productId)}</span>
                                        <span className="block text-sm text-slate-500">{range(item)}</span>
                                        {!none &&
                                            item.placements.map((p) => (
                                                <span key={p.id} className="block text-sm text-slate-500">
                                                    {placementLabel(p) || "Placement"}
                                                </span>
                                            ))}
                                    </td>
                                    <td className="px-4 py-4 text-right align-top text-slate-900">{qty}</td>
                                    <td className="whitespace-nowrap px-4 py-4 text-right align-top text-slate-900">{money(item.unitPrice)}</td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-5 text-right align-top text-slate-900">{money(itemGross(item))}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <dl className="ml-auto flex w-full max-w-sm flex-col gap-3 pr-5 text-[15px] tabular-nums">
                {totals.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4">
                        <dt className={row.tone === "add" ? "text-roman-700" : row.tone === "deduct" ? "text-fern-700" : "text-slate-600"}>
                            {row.label}
                        </dt>
                        <dd
                            className={clsx(
                                "text-right",
                                row.tone === "add"
                                    ? "font-semibold text-roman-700"
                                    : row.tone === "deduct"
                                      ? "font-semibold text-fern-700"
                                      : "text-slate-900",
                            )}
                        >
                            {row.value}
                        </dd>
                    </div>
                ))}
                <div className="flex items-baseline justify-between gap-3 border-t-2 border-slate-300 pt-3">
                    <dt className="text-base font-semibold text-slate-900">Amount due</dt>
                    <dd className="text-2xl font-bold text-slate-900">{money(due)}</dd>
                </div>
            </dl>

            {/* Installments, in the item table's style */}
            {terms.length > 1 && (
                <div className="flex flex-col gap-3">
                    <h2 className={label}>Payment schedule</h2>
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                        <table className="w-full text-left text-[15px]">
                            <thead className="bg-slate-100">
                                <tr className={label}>
                                    <th scope="col" className="py-3 pl-5 font-semibold">
                                        Payment
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-semibold">
                                        Due date
                                    </th>
                                    <th scope="col" className="py-3 pl-4 pr-5 text-right font-semibold">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 tabular-nums">
                                {terms.map((t, i) => (
                                    <tr key={t.id}>
                                        <td className="py-3 pl-5 text-slate-900">Payment {i + 1}</td>
                                        <td className="px-4 py-3 text-slate-900">
                                            {t.dueDate ? mdyLong(t.dueDate) : <span className={ghost}>Not set</span>}
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-4 pr-5 text-right text-slate-900">
                                            {money(t.amount)}
                                            {t.paid > 0 && (
                                                <span className="block text-sm font-semibold text-fern-700">
                                                    {t.paid >= t.amount ? "Paid" : `${money(t.paid)} paid`}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* The message, as a notice in a light tint of GoAbroad's cobalt:
                easy to spot, still a business document (no icons or quotes) */}
            {(draft.message || editing) && (
                <section className="rounded-xl border border-cobalt-500/25 bg-cobalt-500/[0.05] px-6 py-5">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-cobalt-700">Message</h2>
                    <p className={clsx("mt-2 whitespace-pre-line text-base leading-relaxed", draft.message ? "text-slate-900" : ghost)}>
                        {draft.message || "Your message to the client shows here."}
                    </p>
                </section>
            )}
        </article>
    );
};

/** The editor's live preview: the document on a sheet of paper. */
const InvoicePreview = () => {
    const { draft, isNew, paidTotal } = useDraft();
    return (
        <Paper>
            <InvoiceDocument draft={draft} isNew={isNew} paidTotal={paidTotal} editing className="px-14 pb-14 pt-10" />
        </Paper>
    );
};

export default InvoicePreview;
