import type {
    Invoice,
    InvoiceItem,
    PlacementLabel,
    Provider,
    Team,
} from "./types";

/* Demo data for /admin-invoices, a copy of gacom-admin-redesign's invoice
   pages (origin/dev, 2026-11-26) in both the internal (staff) admin and the
   client admin. Every client, person, email, address and amount here is made
   up; nothing comes from the real admin's database. */

export const BASE = "/admin-invoices";

/** The prototype's "today", so overdue / near-due states stay stable. */
export const DEMO_TODAY = "2026-11-26";

/** The signed-in staff member (sidebar "Welcome, …"). */
export const staffUser = { id: 7, first_name: "Sam", last_name: "Rivera" };

/* ── Clients ──────────────────────────────────────────────────────────── */

export const providers: Provider[] = [
    { id: 5120, name: "Coral Coast Volunteers", url: "coral-coast-volunteers", is_paying: 1 },
    { id: 3381, name: "Andes Bridge Volunteers", url: "andes-bridge-volunteers", is_paying: 1 },
    { id: 4417, name: "Northbound Language Institute", url: "northbound-language-institute", is_paying: 1 },
    { id: 2290, name: "Kumbali Wildlife Trust", url: "kumbali-wildlife-trust", is_paying: 1 },
    { id: 6012, name: "Lumen Study Abroad", url: "lumen-study-abroad", is_paying: 1 },
    { id: 1875, name: "Pacific Rim Teaching Fellows", url: "pacific-rim-teaching-fellows", is_paying: 1 },
    { id: 5503, name: "Atlas Gap Year", url: "atlas-gap-year", is_paying: 1 },
    { id: 4769, name: "Sahara Spring Internships", url: "sahara-spring-internships", is_paying: 1 },
];

/** The client signed in to the client admin view. */
export const client = {
    id: 5120,
    name: "Coral Coast Volunteers",
    alias: "coral-coast-volunteers",
    firstName: "Dana",
    is_paying: 1 as const,
    is_active: 1 as const,
    subscriptionLevel: 5,
    verificationStatusId: 5,
    requirementUploadStatus: 1,
    accountProgress: 100,
};

/* Team ids the admin's TeamIcon knows (35 Sales Sharks, 36 Sales Wolves). */
const teams: Record<string, Team> = {
    sharks: { id: 35, name: "Sales Sharks", color: "#02b3b6" },
    wolves: { id: 36, name: "Sales Wolves", color: "#f8bb2b" },
};

/* ── Builders ─────────────────────────────────────────────────────────── */

let itemId = 90000;

const item = (
    product_item_id: number,
    product_item_name: string,
    directory: string,
    cost: number,
    placements_label: PlacementLabel[],
    start_date: string,
    end_date: string,
    discounts: number[] = [],
): InvoiceItem => {
    const placements = placements_label.map((_, i) => ({
        discount: discounts[i] ?? 0,
    }));
    return {
        id: ++itemId,
        product_item_id,
        product_item_name,
        directory,
        cost,
        subtotal: cost * placements_label.length,
        start_date,
        end_date,
        placements,
        placements_label,
    };
};

const contact = (
    id: number,
    firstname: string,
    lastname: string,
    job_title: string,
    domain: string,
) => ({
    id,
    firstname,
    lastname,
    job_title,
    email: `${firstname.toLowerCase()}@${domain}`,
    phone: "+1 555 0100",
});

const CORAL = {
    provider_id: 5120,
    name: "Coral Coast Volunteers",
    billing_name: "Coral Coast Volunteers",
    billing_address: "88 Marine Parade, Suite 4\nSuva, Central Division 00000\nFiji",
    contact: contact(811, "Dana", "Whitfield", "Program Director", "coralcoast.example"),
    email: "dana@coralcoast.example",
    account_manager: "Kim Reyes",
    team: teams.sharks,
    is_active: true,
};

