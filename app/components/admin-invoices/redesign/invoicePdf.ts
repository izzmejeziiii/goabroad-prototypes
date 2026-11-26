import { business } from "../../invoice-tool/data";
import {
    BAND,
    BODY,
    COBALT,
    FERN,
    INK,
    LEFT,
    MUTED,
    PAGE_H,
    PAGE_W,
    Page,
    RIGHT,
    ROMAN,
    pdfString,
    wrap,
    type Font,
    type RGB,
} from "../../invoice-tool/invoicePdf";
import { mdyLong, money } from "../format";
import { discountTotal, invoiceTotal, itemGross, noPlacements, placementLabel, productName, schedule, subtotal, type Draft } from "./draft";

/* The invoice preview as a PDF, drawn the way /invoice-tool's PDF is (its
   helpers: Helvetica, text, rules and the grey table band, no PDF library)
   and with the preview's content: header, Billed to with Invoice date /
   Due date / Terms, the items with their run dates and placements, the
   totals down to Amount due, the payment schedule and the message. Long
   invoices carry on to more pages; every page gets the footer. */

const TOP = 60;
const BOTTOM = PAGE_H - 80;

const range = (start: string, end: string) => (start && end ? `${mdyLong(start)} – ${mdyLong(end)}` : "Run dates not set");

