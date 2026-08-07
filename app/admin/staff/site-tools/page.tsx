"use client";

import { useState } from "react";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import { FormField, Input } from "@/app/components/admin-dashboard/shared/Form";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

const tabs = [
    { key: "users", label: "Internal Users" },
    { key: "locations", label: "Locations" },
    { key: "searches", label: "Popular Searches" },
    { key: "bounces", label: "Bounce Emails" },
    { key: "campaigns", label: "Campaigns" },
    { key: "toprated", label: "Top Rated Programs" },
    { key: "defaultmeta", label: "Default Metas" },
    { key: "custommeta", label: "Custom Metas" },
    { key: "revalidate", label: "Revalidate URL" },
];

interface Row { id: number; [k: string]: unknown; }
function pill(label: string, tone: StatusMeta["tone"]) {
    return <StatusPill label={label} tone={tone} />;
}

const users: Row[] = [
    { id: 1, name: "Bianca Reyes", email: "bianca.reyes@goabroad.com", title: "Account Manager", status: pill("Confirmed", "success"), dept: "Sales" },
    { id: 2, name: "Alex Rivera", email: "alex.rivera@goabroad.com", title: "Content Editor", status: pill("Confirmed", "success"), dept: "Content" },
    { id: 3, name: "Jordan Cole", email: "jordan.cole@goabroad.com", title: "Support", status: pill("Invite Pending", "warning"), dept: "Support" },
];
const locations: Row[] = [
    { id: 1, name: "Cusco", alias: "cusco", status: pill("Approved", "success"), country: "Peru", region: "South America" },
    { id: 2, name: "Lima", alias: "lima", status: pill("Approved", "success"), country: "Peru", region: "South America" },
    { id: 3, name: "Sacred Valley", alias: "sacred-valley", status: pill("Unapproved", "neutral"), country: "Peru", region: "South America" },
];
const searches: Row[] = [
    { id: 1, directory: "Volunteer Abroad", term: "Volunteer in Peru", position: 1 },
    { id: 2, directory: "Teach Abroad", term: "Teach English abroad", position: 2 },
    { id: 3, directory: "Gap Year", term: "Gap year programs", position: 3 },
];
const bounces: Row[] = [
    { id: 1, email: "old@example.com", type: "Bounce", timestamp: "Jul 21, 2026", status: pill("Suppressed", "danger") },
    { id: 2, email: "spam@example.com", type: "Complaint", timestamp: "Jul 18, 2026", status: pill("Suppressed", "danger") },
];
const campaigns: Row[] = [
    { id: 1, title: "Summer Volunteer Push", cta: "Explore programs", start: "Jun 01, 2026", end: "Aug 31, 2026", status: pill("Active", "success") },
    { id: 2, title: "Gap Year 2027", cta: "Plan your year", start: "Sep 01, 2026", end: "Dec 31, 2026", status: pill("Scheduled", "info") },
];
const toprated: Row[] = [
    { id: 1, client: "Maximo Impact Peru", listing: "Teach English in Cusco", year: 2026, reviews: 148, rating: 4.9 },
    { id: 2, client: "Global Trek Volunteers", listing: "Community Health Volunteer", year: 2026, reviews: 96, rating: 4.7 },
];
const defaultMeta: Row[] = [
    { id: 1, directory: "Volunteer Abroad", pageType: "Directory", title: "Volunteer Abroad Programs", desc: "Find meaningful volunteer programs…" },
    { id: 2, directory: "Teach Abroad", pageType: "Directory", title: "Teach Abroad Programs", desc: "Teach and travel the world…" },
];
const customMeta: Row[] = [
    { id: 1, url: "/volunteer-abroad/peru", title: "Volunteer in Peru", desc: "Top volunteer programs in Peru…" },
];

export default function StaffSiteToolsPage() {
    const [tab, setTab] = useState("users");
    const [revalidated, setRevalidated] = useState(false);

    const cols = (defs: { key: string; header: string; align?: "right" }[]): Column<Row>[] =>
        defs.map((d) => ({
            key: d.key,
            header: d.header,
            align: d.align,
            render: (r) => r[d.key] as React.ReactNode,
        }));

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Site Tools"
                description="Platform-wide configuration: users, locations, SEO metadata, campaigns, and more."
                actions={
                    tab === "users" ? <Button icon={FiPlus}>Add User</Button> : tab === "campaigns" ? <Button icon={FiPlus}>New Campaign</Button> : undefined
                }
            />
            <Tabs tabs={tabs} active={tab} onChange={setTab} />

            {tab === "users" && <DataTable columns={cols([{ key: "name", header: "Full Name" }, { key: "email", header: "Email" }, { key: "title", header: "Job Title" }, { key: "dept", header: "Department" }, { key: "status", header: "Status" }])} rows={users} />}
            {tab === "locations" && <DataTable columns={cols([{ key: "name", header: "Name" }, { key: "alias", header: "Alias" }, { key: "country", header: "Country" }, { key: "region", header: "World Region" }, { key: "status", header: "Status" }])} rows={locations} />}
            {tab === "searches" && <DataTable columns={cols([{ key: "directory", header: "Directory" }, { key: "term", header: "Search Term" }, { key: "position", header: "Position", align: "right" }])} rows={searches} />}
            {tab === "bounces" && <DataTable columns={cols([{ key: "email", header: "Email" }, { key: "type", header: "Bounce Type" }, { key: "timestamp", header: "Timestamp" }, { key: "status", header: "Status" }])} rows={bounces} />}
            {tab === "campaigns" && <DataTable columns={cols([{ key: "title", header: "Title" }, { key: "cta", header: "CTA Text" }, { key: "start", header: "Start Date" }, { key: "end", header: "End Date" }, { key: "status", header: "Status" }])} rows={campaigns} />}
            {tab === "toprated" && <DataTable columns={cols([{ key: "client", header: "Client" }, { key: "listing", header: "Program Title" }, { key: "year", header: "Year", align: "right" }, { key: "reviews", header: "Reviews", align: "right" }, { key: "rating", header: "Avg Rating", align: "right" }])} rows={toprated} />}
            {tab === "defaultmeta" && <DataTable columns={cols([{ key: "directory", header: "Directory" }, { key: "pageType", header: "Page Type" }, { key: "title", header: "Page Title" }, { key: "desc", header: "Meta Description" }])} rows={defaultMeta} />}
            {tab === "custommeta" && <DataTable columns={cols([{ key: "url", header: "Page URL" }, { key: "title", header: "Page Title" }, { key: "desc", header: "Meta Description" }])} rows={customMeta} />}
            {tab === "revalidate" && (
                <Card title="Revalidate URL">
                    <p className="-mt-1 mb-4 text-sm text-slate-500">
                        Trigger on-demand cache revalidation for a public page.
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="flex-1">
                            <FormField label="Page URL">
                                <Input placeholder="https://www.goabroad.com/…" />
                            </FormField>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <Button icon={FiRefreshCw} onClick={() => setRevalidated(true)}>
                            Revalidate
                        </Button>
                        {revalidated && (
                            <span className="text-sm font-medium text-fern-600">
                                Cache revalidated ✓
                            </span>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
