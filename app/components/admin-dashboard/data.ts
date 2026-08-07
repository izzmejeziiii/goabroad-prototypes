import {
    FiGrid,
    FiUsers,
    FiTv,
    FiStar,
    FiMapPin,
    FiShoppingBag,
    FiFileText,
    FiMessageSquare,
    FiMic,
    FiEdit3,
    FiActivity,
} from "react-icons/fi";
import type {
    Ad,
    Application,
    Contact,
    Deal,
    Inquiry,
    Invoice,
    NavItem,
    Program,
    Provider,
    Review,
    SummaryStat,
    Transaction,
    VerificationStep,
    StatusMeta,
    SummaryWidgetData,
    Faq,
    ActivityLog,
    VerificationRequirement,
} from "./types";

/** Mock provider (clearly fictional — for prototype only) */
export const provider: Provider = {
    name: "Global Trek Volunteers",
    initials: "GT",
    location: "Cusco, Peru",
    website: "globaltrekvolunteers.org",
    tagline: "Meaningful volunteer & study programs across the Andes.",
    memberSince: "2016",
    accountManager: { name: "Bianca Reyes", email: "bianca.reyes@goabroad.com" },
    verification: {
        percent: 75,
        completed: 6,
        total: 8,
        label: "Verification in progress",
    },
    balanceDue: 1240,
    dueDate: "Aug 05, 2026",
};

export const navItems: NavItem[] = [
    { key: "dashboard", label: "Dashboard", icon: FiGrid, href: "/admin/dashboard" },
    { key: "contacts", label: "Contacts", icon: FiUsers, href: "/admin/contacts" },
    { key: "ads", label: "Ads", icon: FiTv, href: "/admin/ads" },
    { key: "reviews", label: "Reviews", icon: FiStar, href: "/admin/reviews", badge: 3 },
    { key: "programs", label: "Programs", icon: FiMapPin, href: "/admin/programs" },
    { key: "mygoabroad", label: "MyGoAbroad", icon: FiShoppingBag, href: "/admin/mygoabroad" },
    { key: "invoices", label: "Invoices", icon: FiFileText, href: "/admin/invoices", badge: 1 },
    { key: "inquiries", label: "Inquiries", icon: FiMessageSquare, href: "/admin/inquiries", badge: 5 },
    { key: "activitylogs", label: "Activity Logs", icon: FiActivity, href: "/admin/activitylogs" },
];

export const summaryStats: SummaryStat[] = [
    { key: "programs", label: "Programs", value: 12, sub: "10 active · 2 pending", tone: "brand", icon: FiMapPin, href: "/admin/programs" },
    { key: "ads", label: "Ads", value: 4, sub: "3 running", tone: "info", icon: FiTv, href: "/admin/ads" },
    { key: "invoices", label: "Invoices", value: 1, sub: "1 unpaid", tone: "warning", icon: FiFileText, href: "/admin/invoices" },
    { key: "reviews", label: "Reviews", value: 148, sub: "3 need a reply", tone: "success", icon: FiStar, href: "/admin/reviews" },
    { key: "interviews", label: "Interviews", value: 6, sub: "Published", tone: "neutral", icon: FiMic, href: "/admin/reviews" },
    { key: "articles", label: "Articles", value: 9, sub: "2 drafts", tone: "neutral", icon: FiEdit3, href: "/admin/reviews" },
];

export const contacts: Contact[] = [
    { id: 1, name: "Marisol Quispe", role: "Program Director", email: "marisol@globaltrekvolunteers.org", phone: "+51 984 221 190", type: "Primary", status: { label: "Active", tone: "success" } },
    { id: 2, name: "Daniel Okonkwo", role: "Finance Lead", email: "daniel@globaltrekvolunteers.org", phone: "+51 984 552 013", type: "Billing", status: { label: "Active", tone: "success" } },
    { id: 3, name: "Priya Nair", role: "Admissions", email: "priya@globaltrekvolunteers.org", phone: "+51 984 771 664", type: "Secondary", status: { label: "Active", tone: "success" } },
    { id: 4, name: "Tomás Herrera", role: "Marketing", email: "tomas@globaltrekvolunteers.org", phone: "+51 984 118 245", type: "Secondary", status: { label: "Invited", tone: "warning" } },
];

