"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/PaymentTermDetails.js:
   the Payment Due Date picker, or, for Custom terms, "Your payment is
   divided into" (2–12) / "Your payment terms" + Recompute, with the
   collapsible Due Date / Amount Due rows (+ / − to add or remove a term).
   Like componentDidUpdate, the terms are rebuilt whenever the count, the
   items or the upcharge change, never on mount. The source's
   `!context.is_new` is always true, so the edit layout always shows. */

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { MdAdd, MdExpandMore, MdRemove } from "react-icons/md";
import { BODY1, Button, IconButton } from "../../mui";
import { useEditor } from "./EditorContext";
import type { EditorDate } from "./types";
import { DatePicker } from "./ui/DatePicker";
import { Select, TextField } from "./ui/inputs";
import { round2 } from "./utils";

const PARTIAL_STATUS = 3;
const OVERDUE_STATUS = 4;
const PAID_STATUS = 5;

/** `datepicker`: 14px, 4px corners, rgba(0,0,0,.26) border, 200px min,
    8px 0 8px 8px margin, .5em padding. */
const DATE_INPUT =
    "my-2 ml-2 mr-0 min-w-[200px] rounded-[4px] border border-solid !border-[rgba(0,0,0,0.26)] p-[0.5em] text-[14px]";

const COUNT_OPTIONS = Array.from({ length: 11 }, (_, i) => ({ value: String(i + 2), label: String(i + 2) }));

/** subtitle1 */
const SUBTITLE1 = "m-0 text-base font-normal leading-[1.75] tracking-[0.00938em] text-[#424242]";

const ExpandButton = ({ expanded, onClick }: { expanded: boolean; onClick: () => void }) => (
    <IconButton
        className={clsx("ml-auto !transition-[background-color,transform] !duration-150", expanded ? "rotate-180" : "rotate-0")}
        onClick={onClick}
        aria-expanded={expanded}
        aria-label="Show more"
    >
        <MdExpandMore className="size-6" />
    </IconButton>
);

