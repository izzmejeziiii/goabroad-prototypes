/* Shapes for /admin-invoices. They follow the invoice the admin's proxy
   returns (gacom-admin-redesign src/views/ClientAdmin/Tools/ViewInvoice and
   src/views/Client/Invoices), snake_case and all, so copied components can
   read the same keys the real ones do. */

/** invoice.status / payment status ids, as the admin's filters list them. */
export type InvoiceStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** The lower-case payment status string list rows carry (StatusChip input). */
export type PaymentStatusName =
    | "draft"
    | "pending"
    | "unpaid"
    | "partial"
    | "overdue"
    | "paid"
    | "void"
    | "near due";

/** SALE_TYPE_VALUE ids: NONE, ORGANIC, NURTURED, RENEWED SAME PACKAGE,
    UPGRADE, DOWNGRADE, NONRENEWABLE, RECOVERED. */
export type SaleType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** One entry of item.placements_label (what the placement is). */
export type PlacementLabel = {
    location?: string;
    online?: string;
    type?: string;
    timing?: string;
    directory?: string;
};

export type InvoiceItem = {
    id: number;
    product_item_id: number;
    product_item_name: string;
    directory: string;
    /** Price of one placement. */
    cost: number;
    /** cost × placements. Placement discounts roll up into the invoice's
        `discount` (the editor saves them that way, like the API). */
    subtotal: number;
    /** "yyyy-MM-dd", or "0000-00-00" when there is none. */
    start_date: string;
    end_date: string;
    /** One per placement, in placements_label order. */
    placements: { discount: number }[];
    placements_label: PlacementLabel[];
};

export type PaymentTerm = {
    id: number;
    /** "yyyy-MM-dd HH:mm:ss" like the API. */
    due_date: string;
    amount_due: number;
    amount_paid: number;
};

export type PaymentMethod =
    | "Credit Card"
    | "Bank Payment (ACH)"
    | "Wire Transfer"
    | "Check"
    | "PayPal"
    | "Zelle";

export type Payment = {
    id: number;
    /** "yyyy-MM-dd HH:mm:ss". */
    date_created: string;
    amount: number;
    /** What the payer was charged; above `amount` when a card fee applied. */
    total_amount: number;
    payment_method: PaymentMethod;
    reference: string;
    /** Staff member who recorded it, or "Stripe" for online payments. */
    recorded_by: string;
    payment_term_id: number;
};

/** A bank payment submitted online that hasn't cleared yet. */
export type PendingPayment = { amount: number; since: string };

export type InvoiceComment = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    message: string;
    /** "yyyy-MM-dd HH:mm:ss". */
    timestamp: string;
};

export type InvoiceActivity = {
    id: number;
    /** "yyyy-MM-dd HH:mm:ss". */
    date_created: string;
    user: string;
    action: string;
};

export type Contact = {
    id: number;
    firstname: string;
    lastname: string;
    job_title: string;
    email: string;
    phone: string;
};

export type Team = { id: number; name: string; color: string };

export type Invoice = {
    id: number;
    provider_id: number;
    /** Client (provider) name. */
    name: string;
    status: InvoiceStatus;
    sale_type: SaleType;
    /** "yyyy-MM-dd". The invoice date. */
    printed_date: string;
    renewal_date: string;
    /** Term id and label, e.g. 4 / "Upon receipt". */
    term: number;
    term_name: string;
    discount: number;
    discount_description: string;
    upcharge: number;
    upcharge_description: string;
    message: string | null;
    billing_name: string;
    /** Newline-separated, as the API sends it. */
    billing_address: string;
    contact: Contact;
    email: string;
    account_manager: string;
    team: Team | null;
    is_active: boolean;
    invoice_items: InvoiceItem[];
    payment_terms: PaymentTerm[];
    payments: Payment[];
    pending_payment: PendingPayment | null;
    comments: InvoiceComment[];
    activities: InvoiceActivity[];
    /** Set once a PDF has been generated. */
    pdf: { file_name: string } | null;
    creator: string;
};

/** A provider in the staff Client Name filter and the editor's client box. */
export type Provider = {
    id: number;
    name: string;
    url: string;
    is_paying: 0 | 1;
};
