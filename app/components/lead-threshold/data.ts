import type {
    AttentionCounts,
    Badge,
    Checklist,
    Client,
    Lead,
    OverviewStats,
    OverviewType,
    RenewalInvoice,
} from "./types";

/* Demo data for /lead-threshold. The account is a free (Basic) listing
   client, since the lead threshold applies to free accounts. All names,
   emails and messages are made up. */

export const BASE_PATH = "/lead-threshold";

export const client: Client = {
    name: "Terra Nova Volunteers",
    alias: "terra-nova-volunteers",
    firstName: "Maria",
    subscriptionLevel: 1,
    verificationStatusId: 1,
    requirementUploadStatus: 1,
    accountProgress: 64,
};

/* Physical address and social media always pass in the real calculation, so
   they never show as missing (an open question on PR 784). */
export const checklist: Checklist = {
    logo: false,
    url: true,
    address: true,
    billing: true,
    description: true,
    socialmedia: true,
    recognition: false,
    listing: true,
    business: false,
    reviews: false,
    interviews: true,
    inquiry: true,
};

/** The prototype's "today", so "due in N days" stays stable. */
export const DEMO_TODAY = "2026-11-13";

/* The renewal invoice the PO wants emphasised. Number, amount and due date
   are placeholders. */
export const renewalInvoice: RenewalInvoice = {
    number: "GA-20931",
    amount: 750,
    dueDate: "2026-12-01",
};

export const attention: AttentionCounts = {
    expiringPrograms: 2,
    expiringAds: 1,
    overdueInvoices: 0,
    // Nothing is overdue, so the unpaid renewal invoice shows as the card's
    // existing "balance due" row.
    balanceDue: { amount: renewalInvoice.amount, dueDate: "Dec 1, 2026" },
    newReviews: 3,
};

export const overviewTypes: OverviewType[] = [
    "programs",
    "ads",
    "invoices",
    "reviews",
    "interviews",
    "articles",
];

export const overviewStats: OverviewStats = {
    programs: { approved: 4, pending: 1, expiring: 2, expired: 3, draft: 1 },
    ads: { active: 1, scheduled: 0, expired: 2 },
    invoices: { paid: 3, partial: 0, unpaid: 0, overdue: 0 },
    reviews: { approved: 27, inactive: 1, not_checked: 2 },
    interviews: { published: 2 },
    articles: { published: 1 },
};

export const badges: Badge[] = [
    {
        key: "provider-2025",
        name: "Top Rated Provider",
        detail: "Volunteer Abroad · 2025",
        image: "/images/top-rated/provider-badge-degree-abroad.png",
    },
    {
        key: "program-2025",
        name: "Top Rated Program",
        detail: "Sea Turtle Conservation in Costa Rica · 2025",
        image: "/images/top-rated/program-badge.png",
    },
];

const PROGRAMS = {
    turtles: "Sea Turtle Conservation in Costa Rica",
    peru: "Teach English in Rural Peru",
    thailand: "Wildlife Rescue Volunteer in Thailand",
    ghana: "Community Health Internship in Ghana",
};

