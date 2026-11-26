"use client";

import { MdOutlineAccountBalance, MdOutlineCreditCard } from "react-icons/md";
import { DEMO_TODAY } from "../data";
import { money, nowStamp } from "../format";
import { useInvoices } from "../store";
import type { Invoice } from "../types";

/* Prototype stand-in for Stripe Checkout, which the real "Proceed to
   checkout" redirects to. Deliberately plain and labelled as a prototype
   (not a copy of Stripe's page): pick how the payment goes, then land on
   the admin's own success page.
   Card → recorded as a paid card payment. Bank → a pending bank payment,
   which the list and the invoice then show as "Payment pending". */

const DemoCheckout = ({
    open,
    invoice,
    amount,
    cardAllowed,
    bankAllowed,
    onClose,
    onDone,
}: {
    open: boolean;
    invoice: Invoice;
    amount: number;
    cardAllowed: boolean;
    bankAllowed: boolean;
    onClose: () => void;
    onDone: (checkoutId: string, outcome: "paid" | "processing") => void;
}) => {
    const { addPayment, updateInvoice } = useInvoices();
    if (!open) return null;

    const checkoutId = `cs_demo_${invoice.id}_${Math.round(amount * 100)}`;

    const payByCard = () => {
        addPayment(invoice.id, {
            amount,
            total_amount: amount,
            payment_method: "Credit Card",
            reference: `ch_demo_${invoice.id}`,
            recorded_by: "Stripe",
        });
        onDone(checkoutId, "paid");
    };

    const payByBank = () => {
        updateInvoice(invoice.id, {
            pending_payment: { amount, since: DEMO_TODAY },
            activities: [
                ...invoice.activities,
                {
                    id: Date.now(),
                    date_created: nowStamp(),
                    user: "Stripe",
                    action: `Bank payment of ${money(amount)} submitted`,
                },
            ],
        });
        onDone(checkoutId, "processing");
    };

    const option =
        "flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50";

    return (
        <div className="fixed inset-0 z-[1400] flex items-center justify-center bg-slate-900/60 p-4 font-inter">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                <span className="rounded bg-sun-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900">
                    Prototype
                </span>
                <h2 className="mt-3 text-lg font-bold text-slate-900">Stripe Checkout opens here</h2>
                <p className="mt-1 text-sm text-slate-600">
                    The real admin sends the client to Stripe to pay {money(amount)} on invoice {invoice.id}. Pick
                    how this demo payment goes:
                </p>
                <div className="mt-5 flex flex-col gap-2">
                    {cardAllowed && (
                        <button type="button" onClick={payByCard} className={option}>
                            <MdOutlineCreditCard className="size-5 text-slate-500" />
                            <span>
                                Pay by card
                                <span className="block text-xs font-normal text-slate-500">Posts right away</span>
                            </span>
                        </button>
                    )}
                    {bankAllowed && (
                        <button type="button" onClick={payByBank} className={option}>
                            <MdOutlineAccountBalance className="size-5 text-slate-500" />
                            <span>
                                Pay by U.S. bank account
                                <span className="block text-xs font-normal text-slate-500">
                                    Clears in 2 to 4 business days
                                </span>
                            </span>
                        </button>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                    Cancel and go back
                </button>
            </div>
        </div>
    );
};

export default DemoCheckout;
