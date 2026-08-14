"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Article } from "./types";

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

const ArticleContainer = ({ article }: { article: Article }) => {
    const [saved, setSaved] = useState(false);

    return (
        <div className="min-w-75 min-h-79 relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg lg:min-w-0">
            {/* Save button */}
            <div className="z-ground group absolute right-2 top-1 h-8 w-8">
                <button
                    aria-label="Save Article"
                    onClick={() => setSaved((prev) => !prev)}
                    className="group relative h-8 w-8 cursor-pointer border-none bg-inherit transition-all duration-300 active:scale-100"
                >
                    <FaHeart
                        className={clsx("absolute left-0 top-0 h-7 w-7", {
                            "text-red-500": saved,
                            "text-slate-800 group-hover:text-red-400 group-hover:opacity-100":
                                !saved,
                        })}
                    />
                    <FaRegHeart
                        className={clsx(
                            "absolute left-0 top-0 h-7 w-7 text-white",
                            { "group-hover:opacity-0": !saved },
                        )}
                    />
                </button>
                <span className="absolute right-11 top-1 hidden w-60 rounded-sm bg-neutral-800/90 p-2 text-center text-xs text-white hover:block group-hover:block">
                    Save this article
                </span>
            </div>

            <div className="h-50 relative w-full">
                <Image
                    src={article.photo}
                    alt={article.altText}
                    width={403.33}
                    height={200}
                    className="h-50 object-cover"
                />
                {!!article.topic && (
                    <div className="absolute left-3 top-3">
                        <span className="bg-cobalt-500 rounded-full px-2 py-1 text-xs font-semibold text-white">
                            {article.topic}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex grow flex-col gap-3 p-4">
                <Link
                    href={article.url}
                    className="hover:text-cobalt-600 line-clamp-2 text-lg font-bold text-slate-800 transition-all duration-300 hover:-translate-y-0.5"
                >
                    {article.title}
                </Link>

                <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                    <Link
                        href={article.authorUrl}
                        className="font-medium hover:underline"
                    >
                        {article.authorName}
                    </Link>
                    <div className="flex items-center gap-2">
                        <span>{article.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function RecentArticles({
    recentArticles,
}: {
    recentArticles: Article[];
}) {
    const sliderRef = useRef<Slider>(null);
    const [disableLeft, setDisableLeft] = useState(true);
    const [disableRight, setDisableRight] = useState(false);
    const articlesItemView = 3;

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        afterChange: (index: number) => {
            setDisableLeft(index === 0);
            setDisableRight(index + articlesItemView === recentArticles.length);
        },
        slidesToShow: articlesItemView,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
    };

    return (
        <div id="recent-articles" className="flex w-full flex-col gap-4 px-4 lg:px-0">
            <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between lg:items-center">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        Recent Study Abroad Articles
                    </h2>
                </div>
                {recentArticles.length > 4 && (
                    <div className="hidden w-fit flex-col gap-2 lg:flex">
                        <SliderNav
                            onClickLeft={() => sliderRef.current?.slickPrev?.()}
                            onClickRight={() => sliderRef.current?.slickNext?.()}
                            disableLeft={disableLeft}
                            disableRight={disableRight}
                        />
                    </div>
                )}
            </div>
            {/* For small and medium screen size */}
            <div className="w-full overflow-x-auto sm:grid-cols-2 lg:hidden">
                <div className="flex w-full gap-6">
                    {recentArticles.map((article, index) => (
                        <ArticleContainer key={`listing-${index}`} article={article} />
                    ))}
                </div>
            </div>
            {/* For large screen size */}
            <div className="hidden w-full flex-col lg:flex">
                <div className="-mx-4 flex w-[calc(100%+2rem)]">
                    <Slider ref={sliderRef} {...sliderSettings} className="w-full">
                        {recentArticles.map((article, index) => (
                            <div key={`listing-${index}`} className="px-4">
                                <ArticleContainer article={article} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <Link
                    className="focus:ring-roman-400 bg-roman-500 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200"
                    href="https://www.goabroad.com/articles/study-abroad"
                >
                    View All Articles
                </Link>
            </div>
        </div>
    );
}
