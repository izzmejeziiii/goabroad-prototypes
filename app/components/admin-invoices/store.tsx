"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useSyncExternalStore,
    type ReactNode,
} from "react";
import { seedInvoices } from "./data";
import { deriveStatus, nowStamp } from "./format";
import type { Invoice, InvoiceComment, Payment } from "./types";

/* Browser-only demo state for /admin-invoices. Starts from data.ts and keeps
   what you do (record a payment, pay online, comment, save the editor) in
   localStorage, shared by both views, so a payment the client makes shows up
   in the staff list. "Reset demo" in the view switcher clears it. */

const KEY = "admin-invoices:v1";

type Store = {
    invoices: Invoice[];
    ready: boolean;
    getInvoice: (id: number | string) => Invoice | undefined;
    /** Replaces fields on an invoice, then re-derives its status. */
    updateInvoice: (id: number, patch: Partial<Invoice>) => void;
    /** Adds an invoice (editor "Save") and returns its id. */
    createInvoice: (invoice: Omit<Invoice, "id">) => number;
    /** Records a payment against the earliest open term(s). */
    addPayment: (
        id: number,
        payment: Omit<Payment, "id" | "payment_term_id" | "date_created"> & {
            date_created?: string;
        },
    ) => void;
    addComment: (id: number, message: string) => void;
    reset: () => void;
};

const Ctx = createContext<Store | null>(null);

const normalize = (list: Invoice[]) =>
    list.map((inv) => ({ ...inv, status: deriveStatus(inv) }));

const read = (): Invoice[] | null => {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Invoice[]) : null;
    } catch {
        return null;
    }
};

/* A tiny external store: the server (and hydration) renders the seed, the
   browser then switches to what localStorage holds. */
const SEED = normalize(seedInvoices);
let cache: Invoice[] | null = null;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

const snapshot = () => {
    if (cache === null) {
        const saved = read();
        cache = saved ? normalize(saved) : SEED;
    }
    return cache;
};

const emit = (next: Invoice[], persist = true) => {
    cache = next;
    if (persist) {
        try {
            localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
            /* private mode: keep it in memory */
        }
    }
    listeners.forEach((l) => l());
};

export const InvoiceStoreProvider = ({ children }: { children: ReactNode }) => {
    const invoices = useSyncExternalStore(subscribe, snapshot, () => SEED);
    const ready = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );

    const commit = useCallback(
        (next: (prev: Invoice[]) => Invoice[]) => emit(normalize(next(snapshot()))),
        [],
    );

    const getInvoice = useCallback(
        (id: number | string) => invoices.find((i) => i.id === Number(id)),
        [invoices],
    );

    const updateInvoice = useCallback(
        (id: number, patch: Partial<Invoice>) =>
            commit((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i))),
        [commit],
    );

    const createInvoice = useCallback(
        (invoice: Omit<Invoice, "id">) => {
            const id = Math.max(...snapshot().map((i) => i.id)) + 1;
            commit((prev) => [{ ...invoice, id } as Invoice, ...prev]);
            return id;
        },
        [commit],
    );

    const addPayment: Store["addPayment"] = useCallback(
        (id, payment) =>
            commit((prev) =>
                prev.map((inv) => {
                    if (inv.id !== id) return inv;
                    const sorted = [...inv.payment_terms].sort((a, b) =>
                        a.due_date.localeCompare(b.due_date),
                    );
                    const firstTerm =
                        (sorted.find((t) => t.amount_due > t.amount_paid) ?? sorted[0])?.id ?? 0;
                    let left = payment.amount;
                    const terms = sorted.map((t) => {
                        const pay = Math.min(Math.max(0, t.amount_due - t.amount_paid), left);
                        left -= pay;
                        return { ...t, amount_paid: t.amount_paid + pay };
                    });
                    const newPayment: Payment = {
                        ...payment,
                        id: Date.now(),
                        payment_term_id: firstTerm,
                        date_created: payment.date_created ?? nowStamp(),
                    };
                    return {
                        ...inv,
                        payment_terms: terms,
                        payments: [...inv.payments, newPayment],
                        pending_payment: null,
                        activities: [
                            ...inv.activities,
                            {
                                id: Date.now() + 1,
                                date_created: newPayment.date_created,
                                user: payment.recorded_by,
                                action: `Recorded ${payment.payment_method.toLowerCase()} payment of $${payment.amount.toFixed(2)}`,
                            },
                        ],
                    };
                }),
            ),
        [commit],
    );

    const addComment = useCallback(
        (id: number, message: string) =>
            commit((prev) =>
                prev.map((inv) => {
                    if (inv.id !== id) return inv;
                    const comment: InvoiceComment = {
                        id: Date.now(),
                        user_id: 7,
                        first_name: "Sam",
                        last_name: "Rivera",
                        message,
                        timestamp: nowStamp(),
                    };
                    return { ...inv, comments: [...inv.comments, comment] };
                }),
            ),
        [commit],
    );

    const reset = useCallback(() => {
        try {
            localStorage.removeItem(KEY);
        } catch {
            /* ignore */
        }
        emit(SEED, false);
    }, []);

    const value = useMemo(
        () => ({
            invoices,
            ready,
            getInvoice,
            updateInvoice,
            createInvoice,
            addPayment,
            addComment,
            reset,
        }),
        [invoices, ready, getInvoice, updateInvoice, createInvoice, addPayment, addComment, reset],
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useInvoices = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useInvoices needs <InvoiceStoreProvider>");
    return ctx;
};
