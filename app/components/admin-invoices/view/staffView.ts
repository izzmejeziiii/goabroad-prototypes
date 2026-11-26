import { invoiceSubtotal } from "../format";
import type { Invoice, Payment, PlacementLabel } from "../types";

/* What the original View invoice shows (view/sections.tsx: Header,
   InvoiceItem, InvoiceSummary, PaymentTerms, Payments, Message), worked out
   the same way, for the redesigned staff page and its PDF. */

/** InvoiceItem.js placementsToArray. */
export const placementParts = (p: PlacementLabel) => {
    const label: string[] = [];
    if (p.location) label.push(p.location);
    if (p.online) label.push(p.online);
    if (p.type) label.push(p.type);
    if (p.timing) label.push(p.timing);
    if (!label.length && p.directory) label.push(p.directory);
    return label;
};

/** The row's "Ad Placements" cell: every placement, comma-separated. */
export const adPlacements = (labels: PlacementLabel[]) => labels.map((p) => placementParts(p).join(", ")).join(", ");

/** One placement in the expanded rows ("No Placement" stays as is). */
export const placementText = (p: PlacementLabel) => (p.location !== "No Placement" ? placementParts(p).join(" ") : "No Placement");

/** InvoiceSummary.js: the rows it shows and the total. */
export const summaryOf = (inv: Invoice) => {
    const subtotal = invoiceSubtotal(inv);
    const discount = Number(inv.discount) || 0;
    const upcharge = Number(inv.upcharge) || 0;
    // Card fees on a paid invoice: what was charged above the payment
    const processingFees =
        inv.status === 5 ? inv.payments.reduce((sum, p) => (p.total_amount > p.amount ? sum + (p.total_amount - p.amount) : sum), 0) : 0;
    const totalFees = upcharge + processingFees;
    return {
        subtotal,
        discount,
        processingFees,
        totalFees,
        showProcessingFees: processingFees > 0,
        // Hidden only when the fees are all card fees
        showTotalFees: !(upcharge === 0 && processingFees > 0),
        total: subtotal - discount + totalFees,
    };
};

/** Payments.js: the amount charged when there is one. */
export const paymentAmount = (p: Payment) => (p.total_amount > 0 ? p.total_amount : p.amount);

export const EXCHANGE_NOTE = "*Exchange rate and other processing fees may apply.";
