"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";
import StaffSidebar from "@/app/components/admin-dashboard/staff/StaffSidebar";
import AccessLevelSelector from "@/app/components/admin-dashboard/shared/AccessLevelSelector";
import ReportsMenu from "@/app/components/admin-dashboard/staff/ReportsMenu";
import {
    staffNavItems,
    staffUser,
} from "@/app/components/admin-dashboard/staff-data";

const titleMap: [string, string][] = [
    ["/admin/staff/dashboard", "Dashboard"],
    ["/admin/staff/clients", "Clients"],
    ["/admin/staff/stats", "Client Stats"],
    ["/admin/staff/ranking", "Ranking System"],
    ["/admin/staff/online-advisor", "Online Advisor"],
    ["/admin/staff/articles", "Articles"],
    ["/admin/staff/guides", "Guides"],
    ["/admin/staff/interviews", "Interviews"],
    ["/admin/staff/scholarships", "Scholarships"],
    ["/admin/staff/mygoabroad", "MyGoAbroad"],
    ["/admin/staff/url-verifiers", "URL Verifiers"],
    ["/admin/staff/site-tools", "Site Tools"],
];

function pageTitle(pathname: string) {
    for (const [prefix, title] of titleMap) {
        if (pathname.startsWith(prefix)) return title;
    }
    return "Staff console";
}

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
            <StaffSidebar
                navItems={staffNavItems}
                user={staffUser}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed((v) => !v)}
                mobileOpen={mobileOpen}
                onCloseMobile={() => setMobileOpen(false)}
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <header className="z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                            aria-label="Open menu"
                        >
                            <FiMenu className="h-5 w-5" />
                        </button>
                        <div>
                            <div className="text-xs font-medium text-slate-400">
                                GoAbroad Admin
                            </div>
                            <h1 className="text-base font-semibold text-slate-900">
                                {pageTitle(pathname)}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ReportsMenu />
                        <button
                            className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:block"
                            aria-label="Search"
                        >
                            <FiSearch className="h-5 w-5" />
                        </button>
                        <button
                            className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Notifications"
                        >
                            <FiBell className="h-5 w-5" />
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-roman-500" />
                        </button>
                        <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                            {staffUser.initials}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8">
                    {children}
                </main>
            </div>
            <AccessLevelSelector />
        </div>
    );
}
