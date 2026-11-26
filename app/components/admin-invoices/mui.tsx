"use client";

import clsx from "clsx";
import {
    useEffect,
    useSyncExternalStore,
    type ButtonHTMLAttributes,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { mdyLong } from "./format";
import type { PaymentStatusName, PendingPayment } from "./types";

/* The MUI v6 pieces gacom-admin's invoice pages use, rebuilt in Tailwind to
   MUI's measurements and the admin's theme (src/theme.js): lightBlue primary,
   pink secondary, the 0 2px 15px rgba(0,0,0,.05) shadow on Paper, Card,
   AppBar and Menu, 0.875rem body1, grey[800] text. Wrap pages in `lt-root`
   (globals.css), which pins the CssBaseline type and Tailwind v3's grays.

   MUI colour names used below: lightBlue 50 #e1f5fe, 300 #4fc3f7,
   500 #03a9f4, 600 #039be5, 700 #0288d1; pink 500 #e91e63, 700 #c2185b;
   green 500 #4caf50, 700 #388e3c; grey 200 #eeeeee, 300 #e0e0e0,
   400 #bdbdbd, 500 #9e9e9e, 600 #757575, 800 #424242. */

/* ── Typography ───────────────────────────────────────────────────────── */

/** variant="h6" (theme: grey[800] when no colour is given). */
export const H6 = "text-[1.25rem] font-medium leading-[1.6] tracking-[0.0075em] text-[#424242]";
/** variant="body1" with the theme's 0.875rem override. */
export const BODY1 = "text-[0.875rem] leading-[1.5] tracking-[0.00938em] text-[#424242]";
/** variant="body2". */
export const BODY2 = "text-[0.875rem] leading-[1.43] tracking-[0.01071em] text-[#424242]";
/** variant="overline": 11px, grey[500] unless a class recolours it. */
export const OVERLINE = "text-[11px] font-normal uppercase leading-[2.66] tracking-[0.08333em] text-[#9e9e9e]";
/** variant="subtitle2". */
export const SUBTITLE2 = "text-[0.875rem] font-medium leading-[1.57] tracking-[0.00714em] text-[#424242]";
/** variant="caption". */
export const CAPTION = "text-[0.75rem] leading-[1.66] tracking-[0.03333em] text-[#424242]";

/* ── Surfaces ─────────────────────────────────────────────────────────── */

export const SHADOW = "shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]";

/** <Paper> (elevation 1, the theme's soft shadow, 4px corners). */
export const Paper = ({
    className,
    children,
    ...rest
}: { className?: string; children?: ReactNode } & React.ComponentPropsWithRef<"div">) => (
    <div className={clsx("rounded-[4px] bg-white text-[rgba(0,0,0,0.87)]", SHADOW, className)} {...rest}>
        {children}
    </div>
);

/** <Divider />. */
export const Divider = ({ className }: { className?: string }) => (
    <hr className={clsx("m-0 shrink-0 border-0 border-b border-solid !border-[rgba(0,0,0,0.12)]", className)} />
);

/* ── Table ────────────────────────────────────────────────────────────── */

/** TableCell root with the theme override (padding 16, line-height 1.3). */
export const CELL = "border-b border-solid !border-[rgba(224,224,224,1)] p-4 align-middle leading-[1.3]";
/** TableCell in the body: 0.8215rem. */
export const TD = `${CELL} text-[0.8215rem] text-[rgba(0,0,0,0.87)]`;
/** TableCell in the head: 0.75rem medium, rgba(0,0,0,.54), line-height 1. */
export const TH = `${CELL} text-[0.75rem] font-medium !leading-none text-[rgba(0,0,0,0.54)]`;

/* ── Buttons ──────────────────────────────────────────────────────────── */

type ButtonColor = "primary" | "secondary" | "success" | "inherit";
type ButtonVariant = "contained" | "outlined" | "text";
type ButtonSize = "small" | "medium" | "large";

const BTN_BASE =
    "relative box-border inline-flex min-w-16 shrink-0 select-none items-center justify-center rounded-[4px] font-medium uppercase leading-[1.75] tracking-[0.02857em] no-underline transition-[background-color,box-shadow,border-color,color] duration-[250ms] disabled:pointer-events-none";

const BTN_SIZE: Record<ButtonVariant, Record<ButtonSize, string>> = {
    contained: {
        small: "px-[10px] py-1 text-[0.8125rem]",
        medium: "px-4 py-[6px] text-[0.875rem]",
        large: "px-[22px] py-2 text-[0.9375rem]",
    },
    outlined: {
        small: "px-[9px] py-[3px] text-[0.8125rem]",
        medium: "px-[15px] py-[5px] text-[0.875rem]",
        large: "px-[21px] py-[7px] text-[0.9375rem]",
    },
    text: {
        small: "px-[5px] py-1 text-[0.8125rem]",
        medium: "px-2 py-[6px] text-[0.875rem]",
        large: "px-[11px] py-2 text-[0.9375rem]",
    },
};

const CONTAINED_SHADOW =
    "shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] hover:shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.2),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)]";

const BTN_COLOR: Record<ButtonVariant, Record<ButtonColor, string>> = {
    contained: {
        primary: `bg-[#03a9f4] !text-white hover:bg-[#0288d1] disabled:!bg-[#e0e0e0] disabled:!text-[#9e9e9e] disabled:shadow-none ${CONTAINED_SHADOW}`,
        secondary: `bg-[#e91e63] !text-white hover:bg-[#c2185b] disabled:!bg-[#e0e0e0] disabled:!text-[#9e9e9e] disabled:shadow-none ${CONTAINED_SHADOW}`,
        success: `bg-[#4caf50] !text-white hover:bg-[#388e3c] disabled:!bg-[#e0e0e0] disabled:!text-[#9e9e9e] disabled:shadow-none ${CONTAINED_SHADOW}`,
        inherit: `bg-[#e0e0e0] text-[rgba(0,0,0,0.87)] hover:bg-[#f5f5f5] ${CONTAINED_SHADOW}`,
    },
    outlined: {
        primary: "border border-solid !border-[rgba(3,169,244,0.5)] !text-[#03a9f4] hover:!border-[#03a9f4] hover:bg-[rgba(3,169,244,0.04)] disabled:!border-[rgba(0,0,0,0.12)] disabled:!text-[rgba(0,0,0,0.26)]",
        secondary: "border border-solid !border-[rgba(233,30,99,0.5)] !text-[#e91e63] hover:!border-[#e91e63] hover:bg-[rgba(233,30,99,0.04)] disabled:!border-[rgba(0,0,0,0.12)] disabled:!text-[rgba(0,0,0,0.26)]",
        success: "border border-solid !border-[rgba(76,175,80,0.5)] !text-[#4caf50] hover:!border-[#4caf50] hover:bg-[rgba(76,175,80,0.04)]",
        inherit: "border border-solid !border-[rgba(0,0,0,0.23)] text-inherit hover:bg-[rgba(0,0,0,0.04)]",
    },
    text: {
        primary: "!text-[#03a9f4] hover:bg-[rgba(3,169,244,0.04)] disabled:!text-[rgba(0,0,0,0.26)]",
        secondary: "!text-[#e91e63] hover:bg-[rgba(233,30,99,0.04)] disabled:!text-[rgba(0,0,0,0.26)]",
        success: "!text-[#4caf50] hover:bg-[rgba(76,175,80,0.04)]",
        inherit: "text-inherit hover:bg-[rgba(0,0,0,0.04)] disabled:!text-[rgba(0,0,0,0.26)]",
    },
};

export const buttonClasses = ({
    variant = "text",
    color = "primary",
    size = "medium",
    fullWidth,
    className,
}: {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    fullWidth?: boolean;
    className?: string;
}) =>
    clsx(
        BTN_BASE,
        BTN_SIZE[variant][size],
        BTN_COLOR[variant][color],
        fullWidth && "w-full",
        className,
    );

/** <Button>. Defaults to MUI's: text variant, primary colour, medium. */
export const Button = ({
    variant,
    color,
    size,
    fullWidth,
    className,
    type = "button",
    ...rest
}: {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        type={type}
        className={buttonClasses({ variant, color, size, fullWidth, className })}
        {...rest}
    />
);

/** <IconButton>: 8px padding (12 large, 5 small), rgba(0,0,0,.54). */
export const IconButton = ({
    size = "medium",
    className,
    type = "button",
    ...rest
}: { size?: ButtonSize } & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        type={type}
        className={clsx(
            "inline-flex shrink-0 items-center justify-center rounded-full text-[rgba(0,0,0,0.54)] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)] disabled:pointer-events-none disabled:text-[rgba(0,0,0,0.26)]",
            size === "large" ? "p-3" : size === "small" ? "p-[5px]" : "p-2",
            className,
        )}
        {...rest}
    />
);

/* ── EnhancedChip / StatusChip / PendingPaymentChip ───────────────────── */

export type ChipType =
    | "basic"
    | "trial"
    | "starter"
    | "standard"
    | "enhanced"
    | "enterprise"
    | "positive"
    | "negative"
    | "neutral"
    | "none"
    | "muted";

const CHIP_COLORS: Record<ChipType, { outlined: [string, string]; filled: [string, string] }> = {
    // [border, text] outlined; [background, border] filled
    basic: { outlined: ["#9CA3AF", "#9CA3AF"], filled: ["#9CA3AF", "transparent"] },
    trial: { outlined: ["#C4B5FD", "#C4B5FD"], filled: ["#C4B5FD", "transparent"] },
    starter: { outlined: ["#5EEAD4", "#5EEAD4"], filled: ["#5EEAD4", "transparent"] },
    standard: { outlined: ["#60A5FA", "#60A5FA"], filled: ["#60A5FA", "transparent"] },
    enhanced: { outlined: ["#818CF8", "#818CF8"], filled: ["#818CF8", "transparent"] },
    enterprise: { outlined: ["#FBBF24", "#FBBF24"], filled: ["#FBBF24", "transparent"] },
    positive: { outlined: ["#c8e6c9", "#4caf50"], filled: ["#81c784", "#81c784"] },
    negative: { outlined: ["#ffcdd2", "#f44336"], filled: ["#e57373", "#e57373"] },
    neutral: { outlined: ["#ffecb3", "#ffc107"], filled: ["#ffc107", "#ffc107"] },
    none: { outlined: ["#f5f5f5", "#9e9e9e"], filled: ["#e0e0e0", "#e0e0e0"] },
    muted: { outlined: ["#e0e0e0", "#616161"], filled: ["#eeeeee", "#e0e0e0"] },
};

/** src/components/EnhancedChip on MUI's Chip: 32px tall, 0.7rem uppercase
    (theme), outlined with an 11px label pad unless variant="filled". */
export const Chip = ({
    label,
    type,
    borderStyle = "solid",
    variant,
    onClick,
    className,
}: {
    label: string;
    type: ChipType;
    borderStyle?: "solid" | "dashed";
    variant?: "filled";
    onClick?: () => void;
    className?: string;
}) => {
    const colors = CHIP_COLORS[type];
    const muted = type === "muted";
    const style =
        variant === "filled" || muted
            ? {
                  backgroundColor: colors.filled[0],
                  borderColor: colors.filled[1],
                  color: muted ? "#616161" : "#fff",
              }
            : { backgroundColor: "transparent", borderColor: colors.outlined[0], color: colors.outlined[1] };
    return (
        <span
            onClick={onClick}
            role={onClick ? "button" : undefined}
            className={clsx(
                "inline-flex h-8 min-h-[25px] max-w-full items-center justify-center whitespace-nowrap rounded-2xl align-middle text-[0.7rem] uppercase leading-none",
                variant === "filled" ? "border-0 px-3" : "border px-[11px]",
                onClick && "cursor-pointer",
                className,
            )}
            style={{ ...style, borderStyle }}
        >
            {label}
        </span>
    );
};

const PAYMENT_CHIPS: Record<string, { label: string; type: ChipType; border: "solid" | "dashed" }> = {
    paid: { label: "PAID", type: "positive", border: "solid" },
    partial: { label: "PARTIAL", type: "positive", border: "dashed" },
    overdue: { label: "OVERDUE", type: "negative", border: "dashed" },
    unpaid: { label: "UNPAID", type: "negative", border: "solid" },
    draft: { label: "DRAFT", type: "neutral", border: "solid" },
    pending: { label: "PENDING", type: "neutral", border: "dashed" },
    void: { label: "VOID", type: "none", border: "solid" },
};

const SALE_TYPE_CHIPS: Record<number, { label: string; type: ChipType }> = {
    0: { label: "NONE", type: "none" },
    1: { label: "ORGANIC", type: "positive" },
    2: { label: "NURTURED", type: "positive" },
    3: { label: "RENEWED SAME PACKAGE", type: "positive" },
    4: { label: "UPGRADE", type: "positive" },
    5: { label: "DOWNGRADE", type: "negative" },
    6: { label: "NONRENEWABLE", type: "negative" },
    7: { label: "RECOVERED", type: "positive" },
};

/** src/components/StatusChip for type="payment" and type="sale_type".
    Anything the payment map doesn't know (e.g. "near due") falls back to
    UNPAID, as the real component does. */
export const StatusChip = ({
    type,
    status,
    variant,
}: {
    type: "payment" | "sale_type";
    status: PaymentStatusName | number | string;
    variant?: "filled";
}) => {
    if (type === "payment") {
        const chip = PAYMENT_CHIPS[String(status)] ?? PAYMENT_CHIPS.unpaid;
        return <Chip label={chip.label} type={chip.type} borderStyle={chip.border} variant={variant} />;
    }
    const chip = SALE_TYPE_CHIPS[Number(status)] ?? { label: "INVALID", type: "negative" as const };
    return <Chip label={chip.label} type={chip.type} variant={variant} />;
};

/** "Bank payment of $1,200.00 processing since Nov 24, 2026". */
export const pendingPaymentText = (p: PendingPayment) => {
    const since = mdyLong(p.since);
    const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        Number(p.amount) || 0,
    );
    return `Bank payment of ${amount} processing${since ? ` since ${since}` : ""}`;
};

export const PendingPaymentChip = ({ pendingPayment }: { pendingPayment: PendingPayment | null }) =>
    pendingPayment ? (
        <Tooltip title={pendingPaymentText(pendingPayment)}>
            <span data-cy="pending-payment-chip">
                <Chip label="PAYMENT PENDING" type="neutral" borderStyle="dashed" />
            </span>
        </Tooltip>
    ) : null;

/* ── Tooltip (hover/focus) ────────────────────────────────────────────── */

const TOOLTIP_PLACEMENT = {
    bottom: "left-1/2 top-full mt-[14px] -translate-x-1/2",
    top: "bottom-full left-1/2 mb-[14px] -translate-x-1/2",
    right: "left-full top-1/2 ml-[14px] -translate-y-1/2",
    left: "right-full top-1/2 mr-[14px] -translate-y-1/2",
};

/** MUI Tooltip: rgba(97,97,97,.92), 11px medium, 4px 8px, 14px off. */
export const Tooltip = ({
    title,
    placement = "bottom",
    className,
    children,
}: {
    title: ReactNode;
    placement?: keyof typeof TOOLTIP_PLACEMENT;
    className?: string;
    children: ReactNode;
}) =>
    title ? (
        <span className={clsx("group/tooltip relative inline-flex", className)}>
            {children}
            <span
                role="tooltip"
                className={clsx(
                    "pointer-events-none absolute z-[1500] max-w-[300px] whitespace-nowrap rounded-[4px] bg-[rgba(97,97,97,0.92)] px-2 py-1 text-[0.6875rem] font-medium normal-case leading-[1.4em] tracking-normal text-white opacity-0 transition-opacity delay-100 duration-150 group-focus-within/tooltip:opacity-100 group-hover/tooltip:opacity-100",
                    TOOLTIP_PLACEMENT[placement],
                )}
            >
                {title}
            </span>
        </span>
    ) : (
        <>{children}</>
    );

/* ── LinearProgress (indeterminate) ───────────────────────────────────── */

export const LinearProgress = ({ className }: { className?: string }) => (
    <div
        role="progressbar"
        className={clsx("relative h-1 overflow-hidden bg-[#b3e5fc]", className)}
    >
        <span className="absolute inset-y-0 left-0 w-2/5 animate-[ai-indeterminate_1.6s_ease-in-out_infinite] bg-[#03a9f4]" />
        <style>{`@keyframes ai-indeterminate{0%{left:-40%}60%{left:100%}100%{left:100%}}`}</style>
    </div>
);

/* ── Overlays ─────────────────────────────────────────────────────────── */

/** True once in the browser (portals need document.body). */
const usePortal = () =>
    useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

const useEscape = (open: boolean, onClose?: () => void) => {
    useEffect(() => {
        if (!open || !onClose) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);
};

const DIALOG_SHADOW =
    "shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]";

/** MUI <Dialog> paper + backdrop (theme backdrop rgba(0,0,0,.2)). */
export const Dialog = ({
    open,
    onClose,
    paperClassName,
    maxWidth = "max-w-[600px]",
    labelledBy,
    children,
}: {
    open: boolean;
    onClose?: () => void;
    paperClassName?: string;
    maxWidth?: string;
    labelledBy?: string;
    children: ReactNode;
}) => {
    const mounted = usePortal();
    useEscape(open, onClose);
    if (!mounted || !open) return null;
    return createPortal(
        <div className="lt-root fixed inset-0 z-[1300] flex items-center justify-center antialiased" role="presentation">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" aria-hidden="true" onClick={onClose} />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                className={clsx(
                    "relative m-8 flex max-h-[calc(100%-64px)] flex-col overflow-y-auto rounded-[4px] bg-white text-[rgba(0,0,0,0.87)]",
                    DIALOG_SHADOW,
                    maxWidth,
                    paperClassName,
                )}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
};

/** DialogTitle (h6, 16px 24px). */
export const DialogTitle = ({ children, align, id }: { children: ReactNode; align?: "center"; id?: string }) => (
    <h2 id={id} className={clsx(H6, "flex-none px-6 py-4", align === "center" && "text-center")}>
        {children}
    </h2>
);

/** DialogActions (8px padding, buttons spaced 8px, right-aligned). */
export const DialogActions = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={clsx("flex flex-none items-center justify-end gap-2 p-2", className)}>{children}</div>
);

