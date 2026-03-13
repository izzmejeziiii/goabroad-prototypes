import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface BreadcrumbsProps {
    isAbsolute?: boolean;
    isDarkBg?: boolean;
    link: string;
    page: string;
}

export default function Breadcrumbs({
    isAbsolute,
    isDarkBg,
    link,
    page,
}: BreadcrumbsProps) {
    return (
        <div
            className={`w-full ${isAbsolute && "absolute top-0 left-0"} flex justify-center px-4 lg:px-0`}
        >
            <ul
                className={`flex gap-2 w-full max-w-7xl items-center py-6 uppercase text-xs ${isDarkBg ? "text-white" : "text-slate-700"}`}
            >
                <li>
                    <Link href="/" className="font-bold text-cobalt-200">
                        Home
                    </Link>
                </li>
                <FaChevronRight className="text-xs" />
                <li>
                    <Link href={`/${link}`}>{page}</Link>
                </li>
            </ul>
        </div>
    );
}
