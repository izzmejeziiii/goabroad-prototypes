import { DEMO_TODAY, productItems, providers } from "../data";
import { parseDate, isoDate, today } from "../format";
import { AD_TYPES, NO_PLACEMENT_PRODUCTS, directoryName, latestInvoiceOf } from "../staff/editor/catalog";
import { addBusinessDays, computeEndDate, dateFormatter } from "../staff/editor/utils";
import type { Invoice, InvoiceStatus, SaleType } from "../types";

/* The redesigned invoice editor's own state, simpler than the copied
   editor's. Same data model as the real invoice: each item has one price
   per placement, and each placement can carry its own discount. What the old
   accordion hid (placement, discount, amount) is plain data here that every
   layout shows on screen. */

export type DraftPlacement = {
    id: string;
    location: string;
    type: string;
    timing: string;
    discount: number;
};

export type DraftItem = {
    id: string;
    productId: number | null;
    /** Price of one placement. Starts at the product's list price. */
    unitPrice: number;
    startDate: string;
    endDate: string;
    placements: DraftPlacement[];
};

export type TermsOption = "upon_receipt" | "30_days" | "custom";

/** One installment. `amount` is what the term is for in all; `paid` is
    what's been paid on it; `edited` marks an amount typed by hand, which
    re-splitting leaves alone (the real editor's is_changed). */
export type DraftTerm = { id: string; dueDate: string; amount: number; paid: number; edited?: boolean };

export type Draft = {
    id: number | null;
    status: InvoiceStatus;
    providerId: number | null;
    billingName: string;
    billingAddress: string;
    contactName: string;
    contactEmail: string;
    invoiceDate: string;
    renewalDate: string;
    saleType: SaleType;
    items: DraftItem[];
    /** Flat fee added to the invoice ("Total Fees"). */
    fee: number;
    feeNote: string;
    terms: TermsOption;
    /** The due date for Upon receipt / 30 days. Set when the option is
        picked, then editable ("Payment Due Date" in the real editor). */
    dueDate: string;
    customTerms: DraftTerm[];
    message: string;
    sendEmail: boolean;
};

let seq = 0;
export const uid = (p = "x") => `${p}${Date.now().toString(36)}${(seq++).toString(36)}`;

export const SALE_TYPES: { id: SaleType; label: string }[] = [
    { id: 0, label: "None" },
    { id: 1, label: "Organic" },
    { id: 2, label: "Nurtured" },
    { id: 3, label: "Renewed same package" },
    { id: 4, label: "Upgrade" },
    { id: 5, label: "Downgrade" },
    { id: 6, label: "Nonrenewable" },
    { id: 7, label: "Recovered" },
];

/* ── Products ─────────────────────────────────────────────────────────── */

export const product = (id: number | null) => AD_TYPES.find((p) => p.id === id) ?? null;
export const productName = (id: number | null) =>
    productItems.find((p) => p.value === id)?.label ?? "";

/** A product whose Ad Placement is "None": billed once, nothing to place.
    Like the real editor, its item keeps one hidden placement that carries
    the discount, so the math is the same as for any other item. */
export const noPlacements = (id: number | null) => id !== null && NO_PLACEMENT_PRODUCTS.includes(id);

/** What the API calls that one hidden placement. */
export const NO_PLACEMENT = "No Placement";

/** The end date the real editor sets when the start date is picked
    (computeEndDate with the product's duration; an open one ends on the
    start date). */
const endFor = (start: string, id: number | null) =>
    start ? dateFormatter(computeEndDate(start, product(id)?.duration ?? { type: "open", value: "" })) : "";

export const newPlacement = (): DraftPlacement => ({
    id: uid("p"),
    location: "",
    type: "",
    timing: "",
    discount: 0,
});

/** A new item starts blank, dates too (BulkCTAHeader's new item). */
export const newItem = (): DraftItem => ({
    id: uid("i"),
    productId: null,
    unitPrice: 0,
    startDate: "",
    endDate: "",
    placements: [],
});

/** Picking a product starts the item over, as the real editor does: its
    list price, no placements (or the one hidden row of a product with no
    placements), no discounts and no run dates. */
