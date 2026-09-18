/* Content for /top-rated-providers-programs, from the "Top Rated Provider and
   Program Page Requirements" doc (front-end requirements and CONTENT section).

   Page copy — headings, paragraphs, CTAs, the directory summaries — is
   transcribed verbatim from the doc. The doc leaves the breakdown items
   (which providers and programs are listed) to the admin, so those are
   DUMMY DATA here: real GoAbroad providers and programs with their live
   photos, logos, ratings, and review counts, arranged into the doc's groups.
   Names in `hero`, `intro.kicker`, and the other kickers are page furniture in
   the /ads-specs house style, not doc copy. */

import { GOABROAD } from "./cdn";
import type {
    CdnPhoto,
    Directory,
    DirectoryId,
    Provider,
    ProviderGroup,
    TopRatedProgram,
    YearLink,
} from "./types";

/** The awards year, used in the directory H1s, badges, and provider heading. */
export const year = 2025;

export const meta = {
    title: "GoAbroad Top Rated Providers & Programs | Best Travel Experiences",
    description:
        "GoAbroad’s Top Rated Providers and Programs based on real participant reviews. Discover the best study abroad, internships, volunteer programs, TEFL & more.",
};

export const pageTitle = "GoAbroad Top Rated Providers & Programs";

/* Page furniture around the H1 — the doc asks for a header photo and a line
   of content at the top, and leaves the wording open. `photos` feed the hero
   mosaic: the first is the tall panel, the other two the squares. Jezi asked
   for no eyebrow above the H1, so the hero has none. */
export const hero: {
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    photos: [CdnPhoto, CdnPhoto, CdnPhoto];
} = {
    lead:
        "Every year we recognize the organizations and programs that real participants rated highest on GoAbroad. Here they all are, in one place.",
    primaryCta: "Explore the Top Rated Programs",
    secondaryCta: "Meet the Top Rated Providers",
    photos: [
        {
            path: "listingphotos/standard/students-santiago-de-compostela1704054007.jpg",
            alt: "Arcos Learning Abroad students on a rooftop tour of the cathedral in Santiago de Compostela",
        },
        {
            path: "listingphotos/standard/seven-students-standing-in-colorful-kimonos-showing-their-papers-received-during-a-temple-visit1778271618.jpg",
            alt: "Seven CEA students in colorful hanbok showing the papers they received during a temple visit",
        },
        {
            path: "listingphotos/standard/a-group-of-teens-jump-on-a-boardwalk-next-to-the-ocean-in-belize1784851469.jpg",
            alt: "A group of teens jump on a boardwalk next to the ocean in Belize",
        },
    ],
};

export const intro = {
    kicker: "How it works",
    heading: "What are the Top Rated Providers and Programs?",
    paragraph:
        "GoAbroad’s Top Rated Providers and Programs are recognized for consistently delivering exceptional experiences to students, volunteers, interns, and travelers worldwide. These accolades are based entirely on participant reviews from the past year, making them a reliable and authentic reflection of quality. Whether you're planning to study abroad, volunteer, intern, or teach overseas, this list highlights the organizations and programs that have left the greatest impact on real participants. Explore with confidence knowing you're choosing from the best in the field!",
    cta: "Check out the Top Provider list!",
};

export const programsSection = {
    kicker: "By program type",
    heading: "Top Rated Programs",
    paragraph:
        "Discover the top-rated travel opportunities based on recent participant reviews. Each program earns a Top Rated Program Badge by collecting the highest number of verified reviews and ratings within the past 12 months. These badges highlight standout programs across categories like Volunteer Abroad, Intern Abroad, Study Abroad, TEFL courses, and more, ensuring you’re exploring the highest-quality experiences available.",
    lead: "Ready to find your next adventure? Explore the Top Rated Programs by category.",
};

export const providersSection = {
    kicker: `The ${year} winners`,
    heading: "Top Rated Providers",
    /* The doc bolds "Top Rated Providers" mid-paragraph, so the paragraph is
       split around it. */
    paragraphBefore:
        "Each year, GoAbroad recognizes the organizations that receive the most outstanding reviews from program participants. These ",
    paragraphBold: "Top Rated Providers",
    paragraphAfter:
        " have consistently delivered high-quality, meaningful travel experiences and earned the trust and praise of the global community. Let their impact speak for itself; explore programs from the best in the field.",
    notableHeading: "Top Rated Notable Mentions",
    notableBadge: "goabroad-top-rated-provider-2025---notable-mention1769477551.png",
};

export const previousYearsSection = {
    kicker: "Archive",
    heading: "Top Rated Providers and Programs from Previous Years",
};

/* Links as listed in the doc, each pointing at the live announcement article
   on goabroad.com. `image` is that article's own og:image cover (captured
   2026-09-11), so the archive cards show the real article art. */
export const previousYears: YearLink[] = [
    {
        label: "Top Rated Providers of 2024",
        href: `${GOABROAD}/articles/top-rated-travel-providers-2024`,
        image: "program_content/IpNiddnQABpVRLb5cqUEpurYFMuDfR9GCx0ZVitG.jpg",
        author: "GoAbroad Writing Team",
        date: "2025-01-15",
    },
    {
        label: "Top Rated Providers of 2023",
        href: `${GOABROAD}/articles/top-rated-travel-providers-2023`,
        image: "program_content/682TfJlSQi6rjdiHlhHdWipjEtVmJ1mj8cgxCrRj.jpg",
        author: "GoAbroad Writing Team",
        date: "2024-01-19",
    },
    {
        label: "Top Rated Organizations & Programs of 2022",
        href: `${GOABROAD}/articles/top-rated-travel-organizations-2022`,
        image: "program_content/gge6GzPLfbcYUBIlziyM9qLYg76RXvHkjel2Zi6K.jpg",
        author: "GoAbroad Writing Team",
        date: "2023-01-17",
    },
    {
        label: "Top Rated Organizations & Programs of 2021",
        href: `${GOABROAD}/articles/top-rated-travel-organizations-2021`,
        image: "program_content/DBJV2zjxr5AHShOUVmaelvgKBYlfDD1WpeJJLtf6.jpg",
        author: "GoAbroad Writing Team",
        date: "2022-01-20",
    },
    {
        label: "Top Rated Organizations & Programs of 2020",
        href: `${GOABROAD}/articles/top-rated-organizations-2020`,
        image: "program_content/top-rated-travel-programs-2020-featured-image-1611036262.jpg",
        author: "GoAbroad Writing Team",
        date: "2021-01-22",
    },
    {
        label: "Top Rated Organizations & Programs of 2019",
        href: `${GOABROAD}/articles/top-rated-2019`,
        image: "program_content/cover-1579505816.png",
        author: "GoAbroad Writing Team",
        date: "2020-01-20",
    },
    {
        label: "Top Rated Organizations & Programs of 2018",
        href: `${GOABROAD}/articles/top-rated-2018-announcement`,
        image: "program_content/cover-1547629226.png",
        author: "GoAbroad Writing Team",
        date: "2019-01-17",
    },
    {
        label: "Top Rated Organizations & Programs of 2017",
        href: `${GOABROAD}/articles/top-rated-organizations-programs-2017`,
        image: "program_content/cover-1516185434.jpg",
        author: "GoAbroad Writing Team",
        date: "2018-01-17",
    },
    {
        label: "Top Rated Organizations & Programs of 2016",
        href: `${GOABROAD}/articles/top-rated-organizations-programs-of-2016`,
        image: "program_content/prime-top-rated-1485335160.png",
        author: "GoAbroad Writing Team",
        date: "2017-01-25",
    },
    {
        label: "Top Rated Organizations & Programs of 2015",
        href: `${GOABROAD}/articles/top-rated-organizations-programs-of-2015`,
        image: "program_content/prime-top-rated-1454575577.jpg",
        author: "GoAbroad Writing Team",
        date: "2016-02-05",
    },
];

export type TextSegment =
    | string
    | {
          text: string;
          href: string;
          /** Button label when the linked phrase alone reads too terse. */
          cta?: string;
      };

export const nextStepsSection: {
    kicker: string;
    heading: string;
    items: TextSegment[][];
} = {
    kicker: "Keep going",
    heading: "Next steps to achieve your travel goals",
    items: [
        [
            "Use ",
            { text: "MyGoAbroad", href: "https://my.goabroad.com" },
            " to find, save, and compare programs (for free!)",
        ],
        [
            "Ask our ",
            { text: "Online Advisor", href: `${GOABROAD}/onlineadvisor` },
            " to match you with programs that fit your interests—you’ll get recommendations instantly!",
        ],
        /* Reviewer's copy (2026-09-18) in place of the doc's "Browse our
           Travel Article Directory or sign up for our Newsletter to stay
           motivated and inspired!", so the newsletter's value is spelled
           out. */
        [
            "Explore our ",
            { text: "Travel Article Directory", href: `${GOABROAD}/articles` },
            ", or get program picks, scholarship deadlines, and real stories in our free ",
            {
                text: "Newsletter",
                href: `${GOABROAD}/newsletter`,
                cta: "Sign up for the free Newsletter",
            },
            ".",
        ],
    ],
};

/* Reviewer's copy (2026-09-18) in place of the doc's "Are you an
   international educator or provider who wants to make it to our top rated
   lists?" / "Contact us to start gathering more reviews now" — the target
   year is next year's list, so it rolls over. */
export const providerCta = {
    heading: `Get your program on the ${year + 1} Top Rated list.`,
    subheading:
        "Participant reviews are what get you there — we’ll help you gather them.",
    linkText: "Get started",
    href: `${GOABROAD}/contact/advertise`,
};

/* ── Directories ─────────────────────────────────────────────────────────── */

/** Meta title/description template for the directory pages. */
export const directoryMeta = {
    title: (d: Directory) =>
        `Top Rated ${d.metaName} Programs | GoAbroad Reviews & Rankings`,
    description: (d: Directory) => {
        // Lower-case the name mid-sentence, but leave acronyms (TEFL) alone.
        const name = d.metaName
            .split(" ")
            .map((w) => (w === w.toUpperCase() ? w : w.toLowerCase()))
            .join(" ");
        return `Explore the top rated ${name} programs on GoAbroad based on real participant reviews. Find high-quality experiences you can trust.`;
    },
};

/* In the doc's card order. `summary` is the directory page copy verbatim;
   `providersHeading` is the H4 of that directory's provider group. */
