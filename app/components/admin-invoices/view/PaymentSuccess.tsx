"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE } from "../data";
import PhotoFrame, { FRAME_BUTTON, GA_LOGO } from "./PhotoFrame";

/* Copy of src/views/Client/Invoices/ViewInvoice/PaymentSuccess.js
   (/invoice/success/:checkout_id), where Stripe Checkout returns. It asks
   the proxy for the session's status before saying anything: paid (card),
   processing (bank payment), or unknown. The prototype's checkout stand-in
   passes the outcome as ?status=. */

type Status = "checking" | "paid" | "processing" | "unknown";

const MESSAGE_CLASS = "mb-8 mt-0 max-w-[450px] text-center text-[1.5em] leading-[1.5em] text-[#333]";

const PaymentSuccess = ({ checkoutId }: { checkoutId: string }) => {
    const router = useRouter();
    const params = useSearchParams();
    const invoiceId = params.get("invoice_id");
    const [status, setStatus] = useState<Status>("checking");

    useEffect(() => {
        const outcome = params.get("status");
        const t = setTimeout(
            () => setStatus(!checkoutId ? "unknown" : outcome === "paid" || outcome === "processing" ? outcome : "unknown"),
            800,
        );
        return () => clearTimeout(t);
    }, [checkoutId, params]);

    const message = {
        paid: "Payment has been successfully received!",
        processing:
            "Your bank payment has been submitted. It usually takes 2 to 4 business days to clear, and the invoice will be marked paid once it does.",
        unknown: "Your payment has been submitted. You'll get a receipt by email once it's received.",
        checking: "Checking your payment…",
    }[status];

    return (
        <PhotoFrame>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mb-12" src={GA_LOGO} alt="" />
            <p className={MESSAGE_CLASS}>{message}</p>
            <button
                type="button"
                className={FRAME_BUTTON}
                onClick={() => router.push(`${BASE}/invoice/view/${invoiceId}?view=client`)}
            >
                View Invoice
            </button>
            <button
                type="button"
                className={FRAME_BUTTON}
                // The client dashboard isn't part of this prototype: its
                // Invoices tab stands in for it.
                onClick={() => router.push(`${BASE}/client-admin/invoices`)}
            >
                Account Dashboard
            </button>
        </PhotoFrame>
    );
};

export default PaymentSuccess;
