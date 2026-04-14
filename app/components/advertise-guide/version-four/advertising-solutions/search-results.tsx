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
        title: "Listing Photo & Logo",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791433/images2/advertisePage/listing-photo-logo_lb6drv.png",
        imageAlt: "Listing photo and logo view",
    },
    {
        id: "2",
        title: "Results Flyer & Premier Sponsorship",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791423/images2/advertisePage/sponsorship_jcvftk.png",
        imageAlt: "Results flyer & premier sponsorship view",
    },
    {
        id: "3",
        title: "Results Headline Photos",
        imageSrc:
            "https://res.cloudinary.com/gacom/image/upload/v1775791432/images2/advertisePage/results-headline_ykqiaj.png",
        imageAlt: "Headline photos view",
    },
];

const STRATEGIC_IMPACT = [
    "Increased visibility with your logo and images prominently displayed",
    "More traffic from users who are actively searching for specific programs or destinations",
    "Higher engagement due to visual appeal and strategic placement at the top of search results",
    "Competitive advantage by being featured on targeted search results pages",
];

export default function SearchResult() {
    const [highlightedBlock, setHighlightedBlock] =
        useState<HighlightedBlock>("1");
    const previewItem =
        APPEARANCE_ITEMS.find((i) => i.id === highlightedBlock) ??
        APPEARANCE_ITEMS[0];

    return (
        <div className="w-full p-8">
            <h2 className="text-slate-800 font-bold text-2xl flex-1">
                Search Result Boosts
            </h2>

            <hr className="h-px border-none bg-slate-200 w-full my-6" />

            <div className="w-full grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-3 text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-800">
                            Enhanced visibility within a defined niche program
                            search
                        </span>
                        <p>
                            Upgrading your brand’s visibility ensures your
                            program ranks higher on search results pages in
                            order to capture users&apos; attention even better.
                            With additional visual elements, like logos and
                            photos, your program will stand out, driving higher
                            click-through rates and engagement.
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
                                    Destination expansion, market dominance
                                    strategies, targeted growth initiatives.
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
