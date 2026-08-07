import Link from "next/link";
import {
    FiArrowRight,
    FiCheckCircle,
    FiEdit2,
    FiHelpCircle,
    FiMapPin,
    FiPhone,
    FiShield,
} from "react-icons/fi";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import SummaryWidget from "@/app/components/admin-dashboard/shared/SummaryWidget";
import DashboardMessage from "@/app/components/admin-dashboard/dashboard/DashboardMessage";
import { provider, summaryWidgets } from "@/app/components/admin-dashboard/data";

const quickActions = [
    { label: "Create a program", href: "/admin/programs/new", icon: FiMapPin },
    { label: "Edit company profile", href: "/admin/profile", icon: FiEdit2 },
    { label: "Manage FAQ", href: "/admin/faq", icon: FiHelpCircle },
    { label: "Get verified", href: "/admin/verification", icon: FiShield },
    {
        label: "Contact account manager",
        href: "/admin/contact-manager",
        icon: FiPhone,
    },
];

export default function DashboardPage() {
    const v = provider.verification;

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            {/* Welcome hero */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500 to-brand-700 p-8 text-white shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome back, {provider.name} 👋
                        </h1>
                        <p className="mt-1 max-w-xl text-sm text-brand-50/90">
                            Here&apos;s your account at a glance. You&apos;re{" "}
                            {v.percent}% verified — finish up to earn the Verified
                            badge and get more inquiries.
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-2 w-64 max-w-full overflow-hidden rounded-full bg-white/20">
                                <div
                                    className="h-full rounded-full bg-sun-500"
                                    style={{ width: `${v.percent}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium">
                                {v.completed}/{v.total} steps
                            </span>
                        </div>
                    </div>
                    <Link href="/admin/verification">
                        <Button variant="cta" icon={FiCheckCircle}>
                            Complete verification
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Account summary */}
            <div>
                <h2 className="mb-3 text-sm font-semibold text-slate-700">
                    Account summary
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {summaryWidgets.map((w) => (
                        <SummaryWidget key={w.key} data={w} />
                    ))}
                </div>
            </div>

            {/* Message row: Advertise / Balance / Message */}
            <DashboardMessage />

            {/* Quick actions */}
            <Card title="Quick actions">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {quickActions.map((a) => {
                        const Icon = a.icon;
                        return (
                            <Link
                                key={a.href}
                                href={a.href}
                                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span className="flex-1 text-sm font-medium text-slate-700">
                                    {a.label}
                                </span>
                                <FiArrowRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-brand-500" />
                            </Link>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
