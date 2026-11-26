"use client";

import clsx from "clsx";
import type { IconType } from "react-icons";
import {
    MdArrowDownward,
    MdClose,
    MdCloudDownload,
    MdDelete,
    MdFilterList,
    MdNotificationsActive,
    MdOutlineViewColumn,
    MdSearch,
    MdSend,
} from "react-icons/md";
import { IconButton, SUBTITLE2, Tooltip } from "../mui";
import ResultsTableSearchFilter from "./ResultsTableSearchFilter";
import { useTable } from "./context";
import type { BatchIcon } from "./types";

/* Copy of ResultsTableEnhancedToolbar.js: a Toolbar padded 16px 32px
   holding "You are viewing {count} {label}" (h6 at 1.2rem, normal weight)
   or the search filter, and on the right the search / column filter /
   global filter icon buttons. With rows selected it turns pink
   (secondary text on lighten(secondary.light, .85) = #fce4ec), says
   "{n} selected" and swaps the icons for the batch actions. Only the batch
   icons the invoice tables use are mapped. */

const ICONS: Record<BatchIcon, { label: string; Icon: IconType }> = {
    delete: { label: "Delete", Icon: MdDelete },
    export: { label: "Export", Icon: MdCloudDownload },
    send: { label: "Send to Client", Icon: MdSend },
    remind: { label: "Remind Client", Icon: MdNotificationsActive },
    download: { label: "Download", Icon: MdArrowDownward },
};

const withCommas = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Badge variant="dot" color="primary" overlap="circular", pinned to the
    button's top-right corner by the toolbar's badge class. */
const Dot = ({ invisible }: { invisible?: boolean }) => (
    <span
        aria-hidden="true"
        className={clsx(
            "absolute right-0 top-0 z-0 box-border flex h-2 min-w-2 origin-[100%_0%] items-center justify-center rounded-[4px] bg-[#03a9f4] p-0 transition-transform duration-[225ms]",
            invisible ? "translate-x-1/2 -translate-y-1/2 scale-0" : "translate-x-1/2 -translate-y-1/2 scale-100",
        )}
    />
);

const ResultsTableEnhancedToolbar = () => {
    const { props, state, setState } = useTable();
    const {
        count = 0,
        label = "record",
        hasSearch = true,
        hasColumnFilters = true,
        hasGlobalFilters = true,
        searchFilterOptions = [],
        onSearchFilterChange,
        onSearchFilterClose,
        onGlobalFiltersClick,
        batchActions = [],
        isLoadingData,
        activeGlobalFilters,
        activeColumnFilters,
        columns = [],
    } = props;
    const { isSelectedAll, selected, unselected, showSearchFilter, showColumnFilters } = state;
    const numSelected = isSelectedAll ? count - unselected.length : selected.length;

    const title = () => {
        if (hasSearch && showSearchFilter)
            return (
                <ResultsTableSearchFilter
                    searchFilterOptions={searchFilterOptions}
                    onSearchFilterChange={onSearchFilterChange}
                    isLoadingData={isLoadingData}
                />
            );
        if (numSelected > 0)
            return <span className={clsx(SUBTITLE2, "!text-inherit")}>{withCommas(numSelected)} selected</span>;
        if (isLoadingData)
            return (
                <h6 id="tableTitle" className="m-0 text-[1.2rem] font-normal leading-[1.6] tracking-[0.0075em] text-[#424242]">
                    Loading ...
                </h6>
            );
        return (
            <h6
                id="tableTitle"
                data-cy={`${label}-header`}
                className="m-0 text-[1.2rem] font-normal leading-[1.6] tracking-[0.0075em] text-[#424242]"
            >
                {`You are viewing ${withCommas(count)} ${label}`}
            </h6>
        );
    };

    return (
        <div
            className={clsx(
                "relative flex min-h-14 items-center rounded-[3px] px-8 py-4 sm:min-h-16",
                numSelected > 0 && "bg-[#fce4ec] text-[#e91e63]",
            )}
        >
            <div className="flex-[0_0_auto]">{title()}</div>
            <div className="flex-[1_1_100%]" />
            <div className="text-[rgba(0,0,0,0.6)]">
                {numSelected > 0 ? (
                    <div className="flex" data-cy="batch-actions-row">
                        {batchActions.map((action, key) => {
                            if (!action.enableInSelectAll && isSelectedAll) return null;
                            const { label: name, Icon } = ICONS[action.icon];
                            return (
                                <Tooltip key={`accounts-batchicons-${key}-tooltip`} title={name} placement="top">
                                    <span>
                                        <IconButton
                                            data-cy={`batch-buttons-${key}`}
                                            aria-label={name}
                                            onClick={action.handler}
                                            disabled={action.disabled}
                                            className="size-12"
                                        >
                                            <Icon className="size-6" />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center">
                        {hasSearch && (
                            <Tooltip title={showSearchFilter ? "Clear Search" : "Toggle Search Filter"} placement="top">
                                {showSearchFilter ? (
                                    <IconButton
                                        data-cy="hide-search-filter"
                                        aria-label="Close"
                                        onClick={() => {
                                            setState({ showSearchFilter: false });
                                            onSearchFilterClose?.();
                                        }}
                                        disabled={isLoadingData}
                                        className="!text-[#e91e63] hover:!bg-[rgba(233,30,99,0.04)]"
                                    >
                                        <MdClose className="size-6" />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        data-cy="show-search-filter"
                                        aria-label="Search"
                                        onClick={() => setState({ showSearchFilter: true })}
                                        disabled={isLoadingData || searchFilterOptions.length === 0}
                                    >
                                        <MdSearch className="size-6" />
                                    </IconButton>
                                )}
                            </Tooltip>
                        )}
                        {hasColumnFilters && (
                            <span className="relative ml-0 inline-flex shrink-0 align-middle">
                                <IconButton
                                    data-cy="column-filter"
                                    aria-label="Column Filter"
                                    onClick={() => setState({ showColumnFilters: true })}
                                    disabled={isLoadingData || columns.length === 0}
                                    className={clsx(showColumnFilters && "!text-[#03a9f4] hover:!bg-[rgba(3,169,244,0.04)]")}
                                >
                                    <Tooltip title={activeColumnFilters ? "Has Active Column Filters" : "Column Filters"} placement="top">
                                        <MdOutlineViewColumn className="size-6" />
                                    </Tooltip>
                                </IconButton>
                                <Dot invisible={!activeColumnFilters} />
                            </span>
                        )}
                        {hasGlobalFilters &&
                            (activeGlobalFilters ? (
                                <span className="relative ml-0 inline-flex shrink-0 align-middle">
                                    <IconButton
                                        data-cy="global-filter"
                                        aria-label="Filter"
                                        onClick={onGlobalFiltersClick}
                                        disabled={isLoadingData}
                                        className="!text-[#03a9f4] hover:!bg-[rgba(3,169,244,0.04)]"
                                    >
                                        <Tooltip title="Has Active Global Filters" placement="top">
                                            <MdFilterList className="size-6" />
                                        </Tooltip>
                                    </IconButton>
                                    <Dot />
                                </span>
                            ) : (
                                <IconButton
                                    data-cy="global-filter"
                                    aria-label="Filter"
                                    onClick={onGlobalFiltersClick}
                                    disabled={isLoadingData}
                                >
                                    <Tooltip title="Global Filters" placement="top">
                                        <MdFilterList className="size-6" />
                                    </Tooltip>
                                </IconButton>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsTableEnhancedToolbar;
