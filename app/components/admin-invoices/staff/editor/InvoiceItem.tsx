"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/InvoiceItem.js (with
   src/components/DatePicker/GenericDatePicker.js for the two date cells):
   one Paper per item with a borderless summary table (select box, Invoice
   Item dropdown, Ad Placements chips, Start/End Date, Quantity, Subtotal,
   caret) and the collapsible per-placement Discount / Amount list.
   The signed-in manager can `edit_invoice_item_amount`, so amounts are
   inputs and the Subtotal cell shows the amount. */

import clsx from "clsx";
import { useState } from "react";
import { MdAdd, MdExpandMore } from "react-icons/md";
import { BODY1, Button, IconButton, OVERLINE, Paper } from "../../mui";
import { AD_TYPES } from "./catalog";
import { useEditor } from "./EditorContext";
import type { EditorItem } from "./types";
import { ArrowTooltip, Checkbox, PrimaryChip } from "./ui/controls";
import { DatePicker } from "./ui/DatePicker";
import { Input, StartAdornment } from "./ui/inputs";
import { ReactSelect } from "./ui/ReactSelect";
import { commas, computeEndDate, isEmptyDate, toDate } from "./utils";

const PAID_STATUS = 5;
/** ability.can('edit_invoice_item_amount', 'Invoice') for a manager. */
const CAN_EDIT_AMOUNT = true;

/** rowLabels: grey[600] overline. */
const LABEL = clsx(OVERLINE, "!text-[#757575]");
/** TableCell head (theme): 16px, 0.75rem medium, rgba(0,0,0,.54), lh 1. */
const TH = "p-4 align-middle text-[0.75rem] font-medium leading-none text-[rgba(0,0,0,0.54)]";
/** TableCell body (theme): 16px, 0.8215rem, lh 1.3; borders removed by
    invoiceItemSummary. */
const TD = "p-4 text-left align-middle text-[0.8215rem] leading-[1.3] text-[rgba(0,0,0,0.87)]";
/** GenericDatePicker `datepicker`. */
const DATE_INPUT =
    "h-10 min-w-[200px] rounded-[4px] border border-solid !border-[rgba(0,0,0,0.26)] text-center text-[14px] text-[#757575]";

const AD_OPTIONS = AD_TYPES.map((t) => ({ value: t.id, label: t.item_name }));

const placementText = (p: EditorItem["placements"][number]) =>
    `${p.location ? p.location.name : ""} ${p.online ? p.online.name : ""} ${p.timing ? p.timing.name : ""} ${
        p.type ? p.type.name : ""
    }`;

const asDate = (value: EditorItem["startDate"]) =>
    value instanceof Date ? value : isEmptyDate(value) ? null : toDate(value);

