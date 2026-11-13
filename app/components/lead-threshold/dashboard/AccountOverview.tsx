import Link from "next/link";
import clsx from "clsx";
import { MdChevronRight } from "react-icons/md";
import { BASE_PATH, overviewStats, overviewTypes } from "../data";
import type { OverviewType } from "../types";
import { CardLink, DashboardCard, FOCUS_RING, SectionTitle } from "../ui";

/* Copy of Dashboard/AccountOverview.js on PR 784: the six status cards with
   STATS_TYPE's labels, row order and colours, every row clickable, and a
   "View all" link per card. Interviews and articles open in a new tab, like
   the real links to the public provider page. */

type StatusColor = "success" | "pending" | "primary" | "error" | "";

const STATS_TYPE: Record<
    OverviewType,
    { label: string; colors: Record<string, StatusColor>; external?: boolean }
> = {
    programs: {
        label: "Programs",
        colors: {
            approved: "success",
            pending: "pending",
            expiring: "primary",
            expired: "error",
            draft: "",
        },
    },
    ads: {
        label: "Ads",
        colors: { active: "success", scheduled: "primary", expired: "error" },
    },
    invoices: {
        label: "Invoices",
        colors: { paid: "success", partial: "pending", unpaid: "", overdue: "error" },
    },
    reviews: {
        label: "Reviews",
        colors: { approved: "success", inactive: "error", not_checked: "error" },
    },
    interviews: {
        label: "Interviews",
        colors: { published: "success" },
        external: true,
    },
    articles: {
        label: "Articles",
        colors: { published: "success" },
        external: true,
    },
};

// GoAbroad's review moderation queue, which clients don't see.
const HIDDEN_STATUSES: Partial<Record<OverviewType, string[]>> = {
    reviews: ["not_checked"],
};

/* Same green / blue / red as before, one shade darker so each passes AA on
   white (fern-600 was 3.2:1, cobalt-200 4.2:1, secondary-600 4.2:1). */
const STATUS_COLOR_CLASSES: Partial<Record<StatusColor, string>> = {
    success: "text-fern-700",
    primary: "text-cobalt-500",
    error: "text-secondary-700",
};

// MUI's capitalize(key.replace('_c', ' C'))
const formatStatusLabel = (key: string) => {
    const label = key.replace("_c", " C");
    return label.charAt(0).toUpperCase() + label.slice(1);
};

const FILTER_PARAM: Record<OverviewType, string> = {
    programs: "listing_status",
    ads: "status",
    invoices: "payment_status",
    reviews: "status",
    interviews: "",
    articles: "",
};

const viewAllLink = (type: OverviewType) => `${BASE_PATH}/${type}`;

const rowLink = (type: OverviewType, key: string) => {
    // Reviews' "approved" row links to the unfiltered list, as before.
    if (STATS_TYPE[type].external || (type === "reviews" && key === "approved"))
        return viewAllLink(type);
    return `${viewAllLink(type)}?${FILTER_PARAM[type]}=${key}`;
};

const OverviewCard = ({ type }: { type: OverviewType }) => {
    const { label, colors, external } = STATS_TYPE[type];
    const stats = overviewStats[type];
    const statuses = Object.keys(colors).filter(
        (key) => !(HIDDEN_STATUSES[type] ?? []).includes(key),
    );

    return (
        <DashboardCard title={label}>
            <ul className="flex flex-1 flex-col gap-0.5 p-3">
                {statuses.map((key) => {
                    const classes = clsx(
                        "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm no-underline transition-colors hover:bg-slate-50",
                        FOCUS_RING,
                        STATUS_COLOR_CLASSES[colors[key]] ?? "text-slate-700",
                    );
                    // Counts in tabular figures so they line up down the
                    // card; the chevron stays quiet until the row is hovered.
                    const content = (
                        <>
                            <span>{formatStatusLabel(key)}:</span>
                            <span className="ml-auto flex items-center font-semibold tabular-nums">
                                {Number(stats[key]) || 0}
                                <MdChevronRight className="-mr-1 size-5 text-slate-300 transition-colors group-hover:text-slate-500" />
                            </span>
                        </>
                    );
                    return (
                        <li key={key}>
                            {external ? (
                                <a
                                    href={rowLink(type, key)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes}
                                >
                                    {content}
                                </a>
                            ) : (
                                <Link href={rowLink(type, key)} className={classes}>
                                    {content}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
            {/* CardLink draws the arrow that replaces the old "›" */}
            <div className="border-t border-slate-100 px-5 py-3">
                <CardLink href={viewAllLink(type)} external={external}>
                    View all {label}
                </CardLink>
            </div>
        </DashboardCard>
    );
};

const AccountOverview = () => (
    <section aria-labelledby="account-overview-title">
        <SectionTitle id="account-overview-title">Account Overview</SectionTitle>
        {/* Six across only from 2xl (1536px). Below that a sixth of the row
            is too narrow for "View all Interviews ›", so it stays 3 × 2. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {overviewTypes.map((type) => (
                <OverviewCard key={type} type={type} />
            ))}
        </div>
    </section>
);

export default AccountOverview;
