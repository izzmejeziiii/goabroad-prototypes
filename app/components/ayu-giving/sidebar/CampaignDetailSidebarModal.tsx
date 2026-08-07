"use client";

/**
 * Version 3 — short sidebar, checkout in a dialog.
 *
 * V1 and V2 both try to fit the whole donation flow into a one-third column.
 * V1 hid it behind accordion rows and needed a floating bar to keep the CTA
 * reachable; V2 paced it over steps. This version stops trying: the sidebar
 * only ever holds the funding progress, the amount picker and one button, so it
 * is short by construction and always fully visible with nothing pinned and
 * nothing to scroll. Everything after the amount opens in a dialog — centred on
 * desktop, a bottom sheet on mobile — where there is room for it.
 */

import { useRef, useState } from "react";
import { Heart } from "../icons";
import { daysLeft } from "../utils";
import { DonateModal } from "./DonateModal";
import {
    FundingHeader,
    RecentDonationsCard,
    ShareCard,
    useDonationTotals,
    type SidebarCampaign,
} from "./shared";

/** Dummy impact copy — the kind of line a campaign would supply per tier. */
const PRESETS: { amount: number; impact: string; recommended?: boolean }[] = [
    { amount: 10, impact: "Two tap-stand filters" },
    { amount: 25, impact: "A month of water for a family", recommended: true },
    { amount: 50, impact: "A day of drilling crew wages" },
    { amount: 100, impact: "A full solar pump panel" },
];

export function CampaignDetailSidebarModal({
    campaign,
    isLoggedIn,
}: {
    campaign: SidebarCampaign;
    isLoggedIn: boolean;
}) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
    const [customAmount, setCustomAmount] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const amountRef = useRef<HTMLDivElement>(null);
    const customRef = useRef<HTMLInputElement>(null);

    const days = daysLeft(campaign.end_date);
    const ended = days <= 0;
    const donors = Number(campaign.donor_count ?? 0);
    const { goal, collected, percent } = useDonationTotals(
        campaign,
        selectedAmount,
        0,
        "",
    );

    const customActive = customAmount.trim().length > 0;

    function pickPreset(amount: number) {
        setSelectedAmount(amount);
        setCustomAmount("");
        setError("");
    }

    function onCustomChange(v: string) {
        setCustomAmount(v);
        const parsed = parseFloat(v);
        setSelectedAmount(!isNaN(parsed) && parsed >= 1 ? parsed : null);
        setError("");
    }

    function openCheckout() {
        if (!selectedAmount) {
            setError("Choose an amount to continue.");
            customRef.current?.focus();
            return;
        }
        setModalOpen(true);
    }

    /** "Change" inside the dialog brings the donor back here. */
    function returnToAmount() {
        setModalOpen(false);
        amountRef.current?.scrollIntoView({ block: "nearest" });
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Short enough to pin whole — no max-height, no internal scroll. */}
            <div className="rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm lg:sticky lg:top-28">
                <FundingHeader
                    collected={collected}
                    goal={goal}
                    percent={percent}
                    donors={donors}
                    days={days}
                />

                {ended ? (
                    <p className="mt-5 rounded-xl bg-[#EAF0EA] px-4 py-3 text-center text-sm font-medium text-[#1A3628]">
                        This campaign has ended.
                    </p>
                ) : (
                    <div
                        ref={amountRef}
                        className="mt-5 border-t border-[#e8ecea] pt-5"
                    >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6b7a72]">
                            Choose an amount
                        </p>
                        <div
                            className="grid grid-cols-2 gap-2"
                            role="group"
                            aria-label="Donation amount"
                        >
                            {PRESETS.map((p) => {
                                const active =
                                    !customActive &&
                                    selectedAmount === p.amount;
                                return (
                                    <button
                                        key={p.amount}
                                        type="button"
                                        onClick={() => pickPreset(p.amount)}
                                        aria-pressed={active}
                                        aria-label={`Donate $${p.amount} — ${p.impact}`}
                                        className={`relative flex min-h-[64px] flex-col items-start justify-center gap-0.5 rounded-xl border px-3 py-2 text-left transition-colors ${
                                            active
                                                ? "border-[#1f5a2c] bg-[#1f5a2c] text-white"
                                                : "border-[#e8ecea] bg-white text-[#1A3628] hover:border-[#1f5a2c]/40 hover:bg-[#EAF0EA]"
                                        }`}
                                    >
                                        <span className="text-lg font-bold leading-none">
                                            ${p.amount}
                                        </span>
                                        <span
                                            className={`text-[11px] leading-tight ${
                                                active
                                                    ? "text-white/80"
                                                    : "text-[#6b7a72]"
                                            }`}
                                        >
                                            {p.impact}
                                        </span>
                                        {p.recommended && (
                                            <span
                                                className={`absolute right-2 top-2 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                                                    active
                                                        ? "bg-white/20 text-white"
                                                        : "bg-[#EAF0EA] text-[#1f5a2c]"
                                                }`}
                                            >
                                                Popular
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative mt-2">
                            <span
                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6b7a72]"
                                aria-hidden="true"
                            >
                                $
                            </span>
                            <label
                                htmlFor="modal-sidebar-custom"
                                className="sr-only"
                            >
                                Custom donation amount in dollars
                            </label>
                            <input
                                id="modal-sidebar-custom"
                                ref={customRef}
                                type="number"
                                min="1"
                                step="1"
                                value={customAmount}
                                onChange={(e) => onCustomChange(e.target.value)}
                                placeholder="Other amount"
                                className={`w-full rounded-xl border bg-white py-2.5 pl-7 pr-3 text-sm text-[#1A3628] placeholder:text-[#6b7a72] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c]/30 ${
                                    customActive
                                        ? "border-[#1f5a2c]"
                                        : "border-[#e8ecea] focus:border-[#1f5a2c]"
                                }`}
                            />
                        </div>

                        {error && (
                            <p
                                className="mt-2 text-xs text-[#dc2828]"
                                role="alert"
                                aria-live="polite"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={openCheckout}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5a2c] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#184823] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2"
                        >
                            <Heart className="h-4 w-4" aria-hidden="true" />
                            {selectedAmount
                                ? `Donate $${selectedAmount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                                : "Donate"}
                        </button>
                    </div>
                )}
            </div>

            {/* Guarantee panel stays in the Share card, as in the original. */}
            <ShareCard campaign={campaign} />
            <RecentDonationsCard />

            <DonateModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onChangeAmount={returnToAmount}
                campaignTitle={campaign.title ?? "This campaign"}
                amount={selectedAmount ?? 0}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
}
