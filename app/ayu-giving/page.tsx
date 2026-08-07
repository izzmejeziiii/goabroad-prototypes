import Link from "next/link";
import { BadgeCheck, CalendarDays, Bell, iconFor } from "../components/ayu-giving/icons";
import { SidebarVersions } from "../components/ayu-giving/SidebarVersions";
import { CampaignCard } from "../components/ayu-giving/CampaignCard";
import { Breadcrumbs } from "../components/ayu-giving/Breadcrumbs";
import { ShareLinks } from "../components/ayu-giving/ShareLinks";
import { formatDate } from "../components/ayu-giving/utils";
import {
    campaign as campaignFixture,
    endDateFromNow,
    organizerCampaigns,
    relatedDaysRemaining,
    updates,
} from "../components/ayu-giving/data";

// Everything the production page derives from the API, Prisma, the session and
// the categories table is a fixture here. The markup below is otherwise the
// campaign detail page as-is.
const CATEGORY_ICON = "Droplet";
const TAG_LABEL = "Clean Water";
// The live page hides updates from everyone but donors, the owning partner and
// super-admins. Pinned open so the section is visible in the prototype.
const CAN_VIEW_UPDATES = true;
const IS_LOGGED_IN = false;
const APP_URL = "https://ayugiving.org";

export default async function AyuGivingCampaignPage({
    searchParams,
}: {
    searchParams: Promise<{ sidebar?: string }>;
}) {
    const { sidebar } = await searchParams;
    // End dates are resolved here, on the server, and handed down as props so
    // the client-side "days left" math hydrates to the same number.
    const campaign = { ...campaignFixture, end_date: endDateFromNow() };
    const organizerCards = organizerCampaigns.map((c, i) => ({
        ...c,
        end_date: endDateFromNow(relatedDaysRemaining[i]),
    }));

    // `iconFor` is a lookup, not a factory — it returns one of the module-level
    // icon components, so nothing is created per render.
    const TagIcon = iconFor(CATEGORY_ICON);
    const tagLabel = TAG_LABEL;

    const organizerName = campaign.organization_name;
    const organizerLocation = [campaign.city, campaign.country]
        .filter(Boolean)
        .join(", ");

    const shareUrl = `${APP_URL}/campaigns/${campaign.organization_slug}/${campaign.slug}`;

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Campaigns", href: "#" },
        ...(campaign.organization_slug
            ? [
                  {
                      label: organizerName,
                      href: "#",
                  },
              ]
            : []),
        { label: campaign.title },
    ];

    return (
        <main className="w-full flex flex-col items-center overflow-x-clip">
            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 pt-8 md:pt-6 pb-16">
                <Breadcrumbs items={breadcrumbItems} className="mb-6" />
                {/* Slot for sidebar V4, which lays the donate form out across
                    the full content width instead of the 1/3 column. Empty for
                    every other version. */}
                <div id="ayu-donate-band" />
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-100 overflow-hidden rounded-2xl bg-linear-to-br from-[#EAF7F4] to-[#f5ebe0]">
                            {campaign.banner_key && (
                                /* eslint-disable @next/next/no-img-element */
                                <img
                                    src={campaign.banner_key}
                                    alt={campaign.title}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>

                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF0EA] px-3 py-1 text-xs font-semibold text-[#1f5a2c]">
                                {/* eslint-disable-next-line react-hooks/static-components */}
                                <TagIcon className="h-3 w-3" aria-hidden="true" />
                                {tagLabel}
                            </span>
                            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#1A3628]">
                                {campaign.title}
                            </h1>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    {campaign.logo_key ? (
                                        <img
                                            src={campaign.logo_key}
                                            alt=""
                                            className="h-12 w-12 rounded-full object-cover"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0EA] text-sm font-bold text-[#1f5a2c]"
                                            aria-hidden="true"
                                        >
                                            {organizerName?.[0]?.toUpperCase() ??
                                                "O"}
                                        </div>
                                    )}
                                    <div>
                                        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A3628]">
                                            {organizerName}
                                            <BadgeCheck
                                                className="h-4 w-4 text-[#1f5a2c]"
                                                aria-hidden="true"
                                            />
                                        </p>
                                        <p className="text-xs text-[#6b7a72]">
                                            Organizer
                                        </p>
                                    </div>
                                </div>
                                <ShareLinks
                                    url={shareUrl}
                                    title={campaign.title}
                                />
                            </div>
                        </div>

                        <div className="border-t border-[#e8ecea] pt-6">
                            <article className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-[#1a1f1c] prose-headings:font-semibold">
                                {campaign.body ? (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: campaign.body,
                                        }}
                                    />
                                ) : (
                                    <p className="text-[#6b7a72]">
                                        No description yet.
                                    </p>
                                )}
                            </article>
                            <p className="mt-6 inline-flex items-center gap-1.5 text-xs italic text-[#6b7a72]">
                                <CalendarDays
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                />
                                Created {formatDate(campaign.created_at)}
                            </p>
                        </div>

                        {CAN_VIEW_UPDATES && updates.length > 0 && (
                            <section
                                className="rounded-2xl border border-[#e8ecea] bg-white p-6"
                                aria-labelledby="campaign-updates"
                            >
                                <h2
                                    id="campaign-updates"
                                    className="inline-flex items-center gap-2 text-lg md:text-xl font-bold text-[#1A3628]"
                                >
                                    <Bell
                                        className="h-5 w-5 text-[#1f5a2c]"
                                        aria-hidden="true"
                                    />
                                    Campaign Updates
                                </h2>
                                <p className="mt-1 text-xs text-[#6b7a72]">
                                    Only visible to donors of this campaign.
                                </p>
                                <div className="mt-5 space-y-5">
                                    {updates.map((update) => (
                                        <article
                                            key={update.id}
                                            className="rounded-lg bg-[#FFFCF5] p-5"
                                        >
                                            {update.title && (
                                                <h3 className="mb-2 text-base font-semibold text-[#1A3628]">
                                                    {update.title}
                                                </h3>
                                            )}
                                            {update.body && (
                                                <p
                                                    className="text-sm prose prose-sm prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-[#1a1f1c]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: update.body,
                                                    }}
                                                />
                                            )}
                                            <p className="mt-3 flex items-center gap-2 border-t border-[#e8ecea] pt-3 text-xs text-[#6b7a72]">
                                                <span>
                                                    {formatDate(
                                                        update.created_at,
                                                    )}
                                                </span>
                                                <span aria-hidden="true">
                                                    •
                                                </span>
                                                <span>
                                                    {update.author_name}
                                                </span>
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section
                            className="rounded-2xl bg-[#FFFCF5] p-6 md:p-8"
                            aria-labelledby="organizer-card"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    {campaign.logo_key ? (
                                        <img
                                            src={campaign.logo_key}
                                            alt=""
                                            className="h-14 w-14 rounded-full object-cover"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <div
                                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-bold text-[#1f5a2c]"
                                            aria-hidden="true"
                                        >
                                            {organizerName?.[0]?.toUpperCase() ??
                                                "O"}
                                        </div>
                                    )}
                                    <div>
                                        <h2
                                            id="organizer-card"
                                            className="text-base font-bold text-[#1A3628]"
                                        >
                                            {organizerName}
                                        </h2>
                                        {organizerLocation && (
                                            <p className="mt-0.5 text-sm text-[#6b7a72]">
                                                {organizerLocation}
                                            </p>
                                        )}
                                        <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#1f5a2c]">
                                            <BadgeCheck
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />
                                            Verified
                                        </div>
                                    </div>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-[#1f5a2c] px-3 py-1 text-xs font-semibold text-white">
                                    Organizer
                                </span>
                            </div>
                            {campaign.organization_description && (
                                <p className="mt-5 text-sm leading-relaxed text-[#1a1f1c]">
                                    {campaign.organization_description}
                                </p>
                            )}
                            {campaign.organization_slug && (
                                <Link
                                    href="#"
                                    className="mt-4 inline-block text-sm font-semibold text-[#1f5a2c] hover:underline"
                                >
                                    View all campaigns by {organizerName} →
                                </Link>
                            )}
                        </section>
                    </div>

                    <aside className="lg:col-span-1">
                        <SidebarVersions
                            campaign={campaign}
                            isLoggedIn={IS_LOGGED_IN}
                            initialVersion={sidebar}
                        />
                    </aside>
                </div>
            </div>

            {organizerCards.length > 0 && (
                <section
                    className="w-full bg-[#EAF0EA] py-16 md:py-20 flex flex-col items-center"
                    aria-labelledby="organizer-campaigns"
                >
                    <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0">
                        <h2
                            id="organizer-campaigns"
                            className="mb-8 text-2xl md:text-3xl font-extrabold text-[#1A3628]"
                        >
                            More from {organizerName}
                        </h2>
                        <ul
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            role="list"
                            aria-label={`Recent campaigns by ${organizerName}`}
                        >
                            {organizerCards.map((c) => (
                                <li key={c.id}>
                                    <CampaignCard campaign={c} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </main>
    );
}
