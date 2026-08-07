import type { IconType } from "react-icons";
import type { ReactNode } from "react";

/** Level-1 (client / provider portal) page keys */
export type PageKey =
    | "dashboard"
    | "contacts"
    | "ads"
    | "reviews"
    | "programs"
    | "mygoabroad"
    | "invoices"
    | "inquiries"
    | "activitylogs";

export interface NavItem {
    key: PageKey;
    label: string;
    icon: IconType;
    href: string;
    badge?: number;
}

export type StatusTone =
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "brand"
    | "neutral";

export interface StatusMeta {
    label: string;
    tone: StatusTone;
}

export interface Provider {
    name: string;
    initials: string;
    location: string;
    website: string;
    tagline: string;
    memberSince: string;
    accountManager: { name: string; email: string };
    verification: {
        percent: number;
        completed: number;
        total: number;
        label: string;
    };
    balanceDue: number;
    dueDate: string;
}

export interface SummaryStat {
    key: string;
    label: string;
    value: number;
    sub: string;
    tone: StatusTone;
    icon: IconType;
    href: string;
}

export interface Contact {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    type: "Primary" | "Billing" | "Secondary";
    status: StatusMeta;
}

export interface Ad {
    id: number;
    title: string;
    format: string;
    placement: string;
    period: string;
    impressions: number;
    clicks: number;
    status: StatusMeta;
}

export interface Review {
    id: number;
    author: string;
    program: string;
    rating: number;
    date: string;
    excerpt: string;
    status: StatusMeta;
}

export interface Program {
    id: number;
    title: string;
    type: string;
    location: string;
    views: number;
    leads: number;
    updated: string;
    status: StatusMeta;
    description: string;
    duration: string;
    price: string;
    inclusions: string[];
}

export interface InvoiceLine {
    label: string;
    amount: number;
}

export interface Invoice {
    id: number;
    number: string;
    description: string;
    amount: number;
    issued: string;
    due: string;
    status: StatusMeta;
    items: InvoiceLine[];
}

export interface Inquiry {
    id: number;
    name: string;
    program: string;
    message: string;
    received: string;
    status: StatusMeta;
}

export interface Transaction {
    id: number;
    reference: string;
    item: string;
    amount: number;
    date: string;
    status: StatusMeta;
}

export interface Deal {
    id: number;
    title: string;
    discount: string;
    redemptions: number;
    expires: string;
    status: StatusMeta;
}

export interface Application {
    id: number;
    applicant: string;
    program: string;
    submitted: string;
    status: StatusMeta;
}

export interface VerificationStep {
    id: number;
    title: string;
    description: string;
    done: boolean;
}

/** Generic data-table column config */
export interface Column<T> {
    key: string;
    header: string;
    render?: (row: T) => ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
}

export interface SummaryWidgetData {
    key: string;
    label: string;
    href: string;
    rows: { label: string; count: number }[];
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
}

export interface ActivityLog {
    id: number;
    date: string;
    type: string;
    ref: string;
    user: string;
}

export interface VerificationRequirement {
    key: string;
    title: string;
    status: StatusMeta;
    description: string;
    action: string;
}
