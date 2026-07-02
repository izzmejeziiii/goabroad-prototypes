import type { VersionSnapshot } from "./types";

export const NAME_V12 = "Volunteer Abroad with International Volunteer HQ (IVHQ)";
export const NAME_V8 = "IVHQ Volunteer Programs Abroad";

export const DESC_V12 =
    "International Volunteer HQ (IVHQ) is the world's leading volunteer abroad organization, offering safe, trusted, affordable and high-impact volunteer programs in over 50 destinations. Since 2007, IVHQ has helped more than 130,000 people travel and volunteer abroad. With local teams on the ground in every destination, IVHQ provides 24/7 in-country support, comprehensive pre-departure assistance, and a wide range of meaningful projects designed to support communities and create lasting positive change. Whether you're interested in childcare, conservation, teaching, medical, construction or animal welfare, IVHQ has a project that matches your interests, skills, and schedule. Programs start at affordable rates and include accommodation, meals, airport pickup, orientation, and 24/7 support.";
export const DESC_V11 =
    "International Volunteer HQ (IVHQ) is a leading volunteer abroad organization offering safe, affordable programs in over 50 destinations. Since 2007, IVHQ has helped more than 100,000 people travel and volunteer abroad. With local teams on the ground, IVHQ provides in-country support, pre-departure assistance, and a wide range of projects designed to support communities. Whether you're interested in childcare, conservation, teaching, medical or construction, IVHQ has a project that matches your interests and schedule. Programs include accommodation, meals, airport pickup, and orientation.";

export const HIGHLIGHTS_V12 = [
    "Choose from 200+ volunteer projects across 50+ countries worldwide",
    "Programs start from just $20/day including accommodation and meals",
    "24/7 in-country support from local IVHQ staff who know the destinations",
    "Travel insurance, airport pickup, and orientation included in program fee",
    "Join a global community of 130,000+ alumni who've volunteered with IVHQ",
];
export const HIGHLIGHTS_V11 = [
    "Choose from 150+ volunteer projects across 40+ countries worldwide",
    "Programs start from $25/day including accommodation and meals",
    "In-country support from local IVHQ staff",
    "Airport pickup and orientation included in program fee",
];

export const HERO_V12 =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80";
export const HERO_V8 =
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80";

export const program = {
    provider_name: "International Volunteer HQ (IVHQ)",
    is_paid: true,
    verified: true,
    rating: 4.7,
    reviews_count: 1238,
    logo: "https://placehold.co/75x75/0A5E85/FFFFFF/png?text=IVHQ",
};

export const locations = [
    { city: "San Jose", country: "Costa Rica" },
    { city: "Cape Town", country: "South Africa" },
    { city: "Cusco", country: "Peru" },
    { city: "Bali", country: "Indonesia" },
    { city: "Kathmandu", country: "Nepal" },
    { city: "", country: "Kenya" },
];

export const types = [
    "Childcare & Orphanages",
    "Teaching English",
    "Wildlife Conservation",
    "Construction & Renovation",
    "Medical & Healthcare",
];

export const costVariations = [
    { duration: "1 week", price: "295" },
    { duration: "2 weeks", price: "490" },
    { duration: "4 weeks", price: "890" },
    { duration: "12 weeks", price: "2,490" },
];

export const directoryChips = [
    "Volunteer Abroad",
    "Gap Year",
    "Adventure Travel",
    "Teen Programs",
    "Conservation",
    "Wildlife & Nature",
    "Community Development",
];

export const PROGRAM_DOMAIN = "https://www.goabroad.com";

export const BRAND_BLUE = "#295d82";

export const CTAS_V12 = ["Visit Website", "Inquire Here", "Apply Now"];
export const CTAS_V11 = ["Visit Website", "Inquire Here"];
export const CTAS_V8 = ["Inquire Here"];

export const GALLERY_V12 = ["m0", "m1", "m2", "m3", "m4", "m5"];
export const GALLERY_V11 = ["m0", "m1", "m2"];
export const GALLERY_V8 = ["m0", "m1"];

export const NAME_V11 = "Volunteer Abroad — IVHQ International Programs";

