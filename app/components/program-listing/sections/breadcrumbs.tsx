"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { useVersion } from "../version-context";
import { program } from "../data";

export const Breadcrumbs = () => {
    const { active } = useVersion();
    return (
    <ul className="max-w-[1200px] mx-auto flex text-xs pt-6 pb-4 items-center gap-2 list-none px-4 lg:px-0">
        <li className="uppercase">
            <Link href="/" className="font-bold no-underline text-cobalt-500">
                Home
            </Link>
        </li>
        <li>
            <FaChevronRight className="text-xs text-neutral-500" />
        </li>
        <li className="uppercase">
            <a href="#" className="font-bold no-underline text-cobalt-500">
                Providers
            </a>
        </li>
        <li>
            <FaChevronRight className="text-xs text-neutral-500" />
        </li>
        <li className="uppercase">
            <a href="#" className="font-bold no-underline text-cobalt-500">
                {program.provider_name}
            </a>
        </li>
        <li>
            <FaChevronRight className="text-xs text-neutral-500" />
        </li>
        <li className="uppercase text-neutral-500">{active.data.name}</li>
    </ul>
    );
};
