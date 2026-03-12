"use client";

import { useState } from "react";
import { HiLightBulb } from "react-icons/hi";
import PlatformPreview, { type HighlightedBlock } from "./platform-preview";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const APPEARANCE_ITEMS: {
    id: HighlightedBlock;
    title: string;
    imageSrc: string;
    imageAlt: string;
}[] = [
    {
        id: "1",
        title: "Homepage Premier",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773281605/images2/advertisePage/homepage-premier-feature1.png",
        imageAlt: "Homepage Premier view",
    },
    {
        id: "2",
        title: "Homepage Organizational Feature",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773281604/images2/advertisePage/homepage-organizational-feature1.png",
        imageAlt: "Homepage Organizational Feature view",
    },
    {
        id: "3",
        title: "Homepage Featured Program",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773278789/images2/advertisePage/homepage-featured-program.png",
        imageAlt: "Homepage Featured Program view",
    },
    {
        id: "4",
        title: "Directory Premier",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773281423/images2/advertisePage/directory-premier-feature.png",
        imageAlt: "Directory Premier view",
    },
    {
        id: "5",
        title: "Directory Organizational Feature",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773281422/images2/advertisePage/directory-organizational-feature.png",
        imageAlt: "Directory Organizational Feature view",
    },
    {
        id: "6",
        title: "Directory Headline Photo",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773281422/images2/advertisePage/directory-headline-photo.png",
        imageAlt: "Directory Headline Photo view",
    },
    {
        id: "7",
        title: "Directory Feature",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1773281422/images2/advertisePage/directory-featured-program.png",
        imageAlt: "Directory Feature view",
    },
];

const STRATEGIC_IMPACT = [
    "Boosted visibility on GoAbroad’s highest-traffic pages",
    "Immediate attention from users landing directly on your featured program or organization",
    "Stronger brand recognition through prominent, eye-catching placements",
    "Increased conversions with direct, visible links to your program or organization",
];

export default function DisplayPlacements() {
    const [highlightedBlock, setHighlightedBlock] =
        useState<HighlightedBlock>("1");
    const previewItem =
        APPEARANCE_ITEMS.find((i) => i.id === highlightedBlock) ??
        APPEARANCE_ITEMS[0];

    return (
        <div className="w-full shadow-lg rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-linear-to-r from-cobalt-700 to-cobalt-300 rounded-t-xl px-6 py-4">
                <div className="flex flex-col gap-0">
                    <h2 className="text-white font-bold text-xl flex-1">
                        Homepage & Directory High-Traffic Display Placements
                    </h2>
                    <span className="text-slate-300 text-xs font-semibold">
                        TIER 2
                    </span>
                </div>
                <div className="bg-cobalt-200 border-cobalt-50 border text-white rounded-full px-3.5 py-1.5 text-xs font-semibold">
                    Increase Click-Through
                </div>
            </div>

            <div className="bg-white border border-slate-300 rounded-b-xl p-6">
                <div className="w-full grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-3 text-slate-700 leading-relaxed">
                            <span className="font-bold text-slate-800">
                                Increase click-through rate at the point of
                                entry
                            </span>
                            <p>
                                These high traffic display placements are
                                designed for maximum exposure across GoAbroad’s
                                most-visited pages. These placements ensure your
                                program or organization is front and center on
                                our homepage or within a directory homepage,
                                capturing attention early in the user’s journey.
                                This is particularly powerful for brand
                                awareness and for programs that need to stand
                                out in a competitive space.
                            </p>
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
                    <div className="flex flex-col gap-4">
                        <PlatformPreview
                            imageSrc={previewItem.imageSrc}
                            imageAlt={previewItem.imageAlt}
                            label={previewItem.title}
                        />
                        <div className="space-y-2">
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                Where it appears — click to highlight
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {APPEARANCE_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() =>
                                            setHighlightedBlock(item.id)
                                        }
                                        className={`flex items-center gap-3 px-3 py-1.5 text-left text-xs rounded-full w-fit border transition-all duration-250 ${highlightedBlock === item.id ? "bg-cobalt-500 border-cobalt-500 text-white" : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"}`}
                                    >
                                        <p>{item.title}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        Best for
                    </p>
                    <div className="border-sun-300 flex w-full items-center gap-4 rounded-md border bg-amber-50 px-6 py-4">
                        <div className="w-fit rounded-full bg-amber-100 p-2">
                            <HiLightBulb className="fill-sun-500 h-7 w-7" />
                        </div>
                        <p className="text-slate-800">
                            Brand awareness campaigns, announcements, program
                            launches.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
