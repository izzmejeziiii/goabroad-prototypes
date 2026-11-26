import { productItems } from "../../data";
import type { Invoice } from "../../types";
import type { Billing, Contact, Crit, Duration } from "./types";

/* What the editor fetches from the proxy on mount (product items,
   locations, the directory's types and timings, a provider's billing).
   data.ts only has the product list, so the rest is derived here: every
   location / type / timing the demo invoices use is in these lists, so a
   placement opened from a chip finds its option again. Made-up data. */

export const DIRECTORIES = [
    { id: 1, name: "Volunteer Abroad" },
    { id: 2, name: "Study Abroad" },
    { id: 3, name: "Intern Abroad" },
    { id: 4, name: "Teach Abroad" },
    { id: 5, name: "Language Schools" },
    { id: 6, name: "Gap Year" },
];

export const directoryId = (name?: string) => DIRECTORIES.find((d) => d.name === name)?.id ?? 0;
export const directoryName = (id?: number) => DIRECTORIES.find((d) => d.id === id)?.name ?? "";

/** Each product's own directory and run length (ad_type.directory_id /
    ad_type.duration in the real list). */
const PRODUCT_META: Record<number, { directory_id: number; duration: Duration }> = {
    12: { directory_id: 1, duration: { type: "year", value: 1 } },
    18: { directory_id: 1, duration: { type: "year", value: 1 } },
    29: { directory_id: 1, duration: { type: "month", value: 3 } },
    31: { directory_id: 1, duration: { type: "year", value: 1 } },
    44: { directory_id: 1, duration: { type: "year", value: 1 } },
    53: { directory_id: 2, duration: { type: "month", value: 3 } },
    61: { directory_id: 2, duration: { type: "month", value: 3 } },
};

/** search_criteria_value of a product sold per placement (non-zero). */
const HAS_PLACEMENT = 14;

/** /invoices/product-items: context.state.ad_types. */
export const AD_TYPES = productItems.map((p) => ({
    id: p.value,
    item_name: p.label,
    cost: p.cost,
    directory_id: PRODUCT_META[p.value]?.directory_id ?? 1,
    search_criteria_value: HAS_PLACEMENT,
    duration: PRODUCT_META[p.value]?.duration ?? ({ type: "open", value: "" } as Duration),
}));

export type AdType = (typeof AD_TYPES)[number];

const slug = (prefix: string, name: string) =>
    `${prefix}_${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
const crits = (prefix: string, names: string[]): Crit[] =>
    names.map((name) => ({ id: slug(prefix, name), name }));

/** /locations */
export const LOCATIONS = crits(
    "loc",
    [
        "Argentina", "Australia", "Bolivia", "Cambodia", "Canada", "Chile", "China",
        "Costa Rica", "Ecuador", "Fiji", "France", "Germany", "Ghana", "Guatemala",
        "India", "Indonesia", "Ireland", "Italy", "Japan", "Kenya", "Mexico", "Morocco",
        "Nepal", "New Zealand", "Peru", "Philippines", "Portugal", "South Africa",
        "South Korea", "Spain", "Sri Lanka", "Taiwan", "Tanzania", "Thailand",
        "Uganda", "United Kingdom", "United States", "Vanuatu", "Vietnam", "Zambia",
    ],
);

/** The directory's "type" criteria (getCriteriaByDirectory(...).type). */
const TYPES_BY_DIRECTORY: Record<number, string[]> = {
    1: [
        "Volunteer Abroad", "Animal & Wildlife", "Community Development",
        "Conservation & Environment", "Healthcare & Medical", "Marine Conservation",
        "Teaching", "Women's Empowerment",
    ],
    2: [
        "Study Abroad", "Art & Design", "Business", "Environmental Science",
        "Language Study", "Marine Biology", "Public Health",
    ],
    3: ["Intern Abroad", "Business", "Engineering", "Healthcare", "Marketing", "NGO & Nonprofit"],
    4: ["Teach Abroad", "Teach English", "TEFL Courses", "University Teaching"],
    5: ["Language Schools", "French", "Italian", "Japanese", "Korean", "Mandarin", "Spanish"],
    6: ["Gap Year", "Adventure Travel", "Cultural Immersion", "Volunteer Programs"],
};

const TIMINGS = [
    "Year-round", "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December", "Q1 2027", "Q2 2027",
    "Q3 2027", "Q4 2027", "Spring 2027", "Summer 2027", "Fall 2026", "Fall 2027",
];

export const typesFor = (directory_id: number) => crits("type", TYPES_BY_DIRECTORY[directory_id] ?? []);
export const timingsFor = (directory_id: number) => (directory_id ? crits("time", TIMINGS) : []);

/** Every type name, for mapping a stored label back to an option. */
export const ALL_TYPES = crits("type", [...new Set(Object.values(TYPES_BY_DIRECTORY).flat())]);
export const ALL_TIMINGS = crits("time", TIMINGS);

export const findCrit = (list: Crit[], prefix: string, name?: string): Crit | null =>
    name ? (list.find((c) => c.name === name) ?? { id: slug(prefix, name), name }) : null;

export const ONLINE: Crit = { id: 1, name: "Online" };

/* ── Provider billing ─────────────────────────────────────────────────── */

/** Splits a stored "street\ncity zip\ncountry" address into the billing
    object getBillingToDetails() turns back into the same string. */
export const billingFromInvoice = (inv: Pick<Invoice, "billing_name" | "billing_address">): Billing => {
    const lines = inv.billing_address.split("\n");
    const street = lines.length > 2 ? lines.slice(0, lines.length - 2).join("\n") : (lines[0] ?? "");
    const cityLine = lines.length > 2 ? lines[lines.length - 2] : (lines[1] ?? "");
    const country = lines.length > 2 ? lines[lines.length - 1] : (lines[2] ?? "");
    const cut = cityLine.lastIndexOf(" ");
    return {
        billing_name: inv.billing_name,
        street_address_1: street,
        city: cut > 0 ? cityLine.slice(0, cut) : cityLine,
        state: "",
        zip: cut > 0 ? cityLine.slice(cut + 1) : "",
        country,
        other_info: "",
    };
};

/** The newest invoice of a provider: where the prototype reads what the
    API would return for /providers/:id/billings and the contact. */
export const latestInvoiceOf = (invoices: Invoice[], providerId: number) =>
    [...invoices]
        .filter((i) => i.provider_id === providerId)
        .sort((a, b) => b.printed_date.localeCompare(a.printed_date))[0];

export const contactFromInvoice = (inv?: Invoice): Contact => ({
    id: inv?.contact.id ?? null,
    firstname: inv?.contact.firstname ?? "",
    lastname: inv?.contact.lastname ?? "",
    job_title: inv?.contact.job_title ?? "",
    email: inv?.email ?? "",
    phone: inv?.contact.phone ?? "",
});
