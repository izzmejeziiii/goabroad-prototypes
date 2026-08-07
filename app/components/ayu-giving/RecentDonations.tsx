"use client";

import { recentDonations, type RecentDonation } from "./data";

interface RecentDonationsProps {
    limit?: number;
    showHeader?: boolean;
}

// The live component fetches /api/campaigns/slug/…/donors and renders a
// LoadingSkeleton while in flight. Here the list is a fixed fixture, so only
// the loaded state exists.
export function RecentDonations({
    limit = 5,
    showHeader = true,
}: RecentDonationsProps) {
    const donations: RecentDonation[] = recentDonations.slice(0, limit);

    if (donations.length === 0) {
        return (
            <div className="space-y-3">
                {showHeader && (
                    <p className="text-sm font-medium text-[#1a1f1c]">
                        Recent Donations
                    </p>
                )}
                <p className="text-sm text-[#6b7a72]">
                    No donations yet. Be the first!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {showHeader && (
                <p className="text-sm font-medium text-[#1a1f1c]">
                    Recent Donations
                </p>
            )}
            <ul className="space-y-2">
                {donations.map((d, i) => (
                    <li
                        key={i}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#F6F3EF]/50"
                    >
                        <div className="flex items-center gap-2">
                            {/* Avatar placeholder */}
                            <div className="w-8 h-8 rounded-full bg-[#1f5a2c]/10 flex items-center justify-center">
                                <span className="text-xs font-medium text-[#1f5a2c]">
                                    {d.isAnonymous
                                        ? "?"
                                        : (d.name?.[0]?.toUpperCase() ?? "?")}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#1a1f1c]">
                                    {d.isAnonymous ? "Anonymous" : d.name}
                                </p>
                                <p className="text-xs text-[#6b7a72]">
                                    {d.timeLabel}
                                </p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-[#1f5a2c]">
                            ${(d.amountCents / 100).toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
