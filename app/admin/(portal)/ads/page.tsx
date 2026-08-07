"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import { ads } from "@/app/components/admin-dashboard/data";
import type { Ad, Column } from "@/app/components/admin-dashboard/types";

export default function AdsPage() {
    const router = useRouter();

    const columns: Column<Ad>[] = [
        {
            key: "title",
            header: "Campaign",
            render: (a) => (
                <div>
                    <div className="font-medium text-slate-800">{a.title}</div>
                    <div className="text-xs text-slate-400">{a.format}</div>
                </div>
            ),
        },
        { key: "placement", header: "Placement" },
        { key: "period", header: "Period" },
        {
            key: "impressions",
            header: "Impressions",
            align: "right",
            render: (a) => a.impressions.toLocaleString(),
        },
        {
            key: "clicks",
            header: "Clicks",
            align: "right",
            render: (a) => a.clicks.toLocaleString(),
        },
        {
            key: "status",
            header: "Status",
            render: (a) => (
                <StatusPill label={a.status.label} tone={a.status.tone} />
            ),
        },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Ads"
                description="Promote your programs across GoAbroad's highest-traffic pages."
                actions={
                    <Link href="/admin/ads/new">
                        <Button icon={FiPlus}>Create ad</Button>
                    </Link>
                }
            />
            <DataTable
                columns={columns}
                rows={ads}
                onRowClick={(a) => router.push(`/admin/ads/${a.id}`)}
            />
        </div>
    );
}
