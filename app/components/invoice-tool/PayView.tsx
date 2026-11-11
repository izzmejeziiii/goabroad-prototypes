"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, Hourglass, Lock, Printer } from "lucide-react";
import CardPanel, { type AddressErrors } from "./CardPanel";
import ItemsList from "./ItemsList";
import MethodList, { type MethodOption } from "./MethodList";
import MobilePayBar from "./MobilePayBar";
import Summary, { type SummaryData, type SummaryRow } from "./Summary";
import TransferPanel from "./TransferPanel";
import {
    CARD_LIMIT_CENTS,
    amountDue,
    business,
    findByToken,
    getTransferMethod,
    invoiceTotal,
    lateFeeTotal,
    lineTotal,
    money,
    quoteCard,
    todayLabel,
    transferMethods,
} from "./data";
import { subdivisions } from "./regions";
import {
    getServerSnapshot,
    getSnapshot,
    parseOverrides,
    subscribe,
    writeOverride,
} from "./store";
import type {
    BillingAddress,
    CardQuote,
    DemoInvoice,
    MethodId,
    RecordedPayment,
    TransferClaim,
    TransferMethodId,
} from "./types";
import {
    Notice,
    Pill,
    BrandBand,
    bodyPad,
    buttonPrimary,
    buttonSecondary,
    lede,
    pageTitle,
    textLink,
} from "./ui";

const FORM_ID = "pay-form";
const emptyAddress: BillingAddress = { country: "", region: "", postalCode: "" };

/** A real minus sign, so deductions read as subtraction, not a dash. */
const MINUS = "−";

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/** Sticky offset for the sidebar. It pins 24px below the top of the window;
 *  when it's taller than the window, the offset goes negative so it pins by
 *  its bottom edge instead and the pay button never sits off-screen. */
function useStickyTop(gap = 24) {
    const ref = useRef<HTMLElement>(null);
    const [top, setTop] = useState(gap);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const update = () =>
            setTop(Math.min(gap, window.innerHeight - el.offsetHeight - gap));
        // Fires once on observe, then whenever the sidebar changes height.
        const observer = new ResizeObserver(update);
        observer.observe(el);
        window.addEventListener("resize", update);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", update);
        };
    }, [gap]);
    return [ref, top] as const;
}

