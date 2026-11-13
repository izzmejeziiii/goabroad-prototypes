"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import clsx from "clsx";
import {
    MdCardGiftcard,
    MdContacts,
    MdDashboard,
    MdEdit,
    MdFormatQuote,
    MdInsertPhoto,
    MdListAlt,
    MdMonetizationOn,
    MdPerson,
    MdPowerSettingsNew,
    MdQuestionAnswer,
    MdVerifiedUser,
} from "react-icons/md";
import { BASE_PATH, client } from "../data";
import { Tooltip, VerificationChip } from "../ui";

/* Copy of src/views/ClientAdmin/SideBar.js on PR 784: a 200px white MUI
   Drawer (80px collapsed) with the logo + completion ring, the verification
   chip, the Engage / Promote / Account groups, and Logout pinned below. */

type NavLink = {
    href: string;
    /** Path the active state matches on (the link may carry a query). */
    match: string;
    label: string;
    icon: ReactNode;
};

const icon = (Icon: typeof MdDashboard) => <Icon className="size-6" />;

const SECTIONS: { title: string; links: NavLink[] }[] = [
    {
        title: "",
        links: [
            {
                href: BASE_PATH,
                match: BASE_PATH,
                label: "Dashboard",
                icon: icon(MdDashboard),
            },
        ],
    },
    {
        title: "Engage",
        links: [
            {
                href: `${BASE_PATH}/leads`,
                match: `${BASE_PATH}/leads`,
                label: "Leads",
                icon: icon(MdQuestionAnswer),
            },
            {
                href: `${BASE_PATH}/reviews`,
                match: `${BASE_PATH}/reviews`,
                label: "Reviews",
                icon: icon(MdFormatQuote),
            },
        ],
    },
    {
        title: "Promote",
        links: [
            {
                href: `${BASE_PATH}/programs`,
                match: `${BASE_PATH}/programs`,
                label: "Programs",
                icon: icon(MdListAlt),
            },
            {
                // Selecting "Ads" always lands on the ACTIVE-filtered view.
                href: `${BASE_PATH}/ads?status=active`,
                match: `${BASE_PATH}/ads`,
                label: "Ads",
                icon: icon(MdInsertPhoto),
            },
            {
                href: `${BASE_PATH}/mygoabroad`,
                match: `${BASE_PATH}/mygoabroad`,
                label: "MyGoAbroad",
                icon: icon(MdCardGiftcard),
            },
        ],
    },
    {
        title: "Account",
        links: [
            {
                href: `${BASE_PATH}/profile`,
                match: `${BASE_PATH}/profile`,
                label: "Profile",
                icon: icon(MdPerson),
            },
            {
                href: `${BASE_PATH}/users?contacts`,
                match: `${BASE_PATH}/users`,
                label: "Contacts",
                icon: icon(MdContacts),
            },
            {
                href: `${BASE_PATH}/invoices`,
                match: `${BASE_PATH}/invoices`,
                label: "Invoices",
                icon: icon(MdMonetizationOn),
            },
        ],
    },
];

// MUI ListItem (gutters 24px) + the sidebarLink / selected classes.
const LINK_CLASSES =
    "group/link relative box-border flex w-full items-center justify-start border-l-[3px] border-solid border-white px-6 py-5 text-left no-underline hover:border-[#4fc3f7] hover:bg-[#e1f5fe]";
const SELECTED_CLASSES = "!border-[#4fc3f7] !bg-[#e1f5fe]";

const LinkBody = ({
    icon,
    label,
    selected,
    expanded,
}: {
    icon: ReactNode;
    label: string;
    selected: boolean;
    expanded: boolean;
}) => (
    <>
        <span
            className={clsx(
                "inline-flex min-w-14 shrink-0 group-hover/link:text-[#039be5]",
                selected ? "text-[#039be5]" : "text-[#bdbdbd]",
            )}
        >
            {icon}
        </span>
        {expanded && (
            <span className="my-1 min-w-0 flex-auto">
                <span
                    className={clsx(
                        "block whitespace-nowrap text-[0.875rem] leading-normal text-[#424242]",
                        selected && "font-bold",
                    )}
                >
                    {label}
                </span>
            </span>
        )}
    </>
);

