"use client";

import clsx from "clsx";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { mdyLong } from "../format";
import { useInvoices } from "../store";
import { useDraft } from "./DraftContext";
import { SALE_TYPES, clientBilling, noPlacements } from "./draft";
import InlineField, { StaticField } from "./InlineField";
import { useCompact } from "./density";
import ItemBlock, { useItemCols } from "./ItemBlock";
import ItemsToolbar from "./ItemsToolbar";
import { SECTION_IDS } from "./Rail";
import { ClientSelect, Totals } from "./sections";
import { DateInput, Select, inputClass, label, textLink } from "./ui";

/* The editor's parts, laid out by PreviewLayout: Section, Bill to,
   Invoice details, the items (ItemsEditor, with its sticky action bar and
   one item open in place at a time) and the message box. */

export const Section = ({
    id,
    title,
    aside,
    children,
    className,
}: {
    id?: string;
    title: string;
    aside?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) => (
    <section id={id} className={clsx("scroll-mt-28 border-t border-slate-200 px-8 py-7", className)}>
        <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className={label}>{title}</h2>
            {aside}
        </div>
        {children}
    </section>
);

/** Bill to, as the real editor has it: the client account comes from the
    dropdown, and the Billed to name and address are free text. They fill in
    from the client but can be typed over to bill someone else (a parent
    company, a university office…); "Use client's details" puts them back. */
export const BillTo = () => {
    // Always editable, as in the real header
    const { draft, set } = useDraft();
    const { invoices } = useInvoices();
    const fromClient = clientBilling(draft.providerId, invoices);
    const custom =
        !!draft.providerId &&
        (draft.billingName !== fromClient.billingName || draft.billingAddress !== fromClient.billingAddress);

    return (
        <div className="flex max-w-md flex-col gap-4">
            <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-slate-600">Client account</span>
                <ClientSelect />
            </label>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="billed-to" className="text-xs font-medium text-slate-600">
                        Billed to
                    </label>
                    {custom && (
                        <button
                            type="button"
                            className={clsx(textLink, "text-xs")}
                            onClick={() => {
                                set("billingName", fromClient.billingName);
                                set("billingAddress", fromClient.billingAddress);
                            }}
                        >
                            <RotateCcw className="size-3" /> Use client&apos;s details
                        </button>
                    )}
                </div>
                <input
                    id="billed-to"
                    className={inputClass}
                    value={draft.billingName}
                    placeholder="Name on the invoice"
                    onChange={(e) => set("billingName", e.target.value)}
                />
                <textarea
                    aria-label="Billing address"
                    rows={3}
                    className={clsx(inputClass, "resize-y")}
                    value={draft.billingAddress}
                    placeholder="Billing address"
                    onChange={(e) => set("billingAddress", e.target.value)}
                />
                <p className="text-xs text-slate-500">
                    {custom
                        ? "Billing someone other than the client account."
                        : draft.providerId
                          ? "Filled in from the client. Type over it to bill someone else."
                          : "Fills in from the client, or type who to bill."}
                </p>
            </div>

            {draft.providerId && (
                <p className="text-sm text-slate-500">
                    <span className="text-slate-600">Send to </span>
                    {draft.contactName ? `${draft.contactName} · ` : ""}
                    {draft.contactEmail || "No billing email"}
                </p>
            )}
        </div>
    );
};

export const Details = () => {
    const { draft, set, setInvoiceDate, isNew, can } = useDraft();
    return (
        <dl className="flex flex-col">
            {/* Blank until saved, like the real invoice's number field */}
            <StaticField
                label="Invoice number"
                value={isNew ? <span className="text-slate-400">—</span> : draft.id}
                hint={isNew ? "Assigned on save" : undefined}
            />
            {/* Locked once past unpaid; changing it moves renewal to a year on */}
            <InlineField label="Invoice date" value={mdyLong(draft.invoiceDate)} disabled={!can.client}>
                {() => <DateInput autoFocus value={draft.invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />}
            </InlineField>
            <InlineField label="Renewal date" value={mdyLong(draft.renewalDate)}>
                {() => <DateInput autoFocus value={draft.renewalDate} onChange={(e) => set("renewalDate", e.target.value)} />}
            </InlineField>
            <InlineField label="Type of sale" value={SALE_TYPES.find((s) => s.id === draft.saleType)?.label}>
                {(close) => (
                    <Select
                        autoFocus
                        value={draft.saleType}
                        onChange={(e) => {
                            set("saleType", Number(e.target.value) as typeof draft.saleType);
                            close();
                        }}
                    >
                        {SALE_TYPES.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.label}
                            </option>
                        ))}
                    </Select>
                )}
            </InlineField>
        </dl>
    );
};

