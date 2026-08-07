"use client";

import { useState } from "react";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

interface UrlRow { id: number; client: string; link: string; type: string; status: StatusMeta; crawled: string; manager: string; }
const providerUrls: UrlRow[] = [
    { id: 1, client: "Global Trek Volunteers", link: "globaltrekvolunteers.org", type: "Visit Website", status: { label: "200 OK", tone: "success" }, crawled: "Jul 23, 2026", manager: "Bianca Reyes" },
    { id: 2, client: "Andes Language Co.", link: "andes.co/apply", type: "Apply Now", status: { label: "404 Broken", tone: "danger" }, crawled: "Jul 23, 2026", manager: "Bianca Reyes" },
    { id: 3, client: "Rainforest Expeditions", link: "rainforest.org/contact", type: "Contact Provider", status: { label: "301 Redirect", tone: "warning" }, crawled: "Jul 22, 2026", manager: "Alex Rivera" },
];

const tabs = [
    { key: "provider", label: "Provider URL" },
    { key: "program", label: "Program URL" },
    { key: "ads", label: "Ads URL" },
];

export default function StaffUrlVerifiersPage() {
    const [tab, setTab] = useState("provider");

    const cols: Column<UrlRow>[] = [
        { key: "client", header: "Client Name", render: (r) => <span className="font-medium text-slate-800">{r.client}</span> },
        { key: "link", header: "Link" },
        { key: "type", header: "Link Type" },
        { key: "status", header: "Response Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
        { key: "crawled", header: "Last Crawled" },
        { key: "manager", header: "Account Manager" },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="URL Verifiers"
                description="Crawl status for provider, program, and ad links."
            />
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            <DataTable columns={cols} rows={providerUrls} />
        </div>
    );
}
