import Link from "next/link";
import type { SummaryWidgetData } from "../types";

export default function SummaryWidget({ data }: { data: SummaryWidgetData }) {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <Link
                href={data.href}
                className="block border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:text-brand-600"
            >
                {data.label}
            </Link>
            <ul className="space-y-1.5 px-4 py-3">
                {data.rows.map((r) => (
                    <li key={r.label} className="flex justify-between text-sm">
                        <span className="text-slate-500">{r.label}</span>
                        <span className="font-semibold text-slate-800">
                            {r.count}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
