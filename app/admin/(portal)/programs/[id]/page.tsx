"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FiEdit2, FiEye, FiMapPin, FiClock, FiTag, FiCheck } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import { getProgram } from "@/app/components/admin-dashboard/data";

export default function ProgramDetailPage() {
    const { id } = useParams<{ id: string }>();
    const program = getProgram(Number(id));

    if (!program) {
        return (
            <div className="mx-auto max-w-4xl">
                <BackLink href="/admin/programs" label="Back to programs" />
                <p className="text-slate-500">Program not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <BackLink href="/admin/programs" label="Back to programs" />
            <PageHeader
                title={program.title}
                description={program.type}
                actions={
                    <>
                        <Link href={`/admin/programs/${program.id}/preview`}>
                            <Button variant="outline" icon={FiEye}>
                                Preview
                            </Button>
                        </Link>
                        <Link href={`/admin/programs/${program.id}/edit`}>
                            <Button variant="primary" icon={FiEdit2}>
                                Edit listing
                            </Button>
                        </Link>
                    </>
                }
            />

            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Card bodyClassName="p-4">
                    <div className="text-2xl font-bold text-slate-900">
                        {program.views.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">Listing views</div>
                </Card>
                <Card bodyClassName="p-4">
                    <div className="text-2xl font-bold text-slate-900">
                        {program.leads}
                    </div>
                    <div className="text-xs text-slate-400">Leads</div>
                </Card>
                <Card bodyClassName="p-4">
                    <div className="text-sm font-semibold text-slate-900">
                        {program.updated}
                    </div>
                    <div className="text-xs text-slate-400">Last updated</div>
                </Card>
                <Card bodyClassName="p-4">
                    <StatusPill
                        label={program.status.label}
                        tone={program.status.tone}
                    />
                    <div className="mt-1 text-xs text-slate-400">Status</div>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card title="Description">
                        <p className="text-sm leading-relaxed text-slate-600">
                            {program.description}
                        </p>
                    </Card>
                    <Card title="What's included">
                        <ul className="grid gap-2 sm:grid-cols-2">
                            {program.inclusions.map((inc) => (
                                <li
                                    key={inc}
                                    className="flex items-center gap-2 text-sm text-slate-600"
                                >
                                    <FiCheck className="h-4 w-4 text-fern-600" />
                                    {inc}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
                <Card title="Details">
                    <dl className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <FiMapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                                {program.location}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiClock className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                                {program.duration}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiTag className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                                {program.price}
                            </span>
                        </div>
                    </dl>
                </Card>
            </div>
        </div>
    );
}
