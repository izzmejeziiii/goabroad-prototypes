"use client";

// Pieces every sidebar version shares: the funding header, the trust note, and
// the Share / Recent Donations cards. Keeping them here means the versions
// differ only in how the donate form itself is structured, which is the whole
// point of the comparison.

import { useState } from "react";
import Link from "next/link";
import { Clock, Share2, ShieldCheck, Users } from "../icons";
import { ShareButtons } from "../ShareButtons";
import { RecentDonations } from "../RecentDonations";

export interface SidebarCampaign {
    id: string;
    slug: string;
    title?: string;
    organization_name?: string;
    organization_slug?: string | null;
    end_date: string;
    goal_amount: number;
    collected?: number;
    donor_count?: number;
}

export const APP_URL = "https://ayugiving.org";
export const TIP_PRESETS = [0, 10, 12, 15, 20] as const;
export const fmtC = (c: number) => `$${(c / 100).toFixed(2)}`;

export function useDonationTotals(
    campaign: SidebarCampaign,
    selectedAmount: number | null,
    tipPercent: number,
    customTip: string,
) {
    const goal = Number(campaign.goal_amount);
    const collected = Number(campaign.collected ?? 0);
    const donationCents = selectedAmount ? Math.round(selectedAmount * 100) : 0;
    const tipCents =
        tipPercent === -1
            ? Math.max(0, Math.round((parseFloat(customTip) || 0) * 100))
            : Math.round((donationCents * tipPercent) / 100);
    return {
        goal,
        collected,
        donationCents,
        tipCents,
        totalCents: donationCents + tipCents,
        percent: goal > 0 ? Math.min(100, Math.round((collected / goal) * 100)) : 0,
    };
}

