import Image from "next/image";
import { HiCheckBadge, HiOutlineArrowRight, HiOutlineMapPin } from "react-icons/hi2";
import { logoUrl, photoUrl, programUrl } from "./cdn";
import StarRating from "./rating";
import type { TopRatedProgram } from "./types";

/* A Top Rated Program on a directory page. The title is an H2, as the
   requirements doc specifies for these cards. */
export default function ProgramCard({
    program,
    year,
    priority = false,
}: {
    program: TopRatedProgram;
    year: number;
    priority?: boolean;
}) {
    const href = programUrl(program);
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg hover:shadow-cobalt-500/10">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                {program.photo ? (
                    <Image
                        src={photoUrl(program.photo.path, 640, 360)}
                        alt={program.photo.alt}
                        fill
                        priority={priority}
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div
                        aria-hidden
                        className="h-full w-full bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500"
                    />
                )}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-sun-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    <HiCheckBadge aria-hidden className="h-4 w-4" />
                    Top Rated {year}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2.5">
                    {program.providerLogo ? (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white">
                            <Image
                                src={logoUrl(program.providerLogo)}
                                alt=""
                                width={36}
                                height={36}
                                className="h-full w-full object-contain"
                            />
                        </span>
                    ) : null}
                    <p className="text-sm font-bold text-slate-700">
                        {program.providerName}
                    </p>
                </div>
                <h2 className="text-lg leading-snug font-bold text-cobalt-500 transition-colors group-hover:text-cobalt-600">
                    <a href={href} target="_blank" rel="noopener">
                        {program.title}
                    </a>
                </h2>
                <StarRating rating={program.rating} reviews={program.reviews} />
                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                    <HiOutlineMapPin aria-hidden className="h-4 w-4 shrink-0" />
                    {program.destination}
                </p>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cobalt-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cobalt-600"
                >
                    View Program
                    <HiOutlineArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                </a>
            </div>
        </article>
    );
}
