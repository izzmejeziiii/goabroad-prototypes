export interface Breadcrumb {
    label: string;
    link: string;
}

export interface Option {
    id: number;
    value: string;
    label: string;
}

export interface SearchFilter {
    filter: string;
    label: string;
    fieldName: string;
    options: Option[];
    isLocation: boolean;
}

export interface Ad {
    id: number;
    url: string;
    callToActionText: string;
    displayedText: string;
    image: string;
    imageAlt: string;
    providerName: string;
    providerLogo: string;
}

export interface PremierAd {
    id: number;
    url: string;
    image: string;
    imageAlt: string;
    providerName: string;
    displayedText: string;
}

export interface FeaturedProgram {
    id: number;
    image: string;
    imageAlt: string;
    providerName: string;
    providerLogo: string;
    averageRating: number;
    reviewsCount: number;
    isVerified: boolean;
    callToActionText: string;
    description: string;
    webUrl: string;
    programUrl: string;
}

export interface GuideSection {
    id: number;
    title: string;
    content: string;
}

export interface Review {
    id: number;
    title: string;
    review: string;
    programName: string;
    programUrl: string;
    overallRating: number;
    dateAdded: string;
    reviewerName: string;
    reviewerCountry: string;
}

export interface Interview {
    id: number;
    name: string;
    photo: string;
    providerName: string;
    type: number;
    excerpt: string;
    url: string;
}

export interface Article {
    id: number;
    title: string;
    altText: string;
    photo: string;
    topic: string;
    url: string;
    authorName: string;
    authorUrl: string;
    date: string;
}

export interface PopularSearchGroup {
    caption: string;
    items: { name: string; link: string }[];
}

/** A card in the search results grid — a provider's top matching program. */
export interface ProgramResult {
    id: number;
    title: string;
    description: string;
    providerName: string;
    providerLogo: string;
    averageRating: number | null;
    reviewsCount: number | null;
    isVerified: boolean;
    image: string;
    mobileImage: string;
    imageAlt: string;
    matchedProgramsCount: number;
    topRatedBadge: { badge: string; name: string } | null;
    programUrl: string;
    providerUrl: string;
    webUrl: string;
}

export interface FilterOption {
    label: string;
    value: string | number;
    filterKey: string;
}
