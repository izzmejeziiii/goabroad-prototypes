"use client";

import { BASE } from "../../data";
import { LinearProgress, PendingPaymentChip, StatusChip } from "../../mui";
import ResultsTable from "../../results-table/ResultsTable";
import { DialogBox } from "../../results-table/primitives/DialogBox";
import type { Column, DateValue, RowMenu, SelectOption } from "../../results-table/types";
import { useClientInvoices, type ClientRow } from "./InvoicesProvider";

/* Copy of src/views/ClientAdmin/Invoices/ResultsMain.js: the client's
   invoice table. No search or global filters, just the column filters
   (Invoice #, Invoice Date, Status, Due Date, Balance), sortable amounts
   and dates, a Download batch action, and the row menu: View Invoice,
   Download, Pay Now. Both links open in a new tab (target _blank), and Pay
   Now shows on every row, paid ones included, as in the real menu. Rows
   don't open anything on click. The GlobalFilterDrawer the real file
   mounts can never open here (hasGlobalFilters is false), so it's left
   out. */

const SORTABLE_FIELDS = ["total_amount", "amount_due", "balance", "invoice_date", "due_date"];

const PAYMENT_STATUS_OPTIONS = [
    { value: -1, label: "ALL" },
    { value: 2, label: "UNPAID" },
    { value: 3, label: "PARTIAL" },
    { value: 4, label: "OVERDUE" },
    { value: 5, label: "PAID" },
];

/** The client user can('pay', 'Invoice'). */
const CAN_PAY = true;

const dateValue = (v: DateValue) => {
    if (!Object.prototype.hasOwnProperty.call(v, "start")) return undefined;
    const { start, end = null } = v;
    return start && end ? `${start},${end}` : start;
};

const ResultsMain = () => {
    const ctx = useClientInvoices();
    const { state } = ctx;
    const sortOf = (key: string) => state.sort.find((o) => o.key === key)?.direction;

    const columns: Column<ClientRow>[] = [
        {
            name: "Invoice #",
            key: "id",
            type: "number",
            format: "bold",
            filter: {
                onChange: ((evt: { target: { value: string } }) => ctx.handleColumnFiltersChange("id", evt.target.value)) as (v: never) => void,
            },
        },
        {
            name: "Invoice Date",
            key: "invoice_date",
            type: "date",
            filter: {
                onChange: ((v: DateValue) => {
                    const value = dateValue(v);
                    if (value !== undefined) ctx.handleColumnFiltersChange("invoice_date", value);
                }) as (v: never) => void,
            },
            sort: sortOf("invoice_date"),
            sortable: true,
        },
        {
            name: "Status",
            key: "payment_status",
            type: "status_chip: payment",
            // A bank payment still clearing shows beside the status
            renderCell: (row) => (
                <div className="flex flex-wrap items-center gap-1">
                    <StatusChip type="payment" status={row.payment_status} />
                    <PendingPaymentChip pendingPayment={row.pending_payment} />
                </div>
            ),
            filter: {
                type: "select",
                value: state.filters.payment_status
                    ? PAYMENT_STATUS_OPTIONS.find((o) => o.value === parseInt(String(state.filters.payment_status)))
                    : "",
                options: PAYMENT_STATUS_OPTIONS,
                onChange: ((status: SelectOption) => ctx.handleColumnFiltersChange("payment_status", status.value)) as (v: never) => void,
            },
        },
        { name: "Total Invoiced Amount", key: "total_amount", type: "number", isCurrency: true, sort: sortOf("total_amount"), sortable: true },
        { name: "Amount Due", key: "amount_due", type: "number", isCurrency: true, sort: sortOf("amount_due"), sortable: true },
        {
            name: "Due Date",
            key: "due_date",
            type: "date",
            filter: {
                onChange: ((v: DateValue) => {
                    const value = dateValue(v);
                    if (value !== undefined) ctx.handleColumnFiltersChange("due_date", value);
                }) as (v: never) => void,
            },
            sort: sortOf("due_date"),
            sortable: true,
        },
        {
            name: "Balance",
            key: "balance",
            type: "number",
            isCurrency: true,
            sort: sortOf("balance"),
            sortable: true,
            filter: {
                onChange: ((evt: { target: { value: string } }) => ctx.handleColumnFiltersChange("balance", evt.target.value)) as (v: never) => void,
            },
        },
    ];

    const rowMenus: RowMenu<ClientRow>[] = [
        { text: "View Invoice", key: "view-invoice" },
        { text: "Download", handler: () => ctx.handleDownloadInvoice(false) },
        { text: "Pay Now", key: "pay-now" },
    ];
    if (!CAN_PAY) rowMenus.splice(2, 1);

    const rowMenuChecker = (row: ClientRow, menus: RowMenu<ClientRow>[]) =>
        menus.map((menu) => {
            if (menu.key === "view-invoice") {
                menu.url = `${BASE}/invoice/view/${row.id}?view=client`;
                menu.target = "_blank";
            }
            if (menu.key === "pay-now") {
                // handleViewInvoice(id, true) appends ?openPayment
                menu.url = `${BASE}/invoice/view/${row.id}?view=client&openPayment`;
                menu.target = "_blank";
            }
            return menu;
        });

    const onColumnHeaderClick = (column: Column<ClientRow>) => {
        if (!SORTABLE_FIELDS.includes(column.key)) return;
        ctx.handleSortChange([{ direction: column.sort === "asc" ? "desc" : "asc", key: column.key }]);
    };

    return (
        <>
            <ResultsTable<ClientRow>
                // rowClasses: td 100 wide (min 90), first and last 60
                rowClassName="[&>td]:!w-[100px] [&>td]:!min-w-[90px] [&>td:nth-child(1)]:!w-[60px] [&>td:nth-child(1)]:!min-w-[60px] [&>td:last-child]:!w-[60px] [&>td:last-child]:!min-w-[60px]"
                data={ctx.data}
                label={ctx.label}
                columns={columns}
                rowMenusChecker={rowMenuChecker}
                rowMenus={rowMenus}
                page={state.page - 1}
                count={ctx.count}
                batchActions={[{ icon: "download", handler: () => ctx.handleDownloadInvoice(true) }]}
                onRowsPerPageChange={ctx.handleRowsPerPageChange}
                searchFilterOptions={["Account Holder Name", "Account Holder Email", "Account Manager"]}
                onPageChange={ctx.handlePageChange}
                onColumnFilterClose={ctx.handleClearColumnFilters}
                rowsPerPage={state.rowsPerPage}
                hasSearch={false}
                hasGlobalFilters={false}
                onColumnHeaderClick={onColumnHeaderClick}
                onColumnFiltersApply={() => Object.keys(state.filters).length > 0 && ctx.handleApplyFilter()}
                onSelectedChange={ctx.handleSelectMultipleRows}
                showColumnFilters={!!state.filters.payment_status}
                selected={state.selectedInvoices}
            />
            <DialogBox open={state.processing} title="Processing..." actions="">
                <LinearProgress />
            </DialogBox>
        </>
    );
};

export default ResultsMain;
