"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
    FiBold,
    FiItalic,
    FiUnderline,
    FiList,
    FiLink,
    FiImage,
} from "react-icons/fi";
import BackLink from "../shared/BackLink";
import Card from "../shared/Card";
import Button from "../shared/Button";
import SuccessScreen from "../shared/SuccessScreen";
import { FormField, Input, Textarea } from "../shared/Form";

const toolbarIcons = [FiBold, FiItalic, FiUnderline, FiList, FiLink, FiImage];

export default function CmsEditor({
    kind,
    backHref,
    backLabel,
    children,
}: {
    kind: string;
    backHref: string;
    backLabel: string;
    children?: ReactNode;
}) {
    const [saved, setSaved] = useState<null | "draft" | "published">(null);

    if (saved) {
        return (
            <div className="mx-auto max-w-3xl">
                <SuccessScreen
                    title={
                        saved === "published"
                            ? `${kind} published 🎉`
                            : `${kind} saved as draft`
                    }
                    message={
                        saved === "published"
                            ? `Your ${kind.toLowerCase()} is now live on GoAbroad.`
                            : `Your draft has been saved. You can publish it anytime.`
                    }
                    primaryHref={backHref}
                    primaryLabel={backLabel}
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl">
            <BackLink href={backHref} label={backLabel} />
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">New {kind}</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSaved("draft")}>
                        Save Draft
                    </Button>
                    <Button onClick={() => setSaved("published")}>Publish</Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    <FormField label={`${kind} title`}>
                        <Input placeholder={`Enter ${kind.toLowerCase()} title…`} />
                    </FormField>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-1 border-b border-slate-100 px-3 py-2">
                            {toolbarIcons.map((Ic, i) => (
                                <button
                                    key={i}
                                    className="rounded p-1.5 text-slate-500 hover:bg-slate-100"
                                >
                                    <Ic className="h-4 w-4" />
                                </button>
                            ))}
                        </div>
                        <textarea
                            rows={16}
                            placeholder="Write your content here…"
                            className="w-full resize-none p-4 text-sm text-slate-700 outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {children}
                    <Card title="SEO / Meta">
                        <div className="space-y-4">
                            <FormField label="Meta title" hint="65 characters max">
                                <Input />
                            </FormField>
                            <FormField label="Meta description">
                                <Textarea rows={3} />
                            </FormField>
                            <FormField label="URL slug">
                                <Input placeholder="my-post-url" />
                            </FormField>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
