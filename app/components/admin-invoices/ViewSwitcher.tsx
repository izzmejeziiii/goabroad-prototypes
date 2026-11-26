"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { BASE, client } from "./data";
import { useInvoices } from "./store";

/* Prototype-only control: flips between the internal (staff) admin and the
   client admin, landing on the matching page. In the brand-blue pill the
   other prototypes' toggles use, bottom right so it clears the view page's
   centred Pay Now bar.

   Internal list        ↔ client Invoices list
   Internal view / edit ↔ client view of the same invoice (when the client
                          can see it: its own, not a draft) */

const BRAND_BLUE = "#295d82";

const ViewSwitcher = () => {
    const pathname = usePathname() ?? "";
    const params = useSearchParams();
    const { getInvoice, reset } = useInvoices();

    const isClient =
        pathname.startsWith(`${BASE}/client-admin`) ||
        (pathname.startsWith(`${BASE}/invoice/view`) && params.get("view") === "client") ||
        (pathname.startsWith(`${BASE}/invoice/success`) && params.get("view") !== "staff");

    const id = pathname.match(/\/invoice\/(?:view|edit)\/(\d+)/)?.[1];
    const inv = id ? getInvoice(id) : undefined;
    const clientCanSee = !!inv && inv.provider_id === client.id && inv.status !== 0;

    const staffHref = id && inv ? `${BASE}/invoice/view/${id}` : BASE;
    const clientHref = clientCanSee
        ? `${BASE}/invoice/view/${id}?view=client`
        : `${BASE}/client-admin/invoices`;

    const options = [
        { id: "staff", label: "Internal admin", href: staffHref, active: !isClient },
        { id: "client", label: "Client admin", href: clientHref, active: isClient },
    ];

    return (
        <nav
            aria-label="Admin view"
            className="fixed bottom-5 right-5 z-[1150] flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full p-1 pl-3 font-inter text-white shadow-lg"
            style={{ background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, #1f4d6e 100%)` }}
        >
            <span className="hidden shrink-0 rounded bg-sun-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 sm:inline">
                Prototype
            </span>
            <span className="hidden shrink-0 text-xs font-medium text-white/80 lg:inline">View as</span>
            <div className="flex items-center gap-0.5 rounded-full bg-white/10 p-0.5">
                {options.map((o) => (
                    <Link
                        key={o.id}
                        href={o.href}
                        aria-current={o.active ? "page" : undefined}
                        className={clsx(
                            "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold no-underline transition-colors",
                            o.active ? "bg-white shadow-sm" : "!text-white/80 hover:!text-white",
                        )}
                        style={o.active ? { color: BRAND_BLUE } : undefined}
                    >
                        {o.label}
                    </Link>
                ))}
            </div>
            <button
                type="button"
                onClick={() => {
                    if (window.confirm("Reset the demo invoices? Payments and comments you added will be cleared.")) reset();
                }}
                className="shrink-0 rounded-full px-2 py-1.5 text-xs font-medium text-white/70 transition-colors hover:text-white"
                title="Clear payments, comments and edits made in this browser"
            >
                Reset
            </button>
        </nav>
    );
};

export default ViewSwitcher;
