"use client";

import { useState } from "react";
import { providers, staffUser } from "../../data";
import { isoDate, today } from "../../format";
import { Button, LinearProgress, OVERLINE } from "../../mui";
import { DialogBox } from "../../results-table/primitives/DialogBox";
import { SlideDrawer } from "../../results-table/primitives/Drawer";
import { OutlinedTextField, TextField } from "../../results-table/primitives/Input";
import { ReactDatePicker } from "../../results-table/primitives/ReactDatePicker";
import { ReactSelect, toOptions } from "../../results-table/primitives/ReactSelect";
import type { SelectOption } from "../../results-table/types";
import { useInvoices } from "../../store";
import { PAYMENT_TYPES, TYPE_TO_METHOD } from "./paymentTypes";

/* Copy of src/components/Drawer/PaymentDrawer.js as "Mark As Paid" opens it
   for one invoice: a 420px right drawer (padding 12px 16px 16px) with the
   client and invoice locked, Payment Type, Payment Date (react-datepicker,
   today and earlier), Payment Amount ("$", digits and one dot), the
   outlined "Note(optional)", and Submit Payment, enabled once everything
   is filled. Submitting really records the payment on the demo invoice
   (recorded by the signed-in staff member) behind the "Processing
   payment..." dialog. Each field sits in a Grid item with 8px 24px margins
   on a 100% width, so the column runs 8px past the drawer's right edge, as
   the real one does. */

const LABEL = `${OVERLINE} !text-[12px] !text-[#9e9e9e] mb-0`;

const PaymentDrawer = ({
    open,
    selectedClient,
    invoiceId,
    onClose,
    recordPaymentCallback,
}: {
    open: boolean;
    selectedClient: { id: number; name: string } | null;
    invoiceId: number | null;
    onClose: () => void;
    recordPaymentCallback: () => void;
}) => {
    const { addPayment } = useInvoices();
    const [paymentType, setPaymentType] = useState<SelectOption | null>(null);
    const [paymentDate, setPaymentDate] = useState<Date>(() => new Date(today()));
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(false);

    const clearPaymentForm = () => {
        setPaymentType(null);
        setAmount("");
        setNote("");
    };

    const close = () => {
        clearPaymentForm();
        onClose();
    };

    const submit = () => {
        if (!invoiceId || !paymentType) return;
        setProcessing(true);
        // POST /invoices/:id/payments
        setTimeout(() => {
            const value = Number(amount);
            if (!(value > 0)) {
                setError(true);
            } else {
                const now = new Date();
                const pad = (n: number) => String(n).padStart(2, "0");
                addPayment(invoiceId, {
                    amount: value,
                    total_amount: value,
                    payment_method: TYPE_TO_METHOD[Number(paymentType.value)],
                    reference: note,
                    recorded_by: `${staffUser.first_name} ${staffUser.last_name}`,
                    date_created: `${isoDate(paymentDate)} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
                });
                clearPaymentForm();
                recordPaymentCallback();
            }
            setProcessing(false);
        }, 700);
    };

    const clientValue = selectedClient ? { value: selectedClient.id, label: selectedClient.name } : null;

    return (
        <>
            <SlideDrawer open={open} onClose={close}>
                <div className="box-border flex h-full w-[420px] flex-col justify-between px-4 pb-4 pt-3">
                    <div className="m-0 box-border flex w-full flex-wrap">
                        <div className="mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]">
                            <span className={LABEL}>Client Name</span>
                            <ReactSelect
                                options={toOptions(providers as unknown as Record<string, unknown>[], "id", "name")}
                                value={clientValue}
                                isDisabled={!!selectedClient?.id}
                                onChange={(() => {}) as (v: never) => void}
                            />
                        </div>
                        <div className="mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]">
                            <span className={LABEL}>Invoice ID</span>
                            <ReactSelect
                                options={[]}
                                value={invoiceId ? { value: invoiceId, label: `${invoiceId}` } : null}
                                isDisabled={!!invoiceId}
                                onChange={(() => {}) as (v: never) => void}
                            />
                        </div>
                        <div className="mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]">
                            <span className={LABEL}>Payment Type</span>
                            <ReactSelect
                                options={PAYMENT_TYPES}
                                value={paymentType}
                                onChange={setPaymentType as (v: never) => void}
                            />
                        </div>
                        <div className="mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]">
                            <span className={LABEL}>Payment Date</span>
                        </div>
                        <div className="mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]">
                            <ReactDatePicker
                                selected={paymentDate}
                                today={today()}
                                maxDate={today()}
                                showYearDropdown
                                onChange={setPaymentDate}
                                className="my-2 box-border w-full min-w-[200px] rounded-[4px] border border-solid !border-[rgba(0,0,0,0.26)] p-[1em] font-[inherit] text-[14px]"
                            />
                        </div>
                        <div className="mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]">
                            <span className={LABEL}>Payment Amount</span>
                            <TextField
                                id="standard-number"
                                fullWidth
                                placeholder="$"
                                inputMode="decimal"
                                pattern="[0-9]*\.?[0-9]*"
                                value={amount}
                                onChange={(e) => {
                                    const next = e.target.value;
                                    if (next === "" || /^\d*\.?\d*$/.test(next)) setAmount(next);
                                }}
                            />
                        </div>
                        <div className="mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]">
                            <OutlinedTextField
                                multiline
                                rows={4}
                                className="z-0 w-[340px]"
                                label="Note(optional)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={submit}
                        color="primary"
                        variant="contained"
                        size="large"
                        disabled={!selectedClient || !paymentType || !paymentDate || !amount || !invoiceId}
                    >
                        Submit Payment
                    </Button>
                </div>
            </SlideDrawer>
            <DialogBox open={processing} title="Processing payment..." actions="">
                <LinearProgress />
            </DialogBox>
            <DialogBox
                open={error}
                title="ERROR"
                contentText="Your payment was not submitted. Please try again."
                onOk={() => setError(false)}
            />
        </>
    );
};

export default PaymentDrawer;
