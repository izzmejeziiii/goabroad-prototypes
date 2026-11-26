import { staffUser } from "../../data";
import { nowStamp, today } from "../../format";
import type { Invoice, InvoiceItem, InvoiceStatus, PlacementLabel, SaleType } from "../../types";
import { getInvoiceTotal, getPaymentTotal, getTotalDiscount } from "./calc";
import {
    AD_TYPES,
    ALL_TIMINGS,
    ALL_TYPES,
    billingFromInvoice,
    contactFromInvoice,
    directoryId,
    directoryName,
    findCrit,
    latestInvoiceOf,
    LOCATIONS,
} from "./catalog";
import type {
    Billing,
    EditorItem,
    EditorPlacement,
    EditorState,
    Snapshot,
} from "./types";
import { addBusinessDays, dateFormatter, getNumber, round2, toDate } from "./utils";

/* Store Invoice ⇄ editor state. Loading follows AddEditInvoice.js's
   componentWillMount (the /invoices/:id/edit response mapped into the
   provider); saving follows handleSaveInvoice's FormData, written back in
   the store's Invoice shape. */

/** AddEditInvoice.js PAYMENT_OPTIONS. */
export const PAYMENT_OPTIONS = [
    { term: 4, term_name: "Upon receipt", value: "upon_receipt" },
    { term: 1, term_name: "30 days", value: "30_days" },
    { term: 5, term_name: "Custom", value: "Custom" },
];

export const getPaymentOption = (term: number) =>
    PAYMENT_OPTIONS.find((opt) => opt.term === term)?.value ?? null;

/** AddEditInvoice.js getBillingToDetails. */
export const getBillingToDetails = (b?: Partial<Billing> | null) =>
    b
        ? `${b.street_address_1 ? b.street_address_1 + "\n" : ""}${b.city ? b.city + " " : ""}${
              b.state ? b.state + " " : ""
          }${b.zip ? b.zip : ""}${b.country ? "\n" + b.country : ""}${b.other_info ? "\n" + b.other_info : ""}`
        : "";

const emptyContact = () => ({ id: null, firstname: "", lastname: "", job_title: "", email: "", phone: "" });

const snapshotOf = (s: Snapshot): Snapshot => ({
    invoice: s.invoice,
    invoiceItems: s.invoiceItems,
    paymentTerms: s.paymentTerms,
    paymentOption: s.paymentOption,
    paymentCount: s.paymentCount,
    paymentDueDate: s.paymentDueDate,
    upcharge: s.upcharge,
    selectedProvider: s.selectedProvider,
    providerBilling: s.providerBilling,
    contact: s.contact,
});

/** AddEditInvoiceProvider.hasChanges(). Compared deeply here; the source
    shares item objects with previous_content, so it misses some edits. */
export const hasChanges = (s: EditorState) =>
    JSON.stringify(s.previous_content) !== JSON.stringify(snapshotOf(s));

/** The snapshot handleSaveInvoice stores before posting. */
export const currentSnapshot = (s: EditorState) => snapshotOf(s);

const UI_STATE = {
    selected: [] as number[],
    selectedInvoiceItem: null,
    selectedPlacement: null,
    placementDrawerOpen: false,
    upchargeOpen: false,
    discountOpen: false,
};

/** AddEditInvoiceProvider's initial state (/invoice/create). */
export const createState = (): EditorState => {
    const now = today();
    const invoice = () => ({
        id: null,
        printed_date: new Date(now),
        term: 4,
        term_name: "Upon receipt",
        status: 0,
        discount_description: "",
        renewal_date: new Date(now).setFullYear(now.getFullYear() + 1),
        message: null,
        sale_type: 0,
    });
    return {
        invoice: invoice(),
        selectedProvider: null,
        providerBilling: null,
        contact: emptyContact(),
        paymentTerms: [],
        invoiceItems: [],
        upcharge: 0,
        paymentCount: 1,
        paymentOption: "upon_receipt",
        paymentDueDate: addBusinessDays(now, 1),
        payments: [],
        is_new: true,
        ...UI_STATE,
        // Quirk kept: these defaults never match the state above (one empty
        // term vs none, today vs the next business day), so leaving
        // /invoice/create always asks "Leave Invoice Tool?".
        previous_content: {
            invoice: invoice(),
            invoiceItems: [],
            paymentTerms: [{ due_date: "", amount_due: 0, amount_paid: 0 }],
            paymentOption: "upon_receipt",
            paymentCount: 1,
            paymentDueDate: new Date(now),
            upcharge: 0,
            selectedProvider: null,
            providerBilling: null,
            contact: emptyContact(),
        },
    };
};

const typeOf = (l: PlacementLabel) =>
    l.type
        ? findCrit(ALL_TYPES, "type", l.type)
        : l.directory
          ? { ...(findCrit(ALL_TYPES, "type", l.directory) as NonNullable<ReturnType<typeof findCrit>>), as: "directory" as const }
          : null;

