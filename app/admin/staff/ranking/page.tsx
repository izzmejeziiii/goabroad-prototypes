"use client";

import { useState } from "react";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import type { Column } from "@/app/components/admin-dashboard/types";

interface RankRow { id: number; rank: number; client: string; listing: string; linked: number; ads: number; }
const searchResults: RankRow[] = [
    { id: 1, rank: 1, client: "Maximo Impact Peru", listing: "Teach English in Cusco", linked: 14, ads: 3 },
    { id: 2, rank: 2, client: "Global Trek Volunteers", listing: "Community Health Volunteer", linked: 12, ads: 2 },
    { id: 3, rank: 3, client: "Andes Language Co.", listing: "Spanish Immersion", linked: 9, ads: 1 },
    { id: 4, rank: 4, client: "Rainforest Expeditions", listing: "Amazon Conservation", linked: 6, ads: 0 },
];

const tabs = [
    { key: "search", label: "Search Results Ranking" },
    { key: "features", label: "Features Ranking" },
    { key: "program", label: "Program Ranking in SR" },
    { key: "travel", label: "Travel Resource Ranking" },
];

export default function StaffRankingPage() {
    const [tab, setTab] = useState("search");

    const cols: Column<RankRow>[] = [
        { key: "rank", header: "Current Rank", render: (r) => <span className="font-semibold text-slate-800">#{r.rank}</span> },
        { key: "client", header: "Client Name" },
        { key: "listing", header: "Listing Title" },
        { key: "linked", header: "Linked Listings", align: "right" },
        { key: "ads", header: "Total Ads", align: "right" },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Ranking System"
                description="Manage search-results, features, program, and travel-resource rankings. Drag rows to reorder."
            />
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            {tab === "search" && <DataTable columns={cols} rows={searchResults} />}
            {tab === "features" && (
                <DataTable columns={cols.slice(0, 3)} rows={searchResults} />
            )}
            {tab === "program" && (
                <DataTable
                    columns={[
                        { key: "rank", header: "Ranking", render: (r: RankRow) => `#${r.rank}` },
                        { key: "id", header: "Program ID", render: (r: RankRow) => `#${8800 + r.id}` },
                        { key: "listing", header: "Program Name" },
                    ]}
                    rows={searchResults}
                />
            )}
            {tab === "travel" && (
                <DataTable
                    columns={[
                        { key: "rank", header: "Ranking", render: (r: RankRow) => `#${r.rank}` },
                        { key: "client", header: "Client Name" },
                    ]}
                    rows={searchResults}
                />
            )}
        </div>
    );
}
