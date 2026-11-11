export type TransferMethodId = "ach" | "wire" | "wise" | "paypal";
export type MethodId = "card" | TransferMethodId;

export interface InvoiceLine {
    name: string;
    description?: string;
    qty: number;
    priceCents: number;
}

/** A late fee GoAbroad added after the due date passed. */
export interface LateFee {
    name: string;
    amountCents: number;
    appliedOn: string;
}

/** The payer told us they sent a transfer; staff still have to match it. */
export interface TransferClaim {
    method: TransferMethodId;
    amountCents: number;
    on: string;
    customerReference?: string;
}

/** A payment that has been recorded against the invoice. */
export interface RecordedPayment {
    method: MethodId;
    amountCents: number;
    on: string;
    /** e.g. "Visa ending 4242" or "Wire transfer". */
    detail: string;
}

export interface DemoInvoice {
    /** Opaque id used in the URL and in the "Pay this invoice" email link. */
    token: string;
    number: string;
    email: string;
    company: string;
    title: string;
    issued: string;
    due: string;
    lines: InvoiceLine[];
    lateFees: LateFee[];
    /** Payments recorded before today (partial payments). */
    paidCents: number;
    /** Card is switched off for some invoices (e.g. over the card limit). */
    cardAllowed: boolean;
    claim?: TransferClaim;
    payment?: RecordedPayment;
    /** Short label for the prototype's demo-invoice list. */
    scenario: string;
}

export interface DetailRow {
    label: string;
    value: string;
    /** Show a copy button next to the value. */
    copy?: boolean;
}

export interface TransferMethod {
    id: TransferMethodId;
    /** Name in the method list. */
    title: string;
    /** Fills "We're watching for your ___". */
    what: string;
    heading: string;
    intro: (reference: string) => string;
    feeCents: number;
    feeLabel?: string;
    rows: (amount: string, reference: string) => DetailRow[];
    /** External page the payer finishes on (Wise, PayPal). */
    link?: { label: string };
    referenceLabel: string;
}

export interface BillingAddress {
    country: string;
    region: string;
    postalCode: string;
}

export interface CardQuote {
    applies: boolean;
    feeCents: number;
    chargeCents: number;
    disclosure: string;
}
