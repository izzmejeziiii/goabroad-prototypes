"use client";

/**
 * Version 2 — step-by-step form.
 *
 * The accordion is gone. The donate card shows one step at a time with a
 * progress indicator, so each step gets the full width of the card instead of
 * being squeezed into a collapsed row, and the CTA sits in normal flow at the
 * bottom of the step rather than in a floating bar.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Heart } from "../icons";
import { QuickDonateButtons } from "../QuickDonateButtons";
import { Checkbox } from "../ui/Checkbox";
import { daysLeft } from "../utils";
import {
    Chip,
    Field,
    FundingHeader,
    RecentDonationsCard,
    ShareCard,
    TIP_PRESETS,
    fmtC,
    useDonationTotals,
    type SidebarCampaign,
} from "./shared";

type StepId = "amount" | "payment" | "details";

export function CampaignDetailSidebarStepper({
    campaign,
    isLoggedIn,
}: {
    campaign: SidebarCampaign;
    isLoggedIn: boolean;
}) {
    const [step, setStep] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
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

    const days = daysLeft(campaign.end_date);
    const ended = days <= 0;
    const donors = Number(campaign.donor_count ?? 0);
    const { goal, collected, percent, donationCents, tipCents, totalCents } =
        useDonationTotals(campaign, selectedAmount, tipPercent, customTip);

    const steps: { id: StepId; title: string; hint: string }[] = [
        {
            id: "amount",
            title: "Choose an amount",
            hint: "Pick a preset or enter your own.",
        },
        {
            id: "payment",
            title: "Tip & payment",
            hint: "Tipping is optional and separate from your donation.",
        },
        ...(isLoggedIn
            ? []
            : [
                  {
                      id: "details" as StepId,
                      title: "Your details",
                      hint: "We'll email your receipt and campaign updates here.",
                  },
              ]),
    ];
    const current = steps[step];
    const isLast = step === steps.length - 1;

    function goNext() {
        setNotice("");
        if (current.id === "amount" && !selectedAmount) return;
        setStep((s) => Math.min(s + 1, steps.length - 1));
    }

    function goBack() {
        setNotice("");
        setStep((s) => Math.max(s - 1, 0));
    }

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
        // Prototype: no payment provider is wired up, so the button runs its
        // busy state and reports back instead of redirecting to checkout.
        setLoading(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            timer.current = null;
            setLoading(false);
            setNotice("Prototype — no payment was processed.");
        }, 900);
    }

    return (
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:[scrollbar-gutter:stable]">
            <div className="rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm">
                <FundingHeader
                    collected={collected}
                    goal={goal}
                    percent={percent}
                    donors={donors}
                    days={days}
                />

                {ended ? (
                    <p className="mt-6 rounded-xl bg-[#EAF0EA] px-4 py-3 text-center text-sm font-medium text-[#1A3628]">
                        This campaign has ended.
                    </p>
                ) : (
                    <div className="mt-6 border-t border-[#e8ecea] pt-6">
                        {/* ── Step indicator ── */}
                        <div className="mb-4">
                            <div
                                className="flex gap-1.5"
                                role="progressbar"
                                aria-valuenow={step + 1}
                                aria-valuemin={1}
                                aria-valuemax={steps.length}
                                aria-label={`Step ${step + 1} of ${steps.length}`}
                            >
                                {steps.map((s, i) => (
                                    <span
                                        key={s.id}
                                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                                            i <= step
                                                ? "bg-[#1f5a2c]"
                                                : "bg-[#EAF0EA]"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[#6b7a72]">
                                Step {step + 1} of {steps.length}
                            </p>
                            <h3 className="mt-0.5 text-base font-bold text-[#1A3628]">
                                {current.title}
                            </h3>
                            <p className="mt-1 text-xs text-[#6b7a72]">
                                {current.hint}
                            </p>
                        </div>

                        {/* ── Step body ── */}
                        {current.id === "amount" && (
                            <QuickDonateButtons
                                onSelectAmount={(a) => {
                                    setSelectedAmount(a);
                                    setNotice("");
                                }}
                                loading={loading}
                                selectedAmount={selectedAmount}
                                hideLabel
                            />
                        )}

                        {current.id === "payment" && (
                            <div className="space-y-5">
                                <div>
                                    <p className="mb-2 text-xs font-medium text-[#1A3628]">
                                        Tip to AYU Giving
                                    </p>
                                    <div
                                        className="flex flex-wrap gap-2"
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

                                <div>
                                    <p className="mb-2 text-xs font-medium text-[#1A3628]">
                                        Pay with
                                    </p>
                                    <div
                                        className="flex gap-2"
                                        role="group"
                                        aria-label="Payment method"
                                    >
                                        {(
                                            [
                                                ["stripe", "Card"],
                                                ["paypal", "PayPal"],
                                            ] as const
                                        ).map(([value, label]) => (
                                            <Chip
                                                key={value}
                                                selected={
                                                    paymentMethod === value
                                                }
                                                onClick={() =>
                                                    setPaymentMethod(value)
                                                }
                                            >
                                                {label}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {current.id === "details" && (
                            <div className="space-y-3">
                                <Field
                                    id="step-guest-email"
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
                                    id="step-guest-name"
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
                                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e8ecea] px-4 py-3 text-sm text-[#1A3628]">
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
                                            — your name won&apos;t be shown
                                            publicly.
                                        </span>
                                    </span>
                                </label>
                            </div>
                        )}

                        {/* ── Running summary, from the moment there's an amount ── */}
                        {selectedAmount && (
                            <dl className="mt-5 space-y-1.5 rounded-xl bg-[#FFFCF5] p-4 text-sm">
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
                                <div className="flex justify-between border-t border-[#e8ecea] pt-1.5">
                                    <dt className="font-semibold text-[#1A3628]">
                                        Total
                                    </dt>
                                    <dd className="font-bold text-[#1A3628]">
                                        {fmtC(totalCents)}
                                    </dd>
                                </div>
                            </dl>
                        )}

                        {notice && (
                            <p
                                className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#1f5a2c]"
                                role="status"
                                aria-live="polite"
                            >
                                <Check className="h-4 w-4" aria-hidden="true" />
                                {notice}
                            </p>
                        )}

                        {/* ── Step controls, in normal flow ── */}
                        <div className="mt-6 flex items-center gap-3 border-t border-[#e8ecea] pt-5">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#e8ecea] px-4 py-3 text-sm font-semibold text-[#1A3628] transition-colors hover:border-[#1f5a2c] hover:text-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2"
                                >
                                    <ArrowLeft
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Back
                                </button>
                            )}
                            {isLast ? (
                                <button
                                    type="button"
                                    onClick={handleDonate}
                                    disabled={loading || !selectedAmount}
                                    aria-busy={loading}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1f5a2c] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#184823] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2 disabled:opacity-50"
                                >
                                    <Heart
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    {loading
                                        ? "Processing…"
                                        : `Donate ${fmtC(totalCents)}`}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={
                                        current.id === "amount" &&
                                        !selectedAmount
                                    }
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1f5a2c] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#184823] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2 disabled:opacity-50"
                                >
                                    Continue
                                    <ArrowRight
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            )}
                        </div>

                        {!isLoggedIn && isLast && (
                            <p className="mt-3 text-center text-xs text-[#6b7a72]">
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
                )}
            </div>

            <ShareCard campaign={campaign} />
            <RecentDonationsCard />
        </div>
    );
}
