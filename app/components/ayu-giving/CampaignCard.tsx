"use client";
import Link from "next/link";
import { Heart } from "./icons";
import { DonationProgressCompact } from "./DonationProgress";
import { daysLeft } from "./utils";
import { formatCategorySlug, iconFor } from "./icons";

export interface CampaignCardData {
    id: string;
    title: string;
    slug: string;
    banner_key: string | null;
    goal_amount: number;
    start_date: string;
    end_date: string;
    status?: string;
    organization_name?: string;
    organization_slug?: string | null;
    collected?: number;
    category?: string | null;
    category_label?: string | null;
    /** Name identifier of the category's icon. */
    category_icon?: string | null;
}

export function CampaignCard({
    campaign,
    isFeatured,
    showDonateCta,
}: {
    campaign: CampaignCardData;
    isFeatured?: boolean;
    showDonateCta?: boolean;
}) {
    const collected = Number(campaign.collected ?? 0);
    const goal = Number(campaign.goal_amount);
    const days = daysLeft(campaign.end_date);
    // The live app routes to /campaigns/{org}/{slug}; this prototype only ships
    // the one detail page, so the card is a visual placeholder.
    const campaignUrl = "#";
    const raisedDollars = (collected / 100).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const tagLabel =
        campaign.category_label ??
        (campaign.category ? formatCategorySlug(campaign.category) : "General");
    // `iconFor` is a lookup, not a factory — it returns one of the module-level
    // icon components, so nothing is created per render.
    const TagIcon = iconFor(campaign.category_icon);

    return (
        <Link
            href={campaignUrl}
            className={`group block rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2 ${!isFeatured && "border border-[#e8ecea]"}`}
            aria-label={`View ${campaign.title}`}
        >
            <article aria-labelledby={`campaign-title-${campaign.id}`}>
                <div className="relative aspect-16/10 bg-linear-to-br from-[#EAF7F4] to-[#f5ebe0] overflow-hidden">
                    {campaign.banner_key ? (
                        /* eslint-disable @next/next/no-img-element */
                        <img
                            src={campaign.banner_key}
                            alt=""
                            className="w-full h-full object-cover"
                            aria-hidden="true"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[#6b7a72]/50 text-sm font-medium">
                                Campaign image
                            </span>
                        </div>
                    )}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#1a1f1c] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                        {/* eslint-disable-next-line react-hooks/static-components */}
                        <TagIcon
                            className="w-3 h-3 text-[#1f5a2c]"
                            aria-hidden="true"
                        />
                        {tagLabel}
                    </span>
                </div>
                <div className="p-5">
                    <p className="text-xs text-neutral-500 font-medium truncate">
                        {campaign.organization_name ?? "Ayu Giving"}
                    </p>
                    <h3
                        id={`campaign-title-${campaign.id}`}
                        className="font-extrabold text-[#1A3628] mt-1.5 line-clamp-2 group-hover:text-[#1f5a2c] transition-colors text-xl leading-snug"
                    >
                        {campaign.title}
                    </h3>
                    <div className="mt-4">
                        <DonationProgressCompact
                            raised={collected}
                            goal={goal}
                        />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                        <div className="font-semibold text-[#1a1f1c]">
                            <span className="text-[#1A3628]">
                                ${raisedDollars}
                            </span>
                            <span className="text-neutral-500 font-normal ml-1">
                                raised
                            </span>
                        </div>
                        <span className="text-neutral-500">
                            {days} days left
                        </span>
                    </div>
                    {showDonateCta && (
                        <div className="mt-4 flex items-center justify-center gap-2 rounded-md bg-[#1f5a2c] px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-[#1f5a2c]">
                            <Heart className="h-4 w-4" aria-hidden="true" />
                            Donate
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
