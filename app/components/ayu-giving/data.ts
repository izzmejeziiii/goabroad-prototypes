// Dummy content for the AYU Giving campaign-detail prototype.
//
// The production page assembles this from an API route + Prisma queries. Here
// it's a plain module so the page stays a pure render of a fixed fixture.

import type { CampaignCardData } from "./CampaignCard";

export type CampaignDetail = {
    id: string;
    partner_id: string;
    title: string;
    slug: string;
    body: string | null;
    banner_key: string | null;
    goal_amount: number;
    start_date: string;
    end_date: string;
    status: string;
    category: string | null;
    created_at: string;
    organization_name: string;
    organization_slug: string | null;
    country: string;
    city: string;
    logo_key: string | null;
    organization_description: string | null;
    collected: number;
    donor_count: number;
};

/** The path this page has in the real app. The prototype ships only this one
 *  page, so nav links are inert (`href="#"`) and their active state is resolved
 *  against this instead of the real pathname — that way "Discover" highlights
 *  exactly as it does on the live campaign detail page. */
export const PROTOTYPE_PATHNAME =
    "/campaigns/air-bersih-nusantara/clean-water-east-sumba";

/** Campaigns end 23 days out so the sidebar never falls into its ended state
 *  as the prototype ages. Resolved on the server and passed down as a prop, so
 *  the client renders the same value it hydrates with. */
export const DAYS_REMAINING = 23;

