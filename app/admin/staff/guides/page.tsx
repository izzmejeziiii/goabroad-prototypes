"use client";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

interface Guide { id: number; url: string; author: string; published: string; modified: string; status: StatusMeta; }
const guides: Guide[] = [
    { id: 1, url: "/volunteer-abroad/guide", author: "Bianca Reyes", published: "Jun 10, 2026", modified: "Jul 08, 2026", status: { label: "Published", tone: "success" } },
    { id: 2, url: "/teach-abroad/guide", author: "Alex Rivera", published: "May 22, 2026", modified: "Jun 30, 2026", status: { label: "Published", tone: "success" } },
    { id: 3, url: "/gap-year/guide", author: "Alex Rivera", published: "—", modified: "Jul 21, 2026", status: { label: "Unpublished", tone: "neutral" } },
];

export default function StaffGuidesPage() {
    const columns: Column<Guide>[] = [
        { key: "url", header: "Page URL", render: (r) => <span className="font-medium text-slate-800">{r.url}</span> },
        { key: "author", header: "Author" },
        { key: "published", header: "Date Published" },
        { key: "modified", header: "Date Modified" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Guides"
                description="Long-form destination and program guides."
                actions={
                    <Link href="/admin/staff/guides/new">
                        <Button icon={FiPlus}>Add Guide</Button>
                    </Link>
                }
            />
            <DataTable columns={columns} rows={guides} />
        </div>
    );
}
