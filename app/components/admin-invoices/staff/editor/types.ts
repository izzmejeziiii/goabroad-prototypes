/* The editor's own state, shaped like AddEditInvoiceProvider.js's
   `this.state` (src/views/Client/Invoices/AddEditInvoice). The store keeps
   the API's Invoice; mapping.ts converts between the two. */

/** A searchable-option object (location / timing / type / online). */
export type Crit = {
    id: string | number;
    name: string;
    /** Set when the store's placement label used `directory` here, so a
        save writes it back the same way. Prototype-only. */
    as?: "directory";
};

export type EditorPlacement = {
    discount?: number;
    discount_str?: string;
    location: Crit | null;
    timing: Crit | null;
    type: Crit | null;
    online?: Crit | null;
};

export type Duration = { type: "month" | "day" | "year" | "open"; value: number | "" };

/** item.adItem: the product item picked in the Invoice Item dropdown. */
export type AdItem = {
    value: number;
    label: string;
    cost: number;
    directory_id: number;
    /** search_criteria_value; 0 when the item has no placements. */
    hasAdPlacement: number;
    duration?: Duration;
};

/** Date | timestamp (what setFullYear/computeEndDate return) | '' | null. */
export type EditorDate = Date | number | string | null;

export type EditorItem = {
    id: number;
    adItem: AdItem | null;
    placements: EditorPlacement[];
    quantity: number;
    amount: number;
    amount_str?: string;
    startDate: EditorDate;
    endDate: EditorDate;
    discount: number;
    discount_str?: string;
    fee: number;
    duration?: Duration;
    ranking?: number;
    /** The store item's directory name, kept for the save. */
    directory?: string;
};

export type EditorTerm = {
    id?: number;
    due_date: EditorDate;
    amount_due: number;
    amount_paid: number;
    is_changed?: boolean;
    status?: number;
};

export type EditorInvoice = {
    id: number | null;
    printed_date: EditorDate;
    term: number;
    term_name: string;
    status: number;
    discount_description: string;
    renewal_date: EditorDate;
    message: string | null;
    sale_type: number;
    billing_name?: string;
    billing_address?: string;
};

export type Option = { value: number; label: string };

/** /providers/:id/billings */
export type Billing = {
    billing_name: string;
    street_address_1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    other_info: string;
};

export type ProviderBilling = (Partial<Billing> & { billing?: Billing }) | null;

export type Contact = {
    id: number | null;
    firstname: string;
    lastname: string;
    job_title: string;
    email: string;
    phone: string;
};

export type EditorPayment = { id: number; date_created: EditorDate; amount: number };

export type Snapshot = {
    invoice: EditorInvoice;
    invoiceItems: EditorItem[];
    paymentTerms: EditorTerm[];
    paymentOption: string;
    paymentCount: number;
    paymentDueDate: EditorDate;
    upcharge: number;
    selectedProvider: Option | null;
    providerBilling: ProviderBilling;
    contact: Partial<Contact>;
};

export type EditorState = Snapshot & {
    payments: EditorPayment[];
    selected: number[];
    selectedInvoiceItem: EditorItem | null;
    /** Index of the placement chip being edited (the source keeps the
        placement object and compares with Object.is). */
    selectedPlacement: number | null;
    placementDrawerOpen: boolean;
    upchargeOpen: boolean;
    discountOpen: boolean;
    is_new: boolean;
    previous_content: Snapshot;
};

export type StateChange = Partial<EditorState> | ((s: EditorState) => Partial<EditorState>);

/** The page-level DialogBox (AddEditInvoice.js `state.dialog`). */
export type PageDialog = {
    open: boolean;
    title?: string;
    content?: string;
    actions?: "" | "Ok" | "OkCancel" | "Cancel";
    onOk?: () => void;
    onCancel?: () => void;
    stringOverride?: { primaryAction?: string; secondaryAction?: string };
};