export const ads: Ad[] = [
    { id: 1, title: "Featured — Volunteer in Cusco", format: "Featured Listing", placement: "Volunteer Directory", period: "Jul – Sep 2026", impressions: 48210, clicks: 1204, status: { label: "Running", tone: "success" } },
    { id: 2, title: "Homepage Spotlight", format: "Homepage Banner", placement: "Homepage", period: "Jul 2026", impressions: 132500, clicks: 2890, status: { label: "Running", tone: "success" } },
    { id: 3, title: "Sidebar — Study Abroad Peru", format: "Sidebar Ad", placement: "Study Abroad", period: "Aug 2026", impressions: 0, clicks: 0, status: { label: "Scheduled", tone: "info" } },
    { id: 4, title: "Newsletter Feature", format: "Email Feature", placement: "Monthly Newsletter", period: "Jun 2026", impressions: 21400, clicks: 640, status: { label: "Ended", tone: "neutral" } },
];

export const reviews: Review[] = [
    { id: 1, author: "Emily Carter", program: "Community Health Volunteer", rating: 5, date: "Jul 18, 2026", excerpt: "Life-changing month working alongside local nurses. The team supported me the whole way.", status: { label: "Needs reply", tone: "warning" } },
    { id: 2, author: "Lukas Vogel", program: "Spanish Immersion + Volunteer", rating: 4, date: "Jul 12, 2026", excerpt: "Great balance of classes and volunteering. Homestay was the highlight.", status: { label: "Needs reply", tone: "warning" } },
    { id: 3, author: "Aisha Bello", program: "Teach English in the Andes", rating: 5, date: "Jul 09, 2026", excerpt: "Well organized and genuinely impactful. Highly recommend to first-timers.", status: { label: "Needs reply", tone: "warning" } },
    { id: 4, author: "Sofia Marín", program: "Wildlife Conservation", rating: 5, date: "Jun 30, 2026", excerpt: "Incredible experience in the cloud forest. Would go back tomorrow.", status: { label: "Replied", tone: "success" } },
    { id: 5, author: "James Whitfield", program: "Community Health Volunteer", rating: 3, date: "Jun 22, 2026", excerpt: "Meaningful work, though I wish the orientation had been longer.", status: { label: "Replied", tone: "success" } },
];

export const programs: Program[] = [
    { id: 1, title: "Community Health Volunteer", type: "Volunteer Abroad", location: "Cusco, Peru", views: 8420, leads: 96, updated: "Jul 20, 2026", status: { label: "Active", tone: "success" }, description: "Support local clinics and community health campaigns alongside Peruvian nurses in and around Cusco.", duration: "1–12 weeks", price: "from $1,240", inclusions: ["Airport pickup", "Shared accommodation", "Daily breakfast", "In-country support", "Project placement"] },
    { id: 2, title: "Spanish Immersion + Volunteer", type: "Language School", location: "Cusco, Peru", views: 6210, leads: 74, updated: "Jul 15, 2026", status: { label: "Active", tone: "success" }, description: "Morning Spanish classes paired with afternoon volunteering — the fastest way to learn and give back.", duration: "2–24 weeks", price: "from $980", inclusions: ["20 hrs/week classes", "Homestay", "All meals", "Volunteer placement", "Certificate"] },
    { id: 3, title: "Teach English in the Andes", type: "Teach Abroad", location: "Sacred Valley, Peru", views: 5130, leads: 61, updated: "Jul 11, 2026", status: { label: "Active", tone: "success" }, description: "Teach conversational English to students in rural Sacred Valley schools with full training and support.", duration: "4–24 weeks", price: "from $1,450", inclusions: ["TEFL orientation", "Accommodation", "Meals", "Lesson materials", "Support team"] },
    { id: 4, title: "Wildlife Conservation", type: "Volunteer Abroad", location: "Manú, Peru", views: 3980, leads: 38, updated: "Jul 02, 2026", status: { label: "Active", tone: "success" }, description: "Protect biodiversity in the Manú cloud forest — trail monitoring, species surveys, and reforestation.", duration: "2–8 weeks", price: "from $1,690", inclusions: ["Jungle lodge", "All meals", "Ranger training", "Transfers", "Field equipment"] },
    { id: 5, title: "Gap Year in Peru", type: "Gap Year", location: "Cusco, Peru", views: 240, leads: 2, updated: "Jul 22, 2026", status: { label: "Pending review", tone: "warning" }, description: "A structured gap-year combining language, volunteering, and Andean adventure across three months.", duration: "12 weeks", price: "from $4,200", inclusions: ["Full itinerary", "Accommodation", "Meals", "Excursions", "24/7 support"] },
    { id: 6, title: "Medical Internship (Draft)", type: "Intern Abroad", location: "Lima, Peru", views: 0, leads: 0, updated: "Jul 23, 2026", status: { label: "Draft", tone: "neutral" }, description: "Shadow physicians across departments in a Lima teaching hospital. Ideal for pre-med students.", duration: "4–12 weeks", price: "from $1,850", inclusions: ["Hospital placement", "Mentor physician", "Accommodation", "Scrubs", "Certificate"] },
];

