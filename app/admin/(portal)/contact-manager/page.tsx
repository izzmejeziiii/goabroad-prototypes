"use client";

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import SuccessScreen from "@/app/components/admin-dashboard/shared/SuccessScreen";
import {
    FormField,
    Input,
    Textarea,
    Select,
} from "@/app/components/admin-dashboard/shared/Form";
import { provider } from "@/app/components/admin-dashboard/data";

export default function ContactManagerPage() {
    const [sent, setSent] = useState(false);
    const mgr = provider.accountManager;

    if (sent) {
        return (
            <div className="mx-auto max-w-2xl">
                <SuccessScreen
                    title="Message sent"
                    message={`${mgr.name} will get back to you shortly — usually within one business day.`}
                    primaryHref="/admin/dashboard"
                    primaryLabel="Back to dashboard"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <BackLink href="/admin/dashboard" label="Back to dashboard" />
            <h1 className="text-xl font-bold text-slate-900">
                Contact your account manager
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Questions about your account, billing, or listings? We&apos;re
                here to help.
            </p>

            <Card className="mt-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-base font-bold text-white">
                        BR
                    </div>
                    <div>
                        <div className="font-semibold text-slate-800">
                            {mgr.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                            <FiMail className="h-3.5 w-3.5" />
                            {mgr.email}
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-4">
                    <FormField label="Topic">
                        <Select defaultValue="General question">
                            <option>General question</option>
                            <option>Billing & invoices</option>
                            <option>Listings & programs</option>
                            <option>Advertising</option>
                            <option>Verification</option>
                        </Select>
                    </FormField>
                    <FormField label="Subject">
                        <Input placeholder="How can we help?" />
                    </FormField>
                    <FormField label="Message">
                        <Textarea rows={5} placeholder="Write your message…" />
                    </FormField>
                </div>
            </Card>

            <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline" onClick={() => history.back()}>
                    Cancel
                </Button>
                <Button onClick={() => setSent(true)}>Send message</Button>
            </div>
        </div>
    );
}
