"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { DemoInvoice, RecordedPayment } from "./types";

/** Builds the invoice PDF in the browser and saves it. The generator is only
 *  loaded on click. */
export default function DownloadPdfButton({
    invoice,
    payment,
    className,
}: {
    invoice: DemoInvoice;
    payment?: RecordedPayment;
    className?: string;
}) {
    const [busy, setBusy] = useState(false);

    const download = async () => {
        setBusy(true);
        try {
            const { invoicePdf } = await import("./invoicePdf");
            const blob = new Blob([invoicePdf(invoice, payment)], {
                type: "application/pdf",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `GoAbroad-Invoice-${invoice.number}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        } finally {
            setBusy(false);
        }
    };

    return (
        <button type="button" onClick={download} disabled={busy} className={className}>
            <Download className="h-4 w-4" aria-hidden />
            Download PDF
        </button>
    );
}
