"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import SuccessScreen from "@/app/components/admin-dashboard/shared/SuccessScreen";
import {
    FormField,
    Input,
    Select,
} from "@/app/components/admin-dashboard/shared/Form";
import { getContact } from "@/app/components/admin-dashboard/data";

export default function ContactDetailPage() {
    const { id } = useParams<{ id: string }>();
    const contact = getContact(Number(id));
    const [saved, setSaved] = useState(false);

    if (!contact) {
        return (
            <div className="mx-auto max-w-2xl">
                <BackLink href="/admin/contacts" label="Back to contacts" />
                <p className="text-slate-500">Contact not found.</p>
            </div>
        );
    }

    if (saved) {
        return (
            <div className="mx-auto max-w-2xl">
                <SuccessScreen
                    title="Contact updated"
                    message="Changes to this contact have been saved."
                    primaryHref="/admin/contacts"
                    primaryLabel="Back to contacts"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <BackLink href="/admin/contacts" label="Back to contacts" />
            <h1 className="text-xl font-bold text-slate-900">{contact.name}</h1>
            <p className="mt-1 text-sm text-slate-500">{contact.role}</p>

            <Card className="mt-6" title="Contact details">
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Full name">
                            <Input defaultValue={contact.name} />
                        </FormField>
                        <FormField label="Role">
                            <Input defaultValue={contact.role} />
                        </FormField>
                    </div>
                    <FormField label="Email">
                        <Input defaultValue={contact.email} />
                    </FormField>
                    <FormField label="Phone">
                        <Input defaultValue={contact.phone} />
                    </FormField>
                    <FormField label="Contact type">
                        <Select defaultValue={contact.type}>
                            <option>Primary</option>
                            <option>Billing</option>
                            <option>Secondary</option>
                        </Select>
                    </FormField>
                </div>
            </Card>

            <Card className="mt-6" title="Notification preferences">
                <div className="space-y-2 text-sm text-slate-600">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-slate-300 text-brand-500"
                        />
                        New inquiries
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-slate-300 text-brand-500"
                        />
                        Invoice reminders
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="rounded border-slate-300 text-brand-500"
                        />
                        Monthly performance report
                    </label>
                </div>
            </Card>

            <div className="mt-5 flex items-center justify-between gap-2">
                <Link href="/admin/contacts">
                    <Button variant="danger">Remove contact</Button>
                </Link>
                <div className="flex gap-2">
                    <Link href="/admin/contacts">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button onClick={() => setSaved(true)}>Save changes</Button>
                </div>
            </div>
        </div>
    );
}
