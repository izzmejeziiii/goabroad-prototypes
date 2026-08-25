"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
    FaArrowRight,
    FaCheckCircle,
    FaExternalLinkAlt,
    FaHeart,
    FaRegHeart,
    FaStar,
} from "react-icons/fa";
import { featuredPrograms } from "./data";
import type { FeaturedProgram } from "./types";
import { useCompare } from "./compare/compare-context";
import CompareControl from "./compare/compare-control";
import CompareSectionBar, { CompareHint } from "./compare/compare-bar";

/** Flattened for the comparison table; ids are namespaced by page. */
const toComparable = (ad: FeaturedProgram) => ({
    id: `directory-${ad.id}`,
    title: ad.callToActionText,
    providerName: ad.providerName,
    providerLogo: ad.providerLogo,
    image: ad.image,
    imageAlt: ad.imageAlt,
    rating: ad.averageRating,
    reviewsCount: ad.reviewsCount,
    isVerified: ad.isVerified,
    description: ad.description,
    programUrl: ad.programUrl,
    webUrl: ad.webUrl,
    sourceLabel: "Study abroad directory",
});

function FeaturedProgramAd({ ad }: { ad: FeaturedProgram }) {
    const [saved, setSaved] = useState(false);
    const { version, compareMode, isSelected, isFull, toggle } = useCompare();
    const program = toComparable(ad);
    const selected = isSelected(program.id);
    // V1 turns the whole card into a selector while compare mode is on.
    const selectable = version === "v1" && compareMode;

    return (
        <div
            className={clsx(
                "relative flex h-full flex-1 flex-col overflow-hidden rounded-md border shadow-md transition-all duration-300",
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
                    "z-ground absolute right-2 top-1",
                    (selectable || version === "v3") && "hidden",
                )}
            >
                <div className="group relative h-8 w-8">
                    <button
                        onClick={() => setSaved((prev) => !prev)}
                        className="group relative top-1 h-8 w-8 cursor-pointer border-none bg-inherit active:scale-100"
                    >
                        <FaHeart
                            className={clsx(
                                "absolute left-0 top-0 h-7 w-7 transition-all duration-300",
                                {
                                    "text-red-500": saved,
                                    "text-slate-800 transition-all duration-300 group-hover:text-red-400 group-hover:opacity-100":
                                        !saved,
                                },
                            )}
                        />
                        <FaRegHeart
                            className={clsx(
                                "absolute left-0 top-0 h-7 w-7 text-slate-100 group-hover:opacity-0",
                                { "group-hover:text-slate-200": !saved },
                            )}
                        />
                    </button>
                    <div className="text-nowrap absolute right-10 top-1 z-20 hidden w-fit rounded-sm bg-neutral-800/90 p-2 text-center text-xs text-white group-hover:block">
                        Save this program
                    </div>
                </div>
            </div>

            <div
                className={clsx(
                    "flex h-full flex-col space-y-2 no-underline",
                    selectable && "pointer-events-none",
                )}
            >
                <div className="relative h-[200px]">
                    <Image
                        src={ad.image}
                        className="h-full w-full rounded-t-md object-cover"
                        alt={ad.imageAlt}
                        width={404}
                        height={200}
                    />
                </div>

                <div className="flex w-full grow flex-col justify-between gap-2 px-4 py-2 transition-all duration-300">
                    {/* Provider header section */}
                    <div className="flex items-center gap-2 pb-2">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-50 shadow-sm">
                            <Image
                                src={ad.providerLogo}
                                alt={`${ad.providerName} logo`}
                                className="h-full w-full rounded-lg object-cover"
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-slate-700">
                                {ad.providerName}
                            </p>
                            <div className="flex flex-row items-center space-x-1.5">
                                <h4 className="text-xs font-semibold">
                                    {ad.averageRating}
                                </h4>
                                <FaStar className="text-sun-500 h-4 w-4 text-base" />
                                <p className="text-xs">{ad.reviewsCount} reviews</p>
                                {ad.isVerified && (
                                    <FaCheckCircle className="text-fern-500 h-4 w-4" />
                                )}
                            </div>
                        </div>
                    </div>
                    <Link
                        href={ad.webUrl || ad.programUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="text-cobalt-500 hover:text-cobalt-600 line-clamp-2 text-left text-lg font-bold leading-6 transition-all duration-300 hover:translate-y-[-2px]"
                    >
                        {ad.callToActionText}
                    </Link>
                    <p className="line-clamp-3 my-2 text-sm leading-4 text-slate-700">
                        {ad.description}
                    </p>
                </div>

                <div className="flex flex-row gap-4 px-4 pb-4">
                    <Link
                        href={ad.webUrl}
                        rel="sponsored noopener noreferrer"
                        className="bg-cobalt-500 hover:bg-cobalt-600 focus:ring-primary-200 focus:bg-cobalt-600 group flex w-full items-center justify-center gap-1.5 rounded-md px-2.5 py-2.5 text-white transition-all duration-300 focus:outline-none focus:ring-4 md:px-5"
                        target="_blank"
                    >
                        <span className="text-xs font-bold md:text-sm">
                            Visit Website
                        </span>
                        <FaExternalLinkAlt className="h-3 w-3 transition-all duration-300 group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href={ad.programUrl}
                        className="text-cobalt-500 focus:text-cobalt-600 focus:border-cobalt-600 hover:border-cobalt-600 hover:text-cobalt-600 border-cobalt-500 focus:ring-primary-200 group flex w-full items-center justify-center gap-1.5 rounded-md border bg-white px-2.5 py-2.5 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none focus:ring-4 md:px-5"
                    >
                        <span className="text-xs font-bold md:text-sm">
                            View Program
                        </span>
                        <FaArrowRight className="h-3 w-3 transition-all duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function FeaturedProgramAds() {
    return (
        <div id="programs" className="flex flex-col gap-4 px-4 lg:px-0">
            <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between lg:items-center">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        This Month&rsquo;s Recommended Study Abroad Programs
                    </h2>
                </div>
            </div>
            <CompareSectionBar />
            <div className="grid w-full grid-cols-1 gap-8 md:grid lg:grid-cols-3">
                {featuredPrograms.map((program, index) => (
                    <FeaturedProgramAd
                        key={`featured-program-${index}`}
                        ad={program}
                    />
                ))}
            </div>
            {/* No Load More on the directory, so the hint follows the cards. */}
            <CompareHint placement="bottom" />
        </div>
    );
}
