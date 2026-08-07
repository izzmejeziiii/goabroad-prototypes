"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import { programs } from "@/app/components/admin-dashboard/data";
import type { Column, Program } from "@/app/components/admin-dashboard/types";

export default function ProgramsPage() {
    const router = useRouter();

    const columns: Column<Program>[] = [
        { key: "id", header: "ID", render: (p) => `#${p.id}` },
        {
            key: "title",
            header: "Title",
            render: (p) => (
                <div>
                    <div className="font-medium text-slate-800">{p.title}</div>
                    <div className="text-xs text-slate-400">{p.type}</div>
                </div>
            ),
        },
        { key: "type", header: "Directory" },
        { key: "location", header: "Country" },
        {
            key: "views",
            header: "Views",
            align: "right",
            render: (p) => p.views.toLocaleString(),
        },
        { key: "leads", header: "Leads", align: "right" },
        { key: "updated", header: "Last Edited" },
        {
            key: "status",
            header: "Status",
            render: (p) => <StatusPill label={p.status.label} tone={p.status.tone} />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Programs"
                description="Create, edit, and track the performance of your listings."
                actions={
                    <Link href="/admin/programs/new">
                        <Button icon={FiPlus}>Create program</Button>
                    </Link>
                }
            />
            <DataTable
                columns={columns}
                rows={programs}
                onRowClick={(p) => router.push(`/admin/programs/${p.id}`)}
            />
        </div>
    );
}
