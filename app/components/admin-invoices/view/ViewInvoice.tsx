"use client";

import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { buttonPrimary, buttonSecondary, inputClass } from "../../invoice-tool/ui";
import { BASE, client, STRIPE_ACH_ENABLED, STRIPE_MAX_INVOICE_AMOUNT } from "../data";
import { invoiceAmountDue, invoiceSubtotal } from "../format";
import { LinearProgress } from "../mui";
import { useInvoices } from "../store";
import DemoCheckout from "./DemoCheckout";
import InvoiceView from "./InvoiceView";
import PaymentMethodsView from "./PaymentMethodsView";
import PhotoFrame, { FRAME_BUTTON, GA_LOGO } from "./PhotoFrame";

/* src/views/ClientAdmin/Tools/ViewInvoice/ViewInvoice.js (origin/dev), the
   one invoice page staff and clients share (/invoice/view/:id), redesigned:
   the same content in /invoice-tool's invoice UI (InvoiceView), with the
   original's rules for who sees what. Clients (access level 1) also get Pay
   Now and the online option when the invoice can be paid online, which open
   "Enter amount"; and the "Payment Options" dialog. Both dialogs keep the
   original's titles, text and behaviour in the new look.

   ?view=client  shows it as the client (access level 1); without it, staff.
   ?openPayment  opens the amount dialog (the header's Pay Now links here).
   ?paymentOptions opens the Payment Options dialog (invoice emails).

   Stripe Checkout is outside the admin, so "Proceed to checkout" opens a
   labelled prototype stand-in (DemoCheckout) that then lands on the real
   success page. */

const fixAmount = (value: string) => {
    const n = Number(value);
    if (Number.isNaN(n)) return "0.00";
    const [, decimals = ""] = String(n).split(".");
    return decimals.length <= 2 ? n.toFixed(2) : String(n);
};

/** A dialog in /invoice-tool's look, portalled above everything. */
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) =>
    createPortal(
        <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4 font-inter text-slate-700 antialiased" role="presentation">
            <div className="absolute inset-0 bg-slate-900/30" aria-hidden onClick={onClose} />
            <div role="dialog" aria-modal="true" aria-label={title} className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="inline-flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    >
                        <X className="size-4" />
                    </button>
                </div>
                <div className="overflow-y-auto px-6 py-5">{children}</div>
            </div>
        </div>,
        document.body,
    );

