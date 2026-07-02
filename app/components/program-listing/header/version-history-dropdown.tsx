"use client";

import { useState } from "react";
import { MdHistory, MdOutlineVisibility, MdCheckCircle } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import { useVersion } from "../version-context";
import { versionHistory, BRAND_BLUE } from "../data";
import { computeChangedFields, computeDiff } from "../diff-utils";
import { CompareVersionsModal } from "../modals/compare-versions-modal";
import { FullHistoryModal } from "../modals/full-history-modal";
import { RecentChangeSummaryModal } from "../modals/recent-change-summary-modal";

const RecentChangeBadge = () => {
    const { previousVersion } = useVersion();
    const [compareOpen, setCompareOpen] = useState(false);
    const current = versionHistory[0];
    const diffs = computeDiff(previousVersion, current);

    return (
        <>
            <button
                type="button"
                onClick={() => setCompareOpen(true)}
                className="flex items-center gap-2 text-xs rounded-md px-2.5 py-1 border hover:shadow-sm transition-shadow"
                style={{
                    color: BRAND_BLUE,
                    borderColor: `${BRAND_BLUE}55`,
                    backgroundColor: `${BRAND_BLUE}0d`,
                }}
                title={`View full comparison: ${previousVersion.id.toUpperCase()} → ${current.id.toUpperCase()}`}
            >
                <MdHistory className="w-4 h-4" />
                <span className="font-bold">Recent edit</span>
                <span className="text-slate-400">·</span>
                <span className="font-mono text-[11px]">
                    {previousVersion.id.toUpperCase()} →{" "}
                    {current.id.toUpperCase()}
                </span>
                <span className="text-slate-400">·</span>
                <span
                    className="font-bold"
                    style={{ color: BRAND_BLUE }}
                >
                    {diffs.length} change
                    {diffs.length === 1 ? "" : "s"}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{current.timestamp}</span>
                <HiChevronDown className="w-3 h-3 -rotate-90 text-slate-400" />
            </button>

            {compareOpen && (
                <CompareVersionsModal
                    onClose={() => setCompareOpen(false)}
                    lockToRecent
                />
            )}
        </>
    );
};

const RecentChangeSummaryPill = () => {
    const [open, setOpen] = useState(false);
    const { previousVersion } = useVersion();
    const current = versionHistory[0];
    const changedCount = computeChangedFields(previousVersion).size;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 text-xs rounded-md px-2.5 py-1 border hover:shadow-sm transition-shadow"
                style={{
                    color: BRAND_BLUE,
                    borderColor: `${BRAND_BLUE}55`,
                    backgroundColor: `${BRAND_BLUE}0d`,
                }}
                title="View recent change summary"
            >
                <MdHistory className="w-4 h-4" />
                <span className="font-bold">Recent change</span>
                <span className="text-slate-400">·</span>
                <span className="font-bold" style={{ color: BRAND_BLUE }}>
                    {changedCount} field{changedCount === 1 ? "" : "s"}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{current.timestamp}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-700 font-semibold">
                    by {current.author}
                </span>
                <HiChevronDown className="w-3 h-3 -rotate-90 text-slate-400" />
            </button>
            {open && (
                <RecentChangeSummaryModal
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export const VersionHistoryDropdown = () => {
    const [open, setOpen] = useState(false);
    const [compareOpen, setCompareOpen] = useState(false);
    const [fullHistoryOpen, setFullHistoryOpen] = useState(false);
    const { active, viewVersion, diffMode, designVersion } = useVersion();
    const latest = versionHistory[0];

    if (designVersion === "v3") return <RecentChangeSummaryPill />;
    if (diffMode) return <RecentChangeBadge />;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-white border border-transparent hover:border-slate-200 rounded-md px-2 py-1 transition-colors"
            >
                <MdHistory className="w-4 h-4" />
                <span>
                    {active.current
                        ? `Saved ${latest.timestamp}`
                        : `Viewing ${active.id}`}
                </span>
                <span className="text-slate-300">·</span>
                <span className="font-semibold underline-offset-2">
                    {versionHistory.length} versions
                </span>
                <HiChevronDown
                    className={`w-3 h-3 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-[420px] bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MdHistory
                                    className="w-4 h-4"
                                    style={{ color: BRAND_BLUE }}
                                />
                                <h3 className="text-sm font-bold text-slate-800">
                                    Version History
                                </h3>
                            </div>
                            <span className="text-xs text-slate-400">
                                {versionHistory.length} edits
                            </span>
                        </div>
                        <ul className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
                            {versionHistory.map((v) => {
                                const isActive = v.id === active.id;
                                return (
                                    <li
                                        key={v.id}
                                        className={`px-4 py-3 group cursor-pointer ${
                                            isActive
                                                ? "bg-cobalt-50/40"
                                                : "hover:bg-slate-50"
                                        }`}
                                        onClick={() => {
                                            viewVersion(v.id);
                                            setOpen(false);
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                                style={{
                                                    backgroundColor: v.isSystem
                                                        ? "#94a3b8"
                                                        : BRAND_BLUE,
                                                }}
                                            >
                                                {v.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-semibold text-slate-800">
                                                        {v.author}
                                                    </span>
                                                    {v.current && (
                                                        <span
                                                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                                                            style={{
                                                                backgroundColor:
                                                                    "#e7f2eb",
                                                                color: "#246b3a",
                                                            }}
                                                        >
                                                            <MdCheckCircle className="w-2.5 h-2.5" />
                                                            Current
                                                        </span>
                                                    )}
                                                    {isActive &&
                                                        !v.current && (
                                                            <span
                                                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded text-white"
                                                                style={{
                                                                    backgroundColor:
                                                                        BRAND_BLUE,
                                                                }}
                                                            >
                                                                Viewing
                                                            </span>
                                                        )}
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    {v.timestamp} ·{" "}
                                                    <span className="text-slate-400">
                                                        {v.absolute}
                                                    </span>
                                                </p>
                                                <div className="mt-1.5 flex flex-wrap gap-1">
                                                    {v.changes.map((c, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                                                        >
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className={`flex items-center gap-1 text-[11px] font-semibold border border-slate-200 rounded px-2 py-1 hover:bg-white shrink-0 transition-opacity ${
                                                    isActive
                                                        ? "opacity-100 bg-white"
                                                        : "opacity-0 group-hover:opacity-100"
                                                }`}
                                                style={{ color: BRAND_BLUE }}
                                                title="View listing at this version"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    viewVersion(v.id);
                                                    setOpen(false);
                                                }}
                                            >
                                                <MdOutlineVisibility className="w-3.5 h-3.5" />
                                                {isActive ? "Viewing" : "View"}
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/60">
                            <button
                                type="button"
                                onClick={() => {
                                    setFullHistoryOpen(true);
                                    setOpen(false);
                                }}
                                className="text-xs font-semibold hover:underline"
                                style={{ color: BRAND_BLUE }}
                            >
                                View full history
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setCompareOpen(true);
                                    setOpen(false);
                                }}
                                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                            >
                                Compare versions →
                            </button>
                        </div>
                    </div>
                </>
            )}

            {compareOpen && (
                <CompareVersionsModal onClose={() => setCompareOpen(false)} />
            )}

            {fullHistoryOpen && (
                <FullHistoryModal
                    onClose={() => setFullHistoryOpen(false)}
                />
            )}
        </div>
    );
};
