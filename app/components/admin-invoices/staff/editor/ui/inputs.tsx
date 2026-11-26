"use client";

/* MUI v6 inputs the editor uses, in the admin theme's default
   variant="standard": <TextField> (FormControl + InputLabel + Input),
   <Input> with an InputAdornment, and <Select> with its Menu. Measurements
   are MUI's: 1rem / 1.4375em input text, 4px 0 5px padding, the
   rgba(0,0,0,.42) underline (2px rgba(0,0,0,.87) on hover, a 2px primary
   bar that scales in on focus), the label at translate(0,20px) shrinking
   to translate(0,-1.5px) scale(.75). */

import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import {
    useLayoutEffect,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import { MdArrowDropDown } from "react-icons/md";
import { BODY1 } from "../../../mui";

type FieldEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type InputProps = {
    value: string | number | null | undefined;
    onChange?: (e: FieldEvent) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    multiline?: boolean;
    /** Fixed rows (multiline). */
    rows?: number;
    /** Autosizing textarea with this many rows at least. */
    minRows?: number;
    fullWidth?: boolean;
    type?: string;
    disabled?: boolean;
    id?: string;
    /** Classes on the Input root (MuiInputBase-root). */
    className?: string;
    /** Classes on the <input>/<textarea>. */
    inputClassName?: string;
    startAdornment?: ReactNode;
    /** Hides the number spinner (InvoiceItem's `discount` class). */
    hideSpinner?: boolean;
    dataCy?: string;
    /** Set by TextField. */
    hasLabel?: boolean;
    labelShrunk?: boolean;
    onFocusChange?: (focused: boolean) => void;
};

/** Underline pseudo-elements (::before / ::after) as spans. */
const Underline = ({ focused, disabled }: { focused: boolean; disabled?: boolean }) => (
    <>
        <span
            aria-hidden="true"
            className={clsx(
                "pointer-events-none absolute inset-x-0 bottom-0 border-0 border-b transition-[border-bottom-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                disabled
                    ? "border-dotted !border-[rgba(0,0,0,0.42)]"
                    : "border-solid !border-[rgba(0,0,0,0.42)] group-hover/input:border-b-2 group-hover/input:!border-[rgba(0,0,0,0.87)]",
            )}
        />
        <span
            aria-hidden="true"
            className={clsx(
                "pointer-events-none absolute inset-x-0 bottom-0 border-0 border-b-2 border-solid !border-[#03a9f4] transition-transform duration-200 ease-[cubic-bezier(0,0,0.2,1)]",
                focused ? "scale-x-100" : "scale-x-0",
            )}
        />
    </>
);

const INPUT =
    "m-0 block w-full min-w-0 border-0 bg-transparent px-0 text-inherit outline-none placeholder:text-current placeholder:opacity-[0.42] disabled:[-webkit-text-fill-color:rgba(0,0,0,0.38)]";

const NO_SPINNER =
    "[appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none";

/** <Input> (standard). */
export const Input = ({
    value,
    onChange,
    onKeyDown,
    placeholder,
    multiline,
    rows,
    minRows,
    fullWidth,
    type = "text",
    disabled,
    id,
    className,
    inputClassName,
    startAdornment,
    hideSpinner,
    dataCy,
    hasLabel,
    labelShrunk,
    onFocusChange,
}: InputProps) => {
    const [focused, setFocused] = useState(false);
    const areaRef = useRef<HTMLTextAreaElement>(null);
    const hidePlaceholder = hasLabel && !labelShrunk;

    // TextareaAutosize for minRows: grow with the content.
    useLayoutEffect(() => {
        const el = areaRef.current;
        if (!el || !minRows) return;
        el.style.height = "0px";
        const line = parseFloat(getComputedStyle(el).lineHeight) || 23;
        el.style.height = `${Math.max(el.scrollHeight, line * minRows)}px`;
    }, [value, minRows]);

    const focus = (f: boolean) => {
        setFocused(f);
        onFocusChange?.(f);
    };

    const shared = {
        id,
        value: value ?? "",
        onChange,
        onKeyDown,
        placeholder,
        disabled,
        onFocus: () => focus(true),
        onBlur: () => focus(false),
        "data-cy": dataCy,
    };

    return (
        <div
            className={twMerge(clsx(
                "group/input relative box-border inline-flex items-center text-base leading-[1.4375em] tracking-[0.00938em]",
                disabled ? "cursor-default text-[rgba(0,0,0,0.38)]" : "cursor-text text-[rgba(0,0,0,0.87)]",
                fullWidth && "w-full",
                hasLabel && "mt-4",
                multiline && "pb-[5px] pt-1",
                className,
            ))}
        >
            {startAdornment}
            {multiline ? (
                <textarea
                    ref={areaRef}
                    {...shared}
                    rows={rows ?? minRows}
                    style={rows ? { height: `calc(${rows} * 1.4375em)` } : undefined}
                    className={twMerge(clsx(
                        INPUT,
                        "box-content resize-none overflow-hidden p-0",
                        hidePlaceholder && "placeholder:!opacity-0",
                        inputClassName,
                    ))}
                />
            ) : (
                <input
                    type={type}
                    {...shared}
                    className={twMerge(clsx(
                        INPUT,
                        "box-content h-[1.4375em] pb-[5px] pt-1",
                        hidePlaceholder && "placeholder:!opacity-0",
                        hideSpinner && NO_SPINNER,
                        inputClassName,
                    ))}
                />
            )}
            <Underline focused={focused} disabled={disabled} />
        </div>
    );
};

/** <InputAdornment position="start">: a body1 text.secondary Typography. */
export const StartAdornment = ({ children }: { children: ReactNode }) => (
    <div className="mr-2 flex h-[0.01em] max-h-[2em] items-center whitespace-nowrap text-[rgba(0,0,0,0.54)]">
        <p className={clsx(BODY1, "m-0 !text-[rgba(0,0,0,0.6)]")}>{children}</p>
    </div>
);

/** <TextField> (standard): FormControl root + optional floating label. */
export const TextField = ({
    label,
    margin,
    rootClassName,
    ...props
}: InputProps & { label?: string; margin?: "normal"; rootClassName?: string }) => {
    const [focused, setFocused] = useState(false);
    const filled = props.value !== null && props.value !== undefined && String(props.value) !== "";
    const shrink = focused || filled;

    return (
        <div
            className={twMerge(clsx(
                "relative m-0 inline-flex min-w-0 flex-col border-0 p-0 align-top",
                props.fullWidth && "w-full",
                margin === "normal" && "mb-2 mt-4",
                rootClassName,
            ))}
        >
            {label && (
                <label
                    htmlFor={props.id}
                    className={clsx(
                        "pointer-events-none absolute left-0 top-0 z-[1] block origin-top-left overflow-hidden text-ellipsis whitespace-nowrap p-0 text-base leading-[1.4375em] tracking-[0.00938em] transition-[color,transform,max-width] duration-200 ease-[cubic-bezier(0,0,0.2,1)]",
                        shrink ? "max-w-[133%] translate-y-[-1.5px] scale-75" : "max-w-full translate-y-5 scale-100",
                        focused ? "text-[#03a9f4]" : props.disabled ? "text-[rgba(0,0,0,0.38)]" : "text-[rgba(0,0,0,0.6)]",
                    )}
                >
                    {label}
                </label>
            )}
            <Input {...props} hasLabel={!!label} labelShrunk={shrink} onFocusChange={setFocused} />
        </div>
    );
};

/* ── Select ───────────────────────────────────────────────────────────── */

/** <FormControl><Select> (standard) with its Menu: anchored under the
    select's centre, at least as wide as it, theme MenuItem 0.9rem / 8px. */
export const Select = ({
    value,
    options,
    onChange,
    name,
    className,
}: {
    value: string | number;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    name?: string;
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [width, setWidth] = useState(0);
    const current = options.find((o) => String(o.value) === String(value));

    const pick = (v: string) => {
        setOpen(false);
        onChange(v);
    };

    return (
        <div className={twMerge("relative m-0 inline-flex min-w-0 flex-col border-0 p-0 align-top", className)}>
            <div className="group/input relative box-border inline-flex w-full cursor-pointer items-center text-base leading-[1.4375em] tracking-[0.00938em] text-[rgba(0,0,0,0.87)]">
                <div
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-controls={name ? `${name}-menu` : undefined}
                    tabIndex={0}
                    onMouseDown={(e) => {
                        if (e.button !== 0) return;
                        e.preventDefault();
                        setWidth(e.currentTarget.clientWidth);
                        setOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                            e.preventDefault();
                            setWidth(e.currentTarget.clientWidth);
                            setOpen(true);
                        }
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="box-content min-h-[1.4375em] min-w-4 cursor-pointer select-none overflow-hidden text-ellipsis whitespace-nowrap rounded-none pb-[5px] pr-6 pt-1 outline-none"
                >
                    {current ? current.label : <span className="notranslate">&#8203;</span>}
                </div>
                <input type="hidden" name={name} value={value} />
                <MdArrowDropDown
                    aria-hidden="true"
                    className={clsx(
                        "pointer-events-none absolute right-0 top-[calc(50%-0.5em)] size-6 text-[rgba(0,0,0,0.54)]",
                        open && "rotate-180",
                    )}
                />
                <Underline focused={focused || open} />
            </div>
            {open && (
                <>
                    <div className="fixed inset-0 z-[1300]" aria-hidden="true" onClick={() => setOpen(false)} />
                    <ul
                        id={name ? `${name}-menu` : undefined}
                        role="listbox"
                        style={{ minWidth: width }}
                        className="absolute left-1/2 top-full z-[1301] m-0 max-h-[calc(100vh-96px)] -translate-x-1/2 list-none overflow-y-auto rounded-[4px] bg-white p-0 text-[rgba(0,0,0,0.87)] shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]"
                    >
                        {options.map((o) => {
                            const selected = String(o.value) === String(value);
                            return (
                                <li
                                    key={o.value}
                                    role="option"
                                    aria-selected={selected}
                                    tabIndex={-1}
                                    onClick={() => pick(o.value)}
                                    onKeyDown={(e) => e.key === "Enter" && pick(o.value)}
                                    className={clsx(
                                        "flex cursor-pointer items-center whitespace-nowrap p-2 text-[0.9rem] leading-[1.5] tracking-[0.00938em]",
                                        selected
                                            ? "bg-[rgba(3,169,244,0.08)] hover:bg-[rgba(3,169,244,0.12)]"
                                            : "hover:bg-[rgba(0,0,0,0.04)]",
                                    )}
                                >
                                    {o.label}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};