/* Newest first, the order the Leads tab loads them in. */
export const leads: Lead[] = [
    {
        id: 4123,
        inquiryDate: "2026-11-12T09:41:00",
        firstName: "Hannah",
        lastName: "Okafor",
        email: "hannah.okafor@example.com",
        phone: "+1 415 555 0142",
        citizenship: "United States",
        birthdate: "2003-04-18",
        programName: PROGRAMS.turtles,
        isCurrentStudent: true,
        schoolName: "University of Oregon",
        referralSource: "Search engine",
        message:
            "Hi! I'm a marine biology student and I'd love to join the nesting season next summer. Are there 4-week placements, and is housing included?",
    },
    {
        id: 4119,
        inquiryDate: "2026-11-09T16:05:00",
        firstName: "Lukas",
        lastName: "Brenner",
        email: "lukas.brenner@example.com",
        citizenship: "Germany",
        birthdate: "1998-09-02",
        programName: PROGRAMS.thailand,
        isCurrentStudent: false,
        referralSource: "GoAbroad.com",
        message:
            "I have two months free from January. Could you send me the program fees and what a typical day looks like at the rescue center?",
    },
    {
        id: 4112,
        inquiryDate: "2026-11-04T11:22:00",
        firstName: "Aiko",
        lastName: "Tanaka",
        email: "aiko.tanaka@example.com",
        phone: "+81 90 5555 0198",
        citizenship: "Japan",
        birthdate: "2001-12-11",
        programName: PROGRAMS.peru,
        isCurrentStudent: true,
        schoolName: "Waseda University",
        referralSource: "Social media",
        message:
            "Do I need a TEFL certificate to apply? I'd like to go for one semester during my gap year.",
    },
    {
        id: 4106,
        inquiryDate: "2026-10-28T08:13:00",
        firstName: "Daniel",
        lastName: "Mensah",
        email: "daniel.mensah@example.com",
        citizenship: "Canada",
        birthdate: "1996-06-25",
        programName: PROGRAMS.ghana,
        isCurrentStudent: false,
        referralSource: "Friend or family",
        message:
            "I'm a registered nurse looking for a 6-week placement. Is clinical work supervised, and can you help with the visa letter?",
    },
    {
        id: 4097,
        inquiryDate: "2026-10-19T19:47:00",
        firstName: "Sofia",
        lastName: "Marchetti",
        email: "sofia.marchetti@example.com",
        phone: "+39 333 555 0110",
        citizenship: "Italy",
        birthdate: "2002-02-14",
        programName: PROGRAMS.turtles,
        isCurrentStudent: true,
        schoolName: "University of Bologna",
        referralSource: "GoAbroad.com",
        message:
            "Is there a minimum Spanish level? I'm a beginner but taking classes now.",
    },
    {
        id: 4088,
        inquiryDate: "2026-10-07T13:30:00",
        firstName: "Priya",
        lastName: "Raman",
        email: "priya.raman@example.com",
        citizenship: "India",
        birthdate: "1999-07-30",
        programName: PROGRAMS.thailand,
        isCurrentStudent: false,
        referralSource: "Search engine",
        message:
            "Could you share reviews from past volunteers and the safety measures at the sanctuary?",
    },
    {
        id: 4075,
        inquiryDate: "2026-09-22T10:02:00",
        firstName: "Tomás",
        lastName: "Ibarra",
        email: "tomas.ibarra@example.com",
        citizenship: "Chile",
        birthdate: "2000-11-05",
        programName: PROGRAMS.peru,
        isCurrentStudent: false,
        referralSource: "GoAbroad.com",
        message: "What are the start dates for 2027?",
    },
    {
        id: 4061,
        inquiryDate: "2026-09-03T15:44:00",
        firstName: "Grace",
        lastName: "Whitfield",
        email: "grace.whitfield@example.com",
        phone: "+44 7700 900123",
        citizenship: "United Kingdom",
        birthdate: "2004-01-21",
        programName: PROGRAMS.ghana,
        isCurrentStudent: true,
        schoolName: "University of Leeds",
        referralSource: "Social media",
        message:
            "Can this count toward my public health degree placement? My university needs a supervisor sign-off.",
    },
    {
        id: 4049,
        inquiryDate: "2026-08-17T07:58:00",
        firstName: "Noah",
        lastName: "Lindqvist",
        email: "noah.lindqvist@example.com",
        citizenship: "Sweden",
        birthdate: "1997-03-09",
        programName: PROGRAMS.turtles,
        isCurrentStudent: false,
        referralSource: "Friend or family",
        message: "Is airport pickup included from San José?",
    },
    {
        id: 4033,
        inquiryDate: "2026-07-29T12:16:00",
        firstName: "Amara",
        lastName: "Nwosu",
        email: "amara.nwosu@example.com",
        citizenship: "Nigeria",
        birthdate: "2001-08-27",
        programName: PROGRAMS.ghana,
        isCurrentStudent: true,
        schoolName: "University of Lagos",
        referralSource: "Search engine",
        message:
            "Do you offer any scholarships or reduced fees for African students?",
    },
    {
        id: 4018,
        inquiryDate: "2026-07-08T18:39:00",
        firstName: "Ethan",
        lastName: "Clarke",
        email: "ethan.clarke@example.com",
        citizenship: "Australia",
        birthdate: "1995-10-12",
        programName: PROGRAMS.thailand,
        isCurrentStudent: false,
        referralSource: "GoAbroad.com",
        message:
            "I'm a vet tech. Is there a more hands-on role for people with animal care experience?",
    },
    {
        id: 4002,
        inquiryDate: "2026-06-20T09:05:00",
        firstName: "Camille",
        lastName: "Dubois",
        email: "camille.dubois@example.com",
        citizenship: "France",
        birthdate: "2003-05-03",
        programName: PROGRAMS.peru,
        isCurrentStudent: true,
        schoolName: "Sciences Po",
        referralSource: "Social media",
        message: "How many hours a week would I be teaching?",
    },
    {
        id: 3987,
        inquiryDate: "2026-06-02T14:51:00",
        firstName: "Marcus",
        lastName: "Reyes",
        email: "marcus.reyes@example.com",
        citizenship: "Philippines",
        birthdate: "1998-12-19",
        programName: PROGRAMS.turtles,
        isCurrentStudent: false,
        referralSource: "GoAbroad.com",
        message: "Can couples volunteer together and share a room?",
    },
    {
        id: 3970,
        inquiryDate: "2026-05-14T11:27:00",
        firstName: "Elena",
        lastName: "Popescu",
        email: "elena.popescu@example.com",
        citizenship: "Romania",
        birthdate: "2000-04-08",
        programName: PROGRAMS.ghana,
        isCurrentStudent: false,
        referralSource: "Search engine",
        message: "What vaccinations do I need before arriving?",
    },
    {
        id: 3956,
        inquiryDate: "2026-04-25T16:10:00",
        firstName: "Jordan",
        lastName: "Bailey",
        email: "jordan.bailey@example.com",
        citizenship: "United States",
        birthdate: "2002-09-16",
        programName: PROGRAMS.thailand,
        isCurrentStudent: true,
        schoolName: "Ohio State University",
        referralSource: "Friend or family",
        message: "Is the program open to people under 21?",
    },
    {
        id: 3941,
        inquiryDate: "2026-04-06T08:33:00",
        firstName: "Mei",
        lastName: "Chen",
        email: "mei.chen@example.com",
        citizenship: "Taiwan",
        birthdate: "1999-01-28",
        programName: PROGRAMS.peru,
        isCurrentStudent: false,
        referralSource: "GoAbroad.com",
        message: "Do you arrange homestays with local families?",
    },
    {
        id: 3925,
        inquiryDate: "2026-03-18T13:12:00",
        firstName: "Oliver",
        lastName: "Hansen",
        email: "oliver.hansen@example.com",
        citizenship: "Denmark",
        birthdate: "1996-07-14",
        programName: PROGRAMS.turtles,
        isCurrentStudent: false,
        referralSource: "Social media",
        message: "What is the cancellation policy?",
    },
    {
        id: 3910,
        inquiryDate: "2026-02-27T10:48:00",
        firstName: "Fatima",
        lastName: "Haddad",
        email: "fatima.haddad@example.com",
        citizenship: "Jordan",
        birthdate: "2001-03-22",
        programName: PROGRAMS.ghana,
        isCurrentStudent: true,
        schoolName: "University of Jordan",
        referralSource: "Search engine",
        message: "Are placements available in maternal health clinics?",
    },
    {
        id: 3898,
        inquiryDate: "2026-02-09T17:25:00",
        firstName: "Liam",
        lastName: "O'Connor",
        email: "liam.oconnor@example.com",
        citizenship: "Ireland",
        birthdate: "1997-11-30",
        programName: PROGRAMS.thailand,
        isCurrentStudent: false,
        referralSource: "GoAbroad.com",
        message: "How far is the sanctuary from Chiang Mai?",
    },
    {
        id: 3884,
        inquiryDate: "2026-01-23T09:14:00",
        firstName: "Valentina",
        lastName: "Rojas",
        email: "valentina.rojas@example.com",
        citizenship: "Colombia",
        birthdate: "2003-06-06",
        programName: PROGRAMS.peru,
        isCurrentStudent: true,
        schoolName: "Universidad de los Andes",
        referralSource: "Friend or family",
        message: "Can I do this program for two weeks only?",
    },
    {
        id: 3871,
        inquiryDate: "2026-01-12T12:01:00",
        firstName: "Ben",
        lastName: "Carter",
        email: "ben.carter@example.com",
        citizenship: "New Zealand",
        birthdate: "1994-02-17",
        programName: PROGRAMS.turtles,
        isCurrentStudent: false,
        referralSource: "Search engine",
        message: "Is there an age limit? I'm 32.",
    },
    {
        id: 3866,
        inquiryDate: "2026-01-07T15:36:00",
        firstName: "Yara",
        lastName: "Silva",
        email: "yara.silva@example.com",
        citizenship: "Brazil",
        birthdate: "2000-10-01",
        programName: PROGRAMS.ghana,
        isCurrentStudent: false,
        referralSource: "GoAbroad.com",
        message: "What is included in the program fee?",
    },
    {
        id: 3859,
        inquiryDate: "2026-01-03T10:20:00",
        firstName: "Kai",
        lastName: "Müller",
        email: "kai.mueller@example.com",
        citizenship: "Switzerland",
        birthdate: "1999-05-24",
        programName: PROGRAMS.thailand,
        isCurrentStudent: false,
        referralSource: "Social media",
        message: "Is there Wi-Fi at the volunteer house?",
    },
];

