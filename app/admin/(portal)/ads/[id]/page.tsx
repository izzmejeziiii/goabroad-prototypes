"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCopy, FiExternalLink, FiTv } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import InfoField from "@/app/components/admin-dashboard/shared/InfoField";
import { getAd } from "@/app/components/admin-dashboard/data";

export default function AdDetailPage() {
    const { id } = useParams<{ id: string }>();
    const ad = getAd(Number(id));
    const [requested, setRequested] = useState(false);

    if (!ad) {
        return (
            <div className="mx-auto max-w-4xl">
                <BackLink href="/admin/ads" label="Back to ads" />
                <p className="text-slate-500">Ad not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <BackLink href="/admin/ads" label="Back to ads" />
            <PageHeader
                title={ad.title}
                description={ad.format}
                actions={
                    <>
                        <Link href="/admin/ads/new">
                            <Button variant="outline" icon={FiCopy}>
                                Duplicate
                            </Button>
                        </Link>
                        <Button onClick={() => setRequested(true)}>
                            Request Ad Update
                        </Button>
                    </>
                }
            />

            {requested && (
                <div className="mb-6 rounded-lg border border-fern-300 bg-fern-200/40 px-4 py-3 text-sm font-medium text-fern-700">
                    Your update request has been sent to your account manager.
                </div>
            )}

            {/* Preview */}
            <div className="mb-6 flex aspect-[16/6] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
                <div className="flex flex-col items-center gap-2">
                    <FiTv className="h-8 w-8" />
                    <span className="text-xs">Ad creative preview</span>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Card bodyClassName="p-4">
                    <div className="text-2xl font-bold text-slate-900">
                        {ad.impressions.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">Impressions</div>
                </Card>
                <Card bodyClassName="p-4">
                    <div className="text-2xl font-bold text-slate-900">
                        {ad.clicks.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">Clicks</div>
                </Card>
                <Card bodyClassName="p-4">
                    <StatusPill label={ad.status.label} tone={ad.status.tone} />
                    <div className="mt-1 text-xs text-slate-400">Status</div>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Appears on */}
                <Card title="Appears On">
                    <div className="space-y-4">
                        <InfoField label="Directory">Volunteer Abroad</InfoField>
                        <InfoField label="Location">{ad.placement}</InfoField>
                        <InfoField label="Type">{ad.format}</InfoField>
                        <InfoField label="Timing">{ad.period}</InfoField>
                        <InfoField label="Ad Placement URL">
                            <a
                                href="#"
                                className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                            >
                                goabroad.com/volunteer-abroad/cusco{" "}
                                <FiExternalLink className="h-3 w-3" />
                            </a>
                        </InfoField>
                    </div>
                </Card>

                {/* Ad run time */}
                <Card title="Ad Run Time">
                    <div className="space-y-4">
                        <InfoField label="Start Date">Jul 01, 2026</InfoField>
                        <InfoField label="End Date">Sep 30, 2026</InfoField>
                        <InfoField label="Client URL">
                            <a
                                href="#"
                                className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                            >
                                globaltrekvolunteers.org{" "}
                                <FiExternalLink className="h-3 w-3" />
                            </a>
                        </InfoField>
                    </div>
                </Card>
            </div>
        </div>
    );
}
