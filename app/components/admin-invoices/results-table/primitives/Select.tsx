"use client";

import clsx from "clsx";
import { useRef, useState, type ReactNode } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { MenuItem, Popover } from "./Popover";
import { UNDERLINE, UNDERLINE_DISABLED, UNDERLINE_HOVER } from "./Input";

/* MUI <Select variant="standard">: the InputBase underline (unless
   disableUnderline), the value box padded 4px 0 5px with 24px kept for the
   ArrowDropDown, and a Menu under the field (MUI v5+ anchors it bottom /
   center), at least as wide as the field unless autoWidth. */

export type SelectItem<V> = { value: V; label: ReactNode; disabled?: boolean };

export function Select<V extends string | number>({
    value,
    items,
    onChange,
    disabled,
    disableUnderline,
    autoWidth,
    displayEmpty,
    emptyLabel,
    label,
    className,
    rootClassName,
    selectClassName,
    style,
}: {
    value: V | "" | null;
    items: SelectItem<V>[];
    onChange: (value: V) => void;
    disabled?: boolean;
    disableUnderline?: boolean;
    autoWidth?: boolean;
    displayEmpty?: boolean;
    /** displayEmpty: what an empty value shows (e.g. <em>Select Filter</em>). */
    emptyLabel?: ReactNode;
    label?: string;
    className?: string;
    rootClassName?: string;
    selectClassName?: string;
    style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const open = !!anchor;
    // MUI's areEqualValues: non-objects compare as strings, so 0 matches "0".
    const same = (a: unknown) => String(a) === String(value ?? "");
    const current = items.find((i) => same(i.value));
    const shown = current ? current.label : displayEmpty && (value === "" || value === null) ? emptyLabel : "";
    // FormControl's "filled": any non-empty value keeps the label up, even
    // one no item matches (the select then shows blank).
    const shrink = displayEmpty || (value !== null && value !== undefined && value !== "");

    return (
        <div className={clsx("relative m-0 inline-flex min-w-0 flex-col border-0 p-0 align-top", className)}>
            {label && (
                <label
                    className={clsx(
                        "pointer-events-none absolute left-0 top-0 z-[1] block origin-top-left whitespace-nowrap text-[1rem] leading-[1.4375em] tracking-[0.00938em] transition-transform duration-200",
                        shrink ? "translate-y-[-1.5px] scale-75" : "translate-y-5",
                        disabled ? "text-[rgba(0,0,0,0.38)]" : open ? "text-[#03a9f4]" : "text-[rgba(0,0,0,0.6)]",
                    )}
                >
                    {label}
                </label>
            )}
            <div
                ref={ref}
                className={clsx(
                    "relative box-border inline-flex items-center text-[1rem] leading-[1.4375em] tracking-[0.00938em]",
                    disabled ? "text-[rgba(0,0,0,0.38)]" : "cursor-pointer text-[rgba(0,0,0,0.87)]",
                    !disableUnderline && UNDERLINE,
                    !disableUnderline && (disabled ? UNDERLINE_DISABLED : UNDERLINE_HOVER),
                    open && !disableUnderline && "after:scale-x-100",
                    label && "mt-4",
                    rootClassName,
                )}
                style={style}
            >
                <div
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-disabled={disabled || undefined}
                    onClick={() => !disabled && setAnchor(ref.current)}
                    onKeyDown={(e) => {
                        if (!disabled && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
                            e.preventDefault();
                            setAnchor(ref.current);
                        }
                    }}
                    className={clsx(
                        "box-content block h-auto min-h-[1.4375em] min-w-4 select-none overflow-hidden text-ellipsis whitespace-nowrap rounded-none pb-[5px] pl-0 pr-6 pt-1 outline-0",
                        selectClassName,
                    )}
                >
                    {shown || <span className="notranslate">&#8203;</span>}
                </div>
                <MdArrowDropDown
                    aria-hidden="true"
                    className={clsx(
                        "pointer-events-none absolute right-0 top-[calc(50%-0.5em)] size-6 text-[1.5rem]",
                        disabled ? "text-[rgba(0,0,0,0.26)]" : "text-[rgba(0,0,0,0.54)]",
                        open && "rotate-180",
                    )}
                />
            </div>
            <Popover
                anchorEl={anchor}
                open={open}
                onClose={() => setAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                matchAnchorWidth={!autoWidth}
                paperClassName="max-h-[calc(100%-96px)]"
            >
                {items.map((item) => (
                    <MenuItem
                        key={String(item.value)}
                        selected={same(item.value)}
                        disabled={item.disabled}
                        onClick={() => {
                            setAnchor(null);
                            onChange(item.value);
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Popover>
        </div>
    );
}
