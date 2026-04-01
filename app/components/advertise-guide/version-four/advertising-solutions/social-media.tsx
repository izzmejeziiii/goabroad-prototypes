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
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
}[] = [
    {
        id: "1",
        title: "Social Media Video Series",
        subtitle: "",
        imageSrc:
            "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png",
        imageAlt: "Program directory listing view",
    },
    {
        id: "2",
        title: "Social Media Advertising Package",
        subtitle: "",
        imageSrc:
            "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png",
        imageAlt: "Program directory listing view",
    },
    {
        id: "3",
        title: "Sponsored Instagram Takeover",
        subtitle: "",
        imageSrc:
            "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png",
        imageAlt: "Program directory listing view",
    },
    {
        id: "4",
        title: "Instagram Takeover Add On",
        subtitle: "",
        imageSrc:
            "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png",
        imageAlt: "Program directory listing view",
    },
];

const STRATEGIC_IMPACT = [
    "Wider exposure on GoAbroad’s active and engaged social media channels",
    "Increased engagement through visual storytelling, reels, and feature posts",
    "Broader brand recognition as followers share, comment, and engage with your content",
    "Direct traffic to your program listings or application pages via social links and calls-to-action",
];

export default function SocialMedia() {
    const [highlightedBlock, setHighlightedBlock] =
        useState<HighlightedBlock>("1");
    const previewItem =
        APPEARANCE_ITEMS.find((i) => i.id === highlightedBlock) ??
        APPEARANCE_ITEMS[0];

    return (
        <div className="w-full p-8">
            <h2 className="text-slate-800 font-bold text-2xl flex-1">
                Social Media Campaigns
            </h2>

            <hr className="h-px border-none bg-slate-200 w-full my-6" />

            <div className="w-full grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-3 text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-800">
                            Extend visibility beyond the platform
                        </span>
                        <p>
                            Social media marketing with us extends your reach
                            beyond the website, enabling your brand to engage
                            with users in a dynamic and visual format. By
                            featuring your organization on GoAbroad’s trusted
                            social platforms with followers of over 100k, you
                            can tell compelling stories, showcase program
                            highlights, and create emotional connections with
                            prospective participants.
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
                                    Visual storytelling, alumni features,
                                    cultural immersion highlights.
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
