import Link from "next/link";
import Card from "../shared/Card";
import {
    thisMonthCounters,
    pendingCounters,
} from "../staff-data";
import type { CounterCard } from "../staff-data";

const toneText: Record<string, string> = {
    success: "text-fern-600",
    danger: "text-roman-600",
    warning: "text-sun-600",
    brand: "text-brand-600",
    info: "text-primary-600",
    neutral: "text-slate-900",
};

function Tile({ c }: { c: CounterCard }) {
    return (
        <Link
            href={c.href}
            className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
        >
            <div className={`text-2xl font-bold ${toneText[c.tone] ?? "text-slate-900"}`}>
                {c.value}
            </div>
            <div className="mt-0.5 text-xs text-slate-500">{c.label}</div>
        </Link>
    );
}

export default function ContentCounters() {
    return (
        <Card title="Content Overview">
            <p className="-mt-1 mb-4 text-sm text-slate-500">
                Monthly listings, reviews, and pending queue at a glance.
            </p>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                This Month · July 2026
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {thisMonthCounters.map((c) => (
                    <Tile key={c.key} c={c} />
                ))}
            </div>
            <div className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Pending Queue
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {pendingCounters.map((c) => (
                    <Tile key={c.key} c={c} />
                ))}
            </div>
        </Card>
    );
}
