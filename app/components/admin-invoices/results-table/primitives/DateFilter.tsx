"use client";

import { useState } from "react";
import { Button, Dialog, DialogActions, SUBTITLE2 } from "../../mui";
import { isoDate, parseDate } from "../../format";
import type { DateValue } from "../types";
import { TextField } from "./Input";
import { formatMDY, ReactDatePicker } from "./ReactDatePicker";
import { FormControlLabel, Switch } from "./Switch";

/* Copy of src/components/DateFilter/DateFilter.js: a standard TextField
   showing the picked day ("11/26/2026") or range ("11/01/2026 to
   11/30/2026"); clicking it slides up a dialog titled "Choose a date" with
   a "Date Range" switch, one or two react-datepicker inputs (Start / End),
   and a Submit button. Submitting hands back { start } or { start, end } as
   yyyy-MM-dd, and only when the shown text changes (the real one fires from
   an effect on that text). The alternate-value ("Offered Year Round") mode
   isn't used by the invoice tables, so it's left out. */

const KEYFRAMES = "@keyframes ai-slide-up{from{transform:translateY(100vh)}to{transform:none}}";

const label = (v: DateValue | null | undefined) => {
    if (!v || !v.start) return "";
    const s = parseDate(v.start);
    const e = v.end ? parseDate(v.end) : null;
    if (!s) return "";
    return e ? `${formatMDY(s)} to ${formatMDY(e)}` : formatMDY(s);
};

export const DateFilter = ({
    value,
    onChange,
    today,
}: {
    value: DateValue | null | undefined;
    onChange: (value: DateValue) => void;
    today: Date;
}) => {
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState(today);
    const [end, setEnd] = useState(today);
    const [isRange, setIsRange] = useState(false);
    const shown = label(value);

    const show = () => {
        setStart((value?.start && parseDate(value.start)) || today);
        setEnd((value?.end && parseDate(value.end)) || today);
        setIsRange(!!(value?.start && value?.end));
        setOpen(true);
    };

    const submit = () => {
        const next: DateValue = isRange ? { start: isoDate(start), end: isoDate(end) } : { start: isoDate(start) };
        if (label(next) !== shown) onChange(next);
        setOpen(false);
    };

    return (
        <>
            <TextField fullWidth value={shown} onClick={show} onChange={show} id="date-column-filter" />
            <style>{KEYFRAMES}</style>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                paperClassName="!overflow-visible animate-[ai-slide-up_225ms_cubic-bezier(0,0,0.2,1)]"
            >
                <h2 className="m-0 flex min-w-[300px] flex-none items-center justify-between px-6 py-4 text-[1.25rem] font-medium leading-[1.6] tracking-[0.0075em]">
                    <span className={SUBTITLE2}>Choose a date</span>
                    <FormControlLabel
                        control={<Switch checked={isRange} onChange={(e) => setIsRange(e.target.checked)} />}
                        label="Date Range"
                    />
                </h2>
                <div className="flex flex-auto flex-col px-6 pb-5 pt-0">
                    <div className="mb-2 flex">
                        <div className="mr-5 flex flex-col font-[inherit]">
                            {isRange && <label className="pb-[0.5em] text-[12px] leading-none text-[rgba(0,0,0,0.54)]">Start</label>}
                            <ReactDatePicker
                                selected={start}
                                today={today}
                                showMonthDropdown
                                showYearDropdown
                                className="max-w-[200px] rounded-[3px] border border-solid !border-[#ddd] px-[1em] py-[0.5em] font-[inherit] text-[16px] text-[#333]"
                                onChange={(d) => {
                                    setStart(d);
                                    if (isRange && d > end) setEnd(d);
                                }}
                            />
                        </div>
                        {isRange && (
                            <div className="flex flex-col font-[inherit]">
                                <label className="pb-[0.5em] text-[12px] leading-none text-[rgba(0,0,0,0.54)]">End</label>
                                <ReactDatePicker
                                    selected={end}
                                    today={today}
                                    minDate={start}
                                    showMonthDropdown
                                    showYearDropdown
                                    className="max-w-[200px] rounded-[3px] border border-solid !border-[#ddd] px-[1em] py-[0.5em] font-[inherit] text-[16px] text-[#333]"
                                    onChange={setEnd}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={submit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
