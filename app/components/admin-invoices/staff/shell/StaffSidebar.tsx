"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
    MdBuild,
    MdCardGiftcard,
    MdDashboard,
    MdExplore,
    MdLibraryBooks,
    MdLink,
    MdLocalLibrary,
    MdPeople,
    MdPowerSettingsNew,
    MdQuestionAnswer,
    MdSort,
    MdSpeakerNotes,
    MdTrendingUp,
} from "react-icons/md";
import { BASE, staffAvatar, staffUser } from "../../data";
import { DialogBox } from "../../mui";

/* Copy of src/components/Sidebar/Sidebar.js: a white permanent MUI Drawer,
   200px open and 80px by default (the layout starts it collapsed), with the
   GoAbroad avatar + "Welcome, {name}", the dashboardRoutes links (icons
   only when collapsed, the route name as a right tooltip) and Logout.
   Only Clients goes anywhere in the prototype: it's where Invoices lives. */

type Route = { path: string; name: string; shortName: string; icon: IconType };

const ROUTES: Route[] = [
    { path: "/dashboard", name: "Dashboard", shortName: "Dashboard", icon: MdDashboard },
    { path: "/client-accounts", name: "Clients", shortName: "Clients", icon: MdPeople },
    { path: "/stats", name: "Client Stats", shortName: "Stats", icon: MdTrendingUp },
    { path: "/ranking-system", name: "Ranking System", shortName: "Rank System", icon: MdSort },
    { path: "/onlineadvisor", name: "Online Advisor", shortName: "OAI", icon: MdQuestionAnswer },
    { path: "/articles", name: "Articles", shortName: "Articles", icon: MdLibraryBooks },
    { path: "/guides", name: "Guides", shortName: "Guides", icon: MdExplore },
    { path: "/interviews", name: "Interviews", shortName: "Interviews", icon: MdSpeakerNotes },
    { path: "/scholarships", name: "Scholarships", shortName: "Scholarships", icon: MdLocalLibrary },
    { path: "/mygoabroad", name: "MyGoAbroad", shortName: "MyGoAbroad", icon: MdCardGiftcard },
    { path: "/url-verifiers", name: "URL Verifiers", shortName: "URL Verifiers", icon: MdLink },
    { path: "/site-tools", name: "Site Tools", shortName: "Site Tools", icon: MdBuild },
];

// ListItem button + the sidebarLink / selected classes
const LINK =
    "group/link box-border flex w-full items-center border-l-[3px] border-solid !border-l-white px-6 py-4 text-left no-underline hover:!border-l-[#4fc3f7] hover:bg-[#e1f5fe]";
const SELECTED = "!border-l-[#4fc3f7] !bg-[#e1f5fe]";

const StaffSidebar = ({ expanded }: { expanded: boolean }) => {
    const pathname = usePathname() ?? "";
    const [confirm, setConfirm] = useState(false);
    // The list sits on /client-accounts/invoices in the real app; the editor
    // matches no route, so nothing is selected there.
    const selectedPath = pathname === BASE ? "/client-accounts" : "";

    return (
        <>
            <DialogBox
                open={confirm}
                actions="OkCancel"
                stringOverride={{ primaryAction: "Logout" }}
                onOk={() => {
                    window.location.href = "/";
                }}
                onCancel={() => setConfirm(false)}
                onClose={() => setConfirm(false)}
            >
                <h6 className="text-center text-[1.25rem] font-medium leading-[1.6] tracking-[0.0075em] text-[#424242]">
                    Do you wish to logout?
                </h6>
            </DialogBox>
            <div className="flex-none">
                <nav
                    aria-label="Internal admin"
                    className={clsx(
                        "relative flex h-screen flex-col items-center overflow-hidden bg-white shadow-[0_2px_15px_0_rgba(0,0,0,0.05)] transition-[width] duration-[225ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                        expanded ? "w-[200px]" : "w-20",
                    )}
                >
                    <div className="flex w-full flex-none p-5">
                        {/* MUI Avatar: a fixed 45px circle that never shrinks,
                            so the welcome text stays clipped when collapsed */}
                        <div className="mr-4 flex size-[45px] shrink-0 overflow-hidden rounded-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={staffAvatar} alt="" className="size-full max-w-none object-cover" />
                        </div>
                        <div className="min-w-0">
                            <p className="mt-[2px] text-[1.2rem] font-bold leading-normal text-[#424242]">
                                Welcome,
                            </p>
                            <p className="whitespace-nowrap text-base leading-normal text-[#424242]">
                                {staffUser.first_name}
                            </p>
                        </div>
                    </div>

                    <ul className="m-0 w-full list-none overflow-y-auto overflow-x-hidden p-0 [scrollbar-width:thin]">
                        {ROUTES.map((route) => {
                            const selected = route.path === selectedPath;
                            const Icon = route.icon;
                            const body = (
                                <span
                                    className={clsx(LINK, selected && SELECTED, route.path === "/client-accounts" ? "cursor-pointer" : "cursor-default")}
                                >
                                    <span
                                        className={clsx(
                                            "inline-flex min-w-14 shrink-0 group-hover/link:text-[#039be5]",
                                            selected ? "text-[#039be5]" : "text-[#bdbdbd]",
                                        )}
                                    >
                                        <Icon className="size-5" />
                                    </span>
                                    <span className="my-1 min-w-0 flex-auto">
                                        <span
                                            className={clsx(
                                                "block whitespace-nowrap text-[0.875rem] leading-[1.5] tracking-[0.00938em] text-[#424242]",
                                                selected && "font-bold",
                                            )}
                                        >
                                            {route.shortName}
                                        </span>
                                    </span>
                                </span>
                            );
                            return (
                                <li key={route.path} className="w-full">
                                    {/* The drawer clips overflow, so the
                                        collapsed tooltips are native titles. */}
                                    {route.path === "/client-accounts" ? (
                                        <Link
                                            href={BASE}
                                            title={expanded ? undefined : route.name}
                                            className="block w-full no-underline"
                                        >
                                            {body}
                                        </Link>
                                    ) : (
                                        <span
                                            title={expanded ? undefined : route.name}
                                            className="block w-full"
                                            aria-disabled="true"
                                        >
                                            {body}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                        <li className="w-full">
                            {expanded ? (
                                <button
                                    type="button"
                                    onClick={() => setConfirm(true)}
                                    className={clsx(LINK, "py-5")}
                                >
                                    <span className="inline-flex min-w-14 shrink-0 text-[#bdbdbd] group-hover/link:text-[#039be5]">
                                        <MdPowerSettingsNew className="size-6" />
                                    </span>
                                    <span className="my-1 block whitespace-nowrap text-[0.875rem] leading-[1.5] text-[#424242]">
                                        Logout
                                    </span>
                                </button>
                            ) : (
                                <span title="Logout" className="flex min-h-[69px] w-full items-center px-4 py-2">
                                        <button
                                            type="button"
                                            aria-label="Logout"
                                            onClick={() => setConfirm(true)}
                                            className="inline-flex items-center justify-center rounded-full p-2 text-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.04)]"
                                        >
                                            <MdPowerSettingsNew className="size-6" />
                                        </button>
                                </span>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default StaffSidebar;
