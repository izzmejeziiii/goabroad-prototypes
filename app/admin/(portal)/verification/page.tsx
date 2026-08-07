"use client";

import { FiCheckCircle, FiDownload, FiFileText, FiShield } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import {
    provider,
    verificationRequirements,
} from "@/app/components/admin-dashboard/data";

export default function VerificationPage() {
    const v = provider.verification;

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <BackLink href="/admin/dashboard" label="Back to dashboard" />
                <h1 className="text-xl font-bold text-slate-900">Verification</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Verified providers earn a badge and rank higher in search.
                </p>
            </div>

            {/* Summary */}
            <Card title="Verification Summary">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sun-200/60 text-sun-700">
                        <FiShield className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                        <StatusPill label="In progress" tone="warning" />
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full bg-sun-500"
                            style={{ width: `${v.percent}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                        {v.completed}/{v.total} complete
                    </span>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                    Complete the remaining requirements below to earn your
                    GoAbroad Verified badge.
                </p>
            </Card>

            {/* Requirement sections */}
            {verificationRequirements.map((req) => (
                <Card key={req.key}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                {req.status.tone === "success" ? (
                                    <FiCheckCircle className="h-5 w-5 text-fern-600" />
                                ) : (
                                    <FiFileText className="h-5 w-5" />
                                )}
                            </span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-800">
                                        {req.title}
                                    </span>
                                    <StatusPill
                                        label={req.status.label}
                                        tone={req.status.tone}
                                    />
                                </div>
                                <p className="mt-1 text-sm text-slate-500">
                                    {req.description}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant={req.status.tone === "success" ? "outline" : "primary"}
                            size="sm"
                            icon={req.key === "business" ? FiDownload : undefined}
                            className="shrink-0"
                        >
                            {req.action}
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
