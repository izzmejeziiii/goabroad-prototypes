"use client";

/* Small MUI v6 pieces the editor uses that mui.tsx doesn't have, to MUI's
   measurements in the admin theme: Checkbox / Radio (9px padding, 24px
   icon, primary when checked), FormControlLabel, Alert severity="warning",
   a small Fab, the primary filled Chip with a delete icon, a Tooltip with
   an arrow, and a temporary right Drawer with an invisible backdrop. */

import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
    MdCancel,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdOutlineReportProblem,
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
} from "react-icons/md";
import { BODY1 } from "../../../mui";

const SWITCH_BASE =
    "relative inline-flex shrink-0 items-center justify-center rounded-full p-[9px] align-middle transition-colors duration-150";

/** <Checkbox> (color primary). */
export const Checkbox = ({
    checked,
    onChange,
    onClick,
    disabled,
}: {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    onClick?: () => void;
    disabled?: boolean;
}) => (
    <span
        className={clsx(
            SWITCH_BASE,
            disabled
                ? "text-[rgba(0,0,0,0.26)]"
                : clsx(checked ? "text-[#03a9f4]" : "text-[rgba(0,0,0,0.6)]", "hover:bg-[rgba(3,169,244,0.04)]"),
        )}
    >
        <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            onClick={onClick}
            className="absolute inset-0 z-[1] m-0 size-full cursor-[inherit] p-0 opacity-0 disabled:cursor-default"
        />
        {checked ? <MdCheckBox className="size-6" /> : <MdCheckBoxOutlineBlank className="size-6" />}
    </span>
);

/** <Radio> (color primary). */
export const Radio = ({
    checked,
    onChange,
    disabled,
    name,
    value,
}: {
    checked: boolean;
    onChange?: (value: string) => void;
    disabled?: boolean;
    name?: string;
    value: string;
}) => (
    <span
        className={clsx(
            SWITCH_BASE,
            disabled
                ? "text-[rgba(0,0,0,0.26)]"
                : clsx(checked ? "text-[#03a9f4]" : "text-[rgba(0,0,0,0.6)]", "hover:bg-[rgba(3,169,244,0.04)]"),
        )}
    >
        <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            className="absolute inset-0 z-[1] m-0 size-full cursor-[inherit] p-0 opacity-0 disabled:cursor-default"
        />
        {checked ? (
            <MdRadioButtonChecked className="size-6" />
        ) : (
            <MdRadioButtonUnchecked className="size-6" />
        )}
    </span>
);

/** <FormControlLabel>: -11px left margin, 16px right, body1 label. */
export const FormControlLabel = ({
    control,
    label,
    disabled,
}: {
    control: ReactNode;
    label: ReactNode;
    disabled?: boolean;
}) => (
    <label
        className={clsx(
            "-ml-[11px] mr-4 inline-flex items-center align-middle [-webkit-tap-highlight-color:transparent]",
            disabled ? "cursor-default" : "cursor-pointer",
        )}
    >
        {control}
        <span className={clsx(BODY1, disabled && "!text-[rgba(0,0,0,0.38)]")}>{label}</span>
    </label>
);

/** <Alert severity="warning"> (standard): lighten/darken of warning.light,
    warning.main icon, body2 text, 6px 16px padding. */
export const WarningAlert = ({
    children,
    className,
    dataCy,
}: {
    children: ReactNode;
    className?: string;
    dataCy?: string;
}) => (
    <div
        role="alert"
        data-cy={dataCy}
        className={twMerge(
            "flex rounded-[4px] bg-[rgb(255,244,229)] px-4 py-[6px] text-[0.875rem] font-normal leading-[1.43] tracking-[0.01071em] text-[rgb(102,60,0)]",
            className,
        )}
    >
        <div className="mr-3 flex py-[7px] text-[22px] text-[#ed6c02] opacity-90">
            <MdOutlineReportProblem className="size-[1em]" />
        </div>
        <div className="min-w-0 overflow-auto py-2">{children}</div>
    </div>
);

