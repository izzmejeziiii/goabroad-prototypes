"use client";

import { useState, useRef } from "react";
import { HiPencil, HiOutlineHeart } from "react-icons/hi";
import { IoMdStar } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useVersion } from "../version-context";
import { program, CTA_STYLES } from "../data";
import { ChangedBadge, DiffLine } from "../diff-primitives";
import { Breadcrumbs } from "./breadcrumbs";

const EditableTitle = ({
    value,
    className = "",
    buttonClassName = "",
    counterClassName = "",
}: {
    value: string;
    className?: string;
    buttonClassName?: string;
    counterClassName?: string;
}) => {
    const [title, setTitle] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const { previewMode } = useVersion();

    if (previewMode) {
        return (
            <h1
                className={`text-2xl font-bold leading-tight ${className}`}
            >
                {value}
            </h1>
        );
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 min-w-0">
                <h1
                    className={`text-2xl font-bold leading-6 ${className} inline-block w-full`}
                >
                    <input
                        type="text"
                        ref={inputRef}
                        className="bg-transparent outline-none border-none pr-8 w-full min-w-[350px]"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value.substring(0, 60))
                        }
                    />
                </h1>
                <button
                    type="button"
                    className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full hover:bg-opacity-20 p-1 transition-opacity ${buttonClassName}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    <HiPencil className="text-sm" />
                </button>
            </div>
            {title && title.length > 0 && (
                <p className={`inline-flex items-center gap-1 ${counterClassName}`}>
                    <span
                        className={
                            title.length < 20
                                ? "text-red-600"
                                : "text-pacific-500"
                        }
                    >
                        {title.length}
                    </span>
                    /60
                </p>
            )}
        </div>
    );
};

const HeroCTAs = () => {
    const {
        active,
        changedFields,
        diffMode,
        omitRemoved,
        previewMode,
        previousVersion,
    } = useVersion();
    const ctasChanged = changedFields.has("ctas");

    if (!diffMode || !ctasChanged) {
        return (
            <div className="flex gap-4 flex-wrap">
                {active.data.ctas.map((c) => (
                    <button
                        key={c}
                        type="button"
                        className={`rounded-md px-4 py-2.5 flex gap-2 items-center text-center font-bold text-white w-fit ${
                            CTA_STYLES[c] ?? "bg-cobalt-500"
                        }`}
                    >
                        {c}
                        {!previewMode && <HiPencil size={12} />}
                    </button>
                ))}
            </div>
        );
    }

    const added = active.data.ctas.filter(
        (c) => !previousVersion.data.ctas.includes(c)
    );
    const removed = previousVersion.data.ctas.filter(
        (c) => !active.data.ctas.includes(c)
    );

    return (
        <div className="flex gap-3 flex-wrap items-center">
            {active.data.ctas.map((c) => {
                const isNew = added.includes(c);
                return (
                    <div key={c} className="relative">
                        <button
                            type="button"
                            className={`rounded-md px-4 py-2.5 flex gap-2 items-center text-center font-bold text-white w-fit ${
                                CTA_STYLES[c] ?? "bg-cobalt-500"
                            } ${
                                isNew
                                    ? "ring-2 ring-fern-500 ring-offset-2 ring-offset-slate-900/40"
                                    : ""
                            }`}
                        >
                            {c} <HiPencil size={12} />
                        </button>
                        {isNew && (
                            <span className="absolute -top-2 -right-2 bg-fern-500 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                                + Added
                            </span>
                        )}
                    </div>
                );
            })}
            {!omitRemoved &&
                removed.map((c) => (
                    <div key={c} className="relative">
                        <button
                            type="button"
                            disabled
                            className="rounded-md px-4 py-2.5 flex gap-2 items-center text-center font-bold text-white/70 w-fit bg-slate-500 line-through opacity-70"
                        >
                            {c}
                        </button>
                        <span className="absolute -top-2 -right-2 bg-roman-500 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                            − Removed
                        </span>
                    </div>
                ))}
        </div>
    );
};

export const HeroSection = () => {
    const {
        active,
        changedFields,
        diffMode,
        omitRemoved,
        previousVersion,
    } = useVersion();
    const heroChanged = changedFields.has("hero_image");
    const nameChanged = changedFields.has("name");
    return (
        <div className="w-full">
            <Breadcrumbs />
            <div
                className={`w-full h-[500px] relative ${
                    heroChanged && !diffMode ? "ring-4 ring-sun-400" : ""
                }`}
            >
                <img
                    src={active.data.hero_image}
                    alt={active.data.name}
                    className="w-full h-full object-cover object-center"
                />
                {heroChanged && !diffMode && (
                    <div className="absolute top-4 left-4 z-10">
                        <ChangedBadge />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75"></div>
                <div className="absolute inset-0 h-full w-full max-w-[1200px] mx-auto flex flex-col justify-end py-8 px-4 lg:px-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 items-center">
                                <div className="w-[75px] h-[75px] rounded-md shrink-0 bg-slate-200 p-1">
                                    <img
                                        src={program.logo}
                                        alt={program.provider_name}
                                        className="h-full w-full rounded-md bg-white object-contain px-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    {diffMode && nameChanged ? (
                                        <div className="flex flex-col gap-1">
                                            {!omitRemoved && (
                                                <DiffLine kind="removed">
                                                    <span className="text-2xl font-bold leading-tight">
                                                        {
                                                            previousVersion
                                                                .data.name
                                                        }
                                                    </span>
                                                </DiffLine>
                                            )}
                                            <DiffLine kind="added">
                                                <span className="text-2xl font-bold leading-tight">
                                                    {active.data.name}
                                                </span>
                                            </DiffLine>
                                        </div>
                                    ) : (
                                        <div
                                            className={`flex items-center gap-2 ${
                                                nameChanged && !diffMode
                                                    ? "ring-2 ring-sun-400 rounded-md px-2 py-1 -mx-2 bg-sun-500/10"
                                                    : ""
                                            }`}
                                        >
                                            <EditableTitle
                                                key={active.id}
                                                value={active.data.name}
                                                className="text-white"
                                                buttonClassName="hover:bg-white/20 text-white"
                                                counterClassName="text-white"
                                            />
                                            {nameChanged && !diffMode && (
                                                <ChangedBadge />
                                            )}
                                        </div>
                                    )}
                                <p className="text-white">
                                    by:
                                    <span className="font-bold text-cobalt-500">
                                        {" "}
                                        {program.provider_name}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex gap-1 items-center text-xs">
                                <IoMdStar className="text-lg text-sun-500" />
                                <span className="text-white font-bold">
                                    {program.rating} ({program.reviews_count})
                                </span>
                            </div>
                            {program.verified && (
                                <div className="flex gap-1 items-center text-xs">
                                    <FaCheckCircle className="text-base text-fern-500" />
                                    <span className="text-white font-bold">
                                        Verified
                                    </span>
                                </div>
                            )}
                            <button
                                type="button"
                                className="flex gap-1 items-center bg-sun-500 px-2 py-1 rounded-md text-xs"
                            >
                                <HiOutlineHeart className="text-lg text-white" />
                                <span className="text-white font-bold">
                                    Save
                                </span>
                            </button>
                        </div>
                    </div>
                    <HeroCTAs />
                </div>
            </div>
        </div>
        </div>
    );
};
