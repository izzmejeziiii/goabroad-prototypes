import { notFound } from "next/navigation";
import PayView from "../../components/invoice-tool/PayView";
import { findByToken, invoices } from "../../components/invoice-tool/data";

/* The URL carries an opaque token, not the invoice number, so the link in the
   invoice email can open this step directly without the lookup. */
export function generateStaticParams() {
    return invoices.map((inv) => ({ token: inv.token }));
}

export default async function PayInvoicePage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;
    if (!findByToken(token)) notFound();
    return <PayView token={token} />;
}
