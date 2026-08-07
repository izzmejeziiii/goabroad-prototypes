import type { Column } from "../types";

interface DataTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    onRowClick?: (row: T) => void;
    emptyLabel?: string;
}

export default function DataTable<T extends { id: number | string }>({
    columns,
    rows,
    onRowClick,
    emptyLabel = "No records yet.",
}: DataTableProps<T>) {
    const align = (a?: string) =>
        a === "right"
            ? "text-right"
            : a === "center"
              ? "text-center"
              : "text-left";

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-max text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">
                            {columns.map((c) => (
                                <th
                                    key={c.key}
                                    className={`px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 ${align(
                                        c.align,
                                    )}`}
                                >
                                    {c.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-10 text-center text-sm text-slate-400"
                                >
                                    {emptyLabel}
                                </td>
                            </tr>
                        )}
                        {rows.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => onRowClick?.(row)}
                                className={`${
                                    onRowClick ? "cursor-pointer" : ""
                                } transition-colors hover:bg-brand-50/40`}
                            >
                                {columns.map((c) => (
                                    <td
                                        key={c.key}
                                        className={`px-6 py-4 text-slate-700 ${align(
                                            c.align,
                                        )} ${c.className ?? ""}`}
                                    >
                                        {c.render
                                            ? c.render(row)
                                            : String(
                                                  (row as Record<string, unknown>)[
                                                      c.key
                                                  ] ?? "",
                                              )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
