"use client";

import clsx from "clsx";
import { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { billedFrom } from "../data";
import { invoiceSubtotal, mdy, money, toCurrency } from "../format";
import { BODY1, BODY2, Divider, H6, OVERLINE, Paper } from "../mui";
import type { Invoice, InvoiceItem as Item, PlacementLabel } from "../types";

/* The sections of src/views/ClientAdmin/Tools/ViewInvoice: Header.js,
   InvoiceItem.js, InvoiceSummary.js, PaymentTerms.js, Payments.js and
   Message.js. Shared by staff (/invoice/view/:id) and clients, who see the
   same page. Classes copy each file's withStyles block; the theme's
   0 2px 15px shadow is on every Paper. */

/** Overline labels these files recolour with `rowLabels` / `headerLabel`. */
const LABEL = clsx(OVERLINE, "!text-[#757575]");
/** Head cells: MUI TableCell (padding 16) with the theme's border. */
const HEAD_CELL = "border-b border-solid !border-[rgba(224,224,224,1)] p-4 text-center align-middle leading-[1.3]";
/** Body cells in Payment Terms / Payment History (`field`: 0.8em). */
const FIELD_CELL = "border-b border-solid !border-[rgba(224,224,224,1)] p-4 text-center align-middle text-[0.8em] leading-[1.3] text-[rgba(0,0,0,0.87)]";

/* ── Header.js ────────────────────────────────────────────────────────── */

export const InvoiceHeader = ({ invoice }: { invoice: Invoice }) => {
    const billing = invoice.billing_address.split("\n");
    return (
        <Paper className="mb-8 p-4">
            <header className="grid grid-cols-3 gap-4">
                <section>
                    <span className={clsx(LABEL, "block")}>Billed from</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="my-4 block w-[100px]" src={billedFrom.logo} alt="GoAbroad" />
                    <h6 className={clsx(H6, "pb-2 !leading-[1em]")}>{billedFrom.name}</h6>
                    {billedFrom.lines.map((line) => (
                        <p key={line} className={BODY1}>
                            {line}
                        </p>
                    ))}
                </section>
                <section>
                    <span className={clsx(LABEL, "block")}>Billed to</span>
                    <h6 className={clsx(H6, "pb-2 !leading-[1em]")}>{invoice.billing_name}</h6>
                    {billing.map((line, i) => (
                        <p key={i} className={clsx(BODY1, "min-h-5")}>
                            {line}
                        </p>
                    ))}
                </section>
                <section>
                    {/* The labels carry the invoiceDate / invoiceNumber classes
                        too, so they're flex columns aligned right. */}
                    <div className="mb-5 flex flex-col items-end">
                        <span className={clsx(LABEL, "mb-2 flex flex-col items-end")}>Invoice Date</span>
                        <h6 className={clsx(H6, "pb-2 !leading-[1em]")}>{mdy(invoice.printed_date)}</h6>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={clsx(LABEL, "flex flex-col items-end")}>Invoice Number</span>
                        <h6 className={clsx(H6, "!leading-[1em]")}>{invoice.id}</h6>
                    </div>
                </section>
            </header>
        </Paper>
    );
};

/* ── InvoiceItem.js ───────────────────────────────────────────────────── */

const placementsToArray = (p: PlacementLabel) => {
    const label: string[] = [];
    if (p.location) label.push(p.location);
    if (p.online) label.push(p.online);
    if (p.type) label.push(p.type);
    if (p.timing) label.push(p.timing);
    if (!label.length && p.directory) label.push(p.directory);
    return label;
};

export const InvoiceItem = ({ item, index, expand }: { item: Item; index: number; expand: boolean }) => {
    const [expanded, setExpanded] = useState(false);
    const open = expanded || expand;
    const cell = "p-4 text-center align-middle text-[0.8215rem] leading-[1.3] text-[rgba(0,0,0,0.87)]";

    return (
        <Paper className="mt-8 p-2">
            {/* invoiceItemSummary: no cell borders */}
            <table className="w-full border-collapse">
                <thead className="h-[42px]">
                    <tr>
                        <th className="min-w-[300px] p-4 text-center font-normal">
                            <span className={clsx(LABEL, "text-center")}>Invoice Item</span>
                        </th>
                        <th className="min-w-[300px] p-4 text-center font-normal">
                            <span className={clsx(LABEL, "text-center")}>Ad Placements</span>
                        </th>
                        <th className="p-4 text-center font-normal">
                            <span className={clsx(LABEL, "text-center")}>Start Date</span>
                        </th>
                        <th className="p-4 text-center font-normal">
                            <span className={clsx(LABEL, "text-center")}>End Date</span>
                        </th>
                        <th className="p-4 text-center font-normal">
                            <span className={clsx(LABEL, "text-center")}>Quantity</span>
                        </th>
                        <th className="p-4 text-center font-normal">
                            <span className={clsx(LABEL, "text-center")}>Subtotal</span>
                        </th>
                        <th className="p-0" />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={clsx(cell, "min-w-[300px]")} data-cy={`invoice-item-name${index}`}>
                            {item.product_item_name}
                        </td>
                        <td className={clsx(cell, "min-w-[300px]")}>
                            <div>
                                <span>{item.placements_label.map((p) => placementsToArray(p).join(", ")).join(", ")}</span>
                            </div>
                        </td>
                        <td className={cell}>{mdy(item.start_date)}</td>
                        <td className={cell}>{mdy(item.end_date)}</td>
                        <td className={cell}>{item.placements_label.length}</td>
                        <td className={cell}>{money(item.subtotal)}</td>
                        <td className="p-0 text-right">
                            <button
                                type="button"
                                aria-expanded={open}
                                aria-label="Show more"
                                onClick={() => setExpanded(!open)}
                                className={clsx(
                                    "ml-auto inline-flex items-center justify-center rounded-full p-2 text-[rgba(0,0,0,0.54)] transition-transform duration-150 hover:bg-[rgba(0,0,0,0.04)]",
                                    open && "rotate-180",
                                )}
                            >
                                <MdExpandMore className="size-6" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {open && (
                <div className="mt-8 px-6 pb-6">
                    <div className="flex justify-end">
                        <div className="w-1/2">
                            <div className="grid grid-cols-[6fr_3fr_3fr] gap-x-4">
                                <span className={clsx(LABEL, "text-center")}>Placement</span>
                                <span className={clsx(LABEL, "text-center")}>Discount</span>
                                <span className={clsx(LABEL, "text-center")}>Amount</span>
                            </div>
                            {item.placements_label.map((placement, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-[6fr_3fr_3fr] items-center gap-x-4 border-t border-solid !border-[#eeeeee] py-2 last:border-b"
                                >
                                    <p className={clsx(BODY1, "text-left")}>
                                        {placement.location !== "No Placement"
                                            ? placementsToArray(placement).join(" ")
                                            : "No Placement"}
                                    </p>
                                    <p className={clsx(BODY1, "text-left")}>{money(item.placements[i]?.discount ?? 0)}</p>
                                    <p className={clsx(BODY1, "text-left")}>{money(item.cost)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Paper>
    );
};

/* ── InvoiceSummary.js ────────────────────────────────────────────────── */

export const InvoiceSummary = ({ invoice }: { invoice: Invoice }) => {
    const subtotal = invoiceSubtotal(invoice);
    const discount = Number(invoice.discount) || 0;
    const upcharge = Number(invoice.upcharge) || 0;
    const processingFees =
        invoice.status === 5
            ? invoice.payments.reduce(
                  (sum, p) => (p.total_amount > p.amount ? sum + (p.total_amount - p.amount) : sum),
                  0,
              )
            : 0;
    const totalFees = upcharge + processingFees;
    const row = "flex items-center justify-between";

    return (
        <Paper className="my-8 p-6">
            <div className={row}>
                <p className={BODY1}>Subtotal</p>
                <p className={BODY1}>{money(subtotal)}</p>
            </div>
            <Divider className="my-4" />
            {/* Always "Total Discount", even at $0, as the real summary does */}
            <div className={row}>
                <p className={BODY1}>Total Discount</p>
                <p className={BODY1}>-{money(discount)}</p>
            </div>
            <Divider className="my-4" />
            {processingFees > 0 && (
                <Fragment>
                    <div className={row}>
                        <p className={BODY1}>Transaction Fees</p>
                        <p className={BODY1}>+{money(processingFees)}</p>
                    </div>
                    <Divider className="my-4" />
                </Fragment>
            )}
            {!(upcharge === 0 && processingFees > 0) && (
                <Fragment>
                    <div className={row}>
                        <p className={BODY1}>Total Fees</p>
                        <p className={BODY1}>+{money(totalFees)}</p>
                    </div>
                    <Divider className="my-4" />
                </Fragment>
            )}
            <div className={row}>
                <p className={BODY2}>Invoice Total (USD)</p>
                <p className={BODY1}>{money(subtotal - discount + totalFees)}*</p>
            </div>
        </Paper>
    );
};

/* ── PaymentTerms.js / Payments.js ────────────────────────────────────── */

const SmallTable = ({
    title,
    heads,
    children,
}: {
    title: string;
    heads: [string, string];
    children: React.ReactNode;
}) => (
    <Paper className="mt-8 p-6">
        <p className={BODY1}>{title}</p>
        <Divider className="mt-4" />
        <table className="mt-0 w-full border-collapse">
            <thead className="h-[42px]">
                <tr>
                    {heads.map((h) => (
                        <th key={h} className={clsx(HEAD_CELL, "font-normal")}>
                            <span className={clsx(LABEL, "text-center")}>{h}</span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    </Paper>
);

export const PaymentTerms = ({ invoice }: { invoice: Invoice }) => (
    <SmallTable title="Payment Terms" heads={["Due Date", "Amount Due"]}>
        {invoice.payment_terms.map((term) => (
            <tr key={term.id}>
                <td className={FIELD_CELL}>{mdy(term.due_date)}</td>
                <td className={FIELD_CELL}>{toCurrency(term.amount_due)}</td>
            </tr>
        ))}
    </SmallTable>
);

export const Payments = ({ invoice }: { invoice: Invoice }) => (
    <SmallTable title="Payment History" heads={["Payment Date", "Payment Amount"]}>
        {invoice.payments.length > 0 ? (
            invoice.payments.map((p) => (
                <tr key={p.id}>
                    <td className={FIELD_CELL}>{p.date_created ? mdy(p.date_created) : "N/A"}</td>
                    <td className={FIELD_CELL}>{toCurrency(p.total_amount > 0 ? p.total_amount : p.amount)}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={2} className="border-b border-solid !border-[rgba(224,224,224,1)] p-4 text-center text-[0.8215rem] leading-[1.3] text-[rgba(0,0,0,0.87)]">
                    No Payments Yet
                </td>
            </tr>
        )}
    </SmallTable>
);

/* ── Message.js ───────────────────────────────────────────────────────── */

export const Message = ({ message }: { message: string | null }) => (
    <Paper className="my-8 p-6">
        <p className={BODY1}>Message</p>
        {/* A <p> around a Typography <p> in the real file; a div here so the
            server render stays valid HTML (Preflight zeroes both margins). */}
        <div>
            <p className={BODY1}>{message ? message : "No Message"}</p>
        </div>
    </Paper>
);
