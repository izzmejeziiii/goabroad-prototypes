"use client";

import { createContext, useContext } from "react";
import type { ResultsTableProps, TableRowData } from "./types";

/* ResultsTableProvider.js: the table's own state (selection, which filter
   rows are open) next to the props, shared by the toolbar, head, filter
   row, rows and footer. */

export type TableState = {
    selected: TableRowData[];
    unselected: TableRowData[];
    isSelectedAll: boolean;
    showColumnFilters: boolean;
    showSearchFilter: boolean;
};

export type TableContext = {
    props: ResultsTableProps<TableRowData> & {
        onLinkClick?: (url: string, row: TableRowData) => void;
    };
    state: TableState;
    setState: (patch: Partial<TableState>) => void;
    /** Rows of the current page that are selected. */
    selectedOnPage: () => TableRowData[];
};

export const Ctx = createContext<TableContext | null>(null);

export const useTable = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("ResultsTable parts need <ResultsTable>");
    return ctx;
};

/* TableCell, with the theme's overrides (src/theme.js): line-height 1.3,
   0.8215rem body, 0.75rem / 500 / rgba(0,0,0,.54) / line-height 1 head,
   and the 1px rgba(224,224,224,1) rule under every cell. */
export const CELL =
    "table-cell border-0 border-b border-solid !border-[rgba(224,224,224,1)] text-left align-middle leading-[1.3] tracking-[0.01071em]";

/** Head cells: ResultsTable's `& th { padding: 0 }` outranks the head's own
    `padding: 0 8px` (the table's sheet is injected after its children's). */
export const HEAD_CELL = `${CELL} p-0 text-[0.75rem] font-medium !leading-none text-[rgba(0,0,0,0.54)]`;

/** Body cells (size="small"): the row's `padding: 8` beats the theme's
    sizeSmall `8px 0`. */
export const BODY_CELL = `${CELL} p-2 text-[0.8215rem] text-[rgba(0,0,0,0.87)]`;
