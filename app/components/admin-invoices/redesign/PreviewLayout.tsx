"use client";

import clsx from "clsx";
import { Eye } from "lucide-react";
import { money } from "../format";
import { CompactContext } from "./density";
import DownloadPdfButton from "./DownloadPdfButton";
import { useDraft } from "./DraftContext";
import { invoiceTotal } from "./draft";
import InvoicePreview from "./InvoicePreview";
import { BillTo, Details, ItemsEditor, MessageBox, Section } from "./InvoiceEditor";
import { SECTION_IDS, SaveControls, useDueLine } from "./Rail";
import { LockedNotice, StatusPill } from "./sections";
import Terms from "./Terms";
import { buttonSecondary, card, label } from "./ui";

/* "With preview": the same editor (same parts, same rules) on the left and
   the invoice as the client will get it on the right, updating as you
   type, the way most invoice tools lay it out. The right column stays in
   view: the paper scrolls on its own, and the total and save buttons sit
   under it, so there's no separate side panel. Billed from isn't repeated
   in the editor: it's fixed, and the preview shows it. */

const PreviewLayout = () => {
    const { draft, isNew, paidTotal } = useDraft();
    const due = useDueLine();

    return (
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_28rem] 2xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            {/* Editor, in its narrow (compact) arrangement */}
            <CompactContext.Provider value={true}>
                <div className="flex min-w-0 flex-col gap-4">
                    <LockedNotice />
                    <div className={clsx(card, "shadow-sm")}>
                        <header className="flex items-center gap-3 px-8 pb-6 pt-7">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{isNew ? "New invoice" : `Invoice #${draft.id}`}</h1>
                            <StatusPill />
                        </header>

                        <div id={SECTION_IDS.client} className="grid scroll-mt-28 gap-8 border-t border-slate-200 px-8 py-7 md:grid-cols-2">
                            <div>
                                <h2 className={clsx(label, "mb-4")}>Bill to</h2>
                                <BillTo />
                            </div>
                            <div>
                                <h2 className={clsx(label, "mb-2")}>Invoice details</h2>
                                <Details />
                            </div>
                        </div>

                        <ItemsEditor />

                        <Section id={SECTION_IDS.terms} title="Payment terms">
                            <Terms />
                        </Section>

                        <Section id={SECTION_IDS.message} title="Message to the client">
                            <MessageBox />
                        </Section>
                    </div>
                </div>
            </CompactContext.Provider>

            {/* Preview, with the total and save buttons under it */}
            <aside className="flex min-w-0 flex-col gap-3 xl:sticky xl:top-12 xl:h-[calc(100vh-8.5rem)]">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <h2 className={clsx(label, "flex items-center gap-2")}>
                            <Eye className="size-4" /> Preview
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">What the client gets · updates as you edit</p>
                    </div>
                    <DownloadPdfButton draft={draft} isNew={isNew} paidTotal={paidTotal} className={clsx(buttonSecondary, "!px-3 !py-1.5")} />
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-100 p-6">
                    <InvoicePreview />
                </div>
                {/* Total with its due line under it; the buttons beside it,
                    centred on the text (they wrap below when the column is narrow) */}
                <div className={clsx(card, "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 p-5 shadow-sm")}>
                    <div>
                        <p className="text-sm text-slate-600">Invoice total</p>
                        <p className="text-2xl font-bold tabular-nums tracking-tight text-slate-900">{money(invoiceTotal(draft))}</p>
                        <p className="text-sm text-slate-600">{due}</p>
                    </div>
                    <div className="ml-auto">
                        <SaveControls row />
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default PreviewLayout;
