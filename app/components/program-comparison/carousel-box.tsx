"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";
import type { Ad } from "./types";

function SliderNav({ sliderRef }: { sliderRef: React.RefObject<Slider | null> }) {
    return (
        <div className="hidden gap-2 text-xs lg:flex">
            <button
                aria-label="Previous Slide"
                className="focus:border-cobalt-300 focus:ring-primary-100 flex h-6 w-6 items-center justify-center rounded-full border hover:bg-slate-50 focus:outline-none focus:ring-2"
                onClick={() => sliderRef.current?.slickPrev()}
            >
                <FaChevronLeft />
            </button>
            <button
                aria-label="Next Slide"
                className="focus:border-cobalt-300 focus:ring-primary-100 flex h-6 w-6 items-center justify-center rounded-full border hover:bg-slate-50 focus:outline-none focus:ring-2"
                onClick={() => sliderRef.current?.slickNext()}
            >
                <FaChevronRight />
            </button>
        </div>
    );
}

function Card({
    program,
    isPrio = false,
    isLastIndex,
    isSr = false,
}: {
    program: Ad;
    isPrio?: boolean;
    isLastIndex?: boolean;
    isSr?: boolean;
}) {
    return (
        <div
            className={`relative flex min-w-[300px] max-w-[300px] shrink-0 flex-col items-start justify-start overflow-hidden rounded-md border border-slate-200 ${
                // Search results give the filter rail its column, so the cards
                // are narrower there than on the full-width directory.
                isSr ? "lg:max-w-[322.66px]" : "lg:max-w-[404.22px]"
            } ${isLastIndex ? "mr-4" : ""}`}
        >
            <Image
                priority={isPrio}
                loading={isPrio ? "eager" : "lazy"}
                src={program.image}
                width={402}
                height={200}
                alt={program.imageAlt}
                className="h-[200px] w-full object-cover"
            />

            <div className="flex w-full flex-col items-start px-4 py-6 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="shrink-0 rounded-md bg-slate-100 p-1.5">
                        <Image
                            src={program.providerLogo}
                            width={48}
                            height={48}
                            alt={`${program.providerName} Logo`}
                            className="object-cover"
                        />
                    </div>

                    <Link
                        href={program.url}
                        target="_blank"
                        rel="nofollow noopener sponsored"
                        className="text-cobalt-500 hover:text-cobalt-600 line-clamp-3 text-left text-sm font-bold leading-tight transition-all duration-300 hover:translate-y-[-2px]"
                    >
                        {program.callToActionText}
                    </Link>
                </div>

                <Link
                    href={program.url}
                    target="_blank"
                    rel="nofollow noopener sponsored"
                    className="bg-cobalt-500 hover:bg-cobalt-600 focus:bg-cobalt-600 focus:ring-primary-200 group mt-6 flex w-full items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-white transition-all duration-300 focus:outline-none focus:ring-4"
                >
                    <span className="text-sm font-bold">Visit Website</span>
                    <FaExternalLinkAlt className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}

interface CarouselBoxProps {
    h2: string;
    ads: Ad[];
    isPrio?: boolean;
    /** Search results run the carousel inside the results column, not the page. */
    isSr?: boolean;
}

/** Headline-photo and premier-feature carousels — three cards per view. */
export default function CarouselBox({
    h2,
    ads,
    isPrio = false,
    isSr = false,
}: CarouselBoxProps) {
    const itemsView = 3;
    const sliderRef = useRef<Slider>(null);
    const sliderSettings = {
        dots: false,
        infinite: ads.length > itemsView,
        speed: 1000,
        slidesToShow: itemsView,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
    };

    if (!ads.length) return null;

    return (
        <div className="flex w-full flex-col gap-4 pl-4 lg:pl-0">
            <div className="flex w-full justify-between gap-4 pr-4 md:flex md:flex-row md:justify-end md:pr-0 lg:items-center">
                <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                    <h2 className="flex w-full items-center justify-between gap-2 text-2xl font-bold">
                        {h2}
                    </h2>
                </div>
                {ads.length > 3 && <SliderNav sliderRef={sliderRef} />}
            </div>

            <div className="flex w-full overflow-x-scroll lg:hidden">
                <div className="flex w-full gap-4">
                    {ads.map((program, index) => (
                        <Card
                            key={`headline-${program.id}`}
                            program={program}
                            isPrio={isPrio && index === 0}
                            isLastIndex={index === ads.length - 1}
                        />
                    ))}
                </div>
            </div>
            <div
                className={`hidden flex-col lg:flex ${
                    // The directory gets the fixed page-wide track; on search
                    // results it has to fit the column beside the filters.
                    isSr ? "w-full" : "w-[1314px]"
                }`}
            >
                <div className="flex w-full gap-4">
                    {ads.length > 3 && (
                        <Slider ref={sliderRef} {...sliderSettings} className="w-full">
                            {ads.map((program) => (
                                <Card
                                    key={`headline-${program.id}`}
                                    program={program}
                                    isSr={isSr}
                                />
                            ))}
                        </Slider>
                    )}
                    {ads.length <= 3 &&
                        ads.map((program) => (
                            <Card
                                key={`headline-${program.id}`}
                                program={program}
                                isSr={isSr}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
