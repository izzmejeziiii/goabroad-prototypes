"use client";

import Image from "next/image";
import {
    LuHeart,
    LuMessageCircle,
    LuSend,
    LuBookmark,
    LuSearch,
    LuUser,
    LuHouse,
    LuEllipsis,
    LuCamera,
} from "react-icons/lu";
import { PiSealCheckFill } from "react-icons/pi";

type SocialMediaPlatformPreviewProps = {
    imageSrc: string;
    imageAlt: string;
    label: string;
    accountName?: string;
};

export default function SocialMediaPlatformPreview({
    imageSrc,
    imageAlt,
    accountName,
}: SocialMediaPlatformPreviewProps) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <h3 className="text-cobalt-500 text-xs font-bold uppercase tracking-wider">
                Platform Preview
            </h3>

            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-cobalt-700 via-cobalt-200 to-primary-300 p-7">
                {/* iPhone 14 Pro Max frame */}
                <div className="relative mx-auto w-fit h-fit">
                    <div className="bg-[#0A0A0A] rounded-[44px] p-[5px] shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
                        <div className="bg-white rounded-[40px] overflow-hidden flex flex-col w-[280px]">
                            {/* Status Bar */}
                            <div className="relative h-11 bg-[#FAFAFA] flex items-center justify-between px-5">
                                <span className="text-[#0A0A0A] text-[11px] font-semibold z-10">
                                    9:41
                                </span>
                                {/* Dynamic Island */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-2 bg-[#0A0A0A] w-[80px] h-[20px] rounded-full" />
                                <div className="flex items-center gap-[3px] z-10">
                                    {/* Signal bars */}
                                    <svg
                                        width="13"
                                        height="10"
                                        viewBox="0 0 16 12"
                                        fill="#0A0A0A"
                                    >
                                        <rect
                                            x="0"
                                            y="9"
                                            width="3"
                                            height="3"
                                            rx="0.5"
                                        />
                                        <rect
                                            x="4.5"
                                            y="6"
                                            width="3"
                                            height="6"
                                            rx="0.5"
                                        />
                                        <rect
                                            x="9"
                                            y="3"
                                            width="3"
                                            height="9"
                                            rx="0.5"
                                        />
                                        <rect
                                            x="13.5"
                                            y="0"
                                            width="3"
                                            height="12"
                                            rx="0.5"
                                        />
                                    </svg>
                                    {/* WiFi */}
                                    <svg
                                        width="13"
                                        height="10"
                                        viewBox="0 0 16 12"
                                        fill="#0A0A0A"
                                    >
                                        <path d="M8 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.46 7.46a6.5 6.5 0 019.08 0l-1.06 1.06a5 5 0 00-6.96 0L3.46 7.46zM.93 4.93a10 10 0 0114.14 0L14 6a8.5 8.5 0 00-12 0L.93 4.93z" />
                                    </svg>
                                    {/* Battery */}
                                    <svg
                                        width="20"
                                        height="10"
                                        viewBox="0 0 25 12"
                                        fill="#0A0A0A"
                                    >
                                        <rect
                                            x="0"
                                            y="0"
                                            width="22"
                                            height="11"
                                            rx="2"
                                            stroke="#0A0A0A"
                                            strokeWidth="1"
                                            fill="none"
                                        />
                                        <rect
                                            x="1.5"
                                            y="1.5"
                                            width="19"
                                            height="8"
                                            rx="1"
                                            fill="#0A0A0A"
                                        />
                                        <rect
                                            x="23"
                                            y="3.5"
                                            width="2"
                                            height="4"
                                            rx="0.5"
                                            fill="#0A0A0A"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Instagram Header */}
                            <div className="flex items-center justify-between bg-[#FAFAFA] px-3 py-[6px] border-b border-[#DBDBDB]/50">
                                <LuCamera
                                    size={16}
                                    className="text-[#262626]"
                                />
                                <span className="text-[#262626] text-sm font-semibold italic">
                                    Instagram
                                </span>
                                <LuSend size={16} className="text-[#262626]" />
                            </div>

                            {/* Post Header */}
                            <div className="flex items-center gap-2 px-3 py-2">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="w-full h-full object-contain"
                                        src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#262626] text-[10px] font-semibold leading-tight truncate">
                                            {accountName || "goabroadcom"}
                                        </span>
                                        <PiSealCheckFill
                                            size={12}
                                            className="text-blue-500"
                                        />
                                    </div>
                                    <span className="text-[#8E8E8E] text-[9px] leading-tight">
                                        Reels · Trending
                                    </span>
                                </div>
                                <LuEllipsis
                                    size={14}
                                    className="text-[#262626] shrink-0"
                                />
                            </div>

                            {/* Post Image — customizable via props */}
                            <div className="relative w-full aspect-square bg-slate-100">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Engagement Row */}
                            <div className="flex items-center justify-between px-3 py-[6px]">
                                <div className="flex items-center gap-3">
                                    <LuHeart
                                        size={16}
                                        className="text-[#262626]"
                                    />
                                    <LuMessageCircle
                                        size={16}
                                        className="text-[#262626]"
                                    />
                                    <LuSend
                                        size={16}
                                        className="text-[#262626]"
                                    />
                                </div>
                                <LuBookmark
                                    size={16}
                                    className="text-[#262626]"
                                />
                            </div>

                            {/* Likes */}
                            <div className="px-3 pb-0.5">
                                <span className="text-[#262626] text-[10px] font-semibold">
                                    102 likes
                                </span>
                            </div>

                            {/* Caption */}
                            <div className="flex gap-1 px-3 pb-1">
                                <span className="text-[#262626] text-[10px] font-semibold shrink-0">
                                    goabroadcom
                                </span>
                                <span className="text-[#262626] text-[10px] truncate">
                                    Meaningful Travel Starts Here...
                                </span>
                            </div>

                            {/* Comments link */}
                            <div className="px-3 pb-1">
                                <span className="text-[#8E8E8E] text-[10px]">
                                    View all 3 comments
                                </span>
                            </div>

                            {/* Bottom Navigation */}
                            <div className="flex items-center justify-between bg-[#FAFAFA] border-t border-[#DBDBDB]/50 px-5 py-[6px]">
                                <LuHouse size={16} className="text-[#262626]" />
                                <LuSearch
                                    size={16}
                                    className="text-[#262626]"
                                />
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#262626"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                    />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                <LuHeart size={16} className="text-[#262626]" />
                                <LuUser size={16} className="text-[#262626]" />
                            </div>

                            {/* Home Indicator */}
                            <div className="flex justify-center bg-[#FAFAFA] pb-2 pt-1">
                                <div className="w-24 h-1 bg-[#0A0A0A] rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
