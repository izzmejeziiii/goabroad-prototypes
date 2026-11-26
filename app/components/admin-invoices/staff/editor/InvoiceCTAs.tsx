"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/InvoiceCTAs.js: the
   large contained buttons under the editor, per status, with their
   validations, the ERROR dialog, the "Save Invoice Confirmation" dialog
   (Send Email to Client) and the Cancel → Save / Discard dialog.
   The signed-in staff member is a manager: draft, save_send,
   save_changes and update, but not pending, so no "Mark as Ready to Send"
   / "Mark as Pending" buttons. */

import { useState } from "react";
import { BASE } from "../../data";
import { Button, DialogBox } from "../../mui";
import { useEditor } from "./EditorContext";
import type { EditorDate, PageDialog } from "./types";
import { Checkbox, FormControlLabel } from "./ui/controls";
import { compareDates, isOverdue, round2 } from "./utils";
import { today } from "../../format";

const DRAFT_STATUS = 0;
const PENDING_STATUS = 1;
const UNPAID_STATUS = 2;
const PARTIAL_STATUS = 3;
const OVERDUE_STATUS = 4;
const PAID_STATUS = 5;

type Result = [string, boolean] | null;

export type SaveInvoice = (isSend: number | boolean, status: string | number) => void;

/** `cta`: margin 0 4px. */
const CTA = "mx-1";

