"use client";

import { Fragment, useState } from "react";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Switch,
} from "@headlessui/react";
import clsx from "clsx";
import { FaChevronRight } from "react-icons/fa";
import RatingRangeSlider from "./rating-range-slider";
import { advancedFilters } from "./search-results-data";
import type { FilterOption } from "./types";

/** Labels come from the production FilterCriteriaName enum, typos included. */
const FilterCriteriaName = {
    AGE_REQUIREMENT: "Age Requirement",
    NATIONALITES: "Nationalities",
    TYPES_OF_PARTICIPANTS: "Types of Participants",
    ACCEPTED_EDUCATION_LEVELS: "Accepted Education Levels",
    ACCOMODATION_OPTIONS: "Accomodations Options",
    LANGUAGE_SKILL_REQUIRED: "Language Skill Required",
    APPLICATION_PROCEDURES: "Application Procedures",
    VERIFICATION_LEVEL: "Verification Level",
    REVIEWS: "Reviews Rating",
    CREDIT_AVAILABLE: "Credit Available",
    PROGRAM_COST_INCLUDES: "Program Cost Includes",
};

type Selection = Record<string, (string | number)[]>;

interface FilterProps {
    name: string;
    type: "checkbox" | "radio";
    options: FilterOption[];
    selection: Selection;
    isMobile?: boolean;
    withFilter?: boolean;
    withSelectAll?: boolean;
    onToggle: (option: FilterOption, checked: boolean) => void;
    onRadio: (option: FilterOption) => void;
    onSelectAll: (options: FilterOption[]) => void;
    onClear: (filterKey: string) => void;
}

