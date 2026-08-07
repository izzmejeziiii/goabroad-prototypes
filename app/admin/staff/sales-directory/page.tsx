"use client";

import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import type { Column } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}`;

interface Row { id: number; directory: string; sales: number; invoices: number; }
const rows: Row[] = [
    { id: 1, directory: "Volunteer Abroad", sales: 184000, invoices: 142 },
    { id: 2, directory: "Teach Abroad", sales: 121000, invoices: 88 },
    { id: 3, directory: "Language Schools", sales: 76000, invoices: 61 },
    { id: 4, directory: "Gap Year", sales: 47000, invoices: 33 },
];

export default function SalesByDirectoryPage() {
    const cols: Column<Row>[] = [
        { key: "directory", header: "Directory", render: (r) => <span className="font-medium text-slate-800">{r.directory}</span> },
        { key: "sales", header: "Sales", align: "right", render: (r) => money(r.sales) },
        { key: "invoices", header: "# Invoices", align: "right" },
    ];
    return (
        <div className="mx-auto max-w-4xl">
            <BackLink href="/admin/staff/dashboard" label="Back to dashboard" />
            <PageHeader title="Sales by Directory" description="Revenue broken down by program directory." />
            <DataTable columns={cols} rows={rows} />
        </div>
    );
}
