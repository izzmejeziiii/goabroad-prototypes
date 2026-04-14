"use client";

import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import {
    LuArrowLeft,
    LuArchive,
    LuTrash2,
    LuMail,
    LuClock3,
    LuEllipsisVertical,
} from "react-icons/lu";

type EmailPlatformPreviewProps = {
    imageSrc: string;
    imageAlt: string;
    label: string;
    emailHeader?: string;
};

const TOOLBAR_ICONS = [LuArrowLeft, LuArchive, LuTrash2, LuMail, LuClock3];

export default function EmailPlatformPreview({
    imageSrc,
    imageAlt,
    emailHeader,
}: EmailPlatformPreviewProps) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <h3 className="text-cobalt-500 text-xs font-bold uppercase tracking-wider">
                Platform Preview
            </h3>

            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.13)] overflow-hidden">
                {/* Gmail Toolbar */}
                <div className="flex items-center gap-4 px-4 py-2.5 bg-[#F2F6FC]">
                    {TOOLBAR_ICONS.map((Icon, i) => (
                        <Icon key={i} size={18} className="text-[#5F6368]" />
                    ))}
                    <div className="flex-1" />
                    <LuEllipsisVertical size={18} className="text-[#5F6368]" />
                </div>

                {/* Email Header */}
                <div className="flex flex-col gap-3 px-5 py-4">
                    <h4 className="text-[#202124] text-lg font-semibold">
                        {emailHeader ||
                            "Global Programs That Help You Stand Out"}
                    </h4>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="w-full h-full object-contain"
                                src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                                <span className="text-[#202124] text-[13px] font-semibold">
                                    GoAbroad.com
                                </span>
                                <span className="text-[#5F6368] text-xs">
                                    &lt;newsletter@goabroad.com&gt;
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-[#5F6368] text-xs">
                                    to me
                                </span>
                                <IoMdArrowDropdown
                                    size={16}
                                    className="text-[#5F6368]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px w-full bg-[#E8EAED]" />

                {/* Newsletter Content — image container */}
                <div className="flex justify-center">
                    <div className="relative w-full aspect-square bg-white overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover object-top"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