function Filter({
    name,
    type,
    options,
    selection,
    isMobile = false,
    withFilter = false,
    withSelectAll = false,
    onToggle,
    onRadio,
    onSelectAll,
    onClear,
}: FilterProps) {
    const [textFilter, setTextFilter] = useState("");
    const isWithSelectAll = withSelectAll && type === "checkbox";
    const filterKey = options.length ? options[0].filterKey : "";
    const selected = selection[filterKey] ?? [];
    // Participant options each carry their own key, so count them together.
    const participantKeys = options.map((option) => option.filterKey);
    const filterCount =
        type === "radio"
            ? participantKeys.filter((key) => (selection[key] ?? []).length).length
            : selected.length;
    const idPrefix = isMobile ? "mfilter" : "filter";

    return (
        <Disclosure>
            {({ open }) => (
                <div
                    className={clsx(
                        "flex flex-col gap-2 pb-4",
                        isMobile ? "mb-3 border-b border-slate-600 pb-3" : "border-b",
                    )}
                >
                    <DisclosureButton
                        className={clsx(
                            "flex justify-between text-left text-sm font-semibold",
                            isMobile && "text-white",
                        )}
                    >
                        <h3 className="flex items-center justify-between gap-2">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1">
                            {!!filterCount && (
                                <span
                                    className={clsx(
                                        "text-sm",
                                        isMobile ? "text-slate-300" : "text-slate-500",
                                    )}
                                >
                                    ({filterCount})
                                </span>
                            )}
                            <FaChevronRight
                                className={`${
                                    open ? "-rotate-90!" : ""
                                } inline rotate-90 text-xs ${
                                    isMobile ? "text-slate-300" : "text-neutral-500"
                                }`}
                            />
                        </div>
                    </DisclosureButton>
                    <DisclosurePanel className="text-sm">
                        <div
                            className={clsx(
                                "flex flex-col gap-1.5 text-xs",
                                isMobile ? "text-slate-300" : "text-neutral-500",
                            )}
                        >
                            {type === "checkbox" && (
                                <div
                                    className={clsx(
                                        "flex flex-col gap-2 overflow-y-auto rounded-md",
                                        isMobile
                                            ? "max-h-[200px] border border-slate-600 bg-slate-600 p-3"
                                            : "max-h-[250px] border p-4",
                                    )}
                                >
                                    {withFilter && (
                                        <input
                                            placeholder="Search"
                                            className={clsx(
                                                "rounded-sm p-1 text-sm",
                                                isMobile && "text-slate-600",
                                            )}
                                            type="text"
                                            onChange={(e) => setTextFilter(e.target.value)}
                                            value={textFilter}
                                        />
                                    )}
                                    {options
                                        .filter((option) =>
                                            String(option.label)
                                                .toLowerCase()
                                                .includes(textFilter.toLowerCase()),
                                        )
                                        .map((option, index) => (
                                            <span
                                                key={index}
                                                className={clsx(
                                                    "flex items-center gap-2",
                                                    isMobile && "text-white",
                                                )}
                                            >
                                                <input
                                                    id={`${idPrefix}-${option.filterKey}-${option.value}`}
                                                    type="checkbox"
                                                    className="rounded! focus:ring-3 h-4 w-4 cursor-pointer border border-solid border-gray-500 text-blue-600 checked:border-transparent focus:ring-blue-300 focus:ring-offset-0 disabled:cursor-not-allowed"
                                                    checked={selected.includes(option.value)}
                                                    onChange={(e) =>
                                                        onToggle(option, e.target.checked)
                                                    }
                                                />
                                                <label
                                                    htmlFor={`${idPrefix}-${option.filterKey}-${option.value}`}
                                                    className={clsx(!isMobile && "cursor-pointer")}
                                                >
                                                    {option.label}
                                                </label>
                                            </span>
                                        ))}
                                </div>
                            )}
                            {type === "radio" &&
                                options.map((option, index) => (
                                    <span
                                        key={index}
                                        className={clsx(
                                            "flex items-center gap-2",
                                            isMobile && "text-white",
                                        )}
                                    >
                                        <input
                                            id={`${idPrefix}-${option.filterKey}-${option.value}`}
                                            name={
                                                option.filterKey.includes("is_open")
                                                    ? "is_open"
                                                    : `${idPrefix}-${option.filterKey}`
                                            }
                                            type="radio"
                                            className="focus:ring-3 m-0 h-4 w-4 cursor-pointer border border-solid border-gray-300 text-blue-600 focus:ring-blue-300 focus:ring-offset-0"
                                            value={option.value}
                                            checked={(selection[option.filterKey] ?? []).includes(
                                                option.value,
                                            )}
                                            onChange={() => onRadio(option)}
                                        />
                                        <label
                                            htmlFor={`${idPrefix}-${option.filterKey}-${option.value}`}
                                            className={clsx(!isMobile && "cursor-pointer")}
                                        >
                                            {option.label}
                                        </label>
                                    </span>
                                ))}
                            <div
                                className={clsx("flex", {
                                    "justify-between": isWithSelectAll,
                                    "justify-end": !isWithSelectAll,
                                })}
                            >
                                {isWithSelectAll && (
                                    <button
                                        className={clsx(
                                            "w-max px-1 text-xs underline",
                                            isMobile
                                                ? "text-white"
                                                : "text-slate-500 hover:text-slate-700",
                                        )}
                                        onClick={() => {
                                            if (filterCount >= options.length) {
                                                onClear(filterKey);
                                                return;
                                            }
                                            onSelectAll(options);
                                        }}
                                    >
                                        {filterCount === options.length
                                            ? "Unselect all"
                                            : "Select all"}
                                    </button>
                                )}
                                <button
                                    className={clsx(
                                        "w-max px-1 text-xs underline",
                                        isMobile
                                            ? "ml-auto text-white"
                                            : "text-slate-500 hover:text-slate-700",
                                    )}
                                    onClick={() => {
                                        if (type === "radio") {
                                            participantKeys.forEach((key) => onClear(key));
                                            return;
                                        }
                                        onClear(filterKey);
                                    }}
                                >
                                    Clear filter
                                </button>
                            </div>
                        </div>
                    </DisclosurePanel>
                </div>
            )}
        </Disclosure>
    );
}

