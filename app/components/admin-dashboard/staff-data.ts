import {
    FiGrid,
    FiUsers,
    FiTrendingUp,
    FiBarChart2,
    FiMessageCircle,
    FiBookOpen,
    FiCompass,
    FiMic,
    FiAward,
    FiGift,
    FiLink,
    FiTool,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { StatusTone, StatusMeta } from "./types";

export interface StaffClient {
    id: number;
    name: string;
    created: string;
    verification: StatusMeta;
    subscription: string;
    location: string;
    manager: string;
}

export const staffClients: StaffClient[] = [
    { id: 4021, name: "Global Trek Volunteers", created: "Mar 2016", verification: { label: "In progress", tone: "warning" }, subscription: "Premium", location: "Cusco, Peru", manager: "Bianca Reyes" },
    { id: 4088, name: "Maximo Impact Peru", created: "Jan 2019", verification: { label: "Verified", tone: "success" }, subscription: "Premium", location: "Lima, Peru", manager: "Bianca Reyes" },
    { id: 4130, name: "Andes Language Co.", created: "Aug 2020", verification: { label: "Verified", tone: "success" }, subscription: "Basic", location: "Arequipa, Peru", manager: "Alex Rivera" },
    { id: 4207, name: "Rainforest Expeditions", created: "Feb 2022", verification: { label: "Unverified", tone: "neutral" }, subscription: "Basic", location: "Manú, Peru", manager: "Alex Rivera" },
];

export const getStaffClient = (id: number) =>
    staffClients.find((c) => c.id === id);

export interface StaffNavItem {
    key: string;
    label: string;
    icon: IconType;
    href: string;
}

export const staffNavItems: StaffNavItem[] = [
    { key: "dashboard", label: "Dashboard", icon: FiGrid, href: "/admin/staff/dashboard" },
    { key: "clients", label: "Clients", icon: FiUsers, href: "/admin/staff/clients" },
    { key: "stats", label: "Client Stats", icon: FiTrendingUp, href: "/admin/staff/stats" },
    { key: "ranking", label: "Ranking System", icon: FiBarChart2, href: "/admin/staff/ranking" },
    { key: "oai", label: "Online Advisor", icon: FiMessageCircle, href: "/admin/staff/online-advisor" },
    { key: "articles", label: "Articles", icon: FiBookOpen, href: "/admin/staff/articles" },
    { key: "guides", label: "Guides", icon: FiCompass, href: "/admin/staff/guides" },
    { key: "interviews", label: "Interviews", icon: FiMic, href: "/admin/staff/interviews" },
    { key: "scholarships", label: "Scholarships", icon: FiAward, href: "/admin/staff/scholarships" },
    { key: "mygoabroad", label: "MyGoAbroad", icon: FiGift, href: "/admin/staff/mygoabroad" },
    { key: "url-verifiers", label: "URL Verifiers", icon: FiLink, href: "/admin/staff/url-verifiers" },
    { key: "site-tools", label: "Site Tools", icon: FiTool, href: "/admin/staff/site-tools" },
];

export const staffUser = {
    name: "Alex Rivera",
    firstName: "Alex",
    role: "Content Editor",
    initials: "AR",
    email: "alex.rivera@goabroad.com",
};

export const masterSearchTypes = [
    "Client Name",
    "Listing ID",
    "Website URL",
    "Email Address",
];

export interface CounterCard {
    key: string;
    label: string;
    value: number;
    tone: StatusTone;
    href: string;
}

export const thisMonthCounters: CounterCard[] = [
    { key: "approved-reviews", label: "Approved Reviews", value: 38, tone: "success", href: "/admin/staff/clients" },
    { key: "unchecked-reviews", label: "Unchecked Reviews", value: 12, tone: "danger", href: "/admin/staff/clients" },
    { key: "listings-edited", label: "Listings Edited", value: 64, tone: "brand", href: "/admin/staff/clients" },
    { key: "listings-added", label: "Listings Added", value: 9, tone: "brand", href: "/admin/staff/clients" },
];

export const pendingCounters: CounterCard[] = [
    { key: "pending-listings", label: "Pending Listings", value: 7, tone: "warning", href: "/admin/staff/clients" },
    { key: "pending-descriptions", label: "Pending Company Descriptions", value: 4, tone: "warning", href: "/admin/staff/clients" },
    { key: "pending-faqs", label: "Pending Provider FAQs", value: 3, tone: "warning", href: "/admin/staff/clients" },
];

export interface QuickLinkGroup {
    group: string;
    links: { label: string; href: string; danger?: boolean }[];
}

export const teamQuickLinks: QuickLinkGroup[] = [
    { group: "Accounts", links: [{ label: "Pending Documents for Verification", href: "/admin/staff/clients" }] },
    { group: "Listings", links: [{ label: "Expired Listings", href: "/admin/staff/clients", danger: true }] },
    { group: "Reviews", links: [{ label: "Top Rated Providers", href: "/admin/staff/clients" }, { label: "Unapproved Reviews", href: "/admin/staff/clients", danger: true }] },
];

export const teamQuickActions = [
    { label: "Create an Article", href: "/admin/staff/articles" },
    { label: "Create an Interview", href: "/admin/staff/interviews" },
    { label: "Create a Listing", href: "/admin/programs/new" },
    { label: "Create an Account", href: "/admin/staff/clients" },
    { label: "Add a Guide", href: "/admin/staff/guides" },
    { label: "Add Scholarship Listing", href: "/admin/staff/scholarships" },
];

export const salesCollections = {
    year: 2026,
    month: "Jul",
    quarter: 3,
    sales: { ytdActual: 428000, ytdGoal: 620000, qtdActual: 96000, qtdGoal: 155000 },
    collections: { ytdActual: 391000, ytdGoal: 620000, qtdActual: 82000, qtdGoal: 155000 },
};