const InvoiceCTAs = ({
    handleDialogBox,
    handleSaveInvoice,
    navigate,
}: {
    handleDialogBox: (dialog: PageDialog) => void;
    handleSaveInvoice: SaveInvoice;
    /** history.push through the "Leave Invoice Tool?" guard. */
    navigate: (path: string) => void;
}) => {
    const context = useEditor();
    const { state, getInvoiceTotal, getPaymentTotal, getBalanceTotal } = context;
    const { invoice } = state;
    const [openNotificationDialog, setOpenNotificationDialog] = useState(false);
    const [notifyClient, setNotifyClient] = useState(false);

    /* ── Validations ─────────────────────────────────────────────────── */

    const validateDueDates = (date: EditorDate = null): [string, boolean] => {
        const { paymentTerms } = state;
        if (invoice.term === 5) {
            for (const item of paymentTerms) {
                const isAmountDueNotZero = item.amount_due !== item.amount_paid && item.amount_due > 0;
                if (item.due_date !== null && item.due_date !== "" && invoice.printed_date !== null) {
                    if (date !== null && compareDates(item.due_date, date) && isAmountDueNotZero) {
                        return ["Payment terms should have a due date which is greater than the current date.", false];
                    } else if (date === null && compareDates(item.due_date, invoice.printed_date) && isAmountDueNotZero) {
                        return ["Payment terms should have a due date which is greater than the invoice date.", false];
                    }
                } else {
                    return ["Review the invoice and make sure all due dates have valid values.", false];
                }
            }
            return ["Success", true];
        }
        if (date !== null && compareDates(state.paymentDueDate, date)) {
            return ["Payment terms should have a due date which is greater than the current date.", false];
        } else if (date === null && compareDates(state.paymentDueDate, invoice.printed_date)) {
            return ["Payment terms should have a due date which is greater than the invoice date.", false];
        }
        return ["Success", true];
    };

    const validateDueDatesOfPartial = (date: EditorDate = null): [string, boolean] => {
        for (const item of state.paymentTerms) {
            const isAmountDueNotZero = item.amount_due !== item.amount_paid && item.amount_due > 0;
            if (item.due_date != null && invoice.printed_date != null) {
                if (date !== null && compareDates(item.due_date, date) && isAmountDueNotZero) {
                    return [
                        "Payment terms should have a due date which is greater than the current date if it is not fully paid.",
                        false,
                    ];
                }
                if (compareDates(item.due_date, invoice.printed_date) && isAmountDueNotZero) {
                    return ["Payment terms should have a due date which is greater than the invoice date.", false];
                }
            } else {
                return ["Review the invoice and make sure all due dates have valid values.", false];
            }
        }
        return ["Success", true];
    };

    const validateEndDates = (date: EditorDate = null): [string, boolean] => {
        for (const item of state.invoiceItems) {
            if (item.startDate !== null && item.endDate !== null && item.startDate !== "" && item.endDate !== "") {
                if (date === null && compareDates(item.endDate, item.startDate)) {
                    return ["Invoice items should have an end date which is greater than the start date.", false];
                }
            } else {
                return ["Review the invoice and make sure all end dates have valid values.", false];
            }
        }
        return ["Success", true];
    };

    const validateAmountsDue = (): [string, boolean] => {
        let totalAmountDue = 0;
        let totalAmountPaid = 0;
        const invoiceTotal = getInvoiceTotal();
        if (!state.is_new || invoice.term === 5) {
            for (const item of state.paymentTerms) {
                if (item.amount_due !== null && item.amount_due) {
                    totalAmountDue += item.amount_due;
                    totalAmountPaid += item.amount_paid;
                    if (item.amount_due <= 0) return ["The Amounts Due should be greater than 0. ", false];
                } else {
                    return ["Review the invoice and make sure all amount dues have valid values.", false];
                }
            }
        } else {
            totalAmountDue = invoiceTotal;
        }
        if (round2(totalAmountDue) !== round2(getInvoiceTotal())) {
            return ["The total amount due of the payment terms should match the total invoice value.", false];
        }
        if (totalAmountPaid > invoiceTotal) {
            return ["The total amount of the invoice should not be less than the amount paid.", false];
        }
        return ["Success", true];
    };

    const validatePaymentTotal = (): [string, boolean] =>
        getPaymentTotal() > round2(getInvoiceTotal())
            ? ["The total amount of the invoice should not be less than the amount paid.", false]
            : ["Success", true];

    const validatePaidInvoiceAmount = (): [string, boolean] =>
        getPaymentTotal() !== round2(getInvoiceTotal())
            ? ["The total amount due should be equal with the amount paid.", false]
            : ["Success", true];

    const validateProvider = (): [string, boolean] =>
        state.providerBilling !== null && state.selectedProvider !== null
            ? ["Success", true]
            : ["Invoice should have a valid provider selected.", false];

    /* ── Dialogs ─────────────────────────────────────────────────────── */

    const handleSaveExit = () => handleSaveInvoice(0, invoice.status);

    const handleExitConfirmationDialog = (
        content = "Before exiting choose what will happen to your recent changes",
    ) =>
        handleDialogBox({
            actions: "OkCancel",
            open: true,
            title: "Are you sure you want to exit?",
            content,
            onOk: handleSaveExit,
            // ?provider_id= sends the real admin to /client/profile/:id,
            // otherwise /client-accounts/invoices; both are the list here.
            // The dialog stays open underneath "Leave Invoice Tool?".
            onCancel: () => navigate(BASE),
            stringOverride: { primaryAction: "Save", secondaryAction: "Discard" },
        });

    const handleErrorMessageDialog = (errorMessage: string) =>
        handleDialogBox({ actions: "Ok", open: true, title: "ERROR", content: errorMessage });

    const handleCollatingOfErrors = (container: Result[], isSaving: boolean) => {
        const errors = [
            "There was an error while saving invoice.",
            "Review the invoice and make sure all fields have valid values.",
        ];
        container.forEach((item) => {
            if (item !== null && !item[1] && errors.indexOf(item[0]) === -1) errors.push(item[0]);
        });
        // Joined with \n into a <p>, so the lines run together on screen.
        if (!isSaving) handleErrorMessageDialog(errors.join("\n"));
    };

    /* ── Per-status handlers ─────────────────────────────────────────── */

    const handleDraft = (status: string) => {
        const isValidProviderBilling = validateProvider();
        let isValidEndDates: Result = null;
        let isValidAmountsDue: Result = null;
        let isValidDueDates: Result = null;
        let isSaving = false;
        if (status === "pending" || status === "unpaid") {
            isValidDueDates = validateDueDates();
            isValidEndDates = validateEndDates();
            isValidAmountsDue = validateAmountsDue();
            if (isValidDueDates[1] && isValidEndDates[1] && isValidAmountsDue[1] && isValidProviderBilling[1]) {
                isSaving = true;
                if (status === "unpaid") handleSaveInvoice(notifyClient || 0, status);
                else handleSaveInvoice(0, status);
            }
        } else if (status === "draft") {
            if (isValidProviderBilling[1]) {
                isSaving = true;
                handleSaveInvoice(0, status);
            }
        }
        handleCollatingOfErrors([isValidDueDates, isValidEndDates, isValidAmountsDue, isValidProviderBilling], isSaving);
    };

    const handlePending = (statusIn: string) => {
        let status = statusIn;
        const isValidProviderBilling = validateProvider();
        let isSaving = false;
        let errors: Result[] = [];
        if (status === "pending" || status === "unpaid") {
            const isValidDueDates = validateDueDates(today());
            const isValidEndDates = validateEndDates(today());
            const isValidAmountsDue = validateAmountsDue();
            // only validate for amount due if no partial payment
            const hasPayment = getPaymentTotal() > 0;
            if (isValidDueDates[1] && isValidEndDates[1] && isValidProviderBilling[1] && (hasPayment || isValidAmountsDue[1])) {
                isSaving = true;
                if (status === "unpaid") {
                    status = getBalanceTotal() > 0 ? (hasPayment ? "partial" : "unpaid") : "paid";
                }
                if (status === "unpaid") handleSaveInvoice(notifyClient || 0, status);
                else handleSaveInvoice(0, status);
            } else {
                errors = hasPayment
                    ? [isValidDueDates, isValidEndDates]
                    : [isValidDueDates, isValidEndDates, isValidAmountsDue];
            }
        } else if (status === "draft") {
            if (isValidProviderBilling[1]) {
                isSaving = true;
                handleSaveInvoice(0, status);
            }
        }
        handleCollatingOfErrors(errors, isSaving);
    };

    const handleUnpaid = (status: string) => {
        const isValidProviderBilling = validateProvider();
        let isValidDueDates: Result = null;
        let isValidEndDates: Result = null;
        let isValidAmountsDue: Result = null;
        let isSaving = false;
        if (status === "pending") {
            isValidDueDates = validateDueDates(today());
            isValidEndDates = validateEndDates();
            isValidAmountsDue = validateAmountsDue();
            if (isValidDueDates[1] && isValidEndDates[1] && isValidAmountsDue[1] && isValidProviderBilling[1]) {
                isSaving = true;
                handleSaveInvoice(0, status);
            }
        } else if (status === "unpaid") {
            isValidDueDates = validateDueDates(today());
            isValidEndDates = validateEndDates(today());
            isValidAmountsDue = validateAmountsDue();
            if (isValidDueDates[1] && isValidEndDates[1] && isValidAmountsDue[1] && isValidProviderBilling[1]) {
                isSaving = true;
                handleSaveInvoice(notifyClient || 0, status);
            }
        } else if (status === "draft") {
            if (isValidProviderBilling[1]) {
                isSaving = true;
                handleSaveInvoice(0, status);
            }
        }
        handleCollatingOfErrors([isValidDueDates, isValidEndDates, isValidAmountsDue], isSaving);
    };

    const handlePartial = (statusIn: string) => {
        let status = statusIn;
        const isValidProviderBilling = validateProvider();
        const isValidDueDates = validateDueDatesOfPartial(today());
        const isValidatePaymentTotal = validatePaymentTotal();
        let errors: Result[] = [];
        let isSaving = false;
        if (isValidDueDates[1] && isValidatePaymentTotal[1] && isValidProviderBilling[1]) {
            isSaving = true;
            if (status !== "pending") {
                status = getBalanceTotal() > 0 ? (isOverdue(state.paymentDueDate) ? "overdue" : status) : "paid";
            }
            handleSaveInvoice(0, status);
        } else {
            errors = [isValidDueDates, isValidatePaymentTotal];
        }
        handleCollatingOfErrors(errors, isSaving);
    };

    const handleOverdue = (statusIn: string) => {
        let status = statusIn;
        const isValidProviderBilling = validateProvider();
        const isValidatePaymentTotal = validatePaymentTotal();
        let errors: Result[] = [];
        let isSaving = false;
        if (isValidatePaymentTotal[1] && isValidProviderBilling[1]) {
            isSaving = true;
            if (status !== "pending") {
                status =
                    getBalanceTotal() > 0
                        ? isOverdue(state.paymentDueDate)
                            ? "overdue"
                            : getPaymentTotal() > 0
                              ? "partial"
                              : "unpaid"
                        : "paid";
            }
            handleSaveInvoice(0, status);
        } else {
            errors = [isValidatePaymentTotal];
        }
        handleCollatingOfErrors(errors, isSaving);
    };

    const handlePaid = (status: string) => {
        const isValidProviderBilling = validateProvider();
        const isValidatePaidInvoiceAmount = validatePaidInvoiceAmount();
        let isSaving = false;
        if (isValidatePaidInvoiceAmount[1] && isValidProviderBilling[1]) {
            isSaving = true;
            handleSaveInvoice(0, status);
        }
        handleCollatingOfErrors([isValidatePaidInvoiceAmount], isSaving);
    };

    const renderSendNotificationDialog = (callback: () => void) => (
        <DialogBox
            actions="OkCancel"
            open={openNotificationDialog}
            title="Save Invoice Confirmation"
            onOk={() => {
                setOpenNotificationDialog(false);
                callback();
            }}
            onCancel={() => {
                setOpenNotificationDialog(false);
                setNotifyClient(false);
            }}
            onClose={() => {
                setOpenNotificationDialog(false);
                setNotifyClient(false);
            }}
            stringOverride={{
                primaryAction: notifyClient ? "Save & Send Invoice" : "Save Invoice",
                secondaryAction: "Cancel",
            }}
        >
            <FormControlLabel
                control={<Checkbox checked={notifyClient} onChange={setNotifyClient} />}
                label="Send Email to Client"
            />
        </DialogBox>
    );

    const big = { size: "large" as const, color: "primary" as const, variant: "contained" as const };
    const cancelButton = (content?: string, id?: string) => (
        <Button
            id={id}
            className={CTA}
            onClick={() => handleExitConfirmationDialog(content)}
            size="large"
            color="secondary"
            variant="contained"
        >
            Cancel
        </Button>
    );
    const LEAVE = "Are you sure you want to exit the Create an Invoice Tool? Your changes will not be saved";

    if (invoice.status === DRAFT_STATUS) {
        return (
            <>
                <Button id="save-invoice" {...big} onClick={() => handleDraft("draft")}>
                    Save Invoice
                </Button>
                <Button id="save-send" className={CTA} {...big} onClick={() => setOpenNotificationDialog(true)}>
                    Save &amp; Send Invoice
                </Button>
                {cancelButton(undefined, "cancel")}
                {renderSendNotificationDialog(() => handleDraft("unpaid"))}
            </>
        );
    }
    if (invoice.status === PENDING_STATUS) {
        return (
            <>
                <Button className={CTA} {...big} onClick={() => handlePending("draft")}>
                    Mark as Draft
                </Button>
                <Button className={CTA} {...big} onClick={() => setOpenNotificationDialog(true)}>
                    Save &amp; Send Invoice
                </Button>
                {cancelButton(LEAVE)}
                {renderSendNotificationDialog(() => handlePending("unpaid"))}
            </>
        );
    }
    if (invoice.status === UNPAID_STATUS) {
        return (
            <>
                <Button className={CTA} {...big} onClick={() => handleUnpaid("unpaid")}>
                    Save Changes
                </Button>{" "}
                <Button className={CTA} {...big} onClick={() => setOpenNotificationDialog(true)}>
                    Save &amp; Send Invoice
                </Button>{" "}
                {cancelButton(LEAVE)}
                {renderSendNotificationDialog(() => handleUnpaid("unpaid"))}
            </>
        );
    }
    if (invoice.status === PARTIAL_STATUS) {
        return (
            <>
                <Button className={CTA} {...big} onClick={() => handlePartial("partial")}>
                    Save Changes
                </Button>{" "}
                {cancelButton(LEAVE)}
            </>
        );
    }
    if (invoice.status === OVERDUE_STATUS) {
        return (
            <>
                <Button className={CTA} {...big} onClick={() => handleOverdue("")}>
                    Save Changes
                </Button>
                {cancelButton(LEAVE)}
            </>
        );
    }
    if (invoice.status === PAID_STATUS) {
        return (
            <>
                <Button id="save-invoice" {...big} onClick={() => handlePaid("paid")}>
                    Save Invoice
                </Button>
                {cancelButton(undefined, "cancel")}
            </>
        );
    }
    // Void: no buttons.
    return null;
};

export default InvoiceCTAs;
