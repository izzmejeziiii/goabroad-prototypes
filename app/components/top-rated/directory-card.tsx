import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { photoUrl } from "./cdn";
import { DirectoryIcon } from "./icons";
import type { Directory } from "./types";

function countLabel(programCount: number, year: number, short: boolean) {
    const noun = programCount === 1 ? "Program" : "Programs";
    return short
        ? `${programCount} ${noun.toLowerCase()}`
        : `${programCount} Top Rated ${noun} of ${year}`;
}

const frame =
    "flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3";

/* A Top Rated Program card on the main page: one per directory, linking to
   that directory's list of winners. A compact postcard — white frame around a
   landscape photo, the category icon in a light slate chip straddling the
   photo's bottom edge, and a caption row underneath. Chosen by Jezi over a
   full-bleed photo tile and a square-photo postcard.

   A directory with no list this year (the admin publishes none for some
   categories) renders the same card as plain, unlinked content: the caption
   reads "No programs listed this year" and there is no arrow (Jezi's call
   on the reviewer's question). */
export default function DirectoryCard({
    directory,
    programCount,
    year,
}: {
    directory: Directory;
    programCount: number;
    year: number;
}) {
    const empty = programCount === 0;

    const body = (
        <>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                    src={photoUrl(directory.photo.path, 560, 350)}
                    alt={directory.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
                    className={`object-cover transition-transform duration-500 ${
                        empty ? "" : "group-hover:scale-105"
                    }`}
                />
            </div>
            <div className="relative flex flex-1 items-end justify-between gap-3 px-1.5 pt-7 pb-1.5 sm:px-2 sm:pt-8 sm:pb-2">
                {/* Straddles the photo's bottom edge; a white ring keeps it
                    legible against any photo. */}
                <span className="absolute -top-5 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-cobalt-500 shadow-md ring-4 ring-white sm:-top-6 sm:right-4 sm:h-12 sm:w-12">
                    <DirectoryIcon
                        name={directory.icon}
                        className="h-5 w-5 sm:h-6 sm:w-6"
                    />
                </span>
                <div className="min-w-0">
                    {/* Two lines reserved on phones, where names like
                        "Language Programs" wrap and made the cards uneven
                        (reviewer); from sm every name fits on one line. */}
                    <h4
                        className={`line-clamp-2 min-h-[2.75rem] text-base leading-snug font-bold text-neutral-800 sm:min-h-0 sm:text-lg ${
                            empty
                                ? ""
                                : "transition-colors group-hover:text-cobalt-600"
                        }`}
                    >
                        {directory.cardTitle}
                    </h4>
                    {empty ? (
                        /* Short on phones so the caption stays on one line
                           and this card matches its neighbours' height. */
                        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                            <span className="sm:hidden">No list this year</span>
                            <span className="hidden sm:inline">
                                No programs listed this year
                            </span>
                        </p>
                    ) : (
                        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                            <span className="sm:hidden">
                                {countLabel(programCount, year, true)}
                            </span>
                            <span className="hidden sm:inline">
                                {countLabel(programCount, year, false)}
                            </span>
                        </p>
                    )}
                </div>
                {!empty && (
                    <HiOutlineArrowRight
                        aria-hidden
                        className="mb-1 h-5 w-5 shrink-0 text-cobalt-500 transition-transform group-hover:translate-x-1"
                    />
                )}
            </div>
        </>
    );

    if (empty) {
        return <div className={frame}>{body}</div>;
    }

    return (
        <Link
            href={`/top-rated-providers-programs/${directory.id}`}
            className={`group transition-all hover:-translate-y-0.5 hover:border-cobalt-200 hover:shadow-lg hover:shadow-cobalt-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2 ${frame}`}
        >
            {body}
        </Link>
    );
}
