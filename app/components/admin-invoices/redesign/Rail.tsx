"use client";

import clsx from "clsx";
import { Save, Send } from "lucide-react";
import { useState } from "react";
import { mdyLong } from "../format";
import Dialog from "./Dialog";
import { useDraft } from "./DraftContext";
import { schedule } from "./draft";
import { ProblemSummary } from "./sections";
import { Checkbox, buttonPrimary, buttonSecondary, textLink } from "./ui";

/* The section ids, the due line ("Due Nov 27, 2026") and the save
   controls, used under the preview. */

export const SECTION_IDS = {
    client: "invoice-client",
    items: "invoice-items",
    terms: "invoice-terms",
    message: "invoice-message",
} as const;

export const useDueLine = () => {
    const { draft } = useDraft();
    const terms = schedule(draft);
    const first = terms[0]?.dueDate;
    if (terms.length > 1) return first ? `${terms.length} payments, first due ${mdyLong(first)}` : `${terms.length} payments, due dates not set`;
    return first ? `Due ${mdyLong(first)}` : "Due date not set";
};

/** The real editor's buttons for the invoice's status (a manager's set):
    draft: Save Invoice, Save & Send Invoice; pending: Mark as Draft,
    Save & Send Invoice; unpaid: Save Changes, Save & Send Invoice;
    partial / overdue: Save Changes; paid: Save Invoice; void: none.
    Save & Send opens "Save Invoice Confirmation" with Send Email to
    Client, unticked. Cancel asks to Save or Discard. */
export const SaveControls = ({ row }: { row?: boolean }) => {
    const { draft, status, save, cancel } = useDraft();
    const [sending, setSending] = useState(false);
    const [notify, setNotify] = useState(false);
    if (status === 6) return <ProblemSummary />;

    const main =
        status === 0
            ? { label: "Save Invoice", action: "draft" as const }
            : status === 1
              ? { label: "Mark as Draft", action: "draft" as const }
              : status === 5
                ? { label: "Save Invoice", action: "save" as const }
                : { label: "Save Changes", action: "save" as const };
    const canSend = status <= 2;

    const sendButton = canSend && (
        <button type="button" className={clsx(buttonPrimary, row ? "!px-4" : "w-full")} onClick={() => setSending(true)}>
            <Send className="size-4" /> Save &amp; Send Invoice
        </button>
    );
    const mainButton = (
        <button type="button" className={clsx(canSend ? buttonSecondary : buttonPrimary, row ? "!px-4" : "w-full")} onClick={() => save(main.action)}>
            <Save className="size-4" />
            {main.label}
        </button>
    );
    const cancelButton = (
        <button type="button" className={clsx(textLink, !row && "self-center")} onClick={cancel}>
            Cancel
        </button>
    );

    return (
        <div className="flex flex-col gap-3">
            <ProblemSummary />
            {row ? (
                // Side by side, the main action last (preview layout)
                <div className="flex flex-wrap items-center justify-end gap-2">
                    {cancelButton}
                    {mainButton}
                    {sendButton}
                </div>
            ) : (
                <>
                    {sendButton}
                    {mainButton}
                    {cancelButton}
                </>
            )}
            {sending && (
                <Dialog
                    title="Save Invoice Confirmation"
                    primary={{
                        label: notify ? "Save & Send Invoice" : "Save Invoice",
                        onClick: () => {
                            setSending(false);
                            save("send", { notify });
                        },
                    }}
                    onClose={() => {
                        setSending(false);
                        setNotify(false);
                    }}
                >
                    <Checkbox checked={notify} onChange={setNotify}>
                        Send Email to Client{draft.contactEmail ? ` (${draft.contactEmail})` : ""}
                    </Checkbox>
                </Dialog>
            )}
        </div>
    );
};
