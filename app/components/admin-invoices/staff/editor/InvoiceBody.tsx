"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/InvoiceBody.js: the
   placement drawer, the bulk toolbar, the items (drag one onto another to
   swap them, while the invoice is below partial), the summary and the
   payment terms Paper. */

import { useState } from "react";
import { Divider, Paper } from "../../mui";
import BulkCTAHeader from "./BulkCTAHeader";
import { updateRanking } from "./calc";
import { useEditor } from "./EditorContext";
import InvoiceItem from "./InvoiceItem";
import InvoiceSummary from "./InvoiceSummary";
import PaymentsDetail from "./PaymentsDetail";
import PaymentTermDetails from "./PaymentTermDetails";
import PaymentTerms from "./PaymentTerms";
import PlacementDrawer from "./PlacementDrawer";
import type { EditorPlacement, PageDialog } from "./types";

const PARTIAL_STATUS = 3;

const InvoiceBody = ({ handleDialogBox }: { handleDialogBox: (dialog: PageDialog) => void }) => {
    const { state, handleStateChange, updatePlacementDiscount } = useEditor();
    const [selectedDirectoryId, setSelectedDirectoryId] = useState(0);
    const { invoiceItems } = state;
    const invoiceItemsLength = invoiceItems.length;

    const handleInvoiceItemDrop = (e: React.DragEvent, data: number) => {
        e.preventDefault();
        const dragged = JSON.parse(e.dataTransfer.getData("index") || "null");
        if (dragged === null) return;
        handleStateChange((s) => {
            const items = [...s.invoiceItems];
            items[data] = items.splice(dragged, 1, items[data])[0];
            return { invoiceItems: updateRanking(items) };
        });
    };

    /** Adds the drawer's placement to the item (or replaces the chip being
        edited), then re-spreads the selected items' discounts. */
    const storePlacement = (placement: EditorPlacement) => {
        handleStateChange((s) => ({
            invoiceItems: s.invoiceItems.map((item) => {
                if (item.id !== s.selectedInvoiceItem?.id) return item;
                const placements =
                    s.selectedPlacement !== null
                        ? item.placements.map((p, i) => (i === s.selectedPlacement ? placement : p))
                        : [...item.placements, placement];
                return { ...item, placements, quantity: placements.length };
            }),
            selectedPlacement: null,
        }));
        updatePlacementDiscount();
    };

    const sp =
        state.selectedPlacement !== null && state.selectedInvoiceItem
            ? state.invoiceItems.find((i) => i.id === state.selectedInvoiceItem?.id)?.placements[
                  state.selectedPlacement
              ]
            : null;
    const opt = (c?: { id: string | number; name: string } | null) => (c ? { label: c.name, value: c.id } : null);
    const online = state.selectedInvoiceItem?.adItem?.hasAdPlacement === 32768 ? 1 : null;

    return (
        <div className="px-0 py-6">
            <PlacementDrawer
                storePlacement={storePlacement}
                placementDrawerOpen={state.placementDrawerOpen}
                handleOnClose={() => handleStateChange({ placementDrawerOpen: false })}
                directory={selectedDirectoryId}
                location={opt(sp?.location)}
                type={opt(sp?.type)}
                timing={opt(sp?.timing)}
                online={online}
            />
            <BulkCTAHeader handleDialogBox={handleDialogBox} />
            <div className="mb-8">
                {invoiceItems.map((item, index) => (
                    <div
                        key={item.id}
                        draggable={invoiceItemsLength > 1 && state.invoice.status < PARTIAL_STATUS}
                        onDragStart={(e) => e.dataTransfer.setData("index", String(index))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleInvoiceItemDrop(e, index)}
                    >
                        <InvoiceItem id={item.id} onDirectoryChange={setSelectedDirectoryId} />
                    </div>
                ))}
            </div>
            {/* <Divider light /> */}
            <hr className="m-0 shrink-0 border-0 border-b border-solid !border-[rgba(0,0,0,0.08)]" />
            <InvoiceSummary />
            <Paper className="p-6">
                <PaymentTerms />
                <Divider className="my-4" />
                <PaymentTermDetails />
                {/* `!context.is_new` (not context.state) is always true. */}
                <PaymentsDetail />
            </Paper>
        </div>
    );
};

export default InvoiceBody;
