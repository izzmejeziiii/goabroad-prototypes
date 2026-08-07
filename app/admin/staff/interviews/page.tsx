"use client";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

interface Interview { id: number; interviewee: string; client: string; added: string; published: string; type: string; country: string; status: StatusMeta; }
const interviews: Interview[] = [
    { id: 1, interviewee: "Emily Carter", client: "Global Trek Volunteers", added: "Jul 05, 2026", published: "Jul 09, 2026", type: "Alumni", country: "Peru", status: { label: "Published", tone: "success" } },
    { id: 2, interviewee: "Marisol Quispe", client: "Global Trek Volunteers", added: "Jun 28, 2026", published: "Jul 01, 2026", type: "Staff", country: "Peru", status: { label: "Published", tone: "success" } },
    { id: 3, interviewee: "Lukas Vogel", client: "Andes Language Co.", added: "Jul 18, 2026", published: "—", type: "Alumni", country: "Peru", status: { label: "Unpublished", tone: "neutral" } },
];

export default function StaffInterviewsPage() {
    const columns: Column<Interview>[] = [
        { key: "interviewee", header: "Interviewee", render: (r) => <span className="font-medium text-slate-800">{r.interviewee}</span> },
        { key: "client", header: "Client Name" },
        { key: "added", header: "Date Added" },
        { key: "published", header: "Date Published" },
        { key: "type", header: "Type" },
        { key: "country", header: "Country" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Interviews"
                description="Alumni and staff interviews across client programs."
                actions={
                    <Link href="/admin/staff/interviews/new">
                        <Button icon={FiPlus}>Add Interview</Button>
                    </Link>
                }
            />
            <DataTable columns={columns} rows={interviews} />
        </div>
    );
}
