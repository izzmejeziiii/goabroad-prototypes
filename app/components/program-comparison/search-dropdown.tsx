"use client";

import { useMemo, useState } from "react";
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import type { Option } from "./types";

const normalizeText = (value: unknown) =>
    (value ?? "").toString().toLowerCase().replace(/\s+/g, "");

interface SearchDropdownProps {
    placeholder?: string;
    options: Option[];
    value?: Option | null;
    onChange: (value: Option | null) => void;
    customClass?: string;
}

/**
 * The directory's filter combobox — searchable input, clear affordance, and a
 * caret that swaps out for the clear button once a value is selected.
 */
export default function SearchDropdown({
    placeholder,
    options,
    value,
    onChange,
    customClass,
}: SearchDropdownProps) {
    const [query, setQuery] = useState("");
    const normalizedQuery = normalizeText(query);
    const hasQuery = normalizedQuery.length > 0;
    const maxFilteredResults = 20;

    const filteredOptions = useMemo(() => {
        if (!hasQuery) return options;
        const results: Option[] = [];
        for (const option of options) {
            if (normalizeText(option.label).includes(normalizedQuery)) {
                results.push(option);
                if (results.length >= maxFilteredResults) return results;
            }
        }
        return results;
    }, [hasQuery, normalizedQuery, options]);

    // With a value selected the input turns into a read-only chip: production
    // hides the caret and shows only the clear button.
    const hideCaretDown = !!value;

    return (
        <div className={clsx("col-span-1", customClass)}>
            <Combobox
                value={value ?? null}
                onChange={(next: Option | null) => {
                    onChange(next);
                    setQuery("");
                }}
                as="div"
                className="relative w-full xl:max-w-full"
                immediate
            >
                <ComboboxInput
                    autoComplete="off"
                    className="focus:ring-3 col-span-1! block h-10 w-full truncate rounded-md border border-solid border-gray-300 bg-white px-3 py-1.5 pr-12 text-sm text-gray-700 shadow-sm outline-none placeholder:font-light placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100 lg:py-2"
                    displayValue={(option: Option) => option?.label ?? query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                    readOnly={hideCaretDown}
                />
                <div className="absolute bottom-0 right-0 top-0 flex items-center pr-2.5">
                    {!!value && (
                        <button
                            aria-label="Clear selection"
                            className="cursor-pointer"
                            onClick={() => onChange(null)}
                        >
                            <IoIosCloseCircle
                                size={20}
                                className="text-roman-500!"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                    {!hideCaretDown && (
                        <ComboboxButton
                            className="flex h-5 w-5 items-center border-none bg-transparent"
                            aria-label="Select dropdown"
                        >
                            <span className="h-5 w-5 cursor-pointer">
                                <HiChevronDown
                                    className="h-5 w-5 text-slate-600"
                                    aria-hidden="true"
                                />
                            </span>
                        </ComboboxButton>
                    )}
                </div>
                {!hideCaretDown && (
                    <ComboboxOptions
                        className="z-sky absolute m-0 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                        modal={false}
                    >
                        {hasQuery && !filteredOptions.length && (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        )}
                        {filteredOptions.map((option) => (
                            <ComboboxOption
                                key={`option-${option.value}`}
                                className={({ active, selected }) =>
                                    `relative cursor-pointer select-none list-none py-2 pl-4 pr-0 text-gray-800! ${
                                        active || selected
                                            ? "bg-blue-200 text-gray-900"
                                            : "text-gray-700"
                                    }`
                                }
                                value={option}
                                as={"li"}
                            >
                                {({ selected }) => (
                                    <span
                                        className={`block truncate ${
                                            selected ? "font-semibold" : "font-normal"
                                        }`}
                                    >
                                        {option.label}
                                    </span>
                                )}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </Combobox>
        </div>
    );
}
