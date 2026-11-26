"use client";

import { useState } from "react";
import { ReactSelect, toOptions } from "./primitives/ReactSelect";
import { Select } from "./primitives/Select";
import type { SearchFilterOption, SelectOption } from "./types";

/* Copy of ResultsTableSearchFilter.js: a borderless standard Select
   ("Select Filter" in italics until a filter is picked) boxed in #ddd with
   its right edge open, beside a #ddd box holding either a plain "Search..."
   input (Enter searches) or, for filters with hasAutoSuggest, the
   borderless 32px SearchBasedDropdown (picking an option searches). */

const ResultsTableSearchFilter = ({
    searchFilterOptions,
    onSearchFilterChange,
    isLoadingData,
}: {
    searchFilterOptions: SearchFilterOption[];
    onSearchFilterChange?: (search: { filter: string; value: string | number }) => void;
    isLoadingData?: boolean;
}) => {
    const [filter, setFilter] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [selected, setSelected] = useState<SelectOption | null>(null);

    // renderOption skips anything that isn't an object, so a list of plain
    // strings shows only "Select Filter".
    const options = searchFilterOptions.filter(
        (o): o is Exclude<SearchFilterOption, string> => typeof o === "object",
    );
    const current = options.find((o) => o.key === filter);

    const search = (v: string | number) => {
        if (filter !== "") onSearchFilterChange?.({ filter, value: v });
    };

    return (
        <div>
            <div className="relative m-0 inline-flex min-w-0 flex-col rounded-l-[4px] border border-r-0 border-solid !border-[#ddd] p-0 align-top">
                <Select
                    value={filter}
                    displayEmpty
                    disableUnderline
                    emptyLabel={<em>Select Filter</em>}
                    disabled={isLoadingData}
                    rootClassName="!flex min-w-[200px] items-center"
                    style={{ paddingLeft: 15 }}
                    items={[
                        { value: "", label: <em>Select Filter</em> },
                        ...options.map((o, i) => ({
                            value: o.key ?? String(i),
                            label: o.name ?? `Option ${i + 1}`,
                            disabled: o.disabled,
                        })),
                    ]}
                    onChange={(v) => {
                        setFilter(v);
                        setValue("");
                        setSelected(null);
                    }}
                />
            </div>
            {current?.hasAutoSuggest ? (
                <div className="relative m-0 inline-flex min-w-[200px] max-w-[530px] flex-col rounded-r-[4px] border border-solid !border-[#ddd] p-0 align-top">
                    <ReactSelect
                        variant="search-based"
                        className="h-8 min-w-[200px]"
                        isDisabled={isLoadingData || !filter}
                        placeholder={isLoadingData ? "Loading ..." : "Search..."}
                        options={toOptions(
                            current.dropdownOptions?.arrayOptions ?? [],
                            current.dropdownOptions?.valueKey,
                            current.dropdownOptions?.labelKey,
                        )}
                        value={selected}
                        onChange={((option: SelectOption) => {
                            setSelected(option);
                            setValue(String(option.value));
                            search(option.value);
                        }) as (v: never) => void}
                    />
                </div>
            ) : (
                <div className="relative m-0 inline-flex min-w-[200px] max-w-[530px] flex-col rounded-r-[4px] border border-solid !border-[#ddd] p-0 align-top">
                    <div className="relative box-border inline-flex cursor-text items-center text-[1rem] leading-[1.4375em] tracking-[0.00938em] text-[rgba(0,0,0,0.87)]">
                        <input
                            disabled={isLoadingData || !filter}
                            placeholder={isLoadingData ? "Loading ..." : "Search..."}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") search(value);
                            }}
                            className="m-0 box-content block h-[1.4375em] w-full min-w-0 border-0 bg-transparent pb-[5px] pl-4 pr-2 pt-1 font-[inherit] tracking-[inherit] text-current outline-0 transition-[width] duration-200 placeholder:text-current placeholder:opacity-[0.42] disabled:text-[rgba(0,0,0,0.38)] sm:min-w-[100px] sm:focus:w-[250px]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsTableSearchFilter;
