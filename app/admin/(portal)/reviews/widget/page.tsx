"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Stars from "@/app/components/admin-dashboard/shared/Stars";
import { FormField, Select } from "@/app/components/admin-dashboard/shared/Form";
import { provider, reviews } from "@/app/components/admin-dashboard/data";

const embed = `<script src="https://widgets.goabroad.com/reviews.js"
  data-provider="global-trek-volunteers"
  data-type="provider" data-layout="carousel"
  data-theme="light"></script>`;

export default function ReviewWidgetPage() {
    const [copied, setCopied] = useState(false);

    return (
        <div className="mx-auto max-w-5xl">
            <BackLink href="/admin/reviews" label="Back to reviews" />
            <h1 className="text-xl font-bold text-slate-900">
                Review widget generator
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Embed your GoAbroad reviews on your own website.
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card title="Options">
                        <div className="space-y-4">
                            <FormField label="Widget Type">
                                <Select defaultValue="Provider Widget">
                                    <option>Provider Widget</option>
                                    <option>Program Widget</option>
                                </Select>
                            </FormField>
                            <FormField label="Layout">
                                <Select defaultValue="Carousel">
                                    <option>Basic</option>
                                    <option>Badge</option>
                                    <option>Footer</option>
                                    <option>Carousel</option>
                                    <option>Stacked Carousel</option>
                                </Select>
                            </FormField>
                            <FormField label="Theme">
                                <Select defaultValue="Light">
                                    <option>Light</option>
                                    <option>Dark</option>
                                </Select>
                            </FormField>
                            <FormField label="Link">
                                <Select defaultValue="Read Alumni Reviews">
                                    <option>Write a Review</option>
                                    <option>Read Alumni Reviews</option>
                                </Select>
                            </FormField>
                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <label className="flex items-center gap-2 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="rounded border-slate-300 text-brand-500"
                                    />
                                    Show Program Name
                                </label>
                                <label className="flex items-center gap-2 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="rounded border-slate-300 text-brand-500"
                                    />
                                    Show Logo
                                </label>
                            </div>
                        </div>
                    </Card>

                    <Card title="Embed code">
                        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
                            {embed}
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
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                                {provider.initials}
                            </div>
                            <div className="text-sm font-semibold text-slate-800">
                                {provider.name} reviews
                            </div>
                        </div>
                        <div className="space-y-3">
                            {reviews.slice(0, 3).map((r) => (
                                <div
                                    key={r.id}
                                    className="rounded-lg bg-slate-50 p-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-800">
                                            {r.author}
                                        </span>
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
