import type { SummaryStat } from "../types";
import { iconTone } from "./tones";

export default function StatCard({
    stat,
    onClick,
}: {
    stat: SummaryStat;
    onClick?: () => void;
}) {
    const Icon = stat.icon;
    return (
        <button
            onClick={onClick}
            className="group flex flex-col rounded-xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition-all hover:border-brand-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40"
        >
            <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconTone[stat.tone]}`}
            >
                <Icon className="h-5 w-5" />
            </span>
            <span className="mt-4 text-2xl font-bold text-slate-900">
                {stat.value}
            </span>
            <span className="text-sm font-medium text-slate-600">
                {stat.label}
            </span>
            <span className="mt-1 text-xs text-slate-400">{stat.sub}</span>
        </button>
    );
}