export const invoices: Invoice[] = [
    { id: 1, number: "INV-2026-0714", description: "Featured Listing + Homepage Spotlight (Q3)", amount: 1240, issued: "Jul 14, 2026", due: "Aug 05, 2026", status: { label: "Unpaid", tone: "danger" }, items: [{ label: "Featured Listing — Volunteer Directory (Q3)", amount: 840 }, { label: "Homepage Spotlight (July)", amount: 400 }] },
    { id: 2, number: "INV-2026-0412", description: "Annual Listing Subscription", amount: 2400, issued: "Apr 12, 2026", due: "May 01, 2026", status: { label: "Paid", tone: "success" }, items: [{ label: "Annual Listing Subscription (2026)", amount: 2400 }] },
    { id: 3, number: "INV-2026-0118", description: "Newsletter Feature", amount: 350, issued: "Jan 18, 2026", due: "Feb 01, 2026", status: { label: "Paid", tone: "success" }, items: [{ label: "Monthly Newsletter Feature", amount: 350 }] },
    { id: 4, number: "INV-2025-1102", description: "Sidebar Ad Campaign", amount: 780, issued: "Nov 02, 2025", due: "Nov 20, 2025", status: { label: "Paid", tone: "success" }, items: [{ label: "Sidebar Ad — Study Abroad (Nov)", amount: 780 }] },
];

export const inquiries: Inquiry[] = [
    { id: 1, name: "Hannah Schmidt", program: "Community Health Volunteer", message: "Hi! Is the August start still open, and are vaccinations required?", received: "2h ago", status: { label: "New", tone: "brand" } },
    { id: 2, name: "Diego Fernández", program: "Spanish Immersion + Volunteer", message: "Can I combine 2 weeks of classes with 2 weeks volunteering?", received: "5h ago", status: { label: "New", tone: "brand" } },
    { id: 3, name: "Grace Liu", program: "Teach English in the Andes", message: "Do I need a TEFL certificate to join this placement?", received: "1d ago", status: { label: "New", tone: "brand" } },
    { id: 4, name: "Owen Brady", program: "Wildlife Conservation", message: "What's included in the program fee for the Manú trip?", received: "2d ago", status: { label: "Replied", tone: "success" } },
    { id: 5, name: "Amara Nwosu", program: "Gap Year in Peru", message: "Are there scholarships available for gap-year students?", received: "3d ago", status: { label: "Replied", tone: "success" } },
];

export const transactions: Transaction[] = [
    { id: 1, reference: "TXN-88214", item: "Featured Listing (Q3)", amount: 840, date: "Jul 14, 2026", status: { label: "Completed", tone: "success" } },
    { id: 2, reference: "TXN-88010", item: "Homepage Spotlight", amount: 400, date: "Jul 14, 2026", status: { label: "Completed", tone: "success" } },
    { id: 3, reference: "TXN-87422", item: "Newsletter Feature", amount: 350, date: "Jan 18, 2026", status: { label: "Completed", tone: "success" } },
];

export const deals: Deal[] = [
    { id: 1, title: "Early Bird — 10% off Volunteer Programs", discount: "10%", redemptions: 42, expires: "Sep 30, 2026", status: { label: "Live", tone: "success" } },
    { id: 2, title: "Student Discount — Spanish Immersion", discount: "15%", redemptions: 18, expires: "Dec 31, 2026", status: { label: "Live", tone: "success" } },
    { id: 3, title: "Refer a Friend — $50 credit", discount: "$50", redemptions: 7, expires: "Aug 15, 2026", status: { label: "Ending soon", tone: "warning" } },
];

export const applications: Application[] = [
    { id: 1, applicant: "Hannah Schmidt", program: "Community Health Volunteer", submitted: "Jul 21, 2026", status: { label: "Under review", tone: "warning" } },
    { id: 2, applicant: "Grace Liu", program: "Teach English in the Andes", submitted: "Jul 19, 2026", status: { label: "Accepted", tone: "success" } },
    { id: 3, applicant: "Owen Brady", program: "Wildlife Conservation", submitted: "Jul 16, 2026", status: { label: "Waitlisted", tone: "info" } },
];