const ViewInvoice = ({ id }: { id: string }) => {
    const router = useRouter();
    const params = useSearchParams();
    const { getInvoice, ready } = useInvoices();
    const invoice = getInvoice(id);
    const asClient = params.get("view") === "client";
    const accessLevel = asClient ? 1 : 2;

    const paymentMethodsRef = useRef<HTMLDivElement>(null);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentOptionsOpen, setPaymentOptionsOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState("0.00");
    const [loading, setLoading] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    // componentDidMount + getInvoice: read the query flags, seed the amount
    useEffect(() => {
        if (!ready || !invoice) return;
        setPaymentAmount(invoiceAmountDue(invoice).toFixed(2));
        setPaymentModalOpen(params.has("openPayment"));
        setPaymentOptionsOpen(params.has("paymentOptions"));
        if (params.has("paymentOptions")) {
            paymentMethodsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Only on arrival, like the real componentDidMount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready, invoice?.id]);

    if (!ready) {
        return (
            <div className="lt-root">
                <LinearProgress />
            </div>
        );
    }

    if (!invoice) {
        return (
            <PhotoFrame back={{ href: BASE, label: "Back to GoAbroad" }} paperClassName="max-w-[430px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="mb-8" src={GA_LOGO} alt="GoAbroad" />
                <h1 className="text-[3em] font-bold text-[#333]">404</h1>
                <h2 className="mb-8 text-center text-[1.2em] text-[#555]">Page not found.</h2>
            </PhotoFrame>
        );
    }

    // A client only gets their own, sent invoices (the API answers 403 / 0)
    if (asClient && (invoice.provider_id !== client.id || invoice.status === 0)) {
        return (
            <PhotoFrame back={{ href: "https://www.goabroad.com", label: "Back to GoAbroad" }} paperClassName="max-w-[430px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="mb-8" src={GA_LOGO} alt="GoAbroad" />
                <h1 className="text-[3em] font-bold text-[#333]">Forbidden</h1>
                <h2 className="mb-8 text-center text-[1.2em] text-[#555]">
                    You are not authorized to view this invoice.
                </h2>
                <a href="https://www.goabroad.com/contact" className={FRAME_BUTTON}>
                    Contact Us
                </a>
            </PhotoFrame>
        );
    }

    const invoiceValue =
        invoiceSubtotal(invoice) - (Number(invoice.discount) || 0) + (Number(invoice.upcharge) || 0);
    const cardAllowed = invoiceValue <= STRIPE_MAX_INVOICE_AMOUNT;
    const bankAllowed = STRIPE_ACH_ENABLED;
    const stripeAllowed = cardAllowed || bankAllowed;
    const pendingPayment = invoice.pending_payment;
    // "Near due" is a list filter; the invoice itself is unpaid (2)
    const status = invoice.status === 7 ? 2 : invoice.status;
    const canPayOnline = accessLevel === 1 && stripeAllowed && !pendingPayment && [2, 3, 4].includes(status);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPaymentModalOpen(false);
            setCheckoutOpen(true);
        }, 700);
    };

    const showOptions = paymentOptionsOpen || (paymentModalOpen && (!stripeAllowed || !!pendingPayment));
    const showAmount = paymentModalOpen && stripeAllowed && !pendingPayment;

    return (
        <>
            <InvoiceView
                invoice={invoice}
                asClient={asClient}
                onPay={canPayOnline ? () => setPaymentModalOpen(true) : undefined}
                overdue={status === 4}
                cardAllowed={cardAllowed}
                bankAllowed={bankAllowed}
                paymentMethodsRef={paymentMethodsRef}
            />

            {showOptions && (
                <Modal
                    title="Payment Options"
                    onClose={() => {
                        setPaymentOptionsOpen(false);
                        setPaymentModalOpen(false);
                    }}
                >
                    <PaymentMethodsView
                        pendingPayment={pendingPayment}
                        cardAllowed={cardAllowed}
                        bankAllowed={bankAllowed}
                        onPayOnline={
                            canPayOnline
                                ? () => {
                                      setPaymentOptionsOpen(false);
                                      setPaymentModalOpen(true);
                                  }
                                : undefined
                        }
                    />
                    <div className="mt-5 flex justify-end">
                        <button
                            type="button"
                            className={clsx(buttonSecondary, "!px-4 !py-2")}
                            onClick={() => {
                                setPaymentOptionsOpen(false);
                                setPaymentModalOpen(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}

            {showAmount && (
                <Modal title="Enter amount" onClose={() => setPaymentModalOpen(false)}>
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-slate-700">Amount (USD)</span>
                        <span className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                            <input
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                onBlur={() => setPaymentAmount(fixAmount(paymentAmount))}
                                inputMode="decimal"
                                className={clsx(inputClass, "pl-7 tabular-nums")}
                            />
                        </span>
                    </label>
                    {bankAllowed && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {cardAllowed
                                ? "You can pay by credit card or U.S. bank account on the next page."
                                : `Invoices over $${STRIPE_MAX_INVOICE_AMOUNT} can be paid online by U.S. bank account only.`}{" "}
                            Bank payments take 2 to 4 business days to clear.
                        </p>
                    )}
                    <button type="button" className={clsx(buttonPrimary, "mt-5 w-full")} disabled={loading} onClick={handlePay}>
                        {loading ? "Taking you to checkout…" : "Proceed to checkout"}
                    </button>
                </Modal>
            )}

            <DemoCheckout
                open={checkoutOpen}
                invoice={invoice}
                amount={Number(paymentAmount) || 0}
                cardAllowed={cardAllowed}
                bankAllowed={bankAllowed}
                onClose={() => setCheckoutOpen(false)}
                onDone={(checkoutId, outcome) =>
                    router.push(`${BASE}/invoice/success/${checkoutId}?invoice_id=${invoice.id}&status=${outcome}`)
                }
            />
        </>
    );
};

export default ViewInvoice;
