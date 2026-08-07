"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCreditCard } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import { invoices, provider } from "@/app/components/admin-dashboard/data";
import type { Column, Invoice } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}.00`;

export default function InvoicesPage() {
    const router = useRouter();

    const columns: Column<Invoice>[] = [
        {
            key: "number",
            header: "Invoice #",
            render: (i) => <span className="font-medium text-slate-800">{i.number}</span>,
        },
        { key: "issued", header: "Invoice Date" },
        {
            key: "status",
            header: "Status",
            render: (i) => <StatusPill label={i.status.label} tone={i.status.tone} />,
        },
        { key: "amount", header: "Total Invoiced", align: "right", render: (i) => money(i.amount) },
        {
            key: "due_amount",
            header: "Amount Due",
            align: "right",
            render: (i) => (i.status.tone === "danger" ? money(i.amount) : money(0)),
        },
        { key: "due", header: "Due Date" },
        {
            key: "balance",
            header: "Balance",
            align: "right",
            render: (i) => (i.status.tone === "danger" ? money(i.amount) : money(0)),
        },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Invoices"
                description="View, download, and pay your GoAbroad invoices."
            />

            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-roman-200 bg-roman-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="text-sm font-medium text-roman-700">
                        Outstanding balance
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                        {money(provider.balanceDue)}
                    </div>
                    <div className="text-xs text-slate-500">
                        Due {provider.dueDate}
                    </div>
                </div>
                <Link href="/admin/invoices/1/pay">
                    <Button variant="cta" icon={FiCreditCard}>
                        Pay balance
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                rows={invoices}
                onRowClick={(i) => router.push(`/admin/invoices/${i.id}`)}
            />
        </div>
    );
}
