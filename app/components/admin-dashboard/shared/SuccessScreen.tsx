import Link from "next/link";
import type { ReactNode } from "react";
import { FiCheck } from "react-icons/fi";
import Button from "./Button";

interface SuccessScreenProps {
    title: string;
    message: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
    children?: ReactNode;
}

export default function SuccessScreen({
    title,
    message,
    primaryHref,
    primaryLabel,
    secondaryHref,
    secondaryLabel,
    children,
}: SuccessScreenProps) {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-fern-200/70 text-fern-700">
                <FiCheck className="h-8 w-8" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-500">{message}</p>
            {children}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link href={primaryHref}>
                    <Button variant="primary">{primaryLabel}</Button>
                </Link>
                {secondaryHref && secondaryLabel && (
                    <Link href={secondaryHref}>
                        <Button variant="outline">{secondaryLabel}</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
