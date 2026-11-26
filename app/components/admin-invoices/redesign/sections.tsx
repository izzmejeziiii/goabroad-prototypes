"use client";

import clsx from "clsx";
import { AlertCircle, Percent, Plus, X } from "lucide-react";
import { useState } from "react";
import { providers, productItems } from "../data";
import { money } from "../format";
import { useDraft } from "./DraftContext";
import { discountTotal, invoiceTotal, parseAdjust, problemCount, subtotal, type DraftItem, type DraftPlacement } from "./draft";
import { MoneyInput, Pill, Select, buttonPrimary, iconButton, inputClass, textLink } from "./ui";

/* Small pieces the redesigned editor shares: the client and product
   pickers, the money fields, the totals block with its discount / fee
   tools, and the status and problem notes. */

const MINUS = "−";

/* ── Client & billing ─────────────────────────────────────────────────── */

export const ClientSelect = ({ className }: { className?: string }) => {
    const { draft, setClient, problems, showErrors, can } = useDraft();
    return (
        <Select
            id="client"
            className={className}
            value={draft.providerId ?? ""}
            disabled={!can.client}
            aria-invalid={(showErrors && !!problems.client) || undefined}
            onChange={(e) => setClient(e.target.value ? Number(e.target.value) : null)}
        >
            <option value="">Choose a client…</option>
            {providers.map((p) => (
                <option key={p.id} value={p.id}>
                    {p.name}
                </option>
            ))}
        </Select>
    );
};


/* ── Items ────────────────────────────────────────────────────────────── */

export const ProductSelect = ({ item, dense }: { item: DraftItem; dense?: boolean }) => {
    const { setProduct, problems, showErrors, can } = useDraft();
    return (
        <Select
            dense={dense}
            aria-label="Product"
            value={item.productId ?? ""}
            disabled={!can.items}
            aria-invalid={(showErrors && problems.itemsById[item.id] === "Choose a product.") || undefined}
            onChange={(e) => setProduct(item.id, e.target.value ? Number(e.target.value) : null)}
        >
            <option value="">Choose a product…</option>
            {productItems.map((p) => (
                <option key={p.value} value={p.value}>
                    {p.label}
                </option>
            ))}
        </Select>
    );
};


export const DiscountInput = ({
    item,
    placement,
    dense,
}: {
    item: DraftItem;
    placement: DraftPlacement;
    dense?: boolean;
}) => {
    const { updatePlacement, can } = useDraft();
    return (
        <MoneyInput
            dense={dense}
            aria-label="Discount"
            disabled={!can.items}
            value={placement.discount}
            onChange={(n) => updatePlacement(item.id, placement.id, { discount: n })}
        />
    );
};

export const UnitPriceInput = ({ item, dense }: { item: DraftItem; dense?: boolean }) => {
    const { updateItem, can } = useDraft();
    return (
        <MoneyInput
            dense={dense}
            aria-label="Price per placement"
            disabled={!can.items || !item.productId}
            value={item.unitPrice}
            onChange={(n) => updateItem(item.id, { unitPrice: n })}
        />
    );
};


/* ── Totals, with the discount and fee tools ──────────────────────────── */