export const withProduct = (item: DraftItem, productId: number | null): DraftItem => ({
    ...item,
    productId,
    unitPrice: product(productId)?.cost ?? 0,
    startDate: "",
    endDate: "",
    placements: noPlacements(productId) ? [newPlacement()] : [],
});

/** Picking the start date sets the end date from the product's duration. */
export const withStartDate = (item: DraftItem, startDate: string): DraftItem => ({
    ...item,
    startDate,
    endDate: endFor(startDate, item.productId),
});

/* ── Math ─────────────────────────────────────────────────────────────── */

const r2 = (n: number) => Math.round(n * 100) / 100;

export const placementLabel = (p: DraftPlacement) =>
    [p.location, p.type, p.timing].filter(Boolean).join(" · ");

export const lineTotal = (item: DraftItem, p: DraftPlacement) => r2(item.unitPrice - p.discount);
export const itemGross = (item: DraftItem) => r2(item.unitPrice * item.placements.length);
export const itemDiscount = (item: DraftItem) =>
    r2(item.placements.reduce((s, p) => s + (Number(p.discount) || 0), 0));
export const itemTotal = (item: DraftItem) => r2(itemGross(item) - itemDiscount(item));

export const subtotal = (d: Draft) => r2(d.items.reduce((s, i) => s + itemGross(i), 0));
export const discountTotal = (d: Draft) => r2(d.items.reduce((s, i) => s + itemDiscount(i), 0));
export const invoiceTotal = (d: Draft) => r2(subtotal(d) - discountTotal(d) + (Number(d.fee) || 0));

/** The due date an option sets when it's picked: Upon receipt is the next
    business day after the invoice date, 30 days is 30 days after it. */
export const simpleDueDate = (option: TermsOption, invoiceDate: string) => {
    const date = parseDate(invoiceDate);
    if (!date) return "";
    if (option === "30_days") return isoDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 30));
    return dateFormatter(addBusinessDays(invoiceDate, 1));
};

export const termsTotal = (d: Draft) => r2(d.customTerms.reduce((s, t) => s + (Number(t.amount) || 0), 0));

/** A term that's been paid in full (and not retyped since): it can't change. */
export const settled = (t: DraftTerm) => t.paid === t.amount && t.amount > 0 && !t.edited;

/** buildPaymentTerms: grows or shrinks the terms to `count`, keeps the
    amounts of terms with a payment or typed by hand, and splits what's
    left evenly over the rest, the rounding remainder on the last. New
    terms start with no due date. */
export const buildTerms = (d: Draft, count: number): DraftTerm[] => {
    let total = invoiceTotal(d);
    const kept: number[] = [];
    d.customTerms.forEach((t, i) => {
        if (t.paid > 0 || t.edited) {
            total -= t.amount;
            kept.push(i);
        }
    });
    const terms: DraftTerm[] =
        d.customTerms.length >= count
            ? d.customTerms.slice(0, Math.max(count, 0))
            : [
                  ...d.customTerms,
                  ...Array.from({ length: count - d.customTerms.length }, () => ({ id: uid("t"), dueDate: "", amount: 0, paid: 0 })),
              ];
    const open = count - kept.length;
    return terms.map((t, i) => {
        if (kept.includes(i) || t.edited) return t;
        let amount = r2(total / open);
        if (i === terms.length - 1) amount = r2(amount + r2(total - Number((amount * (terms.length - kept.length)).toFixed(2))));
        return { ...t, amount };
    });
};

/** recomputePaymentTerms: puts any difference from the total on the last term. */
export const recomputeTerms = (d: Draft): DraftTerm[] => {
    let balance = invoiceTotal(d);
    return d.customTerms.map((t, i) => {
        balance = r2(balance - t.amount);
        return i === d.customTerms.length - 1 && balance !== 0 ? { ...t, amount: r2(t.amount + balance) } : t;
    });
};

/** The schedule the invoice will carry. */
export const schedule = (d: Draft): DraftTerm[] =>
    d.terms === "custom"
        ? d.customTerms
        : [{ id: "single", dueDate: d.dueDate, amount: invoiceTotal(d), paid: d.customTerms[0]?.paid ?? 0 }];

