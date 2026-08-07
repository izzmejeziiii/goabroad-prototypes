"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiFileText } from "react-icons/fi";

const reports = [
    { label: "Collections", href: "/admin/staff/collections" },
    { label: "Sales & Collections Summary", href: "/admin/staff/sales-summary" },
    { label: "Invoice Items Summary", href: "/admin/staff/invoice-items-summary" },
    { label: "Sales & Collections Goals", href: "/admin/staff/sales-goals" },
    { label: "Sales by Directory", href: "/admin/staff/sales-directory" },
    { label: "Sales by Sale Type", href: "/admin/staff/sales-by-sale-type" },
    { label: "Review Widget Generator", href: "/admin/staff/review-widget" },
    { label: "Rank Performance", href: "/admin/staff/rank-performance" },
];

export default function ReportsMenu() {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
                <FiFileText className="h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
                <FiChevronDown className="h-4 w-4" />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 z-20 mt-1 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                        {reports.map((r) => (
                            <Link
                                key={r.href}
                                href={r.href}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                                {r.label}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
