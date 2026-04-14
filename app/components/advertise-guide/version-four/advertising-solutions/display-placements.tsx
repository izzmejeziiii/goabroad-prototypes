"use client";

import { useState } from "react";
import { HiLightBulb } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import PlatformPreview, {
    type HighlightedBlock,
} from "../../version-two/advertising-solutions/platform-preview";

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
            "https://res.cloudinary.com/gacom/image/upload/v1775791430/images2/advertisePage/homepage-premier_za587r.png",
        imageAlt: "Homepage Premier view",
    },
    {
        id: "2",
        title: "Homepage Organizational Feature",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791427/images2/advertisePage/homepage-org-feature_nnmfzv.png",
        imageAlt: "Homepage Organizational Feature view",
    },
    {
        id: "3",
        title: "Homepage Featured Program",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791431/images2/advertisePage/homepage-feature_z8lhvk.png",
        imageAlt: "Homepage Featured Program view",
    },
    {
        id: "4",
        title: "Directory Premier",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791433/images2/advertisePage/directory-premier_rdop6p.png",
        imageAlt: "Directory Premier view",
    },
    {
        id: "5",
        title: "Directory Organizational Feature",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791430/images2/advertisePage/directory-org-feature_woamhy.png",
        imageAlt: "Directory Organizational Feature view",
    },
    {
        id: "6",
        title: "Directory Headline Photo",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791426/images2/advertisePage/directory-headline_cel7lh.png",
        imageAlt: "Directory Headline Photo view",
    },
    {
        id: "7",
        title: "Directory Feature",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791430/images2/advertisePage/directory-feature_lxm8ps.png",
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
        <div className="w-full p-8">
            <h3 className="text-slate-800 font-bold text-2xl flex-1">
                Homepage & Directory High-Traffic Display Placements
            </h3>

            <hr className="h-px border-none bg-slate-200 w-full my-6" />

            <div className="w-full grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-3 text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-800">
                            Increase click-through rate at the point of entry
                        </span>
                        <p>
                            These high traffic display placements are designed
                            for maximum exposure across GoAbroad’s most-visited
                            pages. These placements ensure your program or
                            organization is front and center on our homepage or
                            within a directory homepage, capturing attention
                            early in the user’s journey. This is particularly
                            powerful for brand awareness and for programs that
                            need to stand out in a competitive space.
                        </p>
                    </div>

                    <div>
                        <p className="text-cobalt-500 text-xs font-bold uppercase tracking-wider mb-3">
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

                    <div className="mt-6">
                        <div className="border-sun-200/50 flex w-full items-center gap-4 rounded-md border bg-amber-50 px-6 py-4">
                            <div className="w-fit rounded-full bg-amber-100 p-2">
                                <HiLightBulb className="fill-sun-500 h-7 w-7" />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <span className="text-sun-500 text-xs font-bold uppercase tracking-wider">
                                    Best for
                                </span>
                                <p className="text-slate-800">
                                    Brand awareness campaigns, announcements,
                                    program launches.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 w-full">
                    <div className="space-y-2">
                        <p className="text-cobalt-500 text-xs font-bold uppercase tracking-wider mb-3">
                            Where it appears — click to highlight
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {APPEARANCE_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setHighlightedBlock(item.id)}
                                    className={`flex items-center gap-3 px-3 py-1.5 text-left text-xs rounded-full w-fit border transition-all duration-250 ${highlightedBlock === item.id ? "bg-cobalt-500 border-cobalt-500 text-white" : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"}`}
                                >
                                    <p>{item.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <PlatformPreview
                        imageSrc={previewItem.imageSrc}
                        imageAlt={previewItem.imageAlt}
                        label={previewItem.title}
                    />
                </div>
            </div>
        </div>
    );
}
