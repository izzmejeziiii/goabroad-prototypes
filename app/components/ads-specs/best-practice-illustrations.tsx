/* Spot illustrations for the Best Practices cards, built in the format of
   GoAbroad's /mygoabroad design-system set (object-only scenes): authentic
   background blob from their assets, cobalt #0A5E85 + white-overlay tints,
   coral #DC625A as the only warm accent, glass shine, #f0f0f0 environment
   props. Decorative; the step titles carry the meaning. */

const illustrations = [
    "/images/ads-specs/brand-consistency.svg",
    "/images/ads-specs/quality-photos.svg",
    "/images/ads-specs/speak-to-audience.svg",
];

export default function BestPracticeIllustration({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const src = illustrations[index];
    return src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" aria-hidden className={`object-contain ${className ?? ""}`} />
    ) : null;
}
