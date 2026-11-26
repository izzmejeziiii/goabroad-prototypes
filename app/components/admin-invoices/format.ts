import { DEMO_TODAY } from "./data";
import type { Invoice, InvoiceStatus, PaymentStatusName, PaymentTerm } from "./types";

/* Formatting and the derived numbers every page shares, so the list rows,
   the editor and the view page always agree. */

/** `$1,234.56`, the admin's toFixed(2) + thousands regex. */
export const money = (n: number) =>
    `$${(Math.round((Number(n) || 0) * 100) / 100)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

/** toCurrency(): Intl USD. Same output as money() for positive values. */
export const toCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        Number(n) || 0,
    );

const pad = (n: number) => String(n).padStart(2, "0");

/** Parses "yyyy-MM-dd" or "yyyy-MM-dd HH:mm:ss" as a local date. */
export const parseDate = (value: string | null | undefined): Date | null => {
    if (!value || value.startsWith("0000-00-00")) return null;
    const [d, t = "00:00:00"] = value.split(" ");
    const [y, m, day] = d.split("-").map(Number);
    const [hh, mm, ss] = t.split(":").map(Number);
    return new Date(y, m - 1, day, hh || 0, mm || 0, ss || 0);
};

/** date-fns 'MM/dd/yyyy'. */
export const mdy = (value: string | null | undefined) => {
    const d = parseDate(value);
    return d ? `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}` : "";
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** date-fns 'MMM d, yyyy'. */
export const mdyLong = (value: string | null | undefined) => {
    const d = parseDate(value);
    return d ? `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : "";
};

/** "yyyy-MM-dd" for a Date. */
export const isoDate = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const today = () => parseDate(DEMO_TODAY) as Date;

/** "yyyy-MM-dd HH:mm:ss" for now, on the demo day. */
export const nowStamp = () => {
    const n = new Date();
    return `${DEMO_TODAY} ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
};

/* ── Invoice math ─────────────────────────────────────────────────────── */

export const invoiceSubtotal = (inv: Invoice) =>
    inv.invoice_items.reduce((sum, i) => sum + i.subtotal, 0);

/** Subtotal − discount + upcharge: what the invoice is for. */
export const invoiceTotal = (inv: Invoice) =>
    invoiceSubtotal(inv) - (Number(inv.discount) || 0) + (Number(inv.upcharge) || 0);

export const amountPaid = (inv: Invoice) =>
    inv.payments.reduce((sum, p) => sum + p.amount, 0);

/** What is left to pay on the whole invoice. */
export const invoiceBalance = (inv: Invoice) =>
    Math.max(0, Math.round((invoiceTotal(inv) - amountPaid(inv)) * 100) / 100);

const termLeft = (t: PaymentTerm) => Math.max(0, t.amount_due - t.amount_paid);

/** What is due now: every overdue term plus the next unpaid one. */
export const invoiceAmountDue = (inv: Invoice) => {
    if (inv.status === 5 || inv.status === 6) return 0;
    const now = today();
    const open = inv.payment_terms
        .filter((t) => termLeft(t) > 0)
        .sort((a, b) => a.due_date.localeCompare(b.due_date));
    if (!open.length) return invoiceBalance(inv);
    const overdue = open.filter((t) => (parseDate(t.due_date) as Date) < now);
    const next = open.find((t) => (parseDate(t.due_date) as Date) >= now);
    return [...overdue, ...(next ? [next] : [])].reduce((s, t) => s + termLeft(t), 0);
};

/** The invoice's due date: the earliest term still open (or the last term). */
export const invoiceDueDate = (inv: Invoice) => {
    const sorted = [...inv.payment_terms].sort((a, b) => a.due_date.localeCompare(b.due_date));
    const open = sorted.find((t) => termLeft(t) > 0);
    return (open ?? sorted[sorted.length - 1])?.due_date.slice(0, 10) ?? "";
};

/** Recomputes the status after payments change. Draft, pending and void
    are set by staff and stay as they are. */
export const deriveStatus = (inv: Invoice): InvoiceStatus => {
    if (inv.status === 0 || inv.status === 1 || inv.status === 6) return inv.status;
    if (invoiceBalance(inv) <= 0) return 5;
    const now = today();
    const overdue = inv.payment_terms.some(
        (t) => termLeft(t) > 0 && (parseDate(t.due_date) as Date) < now,
    );
    if (overdue) return 4;
    if (amountPaid(inv) > 0) return 3;
    const due = parseDate(invoiceDueDate(inv));
    if (due && (due.getTime() - now.getTime()) / 86400000 <= 7) return 7;
    return 2;
};

export const STATUS_NAMES: Record<InvoiceStatus, PaymentStatusName> = {
    0: "draft",
    1: "pending",
    2: "unpaid",
    3: "partial",
    4: "overdue",
    5: "paid",
    6: "void",
    7: "near due",
};

export const paymentStatusName = (inv: Invoice): PaymentStatusName =>
    STATUS_NAMES[inv.status];

/** The row the invoice lists read (the proxy's list shape). */
export const toRow = (inv: Invoice) => {
    const latest = [...inv.comments].sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];
    return {
        ...inv,
        invoice_date: inv.printed_date,
        due_date: invoiceDueDate(inv),
        payment_status: paymentStatusName(inv),
        total_amount: invoiceTotal(inv),
        amount_due: invoiceAmountDue(inv),
        balance: invoiceBalance(inv),
        latest_comment: latest?.message ?? "",
        comment_count: inv.comments.length,
        open: inv.status !== 5 && inv.status !== 6,
    };
};

export type InvoiceRow = ReturnType<typeof toRow>;
