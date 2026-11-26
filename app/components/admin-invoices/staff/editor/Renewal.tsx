"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/Renewal.js: the
   "Renewal Date" label and picker. Its isDisabled prop isn't a
   react-datepicker prop, so the date stays editable on every status. */

import clsx from "clsx";
import { BODY1, Paper } from "../../mui";
import { useEditor } from "./EditorContext";
import { DatePicker } from "./ui/DatePicker";

const Renewal = () => {
    const { state, handleStateChange } = useEditor();
    return (
        <Paper className="mb-6 p-6">
            <p className={clsx(BODY1, "m-0 !text-[0.75rem] !leading-none !text-[rgba(0,0,0,0.54)]")}>Renewal Date</p>
            <DatePicker
                className="my-2 min-w-[200px] rounded-[4px] border border-solid !border-[rgba(0,0,0,0.26)] text-[14px]"
                selected={state.invoice.renewal_date}
                onChange={(date) => handleStateChange((s) => ({ invoice: { ...s.invoice, renewal_date: date } }))}
            />
        </Paper>
    );
};

export default Renewal;
