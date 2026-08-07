"use client";

import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

interface Lead {
    id: number;
    date: string;
    name: string;
    email: string;
    nationality: string;
    destinations: string;
    status: StatusMeta;
}

const leads: Lead[] = [
    { id: 1, date: "Jul 23, 2026", name: "Hannah Schmidt", email: "hannah@example.com", nationality: "Germany", destinations: "Peru, Bolivia", status: { label: "Unanswered", tone: "warning" } },
    { id: 2, date: "Jul 22, 2026", name: "Diego Fernández", email: "diego@example.com", nationality: "Spain", destinations: "Peru", status: { label: "Answered", tone: "success" } },
    { id: 3, date: "Jul 20, 2026", name: "Grace Liu", email: "grace@example.com", nationality: "United States", destinations: "Peru, Ecuador", status: { label: "Answered", tone: "success" } },
    { id: 4, date: "Jul 18, 2026", name: "Owen Brady", email: "owen@example.com", nationality: "Ireland", destinations: "Peru", status: { label: "Bounced", tone: "danger" } },
];

export default function OnlineAdvisorPage() {
    const columns: Column<Lead>[] = [
        { key: "date", header: "Date" },
        { key: "name", header: "Name", render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
        { key: "email", header: "Email" },
        { key: "nationality", header: "Nationality" },
        { key: "destinations", header: "Destinations of Interest" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Online Advisor"
                description="Traveler inquiries and leads matched to client programs."
            />
            <DataTable columns={columns} rows={leads} />
        </div>
    );
}