export function endDateFromNow(days = DAYS_REMAINING): string {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export const campaign: Omit<CampaignDetail, "end_date"> = {
    id: "cmp_01",
    partner_id: "usr_partner_01",
    title: "Clean Water Wells for 12 Villages in East Sumba",
    slug: "clean-water-east-sumba",
    banner_key: "https://picsum.photos/seed/ayu-campaign-hero/1600/1000",
    goal_amount: 4_500_000,
    start_date: "2026-05-14T00:00:00.000Z",
    status: "active",
    category: "clean-water",
    created_at: "2026-05-14T00:00:00.000Z",
    organization_name: "Yayasan Air Bersih Nusantara",
    organization_slug: "air-bersih-nusantara",
    country: "Indonesia",
    city: "Waingapu",
    logo_key: "https://picsum.photos/seed/ayu-org-logo/200/200",
    organization_description:
        "Yayasan Air Bersih Nusantara has worked alongside rural communities across eastern Indonesia since 2011, building and maintaining community-owned water infrastructure. Every well we drill is handed over to a village water committee trained to run and repair it, so the water keeps flowing long after we leave.",
    collected: 2_835_000,
    donor_count: 214,
    body: `
        <p>In East Sumba, the dry season runs eight months long. Families in the villages we work with walk an average of 4.2 kilometres each way to collect water from seasonal riverbeds — water shared with livestock, and unsafe to drink without boiling.</p>
        <p>This campaign funds <strong>12 solar-powered borehole wells</strong>, one for each participating village, along with the training and spare-parts fund that keeps them running.</p>
        <h2>What your donation builds</h2>
        <ul>
            <li>A 60–90 metre borehole drilled to reach the year-round aquifer</li>
            <li>A solar pump array and 5,000-litre storage tank</li>
            <li>Four tap stands placed within a 300-metre walk of every household</li>
            <li>A trained village water committee, with two members certified in pump repair</li>
            <li>Three years of funded spare parts and quarterly maintenance visits</li>
        </ul>
        <h2>Where we are today</h2>
        <p>Five wells are already drilled and flowing in Kambata Tana, Praingkareha, Wunga, Lai Hau, and Mburukullu — serving roughly 3,400 people. The remaining seven villages have completed their hydrogeological surveys and are waiting on funding to begin drilling before the rains arrive in December.</p>
        <blockquote>“My daughters used to leave for water before sunrise, and they were often late for school. Now the tap stand is a two-minute walk from our door.” — Rambu Ana, Kambata Tana</blockquote>
        <h2>Accountability</h2>
        <p>Every well is GPS-logged and photographed at handover, and water quality is tested at drilling, at handover, and at each quarterly visit. Donors receive the full results for each village as it comes online.</p>
    `,
};

export type CampaignUpdate = {
    id: string;
    title: string;
    body: string | null;
    created_at: string;
    author_name: string;
};

export const updates: CampaignUpdate[] = [
    {
        id: "upd_03",
        title: "Well #5 is flowing in Mburukullu",
        body: "<p>The pump array went live on Tuesday and the committee ran its first full-day test yesterday — 9,200 litres drawn with no drop in pressure. Water quality came back clean on all six markers. That's 3,400 people now served across five villages.</p>",
        created_at: "2026-07-28T09:15:00.000Z",
        author_name: "Yayasan Air Bersih Nusantara",
    },
    {
        id: "upd_02",
        title: "Drilling permits approved for the remaining seven villages",
        body: "<p>The regency office signed off on all seven outstanding permits last week, which was the last administrative blocker. Rigs can move as soon as funding clears — we're aiming to break ground in Praibakul first.</p>",
        created_at: "2026-07-06T14:40:00.000Z",
        author_name: "Yayasan Air Bersih Nusantara",
    },
    {
        id: "upd_01",
        title: "Thank you — we passed the halfway mark",
        body: "<p>You got us past $22,500 in nine weeks. Every dollar so far has gone straight into drilling and pump hardware; our operating costs are covered separately by a multi-year grant, so nothing here is spent on overhead.</p>",
        created_at: "2026-06-19T08:00:00.000Z",
        author_name: "Yayasan Air Bersih Nusantara",
    },
];

export type RecentDonation = {
    amountCents: number;
    /** Pre-rendered relative label — the live app derives this from a timestamp. */
    timeLabel: string;
    name: string;
    isAnonymous: boolean;
};

export const recentDonations: RecentDonation[] = [
    { amountCents: 5_000, timeLabel: "2 hours ago", name: "Marguerite D.", isAnonymous: false },
    { amountCents: 25_000, timeLabel: "6 hours ago", name: "Anonymous", isAnonymous: true },
    { amountCents: 10_000, timeLabel: "Yesterday", name: "Tomas R.", isAnonymous: false },
    { amountCents: 2_500, timeLabel: "2 days ago", name: "Priya N.", isAnonymous: false },
    { amountCents: 50_000, timeLabel: "3 days ago", name: "The Halvorsen Family", isAnonymous: false },
];

/** Other campaigns by the same organizer — the "More from …" rail. */
export const organizerCampaigns: CampaignCardData[] = [
    {
        id: "cmp_02",
        title: "Rainwater Harvesting for 8 Primary Schools",
        slug: "rainwater-harvesting-schools",
        banner_key: "https://picsum.photos/seed/ayu-related-1/900/560",
        goal_amount: 1_800_000,
        start_date: "2026-03-02T00:00:00.000Z",
        end_date: "",
        status: "active",
        category: "clean-water",
        category_label: "Clean Water",
        category_icon: "Droplet",
        organization_name: "Yayasan Air Bersih Nusantara",
        organization_slug: "air-bersih-nusantara",
        collected: 1_242_000,
    },
    {
        id: "cmp_03",
        title: "Handwashing Stations for Rural Health Posts",
        slug: "handwashing-stations-health-posts",
        banner_key: "https://picsum.photos/seed/ayu-related-2/900/560",
        goal_amount: 950_000,
        start_date: "2026-04-11T00:00:00.000Z",
        end_date: "",
        status: "active",
        category: "health",
        category_label: "Health",
        category_icon: "HeartPulse",
        organization_name: "Yayasan Air Bersih Nusantara",
        organization_slug: "air-bersih-nusantara",
        collected: 611_500,
    },
    {
        id: "cmp_04",
        title: "Pump Repair Training for 40 Village Technicians",
        slug: "pump-repair-training",
        banner_key: "https://picsum.photos/seed/ayu-related-3/900/560",
        goal_amount: 620_000,
        start_date: "2026-05-30T00:00:00.000Z",
        end_date: "",
        status: "active",
        category: "education",
        category_label: "Education",
        category_icon: "GraduationCap",
        organization_name: "Yayasan Air Bersih Nusantara",
        organization_slug: "air-bersih-nusantara",
        collected: 178_000,
    },
];

/** Days left shown on each card in the "More from …" rail. */
export const relatedDaysRemaining = [41, 12, 58];
