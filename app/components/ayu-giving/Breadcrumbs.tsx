import Link from "next/link";
import { ChevronRight } from "./icons";
import { cn } from "./utils";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    if (items.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("text-sm text-[#6b7a72]", className)}
        >
            <ol className="flex flex-wrap items-center gap-1.5">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li
                            key={`${item.label}-${index}`}
                            className="flex items-center gap-1.5"
                        >
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="font-medium text-[#6b7a72] transition-colors hover:text-[#1f5a2c]"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={isLast ? "page" : undefined}
                                    className={cn(
                                        isLast
                                            ? "font-semibold text-[#1A3628] line-clamp-1"
                                            : "font-medium text-[#6b7a72]",
                                    )}
                                >
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <ChevronRight
                                    className="h-3.5 w-3.5 text-[#6b7a72]"
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
