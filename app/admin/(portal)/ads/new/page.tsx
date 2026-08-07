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

export default function NewAdPage() {
    const [done, setDone] = useState(false);

    if (done) {
        return (
            <div className="mx-auto max-w-2xl">
                <SuccessScreen
                    title="Ad campaign created"
                    message="Your campaign is scheduled and will start on the selected date."
                    primaryHref="/admin/ads"
                    primaryLabel="Back to ads"
                    secondaryHref="/admin/dashboard"
                    secondaryLabel="Go to dashboard"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <BackLink href="/admin/ads" label="Back to ads" />
            <h1 className="text-xl font-bold text-slate-900">
                Create an ad campaign
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Promote a program across GoAbroad.
            </p>

            <Card className="mt-6">
                <div className="space-y-4">
                    <FormField label="Campaign name">
                        <Input placeholder="e.g. Featured — Volunteer in Cusco" />
                    </FormField>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Ad format">
                            <Select defaultValue="">
                                <option value="" disabled>
                                    Select a format…
                                </option>
                                <option>Featured Listing</option>
                                <option>Homepage Banner</option>
                                <option>Sidebar Ad</option>
                                <option>Email Feature</option>
                            </Select>
                        </FormField>
                        <FormField label="Placement">
                            <Select defaultValue="">
                                <option value="" disabled>
                                    Select a placement…
                                </option>
                                <option>Volunteer Directory</option>
                                <option>Homepage</option>
                                <option>Study Abroad</option>
                                <option>Monthly Newsletter</option>
                            </Select>
                        </FormField>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Start date">
                            <Input type="date" />
                        </FormField>
                        <FormField label="End date">
                            <Input type="date" />
                        </FormField>
                    </div>
                    <FormField label="Linked program">
                        <Select defaultValue="">
                            <option value="" disabled>
                                Select a program…
                            </option>
                            <option>Community Health Volunteer</option>
                            <option>Spanish Immersion + Volunteer</option>
                            <option>Teach English in the Andes</option>
                        </Select>
                    </FormField>
                </div>
            </Card>

            <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline" onClick={() => history.back()}>
                    Cancel
                </Button>
                <Button variant="cta" onClick={() => setDone(true)}>
                    Create campaign
                </Button>
            </div>
        </div>
    );
}
