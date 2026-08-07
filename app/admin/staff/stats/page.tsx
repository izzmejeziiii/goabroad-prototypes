"use client";

import { FiDownload } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import Button from "@/app/components/admin-dashboard/shared/Button";
import type { Column } from "@/app/components/admin-dashboard/types";

interface StatRow {
    id: number;
    client: string;
    contacts: number;
    impressions: number;
    clicks: number;
    pageviews: number;
    inquiries: number;
    matches: number;
}

const rows: StatRow[] = [
    { id: 1, client: "Global Trek Volunteers", contacts: 312, impressions: 48210, clicks: 1204, pageviews: 8420, inquiries: 96, matches: 41 },
    { id: 2, client: "Maximo Impact Peru", contacts: 540, impressions: 132500, clicks: 2890, pageviews: 15300, inquiries: 148, matches: 77 },
    { id: 3, client: "Andes Language Co.", contacts: 188, impressions: 21400, clicks: 640, pageviews: 5130, inquiries: 61, matches: 22 },
    { id: 4, client: "Rainforest Expeditions", contacts: 96, impressions: 9800, clicks: 240, pageviews: 3980, inquiries: 38, matches: 12 },
];

const num = (n: number) => n.toLocaleString();

export default function StaffStatsPage() {
    const columns: Column<StatRow>[] = [
        { key: "client", header: "Client", render: (r) => <span className="font-medium text-slate-800">{r.client}</span> },
        { key: "contacts", header: "Direct Contacts", align: "right", render: (r) => num(r.contacts) },
        { key: "impressions", header: "Ad Impressions", align: "right", render: (r) => num(r.impressions) },
        { key: "clicks", header: "Ad Clicks", align: "right", render: (r) => num(r.clicks) },
        { key: "pageviews", header: "Listing Pageviews", align: "right", render: (r) => num(r.pageviews) },
        { key: "inquiries", header: "GoAbroad Inquiries", align: "right", render: (r) => num(r.inquiries) },
        { key: "matches", header: "Participant Matches", align: "right", render: (r) => num(r.matches) },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Client Stats"
                description="Traffic, engagement, and match metrics across all client accounts. Filter by month, directory, and location; export to CSV."
                actions={<Button variant="outline" icon={FiDownload}>Export CSV</Button>}
            />
            <DataTable columns={columns} rows={rows} />
            <p className="mt-3 text-xs text-slate-400">
                20+ metrics available (impressions, clicks, PDF downloads, newsletter/article/interview clicks, MyGoAbroad matches &amp; redemptions) with date-range comparison and sparklines.
            </p>
        </div>
    );
}
