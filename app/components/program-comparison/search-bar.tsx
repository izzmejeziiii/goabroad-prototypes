"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoAddCircle, IoClose } from "react-icons/io5";
import SearchDropdown from "./search-dropdown";
import type { Option, SearchFilter } from "./types";

const defaultText = "Filter Programs";

function scrollToElement(id: string, offset = 0) {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
}

interface FilterFieldProps {
    fieldName: string;
    label: string;
    options: Option[];
    value: Option | null;
    isEnabled: boolean;
    onEnable: () => void;
    onChange: (value: Option | null) => void;
}

/**
 * Each criterion starts as a dashed "Add … Filter" button and swaps to the
 * combobox once tapped — the production directory's progressive filter reveal.
 */
function FilterField({
    fieldName,
    label,
    options,
    value,
    isEnabled,
    onEnable,
    onChange,
}: FilterFieldProps) {
    return (
        <>
            <button
                className={clsx(
                    "focus:ring-primary-100 h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed bg-white text-sm font-bold text-neutral-600 hover:bg-gray-100 focus:outline-none focus:ring-3",
                    {
                        "hidden!": isEnabled,
                        flex: !isEnabled,
                    },
                )}
                onClick={onEnable}
            >
                <IoAddCircle className="text-lg text-green-500" />
                Add {fieldName} Filter
            </button>
            <SearchDropdown
                placeholder={label}
                options={options}
                value={value}
                onChange={onChange}
                customClass={clsx("col-span-1! w-full!", {
                    "hidden!": !isEnabled,
                })}
            />
        </>
    );
}

interface SearchBarProps {
    searchFilters: SearchFilter[];
    /** The directory page hides the results-jump prompt and the advanced filters. */
    isDirectory?: boolean;
    /** Where "See Programs" sends visitors once a filter is picked. */
    resultsHref?: string;
    /** Search results pass their filter rail in for the mobile filter sheet. */
    advancedFilters?: React.ReactNode;
    advancedFilterCount?: number;
}