export const LOC_V12 = [
    "San Jose, Costa Rica",
    "Cape Town, South Africa",
    "Cusco, Peru",
    "Bali, Indonesia",
    "Kathmandu, Nepal",
    "Kenya",
];
export const LOC_V11 = [
    "San Jose, Costa Rica",
    "Cape Town, South Africa",
    "Bali, Indonesia",
    "Kathmandu, Nepal",
];
export const LOC_V8 = [
    "San Jose, Costa Rica",
    "Cusco, Peru",
    "Kenya",
];

export const TYPES_V12 = [
    "Childcare & Orphanages",
    "Teaching English",
    "Wildlife Conservation",
    "Construction & Renovation",
    "Medical & Healthcare",
];
export const TYPES_V11 = [
    "Childcare & Orphanages",
    "Teaching English",
    "Construction & Renovation",
];
export const TYPES_V8 = ["Childcare & Orphanages", "Construction"];

export const FAQS_V12 = [
    "What does the program fee cover?",
    "Is travel insurance included?",
    "How safe are the destinations?",
];
export const FAQS_V11 = [
    "What does the program fee cover?",
    "Is travel insurance included?",
];
export const FAQS_V8 = ["What does the program fee cover?"];

export const ACCOM_V12 = ["Volunteer House", "Host Family", "Hostel / Hotel"];
export const ACCOM_V11 = ["Volunteer House", "Host Family"];
export const ACCOM_V8 = ["Host Family"];

