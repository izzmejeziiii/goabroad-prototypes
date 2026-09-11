import Image from "next/image";
import { HiOutlineArrowRight, HiTrophy } from "react-icons/hi2";
import { logoUrl, photoUrl, providerReviewsUrl } from "./cdn";
import StarRating from "./rating";
import type { Provider } from "./types";

/* Initials on the cobalt gradient when a provider has no gallery photo yet —
   the same fallback shape as the closing bands, so an empty gallery doesn't
   read as a broken image. */
function PhotoFallback({ name }: { name: string }) {
    const initials = name
        .replace(/\(.*?\)|\[.*?\]/g, "")
        .split(/\s+/)
        .filter((word) => /^[A-Za-z]/.test(word))
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
    return (
        <div
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500"
        >
            <span className="text-4xl font-bold tracking-wide text-white/80">
                {initials}
            </span>
        </div>
    );
}

const ordinals: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };

/* Gold, silver, bronze as the metals actually look — a light-to-dark sheen
   on each disc — with a white trophy embossed on top. These are the one
   place the page steps outside the brand palette, because a sun-coloured
   "gold" and a slate "silver" didn't read as medals. Anything past third
   (the doc lists three per directory) falls back to a neutral disc. */
const medalStyles: Record<number, string> = {
    1: "bg-linear-to-br from-[#f6d565] via-[#e2b53a] to-[#b9871a] text-white",
    2: "bg-linear-to-br from-[#eef0f3] via-[#c3c7cd] to-[#8f949c] text-white",
    3: "bg-linear-to-br from-[#e6a873] via-[#c9803f] to-[#96561f] text-white",
};

/* A place pill: "1st place" in a solid white pill, headed by a trophy on a
   gold, silver, or bronze disc, so the three cards in a group read as a
   podium rather than a numbered list. */
export function RankBadge({
    rank,
    className,
}: {
    rank: number;
    className?: string;
}) {
    const suffix = ordinals[rank] ?? "th";
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full bg-white py-1 pr-3.5 pl-1 text-sm font-bold text-neutral-900 shadow-lg shadow-black/25 ring-1 ring-black/10 ${className ?? ""}`}
        >
            <span
                aria-hidden
                className={`flex h-7 w-7 items-center justify-center rounded-full shadow-inner ${
                    medalStyles[rank] ?? "bg-slate-200 text-slate-800"
                }`}
            >
                <HiTrophy className="h-4 w-4 drop-shadow-sm" />
            </span>
            <span>
                <span className="sr-only">Ranked </span>
                {rank}
                {suffix} place
            </span>
        </span>
    );
}

/* One Top Rated Provider, laid out like a profile card: gallery photo with the
   rank as a place pill, the logo as an avatar tile straddling the photo's
   bottom edge, name and rating, and a full-width footer row that reads "Read
   Reviews". The whole card is the link into the reviews section of the
   provider page. `rank` is the position in the directory's list, which the
   requirements doc numbers 1–3. */
export default function ProviderCard({
    provider,
    rank,
    priority = false,
}: {
    provider: Provider;
    rank?: number;
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
                    <PhotoFallback name={provider.name} />
                )}
                {/* Soft cobalt foot so the avatar tile reads against any
                    photo, and a lighter head so the place pill does too. */}
                <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-cobalt-700/45 to-transparent"
                />
                <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-cobalt-700/40 to-transparent"
                />
                {rank !== undefined && (
                    <RankBadge rank={rank} className="absolute top-3 left-3" />
                )}
            </div>

            <div className="relative flex flex-1 flex-col px-5 pb-5">
                {/* Avatar tile straddling the photo edge. */}
                <span className="-mt-7 mb-3 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md ring-4 ring-white">
                    {provider.logo ? (
                        <Image
                            src={logoUrl(provider.logo)}
                            alt=""
                            width={56}
                            height={56}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <span className="text-lg font-bold text-cobalt-500">
                            {provider.name.slice(0, 1)}
                        </span>
                    )}
                </span>
                <h5 className="text-lg leading-snug font-semibold text-neutral-800 transition-colors group-hover:text-cobalt-600">
                    {provider.name}
                </h5>
                <div className="mt-3">
                    <StarRating rating={provider.rating} reviews={provider.reviews} />
                </div>
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

/* A notable mention as a badge card: a light slate band carrying the page's
   dotted texture and a sun glow, the logo as a white-ringed tile straddling
   the band's edge, name and rating centred beneath, and the same full-width
   "Read Reviews" footer as the winners' cards. No photo — the band stands in
   for it, so the ten sit five across as a lighter tier under the photo cards.
   No per-card award label either: the section heading already says these
   are notable mentions. The whole card is the link. Chosen by Jezi over an
   honor-roll list, ticket cards, medallions, and a cobalt spotlight panel. */
export function NotableCard({ provider }: { provider: Provider }) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-cobalt-200 hover:shadow-lg hover:shadow-cobalt-500/10 focus-within:ring-2 focus-within:ring-cobalt-500 focus-within:ring-offset-2">
            <a
                href={providerReviewsUrl(provider.alias)}
                target="_blank"
                rel="noopener"
                aria-label={`Read reviews of ${provider.name}`}
                className="absolute inset-0 z-10 rounded-2xl focus:outline-none"
            />

            <div className="relative h-16 overflow-hidden bg-linear-to-br from-slate-100 to-slate-200/60">
                <div
                    aria-hidden
                    className="absolute inset-0 [background-image:radial-gradient(circle,rgba(10,94,133,0.14)_1.5px,transparent_1.5px)] [background-size:14px_14px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
                <div
                    aria-hidden
                    className="absolute -top-8 -right-6 h-24 w-24 rounded-full bg-sun-500/25 blur-2xl"
                />
            </div>

            <div className="relative flex flex-1 flex-col items-center px-4 pb-4 text-center">
                <span className="-mt-8 mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md ring-4 ring-white">
                    {provider.logo ? (
                        <Image
                            src={logoUrl(provider.logo)}
                            alt=""
                            width={64}
                            height={64}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <span className="text-xl font-bold text-cobalt-500">
                            {provider.name.slice(0, 1)}
                        </span>
                    )}
                </span>
                <h5 className="leading-snug font-semibold text-neutral-800 transition-colors group-hover:text-cobalt-600">
                    {provider.name}
                </h5>
                <div className="mt-2 w-full">
                    <StarRating
                        rating={provider.rating}
                        reviews={provider.reviews}
                        compact
                        stacked
                    />
                </div>
            </div>

            <div className="relative mt-auto flex items-center justify-center gap-1.5 border-t border-slate-100 px-4 py-3 text-sm font-semibold text-cobalt-500 transition-colors group-hover:bg-slate-50">
                Read Reviews
                <HiOutlineArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
            </div>
        </article>
    );
}
