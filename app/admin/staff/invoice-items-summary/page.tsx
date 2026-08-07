"use client";

import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import type { Column } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}`;

interface Row { id: number; product: string; sales: number; total: number; pct: string; yoy: string; }
const rows: Row[] = [
    { id: 1, product: "Featured Listing", sales: 210, total: 176400, pct: "38%", yoy: "+10%" },
    { id: 2, product: "Homepage Spotlight", sales: 64, total: 128000, pct: "27%", yoy: "+14%" },
    { id: 3, product: "Annual Subscription", sales: 48, total: 115200, pct: "25%", yoy: "+4%" },
    { id: 4, product: "Newsletter Feature", sales: 90, total: 31500, pct: "7%", yoy: "-2%" },
    { id: 5, product: "Sidebar Ad", sales: 40, total: 15600, pct: "3%", yoy: "+1%" },
];

export default function InvoiceItemsSummaryPage() {
    const columns: Column<Row>[] = [
        { key: "product", header: "Product Item", render: (r) => <span className="font-medium text-slate-800">{r.product}</span> },
        { key: "sales", header: "# Sales", align: "right" },
        { key: "total", header: "Total", align: "right", render: (r) => money(r.total) },
        { key: "pct", header: "% of Sales", align: "right" },
        { key: "yoy", header: "YoY", align: "right", render: (r) => <span className={`font-medium ${r.yoy.startsWith("-") ? "text-roman-600" : "text-fern-600"}`}>{r.yoy}</span> },
    ];
    return (
        <div className="mx-auto max-w-5xl">
            <BackLink href="/admin/staff/dashboard" label="Back to dashboard" />
            <PageHeader title="Invoice Items Summary" description="Product-item sales ranked by revenue, with year-over-year change." />
            <DataTable columns={columns} rows={rows} />
        </div>
    );
}
