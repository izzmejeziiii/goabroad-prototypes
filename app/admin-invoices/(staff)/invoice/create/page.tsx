import RedesignEditor from "../../../../components/admin-invoices/redesign/RedesignEditor";

/* /invoice/create in the real admin, redesigned: the editor beside a live
   preview of the invoice. ?provider_id= picks the client, as in the real
   admin. */
export default async function CreateInvoicePage({ searchParams }: { searchParams: Promise<{ provider_id?: string }> }) {
    const { provider_id } = await searchParams;
    return <RedesignEditor providerId={Number(provider_id) || undefined} />;
}
