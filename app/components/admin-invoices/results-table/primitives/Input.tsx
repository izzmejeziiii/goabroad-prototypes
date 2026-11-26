"use client";

import clsx from "clsx";
import {
    useState,
    type ChangeEvent,
    type HTMLAttributes,
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
    type Ref,
} from "react";

/* MUI text inputs as the admin's theme sets them up (standard variant by
   default): InputBase's 1rem / 1.4375em type, the standard underline
   (1px rgba(0,0,0,.42), 2px rgba(0,0,0,.87) on hover, a 2px lightBlue bar
   that scales in on focus), and the outlined variant with its notched
   fieldset for the few fields that ask for it. */

export const UNDERLINE =
    "before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:border-0 before:border-b before:border-solid before:!border-[rgba(0,0,0,0.42)] before:transition-[border-bottom-color] before:duration-200 before:content-['\\00a0'] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:scale-x-0 after:border-0 after:border-b-2 after:border-solid after:!border-[#03a9f4] after:transition-transform after:duration-200 after:ease-out after:content-[''] focus-within:after:scale-x-100";

export const UNDERLINE_HOVER = "hover:before:border-b-2 hover:before:!border-[rgba(0,0,0,0.87)]";

export const UNDERLINE_DISABLED = "before:border-dotted";

/** <TextField> (standard): FormControl + optional InputLabel + Input. */
export const TextField = ({
    value,
    onChange,
    onKeyDown,
    onClick,
    placeholder,
    type = "text",
    disabled,
    readOnly,
    fullWidth,
    disableUnderline,
    label,
    className,
    rootClassName,
    inputClassName,
    endAdornment,
    inputMode,
    pattern,
    autoFocus,
    inputRef,
    id,
}: {
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    readOnly?: boolean;
    fullWidth?: boolean;
    disableUnderline?: boolean;
    label?: string;
    className?: string;
    rootClassName?: string;
    inputClassName?: string;
    endAdornment?: ReactNode;
    inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
    pattern?: string;
    autoFocus?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    id?: string;
}) => {
    const [focused, setFocused] = useState(false);
    const filled = value !== undefined && value !== null && String(value) !== "";
    return (
        <div
            className={clsx(
                "relative m-0 inline-flex min-w-0 flex-col border-0 p-0 align-top",
                fullWidth && "w-full",
                className,
            )}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={clsx(
                        "pointer-events-none absolute left-0 top-0 z-[1] block max-w-full origin-top-left overflow-hidden text-ellipsis whitespace-nowrap p-0 text-[1rem] leading-[1.4375em] tracking-[0.00938em] transition-[color,transform] duration-200",
                        focused || filled ? "translate-y-[-1.5px] scale-75" : "translate-y-5",
                        disabled ? "text-[rgba(0,0,0,0.38)]" : focused ? "text-[#03a9f4]" : "text-[rgba(0,0,0,0.6)]",
                    )}
                >
                    {label}
                </label>
            )}
            <div
                onClick={onClick}
                className={clsx(
                    "relative box-border inline-flex cursor-text items-center text-[1rem] leading-[1.4375em] tracking-[0.00938em]",
                    disabled ? "cursor-default text-[rgba(0,0,0,0.38)]" : "text-[rgba(0,0,0,0.87)]",
                    !disableUnderline && UNDERLINE,
                    !disableUnderline && (disabled ? UNDERLINE_DISABLED : UNDERLINE_HOVER),
                    label && "mt-4",
                    fullWidth && "w-full",
                    rootClassName,
                )}
            >
                <input
                    id={id}
                    ref={inputRef}
                    type={type}
                    value={value ?? ""}
                    onChange={onChange ?? (() => {})}
                    onKeyDown={onKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    inputMode={inputMode}
                    pattern={pattern}
                    autoFocus={autoFocus}
                    className={clsx(
                        "m-0 box-content block h-[1.4375em] w-full min-w-0 border-0 bg-transparent px-0 pb-[5px] pt-1 font-[inherit] tracking-[inherit] text-current outline-0 placeholder:text-current placeholder:opacity-[0.42] disabled:opacity-100",
                        inputClassName,
                    )}
                />
                {endAdornment}
            </div>
        </div>
    );
};

