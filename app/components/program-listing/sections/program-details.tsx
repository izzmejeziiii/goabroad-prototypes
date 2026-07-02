"use client";

import { useState, type ReactNode } from "react";
import { HiPencil, HiOutlineCurrencyDollar, HiOutlineExternalLink } from "react-icons/hi";
import { IoMdCloseCircle, IoMdRibbon } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdLibraryBooks, MdEventAvailable, MdPolicy } from "react-icons/md";
import {
    PiCaretDownBold,
    PiShieldWarningBold,
    PiListChecksBold,
    PiHouseBold,
} from "react-icons/pi";
import { RiGuideFill } from "react-icons/ri";
import { TiFlowMerge } from "react-icons/ti";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { useVersion } from "../version-context";
import { costVariations } from "../data";
import { DiffLine, DiffListItems } from "../diff-primitives";

const DetailCard = ({
    icon,
    title,
    required,
    children,
}: {
    icon: ReactNode;
    title: string;
    required?: boolean;
    children: ReactNode;
}) => {
    const { previewMode } = useVersion();
    return (
    <div className="bg-slate-100 rounded-md p-4 flex flex-col gap-2 relative">
        <div className="flex w-full justify-between">
            <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                    <span className="text-lg">{icon}</span>
                    <span className="font-bold text-base">{title}</span>
                </div>
                {!previewMode && (
                    <button
                        type="button"
                        className="rounded-full hover:bg-slate-200 p-1"
                    >
                        <HiPencil className="text-sm text-slate-700" />
                    </button>
                )}
            </div>
            {required && !previewMode && (
                <span className="text-red-500 text-[10px]">Required</span>
            )}
        </div>
        <div className="text-sm">{children}</div>
    </div>
    );
};

const ExpandableShowAll = ({
    hasOverflow,
    expanded,
}: {
    hasOverflow: boolean;
    expanded: ReactNode;
}) => {
    const [open, setOpen] = useState(false);
    if (!hasOverflow) return null;
    return (
        <>
            {open && (
                <div className="absolute left-0 top-2 z-10 max-h-[300px] min-w-[180px] overflow-y-scroll rounded-md border border-slate-200 bg-slate-50 p-4">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        >
                            <IoMdCloseCircle className="text-lg text-roman-500" />
                        </button>
                    </div>
                    {expanded}
                </div>
            )}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="ml-2 mt-2 flex w-fit cursor-pointer items-center gap-2 text-sm font-bold underline"
            >
                {open ? "Show less" : "Show all"}
                <PiCaretDownBold
                    className={open ? "rotate-180 transform" : ""}
                />
            </button>
        </>
    );
};

