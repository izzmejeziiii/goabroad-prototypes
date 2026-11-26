"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* The redesign's look, borrowed from /invoice-tool: Inter, slate text, white
   cards on the slate page, slate-50 side panels, uppercase slate-500 labels,
   goabroad.com's field states, cobalt links and the red main button. The
   admin shell around it stays as it is. */

export const label = "text-xs font-semibold uppercase tracking-wide text-slate-500";
export const card = "rounded-2xl border border-slate-200 bg-white";
export const panel = "rounded-2xl border border-slate-200 bg-slate-50";
export const sectionTitle = "text-lg font-semibold text-slate-900";
export const muted = "text-sm text-slate-500";

/** goabroad.com's field (same string as /invoice-tool's inputClass). */
export const inputClass =
    "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition-shadow placeholder:text-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100 aria-invalid:border-red-600 aria-invalid:text-red-600 aria-invalid:focus:border-red-600 aria-invalid:focus:ring-red-300";

/** A borderless field for dense tables: looks like text until hovered or
    focused. */
export const cellInput =
    "block w-full rounded-md border border-transparent bg-transparent px-2 py-1.5 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 hover:border-gray-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-300 aria-invalid:border-red-600 aria-invalid:bg-white";

export const buttonPrimary =
    "inline-flex items-center justify-center gap-2 rounded-lg bg-roman-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-roman-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-roman-300/60 disabled:cursor-not-allowed disabled:opacity-60";

export const buttonSecondary =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-500/20 disabled:cursor-not-allowed disabled:opacity-60";

/** Dashed "add" button (add item / add placement). */
export const buttonAdd =
    "inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-cobalt-500 transition-colors hover:border-cobalt-500 hover:bg-cobalt-500/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-500/20";

export const textLink =
    "inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-cobalt-500 transition-colors hover:text-cobalt-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500";

export const iconButton =
    "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 disabled:pointer-events-none disabled:opacity-40";

export const errorText = "text-xs font-medium text-red-600";

export const Field = ({
    label: text,
    hint,
    error,
    htmlFor,
    className,
    children,
}: {
    label: ReactNode;
    hint?: ReactNode;
    error?: string;
    htmlFor?: string;
    className?: string;
    children: ReactNode;
}) => (
    <div className={clsx("flex flex-col gap-1.5", className)}>
        <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
            {text}
        </label>
        {children}
        {error ? <p className={errorText}>{error}</p> : hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
);

export const Select = ({
    className,
    dense,
    children,
    ...rest
}: { dense?: boolean } & ComponentPropsWithoutRef<"select">) => (
    <div className={clsx("relative", className)}>
        <select
            {...rest}
            className={clsx(dense ? cellInput : inputClass, "appearance-none pr-8", !rest.value && "text-slate-400")}
        >
            {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
    </div>
);

/** A dollar amount field: "$" inside, right-aligned tabular figures. */
export const MoneyInput = ({
    value,
    onChange,
    dense,
    invalid,
    className,
    ...rest
}: {
    value: number;
    onChange: (n: number) => void;
    dense?: boolean;
    invalid?: boolean;
} & Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange">) => (
    <div className={clsx("relative", className)}>
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
        <input
            {...rest}
            inputMode="decimal"
            aria-invalid={invalid || undefined}
            value={Number.isFinite(value) && value !== 0 ? String(value) : ""}
            placeholder="0.00"
            onChange={(e) => {
                const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
                onChange(Number.isNaN(n) ? 0 : Math.round(n * 100) / 100);
            }}
            className={clsx(dense ? cellInput : inputClass, "pl-6 text-right tabular-nums")}
        />
    </div>
);

export const DateInput = ({
    dense,
    className,
    ...rest
}: { dense?: boolean } & ComponentPropsWithoutRef<"input">) => (
    <input type="date" {...rest} className={clsx(dense ? cellInput : inputClass, "tabular-nums", className)} />
);

/** Segmented control (payment terms). */
export const Segmented = <T extends string>({
    value,
    options,
    onChange,
    name,
}: {
    value: T;
    options: { value: T; label: string }[];
    onChange: (v: T) => void;
    name: string;
}) => (
    <div role="radiogroup" aria-label={name} className="inline-flex rounded-lg bg-slate-100 p-1">
        {options.map((o) => (
            <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={value === o.value}
                onClick={() => onChange(o.value)}
                className={clsx(
                    "rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500",
                    value === o.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900",
                )}
            >
                {o.label}
            </button>
        ))}
    </div>
);

export const Checkbox = ({
    checked,
    onChange,
    children,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    children: ReactNode;
}) => (
    <label className="inline-flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-gray-300 accent-cobalt-500"
        />
        <span>{children}</span>
    </label>
);

/** Small cobalt number dot, as /invoice-tool's How It Works list uses. */
export const StepDot = ({ n }: { n: number }) => (
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-cobalt-500 text-xs font-bold text-white">
        {n}
    </span>
);

/** Status pill in /invoice-tool's tones. */
export const Pill = ({ tone, children }: { tone: "draft" | "neutral" | "fern" | "roman"; children: ReactNode }) => (
    <span
        className={clsx(
            "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
            tone === "draft" && "bg-sun-200 text-cobalt-700",
            tone === "neutral" && "bg-slate-100 text-slate-700",
            tone === "fern" && "bg-fern-200/45 text-fern-700",
            tone === "roman" && "bg-roman-200/45 text-roman-700",
        )}
    >
        {children}
    </span>
);
