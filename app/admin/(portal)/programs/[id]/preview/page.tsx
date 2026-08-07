"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCheck, FiClock, FiMapPin, FiTag, FiEye } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Button from "@/app/components/admin-dashboard/shared/Button";
import { getProgram } from "@/app/components/admin-dashboard/data";

export default function ProgramPreviewPage() {
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
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <BackLink
                    href={`/admin/programs/${program.id}`}
                    label="Back to program"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-200/70 px-3 py-1 text-xs font-medium text-sun-700">
                    <FiEye className="h-3.5 w-3.5" /> Preview — how travelers see
                    your listing
                </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Hero */}
                <div className="relative bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-white">
                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                        {program.type}
                    </span>
                    <h1 className="mt-3 text-3xl font-bold">{program.title}</h1>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-brand-50/90">
                        <span className="flex items-center gap-1.5">
                            <FiMapPin className="h-4 w-4" /> {program.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiClock className="h-4 w-4" /> {program.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiTag className="h-4 w-4" /> {program.price}
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div className="grid gap-8 px-8 py-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h2 className="text-lg font-semibold text-slate-900">
                            About this program
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {program.description}
                        </p>
                        <h2 className="mt-6 text-lg font-semibold text-slate-900">
                            What&apos;s included
                        </h2>
                        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
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
                    </div>
                    <div>
                        <div className="rounded-xl border border-slate-200 p-5">
                            <div className="text-xs text-slate-400">
                                Starting from
                            </div>
                            <div className="text-2xl font-bold text-slate-900">
                                {program.price}
                            </div>
                            <Button variant="cta" className="mt-4 w-full" disabled>
                                Request info
                            </Button>
                            <p className="mt-2 text-center text-xs text-slate-400">
                                (Disabled in preview)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-center">
                <Link href={`/admin/programs/${program.id}/edit`}>
                    <Button variant="primary">Continue editing</Button>
                </Link>
            </div>
        </div>
    );
}
