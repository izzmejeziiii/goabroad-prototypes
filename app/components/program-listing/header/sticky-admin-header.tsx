"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MdKeyboardArrowLeft,
    MdClose,
    MdOutlineVisibility,
    MdContentCopy,
    MdCheck,
} from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import { useVersion } from "../version-context";
import { BRAND_BLUE, PROGRAM_DOMAIN, directoryChips } from "../data";
import { Switch } from "./switch";
import { VersionHistoryDropdown } from "./version-history-dropdown";

export const StickyAdminHeaderV1 = () => {
    const [online, setOnline] = useState(false);
    const [premium, setPremium] = useState(true);
    const [urlSlug, setUrlSlug] = useState(
        "volunteer-abroad-with-ivhq-188550"
    );
    const [copied, setCopied] = useState(false);
    const [overflowOpen, setOverflowOpen] = useState(false);
    const { active, openPreview } = useVersion();

    const handleCopyUrl = () => {
        const fullUrl = `${PROGRAM_DOMAIN}/listing/${urlSlug}`;
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(fullUrl);
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    const MAX_VISIBLE_CHIPS = 2;
    const visibleChips = directoryChips.slice(0, MAX_VISIBLE_CHIPS);
    const overflowChips = directoryChips.slice(MAX_VISIBLE_CHIPS);

    return (
        <header className="fixed top-11 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-200">
            {/* Tier 1 — identity + primary action */}
            <div className="w-full px-6 h-16 flex items-center gap-4 border-b border-slate-100">
                <button
                    type="button"
                    className="p-2 rounded-md hover:bg-slate-100 shrink-0 text-slate-600"
                    title="Back to programs"
                >
                    <MdKeyboardArrowLeft className="w-5 h-5" />
                </button>

                <Link href="/" className="shrink-0 flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                        alt="GoAbroad"
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                <div className="h-7 w-px bg-slate-200 shrink-0 mx-2" />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex flex-col min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                            Editing Listing
                        </span>
                        <span
                            className="text-sm font-bold truncate mt-1"
                            style={{ color: BRAND_BLUE }}
                        >
                            {active.data.name}
                        </span>
                    </div>
                    <span
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{
                            backgroundColor: "#e7f2eb",
                            color: "#246b3a",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3aa45f]" />
                        Approved
                    </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Switch
                        checked={online}
                        onChange={setOnline}
                        label="Online"
                    />
                    <Switch
                        checked={premium}
                        onChange={setPremium}
                        label="Premium"
                        hint="Logo, media gallery, direct website link, and unlimited inquiries."
                    />
                    <div className="h-7 w-px bg-slate-200 mx-1" />
                    <button
                        type="button"
                        onClick={openPreview}
                        className="text-sm font-medium px-3 py-2 rounded-md hover:bg-slate-100 text-slate-600 flex items-center gap-1.5"
                    >
                        <MdOutlineVisibility className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        type="button"
                        className="bg-sun-500 hover:bg-sun-600 text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Tier 2 — contextual controls */}
            <div className="w-full px-6 h-12 flex items-center gap-6 bg-slate-50/60 text-sm">
                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        URL
                    </span>
                    <div
                        className="flex items-center text-slate-500 bg-white rounded-md border border-slate-200 pl-2.5 pr-1 py-1 focus-within:border-slate-400 group"
                        title={`${PROGRAM_DOMAIN}/listing/${urlSlug}`}
                    >
                        <span className="text-xs text-slate-300 mr-0.5 select-none hidden xl:inline">
                            goabroad.com
                        </span>
                        <span className="text-xs text-slate-400 mr-1 select-none">
                            /listing/
                        </span>
                        <input
                            type="text"
                            value={urlSlug}
                            onChange={(e) =>
                                setUrlSlug(
                                    e.target.value.replace(/[^a-z0-9-]/g, "")
                                )
                            }
                            className="text-xs text-slate-800 outline-none bg-transparent min-w-[220px]"
                        />
                        <button
                            type="button"
                            onClick={handleCopyUrl}
                            className={`ml-1 p-1.5 rounded transition-colors ${
                                copied
                                    ? "text-fern-600 bg-fern-500/10"
                                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                            title={
                                copied
                                    ? "Copied!"
                                    : `Copy ${PROGRAM_DOMAIN}/listing/${urlSlug}`
                            }
                            aria-label="Copy full URL"
                        >
                            {copied ? (
                                <MdCheck className="w-3.5 h-3.5" />
                            ) : (
                                <MdContentCopy className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                    {copied && (
                        <span className="text-[11px] font-semibold text-fern-600">
                            Copied!
                        </span>
                    )}
                </div>

                <div className="h-5 w-px bg-slate-200 shrink-0" />

                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        Client
                    </span>
                    <button
                        type="button"
                        className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded-md px-2.5 py-1 hover:border-slate-400 text-slate-800"
                    >
                        <span className="truncate max-w-[180px]">
                            International Volunteer HQ
                        </span>
                        <HiChevronDown className="text-slate-400 shrink-0" />
                    </button>
                </div>

                <div className="h-5 w-px bg-slate-200 shrink-0" />

                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold shrink-0">
                        Directories
                    </span>
                    <div className="flex flex-wrap gap-1.5 items-center relative">
                        {visibleChips.map((d, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 rounded-full text-xs px-2.5 py-0.5 font-medium border"
                                style={{
                                    color: BRAND_BLUE,
                                    borderColor: `${BRAND_BLUE}33`,
                                    backgroundColor: `${BRAND_BLUE}0d`,
                                }}
                            >
                                {d}
                                <button
                                    type="button"
                                    className="rounded-full hover:bg-slate-200/60 -mr-1"
                                    aria-label={`Remove ${d}`}
                                >
                                    <MdClose className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                        {overflowChips.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setOverflowOpen(!overflowOpen)}
                                className="inline-flex items-center gap-1 rounded-full text-xs px-2.5 py-0.5 font-bold border hover:bg-slate-50"
                                style={{
                                    color: BRAND_BLUE,
                                    borderColor: `${BRAND_BLUE}55`,
                                    backgroundColor: overflowOpen
                                        ? `${BRAND_BLUE}1a`
                                        : "white",
                                }}
                                title={`${overflowChips.length} more selected`}
                            >
                                +{overflowChips.length} more
                                <HiChevronDown
                                    className={`w-3 h-3 transition-transform ${
                                        overflowOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        )}
                        <button
                            type="button"
                            className="text-xs font-semibold rounded-full px-2.5 py-0.5 border border-dashed text-slate-500 border-slate-300 hover:border-slate-400 hover:text-slate-700"
                        >
                            + Add Directory
                        </button>

                        {overflowOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setOverflowOpen(false)}
                                />
                                <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                            All Directories ·{" "}
                                            {directoryChips.length}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOverflowOpen(false)
                                            }
                                            className="text-slate-400 hover:text-slate-700"
                                        >
                                            <MdClose className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <ul className="max-h-[240px] overflow-y-auto py-1">
                                        {directoryChips.map((d, i) => (
                                            <li
                                                key={i}
                                                className="px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 group"
                                            >
                                                <span className="text-sm text-slate-700">
                                                    {d}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="text-slate-400 hover:text-roman-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label={`Remove ${d}`}
                                                    title="Remove from directories"
                                                >
                                                    <MdClose className="w-3.5 h-3.5" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50">
                                        <button
                                            type="button"
                                            className="text-xs font-semibold w-full text-left flex items-center gap-1"
                                            style={{ color: BRAND_BLUE }}
                                        >
                                            + Add Directory
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="shrink-0">
                    <VersionHistoryDropdown />
                </div>
            </div>
        </header>
    );
};

export const StickyAdminHeaderV2 = StickyAdminHeaderV1;
