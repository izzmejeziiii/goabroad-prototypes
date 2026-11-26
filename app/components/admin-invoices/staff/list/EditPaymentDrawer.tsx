"use client";

import { useState } from "react";
import { Button, LinearProgress, OVERLINE, Paper } from "../../mui";
import { DialogBox } from "../../results-table/primitives/DialogBox";
import { SlideDrawer } from "../../results-table/primitives/Drawer";
import { TextField } from "../../results-table/primitives/Input";
import { ReactSelect } from "../../results-table/primitives/ReactSelect";
import { useSnackbar } from "../../results-table/primitives/Snackbar";
import type { SelectOption } from "../../results-table/types";
import type { Payment } from "../../types";
import { methodToType, PAYMENT_TYPES } from "./paymentTypes";

/* Copy of src/components/Drawer/EditPaymentDrawer.js, opened from the
   pencil beside a payment term: Invoice ID (locked), Payment ID (only
   switchable with two or more payments), Payment Type, and the payment's
   date and amount, read-only; Update Payment saves the type. Kept quirk:
   the payment it opens on is payments[termIndex], by position, not the
   payment made against that term. With no payments it says "No Payments
   found." over a Close button. */

const LABEL = `${OVERLINE} !text-[12px] !text-[#9e9e9e] mb-0`;
const ITEM = "mx-6 my-2 box-border w-full max-w-full flex-[0_0_100%]";

const typeOption = (p?: Payment) => PAYMENT_TYPES.find((t) => t.value === methodToType(p?.payment_method ?? "")) ?? null;

const EditPaymentDrawer = ({
    open,
    invoiceId,
    payments,
    selectedPaymentTermKey,
    onClose,
    onUpdate,
}: {
    open: boolean;
    invoiceId: number | null;
    payments: Payment[];
    selectedPaymentTermKey: number;
    onClose: () => void;
    onUpdate: (paymentId: number, type: number) => void;
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const initial = payments.slice(selectedPaymentTermKey)[0] || payments.slice(-1)[0];
    const [paymentId, setPaymentId] = useState<number | null>(null);
    const [paymentType, setPaymentType] = useState<SelectOption | null | undefined>(undefined);
    const [processing, setProcessing] = useState(false);

    // useEffect([payments, selectedPaymentTermKey]): reopening resets the pick.
    const [prevKey, setPrevKey] = useState(`${open}-${selectedPaymentTermKey}`);
    if (prevKey !== `${open}-${selectedPaymentTermKey}`) {
        setPrevKey(`${open}-${selectedPaymentTermKey}`);
        setPaymentId(null);
        setPaymentType(undefined);
    }

    const payment = payments.find((p) => p.id === paymentId) ?? initial;
    const type = paymentType === undefined ? typeOption(payment) : paymentType;

    const submit = () => {
        if (!payment) return;
        setProcessing(true);
        // POST /invoices/payments/:id
        setTimeout(() => {
            if (type) onUpdate(payment.id, Number(type.value));
            setProcessing(false);
            onClose();
            enqueueSnackbar("Payment has been updated!", { variant: "success" });
        }, 500);
    };

    return (
        <>
            <SlideDrawer open={open} onClose={onClose}>
                {payments.length > 0 && payment ? (
                    <div className="box-border flex h-full w-[420px] flex-col justify-between px-4 pb-4 pt-3">
                        <div className="m-0 box-border flex w-full flex-wrap">
                            <div className={ITEM}>
                                <span className={LABEL}>Invoice ID</span>
                                <ReactSelect
                                    options={[]}
                                    value={{ value: invoiceId ?? 0, label: `${invoiceId}` }}
                                    isDisabled
                                    onChange={(() => {}) as (v: never) => void}
                                />
                            </div>
                            <div className={ITEM}>
                                <span className={LABEL}>Payment ID</span>
                                <ReactSelect
                                    options={payments.map((p) => ({ value: p.id, label: String(p.id) }))}
                                    value={{ value: payment.id, label: `${payment.id}` }}
                                    isDisabled={payments.length < 2}
                                    onChange={((o: SelectOption) => {
                                        setPaymentId(Number(o.value));
                                        setPaymentType(undefined);
                                    }) as (v: never) => void}
                                />
                            </div>
                            <div className={ITEM}>
                                <span className={LABEL}>Payment Type</span>
                                <ReactSelect options={PAYMENT_TYPES} value={type} onChange={setPaymentType as (v: never) => void} />
                            </div>
                            <div className={ITEM}>
                                <span className={LABEL}>Payment Date</span>
                            </div>
                            <div className={ITEM}>
                                <TextField fullWidth value={payment.date_created} disabled />
                            </div>
                            <div className={ITEM}>
                                <span className={LABEL}>Payment Amount</span>
                                <TextField id="standard-number" type="number" placeholder="$" fullWidth value={payment.amount} disabled />
                            </div>
                        </div>
                        <Button onClick={submit} color="primary" variant="contained" size="large" disabled={!type && !invoiceId}>
                            Update Payment
                        </Button>
                    </div>
                ) : (
                    <div className="box-border flex h-full w-[420px] flex-col justify-between px-4 pb-4 pt-3">
                        <Paper className="m-2">
                            <div className="mx-6 my-2 box-border text-center">
                                <span className={LABEL}>No Payments found.</span>
                            </div>
                        </Paper>
                        <Button onClick={onClose} color="primary" variant="contained" size="large">
                            Close
                        </Button>
                    </div>
                )}
            </SlideDrawer>
            <DialogBox open={processing} title="Processing payment..." actions="">
                <LinearProgress />
            </DialogBox>
        </>
    );
};

export default EditPaymentDrawer;
