"use client";

import { useState } from "react";
import Sidebar from "@/app/components/admin-dashboard/shared/Sidebar";
import Topbar from "@/app/components/admin-dashboard/shared/Topbar";
import AccessLevelSelector from "@/app/components/admin-dashboard/shared/AccessLevelSelector";
import { navItems, provider } from "@/app/components/admin-dashboard/data";

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
            <Sidebar
                navItems={navItems}
                provider={provider}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed((v) => !v)}
                mobileOpen={mobileOpen}
                onCloseMobile={() => setMobileOpen(false)}
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    provider={provider}
                    onToggleSidebar={() => setMobileOpen(true)}
                />
                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8">
                    {children}
                </main>
            </div>
            <AccessLevelSelector />
        </div>
    );
}