const InvoiceItem = ({ id, onDirectoryChange }: { id: number; onDirectoryChange: (directoryId: number) => void }) => {
    const { state, handleStateChange } = useEditor();
    const [expanded, setExpanded] = useState(false);
    const invoiceItem = state.invoiceItems.find((item) => item.id === id);
    if (!invoiceItem) return null;

    const updateItem = (fn: (item: EditorItem) => EditorItem) =>
        handleStateChange((s) => ({
            invoiceItems: s.invoiceItems.map((item) => (item.id === id ? fn(item) : item)),
        }));

    const handleTogglePlacementDrawer = (item: EditorItem, placementIndex: number | null) => {
        onDirectoryChange(item.adItem ? item.adItem.directory_id : 0);
        handleStateChange({
            selectedInvoiceItem: item,
            placementDrawerOpen: true,
            selectedPlacement: placementIndex,
        });
    };

    const handleStartDateChange = (date: Date | null) =>
        updateItem((item) => ({
            ...item,
            startDate: date,
            endDate: computeEndDate(date, item.duration || { value: "", type: "open" }),
        }));

    const handleEndDateChange = (date: Date | null) => updateItem((item) => ({ ...item, endDate: date }));

    const handleSelectItem = () =>
        handleStateChange((s) => ({
            selected: s.selected.includes(id) ? s.selected.filter((idx) => idx !== id) : [...s.selected, id],
        }));

    const handleSelectAdItem = (type: { value: string | number; label: string } | null) => {
        if (!type) return;
        const adType = AD_TYPES.find((t) => t.id === type.value);
        const adItem = {
            value: Number(type.value),
            label: type.label,
            cost: adType?.cost ?? 0,
            directory_id: adType?.directory_id ?? 0,
            hasAdPlacement: adType?.search_criteria_value ?? 0,
            duration: adType?.duration,
        };
        updateItem((item) => ({
            ...item,
            adItem,
            quantity: adItem.hasAdPlacement ? 0 : 1,
            discount: 0,
            fee: 0,
            placements: adItem.hasAdPlacement ? [] : [{ location: null, timing: null, type: null }],
            // amount_str isn't reset, so a typed amount stays in the field.
            amount: adItem.cost,
            startDate: null,
            endDate: null,
            duration: adItem.duration,
        }));
    };

    const handleDeletePlacement = (pid: number) =>
        updateItem((item) => {
            const placements = item.placements.filter((_, idx) => idx !== pid);
            return {
                ...item,
                placements,
                quantity: placements.length,
                discount: placements.length ? item.discount : 0,
            };
        });

    const handleChangePlacementDiscount = (pid: number, value: string) =>
        updateItem((item) => {
            const placements = item.placements.map((p, idx) => {
                if (idx !== pid) return p;
                const discount_str = value || "";
                return { ...p, discount_str, discount: parseFloat(discount_str || "0") || 0 };
            });
            return {
                ...item,
                placements,
                discount: placements.map((p) => p.discount ?? 0).reduce((total, v) => total + v, 0),
            };
        });

    const handleCommissionAmount = (value: string) =>
        updateItem((item) => {
            const amount_str = value || "";
            return { ...item, amount_str, amount: parseFloat(amount_str || "0") || 0 };
        });

    const { placements, adItem, quantity, amount } = invoiceItem;
    const disabled = state.invoice.status > PAID_STATUS;
    const amount_str = invoiceItem.amount_str || amount;
    const qty = adItem && !adItem.hasAdPlacement ? 1 : invoiceItem.placements.length || quantity || 0;
    const showCaret = (adItem && !adItem.hasAdPlacement) || !!placements.length;
    const editableAmount = !!(adItem && adItem.value && CAN_EDIT_AMOUNT);

    const chips = () => {
        const list = placements.map((placement, pid) => {
            let label = placementText(placement);
            label = label.length > 40 ? label.substring(0, 37) + "..." : label;
            const chipClass = "mx-[5px] mb-2 mt-0 h-[30px] text-[0.875em]";
            return disabled ? (
                <PrimaryChip
                    key={`placement-${id}-${pid}`}
                    label={label}
                    className={chipClass}
                    id={"placement-" + pid}
                    dataCy={"invoice-item-placement-" + pid}
                />
            ) : (
                <PrimaryChip
                    key={`placement-${id}-${pid}`}
                    onClick={() => handleTogglePlacementDrawer(invoiceItem, pid)}
                    label={label}
                    className={chipClass}
                    onDelete={() => handleDeletePlacement(pid)}
                    id={"placement-" + pid}
                    dataCy={"invoice-item-placement-" + pid}
                />
            );
        });
        return disabled
            ? list
            : [
                  ...list,
                  // addBtn: 15px 11px padding, -8px top, label hidden.
                  <PrimaryChip
                      key={`placement-${id}-add`}
                      className="-mt-2 px-[11px] py-[15px]"
                      labelClassName="hidden"
                      onClick={() => handleTogglePlacementDrawer(invoiceItem, null)}
                      icon={<MdAdd className="-ml-2 -mr-[6px] size-6 shrink-0 text-inherit" />}
                  />,
              ];
    };

    const amountInput = (
        <Input
            className="w-full"
            value={amount_str || ""}
            startAdornment={<StartAdornment>$</StartAdornment>}
            onChange={(e) => handleCommissionAmount(e.target.value)}
            id="invoice-item-discount"
            disabled={disabled}
            type="number"
            hideSpinner
        />
    );

    return (
        <Paper className="mb-8 p-6">
            <table className="table w-full border-collapse border-spacing-0">
                <thead className="h-[42px]">
                    <tr className="cursor-pointer select-none">
                        <th className={clsx(TH, "p-0")} />
                        <th className={clsx(TH, "min-w-[200px] text-center")}>
                            <span className={LABEL}>Invoice Item</span>
                        </th>
                        <th className={clsx(TH, "min-w-[200px] text-center")}>
                            <span className={LABEL}>Ad Placements</span>
                        </th>
                        <th className={clsx(TH, "min-w-[150px] text-left")}>
                            <span className={LABEL}>Start Date</span>
                        </th>
                        <th className={clsx(TH, "min-w-[150px] text-left")}>
                            <span className={LABEL}>End Date</span>
                        </th>
                        <th className={clsx(TH, "text-left")}>
                            <span className={LABEL}>Quantity</span>
                        </th>
                        <th className={clsx(TH, "text-left")}>
                            <span className={LABEL}>Subtotal</span>
                        </th>
                        <th className={clsx(TH, "p-0")} />
                    </tr>
                </thead>
                <tbody>
                    <tr className="cursor-pointer select-none">
                        <td className={clsx(TD, "p-0")}>
                            <Checkbox
                                checked={state.selected.includes(id)}
                                onClick={handleSelectItem}
                                disabled={disabled}
                            />
                        </td>
                        <td className={clsx(TD, "min-w-[200px] text-center")}>
                            <ArrowTooltip title={adItem?.label || "Select Ad Type"}>
                                <ReactSelect
                                    value={adItem ? { value: adItem.value, label: adItem.label } : null}
                                    options={AD_OPTIONS}
                                    onChange={handleSelectAdItem}
                                    isDisabled={disabled}
                                    loadTimeout={0}
                                />
                            </ArrowTooltip>
                        </td>
                        <td className={clsx(TD, "min-w-[200px] text-center [&_button]:h-[38px]")}>
                            <div>
                                {adItem && adItem.hasAdPlacement && placements.length > 0 ? (
                                    chips()
                                ) : (
                                    <Button
                                        onClick={() => handleTogglePlacementDrawer(invoiceItem, null)}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        disabled={(adItem && !adItem.hasAdPlacement) || !adItem || disabled}
                                        data-cy="add-placement-cta"
                                    >
                                        Add Placement
                                    </Button>
                                )}
                            </div>
                        </td>
                        <td className={clsx(TD, "p-[10px] text-center")}>
                            <DatePicker
                                dataCy="start-date"
                                className={DATE_INPUT}
                                selected={asDate(invoiceItem.startDate)}
                                onChange={handleStartDateChange}
                                dropdowns
                                disabled={!(!!adItem && !disabled)}
                            />
                        </td>
                        <td className={clsx(TD, "p-[10px] text-center")}>
                            <DatePicker
                                dataCy="end-date"
                                className={DATE_INPUT}
                                minDate={asDate(invoiceItem.startDate)}
                                selected={asDate(invoiceItem.endDate)}
                                onChange={handleEndDateChange}
                                disabled={!(!!invoiceItem.startDate && !disabled)}
                                dropdowns
                            />
                        </td>
                        <td className={TD}>
                            <p className={clsx(BODY1, "m-0")} data-cy={"invoice-item-quantity-" + id}>
                                {qty}
                            </p>
                        </td>
                        <td className={TD}>
                            {/* A Typography inside a Typography in the source
                                (p in p); the outer one is a div here. Shows the
                                per-placement amount, not amount × quantity, and
                                no "$" when the amount isn't editable. */}
                            <div className={BODY1} data-cy={"invoice-item-subtotal-" + id}>
                                {editableAmount ? (
                                    <p className={clsx(BODY1, "m-0")} data-cy="invoice-subtotal">
                                        ${commas(amount)}
                                    </p>
                                ) : adItem ? (
                                    commas(qty * (adItem.cost || 0))
                                ) : (
                                    0
                                )}
                            </div>
                        </td>
                        <td className={clsx(TD, "p-0 text-right")}>
                            {showCaret && (
                                <IconButton
                                    className={clsx(
                                        "ml-auto !transition-[background-color,transform] !duration-150",
                                        expanded ? "rotate-180" : "rotate-0",
                                    )}
                                    onClick={() => setExpanded((v) => !v)}
                                    aria-expanded={expanded}
                                    aria-label="Show more"
                                    data-cy={"invoice-item-caret-button-" + id}
                                >
                                    <MdExpandMore className="size-6" />
                                </IconButton>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            {expanded && showCaret && (
                <div className="mt-8 px-6 pb-6 [&_input]:text-[0.9em]" data-cy="invoice-itemized-list">
                    <div className="box-border flex w-full flex-wrap justify-end">
                        <div className="box-border m-0 max-w-[33.333333%] grow-0 basis-1/3">
                            <div className="box-border flex w-full flex-wrap justify-end [&>*]:px-2">
                                {!(adItem && !adItem.hasAdPlacement) && (
                                    <div className="box-border max-w-[50%] grow-0 basis-1/2">
                                        <span className={LABEL}>Ad Placements</span>
                                    </div>
                                )}
                                <div className="box-border max-w-[16.666667%] grow-0 basis-1/6">
                                    <span className={LABEL}>Discount</span>
                                </div>
                                <div className="box-border max-w-[33.333333%] grow-0 basis-1/3">
                                    <span className={LABEL}>Amount</span>
                                </div>
                            </div>
                            {placements.map((placement, idx) => {
                                const discount_str = placement.discount_str || placement.discount;
                                return (
                                    <div
                                        key={idx}
                                        className="box-border flex w-full flex-wrap items-center justify-end border-0 border-t border-solid !border-[#eeeeee] py-2 last:border-b [&>*]:px-2"
                                    >
                                        <div className="box-border max-w-[50%] grow-0 basis-1/2">
                                            <p className={clsx(BODY1, "m-0")}>{placementText(placement)}</p>
                                        </div>
                                        <div className="box-border max-w-[16.666667%] grow-0 basis-1/6">
                                            <Input
                                                className="w-full"
                                                value={discount_str || ""}
                                                startAdornment={<StartAdornment>$</StartAdornment>}
                                                onChange={(e) => handleChangePlacementDiscount(idx, e.target.value)}
                                                id="invoice-item-discount"
                                                disabled={disabled}
                                                type="number"
                                                hideSpinner
                                            />
                                        </div>
                                        <div className="box-border max-w-[33.333333%] grow-0 basis-1/3">
                                            {editableAmount ? (
                                                amountInput
                                            ) : (
                                                <p className={clsx(BODY1, "m-0")}>${adItem && commas(adItem.cost)}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default InvoiceItem;