const Sidebar = ({ expanded }: { expanded: boolean }) => {
    const pathname = usePathname() ?? "";
    const isActive = (match: string) =>
        match === BASE_PATH ? pathname === BASE_PATH : pathname.startsWith(match);
    const verified = client.verificationStatusId === 5;

    const renderLink = (link: NavLink) => {
        const selected = isActive(link.match);
        const anchor = (
            <Link
                href={link.href}
                className={clsx(LINK_CLASSES, selected && SELECTED_CLASSES)}
                aria-current={selected ? "page" : undefined}
                aria-label={expanded ? undefined : link.label}
                title={expanded ? undefined : link.label}
            >
                <LinkBody
                    icon={link.icon}
                    label={link.label}
                    selected={selected}
                    expanded={expanded}
                />
            </Link>
        );

        return (
            <li key={link.href} className="w-full">
                {anchor}
            </li>
        );
    };

    return (
        <div className="flex-none">
            <nav
                aria-label="Client admin"
                className={clsx(
                    "relative flex h-screen flex-col items-center justify-between overflow-hidden bg-white pb-4 shadow-[0_2px_15px_0_rgba(0,0,0,0.05)] transition-[width] duration-[225ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    expanded ? "w-[200px]" : "w-20",
                )}
            >
                {/* Logo, completion ring and welcome */}
                <div className="relative flex w-full flex-none flex-col items-center justify-center">
                    <div className="flex w-full px-4 pt-4">
                        <span className="relative inline-flex shrink-0 align-middle">
                            <div className="relative mr-4 flex w-[55px] flex-col items-center">
                                {!verified && (
                                    // CircularProgress with variant="static",
                                    // which MUI v6 no longer knows, so it draws
                                    // the full ring whatever the completion.
                                    <span
                                        className="absolute left-0 inline-block w-[55px] text-[#e91e63]"
                                        role="progressbar"
                                        aria-label="Profile completion"
                                        aria-valuenow={client.accountProgress}
                                    >
                                        <svg
                                            className="block size-[55px]"
                                            viewBox="22 22 44 44"
                                            aria-hidden="true"
                                        >
                                            <circle
                                                cx="44"
                                                cy="44"
                                                r="20.2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3.6"
                                            />
                                        </svg>
                                    </span>
                                )}
                                <div
                                    className={clsx(
                                        "mb-4 size-[55px] rounded-full border-[5px] border-solid",
                                        verified
                                            ? "border-white"
                                            : "border-[#eee]",
                                    )}
                                >
                                    {/* The sidebar clips overflow, so the
                                        tooltips in it are native titles. */}
                                    <span
                                        title="Upload Company Logo"
                                        className="group/logo absolute left-[5px] top-[5px] flex size-[45px] items-center justify-center rounded-full transition-all duration-300 hover:bg-[#000000a1]"
                                    >
                                        <MdEdit className="hidden size-6 text-white group-hover/logo:block" />
                                    </span>
                                    <div className="flex size-[45px] items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-gray-700">
                                        {client.firstName.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            </div>
                            {!verified && (
                                // MUI Badge dot, nudged by the `verified` class
                                <span className="absolute right-[15px] top-[5px] z-0 flex h-2 min-w-2 -translate-y-1/2 translate-x-1/2 rounded-[4px] bg-[#e91e63]" />
                            )}
                        </span>

                        <div>
                            <p className="mt-[2px] text-base font-bold leading-normal text-[#424242]">
                                Welcome,
                            </p>
                            <p className="whitespace-nowrap text-base leading-normal text-[#424242]">
                                {client.firstName}
                            </p>
                        </div>
                    </div>

                    <Tooltip title="Get Verified" placement="bottom">
                        <button
                            type="button"
                            className="inline-flex h-11 min-w-16 items-center justify-center rounded-[4px] px-2 py-1.5 text-sm font-medium uppercase leading-[1.75] tracking-[0.02857em] text-[#03a9f4] hover:bg-[rgba(3,169,244,0.04)]"
                        >
                            {expanded ? (
                                <VerificationChip
                                    status={
                                        !verified &&
                                        client.requirementUploadStatus === 0
                                            ? "Pending"
                                            : client.verificationStatusId
                                    }
                                />
                            ) : (
                                <MdVerifiedUser
                                    className={clsx(
                                        "size-6",
                                        verified
                                            ? "text-[#66bb6a]"
                                            : "text-[#bdbdbd]",
                                    )}
                                />
                            )}
                        </button>
                    </Tooltip>
                </div>

                {/* Grouped links (scrolls when the window is short) */}
                <ul className="m-0 min-h-0 w-full flex-[0_1_auto] list-none overflow-y-auto overflow-x-hidden p-0 [scrollbar-width:thin]">
                    {SECTIONS.map(({ title, links }) => (
                        <Fragment key={title || "main"}>
                            {!!title &&
                                (expanded ? (
                                    <li className="px-6 pb-1 pt-4 text-[0.6875rem] font-semibold uppercase leading-[0.875rem] tracking-wider text-gray-500">
                                        {title}
                                    </li>
                                ) : (
                                    <li
                                        className="mx-4 my-2 border-t border-ga-border"
                                        aria-hidden="true"
                                    />
                                ))}
                            {links.map(renderLink)}
                        </Fragment>
                    ))}
                </ul>

                {/* Logout. In the prototype it leaves for the library index. */}
                <ul className="m-0 w-full flex-none list-none p-0">
                    <li className="w-full">
                        <Link
                            href="/"
                            className={LINK_CLASSES}
                            aria-label={expanded ? undefined : "Logout"}
                            title={expanded ? undefined : "Logout"}
                        >
                            <LinkBody
                                icon={icon(MdPowerSettingsNew)}
                                label="Logout"
                                selected={false}
                                expanded={expanded}
                            />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
