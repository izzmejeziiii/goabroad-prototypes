"use client";

import { useCallback, useState } from "react";
import { Paper } from "../mui";
import ResultsTableBody from "./ResultsTableBody";
import ResultsTableColumnFilters from "./ResultsTableColumnFilters";
import ResultsTableEnhancedToolbar from "./ResultsTableEnhancedToolbar";
import ResultsTableFooter from "./ResultsTableFooter";
import ResultsTableHead from "./ResultsTableHead";
import { Ctx, type TableContext, type TableState } from "./context";
import type { ResultsTableProps, TableRowData } from "./types";

/* Copy of src/components/ResultsTable/ResultsTable.js (+ the provider's
   state): a Paper with the theme's soft shadow and no padding, the enhanced
   toolbar, then the table in a wrapper padded 0 24px 16px, at least 480px
   tall and scrolling sideways when the columns don't fit. The rows come in
   already paged (the views slice them), as the real table expects. */

const ids = (rows?: TableRowData[]) => JSON.stringify((rows ?? []).map((r) => r.id));

export default function ResultsTable<R extends TableRowData>(
    props: ResultsTableProps<R> & { onLinkClick?: (url: string, row: R) => void },
) {
    const [state, setStateRaw] = useState<TableState>(() => ({
        selected: props.selected ?? [],
        unselected: [],
        isSelectedAll: false,
        showColumnFilters: !!props.showColumnFilters,
        showSearchFilter: !!props.initialShowSearchFilter,
    }));

    // componentDidUpdate: follow the parent when it resets these props.
    const [prev, setPrev] = useState({
        selected: ids(props.selected),
        showColumnFilters: !!props.showColumnFilters,
        initialShowSearchFilter: !!props.initialShowSearchFilter,
    });
    const selectedKey = ids(props.selected);
    if (
        prev.selected !== selectedKey ||
        prev.showColumnFilters !== !!props.showColumnFilters ||
        prev.initialShowSearchFilter !== !!props.initialShowSearchFilter
    ) {
        const patch: Partial<TableState> = {};
        if (prev.selected !== selectedKey) patch.selected = props.selected ?? [];
        if (prev.showColumnFilters !== !!props.showColumnFilters) patch.showColumnFilters = !!props.showColumnFilters;
        if (!prev.initialShowSearchFilter && props.initialShowSearchFilter) patch.showSearchFilter = true;
        setPrev({
            selected: selectedKey,
            showColumnFilters: !!props.showColumnFilters,
            initialShowSearchFilter: !!props.initialShowSearchFilter,
        });
        setStateRaw((s) => ({ ...s, ...patch }));
    }

    const setState = useCallback((patch: Partial<TableState>) => setStateRaw((s) => ({ ...s, ...patch })), []);

    const selectedOnPage = () => {
        const page = props.data ?? [];
        if (state.isSelectedAll) {
            const out = new Set(state.unselected.map((r) => r.id));
            return page.filter((r) => !out.has(r.id));
        }
        const sel = new Set(state.selected.map((r) => r.id));
        return page.filter((r) => sel.has(r.id));
    };

    const value = {
        props: props as unknown as TableContext["props"],
        state,
        setState,
        selectedOnPage,
    } satisfies TableContext;

    return (
        <Ctx.Provider value={value}>
            <Paper className="p-0" data-cy="table-client-deal">
                <ResultsTableEnhancedToolbar />
                <div className="h-full min-h-[480px] overflow-x-auto px-6 pb-4 pt-0">
                    <table className="table w-full border-collapse border-spacing-0">
                        <ResultsTableHead />
                        <ResultsTableColumnFilters />
                        <ResultsTableBody />
                        <ResultsTableFooter />
                    </table>
                </div>
            </Paper>
        </Ctx.Provider>
    );
}
