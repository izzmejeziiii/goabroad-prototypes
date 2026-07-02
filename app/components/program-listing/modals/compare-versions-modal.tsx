"use client";

import { useState, useRef } from "react";
import { MdHistory, MdClose, MdCheckCircle } from "react-icons/md";
import { HiArrowSmRight, HiChevronDown } from "react-icons/hi";
import { useVersion } from "../version-context";
import { versionHistory, BRAND_BLUE } from "../data";
import {
    computeDiff,
    aggregateChanges,
    slugify,
    summarizeDiff,
} from "../diff-utils";

const VersionPicker = ({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: (id: string) => void;
    label: string;
}) => {
    const v = versionHistory.find((x) => x.id === value)!;
    return (
        <div className="flex flex-col gap-1 flex-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                {label}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="text-sm border border-slate-200 rounded-md px-3 py-2 bg-white outline-none focus:border-slate-400"
            >
                {versionHistory.map((ver) => (
                    <option key={ver.id} value={ver.id}>
                        {ver.id.toUpperCase()} · {ver.author} · {ver.timestamp}
                        {ver.current ? " (current)" : ""}
                    </option>
                ))}
            </select>
            <span className="text-[11px] text-slate-400">{v.absolute}</span>
        </div>
    );
};

const DiffTextBox = ({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: "left" | "right";
}) => (
    <div className="flex flex-col gap-1.5 flex-1">
        <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tone === "left" ? "#9c4640" : "#246b3a" }}
        >
            {label}
        </span>
        <div
            className="text-sm rounded-md border p-3 whitespace-pre-wrap break-words"
            style={{
                backgroundColor: tone === "left" ? "#fef2f2" : "#f0fdf4",
                borderColor: tone === "left" ? "#fecaca" : "#bbf7d0",
                color: tone === "left" ? "#7f1d1d" : "#14532d",
            }}
        >
            {value}
        </div>
    </div>
);

const DiffListBox = ({
    label,
    items,
    tone,
    other,
}: {
    label: string;
    items: string[];
    tone: "left" | "right";
    other: string[];
}) => (
    <div className="flex flex-col gap-1.5 flex-1">
        <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tone === "left" ? "#9c4640" : "#246b3a" }}
        >
            {label}
        </span>
        <ul
            className="text-sm rounded-md border p-3 list-none flex flex-col gap-1.5"
            style={{
                backgroundColor: tone === "left" ? "#fef2f2" : "#f0fdf4",
                borderColor: tone === "left" ? "#fecaca" : "#bbf7d0",
                color: tone === "left" ? "#7f1d1d" : "#14532d",
            }}
        >
            {items.map((item, i) => {
                const inOther = other.includes(item);
                return (
                    <li key={i} className="flex gap-2">
                        <span className="font-bold shrink-0">
                            {inOther ? "•" : tone === "left" ? "−" : "+"}
                        </span>
                        <span
                            className={
                                inOther ? "opacity-60" : "font-medium"
                            }
                        >
                            {item}
                        </span>
                    </li>
                );
            })}
        </ul>
    </div>
);

const DiffImageBox = ({
    label,
    src,
    tone,
}: {
    label: string;
    src: string;
    tone: "left" | "right";
}) => (
    <div className="flex flex-col gap-1.5 flex-1">
        <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tone === "left" ? "#9c4640" : "#246b3a" }}
        >
            {label}
        </span>
        <div
            className="rounded-md border overflow-hidden"
            style={{
                borderColor: tone === "left" ? "#fecaca" : "#bbf7d0",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt=""
                className="w-full h-[180px] object-cover"
            />
        </div>
    </div>
);

const ChangeStatPills = ({
    added,
    removed,
    edited,
}: {
    added: number;
    removed: number;
    edited: number;
}) => (
    <div className="flex items-center gap-2 text-[11px] font-bold">
        {edited > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-sun-500/15 text-sun-700">
                <span className="w-1.5 h-1.5 rounded-full bg-sun-500" />
                {edited} edited
            </span>
        )}
        {added > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-fern-500/15 text-fern-700">
                <span className="w-1.5 h-1.5 rounded-full bg-fern-500" />
                +{added} added
            </span>
        )}
        {removed > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-roman-500/15 text-roman-700">
                <span className="w-1.5 h-1.5 rounded-full bg-roman-500" />
                −{removed} removed
            </span>
        )}
    </div>
);

