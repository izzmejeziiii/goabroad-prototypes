"use client";

import { FiDownload } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import Button from "@/app/components/admin-dashboard/shared/Button";
import type { Column } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}.00`;

interface Row { id: number; invoice: string; client: string; date: string; amount: number; balance: number; payment: number; paymentDate: string; type: string; }
const rows: Row[] = [
    { id: 1, invoice: "INV-2026-0714", client: "Global Trek Volunteers", date: "Jul 14, 2026", amount: 1240, balance: 1240, payment: 0, paymentDate: "—", type: "—" },
    { id: 2, invoice: "INV-2026-0702", client: "Maximo Impact Peru", date: "Jul 02, 2026", amount: 2400, balance: 0, payment: 2400, paymentDate: "Jul 05, 2026", type: "Bank Transfer" },
    { id: 3, invoice: "INV-2026-0620", client: "Andes Language Co.", date: "Jun 20, 2026", amount: 900, balance: 450, payment: 450, paymentDate: "Jul 01, 2026", type: "Credit Card" },
];

export default function CollectionsPage() {
    const columns: Column<Row>[] = [
        { key: "invoice", header: "Invoice ID", render: (r) => <span className="font-medium text-slate-800">{r.invoice}</span> },
        { key: "client", header: "Client Name" },
        { key: "date", header: "Invoice Date" },
        { key: "amount", header: "Invoice Amount", align: "right", render: (r) => money(r.amount) },
        { key: "balance", header: "Balance", align: "right", render: (r) => money(r.balance) },
        { key: "payment", header: "Payment", align: "right", render: (r) => money(r.payment) },
        { key: "paymentDate", header: "Payment Date" },
        { key: "type", header: "Payment Type" },
    ];
    return (
        <div className="mx-auto max-w-7xl">
            <BackLink href="/admin/staff/dashboard" label="Back to dashboard" />
            <PageHeader title="Collections" description="Track payments and outstanding balances across invoices." actions={<Button variant="outline" icon={FiDownload}>Export</Button>} />
            <DataTable columns={columns} rows={rows} />
        </div>
    );
}
