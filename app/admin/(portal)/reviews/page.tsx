"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCode, FiMail } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Stars from "@/app/components/admin-dashboard/shared/Stars";
import Card from "@/app/components/admin-dashboard/shared/Card";
import { reviews } from "@/app/components/admin-dashboard/data";
import type { Column, Review } from "@/app/components/admin-dashboard/types";

export default function ReviewsPage() {
    const router = useRouter();

    const columns: Column<Review>[] = [
        { key: "id", header: "Review ID", render: (r) => `#${r.id}` },
        {
            key: "title",
            header: "Review Title",
            render: () => "A life-changing month",
        },
        { key: "program", header: "Program Title" },
        { key: "date", header: "Review Date" },
        {
            key: "rating",
            header: "Overall Rating",
            render: (r) => <Stars rating={r.rating} />,
        },
        { key: "author", header: "Reviewer Name" },
        {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <PageHeader
                title="Reviews"
                description="Read what travelers say — and reply to build trust."
                actions={
                    <>
                        <Link href="/admin/contact-manager">
                            <Button variant="outline" icon={FiMail}>
                                Send us Digital Reviews
                            </Button>
                        </Link>
                        <Link href="/admin/reviews/widget">
                            <Button variant="outline" icon={FiCode}>
                                Review widget
                            </Button>
                        </Link>
                    </>
                }
            />

            <Card className="bg-gradient-to-r from-brand-50 to-primary-50">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                            <FiCode className="h-5 w-5" />
                        </span>
                        <div>
                            <div className="text-sm font-semibold text-slate-800">
                                Show your reviews on your own site
                            </div>
                            <div className="text-sm text-slate-500">
                                Generate an embeddable widget with your latest
                                reviews.
                            </div>
                        </div>
                    </div>
                    <Link href="/admin/reviews/widget">
                        <Button variant="primary">Generate widget</Button>
                    </Link>
                </div>
            </Card>

            <DataTable
                columns={columns}
                rows={reviews}
                onRowClick={(r) => router.push(`/admin/reviews/${r.id}`)}
            />
        </div>
    );
}
