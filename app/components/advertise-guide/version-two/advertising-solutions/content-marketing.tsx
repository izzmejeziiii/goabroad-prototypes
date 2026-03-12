"use client";

import { useState } from "react";
import { HiLightBulb } from "react-icons/hi";
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
        title: "Featured Partner Articles",
        subtitle: "",
        imageSrc:
            "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png",
        imageAlt: "Program directory listing view",
    },
    {
        id: "2",
        title: "Sponsored Campaigns across GoAbroad’s Newsletters and Social Channels",
        subtitle: "",
        imageSrc:
            "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png",
        imageAlt: "Program directory listing view",
    },
];

const STRATEGIC_IMPACT = [
    "Boost authority by featuring your brand in high-quality, educational content",
    "Engage users with stories that resonate with their goals and interests",
    "Increase backlinks and SEO value through contextual content placement",
    "Expand reach via GoAbroad’s social media, emails, and partner networks",
];

export default function ContentMarketing() {
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
                        Content Marketing Collaborations
                    </h2>
                    <span className="text-slate-300 text-xs font-semibold">
                        TIER 7
                    </span>
                </div>
                <div className="bg-cobalt-200 border-cobalt-50 border text-white rounded-full px-3.5 py-1.5 text-xs font-semibold">
                    Multi-Channel
                </div>
            </div>

            <div className="bg-white border border-slate-300 rounded-b-xl p-6">
                <div className="w-full grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-3 text-slate-700 leading-relaxed">
                            <span className="font-bold text-slate-800">
                                Curated multi-channel marketing options to our
                                community
                            </span>
                            <p>
                                Content marketing collaborations offer you a
                                platform to tell your brand’s story through
                                sponsored articles and curate campaigns,
                                connecting with potential participants on a
                                deeper level. These partnerships drive both
                                engagement and SEO value, contributing to your
                                long-term visibility across GoAbroad’s trusted
                                network.
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
                            Comprehensive visibility, promotional offers,
                            highlighting expertise.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
