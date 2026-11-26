"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { client } from "../../data";
import { toRow, type InvoiceRow } from "../../format";
import { useInvoices } from "../../store";
import type { Sort } from "../../staff/list/constants";

/* Copy of src/views/ClientAdmin/Invoices/InvoicesProvider.js as the
   invoices list mounts it (isInvoicesList): the client's own invoices, a
   page at a time. GET /invoices sends payment_status=2,3,4,5 unless a
   single valid status is picked, so clients never see drafts, pending,
   void or near-due invoices. Column filters are typed straight into
   `filters` and only reach the list on the next fetch (apply, sort, page),
   which is what `applied` holds. */

const VALID_STATUS = [-1, 2, 3, 4, 5];
const STATUS_ID: Record<string, number> = { unpaid: 2, partial: 3, overdue: 4, paid: 5 };

export type ClientFilters = {
    payment_status?: number | string | null;
    id?: string | null;
    invoice_date?: string | null;
    due_date?: string | null;
    balance?: string | null;
};

export type ClientRow = InvoiceRow & { url: string };

type State = {
    filters: ClientFilters;
    applied: ClientFilters;
    sort: Sort;
    page: number;
    rowsPerPage: number;
    selectedInvoices: ClientRow[];
    processing: boolean;
};

type Ctx = {
    state: State;
    data: ClientRow[];
    count: number;
    label: string;
    handlePageChange: (page: number) => void;
    handleRowsPerPageChange: (rows: number) => void;
    handleColumnFiltersChange: (filter: keyof ClientFilters, value: unknown) => void;
    handleClearColumnFilters: () => void;
    handleApplyFilter: () => void;
    handleSortChange: (sort: Sort) => void;
    handleSelectMultipleRows: (rows: ClientRow[]) => void;
    handleDownloadInvoice: (isBatch: boolean) => void;
};

const InvoicesContext = createContext<Ctx | null>(null);

const inRange = (day: string, value?: string | null) => {
    if (!value) return true;
    const [start, end] = value.split(",");
    return end ? day >= start && day <= end : day === start;
};

export const InvoicesProvider = ({ children }: { children: ReactNode }) => {
    const { invoices } = useInvoices();
    const [state, setState] = useState<State>({
        filters: {},
        applied: {},
        sort: [],
        page: 1,
        rowsPerPage: 10,
        selectedInvoices: [],
        processing: false,
    });
    const set = useCallback((patch: Partial<State> | ((s: State) => Partial<State>)) =>
        setState((s) => ({ ...s, ...(typeof patch === "function" ? patch(s) : patch) })), []);

    const result = useMemo(() => {
        const { payment_status = null, ...rest } = state.applied;
        const statuses =
            payment_status !== -1 && VALID_STATUS.indexOf(payment_status as number) > -1 ? [Number(payment_status)] : [2, 3, 4, 5];
        let rows = invoices
            .filter((inv) => inv.provider_id === client.id)
            .map((inv) => ({ ...toRow(inv), url: `/client/profile/${inv.provider_id}` }))
            .filter((row) => statuses.includes(STATUS_ID[row.payment_status]))
            .filter((row) => !rest.id || String(row.id) === String(rest.id).trim())
            .filter((row) => inRange(row.invoice_date, rest.invoice_date))
            .filter((row) => inRange(row.due_date, rest.due_date))
            .filter((row) => !rest.balance || row.balance === Number(rest.balance));
        if (state.sort.length) {
            const [{ key, direction }] = state.sort;
            const dir = direction === "asc" ? 1 : -1;
            rows = rows.sort((a, b) => {
                const av = a[key as keyof ClientRow] as string | number;
                const bv = b[key as keyof ClientRow] as string | number;
                return (av < bv ? -1 : av > bv ? 1 : 0) * dir || b.id - a.id;
            });
        } else rows = rows.sort((a, b) => b.id - a.id);
        const total_amount = rows.reduce((s, r) => s + r.total_amount, 0);
        const amount_due = rows.reduce((s, r) => s + r.amount_due, 0);
        const count = rows.length;
        // getTableLabel()
        const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
        let label = `invoice${count > 1 || count === 0 ? "s" : ""}`;
        label += state.applied.due_date
            ? " with Total Amount Due " + formatter.format(amount_due)
            : " with Total Invoiced Amount " + formatter.format(total_amount);
        const offset = state.rowsPerPage * (state.page - 1);
        return { data: rows.slice(offset, offset + state.rowsPerPage), count, label };
    }, [invoices, state.applied, state.sort, state.page, state.rowsPerPage]);

    /** fetchInvoices(): whatever is in filters now is what gets sent. */
    const fetchWith = (patch: Partial<State>) => set((s) => ({ ...patch, applied: { ...(patch.filters ?? s.filters) } }));

    const value: Ctx = {
        state,
        data: result.data,
        count: result.count,
        label: result.label,
        handlePageChange: (page) => fetchWith({ page: page + 1 }),
        handleRowsPerPageChange: (rows) => fetchWith({ rowsPerPage: rows, page: 1 }),
        handleColumnFiltersChange: (filter, v) => set((s) => ({ filters: { ...s.filters, [filter]: v } })),
        handleClearColumnFilters: () => {
            if (Object.keys(state.filters).length) fetchWith({ filters: {}, selectedInvoices: [] });
        },
        handleApplyFilter: () => {
            const filters = Object.fromEntries(Object.entries(state.filters).filter(([, v]) => v !== null && v !== undefined));
            fetchWith({ filters, selectedInvoices: [] });
        },
        handleSortChange: (sort) => fetchWith({ sort, selectedInvoices: [] }),
        handleSelectMultipleRows: (rows) => set({ selectedInvoices: rows }),
        handleDownloadInvoice: (isBatch) => {
            // One PDF opens in a new tab and several download as a zip; the
            // demo has no PDFs, so a batch only shows the processing dialog.
            if (isBatch && state.selectedInvoices.length > 1) {
                set({ processing: true });
                setTimeout(() => set({ processing: false }), 600);
            }
        },
    };

    return <InvoicesContext.Provider value={value}>{children}</InvoicesContext.Provider>;
};

export const useClientInvoices = () => {
    const ctx = useContext(InvoicesContext);
    if (!ctx) throw new Error("needs <InvoicesProvider>");
    return ctx;
};