/** src/components/DialogBox: min-width 400, 16px padding, centred title,
    16px content, Ok (contained primary) / Cancel (contained secondary). */
export const DialogBox = ({
    open,
    title,
    contentText,
    children,
    actions = "Ok",
    stringOverride,
    onOk,
    onCancel,
    onClose,
    disableBackdropClick,
    disabledButton,
}: {
    open: boolean;
    title?: string;
    contentText?: ReactNode;
    children?: ReactNode;
    actions?: "" | "Ok" | "OkCancel" | "Cancel";
    stringOverride?: { primaryAction?: string; secondaryAction?: string };
    onOk?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    disableBackdropClick?: boolean;
    disabledButton?: boolean;
}) => (
    <Dialog
        open={open}
        onClose={disableBackdropClick ? undefined : onClose}
        paperClassName="min-w-[400px] p-4"
    >
        {!!title && <DialogTitle align="center">{title}</DialogTitle>}
        {children ? (
            <div className="flex-auto overflow-visible p-4">{children}</div>
        ) : contentText ? (
            <div className="flex-auto overflow-visible p-4">
                <p className="m-0 text-[0.875rem] leading-[1.5] tracking-[0.00938em] text-[rgba(0,0,0,0.6)]">
                    {contentText}
                </p>
            </div>
        ) : null}
        {actions && (
            <DialogActions>
                {(actions === "Ok" || actions === "OkCancel") && (
                    <Button variant="contained" color="primary" onClick={onOk ?? onClose} disabled={disabledButton}>
                        {stringOverride?.primaryAction ?? "Ok"}
                    </Button>
                )}
                {(actions === "Cancel" || actions === "OkCancel") && (
                    <Button variant="contained" color="secondary" onClick={onCancel ?? onClose}>
                        {stringOverride?.secondaryAction ?? "Cancel"}
                    </Button>
                )}
            </DialogActions>
        )}
    </Dialog>
);

