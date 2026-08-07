"use client";

import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import Card from "@/app/components/admin-dashboard/shared/Card";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import type { Column } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}`;

function GoalCard({ label, actual, goal, color }: { label: string; actual: number; goal: number; color: string }) {
    const pct = Math.round((actual / goal) * 100);
    return (
        <Card>
            <div className="text-sm font-semibold text-slate-700">{label}</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
                {money(actual)}{" "}
                <span className="text-sm font-medium text-slate-400">/ {money(goal)}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className="mt-1 text-xs text-slate-400">{pct}% of annual goal</div>
        </Card>
    );
}

interface Mgr { id: number; name: string; salesGoal: number; salesYtd: number; collGoal: number; collYtd: number; }
const managers: Mgr[] = [
    { id: 1, name: "Bianca Reyes", salesGoal: 320000, salesYtd: 232000, collGoal: 320000, collYtd: 210000 },
    { id: 2, name: "Alex Rivera", salesGoal: 300000, salesYtd: 196000, collGoal: 300000, collYtd: 181000 },
];

export default function SalesGoalsPage() {
    const cols: Column<Mgr>[] = [
        { key: "name", header: "Account Manager", render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
        { key: "salesGoal", header: "Sales Goal", align: "right", render: (r) => money(r.salesGoal) },
        { key: "salesYtd", header: "Sales YTD", align: "right", render: (r) => money(r.salesYtd) },
        { key: "collGoal", header: "Collections Goal", align: "right", render: (r) => money(r.collGoal) },
        { key: "collYtd", header: "Collections YTD", align: "right", render: (r) => money(r.collYtd) },
    ];
    return (
        <div className="mx-auto max-w-6xl">
            <BackLink href="/admin/staff/dashboard" label="Back to dashboard" />
            <PageHeader title="Sales & Collections Goals" description="2026 company goals and per-account-manager progress." />
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <GoalCard label="Sales — YTD" actual={428000} goal={620000} color="#295d82" />
                <GoalCard label="Collections — YTD" actual={391000} goal={620000} color="#0e8050" />
            </div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Account Managers</h3>
            <DataTable columns={cols} rows={managers} />
        </div>
    );
}
