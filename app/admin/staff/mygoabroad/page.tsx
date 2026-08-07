"use client";

import { useState } from "react";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

const money = (n: number) => `$${n.toLocaleString()}`;

interface Deal { id: number; type: string; title: string; client: string; created: string; expires: string; status: StatusMeta; }
const deals: Deal[] = [
    { id: 1, type: "Discount", title: "10% off Volunteer Programs", client: "Global Trek Volunteers", created: "Jun 01, 2026", expires: "Sep 30, 2026", status: { label: "Live", tone: "success" } },
    { id: 2, type: "Scholarship", title: "Student Discount — Spanish", client: "Andes Language Co.", created: "May 10, 2026", expires: "Dec 31, 2026", status: { label: "Live", tone: "success" } },
];

interface Appn { id: number; date: string; name: string; email: string; citizenship: string; education: string; client: string; }
const applications: Appn[] = [
    { id: 1, date: "Jul 21, 2026", name: "Hannah Schmidt", email: "hannah@example.com", citizenship: "Germany", education: "Undergraduate", client: "Global Trek Volunteers" },
    { id: 2, date: "Jul 19, 2026", name: "Grace Liu", email: "grace@example.com", citizenship: "USA", education: "Graduate", client: "Andes Language Co." },
];

interface User { id: number; first: string; last: string; email: string; citizenship: string; lastLogin: string; }
const users: User[] = [
    { id: 1, first: "Hannah", last: "Schmidt", email: "hannah@example.com", citizenship: "Germany", lastLogin: "Jul 23, 2026" },
    { id: 2, first: "Owen", last: "Brady", email: "owen@example.com", citizenship: "Ireland", lastLogin: "Jul 20, 2026" },
];

interface Txn { id: number; ref: string; name: string; status: StatusMeta; paid: number; date: string; }
const transactions: Txn[] = [
    { id: 1, ref: "TXN-88214", name: "Hannah Schmidt", status: { label: "Completed", tone: "success" }, paid: 34, date: "Jul 14, 2026" },
    { id: 2, ref: "TXN-88010", name: "Owen Brady", status: { label: "Completed", tone: "success" }, paid: 59, date: "Jul 12, 2026" },
];

interface Item { id: number; ref: string; product: string; fulfillment: StatusMeta; traveler: string; date: string; }
const items: Item[] = [
    { id: 1, ref: "TXN-88214", product: "Travel eSIM — 5GB", fulfillment: { label: "Fulfilled", tone: "success" }, traveler: "Hannah Schmidt", date: "Jul 14, 2026" },
    { id: 2, ref: "TXN-88010", product: "Travel Insurance — 4wk", fulfillment: { label: "Pending", tone: "warning" }, traveler: "Owen Brady", date: "Jul 12, 2026" },
];

const tabs = [
    { key: "deals", label: "Deals" },
    { key: "applications", label: "Applications" },
    { key: "users", label: "Users" },
    { key: "transactions", label: "Transactions" },
    { key: "items", label: "Purchased Items" },
];

export default function StaffMyGoAbroadPage() {
    const [tab, setTab] = useState("deals");

    const dealCols: Column<Deal>[] = [
        { key: "type", header: "Type" },
        { key: "title", header: "Title", render: (r) => <span className="font-medium text-slate-800">{r.title}</span> },
        { key: "client", header: "Client Name" },
        { key: "created", header: "Create Date" },
        { key: "expires", header: "Expiration Date" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
    ];
    const appCols: Column<Appn>[] = [
        { key: "date", header: "Date" },
        { key: "name", header: "Name", render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
        { key: "email", header: "Email" },
        { key: "citizenship", header: "Citizenship" },
        { key: "education", header: "Education Level" },
        { key: "client", header: "Client Name" },
    ];
    const userCols: Column<User>[] = [
        { key: "first", header: "First Name" },
        { key: "last", header: "Last Name" },
        { key: "email", header: "Email" },
        { key: "citizenship", header: "Citizenship" },
        { key: "lastLogin", header: "Last Login" },
    ];
    const txnCols: Column<Txn>[] = [
        { key: "ref", header: "Transaction ID", render: (r) => <span className="font-medium text-slate-800">{r.ref}</span> },
        { key: "name", header: "Name" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
        { key: "paid", header: "Amount Paid", align: "right", render: (r) => money(r.paid) },
        { key: "date", header: "Purchase Date" },
    ];
    const itemCols: Column<Item>[] = [
        { key: "ref", header: "Transaction ID" },
        { key: "product", header: "Product Name", render: (r) => <span className="font-medium text-slate-800">{r.product}</span> },
        { key: "fulfillment", header: "Fulfillment", render: (r) => <StatusPill label={r.fulfillment.label} tone={r.fulfillment.tone} /> },
        { key: "traveler", header: "Traveler Name" },
        { key: "date", header: "Purchase Date" },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="MyGoAbroad"
                description="Deals, traveler applications, marketplace users, and purchases."
            />
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            {tab === "deals" && <DataTable columns={dealCols} rows={deals} />}
            {tab === "applications" && <DataTable columns={appCols} rows={applications} />}
            {tab === "users" && <DataTable columns={userCols} rows={users} />}
            {tab === "transactions" && <DataTable columns={txnCols} rows={transactions} />}
            {tab === "items" && <DataTable columns={itemCols} rows={items} />}
        </div>
    );
}
