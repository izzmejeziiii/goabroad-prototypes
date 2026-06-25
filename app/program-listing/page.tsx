"use client";

import {
    useRef,
    useState,
    createContext,
    useContext,
    type ReactNode,
} from "react";
import Link from "next/link";
import {
    FaChevronRight,
    FaCheckCircle,
    FaArrowCircleDown,
    FaTrash,
} from "react-icons/fa";
import { IoMdStar, IoMdRibbon, IoMdCloseCircle } from "react-icons/io";
import {
    HiOutlineHeart,
    HiPencil,
    HiOutlineChat,
    HiStar,
    HiArrowSmRight,
    HiOutlineCurrencyDollar,
    HiOutlineExternalLink,
    HiChevronDown,
    HiPlus,
} from "react-icons/hi";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { LuShieldCheck } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import {
    MdKeyboardArrowLeft,
    MdInfoOutline,
    MdClose,
    MdHistory,
    MdOutlineVisibility,
    MdCheckCircle,
    MdContentCopy,
    MdCheck,
    MdTune,
} from "react-icons/md";
import {
    MdEventAvailable,
    MdLibraryBooks,
    MdPolicy,
    MdEdit,
    MdDelete,
    MdChevronLeft,
    MdChevronRight,
} from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { PiImage, PiVideo } from "react-icons/pi";
import { FaCirclePlay } from "react-icons/fa6";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
    PiShieldWarningBold,
    PiListChecksBold,
    PiHouseBold,
    PiCaretDownBold,
} from "react-icons/pi";
import { RiGuideFill } from "react-icons/ri";
import { TiFlowMerge } from "react-icons/ti";
import { LiaMoneyBillSolid } from "react-icons/lia";

const NAME_V12 = "Volunteer Abroad with International Volunteer HQ (IVHQ)";
const NAME_V8 = "IVHQ Volunteer Programs Abroad";

const DESC_V12 =
    "International Volunteer HQ (IVHQ) is the world's leading volunteer abroad organization, offering safe, trusted, affordable and high-impact volunteer programs in over 50 destinations. Since 2007, IVHQ has helped more than 130,000 people travel and volunteer abroad. With local teams on the ground in every destination, IVHQ provides 24/7 in-country support, comprehensive pre-departure assistance, and a wide range of meaningful projects designed to support communities and create lasting positive change. Whether you're interested in childcare, conservation, teaching, medical, construction or animal welfare, IVHQ has a project that matches your interests, skills, and schedule. Programs start at affordable rates and include accommodation, meals, airport pickup, orientation, and 24/7 support.";
const DESC_V11 =
    "International Volunteer HQ (IVHQ) is a leading volunteer abroad organization offering safe, affordable programs in over 50 destinations. Since 2007, IVHQ has helped more than 100,000 people travel and volunteer abroad. With local teams on the ground, IVHQ provides in-country support, pre-departure assistance, and a wide range of projects designed to support communities. Whether you're interested in childcare, conservation, teaching, medical or construction, IVHQ has a project that matches your interests and schedule. Programs include accommodation, meals, airport pickup, and orientation.";

const HIGHLIGHTS_V12 = [
    "Choose from 200+ volunteer projects across 50+ countries worldwide",
    "Programs start from just $20/day including accommodation and meals",
    "24/7 in-country support from local IVHQ staff who know the destinations",
    "Travel insurance, airport pickup, and orientation included in program fee",
    "Join a global community of 130,000+ alumni who've volunteered with IVHQ",
];
const HIGHLIGHTS_V11 = [
    "Choose from 150+ volunteer projects across 40+ countries worldwide",
    "Programs start from $25/day including accommodation and meals",
    "In-country support from local IVHQ staff",
    "Airport pickup and orientation included in program fee",
];

const HERO_V12 =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80";
const HERO_V8 =
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80";

const program = {
    provider_name: "International Volunteer HQ (IVHQ)",
    is_paid: true,
    verified: true,
    rating: 4.7,
    reviews_count: 1238,
    logo: "https://placehold.co/75x75/0A5E85/FFFFFF/png?text=IVHQ",
};

const locations = [
    { city: "San Jose", country: "Costa Rica" },
    { city: "Cape Town", country: "South Africa" },
    { city: "Cusco", country: "Peru" },
    { city: "Bali", country: "Indonesia" },
    { city: "Kathmandu", country: "Nepal" },
    { city: "", country: "Kenya" },
];

const types = [
    "Childcare & Orphanages",
    "Teaching English",
    "Wildlife Conservation",
    "Construction & Renovation",
    "Medical & Healthcare",
];

const costVariations = [
    { duration: "1 week", price: "295" },
    { duration: "2 weeks", price: "490" },
    { duration: "4 weeks", price: "890" },
    { duration: "12 weeks", price: "2,490" },
];

const directoryChips = [
    "Volunteer Abroad",
    "Gap Year",
    "Adventure Travel",
    "Teen Programs",
    "Conservation",
    "Wildlife & Nature",
    "Community Development",
];

const PROGRAM_DOMAIN = "https://www.goabroad.com";

const BRAND_BLUE = "#295d82";

type VersionSnapshot = {
    id: string;
    timestamp: string;
    absolute: string;
    dateGroup: "today" | "yesterday" | "thisWeek" | "earlier";
    author: string;
    avatar: string;
    isSystem?: boolean;
    current?: boolean;
    changes: string[];
    data: {
        name: string;
        description: string;
        highlights: string[];
        hero_image: string;
        locations: string[];
        types: string[];
        startsAt: string;
        ageRequirement: string;
        accommodations: string[];
        faqs: string[];
        ctas: string[];
        gallery: string[];
    };
};

const CTAS_V12 = ["Visit Website", "Inquire Here", "Apply Now"];
const CTAS_V11 = ["Visit Website", "Inquire Here"];
const CTAS_V8 = ["Inquire Here"];

const GALLERY_V12 = ["m0", "m1", "m2", "m3", "m4", "m5"];
const GALLERY_V11 = ["m0", "m1", "m2"];
const GALLERY_V8 = ["m0", "m1"];

const NAME_V11 = "Volunteer Abroad — IVHQ International Programs";

const LOC_V12 = [
    "San Jose, Costa Rica",
    "Cape Town, South Africa",
    "Cusco, Peru",
    "Bali, Indonesia",
    "Kathmandu, Nepal",
    "Kenya",
];
const LOC_V11 = [
    "San Jose, Costa Rica",
    "Cape Town, South Africa",
    "Bali, Indonesia",
    "Kathmandu, Nepal",
];
const LOC_V8 = [
    "San Jose, Costa Rica",
    "Cusco, Peru",
    "Kenya",
];

const TYPES_V12 = [
    "Childcare & Orphanages",
    "Teaching English",
    "Wildlife Conservation",
    "Construction & Renovation",
    "Medical & Healthcare",
];
const TYPES_V11 = [
    "Childcare & Orphanages",
    "Teaching English",
    "Construction & Renovation",
];
const TYPES_V8 = ["Childcare & Orphanages", "Construction"];

const FAQS_V12 = [
    "What does the program fee cover?",
    "Is travel insurance included?",
    "How safe are the destinations?",
];
const FAQS_V11 = [
    "What does the program fee cover?",
    "Is travel insurance included?",
];
const FAQS_V8 = ["What does the program fee cover?"];

const ACCOM_V12 = ["Volunteer House", "Host Family", "Hostel / Hotel"];
const ACCOM_V11 = ["Volunteer House", "Host Family"];
const ACCOM_V8 = ["Host Family"];

const versionHistory: VersionSnapshot[] = [
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

type DesignVersion = "v1" | "v2" | "v3";

type VersionContextValue = {
    active: VersionSnapshot;
    isHistorical: boolean;
    changedFields: Set<string>;
    viewVersion: (id: string) => void;
    restoreCurrent: () => void;
    designVersion: DesignVersion;
    diffMode: boolean;
    // When true, the inline diff should only highlight what was added/changed
    // in the recent edit (used by V3). When false, the full GitHub-style diff
    // with both removed and added is shown (used by V2).
    omitRemoved: boolean;
    // When true, the listing is being rendered in visitor-preview mode —
    // edit icons / admin affordances should be hidden and no diff annotations
    // shown. This is set inside the Preview overlay.
    previewMode: boolean;
    openPreview: () => void;
    previousVersion: VersionSnapshot;
};

const VersionContext = createContext<VersionContextValue | null>(null);

const useVersion = () => {
    const ctx = useContext(VersionContext);
    if (!ctx) throw new Error("VersionContext missing");
    return ctx;
};

const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

const computeChangedFields = (snapshot: VersionSnapshot) => {
    const current = versionHistory[0].data;
    const s = new Set<string>();
    if (snapshot.data.name !== current.name) s.add("name");
    if (snapshot.data.description !== current.description)
        s.add("description");
    if (!arraysEqual(snapshot.data.highlights, current.highlights))
        s.add("highlights");
    if (snapshot.data.hero_image !== current.hero_image) s.add("hero_image");
    if (!arraysEqual(snapshot.data.locations, current.locations))
        s.add("locations");
    if (!arraysEqual(snapshot.data.types, current.types)) s.add("types");
    if (snapshot.data.startsAt !== current.startsAt) s.add("startsAt");
    if (snapshot.data.ageRequirement !== current.ageRequirement)
        s.add("ageRequirement");
    if (!arraysEqual(snapshot.data.accommodations, current.accommodations))
        s.add("accommodations");
    if (!arraysEqual(snapshot.data.faqs, current.faqs)) s.add("faqs");
    if (!arraysEqual(snapshot.data.ctas, current.ctas)) s.add("ctas");
    if (!arraysEqual(snapshot.data.gallery, current.gallery))
        s.add("gallery");
    return s;
};

type DiffField = {
    field: string;
    type: "text" | "image" | "list";
    left: string | string[];
    right: string | string[];
};

const computeDiff = (a: VersionSnapshot, b: VersionSnapshot): DiffField[] => {
    const diffs: DiffField[] = [];
    if (a.data.name !== b.data.name) {
        diffs.push({
            field: "Program Title",
            type: "text",
            left: a.data.name,
            right: b.data.name,
        });
    }
    if (a.data.hero_image !== b.data.hero_image) {
        diffs.push({
            field: "Hero Image",
            type: "image",
            left: a.data.hero_image,
            right: b.data.hero_image,
        });
    }
    if (a.data.description !== b.data.description) {
        diffs.push({
            field: "Description",
            type: "text",
            left: a.data.description,
            right: b.data.description,
        });
    }
    if (!arraysEqual(a.data.highlights, b.data.highlights)) {
        diffs.push({
            field: "Program Highlights",
            type: "list",
            left: a.data.highlights,
            right: b.data.highlights,
        });
    }
    if (!arraysEqual(a.data.locations, b.data.locations)) {
        diffs.push({
            field: "Locations",
            type: "list",
            left: a.data.locations,
            right: b.data.locations,
        });
    }
    if (!arraysEqual(a.data.types, b.data.types)) {
        diffs.push({
            field: "Types & Subjects",
            type: "list",
            left: a.data.types,
            right: b.data.types,
        });
    }
    if (a.data.startsAt !== b.data.startsAt) {
        diffs.push({
            field: "Starts At",
            type: "text",
            left: a.data.startsAt,
            right: b.data.startsAt,
        });
    }
    if (a.data.ageRequirement !== b.data.ageRequirement) {
        diffs.push({
            field: "Age Requirement",
            type: "text",
            left: a.data.ageRequirement,
            right: b.data.ageRequirement,
        });
    }
    if (!arraysEqual(a.data.accommodations, b.data.accommodations)) {
        diffs.push({
            field: "Accommodation Options",
            type: "list",
            left: a.data.accommodations,
            right: b.data.accommodations,
        });
    }
    if (!arraysEqual(a.data.faqs, b.data.faqs)) {
        diffs.push({
            field: "FAQs",
            type: "list",
            left: a.data.faqs,
            right: b.data.faqs,
        });
    }
    return diffs;
};

const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const summarizeDiff = (d: DiffField) => {
    if (d.type === "list") {
        const left = d.left as string[];
        const right = d.right as string[];
        const added = right.filter((x) => !left.includes(x)).length;
        const removed = left.filter((x) => !right.includes(x)).length;
        return { added, removed, edited: 0 };
    }
    return { added: 0, removed: 0, edited: 1 };
};

const aggregateChanges = (diffs: DiffField[]) => {
    let added = 0,
        removed = 0,
        edited = 0;
    diffs.forEach((d) => {
        const s = summarizeDiff(d);
        added += s.added;
        removed += s.removed;
        edited += s.edited;
    });
    return { added, removed, edited };
};

const VersionPicker = ({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: (id: string) => void;
    label: string;
}) => {
    const v = versionHistory.find((x) => x.id === value)!;
    return (
        <div className="flex flex-col gap-1 flex-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                {label}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="text-sm border border-slate-200 rounded-md px-3 py-2 bg-white outline-none focus:border-slate-400"
            >
                {versionHistory.map((ver) => (
                    <option key={ver.id} value={ver.id}>
                        {ver.id.toUpperCase()} · {ver.author} · {ver.timestamp}
                        {ver.current ? " (current)" : ""}
                    </option>
                ))}
            </select>
            <span className="text-[11px] text-slate-400">{v.absolute}</span>
        </div>
    );
};

const DiffTextBox = ({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: "left" | "right";
}) => (
    <div className="flex flex-col gap-1.5 flex-1">
        <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tone === "left" ? "#9c4640" : "#246b3a" }}
        >
            {label}
        </span>
        <div
            className="text-sm rounded-md border p-3 whitespace-pre-wrap break-words"
            style={{
                backgroundColor: tone === "left" ? "#fef2f2" : "#f0fdf4",
                borderColor: tone === "left" ? "#fecaca" : "#bbf7d0",
                color: tone === "left" ? "#7f1d1d" : "#14532d",
            }}
        >
            {value}
        </div>
    </div>
);

