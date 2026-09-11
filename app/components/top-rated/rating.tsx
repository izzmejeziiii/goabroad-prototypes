import { HiStar } from "react-icons/hi2";

const format = new Intl.NumberFormat("en-US");

/* Five stars with a fractional sun-coloured fill, the numeric rating, and the
   review count — the same three facts the directory's program cards show,
   drawn a little larger because here the rating is the point of the card. */
export default function StarRating({
    rating,
    reviews,
    compact = false,
    stacked = false,
}: {
    rating: number;
    reviews: number;
    /** Tighter layout for the notable-mention cards. */
    compact?: boolean;
    /** Review count always on its own line under the stars, centred — for
        narrow cards where it would otherwise wrap on some and not others. */
    stacked?: boolean;
}) {
    const stars = [0, 1, 2, 3, 4];
    const starSize = compact ? "h-4 w-4" : "h-5 w-5";
    return (
        <div
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${
                stacked ? "justify-center" : ""
            }`}
        >
            <span
                className="relative inline-flex shrink-0"
                role="img"
                aria-label={`Rated ${rating.toFixed(2)} out of 5`}
            >
                <span className="flex text-slate-200">
                    {stars.map((i) => (
                        <HiStar key={i} className={`${starSize} shrink-0`} />
                    ))}
                </span>
                <span
                    className="absolute inset-y-0 left-0 flex overflow-hidden text-sun-500"
                    style={{ width: `${Math.min(rating / 5, 1) * 100}%` }}
                >
                    {stars.map((i) => (
                        <HiStar key={i} className={`${starSize} shrink-0`} />
                    ))}
                </span>
            </span>
            <span
                className={`font-semibold text-neutral-800 ${
                    compact ? "text-sm" : "text-base"
                }`}
            >
                {rating.toFixed(2)}
            </span>
            <span
                className={`text-slate-500 ${compact ? "text-xs" : "text-sm"} ${
                    stacked ? "basis-full" : ""
                }`}
            >
                ({format.format(reviews)} {reviews === 1 ? "review" : "reviews"})
            </span>
        </div>
    );
}
