"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import {
    MdAccountBalanceWallet,
    MdArrowDropDown,
    MdBarChart,
    MdClose,
    MdCloudDownload,
    MdDescription,
    MdLabel,
    MdMonetizationOn,
    MdNotes,
    MdReceipt,
    MdStorage,
} from "react-icons/md";
import { BASE } from "../../data";
import { H6, Menu, MenuItem } from "../../mui";

/* Copy of src/components/Header/Header.js: a white absolute MUI AppBar
   (80px toolbar, theme shadow) beside the sidebar, with the expand toggle
   (Notes icon, Close when open), the page title, and the page's CTAs.

   Titles follow makeBrand(): the list sits on /client-accounts/invoices,
   which customHeaderNames maps to "Client Invoices". The editor's path
   (/invoice/edit/:id) matches no route but the "/" redirect, so the real
   header shows "Dashboard" there, and so does this copy. */

const CONTAINED_SHADOW =
    "shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]";

const MENU = [
    { label: "Report", icon: MdCloudDownload },
    { label: "Invoice Terms", icon: MdReceipt },
    { label: "Sales & Collections", icon: MdMonetizationOn },
    { label: "Collections", icon: MdAccountBalanceWallet },
    { label: "Invoice Item Sales", icon: MdBarChart },
    { label: "Sales By Directory", icon: MdStorage },
    { label: "Sales By Sale Type", icon: MdLabel },
];

const InvoicesCTA = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative mr-4">
            {/* ButtonGroup variant="contained" size="large" */}
            <div className={clsx("inline-flex rounded-[4px]", CONTAINED_SHADOW)}>
                <Link
                    href={`${BASE}/invoice/create`}
                    id="create-invoice-btn"
                    className="inline-flex min-w-10 items-center justify-center rounded-l-[4px] border-r border-solid !border-r-[#0288d1] bg-[#03a9f4] px-[22px] py-2 text-[0.9375rem] font-medium uppercase leading-[1.75] tracking-[0.02857em] !text-white no-underline transition-colors hover:bg-[#0288d1]"
                >
                    <MdDescription className="mr-2 size-6 text-white" />
                    Create Invoice
                </Link>
                <button
                    type="button"
                    aria-label="More invoice tools"
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={() => setOpen(true)}
                    className="inline-flex min-w-10 items-center justify-center rounded-r-[4px] bg-[#03a9f4] px-[10px] py-1 text-white transition-colors hover:bg-[#0288d1]"
                >
                    <MdArrowDropDown className="size-6 text-white" />
                </button>
            </div>
            <Menu open={open} onClose={() => setOpen(false)} className="right-0 top-full">
                {MENU.map(({ label, icon: Icon }) => (
                    <MenuItem key={label} onClick={() => setOpen(false)}>
                        <Icon className="mr-2 size-6 text-[rgba(0,0,0,0.54)]" />
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

const StaffHeader = ({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) => {
    const pathname = usePathname() ?? "";
    const onList = pathname === BASE;
    const title = onList ? "Client Invoices" : "Dashboard";

    return (
        <header
            className={clsx(
                "absolute right-0 top-0 z-[1100] flex flex-col bg-white shadow-[0_2px_15px_0_rgba(0,0,0,0.05)] transition-[width,margin] duration-[195ms] ease-[cubic-bezier(0.4,0,0.6,1)]",
                expanded ? "w-[calc(100%-200px)]" : "w-[calc(100%-80px)]",
            )}
        >
            <div className="relative flex min-h-20 items-center px-4">
                <button
                    type="button"
                    aria-label="Expand Sidebar"
                    onClick={onToggle}
                    className="mr-4 inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[#9e9e9e] transition-colors hover:bg-black/[0.04]"
                >
                    {expanded ? <MdClose className="size-6" /> : <MdNotes className="size-6" />}
                </button>
                <h1 className={clsx(H6, "truncate")}>{title}</h1>
                <div className="grow" />
                {onList && <InvoicesCTA />}
            </div>
        </header>
    );
};

export default StaffHeader;
