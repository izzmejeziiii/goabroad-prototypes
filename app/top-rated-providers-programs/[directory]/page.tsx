import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    directories,
    directoryMeta,
    getDirectory,
    year,
} from "../../components/top-rated/data";
import DirectoryPageView from "../../components/top-rated/directory-page";

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

/* One directory's current Top Rated Programs: the doc's summary copy, then
   the program cards from the admin's list (dummy data here), then links to
   the previous years' lists. The layout lives in `DirectoryPageView`, shared
   with the archived years at /<directory>/<year>. */
export default async function TopRatedDirectoryPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { directory: id } = await params;
    const directory = getDirectory(id);
    if (!directory) notFound();
    return <DirectoryPageView directory={directory} listYear={year} />;
}
