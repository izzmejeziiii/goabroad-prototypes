"use client";

import { useVersion } from "../version-context";
import { ChangedBadge } from "../diff-primitives";

export const Description = () => {
    const { active, changedFields, diffMode, previewMode } = useVersion();
    const descChanged = changedFields.has("description");

    if (previewMode) {
        return (
            <p className="whitespace-pre-wrap text-base text-slate-700 leading-relaxed">
                {active.data.description}
            </p>
        );
    }

    return (
        <div
            className={`relative ${
                descChanged && !diffMode
                    ? "ring-2 ring-sun-400 rounded-md"
                    : ""
            }`}
        >
            {descChanged && !diffMode && (
                <div className="absolute -top-3 left-3 z-10">
                    <ChangedBadge />
                </div>
            )}
            <textarea
                key={active.id}
                defaultValue={active.data.description}
                className="whitespace-pre-wrap text-base w-full border border-slate-200 p-2 rounded-md hover:bg-[#f8fafc] min-h-[160px] resize-y outline-none"
                placeholder="Enter description here..."
            />
            <p className="text-xs text-slate-500 mt-1 text-right">
                <span
                    className={
                        active.data.description.length < 500 ||
                        active.data.description.length > 1200
                            ? "text-red-600"
                            : "text-pacific-500"
                    }
                >
                    {active.data.description.length}
                </span>{" "}
                / 500–1200
            </p>
        </div>
    );
};
