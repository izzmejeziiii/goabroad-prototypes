"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import InfoField from "@/app/components/admin-dashboard/shared/InfoField";
import SuccessScreen from "@/app/components/admin-dashboard/shared/SuccessScreen";
import { Textarea } from "@/app/components/admin-dashboard/shared/Form";
import { getInquiry } from "@/app/components/admin-dashboard/data";

export default function InquiryDetailPage() {
    const { id } = useParams<{ id: string }>();
    const q = getInquiry(Number(id));
    const [sent, setSent] = useState(false);

    if (!q) {
        return (
            <div className="mx-auto max-w-2xl">
                <BackLink href="/admin/inquiries" label="Back to inquiries" />
                <p className="text-slate-500">Inquiry not found.</p>
            </div>
        );
    }

    if (sent) {
        return (
            <div className="mx-auto max-w-2xl">
                <SuccessScreen
                    title="Reply sent"
                    message={`Your reply to ${q.name} is on its way.`}
                    primaryHref="/admin/inquiries"
                    primaryLabel="Back to inquiries"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <BackLink href="/admin/inquiries" label="Back to inquiries" />
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            {q.name}
                        </h1>
                        <p className="text-sm text-brand-600">{q.program}</p>
                    </div>
                    <StatusPill label={q.status.label} tone={q.status.tone} />
                </div>
            </div>

            <Card title="Inquiry Summary">
                <div className="grid gap-5 sm:grid-cols-2">
                    <InfoField label="Inquirer Name">{q.name}</InfoField>
                    <InfoField label="Date of Inquiry">{q.received}</InfoField>
                    <InfoField label="Citizenship">Germany</InfoField>
                    <InfoField label="Date of Birth">Mar 14, 2002</InfoField>
                    <InfoField label="Email Address">
                        {q.name.split(" ")[0].toLowerCase()}@example.com
                    </InfoField>
                    <InfoField label="Phone Number">+49 151 2345 6789</InfoField>
                    <InfoField label="Program Name">{q.program}</InfoField>
                    <InfoField label="Directory">Volunteer Abroad</InfoField>
                    <InfoField label="Travel Timeline">Aug – Sep 2026</InfoField>
                    <InfoField label="Destination(s)">Cusco, Peru</InfoField>
                    <InfoField label="Current Student">Yes</InfoField>
                    <InfoField label="School Name">Univ. of Heidelberg</InfoField>
                </div>
                <div className="mt-5">
                    <InfoField label="Message">
                        <p className="mt-1 leading-relaxed">{q.message}</p>
                    </InfoField>
                </div>
            </Card>

            <Card title="Your reply">
                <Textarea
                    rows={5}
                    placeholder="Answer the traveler's question…"
                    defaultValue={`Hi ${q.name.split(" ")[0]},\n\nThanks for your interest in ${q.program}! `}
                />
                <div className="mt-3 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => history.back()}>
                        Cancel
                    </Button>
                    <Button onClick={() => setSent(true)}>Send reply</Button>
                </div>
            </Card>
        </div>
    );
}