const PaymentTermDetails = () => {
    const { state, handleStateChange, buildPaymentTerms, recomputePaymentTerms } = useEditor();
    const { invoice, paymentTerms, paymentCount, paymentOption } = state;
    // Opened on load when the invoice already uses Custom terms.
    const [expanded, setExpanded] = useState(() => !state.is_new && state.paymentOption === "Custom");

    const prev = useRef<{ count: number; items: unknown; upcharge: number } | null>(null);
    useEffect(() => {
        const p = prev.current;
        prev.current = { count: state.paymentCount, items: state.invoiceItems, upcharge: state.upcharge };
        if (!p) return;
        if (
            p.count !== state.paymentCount ||
            state.paymentCount !== state.paymentTerms.length ||
            p.items !== state.invoiceItems ||
            p.upcharge !== state.upcharge
        ) {
            buildPaymentTerms();
        }
    });

    const handlePaymentCount = (value: string) => {
        buildPaymentTerms();
        handleStateChange({ paymentCount: Number(value) });
    };

    const handlePaymentTerms = (id: number, key: "due_date" | "amount_due", value: EditorDate) => {
        handleStateChange((s) => ({
            paymentTerms: s.paymentTerms.map((item, i) => {
                if (i !== id) return item;
                const next = { ...item, [key]: value };
                if (key === "amount_due") {
                    next.is_changed = true;
                    if (item.amount_paid > 0) next.amount_due = (value as number) + item.amount_paid;
                }
                return next;
            }),
        }));
        buildPaymentTerms();
    };

    const addNewPaymentTerm = () => handleStateChange((s) => ({ paymentCount: s.paymentCount + 1 }));

    const removePaymentTerm = (id: number) =>
        handleStateChange((s) => ({
            paymentTerms: s.paymentTerms.filter((_, i) => i !== id),
            paymentCount: s.paymentCount - 1,
        }));

    const showPaymentTermDetails = () => (
        <div className="-ml-2 -mt-2 box-border flex w-[calc(100%+8px)] flex-wrap">
            <div className="box-border m-0 flex w-full max-w-full grow-0 basis-full flex-wrap pl-2 pt-2">
                <div className="box-border flex w-full flex-wrap">
                    <div className="box-border max-w-[50%] grow-0 basis-1/2 [&_p]:pl-[0.5em]">
                        <p className={clsx(BODY1, "m-0 pb-[1em] !text-left !text-[1em] font-medium")}>Due Date</p>
                    </div>
                    <div className="box-border max-w-[33.333333%] grow-0 basis-1/3">
                        <p className={clsx(BODY1, "m-0 pb-[1em] !text-left !text-[1em] font-medium")}>Amount Due</p>
                    </div>
                    <div className="box-border max-w-[16.666667%] grow-0 basis-1/6" />
                </div>
                {paymentTerms.map((paymentTerm, key) => {
                    const settled =
                        paymentTerm.amount_paid === paymentTerm.amount_due &&
                        paymentTerm.amount_due > 0 &&
                        !("is_changed" in paymentTerm);
                    return (
                        <div
                            key={key}
                            className="box-border m-0 mb-4 flex w-full max-w-full grow-0 basis-full items-center border-0 border-b border-dashed !border-[#e0e0e0] pb-4"
                        >
                            <div className="box-border flex w-full flex-wrap">
                                <div className="box-border flex max-w-[50%] grow-0 basis-1/2 flex-row items-center justify-start">
                                    <DatePicker
                                        className={DATE_INPUT}
                                        selected={paymentTerm.due_date || null}
                                        onChange={(d) => handlePaymentTerms(key, "due_date", d)}
                                        disabled={settled || invoice.status === PAID_STATUS}
                                        dropdowns
                                    />
                                </div>
                                <div className="box-border flex max-w-[33.333333%] grow-0 basis-1/3 flex-row items-center justify-start">
                                    <p className={clsx(BODY1, "m-0 font-semibold")}>$&nbsp;&nbsp;</p>
                                    <TextField
                                        value={
                                            paymentTerm.amount_paid !== 0
                                                ? round2(paymentTerm.amount_due - paymentTerm.amount_paid).toString()
                                                : paymentTerm.amount_due.toString()
                                        }
                                        type="number"
                                        onChange={(e) =>
                                            handlePaymentTerms(
                                                key,
                                                "amount_due",
                                                Number(e.target.value.replace(/[^\d.-]/g, "")),
                                            )
                                        }
                                        disabled={
                                            (key === paymentTerms.length - 1 && paymentTerms.length > 1) ||
                                            settled ||
                                            invoice.status === PAID_STATUS
                                        }
                                    />
                                </div>
                                {invoice.status !== PAID_STATUS && (
                                    <div className="box-border max-w-[16.666667%] grow-0 basis-1/6">
                                        <IconButton
                                            onClick={addNewPaymentTerm}
                                            className="!text-[#03a9f4] hover:!bg-[rgba(3,169,244,0.04)]"
                                        >
                                            <MdAdd className="size-6" />
                                        </IconButton>
                                        {paymentTerm.amount_paid === 0 &&
                                            paymentTerms.length > 2 &&
                                            paymentTerm.status !== PAID_STATUS &&
                                            paymentTerm.status !== PARTIAL_STATUS && (
                                                <IconButton
                                                    onClick={() => removePaymentTerm(key)}
                                                    className="!text-[#e91e63] hover:!bg-[rgba(233,30,99,0.04)]"
                                                >
                                                    <MdRemove className="size-6" />
                                                </IconButton>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    let container = null;
    if (paymentOption === "Custom") {
        if ((paymentTerms.length <= 1 && invoice.status === OVERDUE_STATUS) || invoice.status < PARTIAL_STATUS) {
            container = (
                <div className="flex w-full">
                    <p className={clsx(BODY1, "m-0")}>Your payment is divided into</p>
                    <div className="grow" />
                    <Select
                        name="paymentTimes"
                        value={paymentCount}
                        options={COUNT_OPTIONS}
                        onChange={handlePaymentCount}
                    />
                    <ExpandButton expanded={expanded} onClick={() => setExpanded((v) => !v)} />
                </div>
            );
        } else if (invoice.status === PARTIAL_STATUS || (invoice.status === OVERDUE_STATUS && invoice.term === 5)) {
            container = (
                <div className="flex w-full">
                    <h6 className={SUBTITLE1}>Your payment terms</h6>
                    <div className="grow" />
                    <Button onClick={recomputePaymentTerms} size="large" color="primary" variant="contained">
                        Recompute
                    </Button>
                    <ExpandButton expanded={expanded} onClick={() => setExpanded((v) => !v)} />
                </div>
            );
        }
    } else {
        container = (
            <div className="flex w-full items-center">
                <p className={clsx(BODY1, "m-0")}>Payment Due Date</p>
                <div className="grow" />
                <DatePicker
                    selected={state.paymentDueDate}
                    className={DATE_INPUT}
                    onChange={(date) => handleStateChange({ paymentDueDate: date })}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {container}
            {paymentOption === "Custom" && expanded && <div className="p-6">{showPaymentTermDetails()}</div>}
        </div>
    );
};

export default PaymentTermDetails;
