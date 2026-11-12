import type { DemoInvoice, TransferMethod } from "./types";

/* ------------------------------------------------------------------ */
/* Business details                                                    */
/* Everything below is DEMO data — bank numbers, addresses and emails  */
/* are placeholders, not real GoAbroad accounts.                       */
/* ------------------------------------------------------------------ */

export const business = {
    name: "GoAbroad",
    payee: "GoAbroad.com",
    billingEmail: "billing@goabroad.com",
    logo: "https://images.goabroad.com/image/upload/h_208,w_272,q_100/v1/images2/goabroad-logo.webp",
    lateFeePolicy: "Invoices still unpaid 15 days after the due date get a 5% late fee.",
};

/** Card is only offered when the amount being paid is this or less. GoAbroad
 *  absorbs card processing fees, so the payer never sees one; capping card
 *  payments keeps those fees small. Above it: bank, wire, Wise or PayPal. */
export const CARD_LIMIT_CENTS = 500_00;
export const cardAvailable = (dueCents: number) => dueCents <= CARD_LIMIT_CENTS;

/* ------------------------------------------------------------------ */
/* Demo invoices — one per state the payer can land in                 */
/* ------------------------------------------------------------------ */

export const invoices: DemoInvoice[] = [
    {
        token: "k7q2m9",
        number: "GA-10482",
        email: "andes@example.com",
        company: "Andes Bridge Volunteers",
        title: "Featured Listing + Homepage Spotlight",
        issued: "Nov 2, 2026",
        due: "Dec 2, 2026",
        lines: [
            {
                name: "Featured Listing — Volunteer Abroad Directory",
                description: "Q1 2027 · Jan 1 – Mar 31",
                qty: 1,
                priceCents: 300_00,
            },
            {
                name: "Homepage Spotlight",
                description: "January 2027",
                qty: 1,
                priceCents: 150_00,
            },
        ],
        lateFees: [],
        paidCents: 0,
        billingAddress: {
            line1: "1550 Larimer Street, Suite 400",
            city: "Denver",
            region: "CO",
            postalCode: "80202",
            country: "US",
        },
        scenario: "Open invoice",
    },
    {
        token: "p3x8v1",
        number: "GA-10455",
        email: "sol@example.com",
        company: "Sol Language School",
        title: "Annual Listing Subscription",
        issued: "Sep 16, 2026",
        due: "Oct 16, 2026",
        lines: [
            {
                name: "Annual Listing Subscription",
                description: "Oct 2026 – Sep 2027 · up to 10 program listings",
                qty: 1,
                priceCents: 2_400_00,
            },
        ],
        lateFees: [
            { name: "Late fee (5%)", amountCents: 120_00, appliedOn: "Nov 1, 2026" },
        ],
        paidCents: 0,
        billingAddress: {
            line1: "Calle de Alcalá 120, 2º",
            city: "Madrid",
            region: "Madrid",
            postalCode: "28009",
            country: "ES",
        },
        scenario: "Overdue, late fee added",
    },
    {
        token: "r5n2c7",
        number: "GA-10431",
        email: "kumbali@example.com",
        company: "Kumbali Conservation Trust",
        title: "Sponsored Article + Newsletter Feature",
        issued: "Oct 5, 2026",
        due: "Nov 20, 2026",
        lines: [
            {
                name: "Sponsored Article",
                description: "“10 Wildlife Volunteer Programs in Kenya”",
                qty: 1,
                priceCents: 1_100_00,
            },
            {
                name: "Newsletter Feature",
                description: "October 2026 send",
                qty: 1,
                priceCents: 400_00,
            },
        ],
        lateFees: [],
        paidCents: 500_00,
        billingAddress: {
            line1: "Ngong Road, Kilimani",
            city: "Nairobi",
            region: "",
            postalCode: "00100",
            country: "KE",
        },
        scenario: "Partly paid",
    },
    {
        token: "w9d4h6",
        number: "GA-10470",
        email: "seoul@example.com",
        company: "Seoul Teach Partners",
        title: "Sidebar Ad Campaign",
        issued: "Oct 28, 2026",
        due: "Nov 27, 2026",
        lines: [
            {
                name: "Sidebar Ad — Teach Abroad Directory",
                description: "December 2026",
                qty: 1,
                priceCents: 780_00,
            },
        ],
        lateFees: [],
        paidCents: 0,
        billingAddress: {
            line1: "45 Teheran-ro, Gangnam-gu",
            city: "Seoul",
            region: "Seoul",
            postalCode: "06164",
            country: "KR",
        },
        claim: {
            method: "wire",
            amountCents: 805_00,
            on: "Nov 8, 2026",
            customerReference: "FT2631288",
        },
        scenario: "Wire sent, waiting to be matched",
    },
    {
        token: "b2t6z8",
        number: "GA-10490",
        email: "puravida@example.com",
        company: "Pura Vida Gap Year",
        title: "Top Rated Sponsorship + Featured Listings",
        issued: "Nov 4, 2026",
        due: "Dec 4, 2026",
        lines: [
            {
                name: "Top Rated Sponsorship",
                description: "2027 awards season",
                qty: 1,
                priceCents: 4_500_00,
            },
            {
                name: "Featured Listing — Gap Year Directory",
                description: "4 programs × 6 months",
                qty: 4,
                priceCents: 500_00,
            },
        ],
        lateFees: [],
        paidCents: 0,
        billingAddress: {
            line1: "Avenida Central, Calle 5",
            city: "San José",
            region: "San José",
            postalCode: "10101",
            country: "CR",
        },
        scenario: "Over the card limit",
    },
    {
        token: "m1f5s3",
        number: "GA-10398",
        email: "lisbon@example.com",
        company: "Lisbon Study Centre",
        title: "Newsletter Feature",
        issued: "Sep 12, 2026",
        due: "Oct 12, 2026",
        lines: [
            {
                name: "Newsletter Feature",
                description: "September 2026 send",
                qty: 1,
                priceCents: 350_00,
            },
        ],
        lateFees: [],
        paidCents: 0,
        billingAddress: {
            line1: "Rua Augusta 100",
            city: "Lisboa",
            region: "Lisboa",
            postalCode: "1100-053",
            country: "PT",
        },
        payment: {
            method: "card",
            amountCents: 350_00,
            on: "Oct 2, 2026",
            detail: "Visa ending 4242",
        },
        scenario: "Already paid",
    },
];