/* ── Spreading a discount over placements ("$100" or "10%") ──────────── */

export const parseAdjust = (raw: string, base: number): number | null => {
    const s = raw.trim();
    if (!s) return null;
    const pct = s.endsWith("%");
    const n = parseFloat(s.replace(/[$%,\s]/g, ""));
    if (Number.isNaN(n) || n < 0) return null;
    return r2(pct ? (base * n) / 100 : n);
};

/** Spreads an invoice-wide discount across every placement in proportion
    to its price, the remainder on the last one. */
export const spreadDiscount = (d: Draft, amount: number, itemIds?: string[]): DraftItem[] => {
    const scope = itemIds ? d.items.filter((i) => itemIds.includes(i.id)) : d.items;
    const gross = scope.reduce((s, i) => s + itemGross(i), 0);
    if (gross <= 0) return d.items;
    const all = scope.flatMap((i) => i.placements.map((p) => ({ itemId: i.id, pid: p.id, price: i.unitPrice })));
    let left = Math.min(amount, gross);
    const share = new Map<string, number>();
    all.forEach((row, idx) => {
        const v = idx === all.length - 1 ? r2(left) : r2((amount * row.price) / gross);
        share.set(row.pid, Math.min(v, row.price));
        left = r2(left - v);
    });
    return d.items.map((i) => ({
        ...i,
        placements: i.placements.map((p) => ({ ...p, discount: share.get(p.id) ?? p.discount })),
    }));
};

/* ── Validation ───────────────────────────────────────────────────────
   The real editor's checks (InvoiceCTAs), per what the save does:
   - "draft": saving as a draft only needs a client.
   - "send" (from draft, due dates against the invoice date) and "unpaid"
     (pending / unpaid invoices, due dates against today): run dates set
     and in order, due dates set and not before the reference date, every
     installment above $0, the schedule adding up to the total, and no more
     paid than the total.
   - "partial": due dates set, unpaid ones not before today or the invoice
     date; no more paid than the total.
   - "overdue": no more paid than the total.
   - "paid": paid exactly the total. */

export type Check = "draft" | "send" | "unpaid" | "partial" | "overdue" | "paid";

export type Problems = {
    client?: string;
    placements: Record<string, string>;
    itemsById: Record<string, string>;
    terms?: string;
};

const isBefore = (a: string, b: string) => !!a && !!b && a.slice(0, 10) < b.slice(0, 10);

export const validate = (d: Draft, check: Check, paidTotal = 0): Problems => {
    const out: Problems = { placements: {}, itemsById: {} };
    if (!d.providerId) out.client = "Choose the client this invoice is for.";
    if (check === "draft") return out;

    const total = invoiceTotal(d);
    const terms = schedule(d);
    const termIssue = (msg: string) => (out.terms ??= msg);

    if (check === "send" || check === "unpaid") {
        const ref = check === "send" ? d.invoiceDate : isoDate(today());
        const refWord = check === "send" ? "the invoice date" : "today";
        // An item nobody has touched (no product, no placements) isn't saved
        d.items
            .filter((i) => i.productId || i.placements.length)
            .forEach((i) => {
                if (!i.startDate || !i.endDate) out.itemsById[i.id] = "Set the start and end dates.";
                else if (isBefore(i.endDate, i.startDate)) out.itemsById[i.id] = "The end date is before the start date.";
                if (!noPlacements(i.productId))
                    i.placements.forEach((p) => {
                        if (!p.location && !p.type && !p.timing) out.placements[p.id] = "Choose a type, timing or location.";
                    });
            });
        terms.forEach((t) => {
            if (!t.dueDate) termIssue("Every payment needs a due date.");
            else if (t.amount !== t.paid && t.amount > 0 && isBefore(t.dueDate, ref))
                termIssue(`Due dates can't be before ${refWord}.`);
        });
        if (d.terms === "custom" && terms.some((t) => !(t.amount > 0))) termIssue("Every payment needs to be more than $0.");
        if (d.terms === "custom" && Math.abs(termsTotal(d) - total) > 0.009)
            termIssue("The payments need to add up to the invoice total.");
    }
    if (check === "partial") {
        const now = isoDate(today());
        terms.forEach((t) => {
            if (!t.dueDate) termIssue("Every payment needs a due date.");
            else if (t.amount !== t.paid && t.amount > 0 && (isBefore(t.dueDate, now) || isBefore(t.dueDate, d.invoiceDate)))
                termIssue("Payments not made yet can't be due before today or the invoice date.");
        });
    }
    if (check !== "paid" && paidTotal > total + 0.009)
        termIssue("The invoice total can't be less than what's already been paid.");
    if (check === "paid" && Math.abs(paidTotal - total) > 0.009)
        termIssue("A paid invoice's total has to equal what's been paid.");
    return out;
};

