"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";
import { PiCaretDownBold } from "react-icons/pi";
import type { Review } from "./types";

function SliderNav({
    onClickLeft,
    onClickRight,
    disableLeft,
    disableRight,
}: {
    onClickLeft: () => void;
    onClickRight: () => void;
    disableLeft: boolean;
    disableRight: boolean;
}) {
    return (
        <div className="flex justify-end gap-2 text-xs">
            <button
                aria-label="Left Slider"
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    disableLeft
                        ? "cursor-not-allowed text-gray-400"
                        : "focus:border-cobalt-300 focus:ring-primary-100 hover:bg-slate-50 focus:outline-none focus:ring-2"
                } `}
                onClick={() => !disableLeft && onClickLeft()}
            >
                <FaChevronLeft />
            </button>
            <button
                aria-label="Right Slider"
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    disableRight
                        ? "cursor-not-allowed text-gray-400"
                        : "focus:border-cobalt-300 focus:ring-primary-100 hover:bg-slate-50 focus:outline-none focus:ring-2"
                } `}
                onClick={() => !disableRight && onClickRight()}
            >
                <FaChevronRight />
            </button>
        </div>
    );
}

function FullReview({ review, toggle }: { review: Review; toggle: boolean }) {
    // Expanding is scoped to the slide the reader is on: pairing the flag with
    // the carousel's toggle collapses the review again once the slide changes.
    const [expanded, setExpanded] = useState({ toggle, open: false });
    const openMore = expanded.toggle === toggle && expanded.open;
    const contentRef = useRef<HTMLParagraphElement | null>(null);
    const [isReviewOverflow, setIsReviewOverflow] = useState(false);
    const rowLimit = 4;

    const checkOverflow = () => {
        if (!contentRef.current) return;
        const lineHeight = parseInt(
            window.getComputedStyle(contentRef.current).lineHeight,
        );
        const rows = Math.round(contentRef.current.offsetHeight / lineHeight);
        setIsReviewOverflow(rows > rowLimit);
    };

    useEffect(() => {
        const rafId = requestAnimationFrame(checkOverflow);
        return () => cancelAnimationFrame(rafId);
    }, []);

    useEffect(() => {
        const rafId = requestAnimationFrame(checkOverflow);
        return () => cancelAnimationFrame(rafId);
    }, [toggle]);

    return (
        <div className="z-ground relative flex shrink-0 flex-col justify-between overflow-visible rounded-md border bg-white p-4 md:min-h-[292px] md:max-w-full md:p-8">
            <div className="jusify-between flex h-full flex-col md:flex-row">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                            <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold md:line-clamp-1 md:min-h-[28px]">
                                {review.title}
                            </h3>
                            <small className="italic text-neutral-500">
                                {review.dateAdded}
                            </small>
                            <small>
                                by: <strong>{review.reviewerName}</strong>
                                {review.reviewerCountry
                                    ? ` - ${review.reviewerCountry}`
                                    : ""}
                            </small>
                            {review.programName && (
                                <p className="mt-2 line-clamp-2 min-h-10 text-sm font-bold md:line-clamp-1 md:min-h-5">
                                    Program:{" "}
                                    <Link
                                        href={review.programUrl}
                                        className="text-cobalt-500 hover:underline"
                                    >
                                        {review.programName}
                                    </Link>
                                </p>
                            )}
                        </div>
                        <div className="ml-4 flex items-center gap-1 rounded-md bg-slate-100 px-2">
                            <div className="flex">
                                <IoMdStar className="text-sun-500 text-lg" />
                            </div>
                            <span className="font-bold">{review.overallRating}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p
                            ref={contentRef}
                            className={clsx("whitespace-pre-wrap text-sm", {
                                "line-clamp-4": !openMore && isReviewOverflow,
                            })}
                        >
                            {review.review}
                        </p>
                        {isReviewOverflow && (
                            <button
                                onClick={() =>
                                    setExpanded({ toggle, open: !openMore })
                                }
                                className="mt-2 flex items-center gap-2 text-sm font-bold hover:underline"
                            >
                                {openMore ? "Hide full review" : "Read full review"}{" "}
                                <PiCaretDownBold
                                    className={`${
                                        openMore ? "rotate-180 transform" : ""
                                    }`}
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Reviews({
    programReviews,
    programReviewsCount,
    viewAllUrl,
}: {
    programReviews: Review[];
    programReviewsCount: number;
    viewAllUrl: string;
}) {
    const sliderRef1 = useRef<Slider>(null);
    const sliderRef2 = useRef<Slider>(null);
    const [disableLeft1, setDisableLeft1] = useState(true);
    const [disableLeft2, setDisableLeft2] = useState(true);
    const [disableRight1, setDisableRight1] = useState(false);
    const [disableRight2, setDisableRight2] = useState(false);
    const [toggle, setToggle] = useState(false);

    const handlePageChange = (index: number) => {
        setDisableLeft1(index === 0);
        setDisableLeft2(index === 0);
        setDisableRight1(index === programReviews.length - 1);
        setDisableRight2(index === Math.ceil(programReviews.length / 2) - 1);
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 1000,
        afterChange: (index: number) => {
            handlePageChange(index);
            setToggle((prev) => !prev);
        },
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        draggable: false,
    };

    // Desktop stacks two reviews per slide.
    const getFullReviews = () => {
        const slides: ReactNode[] = [];
        let pair: ReactNode[] = [];
        programReviews.forEach((review, index) => {
            pair.push(
                <FullReview
                    key={`review-${review.id}`}
                    review={review}
                    toggle={toggle}
                />,
            );
            if (index === programReviews.length - 1 || index % 2 !== 0) {
                slides.push(
                    <div key={review.id}>
                        <div className="flex flex-col gap-4" style={{ display: "flex" }}>
                            {pair}
                        </div>
                    </div>,
                );
                pair = [];
            }
        });
        return slides;
    };

    return (
        <div id="reviews" className="flex flex-col gap-4 px-4 lg:px-0">
            <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between">
                <div className="flex w-full items-center justify-between gap-2 md:flex-row">
                    <h2 className="flex w-fit items-center gap-2 text-2xl font-bold">
                        Latest Program Reviews
                    </h2>
                    {programReviewsCount > 3 && (
                        <>
                            <div className="flex w-fit flex-col gap-2 lg:hidden">
                                <SliderNav
                                    onClickLeft={() => sliderRef1.current?.slickPrev?.()}
                                    onClickRight={() => sliderRef1.current?.slickNext?.()}
                                    disableLeft={disableLeft1}
                                    disableRight={disableRight1}
                                />
                            </div>
                            <div className="hidden w-fit flex-col gap-2 lg:flex">
                                <SliderNav
                                    onClickLeft={() => sliderRef2.current?.slickPrev?.()}
                                    onClickRight={() => sliderRef2.current?.slickNext?.()}
                                    disableLeft={disableLeft2}
                                    disableRight={disableRight2}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2 lg:hidden">
                <Slider
                    ref={sliderRef1}
                    {...sliderSettings}
                    className="flex w-full flex-col gap-2"
                >
                    {programReviews.map((review, index) => (
                        <FullReview key={index} review={review} toggle={toggle} />
                    ))}
                </Slider>
            </div>
            <div className="hidden flex-col gap-2 lg:flex">
                <Slider
                    ref={sliderRef2}
                    {...sliderSettings}
                    className="flex w-full flex-col gap-2"
                >
                    {getFullReviews()}
                </Slider>
            </div>
            <div className="mt-4 flex justify-center">
                <Link
                    className="focus:ring-roman-400 bg-roman-500 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200"
                    href={viewAllUrl}
                >
                    View All Reviews
                </Link>
            </div>
        </div>
    );
}
