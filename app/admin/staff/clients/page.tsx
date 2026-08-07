"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Stars from "@/app/components/admin-dashboard/shared/Stars";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import { staffClients } from "@/app/components/admin-dashboard/staff-data";
import type { StaffClient } from "@/app/components/admin-dashboard/staff-data";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}.00`;

interface Inv { id: number; name: string; number: string; date: string; status: StatusMeta; total: number; due: number; }
const invoices: Inv[] = [
    { id: 1, name: "Global Trek Volunteers", number: "INV-2026-0714", date: "Jul 14, 2026", status: { label: "Unpaid", tone: "danger" }, total: 1240, due: 1240 },
    { id: 2, name: "Maximo Impact Peru", number: "INV-2026-0702", date: "Jul 02, 2026", status: { label: "Paid", tone: "success" }, total: 2400, due: 0 },
    { id: 3, name: "Andes Language Co.", number: "INV-2026-0620", date: "Jun 20, 2026", status: { label: "Partial", tone: "warning" }, total: 900, due: 450 },
];

interface Prog { id: number; name: string; title: string; directory: string; country: string; status: StatusMeta; }
const programs: Prog[] = [
    { id: 8801, name: "Global Trek Volunteers", title: "Community Health Volunteer", directory: "Volunteer Abroad", country: "Peru", status: { label: "Approved", tone: "success" } },
    { id: 8842, name: "Maximo Impact Peru", title: "Teach English in Cusco", directory: "Teach Abroad", country: "Peru", status: { label: "Approved", tone: "success" } },
    { id: 8899, name: "Rainforest Expeditions", title: "Amazon Conservation", directory: "Volunteer Abroad", country: "Peru", status: { label: "Pending", tone: "warning" } },
];

interface Rev { id: number; name: string; program: string; date: string; rating: number; reviewer: string; }
const reviews: Rev[] = [
    { id: 1, name: "Global Trek Volunteers", program: "Community Health Volunteer", date: "Jul 18, 2026", rating: 5, reviewer: "Emily Carter" },
    { id: 2, name: "Andes Language Co.", program: "Spanish Immersion", date: "Jul 10, 2026", rating: 4, reviewer: "Lukas Vogel" },
];

interface Comm { id: number; date: string; name: string; to: string; from: string; subject: string; }
const comms: Comm[] = [
    { id: 1, date: "Jul 22, 2026", name: "Global Trek Volunteers", to: "marisol@globaltrek…", from: "Bianca Reyes", subject: "Q3 invoice reminder" },
    { id: 2, date: "Jul 19, 2026", name: "Maximo Impact Peru", to: "team@maximo…", from: "Bianca Reyes", subject: "Listing renewal" },
];

const tabs = [
    { key: "accounts", label: "Accounts" },
    { key: "invoices", label: "Invoices" },
    { key: "programs", label: "Programs" },
    { key: "ads", label: "Ads" },
    { key: "reviews", label: "Reviews" },
    { key: "comms", label: "Communications" },
];

export default function StaffClientsPage() {
    const [tab, setTab] = useState("accounts");
    const router = useRouter();

    const accountCols: Column<StaffClient>[] = [
        { key: "id", header: "ID", render: (r) => `#${r.id}` },
        { key: "name", header: "Client Name", render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
        { key: "created", header: "Date Created" },
        { key: "verification", header: "Verification", render: (r) => <StatusPill label={r.verification.label} tone={r.verification.tone} /> },
        { key: "subscription", header: "Subscription" },
        { key: "manager", header: "Account Manager" },
    ];
    const invCols: Column<Inv>[] = [
        { key: "name", header: "Client Name" },
        { key: "number", header: "Invoice #", render: (r) => <span className="font-medium text-slate-800">{r.number}</span> },
        { key: "date", header: "Invoice Date" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
        { key: "total", header: "Total", align: "right", render: (r) => money(r.total) },
        { key: "due", header: "Amount Due", align: "right", render: (r) => money(r.due) },
    ];
    const progCols: Column<Prog>[] = [
        { key: "name", header: "Client Name" },
        { key: "id", header: "ID", render: (r) => `#${r.id}` },
        { key: "title", header: "Title", render: (r) => <span className="font-medium text-slate-800">{r.title}</span> },
        { key: "directory", header: "Directory" },
        { key: "country", header: "Country" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
    ];
    const revCols: Column<Rev>[] = [
        { key: "name", header: "Client Name" },
        { key: "program", header: "Program Title" },
        { key: "date", header: "Date" },
        { key: "rating", header: "Rating", render: (r) => <Stars rating={r.rating} /> },
        { key: "reviewer", header: "Reviewer Name" },
    ];
    const commCols: Column<Comm>[] = [
        { key: "date", header: "Date" },
        { key: "name", header: "Client Name" },
        { key: "to", header: "To" },
        { key: "from", header: "From" },
        { key: "subject", header: "Subject", render: (r) => <span className="font-medium text-slate-800">{r.subject}</span> },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Clients"
                description="Provider accounts, invoices, listings, ads, reviews, and communications."
                actions={<Button icon={FiPlus}>Create Account</Button>}
            />
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            {tab === "accounts" && (
                <DataTable
                    columns={accountCols}
                    rows={staffClients}
                    onRowClick={(c) => router.push(`/admin/staff/clients/${c.id}`)}
                />
            )}
            {tab === "invoices" && <DataTable columns={invCols} rows={invoices} />}
            {tab === "programs" && <DataTable columns={progCols} rows={programs} />}
            {tab === "ads" && (
                <DataTable columns={progCols.slice(0, 4)} rows={[]} emptyLabel="Ads across all clients appear here." />
            )}
            {tab === "reviews" && <DataTable columns={revCols} rows={reviews} />}
            {tab === "comms" && <DataTable columns={commCols} rows={comms} />}
        </div>
    );
}
