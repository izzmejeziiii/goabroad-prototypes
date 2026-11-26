"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BASE } from "../data";
import { nowStamp } from "../format";
import { useInvoices } from "../store";
import type { Invoice, InvoiceStatus } from "../types";
import Dialog from "./Dialog";
import {
    buildTerms,
    clientBilling,
    newItem,
    newPlacement,
    plusYear,
    problemCount,
    recomputeTerms,
    simpleDueDate,
    spreadDiscount,
    toInvoice,
    uid,
    validate,
    withClient,
    withProduct,
    withStartDate,
    type Check,
    type Draft,
    type DraftItem,
    type DraftPlacement,
    type DraftTerm,
    type Problems,
    type TermsOption,
} from "./draft";

/* The redesigned editor's state. Its rules are the real editor's
   (AddEditInvoice and its parts), only the layout is new:
   - what can change follows the invoice's status, field by field;
   - installments re-split whenever the items or the fee change;
   - saving checks what the real buttons check, per status;
   - leaving with unsaved changes asks first, and Cancel asks Save or Discard. */

/** What can be changed, by the invoice's status (0 draft, 1 pending,
    2 unpaid, 3 partial, 4 overdue, 5 paid, 6 void). */
export type Can = {
    /** Items, placements, discounts, Add item / Duplicate / Delete: all but void. */
    items: boolean;
    /** The fee (upcharge): not once paid or void. */
    upcharge: boolean;
    /** Client and invoice date: drafts, pending and unpaid only. */
    client: boolean;
    /** Upon receipt / 30 days: drafts, pending and unpaid only. */
    simpleTerms: boolean;
    /** Installments: also partial and overdue. */
    customTerms: boolean;
    /** Installment dates and amounts: not once paid or void. */
    editTerms: boolean;
    /** Void invoices have no save buttons. */
    save: boolean;
};

export type SaveAction = "draft" | "send" | "save";

type Api = {
    draft: Draft;
    problems: Problems;
    /** Errors only show after the first save attempt. */
    showErrors: boolean;
    can: Can;
    /** The status the rules key on ("near due" counts as unpaid). */
    status: InvoiceStatus;
    isNew: boolean;
    /** Payments recorded on the invoice. */
    paidTotal: number;
    set: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
    /** Sets the invoice date and moves the renewal date to a year after it. */
    setInvoiceDate: (date: string) => void;
    setClient: (providerId: number | null) => void;
    /** Adds a blank item and returns its id (the page opens it for editing). */
    addItem: () => string;
    removeItem: (id: string) => void;
    duplicateItem: (id: string) => void;
    /** Bulk actions on selected items, as the real editor's bar does them. */
    duplicateItems: (ids: string[]) => void;
    voidItems: (ids: string[]) => void;
    removeItems: (ids: string[]) => void;
    updateItem: (id: string, patch: Partial<DraftItem>) => void;
    setProduct: (id: string, productId: number | null) => void;
    setStartDate: (id: string, date: string) => void;
    addPlacement: (itemId: string, values?: Partial<DraftPlacement>) => void;
    removePlacement: (itemId: string, pid: string) => void;
    updatePlacement: (itemId: string, pid: string, patch: Partial<DraftPlacement>) => void;
    /** Spreads a discount over every placement, or only these items'. */
    applyDiscount: (amount: number, itemIds?: string[]) => void;
    clearDiscounts: () => void;
    setTerms: (option: TermsOption) => void;
    setInstallments: (count: number) => void;
    setTermDate: (id: string, date: string) => void;
    /** What's left to pay on the term (its amount less what's been paid). */
    setTermAmount: (id: string, remaining: number) => void;
    addTerm: () => void;
    removeTerm: (id: string) => void;
    recomputeTerms: () => void;
    save: (action: SaveAction, opts?: { notify?: boolean }) => boolean;
    /** Opens the "Are you sure you want to exit?" dialog. */
    cancel: () => void;
};

const Ctx = createContext<Api | null>(null);

/** The check each status's main save runs. */
const checkFor = (status: InvoiceStatus): Check =>
    status === 0 ? "send" : status <= 2 ? "unpaid" : status === 3 ? "partial" : status === 4 ? "overdue" : status === 5 ? "paid" : "draft";

const LEAVE = "Are you sure you want to exit the Create an Invoice Tool? Your changes will not be saved";

