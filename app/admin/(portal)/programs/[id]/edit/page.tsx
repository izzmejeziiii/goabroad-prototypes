"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
import { getProgram } from "@/app/components/admin-dashboard/data";

const types = [
    "Volunteer Abroad",
    "Language School",
    "Teach Abroad",
    "Intern Abroad",
    "Gap Year",
    "Study Abroad",
];

export default function EditProgramPage() {
    const { id } = useParams<{ id: string }>();
    const program = getProgram(Number(id));
    const [saved, setSaved] = useState(false);

    if (!program) {
        return (
            <div className="mx-auto max-w-3xl">
                <BackLink href="/admin/programs" label="Back to programs" />
                <p className="text-slate-500">Program not found.</p>
            </div>
        );
    }

    if (saved) {
        return (
            <div className="mx-auto max-w-3xl">
                <SuccessScreen
                    title="Changes saved"
                    message="Your listing has been updated and is live."
                    primaryHref={`/admin/programs/${program.id}`}
                    primaryLabel="Back to program"
                    secondaryHref="/admin/programs"
                    secondaryLabel="All programs"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl">
            <BackLink
                href={`/admin/programs/${program.id}`}
                label="Back to program"
            />
            <h1 className="text-xl font-bold text-slate-900">Edit listing</h1>
            <p className="mt-1 text-sm text-slate-500">{program.title}</p>

            <Card className="mt-6">
                <div className="space-y-4">
                    <FormField label="Program title">
                        <Input defaultValue={program.title} />
                    </FormField>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Program type">
                            <Select defaultValue={program.type}>
                                {types.map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </Select>
                        </FormField>
                        <FormField label="Location">
                            <Input defaultValue={program.location} />
                        </FormField>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Duration">
                            <Input defaultValue={program.duration} />
                        </FormField>
                        <FormField label="Starting price">
                            <Input defaultValue={program.price} />
                        </FormField>
                    </div>
                    <FormField label="Description">
                        <Textarea rows={4} defaultValue={program.description} />
                    </FormField>
                    <FormField
                        label="What's included"
                        hint="One item per line."
                    >
                        <Textarea
                            rows={5}
                            defaultValue={program.inclusions.join("\n")}
                        />
                    </FormField>
                </div>
            </Card>

            <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline" onClick={() => history.back()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => setSaved(true)}>
                    Save changes
                </Button>
            </div>
        </div>
    );
}
