"use client";

import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import type { Column } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}`;

interface Row { id: number; type: string; sales: number; invoices: number; }
const rows: Row[] = [
    { id: 1, type: "New Business", sales: 198000, invoices: 96 },
    { id: 2, type: "Renewal", sales: 172000, invoices: 154 },
    { id: 3, type: "Upsell", sales: 58000, invoices: 42 },
];

export default function SalesBySaleTypePage() {
    const cols: Column<Row>[] = [
        { key: "type", header: "Type of Sale", render: (r) => <span className="font-medium text-slate-800">{r.type}</span> },
        { key: "sales", header: "Sales", align: "right", render: (r) => money(r.sales) },
        { key: "invoices", header: "# Invoices", align: "right" },
    ];
    return (
        <div className="mx-auto max-w-4xl">
            <BackLink href="/admin/staff/dashboard" label="Back to dashboard" />
            <PageHeader title="Sales by Sale Type" description="Revenue broken down by new business, renewal, and upsell." />
            <DataTable columns={cols} rows={rows} />
        </div>
    );
}
