import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import Breadcrumbs from "../../components/reusable/breadcrumbs";
import { photoUrl } from "../../components/top-rated/cdn";
import {
    directories,
    directoryMeta,
    getDirectory,
    pageTitle,
    topRatedPrograms,
    year,
} from "../../components/top-rated/data";
import { DirectoryIcon } from "../../components/top-rated/icons";
import NextSteps from "../../components/top-rated/next-steps";
import ProgramCard from "../../components/top-rated/program-card";
import SectionHead from "../../components/top-rated/section-head";

type Params = { directory: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
    return directories.map((directory) => ({ directory: directory.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { directory: id } = await params;
    const directory = getDirectory(id);
    if (!directory) return {};
    return {
        title: directoryMeta.title(directory),
        description: directoryMeta.description(directory),
    };
}

/* One directory's Top Rated Programs: the doc's summary copy, then the
   program cards from the admin's list (dummy data here). */
export default async function TopRatedDirectoryPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { directory: id } = await params;
    const directory = getDirectory(id);
    if (!directory) notFound();

    const programs = topRatedPrograms[directory.id];
    const [lead, ...rest] = directory.summary;
    const others = directories.filter((d) => d.id !== directory.id);

    return (
        <div className="w-full bg-white">
            <header className="w-full overflow-hidden bg-slate-100">
                <Breadcrumbs
                    parent={{
                        link: "top-rated-providers-programs",
                        page: "Top Rated Providers & Programs",
                    }}
                    link={`top-rated-providers-programs/${directory.id}`}
                    page={directory.cardTitle}
                />
                <div className="mx-auto max-w-7xl px-4 xl:px-0">
                    <div className="flex flex-col-reverse md:flex-row md:items-stretch">
                        <div className="flex flex-1 flex-col items-start pt-6 pb-10 text-left md:justify-center md:py-12 md:pr-12">
                            <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-cobalt-500">
                                <DirectoryIcon
                                    name={directory.icon}
                                    className="h-5 w-5"
                                />
                                Top Rated Programs · {year}
                            </p>
                            <h1 className="text-4xl leading-tight font-bold text-neutral-900 lg:text-5xl">
                                {directory.pageTitle}
                            </h1>
                            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                                {lead}
                            </p>
                        </div>
                        <div className="w-full shrink-0 pt-6 md:w-[45%] md:self-stretch md:py-8">
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg md:aspect-auto md:h-full md:min-h-[360px]">
                                <Image
                                    src={photoUrl(directory.photo.path, 1100, 760)}
                                    alt={directory.photo.alt}
                                    fill
                                    priority
                                    sizes="(min-width: 768px) 45vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* The rest of the summary. The doc's closing line ("Ready to…?")
                is a one-sentence lead into the cards, so it gets the weight of
                a sub-lead rather than another body paragraph. */}
            <section className="w-full bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 md:py-16 xl:px-0">
                    <div className="max-w-3xl">
                        {rest.map((paragraph, i) => {
                            const isClosing =
                                i === rest.length - 1 && paragraph.length < 120;
                            return (
                                <p
                                    key={i}
                                    className={
                                        isClosing
                                            ? "mt-8 text-xl font-semibold text-neutral-800"
                                            : `${i > 0 ? "mt-4" : ""} text-lg leading-relaxed text-slate-600`
                                    }
                                >
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Program cards — H2s, per the doc. */}
            <section className="w-full bg-slate-100">
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0">
                    <p className="text-sm font-semibold tracking-widest uppercase text-cobalt-500">
                        Top Rated {directory.cardTitle} Programs of {year}
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
                        {programs.length}{" "}
                        {programs.length === 1 ? "program" : "programs"} earned
                        the badge this year
                    </p>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program, i) => (
                            <ProgramCard
                                key={program.id}
                                program={program}
                                year={year}
                                priority={i < 3}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* The other ten directories, so the reader can hop across lists
                without going back up to the main page. */}
            <section className="w-full bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 xl:px-0">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <SectionHead
                                kicker="More Top Rated Programs"
                                title="Explore other categories"
                            />
                        </div>
                        <Link
                            href="/top-rated-providers-programs"
                            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-cobalt-500 transition-colors hover:text-cobalt-600"
                        >
                            <HiOutlineArrowLeft aria-hidden className="h-4 w-4" />
                            All {pageTitle.replace("GoAbroad ", "")}
                        </Link>
                    </div>
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {others.map((other) => (
                            <li key={other.id}>
                                <Link
                                    href={`/top-rated-providers-programs/${other.id}`}
                                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all hover:border-cobalt-200 hover:shadow-md hover:shadow-cobalt-500/10"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-cobalt-500">
                                        <DirectoryIcon
                                            name={other.icon}
                                            className="h-5 w-5"
                                        />
                                    </span>
                                    <span className="flex-1 text-sm font-semibold text-neutral-800 transition-colors group-hover:text-cobalt-600">
                                        {other.cardTitle}
                                    </span>
                                    <HiOutlineArrowRight
                                        aria-hidden
                                        className="h-4 w-4 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-cobalt-500"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <NextSteps />
        </div>
    );
}
