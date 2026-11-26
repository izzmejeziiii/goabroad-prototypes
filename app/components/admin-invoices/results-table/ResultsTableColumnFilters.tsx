"use client";

import clsx from "clsx";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { IconButton, Tooltip } from "../mui";
import { today } from "../format";
import { DateFilter } from "./primitives/DateFilter";
import { TextField } from "./primitives/Input";
import { ReactSelect, toOptions } from "./primitives/ReactSelect";
import { CELL, useTable } from "./context";
import type { ColumnFilter, DateValue, SelectOption } from "./types";

/* Copy of ResultsTableColumnFilters.js: the row under the header that the
   column-filter icon opens. Each filterable column gets its control flush
   left (cells padded 0 16px 0 0): a react-select "Search..." for select
   filters, a standard TextField for text / number ones (Enter applies),
   or the DateFilter. Columns without a filter get an empty 60px cell. The
   last cell holds Apply (check, primary) and Clear (close, pink); Clear
   also closes the row. Typed values live here until applied, as in the
   real component; a value the parent passes back wins. */

const FILTER_CELL = `${CELL} pb-0 pl-0 pr-4 pt-0 text-[0.875rem] [&:last-child]:pr-0`;

type Local = Record<string, unknown>;

const ResultsTableColumnFilters = () => {
    const { props, state, setState } = useTable();
    const { columns = [], selectable = true, isLoadingData, onColumnFiltersApply, onColumnFilterClose } = props;
    const [local, setLocal] = useState<Local>({});

    // componentDidUpdate: a value the parent drops (set -> null) clears what
    // was typed for that column too.
    // (Compared as JSON: the views rebuild these values on every render.)
    const values: Record<string, string> = Object.fromEntries(
        columns.map((c) => [c.key, JSON.stringify(c.filter?.value ?? null)]),
    );
    const [prevValues, setPrevValues] = useState(values);
    if (columns.some((c) => prevValues[c.key] !== values[c.key])) {
        const reset: Local = {};
        columns.forEach(({ key }) => {
            if (prevValues[key] !== "null" && values[key] === "null" && local[key] != null) reset[key] = null;
        });
        setPrevValues(values);
        if (Object.keys(reset).length) setLocal((l) => ({ ...l, ...reset }));
    }

    if (!state.showColumnFilters) return null;

    const call = (filter: ColumnFilter, value: unknown) => (filter.onChange as ((v: unknown) => void) | undefined)?.(value);

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onColumnFiltersApply?.();
    };

    const close = () => {
        setState({ showColumnFilters: false });
        onColumnFilterClose?.();
        setLocal({});
    };

    return (
        <tbody>
            <tr data-cy="column-filters-row" className="results-table-column-filters-row cursor-pointer select-none align-middle">
                {selectable && <td className={clsx(FILTER_CELL, "min-w-[60px] !p-0")} />}
                {columns.map(({ key, filter, type: columnType }, index) => {
                    if (!filter) return <td key={`column-filters-${index}`} className={clsx(FILTER_CELL, "!min-w-[60px]")} />;
                    const type = filter.type ?? columnType;
                    const value = filter.value || local[key];

                    if (type === "select") {
                        const options = toOptions(filter.options ?? [], filter.optionValue || "value", filter.optionKey || "label");
                        return (
                            <td key={`column-filters-${index}`} className={clsx(FILTER_CELL, "min-w-[175px]")}>
                                <ReactSelect
                                    options={options}
                                    value={(value as SelectOption | SelectOption[] | undefined) ?? null}
                                    isMulti={filter.isMultiSelect}
                                    isSearchable={filter.isSearchable ?? true}
                                    isDisabled={filter.isDisabled}
                                    placeholder="Search..."
                                    onChange={((v: unknown) => {
                                        setLocal((l) => ({ ...l, [key]: v }));
                                        call(filter, v);
                                    }) as (v: never) => void}
                                />
                            </td>
                        );
                    }

                    if (type === "text" || type === "number") {
                        return (
                            <td key={`column-filters-${index}`} className={clsx(FILTER_CELL, "relative min-w-[175px]")}>
                                <div>
                                    <TextField
                                        fullWidth
                                        type={type}
                                        value={(value as string) || ""}
                                        onKeyDown={onEnter}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setLocal((l) => ({ ...l, [key]: e.target.value }));
                                            call(filter, e);
                                        }}
                                        id="text-column-filter"
                                    />
                                </div>
                            </td>
                        );
                    }

                    if (type === "date") {
                        return (
                            <td key={`column-filters-${index}`} className={clsx(FILTER_CELL, "min-w-[175px]")}>
                                <DateFilter
                                    value={value as DateValue | undefined}
                                    today={today()}
                                    onChange={(v) => {
                                        setLocal((l) => ({ ...l, [key]: v }));
                                        call(filter, v);
                                    }}
                                />
                            </td>
                        );
                    }

                    return <td key={`column-filters-${index}`} className={clsx(FILTER_CELL, "!min-w-[60px]")} />;
                })}
                <td className={clsx(FILTER_CELL, "min-w-[136px]")}>
                    <div className="flex">
                        <Tooltip title="Apply Column Filters" placement="top">
                            <IconButton
                                data-cy="apply-filter"
                                onClick={() => onColumnFiltersApply?.()}
                                className="!text-[#03a9f4] hover:!bg-[rgba(3,169,244,0.04)]"
                            >
                                <MdCheck className="size-6" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Clear Column Filters" placement="top">
                            <IconButton
                                data-cy="clear-filter"
                                onClick={close}
                                disabled={isLoadingData}
                                className="!text-[#e91e63] hover:!bg-[rgba(233,30,99,0.04)]"
                            >
                                <MdClose className="size-6" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default ResultsTableColumnFilters;
