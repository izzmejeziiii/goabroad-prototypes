"use client";

/* react-select v5 with its default theme, for src/components/
   SearchBasedDropdown (AsyncSelect: defaultOptions, loadOptions filtering
   the list after `timeout` ms, cacheOptions), ClientDropdown,
   PlacementItemDropdown (isClearable) and SaleType's plain <Select>.
   Default styles: 38px control, 1px #ccc border (#b3b3b3 hover, #2684FF +
   0 0 0 1px ring focused), #808080 placeholder, #333 value, 8px-padded
   #ccc indicators, menu 8px below with the two-layer shadow, options
   8px 12px (#DEEBFF focused, #2684FF selected). Fonts are inherited. */

import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";

export type RSOption = { value: string | number; label: string };

type Props = {
    options: RSOption[];
    value?: RSOption | RSOption[] | null;
    onChange: (option: RSOption | null) => void;
    placeholder?: string;
    isDisabled?: boolean;
    isClearable?: boolean;
    /** Set for AsyncSelect: ms before loadOptions resolves. */
    loadTimeout?: number;
    className?: string;
    style?: CSSProperties;
    dataCy?: string;
};

const DownChevron = () => (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="inline-block fill-current stroke-current stroke-0 leading-none">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </svg>
);

const CrossIcon = () => (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="inline-block fill-current stroke-current stroke-0 leading-none">
        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
    </svg>
);

const matches = (o: RSOption, input: string) =>
    `${o.label} ${o.value}`.toLowerCase().includes(input.trim().toLowerCase());

/** SearchBasedDropdown.getLimit */
const limitOf = (n: number) => (n > 1000 ? 1000 : n);

