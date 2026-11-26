"use client";

import { useInvoices } from "../../store";
import { SlideDrawer } from "../../results-table/primitives/Drawer";
import ActivityLogTab from "./ActivityLogTab";
import CommentsTab from "./CommentsTab";
import Communications from "./Communications";
import InvoicesDrawerTabs from "./InvoicesDrawerTabs";
import { useInvoicesContext } from "./InvoicesProvider";
import PaymentsTab from "./PaymentsTab";

/* Copy of src/views/Client/Invoices/InvoicesDrawer.js: the invoice summary
   a row click opens, a 420px right drawer with no backdrop tint, padded
   12px 24px 24px, holding the tabs and the selected tab (Payments,
   Comments, Comm Logs, Activity Log). */
const InvoicesDrawer = () => {
    const { state, handleStateChanged, selectedInvoice } = useInvoicesContext();
    const { getInvoice, addComment, updateInvoice } = useInvoices();
    const { drawerTabSelected, invoiceSummaryOpen, commentsShown } = state;
    const invoice = selectedInvoice ? getInvoice(selectedInvoice.id) : undefined;
    // GET /comments?section_id=2&gen_id=:id&sort=+id
    const comments = [...(invoice?.comments ?? [])].sort((a, b) => a.id - b.id);

    return (
        <SlideDrawer open={invoiceSummaryOpen} invisibleBackdrop onClose={() => handleStateChanged({ invoiceSummaryOpen: false })}>
            <div className="box-border flex h-full w-[420px] flex-col px-6 pb-6 pt-3">
                <InvoicesDrawerTabs tabSelected={drawerTabSelected} onChange={(tab) => handleStateChanged({ drawerTabSelected: tab })} />
                {drawerTabSelected === 0 && (
                    <PaymentsTab
                        paymentTerms={invoice?.payment_terms ?? []}
                        invoiceId={invoice?.id ?? 0}
                        onEditPayment={(index) => handleStateChanged({ editPayment: true, selectedPaymentTermKey: index })}
                    />
                )}
                {drawerTabSelected === 1 && invoice && (
                    <CommentsTab
                        comments={comments}
                        commentsShown={commentsShown}
                        onCommentsShownChange={(n) => handleStateChanged({ commentsShown: n })}
                        onPost={(text) => addComment(invoice.id, text)}
                        onDelete={(comment) =>
                            updateInvoice(invoice.id, { comments: invoice.comments.filter((c) => c.id !== comment.id) })
                        }
                    />
                )}
                {drawerTabSelected === 2 && <Communications />}
                {drawerTabSelected === 3 && <ActivityLogTab activities={invoice?.activities ?? []} />}
            </div>
        </SlideDrawer>
    );
};

export default InvoicesDrawer;
