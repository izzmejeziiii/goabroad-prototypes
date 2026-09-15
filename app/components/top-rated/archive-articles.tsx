import Image from "next/image";
import { photoUrl } from "./cdn";
import type { YearLink } from "./types";

const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
});

/* One previous year's announcement, drawn as goabroad.com draws an article
   card: the cover photo, the title in bold, and a footer with the author on
   the left and the publish date on the right — minus the live card's save
   button and topic badge (Jezi: "use the article card design from the live
   page but without the save button and the badge"). The whole card is the
   link. Falls back to the year alone when an article has no author or
   date on record. */
export default function ArchiveCard({ link }: { link: YearLink }) {
    const year = link.label.match(/\d{4}$/)?.[0] ?? "";
    const date = link.date ? dateFormat.format(new Date(link.date)) : year;
    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener"
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cobalt-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2"
        >
            <span className="relative block aspect-[2/1] w-full overflow-hidden bg-slate-100">
                {link.image ? (
                    <Image
                        src={photoUrl(link.image, 800, 400)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 72vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <span
                        aria-hidden
                        className="flex h-full w-full items-center justify-center bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500 text-4xl font-bold text-white/80"
                    >
                        {year}
                    </span>
                )}
            </span>
            <span className="flex flex-1 flex-col p-6">
                <span className="text-xl leading-snug font-bold text-neutral-900 transition-colors group-hover:text-cobalt-600">
                    {link.label}
                </span>
                <span className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-6 text-sm text-slate-600">
                    <span>{link.author ?? "GoAbroad"}</span>
                    <span>{date}</span>
                </span>
            </span>
        </a>
    );
}
