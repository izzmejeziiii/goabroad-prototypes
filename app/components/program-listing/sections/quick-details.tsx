"use client";

import type { ReactNode } from "react";
import { HiPencil, HiArrowSmRight, HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { MdEventAvailable, MdLibraryBooks } from "react-icons/md";
import { PiShieldWarningBold } from "react-icons/pi";
import { RiGuideFill } from "react-icons/ri";
import { FaArrowCircleDown } from "react-icons/fa";
import { useVersion } from "../version-context";
import { DiffLine, DiffListItems } from "../diff-primitives";

const QuickDetailRow = ({
    icon,
    label,
    children,
}: {
    icon: ReactNode;
    label: string;
    children: ReactNode;
}) => {
    const { previewMode } = useVersion();
    return (
        <div className="border-b border-slate-200 pb-4 flex gap-4 items-start">
            <div className="flex gap-2 text-sm flex-1">
                <span className="shrink-0 text-lg text-neutral-800">
                    {icon}
                </span>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">{label}</span>
                    <div>{children}</div>
                </div>
            </div>
            {!previewMode && (
                <button
                    type="button"
                    className="rounded-full hover:bg-slate-200 p-1 cursor-pointer"
                >
                    <HiPencil className="text-sm text-slate-700" />
                </button>
            )}
        </div>
    );
};

export const QuickDetails = () => {
    const {
        active,
        changedFields,
        diffMode,
        omitRemoved,
        previousVersion,
    } = useVersion();
    const locChanged = changedFields.has("locations");
    const typesChanged = changedFields.has("types");
    const priceChanged = changedFields.has("startsAt");
    const ageChanged = changedFields.has("ageRequirement");

    return (
        <div className="w-full border border-slate-200 rounded-md bg-slate-50 shrink-0 p-4 flex flex-col gap-4">
            <h3 className="text-xl font-bold">Quick Details</h3>

            <QuickDetailRow icon={<IoLocationOutline />} label="Locations">
                {diffMode && locChanged ? (
                    <DiffListItems
                        current={active.data.locations}
                        previous={previousVersion.data.locations}
                    />
                ) : (
                    <ul className="list-none">
                        {active.data.locations.slice(0, 5).map((l, i) => (
                            <li key={i}>{l}</li>
                        ))}
                        {active.data.locations.length > 5 && (
                            <li>
                                <button className="flex items-center gap-1 font-bold underline">
                                    See more <HiArrowSmRight />
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </QuickDetailRow>

            <QuickDetailRow icon={<MdEventAvailable />} label="Availability">
                <span className="flex gap-2">
                    <strong>Year(s) Offered:</strong> 2025, 2026
                </span>
                <span className="flex gap-2">
                    <strong>Duration:</strong> 1–24 weeks
                </span>
            </QuickDetailRow>

            <QuickDetailRow
                icon={<HiOutlineCurrencyDollar />}
                label="Starts At:"
            >
                {diffMode && priceChanged ? (
                    <div className="flex flex-col gap-1.5">
                        {!omitRemoved && (
                            <DiffLine kind="removed">
                                {previousVersion.data.startsAt}
                            </DiffLine>
                        )}
                        <DiffLine kind="added">
                            {active.data.startsAt}
                        </DiffLine>
                    </div>
                ) : (
                    active.data.startsAt
                )}
            </QuickDetailRow>

            <QuickDetailRow
                icon={<PiShieldWarningBold />}
                label="Age Requirement:"
            >
                {diffMode && ageChanged ? (
                    <div className="flex flex-col gap-1.5">
                        {!omitRemoved && (
                            <DiffLine kind="removed">
                                {previousVersion.data.ageRequirement}
                            </DiffLine>
                        )}
                        <DiffLine kind="added">
                            {active.data.ageRequirement}
                        </DiffLine>
                    </div>
                ) : (
                    active.data.ageRequirement
                )}
            </QuickDetailRow>

            <QuickDetailRow
                icon={<MdLibraryBooks />}
                label="Types & Subjects:"
            >
                {diffMode && typesChanged ? (
                    <DiffListItems
                        current={active.data.types}
                        previous={previousVersion.data.types}
                    />
                ) : (
                    <ul className="list-none">
                        {active.data.types.slice(0, 5).map((t, i) => (
                            <li key={i}>{t}</li>
                        ))}
                    </ul>
                )}
            </QuickDetailRow>

            <QuickDetailRow icon={<RiGuideFill />} label="Guidelines:">
                All Nationalities
            </QuickDetailRow>

            <button
                type="button"
                className="flex gap-2 w-full border border-slate-200 py-2.5 font-bold bg-white rounded-md items-center justify-center text-black cursor-pointer"
            >
                See all program details
                <FaArrowCircleDown className="w-4 h-4" />
            </button>
        </div>
    );
};
