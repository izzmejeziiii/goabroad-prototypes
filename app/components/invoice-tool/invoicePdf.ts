import {
    amountDue,
    business,
    cardLimitLabel,
    invoiceTotal,
    lateFeeTotal,
    lineTotal,
    money,
} from "./data";
import { addressLines } from "./regions";
import type { DemoInvoice, RecordedPayment } from "./types";

/* A one-page invoice PDF, written by hand so the prototype needs no PDF
   library: Helvetica and Helvetica-Bold (built into every PDF reader, so
   nothing is embedded), text, rules and one filled band. Demo invoices are
   short enough that nothing needs a second page. */

type RGB = [number, number, number];
type Font = "R" | "B";

const hex = (h: string): RGB =>
    [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB;
const INK = hex("#0f172a"); // slate-900
const BODY = hex("#334155"); // slate-700
const MUTED = hex("#64748b"); // slate-500
const RULE = hex("#e2e8f0"); // slate-200
const BAND = hex("#f1f5f9"); // slate-100
const COBALT = hex("#0a5e85");
const ROMAN = hex("#9c4640"); // roman-700
const FERN = hex("#4a7c52"); // fern-700

const PAGE_W = 612; // US Letter, in points
const PAGE_H = 792;
const LEFT = 54;
const RIGHT = PAGE_W - 54;

/* Advance widths (1/1000 em) for ASCII 32–126, from the standard AFM files. */
const HELVETICA = [
    278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667,
    667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722,
    667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500,
    556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278,
    556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];
const HELVETICA_BOLD = [
    278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611, 975, 722,
    722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778, 667, 778, 722,
    667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556, 333, 556, 611, 556,
    611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611, 611, 611, 389, 556, 333,
    611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];
const WIDE: Record<string, number> = { "—": 1000, "–": 556, "·": 278, "×": 584 };

function charWidth(ch: string, font: Font) {
    const code = ch.charCodeAt(0);
    if (code >= 32 && code <= 126)
        return (font === "B" ? HELVETICA_BOLD : HELVETICA)[code - 32];
    return WIDE[ch] ?? 556;
}

const textWidth = (s: string, font: Font, size: number, tracking = 0) =>
    [...s].reduce((w, ch) => w + (charWidth(ch, font) * size) / 1000 + tracking, 0);

/* The fonts use WinAnsiEncoding: Latin-1 plus a few typographic marks. */
const WIN_ANSI: Record<string, number> = {
    "‘": 0x91,
    "’": 0x92,
    "“": 0x93,
    "”": 0x94,
    "•": 0x95,
    "–": 0x96,
    "—": 0x97,
    "…": 0x85,
    "€": 0x80,
};

function pdfString(s: string) {
    let out = "";
    for (const ch of s) {
        const code = ch.codePointAt(0)!;
        const byte = WIN_ANSI[ch] ?? (code < 256 ? code : 0x3f); // "?" if unmapped
        const c = String.fromCharCode(byte);
        out += c === "\\" || c === "(" || c === ")" ? "\\" + c : c;
    }
    return out;
}

function wrap(text: string, font: Font, size: number, maxWidth: number) {
    const lines: string[] = [];
    let line = "";
    for (const word of text.split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (line && textWidth(next, font, size) > maxWidth) {
            lines.push(line);
            line = word;
        } else line = next;
    }
    if (line) lines.push(line);
    return lines;
}

/** Drawing calls take y measured down from the top of the page. */
class Page {
    ops: string[] = [];

    text(
        x: number,
        y: number,
        s: string,
        {
            font = "R",
            size = 10,
            color = INK,
            align = "left",
            tracking = 0,
        }: {
            font?: Font;
            size?: number;
            color?: RGB;
            align?: "left" | "right";
            tracking?: number;
        } = {},
    ) {
        const w = textWidth(s, font, size, tracking);
        const tx = align === "right" ? x - w : x;
        this.ops.push(
            `BT /${font === "B" ? "F2" : "F1"} ${size} Tf ${tracking} Tc ${rgb(color)} rg ${n(tx)} ${n(PAGE_H - y)} Td (${pdfString(s)}) Tj ET`,
        );
    }

    /** Small grey uppercase label. */
    label(x: number, y: number, s: string, align: "left" | "right" = "left") {
        this.text(x, y, s, { font: "B", size: 7.5, color: MUTED, align, tracking: 0.6 });
    }

    rule(x1: number, y: number, x2: number, color = RULE, width = 0.75) {
        this.ops.push(
            `${rgb(color)} RG ${width} w ${n(x1)} ${n(PAGE_H - y)} m ${n(x2)} ${n(PAGE_H - y)} l S`,
        );
    }

    box(x: number, y: number, w: number, h: number, color: RGB) {
        this.ops.push(
            `${rgb(color)} rg ${n(x)} ${n(PAGE_H - y - h)} ${n(w)} ${n(h)} re f`,
        );
    }
}

const n = (v: number) => (Math.round(v * 100) / 100).toString();
const rgb = (c: RGB) => c.map((v) => v.toFixed(3)).join(" ");

/** The invoice as a PDF file. Pass the payment when it's been paid. */
export function invoicePdf(
    inv: DemoInvoice,
    payment?: RecordedPayment,
): Uint8Array<ArrayBuffer> {
    const p = new Page();
    const due = amountDue(inv);

    /* Header: who it's from, and which invoice. */
    p.text(LEFT, 74, business.payee, { font: "B", size: 20, color: COBALT });
    p.text(LEFT, 92, business.billingEmail, { size: 9, color: MUTED });
    p.text(RIGHT, 74, "Invoice", { font: "B", size: 22, align: "right" });
    p.text(RIGHT, 92, inv.number, { size: 11, color: MUTED, align: "right" });
    const status = payment
        ? { text: `Paid ${payment.on}`, color: FERN }
        : inv.lateFees.length
          ? { text: "Overdue", color: ROMAN }
          : inv.paidCents > 0
            ? { text: "Partly paid", color: BODY }
            : null;
    if (status)
        p.text(RIGHT, 108, status.text, {
            font: "B",
            size: 9,
            color: status.color,
            align: "right",
        });
    p.rule(LEFT, 124, RIGHT);

    /* Billed to (left); dates and what it's for (right). */
    const colB = 330;
    const colC = 450;
    let y = 152;
    p.label(LEFT, y, "BILLED TO");
    p.label(colB, y, "INVOICE DATE");
    p.label(colC, y, "DUE DATE");
    p.text(colB, y + 16, inv.issued);
    p.text(colC, y + 16, inv.due);
    p.label(colB, y + 44, "FOR");
    let forY = y + 60;
    for (const line of wrap(inv.title, "R", 10, RIGHT - colB)) {
        p.text(colB, forY, line);
        forY += 14;
    }
    let billY = y + 16;
    p.text(LEFT, billY, inv.company, { font: "B" });
    billY += 14;
    for (const line of [inv.email, ...addressLines(inv.billingAddress)]) {
        p.text(LEFT, billY, line, { size: 9.5, color: BODY });
        billY += 13.5;
    }
    y = Math.max(billY, forY) + 20;

    /* Items table. */
    const cDesc = LEFT + 10;
    const cQty = 372;
    const cUnit = 462;
    const cAmount = RIGHT - 10;
    const descWidth = cQty - 50 - cDesc;
    p.box(LEFT, y, RIGHT - LEFT, 22, BAND);
    p.label(cDesc, y + 14, "DESCRIPTION");
    p.label(cQty, y + 14, "QTY", "right");
    p.label(cUnit, y + 14, "UNIT PRICE", "right");
    p.label(cAmount, y + 14, "AMOUNT", "right");
    y += 22;

    const row = (
        name: string,
        detail: string | undefined,
        cells: [string, string, string],
        color = INK,
    ) => {
        const top = y + 18;
        let line = top;
        for (const part of wrap(name, "R", 10, descWidth)) {
            p.text(cDesc, line, part, { color });
            line += 13;
        }
        if (detail)
            for (const part of wrap(detail, "R", 9, descWidth)) {
                p.text(cDesc, line, part, { size: 9, color: MUTED });
                line += 12;
            }
        p.text(cQty, top, cells[0], { align: "right" });
        p.text(cUnit, top, cells[1], { align: "right" });
        p.text(cAmount, top, cells[2], { align: "right", color });
        y = line - 2;
        p.rule(LEFT, y, RIGHT);
    };
    for (const l of inv.lines)
        row(l.name, l.description, [
            String(l.qty),
            money(l.priceCents),
            money(l.qty * l.priceCents),
        ]);
    for (const fee of inv.lateFees)
        row(
            fee.name,
            `Added ${fee.appliedOn} · invoice was due ${inv.due}`,
            ["", "", money(fee.amountCents)],
            ROMAN,
        );

    /* Totals, read as a calculation down to the amount due. */
    const cLabel = 340;
    y += 22;
    const totals: { label: string; value: string; color?: RGB; bold?: boolean }[] = [];
    const lateFees = lateFeeTotal(inv);
    if (lateFees > 0) {
        totals.push({ label: "Subtotal", value: money(lineTotal(inv)) });
        totals.push({ label: "Late fee", value: money(lateFees), color: ROMAN });
    }
    totals.push({ label: "Total", value: money(invoiceTotal(inv)), bold: true });
    if (inv.paidCents > 0)
        totals.push({ label: "Paid", value: `– ${money(inv.paidCents)}`, color: FERN });
    if (payment)
        totals.push({
            label: `Paid ${payment.on}`,
            value: `– ${money(due)}`,
            color: FERN,
        });
    for (const t of totals) {
        const font: Font = t.bold ? "B" : "R";
        p.text(cLabel, y, t.label, { font, color: t.color ?? BODY });
        p.text(cAmount, y, t.value, { font, color: t.color ?? INK, align: "right" });
        y += 18;
    }
    p.rule(cLabel, y - 6, RIGHT, INK, 1);
    y += 14;
    p.text(cLabel, y, "Amount due", { font: "B", size: 12 });
    p.text(cAmount, y, money(payment ? 0 : due), { font: "B", size: 14, align: "right" });

    /* How to pay, or a paid note. */
    y += 44;
    const note = (heading: string, paragraphs: string[]) => {
        p.label(LEFT, y, heading);
        y += 16;
        for (const para of paragraphs) {
            for (const line of wrap(para, "R", 9.5, RIGHT - LEFT)) {
                p.text(LEFT, y, line, { size: 9.5, color: BODY });
                y += 13.5;
            }
            y += 4;
        }
    };
    if (payment)
        note("PAYMENT", [
            `Paid in full on ${payment.on} by ${payment.detail}. Thank you.`,
        ]);
    else
        note("HOW TO PAY", [
            `Open the link in your invoice email, or look up ${inv.number} with ${inv.email} on GoAbroad's invoice page. Pay by bank transfer (ACH), international wire, Wise or PayPal, or by card for amounts up to ${cardLimitLabel}.`,
            business.lateFeePolicy,
        ]);

    /* Footer. */
    p.rule(LEFT, PAGE_H - 60, RIGHT);
    p.text(
        LEFT,
        PAGE_H - 44,
        `Questions about this invoice? Email ${business.billingEmail}`,
        {
            size: 8.5,
            color: MUTED,
        },
    );
    p.text(
        RIGHT,
        PAGE_H - 44,
        "Demo invoice from a GoAbroad prototype, not a real bill",
        {
            size: 8.5,
            color: MUTED,
            align: "right",
        },
    );

    return assemble(p.ops.join("\n"), `Invoice ${inv.number}`);
}

/** Wraps a content stream in the objects a PDF needs, with the byte offsets
 *  for the cross-reference table. Every character here is one byte. */
function assemble(content: string, title: string): Uint8Array<ArrayBuffer> {
    const objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
        `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
        `<< /Title (${pdfString(title)}) /Author (${pdfString(business.payee)}) >>`,
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
    out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
    return bytes;
}
