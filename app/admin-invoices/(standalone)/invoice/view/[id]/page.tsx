import { Suspense } from "react";
import ViewInvoice from "../../../../../components/admin-invoices/view/ViewInvoice";

/* /invoice/view/:id in the real admin: one page for staff and clients, with
   no shell. ?view=client shows it as the client sees it (access level 1). */
export default async function ViewInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <Suspense fallback={null}>
            <ViewInvoice id={id} />
        </Suspense>
    );
}
