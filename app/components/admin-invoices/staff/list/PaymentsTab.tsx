"use client";

import clsx from "clsx";
import Link from "next/link";
import { MdDescription, MdEdit } from "react-icons/md";
import { BASE } from "../../data";
import { mdy, parseDate, today } from "../../format";
import { buttonClasses, Paper } from "../../mui";
import type { PaymentTerm } from "../../types";
import { CELL } from "../../results-table/context";

/* Copy of src/views/Client/Invoices/PaymentsTab.js: the invoice's payment
   terms in a small table (Payment Due Date / Amount Due / Payment Status,
   the status in green or red caps with a pencil that opens Edit Payment),
   and the big View Invoice button pinned to the bottom of the drawer.
   Kept quirk: a fully paid term shows its whole amount as "Amount Due"
   (amount_due - amount_paid only when they differ). */

const STATUS_COLOR: Record<string, string> = {
    paid: "text-[#4caf50]",
    partial: "text-[#4caf50]",
    overdue: "text-[#f44336]",
    unpaid: "text-[#f44336]",
};

const getStatus = (term: PaymentTerm) => {
    if (term.amount_due <= term.amount_paid) return "paid";
    // isOverdue(): before today's midnight
    if ((parseDate(term.due_date) as Date) < today()) return "overdue";
    if (term.amount_paid === 0) return "unpaid";
    return "partial";
};

const amountDue = (term: PaymentTerm) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        term.amount_due !== term.amount_paid ? term.amount_due - term.amount_paid : term.amount_due,
    );

const TH = `${CELL} p-4 text-[0.75rem] font-medium !leading-none text-[rgba(0,0,0,0.54)]`;
const TD = `${CELL} p-4 text-[0.8215rem] text-[rgba(0,0,0,0.87)]`;

const PaymentsTab = ({
    paymentTerms,
    invoiceId,
    onEditPayment,
}: {
    paymentTerms: PaymentTerm[];
    invoiceId: number;
    onEditPayment: (termIndex: number) => void;
}) => (
    <div className="flex h-full flex-grow flex-col justify-between p-0">
        <Paper>
            <div>
                <table className="table w-full border-collapse border-spacing-0 [&_tr:last-child_td]:border-b-0">
                    <thead className="h-[42px]">
                        <tr className="cursor-pointer select-none align-middle">
                            <th className={TH}>Payment Due Date</th>
                            <th className={TH}>Amount Due</th>
                            <th className={TH}>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentTerms.map((term, index) => {
                            const status = getStatus(term);
                            return (
                                <tr key={term.id} className="cursor-pointer select-none align-middle">
                                    <td className={TD}>{term.due_date === "0000-00-00 00:00:00" ? "" : mdy(term.due_date)}</td>
                                    <td className={TD}>{amountDue(term)}</td>
                                    <td className={TD}>
                                        <span className={STATUS_COLOR[status]}>{status.toUpperCase()}</span>{" "}
                                        <button
                                            type="button"
                                            onClick={() => onEditPayment(index)}
                                            className="inline-flex items-center justify-center rounded-full p-[5px] align-middle text-[rgba(0,0,0,0.54)] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
                                        >
                                            <MdEdit className="size-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Paper>
        <Link href={`${BASE}/invoice/view/${invoiceId}`} className="!no-underline">
            <span className={clsx(buttonClasses({ variant: "contained", color: "primary", size: "large", fullWidth: true }))}>
                <MdDescription className="size-5" /> &nbsp; View Invoice
            </span>
        </Link>
    </div>
);

export default PaymentsTab;