export const directories: Directory[] = [
    {
        id: "study-abroad",
        cardTitle: "Study Abroad",
        providersHeading: "Top Rated Study Abroad Providers",
        pageTitle: `Top Rated Study Abroad Programs of ${year}`,
        metaName: "Study Abroad",
        summary: [
            "Choosing the right study abroad program can be overwhelming—but GoAbroad’s Top Rated Study Abroad Programs list makes it easier. These programs stood out based on what matters most: real student feedback. Each one earned consistently high ratings from participants over the past year, reflecting excellence in academics, cultural immersion, student support, and overall impact.",
            "To create this list, we reviewed thousands of verified reviews submitted on GoAbroad within the last 12 months. Programs that met our minimum review count and received top scores across multiple criteria were selected as Top Rated. The result? A trusted list of high-quality programs recognized by the students who experienced them.",
            `Start exploring the ${year} Top Rated Study Abroad Programs and find the one that’s right for you.`,
        ],
        icon: "study-abroad",
        photo: {
            path: "listingphotos/standard/students-holding-sign1769121704.jpg",
            alt: "USAC students holding a sign at a soccer match with international students",
        },
        badge: "goabroad-top-rated-provider-2025---study-abroad1769414173.png",
        liveUrl: `${GOABROAD}/study-abroad`,
    },
    {
        id: "intern-abroad",
        cardTitle: "Intern Abroad",
        providersHeading: "Top Rated Internship Providers",
        pageTitle: `Top Rated Internship Programs of ${year}`,
        metaName: "Intern Abroad",
        summary: [
            "Interning abroad can be a life-changing step in your professional journey—and our Top Rated Intern Abroad Programs list helps you find the best opportunities out there. These programs have been recognized for providing meaningful work experience, strong mentorship, and valuable cultural exchange, all backed by outstanding reviews from real interns.",
            "To determine the final list, we analyzed verified reviews submitted to GoAbroad over the past year. Programs that met a minimum number of recent reviews and consistently received high ratings for professional growth, support, and overall experience were awarded Top Rated status.",
            "Ready to build your résumé and explore the world?",
        ],
        icon: "intern-abroad",
        photo: {
            path: "listingphotos/standard/iahq-interns-sitting-on-a-bench-taking-a-group-photo1784160663.jpg",
            alt: "Intern Abroad HQ interns sitting on a bench taking a group photo",
        },
        badge: "goabroad-top-rated-provider-2025---intern-abroad1769414632.png",
        liveUrl: `${GOABROAD}/intern-abroad`,
    },
    {
        id: "volunteer-abroad",
        cardTitle: "Volunteer Abroad",
        providersHeading: "Top Rated Volunteer Abroad Providers",
        pageTitle: `Top Rated Volunteer Abroad Programs of ${year}`,
        metaName: "Volunteer Abroad",
        summary: [
            "Looking to make a difference while experiencing a new culture? Our Top Rated Volunteer Abroad Programs spotlight the most impactful and highly reviewed opportunities across the globe. These programs go above and beyond—offering meaningful service, strong community engagement, and exceptional support for volunteers.",
            "This list is based on verified reviews submitted to GoAbroad over the past year. Programs had to meet a minimum number of recent reviews and receive consistently high ratings in areas like cultural immersion, volunteer impact, and safety to earn a Top Rated badge.",
            "Find a program where your time and heart matter most.",
        ],
        icon: "volunteer-abroad",
        photo: {
            path: "listingphotos/standard/group-photo-of-volunteers-working-on-local-farm-in-hawaii1778595379.jpg",
            alt: "Group photo of GIVE volunteers working on a local farm in Hawaii",
        },
        liveUrl: `${GOABROAD}/volunteer-abroad`,
    },
    {
        id: "tefl-courses",
        cardTitle: "TEFL",
        providersHeading: "Top Rated TEFL Certification Providers",
        pageTitle: `Top Rated TEFL Courses of ${year}`,
        metaName: "TEFL",
        summary: [
            "Planning to teach English abroad or online? Our Top Rated TEFL Courses are backed by real reviews from aspiring and experienced teachers who’ve successfully completed their training and gone on to lead classrooms around the world.",
            `These courses stood out in ${year - 1} for their high-quality instruction, practical preparation, and ongoing support—whether in-person or online. We selected this list based on both the number and quality of participant reviews, so you can find a TEFL course that’s trusted and worth your investment.`,
            "Start your teaching journey with confidence and explore the Top TEFL Courses!",
        ],
        icon: "tefl-courses",
        photo: {
            path: "listingphotos/standard/two-women-tefl-teachers-posing-with-their-children-students1715677365.jpg",
            alt: "Two TEFL teachers posing with their young students",
        },
        badge: "goabroad-top-rated-provider-2025---tefl-courses1769474961.png",
        liveUrl: `${GOABROAD}/tefl-courses`,
    },
    {
        id: "high-school-abroad",
        cardTitle: "High School",
        providersHeading: "Top Rated High School Abroad Providers",
        pageTitle: `Top Rated High School Abroad Programs of ${year}`,
        metaName: "High School Abroad",
        summary: [
            "Thinking of studying abroad before college? Our Top Rated High School Abroad Programs showcase the most trusted and transformative experiences for global learners like you.",
            "These programs earned outstanding feedback from students and families over the past year. We looked at both the number and quality of reviews to create this list—so you can feel confident that each program offers excellent support, engaging academics, and meaningful cultural immersion.",
            "Ready to explore the world while still in high school?",
        ],
        icon: "high-school-abroad",
        photo: {
            path: "listingphotos/standard/students-touring-croke-park1782849165.jpg",
            alt: "CIEE high school students touring Croke Park in Dublin",
        },
        badge: "goabroad-top-rated-provider-2025---high-school-abroad1769476675.png",
        liveUrl: `${GOABROAD}/highschool-study-abroad`,
    },
    {
        id: "teach-abroad",
        cardTitle: "Teach Abroad",
        providersHeading: "Top Rated Teach Abroad Providers",
        pageTitle: `Top Rated Teach Abroad Programs of ${year}`,
        metaName: "Teach Abroad",
        summary: [
            "Teaching abroad is more than a job—it’s a chance to grow professionally while living in a new culture. Our Top Rated Teach Abroad Programs recognize the providers that have truly impressed past participants with their support, training, and overall teaching experience.",
            "These standout programs earned their place through verified reviews on GoAbroad from the past year. To be selected, each program had to meet a minimum number of recent reviews and maintain high ratings in categories like job placement, cultural immersion, and overall support.",
            "Ready to make your classroom global?",
        ],
        icon: "teach-abroad",
        photo: {
            path: "listingphotos/standard/female-tefl-teacher-leading-a-classroom-of-young-students-seated-on-the-floor-using-hand-gestures-during-a-lesson1777455166.jpg",
            alt: "A TEFL teacher leading a classroom of young students seated on the floor",
        },
        badge: "goabroad-top-rated-provider-2025---teach-abroad1769476218.png",
        liveUrl: `${GOABROAD}/teach-abroad`,
    },
    {
        id: "gap-year",
        cardTitle: "Gap Year",
        providersHeading: "Top Rated Gap Year Providers",
        pageTitle: `Top Rated Gap Year Programs of ${year}`,
        metaName: "Gap Year",
        summary: [
            "Taking time for a gap year can change the way you see the world—and yourself. Our Top Rated Gap Year Programs highlight the most impactful, trusted, and well-reviewed opportunities for travel, learning, and personal growth.",
            "These programs were selected based on real reviews from GoAbroad users over the past year. Each one met our criteria for review quantity and quality, earning high marks for meaningful experiences, support, and overall satisfaction.",
            "Start your adventure with confidence.",
        ],
        icon: "gap-year",
        photo: {
            path: "listingphotos/standard/a-hiking-group-poses-for-a-photo1751035701.jpg",
            alt: "A Gapforce hiking group poses for a photo in South America",
        },
        badge: "goabroad-top-rated-provider-2025---gap-year1769475925.png",
        liveUrl: `${GOABROAD}/gap-year`,
    },
    {
        id: "language-schools",
        cardTitle: "Language Programs",
        providersHeading: "Top Rated Language Schools",
        pageTitle: `Top Rated Language Programs of ${year}`,
        metaName: "Language",
        summary: [
            "Whether you’re aiming for fluency, brushing up for travel, or learning a new language for fun, our Top Rated Language Schools help you achieve your goals through immersive and engaging programs.",
            "These standout schools were chosen based on exceptional participant reviews from the past year—highlighting quality instruction, supportive teachers, cultural immersion, and real progress. From intensive courses to casual classes in amazing destinations, these schools earned top marks from language learners just like you.",
        ],
        icon: "language-schools",
        photo: {
            path: "listingphotos/standard/intensive-group-chinese-class1726680149.jpg",
            alt: "An intensive group Chinese class at That's Mandarin",
        },
        badge: "goabroad-top-rated-provider-2025---language-schools1769475414.png",
        liveUrl: `${GOABROAD}/language-study-abroad`,
    },
    {
        id: "degree-abroad",
        cardTitle: "Degree Abroad",
        /* No dated badge on the CDN for this category; the design team's
           year-less "DEGREES ABROAD" artwork ships with the prototype. */
        badgeVariant: "degree-abroad",
        providersHeading: "Top Rated Degree Abroad Providers",
        pageTitle: `Top Rated Degree Abroad Programs of ${year}`,
        metaName: "Degree Abroad",
        summary: [
            "Earning your degree abroad is more than just academics—it's a transformative experience that expands your worldview, builds independence, and prepares you for global careers. Our Top Rated Degree Abroad Programs highlight universities and institutions that have truly made a lasting impression on international students.",
            "Each program on this list received outstanding reviews from participants over the last 12 months. From strong academic support and cultural immersion to life-changing experiences on and off campus, these degree programs stood out for their quality and impact.",
        ],
        icon: "degree-abroad",
        photo: {
            path: "listingphotos/standard/unyp1757987055.jpg",
            alt: "Students at the University of New York in Prague",
        },
        liveUrl: `${GOABROAD}/degree-abroad`,
    },
    {
        id: "adventure-travel",
        cardTitle: "Adventure Travel",
        providersHeading: "Top Rated Adventure Travel Providers",
        pageTitle: `Top Rated Adventure Travel Programs of ${year}`,
        metaName: "Adventure Travel",
        summary: [
            "If you're craving experiences that go beyond the ordinary, our Top Rated Adventure Travel Programs are where the thrill begins. These programs combine travel with adrenaline, connection, and unforgettable memories—whether you're trekking through jungles, diving into coral reefs, or exploring ancient trails.",
            "Each program on this list earned its spot through consistently high ratings and glowing reviews from real participants over the past year. They highlight not just excitement, but also meaningful moments, cultural exchange, and expert guidance every step of the way.",
        ],
        icon: "adventure-travel",
        photo: {
            path: "listingphotos/standard/two-friends-walk-on-a-boardwalk-under-palm-trees-in-belize1784851467.jpg",
            alt: "Two friends walk on a boardwalk under palm trees in Belize",
        },
        badge: "goabroad-top-rated-provider-2025---adventure-travel1769476955.png",
        liveUrl: `${GOABROAD}/adventure-travel-abroad`,
    },
    {
        id: "jobs-abroad",
        cardTitle: "Jobs Abroad",
        providersHeading: null,
        pageTitle: `Top Rated Work Abroad Programs of ${year}`,
        metaName: "Jobs Abroad",
        summary: [
            `Finding work overseas is one of the most rewarding ways to experience a new culture, gain global career skills, and grow personally and professionally. Our Top Rated Jobs Abroad Programs of ${year} showcase organizations that go above and beyond in supporting job seekers around the world.`,
            "These programs earned consistently stellar reviews from participants over the past year—praised for meaningful job placements, excellent support systems, cultural integration, and life-changing adventures. Whether you're looking to teach, work in hospitality, or gain professional experience in a new country, these programs have helped travelers like you turn their career dreams into reality.",
        ],
        icon: "jobs-abroad",
        photo: {
            path: "listingphotos/standard/rvf-international-south-korea1778656672.jpg",
            alt: "RVF International teachers in South Korea",
        },
        liveUrl: "https://www.jobsabroad.com",
    },
];

