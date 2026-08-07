import type { ReactNode } from "react";

export default function InfoField({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </div>
            <div className="mt-0.5 text-sm text-slate-700">{children}</div>
        </div>
    );
}
