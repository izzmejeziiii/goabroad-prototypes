"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/InvoiceSummary.js:
   Subtotal / Total Discount / Total Fees / Invoice Total (USD), recomputed
   from the editor state. */

import clsx from "clsx";
import { BODY1, BODY2, Divider, Paper } from "../../mui";
import { useEditor } from "./EditorContext";
import { commas } from "./utils";

const InvoiceSummary = () => {
    const { state, getSubTotal, getTotalDiscount, getInvoiceTotal } = useEditor();
    const row = "flex items-center justify-between";
    const p = clsx(BODY1, "m-0");

    return (
        <Paper className="my-8 p-6">
            <div className={row}>
                <p className={p}>Subtotal</p>
                <p className={p} data-cy="invoice-subtotal">
                    ${commas(getSubTotal())}
                </p>
            </div>
            <Divider className="my-4" />
            <div className={row}>
                <p className={p}>Total Discount</p>
                <p className={p} data-cy="invoice-total-discount">
                    - ${commas(getTotalDiscount())}
                </p>
            </div>
            <Divider className="my-4" />
            <div className={row}>
                <p className={p}>Total Fees</p>
                <p className={p}>+ ${commas(Number(state.upcharge))}</p>
            </div>
            <Divider className="my-4" />
            <div className={row}>
                <p className={clsx(BODY2, "m-0")}>Invoice Total (USD)</p>
                <p className={p} data-cy="invoice-total">
                    <strong>${commas(getInvoiceTotal())}</strong>
                </p>
            </div>
        </Paper>
    );
};

export default InvoiceSummary;