/** <TextField variant="outlined">, single or multiline, with the floating
    label sitting in a notch of the border. */
export const OutlinedTextField = ({
    value,
    onChange,
    onKeyDown,
    placeholder,
    label,
    multiline,
    rows,
    minRows,
    disabled,
    fullWidth,
    className,
    inputClassName,
    error,
    size,
}: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    label?: string;
    multiline?: boolean;
    rows?: number;
    minRows?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
    inputClassName?: string;
    error?: boolean;
    size?: "small";
}) => {
    const [focused, setFocused] = useState(false);
    const shrink = focused || value !== "";
    const small = size === "small";
    const field = clsx(
        "m-0 block w-full min-w-0 resize-none border-0 bg-transparent p-0 font-[inherit] tracking-[inherit] text-current outline-0 placeholder:text-current placeholder:opacity-[0.42] focus:placeholder:opacity-[0.42]",
        !shrink && label && "placeholder:opacity-0",
        inputClassName,
    );
    const common = {
        value,
        onChange,
        onKeyDown,
        disabled,
        placeholder,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
    };
    return (
        <div
            className={clsx(
                "relative m-0 inline-flex min-w-0 flex-col border-0 p-0 align-top",
                fullWidth && "w-full",
                className,
            )}
        >
            {label && (
                <label
                    className={clsx(
                        "pointer-events-none absolute left-0 top-0 z-[1] block max-w-[calc(100%-24px)] origin-top-left overflow-hidden text-ellipsis whitespace-nowrap text-[1rem] leading-[1.4375em] tracking-[0.00938em] transition-[color,transform,max-width] duration-200",
                        shrink
                            ? "max-w-[calc(133%-32px)] translate-x-[14px] translate-y-[-9px] scale-75"
                            : small
                              ? "translate-x-[14px] translate-y-[9px]"
                              : "translate-x-[14px] translate-y-4",
                        error ? "text-[#d32f2f]" : focused ? "text-[#03a9f4]" : "text-[rgba(0,0,0,0.6)]",
                    )}
                >
                    {label}
                </label>
            )}
            <div
                className={clsx(
                    "group/outlined relative box-border flex cursor-text items-center rounded-[4px] text-[1rem] leading-[1.4375em] tracking-[0.00938em]",
                    disabled ? "text-[rgba(0,0,0,0.38)]" : "text-[rgba(0,0,0,0.87)]",
                    multiline ? (small ? "px-[14px] py-[8.5px]" : "px-[14px] py-[16.5px]") : "",
                )}
            >
                {multiline ? (
                    // No rows: TextareaAutosize grows with the text (minRows
                    // sets the floor).
                    <textarea
                        {...common}
                        rows={rows ?? 1}
                        className={clsx(field, !rows && "[field-sizing:content]")}
                        style={!rows && minRows ? { minHeight: `${minRows * 1.4375}em` } : undefined}
                    />
                ) : (
                    <input
                        {...common}
                        className={clsx(field, "box-content h-[1.4375em]", small ? "px-[14px] py-[8.5px]" : "px-[14px] py-[16.5px]")}
                    />
                )}
                <fieldset
                    aria-hidden="true"
                    className={clsx(
                        "pointer-events-none absolute inset-x-0 bottom-0 top-[-5px] m-0 min-w-0 overflow-hidden rounded-[inherit] border border-solid px-2 py-0 text-left",
                        error
                            ? "!border-[#d32f2f]"
                            : focused
                              ? "border-2 !border-[#03a9f4]"
                              : "!border-[rgba(0,0,0,0.23)] group-hover/outlined:!border-[rgba(0,0,0,0.87)]",
                        focused && error && "border-2",
                    )}
                >
                    <legend
                        className={clsx(
                            "invisible float-none block h-[11px] w-auto overflow-hidden whitespace-nowrap p-0 text-[0.75em]",
                            label && shrink ? "max-w-full" : "max-w-[0.01px]",
                        )}
                    >
                        {label ? <span className="inline-block px-[5px] opacity-0">{label}</span> : <span>&#8203;</span>}
                    </legend>
                </fieldset>
            </div>
        </div>
    );
};
