import AddEditInvoice from "../../../../../components/admin-invoices/staff/editor/AddEditInvoice";

/* /invoice/edit/:id in the real admin. */
export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <AddEditInvoice id={id} />;
}
