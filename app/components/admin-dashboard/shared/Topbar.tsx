"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiMenu,
    FiPlus,
    FiCreditCard,
    FiSettings,
    FiBell,
    FiSearch,
} from "react-icons/fi";
import type { Provider } from "../types";
import Button from "./Button";

interface TopbarProps {
    provider: Provider;
    onToggleSidebar: () => void;
}

const titleMap: [string, string][] = [
    ["/admin/dashboard", "Dashboard"],
    ["/admin/contacts/new", "Add contact"],
    ["/admin/contacts", "Contacts"],
    ["/admin/ads/new", "Create ad"],
    ["/admin/ads", "Ads"],
    ["/admin/reviews/widget", "Review widget generator"],
    ["/admin/reviews", "Reviews"],
    ["/admin/programs/new", "Create program"],
    ["/admin/programs", "Programs"],
    ["/admin/mygoabroad", "MyGoAbroad"],
    ["/admin/invoices", "Invoices"],
    ["/admin/inquiries", "Inquiries"],
    ["/admin/activitylogs", "Activity Logs"],
    ["/admin/profile", "Company Profile"],
    ["/admin/faq", "FAQ"],
    ["/admin/verification", "Verification"],
    ["/admin/contact-manager", "Contact account manager"],
];

function pageTitle(pathname: string) {
    for (const [prefix, title] of titleMap) {
        if (pathname.startsWith(prefix)) return title;
    }
    return "Provider portal";
}

export default function Topbar({ provider, onToggleSidebar }: TopbarProps) {
    const pathname = usePathname();

    return (
        <header className="z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                    aria-label="Open menu"
                >
                    <FiMenu className="h-5 w-5" />
                </button>
                <div>
                    <div className="text-xs font-medium text-slate-400">
                        Provider portal
                    </div>
                    <h1 className="text-base font-semibold text-slate-900">
                        {pageTitle(pathname)}
                    </h1>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:block"
                    aria-label="Search"
                >
                    <FiSearch className="h-5 w-5" />
                </button>
                <Link href="/admin/programs/new" className="hidden sm:inline-flex">
                    <Button variant="outline" size="sm" icon={FiPlus}>
                        Create Program
                    </Button>
                </Link>
                <Link href="/admin/invoices/1/pay">
                    <Button variant="cta" size="sm" icon={FiCreditCard}>
                        Pay ${provider.balanceDue.toLocaleString()}
                    </Button>
                </Link>
                <Link
                    href="/admin/inquiries"
                    className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Notifications"
                >
                    <FiBell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-roman-500" />
                </Link>
                <Link
                    href="/admin/contacts"
                    className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 sm:block"
                    aria-label="Settings"
                >
                    <FiSettings className="h-5 w-5" />
                </Link>
                <Link
                    href="/admin/contacts"
                    className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white"
                >
                    {provider.initials}
                </Link>
            </div>
        </header>
    );
}
