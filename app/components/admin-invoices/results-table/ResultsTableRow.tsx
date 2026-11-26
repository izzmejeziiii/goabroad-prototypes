"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { MdChevronRight, MdFileCopy, MdMoreHoriz, MdOpenInNew } from "react-icons/md";
import { StatusChip, Tooltip } from "../mui";
import { mdy, toCurrency } from "../format";
import { Checkbox } from "./primitives/Checkbox";
import { MenuItem, Popover } from "./primitives/Popover";
import { BODY_CELL, CELL, useTable } from "./context";
import type { Column, RowIcon, TableRowData } from "./types";

/* Copy of ResultsTableRow.js. A hover row (rgba(0,0,0,.04); a selected one
   is #f9f9f9 from the theme) with a 5px white left border, the select
   checkbox, a cell per column by type, and an actions cell: the "View ›"
   hint that fades in on hover when rows open a drawer, then the row menu
   (MoreHoriz, menu of dense items over the button).

   Text cells keep the real markup's quirks: a column's icons render in a
   left and a right wrapper, so a row with any icon gets an empty 8px left
   wrapper too, nudging its text right; links are lightBlue bold with the
   OpenInNew glyph, and name columns get the copy button. */

const FORMATS: Record<string, string> = {
    bold: "!text-[#424242] font-bold",
    underline: "underline",
    italic: "italic",
    truncate:
        "max-w-[150px] overflow-hidden [&_.rt-cbc]:block [&_.rt-cbc]:max-w-full [&_.rt-cbc]:overflow-hidden [&_.rt-cbc]:text-ellipsis [&_.rt-cbc]:whitespace-nowrap",
};

const LINK =
    "-ml-1 rounded-[3px] px-1 py-[2px] font-bold !text-[#03a9f4] !no-underline hover:bg-[#e1f5fe] hover:!underline hover:underline-offset-2";

const CopyButton = ({ value }: { value: unknown }) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => () => {
        if (timer.current) clearTimeout(timer.current);
    }, []);
    if (!value) return null;
    const copy = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const text = String(value || "");
        if (!text.trim()) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            /* the real one only logs */
        }
    };
    return (
        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"} placement="top">
            <button
                type="button"
                onClick={copy}
                className="ml-1 inline-flex shrink-0 items-center justify-center rounded-full p-1 text-[rgba(0,0,0,0.54)] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
            >
                <MdFileCopy className="size-4" />
            </button>
        </Tooltip>
    );
};

const IconWrap = ({ icons, placement }: { icons: RowIcon[]; placement: "left" | "right" }) => {
    if (!icons.length) return null;
    return (
        <div className={clsx("flex [&>svg]:mr-1 [&>svg]:size-4", placement === "left" ? "float-left mr-2" : "float-right ml-2 mr-4")}>
            {icons
                .filter((i) => i.placement === placement)
                .map(({ icon }, k) => (
                    <div key={`icon-${placement}-${k}`}>{icon}</div>
                ))}
        </div>
    );
};

