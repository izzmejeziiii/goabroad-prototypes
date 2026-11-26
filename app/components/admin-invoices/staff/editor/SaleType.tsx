"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/SaleType.js: "Type of
   Sale" with a react-select of SALE_TYPE_VALUE (Helvetica, 8px below). */

import clsx from "clsx";
import { BODY1, Paper } from "../../mui";
import { useEditor } from "./EditorContext";
import { ReactSelect } from "./ui/ReactSelect";

/** config/constants.js SALE_TYPE_VALUE */
const SALE_TYPE_VALUE = [
    { id: 0, name: "NONE" },
    { id: 1, name: "ORGANIC" },
    { id: 2, name: "NURTURED" },
    { id: 3, name: "RENEWED SAME PACKAGE" },
    { id: 4, name: "UPGRADE" },
    { id: 5, name: "DOWNGRADE" },
    { id: 6, name: "NONRENEWABLE" },
    { id: 7, name: "RECOVERED" },
];

const OPTIONS = SALE_TYPE_VALUE.map(({ id: value, name: label }) => ({ value, label }));

const SaleType = () => {
    const { state, handleStateChange } = useEditor();
    const selected = SALE_TYPE_VALUE.find(({ id }) => id === state.invoice.sale_type);
    return (
        <Paper className="mb-6 p-6">
            <p className={clsx(BODY1, "m-0 !text-[0.75rem] !leading-none !text-[rgba(0,0,0,0.54)]")}>Type of Sale</p>
            <ReactSelect
                className="mt-2"
                style={{ fontFamily: "Helvetica, Sans Serif" }}
                options={OPTIONS}
                placeholder="Select Type of Sale"
                value={selected ? [{ value: selected.id, label: selected.name }] : []}
                onChange={(option) => {
                    if (!option) return;
                    handleStateChange((s) => ({ invoice: { ...s.invoice, sale_type: Number(option.value) } }));
                }}
            />
        </Paper>
    );
};

export default SaleType;
