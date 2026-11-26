"use client";

import clsx from "clsx";
import { ChevronDown, Download } from "lucide-react";
import Link from "next/link";
import { Fragment, useState, type Ref } from "react";
import { business } from "../../invoice-tool/data";
import { bodyPad, buttonPrimary, buttonSecondary, pageTitle } from "../../invoice-tool/ui";
import { BASE, billedFrom } from "../data";
import { mdyLong, money, toCurrency } from "../format";
import type { Invoice } from "../types";
import PaymentMethodsView from "./PaymentMethodsView";
import { EXCHANGE_NOTE, adPlacements, paymentAmount, placementText, summaryOf } from "./staffView";

/* View invoice, for staff (the internal admin) and clients (the client
   admin, ?view=client): the original page's content (view/sections.tsx and
   PaymentMethods), unchanged, in /invoice-tool's full invoice UI: the grey page and white card, the bar with the way back and
   Download PDF, label and table styles. In order: Billed from / Billed to
   / Invoice Date + Invoice Number; the items (Invoice Item, Ad Placements,
   Start and End Date, Quantity, Subtotal, each opening to its placements'
   Discount and Amount); the summary down to Invoice Total (USD)* and the
   exchange-rate note; Payment Terms beside Payment History; the message;
   and Payment Methods. The PDF carries the same content.
   Only clients get what the original shows them alone: Pay Now (with the
   overdue dot) when the invoice can be paid online, and the "Fastest"
   online option in Payment Methods; both open the amount dialog, which
   ViewInvoice keeps with the Payment Options dialog. */

const label = "text-xs font-semibold tracking-wide text-slate-500 uppercase";
const MINUS = "−";

/** A titled table in the item table's style. */
const SmallTable = ({ title, heads, children }: { title: string; heads: [string, string]; children: React.ReactNode }) => (
    <div className="flex flex-col gap-3">
        <h2 className={label}>{title}</h2>
        <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-[15px]">
                <thead className="bg-slate-100">
                    <tr className={label}>
                        <th scope="col" className="py-3 pl-5 font-semibold">
                            {heads[0]}
                        </th>
                        <th scope="col" className="py-3 pl-4 pr-5 text-right font-semibold">
                            {heads[1]}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 tabular-nums">{children}</tbody>
            </table>
        </div>
    </div>
);

