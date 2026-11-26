import { BAND, BODY, COBALT, FERN, INK, LEFT, MUTED, PAGE_H, Page, RIGHT, ROMAN, wrap, type Font, type RGB } from "../../invoice-tool/invoicePdf";
import { business } from "../../invoice-tool/data";
import { WIRE_DETAILS, billedFrom } from "../data";
import { mdyLong, money, toCurrency } from "../format";
import { assemble } from "../redesign/invoicePdf";
import type { Invoice, PendingPayment } from "../types";
import { EXCHANGE_NOTE, adPlacements, paymentAmount, placementText, summaryOf } from "./staffView";

/* The internal View invoice as a PDF: the same content as the page (the
   original view's), drawn with /invoice-tool's PDF helpers. Like the
   original's print, every item shows its placements. Long invoices carry on
   to more pages. */

/** mui.tsx pendingPaymentText, without pulling the UI into the PDF code. */
const pendingText = (pp: PendingPayment) => `Bank payment of ${toCurrency(pp.amount)} processing${pp.since ? ` since ${mdyLong(pp.since)}` : ""}`;

const TOP = 60;
const BOTTOM = PAGE_H - 70;

export function viewInvoicePdf(inv: Invoice): Uint8Array<ArrayBuffer> {
    const pages: Page[] = [new Page()];
    let p = pages[0];
    let y = 0;
    const ensure = (height: number) => {
        if (y + height <= BOTTOM) return false;
        p = new Page();
        pages.push(p);
        y = TOP;
        return true;
    };
    const lines = (text: string, size: number, width: number, font: Font = "R") => wrap(text, font, size, width);

    /* Header */
    // /invoice-tool's PDF header: brand and billing email; "Invoice" and the number
    p.text(LEFT, 74, business.payee, { font: "B", size: 20, color: COBALT });
    p.text(LEFT, 92, business.billingEmail, { size: 9, color: MUTED });
    p.text(RIGHT, 74, "Invoice", { font: "B", size: 22, align: "right" });
    p.text(RIGHT, 92, String(inv.id), { size: 11, color: MUTED, align: "right" });
    p.rule(LEFT, 110, RIGHT);

    /* Billed from | Billed to | Invoice Date, Invoice Number */
    y = 138;
    const colTo = 236;
    p.label(LEFT, y, "BILLED FROM");
    p.label(colTo, y, "BILLED TO");
    p.label(RIGHT, y, "INVOICE DATE", "right");
    p.text(RIGHT, y + 16, mdyLong(inv.printed_date), { align: "right" });
    let fromY = y + 16;
    p.text(LEFT, fromY, billedFrom.name, { font: "B" });
    fromY += 14;
    for (const l of billedFrom.lines) {
        p.text(LEFT, fromY, l, { size: 9.5, color: BODY });
        fromY += 13.5;
    }
    let toY = y + 16;
    for (const part of lines(inv.billing_name, 10, 170, "B")) {
        p.text(colTo, toY, part, { font: "B" });
        toY += 14;
    }
    for (const l of inv.billing_address.split("\n")) {
        p.text(colTo, toY, l, { size: 9.5, color: BODY });
        toY += 13.5;
    }
    y = Math.max(fromY, toY, y + 16) + 24;

    /* Items, each with its placements */
    const cItem = LEFT + 10;
    const cPlace = 200;
    const cStart = 346;
    const cEnd = 410;
    const cQty = 486;
    const cSub = RIGHT - 10;
    const itemBand = () => {
        p.box(LEFT, y, RIGHT - LEFT, 22, BAND);
        p.label(cItem, y + 14, "INVOICE ITEM");
        p.label(cPlace, y + 14, "AD PLACEMENTS");
        p.label(cStart, y + 14, "START DATE");
        p.label(cEnd, y + 14, "END DATE");
        p.label(cQty, y + 14, "QTY", "right");
        p.label(cSub, y + 14, "SUBTOTAL", "right");
        y += 22;
    };
    ensure(60);
    itemBand();
    for (const item of inv.invoice_items) {
        const name = lines(item.product_item_name, 10, cPlace - cItem - 10);
        const places = lines(adPlacements(item.placements_label), 9, cStart - cPlace - 10);
        const rows = item.placements_label.map((pl, i) => ({
            text: lines(placementText(pl), 9, 230),
            discount: money(item.placements[i]?.discount ?? 0),
        }));
        const subHeight = 18 + rows.reduce((h, r) => h + r.text.length * 12 + 4, 0);
        const height = 18 + Math.max(name.length * 13, places.length * 12) + subHeight;
        if (ensure(Math.min(height, BOTTOM - TOP) + 22)) itemBand();
        const top = y + 18;
        name.forEach((part, i) => p.text(cItem, top + i * 13, part));
        places.forEach((part, i) => p.text(cPlace, top + i * 12, part, { size: 9, color: MUTED }));
        p.text(cStart, top, mdyLong(item.start_date), { size: 9.5 });
        p.text(cEnd, top, mdyLong(item.end_date), { size: 9.5 });
        p.text(cQty, top, String(item.placements_label.length), { align: "right" });
        p.text(cSub, top, money(item.subtotal), { align: "right" });
        y = top + Math.max(name.length * 13, places.length * 12) + 4;

        /* Placement | Discount | Amount */
        const cP = 260;
        const cD = 470;
        p.label(cP, y + 10, "PLACEMENT");
        p.label(cD, y + 10, "DISCOUNT", "right");
        p.label(cSub, y + 10, "AMOUNT", "right");
        y += 16;
        for (const r of rows) {
            if (ensure(r.text.length * 12 + 6)) itemBand();
            const rowTop = y + 10;
            r.text.forEach((part, i) => p.text(cP, rowTop + i * 12, part, { size: 9, color: BODY }));
            p.text(cD, rowTop, r.discount, { size: 9, color: BODY, align: "right" });
            p.text(cSub, rowTop, money(item.cost), { size: 9, align: "right" });
            y += r.text.length * 12 + 4;
        }
        y += 8;
        p.rule(LEFT, y, RIGHT);
    }

    /* Summary */
    const sum = summaryOf(inv);
    const cLabel = 340;
    const totals: { label: string; value: string; color?: RGB }[] = [
        { label: "Subtotal", value: money(sum.subtotal) },
        { label: "Total Discount", value: `-${money(sum.discount)}`, color: FERN },
    ];
    if (sum.showProcessingFees) totals.push({ label: "Transaction Fees", value: `+${money(sum.processingFees)}`, color: ROMAN });
    if (sum.showTotalFees) totals.push({ label: "Total Fees", value: `+${money(sum.totalFees)}`, color: ROMAN });
    ensure(22 + totals.length * 18 + 50);
    y += 24;
    for (const t of totals) {
        p.text(cLabel, y, t.label, { color: t.color ?? BODY });
        p.text(cSub, y, t.value, { color: t.color ?? INK, align: "right" });
        y += 18;
    }
    p.rule(cLabel, y - 6, RIGHT, INK, 1);
    y += 14;
    p.text(cLabel, y, "Invoice Total (USD)", { font: "B", size: 12 });
    p.text(cSub, y, `${money(sum.total)}*`, { font: "B", size: 14, align: "right" });
    y += 18;
    p.text(cSub, y, EXCHANGE_NOTE, { size: 8.5, color: MUTED, align: "right" });

    /* Payment Terms | Payment History */
    const half = (RIGHT - LEFT - 20) / 2;
    const histX = LEFT + half + 20;
    const termRows = inv.payment_terms.map((t) => [mdyLong(t.due_date), toCurrency(t.amount_due)]);
    const payRows = inv.payments.length
        ? inv.payments.map((pay) => [pay.date_created ? mdyLong(pay.date_created) : "N/A", toCurrency(paymentAmount(pay))])
        : [["No Payments Yet", ""]];
    y += 32;
    ensure(16 + 22 + Math.max(termRows.length, payRows.length) * 22);
    const smallTable = (x: number, title: string, heads: [string, string], rows: string[][]) => {
        let ty = y;
        p.label(x, ty, title);
        ty += 8;
        p.box(x, ty, half, 22, BAND);
        p.label(x + 10, ty + 14, heads[0]);
        p.label(x + half - 10, ty + 14, heads[1], "right");
        ty += 22;
        for (const [a, b] of rows) {
            p.text(x + 10, ty + 15, a, { size: 9.5, color: b ? INK : MUTED });
            if (b) p.text(x + half - 10, ty + 15, b, { size: 9.5, align: "right" });
            ty += 22;
            p.rule(x, ty, x + half);
        }
        return ty;
    };
    const endTerms = smallTable(LEFT, "PAYMENT TERMS", ["DUE DATE", "AMOUNT DUE"], termRows);
    const endPays = smallTable(histX, "PAYMENT HISTORY", ["PAYMENT DATE", "PAYMENT AMOUNT"], payRows);
    y = Math.max(endTerms, endPays);

    /* Message */
    const message = lines(inv.message || "No Message", 9.5, RIGHT - LEFT);
    y += 32;
    ensure(16 + message.length * 13.5);
    p.label(LEFT, y, "MESSAGE");
    y += 16;
    for (const l of message) {
        p.text(LEFT, y, l, { size: 9.5, color: inv.message ? BODY : MUTED });
        y += 13.5;
    }

    /* Payment Methods, as staff see them */
    const para = (text: string, opts: { size?: number; color?: RGB; font?: Font; indent?: number } = {}) => {
        const size = opts.size ?? 9.5;
        const x = LEFT + (opts.indent ?? 0);
        for (const l of lines(text, size, RIGHT - x, opts.font)) {
            ensure(size + 5);
            p.text(x, y, l, { size, color: opts.color ?? BODY, font: opts.font });
            y += size + 4;
        }
    };
    y += 28;
    ensure(40);
    p.label(LEFT, y, "PAYMENT METHODS");
    y += 16;
    para("Invoices are in USD, and payments must be made in USD.", { size: 9, color: MUTED });
    if (inv.pending_payment) {
        y += 4;
        para(`${pendingText(inv.pending_payment)}.`, { font: "B", color: COBALT });
        para("It usually clears in 2 to 4 business days, and the invoice is marked paid once it does. There's no need to pay again.", {
            color: COBALT,
        });
    }
    y += 8;
    ensure(20);
    p.label(LEFT, y, "OTHER WAYS TO PAY");
    y += 16;
    const method = (title: string, body: () => void) => {
        ensure(30);
        p.rule(LEFT, y - 10, RIGHT);
        y += 4;
        para(title, { font: "B", color: INK, size: 10 });
        body();
        y += 6;
    };
    method("Wire transfer", () => {
        para("Send the transfer in USD, then email billing@goabroad.com once it's sent.");
        for (const d of WIRE_DETAILS) {
            ensure(14);
            p.text(LEFT + 12, y, d.label, { size: 9, color: MUTED });
            p.text(LEFT + 120, y, d.value, { size: 9, color: INK });
            y += 13;
        }
    });
    method("Zelle", () => para("Send to the tag GoAbroad. U.S. bank accounts only; transfer limits vary by bank."));
    method("PayPal", () => para("Send in USD to billing@goabroad.com and let us know once it's sent."));
    method("Check", () => {
        para("Make it out in USD and mail it to:");
        for (const l of ["GoAbroad.com LLC", "4309 Fox Grove Dr.", "Fort Collins, CO, 80524 USA"]) para(l);
    });
    ensure(30);
    p.rule(LEFT, y - 8, RIGHT);
    y += 6;
    para(
        "By agreeing to the advertising package outlined above and paying this invoice, you consent to GoAbroad's Advertiser Terms & Conditions and Advertiser Policy.",
        { size: 9, color: MUTED },
    );

    /* Footer on every page */
    pages.forEach((page, i) => {
        page.rule(LEFT, PAGE_H - 50, RIGHT);
        page.text(LEFT, PAGE_H - 34, `Invoice ${inv.id}`, { size: 8.5, color: MUTED });
        page.text(
            RIGHT,
            PAGE_H - 34,
            pages.length > 1 ? `Page ${i + 1} of ${pages.length} · Prototype, not a real bill` : "Prototype, not a real bill",
            { size: 8.5, color: MUTED, align: "right" },
        );
    });

    return assemble(
        pages.map((page) => page.ops.join("\n")),
        `Invoice ${inv.id}`,
    );
}
