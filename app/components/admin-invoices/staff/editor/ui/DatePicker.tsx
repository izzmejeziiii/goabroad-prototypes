"use client";

/* react-datepicker v7 with its stock stylesheet (react-datepicker.css):
   a plain text input (each caller styles it through `className`, as the
   source does with withStyles classes) and the popup calendar under it:
   0.8rem "Helvetica Neue" calendar, #f0f0f0 header with a #aeaeae rule,
   1.7rem day cells, #216ba5 selected / #bad9f1 keyboard-selected / bold
   today, chevron navigation, and the scroll-mode month and year dropdowns
   for showMonthDropdown / showYearDropdown (+ scrollableYearDropdown,
   yearDropdownItemNumber={15}). Typing a MM/dd/yyyy date selects it. */

import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { today } from "../../../format";
import type { EditorDate } from "../types";
import { formatMDY, toDate } from "../utils";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const sameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** The weeks react-datepicker renders: from the Sunday on/before the 1st
    until the week holding the month's last day. */
const weeksOf = (year: number, month: number) => {
    const first = new Date(year, month, 1);
    const start = new Date(year, month, 1 - first.getDay());
    const last = new Date(year, month + 1, 0);
    const weeks: Date[][] = [];
    for (let cursor = start; cursor <= last; ) {
        const week = Array.from({ length: 7 }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i));
        weeks.push(week);
        cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7);
    }
    return weeks;
};

/** The chevron used by the navigation buttons and the read-view arrows. */
const Chevron = ({ className }: { className: string }) => (
    <span
        aria-hidden="true"
        className={clsx(
            "absolute block h-[9px] w-[9px] border-0 border-r-[3px] border-t-[3px] border-solid !border-[#ccc]",
            className,
        )}
    />
);

type Props = {
    selected: EditorDate | undefined;
    onChange: (date: Date | null) => void;
    /** Classes for the <input> (the source's `className`). */
    className?: string;
    disabled?: boolean;
    minDate?: Date | null;
    /** showMonthDropdown + showYearDropdown + scrollableYearDropdown. */
    dropdowns?: boolean;
    id?: string;
    /** z-index of .react-datepicker-popper (1 by default). */
    popperZ?: number;
    dataCy?: string;
};