export const CompareVersionsModal = ({
    onClose,
    lockToRecent = false,
}: {
    onClose: () => void;
    lockToRecent?: boolean;
}) => {
    const { active, previousVersion } = useVersion();
    const [leftId, setLeftId] = useState(
        lockToRecent
            ? previousVersion.id
            : (() => {
                  const idx = versionHistory.findIndex(
                      (v) => v.id === active.id
                  );
                  return versionHistory[
                      Math.min(idx + 1, versionHistory.length - 1)
                  ].id;
              })()
    );
    const [rightId, setRightId] = useState(
        lockToRecent ? versionHistory[0].id : active.id
    );
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const left = versionHistory.find((v) => v.id === leftId)!;
    const right = versionHistory.find((v) => v.id === rightId)!;
    const diffs = computeDiff(left, right);
    const totals = aggregateChanges(diffs);

    const toggleCollapsed = (slug: string) =>
        setCollapsed((p) => ({ ...p, [slug]: !p[slug] }));

    const collapseAll = () => {
        const all: Record<string, boolean> = {};
        diffs.forEach((d) => {
            all[slugify(d.field)] = true;
        });
        setCollapsed(all);
    };

    const expandAll = () => setCollapsed({});

    const scrollTo = (slug: string) => {
        const el = scrollRef.current?.querySelector(`[data-anchor="${slug}"]`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveAnchor(slug);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[1200px] h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-5 h-5"
                            style={{ color: BRAND_BLUE }}
                        />
                        <h2 className="text-lg font-bold text-slate-800">
                            {lockToRecent
                                ? "Recent Change Summary"
                                : "Compare Versions"}
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

                {/* Version pickers + summary (or locked recent-edit header) */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-end gap-4">
                    {lockToRecent ? (
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                    style={{
                                        backgroundColor: left.isSystem
                                            ? "#94a3b8"
                                            : BRAND_BLUE,
                                    }}
                                >
                                    {left.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                        Previous · {left.id.toUpperCase()}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {left.author}
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        {left.absolute}
                                    </span>
                                </div>
                            </div>
                            <HiArrowSmRight className="text-slate-400 w-6 h-6" />
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                    style={{
                                        backgroundColor: right.isSystem
                                            ? "#94a3b8"
                                            : BRAND_BLUE,
                                    }}
                                >
                                    {right.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                        Current · {right.id.toUpperCase()}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {right.author}
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        {right.absolute}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <VersionPicker
                                value={leftId}
                                onChange={setLeftId}
                                label="Compare From"
                            />
                            <HiArrowSmRight className="text-slate-400 w-6 h-6 mb-4" />
                            <VersionPicker
                                value={rightId}
                                onChange={setRightId}
                                label="To"
                            />
                        </>
                    )}
                    <div className="ml-auto flex flex-col items-end gap-1.5 mb-1">
                        {diffs.length === 0 ? (
                            <span className="text-sm font-semibold text-slate-500">
                                No differences
                            </span>
                        ) : (
                            <>
                                <span
                                    className="text-sm font-bold"
                                    style={{ color: BRAND_BLUE }}
                                >
                                    {diffs.length} field
                                    {diffs.length === 1 ? "" : "s"} changed
                                </span>
                                <ChangeStatPills {...totals} />
                            </>
                        )}
                    </div>
                </div>

                {/* Body: sidebar + diff list */}
                {diffs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2">
                        <MdCheckCircle className="w-12 h-12 text-fern-500" />
                        <p className="text-slate-600 text-sm">
                            These two versions are identical.
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex min-h-0">
                        {/* Sidebar — sticky jump nav */}
                        <aside className="w-[240px] shrink-0 border-r border-slate-200 bg-slate-50/40 overflow-y-auto">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-slate-50/95 backdrop-blur z-10">
                                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                    Changed Fields
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={expandAll}
                                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-800"
                                        title="Expand all"
                                    >
                                        Expand
                                    </button>
                                    <span className="text-slate-300">|</span>
                                    <button
                                        type="button"
                                        onClick={collapseAll}
                                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-800"
                                        title="Collapse all"
                                    >
                                        Collapse
                                    </button>
                                </div>
                            </div>
                            <ul className="p-2 flex flex-col gap-0.5">
                                {diffs.map((d) => {
                                    const slug = slugify(d.field);
                                    const s = summarizeDiff(d);
                                    const isActive = activeAnchor === slug;
                                    return (
                                        <li key={slug}>
                                            <button
                                                type="button"
                                                onClick={() => scrollTo(slug)}
                                                className={`w-full text-left rounded-md px-2.5 py-2 transition-colors ${
                                                    isActive
                                                        ? "bg-white shadow-sm border border-slate-200"
                                                        : "hover:bg-white"
                                                }`}
                                            >
                                                <div className="text-xs font-semibold text-slate-800">
                                                    {d.field}
                                                </div>
                                                <div className="mt-1 flex items-center gap-1 flex-wrap">
                                                    {s.edited > 0 && (
                                                        <span className="text-[10px] rounded px-1 py-px bg-sun-500/15 text-sun-700 font-bold">
                                                            edited
                                                        </span>
                                                    )}
                                                    {s.added > 0 && (
                                                        <span className="text-[10px] rounded px-1 py-px bg-fern-500/15 text-fern-700 font-bold">
                                                            +{s.added}
                                                        </span>
                                                    )}
                                                    {s.removed > 0 && (
                                                        <span className="text-[10px] rounded px-1 py-px bg-roman-500/15 text-roman-700 font-bold">
                                                            −{s.removed}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>

                        {/* Main diff list */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-6 py-5 bg-white"
                        >
                            <div className="space-y-4">
                                {diffs.map((d) => {
                                    const slug = slugify(d.field);
                                    const isCollapsed = collapsed[slug];
                                    const s = summarizeDiff(d);
                                    return (
                                        <div
                                            key={slug}
                                            data-anchor={slug}
                                            className="border border-slate-200 rounded-lg overflow-hidden scroll-mt-2"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleCollapsed(slug)
                                                }
                                                className="w-full px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <HiChevronDown
                                                        className={`text-slate-500 transition-transform ${
                                                            isCollapsed
                                                                ? "-rotate-90"
                                                                : ""
                                                        }`}
                                                    />
                                                    <h3 className="text-sm font-bold text-slate-800">
                                                        {d.field}
                                                    </h3>
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                                        {d.type}
                                                    </span>
                                                </div>
                                                <ChangeStatPills {...s} />
                                            </button>
                                            {!isCollapsed && (
                                                <div className="p-4 flex gap-4">
                                                    {d.type === "text" && (
                                                        <>
                                                            <DiffTextBox
                                                                label={`${left.id.toUpperCase()} · Before`}
                                                                value={
                                                                    d.left as string
                                                                }
                                                                tone="left"
                                                            />
                                                            <DiffTextBox
                                                                label={`${right.id.toUpperCase()} · After`}
                                                                value={
                                                                    d.right as string
                                                                }
                                                                tone="right"
                                                            />
                                                        </>
                                                    )}
                                                    {d.type === "list" && (
                                                        <>
                                                            <DiffListBox
                                                                label={`${left.id.toUpperCase()} · Before`}
                                                                items={
                                                                    d.left as string[]
                                                                }
                                                                other={
                                                                    d.right as string[]
                                                                }
                                                                tone="left"
                                                            />
                                                            <DiffListBox
                                                                label={`${right.id.toUpperCase()} · After`}
                                                                items={
                                                                    d.right as string[]
                                                                }
                                                                other={
                                                                    d.left as string[]
                                                                }
                                                                tone="right"
                                                            />
                                                        </>
                                                    )}
                                                    {d.type === "image" && (
                                                        <>
                                                            <DiffImageBox
                                                                label={`${left.id.toUpperCase()} · Before`}
                                                                src={
                                                                    d.left as string
                                                                }
                                                                tone="left"
                                                            />
                                                            <DiffImageBox
                                                                label={`${right.id.toUpperCase()} · After`}
                                                                src={
                                                                    d.right as string
                                                                }
                                                                tone="right"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                        Comparing <strong>{left.id}</strong> ({left.author}) →{" "}
                        <strong>{right.id}</strong> ({right.author})
                    </span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm px-4 py-2 rounded-md text-slate-600 hover:bg-white border border-slate-200"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="text-sm font-bold px-4 py-2 rounded-md text-white shadow-sm"
                            style={{ backgroundColor: BRAND_BLUE }}
                        >
                            Restore {left.id.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