export const verificationSteps: VerificationStep[] = [
    { id: 1, title: "Business details", description: "Legal name, registration, and country of operation.", done: true },
    { id: 2, title: "Contact information", description: "Primary and billing contacts confirmed.", done: true },
    { id: 3, title: "Program details", description: "At least one published program listing.", done: true },
    { id: 4, title: "Insurance & safety", description: "Proof of liability insurance for participants.", done: true },
    { id: 5, title: "References", description: "Two references from past participants or partners.", done: true },
    { id: 6, title: "Health & safety policy", description: "Uploaded and reviewed by our team.", done: true },
    { id: 7, title: "Accreditation documents", description: "Upload accreditation or partner certificates.", done: false },
    { id: 8, title: "Final review", description: "GoAbroad team verifies your submission.", done: false },
];

/** Lookup helpers */
export const getProgram = (id: number) => programs.find((p) => p.id === id);
export const getInvoice = (id: number) => invoices.find((i) => i.id === id);
export const getContact = (id: number) => contacts.find((c) => c.id === id);
export const getAd = (id: number) => ads.find((a) => a.id === id);
export const getReview = (id: number) => reviews.find((r) => r.id === id);
export const getInquiry = (id: number) => inquiries.find((i) => i.id === id);

// --- Section-complete mock data ---

export const summaryWidgets: SummaryWidgetData[] = [
    { key: "programs", label: "Programs", href: "/admin/programs", rows: [{ label: "Approved", count: 10 }, { label: "Pending", count: 2 }, { label: "Expiring", count: 1 }, { label: "Expired", count: 0 }, { label: "Draft", count: 1 }] },
    { key: "ads", label: "Ads", href: "/admin/ads", rows: [{ label: "Active", count: 3 }, { label: "Scheduled", count: 1 }, { label: "Expired", count: 1 }] },
    { key: "invoices", label: "Invoices", href: "/admin/invoices", rows: [{ label: "Paid", count: 3 }, { label: "Partial", count: 0 }, { label: "Unpaid", count: 1 }, { label: "Overdue", count: 0 }] },
    { key: "reviews", label: "Reviews", href: "/admin/reviews", rows: [{ label: "Approved", count: 145 }, { label: "Inactive", count: 1 }, { label: "Not Checked", count: 2 }] },
    { key: "interviews", label: "Interviews", href: "/admin/reviews", rows: [{ label: "Published", count: 6 }] },
    { key: "articles", label: "Articles", href: "/admin/reviews", rows: [{ label: "Published", count: 9 }] },
];

export const faqs: Faq[] = [
    { id: 1, question: "What's included in the program fee?", answer: "Accommodation, daily breakfast, airport pickup, in-country orientation, and 24/7 local support are included in every program fee." },
    { id: 2, question: "Do I need to speak Spanish?", answer: "No — most programs welcome all levels. Our Spanish Immersion track is designed for beginners through advanced." },
    { id: 3, question: "Are vaccinations required?", answer: "No mandatory vaccinations are required for Peru, but we recommend consulting a travel clinic before departure." },
];

export const notificationOptions: string[] = [
    "Profile Updates",
    "Program Notices",
    "Ad Publication Notices",
    "GoAbroad Team Communications",
    "Invoice Notices",
    "Payment Notices",
    "Review Notices",
    "Interview Publication Notices",
    "Inquiry Notifications",
    "MyGoAbroad Deals & Application Notifications",
    "GoAbroad Partner Newsletter",
];

export const activityLogs: ActivityLog[] = [
    { id: 1, date: "Jul 23, 2026", type: "Program edited", ref: "Community Health Volunteer (#1)", user: "Marisol Quispe" },
    { id: 2, date: "Jul 22, 2026", type: "Program created", ref: "Gap Year in Peru (#5)", user: "Marisol Quispe" },
    { id: 3, date: "Jul 20, 2026", type: "Review reply posted", ref: "Review #148", user: "Priya Nair" },
    { id: 4, date: "Jul 18, 2026", type: "Invoice viewed", ref: "INV-2026-0714", user: "Daniel Okonkwo" },
    { id: 5, date: "Jul 14, 2026", type: "Ad purchased", ref: "Homepage Spotlight", user: "Daniel Okonkwo" },
    { id: 6, date: "Jul 10, 2026", type: "Contact invited", ref: "Tomás Herrera", user: "Marisol Quispe" },
];

export const verificationRequirements: VerificationRequirement[] = [
    { key: "business", title: "Submitted Business Registration", status: { label: "Approved", tone: "success" }, description: "Your business registration document has been reviewed and approved.", action: "View document" },
    { key: "reviews", title: "A Minimum Number of Reviews Per Program Listing", status: { label: "Met", tone: "success" }, description: "You have enough approved reviews across your active listings.", action: "Get reviews" },
    { key: "interviews", title: "A Minimum Number of Partner Interviews on GoAbroad", status: { label: "Pending", tone: "warning" }, description: "Add at least one alumni or staff interview to complete this step.", action: "Add interviews" },
];