export const AdjustPopover = ({
    title,
    hint,
    base,
    onApply,
    onClose,
    withNote,
    initial,
    initialNote,
    max,
}: {
    title: string;
    hint: string;
    base: number;
    onApply: (amount: number, note: string) => void;
    onClose: () => void;
    /** Show the "what it's for" field (fees / upcharges). */
    withNote?: boolean;
    /** The current value, shown in the field (the real upcharge does). */
    initial?: number;
    initialNote?: string;
    /** The most it can be (the upcharge can't be more than the subtotal). */
    max?: number;
}) => {
    const [raw, setRaw] = useState(initial ? "$" + initial : "");
    const [note, setNote] = useState(initialNote ?? "");
    const parsed = parseAdjust(raw, base);
    const tooMuch = parsed !== null && max !== undefined && parsed > max;
    const amount = tooMuch ? null : parsed;
    const invalid = raw.trim() !== "" && amount === null;
    return (
        <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <button type="button" aria-label="Close" className={iconButton} onClick={onClose}>
                    <X className="size-4" />
                </button>
            </div>
            <input
                autoFocus
                className={inputClass}
                placeholder="$100 or 10%"
                value={raw}
                aria-invalid={invalid || undefined}
                onChange={(e) => setRaw(e.target.value)}
            />
            <p className={clsx("mt-1.5 text-xs", invalid ? "text-red-600" : "text-slate-500")}>
                {tooMuch
                    ? "Can't be more than the subtotal (" + money(max ?? 0) + ")."
                    : invalid
                      ? "Use a dollar amount or a percent."
                      : amount !== null
                        ? `${money(amount)} · ${hint}`
                        : hint}
            </p>
            {(withNote ?? title === "Add a fee") && (
                <input
                    className={clsx(inputClass, "mt-2")}
                    placeholder="What it's for (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            )}
            <button
                type="button"
                disabled={amount === null}
                className={clsx(buttonPrimary, "mt-3 w-full !py-2")}
                onClick={() => amount !== null && onApply(amount, note)}
            >
                Apply
            </button>
        </div>
    );
};

export const Totals = ({
    className,
    size = "md",
    readOnly,
}: {
    className?: string;
    size?: "md" | "lg";
    /** The client preview: no add / clear / remove links. */
    readOnly?: boolean;
}) => {
    const { draft, applyDiscount, clearDiscounts, set, can } = useDraft();
    // Discounts follow the items' rule, the fee the upcharge's
    const canDiscount = can.items && !readOnly;
    const canFee = can.upcharge && !readOnly;
    const [open, setOpen] = useState<"discount" | "fee" | null>(null);
    const disc = discountTotal(draft);
    const sub = subtotal(draft);
    const row = "flex items-baseline justify-between gap-4";
    return (
        <dl className={clsx("flex flex-col gap-2.5 text-sm tabular-nums", className)}>
            <div className={row}>
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="text-slate-900">{money(sub)}</dd>
            </div>
            <div className={clsx(row, "relative")}>
                <dt className="flex items-center gap-2 text-slate-600">
                    Discounts
                    {canDiscount &&
                        (disc > 0 ? (
                            <button type="button" className={clsx(textLink, "text-xs")} onClick={clearDiscounts}>
                                Clear
                            </button>
                        ) : (
                            <button type="button" className={clsx(textLink, "text-xs")} onClick={() => setOpen("discount")}>
                                <Percent className="size-3" /> Add
                            </button>
                        ))}
                </dt>
                <dd className={disc > 0 ? "text-fern-700" : "text-slate-400"}>
                    {disc > 0 ? `${MINUS} ${money(disc)}` : money(0)}
                </dd>
                {open === "discount" && (
                    <AdjustPopover
                        title="Discount the whole invoice"
                        hint="Spread over every placement by price"
                        base={sub}
                        onClose={() => setOpen(null)}
                        onApply={(amount) => {
                            applyDiscount(amount);
                            setOpen(null);
                        }}
                    />
                )}
            </div>
            <div className={clsx(row, "relative")}>
                <dt className="flex items-center gap-2 text-slate-600">
                    {draft.fee > 0 && draft.feeNote ? `Fee · ${draft.feeNote}` : "Fees"}
                    {canFee &&
                        sub > 0 &&
                        (draft.fee > 0 ? (
                            <button
                                type="button"
                                className={clsx(textLink, "text-xs")}
                                onClick={() => {
                                    set("fee", 0);
                                    set("feeNote", "");
                                }}
                            >
                                Remove
                            </button>
                        ) : (
                            <button type="button" className={clsx(textLink, "text-xs")} onClick={() => setOpen("fee")}>
                                <Plus className="size-3" /> Add
                            </button>
                        ))}
                </dt>
                <dd className={draft.fee > 0 ? "text-roman-700" : "text-slate-400"}>
                    {draft.fee > 0 ? `+ ${money(draft.fee)}` : money(0)}
                </dd>
                {open === "fee" && (
                    <AdjustPopover
                        title="Add a fee"
                        hint="Added once to the invoice"
                        base={sub}
                        max={sub}
                        onClose={() => setOpen(null)}
                        onApply={(amount, note) => {
                            set("fee", amount);
                            set("feeNote", note);
                            setOpen(null);
                        }}
                    />
                )}
            </div>
            <div className={clsx(row, "mt-1 border-t border-slate-200 pt-3")}>
                <dt className={clsx("font-semibold text-slate-900", size === "lg" ? "text-base" : "text-sm")}>
                    Invoice total
                </dt>
                <dd className={clsx("font-bold text-slate-900", size === "lg" ? "text-2xl" : "text-lg")}>
                    {money(invoiceTotal(draft))}
                </dd>
            </div>
        </dl>
    );
};


/* ── Save ─────────────────────────────────────────────────────────────── */

export const ProblemSummary = () => {
    const { problems, showErrors } = useDraft();
    const n = problemCount(problems);
    if (!showErrors || n === 0) return null;
    return (
        <p role="alert" className="flex items-start gap-2 rounded-lg bg-roman-200/35 px-3 py-2 text-sm text-roman-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {n === 1 ? "One thing to fix before this invoice can be saved." : `${n} things to fix before this invoice can be saved.`}
        </p>
    );
};


/* ── Misc ─────────────────────────────────────────────────────────────── */

export const StatusPill = () => {
    const { draft, isNew } = useDraft();
    if (isNew) return <Pill tone="draft">New · not saved</Pill>;
    if (draft.status === 0) return <Pill tone="draft">Draft</Pill>;
    if (draft.status === 5) return <Pill tone="fern">Paid</Pill>;
    if (draft.status === 4) return <Pill tone="roman">Overdue</Pill>;
    return <Pill tone="neutral">Sent</Pill>;
};

/** What this invoice's status locks, in the real editor's rules. */
export const LockedNotice = () => {
    const { status } = useDraft();
    const text =
        status === 6
            ? "This invoice is void, so nothing on it can be changed or saved."
            : status === 5
              ? "This invoice is paid. Items can still be corrected, but the client, invoice date, fee and payment terms are locked."
              : status === 3 || status === 4
                ? "Payments are due on this invoice, so the client and invoice date are locked and the terms can only be installments. Unpaid installments can still be rescheduled."
                : null;
    if (!text) return null;
    return <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">{text}</p>;
};

