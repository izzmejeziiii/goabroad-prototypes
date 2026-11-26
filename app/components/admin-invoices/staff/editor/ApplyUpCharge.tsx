"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/ApplyUpCharge.js: the
   "Apply Upcharge" dialog. Takes "$25" or "10%" (of the subtotal), no more
   than the subtotal. On an existing invoice the field starts at "$<upcharge>". */

import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "../../mui";
import { useEditor } from "./EditorContext";
import { TextField } from "./ui/inputs";

/** getValueToFloat */
const toFloat = (value: string | number | null | undefined) => {
    if (!value) return undefined;
    const s = value.toString();
    const last = s.length - 1;
    return parseFloat(s.charAt(0) === "$" ? s.slice(1) : s.charAt(last) === "%" ? s.slice(0, last) : s);
};

const ApplyUpCharge = () => {
    const { state, handleStateChange, getSubTotal } = useEditor();
    // componentDidUpdate seeds it once the invoice has an id.
    const [upcharge, setUpcharge] = useState<string | null>(() =>
        state.invoice.id !== null ? "$" + state.upcharge : null,
    );
    const [error, setError] = useState(true);

    const inDollar = (value: string | null) => {
        let real = toFloat(value) as number;
        if (value && value.toString().includes("%")) real = getSubTotal() * (real / 100);
        return real;
    };

    const isValid = (value: string | null) => {
        // Up to 2 decimals with $ at the start or % at the end; accepts 0.
        const re = /(^\s*^[$](?=.*[0-9])\d*(?:\.\d{1,2})?\s*$)|(^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*%{1}$)/g;
        const regexOk = !!value && value.toString().match(re) !== null;
        const overSubtotal = (inDollar(value) as number) > (toFloat(getSubTotal()) as number);
        return regexOk && !overSubtotal;
    };

    const onChangeHandleUpcharge = (value: string) => {
        // Quirk kept: the source validates this.state.upcharge right after
        // setState, i.e. the value before this keystroke.
        const previous = upcharge;
        setUpcharge(value);
        setError(value !== "" && !isValid(previous));
    };

    const onClickValidateUpcharge = () => {
        if (isValid(upcharge)) {
            setError(false);
            handleStateChange({ upcharge: inDollar(upcharge), upchargeOpen: false });
        }
    };

    const handleClose = () => handleStateChange({ upchargeOpen: false });

    return (
        <Dialog open={state.upchargeOpen} onClose={handleClose}>
            <div className="contents [&_input]:text-[0.9em]">
                <DialogTitle>Apply Upcharge</DialogTitle>
                <div className="flex-auto overflow-y-auto px-6 pb-5 pt-0">
                    <div className="flex items-center">
                        <TextField
                            placeholder="Add $ or % Upcharge"
                            fullWidth
                            onChange={(e) => onChangeHandleUpcharge(e.target.value)}
                            value={upcharge}
                        />
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={onClickValidateUpcharge} disabled={!upcharge || error} color="primary" size="medium">
                        Ok
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default ApplyUpCharge;
