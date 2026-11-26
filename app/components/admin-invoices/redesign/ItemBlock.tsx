"use client";

import clsx from "clsx";
import { AlertCircle, ChevronDown, Copy, PackageCheck, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { mdyLong, money } from "../format";
import { useCompact } from "./density";
import Dialog from "./Dialog";
import { useDraft } from "./DraftContext";
import { itemDiscount, itemTotal, lineTotal, noPlacements, placementLabel, productName, type DraftItem } from "./draft";
import PlacementsEditor from "./PlacementsEditor";
import { DiscountInput, ProductSelect, UnitPriceInput } from "./sections";
import { DateInput, buttonPrimary, errorText, textLink } from "./ui";

/* One invoice item. Read mode is the invoice line itself: product, run
   dates, price, then every placement with its amount, discount and total,
   all as text. Click it to edit that one item in place; only one item is
   open at a time, so there's never a wall of fields. Its placements are
   edited in PlacementsEditor. */

const MINUS = "−";

/** Item | runs | amount | discount | total | action, shared with the header.
    Compact (beside the preview): no runs column, the runs go under the name. */
export const ITEM_COLS = "grid-cols-[minmax(0,1fr)_12.5rem_6rem_6rem_6.5rem_4rem]";
export const ITEM_COLS_COMPACT = "grid-cols-[minmax(0,1fr)_6rem_6rem_6.5rem_4rem]";
export const useItemCols = () => (useCompact() ? ITEM_COLS_COMPACT : ITEM_COLS);

/** "Jan 1 – Dec 31, 2027" in one year, "Dec 1, 2026 – Nov 30, 2027" across two. */
const range = (item: DraftItem) => {
    if (!item.startDate || !item.endDate) return "Dates not set";
    const sameYear = item.startDate.slice(0, 4) === item.endDate.slice(0, 4);
    const start = mdyLong(item.startDate);
    return `${sameYear ? start.replace(/, \d{4}$/, "") : start} – ${mdyLong(item.endDate)}`;
};

/* ── Read mode ────────────────────────────────────────────────────────── */

/** "Argentina, Bolivia +5 more" for a collapsed item. */
const whereSummary = (item: DraftItem) => {
    const names = [...new Set(item.placements.map((p) => p.location || p.type).filter(Boolean))];
    if (names.length <= 2) return names.join(", ");
    return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
};

export const ItemRead = ({
    item,
    n,
    onEdit,
    selected,
    onSelect,
    expanded,
    onToggle,
}: {
    item: DraftItem;
    n: number;
    onEdit: () => void;
    selected: boolean;
    onSelect: (checked: boolean) => void;
    /** Placements shown (accordion open). */
    expanded: boolean;
    onToggle: () => void;
}) => {
    const { problems, showErrors, can } = useDraft();
    const compact = useCompact();
    const cols = useItemCols();
    const disc = itemDiscount(item);
    const problem = showErrors ? problems.itemsById[item.id] : undefined;
    const badPlacement = showErrors && item.placements.some((p) => problems.placements[p.id]);
    // A product with no placements is one line: nothing to fold away
    const none = noPlacements(item.productId);
    const count = none ? 0 : item.placements.length;
    const foldable = count > 0;
    const stop = (e: React.SyntheticEvent) => e.stopPropagation();

    return (
        <div
            className={clsx(
                "group rounded-lg px-4 py-4 transition-colors",
                selected ? "bg-cobalt-500/[0.06]" : "hover:bg-white",
                (problem || badPlacement) && "bg-roman-200/20",
            )}
        >
            {/* The header toggles the placements; Edit opens the item */}
            <div
                {...(foldable && {
                    role: "button",
                    tabIndex: 0,
                    "aria-expanded": expanded,
                    "aria-label": `${expanded ? "Hide" : "Show"} placements of item ${n}`,
                    onClick: onToggle,
                    onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onToggle()),
                })}
                className={clsx(
                    "grid items-start gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500",
                    foldable && "cursor-pointer",
                    cols,
                )}
            >
                <div className="flex min-w-0 items-start gap-3">
                    <input
                        type="checkbox"
                        aria-label={`Select item ${n}`}
                        checked={selected}
                        disabled={!can.items}
                        onClick={stop}
                        onChange={(e) => onSelect(e.target.checked)}
                        className="mt-1 size-4 shrink-0 cursor-pointer accent-cobalt-500"
                    />
                    <div className="min-w-0">
                        <p className={clsx("font-semibold", item.productId ? "text-slate-900" : "text-slate-400")}>
                            {item.productId ? productName(item.productId) : "New item"}
                        </p>
                        {compact && <p className="text-xs text-slate-500">{range(item)}</p>}
                        {none && (
                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                <PackageCheck className="size-3.5 text-slate-400" />
                                No placements · billed once
                            </p>
                        )}
                        {count > 0 && (
                            <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs">
                                <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-cobalt-500">
                                    <ChevronDown className={clsx("size-3.5 transition-transform", expanded && "rotate-180")} />
                                    {expanded ? "Hide" : "Show"} {count} placement{count === 1 ? "" : "s"}
                                </span>
                                {!expanded && <span className="truncate text-slate-500">· {whereSummary(item)}</span>}
                            </p>
                        )}
                        {(problem || badPlacement) && (
                            <p className={clsx(errorText, "mt-0.5 flex items-center gap-1")}>
                                <AlertCircle className="size-3.5" />
                                {problem ?? "A placement needs attention."}
                            </p>
                        )}
                    </div>
                </div>
                {!compact && <p className="text-sm text-slate-600">{range(item)}</p>}
                <p className="text-right text-sm tabular-nums text-slate-600">
                    {item.productId ? (
                        <>
                            {money(item.unitPrice)}
                            <span className="block text-xs text-slate-400">{none ? "once" : "each"}</span>
                        </>
                    ) : (
                        ""
                    )}
                </p>
                <p className={clsx("text-right text-sm tabular-nums", disc > 0 ? "text-fern-700" : "text-slate-400")}>
                    {disc > 0 ? `${MINUS} ${money(disc)}` : "—"}
                </p>
                <p className="text-right font-semibold tabular-nums text-slate-900">{money(itemTotal(item))}</p>
                <span className="flex justify-end">
                    {can.items && (
                        <button
                            type="button"
                            aria-label={`Edit item ${n}`}
                            onClick={(e) => {
                                stop(e);
                                onEdit();
                            }}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-cobalt-500 transition-colors hover:bg-cobalt-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500"
                        >
                            <Pencil className="size-3" /> Edit
                        </button>
                    )}
                </span>
            </div>

            {expanded &&
                !none &&
                (count > 0 ? (
                    <ul className="mt-2 flex flex-col">
                        {item.placements.map((p) => (
                            <li key={p.id} className={clsx("grid items-baseline gap-3 py-1 text-sm", cols)}>
                                {/* Lined up under the product name; spans the
                                    dates column too, so long placements fit */}
                                <span className={clsx("min-w-0 truncate pl-7 text-slate-700", !compact && "col-span-2")}>
                                    <span className="mr-2 text-slate-300">•</span>
                                    {placementLabel(p) || <span className="text-slate-400">Placement</span>}
                                </span>
                                <span className="text-right tabular-nums text-slate-500">{money(item.unitPrice)}</span>
                                <span className={clsx("text-right tabular-nums", p.discount > 0 ? "text-fern-700" : "text-slate-300")}>
                                    {p.discount > 0 ? `${MINUS} ${money(p.discount)}` : "—"}
                                </span>
                                <span className="text-right tabular-nums text-slate-700">{money(lineTotal(item, p))}</span>
                                <span />
                            </li>
                        ))}
                    </ul>
                ) : (
                    item.productId && <p className="mt-1 pl-7 text-sm text-slate-400">No placements yet</p>
                ))}
        </div>
    );
};