export const DraftProvider = ({
    initial,
    base,
    children,
}: {
    initial: Draft;
    base?: Invoice;
    children: ReactNode;
}) => {
    const router = useRouter();
    const { invoices, createInvoice, updateInvoice } = useInvoices();
    const [draft, setDraft] = useState<Draft>(initial);
    const [snapshot] = useState(() => JSON.stringify(initial));
    const [showErrors, setShowErrors] = useState(false);

    const status: InvoiceStatus = base ? (base.status === 7 ? 2 : base.status) : 0;
    const [check, setCheck] = useState<Check>(checkFor(status));
    const paidTotal = (base?.payments ?? []).reduce((s, p) => (p.amount > 0 ? s + p.amount : s), 0);
    const problems = useMemo(() => validate(draft, check, paidTotal), [draft, check, paidTotal]);
    const can: Can = {
        items: status !== 6,
        upcharge: status < 5,
        client: status <= 2,
        simpleTerms: status <= 2,
        customTerms: status <= 4,
        editTerms: status < 5,
        save: status !== 6,
    };

    /* Every change goes through here. Like the real editor, installments
       re-split (keeping paid and hand-typed ones) when the items or the
       fee change. */
    const update = useCallback(
        (fn: (d: Draft) => Draft) =>
            setDraft((prev) => {
                const next = fn(prev);
                return next.terms === "custom" && (next.items !== prev.items || next.fee !== prev.fee)
                    ? { ...next, customTerms: buildTerms(next, next.customTerms.length) }
                    : next;
            }),
        [],
    );
    const patchItems = useCallback((fn: (items: DraftItem[]) => DraftItem[]) => update((d) => ({ ...d, items: fn(d.items) })), [update]);
    const mapItem = useCallback(
        (id: string, fn: (i: DraftItem) => DraftItem) => patchItems((items) => items.map((i) => (i.id === id ? fn(i) : i))),
        [patchItems],
    );
    const patchTerms = (fn: (d: Draft) => DraftTerm[]) => update((d) => ({ ...d, customTerms: fn(d) }));

    /* ── Leaving ──────────────────────────────────────────────────────── */

    const dirty = JSON.stringify(draft) !== snapshot;
    const leaving = useRef(false);
    const [leaveTo, setLeaveTo] = useState<string | null>(null);
    const [exitOpen, setExitOpen] = useState(false);
    const go = useCallback(
        (path: string) => {
            leaving.current = true;
            router.push(path);
        },
        [router],
    );

    // In-app links (sidebar, header, switchers) ask "Leave Invoice Tool?"
    useEffect(() => {
        if (!dirty) return;
        const onClick = (e: MouseEvent) => {
            if (leaving.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!a || a.target === "_blank" || a.origin !== window.location.origin) return;
            e.preventDefault();
            e.stopPropagation();
            setLeaveTo(a.pathname + a.search + a.hash);
        };
        // A reload or tab close gets the browser's own prompt
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            if (leaving.current) return;
            e.preventDefault();
            e.returnValue = "";
        };
        document.addEventListener("click", onClick, true);
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => {
            document.removeEventListener("click", onClick, true);
            window.removeEventListener("beforeunload", onBeforeUnload);
        };
    }, [dirty]);

    /* ── Saving ───────────────────────────────────────────────────────── */

    const write = (nextStatus: InvoiceStatus, notify: boolean) => {
        // A Billed to name or address left empty prints the client's, as
        // the real editor saves it
        const fromClient = clientBilling(draft.providerId, invoices);
        const data = toInvoice(
            {
                ...draft,
                billingName: draft.billingName.trim() || fromClient.billingName,
                billingAddress: draft.billingAddress.trim() || fromClient.billingAddress,
            },
            nextStatus,
            base,
        );
        const activity = (action: string) => ({ id: Date.now() + Math.random(), date_created: nowStamp(), user: "Sam Rivera", action });
        const activities = [
            ...data.activities,
            activity(base ? "Updated invoice" : nextStatus === 0 ? "Created invoice as draft" : "Created invoice"),
            ...(notify ? [activity(`Sent invoice to ${draft.contactEmail}`)] : []),
        ];
        // The store re-derives unpaid / partial / overdue / paid from the
        // payments and due dates, as the real Save Changes does
        if (base) updateInvoice(base.id, { ...data, activities });
        else createInvoice({ ...data, activities });
        go(BASE);
    };

    const api: Api = {
        draft,
        problems,
        showErrors,
        can,
        status,
        isNew: draft.id === null,
        paidTotal,
        set: (key, value) => update((d) => ({ ...d, [key]: value })),
        setInvoiceDate: (date) => update((d) => ({ ...d, invoiceDate: date, renewalDate: plusYear(date) || d.renewalDate })),
        setClient: (providerId) => {
            update((d) => withClient(d, providerId, invoices));
            // The real editor puts the client in the address on a new invoice
            if (!base && providerId) window.history.pushState(null, "", `${window.location.pathname}?provider_id=${providerId}`);
        },
        addItem: () => {
            const item = newItem();
            patchItems((items) => [...items, item]);
            return item.id;
        },
        removeItem: (id) => api.removeItems([id]),
        duplicateItem: (id) => api.duplicateItems([id]),
        // Copies go to the end with no discounts and no dates (BulkCTAHeader)
        duplicateItems: (ids) =>
            patchItems((items) => [
                ...items,
                ...items
                    .filter((i) => ids.includes(i.id))
                    .map((i) => ({
                        ...i,
                        id: uid("i"),
                        startDate: "",
                        endDate: "",
                        placements: i.placements.map((p) => ({ ...p, id: uid("p"), discount: 0 })),
                    })),
            ]),
        // Voided items stay on the invoice at $0
        voidItems: (ids) =>
            patchItems((items) =>
                items.map((i) =>
                    ids.includes(i.id) ? { ...i, unitPrice: 0, placements: i.placements.map((p) => ({ ...p, discount: 0 })) } : i,
                ),
            ),
        // Deleting every item also clears the fee
        removeItems: (ids) =>
            update((d) => {
                const items = d.items.filter((i) => !ids.includes(i.id));
                const empty = !items.some((i) => i.productId);
                return { ...d, items, ...(empty && { fee: 0, feeNote: "" }) };
            }),
        updateItem: (id, patch) => mapItem(id, (i) => ({ ...i, ...patch })),
        setProduct: (id, productId) => mapItem(id, (i) => withProduct(i, productId)),
        setStartDate: (id, date) => mapItem(id, (i) => withStartDate(i, date)),
        addPlacement: (itemId, values) =>
            mapItem(itemId, (i) => ({ ...i, placements: [...i.placements, { ...newPlacement(), ...values }] })),
        removePlacement: (itemId, pid) => mapItem(itemId, (i) => ({ ...i, placements: i.placements.filter((p) => p.id !== pid) })),
        updatePlacement: (itemId, pid, patch) =>
            mapItem(itemId, (i) => ({ ...i, placements: i.placements.map((p) => (p.id === pid ? { ...p, ...patch } : p)) })),
        applyDiscount: (amount, itemIds) => update((d) => ({ ...d, items: spreadDiscount(d, amount, itemIds) })),
        clearDiscounts: () =>
            patchItems((items) => items.map((i) => ({ ...i, placements: i.placements.map((p) => ({ ...p, discount: 0 })) }))),
        // Upon receipt / 30 days set their due date from the invoice date;
        // Installments start from the terms there are, or one for the total
        setTerms: (option) =>
            update((d) =>
                option === "custom"
                    ? { ...d, terms: option, customTerms: d.customTerms.length ? d.customTerms : buildTerms({ ...d, customTerms: [] }, 1) }
                    : { ...d, terms: option, dueDate: simpleDueDate(option, d.invoiceDate) },
            ),
        setInstallments: (count) => patchTerms((d) => buildTerms(d, count)),
        setTermDate: (id, date) => patchTerms((d) => d.customTerms.map((t) => (t.id === id ? { ...t, dueDate: date } : t))),
        setTermAmount: (id, remaining) =>
            patchTerms((d) => {
                const typed = d.customTerms.map((t) => (t.id === id ? { ...t, amount: remaining + t.paid, edited: true } : t));
                return buildTerms({ ...d, customTerms: typed }, typed.length);
            }),
        addTerm: () => patchTerms((d) => buildTerms(d, d.customTerms.length + 1)),
        removeTerm: (id) =>
            patchTerms((d) => {
                const left = d.customTerms.filter((t) => t.id !== id);
                return buildTerms({ ...d, customTerms: left }, left.length);
            }),
        recomputeTerms: () => patchTerms((d) => recomputeTerms(d)),
        save: (action, opts) => {
            const run: Check = action === "draft" ? "draft" : action === "send" ? (status === 0 ? "send" : "unpaid") : checkFor(status);
            const found = validate(draft, run, paidTotal);
            if (problemCount(found) > 0) {
                setCheck(run);
                setShowErrors(true);
                return false;
            }
            const notify = action === "send" && !!opts?.notify;
            write(action === "draft" ? 0 : action === "send" ? 2 : status, notify);
            return true;
        },
        cancel: () => setExitOpen(true),
    };

    return (
        <Ctx.Provider value={api}>
            {children}
            {exitOpen && (
                <Dialog
                    title="Are you sure you want to exit?"
                    body={status === 0 || status === 5 ? "Before exiting choose what will happen to your recent changes" : LEAVE}
                    // The real Save here saves as it is, with the current status
                    primary={{
                        label: "Save",
                        onClick: () => {
                            setExitOpen(false);
                            if (!draft.providerId) {
                                setCheck("draft");
                                setShowErrors(true);
                                return;
                            }
                            write(status, false);
                        },
                    }}
                    secondary={{ label: "Discard", onClick: () => go(BASE) }}
                    onClose={() => setExitOpen(false)}
                />
            )}
            {leaveTo !== null && (
                <Dialog
                    title="Leave Invoice Tool?"
                    body="Leave Invoice Tool? Your changes will not be saved."
                    primary={{ label: "Leave", onClick: () => go(leaveTo) }}
                    onClose={() => setLeaveTo(null)}
                />
            )}
        </Ctx.Provider>
    );
};

export const useDraft = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useDraft needs <DraftProvider>");
    return ctx;
};
