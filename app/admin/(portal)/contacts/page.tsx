"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import DataTable from "@/app/components/admin-dashboard/shared/DataTable";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Card from "@/app/components/admin-dashboard/shared/Card";
import {
    FormField,
    Input,
    Select,
} from "@/app/components/admin-dashboard/shared/Form";
import { contacts, notificationOptions } from "@/app/components/admin-dashboard/data";
import type { Column, Contact } from "@/app/components/admin-dashboard/types";

function initials(name: string) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function YesNo({ label, defaultYes = true }: { label: string; defaultYes?: boolean }) {
    return (
        <FormField label={label}>
            <div className="flex gap-4 text-sm text-slate-600">
                <label className="flex items-center gap-2">
                    <input type="radio" name={label} defaultChecked={defaultYes} className="text-brand-500" /> Yes
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name={label} defaultChecked={!defaultYes} className="text-brand-500" /> No
                </label>
            </div>
        </FormField>
    );
}

export default function ContactsPage() {
    const router = useRouter();

    const columns: Column<Contact>[] = [
        {
            key: "name",
            header: "Full Name",
            render: (c) => (
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                        {initials(c.name)}
                    </span>
                    <span className="font-medium text-slate-800">{c.name}</span>
                </div>
            ),
        },
        { key: "email", header: "Email Address" },
        { key: "role", header: "Job Title" },
        { key: "phone", header: "Phone Number" },
        { key: "type", header: "Contact Type" },
        {
            key: "status",
            header: "Status",
            render: (c) => <StatusPill label={c.status.label} tone={c.status.tone} />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <PageHeader
                title="Contacts"
                description="Manage your account settings, inquiry preferences, and team access."
                actions={
                    <Link href="/admin/contacts/new">
                        <Button icon={FiPlus}>Add contact</Button>
                    </Link>
                }
            />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* User Settings */}
                <div className="space-y-6 lg:col-span-2">
                    <Card title="Account Information">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField label="First Name">
                                <Input defaultValue="Marisol" />
                            </FormField>
                            <FormField label="Last Name">
                                <Input defaultValue="Quispe" />
                            </FormField>
                            <FormField label="Email Address">
                                <Input disabled defaultValue="marisol@globaltrekvolunteers.org" />
                            </FormField>
                            <FormField label="Job Title">
                                <Input defaultValue="Program Director" />
                            </FormField>
                            <FormField label="Phone Number">
                                <Input defaultValue="+51 984 221 190" />
                            </FormField>
                            <FormField label="WhatsApp Number">
                                <Input defaultValue="+51 984 221 190" />
                            </FormField>
                            <FormField label="Contact Type">
                                <Input disabled defaultValue="Primary" />
                            </FormField>
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" size="sm">
                                Reset Password
                            </Button>
                        </div>
                    </Card>

                    <Card title="Notification Settings">
                        <div className="grid gap-2 sm:grid-cols-2">
                            {notificationOptions.map((opt, i) => (
                                <label
                                    key={opt}
                                    className="flex items-center gap-2 text-sm text-slate-600"
                                >
                                    <input
                                        type="checkbox"
                                        defaultChecked={i % 3 !== 2}
                                        className="rounded border-slate-300 text-brand-500"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </Card>
                </div>

                {/* Inquiry Preferences */}
                <Card title="Inquiry Preferences">
                    <div className="space-y-4">
                        <YesNo label="Receive Online Advisor Inquiries" />
                        <YesNo label="Require Phone Number on Inquiry Form" defaultYes={false} />
                        <FormField label="Generic Inquiry Email Address">
                            <Input defaultValue="inquiries@globaltrekvolunteers.org" />
                        </FormField>
                        <FormField label="Application Email Recipient (for all Deals)">
                            <Input defaultValue="apply@globaltrekvolunteers.org" />
                        </FormField>
                        <FormField label="Application URL">
                            <Input placeholder="https://…" />
                        </FormField>
                        <FormField label="Contact Provider URL">
                            <Input placeholder="https://…" />
                        </FormField>
                        <div className="flex justify-end">
                            <Button>Submit</Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Contacts table */}
            <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-700">
                    User Management
                </h3>
                <DataTable
                    columns={columns}
                    rows={contacts}
                    onRowClick={(c) => router.push(`/admin/contacts/${c.id}`)}
                />
            </div>
        </div>
    );
}
