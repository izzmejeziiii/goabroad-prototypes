"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/ManageDiscount.js: the
   "Manage Discounts" dialog. A "$10" or "10%" discount is spread over the
   selected items that have placements, then over each item's placements,
   with the source's arithmetic (a dollar discount is split by each item's
   unit amount; a percent one is that percent of the unit amount per
   placement). It stays mounted (keepMounted), so the field keeps its text. */

import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "../../mui";
import { getSubTotalOfSelected } from "./calc";
import { useEditor } from "./EditorContext";
import type { EditorItem, EditorState } from "./types";
import { TextField } from "./ui/inputs";
import { round2 } from "./utils";

/** transformDiscountToFloat */
const parseDiscount = (discount: string) => {
    const isDiscountDollar = discount.charAt(0) === "$";
    const discountFloat = parseFloat(isDiscountDollar ? discount.slice(1) : discount.slice(0, discount.length - 1));
    return { isDiscountDollar, discountFloat };
};

/** updateDiscountPerPlacement */
const perPlacement = (item: EditorItem, isDollar: boolean, discountFloat: number) => {
    const { placements, discount, amount } = item;
    let partial = 0;
    return placements.map((placement, pid) => {
        let value: number;
        if (pid === placements.length - 1) {
            value = isDollar ? round2(item.discount - partial) : round2(amount * (discountFloat / 100));
        } else {
            value = isDollar ? round2(discount / placements.length) : round2(amount * (discountFloat / 100));
            partial += value;
        }
        return { ...placement, discount: value };
    });
};

/** handleAddItemDiscount + updateDiscountPerInvoiceItem */
const applyDiscount = (s: EditorState, discount: string): EditorItem[] => {
    const total = getSubTotalOfSelected(s);
    const discountable = s.invoiceItems.filter((item) => s.selected.includes(item.id) && item.quantity > 0);
    const { isDiscountDollar, discountFloat } = parseDiscount(discount);
    const discountPercentage = isDiscountDollar ? discountFloat / total : (discountFloat / 100) * total;
    let partialDiscount = 0;
    const updated = new Map<number, EditorItem>();
    discountable.forEach((item, key) => {
        let value: number;
        if (key === discountable.length - 1) {
            value = round2((discountFloat - partialDiscount).toFixed(2));
        } else {
            value = isDiscountDollar
                ? round2(discountPercentage * item.amount)
                : round2(item.amount * (discountFloat / 100));
            partialDiscount += round2(value);
        }
        const next = { ...item, discount: value };
        updated.set(item.id, { ...next, placements: perPlacement(next, isDiscountDollar, discountFloat) });
    });
    return s.invoiceItems.map((item) => updated.get(item.id) ?? item);
};

const ManageDiscount = () => {
    const { state, handleStateChange } = useEditor();
    const [discount, setDiscount] = useState<string | null>(null);
    const [error, setError] = useState(true);

    const handleChangeDiscount = (value: string) => {
        const percent = /^[^$]\d?(\.\d{1,2})?%$/;
        const dollar = /^[$]\d+(\.\d{1,2})?$/;
        setDiscount(value);
        setError(!percent.test(value) && !dollar.test(value));
    };

    const handleClose = () => handleStateChange({ discountOpen: false });

    const handleSubmitDiscount = () => {
        const value = String(discount);
        handleStateChange((s) => ({ invoiceItems: applyDiscount(s, value) }));
        handleClose();
    };

    return (
        <Dialog open={state.discountOpen} onClose={handleClose}>
            <div className="contents [&_input]:text-[0.9em]">
                <DialogTitle>Manage Discounts</DialogTitle>
                <div className="flex-auto overflow-y-auto px-6 pb-5 pt-0">
                    <div className="flex items-center">
                        <TextField
                            placeholder="Add $ or % Discount"
                            fullWidth
                            value={discount}
                            onChange={(e) => handleChangeDiscount(e.target.value)}
                        />
                    </div>
                </div>
                <DialogActions>
                    <Button color="primary" size="medium" onClick={handleSubmitDiscount} disabled={error}>
                        Ok
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default ManageDiscount;