export const ProgramDetails = () => {
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
    const accomChanged = changedFields.has("accommodations");

    return (
    <div id="program-details" className="w-full flex flex-col gap-3">
        <div className="flex flex-col">
            <h2 className="font-bold text-2xl">Program Details</h2>
            <p className="text-sm">
                Learn all the nitty gritty details you need to know
            </p>
        </div>
        <div className="w-full grid grid-cols-3 gap-2">
            <DetailCard
                icon={<IoLocationOutline />}
                title="Locations"
                required
            >
                {diffMode && locChanged ? (
                    <DiffListItems
                        current={active.data.locations}
                        previous={previousVersion.data.locations}
                    />
                ) : (
                    <>
                        <ul className="list-none">
                            {active.data.locations
                                .slice(0, 4)
                                .map((l, i) => (
                                    <li key={i} className="ml-2">
                                        {l}
                                    </li>
                                ))}
                        </ul>
                        <ExpandableShowAll
                            hasOverflow={active.data.locations.length > 4}
                            expanded={
                                <ul className="ml-2 flex flex-col gap-1 text-sm list-none">
                                    {active.data.locations.map((l, i) => (
                                        <li key={i}>{l}</li>
                                    ))}
                                </ul>
                            }
                        />
                    </>
                )}
            </DetailCard>
            <DetailCard
                icon={<MdLibraryBooks />}
                title="Types & Subjects"
                required
            >
                {diffMode && typesChanged ? (
                    <>
                        <p className="font-bold mb-2">Causes</p>
                        <DiffListItems
                            current={active.data.types}
                            previous={previousVersion.data.types}
                        />
                    </>
                ) : (
                    <>
                        <p className="font-bold">Causes</p>
                        <ul className="list-none">
                            {active.data.types.slice(0, 3).map((t, i) => (
                                <li key={i} className="ml-2">
                                    {t}
                                </li>
                            ))}
                        </ul>
                        <ExpandableShowAll
                            hasOverflow={active.data.types.length > 3}
                            expanded={
                                <ul className="flex flex-col gap-1 text-sm list-none">
                                    <li className="text-sm font-bold">
                                        Causes
                                    </li>
                                    {active.data.types.map((t, i) => (
                                        <li key={i} className="ml-2">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            }
                        />
                    </>
                )}
            </DetailCard>
            <DetailCard
                icon={<MdEventAvailable />}
                title="Availability"
                required
            >
                <p>
                    <strong>Years Offered:</strong> 2025, 2026
                </p>
                <div className="flex gap-2">
                    <div className="font-bold">Duration:</div>
                    <ul className="list-none">
                        <li className="ml-2">1 week</li>
                        <li className="ml-2">2 weeks</li>
                        <li className="ml-2">4 weeks</li>
                        <li className="ml-2">12 weeks</li>
                    </ul>
                </div>
            </DetailCard>
            <DetailCard icon={<PiShieldWarningBold />} title="Age Requirement">
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
                    <p className="ml-2">{active.data.ageRequirement}</p>
                )}
            </DetailCard>
            <DetailCard icon={<RiGuideFill />} title="Guidelines">
                <p className="ml-2">All Nationalities</p>
                <p className="ml-2">
                    This Program is also open to Solo, Couples, Families, Groups
                </p>
            </DetailCard>
            <DetailCard
                icon={<HiOutlineCurrencyDollar />}
                title="Starts At"
                required
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
                    <ul className="ml-2 list-none">
                        {costVariations.map((row, i) => (
                            <li key={i}>
                                {row.duration}: ${row.price}
                            </li>
                        ))}
                    </ul>
                )}
            </DetailCard>
            <DetailCard
                icon={<PiListChecksBold />}
                title="Program Cost Includes"
            >
                <ul className="ml-2 list-none">
                    <li>Accommodation</li>
                    <li>Meals</li>
                    <li>Airport Pickup</li>
                    <li>Orientation</li>
                </ul>
            </DetailCard>
            <DetailCard
                icon={<PiShieldWarningBold />}
                title="Program Cost Excludes"
            >
                <ul className="ml-2 list-none">
                    <li>Flights</li>
                    <li>Travel Insurance</li>
                    <li>Visa Fees</li>
                </ul>
            </DetailCard>
            <DetailCard icon={<LiaMoneyBillSolid />} title="Payment Terms">
                <ul className="ml-2 list-none">
                    <li>20% deposit upon application</li>
                    <li>Balance due 60 days before program start</li>
                </ul>
            </DetailCard>
            <DetailCard icon={<MdPolicy />} title="Refund Policy">
                <p className="ml-2">
                    Full refund available up to 60 days before program start.
                    Partial refunds available thereafter.
                </p>
                <a
                    href="#"
                    className="ml-2 inline-flex w-fit items-center gap-1 text-sm text-cobalt-500 underline"
                >
                    View Refund Policy
                    <HiOutlineExternalLink className="shrink-0 text-base" />
                </a>
            </DetailCard>
            <DetailCard
                icon={<PiHouseBold />}
                title="Accommodation Options"
            >
                {diffMode && accomChanged ? (
                    <DiffListItems
                        current={active.data.accommodations}
                        previous={previousVersion.data.accommodations}
                    />
                ) : (
                    <ul className="ml-2 list-none">
                        {active.data.accommodations.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                )}
            </DetailCard>
            <DetailCard icon={<IoMdRibbon />} title="Qualifications & Experience">
                <p className="mt-2 font-bold">Language Skills Required</p>
                <ul className="ml-2 list-none">
                    <li>English</li>
                </ul>
                <p className="mt-2 font-bold">Accepted Education Levels</p>
                <ul className="ml-2 list-none">
                    <li>Any/All Education Levels Accepted</li>
                </ul>
            </DetailCard>
            <DetailCard icon={<TiFlowMerge />} title="Application Procedures">
                <ul className="ml-2 list-none">
                    <li>Online application</li>
                    <li>Interview</li>
                    <li>Background check</li>
                </ul>
            </DetailCard>
            <DetailCard
                icon={<HiOutlineCurrencyDollar />}
                title="Deposit / Application Fee"
            >
                <ul className="ml-2 list-none">
                    <li>
                        <strong>Deposit:</strong> $295
                    </li>
                    <li>
                        <strong>Application Fee:</strong> $50
                    </li>
                </ul>
            </DetailCard>
        </div>
    </div>
    );
};
