"use client";

import clsx from "clsx";
import { useState } from "react";
import { MdArrowDownward, MdArrowDropDown } from "react-icons/md";
import { Checkbox } from "./primitives/Checkbox";
import { MenuItem, Popover } from "./primitives/Popover";
import { HEAD_CELL, useTable } from "./context";
import type { Column, TableRowData } from "./types";

/* Copy of ResultsTableHead.js: a 42px TableHead (theme) whose first cell
   holds the page select-all checkbox (no right padding) and a bare
   ArrowDropDown opening "Select All Results" / "Select None", then one
   TableSortLabel per column (nowrap; the arrow only on sortable columns,
   up for asc, down for desc), then an empty cell over the row menus. */

const SortLabel = ({ column, onClick }: { column: Column<TableRowData>; onClick: () => void }) => {
    const { name, sort, sortable } = column;
    const active = !!sort;
    return (
        <span
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
            className={clsx(
                "group/sort inline-flex cursor-pointer select-none items-center justify-start whitespace-nowrap outline-0 [flex-direction:inherit]",
                active ? "text-[rgba(0,0,0,0.87)]" : "hover:text-[rgba(0,0,0,0.6)] focus:text-[rgba(0,0,0,0.6)]",
            )}
        >
            {name}
            {(sortable || active) && (
                <MdArrowDownward
                    aria-hidden="true"
                    className={clsx(
                        "mx-1 size-[18px] shrink-0 select-none transition-[opacity,transform] duration-200",
                        active
                            ? "text-[rgba(0,0,0,0.6)] opacity-100"
                            : "opacity-0 group-hover/sort:opacity-50 group-focus/sort:opacity-50",
                        (sort ?? "asc") === "asc" && "rotate-180",
                    )}
                />
            )}
        </span>
    );
};

const ResultsTableHead = () => {
    const { props, state, setState, selectedOnPage } = useTable();
    const { columns = [], selectable = true, isLoadingData, count, onSelectedChange, onColumnHeaderClick } = props;
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    if (!columns.length || isLoadingData) return <thead className="h-[42px]" />;

    const page = props.data ?? [];
    const onPage = selectedOnPage();
    const pageIds = new Set(page.map((r) => r.id));

    const togglePage = (checked: boolean) => {
        if (state.isSelectedAll) {
            const unselected = checked
                ? state.unselected.filter((r) => !pageIds.has(r.id))
                : [...state.unselected, ...page.filter((r) => !state.unselected.some((u) => u.id === r.id))];
            const notUnselectedAll = unselected.length < count;
            setState({ unselected: notUnselectedAll ? unselected : [], isSelectedAll: notUnselectedAll });
        } else {
            const selected = checked
                ? [...state.selected, ...page.filter((r) => !state.selected.some((s) => s.id === r.id))]
                : state.selected.filter((r) => !pageIds.has(r.id));
            onSelectedChange?.(selected);
            setState({ selected });
        }
    };

    const headers = columns.map((column, key) => (
        <th
            key={`accounts-table-header-${key}`}
            aria-sort={column.sort ? (column.sort === "asc" ? "ascending" : "descending") : undefined}
            data-cy={`header-${column.name.replace(/\s+/g, "-")}`}
            className={HEAD_CELL}
        >
            <SortLabel
                column={column}
                onClick={() => column.sortable && onColumnHeaderClick?.(column, key)}
            />
        </th>
    ));

    return (
        <thead className="h-[42px]">
            <tr className="cursor-pointer select-none align-middle text-inherit outline-0">
                {selectable && (
                    <th className={clsx(HEAD_CELL, "w-[60px] min-w-[60px]")}>
                        <div className="flex items-center">
                            <Checkbox
                                className="!pr-0"
                                checked={onPage.length > 0 && onPage.length === page.length}
                                indeterminate={onPage.length > 0 && onPage.length < page.length}
                                onChange={(e) => togglePage(e.target.checked)}
                                inputProps={{ "data-cy": "row-resultstable-select-all" }}
                            />
                            <button
                                type="button"
                                onClick={(e) => setAnchor(e.currentTarget)}
                                className="inline-flex shrink-0 items-center justify-center rounded-full p-0 text-[rgba(0,0,0,0.54)]"
                            >
                                <MdArrowDropDown className="size-6" data-cy="arrow-drop-down" />
                            </button>
                        </div>
                        <Popover anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
                            <MenuItem
                                dense
                                onClick={() => {
                                    setAnchor(null);
                                    setState({ isSelectedAll: true, selected: [], unselected: [] });
                                    onSelectedChange?.([]);
                                }}
                            >
                                Select All Results
                            </MenuItem>
                            <MenuItem
                                dense
                                onClick={() => {
                                    if (state.selected.length) onSelectedChange?.([]);
                                    setAnchor(null);
                                    setState({ isSelectedAll: false, selected: [], unselected: [] });
                                }}
                            >
                                Select None
                            </MenuItem>
                        </Popover>
                    </th>
                )}
                {headers}
                <th className={HEAD_CELL} />
            </tr>
        </thead>
    );
};

export default ResultsTableHead;
