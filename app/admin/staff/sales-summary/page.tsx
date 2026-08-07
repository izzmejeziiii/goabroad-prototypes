"use client";

import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import type { Column } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}`;

interface Row { id: number; month: string; sales: number; collections: number; yoy: string; }
const rows: Row[] = [
    { id: 1, month: "January", sales: 52000, collections: 48000, yoy: "+8%" },
    { id: 2, month: "February", sales: 61000, collections: 55000, yoy: "+12%" },
    { id: 3, month: "March", sales: 58000, collections: 60000, yoy: "+5%" },
    { id: 4, month: "April", sales: 64000, collections: 59000, yoy: "+9%" },
    { id: 5, month: "May", sales: 70000, collections: 63000, yoy: "+11%" },
    { id: 6, month: "June", sales: 67000, collections: 61000, yoy: "+7%" },
    { id: 7, month: "July (MTD)", sales: 56000, collections: 45000, yoy: "+6%" },
];

export default function SalesSummaryPage() {
    const columns: Column<Row>[] = [
        { key: "month", header: "Month", render: (r) => <span className="font-medium text-slate-800">{r.month}</span> },
        { key: "sales", header: "Sales", align: "right", render: (r) => money(r.sales) },
        { key: "collections", header: "Collections", align: "right", render: (r) => money(r.collections) },
        { key: "yoy", header: "YoY", align: "right", render: (r) => <span className="font-medium text-fern-600">{r.yoy}</span> },
    ];
    return (
        <div className="mx-auto max-w-5xl">
            <BackLink href="/admin/staff/dashboard" label="Back to dashboard" />
            <PageHeader title="Sales & Collections Summary" description="Monthly sales vs. collections with year-over-year comparison." />
            <DataTable columns={columns} rows={rows} />
        </div>
    );
}