const toEditorItem = (item: InvoiceItem): EditorItem => {
    const meta = AD_TYPES.find((t) => t.id === item.product_item_id);
    const placements: EditorPlacement[] = item.placements_label.map((l, i) => ({
        discount: item.placements[i]?.discount ?? 0,
        location: findCrit(LOCATIONS, "loc", l.location),
        timing: findCrit(ALL_TIMINGS, "time", l.timing),
        type: typeOf(l),
        online: l.online ? { id: 1, name: l.online } : null,
    }));
    const adItem = {
        value: item.product_item_id,
        label: item.product_item_name,
        cost: item.cost,
        directory_id: directoryId(item.directory) || meta?.directory_id || 0,
        hasAdPlacement: meta?.search_criteria_value ?? (placements.length ? 14 : 0),
        duration: meta?.duration,
    };
    return {
        id: item.id,
        adItem,
        placements: placements.length ? placements : [{ location: null, timing: null, type: null }],
        quantity: placements.length || 1,
        amount: item.cost,
        startDate: toDate(item.start_date),
        endDate: toDate(item.end_date),
        discount: placements.reduce((sum, p) => sum + (p.discount ?? 0), 0),
        fee: 0,
        duration: adItem.duration,
        directory: item.directory,
    };
};

/** The store keeps an invoice-level discount the editor doesn't have (it
    only knows placement discounts), so spread it over the placements,
    proportionally to each line, like the API's invoice items would carry
    it. Last line / placement takes the rounding remainder. */
const spreadInvoiceDiscount = (items: EditorItem[], discount: number) => {
    const placed = getTotalDiscount({ invoiceItems: items });
    const extra = round2(discount - placed);
    if (!(extra > 0) || !items.length) return items;
    const gross = items.map((i) => i.amount * (i.placements.length || i.quantity));
    const totalGross = gross.reduce((a, b) => a + b, 0) || 1;
    let running = 0;
    return items.map((item, idx) => {
        const share =
            idx === items.length - 1 ? round2(extra - running) : round2((extra * gross[idx]) / totalGross);
        running += share;
        const n = item.placements.length;
        let given = 0;
        const placements = item.placements.map((p, pid) => {
            const add = pid === n - 1 ? round2(share - given) : round2(share / n);
            given += add;
            return { ...p, discount: round2((p.discount ?? 0) + add) };
        });
        return { ...item, placements, discount: round2(item.discount + share) };
    });
};

/** /invoices/:id/edit mapped into the provider (edit mode). */
export const editState = (inv: Invoice): EditorState => {
    const items = spreadInvoiceDiscount(inv.invoice_items.map(toEditorItem), Number(inv.discount) || 0);
    const terms = inv.payment_terms.map((t) => ({
        id: t.id,
        due_date: toDate(t.due_date),
        amount_due: t.amount_due,
        amount_paid: t.amount_paid,
    }));
    const build = (): Snapshot => ({
        invoice: {
            discount_description: inv.discount_description,
            id: inv.id,
            message: inv.message,
            printed_date: toDate(inv.printed_date),
            renewal_date: toDate(inv.renewal_date),
            // "near due" (7) is the store's list status; the API's invoice
            // is still unpaid (2), which is what the editor's rules key on.
            status: inv.status === 7 ? 2 : inv.status,
            term: inv.term,
            term_name: inv.term_name,
            billing_name: inv.billing_name,
            billing_address: inv.billing_address,
            sale_type: inv.sale_type,
        },
        invoiceItems: structuredClone(items),
        paymentTerms: structuredClone(terms),
        paymentOption: getPaymentOption(inv.term) || "",
        paymentCount: terms.length,
        paymentDueDate: terms.length < 2 ? (terms[0]?.due_date ? new Date(terms[0].due_date) : null) : today(),
        upcharge: Number(inv.upcharge) || 0,
        selectedProvider: { value: inv.provider_id, label: inv.name },
        providerBilling: { billing: billingFromInvoice(inv) },
        contact: { email: inv.email },
    });
    return {
        ...build(),
        payments: inv.payments.map((p) => ({ id: p.id, date_created: toDate(p.date_created), amount: p.amount })),
        is_new: false,
        ...UI_STATE,
        previous_content: build(),
    };
};

/** ClientDropdown onChange + fetchProviderBilling: the chosen client and
    its billing (the raw /billings object, not wrapped in `billing`). */
export const withProvider = (
    s: EditorState,
    option: { value: number; label: string },
    invoices: Invoice[],
): Partial<EditorState> => {
    const latest = latestInvoiceOf(invoices, option.value);
    const billing: Billing = latest
        ? billingFromInvoice(latest)
        : { billing_name: "", street_address_1: "", city: "", state: "", zip: "", country: "", other_info: "" };
    return {
        selectedProvider: option,
        providerBilling: billing,
        invoice: { ...s.invoice, billing_name: billing.billing_name, billing_address: getBillingToDetails(billing) },
    };
};

/* ── Save ─────────────────────────────────────────────────────────────── */

