"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle, FaTimes } from "react-icons/fa";
import { IoMdOpen, IoMdStar } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useCompare, type ComparableProgram } from "./compare-context";

const rows: {
    label: string;
    render: (program: ComparableProgram) => React.ReactNode;
}[] = [
    {
        label: "Provider",
        render: (program) => (
            <div className="flex items-center gap-2">
                {!!program.providerLogo && (
                    <Image
                        src={program.providerLogo}
                        alt={`${program.providerName} logo`}
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded bg-slate-50 object-cover"
                    />
                )}
                <span className="text-sm font-bold text-slate-700">
                    {program.providerName}
                </span>
            </div>
        ),
    },
    {
        label: "Rating",
        render: (program) =>
            program.rating ? (
                <span className="flex items-center gap-1.5">
                    <span className="text-sm font-bold">{program.rating}</span>
                    <IoMdStar className="text-sun-500 h-4 w-4" />
                </span>
            ) : (
                <span className="text-sm text-slate-400">No rating yet</span>
            ),
    },
    {
        label: "Reviews",
        render: (program) => (
            <span className="text-sm">{program.reviewsCount ?? 0} reviews</span>
        ),
    },
    {
        label: "Verified provider",
        render: (program) =>
            program.isVerified ? (
                <span className="text-fern-600 flex items-center gap-1.5 text-sm font-semibold">
                    <FaCheckCircle className="text-fern-500 h-4 w-4" /> Verified
                </span>
            ) : (
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <FaTimes className="h-3.5 w-3.5 text-slate-400" /> Not verified
                </span>
            ),
    },
    {
        label: "Programs offered",
        render: (program) =>
            program.matchedProgramsCount && program.matchedProgramsCount > 1 ? (
                <span className="text-sm">
                    {program.matchedProgramsCount} matching programs
                </span>
            ) : (
                <span className="text-sm text-slate-500">This program</span>
            ),
    },
    {
        label: "About",
        render: (program) => (
            <p className="text-sm leading-5 text-slate-700">{program.description}</p>
        ),
    },
    {
        label: "Found on",
        render: (program) => (
            <span className="text-sm text-slate-500">{program.sourceLabel}</span>
        ),
    },
];

/**
 * Shared by both versions — the flows differ in how programs get picked, not in
 * how they're compared. Scrolls horizontally on narrow screens with the label
 * column pinned.
 */
export default function CompareModal() {
    const { isOpen, closeCompare, selected, remove } = useCompare();

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeCompare();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, closeCompare]);

    if (!isOpen) return null;

    return (
        <div className="z-ultraverse-6 fixed inset-0 flex items-end justify-center bg-slate-900/60 p-0 md:items-center md:p-6">
            <div
                className="absolute inset-0"
                onClick={closeCompare}
                aria-hidden="true"
            />
            <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-xl bg-white shadow-xl md:max-h-[86vh] md:rounded-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 md:px-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
                            Compare Programs
                        </h2>
                        <p className="text-xs text-slate-500 md:text-sm">
                            {selected.length} programs side by side
                            {selected.length > 1 && (
                                <span className="md:hidden"> — swipe to see more</span>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={closeCompare}
                        aria-label="Close comparison"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    >
                        <IoClose className="h-6 w-6" />
                    </button>
                </div>

                <div className="overflow-auto">
                    <table className="w-full min-w-[540px] border-collapse text-left md:min-w-[640px]">
                        <thead>
                            <tr className="align-top">
                                <th className="sticky left-0 z-10 w-[96px] bg-white px-3 py-4 md:w-[180px] md:px-6" />
                                {selected.map((program) => (
                                    <th
                                        key={program.id}
                                        className="min-w-[190px] border-l border-slate-200 px-3 py-4 align-top md:min-w-[260px] md:px-4"
                                    >
                                        <div className="relative flex flex-col gap-3">
                                            <button
                                                onClick={() => remove(program.id)}
                                                aria-label={`Remove ${program.title}`}
                                                className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow hover:text-slate-800"
                                            >
                                                <IoClose className="h-4 w-4" />
                                            </button>
                                            {!!program.image && (
                                                <Image
                                                    src={program.image}
                                                    alt={program.imageAlt}
                                                    width={260}
                                                    height={130}
                                                    className="h-[130px] w-full rounded-md object-cover"
                                                />
                                            )}
                                            <Link
                                                href={program.programUrl}
                                                className="text-cobalt-500 hover:text-cobalt-600 line-clamp-2 text-base font-bold leading-5"
                                            >
                                                {program.title}
                                            </Link>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr
                                    key={row.label}
                                    className="border-t border-slate-200 align-top"
                                >
                                    <th className="sticky left-0 z-10 bg-slate-50 px-3 py-4 text-[10px] font-bold uppercase tracking-wide text-slate-500 md:px-6 md:text-xs">
                                        {row.label}
                                    </th>
                                    {selected.map((program) => (
                                        <td
                                            key={program.id}
                                            className="border-l border-slate-200 px-3 py-4 md:px-4"
                                        >
                                            {row.render(program)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr className="border-t border-slate-200">
                                <th className="sticky left-0 z-10 bg-slate-50 px-3 py-4 md:px-6" />
                                {selected.map((program) => (
                                    <td
                                        key={program.id}
                                        className="border-l border-slate-200 px-3 py-4 md:px-4"
                                    >
                                        <div className="flex flex-col gap-2">
                                            {!!program.webUrl && (
                                                <Link
                                                    href={program.webUrl}
                                                    target="_blank"
                                                    rel="sponsored noopener noreferrer"
                                                    className="bg-cobalt-500 hover:bg-cobalt-600 group flex h-10 w-full items-center justify-center gap-1.5 rounded-md px-4 text-white transition-all duration-300"
                                                >
                                                    <span className="text-xs font-bold">
                                                        Visit Website
                                                    </span>
                                                    <IoMdOpen className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                                                </Link>
                                            )}
                                            <Link
                                                href={program.programUrl}
                                                className="border-cobalt-500 text-cobalt-500 hover:border-cobalt-600 hover:text-cobalt-600 group flex h-10 w-full items-center justify-center gap-1.5 rounded-md border bg-white transition-all duration-300 hover:bg-slate-100"
                                            >
                                                <span className="text-xs font-bold">
                                                    View Program
                                                </span>
                                                <FaArrowRight className="h-3 w-3 transition-all duration-300 group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