const base = {
    sale_type: 0 as const,
    term: 4,
    term_name: "Upon receipt",
    discount: 0,
    discount_description: "",
    upcharge: 0,
    upcharge_description: "",
    message: null,
    payments: [],
    pending_payment: null,
    comments: [],
    activities: [],
    pdf: null,
    creator: "Kim Reyes",
};

/* ── Invoices ─────────────────────────────────────────────────────────────
   Coral Coast Volunteers (the client view's account) has one invoice in
   every state a client can see, plus a draft only staff see. */

export const seedInvoices: Invoice[] = [
    {
        ...base,
        ...CORAL,
        id: 41262,
        status: 0,
        sale_type: 3,
        printed_date: "2026-11-25",
        renewal_date: "2027-12-01",
        term: 5,
        term_name: "Custom",
        discount: 600,
        discount_description: "Multi-year loyalty discount",
        message: "Thank you for renewing with GoAbroad for 2027!",
        invoice_items: [
            item(31, "Homepage Premier Feature", "Volunteer Abroad", 2400, [
                { location: "Fiji", type: "Volunteer Abroad", timing: "Year-round" },
                { location: "Philippines", type: "Volunteer Abroad", timing: "Year-round" },
            ], "2027-01-01", "2027-12-31"),
            item(12, "Premier Listing Feature", "Volunteer Abroad", 600, [
                { location: "Fiji", type: "Marine Conservation" },
            ], "2027-01-01", "2027-12-31"),
        ],
        payment_terms: [
            { id: 7101, due_date: "2027-01-05 00:00:00", amount_due: 2400, amount_paid: 0 },
            { id: 7102, due_date: "2027-04-05 00:00:00", amount_due: 2400, amount_paid: 0 },
        ],
        comments: [
            { id: 1, user_id: 21, first_name: "Kim", last_name: "Reyes", message: "Draft for the 2027 renewal. Waiting on Dana to confirm the second homepage slot.", timestamp: "2026-11-25 10:14:00" },
        ],
        activities: [
            { id: 1, date_created: "2026-11-25 10:12:00", user: "Kim Reyes", action: "Created invoice as draft" },
        ],
    },
    {
        ...base,
        ...CORAL,
        id: 41258,
        status: 2,
        sale_type: 4,
        printed_date: "2026-11-20",
        renewal_date: "2027-11-20",
        message: "Your Fiji listing upgrade starts as soon as this is paid.",
        invoice_items: [
            item(12, "Premier Listing Feature", "Volunteer Abroad", 150, [
                { location: "Fiji", type: "Volunteer Abroad", timing: "December" },
                { location: "Fiji", type: "Volunteer Abroad", timing: "January" },
                { location: "Fiji", type: "Volunteer Abroad", timing: "February" },
            ], "2026-12-01", "2027-02-28"),
        ],
        payment_terms: [
            { id: 7090, due_date: "2026-12-10 00:00:00", amount_due: 450, amount_paid: 0 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41258.pdf" },
        activities: [
            { id: 1, date_created: "2026-11-20 09:02:00", user: "Kim Reyes", action: "Created invoice" },
            { id: 2, date_created: "2026-11-20 09:05:00", user: "Kim Reyes", action: "Sent invoice to dana@coralcoast.example" },
        ],
    },
    {
        ...base,
        ...CORAL,
        id: 41246,
        status: 2,
        sale_type: 1,
        printed_date: "2026-11-12",
        renewal_date: "2027-11-12",
        invoice_items: [
            item(44, "Top Picks", "Volunteer Abroad", 400, [
                { location: "Fiji", type: "Volunteer Abroad" },
                { location: "Philippines", type: "Volunteer Abroad" },
                { location: "Vanuatu", type: "Volunteer Abroad" },
            ], "2026-12-01", "2027-11-30"),
        ],
        payment_terms: [
            { id: 7071, due_date: "2026-12-12 00:00:00", amount_due: 1200, amount_paid: 0 },
        ],
        pending_payment: { amount: 1200, since: "2026-11-24" },
        pdf: { file_name: "GoAbroad-Invoice-41246.pdf" },
        activities: [
            { id: 1, date_created: "2026-11-12 14:40:00", user: "Kim Reyes", action: "Created invoice" },
            { id: 2, date_created: "2026-11-24 08:31:00", user: "Stripe", action: "Bank payment of $1,200.00 submitted" },
        ],
    },
    {
        ...base,
        ...CORAL,
        id: 41237,
        status: 4,
        sale_type: 3,
        printed_date: "2026-10-22",
        renewal_date: "2027-10-22",
        message: "Friendly reminder: this invoice was due on November 5.",
        invoice_items: [
            item(29, "Homepage Feature", "Volunteer Abroad", 1500, [
                { directory: "Volunteer Abroad", timing: "Q1 2027" },
            ], "2027-01-01", "2027-03-31"),
            item(53, "Study Abroad Directory Video Ad", "Study Abroad", 450, [
                { location: "Fiji", type: "Study Abroad" },
                { location: "Australia", type: "Study Abroad" },
            ], "2027-01-01", "2027-03-31"),
        ],
        payment_terms: [
            { id: 7050, due_date: "2026-11-05 00:00:00", amount_due: 2400, amount_paid: 0 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41237.pdf" },
        comments: [
            { id: 1, user_id: 21, first_name: "Kim", last_name: "Reyes", message: "Sent a reminder on 11/12. Dana said finance will pay by the end of the month.", timestamp: "2026-11-12 16:20:00" },
            { id: 2, user_id: 9, first_name: "Paolo", last_name: "Cruz", message: "Following up again on Monday.", timestamp: "2026-11-21 11:03:00" },
        ],
        activities: [
            { id: 1, date_created: "2026-10-22 10:00:00", user: "Kim Reyes", action: "Created invoice" },
            { id: 2, date_created: "2026-11-06 00:01:00", user: "System", action: "Status changed to Overdue" },
            { id: 3, date_created: "2026-11-12 16:18:00", user: "Kim Reyes", action: "Sent payment reminder" },
        ],
    },
    {
        ...base,
        ...CORAL,
        id: 41219,
        status: 3,
        sale_type: 4,
        printed_date: "2026-09-15",
        renewal_date: "2027-09-15",
        term: 5,
        term_name: "Custom",
        discount: 200,
        discount_description: "Early renewal",
        invoice_items: [
            item(12, "Premier Listing Feature", "Volunteer Abroad", 950, [
                { location: "Fiji", type: "Volunteer Abroad" },
                { location: "Philippines", type: "Volunteer Abroad" },
            ], "2026-10-01", "2027-09-30"),
            item(61, "Study Abroad Article Directory Feature", "Study Abroad", 1900, [
                { directory: "Study Abroad", timing: "Fall 2026" },
            ], "2026-10-01", "2026-12-31"),
        ],
        payment_terms: [
            { id: 7020, due_date: "2026-10-01 00:00:00", amount_due: 1800, amount_paid: 1800 },
            { id: 7021, due_date: "2026-12-15 00:00:00", amount_due: 1800, amount_paid: 0 },
        ],
        payments: [
            { id: 6601, date_created: "2026-09-28 13:45:00", amount: 1800, total_amount: 1800, payment_method: "Wire Transfer", reference: "WT-0928-5120", recorded_by: "Bea Santos", payment_term_id: 7020 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41219.pdf" },
        activities: [
            { id: 1, date_created: "2026-09-15 09:30:00", user: "Kim Reyes", action: "Created invoice" },
            { id: 2, date_created: "2026-09-28 13:45:00", user: "Bea Santos", action: "Recorded wire transfer of $1,800.00" },
        ],
    },
    {
        ...base,
        ...CORAL,
        id: 41188,
        status: 5,
        sale_type: 3,
        printed_date: "2026-07-30",
        renewal_date: "2027-07-30",
        invoice_items: [
            item(18, "Linked Listing", "Volunteer Abroad", 300, [
                { location: "Fiji", type: "Volunteer Abroad" },
                { location: "Fiji", type: "Marine Conservation" },
                { location: "Philippines", type: "Volunteer Abroad" },
                { location: "Philippines", type: "Teaching" },
                { location: "Vanuatu", type: "Volunteer Abroad" },
                { location: "Vanuatu", type: "Community Development" },
            ], "2026-08-01", "2027-07-31"),
        ],
        payment_terms: [
            { id: 6980, due_date: "2026-08-14 00:00:00", amount_due: 1800, amount_paid: 1800 },
        ],
        payments: [
            { id: 6512, date_created: "2026-08-12 10:20:00", amount: 1800, total_amount: 1800, payment_method: "Check", reference: "CHK 20417", recorded_by: "Bea Santos", payment_term_id: 6980 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41188.pdf" },
        activities: [
            { id: 1, date_created: "2026-07-30 15:10:00", user: "Kim Reyes", action: "Created invoice" },
            { id: 2, date_created: "2026-08-12 10:20:00", user: "Bea Santos", action: "Recorded check payment of $1,800.00" },
            { id: 3, date_created: "2026-08-12 10:20:00", user: "System", action: "Status changed to Paid" },
        ],
    },
    {
        ...base,
        ...CORAL,
        id: 41102,
        status: 6,
        printed_date: "2026-05-04",
        renewal_date: "2027-05-04",
        message: "Replaced by invoice 41188.",
        invoice_items: [
            item(18, "Linked Listing", "Volunteer Abroad", 300, [
                { location: "Fiji", type: "Volunteer Abroad" },
                { location: "Philippines", type: "Volunteer Abroad" },
            ], "2026-06-01", "2027-05-31"),
        ],
        payment_terms: [
            { id: 6801, due_date: "2026-05-05 00:00:00", amount_due: 600, amount_paid: 0 },
        ],
        activities: [
            { id: 1, date_created: "2026-05-04 11:00:00", user: "Kim Reyes", action: "Created invoice" },
            { id: 2, date_created: "2026-07-30 15:05:00", user: "Kim Reyes", action: "Voided invoice" },
        ],
    },

    /* Other clients, for the staff list */
    {
        ...base,
        id: 41261,
        provider_id: 3381,
        name: "Andes Bridge Volunteers",
        status: 1,
        sale_type: 3,
        printed_date: "2026-11-24",
        renewal_date: "2027-11-24",
        billing_name: "Andes Bridge Volunteers",
        billing_address: "1550 Larimer Street, Suite 400\nDenver, CO 80202\nUnited States",
        contact: contact(402, "Luis", "Paredes", "Director", "andesbridge.example"),
        email: "luis@andesbridge.example",
        account_manager: "Paolo Cruz",
        creator: "Paolo Cruz",
        team: teams.wolves,
        is_active: true,
        invoice_items: [
            item(12, "Premier Listing Feature", "Volunteer Abroad", 1375, [
                { location: "Peru", type: "Volunteer Abroad" },
                { location: "Ecuador", type: "Volunteer Abroad" },
            ], "2027-01-01", "2027-12-31"),
        ],
        payment_terms: [
            { id: 7100, due_date: "2026-12-24 00:00:00", amount_due: 2750, amount_paid: 0 },
        ],
    },
    {
        ...base,
        id: 41255,
        provider_id: 4417,
        name: "Northbound Language Institute",
        status: 7,
        sale_type: 1,
        printed_date: "2026-11-16",
        renewal_date: "2027-11-16",
        billing_name: "Northbound Language Institute",
        billing_address: "210 Queen Street West\nToronto, ON M5V 2A1\nCanada",
        contact: contact(533, "Anika", "Brandt", "Marketing Lead", "northbound.example"),
        email: "anika@northbound.example",
        account_manager: "Bea Santos",
        creator: "Bea Santos",
        team: teams.sharks,
        is_active: true,
        invoice_items: [
            item(53, "Study Abroad Directory Video Ad", "Language Schools", 490, [
                { location: "Spain", type: "Language Schools" },
                { location: "Japan", type: "Language Schools" },
            ], "2026-12-01", "2027-05-31"),
        ],
        payment_terms: [
            { id: 7085, due_date: "2026-11-30 00:00:00", amount_due: 980, amount_paid: 0 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41255.pdf" },
    },
    {
        ...base,
        id: 41250,
        provider_id: 2290,
        name: "Kumbali Wildlife Trust",
        status: 5,
        sale_type: 2,
        printed_date: "2026-11-03",
        renewal_date: "2027-11-03",
        billing_name: "Kumbali Wildlife Trust",
        billing_address: "Plot 14, Kafue Road\nLusaka 10101\nZambia",
        contact: contact(618, "Thandi", "Mwale", "Partnerships", "kumbali.example"),
        email: "thandi@kumbali.example",
        account_manager: "Marco Lim",
        creator: "Marco Lim",
        team: teams.wolves,
        is_active: true,
        invoice_items: [
            item(29, "Homepage Feature", "Volunteer Abroad", 1400, [
                { directory: "Volunteer Abroad", timing: "Q1 2027" },
                { directory: "Volunteer Abroad", timing: "Q2 2027" },
                { directory: "Volunteer Abroad", timing: "Q3 2027" },
            ], "2027-01-01", "2027-09-30"),
        ],
        payment_terms: [
            { id: 7060, due_date: "2026-11-17 00:00:00", amount_due: 4200, amount_paid: 4200 },
        ],
        payments: [
            { id: 6650, date_created: "2026-11-10 09:12:00", amount: 4200, total_amount: 4200, payment_method: "Bank Payment (ACH)", reference: "py_3Q8kAch", recorded_by: "Stripe", payment_term_id: 7060 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41250.pdf" },
    },
    {
        ...base,
        id: 41241,
        provider_id: 6012,
        name: "Lumen Study Abroad",
        status: 4,
        sale_type: 3,
        printed_date: "2026-10-01",
        renewal_date: "2027-10-01",
        term: 5,
        term_name: "Custom",
        billing_name: "Lumen Study Abroad LLC",
        billing_address: "77 Grand Avenue, Floor 3\nOakland, CA 94612\nUnited States",
        contact: contact(705, "Grace", "Okafor", "Enrollment Manager", "lumen.example"),
        email: "grace@lumen.example",
        account_manager: "Kim Reyes",
        team: teams.sharks,
        is_active: true,
        invoice_items: [
            item(31, "Homepage Premier Feature", "Study Abroad", 3750, [
                { directory: "Study Abroad", timing: "Spring 2027" },
                { directory: "Study Abroad", timing: "Fall 2027" },
            ], "2027-01-01", "2027-12-31"),
        ],
        payment_terms: [
            { id: 7030, due_date: "2026-11-01 00:00:00", amount_due: 3750, amount_paid: 0 },
            { id: 7031, due_date: "2027-02-01 00:00:00", amount_due: 3750, amount_paid: 0 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41241.pdf" },
        comments: [
            { id: 1, user_id: 21, first_name: "Kim", last_name: "Reyes", message: "Grace asked to split the first installment. Waiting on approval.", timestamp: "2026-11-18 09:40:00" },
        ],
    },
    {
        ...base,
        id: 41233,
        provider_id: 1875,
        name: "Pacific Rim Teaching Fellows",
        status: 3,
        sale_type: 4,
        printed_date: "2026-09-24",
        renewal_date: "2027-09-24",
        term: 5,
        term_name: "Custom",
        billing_name: "Pacific Rim Teaching Fellows",
        billing_address: "3-5-1 Kojimachi, Chiyoda-ku\nTokyo 102-0083\nJapan",
        contact: contact(812, "Kenji", "Watanabe", "Program Manager", "pacificrim.example"),
        email: "kenji@pacificrim.example",
        account_manager: "Paolo Cruz",
        creator: "Paolo Cruz",
        team: teams.sharks,
        is_active: true,
        invoice_items: [
            item(12, "Premier Listing Feature", "Teach Abroad", 1500, [
                { location: "Japan", type: "Teach Abroad" },
                { location: "South Korea", type: "Teach Abroad" },
                { location: "Taiwan", type: "Teach Abroad" },
                { location: "Vietnam", type: "Teach Abroad" },
            ], "2026-10-01", "2027-09-30"),
        ],
        payment_terms: [
            { id: 7040, due_date: "2026-10-08 00:00:00", amount_due: 3000, amount_paid: 3000 },
            { id: 7041, due_date: "2027-01-08 00:00:00", amount_due: 3000, amount_paid: 0 },
        ],
        payments: [
            { id: 6620, date_created: "2026-10-06 22:10:00", amount: 3000, total_amount: 3000, payment_method: "Wire Transfer", reference: "MUFG-1006", recorded_by: "Bea Santos", payment_term_id: 7040 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41233.pdf" },
    },
    {
        ...base,
        id: 41226,
        provider_id: 5503,
        name: "Atlas Gap Year",
        status: 5,
        sale_type: 1,
        printed_date: "2026-09-10",
        renewal_date: "2027-09-10",
        billing_name: "Atlas Gap Year Ltd",
        billing_address: "12 Bridge Street\nBath BA2 4AS\nUnited Kingdom",
        contact: contact(910, "Oliver", "Hart", "Founder", "atlasgap.example"),
        email: "oliver@atlasgap.example",
        account_manager: "Marco Lim",
        creator: "Marco Lim",
        team: null,
        is_active: true,
        invoice_items: [
            item(18, "Linked Listing", "Gap Year", 350, [
                { location: "Costa Rica", type: "Gap Year" },
            ], "2026-10-01", "2027-09-30"),
        ],
        payment_terms: [
            { id: 7010, due_date: "2026-09-11 00:00:00", amount_due: 350, amount_paid: 350 },
        ],
        payments: [
            { id: 6590, date_created: "2026-09-10 17:35:00", amount: 350, total_amount: 360.5, payment_method: "Credit Card", reference: "ch_3P9xCard", recorded_by: "Stripe", payment_term_id: 7010 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41226.pdf" },
    },
    {
        ...base,
        id: 41214,
        provider_id: 4769,
        name: "Sahara Spring Internships",
        status: 2,
        sale_type: 2,
        printed_date: "2026-11-19",
        renewal_date: "2027-11-19",
        term: 1,
        term_name: "30 days",
        billing_name: "Sahara Spring Internships",
        billing_address: "24 Rue Ibn Batouta\nMarrakech 40000\nMorocco",
        contact: contact(1004, "Yasmine", "Alaoui", "Operations", "saharaspring.example"),
        email: "yasmine@saharaspring.example",
        account_manager: "Bea Santos",
        creator: "Bea Santos",
        team: teams.sharks,
        is_active: true,
        invoice_items: [
            item(61, "Study Abroad Article Directory Feature", "Intern Abroad", 725, [
                { directory: "Intern Abroad", timing: "Spring 2027" },
                { directory: "Intern Abroad", timing: "Summer 2027" },
            ], "2027-01-01", "2027-08-31"),
        ],
        payment_terms: [
            { id: 7080, due_date: "2026-12-19 00:00:00", amount_due: 1450, amount_paid: 0 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41214.pdf" },
    },
    {
        ...base,
        id: 41205,
        provider_id: 3381,
        name: "Andes Bridge Volunteers",
        status: 5,
        sale_type: 1,
        printed_date: "2026-08-20",
        renewal_date: "2027-08-20",
        billing_name: "Andes Bridge Volunteers",
        billing_address: "1550 Larimer Street, Suite 400\nDenver, CO 80202\nUnited States",
        contact: contact(402, "Luis", "Paredes", "Director", "andesbridge.example"),
        email: "luis@andesbridge.example",
        account_manager: "Paolo Cruz",
        creator: "Paolo Cruz",
        team: teams.wolves,
        is_active: true,
        invoice_items: [
            item(44, "Top Picks", "Volunteer Abroad", 275, [
                { location: "Peru", type: "Volunteer Abroad" },
                { location: "Bolivia", type: "Volunteer Abroad" },
            ], "2026-09-01", "2027-08-31"),
        ],
        payment_terms: [
            { id: 7000, due_date: "2026-08-21 00:00:00", amount_due: 550, amount_paid: 550 },
        ],
        payments: [
            { id: 6555, date_created: "2026-08-21 08:00:00", amount: 550, total_amount: 550, payment_method: "PayPal", reference: "PP-8T2Q", recorded_by: "Bea Santos", payment_term_id: 7000 },
        ],
        pdf: { file_name: "GoAbroad-Invoice-41205.pdf" },
    },
    {
        ...base,
        id: 41197,
        provider_id: 4417,
        name: "Northbound Language Institute",
        status: 0,
        sale_type: 0,
        printed_date: "2026-11-23",
        renewal_date: "2027-11-23",
        billing_name: "Northbound Language Institute",
        billing_address: "210 Queen Street West\nToronto, ON M5V 2A1\nCanada",
        contact: contact(533, "Anika", "Brandt", "Marketing Lead", "northbound.example"),
        email: "anika@northbound.example",
        account_manager: "Bea Santos",
        creator: "Bea Santos",
        team: teams.sharks,
        is_active: false,
        invoice_items: [
            item(29, "Homepage Feature", "Language Schools", 1200, [
                { directory: "Language Schools", timing: "Q2 2027" },
            ], "2027-04-01", "2027-06-30"),
        ],
        payment_terms: [
            { id: 7099, due_date: "2026-11-24 00:00:00", amount_due: 1200, amount_paid: 0 },
        ],
    },
];

/** Product items the editor's Invoice Item dropdown offers. */
export const productItems = [
    { value: 12, label: "Premier Listing Feature", cost: 150 },
    { value: 18, label: "Linked Listing", cost: 300 },
    { value: 29, label: "Homepage Feature", cost: 1500 },
    { value: 31, label: "Homepage Premier Feature", cost: 2400 },
    { value: 44, label: "Top Picks", cost: 400 },
    { value: 53, label: "Study Abroad Directory Video Ad", cost: 450 },
    { value: 61, label: "Study Abroad Article Directory Feature", cost: 725 },
];

export const accountManagers = [
    { employee_id: 7, name: "Kim Reyes" },
    { employee_id: 9, name: "Paolo Cruz" },
    { employee_id: 11, name: "Bea Santos" },
    { employee_id: 14, name: "Marco Lim" },
];

export const teamList = Object.values(teams);

/** GoAbroad's "Billed from" block, as the invoice header prints it. */
export const billedFrom = {
    logo: "https://images.goabroad.com/image/upload/h_209,w_272/v2/images2/galogo.png",
    name: "GoAbroad",
    lines: ["4309 Fox Grove Dr.", "Fort Collins, CO, 80524 USA"],
};

/** The staff sidebar avatar. */
export const staffAvatar =
    "https://images.goabroad.com/image/upload/c_pad,h_180,w_180/v2/images2/goabroad-logo.webp";

/** STRIPE_MAX_INVOICE_AMOUNT: card only for invoices up to this. */
export const STRIPE_MAX_INVOICE_AMOUNT = 500;
/** STRIPE_ACH_ENABLED. On in the prototype so the bank option shows. */
export const STRIPE_ACH_ENABLED = true;

/* Wire details the Payment Methods block lists. The real numbers are
   GoAbroad's; these are placeholders in the same format. */
export const WIRE_DETAILS = [
    { label: "Bank", value: "Wells Fargo Bank, N.A. (San Francisco, CA)" },
    { label: "Account name", value: "GoAbroad, LLC" },
    { label: "Account #", value: "0000000000", copy: "account number" },
    { label: "Routing #", value: "000000000", copy: "routing number" },
    { label: "SWIFT", value: "XXXXUS6S", copy: "SWIFT code" },
];