export const problemCount = (p: Problems) =>
    (p.client ? 1 : 0) + (p.terms ? 1 : 0) + Object.keys(p.placements).length + Object.keys(p.itemsById).length;

/* ── Store mapping ────────────────────────────────────────────────────── */

export const emptyDraft = (): Draft => ({
    id: null,
    status: 0,
    providerId: null,
    billingName: "",
    billingAddress: "",
    contactName: "",
    contactEmail: "",
    invoiceDate: DEMO_TODAY,
    renewalDate: plusYear(DEMO_TODAY),
    saleType: 0,
    items: [newItem()],
    fee: 0,
    feeNote: "",
    terms: "upon_receipt",
    dueDate: simpleDueDate("upon_receipt", DEMO_TODAY),
    customTerms: [],
    message: "",
    // The send dialog's "Send Email to Client" starts unticked
    sendEmail: false,
});

/** Renewal follows the invoice date, a year on (as the real header does). */
export const plusYear = (date: string) => {
    const d = parseDate(date);
    return d ? isoDate(new Date(d.getFullYear() + 1, d.getMonth(), d.getDate())) : "";
};

/** The client's own billing name and address (from its newest invoice, as
    the API returns them for the provider). */
export const clientBilling = (providerId: number | null, invoices: Invoice[]) => {
    const latest = providerId ? latestInvoiceOf(invoices, providerId) : undefined;
    const provider = providers.find((p) => p.id === providerId);
    return {
        billingName: latest?.billing_name ?? provider?.name ?? "",
        billingAddress: latest?.billing_address ?? "",
    };
};

/** Billing and contact from the newly chosen client. A Billed to name or
    address typed in by hand (different from the old client's) is kept, so
    an invoice billed to someone else doesn't lose it. */
export const withClient = (d: Draft, providerId: number | null, invoices: Invoice[]): Draft => {
    const latest = providerId ? latestInvoiceOf(invoices, providerId) : undefined;
    const before = clientBilling(d.providerId, invoices);
    const next = clientBilling(providerId, invoices);
    return {
        ...d,
        providerId,
        billingName: d.billingName === before.billingName ? next.billingName : d.billingName,
        billingAddress: d.billingAddress === before.billingAddress ? next.billingAddress : d.billingAddress,
        contactName: latest ? `${latest.contact.firstname} ${latest.contact.lastname}` : "",
        contactEmail: latest?.email ?? "",
    };
};

