"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Interview } from "./types";

export default function InterviewSection({
    interviews,
    viewAllUrl,
}: {
    interviews: Interview[];
    viewAllUrl: string;
}) {
    const [page, setPage] = useState(0);
    const maxPage = interviews.length - 1;
    const handleRight = () => page < maxPage && setPage(page + 1);
    const handleLeft = () => page > 0 && setPage(page - 1);
    const visible = interviews.slice(page, page + 2);

    return (
        <div id="interviews" className="mb-4 flex flex-col gap-4 px-4 lg:px-0">
            <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between">
                <div className="flex w-full gap-4 md:flex-row md:justify-between lg:items-center">
                    <h2 className="flex w-full items-center justify-between gap-2 text-2xl font-bold">
                        Latest Interviews
                    </h2>
                    <div className="flex gap-2 text-xs">
                        <button
                            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                                page === 0
                                    ? "cursor-not-allowed text-gray-400"
                                    : "focus:border-cobalt-300 focus:ring-primary-100 hover:bg-slate-50 focus:outline-none focus:ring-2"
                            } `}
                            onClick={handleLeft}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                                page === maxPage
                                    ? "cursor-not-allowed text-gray-400"
                                    : "focus:border-cobalt-300 focus:ring-primary-100 hover:bg-slate-50 focus:outline-none focus:ring-2"
                            } `}
                            onClick={handleRight}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                {visible.map((interview) => (
                    <div
                        key={`interview-${interview.id}`}
                        className="flex items-start rounded-md border"
                    >
                        <div className="flex h-full w-full max-w-[150px] shrink-0 flex-col items-start gap-4 rounded-md bg-slate-50 p-4">
                            <div className="flex flex-col items-start gap-4">
                                <Image
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={interview.photo}
                                    alt={interview.name}
                                    width={50}
                                    height={50}
                                />
                                <div className="flex flex-col items-start">
                                    <p className="line-clamp-1 text-xs font-bold">
                                        {interview.name}
                                    </p>
                                    <p className="line-clamp-1 text-xs">
                                        {interview.providerName}
                                    </p>
                                    <div
                                        className={`${
                                            interview.type === 1
                                                ? "bg-cobalt-500"
                                                : "bg-roman-500"
                                        } mt-2 rounded-md px-2.5 py-1 text-xs text-white`}
                                    >
                                        {interview.type === 1 ? "Alumni" : "Staff"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-4">
                            <div className="flex flex-col gap-2">
                                <p className="line-clamp-5 text-sm">
                                    {interview.excerpt}
                                </p>
                            </div>
                            <Link
                                href={interview.url}
                                className="hover:text-cobalt-600 group flex items-center gap-2 text-sm font-bold"
                            >
                                Read Full Interview
                                <FaArrowRight className="h-3 w-3 transition-all duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                <Link
                    className="focus:ring-roman-400 bg-roman-500 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200"
                    href={viewAllUrl}
                >
                    View All Interviews
                </Link>
            </div>
        </div>
    );
}
