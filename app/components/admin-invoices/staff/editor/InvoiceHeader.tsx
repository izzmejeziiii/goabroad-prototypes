"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/InvoiceHeader.js: three
   columns (Billed from / Billed to / Invoice Date + Invoice Number) on a
   24px-padded Paper with a 16px gap. */

import clsx from "clsx";
import { billedFrom } from "../../data";
import { BODY1, H6, OVERLINE, Paper } from "../../mui";
import { useEditor } from "./EditorContext";
import { getBillingToDetails } from "./mapping";
import { DatePicker } from "./ui/DatePicker";
import { TextField } from "./ui/inputs";

/** headerLabel / the last section's `span` rule: grey[600]. */
const LABEL = clsx(OVERLINE, "!text-[#757575]");

const InvoiceHeader = () => {
    const { state, handleStateChange } = useEditor();
    const { invoice, providerBilling, selectedProvider } = state;
    const billing = providerBilling?.billing;

    // shouldComponentUpdate re-derives both from the invoice, falling back
    // to the provider's billing, so a field cleared out refills itself.
    const clientName = invoice.billing_name
        ? invoice.billing_name
        : providerBilling !== null
          ? billing && billing.billing_name !== ""
              ? billing.billing_name
              : (selectedProvider?.label ?? "")
          : "";
    const billingToDetails = invoice.billing_address
        ? invoice.billing_address
        : providerBilling !== null
          ? getBillingToDetails(billing)
          : "";

    const handleInvoiceDate = (date: Date | null) => {
        // new Date(null) is 1970, as in the source.
        const printed = date ? new Date(date) : new Date(0);
        handleStateChange((s) => ({
            invoice: {
                ...s.invoice,
                printed_date: printed,
                renewal_date: new Date(printed).setFullYear(printed.getFullYear() + 1),
            },
        }));
    };

    return (
        <Paper className="grid grid-cols-3 gap-4 p-6">
            <section>
                <span className={clsx(LABEL, "block")}>Billed from</span>
                <div className="max-w-[100px]">
                    {/* GaLogo (an inline SVG, 100px wide, 10px 0 margin) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="my-[10px] block w-[100px]" src={billedFrom.logo} alt="GoAbroad" />
                </div>
                <h6 className={clsx(H6, "m-0 pb-2 !leading-[1em]")}>GoAbroad.com</h6>
                <p className={clsx(BODY1, "m-0")}>4309 Fox Grove Dr.</p>
                <p className={clsx(BODY1, "m-0")}>Fort Collins, CO, 80524 USA</p>
            </section>
            <section>
                <span className={clsx(LABEL, "block")}>Billed to</span>
                <TextField
                    rootClassName="pb-2 leading-[1em]"
                    inputClassName="text-[1.2em]"
                    value={clientName}
                    onChange={(e) => {
                        const value = e.target.value;
                        handleStateChange((s) => ({ invoice: { ...s.invoice, billing_name: value } }));
                    }}
                    fullWidth
                    id="create-invoice-client-name"
                    dataCy="create-invoice-client-name"
                />
                <TextField
                    multiline
                    minRows={2}
                    value={billingToDetails}
                    onChange={(e) => {
                        const value = e.target.value;
                        handleStateChange((s) => ({ invoice: { ...s.invoice, billing_address: value } }));
                    }}
                    fullWidth
                    dataCy="create-invoice-client-address"
                />
            </section>
            <section>
                <div className="mb-5 flex flex-col items-end">
                    {/* The label carries the invoiceDate class too. */}
                    <span className={clsx(LABEL, "mb-2 flex flex-col items-end")}>Invoice Date</span>
                    <DatePicker
                        className="w-[250px] rounded-[4px] border border-solid !border-[rgba(0,0,0,0.26)] px-0 py-2 text-center text-[1.2em]"
                        selected={invoice.printed_date}
                        onChange={handleInvoiceDate}
                        id="invoice-date"
                        disabled={invoice.status > 2}
                        popperZ={2}
                    />
                </div>
                <div className="flex flex-col items-end">
                    <span className={clsx(LABEL, "flex flex-col items-end")}>Invoice Number</span>
                    <h6 className={clsx(H6, "m-0 !leading-[1em]")}>{invoice.id ? invoice.id : "#####"}</h6>
                </div>
            </section>
        </Paper>
    );
};

export default InvoiceHeader;
