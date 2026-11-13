"use client";

import Link from "next/link";
import clsx from "clsx";
import {
    MdKeyboardArrowLeft,
    MdNotes,
    MdPermPhoneMsg,
    MdSettings,
} from "react-icons/md";
import { BASE_PATH, client } from "../data";
import { Tooltip } from "../ui";

/* Copy of src/views/ClientAdmin/Header.js on PR 784: a white MUI AppBar
   (80px toolbar) with the menu toggle, the client's name, and only the phone
   and settings icons. Create Program moved to Quick Actions; Pay Now only
   shows for paying clients with due invoices, which a free account isn't. */

const ICON_BUTTON =
    "inline-flex shrink-0 items-center justify-center rounded-full text-[#9e9e9e] transition-colors hover:bg-black/[0.04]";

const Header = ({
    expanded,
    onToggle,
}: {
    expanded: boolean;
    onToggle: () => void;
}) => (
    <header
        className={clsx(
            "absolute right-0 top-0 z-[1100] flex flex-col bg-white shadow-[0_2px_15px_0_rgba(0,0,0,0.05)] transition-[width] duration-[195ms] ease-[cubic-bezier(0.4,0,0.6,1)]",
            expanded ? "w-[calc(100%-200px)]" : "w-[calc(100%-80px)]",
        )}
    >
        <div className="relative flex min-h-20 items-center px-4">
            <Tooltip title={expanded ? "Minimize Menu" : "Expand Menu"}>
                <button
                    type="button"
                    aria-label="Expand Sidebar"
                    onClick={onToggle}
                    className={clsx(ICON_BUTTON, "mr-4 p-3")}
                >
                    {expanded ? (
                        <MdKeyboardArrowLeft className="size-6" />
                    ) : (
                        <MdNotes className="size-6" />
                    )}
                </button>
            </Tooltip>

            <h1 className="truncate text-xl font-medium leading-[1.6] tracking-[0.0075em] text-[#424242]">
                {client.name}
            </h1>

            <div className="grow" />

            <Tooltip title="Contact Account Manager">
                <button
                    type="button"
                    aria-label="Contact Account Manager"
                    className={clsx(ICON_BUTTON, "mr-2 p-2")}
                >
                    <MdPermPhoneMsg className="size-6" />
                </button>
            </Tooltip>

            <Tooltip title="Settings">
                <Link
                    href={`${BASE_PATH}/users`}
                    aria-label="Settings"
                    className={clsx(ICON_BUTTON, "p-2 no-underline")}
                >
                    <MdSettings className="size-6" />
                </Link>
            </Tooltip>
        </div>
    </header>
);

export default Header;