/** Column headings for items in read view, with select-all. */
export const ItemsHeader = ({
    allSelected,
    onSelectAll,
    disabled,
}: {
    allSelected: boolean;
    onSelectAll: (checked: boolean) => void;
    disabled?: boolean;
}) => {
    const compact = useCompact();
    const cols = useItemCols();
    return (
    <div className={clsx("grid items-center gap-3 border-b border-slate-300 px-4 pb-3 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-700", cols)}>
        <span className="flex items-center gap-3">
            <input
                type="checkbox"
                aria-label="Select all items"
                checked={allSelected}
                disabled={disabled}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="size-4 shrink-0 cursor-pointer accent-cobalt-500"
            />
            <span className="whitespace-nowrap">Item · placements</span>
        </span>
        {!compact && <span>Runs</span>}
        <span className="text-right">Amount</span>
        <span className="text-right">Discount</span>
        <span className="text-right">Total</span>
        <span />
    </div>
    );
};

export const MessageBox = ({ rows = 3 }: { rows?: number }) => {
    const { draft, set } = useDraft();
    return (
        <textarea
            aria-label="Message to the client"
            rows={rows}
            className={clsx(inputClass, "resize-y")}
            value={draft.message}
            placeholder="Optional. Printed on the invoice and in the email, e.g. Thank you for advertising with GoAbroad!"
            onChange={(e) => set("message", e.target.value)}
        />
    );
};

/** The Items section: its heading with Add item where it's easy to find,
    the items read as invoice lines with one open in place at a time, and
    the totals. New invoices open their first item. An item left without a
    product (opened, then closed or left for another) is dropped, so no
    blank "New item" rows linger. */
export const ItemsEditor = () => {
    const { draft, addItem, removeItem, can, isNew } = useDraft();
    const [editingId, setEditingId] = useState<string | null>(isNew ? (draft.items[0]?.id ?? null) : null);
    const [selected, setSelected] = useState<string[]>([]);
    // Accordion: items start open; ids here are collapsed
    const [collapsed, setCollapsed] = useState<string[]>([]);
    const blank = (item: (typeof draft.items)[number]) => !item.productId && item.placements.length === 0;
    const isBlank = (id: string | null) => {
        const item = draft.items.find((i) => i.id === id);
        return !!item && blank(item);
    };
    const shown = draft.items.filter((i) => !blank(i) || i.id === editingId);
    const readIds = shown.filter((i) => i.id !== editingId).map((i) => i.id);
    // Only items with placements fold; a no-placement product is one line
    const foldIds = shown
        .filter((i) => i.id !== editingId && !noPlacements(i.productId) && i.placements.length > 0)
        .map((i) => i.id);
    // Drop selections of items that were removed
    const liveSelected = selected.filter((id) => draft.items.some((i) => i.id === id));

    const open = (id: string | null) => {
        if (editingId && editingId !== id && isBlank(editingId)) removeItem(editingId);
        setEditingId(id);
    };

    const add = () => {
        // A blank item is already open: point to it rather than add another
        if (editingId && isBlank(editingId)) {
            document.getElementById(`item-${editingId}`)?.querySelector<HTMLElement>("input, select")?.focus();
            return;
        }
        const id = addItem();
        open(id);
        // Bring the new item's product picker into view, under the sticky bar
        requestAnimationFrame(() => document.getElementById(`item-${id}`)?.scrollIntoView({ block: "start", behavior: "smooth" }));
    };

    return (
        <section id={SECTION_IDS.items} className="scroll-mt-28 border-t border-slate-200 px-8 py-7">
            <ItemsToolbar
                count={draft.items.filter((i) => i.productId).length}
                selected={liveSelected}
                clearSelection={() => setSelected([])}
                onAdd={add}
                allExpanded={foldIds.every((id) => !collapsed.includes(id))}
                onExpandAll={foldIds.length > 0 ? (expand) => setCollapsed(expand ? [] : foldIds) : undefined}
            />

            {/* The list sits on a light slate panel; px-4 so the heading line
                and the dividers stop at its padding. A blank item only ever
                shows while it's the one being edited. */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4">
                {readIds.length > 0 && (
                    <ItemsHeader
                        allSelected={readIds.length > 0 && readIds.every((id) => liveSelected.includes(id))}
                        onSelectAll={(checked) => setSelected(checked ? readIds : [])}
                        disabled={!can.items}
                    />
                )}
                <div className="flex flex-col divide-y divide-slate-200">
                    {shown.length === 0 && (
                        <p className="px-4 py-10 text-center text-sm text-slate-500">
                            No items yet. Use <span className="font-semibold text-slate-700">Add item</span> to add what the client is buying.
                        </p>
                    )}
                    {shown.map((item, i) => (
                        <div key={item.id} id={`item-${item.id}`} className={clsx("scroll-mt-48", editingId === item.id ? "py-3" : "py-1")}>
                            <ItemBlock
                                item={item}
                                n={i + 1}
                                editing={editingId === item.id}
                                onEdit={() => open(item.id)}
                                onDone={() => open(null)}
                                selected={liveSelected.includes(item.id)}
                                onSelect={(checked) =>
                                    setSelected((s) => (checked ? [...s, item.id] : s.filter((x) => x !== item.id)))
                                }
                                expanded={!collapsed.includes(item.id)}
                                onToggle={() =>
                                    setCollapsed((c) => (c.includes(item.id) ? c.filter((x) => x !== item.id) : [...c, item.id]))
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5 flex justify-end">
                <Totals className="w-80" size="lg" />
            </div>
        </section>
    );
};