export default function SearchBar({
    searchFilters,
    isDirectory = false,
    resultsHref,
    advancedFilters,
    advancedFilterCount = 0,
}: SearchBarProps) {
    const router = useRouter();
    const [scrollY, setScrollY] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [enabledFilters, setEnabledFilters] = useState<Record<string, boolean>>(
        {},
    );
    const [filterValues, setFilterValues] = useState<
        Record<string, Option | null>
    >({});
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = showFilter ? "hidden" : "auto";
    }, [showFilter]);

    const sticky = scrollY > 550;
    const hasNewFilters = Object.values(filterValues).some(Boolean);

    const handleSubmitFilter = () => {
        setShowFilter(false);
        // Production runs a real search here. Pages that have a results page to
        // hand off to (the directory) always go there, filters picked or not;
        // the results page itself just jumps down to the listings.
        if (resultsHref) {
            router.push(resultsHref);
            return;
        }
        scrollToElement("programs", 170);
    };

    const fields = searchFilters.map((filter) => (
        <FilterField
            key={`filter-${filter.filter}`}
            fieldName={filter.fieldName}
            label={filter.label}
            options={filter.options}
            value={filterValues[filter.filter] ?? null}
            isEnabled={!!enabledFilters[filter.filter]}
            onEnable={() =>
                setEnabledFilters((prev) => ({ ...prev, [filter.filter]: true }))
            }
            onChange={(value) =>
                setFilterValues((prev) => ({ ...prev, [filter.filter]: value }))
            }
        />
    ));

    return (
        <>
            <span id="search" />
            <div className={clsx("flex w-full justify-center")}>
                <div className="z-outerverse flex w-full max-w-7xl">
                    <div className="flex w-full max-w-[1024] flex-col justify-start px-4 xl:max-w-full xl:px-0">
                        <div className="z-sky flex w-auto flex-col rounded-xl bg-slate-50 px-4 py-4 text-neutral-500 shadow-md">
                            <div className="flex flex-col gap-3 md:gap-4 lg:flex-row">
                                {fields}
                                <button
                                    className="bg-cobalt-500 focus:ring-primary-200 hover:bg-cobalt-600 focus:bg-cobalt-600 disabled:bg-cobalt-200 disabled:hover:bg-cobalt-200 flex h-10 w-full shrink-0 items-center justify-center rounded-md px-5 text-center align-middle text-white focus:outline-none focus:ring-4 disabled:cursor-not-allowed lg:max-w-[250px] xl:w-[300px] xl:max-w-full"
                                    onClick={handleSubmitFilter}
                                >
                                    {hasNewFilters ? defaultText : "See Programs"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FLOATING MOBILE FILTER */}
                <div
                    className={clsx(
                        "z-ultraverse-3 fixed left-0 top-0 h-screen w-screen transform bg-slate-900/40 pb-[70px] pt-4 transition-transform duration-300 ease-in-out xl:hidden",
                        {
                            block: showFilter,
                            hidden: !showFilter,
                        },
                    )}
                >
                    <div
                        className={clsx(
                            "fixed left-0 top-0 h-screen w-screen bg-slate-900 transition-opacity ease-in-out",
                            {
                                "opacity-0": !showFilter,
                                "opacity-50": showFilter,
                            },
                        )}
                        onClick={() => setShowFilter(false)}
                    />
                    <div
                        className={clsx(
                            "absolute top-0 flex w-full flex-col overflow-y-auto bg-slate-700 pt-6 transition-transform duration-300 ease-in-out",
                            showAdvancedFilters ? "h-full pb-24" : "h-1/2 max-h-[260px]",
                            {
                                "translate-y-0": showFilter,
                                "-translate-y-[400px]": !showFilter,
                            },
                        )}
                    >
                        <div className="flex w-full flex-col gap-2 bg-slate-700 p-4 text-neutral-500 lg:grid lg:grid-cols-4 lg:gap-4">
                            {fields}
                            <button
                                className="bg-cobalt-500 hover:bg-cobalt-600 focus:ring-primary-200 disabled:bg-cobalt-200 h-10 shrink-0 rounded-md px-5 text-white focus:outline-none focus:ring-4 disabled:cursor-not-allowed"
                                onClick={handleSubmitFilter}
                            >
                                {hasNewFilters ? defaultText : "See Programs"}
                            </button>
                            {/* Advanced Filters Toggle Button */}
                            {!isDirectory && !!advancedFilters && (
                                <div className="mx-auto flex w-fit items-center justify-between gap-1 lg:col-span-4">
                                    <button
                                        className="flex w-full items-center justify-center gap-2 py-3 text-sm font-medium text-white underline decoration-dotted underline-offset-4 transition-colors duration-200 hover:text-gray-200 lg:col-span-4"
                                        onClick={() =>
                                            setShowAdvancedFilters(!showAdvancedFilters)
                                        }
                                    >
                                        <HiAdjustmentsHorizontal className="text-base" />
                                        {showAdvancedFilters ? "Hide" : "Show"} Advanced
                                        Filters
                                    </button>
                                    {!!advancedFilterCount && (
                                        <span className="text-sm text-white">
                                            ({advancedFilterCount})
                                        </span>
                                    )}
                                </div>
                            )}
                            {showAdvancedFilters && !isDirectory && advancedFilters}
                        </div>
                    </div>
                </div>

                <div
                    className={clsx(
                        "z-ultraverse-4 compare-shift fixed bottom-4 left-0 right-0 mx-auto flex w-fit transform items-center justify-center transition-transform duration-300 ease-in-out",
                        {
                            "translate-y-0": sticky,
                            "translate-y-[200px]": !sticky,
                        },
                    )}
                >
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex h-10 items-center gap-4 rounded-full border bg-white px-6 text-sm font-bold text-slate-700 shadow-md transition duration-300 ease-in-out xl:hidden"
                    >
                        <span className="uppercase">
                            {showFilter ? "Close" : "Filters"}
                        </span>
                        {!showFilter && (
                            <HiAdjustmentsHorizontal className="text-base" />
                        )}
                        {showFilter && <IoClose className="text-base" />}
                    </button>
                    {!!advancedFilterCount && !showFilter && (
                        <span className="min-w-5 absolute -right-1 -top-2 flex h-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white xl:hidden">
                            {advancedFilterCount}
                        </span>
                    )}
                </div>
            </div>
            <button
                onClick={() => scrollToElement("programs", 170)}
                className={clsx(
                    "group mt-8 animate-bounce cursor-pointer text-center text-white/80 transition-colors duration-200 hover:text-white",
                    { hidden: isDirectory },
                )}
            >
                <p className="mb-1 text-base group-hover:underline">
                    Click here to see results
                </p>
                <div className="text-2xl transition-transform duration-200 group-hover:scale-110">
                    ↓
                </div>
            </button>
        </>
    );
}
