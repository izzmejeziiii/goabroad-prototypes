import { MdHowToReg, MdShoppingCart } from "react-icons/md";
import { providers } from "../../data";
import { PendingPaymentChip, StatusChip, Tooltip } from "../../mui";
import type { Column, RowIcon, SelectOption } from "../../results-table/types";
import { PAYMENT_STATUS_VALUE, SALE_TYPE_VALUE, type Sort, type StaffFilters, type StaffRow } from "./constants";
import TeamIcon from "./TeamIcon";

/* ResultsMain.getColumns(), getIcons() and getIconsChecker() from
   src/views/Client/Invoices/ResultsMain.js: Client Name (bold, linked,
   multi-select filter of every provider), Invoice #, Invoice Date, Status
   (with the pending bank payment chip), Total Amount, Amount Due, Due Date,
   Renewal Date, Type of Sale, Comments (truncated, "+n", opens the drawer's
   Comments tab). */

/** GET /providers?fields=name,id&sort=+name */
const providerOptions = [...providers]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ id, name }) => ({ id, name }));

const sortOf = (sort: Sort, key: string) => sort.find((o) => o.key === key)?.direction;

export const getColumns = ({
    filters,
    sort,
    onFilterChange,
    onComment,
}: {
    filters: StaffFilters;
    sort: Sort;
    onFilterChange: <K extends keyof StaffFilters>(key: K, value: StaffFilters[K]) => void;
    onComment: (row: StaffRow) => void;
}): Column<StaffRow>[] => {
    const clientIds = String(filters.provider_id).split(",");
    const clients = providerOptions
        .filter(({ id }) => clientIds.includes(`${id}`))
        .map(({ id: value, name: label }) => ({ value, label }));

    const multiple = !!filters.payment_status && String(filters.payment_status).includes(",");
    const payment =
        filters.payment_status !== null && !multiple
            ? PAYMENT_STATUS_VALUE.find((o) => parseInt(String(o.id)) === parseInt(String(filters.payment_status)))
            : undefined;
    const paymentValue = filters.payment_status && !multiple && payment ? { value: payment.id, label: payment.name } : null;

    const saleType =
        filters.sale_type !== null
            ? SALE_TYPE_VALUE.find((o) => parseInt(String(o.id)) === parseInt(String(filters.sale_type)))
            : undefined;
    const saleTypeValue = filters.sale_type && saleType ? { value: saleType.id, label: saleType.name } : null;

    return [
        {
            name: "Client Name",
            key: "name",
            type: "text",
            format: "bold",
            urlKey: "url",
            filter: {
                type: "select",
                isMultiSelect: true,
                value: clients,
                options: providerOptions,
                optionKey: "name",
                optionValue: "id",
                onChange: ((provider: SelectOption[] = []) =>
                    onFilterChange("provider_id", provider.map((p) => p.value).join(","))) as (v: never) => void,
            },
        },
        {
            name: "Invoice #",
            key: "id",
            type: "number",
            filter: {
                value: filters.id,
                onChange: ((evt: { target: { value: string } }) => onFilterChange("id", evt.target.value)) as (v: never) => void,
            },
        },
        {
            name: "Invoice Date",
            key: "invoice_date",
            type: "date",
            sort: sortOf(sort, "invoice_date"),
            sortable: true,
            filter: {
                value: filters.invoice_date,
                onChange: ((v: StaffFilters["invoice_date"]) => onFilterChange("invoice_date", v)) as (v: never) => void,
            },
        },
        {
            name: "Status",
            key: "payment_status",
            type: "status_chip: payment",
            isSearchable: false,
            // A bank payment still clearing shows beside the status
            renderCell: (row) => (
                <div className="flex flex-wrap items-center gap-1">
                    <StatusChip type="payment" status={row.payment_status} />
                    <PendingPaymentChip pendingPayment={row.pending_payment} />
                </div>
            ),
            filter: {
                type: "select",
                value: paymentValue,
                options: PAYMENT_STATUS_VALUE,
                optionValue: "id",
                optionKey: "name",
                onChange: ((status: SelectOption) => onFilterChange("payment_status", status.value)) as (v: never) => void,
            },
        },
        {
            name: "Total Amount",
            key: "total_amount",
            type: "number",
            isCurrency: true,
            sort: sortOf(sort, "total_amount"),
            sortable: true,
        },
        {
            name: "Amount Due",
            key: "amount_due",
            type: "number",
            isCurrency: true,
            sort: sortOf(sort, "amount_due"),
            sortable: true,
        },
        {
            name: "Due Date",
            key: "due_date",
            type: "date",
            sort: sortOf(sort, "due_date"),
            sortable: true,
            filter: {
                value: filters.due_date,
                onChange: ((v: StaffFilters["due_date"]) => onFilterChange("due_date", v)) as (v: never) => void,
            },
        },
        {
            name: "Renewal Date",
            key: "renewal_date",
            type: "date",
            sort: sortOf(sort, "renewal_date"),
            sortable: true,
            filter: {
                value: filters.renewal_date,
                onChange: ((v: StaffFilters["renewal_date"]) => onFilterChange("renewal_date", v)) as (v: never) => void,
            },
        },
        {
            name: "Type of Sale",
            key: "sale_type",
            type: "status_chip: sale_type",
            isSearchable: false,
            filter: {
                type: "select",
                value: saleTypeValue,
                options: SALE_TYPE_VALUE,
                optionValue: "id",
                optionKey: "name",
                onChange: ((v: SelectOption) => onFilterChange("sale_type", v.value)) as (v: never) => void,
            },
        },
        {
            name: "Comments",
            key: "latest_comment",
            type: "text",
            format: "truncate",
            countKey: "comment_count",
            onClick: onComment,
        },
    ];
};

export const icons: RowIcon[] = [
    {
        // Placed by the client through the Create Ad checkout
        name: "client_order_icon",
        icon: (
            <Tooltip title="Ordered by the client" placement="top">
                <MdShoppingCart className="size-5 text-[#4caf50]" />
            </Tooltip>
        ),
        placement: "right",
        column: "name",
    },
    {
        name: "active_icon",
        icon: (
            <Tooltip title="Active Account" placement="top">
                <MdHowToReg className="size-5 text-[#4caf50]" />
            </Tooltip>
        ),
        placement: "right",
        column: "name",
    },
    { name: "unassigned_icon", icon: <TeamIcon variant="unassigned" />, placement: "right", column: "name" },
    { name: "sharks_icon", icon: <TeamIcon variant="sharks" />, placement: "right", column: "name" },
    { name: "wolves_icon", icon: <TeamIcon variant="wolves" />, placement: "right", column: "name" },
    { name: "content_icon", icon: <TeamIcon variant="content" />, placement: "right", column: "name" },
];

export const iconsChecker = (row: StaffRow, list: RowIcon[]) =>
    list.filter((icon) => {
        if (icon.name === "client_order_icon") return row.source === 1;
        if (icon.name === "active_icon") return row.is_active === 1;
        if (icon.name === "unassigned_icon") return row.team.id === 0 || !row.team.id;
        if (icon.name === "sharks_icon") return row.team.id === 35;
        if (icon.name === "wolves_icon") return row.team.id === 36;
        if (icon.name === "content_icon") return row.team.id === 23;
        return true;
    });
