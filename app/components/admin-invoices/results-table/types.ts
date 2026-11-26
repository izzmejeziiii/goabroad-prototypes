import type { ReactNode } from "react";

/* Prop shapes for the ResultsTable copy (src/components/ResultsTable, see its
   README.md). Same names and meanings as the real props, typed. */

/** Every row needs an id; the real table compares JSON.stringify(row), this
    copy compares ids so a refreshed row keeps its selection. */
export type TableRowData = { id: number; [key: string]: unknown };

export type SortDirection = "asc" | "desc";

/** A date column filter value (DateFilter): one day, or a range. */
export type DateValue = { start: string; end?: string };

export type SelectOption = { value: string | number; label: string };

export type ColumnFilter = {
    /** Defaults to the column's type (text / number / date). */
    type?: "select" | "text" | "number" | "date";
    value?: unknown;
    /** select: raw options, read through optionKey / optionValue. */
    options?: Record<string, unknown>[];
    optionKey?: string;
    optionValue?: string;
    isMultiSelect?: boolean;
    isSearchable?: boolean;
    isDisabled?: boolean;
    // The real filters hand back different shapes per type: a change event
    // for text/number, a react-select option (or list) for select, and a
    // { start, end } object for date.
    onChange?: (value: never) => void;
};

export type Column<R extends TableRowData = TableRowData> = {
    name: string;
    key: string;
    /** text | number | date | custom | "status_chip: payment" | "status_chip: sale_type" */
    type?: string;
    /** Comma separated: bold, italic, underline, truncate. */
    format?: string;
    isCurrency?: boolean;
    /** Row key holding the cell's link. */
    urlKey?: string;
    /** Row key holding a count; shows "+n" when above 1. */
    countKey?: string;
    onClick?: (row: R) => void;
    sort?: SortDirection;
    sortable?: boolean;
    isSearchable?: boolean;
    renderCell?: (row: R) => ReactNode;
    filter?: ColumnFilter;
};

export type RowMenu<R extends TableRowData = TableRowData> = {
    name?: string;
    key?: string;
    text: string;
    handler?: (row: R) => void;
    url?: string;
    target?: string;
};

export type BatchIcon = "send" | "remind" | "delete" | "download" | "export";

export type BatchAction = {
    icon: BatchIcon;
    handler: () => void;
    disabled?: boolean;
    enableInSelectAll?: boolean;
};

export type RowIcon = {
    name: string;
    icon: ReactNode;
    placement: "left" | "right";
    column: string;
};

export type SearchFilterOption =
    | string
    | {
          key: string;
          name: string;
          disabled?: boolean;
          hasAutoSuggest?: boolean;
          dropdownOptions?: {
              arrayOptions: Record<string, unknown>[];
              labelKey: string;
              valueKey: string;
          };
      };

export type ResultsTableProps<R extends TableRowData> = {
    data: R[];
    count: number;
    columns: Column<R>[];
    label?: string;
    page?: number;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    selectable?: boolean;
    hasSearch?: boolean;
    hasColumnFilters?: boolean;
    hasGlobalFilters?: boolean;
    activeGlobalFilters?: boolean;
    activeColumnFilters?: boolean;
    batchActions?: BatchAction[];
    rowMenus?: RowMenu<R>[];
    rowMenusChecker?: (row: R, menus: RowMenu<R>[]) => RowMenu<R>[];
    icons?: RowIcon[];
    iconsChecker?: (row: R, icons: RowIcon[]) => RowIcon[];
    /** rowClasses: one extra class for every <tr>. */
    rowClassName?: string;
    searchFilterOptions?: SearchFilterOption[];
    noDataMessage?: string;
    isLoadingData?: boolean;
    showColumnFilters?: boolean;
    initialShowSearchFilter?: boolean;
    selected?: R[];
    onRowClick?: (row: R) => void;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rows: number) => void;
    onGlobalFiltersClick?: () => void;
    onColumnFiltersApply?: () => void;
    onColumnFilterClose?: () => void;
    onSearchFilterChange?: (search: { filter: string; value: string | number }) => void;
    onSearchFilterClose?: () => void;
    onSelectedChange?: (rows: R[]) => void;
    onColumnHeaderClick?: (column: Column<R>, index: number) => void;
};
