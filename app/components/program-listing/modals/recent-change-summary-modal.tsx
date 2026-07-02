"use client";

import { MdHistory, MdClose, MdCheckCircle } from "react-icons/md";
import { useVersion } from "../version-context";
import { versionHistory, BRAND_BLUE, FIELD_LABELS } from "../data";
import { computeChangedFields, summarizeField } from "../diff-utils";

export const RecentChangeSummaryModal = ({ onClose }: { onClose: () => void }) => {
    const { previousVersion } = useVersion();
    const current = versionHistory[0];
    const changedKeys = Array.from(computeChangedFields(previousVersion));

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[640px] max-h-[85vh] flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-5 h-5"
                            style={{ color: BRAND_BLUE }}
                        />
                        <h2 className="text-lg font-bold text-slate-800">
                            Recent Change
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-slate-100"
                    >
                        <MdClose className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Author + timestamp block */}
                <div
                    className="px-6 py-5 border-b border-slate-200"
                    style={{ backgroundColor: `${BRAND_BLUE}08` }}
                >
                    <div className="flex items-start gap-4">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm"
                            style={{
                                backgroundColor: current.isSystem
                                    ? "#94a3b8"
                                    : BRAND_BLUE,
                            }}
                        >
                            {current.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-base font-bold text-slate-800">
                                    {current.author}
                                </span>
                                <span className="font-mono text-[11px] text-slate-400">
                                    {current.id.toUpperCase()}
                                </span>
                                <span
                                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                                    style={{
                                        backgroundColor: "#e7f2eb",
                                        color: "#246b3a",
                                    }}
                                >
                                    <MdCheckCircle className="w-2.5 h-2.5" />
                                    Current
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-0.5">
                                applied {current.timestamp.toLowerCase()}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {current.absolute}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                                Replaced previous version{" "}
                                <span className="font-mono">
                                    {previousVersion.id.toUpperCase()}
                                </span>{" "}
                                by{" "}
                                <span className="font-semibold">
                                    {previousVersion.author}
                                </span>{" "}
                                ({previousVersion.timestamp.toLowerCase()})
                            </p>
                        </div>
                        <div
                            className="flex flex-col items-end shrink-0 px-3 py-2 rounded-md"
                            style={{
                                backgroundColor: "white",
                                border: `1px solid ${BRAND_BLUE}33`,
                            }}
                        >
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                Fields Edited
                            </span>
                            <span
                                className="text-2xl font-bold"
                                style={{ color: BRAND_BLUE }}
                            >
                                {changedKeys.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Summary of edits */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">
                        Summary of Edits
                    </h3>
                    {changedKeys.length === 0 ? (
                        <p className="text-sm text-slate-500 italic">
                            No fields changed in this edit.
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {changedKeys.map((key) => {
                                const label = FIELD_LABELS[key] ?? key;
                                const detail = summarizeField(
                                    key,
                                    previousVersion,
                                    current
                                );
                                return (
                                    <li
                                        key={key}
                                        className="flex items-start gap-3 rounded-md border border-slate-200 px-3 py-2.5 hover:bg-slate-50"
                                    >
                                        <span
                                            className="w-1 h-6 rounded-sm shrink-0 mt-0.5"
                                            style={{
                                                backgroundColor: BRAND_BLUE,
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-800">
                                                {label}
                                            </p>
                                            {detail && (
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {detail}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm font-bold px-4 py-2 rounded-md text-white shadow-sm"
                        style={{ backgroundColor: BRAND_BLUE }}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};