/** Raised / goal, the progress bar and the three headline stats. */
export function FundingHeader({
    collected,
    goal,
    percent,
    donors,
    days,
    compact,
}: {
    collected: number;
    goal: number;
    percent: number;
    donors: number;
    days: number;
    /** Collapse the three stat tiles into a single line of text. */
    compact?: boolean;
}) {
    const raisedDollars = (collected / 100).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const goalDollars = (goal / 100).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return (
        <>
            <p className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-[#1A3628]">
                    ${raisedDollars}
                </span>
                <span className="text-sm text-[#6b7a72]">
                    of ${goalDollars} goal
                </span>
            </p>

            <div
                className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#EAF0EA]"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Donation progress"
            >
                <div
                    className="h-full rounded-full bg-linear-to-r from-[#1f5a2c] to-[#6FAE7A] transition-[width] duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>

            {compact ? (
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6b7a72]">
                    <span className="font-bold text-[#1A3628]">{percent}%</span>
                    funded
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                        <Users
                            className="h-3.5 w-3.5 text-[#1f5a2c]"
                            aria-hidden="true"
                        />
                        <span className="font-bold text-[#1A3628]">
                            {donors}
                        </span>
                        {donors === 1 ? "donor" : "donors"}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                        <Clock
                            className="h-3.5 w-3.5 text-[#1f5a2c]"
                            aria-hidden="true"
                        />
                        <span className="font-bold text-[#1A3628]">
                            {days > 0 ? days : 0}
                        </span>
                        {days > 0 ? "days left" : "ended"}
                    </span>
                </p>
            ) : (
                <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#FFFCF5] p-3 text-center">
                    <div>
                        <p className="text-base font-bold text-[#1A3628]">
                            {percent}%
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[#6b7a72]">
                            Funded
                        </p>
                    </div>
                    <div className="border-x border-[#e8ecea]">
                        <p className="inline-flex items-center justify-center gap-1 text-base font-bold text-[#1A3628]">
                            <Users
                                className="h-3.5 w-3.5 text-[#1f5a2c]"
                                aria-hidden="true"
                            />
                            {donors}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[#6b7a72]">
                            {donors === 1 ? "Donor" : "Donors"}
                        </p>
                    </div>
                    <div>
                        <p className="inline-flex items-center justify-center gap-1 text-base font-bold text-[#1A3628]">
                            <Clock
                                className="h-3.5 w-3.5 text-[#1f5a2c]"
                                aria-hidden="true"
                            />
                            {days > 0 ? days : 0}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[#6b7a72]">
                            {days > 0 ? "Days left" : "Ended"}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

/** One-line trust note, for versions that put it next to the CTA. */
export function GuaranteeNote() {
    return (
        <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-[#6b7a72]">
            <ShieldCheck
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1f5a2c]"
                aria-hidden="true"
            />
            <span>
                <span className="font-semibold text-[#1f5a2c]">
                    AYU Guarantee
                </span>{" "}
                — donations are protected. If something goes wrong, we&apos;ll
                make it right.
            </span>
        </p>
    );
}

/** The full trust panel, as it appears in the original Share card. */
export function GuaranteePanel() {
    return (
        <div className="mt-6 flex gap-3 rounded-xl bg-[#FFFCF5] p-5">
            <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0EA] text-[#1f5a2c]"
                aria-hidden="true"
            >
                <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
                <p className="text-sm font-semibold text-[#1f5a2c]">
                    AYU Guarantee
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#6b7a72]">
                    Donations are protected. If something goes wrong, we&apos;ll
                    work with you to make it right.
                </p>
            </div>
        </div>
    );
}

export function ShareCard({
    campaign,
    withGuarantee = true,
}: {
    campaign: SidebarCampaign;
    withGuarantee?: boolean;
}) {
    const [showShare, setShowShare] = useState(false);
    const base = campaign.organization_slug
        ? `/campaigns/${campaign.organization_slug}/${campaign.slug}`
        : `/campaigns/${campaign.slug}`;

    return (
        <div className="rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm">
            <button
                type="button"
                onClick={() => setShowShare((v) => !v)}
                aria-expanded={showShare}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1B211A] bg-white px-5 py-3.5 text-sm font-semibold text-[#1B211A] transition-colors hover:border-[#1f5a2c] hover:text-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2"
            >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share Campaign
            </button>

            {showShare && (
                <div className="mt-4">
                    <ShareButtons
                        url={`${APP_URL}${base}`}
                        title={campaign.title || "Support this campaign"}
                    />
                </div>
            )}

            {withGuarantee && <GuaranteePanel />}
        </div>
    );
}

export function RecentDonationsCard() {
    return (
        <div className="rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1A3628]">
                    Recent Donations
                </h3>
                <Link
                    href="#"
                    className="text-xs font-semibold text-[#1f5a2c] hover:underline"
                >
                    See All
                </Link>
            </div>
            <RecentDonations limit={5} showHeader={false} />
        </div>
    );
}

/** Shared chip styling for the tip / payment pickers. */
export function Chip({
    selected,
    onClick,
    children,
    ariaLabel,
}: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            aria-label={ariaLabel}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                selected
                    ? "border-[#1f5a2c] bg-[#1f5a2c] text-white"
                    : "border-[#e8ecea] text-[#6b7a72] hover:border-[#1f5a2c]/40 hover:bg-[#EAF0EA]"
            }`}
        >
            {children}
        </button>
    );
}

/** Labelled text input with inline validation copy. */
export function Field({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    inputRef,
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    error?: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1 block text-xs font-medium text-[#1A3628]"
            >
                {label}{" "}
                <span className="text-red-500" aria-hidden="true">
                    *
                </span>
                <span className="sr-only">(required)</span>
            </label>
            <input
                id={id}
                ref={inputRef}
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-required="true"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#1A3628] placeholder:text-[#6b7a72] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c]/30 ${
                    error
                        ? "border-[#dc2828] focus:border-[#dc2828]"
                        : "border-[#e8ecea] focus:border-[#1f5a2c]"
                }`}
            />
            {error && (
                <p id={`${id}-error`} className="mt-1 text-xs text-[#dc2828]">
                    {error}
                </p>
            )}
        </div>
    );
}
