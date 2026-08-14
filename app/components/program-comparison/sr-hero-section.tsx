"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import SearchBar from "./search-bar";
import { FilterGroups, type FilterSelection } from "./advanced-filters";
import { breadcrumbs, pageMeta, searchFilters } from "./search-results-data";
import type { Breadcrumb } from "./types";

function HeroBreadcrumbs({
    breadcrumbs,
    additionalClass,
    isMobile = false,
}: {
    breadcrumbs: Breadcrumb[];
    additionalClass?: string;
    isMobile?: boolean;
}) {
    return (
        <div
            className={`flex w-full justify-center px-4 xl:px-0 ${additionalClass}`}
        >
            <ul className="flex w-full max-w-7xl flex-wrap items-center gap-2 py-4 pr-10 text-xs uppercase text-white">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={`breadcrumb-${index}`} className="flex items-center gap-2">
                        {index !== breadcrumbs.length - 1 && (
                            <>
                                <a
                                    href={breadcrumb.link}
                                    className="text-cobalt-200 focus:ring-primary-100 hover:ring-primary-100 rounded-sm font-bold hover:ring-3 focus:ring-3"
                                >
                                    {breadcrumb.label}
                                </a>
                                <FaChevronRight className="text-xs" />
                            </>
                        )}
                        {index === breadcrumbs.length - 1 && !isMobile && (
                            <span>{breadcrumb.label}</span>
                        )}
                        {index === breadcrumbs.length - 1 && isMobile && (
                            <a
                                href={breadcrumb.link}
                                className="text-cobalt-200 font-bold"
                            >
                                {breadcrumb.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** Saving a search needs an account on production; here the heart is visual. */
function SaveSearchButton() {
    const [saved, setSaved] = useState(false);

    return (
        <div className="group flex h-9 w-9 items-center justify-center">
            <button
                aria-label="Save Search"
                className="focus:outline-primary-100 relative h-8 w-8 shrink-0 transition-transform duration-300 focus:outline"
                onClick={() => setSaved((prev) => !prev)}
            >
                {saved ? (
                    <FaHeart className="h-8 w-8 text-red-500" />
                ) : (
                    <>
                        <FaHeart className="absolute left-0 top-0 h-8 w-8 text-slate-800 group-hover:text-red-400 group-hover:opacity-100" />
                        <FaRegHeart className="absolute left-0 top-0 h-8 w-8 text-white group-hover:opacity-0" />
                    </>
                )}
            </button>
            {!saved && (
                <span className="z-outerverse group absolute right-14 top-0 hidden w-[130px] rounded-md bg-neutral-800/90 p-2 text-center text-sm text-white hover:block lg:group-hover:block">
                    Save this search
                </span>
            )}
        </div>
    );
}

export default function SearchResultsHero({
    filterState,
}: {
    filterState: FilterSelection;
}) {
    const breadCrumbsMobile = breadcrumbs.slice(0, breadcrumbs.length - 1);

    return (
        <section className="to-cobalt-600 bg-linear-to-r relative flex w-full flex-col items-center justify-start gap-4 from-[#11163B] pb-8 text-white lg:gap-8 lg:pt-4 xl:min-h-[400px]">
            <div className="relative flex w-full max-w-7xl">
                <HeroBreadcrumbs
                    additionalClass="hidden md:flex"
                    breadcrumbs={breadcrumbs}
                />
                <HeroBreadcrumbs
                    additionalClass="flex md:hidden"
                    isMobile
                    breadcrumbs={breadCrumbsMobile}
                />
                <div className="absolute right-1 top-1 md:top-0">
                    <SaveSearchButton />
                </div>
            </div>
            <div className="relative mt-8 flex w-full max-w-7xl items-center justify-start gap-8 lg:mt-0 lg:justify-start">
                <div className="flex w-full flex-col gap-4 p-4 lg:py-0 xl:p-0">
                    <h1 className="text-3xl font-semibold md:text-5xl">
                        {pageMeta.h1}
                    </h1>
                </div>
                <Image
                    src="https://images.goabroad.com/image/upload/v1757483619/images2/directory/final-hero.png"
                    alt=""
                    width={600}
                    height={122}
                    className="hidden lg:block"
                    priority
                />
            </div>
            <SearchBar
                searchFilters={searchFilters}
                advancedFilterCount={filterState.totalCount}
                advancedFilters={
                    <div className="flex flex-col gap-2 lg:col-span-4">
                        <FilterGroups state={filterState} isMobile />
                    </div>
                }
            />
        </section>
    );
}
