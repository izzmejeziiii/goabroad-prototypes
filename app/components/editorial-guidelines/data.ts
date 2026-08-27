/* Content for /editorial-guidelines — transcribed verbatim from the
   "2026 GoAbroad Article Strategy" document (JUNE_REFINED VERSION). The copy
   here is the source of truth: the page only lays it out, it never rewrites it.
   Apostrophes are normalised to the typographic form (’) so the page renders
   consistently; the wording is untouched. */

export type ValueItem = {
    id: string;
    name: string;
    text: string;
    /** Key into the icon map in `icons.tsx`. */
    icon: string;
};

export type CriterionItem = {
    label: string;
    text: string;
    icon: string;
};

export type ContributorItem = {
    label: string;
    text: string;
    icon: string;
    /** Rendered as the wide, cobalt-filled card at the end of the grid. */
    featured?: boolean;
};

export type GuidelineSection = {
    id: string;
    /** Heading exactly as it appears in the document. */
    title: string;
    /** Shorter label for the sticky jump strip. */
    navLabel: string;
    /** Kicker above the heading. Page furniture in the /ads-specs house style —
        NOT copy from the source document. */
    kicker: string;
};

export const pageTitle = "GoAbroad Editorial Guidelines";

export const intro = {
    /* Page furniture, not document copy — see GuidelineSection.kicker. */
    kicker: "Start here",
    heading: "Why You Can Trust What You Read on GoAbroad",
    paragraphs: [
        "At GoAbroad, we believe travel has the power to change lives. That belief shapes every piece of content we publish. And it comes with a responsibility to you, our reader, to ensure that the content is worth your trust.",
        "This page explains the principles that guide everything published on GoAbroad.com.",
    ],
};

export const purpose = {
    paragraphs: [
        "Every article, guide, and resource on GoAbroad exists for one reason: to help you make your travel dreams a reality. Whether you’re planning a gap year, searching for a study abroad program, exploring international internships, or looking for ways to work overseas, our content provides clear, honest, and inspiring information to help you move forward with confidence.",
        "We don’t publish content just to fill a page. We publish content because we genuinely believe it will help you.",
    ],
};

export const coreValues: ValueItem[] = [
    {
        id: "accuracy",
        name: "Accuracy",
        text: "We are committed to providing information that is factual, up-to-date, and reliable. When we cover programs, destinations, costs, or experiences, we work to ensure they are grounded in reality rather than just what sounds good.",
        icon: "accuracy",
    },
    {
        id: "honesty",
        name: "Honesty",
        text: "We tell the full story. That means acknowledging challenges alongside opportunities, being transparent when information changes, and never overpromising what travel or a program can deliver. We want you to make informed decisions, not just inspired ones.",
        icon: "honesty",
    },
    {
        id: "integrity",
        name: "Integrity",
        text: "GoAbroad maintains editorial independence. Our content recommendations reflect what we genuinely believe is valuable and trustworthy for our readers, not what benefits us commercially. When commercial relationships exist, we are transparent about them.",
        icon: "integrity",
    },
    {
        id: "inclusivity",
        name: "Inclusivity",
        text: "Travel is for everyone. Our content is written to welcome readers of all backgrounds, identities, and starting points. We believe a more empathetic, connected world is built by people who cross borders, and we want every reader to see themselves in that journey.",
        icon: "inclusivity",
    },
    {
        id: "respect-for-culture",
        name: "Respect for Culture",
        text: "We approach every destination, people, and culture with curiosity and respect. Our content does not stereotype, sensationalize, or reduce complex cultures to tourist attractions. We believe understanding leads to empathy, and empathy makes the world better.",
        icon: "culture",
    },
];

export const publishing = {
    doLead: "GoAbroad publishes content that:",
    doItems: [
        "Helps readers understand their international travel and program options",
        "Provides practical, actionable guidance for life-changing experiences",
        "Shares authentic stories of what travel and programs are really like",
        "Reflects diverse experiences, voices, and destinations",
    ],
    dontLead: "We do not publish content that:",
    dontItems: [
        "Misleads readers about the realities of travel or programs",
        "Promotes unsafe, unethical, or exploitative experiences",
        "Prioritizes clicks or engagement over accuracy and usefulness",
    ],
};

