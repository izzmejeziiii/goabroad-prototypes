"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { PremierAd } from "./types";

const PremierCard = ({ listing }: { listing: PremierAd }) => (
    <div className="relative flex flex-col">
        <Link
            href={listing.url}
            className="group flex gap-4"
            target="_blank"
            rel="noopener sponsored nofollow"
        >
            <div className="relative h-[100px] w-[100px] shrink-0 rounded-t-md">
                <Image
                    src={listing.image}
                    className="h-full w-full rounded-md object-cover"
                    alt={listing.imageAlt}
                    width={100}
                    height={100}
                />
            </div>

            <div className="flex flex-col rounded-b-md">
                <div className="mt-2 flex items-center gap-2">
                    <p className="group-hover:text-cobalt-500 text-base font-bold">
                        {listing.providerName}
                    </p>
                </div>
                <p className="mb-4 mt-2 text-sm">{listing.displayedText}</p>
            </div>
        </Link>
    </div>
);

export default function PremierSponsorship({
    listings,
    isWithFaqs,
}: {
    listings: PremierAd[];
    isWithFaqs: boolean;
}) {
    const [page, setPage] = useState(0);
    const maxPage = 3;
    const currentIndex = page * maxPage;
    const visible = listings.slice(currentIndex, currentIndex + maxPage);

    return (
        <div className="flex flex-col gap-4 px-4 lg:min-w-[357.828px] lg:px-0">
            <div className="flex w-full justify-between gap-4 md:flex-row md:justify-between lg:items-center">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        Popular Providers
                    </h2>
                </div>
                {listings.length > maxPage && (
                    <div className="flex gap-2 text-xs">
                        <button
                            aria-label="Previous Slide"
                            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                                page === 0
                                    ? "cursor-not-allowed text-gray-400"
                                    : "focus:border-cobalt-300 focus:ring-primary-100 hover:bg-slate-50 focus:outline-none focus:ring-2"
                            } `}
                            onClick={() => page !== 0 && setPage(page - 1)}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            aria-label="Next Slide"
                            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                                currentIndex + maxPage < listings.length
                                    ? "focus:border-cobalt-300 focus:ring-primary-100 hover:bg-slate-50 focus:outline-none focus:ring-2"
                                    : "cursor-not-allowed text-gray-400"
                            } `}
                            onClick={() =>
                                currentIndex + maxPage < listings.length &&
                                setPage(page + 1)
                            }
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
            <div
                className={clsx("grid grid-cols-1 gap-4", {
                    "md:grid-cols-2": !isWithFaqs,
                })}
            >
                {visible.map((listing, index) => (
                    <PremierCard key={`listing-${index}`} listing={listing} />
                ))}
            </div>
        </div>
    );
}
