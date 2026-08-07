"use client";

export default function Tabs({
    tabs,
    active,
    onChange,
}: {
    tabs: { key: string; label: string }[];
    active: string;
    onChange: (k: string) => void;
}) {
    return (
        <div className="mb-6 flex gap-1 overflow-x-auto border-b border-slate-200">
            {tabs.map((t) => (
                <button
                    key={t.key}
                    onClick={() => onChange(t.key)}
                    className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                        active === t.key
                            ? "border-brand-500 text-brand-600"
                            : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}
