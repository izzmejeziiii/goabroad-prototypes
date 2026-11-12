"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
    ArrowRight,
    CircleCheck,
    FileText,
    Hourglass,
    Lock,
    Printer,
} from "lucide-react";
import CardPanel, { type AddressErrors, validateAddress } from "./CardPanel";
import DownloadPdfButton from "./DownloadPdfButton";
import MethodList, { type MethodOption } from "./MethodList";
import MobilePayBar from "./MobilePayBar";
import Summary, { type SummaryData, type SummaryRow } from "./Summary";
import TransferPanel from "./TransferPanel";
import {
    amountDue,
    business,
    cardAvailable,
    cardLimitLabel,
    findByToken,
    getTransferMethod,
    invoiceTotal,
    lateFeeTotal,
    lineTotal,
    money,
    todayLabel,
    transferMethods,
} from "./data";
import {
    getServerSnapshot,
    getSnapshot,
    parseOverrides,
    subscribe,
    writeOverride,
} from "./store";
import type {
    BillingAddress,
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
    const cardAllowed = cardAvailable(due);

    const [revealed, setRevealed] = useState(false);
    const [selected, setSelected] = useState<MethodId>(cardAllowed ? "card" : "ach");
    // The card step starts with the account's billing address filled in.
    const [address, setAddress] = useState<BillingAddress>(invoice.billingAddress);
    const [editingAddress, setEditingAddress] = useState(false);
    const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
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
                      note: `${money(due)}, no fee`,
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
        // No card fee: GoAbroad absorbs it, so the payer pays the amount due.
        cta = busy ? "Opening secure checkout…" : `Pay ${money(due)}`;
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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (busy) return;

        // The account's address is taken as is; an edited one is checked.
        if (selected === "card" && editingAddress) {
            const errs = validateAddress(address);
            setAddressErrors(errs);
            if (Object.keys(errs).length) return;
        }

        setBusy(true);
        window.setTimeout(
            () => {
                if (selected === "card") {
                    writeOverride(invoice.token, {
                        payment: {
                            method: "card",
                            amountCents: due,
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
        subtitle: [invoice.title, `Due ${invoice.due}`],
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
                {selected === "card" ? <Lock className="h-4 w-4" aria-hidden /> : null}
                {cta}
                {!busy && selected !== "card" ? (
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
                                Card payments are only available for amounts up to{" "}
                                {cardLimitLabel}. Pay by bank transfer, wire, Wise or
                                PayPal instead.
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
                                company={invoice.company}
                                address={address}
                                editing={editingAddress}
                                onEdit={() => setEditingAddress(true)}
                                onReset={() => {
                                    setAddress(invoice.billingAddress);
                                    setEditingAddress(false);
                                    setAddressErrors({});
                                }}
                                onAddressChange={(next) => {
                                    setAddress(next);
                                    setAddressErrors({});
                                }}
                                errors={addressErrors}
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
                <Summary data={summary}>
                    {payButton}
                    <p className="text-center text-xs leading-relaxed text-slate-500">
                        {business.lateFeePolicy}
                    </p>
                </Summary>
            </aside>

            <MobilePayBar data={summary} note={business.lateFeePolicy}>
                {payButton}
            </MobilePayBar>
        </div>
    );
}

/** The pay page doesn't list the invoice's items; the full invoice opens in
 *  a new tab, or downloads as a PDF. */
const docLink =
    buttonSecondary + " [&_svg]:text-cobalt-500 disabled:cursor-wait disabled:opacity-70";

function InvoiceHeader({
    invoice,
    payment,
    pill,
    children,
}: {
    invoice: DemoInvoice;
    payment?: RecordedPayment;
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
            <div className="mt-1 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <Link
                    href={`/invoice-tool/${invoice.token}/invoice`}
                    target="_blank"
                    className={docLink}
                >
                    <FileText className="h-4 w-4" aria-hidden />
                    View full invoice
                    <span className="sr-only"> (opens in a new tab)</span>
                </Link>
                <DownloadPdfButton
                    invoice={invoice}
                    payment={payment}
                    className={docLink}
                />
            </div>
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
                <InvoiceHeader
                    invoice={invoice}
                    payment={payment}
                    pill={<Pill tone="paid">Paid</Pill>}
                >
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
            </div>

            <aside
                ref={asideRef}
                style={{ top: asideTop }}
                className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start"
            >
                <Summary
                    data={{
                        title: `Invoice ${invoice.number}`,
                        subtitle: [invoice.title, `Paid ${payment.on}`],
                        breakdown,
                        result: { label: "Balance", value: money(0) },
                        extras: [],
                    }}
                />
            </aside>
        </div>
    );
}
