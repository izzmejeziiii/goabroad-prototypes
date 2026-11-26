"use client";

import { LinearProgress } from "../mui";
import { useInvoices } from "../store";
import { DraftProvider } from "./DraftContext";
import { emptyDraft, fromInvoice, withClient } from "./draft";
import PreviewLayout from "./PreviewLayout";

/* Loads the invoice (or a blank one) into the redesigned editor's state. */

const RedesignEditor = ({ id, providerId }: { id?: string; providerId?: number }) => {
    const { getInvoice, invoices, ready } = useInvoices();
    if (!ready) return <LinearProgress />;

    const invoice = id ? getInvoice(id) : undefined;
    if (id && !invoice) {
        return <p className="font-inter text-sm text-slate-600">Invoice {id} doesn&apos;t exist.</p>;
    }
    // ?provider_id= picks the client of a new invoice, as in the real admin
    const initial = invoice ? fromInvoice(invoice) : providerId ? withClient(emptyDraft(), providerId, invoices) : emptyDraft();

    return (
        <div className="font-inter text-slate-700">
            <DraftProvider key={id ?? "new"} initial={initial} base={invoice}>
                <PreviewLayout />
            </DraftProvider>
        </div>
    );
};

export default RedesignEditor;
