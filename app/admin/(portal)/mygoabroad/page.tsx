"use client";

import { useState } from "react";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Drawer from "@/app/components/admin-dashboard/shared/Drawer";
import Card from "@/app/components/admin-dashboard/shared/Card";
import InfoField from "@/app/components/admin-dashboard/shared/InfoField";
import {
    transactions,
    deals,
    applications,
} from "@/app/components/admin-dashboard/data";
import type {
    Application,
    Column,
    Deal,
    StatusMeta,
    Transaction,
} from "@/app/components/admin-dashboard/types";

interface PurchasedItem {
    id: number;
    name: string;
    category: string;
    date: string;
    status: StatusMeta;
}

const purchasedItems: PurchasedItem[] = [
    { id: 1, name: "Featured Listing — Q3", category: "Advertising", date: "Jul 14, 2026", status: { label: "Active", tone: "success" } },
    { id: 2, name: "Homepage Spotlight", category: "Advertising", date: "Jul 14, 2026", status: { label: "Active", tone: "success" } },
    { id: 3, name: "Annual Listing Subscription", category: "Subscription", date: "Apr 12, 2026", status: { label: "Active", tone: "success" } },
];

const tabs = [
    { key: "transactions", label: "Transactions" },
    { key: "items", label: "Purchased Items" },
    { key: "deals", label: "Deals" },
    { key: "applications", label: "Applications" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const money = (n: number) => `$${n.toLocaleString()}`;

const transactionCols: Column<Transaction>[] = [
    { key: "reference", header: "Transaction ID" },
    { key: "item", header: "Item" },
    { key: "amount", header: "Total Purchase Price", align: "right", render: (t) => money(t.amount) },
    { key: "date", header: "Purchase Date" },
    { key: "status", header: "Status", render: (t) => <StatusPill label={t.status.label} tone={t.status.tone} /> },
];

const itemCols: Column<PurchasedItem>[] = [
    { key: "name", header: "Product Name", render: (i) => <span className="font-medium text-slate-800">{i.name}</span> },
    { key: "category", header: "Category" },
    { key: "date", header: "Purchase Date" },
    { key: "status", header: "Status", render: (i) => <StatusPill label={i.status.label} tone={i.status.tone} /> },
];

const dealCols: Column<Deal>[] = [
    { key: "title", header: "Title", render: (d) => <span className="font-medium text-slate-800">{d.title}</span> },
    { key: "discount", header: "Discount" },
    { key: "redemptions", header: "Redemptions", align: "right" },
    { key: "expires", header: "Expiration Date" },
    { key: "status", header: "Status", render: (d) => <StatusPill label={d.status.label} tone={d.status.tone} /> },
];

const applicationCols: Column<Application>[] = [
    { key: "applicant", header: "Name", render: (a) => <span className="font-medium text-slate-800">{a.applicant}</span> },
    { key: "program", header: "Program" },
    { key: "submitted", header: "Date Matched" },
    { key: "status", header: "Status", render: (a) => <StatusPill label={a.status.label} tone={a.status.tone} /> },
];

export default function MyGoAbroadPage() {
    const [tab, setTab] = useState<TabKey>("transactions");
    const [app, setApp] = useState<Application | null>(null);

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="MyGoAbroad"
                description="Your GoAbroad purchases, deals, and traveler applications."
            />

            <div className="mb-5 flex gap-1 overflow-x-auto border-b border-slate-200">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                            tab === t.key
                                ? "border-brand-500 text-brand-600"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === "transactions" && (
                <DataTable columns={transactionCols} rows={transactions} />
            )}
            {tab === "items" && <DataTable columns={itemCols} rows={purchasedItems} />}
            {tab === "deals" && <DataTable columns={dealCols} rows={deals} />}
            {tab === "applications" && (
                <DataTable
                    columns={applicationCols}
                    rows={applications}
                    onRowClick={setApp}
                />
            )}

            {/* Application detail drawer */}
            <Drawer
                open={!!app}
                onClose={() => setApp(null)}
                title={app?.applicant}
                subtitle={app?.program}
            >
                {app && (
                    <div className="space-y-5">
                        <Card title="Personal Information">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoField label="Name">{app.applicant}</InfoField>
                                <InfoField label="Email Address">
                                    {app.applicant.split(" ")[0].toLowerCase()}@example.com
                                </InfoField>
                                <InfoField label="Phone Number">+49 151 2345 6789</InfoField>
                                <InfoField label="Date of Birth">Mar 14, 2002</InfoField>
                                <InfoField label="Country of Residence">Germany</InfoField>
                                <InfoField label="Citizenship">Germany</InfoField>
                            </div>
                        </Card>
                        <Card title="Program Information">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoField label="Where do you want to go?">Peru</InfoField>
                                <InfoField label="What do you want to do?">Volunteer</InfoField>
                                <InfoField label="When?">Aug – Sep 2026</InfoField>
                                <InfoField label="How long?">4 weeks</InfoField>
                            </div>
                        </Card>
                        <Card title="School Information">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoField label="Education Level">Undergraduate</InfoField>
                                <InfoField label="Institution">Univ. of Heidelberg</InfoField>
                                <InfoField label="Area of Study">Public Health</InfoField>
                                <InfoField label="GPA">3.7</InfoField>
                            </div>
                        </Card>
                        <Card title="Offers">
                            <ul className="space-y-2">
                                <li className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                                    <span className="text-slate-700">
                                        10% off Volunteer Programs
                                    </span>
                                    <StatusPill label="Redeemed" tone="success" />
                                </li>
                                <li className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                                    <span className="text-slate-700">
                                        Community Impact Grant
                                    </span>
                                    <StatusPill label="Offered" tone="info" />
                                </li>
                            </ul>
                        </Card>
                    </div>
                )}
            </Drawer>
        </div>
    );
}