export function getDirectory(id: string) {
    return directories.find((d) => d.id === id);
}

/* ── Providers (dummy data) ──────────────────────────────────────────────── */

/* Real GoAbroad providers, keyed by alias, with their live logo, first
   media-gallery photo, average rating, and review count at capture time. */
export const providers: Record<string, Provider> = {
    "arcos-learning-abroad": {
        alias: "arcos-learning-abroad",
        name: "Arcos Learning Abroad",
        rating: 4.77,
        reviews: 677,
        description:
            "Arcos Learning Abroad is a global education community focused on providing study abroad programs to participants from throughout the world.",
        logo: "arcos-la-01-1600657378.png",
        photo: {
            path: "listingphotos/standard/students-santiago-de-compostela1704054009.jpg",
            alt: "Group dinner with Arcos students in Santiago de Compostela",
        },
    },
    "university-studies-abroad-consortium": {
        alias: "university-studies-abroad-consortium",
        name: "University Studies Abroad Consortium",
        rating: 4.38,
        reviews: 1693,
        description:
            "The University Studies Abroad Consortium (USAC) provides university students with affordable, valuable study abroad programs, and contributes to the internationalization of universities in the United States and abroad.",
        logo: "AeMvAwNjFiSS9IMB5t2ZKNvuwh28C2GVzuzltcgb.png",
        photo: {
            path: "listingphotos/standard/students-holding-sign1769121704.jpg",
            alt: "USAC students holding a sign at a soccer match",
        },
    },
    "therapy-abroad-lnc": {
        alias: "therapy-abroad-lnc",
        name: "Therapy Abroad Inc.",
        rating: 4.68,
        reviews: 279,
        description:
            "Therapy Abroad is unique! No other program offers group travel and faculty-led programs with structured, professional experiences designed exclusively for those interested in speech-language pathology, audiology, physical therapy,…",
        logo: "0VCMwP5Pr6edNBGMCpG3ZASMPjt7drTyAyOqU1cy.png",
        photo: {
            path: "listingphotos/standard/81752658033.jpg",
            alt: "Therapy Abroad participants on site",
        },
    },
    "intern-abroad-hq-1": {
        alias: "intern-abroad-hq-1",
        name: "Intern Abroad HQ",
        rating: 4.7,
        reviews: 1192,
        description:
            "Whether you're a student, recent graduate, or young professional, our international internships are designed to help you stand out and land your dream job.",
        logo: "5sz4mirJRxPumUQESB1GqVffXrehOS0fcnZs5z7U.png",
        photo: {
            path: "listingphotos/standard/iahq-interns-sitting-on-a-bench-taking-a-group-photo1784160663.jpg",
            alt: "Intern Abroad HQ interns sitting on a bench taking a group photo",
        },
    },
    "go-abroad-china": {
        alias: "go-abroad-china",
        name: "Go Abroad China Ltd.",
        rating: 4.7,
        reviews: 569,
        description:
            "Launch your global career with Go Abroad China's 22 years of expertise. We've placed 4,000+ students from 50+ countries in internship placements and Mandarin programs across Asia.",
        logo: "WtuBJgUnigfCiEeJouYYRrRnJ1dqaRh9FmcJxjMA.png",
        photo: {
            path: "listingphotos/standard/participants-in-activity1787746372.jpg",
            alt: "Go Abroad China participants in a group activity",
        },
    },
    "international-medical-aid": {
        alias: "international-medical-aid",
        name: "International Medical Aid (IMA)",
        rating: 4.97,
        reviews: 411,
        description:
            "International Medical Aid (IMA) is a distinguished nonprofit organization standing at the forefront of global healthcare study-abroad endeavors.",
        logo: "inter2-1457107573.png",
        photo: {
            path: "listingphotos/standard/international-medical-aid-ima1763716138.jpg",
            alt: "International Medical Aid interns",
        },
    },
    "maximo-nivel": {
        alias: "maximo-nivel",
        name: "MAXIMO NIVEL",
        rating: 4.69,
        reviews: 3238,
        description:
            "Maximo Nivel is a leading educational travel and study abroad organization. We offer a range of programs in Costa Rica, Guatemala, and Peru, including Volunteer Abroad, International Internships, Native Spanish Program, TEFL Certification,…",
        logo: "logo-goabroad-final-1535591337.png",
        photo: {
            path: "listingphotos/standard/maximo-nivel-internship-in-latin-america1787915949.jpg",
            alt: "Maximo Nivel participants in Latin America",
        },
    },
    "international-volunteer-hq": {
        alias: "international-volunteer-hq",
        name: "International Volunteer HQ (IVHQ)",
        rating: 4.7,
        reviews: 2203,
        description:
            "International Volunteer HQ welcomes people from all backgrounds who want to make a meaningful difference while enjoying the adventure of a lifetime.",
        logo: "b7aQwxqKkTQs1TCbQKDnmQAVGPjGCilE6Nj4ktx5.jpg",
        photo: {
            path: "listingphotos/standard/a-person-in-a-vehicle-watches-elephants-on-a-savanna1776827218.jpg",
            alt: "A volunteer in a vehicle watches elephants on a savanna",
        },
    },
    goeco: {
        alias: "goeco",
        name: "GoEco",
        rating: 4.8,
        reviews: 920,
        description:
            "GoEco is one of the world's top volunteer organizations, with award-winning programs that are carefully chosen by the company's founding sustainable travel experts.",
        logo: "volunteer-abroad-logo-goeco-1628821098.png",
        photo: {
            path: "listingphotos/standard/south-africa-sardine-run-ocean-expedition1784705377.jpg",
            alt: "GoEco's Sardine Run ocean expedition in South Africa",
        },
    },
    "international-tefl-academy": {
        alias: "international-tefl-academy",
        name: "International TEFL Academy",
        rating: 4.68,
        reviews: 3833,
        description:
            "International TEFL Academy (ITA), established in 2010, is the world's leading provider of TEFL certification training for English teaching abroad and online.",
        logo: "download-1512589034.png",
        photo: {
            path: "listingphotos/standard/teaching-english-in-myanmar1727375539.jpg",
            alt: "An International TEFL Academy graduate teaching English in Myanmar",
        },
    },
    "the-tefl-academy": {
        alias: "the-tefl-academy",
        name: "The TEFL Academy",
        rating: 4.57,
        reviews: 2045,
        description:
            "The TEFL Academy is one of the major organizations offering teaching English as a foreign language courses online and in classrooms all around the world.",
        logo: "rsz-tta-new-logo-1600257009.png",
        photo: {
            path: "listingphotos/standard/limerick8-9june2019-1564049611.jpg",
            alt: "The TEFL Academy course completers in Limerick, Ireland",
        },
    },
    "tefl-org": {
        alias: "tefl-org",
        name: "The TEFL Org",
        rating: 4.59,
        reviews: 447,
        description:
            "Gain your internationally recognized TEFL qualification with The TEFL Org, the world’s most accredited TEFL course provider.",
        logo: "FczsRFaHv6WrlcO7sAt01nmS8g64ThwLiEqnj4Za.png",
        photo: {
            path: "listingphotos/standard/man-smiles-and-waves-to-the-camera-while-taking-selfie-with-a-classroom-of-students-behind-him1777461954.jpg",
            alt: "A TEFL teacher takes a selfie with a classroom of students behind him",
        },
    },
    "thats-mandarin": {
        alias: "thats-mandarin",
        name: "That's Mandarin",
        rating: 4.95,
        reviews: 953,
        description:
            "Established in 2005, That’s Mandarin has been committed to providing exceptional Chinese language education for 20 years, serving a diverse community of over 200,000 students from all over the world.",
        logo: "ebymADHM72Y8pszdqK4NtpefsEwrzzHXLT2crwbe.png",
        photo: {
            path: "listingphotos/standard/chinese-summer-camp1727050682.jpg",
            alt: "That's Mandarin Chinese summer camp",
        },
    },
    "live-the-language-school": {
        alias: "live-the-language-school",
        name: "LTL Language School",
        rating: 4.75,
        reviews: 685,
        description:
            "LTL Language School believes that language study should not be limited to the classroom. For us, learning Mandarin, Japanese, Korean, or any other language means fully immersing ourselves in the country and the culture from day one.",
        logo: "JAScUUcULVN66sTeXdzkrCH2lcRxwheyqghwc0YU.png",
        photo: {
            path: "listingphotos/standard/ltl-shanghai-students1785301770.jpg",
            alt: "LTL Language School students in Shanghai",
        },
    },
    "meiji-academy": {
        alias: "meiji-academy",
        name: "Meiji Academy",
        rating: 4.86,
        reviews: 494,
        description:
            "Meiji Academy, established in 2014, is a Japanese language school that opened its doors to international students interested in learning the Japanese language.",
        logo: "dypFvEKMiw1npI7YKQyHX557OZAqHfLGejj01qOc.png",
        photo: {
            path: "listingphotos/standard/cooking-workshop1750402975.jpg",
            alt: "A hands-on sushi-making workshop at Meiji Academy",
        },
    },
    "volunteer-adventure-corps": {
        alias: "volunteer-adventure-corps",
        name: "VACorps",
        rating: 4.8,
        reviews: 650,
        description:
            "VAC offers superior internship placements in Cape Town, South Africa. We commit all of our energy to one purpose – helping our program participants to have a professionally and personally rewarding internship experience in Cape Town.",
        logo: "ZJUKR1DjtTJ0y3hb3WyV32z9rn5e029SY1GV9nlq.png",
        photo: {
            path: "listingphotos/standard/gap-year1785708827.jpg",
            alt: "VACorps gap year participants in Cape Town",
        },
    },
    quest: {
        alias: "quest",
        name: "Quest",
        rating: 4.56,
        reviews: 25,
        description:
            "QUEST is a human development program disguised as an African adventure. Our approach is simple and demanding: take young adults out of the classroom and into the real world, where they are tested by challenge, shaped by community, and…",
        logo: "CjaJJmuq7CKsyU4RwHHwDtZbSjaKYHBinBLOQ1Bl.png",
        photo: {
            path: "listingphotos/standard/a-group-of-hikers-with-colorful-backpacks-huddle-together-appearing-focused-and-engaged-in-conversation-against-a-cloudy-mountain-backdrop1758906928.png",
            alt: "A group of hikers with colorful backpacks huddle together against a cloudy mountain backdrop",
        },
    },
    "pacific-discovery": {
        alias: "pacific-discovery",
        name: "Pacific Discovery",
        rating: 4.51,
        reviews: 295,
        description:
            "Join us on an overland journey of discovery, and get immersed in a facilitated learning environment that is designed to maximize the educational and life-skills potential for our participants.",
        logo: "logo-for-go-abroad-1538952256.jpg",
        photo: {
            path: "listingphotos/standard/tokyo1760570596.jpg",
            alt: "Pacific Discovery participants exploring Tokyo",
        },
    },
    "the-language-house-tefl": {
        alias: "the-language-house-tefl",
        name: "The Language House TEFL",
        rating: 4.86,
        reviews: 370,
        description:
            "The Language House TEFL in Prague is the most popular TEFL certification course in the Czech Republic, one of the largest in Europe, and one of the most highly-reviewed TEFL organizations in the world.",
        logo: "Rb8tY3OLL5zcbCFj1r8vJczBoxoikw1idtmFrt3Q.png",
        photo: {
            path: "listingphotos/standard/the-language-house-tefl1778552142.png",
            alt: "The Language House TEFL trainees in Prague",
        },
    },
    "rvf-international": {
        alias: "rvf-international",
        name: "RVF International",
        rating: 4.46,
        reviews: 56,
        description:
            "RVF International was founded in 2015 by Harrison Fowler after his own experience teaching English in Spain.",
        logo: "y1pi6hLx8hUXLtfDCXnrMNEAWhtAah2sIUvO8yVy.png",
        photo: {
            path: "listingphotos/standard/rvf-international-south-korea1778656672.jpg",
            alt: "RVF International teachers in South Korea",
        },
    },
    xploreasia: {
        alias: "xploreasia",
        name: "Teach Explore Asia (XploreAsia)",
        rating: 4.53,
        reviews: 612,
        description:
            "XploreAsia is a cross-cultural adventure organization that enables participants to enjoy the life-changing experience of living and working abroad and giving back to local communities through cultural exchange and volunteerism.",
        logo: "logo_41601_526bce4b7147f1382796875.jpg",
        photo: {
            path: "listingphotos/standard/matt-and-elyssa-team-teaching-at-a-local-school-in-hua-hin-96100.jpg",
            alt: "Two XploreAsia teachers team-teaching at a local school in Hua Hin",
        },
    },
    "arcos-journeys-abroad": {
        alias: "arcos-journeys-abroad",
        name: "Arcos Journeys Abroad",
        rating: 4.8,
        reviews: 414,
        description:
            "Arcos Journeys Abroad, a division of Arcos Learning Abroad, is committed to serving and working with students under 18 years old.",
        logo: "arcos-ja-01-1632115523.jpg",
        photo: {
            path: "listingphotos/standard/arcos-journeys-abroad1784773108.jpg",
            alt: "Arcos Journeys Abroad high school students",
        },
    },
    "ciee-high-school-abroad": {
        alias: "ciee-high-school-abroad",
        name: "CIEE High School Abroad",
        rating: 4.29,
        reviews: 112,
        description:
            "With CIEE Global Navigator High School programs, the possibilities are endless. As a U.S. high school student, you can study abroad from as little as three weeks in the summer to an entire semester or academic year.",
        logo: "ibzGBHzpszqupyLzDpjMmUasXGPW4MgA3Atyf7pc.png",
        photo: {
            path: "listingphotos/standard/students-touring-croke-park1782849165.jpg",
            alt: "CIEE students touring Croke Park in Dublin",
        },
    },
    "global-leadership-adventures": {
        alias: "global-leadership-adventures",
        name: "Global Leadership Adventures",
        rating: 4.82,
        reviews: 261,
        description:
            "Global Leadership Adventures (GLA) offers life-changing international volunteer and internship programs for high school students in countries worldwide.",
        logo: "1290608881_glalogo.jpg",
        photo: {
            path: "listingphotos/standard/gla-cr1760895297.jpg",
            alt: "Global Leadership Adventures teens in Costa Rica",
        },
    },
    "john-cabot-university": {
        alias: "john-cabot-university",
        name: "John Cabot University",
        rating: 4.24,
        reviews: 579,
        description:
            "John Cabot University is a prestigious American-style liberal arts institution situated in Rome, Italy.",
        logo: "kJpW9vPaQ0C6kSKYJIQKHyDbJcWp2svSwoLqQnEg.jpg",
        photo: {
            path: "a/LF/9TF3vi6R10Mfza7e4CSJ3oE89ot9HFzNma0vELVf.jpg",
            alt: "John Cabot University students in Rome",
        },
    },
    "tel-aviv-university": {
        alias: "tel-aviv-university",
        name: "Tel Aviv University",
        rating: 4.22,
        reviews: 45,
        description:
            "Tel Aviv University (TAU), Israel's most comprehensive institution of higher learning, has over 30,000 students and 1,200 researchers in nine faculties, and over 125 schools and departments across sciences, humanities, and the arts.",
        logo: "4uuSFqTreA4UdanTWsjsSoQxFyRYrO8w6HbEVTWo.png",
        photo: {
            path: "listingphotos/standard/students-on-a-trip-to-haifa1672218791.jpg",
            alt: "Tel Aviv University international students on a trip to Haifa",
        },
    },
    "university-of-new-york-in-prague": {
        alias: "university-of-new-york-in-prague",
        name: "University of New York in Prague",
        rating: 4.36,
        reviews: 25,
        description:
            "UNYP: A Unique International University Founded in 1998, the University of New York in Prague (UNYP) is one of the largest English-language higher education institutions in the Czech Republic.",
        logo: "VBtYe4RHMk630aRynkZ9iPQ9f8zCozsqSqFXlvgV.png",
        photo: {
            path: "listingphotos/standard/unyp1757987055.jpg",
            alt: "Students at the University of New York in Prague",
        },
    },
    "travel-for-teens": {
        alias: "travel-for-teens",
        name: "Travel For Teens",
        rating: 4.78,
        reviews: 370,
        description:
            "Travel For Teens is a program provider that believes that teen travel should be both enriching and fun. TFT offers a full range of travel experiences that teens can choose from to create their own ideal international experience.",
        logo: "icon-1572552669.png",
        photo: {
            path: "listingphotos/standard/travel-for-teens1764229128.jpg",
            alt: "Travel For Teens travelers on a summer trip",
        },
    },
    "warriors-academy": {
        alias: "warriors-academy",
        name: "Warriors Academy",
        rating: 4.46,
        reviews: 99,
        description:
            "The Warriors Academy, founded in 2004 by Rudi and Rene Viljoen, is located in South Africa's picturesque Magoebaskloof mountains.",
    },
    "rustic-pathways": {
        alias: "rustic-pathways",
        name: "Rustic Pathways",
        rating: 4.7,
        reviews: 202,
        description:
            "Rustic Pathways is an educational travel company founded in 1983. It runs cultural immersion, service-learning, and adventure programs in 38 countries for students ages 14 to 18 and has served 155,829 students from 53 countries.",
        logo: "U9gJmHVlKQIURr36OxVRuCrb98gCeDnXb2Qo175W.png",
        photo: {
            path: "listingphotos/standard/two-friends-walk-on-a-boardwalk-under-palm-trees-in-belize1784851467.jpg",
            alt: "Two friends walk on a boardwalk under palm trees in Belize",
        },
    },

    /* Notable mentions */
    "loop-abroad-llc": {
        alias: "loop-abroad-llc",
        name: "Loop Abroad",
        rating: 4.91,
        reviews: 1037,
        description:
            "Started in 2009 with nine students and one elephant in Chiang Mai, Thailand, Loop Abroad now welcomes hundreds of students over dozens of programs with an uncompromising focus on supporting animals in need and partnering only with ethical,…",
        logo: "loop-abroad-logo-1602049892.png",
    },
    "sit-study-abroad": {
        alias: "sit-study-abroad",
        name: "SIT Study Abroad",
        rating: 4.51,
        reviews: 439,
        description:
            "SIT Study Abroad offers semester and summer undergraduate programs in Africa, Europe, Latin America, Asia and the Pacific, and the Middle East.",
        logo: "JwjQjZvnaOouhFwN7ycjBabcbVfpCmJrpc7dEZBU.png",
        photo: {
            path: "listingphotos/standard/colorful-building-and-cherry-blossoms-in-taiwan1787752426.jpg",
            alt: "Colorful building and cherry blossoms in Taiwan",
        },
    },
    cisabroad: {
        alias: "cisabroad",
        name: "CIS Abroad",
        rating: 4.22,
        reviews: 1576,
        description:
            "CIS Abroad is a company dedicated to creating a more connected and compassionate world through international experiences.",
        logo: "logo0521201213376206715041117.jpg",
        photo: {
            path: "listingphotos/standard/japanese-traditional-tea-ceremony1759484273.jpg",
            alt: "Japanese traditional tea ceremony",
        },
    },
    "wild-at-tuli-safaris-botswana": {
        alias: "wild-at-tuli-safaris-botswana",
        name: "Wild at Tuli Safaris",
        rating: 5,
        reviews: 59,
        description:
            "Wild At Tuli Safaris is based in the Tuli Block in south eastern Botswana. Run by Helena Fitchat and Judi Gounaris, two women with a great sense of adventure and an undying passion for the African wilderness, you have the opportunity to…",
    },
    "growth-international-volunteer-excursions": {
        alias: "growth-international-volunteer-excursions",
        name: "GIVE Volunteers",
        rating: 4.93,
        reviews: 158,
        description:
            "GIVE is a grassroots, Seattle-based organization that offers responsible travel and volunteer programs that transform the lives of its participants, igniting new passions and inspiring incredible personal growth.",
        logo: "logo_41705_526977df099e51382643679.jpg",
        photo: {
            path: "listingphotos/standard/group-photo-of-volunteers-working-on-local-farm-in-hawaii1778595379.jpg",
            alt: "Group photo of GIVE volunteers working on a local farm in Hawaii",
        },
    },
    "asia-internship-programme": {
        alias: "asia-internship-programme",
        name: "Asia Internship Program",
        rating: 4.72,
        reviews: 717,
        description:
            "Founded in 2011, Asia Internship Program (AIP) facilitates customized international internships designed to help individuals develop practical professional experience.",
        logo: "goabroadavatar-1611563426.jpg",
        photo: {
            path: "listingphotos/standard/south-africa1776829914.jpg",
            alt: "Asia Internship Program interns in South Africa",
        },
    },
    "learning-beyond-academy": {
        alias: "learning-beyond-academy",
        name: "Beyond Academy",
        rating: 4.52,
        reviews: 245,
        description:
            "Beyond Academy is one of the world’s top-rated providers of international internships.",
        logo: "beyond-academy-1582179967.png",
        photo: {
            path: "listingphotos/standard/beyond-academy1761200547.jpg",
            alt: "Beyond Academy interns",
        },
    },
    cercaabroad: {
        alias: "cercaabroad",
        name: "Cerca Abroad",
        rating: 4.99,
        reviews: 129,
        description:
            "Cerca Abroad offers transformative study and internship programs for students who want to gain professional experience while exploring the world.",
        logo: "bSW81lM0YrAbtgUj4NRHNivt1ebdhU4vCOqSofAX.jpg",
        photo: {
            path: "listingphotos/standard/tourism-hospitality-hotel-admin-culinary-internships1767960677.jpg",
            alt: "Tourism and hospitality interns with Cerca Abroad",
        },
    },
    "premier-tefl": {
        alias: "premier-tefl",
        name: "Premier TEFL",
        rating: 4.63,
        reviews: 1992,
        description:
            "With more than 30 years of combined experience in the English teaching and TEFL space, Premier TEFL offers fully accredited options for TEFL (Teaching English as a Foreign Language) certification, IELTS (International English Language…",
        logo: "3XrE0GDTBB6VpLT0Jvb5KqYDMt9QYaWrYaGUKTzh.png",
        photo: {
            path: "listingphotos/standard/south-korea-view1788363537.jpg",
            alt: "A view in South Korea, where Premier TEFL places teachers",
        },
    },
    "the-tefl-institute": {
        alias: "the-tefl-institute",
        name: "The TEFL Institute",
        rating: 4.87,
        reviews: 645,
        description:
            "Ready to launch a career that lets you work from anywhere, make a global impact, and level up your résumé?",
        logo: "aL5O2BvJaMj4RGqD2GGlWmTmsinhTSCMbrJDOg8X.png",
        photo: {
            path: "listingphotos/standard/tefl-teacher-visiting-gyeongbokgung-palace-in-seoul-during-a-weekend-trip-in-south-korea1780655053.jpg",
            alt: "TEFL teacher visiting Gyeongbokgung Palace in Seoul on a weekend trip",
        },
    },
};

