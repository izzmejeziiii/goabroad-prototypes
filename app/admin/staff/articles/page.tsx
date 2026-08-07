"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Tabs from "@/app/components/admin-dashboard/shared/Tabs";
import type { Column, StatusMeta } from "@/app/components/admin-dashboard/types";

interface Article { id: number; title: string; author: string; published: string; modified: string; cta: string; status: StatusMeta; }
const articles: Article[] = [
    { id: 1, title: "10 Best Volunteer Programs in Peru", author: "Bianca Reyes", published: "Jul 12, 2026", modified: "Jul 15, 2026", cta: "Directory", status: { label: "Published", tone: "success" } },
    { id: 2, title: "How to Choose a TEFL Course", author: "Alex Rivera", published: "Jun 30, 2026", modified: "Jul 02, 2026", cta: "Program", status: { label: "Published", tone: "success" } },
    { id: 3, title: "Gap Year Guide 2026 (Draft)", author: "Alex Rivera", published: "—", modified: "Jul 20, 2026", cta: "None", status: { label: "Draft", tone: "neutral" } },
];

interface Author { id: number; name: string; articles: number; role: string; }
const authors: Author[] = [
    { id: 1, name: "Bianca Reyes", articles: 24, role: "Editor" },
    { id: 2, name: "Alex Rivera", articles: 12, role: "Content Editor" },
];

interface Topic { id: number; name: string; slug: string; articles: number; }
const topics: Topic[] = [
    { id: 1, name: "Volunteer Abroad", slug: "volunteer-abroad", articles: 42 },
    { id: 2, name: "Teach Abroad", slug: "teach-abroad", articles: 31 },
    { id: 3, name: "Gap Year", slug: "gap-year", articles: 18 },
];

const tabs = [
    { key: "articles", label: "Articles" },
    { key: "authors", label: "Authors" },
    { key: "topics", label: "Topics" },
    { key: "endcta", label: "End CTA" },
];

export default function StaffArticlesPage() {
    const [tab, setTab] = useState("articles");

    const articleCols: Column<Article>[] = [
        { key: "title", header: "Title", render: (r) => <span className="font-medium text-slate-800">{r.title}</span> },
        { key: "author", header: "Author" },
        { key: "published", header: "Published" },
        { key: "modified", header: "Modified" },
        { key: "cta", header: "End CTA" },
        { key: "status", header: "Status", render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} /> },
    ];
    const authorCols: Column<Author>[] = [
        { key: "name", header: "Name", render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
        { key: "role", header: "Role" },
        { key: "articles", header: "Articles", align: "right" },
    ];
    const topicCols: Column<Topic>[] = [
        { key: "name", header: "Topic", render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
        { key: "slug", header: "Slug" },
        { key: "articles", header: "Articles", align: "right" },
    ];

    const action =
        tab === "articles" ? "Add Article" : tab === "authors" ? "Add Author" : tab === "topics" ? "Add Topic" : "Add End CTA";

    return (
        <div className="mx-auto max-w-7xl">
            <PageHeader
                title="Articles"
                description="Manage travel articles, authors, topics, and end CTAs."
                actions={
                    <Link href="/admin/staff/articles/new">
                        <Button icon={FiPlus}>{action}</Button>
                    </Link>
                }
            />
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            {tab === "articles" && <DataTable columns={articleCols} rows={articles} />}
            {tab === "authors" && <DataTable columns={authorCols} rows={authors} />}
            {tab === "topics" && <DataTable columns={topicCols} rows={topics} />}
            {tab === "endcta" && (
                <DataTable
                    columns={topicCols}
                    rows={[]}
                    emptyLabel="Reusable end-of-article CTAs appear here."
                />
            )}
        </div>
    );
}
