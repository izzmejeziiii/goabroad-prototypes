/* eslint-disable @next/next/no-img-element -- badge PNGs at their natural
   size, as the real card renders them */
import { BASE_PATH, badges, client } from "../data";
import {
    CardLink,
    DashboardCard,
    FOCUS_RING,
    SECONDARY_BUTTON,
    SubscriptionChip,
} from "../ui";

/* The three cards in the right column on PR 784: Your Badges
   (BadgesCard.js), Your Subscription (SubscriptionCard.js) and Advertise With
   Us (AdvertiseCard.js, the non-Thrive version). */

export const BadgesCard = () => (
    <DashboardCard
        title="Your Badges"
        action={
            <CardLink href={`${BASE_PATH}/profile#awards`}>
                Manage in profile
            </CardLink>
        }
    >
        {badges.length === 0 ? (
            <div className="px-5 py-6 text-center">
                <p className="text-sm font-semibold text-neutral-800">
                    Earn a badge
                </p>
                <p className="text-sm text-slate-500">
                    Badges like Top Rated Program and Top Rated Provider will
                    show here once you earn them.
                </p>
            </div>
        ) : (
            <ul className="divide-y divide-slate-100">
                {badges.map((badge) => (
                    <li key={badge.key} className="flex items-center gap-3 px-5 py-3">
                        <img
                            src={badge.image}
                            alt=""
                            className="size-10 shrink-0 object-contain"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-neutral-800">
                                {badge.name}
                            </p>
                            {!!badge.detail && (
                                <p className="truncate text-xs text-slate-500">
                                    {badge.detail}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </DashboardCard>
);

// Levels 1–6 only; Legacy (0) accounts don't get the card.
export const SubscriptionCard = () => {
    const level = client.subscriptionLevel;
    if (!(level >= 1 && level <= 6)) return null;

    return (
        <DashboardCard title="Your Subscription">
            <div className="flex flex-col items-center gap-3 p-5 text-center">
                <SubscriptionChip level={level} variant="filled" />
                <p className="text-sm leading-relaxed text-slate-600">
                    {level === 6
                        ? "You're on our highest subscription — every listing feature is included. Get in touch for anything you need."
                        : "Get in touch to discuss your account subscription and unlock more features."}
                </p>
                <button
                    type="button"
                    className={SECONDARY_BUTTON}
                >
                    Contact Account Manager
                </button>
            </div>
        </DashboardCard>
    );
};

/* The one promo on the page, so it gets goabroad.com's slate-50 panel and
   the brand's orange CTA (sun-500 with cobalt-700 text, 6.6:1). */
export const AdvertiseCard = () => (
    <DashboardCard title="Advertise With Us" className="!bg-slate-50">
        <div className="flex items-center gap-4 p-5">
            <div className="flex w-full flex-col items-center gap-3 text-center">
                <p className="text-sm leading-relaxed text-slate-600">
                    Boost your exposure and take your online marketing to the
                    next level with a custom advertising package!
                </p>
                <a
                    href="https://www.goabroad.com/advertise-guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-lg bg-sun-500 px-4 py-2 text-sm font-semibold text-cobalt-700 no-underline transition-colors hover:bg-sun-400 hover:text-cobalt-700 ${FOCUS_RING}`}
                >
                    Advertise Guide
                </a>
            </div>
        </div>
    </DashboardCard>
);