export const ReactSelect = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
    isDisabled,
    isClearable,
    loadTimeout,
    className,
    style,
    dataCy,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef(0);
    const listId = useId();
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [cache, setCache] = useState<Record<string, RSOption[]>>({});
    const [loading, setLoading] = useState(false);

    const async = loadTimeout !== undefined;
    const selected = Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
    const isSelected = (o: RSOption) => !!selected && String(selected.value) === String(o.value);

    const shown: RSOption[] = async
        ? input
            ? (cache[input] ?? [])
            : options.slice(0, limitOf(options.length))
        : input
          ? options.filter((o) => matches(o, input))
          : options;
    const isLoading = async && !!input && loading && !cache[input];

    const openMenu = () => {
        const idx = shown.findIndex(isSelected);
        setFocusedIndex(idx >= 0 ? idx : 0);
        setOpen(true);
        // Bring the selected option into view, as react-select does.
        requestAnimationFrame(() => {
            const el = menuRef.current?.querySelector<HTMLElement>("[data-focused='true']");
            if (el && menuRef.current) menuRef.current.scrollTop = el.offsetTop - 4;
        });
    };

    const select = (o: RSOption | null) => {
        onChange(o);
        setInput("");
        setOpen(false);
    };

    const onInput = (text: string) => {
        setInput(text);
        setFocusedIndex(0);
        setOpen(true);
        if (async && text && !cache[text]) {
            const id = ++requestRef.current;
            setLoading(true);
            // loadOptions: filter after the timeout (labels only).
            window.setTimeout(() => {
                const result = options
                    .filter((o) => o.label.toLowerCase().includes(text.toLowerCase()))
                    .slice(0, limitOf(options.length));
                setCache((c) => ({ ...c, [text]: result }));
                if (id === requestRef.current) setLoading(false);
            }, loadTimeout);
        }
    };

    const onControlMouseDown = (e: MouseEvent) => {
        if (isDisabled || e.button !== 0) return;
        const target = e.target as HTMLElement;
        if (!focused) {
            inputRef.current?.focus();
            openMenu();
        } else if (!open) {
            openMenu();
        } else if (target.tagName !== "INPUT") {
            setOpen(false);
        }
        if (target.tagName !== "INPUT") e.preventDefault();
    };

    const onIndicatorMouseDown = (e: MouseEvent) => {
        if (isDisabled || e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        if (!focused) inputRef.current?.focus();
        if (open) setOpen(false);
        else openMenu();
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowDown":
            case "ArrowUp": {
                e.preventDefault();
                if (!open) return openMenu();
                if (!shown.length) return;
                const step = e.key === "ArrowDown" ? 1 : -1;
                setFocusedIndex((i) => (i + step + shown.length) % shown.length);
                return;
            }
            case "Enter":
                if (open && shown[focusedIndex]) {
                    e.preventDefault();
                    select(shown[focusedIndex]);
                }
                return;
            case "Tab":
                if (open && shown[focusedIndex]) select(shown[focusedIndex]);
                return;
            case "Escape":
                if (open) {
                    setOpen(false);
                    setInput("");
                }
                return;
            case "Backspace":
                if (!input && isClearable && selected) select(null);
                return;
        }
    };

    const indicator = clsx(
        "flex box-border p-2 transition-colors duration-150",
        isDisabled
            ? "text-[hsl(0,0%,80%)]"
            : focused
              ? "text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,20%)]"
              : "text-[hsl(0,0%,80%)] hover:text-[hsl(0,0%,60%)]",
    );

    return (
        <div
            className={twMerge(clsx("relative box-border", isDisabled && "pointer-events-none", className))}
            style={style}
            data-cy={dataCy}
        >
            <div
                onMouseDown={onControlMouseDown}
                className={clsx(
                    "relative box-border flex min-h-[38px] cursor-default flex-wrap items-center justify-between rounded-[4px] border border-solid outline-0 transition-all duration-100",
                    isDisabled
                        ? "!border-[hsl(0,0%,90%)] bg-[hsl(0,0%,95%)]"
                        : focused
                          ? "!border-[#2684FF] bg-white shadow-[0_0_0_1px_#2684FF] hover:!border-[#2684FF]"
                          : "!border-[hsl(0,0%,80%)] bg-white hover:!border-[hsl(0,0%,70%)]",
                )}
            >
                <div className="relative box-border grid flex-1 flex-wrap items-center overflow-hidden px-2 py-[2px]">
                    {!input && !selected && (
                        <div className="col-start-1 col-end-3 row-start-1 row-end-2 mx-[2px] box-border text-[hsl(0,0%,50%)]">
                            {placeholder}
                        </div>
                    )}
                    {!input && selected && (
                        <div
                            className={clsx(
                                "col-start-1 col-end-3 row-start-1 row-end-2 mx-[2px] box-border max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
                                isDisabled ? "text-[hsl(0,0%,60%)]" : "text-[hsl(0,0%,20%)]",
                            )}
                        >
                            {selected.label}
                        </div>
                    )}
                    <div
                        data-value={input}
                        className="col-start-1 col-end-3 row-start-1 row-end-2 m-[2px] box-border inline-grid grid-cols-[0_min-content] py-[2px] text-[hsl(0,0%,20%)] after:invisible after:col-start-2 after:row-start-1 after:min-w-[2px] after:whitespace-pre after:border-0 after:p-0 after:content-[attr(data-value)_'_']"
                    >
                        <input
                            ref={inputRef}
                            value={input}
                            disabled={isDisabled}
                            autoComplete="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            role="combobox"
                            aria-expanded={open}
                            aria-controls={open ? listId : undefined}
                            aria-autocomplete="list"
                            onChange={(e) => onInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            onFocus={() => setFocused(true)}
                            onBlur={() => {
                                setFocused(false);
                                setOpen(false);
                                setInput("");
                            }}
                            className="col-start-2 row-start-1 m-0 w-full min-w-[2px] border-0 bg-transparent p-0 text-inherit opacity-100 outline-0"
                        />
                    </div>
                </div>
                <div className="box-border flex shrink-0 items-center self-stretch">
                    {isLoading && (
                        <div aria-hidden="true" className="mr-1 flex self-center p-2 text-[4px] leading-none text-[hsl(0,0%,80%)]">
                            {[0, 160, 320].map((delay, i) => (
                                <span
                                    key={delay}
                                    className={clsx("inline-block size-[1em] animate-pulse rounded-full bg-current align-top", i && "ml-[1em]")}
                                    style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }}
                                />
                            ))}
                        </div>
                    )}
                    {isClearable && selected && !isDisabled && (
                        <div
                            aria-hidden="true"
                            onMouseDown={(e) => {
                                if (e.button !== 0) return;
                                e.preventDefault();
                                e.stopPropagation();
                                select(null);
                                inputRef.current?.focus();
                            }}
                            className={indicator}
                        >
                            <CrossIcon />
                        </div>
                    )}
                    <span
                        className={clsx(
                            "my-2 box-border w-px self-stretch",
                            isDisabled ? "bg-[hsl(0,0%,90%)]" : "bg-[hsl(0,0%,80%)]",
                        )}
                    />
                    <div aria-hidden="true" onMouseDown={onIndicatorMouseDown} className={indicator}>
                        <DownChevron />
                    </div>
                </div>
            </div>
            {open && (
                <div
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute top-full z-[1] my-2 box-border w-full rounded-[4px] bg-white shadow-[0_0_0_1px_hsla(0,0%,0%,0.1),0_4px_11px_hsla(0,0%,0%,0.1)]"
                >
                    <div ref={menuRef} id={listId} role="listbox" className="relative box-border max-h-[300px] overflow-y-auto py-1">
                        {isLoading ? (
                            <div className="box-border px-3 py-2 text-center text-[hsl(0,0%,60%)]">Loading...</div>
                        ) : shown.length ? (
                            shown.map((o, i) => {
                                const sel = isSelected(o);
                                const foc = i === focusedIndex;
                                return (
                                    <div
                                        key={`${o.value}-${i}`}
                                        role="option"
                                        aria-selected={sel}
                                        data-focused={foc}
                                        tabIndex={-1}
                                        onMouseMove={() => !foc && setFocusedIndex(i)}
                                        onClick={() => select(o)}
                                        className={clsx(
                                            "box-border block w-full cursor-default select-none px-3 py-2 text-inherit [-webkit-tap-highlight-color:rgba(0,0,0,0)]",
                                            sel
                                                ? "bg-[#2684FF] text-white"
                                                : foc
                                                  ? "bg-[#DEEBFF] active:bg-[#B2D4FF]"
                                                  : "bg-transparent active:bg-[#B2D4FF]",
                                        )}
                                    >
                                        {o.label}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="box-border px-3 py-2 text-center text-[hsl(0,0%,60%)]">No options</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
