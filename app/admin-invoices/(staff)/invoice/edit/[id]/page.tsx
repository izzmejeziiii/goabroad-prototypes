import RedesignEditor from "../../../../../components/admin-invoices/redesign/RedesignEditor";

/* /invoice/edit/:id in the real admin, redesigned: the editor beside a live
   preview of the invoice. */
export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <RedesignEditor id={id} />;
}
