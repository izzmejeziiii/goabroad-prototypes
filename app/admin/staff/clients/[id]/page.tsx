"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FiDownload, FiEdit2, FiMapPin } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Stars from "@/app/components/admin-dashboard/shared/Stars";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import SummaryWidget from "@/app/components/admin-dashboard/shared/SummaryWidget";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import { getStaffClient } from "@/app/components/admin-dashboard/staff-data";
import {
    programs,
    invoices,
    reviews,
    inquiries,
    ads,
    applications,
    summaryWidgets,
} from "@/app/components/admin-dashboard/data";
import type { Column } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}.00`;

const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "ads", label: "Ads" },
    { key: "reviews", label: "Reviews" },
    { key: "programs", label: "Programs" },
    { key: "invoices", label: "Invoices" },
    { key: "inquiries", label: "Inquiries" },
    { key: "stats", label: "Client Stats" },
    { key: "applications", label: "Applications" },
];

export default function StaffClientProfilePage() {
    const { id } = useParams<{ id: string }>();
    const client = getStaffClient(Number(id));
    const [tab, setTab] = useState("dashboard");

    if (!client) {
        return (
            <div className="mx-auto max-w-6xl">
                <BackLink href="/admin/staff/clients" label="Back to clients" />
                <p className="text-slate-500">Client not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl">
            <BackLink href="/admin/staff/clients" label="Back to clients" />

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white">
                        {client.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            {client.name}
                        </h1>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <FiMapPin className="h-3.5 w-3.5" />
                                {client.location}
                            </span>
                            <StatusPill label={client.verification.label} tone={client.verification.tone} />
                            <span>{client.subscription}</span>
                            <span className="text-slate-400">
                                Manager: {client.manager}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" icon={FiDownload}>
                        Export Report
                    </Button>
                    <Button icon={FiEdit2}>Edit</Button>
                </div>
            </div>

            <Tabs tabs={tabs} active={tab} onChange={setTab} />

            {tab === "dashboard" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {summaryWidgets.map((w) => (
                            <SummaryWidget key={w.key} data={w} />
                        ))}
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card title="Memos">
                            <ul className="space-y-3 text-sm">
                                <li className="rounded-lg bg-slate-50 p-3">
                                    <div className="text-slate-700">Renewal discussion scheduled for early August.</div>
                                    <div className="mt-1 text-xs text-slate-400">Bianca Reyes · Jul 20, 2026</div>
                                </li>
                                <li className="rounded-lg bg-slate-50 p-3">
                                    <div className="text-slate-700">Verification docs pending — accreditation upload.</div>
                                    <div className="mt-1 text-xs text-slate-400">Alex Rivera · Jul 12, 2026</div>
                                </li>
                            </ul>
                        </Card>
                        <Card title="Recent Communications">
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-slate-700">Q3 invoice reminder</span>
                                    <span className="text-slate-400">Jul 22</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-slate-700">Listing renewal</span>
                                    <span className="text-slate-400">Jul 08</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            )}

            {tab === "ads" && (
                <DataTable
                    columns={[
                        { key: "title", header: "Campaign", render: (a) => <span className="font-medium text-slate-800">{a.title}</span> },
                        { key: "placement", header: "Placement" },
                        { key: "period", header: "Period" },
                        { key: "status", header: "Status", render: (a) => <StatusPill label={a.status.label} tone={a.status.tone} /> },
                    ] as Column<(typeof ads)[number]>[]}
                    rows={ads}
                />
            )}

            {tab === "reviews" && (
                <DataTable
                    columns={[
                        { key: "author", header: "Reviewer" },
                        { key: "program", header: "Program" },
                        { key: "rating", header: "Rating", render: (r) => <Stars rating={r.rating} /> },
                        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
                    ] as Column<(typeof reviews)[number]>[]}
                    rows={reviews}
                />
            )}

            {tab === "programs" && (
                <DataTable
                    columns={[
                        { key: "title", header: "Program", render: (p) => <span className="font-medium text-slate-800">{p.title}</span> },
                        { key: "type", header: "Type" },
                        { key: "location", header: "Location" },
                        { key: "status", header: "Status", render: (p) => <StatusPill label={p.status.label} tone={p.status.tone} /> },
                    ] as Column<(typeof programs)[number]>[]}
                    rows={programs}
                />
            )}

            {tab === "invoices" && (
                <DataTable
                    columns={[
                        { key: "number", header: "Invoice #", render: (i) => <span className="font-medium text-slate-800">{i.number}</span> },
                        { key: "issued", header: "Issued" },
                        { key: "amount", header: "Amount", align: "right", render: (i) => money(i.amount) },
                        { key: "status", header: "Status", render: (i) => <StatusPill label={i.status.label} tone={i.status.tone} /> },
                    ] as Column<(typeof invoices)[number]>[]}
                    rows={invoices}
                />
            )}

            {tab === "inquiries" && (
                <DataTable
                    columns={[
                        { key: "name", header: "Inquirer" },
                        { key: "program", header: "Program" },
                        { key: "received", header: "Received" },
                        { key: "status", header: "Status", render: (i) => <StatusPill label={i.status.label} tone={i.status.tone} /> },
                    ] as Column<(typeof inquiries)[number]>[]}
                    rows={inquiries}
                />
            )}

            {tab === "stats" && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { label: "Direct Contacts", value: "312" },
                        { label: "Ad Impressions", value: "48,210" },
                        { label: "Listing Pageviews", value: "8,420" },
                        { label: "GoAbroad Inquiries", value: "96" },
                    ].map((s) => (
                        <Card key={s.label} bodyClassName="p-5">
                            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                            <div className="text-xs text-slate-400">{s.label}</div>
                        </Card>
                    ))}
                </div>
            )}

            {tab === "applications" && (
                <DataTable
                    columns={[
                        { key: "applicant", header: "Applicant", render: (a) => <span className="font-medium text-slate-800">{a.applicant}</span> },
                        { key: "program", header: "Program" },
                        { key: "submitted", header: "Submitted" },
                        { key: "status", header: "Status", render: (a) => <StatusPill label={a.status.label} tone={a.status.tone} /> },
                    ] as Column<(typeof applications)[number]>[]}
                    rows={applications}
                />
            )}
        </div>
    );
}
