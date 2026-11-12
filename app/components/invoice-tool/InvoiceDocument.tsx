"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DownloadPdfButton from "./DownloadPdfButton";
import {
    amountDue,
    business,
    cardLimitLabel,
    findByToken,
    getTransferMethod,
    invoiceTotal,
    lateFeeTotal,
    lineTotal,
    money,
} from "./data";
import { addressLines } from "./regions";
import { getServerSnapshot, getSnapshot, parseOverrides, subscribe } from "./store";
import { Pill, bodyPad, buttonPrimary, buttonSecondary, pageTitle } from "./ui";
import { cn } from "@/app/lib/utils";

const MINUS = "−";
const label = "text-xs font-semibold tracking-wide text-slate-500 uppercase";

/** The full invoice, linked from the pay page ("View full invoice"): who it's
 *  billed to, every item, and the totals. Mirrors the downloadable PDF. */
export default function InvoiceDocument({ token }: { token: string }) {
    const invoice = findByToken(token)!;
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const override = useMemo(() => parseOverrides(raw)[token] ?? {}, [raw, token]);
    const payment = override.payment ?? invoice.payment;
    const claim = override.claim ?? invoice.claim;
    const due = amountDue(invoice);
    const lateFees = lateFeeTotal(invoice);

    const pill = payment ? (
        <Pill tone="paid">Paid</Pill>
    ) : lateFees > 0 ? (
        <Pill tone="overdue">Overdue</Pill>
    ) : claim ? (
        <Pill tone="waiting">Payment on its way</Pill>
    ) : invoice.paidCents > 0 ? (
        <Pill tone="partial">Partly paid</Pill>
    ) : null;

    const totals: { label: string; value: string; tone?: "add" | "deduct" }[] = [];
    if (lateFees > 0) {
        totals.push({ label: "Subtotal", value: money(lineTotal(invoice)) });
        totals.push({ label: "Late fee", value: `+ ${money(lateFees)}`, tone: "add" });
    }
    totals.push({ label: "Total", value: money(invoiceTotal(invoice)) });
    if (invoice.paidCents > 0)
        totals.push({
            label: "Paid",
            value: `${MINUS} ${money(invoice.paidCents)}`,
            tone: "deduct",
        });
    if (payment)
        totals.push({
            label: `Paid ${payment.on}`,
            value: `${MINUS} ${money(due)}`,
            tone: "deduct",
        });

    return (
        <>
            <div className={bodyPad + " print:hidden"}>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                    <Link
                        href={`/invoice-tool/${token}`}
                        className="text-sm font-semibold text-cobalt-500 hover:text-cobalt-700"
                    >
                        ‹ Back to payment
                    </Link>
                    <DownloadPdfButton
                        invoice={invoice}
                        payment={payment}
                        className={buttonSecondary + " disabled:cursor-wait"}
                    />
                </div>
            </div>

            <article className={bodyPad + " flex flex-col gap-10"}>
                <header className="flex flex-wrap items-start justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={business.logo}
                            alt={business.name}
                            className="h-12 w-auto self-start"
                        />
                        <p className="text-sm text-slate-600">{business.billingEmail}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:items-end sm:text-right">
                        <h1 className={pageTitle}>Invoice</h1>
                        <p className="text-base text-slate-600 tabular-nums">
                            {invoice.number}
                        </p>
                        {pill ? <div>{pill}</div> : null}
                    </div>
                </header>

                <div className="grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <p className={label}>Billed to</p>
                        <address className="flex flex-col text-[15px] leading-relaxed text-slate-700 not-italic">
                            <span className="font-semibold text-slate-900">
                                {invoice.company}
                            </span>
                            <span>{invoice.email}</span>
                            {addressLines(invoice.billingAddress).map((line) => (
                                <span key={line}>{line}</span>
                            ))}
                        </address>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start">
                        <div className="flex flex-col gap-2">
                            <dt className={label}>Invoice date</dt>
                            <dd className="text-[15px] text-slate-900">
                                {invoice.issued}
                            </dd>
                        </div>
                        <div className="flex flex-col gap-2">
                            <dt className={label}>Due date</dt>
                            <dd className="text-[15px] text-slate-900">{invoice.due}</dd>
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <dt className={label}>For</dt>
                            <dd className="text-[15px] text-slate-900">
                                {invoice.title}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left text-[15px]">
                        <thead className="bg-slate-100">
                            <tr className={label}>
                                <th
                                    scope="col"
                                    className="py-3 pl-4 font-semibold sm:pl-5"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-4 py-3 text-right font-semibold sm:table-cell"
                                >
                                    Qty
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-4 py-3 text-right font-semibold sm:table-cell"
                                >
                                    Unit price
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 pr-4 pl-4 text-right font-semibold sm:pr-5"
                                >
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 tabular-nums">
                            {invoice.lines.map((line) => (
                                <tr key={line.name}>
                                    <td className="py-4 pl-4 align-top sm:pl-5">
                                        <span className="block text-slate-900">
                                            {line.name}
                                        </span>
                                        {line.description ? (
                                            <span className="block text-sm text-slate-500">
                                                {line.description}
                                            </span>
                                        ) : null}
                                        <span className="block text-sm text-slate-500 sm:hidden">
                                            Qty {line.qty} × {money(line.priceCents)}
                                        </span>
                                    </td>
                                    <td className="hidden px-4 py-4 text-right align-top text-slate-900 sm:table-cell">
                                        {line.qty}
                                    </td>
                                    <td className="hidden px-4 py-4 text-right align-top whitespace-nowrap text-slate-900 sm:table-cell">
                                        {money(line.priceCents)}
                                    </td>
                                    <td className="py-4 pr-4 pl-4 text-right align-top whitespace-nowrap text-slate-900 sm:pr-5">
                                        {money(line.qty * line.priceCents)}
                                    </td>
                                </tr>
                            ))}
                            {invoice.lateFees.map((fee) => (
                                <tr key={fee.name}>
                                    <td className="py-4 pl-4 align-top sm:pl-5">
                                        <span className="block text-roman-700">
                                            {fee.name}
                                        </span>
                                        <span className="block text-sm text-slate-500">
                                            Added {fee.appliedOn} · invoice was due{" "}
                                            {invoice.due}
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell" />
                                    <td className="hidden sm:table-cell" />
                                    <td className="py-4 pr-4 pl-4 text-right align-top whitespace-nowrap text-roman-700 sm:pr-5">
                                        {money(fee.amountCents)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <dl className="ml-auto flex w-full max-w-sm flex-col gap-3 text-[15px] tabular-nums sm:pr-5">
                    {totals.map((row) => (
                        <div key={row.label} className="flex justify-between gap-4">
                            <dt
                                className={cn(
                                    row.tone === "add"
                                        ? "text-roman-700"
                                        : row.tone === "deduct"
                                          ? "text-fern-700"
                                          : "text-slate-600",
                                )}
                            >
                                {row.label}
                            </dt>
                            <dd
                                className={cn(
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
                        <dt className="text-base font-semibold text-slate-900">
                            Amount due
                        </dt>
                        <dd className="text-2xl font-bold text-slate-900">
                            {money(payment ? 0 : due)}
                        </dd>
                    </div>
                </dl>

                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    {payment ? (
                        <>
                            <h2 className={label}>Payment</h2>
                            <p className="text-[15px] leading-relaxed text-slate-700">
                                Paid in full on {payment.on} by {payment.detail}. Thank
                                you.
                            </p>
                        </>
                    ) : claim ? (
                        <>
                            <h2 className={label}>Payment</h2>
                            <p className="text-[15px] leading-relaxed text-slate-700">
                                You told us on {claim.on} that you sent{" "}
                                {money(claim.amountCents)} by{" "}
                                {getTransferMethod(claim.method)?.what ?? "transfer"}.
                                We&rsquo;ll mark this invoice paid once it arrives.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className={label}>How to pay</h2>
                            <p className="text-[15px] leading-relaxed text-slate-700">
                                Pay by bank transfer (ACH), international wire, Wise or
                                PayPal, or by card for amounts up to {cardLimitLabel}.{" "}
                                {business.lateFeePolicy}
                            </p>
                            <Link
                                href={`/invoice-tool/${token}`}
                                className={buttonPrimary + " w-fit print:hidden"}
                            >
                                Pay This Invoice
                                <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                        </>
                    )}
                </div>
            </article>
        </>
    );
}
