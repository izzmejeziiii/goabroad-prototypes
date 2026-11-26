"use client";

import clsx from "clsx";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { SelectOption } from "../types";

/* react-select v5 with its default styles, the way the admin's
   SearchBasedDropdown (src/components/SearchBasedDropdown) and the payment
   drawers use it: 38px control with a 1px #ccc border (#2684FF + 1px ring on
   focus, #f2f2f2 / #e6e6e6 when disabled), "Select..." / "Search..."
   placeholder in #808080, the separator and chevron indicators, grey
   multi-value tags with a red-on-hover remove cross, and the menu 8px under
   the control (1px 10% ring + 0 4px 11px shadow, options 8px 12px, #DEEBFF
   focused, #2684FF selected). The menu sits in the page flow like the real
   one (no portal), so it scrolls with the table it is in. */

/** SearchBasedDropdown's option mapping, quirks included: a falsy value
    (0, "") falls back to the option's index. */
export const toOptions = (
    arrayOptions: Record<string, unknown>[],
    valueKey = "value",
    labelKey = "label",
): SelectOption[] =>
    arrayOptions.slice(0, 1000).map((option, index) => ({
        value: (option[valueKey] as string | number) || index,
        label: (option[labelKey] as string) || `Label ${index}`,
    }));

const Chevron = () => (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="inline-block fill-current stroke-current stroke-0 leading-none">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </svg>
);

const Cross = () => (
    <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="inline-block fill-current stroke-current stroke-0 leading-none">
        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
    </svg>
);

type Props = {
    options: SelectOption[];
    value: SelectOption | SelectOption[] | null | undefined;
    onChange: (value: never) => void;
    isMulti?: boolean;
    isDisabled?: boolean;
    isSearchable?: boolean;
    placeholder?: string;
    /** "search-based": the borderless 32px control of the toolbar search. */
    variant?: "default" | "search-based";
    className?: string;
};

