"use client";

import { LuShieldCheck } from "react-icons/lu";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { useVersion } from "../version-context";
import { ChangedBadge } from "../diff-primitives";

export const ProgramHighlights = () => {
    const { active, changedFields, diffMode, previewMode } = useVersion();
    const highlightsChanged = changedFields.has("highlights");

    return (
    <div className={`border bg-slate-50 rounded-md w-full p-4 flex flex-col gap-4 relative border-slate-200 ${
        highlightsChanged && !diffMode ? "ring-2 ring-sun-400" : ""
    }`}>
        {highlightsChanged && !diffMode && (
            <div className="absolute -top-3 right-3 z-10">
                <ChangedBadge />
            </div>
        )}
        <h2 className="font-bold text-lg">
            Program Highlights
            {!previewMode && (
                <span className="text-xs italic font-normal">
                    {" "}
                    (Must list 5)
                </span>
            )}
        </h2>
        <div className="flex flex-col text-sm gap-3">
            {active.data.highlights.map((h, i) => (
                <div className="flex" key={i}>
                    <p className="flex gap-2 items-center max-w-[600px] flex-1">
                        <LuShieldCheck className="shrink-0 text-lg" />
                        {h}
                    </p>
                    {!previewMode && (
                        <div className="flex">
                            <button
                                type="button"
                                className="p-1 text-cobalt-500 hover:bg-slate-200 rounded-full"
                            >
                                <MdEdit className="text-base" />
                            </button>
                            <button
                                type="button"
                                className="p-1 text-roman-500 hover:bg-slate-200 rounded-full"
                            >
                                <MdDelete className="text-base" />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
        {!previewMode && (
            <button
                type="button"
                className="w-full border border-slate-200 rounded-md py-2.5 font-bold bg-white flex items-center justify-center gap-2"
            >
                <HiMiniPlusCircle className="text-lg" />
                Add Program Highlight
            </button>
        )}
    </div>
    );
};
