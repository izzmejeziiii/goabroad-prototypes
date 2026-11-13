"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import {
    MdArrowDownward,
    MdArrowDropDown,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdChevronRight,
    MdCloudDownload,
    MdFilterList,
    MdIndeterminateCheckBox,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdOutlineViewColumn,
    MdSearch,
} from "react-icons/md";
import {
    isFreeAccount,
    leadName,
    lockedLeadCount,
    viewableLeads,
} from "../data";
import LeadsGate from "../LeadsGate";
import type { UpgradeVersion } from "../upgradeVersion";
import { formatNumeric } from "../format";
import type { Lead } from "../types";
import { Tooltip } from "../ui";
import LeadDrawer from "./LeadDrawer";

/* Copy of the Leads tab on PR 784 (Inquiries/ResultsMain.js on the shared
   components/ResultsTable): a MUI Paper with the "You are viewing N
   inquiries" toolbar, a selectable, sortable table and TablePagination.
   Row click opens the Inquiry Summary drawer; `?lead=<id>` (from "View lead"
   on the dashboard) opens it on load. Column and global filters, search and
   export are drawn but not wired in the prototype.

   Lead threshold: the table only holds the leads the account can open. For a
   free account, blurred placeholder rows follow them on the last page under
   the same "upgrade to view" panel as the dashboard. */

const COLUMNS: { name: string; key: keyof Row; sortable?: boolean; bold?: boolean }[] = [
    { name: "Date of Inquiry", key: "date", sortable: true },
    { name: "Inquirer Name", key: "name", bold: true },
    { name: "Email Address", key: "email" },
    { name: "Citizenship", key: "citizenship" },
    { name: "Program Name", key: "program" },
];

type Row = {
    id: number;
    date: string;
    name: string;
    email: string;
    citizenship: string;
    program: string;
};

const toRow = (lead: Lead): Row => ({
    id: lead.id,
    date: formatNumeric(lead.inquiryDate),
    name: leadName(lead),
    email: lead.email,
    citizenship: lead.citizenship,
    program: lead.programName,
});

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 50];

const ICON_BUTTON =
    "inline-flex shrink-0 items-center justify-center rounded-full p-2 transition-colors enabled:hover:bg-black/[0.04] disabled:cursor-default disabled:text-black/[0.26]";

const Checkbox = ({
    checked,
    indeterminate,
    onChange,
    label,
    className,
}: {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
    label: string;
    className?: string;
}) => (
    <button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        aria-label={label}
        onClick={(e) => {
            e.stopPropagation();
            onChange();
        }}
        className={clsx(
            "inline-flex rounded-full p-[9px] hover:bg-black/[0.04]",
            checked || indeterminate ? "text-[#03a9f4]" : "text-black/60",
            className,
        )}
    >
        {indeterminate ? (
            <MdIndeterminateCheckBox className="size-6" />
        ) : checked ? (
            <MdCheckBox className="size-6" />
        ) : (
            <MdCheckBoxOutlineBlank className="size-6" />
        )}
    </button>
);

/* Stand-ins drawn under the blur for locked leads. Not real leads: the
   client only ever gets the locked count. Each row is a fixed 48px (h-12,
   borders collapse into it) so the gate panel can cover the block exactly. */
const LOCKED_PLACEHOLDERS = [
    ["11/00/2026", "Xxxxxx Xxxxxxx", "xxxxxx.xxxxxx@xxxxxxx.com", "Xxxxxx Xxxxxx", "Xxx Xxxxxx Xxxxxxxxxxxx"],
    ["11/00/2026", "Xxxxx Xxxxxxxx", "xxxxx.xxxxxxx@xxxxxxx.com", "Xxxxxxx", "Xxxxxxxx Xxxxxx Xxxxxxx"],
    ["10/00/2026", "Xxxx Xxxxxx", "xxxx.xxxxx@xxxxxxx.com", "Xxxxx", "Xxxxx Xxxxxxx in Xxxx"],
    ["10/00/2026", "Xxxxxx Xxxxxx", "xxxxxx.xxxxx@xxxxxxx.com", "Xxxxxxxxx", "Xxxxxxxxx Xxxxxx Xxxxxx"],
    ["10/00/2026", "Xxxxx Xxxxxxxxx", "xxxxx.xxxxxxxx@xxxxxxx.com", "Xxxxxx", "Xxx Xxxxxx Xxxxxxxxxxxx"],
];
const LOCKED_ROW_HEIGHT = 48;

