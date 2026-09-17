/* Types for /top-rated-providers-programs. The content itself lives in
   `data.ts`; these only describe its shape. */

export type DirectoryId =
    | "study-abroad"
    | "intern-abroad"
    | "volunteer-abroad"
    | "tefl-courses"
    | "high-school-abroad"
    | "teach-abroad"
    | "gap-year"
    | "language-schools"
    | "degree-abroad"
    | "adventure-travel"
    | "jobs-abroad";

/** A photo on GoAbroad's Cloudinary CDN — the path under `images2/`, with
    no transform. `cdn.ts` turns it into a sized URL. */
export type CdnPhoto = {
    path: string;
    alt: string;
};

export type Directory = {
    /** Route segment: /top-rated-providers-programs/<id>. */
    id: DirectoryId;
    /** Card title on the main page (H4), as listed in the requirements doc. */
    cardTitle: string;
    /** Heading of this directory's provider group on the main page (H4).
        Null when the doc lists no provider group for it. */
    providersHeading: string | null;
    /** H1 of the directory page. */
    pageTitle: string;
    /** Directory name dropped into the meta title/description template. */
    metaName: string;
    /** Summary paragraphs on the directory page, verbatim from the doc. */
    summary: string[];
    /** Key into the icon map in `icons.tsx`. */
    icon: string;
    /** Card and directory-page hero photo. */
    photo: CdnPhoto;
    /** GoAbroad's badge artwork for this directory's providers, when one
        was published for the year. Lives in `images2/partners/`. */
    badge?: string;
    /** The live directory on goabroad.com. */
    liveUrl: string;
};

export type Provider = {
    /** Provider alias on goabroad.com (/providers/<alias>). */
    alias: string;
    name: string;
    rating: number;
    reviews: number;
    /** File in `images2/clients/logos/MAIN/`. */
    logo?: string;
    /** First photo in the provider's media gallery. */
    photo?: CdnPhoto;
    /** Opening of the provider's own "About" copy on goabroad.com. */
    description?: string;
};

export type TopRatedProgram = {
    id: number;
    title: string;
    /** Program URL alias; the live URL is
        /providers/<providerAlias>/programs/<slug>-<id>. */
    slug: string;
    providerAlias: string;
    providerName: string;
    /** File in `images2/clients/logos/MAIN/`. */
    providerLogo?: string;
    rating: number;
    reviews: number;
    destination: string;
    photo?: CdnPhoto;
};

/** One "Top Rated <Directory> Providers" group: the ranked provider aliases. */
export type ProviderGroup = {
    directoryId: DirectoryId;
    providers: string[];
};

export type YearLink = {
    label: string;
    href: string;
    /** The article's own cover image (its og:image), as a path under `images2/`. */
    image?: string;
    /** The article's byline, as published. */
    author?: string;
    /** The article's publish date, ISO 8601. */
    date?: string;
};