/* ── Edit mode ────────────────────────────────────────────────────────── */

export const ItemEdit = ({ item, n, onDone }: { item: DraftItem; n: number; onDone: () => void }) => {
    const { setStartDate, updateItem, duplicateItem, removeItem, problems, showErrors } = useDraft();
    const [confirmRemove, setConfirmRemove] = useState(false);
    const compact = useCompact();
    const problem = showErrors ? problems.itemsById[item.id] : undefined;
    // No placements: no placements section; the discount (held on the
    // item's one hidden row) sits beside the price instead
    const none = noPlacements(item.productId);
    const onlyRow = none ? item.placements[0] : undefined;

    return (
        <section aria-label={`Editing item ${n}`} className="rounded-xl border border-slate-200 bg-white">
            <div
                className={clsx(
                    "grid gap-4 p-5",
                    // Product | Runs | Price each on one row (Runs sized to fit
                    // both dates). A product with no placements: Product on its
                    // own row, then Runs | Price | Discount under it
                    // (full width: Runs takes half, Price and Discount a quarter each)
                    onlyRow
                        ? "grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]"
                        : compact
                          ? "grid-cols-[minmax(0,1fr)_16rem_8rem]"
                          : "grid-cols-[minmax(0,1fr)_17rem_8rem]",
                )}
            >
                <div className={clsx("flex flex-col gap-1.5", onlyRow && "col-span-full")}>
                    <span className="text-sm font-medium text-slate-700">Product</span>
                    <ProductSelect item={item} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Runs</span>
                    <div className="grid grid-cols-2 gap-2">
                        {/* As in the real editor: the start needs a product, the
                            end needs a start and can't be before it */}
                        <DateInput
                            aria-label="Start date"
                            className={clsx(compact && "!px-2")}
                            value={item.startDate}
                            disabled={!item.productId}
                            onChange={(e) => setStartDate(item.id, e.target.value)}
                        />
                        <DateInput
                            aria-label="End date"
                            className={clsx(compact && "!px-2")}
                            value={item.endDate}
                            min={item.startDate || undefined}
                            disabled={!item.startDate}
                            onChange={(e) => updateItem(item.id, { endDate: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">{none ? "Price" : "Price each"}</span>
                    <UnitPriceInput item={item} />
                </div>
                {onlyRow && (
                    <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-slate-700">Discount</span>
                        <DiscountInput item={item} placement={onlyRow} />
                    </div>
                )}
                {problem && <p className={clsx(errorText, "col-span-full")}>{problem}</p>}
            </div>

            {/* Placements once there's a product (none for a product billed once) */}
            {item.productId && !none && (
                <div className="border-t border-slate-200 px-5 py-5">
                    <PlacementsEditor item={item} />
                </div>
            )}

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-3">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        className={clsx(textLink, "px-2 py-1 text-xs !text-slate-600 hover:!text-slate-900")}
                        onClick={() => duplicateItem(item.id)}
                    >
                        <Copy className="size-3.5" /> Duplicate
                    </button>
                    <button
                        type="button"
                        className={clsx(textLink, "px-2 py-1 text-xs !text-roman-700 hover:!text-roman-600")}
                        onClick={() => setConfirmRemove(true)}
                    >
                        <Trash2 className="size-3.5" /> Remove item
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-slate-600">
                        Item total <span className="ml-1 font-semibold tabular-nums text-slate-900">{money(itemTotal(item))}</span>
                    </p>
                    <button type="button" className={clsx(buttonPrimary, "!bg-cobalt-500 !px-5 !py-2 hover:!bg-cobalt-600")} onClick={onDone}>
                        Done
                    </button>
                </div>
            </div>
            {confirmRemove && (
                <Dialog
                    title="Delete Item"
                    body="Are you sure you want to delete the selected item(s)?"
                    primary={{ label: "Delete", onClick: () => removeItem(item.id) }}
                    onClose={() => setConfirmRemove(false)}
                />
            )}
        </section>
    );
};

const ItemBlock = ({
    item,
    n,
    editing,
    onEdit,
    onDone,
    selected,
    onSelect,
    expanded,
    onToggle,
}: {
    item: DraftItem;
    n: number;
    editing: boolean;
    onEdit: () => void;
    onDone: () => void;
    selected: boolean;
    onSelect: (checked: boolean) => void;
    expanded: boolean;
    onToggle: () => void;
}) =>
    editing ? (
        <ItemEdit item={item} n={n} onDone={onDone} />
    ) : (
        <ItemRead item={item} n={n} onEdit={onEdit} selected={selected} onSelect={onSelect} expanded={expanded} onToggle={onToggle} />
    );

export default ItemBlock;
