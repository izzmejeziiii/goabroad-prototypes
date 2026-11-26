"use client";

import { useState, type ReactNode } from "react";
import { accountManagers, BASE, DEMO_TODAY } from "../../data";
import Link from "next/link";
import { isoDate, parseDate } from "../../format";
import { Button, buttonClasses, LinearProgress } from "../../mui";
import type { Invoice } from "../../types";
import { useInvoices } from "../../store";
import ResultsTable from "../../results-table/ResultsTable";
import { DialogBox } from "../../results-table/primitives/DialogBox";
import type { BatchAction, Column, RowMenu } from "../../results-table/types";
import {
    ACCESS_LEVEL,
    COLUMN_FILTER_NAMES,
    GLOBAL_FILTERS_NAMES,
    hasValue,
    QUICK_FILTER_STATUSES,
    SORTABLE_FIELDS,
    type StaffFilters,
    type StaffRow,
} from "./constants";
import { getColumns, icons, iconsChecker } from "./columns";
import EditSaleTypeDialog from "./EditSaleTypeDialog";
import InvoicesDrawer from "./InvoicesDrawer";
import { useInvoicesContext } from "./InvoicesProvider";
import RemindClientDialog, { buildRecipientState, type RecipientOption } from "./RemindClientDialog";

/* Copy of src/views/Client/Invoices/ResultsMain.js: the Renewables quick
   filter, the results table with its columns, row menus, batch actions,
   search / column / global filters, and the dialogs those open. Requests
   are played out against the demo store behind the same "Processing..."
   dialog, then the same confirmation the real one shows. Export, PDF
   downloads and the reminder email have nothing to send, so they confirm
   (or just close) the way a success would. */

type DialogState = {
    showDialog: boolean;
    title?: ReactNode;
    content?: ReactNode;
    actions?: "" | "Ok" | "OkCancel" | "Cancel";
    onOk?: () => void;
    stringOverride?: { primaryAction?: string; secondaryAction?: string };
};

type Remind = {
    show: boolean;
    message: string;
    subject: string;
    recipients: string[];
    recipientOptions: RecipientOption[];
    row: StaffRow | null;
};

const SEARCH_FILTERS = ["contact_email", "contact_name", "account_manager_id"] as const;

/** Server round trip stand-in. */
const later = (fn: () => void, ms = 600) => setTimeout(fn, ms);

const message = (successMessage: string, successIds: (number | string)[], errorMessage: string, errorIds: (number | string)[]) => (
    <div>
        {successIds.length > 0 && errorIds.length > 0 && (
            <span>
                {successMessage}: {successIds.join(", ")}
            </span>
        )}
        {successIds.length > 0 && errorIds.length === 0 && <span>{successMessage}</span>}
        {errorIds.length > 0 && successIds.length > 0 && (
            <span>
                {errorMessage}: {errorIds.join(", ")}
            </span>
        )}
        {errorIds.length > 0 && successIds.length === 0 && <span>{errorMessage}</span>}
    </div>
);

const monthBounds = () => {
    const d = parseDate(DEMO_TODAY) as Date;
    return {
        monthStart: isoDate(new Date(d.getFullYear(), d.getMonth(), 1)),
        monthEnd: isoDate(new Date(d.getFullYear(), d.getMonth() + 1, 0)),
    };
};