export const leadName = (lead: Lead) =>
    `${lead.firstName} ${lead.lastName}`.trim();

/* ── Lead threshold ────────────────────────────────────────────────────────
   "Limit free accounts to allow only 5 viewable leads per year." A free
   (Basic) account sees the first 5 leads it receives each calendar year;
   every lead after that stays locked until the account upgrades (or the
   year rolls over). Paid accounts see everything. In production the API has
   to withhold locked leads and send only their count, so the UI never holds
   a locked lead's details. */

export const FREE_LEADS_PER_YEAR = 5;

export const isFreeAccount = client.subscriptionLevel === 1;

const thisYear = DEMO_TODAY.slice(0, 4);

const unlockedIds = new Set(
    isFreeAccount
        ? leads
              .filter((lead) => lead.inquiryDate.startsWith(thisYear))
              .sort((a, b) => a.inquiryDate.localeCompare(b.inquiryDate))
              .slice(0, FREE_LEADS_PER_YEAR)
              .map((lead) => lead.id)
        : leads.map((lead) => lead.id),
);

/** Leads the account can open, newest first. */
export const viewableLeads = leads.filter((lead) => unlockedIds.has(lead.id));

/** All the UI may know about locked leads: how many there are. */
export const lockedLeadCount = leads.length - viewableLeads.length;