const DiffListBox = ({
    label,
    items,
    tone,
    other,
}: {
    label: string;
    items: string[];
    tone: "left" | "right";
    other: string[];
}) => (
    <div className="flex flex-col gap-1.5 flex-1">
        <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tone === "left" ? "#9c4640" : "#246b3a" }}
        >
            {label}
        </span>
        <ul
            className="text-sm rounded-md border p-3 list-none flex flex-col gap-1.5"
            style={{
                backgroundColor: tone === "left" ? "#fef2f2" : "#f0fdf4",
                borderColor: tone === "left" ? "#fecaca" : "#bbf7d0",
                color: tone === "left" ? "#7f1d1d" : "#14532d",
            }}
        >
            {items.map((item, i) => {
                const inOther = other.includes(item);
                return (
                    <li key={i} className="flex gap-2">
                        <span className="font-bold shrink-0">
                            {inOther ? "•" : tone === "left" ? "−" : "+"}
                        </span>
                        <span
                            className={
                                inOther ? "opacity-60" : "font-medium"
                            }
                        >
                            {item}
                        </span>
                    </li>
                );
            })}
        </ul>
    </div>
);

const DiffImageBox = ({
    label,
    src,
    tone,
}: {
    label: string;
    src: string;
    tone: "left" | "right";
}) => (
    <div className="flex flex-col gap-1.5 flex-1">
        <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tone === "left" ? "#9c4640" : "#246b3a" }}
        >
            {label}
        </span>
        <div
            className="rounded-md border overflow-hidden"
            style={{
                borderColor: tone === "left" ? "#fecaca" : "#bbf7d0",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt=""
                className="w-full h-[180px] object-cover"
            />
        </div>
    </div>
);

const ChangeStatPills = ({
    added,
    removed,
    edited,
}: {
    added: number;
    removed: number;
    edited: number;
}) => (
    <div className="flex items-center gap-2 text-[11px] font-bold">
        {edited > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-sun-500/15 text-sun-700">
                <span className="w-1.5 h-1.5 rounded-full bg-sun-500" />
                {edited} edited
            </span>
        )}
        {added > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-fern-500/15 text-fern-700">
                <span className="w-1.5 h-1.5 rounded-full bg-fern-500" />
                +{added} added
            </span>
        )}
        {removed > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-roman-500/15 text-roman-700">
                <span className="w-1.5 h-1.5 rounded-full bg-roman-500" />
                −{removed} removed
            </span>
        )}
    </div>
);