/* The doc's H4 groups, in its order, three ranked providers each. */
export const providerGroups: ProviderGroup[] = [
    {
        directoryId: "study-abroad",
        providers: [
            "arcos-learning-abroad",
            "university-studies-abroad-consortium",
            "therapy-abroad-lnc",
        ],
    },
    {
        directoryId: "intern-abroad",
        providers: ["intern-abroad-hq-1", "go-abroad-china", "international-medical-aid"],
    },
    {
        directoryId: "volunteer-abroad",
        providers: ["maximo-nivel", "international-volunteer-hq", "goeco"],
    },
    {
        directoryId: "tefl-courses",
        providers: ["international-tefl-academy", "the-tefl-academy", "tefl-org"],
    },
    {
        directoryId: "language-schools",
        providers: ["thats-mandarin", "live-the-language-school", "meiji-academy"],
    },
    {
        directoryId: "gap-year",
        providers: ["volunteer-adventure-corps", "quest", "pacific-discovery"],
    },
    {
        directoryId: "teach-abroad",
        providers: ["the-language-house-tefl", "rvf-international", "xploreasia"],
    },
    {
        directoryId: "high-school-abroad",
        providers: [
            "arcos-journeys-abroad",
            "ciee-high-school-abroad",
            "global-leadership-adventures",
        ],
    },
    {
        directoryId: "degree-abroad",
        providers: [
            "john-cabot-university",
            "tel-aviv-university",
            "university-of-new-york-in-prague",
        ],
    },
    {
        directoryId: "adventure-travel",
        providers: ["travel-for-teens", "warriors-academy", "rustic-pathways"],
    },
];