function RatingSlider({
    range,
    onRatingChange,
    onReset,
    isMobile = false,
}: {
    range: [number, number];
    onRatingChange: (range: [number, number]) => void;
    onReset: () => void;
    isMobile?: boolean;
}) {
    const [a, b] = range;
    const isDefaultValue = a === 0 && b === 5;

    return (
        <Disclosure>
            {({ open }) => (
                <div
                    className={clsx(
                        "flex flex-col gap-2 pb-4",
                        isMobile ? "mb-3 border-b border-slate-600 pb-3" : "border-b",
                    )}
                >
                    <DisclosureButton
                        className={clsx(
                            "flex justify-between text-left text-sm font-semibold",
                            isMobile && "text-white",
                        )}
                    >
                        <h3>{FilterCriteriaName.REVIEWS}</h3>
                        <div
                            className={clsx(
                                "flex items-center gap-1 text-sm",
                                isMobile ? "text-slate-300" : "text-slate-500",
                            )}
                        >
                            {!isDefaultValue && `(${a}-${b})`}
                            <FaChevronRight
                                className={`${
                                    open ? "-rotate-90!" : ""
                                } inline rotate-90 text-xs ${
                                    isMobile ? "text-neutral-300" : "text-neutral-500"
                                }`}
                            />
                        </div>
                    </DisclosureButton>
                    <DisclosurePanel className="flex flex-col gap-2 text-sm">
                        <div className="flex flex-col gap-1.5 text-xs text-neutral-500">
                            <div className="flex flex-col rounded-md border px-4">
                                <div className="relative">
                                    <RatingRangeSlider
                                        min={0}
                                        max={5}
                                        initialMin={a}
                                        initialMax={b}
                                        onChange={(min, max) => onRatingChange([min, max])}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className={clsx(
                                "ml-auto w-max px-1 text-xs underline",
                                isMobile
                                    ? "text-white"
                                    : "text-slate-500 hover:text-slate-700",
                            )}
                            onClick={onReset}
                        >
                            Reset
                        </button>
                    </DisclosurePanel>
                </div>
            )}
        </Disclosure>
    );
}

export function useFilterSelection() {
    const [selection, setSelection] = useState<Selection>({});
    const [rating, setRating] = useState<[number, number]>([0, 5]);

    const toggle = (option: FilterOption, checked: boolean) =>
        setSelection((prev) => {
            const current = prev[option.filterKey] ?? [];
            return {
                ...prev,
                [option.filterKey]: checked
                    ? [...current, option.value]
                    : current.filter((value) => value !== option.value),
            };
        });

    const radio = (option: FilterOption) =>
        setSelection((prev) => {
            // Participant options are mutually exclusive across their own keys.
            const isParticipant = option.filterKey.includes("is_open");
            const next = isParticipant
                ? Object.fromEntries(
                      Object.entries(prev).filter(([key]) => !key.includes("is_open")),
                  )
                : prev;
            return { ...next, [option.filterKey]: [option.value] };
        });

    const selectAll = (options: FilterOption[]) =>
        setSelection((prev) => ({
            ...prev,
            [options[0].filterKey]: options.map((option) => option.value),
        }));

    const clear = (filterKey: string) =>
        setSelection((prev) => ({ ...prev, [filterKey]: [] }));

    const clearAll = () => {
        setSelection({});
        setRating([0, 5]);
    };

    const totalCount =
        Object.values(selection).reduce((count, values) => count + values.length, 0) +
        (rating[0] === 0 && rating[1] === 5 ? 0 : 1);

    return { selection, rating, setRating, toggle, radio, selectAll, clear, clearAll, totalCount };
}

export type FilterSelection = ReturnType<typeof useFilterSelection>;

