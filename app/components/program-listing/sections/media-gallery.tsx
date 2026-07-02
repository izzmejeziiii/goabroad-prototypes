"use client";

import { useState, useRef } from "react";
import { MdHistory, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaCirclePlay } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { PiImage, PiVideo } from "react-icons/pi";
import { useVersion } from "../version-context";
import { galleryMedia, BRAND_BLUE } from "../data";

export const MediaGallery = () => {
    const {
        active: activeVersion,
        previousVersion,
        diffMode,
        previewMode,
        changedFields,
    } = useVersion();
    const galleryChanged = changedFields.has("gallery");
    const previousCount = previousVersion.data.gallery.length;
    const addedCount =
        diffMode && galleryChanged
            ? activeVersion.data.gallery.length - previousCount
            : 0;
    const newItems =
        diffMode && galleryChanged
            ? galleryMedia.slice(previousCount)
            : [];

    // Auto-feature a new photo when the gallery changed so the user sees the
    // most recent addition front-and-center.
    const [selected, setSelected] = useState(
        diffMode && galleryChanged ? previousCount : 0
    );
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollBy = (delta: number) => {
        scrollerRef.current?.scrollTo({
            left: (scrollerRef.current?.scrollLeft ?? 0) + delta,
            behavior: "smooth",
        });
    };

    const active = galleryMedia[selected];

    return (
        <div className="max-w-[776px]">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Media Gallery</h2>
                    {diffMode && galleryChanged && (
                        <div className="flex items-center gap-2">
                            <MdHistory
                                className="w-4 h-4"
                                style={{ color: BRAND_BLUE }}
                            />
                            <span
                                className="text-xs font-bold uppercase tracking-wider"
                                style={{ color: BRAND_BLUE }}
                            >
                                Media Gallery changed
                                {addedCount > 0 && (
                                    <span className="ml-1 text-fern-700">
                                        · +{addedCount} new
                                    </span>
                                )}
                            </span>
                        </div>
                    )}
                </div>

                {diffMode && galleryChanged && newItems.length > 0 && (
                    <div className="rounded-md border-2 border-fern-300 bg-fern-500/10 p-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 bg-fern-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                    + {newItems.length} New in this edit
                                </span>
                                <span className="text-xs text-slate-600">
                                    Click a photo to view
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            {newItems.map((media, i) => {
                                const index = previousCount + i;
                                const isActive = selected === index;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => setSelected(index)}
                                        className={`relative h-24 w-32 shrink-0 overflow-hidden rounded-md ring-2 transition-shadow ${
                                            isActive
                                                ? "ring-fern-600 shadow-md"
                                                : "ring-fern-500 hover:shadow-md"
                                        }`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={media.image}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                        {media.isVideo && (
                                            <FaCirclePlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white" />
                                        )}
                                        <span className="absolute top-1 left-1 bg-fern-500 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                                            + New
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div
                    className={`relative w-full bg-black rounded-md overflow-hidden ${
                        diffMode &&
                        galleryChanged &&
                        selected >= previousCount
                            ? "ring-4 ring-fern-500"
                            : ""
                    }`}
                >
                    <img
                        src={active.image}
                        alt=""
                        className="w-full h-[400px] object-cover"
                    />
                    {diffMode &&
                        galleryChanged &&
                        selected >= previousCount && (
                            <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-fern-500 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded shadow z-10">
                                + Added in recent edit
                            </span>
                        )}
                    {active.isVideo && (
                        <FaCirclePlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-6xl text-white" />
                    )}
                    {active.caption && (
                        <div className="absolute bottom-0 left-0 flex w-full items-center bg-slate-900/80 p-4">
                            <p className="text-xs text-white md:text-base">
                                {active.caption}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 relative">
                {galleryMedia.length >= 3 && (
                    <>
                        <button
                            className="flex cursor-pointer items-center rounded-full border border-solid border-neutral-300 bg-white absolute p-1 -left-3 top-[55%] shadow-sm z-10"
                            aria-label="Previous"
                            type="button"
                            onClick={() => scrollBy(-168)}
                        >
                            <HiChevronLeft className="h-4 w-4 text-slate-800" />
                        </button>
                        <button
                            className="flex cursor-pointer items-center rounded-full border border-solid absolute z-10 top-[55%] border-neutral-300 bg-white p-1 shadow-sm right-[43%]"
                            aria-label="Next"
                            type="button"
                            onClick={() => scrollBy(168)}
                        >
                            <HiChevronRight className="h-4 w-4 text-slate-800" />
                        </button>
                    </>
                )}
                <div
                    ref={scrollerRef}
                    className="flex gap-2 overflow-x-auto max-w-[430px] scrollbar-hide"
                >
                    {galleryMedia.map((media, i) => {
                        const isNew =
                            diffMode &&
                            galleryChanged &&
                            i >= previousVersion.data.gallery.length;
                        return (
                        <div className="mt-4 relative shrink-0" key={i}>
                            <button
                                type="button"
                                className={`h-24 w-40 shrink-0 overflow-hidden rounded-md block ${
                                    selected === i
                                        ? "border-2 border-cobalt-50"
                                        : ""
                                } ${
                                    isNew
                                        ? "ring-2 ring-fern-500 ring-offset-1"
                                        : ""
                                }`}
                                onClick={() => setSelected(i)}
                            >
                                <img
                                    src={media.image}
                                    className="h-full w-full cursor-pointer object-cover"
                                    alt=""
                                />
                                {media.isVideo && (
                                    <FaCirclePlay className="absolute left-[40%] top-1/4 cursor-pointer text-3xl text-white" />
                                )}
                            </button>
                            {isNew && (
                                <span className="absolute top-1 left-1 bg-fern-500 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow z-10">
                                    + New
                                </span>
                            )}
                            {!previewMode && (
                                <>
                                    <button
                                        className="absolute -top-3 -right-3 text-red-500 rounded-full p-1"
                                        title="Remove"
                                        type="button"
                                    >
                                        <IoCloseCircle className="w-5 h-5 bg-white rounded-full" />
                                    </button>
                                    <div className="flex absolute inset-0 bottom-1 mt-auto gap-2 h-fit bg-slate-900/70 items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        {i > 0 && (
                                            <button
                                                className="rounded-full p-1 bg-white h-fit my-1"
                                                title="Move left"
                                                type="button"
                                            >
                                                <MdChevronLeft className="w-5 h-5 text-slate-900" />
                                            </button>
                                        )}
                                        {i <
                                            galleryMedia.length - 1 && (
                                            <button
                                                className="rounded-full p-1 bg-white h-fit my-1"
                                                title="Move right"
                                                type="button"
                                            >
                                                <MdChevronRight className="w-5 h-5 text-slate-900" />
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        );
                    })}
                </div>
                {!previewMode && (
                <div className="w-fit h-fit flex items-center gap-2 mt-4">
                    <button
                        type="button"
                        className="flex flex-col items-center justify-center w-[160px] h-[96px] bg-slate-900 rounded-md text-center shrink-0 overflow-hidden hover:bg-slate-700 text-white"
                    >
                        <PiImage className="h-7 w-7" />
                        Upload Photo
                    </button>
                    <button
                        type="button"
                        className="flex flex-col items-center justify-center w-[160px] h-[96px] bg-slate-900 text-white rounded-md text-center shrink-0 overflow-hidden hover:bg-slate-700"
                    >
                        <PiVideo className="h-7 w-7" />
                        Add Video
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};
