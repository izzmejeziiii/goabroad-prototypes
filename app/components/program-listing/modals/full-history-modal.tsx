"use client";

import { useState } from "react";
import { MdHistory, MdClose, MdCheckCircle } from "react-icons/md";
import { useVersion } from "../version-context";
import { versionHistory, BRAND_BLUE } from "../data";
import type { VersionSnapshot } from "../types";

export const FullHistoryModal = ({ onClose }: { onClose: () => void }) => {
    const { active, viewVersion } = useVersion();
    const [search, setSearch] = useState("");
    const [authorFilter, setAuthorFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState<"all" | "user" | "system">(
        "all"
    );

    const authors = Array.from(
        new Set(versionHistory.map((v) => v.author))
    ).sort();

    const filtered = versionHistory.filter((v) => {
        if (
            search &&
            ![v.author, v.id, ...v.changes].some((t) =>
                t.toLowerCase().includes(search.toLowerCase())
            )
        )
            return false;
        if (authorFilter !== "all" && v.author !== authorFilter) return false;
        if (typeFilter === "user" && v.isSystem) return false;
        if (typeFilter === "system" && !v.isSystem) return false;
        return true;
    });

    const groups: Record<
        VersionSnapshot["dateGroup"],
        { label: string; items: VersionSnapshot[] }
    > = {
        today: { label: "Today", items: [] },
        yesterday: { label: "Yesterday", items: [] },
        thisWeek: { label: "This Week", items: [] },
        earlier: { label: "Earlier", items: [] },
    };
    filtered.forEach((v) => groups[v.dateGroup].items.push(v));
    const groupOrder: VersionSnapshot["dateGroup"][] = [
        "today",
        "yesterday",
        "thisWeek",
        "earlier",
    ];

    const totalUserEdits = versionHistory.filter((v) => !v.isSystem).length;
    const totalAuthors = authors.length;

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[960px] h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-5 h-5"
                            style={{ color: BRAND_BLUE }}
                        />
                        <h2 className="text-lg font-bold text-slate-800">
                            Full Version History
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

                {/* Stats strip */}
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Total Versions
                        </span>
                        <span
                            className="text-xl font-bold"
                            style={{ color: BRAND_BLUE }}
                        >
                            {versionHistory.length}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Editors
                        </span>
                        <span className="text-xl font-bold text-slate-800">
                            {totalAuthors}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Manual Edits
                        </span>
                        <span className="text-xl font-bold text-slate-800">
                            {totalUserEdits}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Created
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                            Apr 18, 2026
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="px-6 py-3 border-b border-slate-200 flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-[240px] relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by author, version, or change..."
                            className="w-full text-sm border border-slate-200 rounded-md pl-3 pr-3 py-2 outline-none focus:border-slate-400"
                        />
                    </div>
                    <select
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="text-sm border border-slate-200 rounded-md px-3 py-2 bg-white outline-none focus:border-slate-400"
                    >
                        <option value="all">All authors</option>
                        {authors.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center bg-slate-100 rounded-md p-0.5">
                        {(["all", "user", "system"] as const).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTypeFilter(t)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors ${
                                    typeFilter === t
                                        ? "bg-white shadow-sm text-slate-800"
                                        : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {t === "all"
                                    ? "All"
                                    : t === "user"
                                      ? "Manual"
                                      : "System"}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs text-slate-500 ml-auto">
                        {filtered.length} of {versionHistory.length}
                    </span>
                </div>

                {/* Timeline */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {filtered.length === 0 ? (
                        <p className="text-center text-slate-500 py-12 text-sm">
                            No versions match your filters.
                        </p>
                    ) : (
                        groupOrder.map((g) =>
                            groups[g].items.length === 0 ? null : (
                                <div key={g} className="mb-6">
                                    <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3 sticky top-0 bg-white py-1 z-10">
                                        {groups[g].label}{" "}
                                        <span className="text-slate-400">
                                            · {groups[g].items.length}
                                        </span>
                                    </h3>
                                    <ol className="relative">
                                        {/* timeline rail */}
                                        <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" />
                                        {groups[g].items.map((v) => {
                                            const isActive = v.id === active.id;
                                            return (
                                                <li
                                                    key={v.id}
                                                    className="relative pl-12 pb-4 last:pb-0 group"
                                                >
                                                    {/* timeline dot */}
                                                    <div
                                                        className="absolute left-1 top-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-4 ring-white"
                                                        style={{
                                                            backgroundColor:
                                                                v.isSystem
                                                                    ? "#94a3b8"
                                                                    : BRAND_BLUE,
                                                        }}
                                                    >
                                                        {v.avatar}
                                                    </div>
                                                    <div
                                                        className={`rounded-lg border p-3 transition-colors ${
                                                            isActive
                                                                ? "border-cobalt-300 bg-cobalt-50/40"
                                                                : "border-slate-200 hover:border-slate-300 bg-white"
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span className="text-sm font-bold text-slate-800">
                                                                        {v.author}
                                                                    </span>
                                                                    <span className="text-[11px] text-slate-400 font-mono">
                                                                        {v.id.toUpperCase()}
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
                                                                    {v.isSystem && (
                                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                                                                            System
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
                                                                    {v.timestamp}{" "}
                                                                    ·{" "}
                                                                    <span className="text-slate-400">
                                                                        {v.absolute}
                                                                    </span>
                                                                </p>
                                                                <div className="mt-2 flex flex-wrap gap-1">
                                                                    {v.changes.map(
                                                                        (
                                                                            c,
                                                                            i
                                                                        ) => (
                                                                            <span
                                                                                key={i}
                                                                                className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                                                                            >
                                                                                {c}
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        viewVersion(
                                                                            v.id
                                                                        );
                                                                        onClose();
                                                                    }}
                                                                    className="text-[11px] font-semibold border border-slate-200 rounded px-2 py-1 hover:bg-white"
                                                                    style={{
                                                                        color: BRAND_BLUE,
                                                                    }}
                                                                    title="View listing at this version"
                                                                >
                                                                    View
                                                                </button>
                                                                {!v.current && (
                                                                    <button
                                                                        type="button"
                                                                        className="text-[11px] font-semibold border border-slate-200 rounded px-2 py-1 hover:bg-white text-slate-700"
                                                                        title="Restore this version"
                                                                    >
                                                                        Restore
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            )
                        )
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                        Showing {filtered.length} of {versionHistory.length}{" "}
                        version{versionHistory.length === 1 ? "" : "s"}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm px-4 py-2 rounded-md text-slate-600 hover:bg-white border border-slate-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
