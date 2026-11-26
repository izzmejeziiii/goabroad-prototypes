"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Building2, RotateCcw, UserRound } from "lucide-react";
import { useState } from "react";
import { BASE, client } from "./data";
import Dialog from "./redesign/Dialog";
import { useInvoices } from "./store";

/* Prototype-only control: flips between the internal (staff) admin and the
   client admin, landing on the matching page, and resets the demo. In the
   redesign's light style (white card, slate segmented control, cobalt
   text), bottom right, or top right on the editor where the bottom is busy.

   Internal list        ↔ client Invoices list
   Internal view / edit ↔ client view of the same invoice (when the client
                          can see it: its own, not a draft) */

const ViewSwitcher = () => {
    const pathname = usePathname() ?? "";
    const params = useSearchParams();
    const { getInvoice, reset } = useInvoices();
    const [confirmReset, setConfirmReset] = useState(false);

    const isClient =
        pathname.startsWith(`${BASE}/client-admin`) ||
        (pathname.startsWith(`${BASE}/invoice/view`) && params.get("view") === "client") ||
        (pathname.startsWith(`${BASE}/invoice/success`) && params.get("view") !== "staff");

    const id = pathname.match(/\/invoice\/(?:view|edit)\/(\d+)/)?.[1];
    const inv = id ? getInvoice(id) : undefined;
    const clientCanSee = !!inv && inv.provider_id === client.id && inv.status !== 0;

    const staffHref = id && inv ? `${BASE}/invoice/view/${id}` : BASE;
    const clientHref = clientCanSee ? `${BASE}/invoice/view/${id}?view=client` : `${BASE}/client-admin/invoices`;

    const options = [
        { id: "staff", label: "Internal admin", icon: Building2, href: staffHref, active: !isClient },
        { id: "client", label: "Client admin", icon: UserRound, href: clientHref, active: isClient },
    ];

    // On the editor the app bar's right side is empty and the bottom is
    // busy, so sit up there, without the labels below 2xl
    const inEditor = /\/invoice\/(create|edit)/.test(pathname);

    return (
        <>
            <nav
                aria-label="Admin view"
                className={clsx(
                    "fixed right-5 z-[1150] flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-2xl bg-white p-1.5 font-inter text-slate-700 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.25)] ring-1 ring-slate-200 antialiased",
                    inEditor ? "top-[14px]" : "bottom-5",
                )}
            >
                <span
                    className={clsx(
                        "ml-1 hidden shrink-0 rounded-md bg-sun-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cobalt-700",
                        inEditor ? "2xl:inline" : "sm:inline",
                    )}
                >
                    Prototype
                </span>
                <span className={clsx("hidden shrink-0 text-xs font-medium text-slate-500", inEditor ? "2xl:inline" : "lg:inline")}>View as</span>
                <div className="flex items-center gap-0.5 rounded-xl bg-slate-100 p-1">
                    {options.map((o) => (
                        <Link
                            key={o.id}
                            href={o.href}
                            aria-current={o.active ? "page" : undefined}
                            className={clsx(
                                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold no-underline transition-colors",
                                o.active ? "bg-white !text-cobalt-700 shadow-sm ring-1 ring-slate-200" : "!text-slate-600 hover:!text-slate-900",
                            )}
                        >
                            <o.icon className="size-3.5" aria-hidden />
                            {o.label}
                        </Link>
                    ))}
                </div>
                <span className="h-6 w-px bg-slate-200" aria-hidden />
                <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    title="Clear payments, comments and edits made in this browser"
                >
                    <RotateCcw className="size-3.5" aria-hidden />
                    Reset
                </button>
            </nav>
            {confirmReset && (
                <Dialog
                    title="Reset the demo?"
                    body="Reset the demo invoices? Payments and comments you added will be cleared."
                    primary={{
                        label: "Reset",
                        onClick: () => {
                            reset();
                            setConfirmReset(false);
                        },
                    }}
                    onClose={() => setConfirmReset(false)}
                />
            )}
        </>
    );
};

export default ViewSwitcher;
