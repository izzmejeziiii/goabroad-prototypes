"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useInvoices } from "../../store";
import { getTableLabel, queryInvoices, toStaffRow, withLocal, type LocalChanges } from "./query";
import type { Sort, StaffFilters, StaffRow } from "./constants";

/* Copy of src/views/Client/Invoices/InvoicesProvider.js: the list's state
   (filters, sort, paging, which drawer is open, the selected invoice) and
   what it fetched. Here the "fetch" is queryInvoices() over the shared demo
   store, so a payment or comment made anywhere shows up straight away. The
   selected invoice is kept by id and read back from the store, standing in
   for the payment terms / comments the real drawer re-fetches. */

export type StaffState = {
    filters: StaffFilters;
    prevFilters: StaffFilters;
    sort: Sort;
    page: number;
    rowsPerPage: number;
    selectedInvoiceId: number | null;
    drawerTabSelected: number;
    invoiceSummaryOpen: boolean;
    globalFilterOpen: boolean;
    paymentDrawerOpen: boolean;
    editPayment: boolean;
    selectedPaymentTermKey: number;
    showColumnFilters: boolean;
    commentsShown: number;
};

type Ctx = {
    state: StaffState;
    handleStateChanged: (patch: Partial<StaffState>) => void;
    /** Every matching row, sorted (ResultsMain slices the page). */
    data: StaffRow[];
    count: number;
    label: string;
    selectedInvoice: StaffRow | null;
    local: LocalChanges;
    setLocal: (update: (l: LocalChanges) => LocalChanges) => void;
};

const InvoicesContext = createContext<Ctx | null>(null);

export const InvoicesProvider = ({ children }: { children: ReactNode }) => {
    const { invoices } = useInvoices();
    const [state, setState] = useState<StaffState>({
        filters: {},
        prevFilters: {},
        sort: [],
        page: 0,
        rowsPerPage: 10,
        selectedInvoiceId: null,
        drawerTabSelected: 0,
        invoiceSummaryOpen: false,
        globalFilterOpen: false,
        paymentDrawerOpen: false,
        editPayment: false,
        selectedPaymentTermKey: 0,
        showColumnFilters: false,
        commentsShown: 5,
    });

    const [local, setLocal] = useState<LocalChanges>({ deleted: [], open: {} });

    const handleStateChanged = useCallback((patch: Partial<StaffState>) => setState((s) => ({ ...s, ...patch })), []);

    const result = useMemo(
        () => queryInvoices(invoices, state.filters, state.sort, local),
        [invoices, state.filters, state.sort, local],
    );
    const label = getTableLabel(state.filters, result.count, result.total_amount, result.amount_due);

    const selected = invoices.find((i) => i.id === state.selectedInvoiceId);
    const selectedInvoice = useMemo(() => (selected ? withLocal(toStaffRow(selected), local) : null), [selected, local]);

    return (
        <InvoicesContext.Provider
            value={{
                state,
                handleStateChanged,
                data: result.invoices,
                count: result.count,
                label,
                selectedInvoice,
                local,
                setLocal,
            }}
        >
            {children}
        </InvoicesContext.Provider>
    );
};

export const useInvoicesContext = () => {
    const ctx = useContext(InvoicesContext);
    if (!ctx) throw new Error("needs <InvoicesProvider>");
    return ctx;
};