/** <Fab color="primary" size="small"> (theme: the soft 0 2px 15px shadow). */
export const Fab = ({
    onClick,
    children,
    className,
    dataCy,
    label,
}: {
    onClick: () => void;
    children: ReactNode;
    className?: string;
    dataCy?: string;
    label?: string;
}) => (
    <button
        type="button"
        onClick={onClick}
        data-cy={dataCy}
        aria-label={label}
        className={twMerge(
            "z-[1050] inline-flex size-10 min-h-9 shrink-0 items-center justify-center rounded-full bg-[#03a9f4] p-0 text-white shadow-[0_2px_15px_0_rgba(0,0,0,0.05)] transition-[background-color,box-shadow] duration-[250ms] hover:bg-[#0288d1]",
            className,
        )}
    >
        {children}
    </button>
);

/** MUI <Chip color="primary"> (filled). The theme makes it uppercase;
    InvoiceItem's `chip` class sets 30px / 0.875em / 0 5px 8px. */
export const PrimaryChip = ({
    label,
    onClick,
    onDelete,
    icon,
    className,
    labelClassName,
    id,
    dataCy,
}: {
    label?: string;
    onClick?: () => void;
    onDelete?: () => void;
    icon?: ReactNode;
    className?: string;
    labelClassName?: string;
    id?: string;
    dataCy?: string;
}) => (
    <div
        id={id}
        data-cy={dataCy}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={(e) => onClick && (e.key === "Enter" || e.key === " ") && onClick()}
        className={twMerge(clsx(
            "relative box-border inline-flex h-8 max-w-full select-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-[#03a9f4] p-0 align-middle uppercase text-white outline-none transition-[background-color,box-shadow] duration-300",
            onClick && "cursor-pointer hover:bg-[#0288d1]",
            className,
        ))}
    >
        {icon}
        <span className={twMerge("overflow-hidden text-ellipsis whitespace-nowrap px-3", labelClassName)}>{label}</span>
        {onDelete && (
            <MdCancel
                role="button"
                aria-label="Delete"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="-ml-[6px] mr-[5px] size-[22px] cursor-pointer text-[rgba(255,255,255,0.7)] hover:text-white"
            />
        )}
    </div>
);

/** MUI <Tooltip arrow> below its child: rgba(97,97,97,.92), 11px medium,
    14px away, arrow 0.71em. The wrapper is a block so the child keeps its
    full width (the real Tooltip adds no wrapper). */
export const ArrowTooltip = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="group/tip relative">
        {children}
        <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-[1500] mt-[14px] max-w-[300px] -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[rgba(97,97,97,0.92)] px-2 py-1 text-[0.6875rem] font-medium normal-case leading-[1.4em] tracking-normal text-white opacity-0 transition-opacity delay-100 duration-150 group-hover/tip:opacity-100"
        >
            <span className="absolute left-1/2 top-0 -mt-[0.71em] h-[0.71em] w-[1em] -translate-x-1/2 overflow-hidden text-[rgba(97,97,97,0.9)]">
                <span className="m-auto block size-full origin-bottom-left rotate-45 bg-current" />
            </span>
            {title}
        </span>
    </div>
);

/** A temporary right <Drawer> with BackdropProps={{ invisible: true }}. */
export const RightDrawer = ({
    open,
    onClose,
    children,
}: {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}) => {
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal only after hydration
    useEffect(() => setMounted(true), []);
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    if (!mounted || !open) return null;
    return createPortal(
        <div className="lt-root fixed inset-0 z-[1200] antialiased" role="presentation">
            <div className="absolute inset-0 bg-transparent" aria-hidden="true" onClick={onClose} />
            <div
                role="dialog"
                aria-modal="true"
                className="absolute right-0 top-0 flex h-full flex-col overflow-y-auto bg-white text-[rgba(0,0,0,0.87)] shadow-[0_2px_15px_0_rgba(0,0,0,0.07)]"
            >
                {children}
            </div>
        </div>,
        document.body,
    );
};
