"use client";

import ResultsTableRow from "./ResultsTableRow";
import { CELL, useTable } from "./context";

/* Copy of ResultsTableBody.js: one ResultsTableRow per row of the page, or a
   centred h6 "No data" (textSecondary) across the table when there are
   none. The skeleton shown while loading isn't needed: the demo rows are
   always there. */
const ResultsTableBody = () => {
    const { props } = useTable();
    const { data = [], columns = [], noDataMessage } = props;

    if (!data.length)
        return (
            <tbody>
                <tr className="cursor-pointer select-none align-middle">
                    <td colSpan={columns.length + 2} className={`${CELL} min-w-[175px] p-4 text-[0.8215rem]`}>
                        <h6 className="m-0 text-center text-[1.25rem] font-medium leading-[1.6] tracking-[0.0075em] text-[rgba(0,0,0,0.6)]">
                            {noDataMessage || "No data"}
                        </h6>
                    </td>
                </tr>
            </tbody>
        );

    if (!columns.length) return null;

    return (
        <tbody>
            {data.map((row, key) => (
                <ResultsTableRow key={`resultstable-row-wrapper-${row.id}`} rowKey={`resultstable-row-${key}`} row={row} />
            ))}
        </tbody>
    );
};

export default ResultsTableBody;
