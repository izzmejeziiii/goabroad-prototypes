"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import SearchBar from "./search-bar";
import { breadcrumbs, pageMeta, searchFilters } from "./data";

function Breadcrumbs() {
    return (
        <div className="flex w-fit justify-center px-4 xl:px-0">
            <ul className="flex w-full max-w-7xl items-center gap-2 py-4 text-xs uppercase text-white">
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                        <li>
                            <Link
                                href={breadcrumb.link}
                                className={clsx(
                                    "focus:outline-primary-100 hover:outline-primary-100 rounded-sm hover:outline focus:outline",
                                    {
                                        "font-bold": index !== breadcrumbs.length - 1,
                                        "text-cobalt-200":
                                            index !== breadcrumbs.length - 1,
                                    },
                                )}
                            >
                                {breadcrumb.label}
                            </Link>
                        </li>
                        {index !== breadcrumbs.length - 1 && (
                            <FaChevronRight className="text-xs" />
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

/** Saving needs an account on production; here the heart is purely visual. */
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

export default function HeroSection() {
    return (
        <section className="to-cobalt-600 relative flex w-full flex-col items-center justify-between gap-4 bg-linear-to-r from-[#11163B] pb-8 text-white lg:gap-8 lg:pt-4 xl:h-[400px]">
            <div className="relative flex w-full max-w-7xl justify-between">
                <Breadcrumbs />
                <SaveSearchButton />
            </div>
            <div className="relative mt-8 flex w-full max-w-7xl items-center justify-start gap-8 lg:mt-0 lg:justify-start">
                <div className="flex w-full flex-col gap-4 p-4 lg:py-0 xl:p-0">
                    <h1 className="text-3xl font-semibold md:text-5xl">
                        {pageMeta.h1}
                    </h1>
                    <p className="max-w-[500px] text-sm">{pageMeta.explainerText}</p>
                </div>
                <Image
                    src="https://images.goabroad.com/image/upload/v1757483619/images2/directory/final-hero.png"
                    alt=""
                    width={600}
                    height={122}
                    className="hidden lg:block"
                />
            </div>
            <SearchBar
                searchFilters={searchFilters}
                isDirectory
                resultsHref="/program-comparison/search-results"
            />
        </section>
    );
}
