"use client";

/**
 * The checkout dialog for V3. Everything after the amount lives here: tip,
 * payment, donor details, the total and the CTA.
 *
 * A dialog is the one surface on this page that can be sized to its content
 * without fighting anything else — it is centred on desktop, a bottom sheet on
 * mobile, and if it ever does need to scroll that reads as normal dialog
 * behaviour rather than a cramped panel.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Check, Heart, ShieldCheck, X } from "../icons";
import { Checkbox } from "../ui/Checkbox";
import { Chip, Field, TIP_PRESETS, fmtC } from "./shared";

export function DonateModal({
    open,
    onClose,
    onChangeAmount,
    campaignTitle,
    amount,
    isLoggedIn,
}: {
    open: boolean;
    onClose: () => void;
    /** Sends the donor back to the sidebar's amount picker. */
    onChangeAmount: () => void;
    campaignTitle: string;
    amount: number;
    isLoggedIn: boolean;
}) {
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
    const panelRef = useRef<HTMLDivElement>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    // Escape to close, Tab kept inside the dialog, focus restored on the way
    // out, and the page behind held still.
    useEffect(() => {
        if (!open) return;
        const opener = document.activeElement as HTMLElement | null;
        const panel = panelRef.current;
        panel?.focus();

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key !== "Tab" || !panel) return;
            const focusables = panel.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
            opener?.focus();
        };
    }, [open, onClose]);

    const donationCents = Math.round(amount * 100);
    const tipCents =
        tipPercent === -1
            ? Math.max(0, Math.round((parseFloat(customTip) || 0) * 100))
            : Math.round((donationCents * tipPercent) / 100);
    const totalCents = donationCents + tipCents;

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

    if (!mounted || !open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
            <div
                className="absolute inset-0 bg-[#1a1f1c]/50"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="donate-modal-title"
                className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl focus:outline-none sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-2xl"
            >
                {/* Header — stays put while the body scrolls */}
                <div className="flex items-start justify-between gap-4 border-b border-[#e8ecea] px-6 py-4">
                    <div className="min-w-0">
                        <h2
                            id="donate-modal-title"
                            className="text-lg font-bold text-[#1A3628]"
                        >
                            Complete your donation
                        </h2>
                        <p className="mt-0.5 truncate text-xs text-[#6b7a72]">
                            {campaignTitle}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#6b7a72] transition-colors hover:bg-[#EAF0EA] hover:text-[#1f5a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5a2c]"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
                    {/* Amount, with a way back to the picker */}
                    <div className="flex items-center justify-between gap-3 rounded-xl bg-[#FFFCF5] px-4 py-2.5">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7a72]">
                                Your donation
                            </p>
                            <p className="text-xl font-extrabold text-[#1A3628]">
                                {fmtC(donationCents)}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onChangeAmount}
                            className="rounded-lg px-2 py-1 text-sm font-semibold text-[#1f5a2c] transition-colors hover:bg-[#EAF0EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5a2c]"
                        >
                            Change
                        </button>
                    </div>

                    {/* Two columns from sm up — the horizontal room is what
                        keeps the whole checkout inside one view. Stacks on
                        mobile, where the sheet scrolls as expected. */}
                    <div className="mt-2 grid gap-4 sm:grid-cols-2 sm:gap-x-6">
                        <div className="space-y-4">
                            {/* Tip */}
                            <div>
                                <div className="mb-2 flex items-baseline justify-between gap-2">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7a72]">
                                        Tip to AYU Giving
                                    </p>
                                    <p className="text-xs font-semibold text-[#1f5a2c]">
                                        {fmtC(tipCents)}
                                    </p>
                                </div>
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
                                <p className="mt-1.5 text-[11px] text-[#6b7a72]">
                                    Optional — funds AYU&apos;s platform costs.
                                </p>
                            </div>

                            {/* Payment */}
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6b7a72]">
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
                                                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
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
                        </div>

                        <div className="space-y-4">
                            {/* Donor details */}
                            {!isLoggedIn && (
                                <div>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6b7a72]">
                                        Your details
                                    </p>
                                    <div className="space-y-3">
                                        <Field
                                            id="modal-guest-email"
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
                                            id="modal-guest-name"
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
                                </div>
                            )}

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
                    </div>
                </div>

                {/* Footer — the total and the CTA never leave the dialog */}
                <div className="border-t border-[#e8ecea] bg-white px-6 py-4">
                    <dl className="mb-2.5 space-y-1 text-sm">
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
                        disabled={loading}
                        aria-busy={loading}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5a2c] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#184823] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2 disabled:opacity-50"
                    >
                        <Heart className="h-4 w-4" aria-hidden="true" />
                        {loading ? "Processing…" : `Donate ${fmtC(totalCents)}`}
                    </button>

                    {notice && (
                        <p
                            className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-[#1f5a2c]"
                            role="status"
                            aria-live="polite"
                        >
                            <Check className="h-4 w-4" aria-hidden="true" />
                            {notice}
                        </p>
                    )}

                    <p className="mt-2.5 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-[#6b7a72]">
                        <ShieldCheck
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1f5a2c]"
                            aria-hidden="true"
                        />
                        <span>
                            <span className="font-semibold text-[#1f5a2c]">
                                AYU Guarantee
                            </span>{" "}
                            — donations are protected.
                        </span>
                    </p>

                    {!isLoggedIn && (
                        <p className="mt-2 text-center text-xs text-[#6b7a72]">
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
        </div>,
        document.body,
    );
}
