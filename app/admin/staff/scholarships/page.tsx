"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import type { Column } from "@/app/components/admin-dashboard/types";

interface Scholarship { id: number; title: string; directory: string; location: string; type: string; created: string; deadline: string; email: string; }
const scholarships: Scholarship[] = [
    { id: 1, title: "Global Health Scholarship", directory: "Volunteer Abroad", location: "Peru", type: "Merit", created: "May 01, 2026", deadline: "Sep 15, 2026", email: "grants@globaltrek.org" },
    { id: 2, title: "Language Immersion Grant", directory: "Language Schools", location: "Peru", type: "Need-based", created: "Apr 12, 2026", deadline: "Aug 31, 2026", email: "grants@andes.co" },
    { id: 3, title: "Conservation Fellowship", directory: "Volunteer Abroad", location: "Peru", type: "Merit", created: "Jun 20, 2026", deadline: "Oct 01, 2026", email: "apply@rainforest.org" },
];

const tabs = [
    { key: "listings", label: "Scholarship Listings" },
    { key: "ranking", label: "Scholarships Ranking" },
];

export default function StaffScholarshipsPage() {
    const [tab, setTab] = useState("listings");

    const cols: Column<Scholarship>[] = [
        { key: "title", header: "Scholarship Title", render: (r) => <span className="font-medium text-slate-800">{r.title}</span> },
        { key: "directory", header: "Directory" },
        { key: "location", header: "Location" },
        { key: "type", header: "Type" },
        { key: "created", header: "Date Created" },
        { key: "deadline", header: "Deadline" },
        { key: "email", header: "Contact Email" },
    ];
    const rankCols: Column<Scholarship>[] = [
        { key: "id", header: "Ranking", render: (r) => `#${r.id}` },
        { key: "title", header: "Scholarship Title", render: (r) => <span className="font-medium text-slate-800">{r.title}</span> },
        { key: "directory", header: "Directory" },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Scholarships"
                description="Manage scholarship listings and their ranking."
                actions={<Button icon={FiPlus}>Add Scholarship</Button>}
            />
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            {tab === "listings" && <DataTable columns={cols} rows={scholarships} />}
            {tab === "ranking" && <DataTable columns={rankCols} rows={scholarships} />}
        </div>
    );
}
