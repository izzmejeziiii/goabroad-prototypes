import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function BackLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600"
        >
            <FiArrowLeft className="h-4 w-4" />
            {label}
        </Link>
    );
}