/** A temporary right <Drawer> (theme paper shadow 0 2px 15px .07). */
export const Drawer = ({
    open,
    onClose,
    className,
    children,
}: {
    open: boolean;
    onClose?: () => void;
    className?: string;
    children: ReactNode;
}) => {
    const mounted = usePortal();
    useEscape(open, onClose);
    if (!mounted || !open) return null;
    return createPortal(
        <div className="lt-root fixed inset-0 z-[1200] antialiased" role="presentation">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" aria-hidden="true" onClick={onClose} />
            <div
                role="dialog"
                aria-modal="true"
                className={clsx(
                    "absolute right-0 top-0 flex h-full flex-col overflow-y-auto bg-white text-[rgba(0,0,0,0.87)] shadow-[0_2px_15px_0_rgba(0,0,0,0.07)]",
                    className,
                )}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
};

/** A small floating menu anchored under its trigger (MUI Menu paper). */
export const Menu = ({
    open,
    onClose,
    className,
    children,
}: {
    open: boolean;
    onClose: () => void;
    className?: string;
    children: ReactNode;
}) => {
    useEscape(open, onClose);
    if (!open) return null;
    return (
        <>
            <div className="fixed inset-0 z-[1300]" aria-hidden="true" onClick={onClose} />
            <ul
                role="menu"
                className={clsx(
                    "absolute z-[1301] m-0 min-w-[112px] list-none rounded-[4px] bg-white p-0 text-[rgba(0,0,0,0.87)] shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]",
                    className,
                )}
            >
                {children}
            </ul>
        </>
    );
};

/** MenuItem (theme: 0.9rem, 8px padding). */
export const MenuItem = ({
    onClick,
    children,
    className,
}: {
    onClick?: () => void;
    children: ReactNode;
    className?: string;
}) => (
    <li
        role="menuitem"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
        className={clsx(
            "flex min-h-12 cursor-pointer items-center whitespace-nowrap p-2 text-[0.9rem] leading-[1.5] tracking-[0.00938em] hover:bg-[rgba(0,0,0,0.04)] sm:min-h-auto",
            className,
        )}
    >
        {children}
    </li>
);
