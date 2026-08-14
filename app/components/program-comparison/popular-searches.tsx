import type { PopularSearchGroup } from "./types";

const PopularSearchesCard = ({ group }: { group: PopularSearchGroup }) => (
    <div className="flex min-w-[185px] flex-col items-start gap-4 rounded-lg border border-solid border-neutral-200 bg-slate-100 p-4">
        <span className="bg-cobalt-500 rounded-full px-2 py-1 text-center text-xs uppercase text-white">
            {group.caption}
        </span>
        <div className="flex w-full flex-col">
            {group.items.map((item, i) => (
                <a
                    href={item.link}
                    key={`popular-searches-${i}`}
                    className="hover:text-cobalt-500 inline-flex min-h-[24px] min-w-[24px] items-center px-2 py-1 text-sm text-neutral-800 no-underline"
                >
                    {item.name}
                </a>
            ))}
        </div>
    </div>
);

// Mobile swaps regions and program types, matching the production markup.
const mobileOrder = ["LOCATIONS", "PROGRAM TYPES", "REGIONS", "TIMING", "TRENDING"];

export default function PopularSearches({
    groups: popularSearches,
}: {
    groups: PopularSearchGroup[];
}) {
    const mobileGroups = [...popularSearches].sort(
        (a, b) => mobileOrder.indexOf(a.caption) - mobileOrder.indexOf(b.caption),
    );

    return (
        <div className="flex w-full flex-col gap-4 px-4 lg:px-0">
            <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                    Popular Searches
                </h2>
            </div>

            <div className="hidden w-full overflow-x-auto md:flex">
                <div className="flex w-full gap-4 text-sm lg:grid lg:grid-cols-5">
                    {popularSearches.map((group) => (
                        <PopularSearchesCard key={group.caption} group={group} />
                    ))}
                </div>
            </div>
            <div className="w-full overflow-x-auto md:hidden">
                <div className="flex w-full gap-4 text-sm lg:grid lg:grid-cols-5">
                    {mobileGroups.map((group) => (
                        <PopularSearchesCard key={group.caption} group={group} />
                    ))}
                </div>
            </div>
        </div>
    );
}
