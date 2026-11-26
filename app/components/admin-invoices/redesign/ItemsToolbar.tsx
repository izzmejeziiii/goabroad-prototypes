"use client";

import clsx from "clsx";
import { Ban, Copy, Percent, Plus, Receipt, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDraft } from "./DraftContext";
import { itemGross } from "./draft";
import { AdjustPopover } from "./sections";
import { useCompact } from "./density";
import Dialog from "./Dialog";
import { buttonPrimary, buttonSecondary, label, textLink } from "./ui";

/* The Items heading and the original editor's action bar (BulkCTAHeader):
   Add discount, Duplicate, Void and Delete work on the items ticked in the
   list; Apply upcharge adds a fee to the whole invoice; Add item adds one.
   Void and Delete ask first, with the real editor's wording. What's
   enabled follows the real bar: everything but Void needs a non-void
   invoice, and the upcharge also needs a subtotal and an unpaid invoice. */

const small = clsx(buttonSecondary, "!px-3 !py-1.5");
/** Beside the preview, so the whole bar fits on one row. */
const tight = "!gap-1.5 !px-2.5";

/** True once the bar has scrolled up and is pinned (it sits lower than the
    marker placed just above it). */
const useStuck = () => {
    const marker = useRef<HTMLDivElement>(null);
    const bar = useRef<HTMLDivElement>(null);
    const [stuck, setStuck] = useState(false);
    useEffect(() => {
        const check = () => {
            if (!marker.current || !bar.current) return;
            setStuck(bar.current.getBoundingClientRect().top - marker.current.getBoundingClientRect().top > 1);
        };
        check();
        // The admin shell scrolls <main>, so listen in the capture phase
        window.addEventListener("scroll", check, true);
        window.addEventListener("resize", check);
        return () => {
            window.removeEventListener("scroll", check, true);
            window.removeEventListener("resize", check);
        };
    }, []);
    return { marker, bar, stuck };
};

