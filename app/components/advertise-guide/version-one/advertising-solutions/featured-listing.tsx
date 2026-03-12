"use client";

import { useState } from "react";
import { HiLightBulb, HiOutlineChevronRight } from "react-icons/hi";
import PlatformPreview, { type HighlightedBlock } from "./platform-preview";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const APPEARANCE_ITEMS: {
    id: HighlightedBlock;
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
}[] = [
    {
        id: "1",
        title: "Search Result Pages",
        subtitle:
            "(i.e. filtered program results by country, program type, etc.)",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773221545/images2/advertisePage/sr-listing.png",
        imageAlt: "Program directory listing view",
    },
];

const STRATEGIC_IMPACT = [
    "Increase visibility in competitive program and destination searches",
    "Stronger brand recall through prime placement at the top of key results pages",
    "Increased traffic from high-intent users making program choices",
];

export default function FeaturedListings() {
    const [highlightedBlock, setHighlightedBlock] =
        useState<HighlightedBlock>("1");
    const previewItem =
        APPEARANCE_ITEMS.find((i) => i.id === highlightedBlock) ??
        APPEARANCE_ITEMS[0];

    return (
        <div className="w-full shadow-lg rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-linear-to-r from-cobalt-700 to-cobalt-300 rounded-t-xl px-6 py-4">
                <div className="flex flex-col gap-0">
                    <span className="text-slate-300 text-xs font-semibold">
                        TIER 3
                    </span>
                    <h2 className="text-white font-bold text-xl flex-1">
                        Featured Listings
                    </h2>
                </div>
                <div className="bg-cobalt-200 border-cobalt-50 border text-white rounded-full px-3.5 py-1.5 text-xs font-semibold">
                    Visibility
                </div>
            </div>

            <div className="bg-white border border-slate-300 rounded-b-xl p-6">
                <div className="w-full md:grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-3 text-slate-700 leading-relaxed">
                            <span className="font-bold text-slate-800">
                                Pinned position #1 visibility on niche program
                                results pages
                            </span>
                            <p>
                                Featured Listings provide premium visibility at
                                the top of search results, ensuring your program
                                stands out where users are actively comparing
                                options. This drives higher click-through rates
                                and increases traffic to your program page.
                            </p>
                        </div>

                        <div className="md:hidden block">
                            <PlatformPreview
                                imageSrc={previewItem.imageSrc}
                                imageAlt={previewItem.imageAlt}
                                label={previewItem.title}
                            />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                Where it appears — click to highlight
                            </p>
                            <div className="space-y-2">
                                {APPEARANCE_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() =>
                                            setHighlightedBlock(item.id)
                                        }
                                        className={`bg-slate-50 flex items-center  gap-3 px-4 py-3 text-left rounded-lg border transition-all duration-250 w-full ${highlightedBlock === item.id ? "border-cobalt-500" : "border-slate-200 hover:border-slate-300"}`}
                                    >
                                        <div className="flex w-full gap-3 items-center">
                                            <span
                                                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${highlightedBlock === item.id ? "bg-cobalt-500 text-white" : "bg-slate-200 text-slate-400"}`}
                                            >
                                                {item.id}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-800">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm text-slate-500 mt-0.5">
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                            <HiOutlineChevronRight
                                                size={16}
                                                className={`${highlightedBlock === item.id ? " text-cobalt-500" : "text-slate-200 hover:text-slate-300"}`}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                Strategic impact
                            </p>
                            <ul className="space-y-2">
                                {STRATEGIC_IMPACT.map((text, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 text-slate-700"
                                    >
                                        <IoIosCheckmarkCircleOutline
                                            size={22}
                                            className="shrink-0 mt-0.5 text-cobalt-500"
                                        />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <PlatformPreview
                            imageSrc={previewItem.imageSrc}
                            imageAlt={previewItem.imageAlt}
                            label={previewItem.title}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        Best for
                    </p>
                    <div className="w-full px-4 md:px-6 lg:px-8 xl:px-0">
                        <div className="border-sun-300 flex w-full items-center gap-4 rounded-md border bg-amber-50 px-6 py-4">
                            <div className="w-fit rounded-full bg-amber-100 p-2">
                                <HiLightBulb className="fill-sun-500 h-7 w-7" />
                            </div>
                            <p className="text-slate-800">
                                Enrollment cycles, high-demand destinations,
                                competitive verticals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
