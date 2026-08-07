"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const levels = [
    { key: "1", label: "Level 1 · Client / Provider", href: "/admin/dashboard" },
    { key: "2", label: "Level 2 · Staff", href: "/admin/staff/dashboard" },
    { key: "3", label: "Level 3 · Manager", href: null },
    { key: "4", label: "Level 4 · Owner", href: null },
];

export default function AccessLevelSelector() {
    const pathname = usePathname();
    const activeKey = pathname.startsWith("/admin/staff") ? "2" : "1";

    return (
        <div className="fixed bottom-4 right-4 z-30 w-56 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200">
            <div className="bg-brand-800 px-4 py-2 text-xs font-semibold text-white">
                Access Level
            </div>
            <div className="flex flex-col gap-1 p-2">
                {levels.map((l) => {
                    const active = l.key === activeKey;
                    if (l.href) {
                        return (
                            <Link
                                key={l.key}
                                href={l.href}
                                className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                                    active
                                        ? "bg-brand-100 text-brand-700"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                {l.label}
                            </Link>
                        );
                    }
                    return (
                        <span
                            key={l.key}
                            className="cursor-not-allowed rounded-md bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-300"
                        >
                            {l.label} · soon
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
