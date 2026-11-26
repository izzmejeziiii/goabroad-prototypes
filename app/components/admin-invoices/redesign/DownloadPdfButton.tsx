"use client";

import clsx from "clsx";
import { Download } from "lucide-react";
import { useState } from "react";
import type { Draft } from "./draft";

/** Saves the invoice as a PDF built in the browser (the generator loads on
    click), like /invoice-tool's Download PDF. Used under the editor's
    preview and on the internal View invoice page. */
const DownloadPdfButton = ({ draft, isNew, paidTotal, className }: { draft: Draft; isNew: boolean; paidTotal: number; className?: string }) => {
    const [busy, setBusy] = useState(false);
    const download = async () => {
        setBusy(true);
        try {
            const { draftInvoicePdf } = await import("./invoicePdf");
            const url = URL.createObjectURL(new Blob([draftInvoicePdf(draft, { isNew, paidTotal })], { type: "application/pdf" }));
            const a = document.createElement("a");
            a.href = url;
            a.download = `GoAbroad-Invoice-${isNew ? "draft" : draft.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        } finally {
            setBusy(false);
        }
    };
    return (
        <button type="button" onClick={download} disabled={busy} className={clsx(className, "disabled:cursor-wait")}>
            <Download className="size-4" aria-hidden /> Download PDF
        </button>
    );
};

export default DownloadPdfButton;