export function FilterGroups({
    state,
    isMobile = false,
}: {
    state: FilterSelection;
    isMobile?: boolean;
}) {
    const shared = {
        selection: state.selection,
        isMobile,
        onToggle: state.toggle,
        onRadio: state.radio,
        onSelectAll: state.selectAll,
        onClear: state.clear,
    };

    return (
        <>
            <Filter
                name={FilterCriteriaName.AGE_REQUIREMENT}
                options={advancedFilters.ageRanges}
                type="checkbox"
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.NATIONALITES}
                options={advancedFilters.countries}
                type="checkbox"
                withFilter
                withSelectAll
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.TYPES_OF_PARTICIPANTS}
                options={advancedFilters.participants}
                type="radio"
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.ACCEPTED_EDUCATION_LEVELS}
                options={advancedFilters.educationStatus}
                type="checkbox"
                withSelectAll
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.ACCOMODATION_OPTIONS}
                options={advancedFilters.accomodations}
                type="checkbox"
                withSelectAll
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.LANGUAGE_SKILL_REQUIRED}
                options={advancedFilters.languages}
                type="checkbox"
                withFilter
                withSelectAll
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.APPLICATION_PROCEDURES}
                options={advancedFilters.programApplications}
                type="checkbox"
                withSelectAll
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.VERIFICATION_LEVEL}
                options={advancedFilters.verificationStatus}
                type="radio"
                {...shared}
            />
            <RatingSlider
                range={state.rating}
                onRatingChange={state.setRating}
                onReset={() => state.setRating([0, 5])}
                isMobile={isMobile}
            />
            {/* Study abroad is a credit-bearing directory */}
            <Filter
                name={FilterCriteriaName.CREDIT_AVAILABLE}
                options={advancedFilters.creditEligibility}
                type="radio"
                {...shared}
            />
            <Filter
                name={FilterCriteriaName.PROGRAM_COST_INCLUDES}
                options={advancedFilters.programCostIncludes}
                type="checkbox"
                withSelectAll
                {...shared}
            />
        </>
    );
}

/**
 * Desktop filter rail. Filtering hits the API on production; here the button
 * simply drops the visitor back at the results.
 */
export default function DesktopAdvancedFilters({
    state,
    onApply,
    footer,
}: {
    state: FilterSelection;
    onApply: () => void;
    /** Rendered at the foot of the rail — the search results' compare panel. */
    footer?: React.ReactNode;
}) {
    const [enabled, setEnabled] = useState(true);

    return (
        <div className="relative hidden w-full max-w-[250px] shrink-0 flex-col items-start gap-4 xl:flex">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
                Filter Results
            </h2>
            <div className="flex items-center gap-2">
                <span className="text-sm">Show / Hide Filters</span>
                <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
                    {({ checked }) => (
                        <button
                            className={clsx(
                                "group inline-flex h-5 w-8 items-center rounded-full",
                                checked ? "bg-slate-900" : "bg-slate-400",
                                !checked && "opacity-50",
                            )}
                        >
                            <span className="sr-only">Show Filters</span>
                            <span
                                className={clsx(
                                    "size-3 rounded-full bg-white transition",
                                    checked ? "translate-x-4" : "translate-x-1",
                                )}
                            />
                        </button>
                    )}
                </Switch>
            </div>
            <div
                className={clsx(
                    "flex w-full flex-col gap-4 border-t pt-4",
                    !enabled && "hidden",
                )}
            >
                <FilterGroups state={state} />
                <div className="mt-4 grid w-full grid-cols-2 gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onApply();
                        }}
                        className="bg-roman-500 flex h-10 w-full items-center justify-center rounded-md text-xs font-bold text-white"
                    >
                        Filter Results
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            state.clearAll();
                        }}
                        className="flex h-10 w-full items-center justify-center text-xs font-bold text-neutral-700 underline"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>
            {footer}
        </div>
    );
}
