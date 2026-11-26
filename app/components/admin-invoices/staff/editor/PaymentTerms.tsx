"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/PaymentTerms.js: the
   "Payment Terms" heading and the Upon Receipt / 30 days / Custom radios.
   Partial and overdue invoices can only switch to Custom; paid and void
   ones can't switch at all. */

import clsx from "clsx";
import { H6 } from "../../mui";
import { useEditor } from "./EditorContext";
import { FormControlLabel, Radio } from "./ui/controls";
import { addBusinessDays, toDate } from "./utils";

const PARTIAL_STATUS = 3;
const OVERDUE_STATUS = 4;

const PaymentTerms = () => {
    const { state, handleStateChange } = useEditor();

    const handleChange = (paymentOption: string) =>
        handleStateChange((s) => {
            const invoice = { ...s.invoice, term: 5, term_name: "Custom" };
            let { paymentDueDate } = s;
            const printed = toDate(invoice.printed_date) ?? new Date(0);
            if (paymentOption === "upon_receipt") {
                paymentDueDate = addBusinessDays(new Date(printed), 1);
                invoice.term = 4;
                invoice.term_name = "Upon receipt";
            } else if (paymentOption === "30_days") {
                const due = new Date(printed);
                due.setDate(due.getDate() + 30);
                paymentDueDate = due;
                invoice.term = 1;
                invoice.term_name = "30 days";
            }
            return { paymentOption, paymentDueDate, invoice };
        });

    const status = state.invoice.status;
    const isPartialOverdue = status === PARTIAL_STATUS || status === OVERDUE_STATUS;
    const options = [
        { value: "upon_receipt", label: "Upon Receipt", disabled: isPartialOverdue || status > OVERDUE_STATUS },
        { value: "30_days", label: "30 days", disabled: isPartialOverdue || status > OVERDUE_STATUS },
        { value: "Custom", label: "Custom", disabled: !isPartialOverdue && status > OVERDUE_STATUS },
    ];

    return (
        <div className="flex items-center">
            <h6 className={clsx(H6, "m-0")}>Payment Terms</h6>
            <div className="grow" />
            <div>
                <div role="radiogroup" className="flex flex-row flex-wrap">
                    {options.map((o) => (
                        <FormControlLabel
                            key={o.value}
                            disabled={o.disabled}
                            label={o.label}
                            control={
                                <Radio
                                    name="payment-terms"
                                    value={o.value}
                                    checked={state.paymentOption === o.value}
                                    onChange={handleChange}
                                    disabled={o.disabled}
                                />
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentTerms;
