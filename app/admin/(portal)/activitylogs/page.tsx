"use client";

import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import { activityLogs } from "@/app/components/admin-dashboard/data";
import type { ActivityLog, Column } from "@/app/components/admin-dashboard/types";

export default function ActivityLogsPage() {
    const columns: Column<ActivityLog>[] = [
        { key: "date", header: "Date" },
        {
            key: "type",
            header: "Activity Type",
            render: (a) => (
                <span className="font-medium text-slate-800">{a.type}</span>
            ),
        },
        { key: "ref", header: "ID # / Name" },
        { key: "user", header: "User" },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Activity Logs"
                description="A record of recent changes made to your GoAbroad account."
            />
            <DataTable columns={columns} rows={activityLogs} />
        </div>
    );
}
