"use client";

import { useState } from "react";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import SuccessScreen from "@/app/components/admin-dashboard/shared/SuccessScreen";
import {
    FormField,
    Input,
    Select,
} from "@/app/components/admin-dashboard/shared/Form";

export default function NewContactPage() {
    const [done, setDone] = useState(false);

    if (done) {
        return (
            <div className="mx-auto max-w-2xl">
                <SuccessScreen
                    title="Invitation sent"
                    message="We've emailed an invite. They'll get access once they accept."
                    primaryHref="/admin/contacts"
                    primaryLabel="Back to contacts"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <BackLink href="/admin/contacts" label="Back to contacts" />
            <h1 className="text-xl font-bold text-slate-900">Add a contact</h1>
            <p className="mt-1 text-sm text-slate-500">
                Invite a teammate to help manage your account.
            </p>

            <Card className="mt-6">
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Full name">
                            <Input placeholder="Jane Doe" />
                        </FormField>
                        <FormField label="Role">
                            <Input placeholder="e.g. Admissions" />
                        </FormField>
                    </div>
                    <FormField label="Email">
                        <Input type="email" placeholder="jane@yourorg.org" />
                    </FormField>
                    <FormField
                        label="Contact type"
                        hint="Billing contacts receive invoices; secondary contacts have limited access."
                    >
                        <Select defaultValue="Secondary">
                            <option>Primary</option>
                            <option>Billing</option>
                            <option>Secondary</option>
                        </Select>
                    </FormField>
                </div>
            </Card>

            <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline" onClick={() => history.back()}>
                    Cancel
                </Button>
                <Button onClick={() => setDone(true)}>Send invite</Button>
            </div>
        </div>
    );
}
