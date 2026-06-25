"use client";

import Image from "next/image";
import { BsBatteryFull } from "react-icons/bs";
import { FiPlusSquare, FiSearch } from "react-icons/fi";
import { GoHomeFill, GoPlus } from "react-icons/go";
import { LiaSignalSolid } from "react-icons/lia";
import {
    LuMessageCircle,
    LuSend,
    LuBookmark,
    LuEllipsis,
    LuUserRound,
} from "react-icons/lu";
import { MdOutlineWifi } from "react-icons/md";
import { PiHeart, PiSealCheckFill } from "react-icons/pi";

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
                                <div className="absolute left-1/2 -translate-x-1/2 top-2 bg-[#0A0A0A] w-[80px] h-[20px] rounded-full" />
                                <div className="flex items-center gap-[3px] z-10">
                                    <LiaSignalSolid />
                                    <MdOutlineWifi />
                                    <BsBatteryFull />
                                </div>
                            </div>

                            {/* Instagram Header */}
                            <div className="flex items-center justify-between bg-[#FAFAFA] px-2 py-[6px] border-b border-[#DBDBDB]/50">
                                <GoPlus size={20} className="text-[#262626]" />
                                <span className="text-[#262626] text-sm font-semibold italic">
                                    Instagram
                                </span>
                                <PiHeart size={20} className="text-[#262626]" />
                            </div>

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
                                    <PiHeart
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
                                <GoHomeFill
                                    size={20}
                                    className="text-[#262626]"
                                />
                                <FiPlusSquare
                                    size={20}
                                    className="text-[#262626]"
                                />
                                <LuSend size={20} className="text-[#262626]" />
                                <FiSearch
                                    size={20}
                                    className="text-[#262626]"
                                />
                                <LuUserRound
                                    size={20}
                                    className="text-[#262626]"
                                />
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
