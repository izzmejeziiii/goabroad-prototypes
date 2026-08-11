/* Spot illustrations for the "Overview of GoAbroad Page Types" cards.
   Four are GoAbroad's own design-system assets (downloaded from
   goabroad.com/images/mygoabroad/, the /mygoabroad Program Discovery set);
   homepage.svg is a remix of the travel-resources scene — same character,
   blob, and background, with the map board replaced by a browser panel
   drawn in the set's construction (cobalt + white-overlay tints, coral
   accent, glass shine). Decorative — the card titles carry the meaning. */

const illustrations: Record<string, string> = {
    Homepage: "/images/ads-specs/homepage.svg",
    "Directory Landing Page": "/images/ads-specs/directory-landing.svg",
    "Search Results Page": "/images/ads-specs/search-results.svg",
    "Provider Page": "/images/ads-specs/provider-page.svg",
    "Program Listing": "/images/ads-specs/program-listing.svg",
};

export default function PageTypeIllustration({
    name,
    className,
}: {
    name: string;
    className?: string;
}) {
    const src = illustrations[name];
    return src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" aria-hidden className={`object-contain ${className ?? ""}`} />
    ) : null;
}
