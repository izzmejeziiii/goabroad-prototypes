"use client";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Select } from "./primitives/Select";
import { useTable } from "./context";

/* Copy of ResultsTableFooter.js, i.e. MUI's TablePagination in a footer row
   (no bottom rule, theme): a 52px toolbar (24px left, 2px right) with
   "Rows per page:" (body2, in the root's text.primary), the rows select and
   "1–10 of 16" (theme: rgba(0,0,0,.54), 0.75rem, 500), and the previous /
   next arrows (inherit colour, disabled at either end). */

const ResultsTableFooter = () => {
    const { props } = useTable();
    const {
        count = 0,
        page = 0,
        rowsPerPage = 10,
        rowsPerPageOptions = [5, 10, 15, 20, 50],
        isLoadingData,
        onPageChange,
        onRowsPerPageChange,
    } = props;
    const from = count === 0 ? 0 : page * rowsPerPage + 1;
    const to = Math.min(count, (page + 1) * rowsPerPage);
    const prevDisabled = isLoadingData || page === 0;
    const nextDisabled = isLoadingData || page + 1 >= Math.ceil(count / rowsPerPage);

    return (
        <tfoot>
            <tr className="cursor-pointer select-none align-middle">
                <td colSpan={1000} className="overflow-auto border-0 p-0 text-[0.875rem] leading-[1.3125rem] text-[rgba(0,0,0,0.87)]">
                    <div className="relative flex min-h-[52px] items-center pl-4 pr-[2px] sm:pl-6">
                        <div className="flex-[1_1_100%]" />
                        <p className="m-0 shrink-0 text-[0.875rem] leading-[1.43] tracking-[0.01071em]">
                            Rows per page:
                        </p>
                        <Select
                            value={rowsPerPage}
                            disableUnderline
                            disabled={isLoadingData}
                            className="ml-2 mr-8 shrink-0"
                            rootClassName="!text-[0.75rem] font-medium !leading-none !text-[rgba(0,0,0,0.54)]"
                            selectClassName="!pl-2 text-right [text-align-last:right]"
                            items={rowsPerPageOptions.map((n) => ({ value: n, label: String(n) }))}
                            onChange={(n) => onRowsPerPageChange?.(n)}
                        />
                        <p className="m-0 shrink-0 text-[0.75rem] font-medium leading-none tracking-[0.01071em] text-[rgba(0,0,0,0.54)]">
                            {`${from}–${to} of ${count}`}
                        </p>
                        <div className="ml-5 shrink-0">
                            <button
                                type="button"
                                aria-label="Previous Page"
                                title="Go to previous page"
                                disabled={prevDisabled}
                                onClick={() => onPageChange?.(page - 1)}
                                className="inline-flex items-center justify-center rounded-full p-2 text-inherit transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)] disabled:pointer-events-none disabled:text-[rgba(0,0,0,0.26)]"
                            >
                                <MdKeyboardArrowLeft className="size-6" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next Page"
                                title="Go to next page"
                                disabled={nextDisabled}
                                onClick={() => onPageChange?.(page + 1)}
                                className="inline-flex items-center justify-center rounded-full p-2 text-inherit transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)] disabled:pointer-events-none disabled:text-[rgba(0,0,0,0.26)]"
                            >
                                <MdKeyboardArrowRight className="size-6" />
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </tfoot>
    );
};

export default ResultsTableFooter;
