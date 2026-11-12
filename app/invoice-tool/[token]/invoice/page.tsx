import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InvoiceDocument from "../../../components/invoice-tool/InvoiceDocument";
import { findByToken, invoices } from "../../../components/invoice-tool/data";

/* The full invoice behind "View full invoice" on the pay page. */
export function generateStaticParams() {
    return invoices.map((inv) => ({ token: inv.token }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ token: string }>;
}): Promise<Metadata> {
    const invoice = findByToken((await params).token);
    return invoice ? { title: `Invoice ${invoice.number} | GoAbroad Prototypes` } : {};
}

export default async function FullInvoicePage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;
    if (!findByToken(token)) notFound();
    return <InvoiceDocument token={token} />;
}
