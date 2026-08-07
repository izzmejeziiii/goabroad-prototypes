import type { ReactNode } from "react";

interface CardProps {
    title?: ReactNode;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
}

export default function Card({
    title,
    action,
    children,
    className = "",
    bodyClassName,
}: CardProps) {
    return (
        <div
            className={`rounded-2xl border border-slate-200/80 bg-white shadow-sm ${className}`}
        >
            {(title || action) && (
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
                    {typeof title === "string" ? (
                        <h3 className="text-sm font-semibold text-slate-800">
                            {title}
                        </h3>
                    ) : (
                        title
                    )}
                    {action}
                </div>
            )}
            <div className={bodyClassName ?? "p-6"}>{children}</div>
        </div>
    );
}
