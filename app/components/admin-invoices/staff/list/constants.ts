import type { InvoiceRow } from "../../format";
import type { DateValue, SortDirection } from "../../results-table/types";

/* Constants and shapes of src/views/Client/Invoices (ResultsMain.js,
   InvoicesProvider.js, GlobalFiltersContainer.js) and the bits of
   src/config/constants.js they read. */

/** The signed-in staff member's access level: 3 (manager) is the one that
    sees every row menu (Send Invoice needs exactly 3, Void 3 or more, the
    drawer's Activity Log tab more than 1). */
export const ACCESS_LEVEL = 3;

export const SORTABLE_FIELDS = ["total_amount", "amount_due", "invoice_date", "due_date", "renewal_date"];

export const COLUMN_FILTER_NAMES = [
    "id",
    "provider_id",
    "name",
    "invoice_date",
    "payment_status",
    "due_date",
    "renewal_date",
    "sale_type",
] as const;

export const GLOBAL_FILTERS_NAMES = ["is_active", "team_id", "open", "has_comment"] as const;

export const GLOBAL_FILTER_NAMES = ["is_active", "team_id", "open", "has_comment", "source"] as const;

export const PAYMENT_STATUS_VALUE: { id: number | string; name: string }[] = [
    { id: -1, name: "ALL" },
    { id: "0", name: "DRAFT" },
    { id: 1, name: "PENDING" },
    { id: 2, name: "UNPAID" },
    { id: 3, name: "PARTIAL" },
    { id: 7, name: "NEAR DUE" },
    { id: 4, name: "OVERDUE" },
    { id: 5, name: "PAID" },
    { id: 6, name: "VOID" },
];

/** UNPAID, PARTIAL, OVERDUE, PAID ids joined: the Renewables quick filter. */
export const QUICK_FILTER_STATUSES = PAYMENT_STATUS_VALUE.filter(({ name }) =>
    ["UNPAID", "PARTIAL", "OVERDUE", "PAID"].includes(name),
)
    .map(({ id }) => id)
    .join(",");

/* SALE_TYPE_VALUE after ResultsMain's componentDidMount has had its way:
   id 0 becomes "0", and the { id: -1, name: "ALL" } it means to prepend
   goes onto the throwaway array .map() returned, so the Type of Sale filter
   never offers ALL. */
export const SALE_TYPE_VALUE: { id: number | string; name: string }[] = [
    { id: "0", name: "NONE" },
    { id: 1, name: "ORGANIC" },
    { id: 2, name: "NURTURED" },
    { id: 3, name: "RENEWED SAME PACKAGE" },
    { id: 4, name: "UPGRADE" },
    { id: 5, name: "DOWNGRADE" },
    { id: 6, name: "NONRENEWABLE" },
    { id: 7, name: "RECOVERED" },
];

export const account_status_label: Record<number, string> = { 0: "Inactive", 1: "Active" };

export const hasValue = (value: unknown) => value !== null && value !== undefined && value !== "";

export type StaffFilters = {
    provider_id?: string | null;
    id?: string | null;
    name?: string | null;
    invoice_date?: DateValue | null;
    due_date?: DateValue | null;
    renewal_date?: DateValue | null;
    payment_status?: string | number | null;
    sale_type?: string | number | null;
    contact_name?: string | null;
    contact_email?: string | null;
    account_manager_id?: string | number | null;
    is_active?: number | null;
    team_id?: number | string | null;
    open?: number | null;
    has_comment?: number | null;
    source?: number | null;
};

export type Sort = { key: string; direction: SortDirection }[];

/** A list row after ResultsMain's mapping (url, team fallback) plus the
    flags its icons read as the API sends them (numbers). */
export type StaffRow = Omit<InvoiceRow, "team" | "is_active" | "open"> & {
    url: string;
    team: { id: number; name: string };
    team_name: string;
    is_active: 0 | 1;
    /** The API's 0 / 1 (the row menus compare `row.open === 1`). */
    open: 0 | 1;
    /** 1 when the client ordered it through Create Ad; none of the demo
        invoices were. */
    source: 0 | 1;
};
