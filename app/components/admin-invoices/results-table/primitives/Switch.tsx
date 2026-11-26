"use client";

import clsx from "clsx";
import type { ChangeEvent, ReactNode } from "react";

/* MUI <Switch color="primary"> (58×38, 12px padding round a 34×14 track,
   20px thumb that turns lightBlue and slides 20px when on) and
   <FormControlLabel> (margin-left -11, margin-right 16, the label as a
   body1 Typography: 0.875rem grey[800] from the theme, text.disabled when
   disabled). */

const THUMB_SHADOW =
    "shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]";

export const Switch = ({
    checked,
    disabled,
    onChange,
}: {
    checked: boolean;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
    <span className="relative z-0 box-border inline-flex h-[38px] w-[58px] shrink-0 overflow-hidden p-3 align-middle">
        <span
            className={clsx(
                "absolute left-0 top-0 z-[1] inline-flex items-center justify-center rounded-full p-[9px] transition-[left,transform] duration-150",
                checked && "translate-x-5",
                disabled
                    ? checked
                        ? "text-[#9fdefa]"
                        : "text-[#f5f5f5]"
                    : clsx(
                          checked ? "text-[#03a9f4] hover:bg-[rgba(3,169,244,0.04)]" : "text-white hover:bg-[rgba(0,0,0,0.04)]",
                          "cursor-pointer",
                      ),
            )}
        >
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                className="absolute left-[-100%] top-0 z-[1] m-0 h-full w-[300%] cursor-[inherit] appearance-none p-0 opacity-0"
            />
            <span className={clsx("block size-5 rounded-full bg-current", THUMB_SHADOW)} />
        </span>
        <span
            className={clsx(
                "z-[-1] block size-full rounded-[7px] transition-[opacity,background-color] duration-150",
                checked ? "bg-[#03a9f4]" : "bg-black",
                disabled ? "opacity-[0.12]" : checked ? "opacity-50" : "opacity-[0.38]",
            )}
        />
    </span>
);

export const FormControlLabel = ({
    control,
    label,
    disabled,
    className,
    id,
}: {
    control: ReactNode;
    label: ReactNode;
    disabled?: boolean;
    className?: string;
    id?: string;
}) => (
    <label
        id={id}
        className={clsx(
            "-ml-[11px] mr-4 inline-flex items-center align-middle [-webkit-tap-highlight-color:transparent]",
            disabled ? "cursor-default" : "cursor-pointer",
            className,
        )}
    >
        {control}
        <span
            className={clsx(
                "m-0 text-[0.875rem] leading-[1.5] tracking-[0.00938em]",
                disabled ? "text-[rgba(0,0,0,0.38)]" : "text-[#424242]",
            )}
        >
            {label}
        </span>
    </label>
);