const ResultsMain = () => {
    const { state, handleStateChanged, data, count, label, selectedInvoice, setLocal } = useInvoicesContext();
    const { getInvoice, updateInvoice, createInvoice } = useInvoices();
    const { filters, page, rowsPerPage, sort, showColumnFilters } = state;

    const [filterBuffer, setFilterBuffer] = useState<StaffFilters>({});
    const [prevFilters, setPrevFilters] = useState(filters);
    if (prevFilters !== filters) {
        // componentDidUpdate: the buffer follows the applied filters
        setPrevFilters(filters);
        setFilterBuffer({ ...filters });
    }

    const [selectedInvoices, setSelectedInvoices] = useState<StaffRow[]>([]);
    const [disabled, setDisabled] = useState({ delete: false, send: false, remind: false, download: false });
    const [dialog, setDialog] = useState<DialogState>({ showDialog: false });
    const [saving, setSaving] = useState(false);
    const [remind, setRemind] = useState<Remind>({
        show: false,
        message: "",
        subject: "",
        recipients: [],
        recipientOptions: [],
        row: null,
    });
    const [saleType, setSaleType] = useState<{ show: boolean; invoice: StaffRow | null; selected: number | string | null }>({
        show: false,
        invoice: null,
        selected: null,
    });

    const clearSelectedInvoices = () => setSelectedInvoices([]);
    const closeDialog = () => setDialog({ showDialog: false });

    // `refresh` false: OK only closes the dialog
    const showConfirmation = (title: ReactNode, content: ReactNode, refresh = true) =>
        setDialog({
            actions: "Ok",
            title,
            content,
            showDialog: true,
            onOk: () => {
                closeDialog();
                if (!refresh) return;
                handleStateChanged({ page: 0 });
                setSelectedInvoices([]);
            },
            stringOverride: { primaryAction: "Close" },
        });

    const openDialog = (title: string, content: ReactNode, callback: () => void) =>
        setDialog({ actions: "OkCancel", title, content, showDialog: true, onOk: callback });

    /** A POST: Processing..., then the result. */
    const request = (done: () => void) => {
        setSaving(true);
        later(() => {
            setSaving(false);
            done();
        });
    };

    /* ── Column / search filters ─────────────────────────────────────── */

    const { monthStart, monthEnd } = monthBounds();
    const isRenewablesActive =
        filters.renewal_date?.start === monthStart &&
        filters.renewal_date?.end === monthEnd &&
        filters.payment_status === QUICK_FILTER_STATUSES;

    const applyColumnFilters = () => {
        const changed = !COLUMN_FILTER_NAMES.every((f) => filters[f] === filterBuffer[f]);
        if (!changed) return;
        const merged: StaffFilters = { ...filters, ...filterBuffer };
        const renewables =
            merged.renewal_date?.start === monthStart &&
            merged.renewal_date?.end === monthEnd &&
            merged.payment_status === QUICK_FILTER_STATUSES;
        if (!renewables && merged.payment_status === QUICK_FILTER_STATUSES) delete merged.payment_status;
        handleStateChanged({ filters: merged, page: 0 });
        clearSelectedInvoices();
    };

    const clearColumnFilters = () => {
        const changed = !COLUMN_FILTER_NAMES.every((f) => !hasValue(filters[f]));
        if (changed) {
            const other: StaffFilters = { ...filters };
            (["id", "name", "invoice_date", "payment_status", "due_date", "renewal_date", "sale_type", "provider_id"] as const).forEach(
                (k) => delete other[k],
            );
            handleStateChanged({ filters: other, prevFilters: { ...other }, page: 0 });
        }
        setFilterBuffer({});
        setSelectedInvoices([]);
    };

    const onFilterChange = <K extends keyof StaffFilters>(key: K, value: StaffFilters[K]) =>
        setFilterBuffer((b) => ({ ...b, [key]: value }));

    const searchFilterChange = ({ filter, value }: { filter: string; value: string | number }) => {
        const next: StaffFilters = { ...filters };
        SEARCH_FILTERS.forEach((f) => (next[f] = null));
        (next as Record<string, unknown>)[filter] = value;
        handleStateChanged({ filters: next, page: 0 });
        clearSelectedInvoices();
    };

    const clearSearchFilter = () => {
        const next: StaffFilters = { ...filters };
        SEARCH_FILTERS.forEach((f) => delete next[f]);
        handleStateChanged({ filters: next, page: 0 });
        clearSelectedInvoices();
    };

    const renewablesClick = () => {
        if (isRenewablesActive) {
            const next: StaffFilters = { ...filters };
            delete next.renewal_date;
            delete next.payment_status;
            handleStateChanged({ filters: next, page: 0 });
        } else {
            handleStateChanged({
                filters: { ...filters, renewal_date: { start: monthStart, end: monthEnd }, payment_status: QUICK_FILTER_STATUSES },
                page: 0,
            });
        }
        clearSelectedInvoices();
    };

    /* ── Row actions ─────────────────────────────────────────────────── */

    const rowClicked = (row: StaffRow) => {
        handleStateChanged({ selectedInvoiceId: row.id, invoiceSummaryOpen: true, drawerTabSelected: 0 });
        clearSelectedInvoices();
    };

    const commentInvoice = (row: StaffRow) => {
        handleStateChanged({ selectedInvoiceId: row.id, invoiceSummaryOpen: true, drawerTabSelected: 1 });
        clearSelectedInvoices();
    };

    const recordPayment = (row: StaffRow) => handleStateChanged({ selectedInvoiceId: row.id, paymentDrawerOpen: true });

    const deleteInvoice = (isBatch: boolean, row?: StaffRow) => {
        const ids = isBatch ? selectedInvoices.map((i) => i.id) : row ? [row.id] : [];
        request(() => {
            setLocal((l) => ({ ...l, deleted: [...l.deleted, ...ids] }));
            showConfirmation(
                "DELETE",
                message("Succeeded to delete selected invoice(s)", ids, "Failed to delete selected invoice(s)", []),
            );
        });
    };

    const handleDelete = (isBatch: boolean) => (row?: StaffRow) =>
        openDialog("Delete Invoice", "Are you sure you want to delete the selected invoice(s)?", () => deleteInvoice(isBatch, row));

    const duplicateInvoice = (row: StaffRow) => {
        const inv = getInvoice(row.id);
        if (!inv) return;
        request(() => {
            const copy: Partial<Invoice> = { ...inv };
            delete copy.id;
            const id = createInvoice({
                ...(copy as Omit<Invoice, "id">),
                status: 0,
                printed_date: DEMO_TODAY,
                payment_terms: inv.payment_terms.map((t) => ({ ...t, amount_paid: 0 })),
                payments: [],
                pending_payment: null,
                comments: [],
                activities: [],
                pdf: null,
            });
            showConfirmation(
                "Duplicate Invoice",
                <div className="flex flex-col items-center">
                    <p className="m-0">Successfully created a duplicate invoice!</p>
                    {/* .viewDuplicate a: pinned beside the dialog's Close */}
                    <Link
                        href={`${BASE}/invoice/edit/${id}`}
                        className={buttonClasses({ variant: "contained", color: "primary", className: "!absolute bottom-6 right-[119px]" })}
                    >
                        View
                    </Link>
                </div>,
            );
        });
    };

    const voidInvoice = (row: StaffRow) =>
        request(() => {
            if (row.pending_payment) {
                // e.g. a bank payment is still being processed
                showConfirmation("Invoice Not Voided", "Failed to mark the invoice as void!", false);
                return;
            }
            updateInvoice(row.id, { status: 6 });
            showConfirmation(
                "Void Invoice",
                message("Successfully marked the invoice void!", [row.id], "Failed to mark the invoice as void!", []),
            );
        });

    const sendInvoice = (isBatch: boolean, row: StaffRow | null, successMessage: string, errorMessage: string) => {
        const list = isBatch ? selectedInvoices : row ? [row] : [];
        request(() => {
            list.forEach((inv) => {
                // Sending a pending invoice issues it (unpaid)
                if (inv.payment_status === "pending") updateInvoice(inv.id, { status: 2 });
            });
            showConfirmation("Success!", message(successMessage, list.map((i) => i.id), errorMessage, []));
        });
    };

    const handleSendInvoice = (isBatch: boolean, row?: StaffRow) =>
        openDialog("Send Invoice", "Are you sure you want to send invoice(s) to client?", () =>
            sendInvoice(isBatch, row ?? null, "Successfully sent the invoice!", "Failed to send invoice!"),
        );

    const handleRemindClient = (isBatch: boolean, row?: StaffRow) => {
        if (isBatch) {
            setRemind((r) => ({ ...r, message: "", subject: "", recipients: [] }));
            openDialog("Remind Client", "Are you sure you want to remind client(s) of the selected invoice(s)?", () =>
                sendInvoice(
                    true,
                    row ?? null,
                    "Successfully reminded client of their invoice.",
                    "Failed to remind client of their invoice.",
                ),
            );
            return;
        }
        if (!row) return;
        handleStateChanged({ selectedInvoiceId: row.id });
        // GET /contacts/client/:provider_id: the demo has the one billing contact
        const contacts = buildRecipientState([{ ...row.contact, is_billing: true }]);
        setRemind({
            show: true,
            // Pre-filled from the row: the invoice's own message, and a
            // subject list rows don't have.
            message: row.message || "",
            subject: "",
            row,
            ...contacts,
        });
    };

    const handleDownloadInvoice = (isBatch: boolean) => {
        // One PDF opens in a new tab and several download as a zip; the demo
        // has no PDFs, so a batch only shows the processing dialog.
        if (isBatch && selectedInvoices.length > 1) request(() => {});
    };

    const exportInvoice = () =>
        request(() => {
            closeDialog();
            setSelectedInvoices([]);
        });

    const markOpen = (row: StaffRow, open: 0 | 1) =>
        request(() => {
            setLocal((l) => ({ ...l, open: { ...l.open, [row.id]: open } }));
            showConfirmation(
                `Mark Invoice as ${open ? "Open" : "Closed"}`,
                message(
                    `Successfully marked the invoice as ${open ? "open" : "closed"}!`,
                    [row.id],
                    `Failed to mark the invoice as ${open ? "open" : "closed"}!`,
                    [],
                ),
            );
        });

    const selectMultiple = (rows: StaffRow[]) => {
        setSelectedInvoices(rows);
        setDisabled({
            delete: !rows.every((r) => r.payment_status === "draft"),
            send: !rows.every((r) => r.payment_status === "pending"),
            remind: !rows.every((r) => ["unpaid", "partial", "overdue"].includes(r.payment_status)),
            download: !rows.every((r) => ["unpaid", "partial", "overdue", "paid"].includes(r.payment_status)),
        });
    };

    const rowMenus: RowMenu<StaffRow>[] = [
        { name: "view", text: "View Invoice" },
        { name: "edit", text: "Edit Invoice" },
        { name: "send_invoice", text: "Send Invoice", handler: (row) => handleSendInvoice(false, row) },
        { name: "remind", text: "Remind Client", handler: (row) => handleRemindClient(false, row) },
        { name: "mark_as_paid", text: "Mark As Paid", handler: recordPayment },
        {
            name: "duplicate",
            text: "Duplicate",
            handler: (row) =>
                openDialog("Duplicate Invoice", "Are you sure you want to duplicated the selected invoice?", () => duplicateInvoice(row)),
        },
        {
            name: "edit_sale_type",
            text: "Edit Sale Type",
            handler: (row) => setSaleType({ show: true, invoice: row, selected: row.sale_type }),
        },
        { name: "comment", text: "Add Comment", handler: commentInvoice },
        {
            name: "void",
            text: "Void",
            handler: (row) => openDialog("Void Invoice", "Are you sure you want to void this invoice?", () => voidInvoice(row)),
        },
        { name: "delete", text: "Delete", handler: handleDelete(false) },
        { name: "download", text: "Download", handler: () => handleDownloadInvoice(false) },
        {
            name: "mark_as_open",
            text: "Mark As Open",
            handler: (row) =>
                openDialog("Mark Invoice As Open", "Are you sure you want to mark invoice as open?", () => markOpen(row, 1)),
        },
        {
            name: "mark_as_close",
            text: "Mark As Closed",
            handler: (row) =>
                openDialog("Mark Invoice As Closed", "Are you sure you want to mark invoice as closed?", () => markOpen(row, 0)),
        },
    ];

    const rowMenusChecker = (row: StaffRow, menus: RowMenu<StaffRow>[]) =>
        menus
            .filter((menu) => {
                const s = row.payment_status;
                if (menu.name === "edit_sale_type") return true; // ability: managers can
                if (menu.name === "delete") return s === "draft";
                if (menu.name === "send_invoice") return s === "pending" && ACCESS_LEVEL === 3;
                if (menu.name === "remind") return ["unpaid", "partial", "overdue"].includes(s);
                if (menu.name === "void") return ["unpaid", "pending", "draft", "overdue"].includes(s) && ACCESS_LEVEL >= 3;
                if (menu.name === "mark_as_paid") return ["unpaid", "partial", "overdue"].includes(s);
                if (menu.name === "download") return ["unpaid", "partial", "overdue", "paid"].includes(s);
                if (menu.name === "mark_as_open") return row.open === 0 && ["unpaid", "partial", "overdue"].includes(s);
                if (menu.name === "mark_as_close") return row.open === 1;
                return true;
            })
            .map((menu) => {
                if (menu.name === "view") menu.url = `${BASE}/invoice/view/${row.id}`;
                if (menu.name === "edit") menu.url = `${BASE}/invoice/edit/${row.id}`;
                return menu;
            });

    const batchActions: BatchAction[] = [
        { icon: "send", handler: () => handleSendInvoice(true), disabled: disabled.send },
        { icon: "remind", handler: () => handleRemindClient(true), disabled: disabled.remind },
        { icon: "delete", handler: () => handleDelete(true)(), disabled: disabled.delete },
        { icon: "download", handler: () => handleDownloadInvoice(true), disabled: disabled.download },
        {
            icon: "export",
            handler: () => openDialog("Export Invoices", "Download All Columns & Invoice Fields as CSV", exportInvoice),
            disabled: false,
            enableInSelectAll: true,
        },
    ];

    const onColumnHeaderClick = (column: Column<StaffRow>) => {
        if (!SORTABLE_FIELDS.includes(column.key)) return;
        handleStateChanged({
            sort: [{ direction: column.sort === "asc" ? "desc" : "asc", key: column.key }],
            page: 0,
        });
        clearSelectedInvoices();
    };

    const activeGlobalFilters = GLOBAL_FILTERS_NAMES.some((k) => k in filters && ![null, undefined, ""].includes(filters[k] as never));

    const pageRows = data.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage);

    return (
        <>
            <InvoicesDrawer />
            <div className="flex justify-end gap-2 py-2">
                <Button size="small" variant={isRenewablesActive ? "contained" : "outlined"} color="primary" onClick={renewablesClick}>
                    Renewables
                </Button>
            </div>
            <ResultsTable<StaffRow>
                // rowClasses: td 100 wide (min 90), the checkbox and menu
                // columns 60, the client name 320 (min 300)
                rowClassName="[&>td]:!w-[100px] [&>td]:!min-w-[90px] [&>td:nth-child(1)]:!w-[60px] [&>td:nth-child(1)]:!min-w-[60px] [&>td:nth-child(2)]:!w-[320px] [&>td:nth-child(2)]:!min-w-[300px] [&>td:last-child]:!w-[60px] [&>td:last-child]:!min-w-[60px]"
                data={pageRows}
                label={label}
                columns={getColumns({ filters: filterBuffer, sort, onFilterChange, onComment: commentInvoice })}
                rowMenus={rowMenus}
                page={page}
                count={count}
                batchActions={batchActions}
                rowsPerPage={rowsPerPage}
                searchFilterOptions={[
                    { key: "contact_name", name: "Account Holder Name", hasAutoSuggest: false },
                    { key: "contact_email", name: "Account Holder Email", hasAutoSuggest: false },
                    {
                        key: "account_manager_id",
                        name: "Account Manager",
                        hasAutoSuggest: true,
                        dropdownOptions: { arrayOptions: accountManagers, labelKey: "name", valueKey: "employee_id" },
                    },
                ]}
                onRowClick={rowClicked}
                // Changing rows per page keeps the page, so page 2 at 50 rows
                // shows nothing and "51–16 of 16", as the real one does.
                onRowsPerPageChange={(n) => handleStateChanged({ rowsPerPage: n })}
                onPageChange={(p) => handleStateChanged({ page: p })}
                onGlobalFiltersClick={() => handleStateChanged({ globalFilterOpen: true })}
                onColumnFiltersApply={applyColumnFilters}
                onColumnFilterClose={clearColumnFilters}
                onSearchFilterChange={searchFilterChange}
                onSearchFilterClose={clearSearchFilter}
                onSelectedChange={selectMultiple}
                icons={icons}
                iconsChecker={iconsChecker}
                onColumnHeaderClick={onColumnHeaderClick}
                rowMenusChecker={rowMenusChecker}
                showColumnFilters={showColumnFilters}
                selected={selectedInvoices}
                activeGlobalFilters={activeGlobalFilters}
                // The client profile isn't part of this prototype
                onLinkClick={() => {}}
            />
            <DialogBox
                actions={dialog.actions}
                open={dialog.showDialog}
                onOk={dialog.onOk}
                onCancel={closeDialog}
                onClose={closeDialog}
                stringOverride={dialog.stringOverride}
            >
                <p className="m-0 text-[1.25rem] font-semibold leading-[1.5] tracking-[0.00938em] text-[#424242]">{dialog.title}</p>
                <div className="mt-4 flex-auto overflow-y-auto p-0">{dialog.content}</div>
            </DialogBox>
            <RemindClientDialog
                open={remind.show}
                message={remind.message}
                subject={remind.subject}
                invoice={selectedInvoice}
                recipientOptions={remind.recipientOptions}
                recipients={remind.recipients}
                onMessageChange={(m) => setRemind((r) => ({ ...r, message: m }))}
                onSubjectChange={(s) => setRemind((r) => ({ ...r, subject: s }))}
                onRecipientsChange={(emails) => setRemind((r) => ({ ...r, recipients: emails }))}
                onOk={() => {
                    sendInvoice(false, remind.row, "Successfully reminded client of their invoice.", "Failed to remind client of their invoice.");
                    setRemind({ show: false, message: "", subject: "", recipients: [], recipientOptions: [], row: null });
                }}
                onCancel={() => setRemind({ show: false, message: "", subject: "", recipients: [], recipientOptions: [], row: null })}
            />
            <EditSaleTypeDialog
                open={saleType.show}
                value={saleType.selected}
                onChange={(v) => setSaleType((s) => ({ ...s, selected: v }))}
                onCancel={() => setSaleType({ show: false, invoice: null, selected: null })}
                onSave={() => {
                    const { invoice, selected } = saleType;
                    setSaleType({ show: false, invoice: null, selected: null });
                    if (!invoice) return;
                    request(() => {
                        updateInvoice(invoice.id, { sale_type: Number(selected) as StaffRow["sale_type"] });
                        showConfirmation("Edit Sale Type", "Sale type updated successfully.");
                    });
                }}
            />
            <DialogBox open={saving} title="Processing..." actions="">
                <LinearProgress />
            </DialogBox>
        </>
    );
};

export default ResultsMain;
