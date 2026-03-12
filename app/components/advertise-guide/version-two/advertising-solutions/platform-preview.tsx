"use client";

import Image from "next/image";

export type HighlightedBlock =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10";

type PlatformPreviewProps = {
    imageSrc: string;
    imageAlt: string;
    label: string;
};

export default function PlatformPreview({
    imageSrc,
    imageAlt,
}: PlatformPreviewProps) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Platform Preview
            </h3>

            <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="flex items-center gap-6 px-4 py-3 bg-slate-100 border-b border-slate-200">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-roman-500/80" />
                        <span className="w-3 h-3 rounded-full bg-sun-500/80" />
                        <span className="w-3 h-3 rounded-full bg-fern-500/80" />
                    </div>
                    <div className="flex-1 flex justify-center w-full">
                        <div className="bg-white rounded-lg px-4 py-1.5 text-slate-500 text-sm border border-slate-200 w-full text-center">
                            www.goabroad.com
                        </div>
                    </div>
                    <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                    </div>
                </div>

                <div className="relative w-full aspect-4/3 bg-slate-100">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 1024px) 100vw, 380px"
                    />
                </div>
            </div>
        </div>
    );
}
