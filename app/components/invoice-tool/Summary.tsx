import { CircleCheck, Plus } from "lucide-react";
import { cn } from "@/app/lib/utils";

/** How a row changes the money: `deduct` was taken off (green, check),
 *  `add` was added as a penalty (red), `fee` is a method fee added on top
 *  (neutral, plus). Plain rows are amounts or notes. */
export type RowTone = "deduct" | "add" | "fee";

export interface SummaryRow {
    label: string;
    value: string;
    tone?: RowTone;
}

/** The payment summary, read top to bottom as a calculation: the breakdown
 *  rows lead to the result (amount due or balance); fees for the chosen
 *  method come after it, then what's charged today. */
export interface SummaryData {
    title: string;
    /** Short lines under the title, e.g. what the invoice is for and when
     *  it's due. */
    subtitle: string[];
    breakdown: SummaryRow[];
    result: SummaryRow;
    extras: SummaryRow[];
    grand?: SummaryRow;
}

const toneText: Record<RowTone, string> = {
    deduct: "text-fern-700",
    add: "text-roman-700",
    fee: "text-slate-700",
};

function Row({ row }: { row: SummaryRow }) {
    const Icon = row.tone === "deduct" ? CircleCheck : row.tone === "fee" ? Plus : null;
    return (
        <div className="flex justify-between gap-4">
            <dt
                className={cn(
                    "flex items-center gap-1.5",
                    row.tone ? toneText[row.tone] : "text-slate-600",
                )}
            >
                {Icon ? <Icon className="h-4 w-4 flex-none" aria-hidden /> : null}
                {row.label}
            </dt>
            <dd
                className={cn(
                    "text-right",
                    row.tone ? cn("font-semibold", toneText[row.tone]) : "text-slate-900",
                )}
            >
                {row.value}
            </dd>
        </div>
    );
}

/** Title, calculation and totals. Shared by the desktop card and the mobile
 *  bottom sheet so both read the same way. */
export function SummaryBody({ data }: { data: SummaryData }) {
    const { title, subtitle, breakdown, result, extras, grand } = data;
    return (
        <>
            <div className="flex flex-col gap-0.5">
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                {subtitle.map((line) => (
                    <p key={line} className="text-sm text-slate-600">
                        {line}
                    </p>
                ))}
            </div>
            <dl className="flex flex-col gap-3 text-[15px] tabular-nums">
                {breakdown.map((row) => (
                    <Row key={row.label} row={row} />
                ))}
                <div
                    className={cn(
                        "flex items-baseline justify-between gap-3",
                        breakdown.length > 0 && "border-t-2 border-slate-300 pt-3",
                    )}
                >
                    <dt className="text-base font-semibold text-slate-900">
                        {result.label}
                    </dt>
                    <dd className="text-2xl font-bold text-slate-900">{result.value}</dd>
                </div>
                {extras.length > 0 ? (
                    <div className="mt-1 flex flex-col gap-3 border-t border-slate-200 pt-3">
                        {extras.map((row) => (
                            <Row key={row.label} row={row} />
                        ))}
                    </div>
                ) : null}
                {grand ? (
                    <div className="flex items-baseline justify-between gap-4 border-t border-slate-200 pt-3 font-semibold text-slate-900">
                        <dt>{grand.label}</dt>
                        <dd className="text-lg">{grand.value}</dd>
                    </div>
                ) : null}
            </dl>
        </>
    );
}

/** The sticky sidebar card. The pay button is passed in as children so it can
 *  submit the method panel's form from here. */
export default function Summary({
    data,
    children,
}: {
    data: SummaryData;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <SummaryBody data={data} />
            {children}
        </div>
    );
}