/* ── Upgrade plans ─────────────────────────────────────────────────────────
   From the "2026 Package Tiers - Analiza Proposal" tab of the 2025 Strategy:
   Listing Tiers sheet. Prices are as the sheet lists them (it gives no
   billing period except the 6-month Trial). Feature lines are the sheet's
   own rows, shortened; the first line is the lead threshold this prototype
   adds. */

export type Plan = {
    id: string;
    name: string;
    /** One warm line on what the tier is for. Prototype copy, not from the
        sheet. */
    tagline: string;
    price: string;
    /** e.g. "for 6 months"; most tiers have none in the sheet. */
    priceNote?: string;
    /** The first line is the lead limit. */
    features: string[];
};

export const plans: Plan[] = [
    {
        id: "basic",
        name: "Basic",
        tagline: "Get listed on GoAbroad",
        price: "Free",
        features: [
            `${FREE_LEADS_PER_YEAR} leads a year`,
            "Basic inquiry form",
            "Email and chat support (ticketing)",
            "Up to 20 reviews a year",
        ],
    },
    {
        id: "trial",
        name: "Trial",
        tagline: "Try premium for six months",
        price: "$300",
        priceNote: "for 6 months",
        features: [
            "Every lead, all year",
            "Up to 10 listings on the same results page",
            "Basic or custom inquiry form",
            "Dedicated account manager",
        ],
    },
    {
        id: "starter",
        name: "Starter",
        tagline: "Everything you need to get going",
        price: "$500",
        features: [
            "Every lead, all year",
            "Up to 10 listings on the same results page",
            "Dedicated account manager",
            "Mid-campaign strategy call",
        ],
    },
    {
        id: "standard",
        name: "Standard",
        tagline: "More listings, more ways to connect",
        price: "$3,000",
        features: [
            "Every lead, all year",
            "Up to 30 listings on multiple results pages",
            "Review responses and review widget",
            "Annual performance report",
        ],
    },
    {
        id: "enhanced",
        name: "Enhanced",
        tagline: "Get in front of more travelers",
        price: "$10,000",
        features: [
            "Every lead, all year",
            "Up to 50 listings on multiple results pages",
            "Included in Online Advisor",
            "Logo on your provider page and up to 5 results",
            "Quarterly strategy calls",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Go all in with GoAbroad",
        price: "Contact for pricing",
        features: [
            "Every lead, all year",
            "Unlimited listings",
            "Logo on your provider page and up to 10 results",
            "AI Search Bot on your listings",
            "Quarterly performance reports",
        ],
    },
];

export const currentPlanId = "basic";
