"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/AddEditInvoiceProvider.js:
   the editor's shared state, handleStateChange and the calculations every
   section reads (withInvoiceContext → useEditor). */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import * as calc from "./calc";
import { hasChanges } from "./mapping";
import type { EditorState, StateChange } from "./types";

type EditorContextValue = {
    state: EditorState;
    handleStateChange: (change: StateChange) => void;
    getSubTotal: () => number;
    getTotalDiscount: () => number;
    getInvoiceTotal: () => number;
    getPaymentTotal: () => number;
    getBalanceTotal: () => number;
    getSubTotalOfSelected: () => number;
    buildPaymentTerms: () => void;
    recomputePaymentTerms: () => void;
    updatePlacementDiscount: () => void;
    hasChanges: () => boolean;
};

const Ctx = createContext<EditorContextValue | null>(null);

export const EditorProvider = ({ initial, children }: { initial: EditorState; children: ReactNode }) => {
    const [state, setState] = useState(initial);

    // Functional so calls in one handler chain like the source's
    // mutate-then-setState sequences (each sees the previous change).
    const handleStateChange = useCallback(
        (change: StateChange) =>
            setState((prev) => ({ ...prev, ...(typeof change === "function" ? change(prev) : change) })),
        [],
    );

    const value = useMemo<EditorContextValue>(
        () => ({
            state,
            handleStateChange,
            getSubTotal: () => calc.getSubTotal(state),
            getTotalDiscount: () => calc.getTotalDiscount(state),
            getInvoiceTotal: () => calc.getInvoiceTotal(state),
            getPaymentTotal: () => calc.getPaymentTotal(state),
            getBalanceTotal: () => calc.getBalanceTotal(state),
            getSubTotalOfSelected: () => calc.getSubTotalOfSelected(state),
            buildPaymentTerms: () => handleStateChange((s) => ({ paymentTerms: calc.buildPaymentTerms(s) })),
            recomputePaymentTerms: () =>
                handleStateChange((s) => ({ paymentTerms: calc.recomputePaymentTerms(s) })),
            updatePlacementDiscount: () =>
                handleStateChange((s) => ({ invoiceItems: calc.updatePlacementDiscount(s) })),
            hasChanges: () => hasChanges(state),
        }),
        [state, handleStateChange],
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useEditor = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useEditor needs <EditorProvider>");
    return ctx;
};
