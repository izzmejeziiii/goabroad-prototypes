"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { IoMdOpen, IoMdStar } from "react-icons/io";
import { PiCaretDownBold } from "react-icons/pi";
import type { ProgramResult } from "./types";
import { useCompare } from "./compare/compare-context";
import CompareControl from "./compare/compare-control";

/** Flattened for the comparison table; ids are namespaced by page. */
const toComparable = (listing: ProgramResult) => ({
    id: `search-results-${listing.id}`,
    title: listing.title,
    providerName: listing.providerName,
    providerLogo: listing.providerLogo,
    image: listing.image,
    imageAlt: listing.imageAlt,
    rating: listing.averageRating,
    reviewsCount: listing.reviewsCount,
    isVerified: listing.isVerified,
    description: listing.description,
    programUrl: listing.programUrl,
    webUrl: listing.webUrl,
    matchedProgramsCount: listing.matchedProgramsCount,
    sourceLabel: "Search results — Japan",
});

interface ProgramCardProps {
    listing: ProgramResult;
    isFeatured?: boolean;
    isPrio?: boolean;
}

/** A search result: provider photo, rating row, blurb, and the two CTAs. */
export default function ProgramCard({
    listing,
    isFeatured = false,
    isPrio = false,
}: ProgramCardProps) {
    const [saved, setSaved] = useState(false);
    const { version, compareMode, isSelected, isFull, toggle } = useCompare();
    const program = toComparable(listing);
    const selected = isSelected(program.id);
    // V1 turns the whole card into a selector while compare mode is on.
    const selectable = version === "v1" && compareMode;
    const webUrl = listing.webUrl;
    const hasImage = !!listing.image;

    const providerHeader = (
        <div className="flex items-center gap-2 pb-2">
            {!!listing.providerLogo && (
                <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-50 shadow-sm">
                    <Image
                        priority={isPrio}
                        loading={isPrio ? "eager" : "lazy"}
                        className="h-full w-full rounded-lg object-cover"
                        src={listing.providerLogo}
                        alt={`${listing.providerName} logo`}
                        width={48}
                        height={48}
                    />
                </div>
            )}

            <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-slate-700">
                    {listing.providerName}
                </p>
                <div className="flex flex-row items-center space-x-1.5">
                    <h4 className="text-xs font-semibold">{listing.averageRating}</h4>
                    <IoMdStar className="text-sun-500 h-4 w-4 text-base" />
                    <p className="text-xs">{listing.reviewsCount}</p>
                    {listing.isVerified && (
                        <FaCheckCircle className="text-fern-500 h-4 w-4" />
                    )}
                </div>
            </div>

            {!!listing.topRatedBadge && (
                <div className="group relative flex h-12 w-12 shrink-0 items-center justify-center overflow-visible rounded-md bg-white shadow-md">
                    <span className="rounded-3 invisible absolute -top-10 right-0 h-auto min-w-max place-self-center self-center bg-black p-2 text-center text-xs font-semibold text-white opacity-90 transition-opacity group-hover:visible">
                        {listing.topRatedBadge.name}
                    </span>
                    <Image
                        className="ml-auto h-12"
                        src={listing.topRatedBadge.badge}
                        alt={listing.topRatedBadge.name}
                        width={48}
                        height={48}
                    />
                </div>
            )}
        </div>
    );

    const seeAllPrograms = !isFeatured && listing.matchedProgramsCount > 1 && (
        <Link
            href={listing.providerUrl}
            className="hover:text-cobalt-600 text-cobalt-500 focus:text-cobalt-600 my-2 flex items-center gap-2 text-xs font-bold underline"
        >
            See All {listing.matchedProgramsCount} Programs
            <PiCaretDownBold className="-rotate-90 transform" />
        </Link>
    );

    return (
        <div
            className={clsx(
                "relative flex h-full flex-1 flex-col overflow-visible rounded-md border transition-all duration-300",
                selected
                    ? "border-cobalt-500 ring-cobalt-500/40 ring-2"
                    : "border-slate-200",
                selectable && (selected || !isFull)
                    ? "cursor-pointer"
                    : selectable && "cursor-not-allowed",
            )}
            onClick={selectable ? () => toggle(program) : undefined}
        >
            <CompareControl program={program} />
            {/* Save button — hidden while the compare checkbox owns this corner */}
            <div
                className={clsx(
                    "z-sky group absolute right-1 top-1 h-7 w-7",
                    selectable && "hidden",
                )}
            >
                <button
                    aria-label="Save Program"
                    className="group relative h-7 w-7 cursor-pointer border-none bg-inherit active:scale-100"
                    onClick={() => setSaved((prev) => !prev)}
                >
                    {saved ? (
                        <HiHeart className="absolute left-0 top-0 h-7 w-7 text-red-500 transition-all duration-300" />
                    ) : (
                        <>
                            <HiHeart className="absolute left-0 top-0 h-7 w-7 text-slate-800 transition-all duration-300 group-hover:opacity-100 lg:group-hover:text-red-500" />
                            <HiOutlineHeart className="absolute left-0 top-0 h-7 w-7 text-slate-100 transition-all duration-300 group-hover:text-slate-200" />
                        </>
                    )}
                </button>
                <span className="absolute right-11 top-2 hidden w-max rounded-sm bg-neutral-800/90 p-2 text-center text-xs text-white hover:block group-hover:block">
                    Save this program
                </span>
            </div>

            {/* Featured badge */}
            {isFeatured && (
                <div className="bg-sun-500 z-ground absolute left-2 top-2 rounded-md px-5 py-1.5 text-xs font-bold text-white">
                    <span>Featured</span>
                </div>
            )}

            <div
                className={clsx(
                    "flex h-full flex-col space-y-2 no-underline",
                    selectable && "pointer-events-none",
                )}
            >
                {hasImage ? (
                    <>
                        <div className="h-50 relative">
                            <Image
                                priority={isPrio}
                                loading={isPrio ? "eager" : "lazy"}
                                src={listing.mobileImage}
                                className="h-full w-full rounded-t-md object-cover md:hidden"
                                alt={listing.imageAlt}
                                width={474}
                                height={200}
                            />
                            <Image
                                priority={isPrio}
                                loading={isPrio ? "eager" : "lazy"}
                                src={listing.image}
                                className="hidden h-full w-full rounded-t-md object-cover md:block"
                                alt={listing.imageAlt}
                                width={474}
                                height={200}
                            />
                        </div>
                        <div className="flex w-full grow flex-col justify-between gap-2 px-4 py-2 transition-all duration-300">
                            {providerHeader}
                            <Link
                                href={listing.programUrl}
                                className="text-cobalt-500 hover:text-cobalt-600 line-clamp-2 text-left text-lg font-bold leading-6 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {listing.title}
                            </Link>
                            <p className="line-clamp-3 grow text-sm leading-4 text-slate-700">
                                {listing.description}
                            </p>
                            {seeAllPrograms}
                        </div>
                    </>
                ) : (
                    // Layout without image - content-focused
                    <div className="mt-12 flex w-full grow flex-col justify-between gap-3 px-4 pb-6 pt-6 transition-all duration-300">
                        {providerHeader}
                        <div className="flex grow flex-col gap-3">
                            <Link
                                href={listing.programUrl}
                                className="text-cobalt-500 hover:text-cobalt-600 line-clamp-2 text-left text-lg font-bold leading-6 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {listing.title}
                            </Link>
                            <p className="line-clamp-4 text-sm leading-5 text-slate-700">
                                {listing.description}
                            </p>
                            {seeAllPrograms}
                        </div>
                    </div>
                )}

                {/* Action buttons - consistent for both layouts */}
                <div
                    className={clsx("w-full gap-4 px-4 pb-4", {
                        "grid grid-cols-2": !!webUrl,
                    })}
                >
                    {!!webUrl && (
                        <Link
                            href={webUrl}
                            className="bg-cobalt-500 hover:bg-cobalt-600 focus:ring-primary-200 focus:bg-cobalt-600 group flex h-10 w-full items-center justify-center gap-1.5 rounded-md px-4 text-center text-white transition-all duration-300 focus:outline-none focus:ring-4 sm:px-3"
                            rel="sponsored noopener noreferrer"
                            target="_blank"
                        >
                            <span className="text-xs font-bold md:text-xs">
                                Visit Website
                            </span>
                            <IoMdOpen className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-1" />
                        </Link>
                    )}
                    <Link
                        href={listing.programUrl}
                        className="border-cobalt-500 text-cobalt-500 hover:border-cobalt-600 hover:text-cobalt-600 focus:text-cobalt-600 focus:border-cobalt-600 focus:ring-primary-200 group flex h-10 w-full items-center justify-center gap-1.5 rounded-md border bg-white transition-all duration-300 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none focus:ring-4"
                    >
                        <span className="text-xs font-bold md:text-xs">
                            View Program
                        </span>
                        <FaArrowRight className="h-3 w-3 transition-all duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
