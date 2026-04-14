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
    description: string;
    imageSrc: string;
    imageAlt: string;
}[] = [
    {
        id: "1",
        title: "Premium Listings",
        description:
            "Your program appears within the relevant category directory, visible to users browsing by program type.",
        imageSrc:
            "https://images.goabroad.com/image/upload/images2/advertisePage/premium-listings.png",
        imageAlt: "Program directory listing view",
    },
    {
        id: "2",
        title: "Results Feature",
        description: "",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775781330/images2/advertisePage/results-feature_jsppez.png",
        imageAlt: "Search results page view",
    },
    {
        id: "3",
        title: "Provider Profile Page",
        description: "",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775781329/images2/advertisePage/provider-profile_hqx0uz.png",
        imageAlt: "Provider profile page view",
    },
    {
        id: "4",
        title: "Listing Cover Photo",
        description: "",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775781329/images2/advertisePage/listing-cover_rdh229.png",
        imageAlt: "Provider profile page view",
    },
];

const STRATEGIC_IMPACT = [
    "Build credibility within trusted directories and niche categories",
    "Begin establishing brand reputation through your third-party profile and reviews",
    "Stand out from other listings with a premium link and custom cover photo",
    "Drive traffic from motivated users browsing specific program types or destinations",
    "Long-term exposure to users researching and comparing program options",
];

export default function BasicProgram() {
    const [highlightedBlock, setHighlightedBlock] =
        useState<HighlightedBlock>("1");
    const previewItem =
        APPEARANCE_ITEMS.find((i) => i.id === highlightedBlock) ??
        APPEARANCE_ITEMS[0];

    return (
        <div className="w-full p-8">
            <h3 className="text-slate-800 font-bold text-2xl flex-1">
                Basic Program Directory Visibility
            </h3>

            <hr className="h-px border-none bg-slate-200 w-full my-6" />

            <div className="w-full grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-3 text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-800">
                            Establish a foundational profile to boost brand
                            awareness
                        </span>
                        <p>
                            Basic Directory Visibility ensures your program is
                            visible in relevant categories as well as results
                            pages for filtered searches across locations, types
                            and timing options. Premium upgrade options help
                            differentiate your programs from basic listings,
                            with links to your website and/or a customized cover
                            photo, making it more likely to attract attention
                            from users browsing our directories.
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
                                    Initial program visibility, reputation
                                    building, attracting potential leads.
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