const ResultsTableRow = ({ row, rowKey }: { row: TableRowData; rowKey: string }) => {
    const { props, state, setState } = useTable();
    const {
        columns = [],
        icons = [],
        iconsChecker,
        rowMenus = [],
        rowMenusChecker,
        rowClassName,
        selectable = true,
        onRowClick,
        onSelectedChange,
        onLinkClick,
    } = props;
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const isSelected = state.isSelectedAll
        ? !state.unselected.some((r) => r.id === row.id)
        : state.selected.some((r) => r.id === row.id);

    const toggle = (e: MouseEvent) => {
        e.stopPropagation();
        if (state.isSelectedAll) {
            const has = state.unselected.some((r) => r.id === row.id);
            setState({ unselected: has ? state.unselected.filter((r) => r.id !== row.id) : [...state.unselected, row] });
        } else {
            const selected = state.selected.some((r) => r.id === row.id)
                ? state.selected.filter((r) => r.id !== row.id)
                : [...state.selected, row];
            onSelectedChange?.(selected);
            setState({ selected });
        }
    };

    const textValue = (column: Column<TableRowData>): ReactNode => {
        const raw = row[column.key];
        const defaultValue = column.type === "number" ? 0 : "";
        const value = column.isCurrency ? toCurrency(Number(raw) || 0) : (raw as ReactNode) || defaultValue;

        if (column.urlKey) {
            const url = String(row[column.urlKey] || "");
            const hasCopy = ["name", "client_name", "provider_name"].includes(column.key);
            if (!url)
                return (
                    <span className="rt-cbc inline-flex items-center align-middle">
                        <span>{value || defaultValue}</span>
                        {hasCopy && <CopyButton value={raw} />}
                    </span>
                );
            if (url.startsWith("http"))
                return (
                    <span className="rt-cbc inline-flex items-center align-middle">
                        <a href={url} target="_blank" rel="noopener noreferrer" className={LINK} onClick={(e) => e.stopPropagation()}>
                            {value || defaultValue}
                            <MdOpenInNew className="ml-1 inline size-[11px] align-[-1px]" />
                        </a>
                    </span>
                );
            return (
                <span className="rt-cbc inline-flex items-center align-middle">
                    <a
                        href={url}
                        className={LINK}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onLinkClick) {
                                e.preventDefault();
                                onLinkClick(url, row);
                            }
                        }}
                    >
                        {value || defaultValue}
                        <MdOpenInNew className="ml-1 inline size-[11px] align-[-1px]" />
                    </a>
                    {hasCopy && <CopyButton value={raw} />}
                </span>
            );
        }

        if (column.countKey && Number(row[column.countKey]) > 1)
            return (
                <span className="flex items-center overflow-hidden">
                    <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{value ?? ""}</span>
                    <span className="ml-1 shrink-0 whitespace-nowrap rounded-[10px] bg-[#e0e0e0] px-[6px] py-[2px] text-[11px]">
                        +{Number(row[column.countKey]) - 1}
                    </span>
                </span>
            );

        return (
            <span className="rt-cbc inline-flex items-center align-middle">
                <span>{value ?? ""}</span>
            </span>
        );
    };

    const cell = (column: Column<TableRowData>, index: number) => {
        const key = `${rowKey}-col-${index}`;
        if (column.renderCell)
            return (
                <td key={key} className={BODY_CELL}>
                    {column.renderCell(row)}
                </td>
            );

        const type = column.type ?? "text";
        const own = icons.filter((i) => i.column === column.key);
        const valid = iconsChecker ? iconsChecker(row, own) : own;

        if (type === "date") {
            const v = String(row[column.key] ?? "");
            return (
                <td key={key} className={BODY_CELL}>
                    {v && v !== "0000-00-00" ? mdy(v) : ""}
                </td>
            );
        }

        if (type.startsWith("status_chip:")) {
            const statusType = type.substring(type.indexOf(":") + 1).trim() as "payment" | "sale_type";
            return (
                <td key={key} className={BODY_CELL}>
                    <StatusChip type={statusType} status={row[column.key] as string} />
                    <IconWrap icons={valid} placement="left" />
                    <IconWrap icons={valid} placement="right" />
                </td>
            );
        }

        if (type === "text" || type === "number") {
            const formatting = column.format ? column.format.split(",") : [];
            return (
                <td
                    key={key}
                    className={clsx(BODY_CELL, formatting.map((f) => FORMATS[f]), column.onClick && "cursor-pointer")}
                    onClick={
                        column.onClick
                            ? (e) => {
                                  e.stopPropagation();
                                  column.onClick?.(row);
                              }
                            : undefined
                    }
                >
                    <span className="flex items-center">
                        <IconWrap icons={valid} placement="left" />
                        {textValue(column)}
                        <IconWrap icons={valid} placement="right" />
                    </span>
                </td>
            );
        }

        return (
            <td key={key} className={BODY_CELL}>
                <span>{String(row[column.key] ?? "")}</span>
            </td>
        );
    };

    const menus = rowMenusChecker ? rowMenusChecker(row, rowMenus.map((m) => ({ ...m }))) : rowMenus;

    return (
        <tr
            data-cy={rowKey}
            onClick={() => onRowClick?.(row)}
            style={{ cursor: onRowClick ? "pointer" : "default", userSelect: "text" }}
            className={clsx(
                "group/row border-0 border-l-[5px] border-solid !border-l-white align-middle text-inherit outline-0",
                isSelected
                    ? "bg-[#f9f9f9] hover:bg-[rgba(3,169,244,0.12)]"
                    : "hover:bg-[rgba(0,0,0,0.04)]",
                "[&>td]:min-w-[175px] [&>td:first-child]:min-w-[60px] [&>td:last-child]:min-w-[60px]",
                rowClassName,
            )}
        >
            {selectable && (
                <td className={clsx(CELL, "px-0 py-2 text-[0.8215rem]")}>
                    <Checkbox checked={isSelected} onClick={toggle} inputProps={{ "data-cy": `row-${rowKey}` }} />
                </td>
            )}
            {columns.map(cell)}
            <td className={BODY_CELL}>
                <div className="flex items-center">
                    {!!onRowClick && (
                        <span
                            aria-hidden="true"
                            className="inline-flex items-center whitespace-nowrap p-[6px] text-[11px] font-semibold text-[#757575] opacity-0 transition-opacity duration-[250ms] group-hover/row:opacity-100"
                        >
                            View
                            <MdChevronRight className="size-[13px]" />
                        </span>
                    )}
                    {menus.length > 0 && (
                        <>
                            <button
                                type="button"
                                data-id={row.id}
                                data-cy={`ellipsis-${rowKey}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAnchor(e.currentTarget);
                                }}
                                className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[rgba(0,0,0,0.54)] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
                            >
                                <MdMoreHoriz className="size-6" />
                            </button>
                            <Popover anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
                                {menus.map(({ text, handler, url, target }, index) =>
                                    url ? (
                                        <Link
                                            key={index}
                                            href={url}
                                            target={target}
                                            className="!text-[#424242] !no-underline"
                                            onClick={() => setAnchor(null)}
                                        >
                                            <MenuItem dense>{text}</MenuItem>
                                        </Link>
                                    ) : (
                                        <MenuItem
                                            key={`${rowKey}-menu-${index}`}
                                            dense
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setAnchor(null);
                                                handler?.(row);
                                            }}
                                        >
                                            {text}
                                        </MenuItem>
                                    ),
                                )}
                            </Popover>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ResultsTableRow;