export const versionHistory: VersionSnapshot[] = [
    {
        id: "v12",
        timestamp: "2 min ago",
        absolute: "Jun 24, 2026 · 2:42 PM",
        dateGroup: "today",
        author: "Jezi Tobio",
        avatar: "JT",
        current: true,
        changes: ["Description", "Program Highlights"],
        data: {
            name: NAME_V12,
            description: DESC_V12,
            highlights: HIGHLIGHTS_V12,
            hero_image: HERO_V12,
            locations: LOC_V12,
            types: TYPES_V12,
            startsAt: "$295 for 1 week",
            ageRequirement: "18 years and older",
            accommodations: ACCOM_V12,
            faqs: FAQS_V12,
            ctas: CTAS_V12,
            gallery: GALLERY_V12,
        },
    },
    {
        id: "v11",
        timestamp: "Yesterday",
        absolute: "Jun 23, 2026 · 4:12 PM",
        dateGroup: "yesterday",
        author: "Maria Lopez",
        avatar: "ML",
        changes: [
            "Title",
            "Quick Details · Locations & Cost",
            "Media Gallery (+3 photos)",
            "FAQ (+1)",
            "Apply Now CTA added",
        ],
        data: {
            name: NAME_V11,
            description: DESC_V12,
            highlights: HIGHLIGHTS_V12,
            hero_image: HERO_V12,
            locations: LOC_V11,
            types: TYPES_V11,
            startsAt: "$345 for 1 week",
            ageRequirement: "18 years and older",
            accommodations: ACCOM_V11,
            faqs: FAQS_V11,
            ctas: CTAS_V11,
            gallery: GALLERY_V11,
        },
    },
    {
        id: "v10",
        timestamp: "3 days ago",
        absolute: "Jun 21, 2026 · 10:05 AM",
        dateGroup: "thisWeek",
        author: "System",
        avatar: "GA",
        changes: ["Approved by admin"],
        isSystem: true,
        data: {
            name: NAME_V11,
            description: DESC_V12,
            highlights: HIGHLIGHTS_V12,
            hero_image: HERO_V12,
            locations: LOC_V11,
            types: TYPES_V11,
            startsAt: "$345 for 1 week",
            ageRequirement: "18 years and older",
            accommodations: ACCOM_V11,
            faqs: FAQS_V11,
            ctas: CTAS_V11,
            gallery: GALLERY_V11,
        },
    },
    {
        id: "v9",
        timestamp: "Jun 18",
        absolute: "Jun 18, 2026 · 1:30 PM",
        dateGroup: "thisWeek",
        author: "Jezi Tobio",
        avatar: "JT",
        changes: ["Quick Details", "Cost Variations", "Locations"],
        data: {
            name: NAME_V11,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V12,
            locations: LOC_V8,
            types: TYPES_V11,
            startsAt: "$395 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V11,
            faqs: FAQS_V11,
            ctas: CTAS_V11,
            gallery: GALLERY_V11,
        },
    },
    {
        id: "v8",
        timestamp: "Jun 14",
        absolute: "Jun 14, 2026 · 9:18 AM",
        dateGroup: "earlier",
        author: "Daniel Reyes",
        avatar: "DR",
        changes: ["Hero image", "Title"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
    {
        id: "v7",
        timestamp: "Jun 9",
        absolute: "Jun 9, 2026 · 3:45 PM",
        dateGroup: "earlier",
        author: "Maria Lopez",
        avatar: "ML",
        changes: ["Description (minor edits)"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
    {
        id: "v6",
        timestamp: "Jun 4",
        absolute: "Jun 4, 2026 · 11:02 AM",
        dateGroup: "earlier",
        author: "System",
        avatar: "GA",
        isSystem: true,
        changes: ["Auto-renewed", "Approved by admin"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
    {
        id: "v5",
        timestamp: "May 28",
        absolute: "May 28, 2026 · 8:30 AM",
        dateGroup: "earlier",
        author: "Jezi Tobio",
        avatar: "JT",
        changes: ["Accommodation Options", "Application Procedures"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
    {
        id: "v4",
        timestamp: "May 19",
        absolute: "May 19, 2026 · 4:20 PM",
        dateGroup: "earlier",
        author: "Daniel Reyes",
        avatar: "DR",
        changes: ["Pricing", "Refund Policy", "Payment Terms"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
    {
        id: "v3",
        timestamp: "May 7",
        absolute: "May 7, 2026 · 9:00 AM",
        dateGroup: "earlier",
        author: "Maria Lopez",
        avatar: "ML",
        changes: ["Hero image (initial upload)", "Media Gallery"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
    {
        id: "v2",
        timestamp: "Apr 22",
        absolute: "Apr 22, 2026 · 2:15 PM",
        dateGroup: "earlier",
        author: "System",
        avatar: "GA",
        isSystem: true,
        changes: ["Initial approval"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
    {
        id: "v1",
        timestamp: "Apr 18",
        absolute: "Apr 18, 2026 · 10:30 AM",
        dateGroup: "earlier",
        author: "Jezi Tobio",
        avatar: "JT",
        changes: ["Listing created"],
        data: {
            name: NAME_V8,
            description: DESC_V11,
            highlights: HIGHLIGHTS_V11,
            hero_image: HERO_V8,
            locations: LOC_V8,
            types: TYPES_V8,
            startsAt: "$425 for 1 week",
            ageRequirement: "21 years and older",
            accommodations: ACCOM_V8,
            faqs: FAQS_V8,
            ctas: CTAS_V8,
            gallery: GALLERY_V8,
        },
    },
];

export const DESIGN_TOGGLE_HEIGHT = 44;

export const CTA_STYLES: Record<string, string> = {
    "Visit Website": "bg-roman-500",
    "Inquire Here": "bg-cobalt-500",
    "Apply Now": "bg-cobalt-500",
};

export const FIELD_LABELS: Record<string, string> = {
    name: "Program Title",
    description: "Description",
    highlights: "Program Highlights",
    hero_image: "Hero Image",
    locations: "Locations",
    types: "Types & Subjects",
    startsAt: "Starts At",
    ageRequirement: "Age Requirement",
    accommodations: "Accommodation Options",
    faqs: "FAQs",
    ctas: "Hero CTAs",
    gallery: "Media Gallery",
};

export const galleryMedia = [
    {
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
        caption:
            "Volunteers planting trees in the rainforest as part of our reforestation project in Costa Rica.",
    },
    {
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
    },
    {
        image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=600&q=80",
        isVideo: true,
    },
    {
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    },
    {
        image: "https://images.unsplash.com/photo-1502780402662-acc01917cf4b?auto=format&fit=crop&w=600&q=80",
    },
    {
        image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=600&q=80",
    },
];

export const faqs = [
    {
        question: "What does the program fee cover?",
        answer:
            "Program fees include accommodation, meals (typically breakfast and dinner), airport pickup, in-country orientation, 24/7 in-country support, and all project-related expenses.",
    },
    {
        question: "Is travel insurance included?",
        answer:
            "Travel insurance is not included in the program fee but is mandatory. We can recommend trusted providers.",
    },
    {
        question: "How safe are the destinations?",
        answer:
            "All destinations are carefully vetted. We have local teams on the ground providing 24/7 support to ensure your safety throughout your program.",
    },
];
