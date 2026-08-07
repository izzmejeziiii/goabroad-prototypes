"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronsLeft, FiLogOut } from "react-icons/fi";
import type { StaffNavItem } from "../staff-data";

interface StaffSidebarProps {
    navItems: StaffNavItem[];
    user: { firstName: string; role: string; initials: string };
    collapsed: boolean;
    onToggleCollapse: () => void;
    mobileOpen: boolean;
    onCloseMobile: () => void;
}

export default function StaffSidebar({
    navItems,
    user,
    collapsed,
    onToggleCollapse,
    mobileOpen,
    onCloseMobile,
}: StaffSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-slate-900/50 lg:hidden ${
                    mobileOpen ? "" : "hidden"
                }`}
                onClick={onCloseMobile}
            />
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col bg-brand-800 text-slate-100 transition-all duration-300 lg:static lg:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                } ${collapsed ? "w-20" : "w-64"}`}
            >
                {/* Brand header */}
                <div className="flex items-center justify-between gap-2 px-4 py-4">
                    <Link
                        href="/admin/staff/dashboard"
                        className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                            alt="GoAbroad"
                            className="h-6 w-auto object-contain"
                        />
                    </Link>
                    {!collapsed && (
                        <button
                            onClick={onToggleCollapse}
                            className="hidden rounded-lg p-1.5 text-brand-100 hover:bg-white/10 lg:block"
                            aria-label="Collapse sidebar"
                        >
                            <FiChevronsLeft className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Staff user block */}
                {!collapsed && (
                    <div className="flex items-center gap-3 border-b border-white/10 px-4 pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                            {user.initials}
                        </div>
                        <div>
                            <div className="text-xs text-brand-100/70">
                                Welcome,
                            </div>
                            <div className="text-sm font-semibold text-white">
                                {user.firstName}
                            </div>
                            <div className="text-[11px] text-brand-100/60">
                                {user.role}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                onClick={onCloseMobile}
                                title={collapsed ? item.label : undefined}
                                className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-white/10 text-white"
                                        : "text-brand-100/75 hover:bg-white/5 hover:text-white"
                                } ${collapsed ? "justify-center" : ""}`}
                            >
                                {active && (
                                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sun-500" />
                                )}
                                <Icon className="h-5 w-5 shrink-0" />
                                {!collapsed && (
                                    <span className="flex-1 text-left">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-white/10 px-3 py-3">
                    {collapsed && (
                        <button
                            onClick={onToggleCollapse}
                            className="mb-1 hidden w-full items-center justify-center rounded-lg px-3 py-2 text-brand-100/75 hover:bg-white/5 hover:text-white lg:flex"
                            aria-label="Expand sidebar"
                        >
                            <FiChevronsLeft className="h-5 w-5 rotate-180" />
                        </button>
                    )}
                    <Link
                        href="/admin/login"
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-brand-100/75 hover:bg-white/5 hover:text-white ${
                            collapsed ? "justify-center" : ""
                        }`}
                        title={collapsed ? "Log out" : undefined}
                    >
                        <FiLogOut className="h-5 w-5 shrink-0" />
                        {!collapsed && "Log out"}
                    </Link>
                </div>
            </aside>
        </>
    );
}
