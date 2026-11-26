"use client";

import { useInvoices } from "../../store";
import EditPaymentDrawer from "./EditPaymentDrawer";
import { useInvoicesContext } from "./InvoicesProvider";
import PaymentDrawer from "./PaymentDrawer";
import { TYPE_TO_METHOD } from "./paymentTypes";

/* Copy of src/views/Client/Invoices/RecordPaymentDrawer.js: the Mark As Paid
   drawer and the Edit Payment drawer for the selected invoice. After a
   payment the list goes back to page 1 and the drawer closes. */
const RecordPaymentDrawer = () => {
    const { state, handleStateChanged, selectedInvoice } = useInvoicesContext();
    const { getInvoice, updateInvoice } = useInvoices();
    const invoice = selectedInvoice ? getInvoice(selectedInvoice.id) : undefined;
    const client = selectedInvoice?.provider_id ? { id: selectedInvoice.provider_id, name: selectedInvoice.name } : null;

    return (
        <>
            <PaymentDrawer
                open={state.paymentDrawerOpen}
                selectedClient={client}
                invoiceId={selectedInvoice?.id ?? null}
                onClose={() => handleStateChanged({ paymentDrawerOpen: false })}
                recordPaymentCallback={() =>
                    handleStateChanged({ page: 0, paymentDrawerOpen: false, selectedInvoiceId: null })
                }
            />
            <EditPaymentDrawer
                open={state.editPayment}
                invoiceId={selectedInvoice?.id ?? null}
                payments={invoice?.payments ?? []}
                selectedPaymentTermKey={state.selectedPaymentTermKey}
                onClose={() => handleStateChanged({ editPayment: false, selectedPaymentTermKey: 0 })}
                onUpdate={(paymentId, type) =>
                    invoice &&
                    updateInvoice(invoice.id, {
                        payments: invoice.payments.map((p) =>
                            p.id === paymentId ? { ...p, payment_method: TYPE_TO_METHOD[type] } : p,
                        ),
                    })
                }
            />
        </>
    );
};

export default RecordPaymentDrawer;
