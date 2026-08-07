"use client";

import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import Card from "@/app/components/admin-dashboard/shared/Card";
import { FormField, Select } from "@/app/components/admin-dashboard/shared/Form";
import type { Column } from "@/app/components/admin-dashboard/types";

interface Row { id: number; rank: number; clicks: number; impressions: number; conversion: string; }
const rows: Row[] = [
    { id: 1, rank: 1, clicks: 3120, impressions: 41000, conversion: "7.6%" },
    { id: 2, rank: 2, clicks: 2010, impressions: 38500, conversion: "5.2%" },
    { id: 3, rank: 3, clicks: 1440, impressions: 33200, conversion: "4.3%" },
    { id: 4, rank: 4, clicks: 980, impressions: 29800, conversion: "3.3%" },
    { id: 5, rank: 5, clicks: 610, impressions: 25100, conversion: "2.4%" },
];

export default function RankPerformancePage() {
    const cols: Column<Row>[] = [
        { key: "rank", header: "Rank", render: (r) => <span className="font-semibold text-slate-800">#{r.rank}</span> },
        { key: "clicks", header: "Clicks", align: "right", render: (r) => r.clicks.toLocaleString() },
        { key: "impressions", header: "Impressions", align: "right", render: (r) => r.impressions.toLocaleString() },
        { key: "conversion", header: "Conversion Rate", align: "right" },
    ];
    return (
        <div className="mx-auto max-w-5xl">
            <BackLink href="/admin/staff/stats" label="Back to client stats" />
            <PageHeader title="Rank Performance" description="Clicks, impressions, and conversion rate by search-results rank position." />
            <Card className="mb-6">
                <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="Directory">
                        <Select defaultValue="All">
                            <option>All</option>
                            <option>Volunteer Abroad</option>
                            <option>Teach Abroad</option>
                        </Select>
                    </FormField>
                    <FormField label="Date range">
                        <Select defaultValue="Last 30 days">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Year to date</option>
                        </Select>
                    </FormField>
                    <FormField label="Tier">
                        <Select defaultValue="All tiers">
                            <option>All tiers</option>
                            <option>Tier 1</option>
                            <option>Tier 3</option>
                        </Select>
                    </FormField>
                </div>
            </Card>
            <DataTable columns={cols} rows={rows} />
        </div>
    );
}
