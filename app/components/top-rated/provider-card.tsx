import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi2";
import TopRatedBadge from "./badge";
import { logoUrl, photoUrl, providerReviewsUrl } from "./cdn";
import { year } from "./data";
import StarRating from "./rating";
import type { Provider } from "./types";

/* When a provider has no gallery photo yet, the cover shows the award
   instead: the Top Rated badge on the page's cobalt field with its dots and
   a sun glow — the same panel the section heads use — so an empty gallery
   reads as a designed card, not a missing image. */
function PhotoFallback() {
    return (
        <div
            aria-hidden
            className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500"
        >
            <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.14)_1.5px,transparent_1.5px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_60%)]" />
            <div className="absolute h-36 w-36 rounded-full bg-sun-500/30 blur-3xl" />
            <TopRatedBadge
                year={year}
                className="relative w-[24%] drop-shadow-xl"
            />
        </div>
    );
}

/* Two-letter monogram on cobalt for a provider with no logo — an avatar in
   the brand colour rather than a lone letter on white. */
function Monogram({ name, className }: { name: string; className: string }) {
    const initials = name
        .replace(/\(.*?\)|\[.*?\]/g, "")
        .split(/\s+/)
        .filter((word) => /^[A-Za-z]/.test(word))
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
    return (
        <span
            aria-hidden
            className={`flex h-full w-full items-center justify-center bg-linear-to-br from-cobalt-600 to-cobalt-500 font-bold tracking-wide text-white ${className}`}
        >
            {initials}
        </span>
    );
}

/* One Top Rated Provider, laid out like a profile card: gallery photo, the
   logo as an avatar tile straddling the photo's bottom edge, name, stars
   with the rating, the opening of the provider's own description, and a
   full-width footer row that reads "Read Reviews". The whole card is the
   link into the reviews section of the provider page. Feedback on the
   prototype took off the "1st/2nd/3rd place" pills (the doc's lists are
   still in order, but the page doesn't rank them) and the review counts,
   and asked for the company intro in their place. Used for the winners and
   the notable mentions alike. */
export default function ProviderCard({
    provider,
    priority = false,
}: {
    provider: Provider;
    priority?: boolean;
}) {
    const reviewsHref = providerReviewsUrl(provider.alias);
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-cobalt-200 hover:shadow-lg hover:shadow-cobalt-500/10 focus-within:ring-2 focus-within:ring-cobalt-500 focus-within:ring-offset-2">
            {/* Stretched link: one focusable target for the whole card. */}
            <a
                href={reviewsHref}
                target="_blank"
                rel="noopener"
                aria-label={`Read reviews of ${provider.name}`}
                className="absolute inset-0 z-10 rounded-2xl focus:outline-none"
            />

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                {provider.photo ? (
                    <Image
                        src={photoUrl(provider.photo.path, 640, 400)}
                        alt={provider.photo.alt}
                        fill
                        priority={priority}
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <PhotoFallback />
                )}
                {/* Soft cobalt foot so the avatar tile reads against any photo. */}
                <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-cobalt-700/45 to-transparent"
                />
            </div>

            <div className="relative flex flex-1 flex-col px-5 pb-5">
                {/* Avatar tile straddling the photo edge. An even, all-round
                    cobalt-tinted glow lifts it off the white card even when
                    the logo itself is on white, without a cast shadow
                    falling onto the name below. */}
                <span className="-mt-7 mb-3 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_0_20px_rgba(2,61,88,0.22)] ring-4 ring-white">
                    {provider.logo ? (
                        <Image
                            src={logoUrl(provider.logo)}
                            alt=""
                            width={56}
                            height={56}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <Monogram name={provider.name} className="text-base" />
                    )}
                </span>
                <h5 className="text-lg leading-snug font-semibold text-neutral-800 transition-colors group-hover:text-cobalt-600">
                    {provider.name}
                </h5>
                <div className="mt-2">
                    <StarRating rating={provider.rating} />
                </div>
                {provider.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {provider.description}
                    </p>
                )}
            </div>

            <div className="relative mt-auto flex items-center justify-between border-t border-slate-100 px-5 py-3.5 text-sm font-semibold text-cobalt-500 transition-colors group-hover:bg-slate-50">
                Read Reviews
                <HiOutlineArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
            </div>
        </article>
    );
}
