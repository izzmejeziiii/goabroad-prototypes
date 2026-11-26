"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import {
    MdKeyboardArrowLeft,
    MdNotes,
    MdPermPhoneMsg,
    MdSettings,
    MdOutlineShoppingCart,
} from "react-icons/md";
import { BASE, client } from "../../data";
import { mdy, money, toRow } from "../../format";
import { useInvoices } from "../../store";
import {
    BODY2,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    H6,
    SUBTITLE2,
    TD,
    TH,
    Tooltip,
} from "../../mui";

/* Copy of src/views/ClientAdmin/Header.js (origin/dev): the white 80px
   AppBar with the menu toggle, the client's name, and on the right the
   Create Ad cart (empty: a popover offering Create an Ad), the outlined
   Create Ad button, Pay Now for paying clients with due invoices (a red dot
   when one is overdue) and the phone / settings icons. Pay Now opens the
   "Invoices" dialog (Invoices/InvoicesList.js). */

const ICON_BUTTON =
    "inline-flex shrink-0 items-center justify-center rounded-full text-[#9e9e9e] transition-colors hover:bg-black/[0.04]";

/** InvoicesList.js: the due invoices (payment_status 2,3,4) with View & Pay.
    The "Invoice Date" column prints the due date, as the real one does. */
const DueInvoicesTable = ({ onPay }: { onPay: (id: number) => void }) => {
    const { invoices } = useInvoices();
    const due = invoices
        .filter((i) => i.provider_id === client.id && [2, 3, 4, 7].includes(i.status))
        .map(toRow);
    return (
        <div className="flex flex-col">
            <table className="w-full min-w-[650px] border-collapse [&_tbody_tr:nth-child(even)]:bg-[#f2f2f2]">
                <thead className="h-[42px]">
                    <tr>
                        {["Invoice Number", "Invoice Date", "Invoice Status", "Amount Due", "Balance", "Action"].map(
                            (h) => (
                                <th key={h} className={clsx(TH, "text-left")}>
                                    {h}
                                </th>
                            ),
                        )}
                    </tr>
                </thead>
                <tbody>
                    {due.map((inv) => (
                        <tr key={inv.id}>
                            <td className={TD}>{inv.id}</td>
                            <td className={TD}>{mdy(inv.due_date)}</td>
                            <td className={TD}>{inv.payment_status.toUpperCase()}</td>
                            <td className={TD}>{money(inv.amount_due)}</td>
                            <td className={TD}>{money(inv.balance)}</td>
                            <td className={TD}>
                                <Button variant="contained" color="primary" onClick={() => onPay(inv.id)}>
                                    View &amp; Pay
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ClientHeader = ({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) => {
    const router = useRouter();
    const { invoices } = useInvoices();
    const [listOpen, setListOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const due = invoices.filter((i) => i.provider_id === client.id && [2, 3, 4, 7].includes(i.status));
    const isOverdue = due.some((i) => i.status === 4);

    const openPayNow = () => {
        // A single due invoice skips the list and opens its payment dialog
        if (due.length === 1) router.push(`${BASE}/invoice/view/${due[0].id}?view=client&openPayment`);
        else setListOpen(true);
    };

    return (
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
                        {expanded ? <MdKeyboardArrowLeft className="size-6" /> : <MdNotes className="size-6" />}
                    </button>
                </Tooltip>

                <h1 className={clsx(H6, "truncate")}>{client.name}</h1>

                <div className="grow" />

                {/* Create Ad cart: empty, so it opens the "create an ad" popover */}
                <div className="relative mr-6">
                    <Tooltip title="Your cart">
                        <button
                            type="button"
                            aria-label="Your cart is empty"
                            onClick={() => setCartOpen(true)}
                            className={clsx(ICON_BUTTON, "p-3")}
                        >
                            <MdOutlineShoppingCart className="size-6" />
                        </button>
                    </Tooltip>
                    {cartOpen && (
                        <>
                            <div className="fixed inset-0 z-[1300]" aria-hidden="true" onClick={() => setCartOpen(false)} />
                            <div className="absolute right-0 top-full z-[1301] w-[260px] rounded-[4px] bg-white p-4 shadow-[0px_5px_5px_-3px_rgba(0,0,0,0.2),0px_8px_10px_1px_rgba(0,0,0,0.14),0px_3px_14px_2px_rgba(0,0,0,0.12)]">
                                <p className={clsx(SUBTITLE2, "mb-[0.35em]")}>Your cart is empty</p>
                                <p className={clsx(BODY2, "mb-4 !text-[rgba(0,0,0,0.6)]")}>
                                    Create an ad to start your campaign.
                                </p>
                                <Button variant="contained" color="primary" fullWidth onClick={() => setCartOpen(false)}>
                                    Create an Ad
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                <Button variant="outlined" color="primary" className="mr-6">
                    Create Ad
                </Button>

                {client.is_paying === 1 && due.length > 0 && (
                    <Tooltip title={isOverdue ? "Payment Overdue" : "Pay Now"}>
                        <span className="relative inline-flex">
                            <Button variant="contained" color="primary" className="mr-6" onClick={openPayNow}>
                                Pay Now
                            </Button>
                            {isOverdue && (
                                // Badge variant="dot", color secondary, with the
                                // makePayment class (right 17, 5px red border)
                                <span className="absolute right-[17px] top-0 box-border size-2 -translate-y-1/2 translate-x-1/2 rounded-[4px] border-[5px] border-solid !border-[#f44336] bg-[#e91e63]" />
                            )}
                        </span>
                    </Tooltip>
                )}

                <Tooltip title="Contact Account Manager">
                    <button type="button" aria-label="Contact Account Manager" className={clsx(ICON_BUTTON, "mr-2 p-2")}>
                        <MdPermPhoneMsg className="size-6" />
                    </button>
                </Tooltip>

                <Tooltip title="Settings">
                    <button type="button" aria-label="Settings" className={clsx(ICON_BUTTON, "p-2")}>
                        <MdSettings className="size-6" />
                    </button>
                </Tooltip>
            </div>

            <Dialog
                open={listOpen}
                onClose={() => setListOpen(false)}
                maxWidth="max-w-[1000px]"
                paperClassName="w-full min-h-[400px] max-h-[75vh] p-6"
            >
                <DialogTitle>Invoices</DialogTitle>
                <DueInvoicesTable
                    onPay={(id) => {
                        setListOpen(false);
                        router.push(`${BASE}/invoice/view/${id}?view=client&openPayment`);
                    }}
                />
                <DialogActions className="mt-auto">
                    <Button variant="contained" color="secondary" className="min-w-[120px]" onClick={() => setListOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </header>
    );
};

export default ClientHeader;
