"use client";

import clsx from "clsx";
import { useEffect, useRef, type ChangeEvent, type MouseEvent } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from "react-icons/md";

/* MUI <Checkbox color="primary">: a 9px-padded round hit area (42px with the
   24px icon), rgba(0,0,0,.6) when empty, lightBlue 500 when checked or
   indeterminate, the primary hover tint, and the real input stretched over
   the whole area (opacity 0), as .PrivateSwitchBase-input is. */
export const Checkbox = ({
    checked = false,
    indeterminate = false,
    disabled,
    onChange,
    onClick,
    className,
    inputProps,
}: {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: MouseEvent<HTMLInputElement>) => void;
    className?: string;
    inputProps?: Record<string, string>;
}) => {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate;
    }, [indeterminate]);
    const on = checked || indeterminate;
    const Icon = indeterminate ? MdIndeterminateCheckBox : checked ? MdCheckBox : MdCheckBoxOutlineBlank;
    return (
        <span
            className={clsx(
                "relative box-border inline-flex shrink-0 items-center justify-center rounded-full p-[9px] align-middle transition-colors duration-150",
                disabled
                    ? "text-[rgba(0,0,0,0.26)]"
                    : clsx(
                          on ? "text-[#03a9f4]" : "text-[rgba(0,0,0,0.6)]",
                          "cursor-pointer hover:bg-[rgba(3,169,244,0.04)]",
                      ),
                className,
            )}
        >
            <input
                ref={ref}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange ?? (() => {})}
                onClick={onClick}
                className="absolute left-0 top-0 z-[1] m-0 size-full cursor-[inherit] appearance-none p-0 opacity-0"
                {...inputProps}
            />
            <Icon className="size-6 shrink-0 select-none" aria-hidden="true" />
        </span>
    );
};