const CompareVersionsModal = ({
    onClose,
    lockToRecent = false,
}: {
    onClose: () => void;
    lockToRecent?: boolean;
}) => {
    const { active, previousVersion } = useVersion();
    const [leftId, setLeftId] = useState(
        lockToRecent
            ? previousVersion.id
            : (() => {
                  const idx = versionHistory.findIndex(
                      (v) => v.id === active.id
                  );
                  return versionHistory[
                      Math.min(idx + 1, versionHistory.length - 1)
                  ].id;
              })()
    );
    const [rightId, setRightId] = useState(
        lockToRecent ? versionHistory[0].id : active.id
    );
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const left = versionHistory.find((v) => v.id === leftId)!;
    const right = versionHistory.find((v) => v.id === rightId)!;
    const diffs = computeDiff(left, right);
    const totals = aggregateChanges(diffs);

    const toggleCollapsed = (slug: string) =>
        setCollapsed((p) => ({ ...p, [slug]: !p[slug] }));

    const collapseAll = () => {
        const all: Record<string, boolean> = {};
        diffs.forEach((d) => {
            all[slugify(d.field)] = true;
        });
        setCollapsed(all);
    };

    const expandAll = () => setCollapsed({});

    const scrollTo = (slug: string) => {
        const el = scrollRef.current?.querySelector(`[data-anchor="${slug}"]`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveAnchor(slug);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[1200px] h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-5 h-5"
                            style={{ color: BRAND_BLUE }}
                        />
                        <h2 className="text-lg font-bold text-slate-800">
                            {lockToRecent
                                ? "Recent Change Summary"
                                : "Compare Versions"}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-slate-100"
                    >
                        <MdClose className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Version pickers + summary (or locked recent-edit header) */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-end gap-4">
                    {lockToRecent ? (
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                    style={{
                                        backgroundColor: left.isSystem
                                            ? "#94a3b8"
                                            : BRAND_BLUE,
                                    }}
                                >
                                    {left.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                        Previous · {left.id.toUpperCase()}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {left.author}
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        {left.absolute}
                                    </span>
                                </div>
                            </div>
                            <HiArrowSmRight className="text-slate-400 w-6 h-6" />
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                    style={{
                                        backgroundColor: right.isSystem
                                            ? "#94a3b8"
                                            : BRAND_BLUE,
                                    }}
                                >
                                    {right.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                        Current · {right.id.toUpperCase()}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {right.author}
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        {right.absolute}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <VersionPicker
                                value={leftId}
                                onChange={setLeftId}
                                label="Compare From"
                            />
                            <HiArrowSmRight className="text-slate-400 w-6 h-6 mb-4" />
                            <VersionPicker
                                value={rightId}
                                onChange={setRightId}
                                label="To"
                            />
                        </>
                    )}
                    <div className="ml-auto flex flex-col items-end gap-1.5 mb-1">
                        {diffs.length === 0 ? (
                            <span className="text-sm font-semibold text-slate-500">
                                No differences
                            </span>
                        ) : (
                            <>
                                <span
                                    className="text-sm font-bold"
                                    style={{ color: BRAND_BLUE }}
                                >
                                    {diffs.length} field
                                    {diffs.length === 1 ? "" : "s"} changed
                                </span>
                                <ChangeStatPills {...totals} />
                            </>
                        )}
                    </div>
                </div>

                {/* Body: sidebar + diff list */}
                {diffs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2">
                        <MdCheckCircle className="w-12 h-12 text-fern-500" />
                        <p className="text-slate-600 text-sm">
                            These two versions are identical.
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex min-h-0">
                        {/* Sidebar — sticky jump nav */}
                        <aside className="w-[240px] shrink-0 border-r border-slate-200 bg-slate-50/40 overflow-y-auto">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-slate-50/95 backdrop-blur z-10">
                                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                    Changed Fields
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={expandAll}
                                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-800"
                                        title="Expand all"
                                    >
                                        Expand
                                    </button>
                                    <span className="text-slate-300">|</span>
                                    <button
                                        type="button"
                                        onClick={collapseAll}
                                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-800"
                                        title="Collapse all"
                                    >
                                        Collapse
                                    </button>
                                </div>
                            </div>
                            <ul className="p-2 flex flex-col gap-0.5">
                                {diffs.map((d) => {
                                    const slug = slugify(d.field);
                                    const s = summarizeDiff(d);
                                    const isActive = activeAnchor === slug;
                                    return (
                                        <li key={slug}>
                                            <button
                                                type="button"
                                                onClick={() => scrollTo(slug)}
                                                className={`w-full text-left rounded-md px-2.5 py-2 transition-colors ${
                                                    isActive
                                                        ? "bg-white shadow-sm border border-slate-200"
                                                        : "hover:bg-white"
                                                }`}
                                            >
                                                <div className="text-xs font-semibold text-slate-800">
                                                    {d.field}
                                                </div>
                                                <div className="mt-1 flex items-center gap-1 flex-wrap">
                                                    {s.edited > 0 && (
                                                        <span className="text-[10px] rounded px-1 py-px bg-sun-500/15 text-sun-700 font-bold">
                                                            edited
                                                        </span>
                                                    )}
                                                    {s.added > 0 && (
                                                        <span className="text-[10px] rounded px-1 py-px bg-fern-500/15 text-fern-700 font-bold">
                                                            +{s.added}
                                                        </span>
                                                    )}
                                                    {s.removed > 0 && (
                                                        <span className="text-[10px] rounded px-1 py-px bg-roman-500/15 text-roman-700 font-bold">
                                                            −{s.removed}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>

                        {/* Main diff list */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-6 py-5 bg-white"
                        >
                            <div className="space-y-4">
                                {diffs.map((d) => {
                                    const slug = slugify(d.field);
                                    const isCollapsed = collapsed[slug];
                                    const s = summarizeDiff(d);
                                    return (
                                        <div
                                            key={slug}
                                            data-anchor={slug}
                                            className="border border-slate-200 rounded-lg overflow-hidden scroll-mt-2"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleCollapsed(slug)
                                                }
                                                className="w-full px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <HiChevronDown
                                                        className={`text-slate-500 transition-transform ${
                                                            isCollapsed
                                                                ? "-rotate-90"
                                                                : ""
                                                        }`}
                                                    />
                                                    <h3 className="text-sm font-bold text-slate-800">
                                                        {d.field}
                                                    </h3>
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                                        {d.type}
                                                    </span>
                                                </div>
                                                <ChangeStatPills {...s} />
                                            </button>
                                            {!isCollapsed && (
                                                <div className="p-4 flex gap-4">
                                                    {d.type === "text" && (
                                                        <>
                                                            <DiffTextBox
                                                                label={`${left.id.toUpperCase()} · Before`}
                                                                value={
                                                                    d.left as string
                                                                }
                                                                tone="left"
                                                            />
                                                            <DiffTextBox
                                                                label={`${right.id.toUpperCase()} · After`}
                                                                value={
                                                                    d.right as string
                                                                }
                                                                tone="right"
                                                            />
                                                        </>
                                                    )}
                                                    {d.type === "list" && (
                                                        <>
                                                            <DiffListBox
                                                                label={`${left.id.toUpperCase()} · Before`}
                                                                items={
                                                                    d.left as string[]
                                                                }
                                                                other={
                                                                    d.right as string[]
                                                                }
                                                                tone="left"
                                                            />
                                                            <DiffListBox
                                                                label={`${right.id.toUpperCase()} · After`}
                                                                items={
                                                                    d.right as string[]
                                                                }
                                                                other={
                                                                    d.left as string[]
                                                                }
                                                                tone="right"
                                                            />
                                                        </>
                                                    )}
                                                    {d.type === "image" && (
                                                        <>
                                                            <DiffImageBox
                                                                label={`${left.id.toUpperCase()} · Before`}
                                                                src={
                                                                    d.left as string
                                                                }
                                                                tone="left"
                                                            />
                                                            <DiffImageBox
                                                                label={`${right.id.toUpperCase()} · After`}
                                                                src={
                                                                    d.right as string
                                                                }
                                                                tone="right"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                        Comparing <strong>{left.id}</strong> ({left.author}) →{" "}
                        <strong>{right.id}</strong> ({right.author})
                    </span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm px-4 py-2 rounded-md text-slate-600 hover:bg-white border border-slate-200"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="text-sm font-bold px-4 py-2 rounded-md text-white shadow-sm"
                            style={{ backgroundColor: BRAND_BLUE }}
                        >
                            Restore {left.id.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FullHistoryModal = ({ onClose }: { onClose: () => void }) => {
    const { active, viewVersion } = useVersion();
    const [search, setSearch] = useState("");
    const [authorFilter, setAuthorFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState<"all" | "user" | "system">(
        "all"
    );

    const authors = Array.from(
        new Set(versionHistory.map((v) => v.author))
    ).sort();

    const filtered = versionHistory.filter((v) => {
        if (
            search &&
            ![v.author, v.id, ...v.changes].some((t) =>
                t.toLowerCase().includes(search.toLowerCase())
            )
        )
            return false;
        if (authorFilter !== "all" && v.author !== authorFilter) return false;
        if (typeFilter === "user" && v.isSystem) return false;
        if (typeFilter === "system" && !v.isSystem) return false;
        return true;
    });

    const groups: Record<
        VersionSnapshot["dateGroup"],
        { label: string; items: VersionSnapshot[] }
    > = {
        today: { label: "Today", items: [] },
        yesterday: { label: "Yesterday", items: [] },
        thisWeek: { label: "This Week", items: [] },
        earlier: { label: "Earlier", items: [] },
    };
    filtered.forEach((v) => groups[v.dateGroup].items.push(v));
    const groupOrder: VersionSnapshot["dateGroup"][] = [
        "today",
        "yesterday",
        "thisWeek",
        "earlier",
    ];

    const totalUserEdits = versionHistory.filter((v) => !v.isSystem).length;
    const totalAuthors = authors.length;

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[960px] h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-5 h-5"
                            style={{ color: BRAND_BLUE }}
                        />
                        <h2 className="text-lg font-bold text-slate-800">
                            Full Version History
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-slate-100"
                    >
                        <MdClose className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Stats strip */}
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Total Versions
                        </span>
                        <span
                            className="text-xl font-bold"
                            style={{ color: BRAND_BLUE }}
                        >
                            {versionHistory.length}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Editors
                        </span>
                        <span className="text-xl font-bold text-slate-800">
                            {totalAuthors}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Manual Edits
                        </span>
                        <span className="text-xl font-bold text-slate-800">
                            {totalUserEdits}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Created
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                            Apr 18, 2026
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="px-6 py-3 border-b border-slate-200 flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-[240px] relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by author, version, or change..."
                            className="w-full text-sm border border-slate-200 rounded-md pl-3 pr-3 py-2 outline-none focus:border-slate-400"
                        />
                    </div>
                    <select
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="text-sm border border-slate-200 rounded-md px-3 py-2 bg-white outline-none focus:border-slate-400"
                    >
                        <option value="all">All authors</option>
                        {authors.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center bg-slate-100 rounded-md p-0.5">
                        {(["all", "user", "system"] as const).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTypeFilter(t)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors ${
                                    typeFilter === t
                                        ? "bg-white shadow-sm text-slate-800"
                                        : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {t === "all"
                                    ? "All"
                                    : t === "user"
                                      ? "Manual"
                                      : "System"}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs text-slate-500 ml-auto">
                        {filtered.length} of {versionHistory.length}
                    </span>
                </div>

                {/* Timeline */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {filtered.length === 0 ? (
                        <p className="text-center text-slate-500 py-12 text-sm">
                            No versions match your filters.
                        </p>
                    ) : (
                        groupOrder.map((g) =>
                            groups[g].items.length === 0 ? null : (
                                <div key={g} className="mb-6">
                                    <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3 sticky top-0 bg-white py-1 z-10">
                                        {groups[g].label}{" "}
                                        <span className="text-slate-400">
                                            · {groups[g].items.length}
                                        </span>
                                    </h3>
                                    <ol className="relative">
                                        {/* timeline rail */}
                                        <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" />
                                        {groups[g].items.map((v) => {
                                            const isActive = v.id === active.id;
                                            return (
                                                <li
                                                    key={v.id}
                                                    className="relative pl-12 pb-4 last:pb-0 group"
                                                >
                                                    {/* timeline dot */}
                                                    <div
                                                        className="absolute left-1 top-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-4 ring-white"
                                                        style={{
                                                            backgroundColor:
                                                                v.isSystem
                                                                    ? "#94a3b8"
                                                                    : BRAND_BLUE,
                                                        }}
                                                    >
                                                        {v.avatar}
                                                    </div>
                                                    <div
                                                        className={`rounded-lg border p-3 transition-colors ${
                                                            isActive
                                                                ? "border-cobalt-300 bg-cobalt-50/40"
                                                                : "border-slate-200 hover:border-slate-300 bg-white"
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span className="text-sm font-bold text-slate-800">
                                                                        {v.author}
                                                                    </span>
                                                                    <span className="text-[11px] text-slate-400 font-mono">
                                                                        {v.id.toUpperCase()}
                                                                    </span>
                                                                    {v.current && (
                                                                        <span
                                                                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    "#e7f2eb",
                                                                                color: "#246b3a",
                                                                            }}
                                                                        >
                                                                            <MdCheckCircle className="w-2.5 h-2.5" />
                                                                            Current
                                                                        </span>
                                                                    )}
                                                                    {v.isSystem && (
                                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                                                                            System
                                                                        </span>
                                                                    )}
                                                                    {isActive &&
                                                                        !v.current && (
                                                                            <span
                                                                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded text-white"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        BRAND_BLUE,
                                                                                }}
                                                                            >
                                                                                Viewing
                                                                            </span>
                                                                        )}
                                                                </div>
                                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                                    {v.timestamp}{" "}
                                                                    ·{" "}
                                                                    <span className="text-slate-400">
                                                                        {v.absolute}
                                                                    </span>
                                                                </p>
                                                                <div className="mt-2 flex flex-wrap gap-1">
                                                                    {v.changes.map(
                                                                        (
                                                                            c,
                                                                            i
                                                                        ) => (
                                                                            <span
                                                                                key={i}
                                                                                className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                                                                            >
                                                                                {c}
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        viewVersion(
                                                                            v.id
                                                                        );
                                                                        onClose();
                                                                    }}
                                                                    className="text-[11px] font-semibold border border-slate-200 rounded px-2 py-1 hover:bg-white"
                                                                    style={{
                                                                        color: BRAND_BLUE,
                                                                    }}
                                                                    title="View listing at this version"
                                                                >
                                                                    View
                                                                </button>
                                                                {!v.current && (
                                                                    <button
                                                                        type="button"
                                                                        className="text-[11px] font-semibold border border-slate-200 rounded px-2 py-1 hover:bg-white text-slate-700"
                                                                        title="Restore this version"
                                                                    >
                                                                        Restore
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            )
                        )
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                        Showing {filtered.length} of {versionHistory.length}{" "}
                        version{versionHistory.length === 1 ? "" : "s"}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm px-4 py-2 rounded-md text-slate-600 hover:bg-white border border-slate-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const summarizeField = (
    field: string,
    prev: VersionSnapshot,
    cur: VersionSnapshot
): string | null => {
    const a = prev.data;
    const b = cur.data;
    switch (field) {
        case "name":
            return "Program title was updated";
        case "description":
            return "Description was rewritten";
        case "highlights":
            return "Program highlights were edited";
        case "hero_image":
            return "Hero image was replaced";
        case "locations": {
            const added = b.locations.filter((x) => !a.locations.includes(x))
                .length;
            const removed = a.locations.filter((x) => !b.locations.includes(x))
                .length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `Locations · ${parts.join(", ")}`;
        }
        case "types": {
            const added = b.types.filter((x) => !a.types.includes(x)).length;
            const removed = a.types.filter((x) => !b.types.includes(x)).length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `Types & Subjects · ${parts.join(", ")}`;
        }
        case "startsAt":
            return `Starting price updated · ${a.startsAt} → ${b.startsAt}`;
        case "ageRequirement":
            return `Age requirement · ${a.ageRequirement} → ${b.ageRequirement}`;
        case "accommodations": {
            const added = b.accommodations.filter(
                (x) => !a.accommodations.includes(x)
            ).length;
            const removed = a.accommodations.filter(
                (x) => !b.accommodations.includes(x)
            ).length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `Accommodation Options · ${parts.join(", ")}`;
        }
        case "faqs": {
            const added = b.faqs.filter((x) => !a.faqs.includes(x)).length;
            const removed = a.faqs.filter((x) => !b.faqs.includes(x)).length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `FAQs · ${parts.join(", ")}`;
        }
        case "ctas": {
            const added = b.ctas.filter((x) => !a.ctas.includes(x));
            const removed = a.ctas.filter((x) => !b.ctas.includes(x));
            const parts = [];
            if (added.length) parts.push(`+${added.join(", ")}`);
            if (removed.length) parts.push(`−${removed.join(", ")}`);
            return `Hero CTAs · ${parts.join(" · ")}`;
        }
        case "gallery": {
            const added = b.gallery.length - a.gallery.length;
            return `Media Gallery · ${
                added > 0
                    ? `+${added} new photo(s) added`
                    : `${Math.abs(added)} photo(s) removed`
            }`;
        }
        default:
            return null;
    }
};

const FIELD_LABELS: Record<string, string> = {
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

const RecentChangeSummaryModal = ({ onClose }: { onClose: () => void }) => {
    const { previousVersion } = useVersion();
    const current = versionHistory[0];
    const changedKeys = Array.from(computeChangedFields(previousVersion));

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[640px] max-h-[85vh] flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-5 h-5"
                            style={{ color: BRAND_BLUE }}
                        />
                        <h2 className="text-lg font-bold text-slate-800">
                            Recent Change
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-slate-100"
                    >
                        <MdClose className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Author + timestamp block */}
                <div
                    className="px-6 py-5 border-b border-slate-200"
                    style={{ backgroundColor: `${BRAND_BLUE}08` }}
                >
                    <div className="flex items-start gap-4">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm"
                            style={{
                                backgroundColor: current.isSystem
                                    ? "#94a3b8"
                                    : BRAND_BLUE,
                            }}
                        >
                            {current.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-base font-bold text-slate-800">
                                    {current.author}
                                </span>
                                <span className="font-mono text-[11px] text-slate-400">
                                    {current.id.toUpperCase()}
                                </span>
                                <span
                                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                                    style={{
                                        backgroundColor: "#e7f2eb",
                                        color: "#246b3a",
                                    }}
                                >
                                    <MdCheckCircle className="w-2.5 h-2.5" />
                                    Current
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-0.5">
                                applied {current.timestamp.toLowerCase()}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {current.absolute}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                                Replaced previous version{" "}
                                <span className="font-mono">
                                    {previousVersion.id.toUpperCase()}
                                </span>{" "}
                                by{" "}
                                <span className="font-semibold">
                                    {previousVersion.author}
                                </span>{" "}
                                ({previousVersion.timestamp.toLowerCase()})
                            </p>
                        </div>
                        <div
                            className="flex flex-col items-end shrink-0 px-3 py-2 rounded-md"
                            style={{
                                backgroundColor: "white",
                                border: `1px solid ${BRAND_BLUE}33`,
                            }}
                        >
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                Fields Edited
                            </span>
                            <span
                                className="text-2xl font-bold"
                                style={{ color: BRAND_BLUE }}
                            >
                                {changedKeys.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Summary of edits */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">
                        Summary of Edits
                    </h3>
                    {changedKeys.length === 0 ? (
                        <p className="text-sm text-slate-500 italic">
                            No fields changed in this edit.
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {changedKeys.map((key) => {
                                const label = FIELD_LABELS[key] ?? key;
                                const detail = summarizeField(
                                    key,
                                    previousVersion,
                                    current
                                );
                                return (
                                    <li
                                        key={key}
                                        className="flex items-start gap-3 rounded-md border border-slate-200 px-3 py-2.5 hover:bg-slate-50"
                                    >
                                        <span
                                            className="w-1 h-6 rounded-sm shrink-0 mt-0.5"
                                            style={{
                                                backgroundColor: BRAND_BLUE,
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-800">
                                                {label}
                                            </p>
                                            {detail && (
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {detail}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm font-bold px-4 py-2 rounded-md text-white shadow-sm"
                        style={{ backgroundColor: BRAND_BLUE }}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

const RecentChangeBadge = () => {
    const { previousVersion } = useVersion();
    const [compareOpen, setCompareOpen] = useState(false);
    const current = versionHistory[0];
    const diffs = computeDiff(previousVersion, current);

    return (
        <>
            <button
                type="button"
                onClick={() => setCompareOpen(true)}
                className="flex items-center gap-2 text-xs rounded-md px-2.5 py-1 border hover:shadow-sm transition-shadow"
                style={{
                    color: BRAND_BLUE,
                    borderColor: `${BRAND_BLUE}55`,
                    backgroundColor: `${BRAND_BLUE}0d`,
                }}
                title={`View full comparison: ${previousVersion.id.toUpperCase()} → ${current.id.toUpperCase()}`}
            >
                <MdHistory className="w-4 h-4" />
                <span className="font-bold">Recent edit</span>
                <span className="text-slate-400">·</span>
                <span className="font-mono text-[11px]">
                    {previousVersion.id.toUpperCase()} →{" "}
                    {current.id.toUpperCase()}
                </span>
                <span className="text-slate-400">·</span>
                <span
                    className="font-bold"
                    style={{ color: BRAND_BLUE }}
                >
                    {diffs.length} change
                    {diffs.length === 1 ? "" : "s"}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{current.timestamp}</span>
                <HiChevronDown className="w-3 h-3 -rotate-90 text-slate-400" />
            </button>

            {compareOpen && (
                <CompareVersionsModal
                    onClose={() => setCompareOpen(false)}
                    lockToRecent
                />
            )}
        </>
    );
};

const RecentChangeSummaryPill = () => {
    const [open, setOpen] = useState(false);
    const { previousVersion } = useVersion();
    const current = versionHistory[0];
    const changedCount = computeChangedFields(previousVersion).size;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 text-xs rounded-md px-2.5 py-1 border hover:shadow-sm transition-shadow"
                style={{
                    color: BRAND_BLUE,
                    borderColor: `${BRAND_BLUE}55`,
                    backgroundColor: `${BRAND_BLUE}0d`,
                }}
                title="View recent change summary"
            >
                <MdHistory className="w-4 h-4" />
                <span className="font-bold">Recent change</span>
                <span className="text-slate-400">·</span>
                <span className="font-bold" style={{ color: BRAND_BLUE }}>
                    {changedCount} field{changedCount === 1 ? "" : "s"}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{current.timestamp}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-700 font-semibold">
                    by {current.author}
                </span>
                <HiChevronDown className="w-3 h-3 -rotate-90 text-slate-400" />
            </button>
            {open && (
                <RecentChangeSummaryModal
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

const VersionHistoryDropdown = () => {
    const [open, setOpen] = useState(false);
    const [compareOpen, setCompareOpen] = useState(false);
    const [fullHistoryOpen, setFullHistoryOpen] = useState(false);
    const { active, viewVersion, diffMode, designVersion } = useVersion();
    const latest = versionHistory[0];

    if (designVersion === "v3") return <RecentChangeSummaryPill />;
    if (diffMode) return <RecentChangeBadge />;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-white border border-transparent hover:border-slate-200 rounded-md px-2 py-1 transition-colors"
            >
                <MdHistory className="w-4 h-4" />
                <span>
                    {active.current
                        ? `Saved ${latest.timestamp}`
                        : `Viewing ${active.id}`}
                </span>
                <span className="text-slate-300">·</span>
                <span className="font-semibold underline-offset-2">
                    {versionHistory.length} versions
                </span>
                <HiChevronDown
                    className={`w-3 h-3 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-[420px] bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MdHistory
                                    className="w-4 h-4"
                                    style={{ color: BRAND_BLUE }}
                                />
                                <h3 className="text-sm font-bold text-slate-800">
                                    Version History
                                </h3>
                            </div>
                            <span className="text-xs text-slate-400">
                                {versionHistory.length} edits
                            </span>
                        </div>
                        <ul className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
                            {versionHistory.map((v) => {
                                const isActive = v.id === active.id;
                                return (
                                    <li
                                        key={v.id}
                                        className={`px-4 py-3 group cursor-pointer ${
                                            isActive
                                                ? "bg-cobalt-50/40"
                                                : "hover:bg-slate-50"
                                        }`}
                                        onClick={() => {
                                            viewVersion(v.id);
                                            setOpen(false);
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                                style={{
                                                    backgroundColor: v.isSystem
                                                        ? "#94a3b8"
                                                        : BRAND_BLUE,
                                                }}
                                            >
                                                {v.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-semibold text-slate-800">
                                                        {v.author}
                                                    </span>
                                                    {v.current && (
                                                        <span
                                                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                                                            style={{
                                                                backgroundColor:
                                                                    "#e7f2eb",
                                                                color: "#246b3a",
                                                            }}
                                                        >
                                                            <MdCheckCircle className="w-2.5 h-2.5" />
                                                            Current
                                                        </span>
                                                    )}
                                                    {isActive &&
                                                        !v.current && (
                                                            <span
                                                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded text-white"
                                                                style={{
                                                                    backgroundColor:
                                                                        BRAND_BLUE,
                                                                }}
                                                            >
                                                                Viewing
                                                            </span>
                                                        )}
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    {v.timestamp} ·{" "}
                                                    <span className="text-slate-400">
                                                        {v.absolute}
                                                    </span>
                                                </p>
                                                <div className="mt-1.5 flex flex-wrap gap-1">
                                                    {v.changes.map((c, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                                                        >
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className={`flex items-center gap-1 text-[11px] font-semibold border border-slate-200 rounded px-2 py-1 hover:bg-white shrink-0 transition-opacity ${
                                                    isActive
                                                        ? "opacity-100 bg-white"
                                                        : "opacity-0 group-hover:opacity-100"
                                                }`}
                                                style={{ color: BRAND_BLUE }}
                                                title="View listing at this version"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    viewVersion(v.id);
                                                    setOpen(false);
                                                }}
                                            >
                                                <MdOutlineVisibility className="w-3.5 h-3.5" />
                                                {isActive ? "Viewing" : "View"}
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/60">
                            <button
                                type="button"
                                onClick={() => {
                                    setFullHistoryOpen(true);
                                    setOpen(false);
                                }}
                                className="text-xs font-semibold hover:underline"
                                style={{ color: BRAND_BLUE }}
                            >
                                View full history
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setCompareOpen(true);
                                    setOpen(false);
                                }}
                                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                            >
                                Compare versions →
                            </button>
                        </div>
                    </div>
                </>
            )}

            {compareOpen && (
                <CompareVersionsModal onClose={() => setCompareOpen(false)} />
            )}

            {fullHistoryOpen && (
                <FullHistoryModal
                    onClose={() => setFullHistoryOpen(false)}
                />
            )}
        </div>
    );
};

const Switch = ({
    checked,
    onChange,
    label,
    hint,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    hint?: string;
}) => (
    <label className="flex items-center gap-2 cursor-pointer group">
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0"
            style={{
                backgroundColor: checked ? BRAND_BLUE : "#cbd5e1",
            }}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    checked ? "translate-x-[18px]" : "translate-x-[2px]"
                }`}
            />
        </button>
        <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
            {label}
            {hint && (
                <span title={hint}>
                    <MdInfoOutline className="w-3.5 h-3.5 text-slate-400" />
                </span>
            )}
        </span>
    </label>
);

const StickyAdminHeaderV1 = () => {
    const [online, setOnline] = useState(false);
    const [premium, setPremium] = useState(true);
    const [urlSlug, setUrlSlug] = useState(
        "volunteer-abroad-with-ivhq-188550"
    );
    const [copied, setCopied] = useState(false);
    const [overflowOpen, setOverflowOpen] = useState(false);
    const { active, openPreview } = useVersion();

    const handleCopyUrl = () => {
        const fullUrl = `${PROGRAM_DOMAIN}/listing/${urlSlug}`;
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(fullUrl);
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    const MAX_VISIBLE_CHIPS = 2;
    const visibleChips = directoryChips.slice(0, MAX_VISIBLE_CHIPS);
    const overflowChips = directoryChips.slice(MAX_VISIBLE_CHIPS);

    return (
        <header className="fixed top-11 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-200">
            {/* Tier 1 — identity + primary action */}
            <div className="w-full px-6 h-16 flex items-center gap-4 border-b border-slate-100">
                <button
                    type="button"
                    className="p-2 rounded-md hover:bg-slate-100 shrink-0 text-slate-600"
                    title="Back to programs"
                >
                    <MdKeyboardArrowLeft className="w-5 h-5" />
                </button>

                <Link href="/" className="shrink-0 flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                        alt="GoAbroad"
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                <div className="h-7 w-px bg-slate-200 shrink-0 mx-2" />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex flex-col min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                            Editing Listing
                        </span>
                        <span
                            className="text-sm font-bold truncate mt-1"
                            style={{ color: BRAND_BLUE }}
                        >
                            {active.data.name}
                        </span>
                    </div>
                    <span
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{
                            backgroundColor: "#e7f2eb",
                            color: "#246b3a",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3aa45f]" />
                        Approved
                    </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Switch
                        checked={online}
                        onChange={setOnline}
                        label="Online"
                    />
                    <Switch
                        checked={premium}
                        onChange={setPremium}
                        label="Premium"
                        hint="Logo, media gallery, direct website link, and unlimited inquiries."
                    />
                    <div className="h-7 w-px bg-slate-200 mx-1" />
                    <button
                        type="button"
                        onClick={openPreview}
                        className="text-sm font-medium px-3 py-2 rounded-md hover:bg-slate-100 text-slate-600 flex items-center gap-1.5"
                    >
                        <MdOutlineVisibility className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        type="button"
                        className="bg-sun-500 hover:bg-sun-600 text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Tier 2 — contextual controls */}
            <div className="w-full px-6 h-12 flex items-center gap-6 bg-slate-50/60 text-sm">
                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        URL
                    </span>
                    <div
                        className="flex items-center text-slate-500 bg-white rounded-md border border-slate-200 pl-2.5 pr-1 py-1 focus-within:border-slate-400 group"
                        title={`${PROGRAM_DOMAIN}/listing/${urlSlug}`}
                    >
                        <span className="text-xs text-slate-300 mr-0.5 select-none hidden xl:inline">
                            goabroad.com
                        </span>
                        <span className="text-xs text-slate-400 mr-1 select-none">
                            /listing/
                        </span>
                        <input
                            type="text"
                            value={urlSlug}
                            onChange={(e) =>
                                setUrlSlug(
                                    e.target.value.replace(/[^a-z0-9-]/g, "")
                                )
                            }
                            className="text-xs text-slate-800 outline-none bg-transparent min-w-[220px]"
                        />
                        <button
                            type="button"
                            onClick={handleCopyUrl}
                            className={`ml-1 p-1.5 rounded transition-colors ${
                                copied
                                    ? "text-fern-600 bg-fern-500/10"
                                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                            title={
                                copied
                                    ? "Copied!"
                                    : `Copy ${PROGRAM_DOMAIN}/listing/${urlSlug}`
                            }
                            aria-label="Copy full URL"
                        >
                            {copied ? (
                                <MdCheck className="w-3.5 h-3.5" />
                            ) : (
                                <MdContentCopy className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                    {copied && (
                        <span className="text-[11px] font-semibold text-fern-600">
                            Copied!
                        </span>
                    )}
                </div>

                <div className="h-5 w-px bg-slate-200 shrink-0" />

                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        Client
                    </span>
                    <button
                        type="button"
                        className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded-md px-2.5 py-1 hover:border-slate-400 text-slate-800"
                    >
                        <span className="truncate max-w-[180px]">
                            International Volunteer HQ
                        </span>
                        <HiChevronDown className="text-slate-400 shrink-0" />
                    </button>
                </div>

                <div className="h-5 w-px bg-slate-200 shrink-0" />

                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold shrink-0">
                        Directories
                    </span>
                    <div className="flex flex-wrap gap-1.5 items-center relative">
                        {visibleChips.map((d, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 rounded-full text-xs px-2.5 py-0.5 font-medium border"
                                style={{
                                    color: BRAND_BLUE,
                                    borderColor: `${BRAND_BLUE}33`,
                                    backgroundColor: `${BRAND_BLUE}0d`,
                                }}
                            >
                                {d}
                                <button
                                    type="button"
                                    className="rounded-full hover:bg-slate-200/60 -mr-1"
                                    aria-label={`Remove ${d}`}
                                >
                                    <MdClose className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                        {overflowChips.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setOverflowOpen(!overflowOpen)}
                                className="inline-flex items-center gap-1 rounded-full text-xs px-2.5 py-0.5 font-bold border hover:bg-slate-50"
                                style={{
                                    color: BRAND_BLUE,
                                    borderColor: `${BRAND_BLUE}55`,
                                    backgroundColor: overflowOpen
                                        ? `${BRAND_BLUE}1a`
                                        : "white",
                                }}
                                title={`${overflowChips.length} more selected`}
                            >
                                +{overflowChips.length} more
                                <HiChevronDown
                                    className={`w-3 h-3 transition-transform ${
                                        overflowOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        )}
                        <button
                            type="button"
                            className="text-xs font-semibold rounded-full px-2.5 py-0.5 border border-dashed text-slate-500 border-slate-300 hover:border-slate-400 hover:text-slate-700"
                        >
                            + Add Directory
                        </button>

                        {overflowOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setOverflowOpen(false)}
                                />
                                <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                            All Directories ·{" "}
                                            {directoryChips.length}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOverflowOpen(false)
                                            }
                                            className="text-slate-400 hover:text-slate-700"
                                        >
                                            <MdClose className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <ul className="max-h-[240px] overflow-y-auto py-1">
                                        {directoryChips.map((d, i) => (
                                            <li
                                                key={i}
                                                className="px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 group"
                                            >
                                                <span className="text-sm text-slate-700">
                                                    {d}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="text-slate-400 hover:text-roman-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label={`Remove ${d}`}
                                                    title="Remove from directories"
                                                >
                                                    <MdClose className="w-3.5 h-3.5" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50">
                                        <button
                                            type="button"
                                            className="text-xs font-semibold w-full text-left flex items-center gap-1"
                                            style={{ color: BRAND_BLUE }}
                                        >
                                            + Add Directory
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="shrink-0">
                    <VersionHistoryDropdown />
                </div>
            </div>
        </header>
    );
};

const StickyAdminHeaderV2 = StickyAdminHeaderV1;


const DESIGN_TOGGLE_HEIGHT = 44;

const DesignVersionToggle = ({
    value,
    onChange,
}: {
    value: DesignVersion;
    onChange: (v: DesignVersion) => void;
}) => (
    <div
        className="fixed top-0 left-0 right-0 z-[60] text-white"
        style={{
            background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, #1f4d6e 100%)`,
            height: DESIGN_TOGGLE_HEIGHT,
        }}
    >
        <div className="h-full w-full px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-sun-500 text-slate-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[10px]">
                    Prototype
                </span>
                <span className="hidden sm:inline text-white/80 font-medium">
                    This page has multiple header designs — toggle to compare.
                </span>
                <span className="sm:hidden text-white/80 font-medium">
                    Toggle header design:
                </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] uppercase tracking-wider font-bold text-white/70 hidden md:inline">
                    Header Design
                </span>
                <div className="bg-white/10 rounded-full p-0.5 flex items-center">
                    {(
                        [
                            { id: "v1", label: "V1 · Full history" },
                            { id: "v2", label: "V2 · Inline diff" },
                            { id: "v3", label: "V3 · Summary only" },
                        ] as const
                    ).map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onChange(opt.id)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                                value === opt.id
                                    ? "bg-white shadow-sm"
                                    : "text-white/80 hover:text-white"
                            }`}
                            style={
                                value === opt.id
                                    ? { color: BRAND_BLUE }
                                    : {}
                            }
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const Breadcrumbs = () => {
    const { active } = useVersion();
    return (
    <ul className="max-w-[1200px] mx-auto flex text-xs pt-6 pb-4 items-center gap-2 list-none px-4 lg:px-0">
        <li className="uppercase">
            <Link href="/" className="font-bold no-underline text-cobalt-500">
                Home
            </Link>
        </li>
        <li>
            <FaChevronRight className="text-xs text-neutral-500" />
        </li>
        <li className="uppercase">
            <a href="#" className="font-bold no-underline text-cobalt-500">
                Providers
            </a>
        </li>
        <li>
            <FaChevronRight className="text-xs text-neutral-500" />
        </li>
        <li className="uppercase">
            <a href="#" className="font-bold no-underline text-cobalt-500">
                {program.provider_name}
            </a>
        </li>
        <li>
            <FaChevronRight className="text-xs text-neutral-500" />
        </li>
        <li className="uppercase text-neutral-500">{active.data.name}</li>
    </ul>
    );
};

const EditableTitle = ({
    value,
    className = "",
    buttonClassName = "",
    counterClassName = "",
}: {
    value: string;
    className?: string;
    buttonClassName?: string;
    counterClassName?: string;
}) => {
    const [title, setTitle] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const { previewMode } = useVersion();

    if (previewMode) {
        return (
            <h1
                className={`text-2xl font-bold leading-tight ${className}`}
            >
                {value}
            </h1>
        );
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 min-w-0">
                <h1
                    className={`text-2xl font-bold leading-6 ${className} inline-block w-full`}
                >
                    <input
                        type="text"
                        ref={inputRef}
                        className="bg-transparent outline-none border-none pr-8 w-full min-w-[350px]"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value.substring(0, 60))
                        }
                    />
                </h1>
                <button
                    type="button"
                    className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full hover:bg-opacity-20 p-1 transition-opacity ${buttonClassName}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    <HiPencil className="text-sm" />
                </button>
            </div>
            {title && title.length > 0 && (
                <p className={`inline-flex items-center gap-1 ${counterClassName}`}>
                    <span
                        className={
                            title.length < 20
                                ? "text-red-600"
                                : "text-pacific-500"
                        }
                    >
                        {title.length}
                    </span>
                    /60
                </p>
            )}
        </div>
    );
};

const ChangedBadge = () => (
    <span
        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded text-white shadow-sm"
        style={{ backgroundColor: "#faa929" }}
    >
        Changed
    </span>
);

const DiffLine = ({
    kind,
    children,
    className = "",
}: {
    kind: "added" | "removed";
    children: ReactNode;
    className?: string;
}) => (
    <div
        className={`flex gap-2 items-start rounded-md px-3 py-2 ${
            kind === "added"
                ? "bg-fern-500/15 border border-fern-300"
                : "bg-roman-500/15 border border-roman-300"
        } ${className}`}
    >
        <span
            className={`font-mono font-bold text-base leading-none mt-0.5 shrink-0 ${
                kind === "added" ? "text-fern-700" : "text-roman-700"
            }`}
        >
            {kind === "added" ? "+" : "−"}
        </span>
        <div
            className={`flex-1 min-w-0 ${
                kind === "removed"
                    ? "text-roman-700 line-through opacity-80"
                    : "text-fern-700"
            }`}
        >
            {children}
        </div>
    </div>
);

const DiffListItems = ({
    current,
    previous,
}: {
    current: string[];
    previous: string[];
}) => {
    const { omitRemoved } = useVersion();

    if (omitRemoved) {
        // V3: only surface what's currently on the listing. Items added in the
        // recent edit are highlighted green; items already there render neutral.
        return (
            <div className="flex flex-col gap-1.5">
                {current.map((value, i) => {
                    const wasInPrevious = previous.includes(value);
                    if (wasInPrevious) {
                        return (
                            <div
                                key={i}
                                className="flex gap-2 items-start px-3 py-2 text-slate-700"
                            >
                                <span className="font-mono text-base leading-none mt-0.5 shrink-0 text-slate-400">
                                    &nbsp;
                                </span>
                                <span className="flex-1">{value}</span>
                            </div>
                        );
                    }
                    return (
                        <DiffLine key={i} kind="added">
                            {value}
                        </DiffLine>
                    );
                })}
            </div>
        );
    }

    // V2: full GitHub-style diff — removed items (red strikethrough), added
    // items (green +), and unchanged items (neutral).
    const seen = new Set<string>();
    const rows: { kind: "added" | "removed" | "same"; value: string }[] = [];
    previous.forEach((v) => {
        if (current.includes(v)) {
            rows.push({ kind: "same", value: v });
        } else {
            rows.push({ kind: "removed", value: v });
        }
        seen.add(v);
    });
    current.forEach((v) => {
        if (!seen.has(v)) {
            rows.push({ kind: "added", value: v });
        }
    });
    return (
        <div className="flex flex-col gap-1.5">
            {rows.map((r, i) => {
                if (r.kind === "same") {
                    return (
                        <div
                            key={i}
                            className="flex gap-2 items-start px-3 py-2 text-slate-700"
                        >
                            <span className="font-mono text-base leading-none mt-0.5 shrink-0 text-slate-400">
                                &nbsp;
                            </span>
                            <span className="flex-1">{r.value}</span>
                        </div>
                    );
                }
                return (
                    <DiffLine key={i} kind={r.kind}>
                        {r.value}
                    </DiffLine>
                );
            })}
        </div>
    );
};

const CTA_STYLES: Record<string, string> = {
    "Visit Website": "bg-roman-500",
    "Inquire Here": "bg-cobalt-500",
    "Apply Now": "bg-cobalt-500",
};

const HeroCTAs = () => {
    const {
        active,
        changedFields,
        diffMode,
        omitRemoved,
        previewMode,
        previousVersion,
    } = useVersion();
    const ctasChanged = changedFields.has("ctas");

    if (!diffMode || !ctasChanged) {
        return (
            <div className="flex gap-4 flex-wrap">
                {active.data.ctas.map((c) => (
                    <button
                        key={c}
                        type="button"
                        className={`rounded-md px-4 py-2.5 flex gap-2 items-center text-center font-bold text-white w-fit ${
                            CTA_STYLES[c] ?? "bg-cobalt-500"
                        }`}
                    >
                        {c}
                        {!previewMode && <HiPencil size={12} />}
                    </button>
                ))}
            </div>
        );
    }

    const added = active.data.ctas.filter(
        (c) => !previousVersion.data.ctas.includes(c)
    );
    const removed = previousVersion.data.ctas.filter(
        (c) => !active.data.ctas.includes(c)
    );

    return (
        <div className="flex gap-3 flex-wrap items-center">
            {active.data.ctas.map((c) => {
                const isNew = added.includes(c);
                return (
                    <div key={c} className="relative">
                        <button
                            type="button"
                            className={`rounded-md px-4 py-2.5 flex gap-2 items-center text-center font-bold text-white w-fit ${
                                CTA_STYLES[c] ?? "bg-cobalt-500"
                            } ${
                                isNew
                                    ? "ring-2 ring-fern-500 ring-offset-2 ring-offset-slate-900/40"
                                    : ""
                            }`}
                        >
                            {c} <HiPencil size={12} />
                        </button>
                        {isNew && (
                            <span className="absolute -top-2 -right-2 bg-fern-500 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                                + Added
                            </span>
                        )}
                    </div>
                );
            })}
            {!omitRemoved &&
                removed.map((c) => (
                    <div key={c} className="relative">
                        <button
                            type="button"
                            disabled
                            className="rounded-md px-4 py-2.5 flex gap-2 items-center text-center font-bold text-white/70 w-fit bg-slate-500 line-through opacity-70"
                        >
                            {c}
                        </button>
                        <span className="absolute -top-2 -right-2 bg-roman-500 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                            − Removed
                        </span>
                    </div>
                ))}
        </div>
    );
};

const HeroSection = () => {
    const {
        active,
        changedFields,
        diffMode,
        omitRemoved,
        previousVersion,
    } = useVersion();
    const heroChanged = changedFields.has("hero_image");
    const nameChanged = changedFields.has("name");
    return (
        <div className="w-full">
            <Breadcrumbs />
            <div
                className={`w-full h-[500px] relative ${
                    heroChanged && !diffMode ? "ring-4 ring-sun-400" : ""
                }`}
            >
                <img
                    src={active.data.hero_image}
                    alt={active.data.name}
                    className="w-full h-full object-cover object-center"
                />
                {heroChanged && !diffMode && (
                    <div className="absolute top-4 left-4 z-10">
                        <ChangedBadge />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75"></div>
                <div className="absolute inset-0 h-full w-full max-w-[1200px] mx-auto flex flex-col justify-end py-8 px-4 lg:px-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 items-center">
                                <div className="w-[75px] h-[75px] rounded-md shrink-0 bg-slate-200 p-1">
                                    <img
                                        src={program.logo}
                                        alt={program.provider_name}
                                        className="h-full w-full rounded-md bg-white object-contain px-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    {diffMode && nameChanged ? (
                                        <div className="flex flex-col gap-1">
                                            {!omitRemoved && (
                                                <DiffLine kind="removed">
                                                    <span className="text-2xl font-bold leading-tight">
                                                        {
                                                            previousVersion
                                                                .data.name
                                                        }
                                                    </span>
                                                </DiffLine>
                                            )}
                                            <DiffLine kind="added">
                                                <span className="text-2xl font-bold leading-tight">
                                                    {active.data.name}
                                                </span>
                                            </DiffLine>
                                        </div>
                                    ) : (
                                        <div
                                            className={`flex items-center gap-2 ${
                                                nameChanged && !diffMode
                                                    ? "ring-2 ring-sun-400 rounded-md px-2 py-1 -mx-2 bg-sun-500/10"
                                                    : ""
                                            }`}
                                        >
                                            <EditableTitle
                                                key={active.id}
                                                value={active.data.name}
                                                className="text-white"
                                                buttonClassName="hover:bg-white/20 text-white"
                                                counterClassName="text-white"
                                            />
                                            {nameChanged && !diffMode && (
                                                <ChangedBadge />
                                            )}
                                        </div>
                                    )}
                                <p className="text-white">
                                    by:
                                    <span className="font-bold text-cobalt-500">
                                        {" "}
                                        {program.provider_name}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex gap-1 items-center text-xs">
                                <IoMdStar className="text-lg text-sun-500" />
                                <span className="text-white font-bold">
                                    {program.rating} ({program.reviews_count})
                                </span>
                            </div>
                            {program.verified && (
                                <div className="flex gap-1 items-center text-xs">
                                    <FaCheckCircle className="text-base text-fern-500" />
                                    <span className="text-white font-bold">
                                        Verified
                                    </span>
                                </div>
                            )}
                            <button
                                type="button"
                                className="flex gap-1 items-center bg-sun-500 px-2 py-1 rounded-md text-xs"
                            >
                                <HiOutlineHeart className="text-lg text-white" />
                                <span className="text-white font-bold">
                                    Save
                                </span>
                            </button>
                        </div>
                    </div>
                    <HeroCTAs />
                </div>
            </div>
        </div>
        </div>
    );
};

const Description = () => {
    const { active, changedFields, diffMode, previewMode } = useVersion();
    const descChanged = changedFields.has("description");

    if (previewMode) {
        return (
            <p className="whitespace-pre-wrap text-base text-slate-700 leading-relaxed">
                {active.data.description}
            </p>
        );
    }

    return (
        <div
            className={`relative ${
                descChanged && !diffMode
                    ? "ring-2 ring-sun-400 rounded-md"
                    : ""
            }`}
        >
            {descChanged && !diffMode && (
                <div className="absolute -top-3 left-3 z-10">
                    <ChangedBadge />
                </div>
            )}
            <textarea
                key={active.id}
                defaultValue={active.data.description}
                className="whitespace-pre-wrap text-base w-full border border-slate-200 p-2 rounded-md hover:bg-[#f8fafc] min-h-[160px] resize-y outline-none"
                placeholder="Enter description here..."
            />
            <p className="text-xs text-slate-500 mt-1 text-right">
                <span
                    className={
                        active.data.description.length < 500 ||
                        active.data.description.length > 1200
                            ? "text-red-600"
                            : "text-pacific-500"
                    }
                >
                    {active.data.description.length}
                </span>{" "}
                / 500–1200
            </p>
        </div>
    );
};

const ProgramHighlights = () => {
    const { active, changedFields, diffMode, previewMode } = useVersion();
    const highlightsChanged = changedFields.has("highlights");

    return (
    <div className={`border bg-slate-50 rounded-md w-full p-4 flex flex-col gap-4 relative border-slate-200 ${
        highlightsChanged && !diffMode ? "ring-2 ring-sun-400" : ""
    }`}>
        {highlightsChanged && !diffMode && (
            <div className="absolute -top-3 right-3 z-10">
                <ChangedBadge />
            </div>
        )}
        <h2 className="font-bold text-lg">
            Program Highlights
            {!previewMode && (
                <span className="text-xs italic font-normal">
                    {" "}
                    (Must list 5)
                </span>
            )}
        </h2>
        <div className="flex flex-col text-sm gap-3">
            {active.data.highlights.map((h, i) => (
                <div className="flex" key={i}>
                    <p className="flex gap-2 items-center max-w-[600px] flex-1">
                        <LuShieldCheck className="shrink-0 text-lg" />
                        {h}
                    </p>
                    {!previewMode && (
                        <div className="flex">
                            <button
                                type="button"
                                className="p-1 text-cobalt-500 hover:bg-slate-200 rounded-full"
                            >
                                <MdEdit className="text-base" />
                            </button>
                            <button
                                type="button"
                                className="p-1 text-roman-500 hover:bg-slate-200 rounded-full"
                            >
                                <MdDelete className="text-base" />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
        {!previewMode && (
            <button
                type="button"
                className="w-full border border-slate-200 rounded-md py-2.5 font-bold bg-white flex items-center justify-center gap-2"
            >
                <HiMiniPlusCircle className="text-lg" />
                Add Program Highlight
            </button>
        )}
    </div>
    );
};

const galleryMedia = [
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

const MediaGallery = () => {
    const {
        active: activeVersion,
        previousVersion,
        diffMode,
        previewMode,
        changedFields,
    } = useVersion();
    const galleryChanged = changedFields.has("gallery");
    const previousCount = previousVersion.data.gallery.length;
    const addedCount =
        diffMode && galleryChanged
            ? activeVersion.data.gallery.length - previousCount
            : 0;
    const newItems =
        diffMode && galleryChanged
            ? galleryMedia.slice(previousCount)
            : [];

    // Auto-feature a new photo when the gallery changed so the user sees the
    // most recent addition front-and-center.
    const [selected, setSelected] = useState(
        diffMode && galleryChanged ? previousCount : 0
    );
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollBy = (delta: number) => {
        scrollerRef.current?.scrollTo({
            left: (scrollerRef.current?.scrollLeft ?? 0) + delta,
            behavior: "smooth",
        });
    };

    const active = galleryMedia[selected];

    return (
        <div className="max-w-[776px]">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Media Gallery</h2>
                    {diffMode && galleryChanged && (
                        <div className="flex items-center gap-2">
                            <MdHistory
                                className="w-4 h-4"
                                style={{ color: BRAND_BLUE }}
                            />
                            <span
                                className="text-xs font-bold uppercase tracking-wider"
                                style={{ color: BRAND_BLUE }}
                            >
                                Media Gallery changed
                                {addedCount > 0 && (
                                    <span className="ml-1 text-fern-700">
                                        · +{addedCount} new
                                    </span>
                                )}
                            </span>
                        </div>
                    )}
                </div>

                {diffMode && galleryChanged && newItems.length > 0 && (
                    <div className="rounded-md border-2 border-fern-300 bg-fern-500/10 p-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 bg-fern-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                    + {newItems.length} New in this edit
                                </span>
                                <span className="text-xs text-slate-600">
                                    Click a photo to view
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            {newItems.map((media, i) => {
                                const index = previousCount + i;
                                const isActive = selected === index;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => setSelected(index)}
                                        className={`relative h-24 w-32 shrink-0 overflow-hidden rounded-md ring-2 transition-shadow ${
                                            isActive
                                                ? "ring-fern-600 shadow-md"
                                                : "ring-fern-500 hover:shadow-md"
                                        }`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={media.image}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                        {media.isVideo && (
                                            <FaCirclePlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white" />
                                        )}
                                        <span className="absolute top-1 left-1 bg-fern-500 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                                            + New
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div
                    className={`relative w-full bg-black rounded-md overflow-hidden ${
                        diffMode &&
                        galleryChanged &&
                        selected >= previousCount
                            ? "ring-4 ring-fern-500"
                            : ""
                    }`}
                >
                    <img
                        src={active.image}
                        alt=""
                        className="w-full h-[400px] object-cover"
                    />
                    {diffMode &&
                        galleryChanged &&
                        selected >= previousCount && (
                            <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-fern-500 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded shadow z-10">
                                + Added in recent edit
                            </span>
                        )}
                    {active.isVideo && (
                        <FaCirclePlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-6xl text-white" />
                    )}
                    {active.caption && (
                        <div className="absolute bottom-0 left-0 flex w-full items-center bg-slate-900/80 p-4">
                            <p className="text-xs text-white md:text-base">
                                {active.caption}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 relative">
                {galleryMedia.length >= 3 && (
                    <>
                        <button
                            className="flex cursor-pointer items-center rounded-full border border-solid border-neutral-300 bg-white absolute p-1 -left-3 top-[55%] shadow-sm z-10"
                            aria-label="Previous"
                            type="button"
                            onClick={() => scrollBy(-168)}
                        >
                            <HiChevronLeft className="h-4 w-4 text-slate-800" />
                        </button>
                        <button
                            className="flex cursor-pointer items-center rounded-full border border-solid absolute z-10 top-[55%] border-neutral-300 bg-white p-1 shadow-sm right-[43%]"
                            aria-label="Next"
                            type="button"
                            onClick={() => scrollBy(168)}
                        >
                            <HiChevronRight className="h-4 w-4 text-slate-800" />
                        </button>
                    </>
                )}
                <div
                    ref={scrollerRef}
                    className="flex gap-2 overflow-x-auto max-w-[430px] scrollbar-hide"
                >
                    {galleryMedia.map((media, i) => {
                        const isNew =
                            diffMode &&
                            galleryChanged &&
                            i >= previousVersion.data.gallery.length;
                        return (
                        <div className="mt-4 relative shrink-0" key={i}>
                            <button
                                type="button"
                                className={`h-24 w-40 shrink-0 overflow-hidden rounded-md block ${
                                    selected === i
                                        ? "border-2 border-cobalt-50"
                                        : ""
                                } ${
                                    isNew
                                        ? "ring-2 ring-fern-500 ring-offset-1"
                                        : ""
                                }`}
                                onClick={() => setSelected(i)}
                            >
                                <img
                                    src={media.image}
                                    className="h-full w-full cursor-pointer object-cover"
                                    alt=""
                                />
                                {media.isVideo && (
                                    <FaCirclePlay className="absolute left-[40%] top-1/4 cursor-pointer text-3xl text-white" />
                                )}
                            </button>
                            {isNew && (
                                <span className="absolute top-1 left-1 bg-fern-500 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow z-10">
                                    + New
                                </span>
                            )}
                            {!previewMode && (
                                <>
                                    <button
                                        className="absolute -top-3 -right-3 text-red-500 rounded-full p-1"
                                        title="Remove"
                                        type="button"
                                    >
                                        <IoCloseCircle className="w-5 h-5 bg-white rounded-full" />
                                    </button>
                                    <div className="flex absolute inset-0 bottom-1 mt-auto gap-2 h-fit bg-slate-900/70 items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        {i > 0 && (
                                            <button
                                                className="rounded-full p-1 bg-white h-fit my-1"
                                                title="Move left"
                                                type="button"
                                            >
                                                <MdChevronLeft className="w-5 h-5 text-slate-900" />
                                            </button>
                                        )}
                                        {i <
                                            galleryMedia.length - 1 && (
                                            <button
                                                className="rounded-full p-1 bg-white h-fit my-1"
                                                title="Move right"
                                                type="button"
                                            >
                                                <MdChevronRight className="w-5 h-5 text-slate-900" />
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        );
                    })}
                </div>
                {!previewMode && (
                <div className="w-fit h-fit flex items-center gap-2 mt-4">
                    <button
                        type="button"
                        className="flex flex-col items-center justify-center w-[160px] h-[96px] bg-slate-900 rounded-md text-center shrink-0 overflow-hidden hover:bg-slate-700 text-white"
                    >
                        <PiImage className="h-7 w-7" />
                        Upload Photo
                    </button>
                    <button
                        type="button"
                        className="flex flex-col items-center justify-center w-[160px] h-[96px] bg-slate-900 text-white rounded-md text-center shrink-0 overflow-hidden hover:bg-slate-700"
                    >
                        <PiVideo className="h-7 w-7" />
                        Add Video
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

const QuickDetailRow = ({
    icon,
    label,
    children,
}: {
    icon: ReactNode;
    label: string;
    children: ReactNode;
}) => {
    const { previewMode } = useVersion();
    return (
        <div className="border-b border-slate-200 pb-4 flex gap-4 items-start">
            <div className="flex gap-2 text-sm flex-1">
                <span className="shrink-0 text-lg text-neutral-800">
                    {icon}
                </span>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">{label}</span>
                    <div>{children}</div>
                </div>
            </div>
            {!previewMode && (
                <button
                    type="button"
                    className="rounded-full hover:bg-slate-200 p-1 cursor-pointer"
                >
                    <HiPencil className="text-sm text-slate-700" />
                </button>
            )}
        </div>
    );
};

const QuickDetails = () => {
    const {
        active,
        changedFields,
        diffMode,
        omitRemoved,
        previousVersion,
    } = useVersion();
    const locChanged = changedFields.has("locations");
    const typesChanged = changedFields.has("types");
    const priceChanged = changedFields.has("startsAt");
    const ageChanged = changedFields.has("ageRequirement");

    return (
        <div className="w-full border border-slate-200 rounded-md bg-slate-50 shrink-0 p-4 flex flex-col gap-4">
            <h3 className="text-xl font-bold">Quick Details</h3>

            <QuickDetailRow icon={<IoLocationOutline />} label="Locations">
                {diffMode && locChanged ? (
                    <DiffListItems
                        current={active.data.locations}
                        previous={previousVersion.data.locations}
                    />
                ) : (
                    <ul className="list-none">
                        {active.data.locations.slice(0, 5).map((l, i) => (
                            <li key={i}>{l}</li>
                        ))}
                        {active.data.locations.length > 5 && (
                            <li>
                                <button className="flex items-center gap-1 font-bold underline">
                                    See more <HiArrowSmRight />
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </QuickDetailRow>

            <QuickDetailRow icon={<MdEventAvailable />} label="Availability">
                <span className="flex gap-2">
                    <strong>Year(s) Offered:</strong> 2025, 2026
                </span>
                <span className="flex gap-2">
                    <strong>Duration:</strong> 1–24 weeks
                </span>
            </QuickDetailRow>

            <QuickDetailRow
                icon={<HiOutlineCurrencyDollar />}
                label="Starts At:"
            >
                {diffMode && priceChanged ? (
                    <div className="flex flex-col gap-1.5">
                        {!omitRemoved && (
                            <DiffLine kind="removed">
                                {previousVersion.data.startsAt}
                            </DiffLine>
                        )}
                        <DiffLine kind="added">
                            {active.data.startsAt}
                        </DiffLine>
                    </div>
                ) : (
                    active.data.startsAt
                )}
            </QuickDetailRow>

            <QuickDetailRow
                icon={<PiShieldWarningBold />}
                label="Age Requirement:"
            >
                {diffMode && ageChanged ? (
                    <div className="flex flex-col gap-1.5">
                        {!omitRemoved && (
                            <DiffLine kind="removed">
                                {previousVersion.data.ageRequirement}
                            </DiffLine>
                        )}
                        <DiffLine kind="added">
                            {active.data.ageRequirement}
                        </DiffLine>
                    </div>
                ) : (
                    active.data.ageRequirement
                )}
            </QuickDetailRow>

            <QuickDetailRow
                icon={<MdLibraryBooks />}
                label="Types & Subjects:"
            >
                {diffMode && typesChanged ? (
                    <DiffListItems
                        current={active.data.types}
                        previous={previousVersion.data.types}
                    />
                ) : (
                    <ul className="list-none">
                        {active.data.types.slice(0, 5).map((t, i) => (
                            <li key={i}>{t}</li>
                        ))}
                    </ul>
                )}
            </QuickDetailRow>

            <QuickDetailRow icon={<RiGuideFill />} label="Guidelines:">
                All Nationalities
            </QuickDetailRow>

            <button
                type="button"
                className="flex gap-2 w-full border border-slate-200 py-2.5 font-bold bg-white rounded-md items-center justify-center text-black cursor-pointer"
            >
                See all program details
                <FaArrowCircleDown className="w-4 h-4" />
            </button>
        </div>
    );
};

const Awards = () => (
    <div className="border p-4 bg-slate-50 rounded-md flex flex-col gap-4">
        <div className="flex gap-2 items-center">
            <h3 className="text-xl font-bold">Awards</h3>
            <span className="italic text-xs">(Awards will appear here)</span>
        </div>
        <div className="flex gap-2">
            <div className="bg-slate-200 rounded-full h-[65px] w-[65px]"></div>
            <div className="bg-slate-200 rounded-full h-[65px] w-[65px]"></div>
        </div>
    </div>
);

const ProgramReviews = () => (
    <div className="w-full h-full font-inter flex flex-col items-center gap-4">
        <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-1">
                <h2 className="font-bold text-2xl">
                    Program Reviews{" "}
                    <span className="text-xs font-normal italic">
                        (Program reviews will appear here on your listing)
                    </span>
                </h2>
                <p className="text-sm">
                    Hear what past participants have to say about the program
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <div className="bg-gray-200 rounded-md w-[191px] h-[40px]"></div>
                <div className="bg-gray-200 rounded-md w-[144px] h-[40px]"></div>
            </div>
        </div>
        <div className="w-full border border-slate-200 rounded-md flex justify-between p-4">
            <div className="flex gap-8 w-fit shrink-0">
                <div className="flex flex-col w-fit shrink-0">
                    <h3 className="font-bold text-2xl">Overall Rating</h3>
                    <div className="flex gap-1 items-center">
                        <span className="text-xl font-bold">
                            {program.rating}
                        </span>
                        <HiStar className="h-5 w-5 text-amber-500" />
                    </div>
                </div>
                <div className="flex flex-col w-fit shrink-0">
                    <h3 className="font-bold text-2xl">Total Reviews</h3>
                    <div className="flex gap-1 items-center">
                        <span className="text-xl font-bold">
                            {program.reviews_count}
                        </span>
                        <HiOutlineChat className="h-5 w-5" />
                    </div>
                </div>
            </div>
            <div className="relative w-full justify-end flex">
                <button className="px-4 py-2 bg-roman-500 text-white rounded-md font-bold text-sm">
                    Review this Program
                </button>
            </div>
        </div>
        {[1, 2].map((i) => (
            <div
                key={i}
                className="w-full rounded-md border border-slate-200 p-4 flex flex-col gap-2"
            >
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-lg">
                            An incredible experience that changed my life
                        </div>
                        <small className="text-sm flex items-center gap-2">
                            by: <span className="font-bold">Sarah Johnson</span>
                        </small>
                        <div className="text-sm font-bold flex gap-2">
                            Program:{" "}
                            <span className="font-normal">
                                Volunteer Abroad in Costa Rica
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <HiStar
                                key={s}
                                className="h-5 w-5 text-amber-500"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex gap-6 w-full">
                    <div className="w-full flex flex-col gap-4">
                        <p className="text-sm text-slate-700">
                            Volunteering with IVHQ was the most rewarding
                            experience of my life. The local team was incredibly
                            supportive, and the project was meaningful and
                            impactful. I made friends from around the world and
                            grew tremendously as a person. I would highly
                            recommend this program to anyone considering
                            volunteering abroad.
                        </p>
                    </div>
                    <div className="max-w-[200px] w-full shrink-0">
                        <div className="grid gap-2 grid-cols-2">
                            <div className="w-[80px] h-[80px] bg-gray-200 rounded-md"></div>
                            <div className="w-[80px] h-[80px] bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const DetailCard = ({
    icon,
    title,
    required,
    children,
}: {
    icon: ReactNode;
    title: string;
    required?: boolean;
    children: ReactNode;
}) => {
    const { previewMode } = useVersion();
    return (
    <div className="bg-slate-100 rounded-md p-4 flex flex-col gap-2 relative">
        <div className="flex w-full justify-between">
            <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                    <span className="text-lg">{icon}</span>
                    <span className="font-bold text-base">{title}</span>
                </div>
                {!previewMode && (
                    <button
                        type="button"
                        className="rounded-full hover:bg-slate-200 p-1"
                    >
                        <HiPencil className="text-sm text-slate-700" />
                    </button>
                )}
            </div>
            {required && !previewMode && (
                <span className="text-red-500 text-[10px]">Required</span>
            )}
        </div>
        <div className="text-sm">{children}</div>
    </div>
    );
};

const ExpandableShowAll = ({
    hasOverflow,
    expanded,
}: {
    hasOverflow: boolean;
    expanded: ReactNode;
}) => {
    const [open, setOpen] = useState(false);
    if (!hasOverflow) return null;
    return (
        <>
            {open && (
                <div className="absolute left-0 top-2 z-10 max-h-[300px] min-w-[180px] overflow-y-scroll rounded-md border border-slate-200 bg-slate-50 p-4">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        >
                            <IoMdCloseCircle className="text-lg text-roman-500" />
                        </button>
                    </div>
                    {expanded}
                </div>
            )}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="ml-2 mt-2 flex w-fit cursor-pointer items-center gap-2 text-sm font-bold underline"
            >
                {open ? "Show less" : "Show all"}
                <PiCaretDownBold
                    className={open ? "rotate-180 transform" : ""}
                />
            </button>
        </>
    );
};

const ProgramDetails = () => {
    const {
        active,
        changedFields,
        diffMode,
        omitRemoved,
        previousVersion,
    } = useVersion();
    const locChanged = changedFields.has("locations");
    const typesChanged = changedFields.has("types");
    const priceChanged = changedFields.has("startsAt");
    const ageChanged = changedFields.has("ageRequirement");
    const accomChanged = changedFields.has("accommodations");

    return (
    <div id="program-details" className="w-full flex flex-col gap-3">
        <div className="flex flex-col">
            <h2 className="font-bold text-2xl">Program Details</h2>
            <p className="text-sm">
                Learn all the nitty gritty details you need to know
            </p>
        </div>
        <div className="w-full grid grid-cols-3 gap-2">
            <DetailCard
                icon={<IoLocationOutline />}
                title="Locations"
                required
            >
                {diffMode && locChanged ? (
                    <DiffListItems
                        current={active.data.locations}
                        previous={previousVersion.data.locations}
                    />
                ) : (
                    <>
                        <ul className="list-none">
                            {active.data.locations
                                .slice(0, 4)
                                .map((l, i) => (
                                    <li key={i} className="ml-2">
                                        {l}
                                    </li>
                                ))}
                        </ul>
                        <ExpandableShowAll
                            hasOverflow={active.data.locations.length > 4}
                            expanded={
                                <ul className="ml-2 flex flex-col gap-1 text-sm list-none">
                                    {active.data.locations.map((l, i) => (
                                        <li key={i}>{l}</li>
                                    ))}
                                </ul>
                            }
                        />
                    </>
                )}
            </DetailCard>
            <DetailCard
                icon={<MdLibraryBooks />}
                title="Types & Subjects"
                required
            >
                {diffMode && typesChanged ? (
                    <>
                        <p className="font-bold mb-2">Causes</p>
                        <DiffListItems
                            current={active.data.types}
                            previous={previousVersion.data.types}
                        />
                    </>
                ) : (
                    <>
                        <p className="font-bold">Causes</p>
                        <ul className="list-none">
                            {active.data.types.slice(0, 3).map((t, i) => (
                                <li key={i} className="ml-2">
                                    {t}
                                </li>
                            ))}
                        </ul>
                        <ExpandableShowAll
                            hasOverflow={active.data.types.length > 3}
                            expanded={
                                <ul className="flex flex-col gap-1 text-sm list-none">
                                    <li className="text-sm font-bold">
                                        Causes
                                    </li>
                                    {active.data.types.map((t, i) => (
                                        <li key={i} className="ml-2">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            }
                        />
                    </>
                )}
            </DetailCard>
            <DetailCard
                icon={<MdEventAvailable />}
                title="Availability"
                required
            >
                <p>
                    <strong>Years Offered:</strong> 2025, 2026
                </p>
                <div className="flex gap-2">
                    <div className="font-bold">Duration:</div>
                    <ul className="list-none">
                        <li className="ml-2">1 week</li>
                        <li className="ml-2">2 weeks</li>
                        <li className="ml-2">4 weeks</li>
                        <li className="ml-2">12 weeks</li>
                    </ul>
                </div>
            </DetailCard>
            <DetailCard icon={<PiShieldWarningBold />} title="Age Requirement">
                {diffMode && ageChanged ? (
                    <div className="flex flex-col gap-1.5">
                        {!omitRemoved && (
                            <DiffLine kind="removed">
                                {previousVersion.data.ageRequirement}
                            </DiffLine>
                        )}
                        <DiffLine kind="added">
                            {active.data.ageRequirement}
                        </DiffLine>
                    </div>
                ) : (
                    <p className="ml-2">{active.data.ageRequirement}</p>
                )}
            </DetailCard>
            <DetailCard icon={<RiGuideFill />} title="Guidelines">
                <p className="ml-2">All Nationalities</p>
                <p className="ml-2">
                    This Program is also open to Solo, Couples, Families, Groups
                </p>
            </DetailCard>
            <DetailCard
                icon={<HiOutlineCurrencyDollar />}
                title="Starts At"
                required
            >
                {diffMode && priceChanged ? (
                    <div className="flex flex-col gap-1.5">
                        {!omitRemoved && (
                            <DiffLine kind="removed">
                                {previousVersion.data.startsAt}
                            </DiffLine>
                        )}
                        <DiffLine kind="added">
                            {active.data.startsAt}
                        </DiffLine>
                    </div>
                ) : (
                    <ul className="ml-2 list-none">
                        {costVariations.map((row, i) => (
                            <li key={i}>
                                {row.duration}: ${row.price}
                            </li>
                        ))}
                    </ul>
                )}
            </DetailCard>
            <DetailCard
                icon={<PiListChecksBold />}
                title="Program Cost Includes"
            >
                <ul className="ml-2 list-none">
                    <li>Accommodation</li>
                    <li>Meals</li>
                    <li>Airport Pickup</li>
                    <li>Orientation</li>
                </ul>
            </DetailCard>
            <DetailCard
                icon={<PiShieldWarningBold />}
                title="Program Cost Excludes"
            >
                <ul className="ml-2 list-none">
                    <li>Flights</li>
                    <li>Travel Insurance</li>
                    <li>Visa Fees</li>
                </ul>
            </DetailCard>
            <DetailCard icon={<LiaMoneyBillSolid />} title="Payment Terms">
                <ul className="ml-2 list-none">
                    <li>20% deposit upon application</li>
                    <li>Balance due 60 days before program start</li>
                </ul>
            </DetailCard>
            <DetailCard icon={<MdPolicy />} title="Refund Policy">
                <p className="ml-2">
                    Full refund available up to 60 days before program start.
                    Partial refunds available thereafter.
                </p>
                <a
                    href="#"
                    className="ml-2 inline-flex w-fit items-center gap-1 text-sm text-cobalt-500 underline"
                >
                    View Refund Policy
                    <HiOutlineExternalLink className="shrink-0 text-base" />
                </a>
            </DetailCard>
            <DetailCard
                icon={<PiHouseBold />}
                title="Accommodation Options"
            >
                {diffMode && accomChanged ? (
                    <DiffListItems
                        current={active.data.accommodations}
                        previous={previousVersion.data.accommodations}
                    />
                ) : (
                    <ul className="ml-2 list-none">
                        {active.data.accommodations.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                )}
            </DetailCard>
            <DetailCard icon={<IoMdRibbon />} title="Qualifications & Experience">
                <p className="mt-2 font-bold">Language Skills Required</p>
                <ul className="ml-2 list-none">
                    <li>English</li>
                </ul>
                <p className="mt-2 font-bold">Accepted Education Levels</p>
                <ul className="ml-2 list-none">
                    <li>Any/All Education Levels Accepted</li>
                </ul>
            </DetailCard>
            <DetailCard icon={<TiFlowMerge />} title="Application Procedures">
                <ul className="ml-2 list-none">
                    <li>Online application</li>
                    <li>Interview</li>
                    <li>Background check</li>
                </ul>
            </DetailCard>
            <DetailCard
                icon={<HiOutlineCurrencyDollar />}
                title="Deposit / Application Fee"
            >
                <ul className="ml-2 list-none">
                    <li>
                        <strong>Deposit:</strong> $295
                    </li>
                    <li>
                        <strong>Application Fee:</strong> $50
                    </li>
                </ul>
            </DetailCard>
        </div>
    </div>
    );
};

const faqs = [
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

const FAQ = () => {
    const [active, setActive] = useState(0);
    const {
        active: activeVersion,
        changedFields,
        diffMode,
        previewMode,
        previousVersion,
    } = useVersion();
    const faqsChanged = changedFields.has("faqs");
    const faqAnswers: Record<string, string> = faqs.reduce(
        (acc, f) => ({ ...acc, [f.question]: f.answer }),
        {}
    );

    if (diffMode && faqsChanged) {
        return (
            <div className="max-w-[1200px] mx-auto h-full py-6 w-full px-4 lg:px-0">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-2xl">
                        Frequently Asked Questions
                    </h2>
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-4 h-4"
                            style={{ color: BRAND_BLUE }}
                        />
                        <span
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: BRAND_BLUE }}
                        >
                            FAQs changed
                        </span>
                    </div>
                </div>
                <DiffListItems
                    current={activeVersion.data.faqs}
                    previous={previousVersion.data.faqs}
                />
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto h-full py-6 w-full px-4 lg:px-0">
            <h2 className="font-bold text-2xl">Frequently Asked Questions</h2>
            <div className="mt-4">
                {activeVersion.data.faqs.map((question, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-2 border-b border-slate-200 py-4"
                    >
                        <div
                            className="text-left text-pacific-500 cursor-pointer flex justify-between items-center"
                            onClick={() =>
                                setActive(active === i ? -1 : i)
                            }
                        >
                            <p className="flex items-center justify-between gap-2 font-medium text-base">
                                {question}
                            </p>
                            <div className="flex gap-2 items-center">
                                <HiChevronDown
                                    className={`w-5 h-5 text-gray-500 transition-transform ${
                                        active === i ? "rotate-180" : ""
                                    }`}
                                />
                                {!previewMode && (
                                <button
                                    type="button"
                                    className="w-5 h-5 text-gray-500"
                                >
                                    <FaTrash className="w-4 h-4 text-red-500" />
                                </button>
                                )}
                            </div>
                        </div>
                        {active === i && (
                            <p className="text-sm text-slate-700">
                                {faqAnswers[question] ||
                                    "Answer is being prepared."}
                            </p>
                        )}
                    </div>
                ))}
                {!previewMode && (
                    <button
                        type="button"
                        className="w-full mt-4 flex items-center gap-2 bg-primary-300 hover:bg-primary-200 text-white rounded-md py-3 justify-center font-bold"
                    >
                        <HiPlus className="text-lg text-white" />
                        Add FAQ
                    </button>
                )}
            </div>
        </div>
    );
};

const Interviews = () => (
    <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1">
            <h2 className="font-bold text-2xl">
                Interviews{" "}
                <span className="text-xs font-normal italic">
                    (Interviews will appear here)
                </span>
            </h2>
            <p className="text-sm">Read interviews from alumni or staff</p>
        </div>
        <div className="flex gap-8 border-y border-slate-200 py-4">
            <div className="max-w-[300px] w-full shrink-0 bg-slate-50 p-4 rounded-md flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200"></div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold">Emma Watson</div>
                        <div className="text-xs text-slate-500">Alumni</div>
                        <span className="bg-cobalt-500 text-white text-xs rounded-md px-2 py-1 w-fit">
                            2024
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-600">
                    <p>
                        &ldquo;The 12 weeks I spent volunteering changed my
                        perspective on so many things...&rdquo;
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h3 className="text-xl font-bold">
                    A Life-Changing Experience in Costa Rica
                </h3>
                <div className="flex flex-col gap-2 text-sm text-slate-700">
                    <p>
                        Emma shares her experience volunteering at a wildlife
                        sanctuary, the people she met, and the lessons that
                        stayed with her long after returning home.
                    </p>
                    <p>
                        From the moment she arrived, she was struck by the
                        warmth of the local community and the genuine impact of
                        the conservation work.
                    </p>
                </div>
                <button className="w-fit mt-2 text-cobalt-500 font-bold text-sm underline">
                    Read full interview
                </button>
            </div>
        </div>
    </div>
);

const ProviderBottomCTA = () => {
    const { active } = useVersion();
    return (
    <div className="font-inter flex w-full flex-col rounded-md bg-slate-900 p-8">
        <div className="flex w-full max-w-7xl items-center justify-between gap-8">
            <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-3xl font-bold text-white">
                    Ready to Learn More?
                </h3>
                <p className="line-clamp-3 text-white max-w-[75%]">
                    {active.data.description}
                </p>
            </div>
            <div className="flex min-w-[30%] flex-col gap-8 rounded-md bg-slate-50 p-4">
                <div className="flex items-start gap-4">
                    <div className="h-[50px] w-[50px] shrink-0 rounded-md bg-white p-1">
                        <img
                            className="h-full w-full rounded-md object-contain"
                            src={program.logo}
                            alt={program.provider_name}
                        />
                    </div>
                    <div className="text-neutral-700">
                        <p className="text-lg font-bold">
                            {program.provider_name}
                        </p>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-sm font-bold">
                                <IoMdStar className="text-sun-500 text-lg" />
                                {program.rating}
                            </span>
                            {program.verified && (
                                <span className="flex items-center gap-1 text-sm font-bold">
                                    <FaCheckCircle className="text-fern-500 text-sm" />
                                    Verified
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <button className="bg-roman-500 w-full min-w-48 rounded-md px-4 py-4 text-center text-sm font-bold text-white hover:bg-red-500">
                    Visit Website
                </button>
            </div>
        </div>
    </div>
    );
};

const RelatedPrograms = () => (
    <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1">
            <h2 className="font-bold text-2xl">
                Related Programs{" "}
                <span className="text-xs font-normal italic">
                    (Related programs will appear here)
                </span>
            </h2>
            <p className="text-sm">Browse more programs you might like</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex flex-col rounded-md overflow-hidden shadow-md"
                >
                    <div className="relative w-full h-[175px] bg-gray-200">
                        <div className="absolute top-2 right-2 rounded-md bg-white/90 px-2 py-1 text-xs font-bold">
                            From $295
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 h-[240px] rounded-b-md relative flex flex-col">
                        <div className="absolute h-14 w-14 bg-white shadow-md rounded-md right-4 -top-[30px] flex items-center justify-center text-xs font-bold">
                            Logo
                        </div>
                        <div className="mb-3">
                            <span className="text-xs text-slate-500">
                                by Provider Name
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <h3 className="font-bold leading-tight">
                                Volunteer in Wildlife Conservation, Bali
                            </h3>
                            <p className="text-xs text-slate-600 line-clamp-3">
                                Help protect endangered species while
                                experiencing the natural beauty of Bali. Work
                                alongside passionate conservationists.
                            </p>
                        </div>
                        <div className="flex gap-2 mt-auto items-end">
                            <button className="w-full h-[40px] bg-cobalt-500 text-white rounded-md text-sm font-bold">
                                Inquire
                            </button>
                            <button className="w-full h-[40px] border border-cobalt-500 text-cobalt-500 rounded-md text-sm font-bold">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const HistoricalBanner = () => {
    const { active, restoreCurrent, diffMode } = useVersion();
    if (active.current || diffMode) return null;
    return (
        <div
            className="w-full"
            style={{
                background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, #1f4d6e 100%)`,
            }}
        >
            <div className="max-w-[1200px] mx-auto px-4 lg:px-0 py-3 flex items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-3">
                    <MdHistory className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">
                            You&rsquo;re viewing version {active.id} from{" "}
                            {active.absolute}
                        </span>
                        <span className="text-xs text-white/80">
                            Edited by {active.author} · Changes highlighted
                            below
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/40 hover:bg-white/10"
                    >
                        Restore this version
                    </button>
                    <button
                        type="button"
                        onClick={restoreCurrent}
                        className="text-xs font-bold px-3 py-1.5 rounded-md bg-sun-500 hover:bg-sun-600 text-white"
                    >
                        Back to current
                    </button>
                </div>
            </div>
        </div>
    );
};

function ListingBody() {
    return (
        <>
            <HeroSection />
            <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
                <div className="w-full flex flex-col gap-10">
                    <Description />
                    <ProgramHighlights />
                    <MediaGallery />
                </div>
                <div className="shrink-0 w-full lg:w-[400px] flex flex-col gap-10">
                    <QuickDetails />
                    <Awards />
                </div>
            </div>
            <div className="w-full flex flex-col items-center mt-10 gap-10 max-w-[1200px] px-4 lg:px-0">
                <ProgramReviews />
                <ProgramDetails />
            </div>
            <div className="w-full bg-slate-50 mt-10">
                <FAQ />
            </div>
            <div className="w-full flex flex-col items-center mt-10 gap-10 max-w-[1200px] px-4 lg:px-0">
                <Interviews />
                <ProviderBottomCTA />
                <RelatedPrograms />
            </div>
        </>
    );
}

function ProgramListingContent({
    designVersion,
}: {
    designVersion: DesignVersion;
}) {
    const topPadding =
        designVersion === "v2" ? "pt-[150px]" : "pt-[156px]";
    return (
        <div
            className={`w-full flex flex-col items-center bg-white pb-12 ${topPadding} font-inter`}
        >
            {designVersion === "v2" ? (
                <StickyAdminHeaderV2 />
            ) : (
                <StickyAdminHeaderV1 />
            )}
            <HistoricalBanner />
            <ListingBody />
        </div>
    );
}

const PreviewModal = ({ onClose }: { onClose: () => void }) => {
    const ctx = useVersion();
    return (
        <div className="fixed inset-0 z-[70] bg-white overflow-y-auto font-inter">
            {/* Preview chrome bar */}
            <div
                className="sticky top-0 z-[80] text-white flex items-center justify-between px-6 py-2.5 shadow-md"
                style={{
                    background: `linear-gradient(90deg, #0f172a 0%, ${BRAND_BLUE} 100%)`,
                }}
            >
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-sun-500 text-slate-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[10px]">
                        Preview
                    </span>
                    <span className="text-sm font-medium">
                        Viewing the listing as visitors will see it
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/30 rounded-md px-3 py-1.5"
                >
                    <MdClose className="w-4 h-4" />
                    Exit Preview
                </button>
            </div>
            <VersionContext.Provider
                value={{
                    ...ctx,
                    diffMode: false,
                    omitRemoved: false,
                    previewMode: true,
                }}
            >
                <div className="w-full flex flex-col items-center pb-12">
                    <ListingBody />
                </div>
            </VersionContext.Provider>
        </div>
    );
};

export default function ProgramListingPage() {
    const [activeId, setActiveId] = useState(versionHistory[0].id);
    const [designVersion, setDesignVersion] = useState<DesignVersion>("v1");
    const [previewOpen, setPreviewOpen] = useState(false);
    const previousVersion = versionHistory[1];
    const currentVersion = versionHistory[0];
    // In V2 (inline diff) and V3 (summary only) the listing always shows the
    // current version and renders the most recent edit (v_prev → v_current)
    // inline so users can see what changed.
    const showDiffOverlay =
        designVersion === "v2" || designVersion === "v3";
    const active = showDiffOverlay
        ? currentVersion
        : (versionHistory.find((v) => v.id === activeId) ?? currentVersion);
    const diffMode = showDiffOverlay;
    const omitRemoved = designVersion === "v3";
    const isHistorical = !active.current;
    const changedFields = diffMode
        ? computeChangedFields(previousVersion)
        : isHistorical
          ? computeChangedFields(active)
          : new Set<string>();

    return (
        <VersionContext.Provider
            value={{
                active,
                isHistorical,
                changedFields,
                viewVersion: setActiveId,
                restoreCurrent: () => setActiveId(versionHistory[0].id),
                designVersion,
                diffMode,
                omitRemoved,
                previewMode: false,
                openPreview: () => setPreviewOpen(true),
                previousVersion,
            }}
        >
            <ProgramListingContent designVersion={designVersion} />
            <DesignVersionToggle
                value={designVersion}
                onChange={setDesignVersion}
            />
            {previewOpen && (
                <PreviewModal onClose={() => setPreviewOpen(false)} />
            )}
        </VersionContext.Provider>
    );
}
