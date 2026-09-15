import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    directories,
    directoryMeta,
    getDirectory,
    programArchiveYears,
    year,
} from "../../../components/top-rated/data";
import DirectoryPageView from "../../../components/top-rated/directory-page";

type Params = { directory: string; year: string };

export const dynamicParams = false;

/* One page per directory per archived year. */
export function generateStaticParams(): Params[] {
    return directories.flatMap((directory) =>
        programArchiveYears.map((y) => ({
            directory: directory.id,
            year: String(y),
        })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { directory: id, year: y } = await params;
    const directory = getDirectory(id);
    const listYear = Number(y);
    if (!directory || !programArchiveYears.includes(listYear)) return {};
    return {
        // "Top Rated Study Abroad Programs of 2024 | GoAbroad Reviews & Rankings"
        title: directoryMeta
            .title(directory)
            .replace(" Programs |", ` Programs of ${listYear} |`),
        description: directoryMeta
            .description(directory)
            .replace(String(year), String(listYear)),
    };
}

/* A previous year's Top Rated Programs for one directory — the requirement
   added after the doc ("page/links of previous year of per directory top
   rated programs"). Same layout as the current list, with a notice pointing
   back to it. The programs are dummy data, so they match the current list. */
export default async function TopRatedDirectoryArchivePage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { directory: id, year: y } = await params;
    const directory = getDirectory(id);
    const listYear = Number(y);
    if (!directory || !programArchiveYears.includes(listYear)) notFound();
    return <DirectoryPageView directory={directory} listYear={listYear} />;
}
