"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/BulkCTAHeader.js: the
   sticky toolbar (top 30px, inside the scrolling <main>) with select-all,
   Add Invoice Item, Apply Upcharge, Add Discount, Duplicate, Void and
   Delete, plus the discount and upcharge dialogs. */

import { useState } from "react";
import { Button, Paper } from "../../mui";
import ApplyUpCharge from "./ApplyUpCharge";
import { getSubTotal, recomputePaymentTerms, updateRanking } from "./calc";
import { useEditor } from "./EditorContext";
import ManageDiscount from "./ManageDiscount";
import type { AdItem, EditorItem, PageDialog } from "./types";
import { Checkbox } from "./ui/controls";

const PAID_STATUS = 5;
const OVERDUE_STATUS = 4;

/** Next id not already taken. The source can hand out an id another item
    has (duplicates count up from 0, new items from the last id), which
    makes two items select and edit together; skipped here. */
const freeId = (wanted: number, taken: Set<number>) => {
    let id = wanted;
    while (taken.has(id)) id++;
    taken.add(id);
    return id;
};

const BulkCTAHeader = ({ handleDialogBox }: { handleDialogBox: (dialog: PageDialog) => void }) => {
    const { state, handleStateChange, getSubTotalOfSelected } = useEditor();
    const [duplicateIndex, setDuplicateIndex] = useState(0);
    const { invoiceItems, selected, invoice } = state;
    const invoiceItemsLength = invoiceItems.length;
    // `!parseFloat(subtotal) > 0` in the source: true only for a 0 subtotal.
    const upchargeCond = !parseFloat(String(getSubTotal(state))) || invoice.status > OVERDUE_STATUS;

    const handleSelectAll = (checked: boolean) =>
        handleStateChange((s) => ({ selected: checked ? s.invoiceItems.map((item) => item.id) : [] }));

    const handleAddInvoiceItem = () =>
        handleStateChange((s) => {
            const latestID = s.invoiceItems.length ? s.invoiceItems[s.invoiceItems.length - 1].id || 0 : 0;
            const taken = new Set(s.invoiceItems.map((i) => i.id));
            const defaultItem: EditorItem = {
                id: freeId(latestID + 1, taken),
                adItem: null,
                placements: [],
                quantity: 0,
                amount: 0,
                startDate: "",
                endDate: "",
                fee: 0,
                discount: 0,
            };
            return { invoiceItems: updateRanking([...s.invoiceItems, defaultItem]) };
        });

    const handleDuplicateInvoiceItems = () => {
        const taken = new Set(invoiceItems.map((i) => i.id));
        let duplicateCounter = 0;
        let nextIndex = duplicateIndex;
        const duplicates: EditorItem[] = [];
        invoiceItems.forEach((item) => {
            if (selected.includes(item.id)) {
                duplicates.push({
                    id: freeId(duplicateIndex + duplicateCounter, taken),
                    // Object.assign({}, null) is {} in the source.
                    adItem: { ...item.adItem } as AdItem,
                    placements: JSON.parse(JSON.stringify(item.placements)).map((p: object) => ({
                        ...p,
                        discount: 0,
                    })),
                    amount: item.amount,
                    quantity: item.quantity,
                    startDate: "",
                    endDate: "",
                    discount: 0,
                    fee: 0,
                    duration: item.duration,
                });
                duplicateCounter++;
            }
            // setState per item with a stale this.state: the last one wins.
            nextIndex = duplicateIndex + 1 + duplicateCounter;
        });
        setDuplicateIndex(nextIndex);
        handleStateChange({ invoiceItems: updateRanking([...invoiceItems, ...duplicates]) });
    };

    const handleVoidSeletedItem = () => {
        handleStateChange((s) => ({
            invoiceItems: updateRanking(
                s.invoiceItems.map((item) =>
                    s.selected.includes(item.id)
                        ? {
                              ...item,
                              placements: item.placements.map((p) => ({ ...p, discount: 0, discount_str: "" })),
                              adItem: item.adItem ? { ...item.adItem, cost: 0 } : item.adItem,
                              amount: 0,
                              amount_str: "",
                              discount: 0,
                              discount_str: "",
                          }
                        : item,
                ),
            ),
        }));
        handleStateChange((s) => ({ paymentTerms: recomputePaymentTerms(s) }));
        handleDialogBox({ open: false });
    };

    const handleVoidSeletedItemConfirm = () =>
        handleDialogBox({
            actions: "OkCancel",
            open: true,
            title: "Void Item",
            content: "Are you sure you want to void the selected item(s)?",
            onOk: handleVoidSeletedItem,
            onCancel: () => handleDialogBox({ open: false }),
            stringOverride: { primaryAction: "Void", secondaryAction: "Cancel" },
        });

    const handleDeleteSeletedItem = () => {
        handleStateChange((s) => {
            const items = updateRanking(s.invoiceItems.filter((item) => !s.selected.includes(item.id)));
            return { selected: [], invoiceItems: items, upcharge: items.length ? s.upcharge : 0 };
        });
        handleDialogBox({ open: false });
    };

    const handleDeleteSeletedItemConfirm = () =>
        handleDialogBox({
            actions: "OkCancel",
            open: true,
            title: "Delete Item",
            content: "Are you sure you want to delete the selected item(s)?",
            onOk: handleDeleteSeletedItem,
            onCancel: () => handleDialogBox({ open: false }),
            stringOverride: { primaryAction: "Delete", secondaryAction: "Cancel" },
        });

    return (
        <Paper className="sticky top-[30px] z-[1] mb-8 flex justify-between p-6">
            {!!invoiceItemsLength && (
                <Checkbox
                    onChange={handleSelectAll}
                    checked={invoiceItemsLength === selected.length}
                    disabled={invoice.status > PAID_STATUS}
                />
            )}
            <div className="grow" />
            <div className="flex items-center [&>button]:ml-4">
                <Button
                    disabled={invoice.status > PAID_STATUS}
                    onClick={handleAddInvoiceItem}
                    variant="contained"
                    color="primary"
                    size="medium"
                    data-cy="add-invoice-item-cta"
                >
                    Add Invoice Item
                </Button>
                <Button
                    onClick={() => handleStateChange({ upchargeOpen: true })}
                    disabled={upchargeCond}
                    variant="outlined"
                    color="primary"
                    size="medium"
                >
                    Apply Upcharge
                </Button>
                <Button
                    onClick={() => handleStateChange({ discountOpen: true })}
                    variant="outlined"
                    color="primary"
                    size="medium"
                    disabled={
                        (!selected.length && !(parseFloat(String(getSubTotalOfSelected())) > 0)) ||
                        invoice.status > PAID_STATUS
                    }
                >
                    Add Discount
                </Button>
                <Button
                    onClick={handleDuplicateInvoiceItems}
                    variant="outlined"
                    color="primary"
                    size="medium"
                    disabled={!selected.length || invoice.status > PAID_STATUS}
                >
                    Duplicate
                </Button>
                <Button
                    onClick={handleVoidSeletedItemConfirm}
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    disabled={!selected.length}
                >
                    Void
                </Button>
                <Button
                    onClick={handleDeleteSeletedItemConfirm}
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    disabled={!selected.length || invoice.status > PAID_STATUS}
                >
                    Delete
                </Button>
                <ManageDiscount />
                <ApplyUpCharge />
            </div>
        </Paper>
    );
};

export default BulkCTAHeader;
