"use client";

/** Compact variant for campaign cards */
export function DonationProgressCompact({
    raised,
    goal,
}: {
    raised: number;
    goal: number;
}) {
    const percent =
        goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
                className="h-full bg-linear-to-r from-[#1f5a2c] to-[#1f5a2c] rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}
