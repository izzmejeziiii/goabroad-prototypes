import Link from "next/link";
import type { ReactNode } from "react";
import { MdCheckCircle } from "react-icons/md";
import { BASE_PATH, attention, renewalInvoice } from "../data";
import clsx from "clsx";
import { CountBadge, DashboardCard, PRIMARY_BUTTON } from "../ui";
import RenewalCallout from "./RenewalInvoice";

/* Copy of Dashboard/NeedsAttention.js on PR 784: one row per item with a
   count above zero, in the spec's order, each with a button to the filtered
   tab; "You're all set" when every count is zero. */

export const NEW_REVIEWS_WINDOW_DAYS = 30;

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const plural = (count: number, singular: string, pluralForm: string) =>
    `${count} ${count === 1 ? singular : pluralForm}`;

/* Counts that need action read in coral; good news (new reviews) in fern.
   Both are the -700 shades, which pass AA on white (secondary-600 was
   4.2:1). */
const TONE = {
    urgent: "text-secondary-700",
    good: "text-fern-700",
};

const AttentionRow = ({
    count,
    children,
    action,
    href,
    tone = "urgent",
}: {
    count: ReactNode;
    children: ReactNode;
    action: string;
    href: string;
    tone?: keyof typeof TONE;
}) => (
    <li className="flex items-center justify-between gap-4 px-5 py-4">
        <p className="text-sm text-slate-600">
            <span className={`font-semibold ${TONE[tone]}`}>{count}</span>{" "}
            {children}
        </p>
        <Link href={href} className={clsx(PRIMARY_BUTTON, "min-w-[9rem] shrink-0")}>
            {action}
        </Link>
    </li>
);

const NeedsAttention = ({ className }: { className?: string }) => {
    // A due renewal invoice gets the callout at the top of the card, which
    // takes the place of the plain "balance due" row.
    const showRenewal = !!renewalInvoice;
    const {
        expiringPrograms,
        expiringAds,
        overdueInvoices,
        balanceDue,
        newReviews,
    } = attention;

    const rows = [
        expiringPrograms > 0 && (
            <AttentionRow
                key="programs"
                count={plural(expiringPrograms, "program", "programs")}
                action="Renew programs"
                href={`${BASE_PATH}/programs?listing_status=expiring`}
            >
                {expiringPrograms === 1 ? "is" : "are"} expiring soon
            </AttentionRow>
        ),
        expiringAds > 0 && (
            <AttentionRow
                key="ads"
                count={plural(expiringAds, "ad", "ads")}
                action="Renew ads"
                href={`${BASE_PATH}/ads?status=expiring`}
            >
                {expiringAds === 1 ? "is" : "are"} expiring soon
            </AttentionRow>
        ),
        overdueInvoices > 0 && (
            <AttentionRow
                key="invoices"
                count={plural(overdueInvoices, "invoice", "invoices")}
                action="Pay invoices"
                href={`${BASE_PATH}/invoices?payment_status=overdue`}
            >
                {overdueInvoices === 1 ? "is" : "are"} overdue
            </AttentionRow>
        ),
        !showRenewal &&
            !overdueInvoices &&
            balanceDue &&
            balanceDue.amount > 0 && (
                <AttentionRow
                    key="balance"
                    count={currency.format(balanceDue.amount)}
                    action="Pay invoices"
                    href={`${BASE_PATH}/invoices?payment_status=unpaid`}
                >
                    {balanceDue.dueDate
                        ? `is due on ${balanceDue.dueDate}`
                        : "is due"}
                </AttentionRow>
            ),
        newReviews > 0 && (
            <AttentionRow
                key="reviews"
                count={plural(newReviews, "new review", "new reviews")}
                action="See reviews"
                href={`${BASE_PATH}/reviews`}
                tone="good"
            >
                {newReviews === 1 ? "was" : "were"} published in the last{" "}
                {NEW_REVIEWS_WINDOW_DAYS} days
            </AttentionRow>
        ),
    ].filter(Boolean);
    // The renewal callout counts as one item alongside the rows.
    const itemCount = rows.length + (showRenewal ? 1 : 0);

    return (
        <DashboardCard
            title={
                <>
                    Needs Your Attention
                    {itemCount > 0 && (
                        <CountBadge
                            value={itemCount}
                            label={itemCount === 1 ? "item" : "items"}
                            tone="attention"
                        />
                    )}
                </>
            }
            className={className}
        >
            {showRenewal && <RenewalCallout />}
            {rows.length > 0 ? (
                <ul className="divide-y divide-slate-100">{rows}</ul>
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-1 px-5 py-8 text-center">
                    <MdCheckCircle className="size-6 text-fern-600" />
                    <p className="text-sm font-semibold text-neutral-800">
                        You&apos;re all set
                    </p>
                    <p className="text-sm text-slate-500">
                        Nothing needs your attention right now.
                    </p>
                </div>
            )}
        </DashboardCard>
    );
};

export default NeedsAttention;
