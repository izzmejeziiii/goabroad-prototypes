"use client";

/**
 * Version 4 — full-width donate band.
 *
 * The other versions all keep the form in the one-third sidebar, and that
 * column is the constraint: at ~340px the original flat form is over 1000px
 * tall, which is what pushed the Donate button off screen in the first place.
 *
 * This version stops using the column. The whole form moves to a band across
 * the top of the campaign body, laid out in three columns — progress, then
 * amount + tip, then payment + details + total + CTA. Every field from the
 * original is on screen at once and the CTA sits in the top right, in view the
 * moment the page loads. Nothing is hidden, nothing is pinned, nothing scrolls.
 *
 * The band renders into the `#ayu-donate-band` slot the page puts above the
 * grid, so this component still plugs into the same sidebar slot as the others
 * — what stays in the sidebar is Share and Recent Donations.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Check, Heart } from "../icons";
import { QuickDonateButtons } from "../QuickDonateButtons";
import { Checkbox } from "../ui/Checkbox";
import { daysLeft } from "../utils";
import {
    Chip,
    Field,
    FundingHeader,
    GuaranteePanel,
    RecentDonationsCard,
    ShareCard,
    TIP_PRESETS,
    fmtC,
    useDonationTotals,
    type SidebarCampaign,
} from "./shared";

export function CampaignDetailSidebarBand({
    campaign,
    isLoggedIn,
}: {
    campaign: SidebarCampaign;
    isLoggedIn: boolean;
}) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
    const [tipPercent, setTipPercent] = useState<number>(15);
    const [customTip, setCustomTip] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">(
        "stripe",
    );
    const [guestEmail, setGuestEmail] = useState("");
    const [guestName, setGuestName] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState("");
    const [errors, setErrors] = useState<{ email?: string; name?: string }>({});
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [slot, setSlot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSlot(document.getElementById("ayu-donate-band"));
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    const days = daysLeft(campaign.end_date);
    const ended = days <= 0;
    const donors = Number(campaign.donor_count ?? 0);
    const { goal, collected, percent, donationCents, tipCents, totalCents } =
        useDonationTotals(campaign, selectedAmount, tipPercent, customTip);

    function handleDonate() {
        if (!isLoggedIn) {
            const next: { email?: string; name?: string } = {};
            if (!guestEmail.trim()) next.email = "Enter your email address.";
            if (!guestName.trim()) next.name = "Enter your name.";
            setErrors(next);
            if (next.email || next.name) {
                (next.email ? emailRef : nameRef).current?.focus();
                return;
            }
        }
        // Prototype: no payment provider is wired up.
        setLoading(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            timer.current = null;
            setLoading(false);
            setNotice("Prototype — no payment was processed.");
        }, 900);
    }

    const band = (
        <section
            className="mb-8 rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm md:p-8"
            aria-labelledby="donate-band-title"
        >
            <h2 id="donate-band-title" className="sr-only">
                Donate to this campaign
            </h2>

            {ended ? (
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    <div>
                        <FundingHeader
                            collected={collected}
                            goal={goal}
                            percent={percent}
                            donors={donors}
                            days={days}
                        />
                    </div>
                    <p className="rounded-xl bg-[#EAF0EA] px-4 py-3 text-center text-sm font-medium text-[#1A3628] lg:col-span-2">
                        This campaign has ended.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#e8ecea]">
                    {/* ── 1. Where the campaign stands ── */}
                    <div className="lg:pr-8">
                        <FundingHeader
                            collected={collected}
                            goal={goal}
                            percent={percent}
                            donors={donors}
                            days={days}
                        />
                        {/* Fills the column and puts the trust note beside the
                            form rather than further down the page. */}
                        <GuaranteePanel />
                    </div>

                    {/* ── 2. Amount and tip ── */}
                    <div className="space-y-5 border-t border-[#e8ecea] pt-6 lg:border-t-0 lg:px-8 lg:pt-0">
                        <QuickDonateButtons
                            onSelectAmount={(a) => {
                                setSelectedAmount(a);
                                setNotice("");
                            }}
                            loading={loading}
                            selectedAmount={selectedAmount}
                        />

                        <div>
                            <p className="text-sm font-semibold text-[#1A3628]">
                                Add a tip to support AYU Giving
                            </p>
                            <p className="mt-0.5 text-xs text-[#6b7a72]">
                                Optional, separate from your donation. 100%
                                funds platform operations.
                            </p>
                            <div
                                className="mt-2 flex flex-wrap gap-2"
                                role="group"
                                aria-label="Tip selection"
                            >
                                {TIP_PRESETS.map((p) => (
                                    <Chip
                                        key={p}
                                        selected={tipPercent === p}
                                        onClick={() => setTipPercent(p)}
                                    >
                                        {p === 0 ? "No tip" : `${p}%`}
                                    </Chip>
                                ))}
                                <Chip
                                    selected={tipPercent === -1}
                                    onClick={() => setTipPercent(-1)}
                                >
                                    Custom
                                </Chip>
                            </div>
                            {tipPercent === -1 && (
                                <div className="relative mt-2">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6b7a72]">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={customTip}
                                        onChange={(e) =>
                                            setCustomTip(e.target.value)
                                        }
                                        aria-label="Custom tip amount in dollars"
                                        className="w-full rounded-xl border border-[#e8ecea] bg-[#FFFCF5] py-2.5 pl-7 pr-3 text-sm text-[#1A3628] focus:border-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c]/30"
                                    />
                                </div>
                            )}
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 text-sm text-[#1A3628]">
                            <Checkbox
                                checked={isAnonymous}
                                onCheckedChange={(c) =>
                                    setIsAnonymous(c === true)
                                }
                                className="mt-0.5"
                            />
                            <span>
                                Make this donation anonymous{" "}
                                <span className="text-[#6b7a72]">
                                    — your name won&apos;t be shown publicly.
                                </span>
                            </span>
                        </label>
                    </div>

                    {/* ── 3. Payment, details and the CTA ── */}
                    <div className="space-y-4 border-t border-[#e8ecea] pt-6 lg:border-t-0 lg:pl-8 lg:pt-0">
                        <div>
                            <p className="mb-2 text-sm font-semibold text-[#1A3628]">
                                Pay with
                            </p>
                            <div
                                className="grid grid-cols-2 gap-2"
                                role="group"
                                aria-label="Payment method"
                            >
                                {(
                                    [
                                        ["stripe", "Card"],
                                        ["paypal", "PayPal"],
                                    ] as const
                                ).map(([value, label]) => {
                                    const active = paymentMethod === value;
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() =>
                                                setPaymentMethod(value)
                                            }
                                            aria-pressed={active}
                                            className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                                                active
                                                    ? "border-[#1f5a2c] bg-[#EAF0EA] text-[#1f5a2c]"
                                                    : "border-[#e8ecea] bg-white text-[#1A3628] hover:border-[#1f5a2c]/40"
                                            }`}
                                        >
                                            {active && (
                                                <Check
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {!isLoggedIn && (
                            <div className="space-y-3">
                                <Field
                                    id="band-guest-email"
                                    label="Email"
                                    type="email"
                                    value={guestEmail}
                                    onChange={(v) => {
                                        setGuestEmail(v);
                                        setErrors((e) => ({
                                            ...e,
                                            email: undefined,
                                        }));
                                    }}
                                    placeholder="your@email.com"
                                    error={errors.email}
                                    inputRef={emailRef}
                                />
                                <Field
                                    id="band-guest-name"
                                    label="Name"
                                    value={guestName}
                                    onChange={(v) => {
                                        setGuestName(v);
                                        setErrors((e) => ({
                                            ...e,
                                            name: undefined,
                                        }));
                                    }}
                                    placeholder="Your name"
                                    error={errors.name}
                                    inputRef={nameRef}
                                />
                            </div>
                        )}

                        <dl className="space-y-1 rounded-xl bg-[#FFFCF5] p-4 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-[#6b7a72]">Donation</dt>
                                <dd className="font-medium text-[#1A3628]">
                                    {fmtC(donationCents)}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#6b7a72]">Tip</dt>
                                <dd className="font-medium text-[#1A3628]">
                                    {fmtC(tipCents)}
                                </dd>
                            </div>
                            <div className="flex justify-between border-t border-[#e8ecea] pt-1">
                                <dt className="font-semibold text-[#1A3628]">
                                    Total
                                </dt>
                                <dd className="text-base font-extrabold text-[#1A3628]">
                                    {fmtC(totalCents)}
                                </dd>
                            </div>
                        </dl>

                        <button
                            type="button"
                            onClick={handleDonate}
                            disabled={loading || !selectedAmount}
                            aria-busy={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5a2c] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#184823] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2 disabled:opacity-50"
                        >
                            <Heart className="h-4 w-4" aria-hidden="true" />
                            {loading
                                ? "Processing…"
                                : `Donate ${fmtC(totalCents)}`}
                        </button>

                        {notice && (
                            <p
                                className="flex items-center justify-center gap-1.5 text-sm font-medium text-[#1f5a2c]"
                                role="status"
                                aria-live="polite"
                            >
                                <Check className="h-4 w-4" aria-hidden="true" />
                                {notice}
                            </p>
                        )}

                        {!isLoggedIn && (
                            <p className="text-center text-xs text-[#6b7a72]">
                                Have an account?{" "}
                                <Link
                                    href="#"
                                    className="font-medium text-[#1f5a2c] hover:underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );

    return (
        <>
            {slot && createPortal(band, slot)}

            {/* The donate form left the column, so the sidebar keeps the rest.
                The guarantee moved into the band, so it isn't repeated here. */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                <ShareCard campaign={campaign} withGuarantee={false} />
                <RecentDonationsCard />
            </div>
        </>
    );
}
