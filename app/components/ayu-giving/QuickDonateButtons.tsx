"use client";

import { useState } from "react";
import { StarIcon } from "./icons";

const PRESET_AMOUNTS = [10, 25, 50, 100];
const RECOMMENDED_AMOUNT = 25;

interface QuickDonateButtonsProps {
    onSelectAmount: (amount: number) => void;
    loading?: boolean;
    selectedAmount?: number | null;
    /** Suppress the "Select amount" heading when the caller already labels the group. */
    hideLabel?: boolean;
}

export function QuickDonateButtons({
    onSelectAmount,
    loading,
    selectedAmount,
    hideLabel,
}: QuickDonateButtonsProps) {
    const [customOpen, setCustomOpen] = useState(false);
    const [customAmount, setCustomAmount] = useState("");

    function handlePresetClick(amount: number) {
        setCustomOpen(false);
        onSelectAmount(amount);
    }

    function handleCustomSubmit(e: React.FormEvent) {
        e.preventDefault();
        const val = parseFloat(customAmount);
        if (!isNaN(val) && val >= 1) {
            onSelectAmount(val);
        }
    }

    return (
        <div className="space-y-3">
            {!hideLabel && (
                <p className="text-sm font-semibold text-[#1A3628]">
                    Select amount
                </p>
            )}

            {/* Preset amount buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRESET_AMOUNTS.map((amount) => {
                    const isSelected = selectedAmount === amount;
                    const isRecommended = amount === RECOMMENDED_AMOUNT;
                    return (
                        <button
                            key={amount}
                            type="button"
                            disabled={loading}
                            onClick={() => handlePresetClick(amount)}
                            aria-pressed={isSelected}
                            aria-label={`Donate $${amount}${isRecommended ? " (recommended)" : ""}`}
                            className={`
                flex min-h-[48px] items-center justify-center gap-1 rounded-xl border text-base font-bold transition-all
                ${
                    isSelected
                        ? "border-[#1f5a2c] bg-[#1f5a2c] text-white shadow-sm"
                        : isRecommended
                          ? "border-[#1f5a2c] bg-white text-[#1f5a2c] hover:bg-[#EAF0EA]"
                          : "border-[#e8ecea] bg-white text-[#1A3628] hover:border-[#1f5a2c]/40 hover:bg-[#EAF0EA]"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
                        >
                            <span aria-hidden="true">${amount}</span>
                            {isRecommended && (
                                <StarIcon
                                    className={`h-3.5 w-3.5 ${isSelected ? "fill-white text-white" : "fill-[#1f5a2c] text-[#1f5a2c]"}`}
                                    aria-hidden="true"
                                />
                            )}
                            <span className="sr-only">
                                {isRecommended ? " recommended" : ""}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Custom amount toggle */}
            <button
                type="button"
                disabled={loading}
                onClick={() => setCustomOpen((o) => !o)}
                aria-pressed={customOpen}
                aria-expanded={customOpen}
                aria-controls="custom-amount-form"
                className={`
          flex min-h-[48px] w-full items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-all
          ${
              customOpen
                  ? "border-[#1f5a2c] bg-[#EAF0EA] text-[#1f5a2c]"
                  : "border-dashed border-[#cdd8d1] bg-white text-[#1A3628] hover:border-[#1f5a2c] hover:text-[#1f5a2c]"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
            >
                Custom amount
            </button>

            {/* Custom amount input */}
            {customOpen && (
                <form
                    id="custom-amount-form"
                    onSubmit={handleCustomSubmit}
                    className="flex items-center gap-2"
                    aria-label="Custom donation amount"
                >
                    <div className="relative flex-1">
                        <span
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6b7a72]"
                            aria-hidden="true"
                        >
                            $
                        </span>
                        <label htmlFor="custom-amount" className="sr-only">
                            Custom donation amount in dollars
                        </label>
                        <input
                            id="custom-amount"
                            type="number"
                            min="1"
                            step="1"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter amount"
                            autoFocus
                            aria-describedby="custom-amount-hint"
                            className="min-h-[48px] w-full rounded-xl border border-[#e8ecea] bg-[#FFFCF5] py-3 pl-7 pr-3 text-sm text-[#1A3628] placeholder:text-[#6b7a72] focus:border-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c]/30"
                        />
                    </div>
                    <span id="custom-amount-hint" className="sr-only">
                        Minimum donation is $1
                    </span>
                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !customAmount ||
                            parseFloat(customAmount) < 1
                        }
                        aria-busy={loading}
                        className="min-h-[48px] whitespace-nowrap rounded-xl bg-[#1f5a2c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#184823] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Processing…" : "Set"}
                    </button>
                </form>
            )}
        </div>
    );
}
