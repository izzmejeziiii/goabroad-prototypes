import { accountManagers, teamList } from "../../data";
import { toRow, type InvoiceRow } from "../../format";
import type { Invoice } from "../../types";
import type { DateValue } from "../../results-table/types";
import { account_status_label, hasValue, type Sort, type StaffFilters, type StaffRow } from "./constants";

/* What GET /invoices does for InvoicesProvider.getInvoices(), done over the
   demo invoices: the same filters (provider_id, id, the date ranges,
   payment_status / sale_type with -1 meaning all, wildcard contact name /
   email, account manager, the global filters), the sort (invoice_date is
   printed_date) and the totals the label reads. With no sort the list is
   newest invoice first. */

const STATUS_ID: Record<string, number> = {
    draft: 0,
    pending: 1,
    unpaid: 2,
    partial: 3,
    overdue: 4,
    paid: 5,
    void: 6,
    "near due": 7,
};

export const statusId = (row: Pick<InvoiceRow, "payment_status">) => STATUS_ID[row.payment_status];

const inRange = (value: string, range: DateValue | null | undefined) => {
    if (!range?.start) return true;
    const day = value.slice(0, 10);
    return range.end ? day >= range.start && day <= range.end : day === range.start;
};

const idList = (value: string | number) =>
    String(value)
        .split(",")
        .map((v) => Number(v));

/** The proxy's list row: toRow() plus ResultsMain's url / team mapping. */
export const toStaffRow = (inv: Invoice): StaffRow => {
    const row = toRow(inv);
    return {
        ...row,
        url: `/client/profile/${row.provider_id}`,
        team: inv.team ? { id: inv.team.id, name: inv.team.name } : { id: 0, name: "Unassigned" },
        team_name: inv.team?.name || "Unassigned",
        is_active: inv.is_active ? 1 : 0,
        open: row.open ? 1 : 0,
        source: 0,
    };
};

/** What this browser session did that the demo store has no field for:
    deleted drafts and the open / closed flag. */
export type LocalChanges = { deleted: number[]; open: Record<number, 0 | 1> };

export const withLocal = (row: StaffRow, local: LocalChanges): StaffRow =>
    row.id in local.open ? { ...row, open: local.open[row.id] } : row;

export const queryInvoices = (invoices: Invoice[], filters: StaffFilters, sort: Sort, local: LocalChanges) => {
    const f = filters;
    let rows = invoices
        .filter((inv) => !local.deleted.includes(inv.id))
        .map((inv) => withLocal(toStaffRow(inv), local))
        .filter((row) => {
        if (hasValue(f.provider_id) && !String(f.provider_id).split(",").includes(String(row.provider_id))) return false;
        if (hasValue(f.id) && String(row.id) !== String(f.id).trim()) return false;
        if (!inRange(row.invoice_date, f.invoice_date)) return false;
        if (!inRange(row.due_date, f.due_date)) return false;
        if (!inRange(row.renewal_date, f.renewal_date)) return false;
        // `value < 0 ? '' : key=value`: -1 (ALL) sends nothing.
        if (hasValue(f.payment_status) && !(Number(f.payment_status) < 0) && !idList(f.payment_status!).includes(statusId(row)))
            return false;
        if (hasValue(f.sale_type) && !(Number(f.sale_type) < 0) && !idList(f.sale_type!).includes(row.sale_type))
            return false;
        const contactName = `${row.contact.firstname} ${row.contact.lastname}`.toLowerCase();
        if (hasValue(f.contact_name) && !contactName.includes(String(f.contact_name).toLowerCase())) return false;
        if (hasValue(f.contact_email) && !row.contact.email.toLowerCase().includes(String(f.contact_email).toLowerCase()))
            return false;
        if (hasValue(f.account_manager_id)) {
            const manager = accountManagers.find((m) => String(m.employee_id) === String(f.account_manager_id));
            if (!manager || manager.name !== row.account_manager) return false;
        }
        if (hasValue(f.is_active) && row.is_active !== Number(f.is_active)) return false;
        if (hasValue(f.team_id) && row.team.id !== Number(f.team_id)) return false;
        if (hasValue(f.open) && (row.open ? 1 : 0) !== Number(f.open)) return false;
        if (hasValue(f.has_comment) && (row.comment_count > 0 ? 1 : 0) !== Number(f.has_comment)) return false;
        if (hasValue(f.source) && row.source !== Number(f.source)) return false;
        return true;
    });

    if (sort.length) {
        const [{ key, direction }] = sort;
        const dir = direction === "asc" ? 1 : -1;
        rows = [...rows].sort((a, b) => {
            const av = a[key as keyof StaffRow] as string | number;
            const bv = b[key as keyof StaffRow] as string | number;
            return (av < bv ? -1 : av > bv ? 1 : 0) * dir || b.id - a.id;
        });
    } else {
        rows = [...rows].sort((a, b) => b.id - a.id);
    }

    return {
        invoices: rows,
        count: rows.length,
        total_amount: rows.reduce((s, r) => s + r.total_amount, 0),
        amount_due: rows.reduce((s, r) => s + r.amount_due, 0),
    };
};

/** The teams GET /teams returns, padded the way GlobalFilterDrawer's
    padTeams() pads the shared list (Unassigned first, Content last). */
export const teams = [{ id: 0, name: "Unassigned" }, ...teamList.map(({ id, name }) => ({ id, name })), { id: 23, name: "Content" }];

/** InvoicesProvider.getTableLabel(): "Invoices from Active Accounts, North
    with Total Invoiced Amount $1.00" (the parts are joined with spaces, so
    with no filter label there are two, which the page collapses). */
export const getTableLabel = (filters: StaffFilters, count: number, total_amount: number, amount_due: number) => {
    const team = hasValue(filters.team_id) ? teams.find((t) => t.id === Number(filters.team_id))?.name : "";
    const labels = [
        hasValue(filters.is_active) ? `${account_status_label[Number(filters.is_active)]} Accounts` : "",
        team,
    ].filter((l) => !!l);
    const filterLabels = labels.length ? `from ${labels.join(", ")}` : "";
    const invoice = `Invoice${count > 1 || count === 0 ? "s" : ""}`;
    const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    const total = formatter.format(filters.due_date ? amount_due : total_amount);
    const withTotal = `with ${filters.due_date ? "Total Amount Due" : "Total Invoiced Amount"} ${total}`;
    return [invoice, filterLabels, withTotal].join(" ");
};
