"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import { inquiries } from "@/app/components/admin-dashboard/data";
import type { Column, Inquiry } from "@/app/components/admin-dashboard/types";

const citizenship: Record<number, string> = {
    1: "Germany",
    2: "Spain",
    3: "United States",
    4: "Ireland",
    5: "Nigeria",
};

export default function InquiriesPage() {
    const router = useRouter();

    const columns: Column<Inquiry>[] = [
        { key: "received", header: "Date of Inquiry" },
        {
            key: "name",
            header: "Inquirer Name",
            render: (i) => (
                <span className="font-medium text-slate-800">{i.name}</span>
            ),
        },
        {
            key: "citizenship",
            header: "Citizenship",
            render: (i) => citizenship[i.id] ?? "—",
        },
        { key: "program", header: "Program Name" },
        {
            key: "status",
            header: "Status",
            render: (i) => <StatusPill label={i.status.label} tone={i.status.tone} />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Inquiries"
                description="Traveler questions about your programs. Reply fast to convert more."
            />
            <DataTable
                columns={columns}
                rows={inquiries}
                onRowClick={(i) => router.push(`/admin/inquiries/${i.id}`)}
            />
        </div>
    );
}