const LeadsTable = ({ upgradeVersion }: { upgradeVersion: UpgradeVersion }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [sortDesc, setSortDesc] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<number[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [openId, setOpenId] = useState<number | null>(() => {
        const id = Number(searchParams.get("lead"));
        return viewableLeads.some((lead) => lead.id === id) ? id : null;
    });

    // Like the real tab, drop the deep link once the drawer has it (keeping
    // any other params, e.g. ?upgrade=).
    useEffect(() => {
        if (!searchParams.get("lead")) return;
        const rest = new URLSearchParams(searchParams);
        rest.delete("lead");
        const query = rest.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, [searchParams, router, pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const close = (e: MouseEvent) =>
            !menuRef.current?.contains(e.target as Node) && setMenuOpen(false);
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [menuOpen]);

    const sorted = useMemo(
        () => (sortDesc ? viewableLeads : [...viewableLeads].reverse()),
        [sortDesc],
    );
    const count = sorted.length;
    const pageRows = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(toRow);
    const pageIds = pageRows.map((row) => row.id);
    const selectedOnPage = pageIds.filter((id) => selected.includes(id));
    const numSelected = selected.length;
    const openLead = viewableLeads.find((lead) => lead.id === openId) ?? null;
    const closeDrawer = useCallback(() => setOpenId(null), []);

    const toggleRow = (id: number) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );

    const togglePage = () =>
        setSelected((prev) =>
            selectedOnPage.length > 0
                ? prev.filter((id) => !pageIds.includes(id))
                : [...new Set([...prev, ...pageIds])],
        );

    const firstShown = count === 0 ? 0 : page * rowsPerPage + 1;
    const lastShown = Math.min(count, (page + 1) * rowsPerPage);
    const isLastPage = page + 1 >= Math.ceil(count / rowsPerPage) || count === 0;
    const lockedRows =
        isFreeAccount && isLastPage
            ? Math.min(lockedLeadCount, LOCKED_PLACEHOLDERS.length)
            : 0;

    return (
        <>
            <LeadDrawer lead={openLead} onClose={closeDrawer} />

            <div className="rounded-sm bg-white p-0 text-black/[0.87] shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]">
                {/* EnhancedToolbar */}
                <div
                    className={clsx(
                        "relative flex min-h-14 items-center rounded-[3px] px-8 py-4 sm:min-h-16",
                        numSelected > 0 && "bg-[#fce4ec] text-[#e91e63]",
                    )}
                >
                    <div className="flex-[0_0_auto]">
                        {numSelected > 0 ? (
                            <span className="text-[0.875rem] font-medium leading-[1.57] tracking-[0.00714em]">
                                {numSelected} selected
                            </span>
                        ) : (
                            <h2 className="text-[1.2rem] font-normal leading-[1.6] tracking-[0.0075em] text-[#424242]">
                                You are viewing {count.toLocaleString("en-US")}{" "}
                                {count === 1 ? "inquiry" : "inquiries"}
                            </h2>
                        )}
                    </div>
                    <div className="flex-[1_1_100%]" />
                    <div className="text-black/60">
                        {numSelected > 0 ? (
                            <div className="flex">
                                <Tooltip title="Export" placement="top">
                                    <button
                                        type="button"
                                        aria-label="Export"
                                        className={clsx(ICON_BUTTON, "text-black/[0.54]")}
                                    >
                                        <MdCloudDownload className="size-6" />
                                    </button>
                                </Tooltip>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Tooltip title="Toggle Search Filter" placement="top">
                                    <button
                                        type="button"
                                        aria-label="Search"
                                        disabled
                                        className={ICON_BUTTON}
                                    >
                                        <MdSearch className="size-6" />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Column Filters" placement="top">
                                    <button
                                        type="button"
                                        aria-label="Column Filter"
                                        className={clsx(ICON_BUTTON, "text-black/[0.54]")}
                                    >
                                        <MdOutlineViewColumn className="size-6" />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Global Filters" placement="top">
                                    <button
                                        type="button"
                                        aria-label="Filter"
                                        className={clsx(ICON_BUTTON, "text-black/[0.54]")}
                                    >
                                        <MdFilterList className="size-6" />
                                    </button>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-full min-h-[480px] overflow-x-auto px-6 pb-4">
                    <table className="w-full border-collapse border-spacing-0 text-[0.875rem] leading-[1.43] tracking-[0.01071em]">
                        <thead className="h-[42px]">
                            <tr className="text-left">
                                <th className="w-[60px] min-w-[60px] whitespace-nowrap border-b border-solid border-b-[rgb(224,224,224)] p-0">
                                    <div className="relative flex items-center" ref={menuRef}>
                                        <Checkbox
                                            label="Select all on this page"
                                            checked={
                                                selectedOnPage.length > 0 &&
                                                selectedOnPage.length === pageIds.length
                                            }
                                            indeterminate={
                                                selectedOnPage.length > 0 &&
                                                selectedOnPage.length < pageIds.length
                                            }
                                            onChange={togglePage}
                                            className="pr-0"
                                        />
                                        <button
                                            type="button"
                                            aria-label="Selection options"
                                            onClick={() => setMenuOpen((v) => !v)}
                                            className="inline-flex text-black/[0.54]"
                                        >
                                            <MdArrowDropDown className="size-6" />
                                        </button>
                                        {menuOpen && (
                                            <ul className="absolute left-0 top-full z-10 min-w-36 rounded-sm bg-white py-0 shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]">
                                                {[
                                                    {
                                                        label: "Select All Results",
                                                        onClick: () => setSelected(viewableLeads.map((l) => l.id)),
                                                    },
                                                    {
                                                        label: "Select None",
                                                        onClick: () => setSelected([]),
                                                    },
                                                ].map((item) => (
                                                    <li key={item.label}>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                item.onClick();
                                                                setMenuOpen(false);
                                                            }}
                                                            className="block w-full whitespace-nowrap p-2 text-left text-[0.9rem] font-normal leading-normal text-black/[0.87] hover:bg-black/[0.04]"
                                                        >
                                                            {item.label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </th>
                                {COLUMNS.map((column) => {
                                    const active = column.sortable;
                                    return (
                                        <th
                                            key={column.key}
                                            aria-sort={
                                                active
                                                    ? sortDesc
                                                        ? "descending"
                                                        : "ascending"
                                                    : undefined
                                            }
                                            className="border-b border-solid border-b-[rgb(224,224,224)] px-2 py-0 text-[0.75rem] font-medium leading-none text-black/[0.54]"
                                        >
                                            <span
                                                role={column.sortable ? "button" : undefined}
                                                onClick={() => {
                                                    if (!column.sortable) return;
                                                    setSortDesc((v) => !v);
                                                    setPage(0);
                                                }}
                                                className={clsx(
                                                    "inline-flex items-center whitespace-nowrap hover:text-black/60",
                                                    column.sortable ? "cursor-pointer" : "cursor-default",
                                                    active && "!text-black/[0.87]",
                                                )}
                                            >
                                                {column.name}
                                                {column.sortable && (
                                                    <MdArrowDownward
                                                        className={clsx(
                                                            "mx-1 size-[18px] text-black/60 transition-transform duration-150",
                                                            !sortDesc && "rotate-180",
                                                        )}
                                                    />
                                                )}
                                            </span>
                                        </th>
                                    );
                                })}
                                <th className="border-b border-solid border-b-[rgb(224,224,224)] px-2 py-0" />
                            </tr>
                        </thead>

                        <tbody>
                            {pageRows.map((row) => {
                                const isSelected = selected.includes(row.id);
                                return (
                                    <tr
                                        key={row.id}
                                        onClick={() => {
                                            setOpenId(row.id);
                                            setSelected([]);
                                        }}
                                        className={clsx(
                                            "group/row cursor-pointer border-l-[5px] border-solid border-l-white hover:bg-black/[0.04]",
                                            isSelected && "bg-black/[0.04]",
                                        )}
                                    >
                                        <td className="w-[60px] min-w-[60px] border-b border-solid border-b-[rgb(224,224,224)] p-0 leading-[1.3]">
                                            <Checkbox
                                                label={`Select ${row.name}`}
                                                checked={isSelected}
                                                onChange={() => toggleRow(row.id)}
                                            />
                                        </td>
                                        {COLUMNS.map((column) => (
                                            <td
                                                key={column.key}
                                                className={clsx(
                                                    "w-[180px] min-w-[180px] border-b border-solid border-b-[rgb(224,224,224)] p-2 text-[0.8215rem] leading-[1.3]",
                                                    column.bold
                                                        ? "font-bold text-[#424242]"
                                                        : "text-black/[0.87]",
                                                )}
                                            >
                                                {row[column.key]}
                                            </td>
                                        ))}
                                        <td className="w-[180px] min-w-[60px] border-b border-solid border-b-[rgb(224,224,224)] p-2 leading-[1.3]">
                                            <div className="flex items-center">
                                                <span
                                                    className="inline-flex items-center whitespace-nowrap p-1.5 text-[11px] font-semibold text-[#757575] opacity-0 transition-opacity group-hover/row:opacity-100"
                                                    aria-hidden="true"
                                                >
                                                    View
                                                    <MdChevronRight className="size-[13px]" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {lockedRows > 0 && (
                                <>
                                    {LOCKED_PLACEHOLDERS.slice(0, lockedRows).map((cells, i) => (
                                        <tr
                                            key={`locked-${i}`}
                                            aria-hidden="true"
                                            className="pointer-events-none h-12 select-none border-l-[5px] border-solid border-l-white"
                                        >
                                            <td className="w-[60px] min-w-[60px] border-b border-solid border-b-[rgb(224,224,224)] p-0">
                                                <span className="inline-flex p-[9px] text-black/60 blur-[5px]">
                                                    <MdCheckBoxOutlineBlank className="size-6" />
                                                </span>
                                            </td>
                                            {cells.map((cell, c) => (
                                                <td
                                                    key={c}
                                                    className={clsx(
                                                        "w-[180px] min-w-[180px] whitespace-nowrap border-b border-solid border-b-[rgb(224,224,224)] p-2 text-[0.8215rem] leading-[1.3]",
                                                        COLUMNS[c].bold
                                                            ? "font-bold text-[#424242]"
                                                            : "text-black/[0.87]",
                                                    )}
                                                >
                                                    <span className="blur-[5px]">{cell}</span>
                                                </td>
                                            ))}
                                            <td className="w-[180px] min-w-[60px] border-b border-solid border-b-[rgb(224,224,224)] p-2" />
                                        </tr>
                                    ))}
                                    {/* Zero-height row whose cell anchors the gate over the
                                        blurred rows above it */}
                                    <tr>
                                        <td colSpan={COLUMNS.length + 2} className="relative h-0 border-0 p-0">
                                            <div
                                                className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-b from-white/30 to-white/80 p-4"
                                                style={{ height: lockedRows * LOCKED_ROW_HEIGHT }}
                                            >
                                                <LeadsGate
                                                    lockedCount={lockedLeadCount}
                                                    version={upgradeVersion}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td colSpan={1000} className="p-0 text-[0.875rem]">
                                    <div className="flex min-h-[52px] items-center pl-4 pr-0.5 text-black/[0.87] sm:pl-6">
                                        <div className="flex-[1_1_100%]" />
                                        <p className="shrink-0 text-[0.875rem] leading-[1.43] tracking-[0.01071em]">
                                            Rows per page:
                                        </p>
                                        <div className="relative ml-2 mr-8 inline-flex items-center">
                                            <select
                                                aria-label="Rows per page"
                                                value={rowsPerPage}
                                                onChange={(e) => {
                                                    setRowsPerPage(Number(e.target.value));
                                                    setPage(0);
                                                }}
                                                className="cursor-pointer appearance-none bg-transparent py-1 pl-2 pr-6 text-right text-[0.75rem] font-medium leading-none text-black/[0.54] [text-align-last:right] focus:outline-none"
                                            >
                                                {ROWS_PER_PAGE_OPTIONS.map((n) => (
                                                    <option key={n} value={n}>
                                                        {n}
                                                    </option>
                                                ))}
                                            </select>
                                            <MdArrowDropDown className="pointer-events-none absolute right-0 size-6 text-black/[0.54]" />
                                        </div>
                                        <p className="shrink-0 text-[0.75rem] font-medium leading-none text-black/[0.54]">
                                            {firstShown}–{lastShown} of {count}
                                        </p>
                                        <div className="ml-5 flex shrink-0">
                                            <button
                                                type="button"
                                                aria-label="Previous Page"
                                                disabled={page === 0}
                                                onClick={() => setPage((p) => p - 1)}
                                                className={clsx(ICON_BUTTON, "text-black/[0.54]")}
                                            >
                                                <MdKeyboardArrowLeft className="size-6" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="Next Page"
                                                disabled={page + 1 >= Math.ceil(count / rowsPerPage)}
                                                onClick={() => setPage((p) => p + 1)}
                                                className={clsx(ICON_BUTTON, "text-black/[0.54]")}
                                            >
                                                <MdKeyboardArrowRight className="size-6" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LeadsTable;
