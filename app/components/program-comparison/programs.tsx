"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProgramCard from "./program-card";
import CompareSectionBar, { CompareHint } from "./compare/compare-bar";
import {
    featuredProgram,
    moreSearchResults,
    searchResults,
    searchResultsCount,
} from "./search-results-data";

/**
 * The results grid. Production pages through the API on Load More; the
 * prototype ships the next page of results and reveals them on click.
 */
export default function Programs({ h2 }: { h2?: string }) {
    const [programs, setPrograms] = useState(searchResults);
    const [isLoading, setIsLoading] = useState(false);

    const matchedCount = programs.reduce(
        (current, program) => current + (program.matchedProgramsCount || 1),
        0,
    );
    const canLoadMore =
        matchedCount < searchResultsCount && programs.length < searchResults.length + moreSearchResults.length;

    const loadMore = () => {
        setIsLoading(true);
        // Mimic the network hop so the loading state is visible.
        setTimeout(() => {
            setPrograms((prev) => [...prev, ...moreSearchResults]);
            setIsLoading(false);
        }, 600);
    };

    return (
        <div id="programs" className="flex flex-col gap-4 px-4 lg:px-0">
            {h2 && (
                <h2 className="flex items-center gap-2 text-2xl font-bold">{h2}</h2>
            )}
            <CompareSectionBar hideOnDesktop />
            <div className="xs:grid-cols-1 grid w-full gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
                <ProgramCard listing={featuredProgram} isFeatured />
                {programs.map((listing, index) => (
                    <ProgramCard key={`listing-${index}`} listing={listing} />
                ))}
            </div>
            {canLoadMore && (
                <div className="flex justify-center">
                    {isLoading ? (
                        <div className="flex w-[250px] cursor-not-allowed justify-center rounded-md bg-red-300 py-3 text-sm font-bold text-white">
                            <div className="flex justify-center gap-2">
                                <span className="w-fit">Loading</span>
                                <AiOutlineLoading3Quarters className="my-auto w-fit animate-spin" />
                            </div>
                        </div>
                    ) : (
                        <button
                            className="bg-roman-500 h-10 w-[250px] rounded-md text-sm font-bold text-white hover:bg-red-500 focus:bg-red-500 focus:ring-4 focus:ring-red-200"
                            onClick={loadMore}
                            disabled={isLoading}
                        >
                            Load More
                        </button>
                    )}
                </div>
            )}
            <CompareHint placement="bottom" />
        </div>
    );
}
