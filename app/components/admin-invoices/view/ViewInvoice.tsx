"use client";

import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { BASE, client, STRIPE_ACH_ENABLED, STRIPE_MAX_INVOICE_AMOUNT } from "../data";
import { invoiceAmountDue, invoiceSubtotal } from "../format";
import { BODY1, Button, DialogBox, LinearProgress, Paper } from "../mui";
import { useInvoices } from "../store";
import DemoCheckout from "./DemoCheckout";
import PaymentMethods from "./PaymentMethods";
import PhotoFrame, { FRAME_BUTTON, GA_LOGO } from "./PhotoFrame";
import {
    InvoiceHeader,
    InvoiceItem,
    InvoiceSummary,
    Message,
    Payments,
    PaymentTerms,
} from "./sections";

/* Copy of src/views/ClientAdmin/Tools/ViewInvoice/ViewInvoice.js (origin/dev),
   the one invoice page staff and clients share (/invoice/view/:id). No admin
   shell: just the #f2f4f7 pane with the invoice, and a grey bar pinned to the
   bottom with PAY NOW (clients, access level 1, when the invoice can be paid
   online) and DOWNLOAD PDF (unpaid, partial, overdue or paid).

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

/** The outlined "Amount (USD)" TextField with its $ adornment. */
const AmountField = ({ value, onChange, onBlur }: { value: string; onChange: (v: string) => void; onBlur: () => void }) => (
    <div className="group relative inline-flex w-full flex-col">
        <label
            htmlFor="outlined-basic"
            className="pointer-events-none absolute left-0 top-0 z-[1] origin-top-left translate-x-[14px] -translate-y-[9px] scale-75 text-base leading-[1.4375em] tracking-[0.00938em] text-[rgba(0,0,0,0.6)] group-focus-within:text-[#03a9f4]"
        >
            Amount (USD)
        </label>
        <div className="relative flex cursor-text items-center rounded-[4px] pl-[14px] text-base leading-[1.4375em] text-[rgba(0,0,0,0.87)]">
            <span className="mr-[2px] flex h-[0.01em] max-h-[2em] items-center whitespace-nowrap text-base text-[rgba(0,0,0,0.54)]">
                $
            </span>
            <input
                id="outlined-basic"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                inputMode="decimal"
                className="peer box-content h-[1.4375em] w-full min-w-0 bg-transparent py-[16.5px] pr-[14px] outline-none"
            />
            <fieldset
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -top-[5px] m-0 min-w-0 overflow-hidden rounded-[inherit] border border-solid !border-[rgba(0,0,0,0.23)] px-2 text-left group-hover:!border-[rgba(0,0,0,0.87)] peer-focus:border-2 peer-focus:!border-[#03a9f4]"
            >
                <legend className="invisible block h-[11px] w-auto max-w-full whitespace-nowrap p-0 text-[0.75em]">
                    <span className="inline-block px-[5px] opacity-0">Amount (USD)</span>
                </legend>
            </fieldset>
        </div>
    </div>
);

const ViewInvoice = ({ id }: { id: string }) => {
    const router = useRouter();
    const params = useSearchParams();
    const { getInvoice, ready } = useInvoices();
    const invoice = getInvoice(id);
    const asClient = params.get("view") === "client";
    const accessLevel = asClient ? 1 : 2;

    const paymentMethodsRef = useRef<HTMLDivElement>(null);
    const [expand, setExpand] = useState(false);
    const [saving, setSaving] = useState(false);
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

    const downloadPdf = () => {
        setExpand(true);
        setSaving(true);
        // Prototype: the browser's print dialog stands in for the stored PDF
        setTimeout(() => {
            setSaving(false);
            window.print();
        }, 900);
    };

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPaymentModalOpen(false);
            setCheckoutOpen(true);
        }, 700);
    };

    return (
        <div className="lt-root grow antialiased">
            <div className="relative z-[1] flex h-screen w-full overflow-hidden">
                <main className="grow overflow-y-auto bg-[#f2f4f7] px-[35px] pb-[60px] pt-10">
                    <div className="pdf-div">
                        <InvoiceHeader invoice={invoice} />
                        {invoice.invoice_items.map((item, index) => (
                            <InvoiceItem key={item.id} item={item} index={index} expand={expand} />
                        ))}
                        <InvoiceSummary invoice={invoice} />
                        <div className="ml-5 mt-[-25px]">
                            <em>*Exchange rate and other processing fees may apply.</em>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                            <PaymentTerms invoice={invoice} />
                            <Payments invoice={invoice} />
                        </div>
                        <Message message={invoice.message} />
                        <Paper ref={paymentMethodsRef} className="p-6" data-cy="invoice-payment-methods">
                            <p className={clsx(BODY1, "!mb-4")}>Payment Methods</p>
                            <PaymentMethods
                                cardAllowed={cardAllowed}
                                bankAllowed={bankAllowed}
                                pendingPayment={pendingPayment}
                                onPayByCard={canPayOnline ? () => setPaymentModalOpen(true) : undefined}
                            />
                        </Paper>
                    </div>
                    <div className="absolute bottom-0 right-0 z-[1] mx-2 flex w-full items-center justify-center border-t border-solid !border-t-[#e2e2e2] bg-[#f2f2f2] py-5">
                        {canPayOnline &&
                            (status === 4 ? (
                                // Badge variant="dot" color="secondary" (its
                                // makePayment class is passed wrongly, so the
                                // plain pink dot shows)
                                <span className="relative inline-flex">
                                    <Button variant="contained" color="primary" onClick={() => setPaymentModalOpen(true)}>
                                        PAY NOW
                                    </Button>
                                    <span className="absolute right-0 top-0 h-2 min-w-2 -translate-y-1/2 translate-x-1/2 rounded-[4px] bg-[#e91e63]" />
                                </span>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => setPaymentModalOpen(true)}>
                                    PAY NOW
                                </Button>
                            ))}
                        {[2, 3, 4, 5].includes(status) && (
                            <Button variant="contained" color="primary" className="mx-2" onClick={downloadPdf}>
                                DOWNLOAD PDF
                            </Button>
                        )}
                    </div>
                </main>
            </div>

            <DialogBox open={saving} title="Downloading PDF..." actions="">
                <LinearProgress />
            </DialogBox>

            <DialogBox
                open={paymentOptionsOpen || (paymentModalOpen && (!stripeAllowed || !!pendingPayment))}
                title="Payment Options"
                actions="Ok"
                stringOverride={{ primaryAction: "Close" }}
                onClose={() => {
                    setPaymentOptionsOpen(false);
                    setPaymentModalOpen(false);
                }}
            >
                <PaymentMethods
                    cardAllowed={cardAllowed}
                    bankAllowed={bankAllowed}
                    pendingPayment={pendingPayment}
                    onPayByCard={
                        canPayOnline
                            ? () => {
                                  setPaymentOptionsOpen(false);
                                  setPaymentModalOpen(true);
                              }
                            : undefined
                    }
                />
            </DialogBox>

            <DialogBox
                open={paymentModalOpen && stripeAllowed && !pendingPayment}
                title="Enter amount"
                actions=""
                onClose={() => setPaymentModalOpen(false)}
            >
                <div>
                    <div>
                        <AmountField
                            value={paymentAmount}
                            onChange={setPaymentAmount}
                            onBlur={() => setPaymentAmount(fixAmount(paymentAmount))}
                        />
                        {bankAllowed && (
                            <p className="mx-0 mb-0 mt-3 text-[0.875rem] text-[#555]">
                                {cardAllowed
                                    ? "You can pay by credit card or U.S. bank account on the next page."
                                    : `Invoices over $${STRIPE_MAX_INVOICE_AMOUNT} can be paid online by U.S. bank account only.`}{" "}
                                Bank payments take 2 to 4 business days to clear.
                            </p>
                        )}
                    </div>
                    {loading ? (
                        <LinearProgress className="mt-5" />
                    ) : (
                        <Button variant="contained" color="primary" className="mt-5 w-full" onClick={handlePay}>
                            Proceed to checkout
                        </Button>
                    )}
                </div>
            </DialogBox>

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
        </div>
    );
};

export default ViewInvoice;
