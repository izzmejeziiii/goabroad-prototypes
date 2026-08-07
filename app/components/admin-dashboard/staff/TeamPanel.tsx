import Link from "next/link";
import { FiChevronRight, FiPlus } from "react-icons/fi";
import Card from "../shared/Card";
import { teamQuickLinks, teamQuickActions } from "../staff-data";

export default function TeamPanel() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card title="Quick Links">
                <div className="space-y-4">
                    {teamQuickLinks.map((g) => (
                        <div key={g.group}>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                {g.group}
                            </div>
                            <div className="space-y-1">
                                {g.links.map((l) => (
                                    <Link
                                        key={l.label}
                                        href={l.href}
                                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                                            l.danger
                                                ? "text-roman-700 hover:bg-roman-50"
                                                : "text-slate-700 hover:bg-brand-50/50"
                                        }`}
                                    >
                                        {l.label}
                                        <FiChevronRight className="h-4 w-4 opacity-40" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card title="Quick Actions">
                <div className="grid gap-2">
                    {teamQuickActions.map((a) => (
                        <Link
                            key={a.label}
                            href={a.href}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                        >
                            <FiPlus className="h-4 w-4 text-brand-500" />
                            {a.label}
                        </Link>
                    ))}
                </div>
            </Card>
        </div>
    );
}
