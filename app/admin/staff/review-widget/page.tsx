"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Stars from "@/app/components/admin-dashboard/shared/Stars";
import { FormField, Select } from "@/app/components/admin-dashboard/shared/Form";
import { reviews } from "@/app/components/admin-dashboard/data";

export default function StaffReviewWidgetPage() {
    const [copied, setCopied] = useState(false);
    const [provider, setProvider] = useState("Global Trek Volunteers");

    return (
        <div className="mx-auto max-w-5xl">
            <BackLink href="/admin/staff/dashboard" label="Back to dashboard" />
            <PageHeader title="Review Widget Generator" description="Generate an embeddable review widget for any provider." />
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card title="Provider">
                        <FormField label="Choose a provider">
                            <Select value={provider} onChange={(e) => setProvider(e.target.value)}>
                                <option>Global Trek Volunteers</option>
                                <option>Maximo Impact Peru</option>
                                <option>Andes Language Co.</option>
                            </Select>
                        </FormField>
                    </Card>
                    <Card title="Embed code">
                        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
                            {`<script src="https://widgets.goabroad.com/reviews.js"
  data-provider="${provider.toLowerCase().replace(/\s+/g, "-")}"></script>`}
                        </pre>
                        <Button
                            variant={copied ? "primary" : "outline"}
                            icon={copied ? FiCheck : FiCopy}
                            className="mt-3"
                            onClick={() => setCopied(true)}
                        >
                            {copied ? "Copied!" : "Copy code"}
                        </Button>
                    </Card>
                </div>
                <Card title="Preview">
                    <div className="rounded-xl border border-slate-200 p-4">
                        <div className="mb-3 text-sm font-semibold text-slate-800">
                            {provider} reviews
                        </div>
                        <div className="space-y-3">
                            {reviews.slice(0, 3).map((r) => (
                                <div key={r.id} className="rounded-lg bg-slate-50 p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-800">{r.author}</span>
                                        <Stars rating={r.rating} />
                                    </div>
                                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                        &ldquo;{r.excerpt}&rdquo;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