export const ReactSelect = ({
    options,
    value,
    onChange,
    isMulti,
    isDisabled,
    isSearchable = true,
    placeholder = "Select...",
    variant = "default",
    className,
}: Props) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [active, setActive] = useState(0);
    const emit = onChange as (v: unknown) => void;

    const values: SelectOption[] = Array.isArray(value) ? value : value ? [value] : [];
    const single = !isMulti ? values[0] : undefined;
    const chosen = new Set(values.map((v) => String(v.value)));
    const shown = options
        .filter((o) => !isMulti || !chosen.has(String(o.value)))
        .filter((o) => o.label.toLowerCase().includes(input.toLowerCase()));

    useEffect(() => {
        if (!open && !focused) return;
        const away = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
                setFocused(false);
                setInput("");
            }
        };
        document.addEventListener("mousedown", away);
        return () => document.removeEventListener("mousedown", away);
    }, [open, focused]);

    const pick = (option: SelectOption) => {
        if (isMulti) emit([...values, option]);
        else emit(option);
        setInput("");
        setOpen(false);
    };

    const remove = (option: SelectOption) =>
        emit(values.filter((v) => String(v.value) !== String(option.value)));

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) setOpen(true);
            else setActive((i) => Math.min(i + 1, shown.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && open && shown[active]) {
            e.preventDefault();
            pick(shown[active]);
        } else if (e.key === "Escape") {
            setOpen(false);
        } else if (e.key === "Backspace" && !input && isMulti && values.length) {
            remove(values[values.length - 1]);
        }
    };

    const search = variant === "search-based";

    return (
        <div ref={rootRef} className={clsx("relative box-border", className)}>
            <div
                onMouseDown={(e) => {
                    if (isDisabled) return;
                    if (e.target !== inputRef.current) e.preventDefault();
                    inputRef.current?.focus();
                    setOpen((o) => !o || e.target === inputRef.current);
                }}
                className={clsx(
                    "relative box-border flex cursor-default flex-wrap items-center justify-between outline-0 transition-all duration-100",
                    search
                        ? clsx("min-h-8 border-0 bg-transparent px-2", focused && "w-[300px]")
                        : clsx(
                              "min-h-[38px] rounded-[4px] border border-solid",
                              isDisabled
                                  ? "!border-[#e6e6e6] bg-[#f2f2f2]"
                                  : focused
                                    ? "!border-[#2684FF] bg-white shadow-[0_0_0_1px_#2684FF]"
                                    : "!border-[#cccccc] bg-white hover:!border-[#b3b3b3]",
                          ),
                    isDisabled && "pointer-events-none",
                )}
            >
                <div
                    className={clsx(
                        "relative box-border flex-1 items-center overflow-hidden px-2 py-[2px]",
                        isMulti && values.length ? "flex flex-wrap" : "grid",
                    )}
                >
                    {!values.length && !input && (
                        <div className="col-start-1 col-end-3 row-start-1 row-end-2 mx-[2px] text-[#808080]">{placeholder}</div>
                    )}
                    {single && !input && (
                        <div
                            className={clsx(
                                "col-start-1 col-end-3 row-start-1 row-end-2 mx-[2px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
                                isDisabled ? "text-[#999999]" : "text-[#333333]",
                            )}
                        >
                            {single.label}
                        </div>
                    )}
                    {isMulti &&
                        values.map((v) => (
                            <div key={String(v.value)} className="m-[2px] box-border flex min-w-0 rounded-[2px] bg-[#e6e6e6]">
                                <div className="overflow-hidden text-ellipsis whitespace-nowrap rounded-[2px] p-[3px] pl-[6px] text-[85%] text-[#333333]">
                                    {v.label}
                                </div>
                                <div
                                    role="button"
                                    aria-label={`Remove ${v.label}`}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        remove(v);
                                    }}
                                    className="box-border flex items-center rounded-[2px] px-1 hover:bg-[#FFBDAD] hover:text-[#DE350B]"
                                >
                                    <Cross />
                                </div>
                            </div>
                        ))}
                    <div
                        data-value={input}
                        className={clsx(
                            "col-start-1 col-end-3 row-start-1 row-end-2 m-[2px] box-border inline-grid grid-cols-[0_min-content] py-[2px] text-[#333333] after:invisible after:col-start-2 after:row-start-1 after:min-w-[2px] after:whitespace-pre after:content-[attr(data-value)_'_']",
                            !isSearchable && "pointer-events-none",
                        )}
                    >
                        <input
                            ref={inputRef}
                            value={input}
                            readOnly={!isSearchable}
                            disabled={isDisabled}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setActive(0);
                                setOpen(true);
                            }}
                            onFocus={() => setFocused(true)}
                            onBlur={() => {
                                setFocused(false);
                                setOpen(false);
                                setInput("");
                            }}
                            onKeyDown={onKeyDown}
                            className={clsx(
                                "col-start-2 row-start-1 m-0 w-full min-w-[2px] border-0 bg-transparent p-0 font-[inherit] text-inherit opacity-100 outline-0",
                                !isSearchable && "caret-transparent",
                            )}
                            autoComplete="off"
                            spellCheck={false}
                        />
                    </div>
                </div>
                <div className={clsx("box-border flex shrink-0 items-center self-stretch", search && "h-8")}>
                    <span
                        className={clsx(
                            "my-2 box-border w-px self-stretch",
                            isDisabled ? "bg-[#e6e6e6]" : "bg-[#cccccc]",
                        )}
                    />
                    <div
                        aria-hidden="true"
                        className={clsx(
                            "box-border flex p-2 transition-colors duration-150",
                            focused ? "text-[#666666] hover:text-[#333333]" : "text-[#cccccc] hover:text-[#999999]",
                        )}
                    >
                        <Chevron />
                    </div>
                </div>
            </div>
            {open && !isDisabled && (
                <div className="absolute top-full z-[1] my-2 box-border w-full rounded-[4px] bg-white shadow-[0_0_0_1px_hsla(0,0%,0%,0.1),0_4px_11px_hsla(0,0%,0%,0.1)]">
                    <div className="relative box-border max-h-[300px] overflow-y-auto py-1">
                        {shown.length === 0 ? (
                            <div className="box-border px-3 py-2 text-center text-[#999999]">No options</div>
                        ) : (
                            shown.map((o, i) => {
                                const selected = !isMulti && single && String(single.value) === String(o.value);
                                return (
                                    <div
                                        key={String(o.value)}
                                        role="option"
                                        aria-selected={!!selected}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onMouseMove={() => setActive(i)}
                                        onClick={() => pick(o)}
                                        className={clsx(
                                            "box-border block w-full cursor-default select-none px-3 py-2 text-inherit",
                                            selected
                                                ? "bg-[#2684FF] text-white"
                                                : i === active
                                                  ? "bg-[#DEEBFF] active:bg-[#B2D4FF]"
                                                  : "bg-transparent",
                                        )}
                                    >
                                        {o.label}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