const toLabel = (p: EditorPlacement): PlacementLabel => ({
    ...(p.location ? { location: p.location.name } : {}),
    ...(p.online ? { online: p.online.name } : {}),
    ...(p.type ? (p.type.as === "directory" ? { directory: p.type.name } : { type: p.type.name }) : {}),
    ...(p.timing ? { timing: p.timing.name } : {}),
});

const toStoreItem = (e: EditorItem, idx: number, existing: Set<number>): InvoiceItem => {
    const ad = e.adItem!;
    const qty = e.placements.length || e.quantity;
    const sameDirectory = e.directory && directoryId(e.directory) === ad.directory_id;
    return {
        id: existing.has(e.id) ? e.id : Date.now() + idx,
        product_item_id: ad.value,
        product_item_name: ad.label,
        directory: sameDirectory ? (e.directory as string) : directoryName(ad.directory_id),
        // edit_invoice_item_amount: adItem.cost = amount.
        cost: e.amount,
        // Gross line value; the placements' discounts go on invoice.discount
        // so the view page's Subtotal − Total Discount matches the editor.
        subtotal: qty * e.amount,
        start_date: dateFormatter(e.startDate) || "0000-00-00",
        end_date: dateFormatter(e.endDate) || "0000-00-00",
        placements: e.placements.map((p) => ({
            discount: getNumber(p.discount !== undefined ? p.discount : "0").value || 0,
        })),
        placements_label: e.placements.map(toLabel),
    };
};

/** handleSaveInvoice's payload as a store patch. */
export type InvoicePatch = Omit<
    Invoice,
    | "id"
    | "contact"
    | "account_manager"
    | "team"
    | "is_active"
    | "payments"
    | "pending_payment"
    | "comments"
    | "activities"
    | "pdf"
    | "creator"
>;

export const toInvoicePatch = (s: EditorState, status: number, original?: Invoice): InvoicePatch => {
    const existingItems = new Set(original?.invoice_items.map((i) => i.id) ?? []);
    const existingTerms = original?.payment_terms.map((t) => t.id) ?? [];
    const total = getInvoiceTotal(s);
    const billing = s.providerBilling?.billing;
    const stamp = Date.now();
    const payment_terms =
        s.paymentOption === "Custom"
            ? s.paymentTerms.map((t, i) => ({
                  id: t.id ?? existingTerms[i] ?? stamp + 100 + i,
                  due_date: dateFormatter(t.due_date, "datetime") || "0000-00-00 00:00:00",
                  amount_due: t.amount_due,
                  amount_paid: t.amount_paid,
              }))
            : [
                  {
                      id: existingTerms[0] ?? stamp + 100,
                      due_date: dateFormatter(s.paymentDueDate, "datetime") || "0000-00-00 00:00:00",
                      amount_due: total,
                      amount_paid: getPaymentTotal(s),
                  },
              ];
    return {
        provider_id: s.selectedProvider?.value ?? 0,
        name: s.selectedProvider?.label ?? "",
        status: status as InvoiceStatus,
        sale_type: s.invoice.sale_type as SaleType,
        printed_date: dateFormatter(s.invoice.printed_date),
        renewal_date: dateFormatter(s.invoice.renewal_date),
        term: s.invoice.term,
        term_name: s.invoice.term_name ? s.invoice.term_name : "",
        discount: round2(getTotalDiscount(s)),
        discount_description: s.invoice.discount_description,
        upcharge: Number(s.upcharge) || 0,
        upcharge_description: original?.upcharge_description ?? "",
        message: s.invoice.message ? s.invoice.message : "",
        billing_name: s.invoice.billing_name
            ? s.invoice.billing_name
            : s.providerBilling
              ? (billing?.billing_name ?? s.providerBilling.billing_name ?? "")
              : "",
        billing_address: s.invoice.billing_address
            ? s.invoice.billing_address
            : s.providerBilling
              ? getBillingToDetails(billing ?? s.providerBilling)
              : "",
        email: s.contact.email ?? "",
        // Items with no product picked can't be saved by the API.
        invoice_items: s.invoiceItems.filter((e) => e.adItem).map((e, i) => toStoreItem(e, i, existingItems)),
        payment_terms,
    };
};

/** The rest of a new Invoice the API fills in from the provider. */
export const newInvoiceExtras = (invoices: Invoice[], providerId: number) => {
    const latest = latestInvoiceOf(invoices, providerId);
    const contact = contactFromInvoice(latest);
    return {
        contact: {
            id: contact.id ?? 0,
            firstname: contact.firstname,
            lastname: contact.lastname,
            job_title: contact.job_title,
            email: contact.email,
            phone: contact.phone,
        },
        email: latest?.email ?? "",
        account_manager: latest?.account_manager ?? `${staffUser.first_name} ${staffUser.last_name}`,
        team: latest?.team ?? null,
        is_active: latest?.is_active ?? true,
        payments: [],
        pending_payment: null,
        comments: [],
        pdf: null,
        creator: `${staffUser.first_name} ${staffUser.last_name}`,
    };
};

export const activity = (action: string, offset = 0) => ({
    id: Date.now() + offset,
    date_created: nowStamp(),
    user: `${staffUser.first_name} ${staffUser.last_name}`,
    action,
});