export function draftInvoicePdf(d: Draft, { isNew, paidTotal }: { isNew: boolean; paidTotal: number }): Uint8Array<ArrayBuffer> {
    const pages: Page[] = [new Page()];
    let p = pages[0];
    let y = 0;
    /** Starts a new page when the next block wouldn't fit. */
    const ensure = (height: number) => {
        if (y + height <= BOTTOM) return;
        p = new Page();
        pages.push(p);
        y = TOP;
    };

    const total = invoiceTotal(d);
    const disc = discountTotal(d);
    const fee = Number(d.fee) || 0;
    const due = Math.max(0, Math.round((total - paidTotal) * 100) / 100);
    const terms = schedule(d);
    const firstDue = terms.find((t) => t.dueDate)?.dueDate;

    /* Header */
    p.text(LEFT, 74, business.payee, { font: "B", size: 20, color: COBALT });
    p.text(LEFT, 92, business.billingEmail, { size: 9, color: MUTED });
    p.text(RIGHT, 74, "Invoice", { font: "B", size: 22, align: "right" });
    p.text(RIGHT, 92, isNew ? "Draft, not saved" : `#${d.id}`, { size: 11, color: MUTED, align: "right" });
    const status =
        d.status === 6
            ? { text: "Void", color: BODY }
            : d.status === 5 || (paidTotal > 0 && due === 0)
              ? { text: "Paid", color: FERN }
              : d.status === 4
                ? { text: "Overdue", color: ROMAN }
                : paidTotal > 0
                  ? { text: "Partly paid", color: BODY }
                  : null;
    if (status) p.text(RIGHT, 108, status.text, { font: "B", size: 9, color: status.color, align: "right" });
    p.rule(LEFT, 124, RIGHT);

    /* Billed to (left); dates and terms (right) */
    const colB = 330;
    const colC = 450;
    y = 152;
    p.label(LEFT, y, "BILLED TO");
    p.label(colB, y, "INVOICE DATE");
    p.label(colC, y, terms.length > 1 ? "FIRST DUE" : "DUE DATE");
    p.text(colB, y + 16, mdyLong(d.invoiceDate));
    p.text(colC, y + 16, firstDue ? mdyLong(firstDue) : "Not set", { color: firstDue ? INK : MUTED });
    p.label(colB, y + 44, "TERMS");
    p.text(colB, y + 60, d.terms === "custom" ? `${terms.length} payment${terms.length === 1 ? "" : "s"}` : d.terms === "30_days" ? "30 days" : "Upon receipt");
    let billY = y + 16;
    p.text(LEFT, billY, d.billingName || "Client name", { font: "B", color: d.billingName ? INK : MUTED });
    billY += 14;
    for (const line of [d.contactEmail, ...d.billingAddress.split("\n")].filter(Boolean)) {
        p.text(LEFT, billY, line, { size: 9.5, color: BODY });
        billY += 13.5;
    }
    y = Math.max(billY, y + 60) + 20;

    /* Items */
    const cDesc = LEFT + 10;
    const cQty = 372;
    const cUnit = 462;
    const cAmount = RIGHT - 10;
    const descWidth = cQty - 50 - cDesc;
    const band = (labels: [string, number, "left" | "right"][]) => {
        p.box(LEFT, y, RIGHT - LEFT, 22, BAND);
        for (const [text, x, align] of labels) p.label(x, y + 14, text, align);
        y += 22;
    };
    const itemBand = () =>
        band([
            ["DESCRIPTION", cDesc, "left"],
            ["QTY", cQty, "right"],
            ["UNIT PRICE", cUnit, "right"],
            ["AMOUNT", cAmount, "right"],
        ]);
    ensure(60);
    itemBand();

    const items = d.items.filter((i) => i.productId);
    if (!items.length) {
        p.text(cDesc, y + 18, "No items yet", { color: MUTED });
        y += 26;
        p.rule(LEFT, y, RIGHT);
    }
    for (const item of items) {
        const none = noPlacements(item.productId);
        const name = wrap(productName(item.productId), "R", 10, descWidth);
        const details = [range(item.startDate, item.endDate), ...(none ? [] : item.placements.map((pl) => placementLabel(pl) || "Placement"))].flatMap(
            (line) => wrap(line, "R", 9, descWidth),
        );
        const height = 18 + name.length * 13 + details.length * 12;
        if (y + height > BOTTOM) {
            ensure(height + 22);
            itemBand();
        }
        const top = y + 18;
        let line = top;
        for (const part of name) {
            p.text(cDesc, line, part);
            line += 13;
        }
        for (const part of details) {
            p.text(cDesc, line, part, { size: 9, color: MUTED });
            line += 12;
        }
        p.text(cQty, top, String(none ? 1 : item.placements.length), { align: "right" });
        p.text(cUnit, top, money(item.unitPrice), { align: "right" });
        p.text(cAmount, top, money(itemGross(item)), { align: "right" });
        y = line - 2;
        p.rule(LEFT, y, RIGHT);
    }

    /* Totals, down to the amount due */
    const cLabel = 340;
    const totals: { label: string; value: string; color?: RGB; bold?: boolean }[] = [];
    if (disc > 0 || fee > 0) totals.push({ label: "Subtotal", value: money(subtotal(d)) });
    if (disc > 0) totals.push({ label: "Discounts", value: `– ${money(disc)}`, color: FERN });
    if (fee > 0) totals.push({ label: d.feeNote || "Fee", value: `+ ${money(fee)}`, color: ROMAN });
    totals.push({ label: "Total", value: money(total), bold: true });
    if (paidTotal > 0) totals.push({ label: "Paid", value: `– ${money(paidTotal)}`, color: FERN });
    ensure(22 + totals.length * 18 + 30);
    y += 22;
    for (const t of totals) {
        const font: Font = t.bold ? "B" : "R";
        p.text(cLabel, y, t.label, { font, color: t.color ?? BODY });
        p.text(cAmount, y, t.value, { font, color: t.color ?? INK, align: "right" });
        y += 18;
    }
    p.rule(cLabel, y - 6, RIGHT, INK, 1);
    y += 14;
    p.text(cLabel, y, "Amount due", { font: "B", size: 12 });
    p.text(cAmount, y, money(due), { font: "B", size: 14, align: "right" });

    /* Payment schedule, when it's split */
    if (terms.length > 1) {
        y += 40;
        ensure(16 + 22 + terms.length * 22);
        p.label(LEFT, y, "PAYMENT SCHEDULE");
        y += 10;
        band([
            ["PAYMENT", cDesc, "left"],
            ["DUE DATE", 250, "left"],
            ["AMOUNT", cAmount, "right"],
        ]);
        terms.forEach((t, i) => {
            ensure(22);
            p.text(cDesc, y + 16, `Payment ${i + 1}`);
            p.text(250, y + 16, t.dueDate ? mdyLong(t.dueDate) : "Not set", { color: t.dueDate ? INK : MUTED });
            const paid = t.paid > 0 ? (t.paid >= t.amount ? "Paid  " : `${money(t.paid)} paid  `) : "";
            p.text(cAmount, y + 16, `${paid}${money(t.amount)}`, { align: "right" });
            y += 22;
            p.rule(LEFT, y, RIGHT);
        });
    }

    /* Message */
    if (d.message.trim()) {
        const lines = d.message.split("\n").flatMap((para) => wrap(para, "R", 9.5, RIGHT - LEFT));
        y += 36;
        ensure(16 + lines.length * 13.5);
        p.label(LEFT, y, "MESSAGE");
        y += 16;
        for (const line of lines) {
            p.text(LEFT, y, line, { size: 9.5, color: BODY });
            y += 13.5;
        }
    }

    /* Footer on every page */
    pages.forEach((page, i) => {
        page.rule(LEFT, PAGE_H - 60, RIGHT);
        page.text(LEFT, PAGE_H - 44, `Questions about this invoice? Email ${business.billingEmail}`, { size: 8.5, color: MUTED });
        page.text(
            RIGHT,
            PAGE_H - 44,
            pages.length > 1 ? `Page ${i + 1} of ${pages.length} · Prototype preview, not a real bill` : "Prototype preview, not a real bill",
            { size: 8.5, color: MUTED, align: "right" },
        );
    });

    return assemble(
        pages.map((page) => page.ops.join("\n")),
        isNew ? "Invoice draft" : `Invoice ${d.id}`,
    );
}

/** The PDF objects for any number of pages, with the byte offsets for the
    cross-reference table. Every character is one byte. */
export function assemble(contents: string[], title: string): Uint8Array<ArrayBuffer> {
    const pageObj = (i: number) => 6 + i * 2;
    const objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        `<< /Type /Pages /Kids [${contents.map((_, i) => `${pageObj(i)} 0 R`).join(" ")}] /Count ${contents.length} >>`,
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
        `<< /Title (${pdfString(title)}) /Author (${pdfString(business.payee)}) >>`,
        ...contents.flatMap((content, i) => [
            `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${pageObj(i) + 1} 0 R >>`,
            `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
        ]),
    ];
    let out = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n";
    const offsets: number[] = [];
    objects.forEach((body, i) => {
        offsets.push(out.length);
        out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xref = out.length;
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const offset of offsets) out += `${String(offset).padStart(10, "0")} 00000 n \n`;
    out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
    return bytes;
}
