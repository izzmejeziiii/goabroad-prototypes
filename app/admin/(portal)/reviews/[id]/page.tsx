"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FiImage, FiVideo } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Stars from "@/app/components/admin-dashboard/shared/Stars";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import InfoField from "@/app/components/admin-dashboard/shared/InfoField";
import SuccessScreen from "@/app/components/admin-dashboard/shared/SuccessScreen";
import { Textarea } from "@/app/components/admin-dashboard/shared/Form";
import { getReview } from "@/app/components/admin-dashboard/data";

const categories = [
    { name: "Value", stars: 5 },
    { name: "Support", stars: 5 },
    { name: "Safety", stars: 4 },
    { name: "Fun", stars: 5 },
    { name: "Housing", stars: 4 },
];

export default function ReviewDetailPage() {
    const { id } = useParams<{ id: string }>();
    const r = getReview(Number(id));
    const [sent, setSent] = useState(false);

    if (!r) {
        return (
            <div className="mx-auto max-w-3xl">
                <BackLink href="/admin/reviews" label="Back to reviews" />
                <p className="text-slate-500">Review not found.</p>
            </div>
        );
    }

    if (sent) {
        return (
            <div className="mx-auto max-w-3xl">
                <SuccessScreen
                    title="Reply posted"
                    message="Your reply is now visible beneath this review."
                    primaryHref="/admin/reviews"
                    primaryLabel="Back to reviews"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <BackLink href="/admin/reviews" label="Back to reviews" />
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            {r.author}
                        </h1>
                        <p className="text-sm text-brand-600">{r.program}</p>
                    </div>
                    <StatusPill label={r.status.label} tone={r.status.tone} />
                </div>
            </div>

            <Card title="Review Details">
                <div className="grid gap-5 sm:grid-cols-2">
                    <InfoField label="Review Title">
                        A life-changing month
                    </InfoField>
                    <InfoField label="Review Date">{r.date}</InfoField>
                    <InfoField label="Overall Rating">
                        <span className="flex items-center gap-2">
                            <Stars rating={r.rating} /> {r.rating}.0
                        </span>
                    </InfoField>
                    <InfoField label="Reviewer Name">{r.author}</InfoField>
                    <InfoField label="Program">{r.program}</InfoField>
                    <InfoField label="How did you find your program?">
                        GoAbroad.com search
                    </InfoField>
                </div>
                <div className="mt-5">
                    <InfoField label="Review Description">
                        <p className="mt-1 leading-relaxed">{r.excerpt}</p>
                    </InfoField>
                </div>
            </Card>

            <Card title="Category Ratings">
                <ul className="grid gap-3 sm:grid-cols-2">
                    {categories.map((c) => (
                        <li
                            key={c.name}
                            className="flex items-center justify-between"
                        >
                            <span className="text-sm text-slate-600">
                                {c.name}
                            </span>
                            <Stars rating={c.stars} />
                        </li>
                    ))}
                </ul>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2">
                <Card title="Review Video">
                    <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-slate-400">
                        <div className="flex flex-col items-center gap-1">
                            <FiVideo className="h-7 w-7" />
                            <span className="text-xs">No video attached</span>
                        </div>
                    </div>
                </Card>
                <Card title="Review Photos">
                    <div className="grid grid-cols-3 gap-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="flex aspect-square items-center justify-center rounded-lg bg-slate-100 text-slate-300"
                            >
                                <FiImage className="h-6 w-6" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card title="Review Comments">
                <p className="mb-4 text-sm text-slate-400">No comments yet.</p>
                <div>
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Your reply
                    </div>
                    <Textarea
                        rows={4}
                        placeholder="Thank the reviewer and add any helpful context…"
                    />
                    <div className="mt-3 flex justify-end">
                        <Button onClick={() => setSent(true)}>Add Comment</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