/* The doc lists ten notable mentions; GoAbroad named sixteen in 2025, so this
   keeps the first ten of them. */
export const notableMentions: string[] = [
    "loop-abroad-llc",
    "sit-study-abroad",
    "cisabroad",
    "wild-at-tuli-safaris-botswana",
    "growth-international-volunteer-excursions",
    "asia-internship-programme",
    "learning-beyond-academy",
    "cercaabroad",
    "premier-tefl",
    "the-tefl-institute",
];

/* ── Top Rated Programs per directory (dummy data) ───────────────────────── */

const LF = (file: string) => `a/LF/${file}`;
const gallery = (file: string) => `listingphotos/standard/${file}`;

export const topRatedPrograms: Record<DirectoryId, TopRatedProgram[]> = {
    "study-abroad": [
        {
            id: 364,
            title: "USAC Spain: Alicante - European & Mediterranean Studies",
            slug: "spain-alicante-european-studies",
            providerAlias: "university-studies-abroad-consortium",
            providerName: "University Studies Abroad Consortium",
            providerLogo: "AeMvAwNjFiSS9IMB5t2ZKNvuwh28C2GVzuzltcgb.png",
            rating: 4.52,
            reviews: 103,
            destination: "Alicante, Spain",
            photo: {
                path: gallery("woman-sitting-on-stairs-with-plant-decorated-house1715850884.jpg"),
                alt: "A student sitting on the stairs of a plant-decorated house in Alicante",
            },
        },
        {
            id: 185357,
            title: "Arcos Learning Abroad in Heredia, Costa Rica",
            slug: "arcos-learning-abroad-in-heredia-costa-rica",
            providerAlias: "arcos-learning-abroad",
            providerName: "Arcos Learning Abroad",
            providerLogo: "arcos-la-01-1600657378.png",
            rating: 4.78,
            reviews: 249,
            destination: "Heredia, Costa Rica",
            photo: {
                path: gallery("arenal-volcano-costa-rica-1598267288.jpg"),
                alt: "Excursion to Arenal Volcano, Costa Rica",
            },
        },
        {
            id: 197753,
            title: "Study Abroad in Gold Coast, Australia with WorldStrides",
            slug: "gold-coast-bond-university",
            providerAlias: "worldstrides",
            providerName: "WorldStrides",
            providerLogo: "MBlUGlFaccWWlZXptGDBPPL5KUSR8eKRGDus1SNk.png",
            rating: 4.83,
            reviews: 125,
            destination: "Gold Coast, Australia",
            photo: {
                path: gallery("surfing-the-gold-coast1785599387.jpg"),
                alt: "Students surfing on the Gold Coast",
            },
        },
        {
            id: 189318,
            title: "Meiji Academy - Summer Course in Hokkaido",
            slug: "summer-in-hokkaido",
            providerAlias: "meiji-academy",
            providerName: "Meiji Academy",
            providerLogo: "dypFvEKMiw1npI7YKQyHX557OZAqHfLGejj01qOc.png",
            rating: 4.86,
            reviews: 105,
            destination: "Hokkaido, Japan",
            photo: {
                path: gallery("meiji-students-at-the-beach1750302821.jpg"),
                alt: "Meiji Academy students at the beach in Hokkaido",
            },
        },
        {
            id: 25737,
            title: "SIT Study Abroad: Argentina: Social Mvmts. & Human Rights",
            slug: "argentina-social-movements-and-human-rights",
            providerAlias: "sit-study-abroad",
            providerName: "SIT Study Abroad",
            providerLogo: "JwjQjZvnaOouhFwN7ycjBabcbVfpCmJrpc7dEZBU.png",
            rating: 4.73,
            reviews: 45,
            destination: "Buenos Aires, Argentina",
            photo: {
                path: gallery("madres-de-plaza-de-mayo1782758216.jpg"),
                alt: "Madres de Plaza de Mayo in Buenos Aires",
            },
        },
        {
            id: 82039,
            title: "CEA CAPA Education Abroad in London, England",
            slug: "study-abroad-london-england",
            providerAlias: "cea-capa-education-abroad",
            providerName: "CEA CAPA Education Abroad",
            providerLogo: "CuzbjcevxeHR1lmiqjFQhKuODNdO5qz13kHRaQZA.jpg",
            rating: 4.52,
            reviews: 161,
            destination: "London, England",
            photo: {
                path: gallery("061419724069372bd52159bf642278f384dea93f.jpg"),
                alt: "CEA CAPA students in London",
            },
        },
    ],
    "intern-abroad": [
        {
            id: 138576,
            title: "Global Health & Pre-Medicine Internships Abroad | IMA",
            slug: "pre-med-health-fellowships-developed-at-johns-hopkins",
            providerAlias: "international-medical-aid",
            providerName: "International Medical Aid (IMA)",
            providerLogo: "inter2-1457107573.png",
            rating: 4.96,
            reviews: 168,
            destination: "Kenya, Tanzania & Peru",
            photo: {
                path: gallery("international-medical-aid-ima1763715194.jpg"),
                alt: "International Medical Aid interns on a hospital placement",
            },
        },
        {
            id: 163502,
            title: "Affordable Internships in Spain | Intern Abroad HQ",
            slug: "most-affordable-internships-in-spain",
            providerAlias: "intern-abroad-hq-1",
            providerName: "Intern Abroad HQ",
            providerLogo: "5sz4mirJRxPumUQESB1GqVffXrehOS0fcnZs5z7U.png",
            rating: 4.6,
            reviews: 169,
            destination: "Valencia, Spain",
            photo: {
                path: gallery("1754354555.jpg"),
                alt: "Intern Abroad HQ interns in Spain",
            },
        },
        {
            id: 104327,
            title: "Intern in London with Absolute Internship",
            slug: "intern-in-london",
            providerAlias: "absolute-internship",
            providerName: "Absolute Internship",
            providerLogo: "PK9GqBUeAhkM0YHPNa87wJZfmrBWpMhw3JPgnMJb.png",
            rating: 4.83,
            reviews: 71,
            destination: "London, England",
            photo: {
                path: gallery("dsc-8672-edit-1505818428.jpg"),
                alt: "The London Eye, Absolute Internship London program",
            },
        },
        {
            id: 105016,
            title: "GAC Career & Business Immersion Program in China",
            slug: "paid-internships-fortune-500-companies-china",
            providerAlias: "go-abroad-china",
            providerName: "Go Abroad China Ltd.",
            providerLogo: "WtuBJgUnigfCiEeJouYYRrRnJ1dqaRh9FmcJxjMA.png",
            rating: 4.73,
            reviews: 174,
            destination: "Shanghai & Beijing, China",
            photo: {
                path: gallery("gac-career-launch-internship-program-in-china1779739702.jpg"),
                alt: "Go Abroad China career launch interns",
            },
        },
        {
            id: 151955,
            title: "Internship in Korea - Asia Internship Program",
            slug: "internship-in-korea-with-asia-internship-program",
            providerAlias: "asia-internship-programme",
            providerName: "Asia Internship Program",
            providerLogo: "goabroadavatar-1611563426.jpg",
            rating: 4.73,
            reviews: 172,
            destination: "Seoul, South Korea",
            photo: {
                path: gallery("dsc-4364-1-copy-1529392853.JPG"),
                alt: "Asia Internship Program interns in Seoul",
            },
        },
        {
            id: 45287,
            title: "VAC Professional Internship Program",
            slug: "vac-professional-internship-program",
            providerAlias: "volunteer-adventure-corps",
            providerName: "VACorps",
            providerLogo: "ZJUKR1DjtTJ0y3hb3WyV32z9rn5e029SY1GV9nlq.png",
            rating: 4.8,
            reviews: 301,
            destination: "Cape Town, South Africa",
            photo: {
                path: gallery("internships1788890013.jpg"),
                alt: "VACorps interns in Cape Town",
            },
        },
    ],
    "volunteer-abroad": [
        {
            id: 139598,
            title: "Volunteer in Latin America! Costa Rica, Guatemala, & Peru",
            slug: "top-rated-volunteer-latin-america",
            providerAlias: "maximo-nivel",
            providerName: "MAXIMO NIVEL",
            providerLogo: "logo-goabroad-final-1535591337.png",
            rating: 4.71,
            reviews: 595,
            destination: "Costa Rica, Guatemala & Peru",
            photo: {
                path: LF("maximo-va-feature-ad-1529646530.jpg"),
                alt: "Maximo Nivel volunteers in Latin America",
            },
        },
        {
            id: 120254,
            title: "Volunteer in Turtle Conservation in Nusa Penida, Bali",
            slug: "volunteer-in-turtle-conservation-in-bali",
            providerAlias: "international-volunteer-hq",
            providerName: "International Volunteer HQ (IVHQ)",
            providerLogo: "b7aQwxqKkTQs1TCbQKDnmQAVGPjGCilE6Nj4ktx5.jpg",
            rating: 4.89,
            reviews: 54,
            destination: "Nusa Penida, Indonesia",
            photo: {
                path: gallery("a-person-gently-cradling-a-tiny-baby-turtle-in-their-hand1716778210.jpg"),
                alt: "A volunteer gently cradling a tiny baby turtle",
            },
        },
        {
            id: 110204,
            title: "Zimbabwe - African Wildlife Orphanage",
            slug: "zimbabwe-african-wildlife-orphanage",
            providerAlias: "goeco",
            providerName: "GoEco",
            providerLogo: "volunteer-abroad-logo-goeco-1628821098.png",
            rating: 4.96,
            reviews: 51,
            destination: "Zimbabwe",
            photo: {
                path: gallery("zimbabwe-african-wildlife-orphanage-05-1-1519819951.jpg"),
                alt: "Volunteers at the African wildlife orphanage in Zimbabwe",
            },
        },
        {
            id: 142342,
            title: "GIVE Tanzania: English Education in Zanzibar & Safari",
            slug: "give-tanzania-excursion",
            providerAlias: "growth-international-volunteer-excursions",
            providerName: "GIVE Volunteers",
            providerLogo: "logo_41705_526977df099e51382643679.jpg",
            rating: 4.92,
            reviews: 39,
            destination: "Zanzibar, Tanzania",
            photo: {
                path: gallery("volunteer-experience-with-local-masaii-men-in-rural-tanzania1778593501.jpg"),
                alt: "GIVE volunteers with local Maasai men in rural Tanzania",
            },
        },
        {
            id: 189985,
            title: "Experience Veterinary Medicine in Italy's Top Rescues",
            slug: "experience-veterinary-medicine-in-italys-top-rescues",
            providerAlias: "doctors-in-italy-medical-shadowing-program",
            providerName: "Doctors in Italy Fellowship Program",
            providerLogo: "DrOxUPpCUOUVI9wvqtI5bq2PlDueCAdMS2XGcYPZ.svg",
            rating: 4.8,
            reviews: 40,
            destination: "Italy",
            photo: {
                path: LF("weTOPBVNZhFtEGsweT8rjV4hg6P0p6XogQ2nmZkB.jpg"),
                alt: "A volunteer caring for a rescued animal in Italy",
            },
        },
        {
            id: 196064,
            title: "NEW PROGRAM! Endemic Plant Species Nursery in Galapagos",
            slug: "new-program-endemic-plant-species-nursery-in-galapagos",
            providerAlias: "ioi-abroad",
            providerName: "Intercultural Outreach Initiative (IOI)",
            providerLogo: "logo-ioi-new-1559786117.png",
            rating: 4.74,
            reviews: 144,
            destination: "Isabela, Galápagos, Ecuador",
            photo: {
                path: LF("YGyt9BImLLrdR4owQdRebXtJgg11OlVT9tEzWdLo.jpg"),
                alt: "Volunteers at the plant nursery in the Galápagos highlands",
            },
        },
    ],
    "tefl-courses": [
        {
            id: 87470,
            title: "Top Rated TEFL Course + Lifetime Job Support in 80 Countries",
            slug: "online-tefl-tesol-certification-course-lifetime-job-guidance-assistance-teaching-english-abroad",
            providerAlias: "international-tefl-academy",
            providerName: "International TEFL Academy",
            providerLogo: "download-1512589034.png",
            rating: 4.67,
            reviews: 2987,
            destination: "Online & 25 locations worldwide",
            photo: {
                path: gallery("two-women-tefl-teachers-posing-with-their-children-students1715677365.jpg"),
                alt: "Two TEFL teachers posing with their young students",
            },
        },
        {
            id: 174995,
            title: "Online Level 5 TEFL Course",
            slug: "online-level-5-tefl-course",
            providerAlias: "the-tefl-academy",
            providerName: "The TEFL Academy",
            providerLogo: "rsz-tta-new-logo-1600257009.png",
            rating: 4.58,
            reviews: 1265,
            destination: "Online",
            photo: {
                path: gallery("466x300-1563990485.jpg"),
                alt: "The TEFL Academy course completers",
            },
        },
        {
            id: 183749,
            title: "120-hour Premier Online TEFL Course with The TEFL Org",
            slug: "online-tefl-courses-with-tefl-org",
            providerAlias: "tefl-org",
            providerName: "The TEFL Org",
            providerLogo: "FczsRFaHv6WrlcO7sAt01nmS8g64ThwLiEqnj4Za.png",
            rating: 4.61,
            reviews: 372,
            destination: "Online",
            photo: {
                path: gallery("female-tefl-teacher-leading-a-classroom-of-young-students-seated-on-the-floor-using-hand-gestures-during-a-lesson1777455166.jpg"),
                alt: "A TEFL teacher leading a classroom of young students seated on the floor",
            },
        },
        {
            id: 186647,
            title: "Accredited 120 Hour TEFL Course | Teach English Abroad",
            slug: "120-hour-advanced-tefl-course-international-standard",
            providerAlias: "the-tefl-institute",
            providerName: "The TEFL Institute",
            providerLogo: "aL5O2BvJaMj4RGqD2GGlWmTmsinhTSCMbrJDOg8X.png",
            rating: 4.87,
            reviews: 226,
            destination: "Online",
            photo: {
                path: gallery("tefl-teacher1776353759.jpg"),
                alt: "A TEFL Institute graduate teaching abroad",
            },
        },
        {
            id: 145170,
            title: "120-Hour TEFL Certification – Learn Anywhere with our App",
            slug: "120-hour-accredited-certificate",
            providerAlias: "premier-tefl",
            providerName: "Premier TEFL",
            providerLogo: "3XrE0GDTBB6VpLT0Jvb5KqYDMt9QYaWrYaGUKTzh.png",
            rating: 4.55,
            reviews: 823,
            destination: "Online",
            photo: {
                path: gallery("online-teaching1754994293.jpg"),
                alt: "A Premier TEFL graduate teaching online",
            },
        },
        {
            id: 15160,
            title: "Award-Winning TEFL Course in Prague, Czech Republic",
            slug: "tefl-worldwide-prague",
            providerAlias: "tefl-worldwide-prague",
            providerName: "TEFL Worldwide Prague",
            providerLogo: "tww-new-2021-small-1614678264.png",
            rating: 4.76,
            reviews: 350,
            destination: "Prague, Czech Republic",
            photo: {
                path: LF("jAQ8yXHmPzi9VqvDt8HH9tP2LXdxJxs7a4vqZKs6.jpg"),
                alt: "TEFL Worldwide trainees in Prague",
            },
        },
    ],
    "high-school-abroad": [
        {
            id: 185829,
            title: "Spanish Immersion in Oaxaca, Mexico",
            slug: "spanish-mexican-culture",
            providerAlias: "arcos-journeys-abroad",
            providerName: "Arcos Journeys Abroad",
            providerLogo: "arcos-ja-01-1632115523.jpg",
            rating: 4.8,
            reviews: 112,
            destination: "Oaxaca, Mexico",
            photo: {
                path: gallery("arcos-journeys-abroad1784711273.jpg"),
                alt: "Arcos Journeys Abroad students in Oaxaca",
            },
        },
        {
            id: 191183,
            title: "CIEE High School Academy in Barcelona",
            slug: "semester-year-abroad-spain",
            providerAlias: "ciee-high-school-abroad",
            providerName: "CIEE High School Abroad",
            providerLogo: "ibzGBHzpszqupyLzDpjMmUasXGPW4MgA3Atyf7pc.png",
            rating: 4.43,
            reviews: 14,
            destination: "Barcelona, Spain",
            photo: {
                path: gallery("garita-de-la-campana1729175721.jpg"),
                alt: "Garita de la Campana in Barcelona",
            },
        },
        {
            id: 32997,
            title: "GLA Costa Rica - Volunteer Programs for Teens",
            slug: "costa-rica-volunteer",
            providerAlias: "global-leadership-adventures",
            providerName: "Global Leadership Adventures",
            providerLogo: "1290608881_glalogo.jpg",
            rating: 4.8,
            reviews: 64,
            destination: "Costa Rica",
            photo: {
                path: LF("YoMfBV5x5oBdiHz2vYvD28hrePeT0IP2c0dm2gh6_1714527981.jpg"),
                alt: "Global Leadership Adventures teens volunteering in Costa Rica",
            },
        },
        {
            id: 74110,
            title: "TFT Older Teens: Florence, Cinque Terre, Switzerland & Paris",
            slug: "florence-cinque-terre-ch-paris",
            providerAlias: "travel-for-teens",
            providerName: "Travel For Teens",
            providerLogo: "icon-1572552669.png",
            rating: 4.78,
            reviews: 23,
            destination: "Italy, Switzerland & France",
            photo: {
                path: gallery("people-doing-a-jumpshot1715414458.png"),
                alt: "Travel For Teens travelers doing a jump shot",
            },
        },
        {
            id: 157065,
            title: "Greece, the Islands & Italy - 25 Days",
            slug: "greece-islands-italy-25-days",
            providerAlias: "westcoast-connection",
            providerName: "Westcoast Connection",
            providerLogo: "circlelogo-rgb-72dpi-1548080873.png",
            rating: 4.93,
            reviews: 15,
            destination: "Greece & Italy",
            photo: {
                path: gallery("greece1749826728.jpg"),
                alt: "Westcoast Connection teens in Greece",
            },
        },
        {
            id: 151351,
            title: "High School Program in Spain with Seville Abroad",
            slug: "high-school-program-spain",
            providerAlias: "seville-abroad",
            providerName: "Seville Abroad",
            providerLogo: "28hnRhxOtWgi6pagvrb4jKzbJV1gXWN1Mt5Gfvjj.png",
            rating: 4.74,
            reviews: 66,
            destination: "Seville, Spain",
            photo: {
                path: LF("uyCJkUZsREc4BSpYGLfmdZqRamHSebfZdMfdAYAY_1774338799.jpg"),
                alt: "Seville Abroad high school students in Seville",
            },
        },
    ],
    "teach-abroad": [
        {
            id: 16481,
            title: "The Language House TEFL - Join our Community & Teach Abroad!",
            slug: "the-language-house-tefl-join-our-community-teach-abroad!",
            providerAlias: "the-language-house-tefl",
            providerName: "The Language House TEFL",
            providerLogo: "Rb8tY3OLL5zcbCFj1r8vJczBoxoikw1idtmFrt3Q.png",
            rating: 4.86,
            reviews: 370,
            destination: "Prague, Czech Republic",
            photo: {
                path: gallery("the-language-house-tefl1778552142.png"),
                alt: "The Language House TEFL trainees in Prague",
            },
        },
        {
            id: 116427,
            title: "Xplore Thailand TEFL Program with Guaranteed Placement",
            slug: "tesol-tefl-thailand-hua-hin",
            providerAlias: "xploreasia",
            providerName: "Teach Explore Asia (XploreAsia)",
            providerLogo: "logo_41601_526bce4b7147f1382796875.jpg",
            rating: 4.62,
            reviews: 242,
            destination: "Hua Hin, Thailand",
            photo: {
                path: gallery("matt-and-elyssa-team-teaching-at-a-local-school-in-hua-hin-96100.jpg"),
                alt: "Two XploreAsia teachers team-teaching at a local school in Hua Hin",
            },
        },
        {
            id: 85315,
            title: "Get TEFL Certified & Teach English in Costa Rica!",
            slug: "get-paid-to-teach-english-in-paradise-in-costa-rica-with-a-tefl-tesol-certification",
            providerAlias: "international-tefl-academy",
            providerName: "International TEFL Academy",
            providerLogo: "download-1512589034.png",
            rating: 4.71,
            reviews: 124,
            destination: "Costa Rica",
            photo: {
                path: gallery("get-tefl-certified-teach-english-in-costa-rica-2-1578515867.jpg"),
                alt: "An International TEFL Academy teacher in Costa Rica",
            },
        },
        {
            id: 187660,
            title: "Teach English in Thailand | TESOL + Job Match Included",
            slug: "teach-in-thailand-teach-travel-around-asia",
            providerAlias: "global-work-travel",
            providerName: "Global Work & Travel",
            providerLogo: "global-logo-colour-rgb-1629271775.png",
            rating: 4.94,
            reviews: 49,
            destination: "Thailand",
            photo: {
                path: LF("rt6k1xVHPrZJZic4v0No16ZOxX3Goh31PEzLVi2L.jpg"),
                alt: "A Global Work & Travel teacher in Thailand",
            },
        },
        {
            id: 148284,
            title: "Xplore South Korea TEFL Program with Guaranteed Placement",
            slug: "teach-south-korea-program",
            providerAlias: "xploreasia",
            providerName: "Teach Explore Asia (XploreAsia)",
            providerLogo: "logo_41601_526bce4b7147f1382796875.jpg",
            rating: 4.39,
            reviews: 115,
            destination: "South Korea",
            photo: {
                path: gallery("sk-ga-3-1479881391.jpg"),
                alt: "XploreAsia teachers in South Korea",
            },
        },
        {
            id: 144214,
            title: "TEFL/TESOL Certification and Teaching in India",
            slug: "tefl-tesol-certification-and-teaching-in-india",
            providerAlias: "asian-college-of-teachers",
            providerName: "Asian College of Teachers",
            providerLogo: "logod-1467589414.png",
            rating: 4.49,
            reviews: 486,
            destination: "India",
            photo: {
                path: gallery("1-1465460426.png"),
                alt: "Asian College of Teachers trainees in India",
            },
        },
    ],
    "gap-year": [
        {
            id: 181404,
            title: "Gap Year Internship Program in Cape Town",
            slug: "vac-gap-year-program-in-cape-town",
            providerAlias: "volunteer-adventure-corps",
            providerName: "VACorps",
            providerLogo: "ZJUKR1DjtTJ0y3hb3WyV32z9rn5e029SY1GV9nlq.png",
            rating: 4.9,
            reviews: 72,
            destination: "Cape Town, South Africa",
            photo: {
                path: gallery("gap-year1785708827.jpg"),
                alt: "VACorps gap year participants in Cape Town",
            },
        },
        {
            id: 126010,
            title: "Peru, Ecuador, and the Galapagos Islands Gap Semester",
            slug: "peru-ecuador-galapagos-islands-gap-semester",
            providerAlias: "pacific-discovery",
            providerName: "Pacific Discovery",
            providerLogo: "logo-for-go-abroad-1538952256.jpg",
            rating: 4.68,
            reviews: 31,
            destination: "Peru & Ecuador",
            photo: {
                path: gallery("south-america-gap-semester-pacific-discovery1726192737.png"),
                alt: "Pacific Discovery's South America gap semester",
            },
        },
        {
            id: 198855,
            title: "Quest Africa Men's Core: 7-Month Journey of Transformation",
            slug: "the-quest-mens-core-a-7-month-journey-of-transformation",
            providerAlias: "quest",
            providerName: "Quest",
            providerLogo: "CjaJJmuq7CKsyU4RwHHwDtZbSjaKYHBinBLOQ1Bl.png",
            rating: 4.57,
            reviews: 14,
            destination: "South Africa",
            photo: {
                path: gallery("a-group-of-hikers-wearing-colorful-clothing-gathers-atop-rocky-cliffs-surrounded-by-trees-and-mist-conveying-a-sense-of-adventure-and-camaraderie1758905764.png"),
                alt: "A group of hikers gathers atop rocky cliffs surrounded by trees and mist",
            },
        },
        {
            id: 167821,
            title: "Seamester Study Abroad and Gap Year Voyages",
            slug: "seamester-study-abroad-and-gap-year-voyages",
            providerAlias: "seamester-study-abroad-at-sea",
            providerName: "Seamester Study Abroad at Sea",
            providerLogo: "seamester-logo-new-1548263537-1613395105.jpg",
            rating: 4.66,
            reviews: 122,
            destination: "Multiple destinations at sea",
            photo: {
                path: LF("wgf5QMdj4uX47hFUNus4IJvOB6qI7INgQrZEFPH6.jpg"),
                alt: "Seamester students aboard the ship",
            },
        },
        {
            id: 198563,
            title: "EF Gap Year - The Globetrotter",
            slug: "ef-gap-year-the-globetrotter",
            providerAlias: "ef-international-language-centers",
            providerName: "EF Education First",
            providerLogo: "RwtSG6KRvOx1yGEyUOVNtTX1IvlkYp0O8t49kh0v.png",
            rating: 4.23,
            reviews: 61,
            destination: "Costa Rica, Italy & Japan",
            photo: {
                path: LF("Dnk6ChJgDxv70iQtj8w6So3B9KxPVjsLHHNScxa9.jpg"),
                alt: "EF Gap Year students on The Globetrotter",
            },
        },
        {
            id: 123357,
            title: "South America Explorer with Gapforce",
            slug: "south-america-explore",
            providerAlias: "gapforce",
            providerName: "Gapforce",
            providerLogo: "yyHQXzzZFqzDviBOPPp1mf0038Y17Xlog5EYdsJN.png",
            rating: 4.48,
            reviews: 25,
            destination: "Peru & Ecuador",
            photo: {
                path: gallery("a-hiking-group-poses-for-a-photo1751035701.jpg"),
                alt: "A Gapforce hiking group poses for a photo",
            },
        },
    ],
    "language-schools": [
        {
            id: 146620,
            title: "Intensive Chinese Group Class in 5 Cities | That's Mandarin",
            slug: "chinese-intensive-group-class",
            providerAlias: "thats-mandarin",
            providerName: "That's Mandarin",
            providerLogo: "ebymADHM72Y8pszdqK4NtpefsEwrzzHXLT2crwbe.png",
            rating: 4.97,
            reviews: 580,
            destination: "Beijing, Shanghai & 3 more cities, China",
            photo: {
                path: gallery("intensive-group-chinese-class1726680149.jpg"),
                alt: "An intensive group Chinese class at That's Mandarin",
            },
        },
        {
            id: 190027,
            title: "LTL Language School | Learn Chinese in China",
            slug: "ltl-language-school-learn-chinese-8-cities",
            providerAlias: "live-the-language-school",
            providerName: "LTL Language School",
            providerLogo: "JAScUUcULVN66sTeXdzkrCH2lcRxwheyqghwc0YU.png",
            rating: 4.73,
            reviews: 499,
            destination: "8 cities across China",
            photo: {
                path: gallery("influencer-jamie-zhu-studying-at-ltl-shanghai1775706891.jpg"),
                alt: "A student studying at LTL Shanghai",
            },
        },
        {
            id: 189308,
            title: "Study Japanese in Hokkaido",
            slug: "study-japanese-in-hokkaido",
            providerAlias: "meiji-academy",
            providerName: "Meiji Academy",
            providerLogo: "dypFvEKMiw1npI7YKQyHX557OZAqHfLGejj01qOc.png",
            rating: 4.92,
            reviews: 73,
            destination: "Hokkaido, Japan",
            photo: {
                path: gallery("temple-visit1750311571.jpg"),
                alt: "A Meiji Academy student in a kimono visiting a temple",
            },
        },
        {
            id: 139604,
            title: "Spanish Immersion Programs | Learn Spanish in Latin America",
            slug: "learn-spanish-latin-america",
            providerAlias: "maximo-nivel",
            providerName: "MAXIMO NIVEL",
            providerLogo: "logo-goabroad-final-1535591337.png",
            rating: 4.67,
            reviews: 718,
            destination: "Costa Rica, Guatemala & Peru",
            photo: {
                path: gallery("maximo-nivel-spanish-immersion-program-participants1787904116.jpg"),
                alt: "Maximo Nivel Spanish immersion program participants",
            },
        },
        {
            id: 1640,
            title: "Study Spanish in Bilbao, Spain",
            slug: "study-spanish-in-bilbao-spain",
            providerAlias: "instituto-hemingway",
            providerName: "Instituto Hemingway",
            providerLogo: "ih-logo-con-fondo-blanco-perfil-1556092713.jpg",
            rating: 4.9,
            reviews: 174,
            destination: "Bilbao, Spain",
            photo: {
                path: LF("0eY1s56MgYts4JqpPhySW2WudBN8Z4xKAQ3Ls5vp_1781764737.jpg"),
                alt: "Instituto Hemingway students in Bilbao",
            },
        },
        {
            id: 4285,
            title: "Learn Japanese in Tokyo, Japan",
            slug: "learn-japanese-in-tokyo-japan",
            providerAlias: "kcp-international-japanese-language-school",
            providerName: "KCP International Japanese Language School",
            providerLogo: "1329874944_KCP-Logo-normal.png",
            rating: 4.68,
            reviews: 62,
            destination: "Tokyo, Japan",
            photo: {
                path: LF("WRfJ1vef6k7qL3g5C4xSBiumAZV2VPBWxXKuvl0R.jpg"),
                alt: "KCP International students in Tokyo",
            },
        },
    ],
    "degree-abroad": [
        {
            id: 116031,
            title: "Earn Your Degree in Rome at John Cabot University",
            slug: "earn-your-american-bachelors-degree-in-rome-italy-at-jcu",
            providerAlias: "john-cabot-university",
            providerName: "John Cabot University",
            providerLogo: "kJpW9vPaQ0C6kSKYJIQKHyDbJcWp2svSwoLqQnEg.jpg",
            rating: 4.24,
            reviews: 579,
            destination: "Rome, Italy",
            photo: {
                path: LF("9TF3vi6R10Mfza7e4CSJ3oE89ot9HFzNma0vELVf.jpg"),
                alt: "John Cabot University students in Rome",
            },
        },
        {
            id: 190023,
            title: "International Undergraduate Programs at Tel Aviv University",
            slug: "undergraduate-programs-at-the-lowy-international-school",
            providerAlias: "tel-aviv-university",
            providerName: "Tel Aviv University",
            providerLogo: "4uuSFqTreA4UdanTWsjsSoQxFyRYrO8w6HbEVTWo.png",
            rating: 4.36,
            reviews: 11,
            destination: "Tel Aviv, Israel",
            photo: {
                path: gallery("students-on-a-trip-to-haifa1672218791.jpg"),
                alt: "Tel Aviv University international students on a trip to Haifa",
            },
        },
        {
            id: 186324,
            title: "Bachelor of Psychology",
            slug: "american-bachelor-in-psychology",
            providerAlias: "university-of-new-york-in-prague",
            providerName: "University of New York in Prague",
            providerLogo: "VBtYe4RHMk630aRynkZ9iPQ9f8zCozsqSqFXlvgV.png",
            rating: 4.4,
            reviews: 5,
            destination: "Prague, Czech Republic",
            photo: {
                path: gallery("unyp1757986379.jpg"),
                alt: "Students at the University of New York in Prague",
            },
        },
        {
            id: 137255,
            title: "Study a Full Degree at Deakin University in Australia",
            slug: "study-a-full-degree-at-deakin-university-in-australia",
            providerAlias: "deakin-university",
            providerName: "Deakin University",
            providerLogo: "new-deakin-logo-2017-jpg-1510890708.jpg",
            rating: 5,
            reviews: 15,
            destination: "Melbourne & Geelong, Australia",
            photo: {
                path: LF("U5AYTrRQpuNLHfpBpFfem4iPIDvgtkKYtBkiu1gN.jpg"),
                alt: "Deakin University campus in Australia",
            },
        },
        {
            id: 186538,
            title: "Bachelor of Science in International Hospitality Management",
            slug: "bachelor-of-science-in-international-hospitality-management",
            providerAlias: "ehl-hospitality-business-school",
            providerName: "EHL Hospitality Business School",
            providerLogo: "O79iWLllS85VMV7wEVMgp11U1wYokFEooI6tEmjG.jpg",
            rating: 4.64,
            reviews: 14,
            destination: "Lausanne, Switzerland",
            photo: {
                path: LF("8O0zmH6sTwdO5wXe14vGYeXKN0G9IClYsv2OHmcX.jpg"),
                alt: "EHL Hospitality Business School students",
            },
        },
        {
            id: 200279,
            title: "Bachelor's & Master's Degrees in China | Apply with GAC",
            slug: "bachelors-and-masters-degrees-in-china-apply-with-gac",
            providerAlias: "go-abroad-china",
            providerName: "Go Abroad China Ltd.",
            providerLogo: "WtuBJgUnigfCiEeJouYYRrRnJ1dqaRh9FmcJxjMA.png",
            rating: 4.7,
            reviews: 569,
            destination: "Beijing & Shanghai, China",
            photo: {
                path: LF("7qfVwdFN65tK9lwIHlIyzVp1N2ENuYW1AxYodHCP_1778575404.jpg"),
                alt: "International degree students in China with Go Abroad China",
            },
        },
    ],
    "adventure-travel": [
        {
            id: 192189,
            title: "Thailand Adventures and Service with Rustic Pathways",
            slug: "programs-in-thailand",
            providerAlias: "rustic-pathways",
            providerName: "Rustic Pathways",
            providerLogo: "U9gJmHVlKQIURr36OxVRuCrb98gCeDnXb2Qo175W.png",
            rating: 4.92,
            reviews: 38,
            destination: "Thailand",
            photo: {
                path: gallery("elephant1706142403.jpg"),
                alt: "Rustic Pathways travelers with an elephant in Thailand",
            },
        },
        {
            id: 74115,
            title: "Travel For Teens: Costa Rica Adventure and Service",
            slug: "costarica-adventure-service",
            providerAlias: "travel-for-teens",
            providerName: "Travel For Teens",
            providerLogo: "icon-1572552669.png",
            rating: 4.93,
            reviews: 14,
            destination: "Costa Rica",
            photo: {
                path: gallery("2pic0627201113092364505421047.png"),
                alt: "Travel For Teens travelers in Costa Rica",
            },
        },
        {
            id: 196333,
            title: "Whole of Europe Group Tour: 4 Weeks",
            slug: "whole-of-europe-group-tour-4-weeks",
            providerAlias: "euroventure-travel-ltd",
            providerName: "Euroventure Travel Ltd",
            providerLogo: "QJiYbe1QNQddiB9H6aFZBAs4IjGKqRqhxiw1m1z0.png",
            rating: 4.96,
            reviews: 89,
            destination: "12 countries across Europe",
            photo: {
                path: gallery("amsterdam1733737888.jpg"),
                alt: "Euroventure travelers in Amsterdam",
            },
        },
        {
            id: 197218,
            title: "New Zealand & Fiji Summer Program | Pacific Discovery",
            slug: "new-zealand-fiji-summer",
            providerAlias: "pacific-discovery",
            providerName: "Pacific Discovery",
            providerLogo: "logo-for-go-abroad-1538952256.jpg",
            rating: 4.51,
            reviews: 295,
            destination: "New Zealand & Fiji",
            photo: {
                path: LF("HceX8iiu6pwXLzLaTmwoJNuMF4iQzIDSFlgL14hk.jpg"),
                alt: "Pacific Discovery's New Zealand and Fiji summer program",
            },
        },
        {
            id: 200775,
            title: "Ultimate Thailand & Vietnam: 29 days in South East Asia",
            slug: "2-countries-twice-the-fun-the-best-of-thailand-vietnam",
            providerAlias: "global-work-travel",
            providerName: "Global Work & Travel",
            providerLogo: "global-logo-colour-rgb-1629271775.png",
            rating: 4.94,
            reviews: 49,
            destination: "Thailand & Vietnam",
            photo: {
                path: LF("oJ8iLmnOCcrjgt2RQWtsZJBeTfXqfDkkqaavLEcR.jpg"),
                alt: "Global Work & Travel adventurers in South East Asia",
            },
        },
        {
            id: 188264,
            title: "Group & Student Travel | IMA Safaris Africa & South America",
            slug: "ima-safaris-africa-group-and-student-travel-opportunities",
            providerAlias: "international-medical-aid",
            providerName: "International Medical Aid (IMA)",
            providerLogo: "inter2-1457107573.png",
            rating: 5,
            reviews: 109,
            destination: "Kenya & Tanzania",
            photo: {
                path: gallery("ima-safari1641792138.jpg"),
                alt: "An IMA safari group in East Africa",
            },
        },
    ],
    "jobs-abroad": [
        {
            id: 187631,
            title: "Working Holiday Australia | Earn, Travel & Explore",
            slug: "working-holiday-australia",
            providerAlias: "global-work-travel",
            providerName: "Global Work & Travel",
            providerLogo: "global-logo-colour-rgb-1629271775.png",
            rating: 4.94,
            reviews: 49,
            destination: "Australia",
            photo: {
                path: LF("X6vRYxEpLF4NEMj2mpqNotcxYEaSbxR01tPxU1Ow.jpg"),
                alt: "A Global Work & Travel working holiday in Australia",
            },
        },
        {
            id: 186075,
            title: "Spanish Cultural Immersion and Adventure in Mexico",
            slug: "teach-english-learn-spanish-and-travel-in-mexico",
            providerAlias: "iguana-abroad",
            providerName: "Iguana Abroad",
            providerLogo: "nNgTUe2vAQcAQO0o9Bx9nd18O5YRcmRkNs2VeFOQ.jpg",
            rating: 4.9,
            reviews: 122,
            destination: "Mexico",
            photo: {
                path: gallery("ia1764032861.jpg"),
                alt: "Iguana Abroad participants in Mexico",
            },
        },
        {
            id: 171364,
            title: "Make English Teaching Fun in China",
            slug: "20-new-job-openings-as-we-expand-in-china",
            providerAlias: "mef-china",
            providerName: "MEF World (MEF English)",
            providerLogo: "logo-big-mef-1557368639.png",
            rating: 5,
            reviews: 5,
            destination: "China",
            photo: {
                path: LF("v950xxnTnundwGHYgiZmd9XlYquv9Bjv97AETkqe_1776927461.jpg"),
                alt: "An MEF World teacher with kindergarten students in China",
            },
        },
        {
            id: 192003,
            title: "Intern in the UK with JENZA",
            slug: "internship-uk",
            providerAlias: "jenza",
            providerName: "JENZA",
            providerLogo: "5c8TrEbcfqjiVZ0rTeNbrtAfrl0JfddbtNrn4ju7.jpg",
            rating: 4.67,
            reviews: 6,
            destination: "United Kingdom",
            photo: {
                path: LF("P4VUq8eHIXNbYJZJMAoGyQ4mHxvtDnMX8MNHSfFc_1764817125.jpg"),
                alt: "JENZA interns in the UK",
            },
        },
        {
            id: 173887,
            title: "Teach English in Poland with English Wizards",
            slug: "teach-english-in-poland",
            providerAlias: "english-wizards",
            providerName: "English Wizards",
            providerLogo: "k1QNrC92gLmUT6yH2YpKVeOucENYMxEOFDvpENdz.jpg",
            rating: 4.31,
            reviews: 39,
            destination: "Poland",
            photo: {
                path: gallery("teacher-internship-group1667892329.jpg"),
                alt: "English Wizards teaching internship group in Poland",
            },
        },
    ],
};

/** Every ranked winner across the ten groups — the hero counts these. */
export const winnerCount = providerGroups.reduce(
    (n, group) => n + group.providers.length,
    0,
);

/* ── Previous years of the per-directory program lists ───────────────────── */

/** Years with an archived Top Rated Programs list per directory, newest
 *  first — each is a page at `/top-rated-providers-programs/<directory>/<year>`
 *  (the requirement added after the doc: "page/links of previous year of per
 *  directory top rated programs"). Dummy: three years back; the admin would
 *  add a year each time the list rolls over. */
export const programArchiveYears: number[] = [year - 1, year - 2, year - 3];
