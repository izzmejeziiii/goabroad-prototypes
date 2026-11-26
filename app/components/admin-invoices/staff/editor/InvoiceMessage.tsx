"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/InvoiceMessage.js: a
   4-row "Invoice Message" TextField (margin="normal") on its own Paper.
   Its isDisabled prop isn't a TextField prop, so it never disables. */

import { Paper } from "../../mui";
import { useEditor } from "./EditorContext";
import { TextField } from "./ui/inputs";

const InvoiceMessage = () => {
    const { state, handleStateChange } = useEditor();
    return (
        <Paper className="mb-6 p-6">
            <TextField
                id="standard-multiline-static"
                label="Invoice Message"
                multiline
                rows={4}
                placeholder="Type here to add a message to this invoice"
                margin="normal"
                fullWidth
                value={state.invoice.message}
                onChange={(e) => {
                    const message = e.target.value;
                    handleStateChange((s) => ({ invoice: { ...s.invoice, message } }));
                }}
            />
        </Paper>
    );
};

export default InvoiceMessage;
