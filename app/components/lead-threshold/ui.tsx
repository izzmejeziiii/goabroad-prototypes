import Link from "next/link";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";

/* Shared building blocks, copied from gacom-admin-redesign PR 784
   (src/views/ClientAdmin/Dashboard/DashboardCard.js) plus the MUI pieces the
   client admin leans on (Chip, Tooltip), restyled to MUI's measurements.

   GoAbroad pass on the dashboard: the card, button and link styles of
   goabroad.com's own components (gacom-next components/mygoabroad): Inter,
   slate text, flat white cards with a slate-200 border and rounded-xl
   corners, rounded-lg cobalt buttons in sentence case, arrow links. Every
   class is Tailwind v3-safe and uses only tokens gacom-admin's config
   already has, so it ports back as is. */

/** goabroad.com's focus ring. */
export const FOCUS_RING =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2";

/** In-row text links (View lead, Add). */
export const TEXT_LINK = `rounded-sm text-sm font-semibold text-cobalt-500 no-underline underline-offset-2 transition-colors hover:text-cobalt-700 hover:underline ${FOCUS_RING}`;

/** goabroad.com's primary button, sized for a dashboard row. */
export const PRIMARY_BUTTON = `inline-flex items-center justify-center rounded-lg bg-cobalt-500 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-cobalt-600 hover:text-white ${FOCUS_RING}`;

/** goabroad.com's secondary (outlined slate) button. */
export const SECONDARY_BUTTON = `inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 no-underline transition-colors hover:border-slate-400 hover:bg-slate-50 ${FOCUS_RING}`;

export const SectionTitle = ({
    id,
    children,
}: {
    id?: string;
    children: ReactNode;
}) => (
    <h2
        id={id}
        className="mb-4 text-xl font-bold tracking-tight text-neutral-800"
    >
        {children}
    </h2>
);

/** "View all …" / "Manage in profile": goabroad.com's arrow link, the arrow
    nudging right on hover. */
export const CardLink = ({
    href,
    external,
    className,
    children,
    ...rest
}: {
    href: string;
    external?: boolean;
    className?: string;
    children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">) => {
    const classes = clsx(
        "group inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm text-sm font-semibold text-cobalt-500 no-underline transition-colors hover:text-cobalt-700",
        FOCUS_RING,
        className,
    );
    const content = (
        <>
            {children}
            <FiArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
            />
        </>
    );

    if (external)
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
                {...rest}
            >
                {content}
            </a>
        );

    return (
        <Link href={href} className={classes} {...rest}>
            {content}
        </Link>
    );
};

export const DashboardCard = ({
    title,
    action,
    className,
    children,
    ...rest
}: {
    title?: ReactNode;
    action?: ReactNode;
    className?: string;
    children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "title">) => (
    <section
        className={clsx(
            "flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white",
            className,
        )}
        {...rest}
    >
        {(title || action) && (
            <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                <h3 className="text-base font-semibold text-neutral-800">
                    {title}
                </h3>
                {action}
            </header>
        )}
        <div className="flex flex-1 flex-col">{children}</div>
    </section>
);

/* ── EnhancedChip (src/components/EnhancedChip) on MUI's Chip ──────────────
   Theme overrides: 0.7rem, uppercase, min-height 25. Outlined chips get a
   1px border and 11px label padding; filled ones 12px. */

type ChipType =
    | "basic"
    | "trial"
    | "starter"
    | "standard"
    | "enhanced"
    | "enterprise"
    | "positive"
    | "negative"
    | "neutral"
    | "none";

const CHIP_COLORS: Record<
    ChipType,
    { outlined: [string, string]; filled: [string, string] }
> = {
    // [border, text] when outlined; [background, border] when filled
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
};

export const Chip = ({
    label,
    type,
    borderStyle = "solid",
    variant,
    className,
}: {
    label: string;
    type: ChipType;
    borderStyle?: "solid" | "dashed";
    variant?: "filled";
    className?: string;
}) => {
    const colors = CHIP_COLORS[type];
    const style =
        variant === "filled"
            ? {
                  backgroundColor: colors.filled[0],
                  borderColor: colors.filled[1],
                  color: "#fff",
              }
            : {
                  backgroundColor: "transparent",
                  borderColor: colors.outlined[0],
                  color: colors.outlined[1],
              };

    return (
        <span
            className={clsx(
                "inline-flex h-8 min-h-[25px] max-w-full items-center justify-center whitespace-nowrap rounded-2xl align-middle text-[0.7rem] uppercase",
                variant === "filled" ? "border-0 px-3" : "border px-[11px]",
                className,
            )}
            style={{ ...style, borderStyle }}
        >
            {label}
        </span>
    );
};

const SUBSCRIPTION_CHIPS: Record<number, { label: string; type: ChipType }> = {
    0: { label: "Legacy", type: "neutral" },
    1: { label: "Basic", type: "basic" },
    2: { label: "Trial", type: "trial" },
    3: { label: "Starter", type: "starter" },
    4: { label: "Standard", type: "standard" },
    5: { label: "Enhanced", type: "enhanced" },
    6: { label: "Enterprise", type: "enterprise" },
};

export const SubscriptionChip = ({
    level,
    variant,
}: {
    level: number;
    variant?: "filled";
}) => {
    const chip = SUBSCRIPTION_CHIPS[level];
    if (!chip) return null;
    return <Chip label={chip.label} type={chip.type} variant={variant} />;
};

export const VerificationChip = ({
    status,
}: {
    status: number | "Pending";
}) =>
    status === 5 ? (
        <Chip label="VERIFIED" type="positive" borderStyle="dashed" />
    ) : status === "Pending" ? (
        <Chip label="PENDING" type="neutral" borderStyle="dashed" />
    ) : (
        <Chip label="UNVERIFIED" type="negative" borderStyle="dashed" />
    );

/* ── MUI Tooltip, hover/focus only ─────────────────────────────────────────
   rgba(97,97,97,0.92), 11px medium, 4px 8px padding, 14px off the anchor. */

const TOOLTIP_PLACEMENT = {
    bottom: "left-1/2 top-full mt-[14px] -translate-x-1/2",
    top: "bottom-full left-1/2 mb-[14px] -translate-x-1/2",
    right: "left-full top-1/2 ml-[14px] -translate-y-1/2",
};

export const Tooltip = ({
    title,
    placement = "bottom",
    className,
    children,
}: {
    title: string;
    placement?: keyof typeof TOOLTIP_PLACEMENT;
    className?: string;
    children: ReactNode;
}) => (
    <span className={clsx("group/tooltip relative inline-flex", className)}>
        {children}
        <span
            role="tooltip"
            className={clsx(
                "pointer-events-none absolute z-[1500] whitespace-nowrap rounded-sm bg-[rgba(97,97,97,0.92)] px-2 py-1 text-[0.6875rem] font-medium leading-[1.4em] text-white opacity-0 transition-opacity delay-100 duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
                TOOLTIP_PLACEMENT[placement],
            )}
        >
            {title}
        </span>
    </span>
);
