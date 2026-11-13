/* Shapes for the /lead-threshold prototype. They mirror the fields the real
   client admin (gacom-admin-redesign, PR 784) reads from the API, renamed to
   camelCase. */

/** `client.subscription_level`: 0 Legacy, 1 Basic … 6 Enterprise. */
export type SubscriptionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Client = {
    name: string;
    alias: string;
    /** The logged-in contact's first name, shown in the sidebar. */
    firstName: string;
    subscriptionLevel: SubscriptionLevel;
    /** 5 = verified. */
    verificationStatusId: number;
    /** 0 = no verification documents uploaded yet. */
    requirementUploadStatus: number;
    /** Profile completion %, from ClientAdminChecklist. */
    accountProgress: number;
};

/** ClientAdminChecklist results: `false` means the item is missing. */
export type Checklist = Record<
    | "logo"
    | "url"
    | "address"
    | "billing"
    | "description"
    | "socialmedia"
    | "recognition"
    | "listing"
    | "business"
    | "reviews"
    | "interviews"
    | "inquiry",
    boolean
>;

export type AttentionCounts = {
    expiringPrograms: number;
    expiringAds: number;
    overdueInvoices: number;
    /** Shown when nothing is overdue but a balance is due. */
    balanceDue: { amount: number; dueDate: string } | null;
    newReviews: number;
};

export type RenewalInvoice = {
    number: string;
    amount: number;
    /** ISO date. */
    dueDate: string;
};

export type OverviewType =
    | "programs"
    | "ads"
    | "invoices"
    | "reviews"
    | "interviews"
    | "articles";

export type OverviewStats = Record<OverviewType, Record<string, number>>;

export type Badge = {
    key: string;
    name: string;
    detail: string;
    image: string;
};

export type Lead = {
    id: number;
    /** ISO date-time the inquiry was submitted. */
    inquiryDate: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    citizenship: string;
    /** ISO date. */
    birthdate: string;
    programName: string;
    isCurrentStudent: boolean;
    schoolName?: string;
    referralSource?: string;
    message: string;
};