const ItemsToolbar = ({
    count,
    selected,
    clearSelection,
    onAdd,
    allExpanded,
    onExpandAll,
}: {
    /** Items on the invoice (with a product). */
    count: number;
    selected: string[];
    clearSelection: () => void;
    onAdd: () => void;
    allExpanded: boolean;
    /** Expand / collapse every item's placements (none when no items). */
    onExpandAll?: (expand: boolean) => void;
}) => {
    const { draft, applyDiscount, duplicateItems, voidItems, removeItems, set, can } = useDraft();
    const [open, setOpen] = useState<"discount" | "upcharge" | null>(null);
    const [confirm, setConfirm] = useState<"void" | "delete" | null>(null);
    const none = selected.length === 0;
    const selectedGross = draft.items.filter((i) => selected.includes(i.id)).reduce((s, i) => s + itemGross(i), 0);
    const subtotal = draft.items.reduce((s, i) => s + itemGross(i), 0);
    const { marker, bar, stuck } = useStuck();
    // Beside the preview: the heading on one row, every button on the next
    const compact = useCompact();

    return (
        <>
            <div ref={marker} aria-hidden />
            {/* Sticky under the app bar, so the actions stay in reach down a
            long list of items; full card width, with a border once pinned */}
            <div
                ref={bar}
                className={clsx(
                    "sticky top-10 z-20 -mx-8 -mt-3 mb-1 flex gap-3 border-b bg-white px-8 py-3 transition-shadow",
                    compact ? "flex-col items-stretch" : "flex-wrap items-center justify-between",
                    stuck ? "border-slate-200 shadow-[0_6px_12px_-8px_rgba(15,23,42,0.18)]" : "border-transparent",
                )}
            >
                <div className="flex items-center gap-3">
                    <h2 className={label}>
                        Items <span className="ml-1 font-normal normal-case tracking-normal text-slate-400">· {count}</span>
                    </h2>
                    {onExpandAll && (
                        <button type="button" className={clsx(textLink, "text-xs")} onClick={() => onExpandAll(!allExpanded)}>
                            {allExpanded ? "Collapse all" : "Expand all"}
                        </button>
                    )}
                    {!none && (
                        <span className="flex items-center gap-2 rounded-full bg-cobalt-500/10 px-3 py-1 text-xs font-semibold text-cobalt-600">
                            {selected.length} selected
                            <button type="button" className={clsx(textLink, "text-xs")} onClick={clearSelection}>
                                Clear
                            </button>
                        </span>
                    )}
                </div>

                <div className={clsx("flex flex-wrap items-center", compact ? "gap-1.5" : "gap-2")}>
                    {/* For the selected items */}
                    <div className="relative">
                        <button
                            type="button"
                            className={clsx(small, compact && tight)}
                            disabled={none || !can.items || selectedGross <= 0}
                            title={none ? "Select items first" : undefined}
                            onClick={() => setOpen(open === "discount" ? null : "discount")}
                        >
                            <Percent className="size-4" /> Add discount
                        </button>
                        {open === "discount" && (
                            <AdjustPopover
                                title={`Discount ${selected.length} item${selected.length === 1 ? "" : "s"}`}
                                hint="Spread over their placements by price"
                                base={selectedGross}
                                onClose={() => setOpen(null)}
                                onApply={(amount) => {
                                    applyDiscount(amount, selected);
                                    setOpen(null);
                                }}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className={clsx(small, compact && tight)}
                        disabled={none || !can.items}
                        title={none ? "Select items first" : undefined}
                        onClick={() => {
                            duplicateItems(selected);
                            clearSelection();
                        }}
                    >
                        <Copy className="size-4" /> Duplicate
                    </button>
                    <button
                        type="button"
                        className={clsx(small, compact && tight, "!text-roman-700")}
                        disabled={none || !can.items}
                        title={none ? "Select items first" : undefined}
                        onClick={() => setConfirm("void")}
                    >
                        <Ban className="size-4" /> Void
                    </button>
                    <button
                        type="button"
                        className={clsx(small, compact && tight, "!text-red-600")}
                        disabled={none || !can.items}
                        title={none ? "Select items first" : undefined}
                        onClick={() => setConfirm("delete")}
                    >
                        <Trash2 className="size-4" /> Delete
                    </button>

                    <span className={compact ? "ml-auto" : "mx-1 h-6 w-px bg-slate-200"} aria-hidden />

                    {/* For the whole invoice */}
                    <div className="relative">
                        <button
                            type="button"
                            className={clsx(small, compact && tight)}
                            disabled={!can.upcharge || subtotal <= 0}
                            onClick={() => setOpen(open === "upcharge" ? null : "upcharge")}
                        >
                            <Receipt className="size-4" /> Apply upcharge
                        </button>
                        {open === "upcharge" && (
                            <AdjustPopover
                                title="Apply upcharge"
                                hint="Added once to the invoice"
                                base={subtotal}
                                max={subtotal}
                                initial={draft.fee}
                                initialNote={draft.feeNote}
                                withNote
                                onClose={() => setOpen(null)}
                                onApply={(amount, note) => {
                                    set("fee", amount);
                                    set("feeNote", note);
                                    setOpen(null);
                                }}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className={clsx(buttonPrimary, "!bg-cobalt-500 !py-2 hover:!bg-cobalt-600", compact ? "!gap-1.5 !px-3" : "!px-4")}
                        disabled={!can.items}
                        onClick={onAdd}
                    >
                        <Plus className="size-4" /> Add item
                    </button>
                </div>

                {confirm === "void" && (
                    <Dialog
                        title="Void Item"
                        body="Are you sure you want to void the selected item(s)? They stay on the invoice at $0."
                        primary={{
                            label: "Void",
                            onClick: () => {
                                voidItems(selected);
                                clearSelection();
                                setConfirm(null);
                            },
                        }}
                        onClose={() => setConfirm(null)}
                    />
                )}
                {confirm === "delete" && (
                    <Dialog
                        title="Delete Item"
                        body="Are you sure you want to delete the selected item(s)?"
                        primary={{
                            label: "Delete",
                            onClick: () => {
                                removeItems(selected);
                                clearSelection();
                                setConfirm(null);
                            },
                        }}
                        onClose={() => setConfirm(null)}
                    />
                )}
            </div>
        </>
    );
};

export default ItemsToolbar;