export const fromInvoice = (inv: Invoice): Draft => {
    const total = inv.invoice_items.reduce((s, i) => s + i.subtotal, 0);
    // An invoice-level discount is spread over the placements, like the
    // copied editor does on load.
    let draft: Draft = {
        ...emptyDraft(),
        id: inv.id,
        status: inv.status,
        providerId: inv.provider_id,
        billingName: inv.billing_name,
        billingAddress: inv.billing_address,
        contactName: `${inv.contact.firstname} ${inv.contact.lastname}`,
        contactEmail: inv.email,
        invoiceDate: inv.printed_date,
        renewalDate: inv.renewal_date,
        saleType: inv.sale_type,
        fee: inv.upcharge,
        feeNote: inv.upcharge_description,
        message: inv.message ?? "",
        sendEmail: false,
        terms: inv.term === 1 ? "30_days" : inv.term === 4 ? "upon_receipt" : "custom",
        // The stored due date, as the real editor loads it
        dueDate: inv.payment_terms.length < 2 ? (inv.payment_terms[0]?.due_date.slice(0, 10) ?? "") : isoDate(today()),
        customTerms: inv.payment_terms.map((t) => ({
            id: uid("t"),
            dueDate: t.due_date.slice(0, 10),
            amount: t.amount_due,
            paid: t.amount_paid,
        })),
        items: inv.invoice_items.map((i) => ({
            id: uid("i"),
            productId: i.product_item_id,
            unitPrice: i.cost,
            startDate: i.start_date,
            endDate: i.end_date,
            placements: noPlacements(i.product_item_id)
                ? // The "No Placement" row becomes the hidden one
                  [{ ...newPlacement(), discount: i.placements[0]?.discount ?? 0 }]
                : i.placements_label.map((pl, k) => ({
                      id: uid("p"),
                      location: pl.location ?? "",
                      type: pl.type ?? pl.directory ?? "",
                      timing: pl.timing ?? "",
                      discount: i.placements[k]?.discount ?? 0,
                  })),
        })),
    };
    const placementDiscounts = discountTotal(draft);
    if (inv.discount > placementDiscounts && total > 0)
        draft = { ...draft, items: spreadDiscount(draft, inv.discount) };
    return draft;
};

export const toInvoice = (d: Draft, status: InvoiceStatus, base?: Invoice): Omit<Invoice, "id"> => {
    const provider = providers.find((p) => p.id === d.providerId);
    const [first = "", ...rest] = d.contactName.split(" ");
    const terms = schedule(d);
    return {
        provider_id: d.providerId ?? 0,
        name: provider?.name ?? d.billingName,
        status,
        sale_type: d.saleType,
        printed_date: d.invoiceDate,
        renewal_date: d.renewalDate,
        term: d.terms === "30_days" ? 1 : d.terms === "upon_receipt" ? 4 : 5,
        term_name: d.terms === "30_days" ? "30 days" : d.terms === "upon_receipt" ? "Upon receipt" : "Custom",
        discount: discountTotal(d),
        discount_description: base?.discount_description ?? "",
        upcharge: Number(d.fee) || 0,
        upcharge_description: d.feeNote,
        message: d.message || null,
        billing_name: d.billingName,
        billing_address: d.billingAddress,
        contact: base?.contact ?? {
            id: 0,
            firstname: first,
            lastname: rest.join(" "),
            job_title: "",
            email: d.contactEmail,
            phone: "",
        },
        email: d.contactEmail,
        account_manager: base?.account_manager ?? "Sam Rivera",
        team: base?.team ?? null,
        is_active: true,
        invoice_items: d.items
            .filter((i) => i.productId)
            .map((i, k) => ({
                id: 95000 + k,
                product_item_id: i.productId as number,
                product_item_name: productName(i.productId),
                directory: directoryName(product(i.productId)?.directory_id),
                cost: i.unitPrice,
                subtotal: itemGross(i),
                start_date: i.startDate,
                end_date: i.endDate || "0000-00-00",
                placements: i.placements.map((p) => ({ discount: Number(p.discount) || 0 })),
                placements_label: noPlacements(i.productId)
                    ? [{ location: NO_PLACEMENT }]
                    : i.placements.map((p) => ({
                          location: p.location || undefined,
                          type: p.type || undefined,
                          timing: p.timing || undefined,
                      })),
            })),
        payment_terms: terms.map((t, k) => ({
            id: (base?.payment_terms[k]?.id ?? 98000 + k),
            due_date: `${t.dueDate} 00:00:00`,
            amount_due: t.amount,
            amount_paid: t.paid,
        })),
        payments: base?.payments ?? [],
        pending_payment: base?.pending_payment ?? null,
        comments: base?.comments ?? [],
        activities: base?.activities ?? [],
        pdf: base?.pdf ?? null,
        creator: base?.creator ?? "Sam Rivera",
    };
};