const InvoiceView = ({
    invoice,
    asClient,
    onPay,
    overdue,
    cardAllowed,
    bankAllowed,
    paymentMethodsRef,
}: {
    invoice: Invoice;
    asClient: boolean;
    /** Clients who can pay this invoice online: Pay Now and the online option. */
    onPay?: () => void;
    overdue?: boolean;
    cardAllowed: boolean;
    bankAllowed: boolean;
    /** ?paymentOptions scrolls here. */
    paymentMethodsRef?: Ref<HTMLDivElement>;
}) => {
    const [open, setOpen] = useState<number[]>([]);
    const [busy, setBusy] = useState(false);
    const sum = summaryOf(invoice);
    const toggle = (id: number) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

    const downloadPdf = async () => {
        setBusy(true);
        try {
            const { viewInvoicePdf } = await import("./viewInvoicePdf");
            const url = URL.createObjectURL(new Blob([viewInvoicePdf(invoice)], { type: "application/pdf" }));
            const a = document.createElement("a");
            a.href = url;
            a.download = `GoAbroad-Invoice-${invoice.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-100 px-4 py-6 font-inter text-slate-700 antialiased sm:px-6 sm:py-10 print:bg-white print:p-0">
            <div className="mx-auto max-w-5xl">
                <div className="rounded-2xl bg-white pb-14 shadow-sm ring-1 ring-slate-200 print:shadow-none print:ring-0">
                    <div className={`${bodyPad} print:hidden`}>
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                            <Link
                                href={asClient ? `${BASE}/client-admin/invoices` : BASE}
                                className="text-sm font-semibold text-cobalt-500 hover:text-cobalt-700"
                            >
                                ‹ Back to invoices
                            </Link>
                            <div className="flex flex-wrap items-center gap-3">
                                <button type="button" onClick={downloadPdf} disabled={busy} className={clsx(buttonSecondary, "disabled:cursor-wait")}>
                                    <Download className="size-4" aria-hidden /> Download PDF
                                </button>
                                {onPay && (
                                    // Pay Now, with the original's dot on an overdue invoice
                                    <span className="relative inline-flex">
                                        <button type="button" onClick={onPay} className={buttonPrimary}>
                                            Pay Now
                                        </button>
                                        {overdue && (
                                            <span
                                                aria-label="Overdue"
                                                className="absolute -right-1 -top-1 size-3 rounded-full bg-roman-500 ring-2 ring-white"
                                            />
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <article className={`${bodyPad} flex flex-col gap-10`}>
                        {/* /invoice-tool's header: logo and billing email; "Invoice"
                            and the invoice number */}
                        <header className="flex flex-wrap items-start justify-between gap-6">
                            <div className="flex flex-col gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={business.logo} alt={business.name} className="h-12 w-auto self-start" />
                                <p className="text-sm text-slate-600">{business.billingEmail}</p>
                            </div>
                            <div className="flex flex-col gap-1.5 sm:items-end sm:text-right">
                                <h1 className={pageTitle}>Invoice</h1>
                                <p className="text-base tabular-nums text-slate-600">{invoice.id}</p>
                            </div>
                        </header>

                        {/* Header.js: Billed from | Billed to | Invoice Date (the
                            number is in the header above) */}
                        <div className="grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-3">
                            <div className="flex flex-col gap-2">
                                <p className={label}>Billed from</p>
                                <address className="flex flex-col text-[15px] not-italic leading-relaxed text-slate-700">
                                    <span className="font-semibold text-slate-900">{billedFrom.name}</span>
                                    {billedFrom.lines.map((l) => (
                                        <span key={l}>{l}</span>
                                    ))}
                                </address>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className={label}>Billed to</p>
                                <address className="flex flex-col text-[15px] not-italic leading-relaxed text-slate-700">
                                    <span className="font-semibold text-slate-900">{invoice.billing_name}</span>
                                    {invoice.billing_address.split("\n").map((l, i) => (
                                        <span key={i}>{l}</span>
                                    ))}
                                </address>
                            </div>
                            <dl className="flex flex-col gap-6 sm:items-end sm:text-right">
                                <div className="flex flex-col gap-2">
                                    <dt className={label}>Invoice date</dt>
                                    <dd className="text-[15px] text-slate-900">{mdyLong(invoice.printed_date)}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* InvoiceItem.js, one row per item, opening to its placements */}
                        <div className="overflow-hidden rounded-xl border border-slate-200">
                            <table className="w-full text-left text-[15px]">
                                <thead className="bg-slate-100">
                                    <tr className={label}>
                                        <th scope="col" className="py-3 pl-5 font-semibold">
                                            Invoice item
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            Ad placements
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            Start date
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            End date
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                                            Subtotal
                                        </th>
                                        <th scope="col" className="w-12 py-3 pr-3">
                                            <span className="sr-only">Placements</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 tabular-nums">
                                    {invoice.invoice_items.map((item) => {
                                        const isOpen = open.includes(item.id);
                                        return (
                                            <Fragment key={item.id}>
                                                <tr>
                                                    <td className="py-4 pl-5 align-top text-slate-900">{item.product_item_name}</td>
                                                    <td className="px-4 py-4 align-top text-sm text-slate-600">
                                                        {adPlacements(item.placements_label)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 align-top text-slate-900">
                                                        {mdyLong(item.start_date)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 align-top text-slate-900">{mdyLong(item.end_date)}</td>
                                                    <td className="px-4 py-4 text-right align-top text-slate-900">{item.placements_label.length}</td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-right align-top text-slate-900">
                                                        {money(item.subtotal)}
                                                    </td>
                                                    <td className="py-3 pr-3 text-right align-top">
                                                        <button
                                                            type="button"
                                                            aria-expanded={isOpen}
                                                            aria-label={`${isOpen ? "Hide" : "Show"} placements of ${item.product_item_name}`}
                                                            onClick={() => toggle(item.id)}
                                                            className="inline-flex size-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                                                        >
                                                            <ChevronDown className={clsx("size-4 transition-transform", isOpen && "rotate-180")} />
                                                        </button>
                                                    </td>
                                                </tr>
                                                {isOpen && (
                                                    <tr className="bg-slate-50">
                                                        <td colSpan={7} className="px-5 py-4">
                                                            <table className="ml-auto w-full max-w-xl text-left text-sm">
                                                                <thead>
                                                                    <tr className={label}>
                                                                        <th scope="col" className="pb-2 font-semibold">
                                                                            Placement
                                                                        </th>
                                                                        <th scope="col" className="pb-2 text-right font-semibold">
                                                                            Discount
                                                                        </th>
                                                                        <th scope="col" className="pb-2 text-right font-semibold">
                                                                            Amount
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-slate-200 border-t border-slate-200">
                                                                    {item.placements_label.map((p, i) => (
                                                                        <tr key={i}>
                                                                            <td className="py-2 text-slate-700">{placementText(p)}</td>
                                                                            <td className="py-2 text-right text-slate-700">
                                                                                {money(item.placements[i]?.discount ?? 0)}
                                                                            </td>
                                                                            <td className="py-2 text-right text-slate-900">{money(item.cost)}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* InvoiceSummary.js, in /invoice-tool's totals style */}
                        <dl className="ml-auto flex w-full max-w-sm flex-col gap-3 text-[15px] tabular-nums sm:pr-5">
                            <div className="flex justify-between gap-4">
                                <dt className="text-slate-600">Subtotal</dt>
                                <dd className="text-slate-900">{money(sum.subtotal)}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-fern-700">Total Discount</dt>
                                <dd className="font-semibold text-fern-700">
                                    {MINUS}
                                    {money(sum.discount)}
                                </dd>
                            </div>
                            {sum.showProcessingFees && (
                                <div className="flex justify-between gap-4">
                                    <dt className="text-roman-700">Transaction Fees</dt>
                                    <dd className="font-semibold text-roman-700">+{money(sum.processingFees)}</dd>
                                </div>
                            )}
                            {sum.showTotalFees && (
                                <div className="flex justify-between gap-4">
                                    <dt className="text-roman-700">Total Fees</dt>
                                    <dd className="font-semibold text-roman-700">+{money(sum.totalFees)}</dd>
                                </div>
                            )}
                            <div className="flex items-baseline justify-between gap-3 border-t-2 border-slate-300 pt-3">
                                <dt className="text-base font-semibold text-slate-900">Invoice Total (USD)</dt>
                                <dd className="text-2xl font-bold text-slate-900">{money(sum.total)}*</dd>
                            </div>
                            <p className="text-right text-sm text-slate-500">{EXCHANGE_NOTE}</p>
                        </dl>

                        {/* PaymentTerms.js | Payments.js */}
                        <div className="grid gap-8 sm:grid-cols-2">
                            <SmallTable title="Payment terms" heads={["Due date", "Amount due"]}>
                                {invoice.payment_terms.map((t) => (
                                    <tr key={t.id}>
                                        <td className="py-3 pl-5 text-slate-900">{mdyLong(t.due_date)}</td>
                                        <td className="whitespace-nowrap py-3 pl-4 pr-5 text-right text-slate-900">{toCurrency(t.amount_due)}</td>
                                    </tr>
                                ))}
                            </SmallTable>
                            <SmallTable title="Payment history" heads={["Payment date", "Payment amount"]}>
                                {invoice.payments.length > 0 ? (
                                    invoice.payments.map((p) => (
                                        <tr key={p.id}>
                                            <td className="py-3 pl-5 text-slate-900">{p.date_created ? mdyLong(p.date_created) : "N/A"}</td>
                                            <td className="whitespace-nowrap py-3 pl-4 pr-5 text-right text-slate-900">
                                                {toCurrency(paymentAmount(p))}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="py-3 text-center text-slate-500">
                                            No Payments Yet
                                        </td>
                                    </tr>
                                )}
                            </SmallTable>
                        </div>

                        {/* Message.js, as a notice in a light tint of GoAbroad's cobalt:
                            easy to spot, still a business document (no icons or quotes) */}
                        <section className="rounded-xl border border-cobalt-500/25 bg-cobalt-500/[0.05] px-6 py-5">
                            <h2 className="text-xs font-semibold uppercase tracking-wide text-cobalt-700">Message</h2>
                            <p
                                className={clsx(
                                    "mt-2 whitespace-pre-line text-base leading-relaxed",
                                    invoice.message ? "text-slate-900" : "text-slate-500",
                                )}
                            >
                                {invoice.message || "No Message"}
                            </p>
                        </section>

                        {/* PaymentMethods (the online option for clients who can pay online) */}
                        <div ref={paymentMethodsRef} className="flex scroll-mt-6 flex-col gap-4">
                            <h2 className={label}>Payment methods</h2>
                            <PaymentMethodsView
                                pendingPayment={invoice.pending_payment}
                                onPayOnline={onPay}
                                cardAllowed={cardAllowed}
                                bankAllowed={bankAllowed}
                            />
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default InvoiceView;