/* ------------------------------------------------------------------ */
/* Transfer methods (card has its own flow)                            */
/* ------------------------------------------------------------------ */

const bank = {
    name: "Demo Bank, N.A.",
    account: "000123456789",
    routing: "123456789",
    swift: "DEMOUS33XXX",
    address: "1 Example Plaza\nNew York, NY 10001\nUSA",
};

export const transferMethods: TransferMethod[] = [
    {
        id: "ach",
        title: "Bank transfer (ACH)",
        what: "bank transfer",
        heading: "Pay by bank transfer (ACH)",
        intro: () =>
            "Send an ACH transfer from a US bank account for exactly the amount due, with your invoice number as the reference.",
        feeCents: 0,
        rows: (amount, reference) => [
            { label: "Account name", value: business.payee },
            { label: "Bank", value: bank.name },
            { label: "Account number", value: bank.account, copy: true },
            { label: "Routing number (ABA)", value: bank.routing, copy: true },
            { label: "Account type", value: "Checking" },
            { label: "Amount", value: amount, copy: true },
            { label: "Reference", value: reference, copy: true },
        ],
        referenceLabel: "Transfer reference",
    },
    {
        id: "wire",
        title: "International wire transfer",
        what: "wire transfer",
        heading: "Pay by wire transfer",
        intro: () =>
            "Use your invoice number as the payment reference. The amount includes our $25 wire fee. At your bank, pick the option where you pay any intermediary charges (often called “OUR”) so the full amount reaches us.",
        feeCents: 25_00,
        feeLabel: "Wire fee",
        rows: (amount, reference) => [
            { label: "Beneficiary", value: business.payee },
            { label: "Bank", value: bank.name },
            { label: "Account number", value: bank.account, copy: true },
            { label: "SWIFT / BIC", value: bank.swift, copy: true },
            { label: "ABA routing number", value: bank.routing, copy: true },
            { label: "Bank address", value: bank.address },
            { label: "Amount", value: amount, copy: true },
            { label: "Reference", value: reference, copy: true },
        ],
        referenceLabel: "Wire confirmation number",
    },
    {
        id: "wise",
        title: "Wise",
        what: "Wise payment",
        heading: "Pay with Wise",
        intro: (reference) =>
            `Before you pay: on the Wise page, put ${reference} in the payment description so we can match your payment.`,
        feeCents: 0,
        rows: (amount, reference) => [
            { label: "Amount", value: amount, copy: true },
            { label: "Description", value: reference, copy: true },
        ],
        link: { label: "Open Wise" },
        referenceLabel: "Wise transfer number",
    },
    {
        id: "paypal",
        title: "PayPal",
        what: "PayPal payment",
        heading: "Pay with PayPal",
        intro: (reference) =>
            `Send the amount to our PayPal business account and add ${reference} in the note to seller.`,
        feeCents: 0,
        rows: (amount, reference) => [
            { label: "Send to", value: "demo-payments@goabroad.com", copy: true },
            { label: "Amount", value: amount, copy: true },
            { label: "Note", value: reference, copy: true },
        ],
        link: { label: "Open PayPal" },
        referenceLabel: "PayPal transaction ID",
    },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const money = (cents: number) => usd.format(cents / 100);
/** The card limit as people say it: "$500". */
export const cardLimitLabel = money(CARD_LIMIT_CENTS).replace(/\.00$/, "");

export const lineTotal = (inv: DemoInvoice) =>
    inv.lines.reduce((sum, l) => sum + l.qty * l.priceCents, 0);
export const lateFeeTotal = (inv: DemoInvoice) =>
    inv.lateFees.reduce((sum, f) => sum + f.amountCents, 0);
export const invoiceTotal = (inv: DemoInvoice) => lineTotal(inv) + lateFeeTotal(inv);
export const amountDue = (inv: DemoInvoice) => invoiceTotal(inv) - inv.paidCents;

const digits = (s: string) => s.replace(/\D/g, "").replace(/^0+/, "");

/** Lookup gate: the number and the email it was sent to must both match. */
export function findInvoice(number: string, email: string) {
    const n = digits(number);
    const e = email.trim().toLowerCase();
    return invoices.find((inv) => digits(inv.number) === n && inv.email === e);
}

export const findByToken = (token: string) => invoices.find((inv) => inv.token === token);

export const getTransferMethod = (id: string) => transferMethods.find((m) => m.id === id);

export const todayLabel = () =>
    new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