export const programSelection = {
    opening:
        "GoAbroad has been connecting people with international programs since 1997. Over that time, we’ve developed a clear standard for which programs and providers are featured in our content.",
    /* Pulled into a callout because it is the load-bearing disclosure of the
       section — the wording is unchanged. */
    callout:
        "A program listed on GoAbroad or having a commercial relationship with us does not guarantee it will be featured or recommended in our editorial content. Those decisions are made independently by our editorial team, with our users in mind.",
    criteriaLead:
        "When our content highlights a specific program or provider, it’s because they meet criteria we genuinely stand behind.",
    criteria: [
        {
            label: "Reputation and track record:",
            text: "We look at how long a provider has been operating, the consistency of their participant experiences, and how they respond when things go wrong, which all contribute to their verification on our website.",
            icon: "reputation",
        },
        {
            label: "Transparency:",
            text: "Providers featured in our content are upfront about costs, what’s included, eligibility requirements, and what participants can realistically expect.",
            icon: "transparency",
        },
        {
            label: "Safety and support:",
            text: "We consider the infrastructure and support services a provider has in place for participants before, during, and after their program.",
            icon: "safety",
        },
        {
            label: "Real reviews:",
            text: "GoAbroad has thousands of verified program reviews. What past participants say carries significant weight in how we talk about any program in our content.",
            icon: "reviews",
        },
        {
            label: "Alignment with our values:",
            text: "Programs featured on GoAbroad should reflect the same values we hold: cultural respect, genuine impact, and honest representation of the experience.",
            icon: "alignment",
        },
    ] satisfies CriterionItem[],
    closing:
        "When a commercial relationship does exist between GoAbroad and a provider mentioned in an article, we will always make that clear. Our readers deserve to know the difference between an independent recommendation and a sponsored one.",
};

export const writers = {
    heading: "Real people. Real expertise.",
    lead: "GoAbroad publishes content from practitioners, educators, and experienced travelers who’ve lived the programs, navigated the systems, and come back with something worth saying. Our authors aren’t generalist bloggers casting wide nets; they’re people who can write with authority because they’ve earned it firsthand.",
    contributors: [
        {
            label: "Program alumni:",
            text: "People who’ve done it; they’ve studied abroad, volunteered internationally, completed a gap year, or worked overseas. Their value is lived experience, the honest texture of what it’s actually like on the ground, not what a brochure promises.",
            icon: "alumni",
        },
        {
            label: "International educators & advisors:",
            text: "Study abroad advisors, program coordinators, university staff, and professionals who work inside the international education system. They bring institutional knowledge and can speak to trends, access, and best practices that students don’t yet know to ask about.",
            icon: "educators",
        },
        {
            label: "Travel writers with a focused lens:",
            text: "Writers who specialize in international education, cultural exchange, or purposeful travel, not general tourism. GoAbroad isn’t a destination guide, so our writers understand the difference between visiting a country and learning to live in one.",
            icon: "writers",
        },
        {
            label: "Subject matter experts:",
            text: "Professionals whose expertise intersects with our editorial pillars: career development, language acquisition, mental health abroad, visa and legal guidance, sustainability, and global citizenship education.",
            icon: "experts",
        },
        {
            label: "Our team:",
            text: "The people behind the scenes at GoAbroad have been doing their job for an average of 8 years. They have worked with hundreds of program providers, institutions, and organizations to market their programs and services and supported thousands of travelers looking for a meaningful program abroad. Our expertise has grown organically through every conversation, meeting, and relationship we’ve built for the last nearly 30 years, along with our personal time traveling and exploring the world.",
            icon: "team",
            featured: true,
        },
    ] satisfies ContributorItem[],
};

export const commitment = {
    paragraphs: [
        "We know the decisions you make about studying, working, or volunteering abroad are significant ones, financially, personally, and professionally. We take that responsibility seriously. Every article published on GoAbroad is held to a standard we’d be proud to stand behind, because we know it might be the resource that helps you take the leap.",
        "If you ever find content on GoAbroad that you believe is inaccurate, misleading, or falls short of these principles, we want to hear from you.",
    ],
    /* The closing sentence, split at its own question mark so the contact card
       can lead with the question and answer it underneath. Every word is kept,
       in order: "Questions or feedback about our content? Reach out to us at
       content@goabroad.com." */
    contactQuestion: "Questions or feedback about our content?",
    contactAction: "Reach out to us at",
    contactEmail: "content@goabroad.com",
};

/* Section order drives both the sticky jump strip and the page itself. */
export const sections: GuidelineSection[] = [
    {
        id: "our-purpose",
        title: "Our Purpose",
        navLabel: "Our Purpose",
        kicker: "Why we publish",
    },
    {
        id: "core-editorial-values",
        title: "Our Core Editorial Values",
        navLabel: "Editorial Values",
        kicker: `${coreValues.length} values`,
    },
    {
        id: "what-we-publish",
        title: "What We Publish, and What We Don’t",
        navLabel: "What We Publish",
        kicker: "Our editorial line",
    },
    {
        id: "how-we-select-programs",
        title: "How We Select and Feature Programs",
        navLabel: "Featuring Programs",
        kicker: "Since 1997",
    },
    {
        id: "who-writes-for-goabroad",
        title: "Who Writes for GoAbroad",
        navLabel: "Who Writes for Us",
        kicker: "Our contributors",
    },
    {
        id: "our-commitment",
        title: "Our Commitment to You",
        navLabel: "Our Commitment",
        kicker: "Our promise",
    },
];