export default function PayView({ token }: { token: string }) {
    const invoice = findByToken(token)!;
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const override = useMemo(() => parseOverrides(raw)[token] ?? {}, [raw, token]);

    const payment = override.payment ?? invoice.payment;
    const claim = override.claim ?? invoice.claim;

    return (
        <>
            <BrandBand step={payment ? 3 : 2} />
            <div className={bodyPad}>
                {payment ? (
                    <PaidView
                        invoice={invoice}
                        payment={payment}
                        justPaid={!!override.payment}
                    />
                ) : (
                    <PayForm
                        key={
                            claim
                                ? `${claim.method}-${claim.amountCents}-${claim.on}`
                                : "open"
                        }
                        invoice={invoice}
                        claim={claim}
                    />
                )}
            </div>
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Open invoice: choose a method and pay                               */
/* ------------------------------------------------------------------ */

function PayForm({ invoice, claim }: { invoice: DemoInvoice; claim?: TransferClaim }) {
    const [asideRef, asideTop] = useStickyTop();
    const due = amountDue(invoice);
    const cardAllowed = invoice.cardAllowed && due <= CARD_LIMIT_CENTS;

    const [revealed, setRevealed] = useState(false);
    const [selected, setSelected] = useState<MethodId>(cardAllowed ? "card" : "ach");
    const [address, setAddress] = useState<BillingAddress>(emptyAddress);
    const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
    const [quote, setQuote] = useState<CardQuote | null>(null);
    const [references, setReferences] = useState<
        Partial<Record<TransferMethodId, string>>
    >({});
    const [busy, setBusy] = useState(false);

    const showMethods = !claim || revealed;
    const transfer = selected === "card" ? undefined : getTransferMethod(selected);

    const options: MethodOption[] = [
        ...(cardAllowed
            ? [
                  {
                      id: "card" as const,
                      name: "Credit or debit card",
                      note: quote
                          ? quote.applies
                              ? `${money(quote.chargeCents)} incl. fee`
                              : `${money(quote.chargeCents)}, no fee`
                          : "Fee depends on billing address",
                  },
              ]
            : []),
        ...transferMethods.map((m) => ({
            id: m.id,
            name: m.title,
            note:
                m.feeCents > 0
                    ? `${money(due + m.feeCents)} incl. fee`
                    : `${money(due)}, no fee`,
        })),
    ];

    // What the sidebar shows for the selected method.
    let feeRow: SummaryRow | null = null;
    let totalToday = due;
    let cta = "";
    if (selected === "card") {
        feeRow = quote?.applies
            ? { label: "Card fee", value: `+ ${money(quote.feeCents)}`, tone: "fee" }
            : { label: "Card fee", value: quote ? "None" : "Depends on address" };
        totalToday = quote ? quote.chargeCents : due;
        cta = quote
            ? busy
                ? "Opening secure checkout…"
                : `Pay ${money(quote.chargeCents)}`
            : busy
              ? "Confirming…"
              : "Confirm billing address";
    } else if (transfer) {
        if (transfer.feeCents > 0)
            feeRow = {
                label: transfer.feeLabel ?? "Fee",
                value: `+ ${money(transfer.feeCents)}`,
                tone: "fee",
            };
        totalToday = due + transfer.feeCents;
        cta = busy ? "Saving…" : `I've sent ${money(totalToday)}`;
    }

    // How the amount due is reached: what was billed, any late fee added, any
    // payment already taken off. Only shown when there's something to explain.
    const lateFees = lateFeeTotal(invoice);
    const breakdown: SummaryRow[] = [];
    if (lateFees > 0 || invoice.paidCents > 0) {
        breakdown.push({
            label: lateFees > 0 ? "Items" : "Invoice total",
            value: money(lineTotal(invoice)),
        });
        if (lateFees > 0)
            breakdown.push({
                label: "Late fee",
                value: `+ ${money(lateFees)}`,
                tone: "add",
            });
        if (invoice.paidCents > 0)
            breakdown.push({
                label: "Already paid",
                value: `${MINUS} ${money(invoice.paidCents)}`,
                tone: "deduct",
            });
    }
    const itemCount = invoice.lines.length;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (busy) return;

        if (selected === "card" && !quote) {
            const errs: AddressErrors = {};
            if (!address.country)
                errs.country = "Choose the country on your card statement.";
            if (address.country && subdivisions[address.country] && !address.region)
                errs.region = "Choose one from the list.";
            if (
                address.country === "US" &&
                !/^\d{5}(-\d{4})?$/.test(address.postalCode.trim())
            )
                errs.postalCode = "Enter a 5-digit ZIP code.";
            setAddressErrors(errs);
            if (Object.keys(errs).length) return;
            setBusy(true);
            window.setTimeout(() => {
                setQuote(quoteCard(address, due));
                setBusy(false);
            }, 500);
            return;
        }

        setBusy(true);
        window.setTimeout(
            () => {
                if (selected === "card" && quote) {
                    writeOverride(invoice.token, {
                        payment: {
                            method: "card",
                            amountCents: quote.chargeCents,
                            on: todayLabel(),
                            detail: "Visa ending 4242",
                        },
                    });
                } else if (transfer) {
                    writeOverride(invoice.token, {
                        claim: {
                            method: transfer.id,
                            amountCents: totalToday,
                            on: todayLabel(),
                            customerReference:
                                references[transfer.id]?.trim() || undefined,
                        },
                    });
                }
                setBusy(false);
                setRevealed(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
            selected === "card" ? 1400 : 600,
        );
    };

    const pill =
        lateFees > 0 ? (
            <Pill tone="overdue">Overdue · late fee added</Pill>
        ) : claim ? (
            <Pill tone="waiting">Payment on its way</Pill>
        ) : invoice.paidCents > 0 ? (
            <Pill tone="partial">Partly paid</Pill>
        ) : null;

    const fee = showMethods ? feeRow : null;
    const summary: SummaryData = {
        title: `Invoice ${invoice.number}`,
        subtitle: `Due ${invoice.due} · ${itemCount} ${itemCount === 1 ? "item" : "items"}`,
        breakdown,
        result: { label: "Amount due", value: money(due) },
        extras: fee ? [fee] : [],
        grand: fee ? { label: "Total today", value: money(totalToday) } : undefined,
    };
    const payButton =
        showMethods && cta ? (
            <button
                type="submit"
                form={FORM_ID}
                className={buttonPrimary + " w-full"}
                disabled={busy}
            >
                {selected === "card" && quote ? (
                    <Lock className="h-4 w-4" aria-hidden />
                ) : null}
                {cta}
                {!busy && !(selected === "card" && quote) ? (
                    <ArrowRight className="h-4 w-4" aria-hidden />
                ) : null}
            </button>
        ) : null;

    return (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
            <div className="flex min-w-0 flex-col gap-8">
                <InvoiceHeader invoice={invoice} pill={pill}>
                    Sent to {invoice.email} for {invoice.company}.
                    {claim
                        ? ""
                        : " Choose how to pay — you'll see the total before you commit."}
                </InvoiceHeader>

                <ItemsList invoice={invoice} className="lg:hidden" />

                {claim ? (
                    <WaitingNotice
                        invoice={invoice}
                        claim={claim}
                        revealed={revealed}
                        onReveal={() => {
                            setRevealed(true);
                            setSelected(claim.method);
                        }}
                    />
                ) : null}

                {showMethods ? (
                    <section
                        className="flex flex-col gap-4"
                        aria-labelledby="methods-title"
                    >
                        <h2
                            id="methods-title"
                            className="text-lg font-semibold text-slate-900"
                        >
                            How Would You Like to Pay?
                        </h2>
                        {!cardAllowed ? (
                            <Notice tone="info">
                                Card payments aren&rsquo;t available for invoices over{" "}
                                {money(CARD_LIMIT_CENTS)}. Pay by bank transfer, wire,
                                Wise or PayPal instead.
                            </Notice>
                        ) : null}
                        <MethodList
                            options={options}
                            selected={selected}
                            onSelect={setSelected}
                        />
                    </section>
                ) : null}

                {showMethods ? (
                    <form id={FORM_ID} onSubmit={submit} noValidate>
                        {selected === "card" ? (
                            <CardPanel
                                address={address}
                                onAddressChange={(next) => {
                                    setAddress(next);
                                    setAddressErrors({});
                                }}
                                errors={addressErrors}
                                quote={quote}
                            />
                        ) : transfer ? (
                            <TransferPanel
                                key={transfer.id}
                                method={transfer}
                                amountCents={totalToday}
                                invoiceNumber={invoice.number}
                                reference={references[transfer.id] ?? ""}
                                onReferenceChange={(v) =>
                                    setReferences((r) => ({ ...r, [transfer.id]: v }))
                                }
                            />
                        ) : null}
                    </form>
                ) : null}
            </div>

            <aside
                ref={asideRef}
                style={{ top: asideTop }}
                className="hidden flex-col gap-6 lg:sticky lg:top-6 lg:flex lg:self-start"
            >
                <ItemsList invoice={invoice} className="hidden lg:flex" />
                <Summary data={summary}>
                    {payButton}
                    <p className="text-center text-xs leading-relaxed text-slate-500">
                        {business.lateFeePolicy}
                    </p>
                </Summary>
            </aside>

            <MobilePayBar
                data={summary}
                note={business.lateFeePolicy}
                itemCount={itemCount}
            >
                {payButton}
            </MobilePayBar>
        </div>
    );
}

function InvoiceHeader({
    invoice,
    pill,
    children,
}: {
    invoice: DemoInvoice;
    pill?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3">
            <Link
                href="/invoice-tool"
                className="w-fit text-sm font-semibold text-cobalt-500 hover:text-cobalt-700"
            >
                ‹ Look up a different invoice
            </Link>
            <h1 className={pageTitle + " flex flex-wrap items-center gap-x-4 gap-y-2"}>
                Invoice {invoice.number}
                {pill}
            </h1>
            <p className={lede}>{children}</p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Waiting: the payer said they sent a transfer                        */
/* ------------------------------------------------------------------ */

function WaitingNotice({
    invoice,
    claim,
    revealed,
    onReveal,
}: {
    invoice: DemoInvoice;
    claim: TransferClaim;
    revealed: boolean;
    onReveal: () => void;
}) {
    const what = getTransferMethod(claim.method)?.what ?? "payment";
    return (
        <div
            role="status"
            className="flex flex-col gap-3 rounded-xl border border-dashed border-sun-500 bg-sun-200/25 p-5 sm:p-6"
        >
            <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-sun-200 text-cobalt-700">
                    <Hourglass className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="text-lg font-semibold text-slate-900">
                    We&rsquo;re Watching for Your {titleCase(what)}
                </h2>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-700">
                You told us on {claim.on} that you sent {money(claim.amountCents)}
                {claim.customerReference
                    ? ` (your reference ${claim.customerReference})`
                    : ""}{" "}
                for invoice {invoice.number}. We&rsquo;ll mark it paid once the money
                arrives and we&rsquo;ve matched it, then email {invoice.email}. Bank
                transfers usually take 1 to 3 business days; international wires can take
                up to 5.
            </p>
            {revealed ? (
                <p className="text-sm text-slate-600">
                    Confirming a new method below replaces what you told us before.
                </p>
            ) : (
                <button
                    type="button"
                    onClick={onReveal}
                    className={textLink + " w-fit text-left text-sm"}
                >
                    Sent it a different way, or didn&rsquo;t send it? Choose another
                    method
                </button>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Paid                                                                */
/* ------------------------------------------------------------------ */

function PaidView({
    invoice,
    payment,
    justPaid,
}: {
    invoice: DemoInvoice;
    payment: RecordedPayment;
    justPaid: boolean;
}) {
    const [asideRef, asideTop] = useStickyTop();
    const due = amountDue(invoice);
    const fee = payment.amountCents - due;
    const breakdown: SummaryRow[] = [
        { label: "Invoice total", value: money(invoiceTotal(invoice)) },
    ];
    if (invoice.paidCents > 0)
        breakdown.push({
            label: "Paid earlier",
            value: `${MINUS} ${money(invoice.paidCents)}`,
            tone: "deduct",
        });
    breakdown.push({
        label: `Paid ${payment.on}`,
        value: `${MINUS} ${money(due)}`,
        tone: "deduct",
    });

    return (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
            <div className="flex min-w-0 flex-col gap-8">
                <InvoiceHeader invoice={invoice} pill={<Pill tone="paid">Paid</Pill>}>
                    Sent to {invoice.email} for {invoice.company}.
                </InvoiceHeader>

                <div
                    role="status"
                    className="flex flex-col gap-4 rounded-2xl border border-fern-300 bg-fern-200/20 p-5 sm:p-6"
                >
                    <div className="flex items-center gap-3">
                        <CircleCheck
                            className="h-9 w-9 flex-none text-fern-700"
                            aria-hidden
                        />
                        <h2 className="text-lg font-semibold text-slate-900">
                            {justPaid
                                ? "You're All Set!"
                                : "This Invoice Is Paid in Full"}
                        </h2>
                    </div>
                    <p className="text-[15px] leading-relaxed text-slate-700">
                        {justPaid ? "Thanks — your payment went through. " : ""}We
                        received {money(payment.amountCents)} by {payment.detail} on{" "}
                        {payment.on}.{" "}
                        {justPaid
                            ? `A receipt is on its way to ${invoice.email}.`
                            : `The receipt went to ${invoice.email}.`}{" "}
                        There&rsquo;s nothing else you need to do.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            className={buttonSecondary}
                            onClick={() => window.print()}
                        >
                            <Printer className="h-4 w-4" aria-hidden />
                            Print receipt
                        </button>
                        <Link href="/invoice-tool" className={buttonSecondary}>
                            Pay another invoice
                        </Link>
                    </div>
                </div>

                <ItemsList invoice={invoice} className="lg:hidden" />
            </div>

            <aside
                ref={asideRef}
                style={{ top: asideTop }}
                className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start"
            >
                <ItemsList invoice={invoice} className="hidden lg:flex" />
                <Summary
                    data={{
                        title: `Invoice ${invoice.number}`,
                        subtitle: `Paid ${payment.on}`,
                        breakdown,
                        result: { label: "Balance", value: money(0) },
                        extras: [],
                    }}
                >
                    {fee > 0 ? (
                        <p className="text-center text-xs leading-relaxed text-slate-500">
                            You also paid a {money(fee)} card fee. It&rsquo;s listed on
                            your receipt.
                        </p>
                    ) : null}
                </Summary>
            </aside>
        </div>
    );
}
