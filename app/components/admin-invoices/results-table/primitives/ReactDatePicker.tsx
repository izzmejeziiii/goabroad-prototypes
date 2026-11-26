"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

/* react-datepicker v7 with its stock stylesheet (react-datepicker.css), as
   DateFilter and PaymentDrawer use it: a text input showing MM/dd/yyyy and,
   under it, the calendar: Helvetica Neue .8rem, #aeaeae border, the #f0f0f0
   header with the bold month, the month / year read-view dropdowns
   (showMonthDropdown / showYearDropdown), 1.7rem days, #216ba5 selected,
   bold today, #ccc disabled days and chevron arrows. */

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const pad = (n: number) => String(n).padStart(2, "0");
export const formatMDY = (d: Date) => `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const parseMDY = (s: string) => {
    const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s.trim());
    if (!m) return null;
    const d = new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
    return isNaN(d.getTime()) ? null : d;
};

/** Chevron drawn with two borders, like .react-datepicker__navigation-icon::before. */
const ARROW = "absolute block h-[9px] w-[9px] border-solid !border-[#ccc] [border-width:3px_3px_0_0]";

export const ReactDatePicker = ({
    selected,
    onChange,
    minDate,
    maxDate,
    showMonthDropdown,
    showYearDropdown,
    disabled,
    className,
    today = new Date(),
}: {
    selected: Date;
    onChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    showMonthDropdown?: boolean;
    showYearDropdown?: boolean;
    disabled?: boolean;
    className?: string;
    /** The day drawn bold. */
    today?: Date;
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1));
    const [text, setText] = useState<string | null>(null);
    const [dropdown, setDropdown] = useState<"month" | "year" | null>(null);

    useEffect(() => {
        if (!open) return;
        const away = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
                setDropdown(null);
            }
        };
        document.addEventListener("mousedown", away);
        return () => document.removeEventListener("mousedown", away);
    }, [open]);

    const openCalendar = () => {
        if (disabled) return;
        setView(new Date(selected.getFullYear(), selected.getMonth(), 1));
        setOpen(true);
    };

    const isDisabled = (d: Date) =>
        (!!minDate && startOfDay(d) < startOfDay(minDate)) || (!!maxDate && startOfDay(d) > startOfDay(maxDate));

    const choose = (d: Date) => {
        if (isDisabled(d)) return;
        onChange(d);
        setText(null);
        setOpen(false);
        setDropdown(null);
    };

    // Six-ish weeks starting on the Sunday on or before the 1st.
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const gridStart = new Date(first);
    gridStart.setDate(1 - first.getDay());
    const weeks: Date[][] = [];
    const cursor = new Date(gridStart);
    do {
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
            week.push(new Date(cursor));
            cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(week);
    } while (cursor.getMonth() === view.getMonth());

    const shift = (months: number) => setView(new Date(view.getFullYear(), view.getMonth() + months, 1));
    const year = view.getFullYear();

    return (
        <div ref={rootRef} className="relative">
            <div className="inline-block border-0 p-0">
                <div className="relative inline-block w-full">
                    <input
                        type="text"
                        value={text ?? formatMDY(selected)}
                        disabled={disabled}
                        onClick={openCalendar}
                        onFocus={openCalendar}
                        onChange={(e) => {
                            setText(e.target.value);
                            const d = parseMDY(e.target.value);
                            if (d && !isDisabled(d)) {
                                onChange(d);
                                setView(new Date(d.getFullYear(), d.getMonth(), 1));
                            }
                        }}
                        onBlur={() => setText(null)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape" || e.key === "Tab") setOpen(false);
                            if (e.key === "Enter") {
                                e.preventDefault();
                                setOpen(false);
                            }
                        }}
                        className={className}
                    />
                </div>
            </div>
            {open && (
                <div className="absolute left-0 top-full z-[1] pt-[10px] leading-none">
                    <div className="relative inline-block rounded-[0.3rem] border border-solid !border-[#aeaeae] bg-white font-['Helvetica_Neue',helvetica,arial,sans-serif] text-[0.8rem] leading-[initial] text-black">
                        <svg
                            className="absolute left-[20px] top-[-8px] fill-[#f0f0f0] stroke-[#aeaeae]"
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                            aria-hidden="true"
                        >
                            <path d="M0 8 L8 0 L16 8" />
                        </svg>
                        <button
                            type="button"
                            aria-label="Previous Month"
                            onClick={() => shift(-1)}
                            className="group/nav absolute left-[2px] top-[2px] z-[1] flex h-8 w-8 items-center justify-center overflow-hidden border-0 bg-transparent p-0"
                        >
                            <span className="relative top-[-1px] w-0 text-[20px]">
                                <span className={clsx(ARROW, "right-[-7px] top-[6px] rotate-[225deg] group-hover/nav:!border-[#a6a6a6]")} />
                            </span>
                        </button>
                        <button
                            type="button"
                            aria-label="Next Month"
                            onClick={() => shift(1)}
                            className="group/nav absolute right-[2px] top-[2px] z-[1] flex h-8 w-8 items-center justify-center overflow-hidden border-0 bg-transparent p-0"
                        >
                            <span className="relative top-[-1px] w-0 text-[20px]">
                                <span className={clsx(ARROW, "left-[-7px] top-[6px] rotate-45 group-hover/nav:!border-[#a6a6a6]")} />
                            </span>
                        </button>
                        <div className="float-left">
                            <div className="relative rounded-tl-[0.3rem] rounded-tr-[0.3rem] border-0 border-b border-solid !border-[#aeaeae] bg-[#f0f0f0] pb-0 pt-2 text-center">
                                <h2 className="m-0 text-[0.944rem] font-bold text-black">
                                    {MONTHS[view.getMonth()]} {year}
                                </h2>
                                {(showMonthDropdown || showYearDropdown) && (
                                    <div className="relative">
                                        {showMonthDropdown && (
                                            <div className="mx-[15px] inline-block">
                                                <div
                                                    className="group/rv relative cursor-pointer rounded-[0.3rem] border border-solid !border-transparent"
                                                    onClick={() => setDropdown(dropdown === "month" ? null : "month")}
                                                >
                                                    <span className={clsx(ARROW, "right-[-16px] top-0 rotate-[135deg] group-hover/rv:!border-[#b3b3b3]")} />
                                                    <span>{MONTHS[view.getMonth()]}</span>
                                                </div>
                                            </div>
                                        )}
                                        {showYearDropdown && (
                                            <div className="mx-[15px] inline-block">
                                                <div
                                                    className="group/rv relative cursor-pointer rounded-[0.3rem] border border-solid !border-transparent"
                                                    onClick={() => setDropdown(dropdown === "year" ? null : "year")}
                                                >
                                                    <span className={clsx(ARROW, "right-[-16px] top-0 rotate-[135deg] group-hover/rv:!border-[#b3b3b3]")} />
                                                    <span>{year}</span>
                                                </div>
                                            </div>
                                        )}
                                        {dropdown && (
                                            <div className="absolute left-1/4 top-[-2px] z-[1] w-1/2 rounded-[0.3rem] border border-solid !border-[#aeaeae] bg-[#f0f0f0] text-center">
                                                {(dropdown === "month"
                                                    ? MONTHS.map((name, i) => ({ label: name, on: i === view.getMonth(), go: () => setView(new Date(year, i, 1)) }))
                                                    : Array.from({ length: 11 }, (_, i) => year + 5 - i).map((y) => ({
                                                          label: String(y),
                                                          on: y === year,
                                                          go: () => setView(new Date(y, view.getMonth(), 1)),
                                                      }))
                                                ).map((o) => (
                                                    <div
                                                        key={o.label}
                                                        onClick={() => {
                                                            o.go();
                                                            setDropdown(null);
                                                        }}
                                                        className="relative mx-auto block w-full cursor-pointer leading-5 first:rounded-t-[0.3rem] last:rounded-b-[0.3rem] hover:bg-[#ccc]"
                                                    >
                                                        {o.on && <span className="absolute left-[15px]">✓</span>}
                                                        {o.label}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="mb-[-8px] whitespace-nowrap">
                                    {DAY_NAMES.map((d) => (
                                        <div key={d} className="m-[0.166rem] inline-block w-[1.7rem] text-center leading-[1.7rem] text-black">
                                            {d}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="m-[0.4rem] text-center" role="listbox">
                                {weeks.map((week) => (
                                    <div key={week[0].toISOString()} className="whitespace-nowrap">
                                        {week.map((d) => {
                                            const off = isDisabled(d);
                                            const on = sameDay(d, selected);
                                            return (
                                                <div
                                                    key={d.toISOString()}
                                                    role="option"
                                                    aria-selected={on}
                                                    aria-disabled={off}
                                                    onClick={() => choose(d)}
                                                    className={clsx(
                                                        "m-[0.166rem] inline-block w-[1.7rem] text-center leading-[1.7rem]",
                                                        sameDay(d, today) && "font-bold",
                                                        off
                                                            ? "cursor-default text-[#ccc]"
                                                            : on
                                                              ? "cursor-pointer rounded-[0.3rem] bg-[#216ba5] text-white hover:bg-[#1d5d90]"
                                                              : "cursor-pointer text-black hover:rounded-[0.3rem] hover:bg-[#f0f0f0]",
                                                    )}
                                                >
                                                    {d.getDate()}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