export const DatePicker = ({
    selected,
    onChange,
    className,
    disabled,
    minDate,
    dropdowns,
    id,
    popperZ = 1,
    dataCy,
}: Props) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const date = toDate(selected);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState<string | null>(null);
    const [view, setView] = useState(() => date ?? today());
    const [preSelection, setPreSelection] = useState<Date | null>(null);
    const [dropdown, setDropdown] = useState<"month" | "year" | null>(null);
    const [placeTop, setPlaceTop] = useState(false);
    const [arrowLeft, setArrowLeft] = useState(40);
    const min = minDate && !isNaN(minDate.getTime()) && minDate.getTime() > 0 ? startOfDay(minDate) : null;

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) {
                setOpen(false);
                setDropdown(null);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [open]);

    const show = () => {
        if (disabled || open) return;
        const d = toDate(selected);
        setView(d ?? today());
        setPreSelection(d ?? today());
        setDropdown(null);
        const rect = wrapRef.current?.getBoundingClientRect();
        if (rect) {
            const below = window.innerHeight - rect.bottom;
            setPlaceTop(below < 290 && rect.top > below);
            setArrowLeft(Math.max(8, Math.min(rect.width / 2, 210) - 8));
        }
        setOpen(true);
    };

    const pick = (d: Date) => {
        if (min && d < min) return;
        const prev = toDate(selected);
        const next = new Date(d);
        // v7 keeps the previous selection's time of day.
        if (prev) next.setHours(prev.getHours(), prev.getMinutes(), prev.getSeconds());
        onChange(next);
        setText(null);
        setOpen(false);
        setDropdown(null);
    };

    const onType = (value: string) => {
        setText(value);
        if (value === "") return onChange(null);
        const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
        if (!m) return;
        const d = new Date(+m[3], +m[1] - 1, +m[2]);
        if (d.getMonth() !== +m[1] - 1) return;
        setView(d);
        setPreSelection(d);
        onChange(d);
    };

    const year = view.getFullYear();
    const month = view.getMonth();
    const now = today();
    const years = Array.from({ length: 31 }, (_, i) => year + 15 - i);

    return (
        <div ref={wrapRef} className="relative inline-block border-0 p-0">
            <div className="relative inline-block w-full">
                <input
                    type="text"
                    id={id}
                    data-cy={dataCy}
                    disabled={disabled}
                    value={text ?? formatMDY(selected)}
                    onChange={(e) => onType(e.target.value)}
                    onFocus={show}
                    onClick={show}
                    onBlur={() => setText(null)}
                    onKeyDown={(e) => {
                        if (e.key === "Escape" || e.key === "Tab") setOpen(false);
                        if (e.key === "Enter" && open && preSelection) {
                            e.preventDefault();
                            pick(preSelection);
                        }
                    }}
                    className={twMerge(
                        "outline-none disabled:cursor-default disabled:bg-[rgba(239,239,239,0.3)]",
                        className,
                    )}
                />
            </div>
            {open && (
                <div
                    className={clsx("absolute left-0", placeTop ? "bottom-full pb-[10px]" : "top-full pt-[10px]")}
                    style={{ zIndex: popperZ }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <div className="relative inline-block rounded-[0.3rem] border border-solid !border-[#aeaeae] bg-white text-left font-['Helvetica_Neue',helvetica,arial,sans-serif] text-[0.8rem] font-normal leading-normal tracking-normal text-black">
                        {/* .react-datepicker__triangle */}
                        <span
                            aria-hidden="true"
                            className={clsx(
                                "absolute size-0 border-x-[8px] border-solid !border-x-transparent",
                                placeTop
                                    ? "bottom-[-8px] border-t-[8px] !border-t-[#aeaeae] after:absolute after:-left-[7px] after:-top-[9px] after:size-0 after:border-x-[7px] after:border-t-[7px] after:border-solid after:!border-x-transparent after:!border-t-white"
                                    : "top-[-8px] border-b-[8px] !border-b-[#aeaeae] after:absolute after:-left-[7px] after:top-[1px] after:size-0 after:border-x-[7px] after:border-b-[7px] after:border-solid after:!border-x-transparent after:!border-b-[#f0f0f0]",
                            )}
                            style={{ left: arrowLeft }}
                        />
                        <button
                            type="button"
                            aria-label="Previous Month"
                            onClick={() => setView(new Date(year, month - 1, 1))}
                            className="group/nav absolute left-[2px] top-[2px] z-[1] flex size-8 cursor-pointer items-center justify-center overflow-hidden border-0 bg-transparent p-0"
                        >
                            <Chevron className="left-[13px] top-[11px] rotate-[225deg] group-hover/nav:!border-[#a6a6a6]" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next Month"
                            onClick={() => setView(new Date(year, month + 1, 1))}
                            className="group/nav absolute right-[2px] top-[2px] z-[1] flex size-8 cursor-pointer items-center justify-center overflow-hidden border-0 bg-transparent p-0"
                        >
                            <Chevron className="right-[13px] top-[11px] rotate-45 group-hover/nav:!border-[#a6a6a6]" />
                        </button>
                        <div className="float-left">
                            <div className="relative rounded-t-[0.3rem] border-0 border-b border-solid !border-[#aeaeae] bg-[#f0f0f0] px-0 py-2 text-center">
                                <h2 className="m-0 text-center text-[0.944rem] font-bold text-black">
                                    {MONTHS[month]} {year}
                                </h2>
                                {dropdowns && (
                                    <div>
                                        <div className={clsx("mx-[15px] inline-block", dropdown === "month" && "invisible")}>
                                            <div
                                                role="button"
                                                tabIndex={-1}
                                                onClick={() => setDropdown(dropdown === "month" ? null : "month")}
                                                className="group/rv relative cursor-pointer rounded-[0.3rem] border border-solid !border-transparent"
                                            >
                                                <Chevron className="-right-4 top-0 rotate-[135deg] group-hover/rv:!border-[#b3b3b3]" />
                                                <span>{MONTHS[month]}</span>
                                            </div>
                                        </div>
                                        <div className={clsx("mx-[15px] inline-block", dropdown === "year" && "invisible")}>
                                            <div
                                                role="button"
                                                tabIndex={-1}
                                                onClick={() => setDropdown(dropdown === "year" ? null : "year")}
                                                className="group/rv relative cursor-pointer rounded-[0.3rem] border border-solid !border-transparent"
                                            >
                                                <Chevron className="-right-4 top-0 rotate-[135deg] group-hover/rv:!border-[#b3b3b3]" />
                                                <span>{year}</span>
                                            </div>
                                        </div>
                                        {dropdown && (
                                            <div
                                                className={clsx(
                                                    "absolute left-1/4 top-[30px] z-[1] w-1/2 rounded-[0.3rem] border border-solid !border-[#aeaeae] bg-[#f0f0f0] text-center",
                                                    dropdown === "year" && "h-[150px] overflow-y-scroll",
                                                )}
                                            >
                                                {(dropdown === "month" ? MONTHS : years).map((label, i) => {
                                                    const isSel = dropdown === "month" ? i === month : label === year;
                                                    return (
                                                        <div
                                                            key={label}
                                                            role="option"
                                                            aria-selected={isSel}
                                                            tabIndex={-1}
                                                            onClick={() => {
                                                                setView(
                                                                    dropdown === "month"
                                                                        ? new Date(year, i, 1)
                                                                        : new Date(label as number, month, 1),
                                                                );
                                                                setDropdown(null);
                                                            }}
                                                            className="relative mx-auto block w-full cursor-pointer leading-5 hover:bg-[#ccc]"
                                                        >
                                                            {isSel && <span className="absolute left-[15px]">✓</span>}
                                                            {label}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="-mb-2 whitespace-nowrap">
                                    {DAY_NAMES.map((d) => (
                                        <div key={d} className="m-[0.166rem] inline-block w-[1.7rem] text-center leading-[1.7rem] text-black">
                                            {d}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div role="listbox" className="m-[0.4rem] text-center">
                                {weeksOf(year, month).map((week) => (
                                    <div key={week[0].toISOString()} className="whitespace-nowrap">
                                        {week.map((d) => {
                                            const isSel = sameDay(d, date);
                                            const isKey = !isSel && sameDay(d, preSelection);
                                            const isDisabled = !!min && d < min;
                                            return (
                                                <div
                                                    key={d.getTime()}
                                                    role="option"
                                                    aria-selected={isSel}
                                                    aria-disabled={isDisabled}
                                                    tabIndex={-1}
                                                    onClick={() => pick(d)}
                                                    className={clsx(
                                                        "m-[0.166rem] inline-block w-[1.7rem] text-center leading-[1.7rem]",
                                                        sameDay(d, now) && "font-bold",
                                                        isDisabled
                                                            ? "cursor-default text-[#ccc]"
                                                            : isSel
                                                              ? "cursor-pointer rounded-[0.3rem] bg-[#216ba5] text-white hover:bg-[#1d5d90]"
                                                              : isKey
                                                                ? "cursor-pointer rounded-[0.3rem] bg-[#bad9f1] text-black hover:bg-[#f0f0f0]"
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
