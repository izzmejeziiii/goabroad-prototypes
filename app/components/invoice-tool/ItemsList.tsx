import { CircleAlert, CircleCheck } from "lucide-react";
import { money } from "./data";
import type { DemoInvoice } from "./types";
import { cn } from "@/app/lib/utils";

/** Option Y, "included checklist": every item this payment covers gets a
 *  green check, with a count badge beside the heading. A late fee is a charge,
 *  not something included, so it gets a red alert mark and isn't counted. */
export default function ItemsList({
    invoice,
    className,
}: {
    invoice: DemoInvoice;
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">Items</h2>
                <span className="rounded-full bg-fern-200/40 px-2.5 py-0.5 text-xs font-semibold text-fern-700">
                    {invoice.lines.length} included
                </span>
            </div>
            <ul
                aria-label="Items"
                className="divide-y divide-dashed divide-slate-300 rounded-2xl border border-slate-200 bg-white px-5"
            >
                {invoice.lines.map((line) => (
                    <li key={line.name} className="flex items-start gap-3 py-4">
                        <CircleCheck
                            className="mt-0.5 h-5 w-5 flex-none text-fern-700"
                            aria-label="Included"
                        />
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className="text-[15px] leading-snug font-semibold text-slate-900">
                                {line.name}
                            </span>
                            {line.description ? (
                                <span className="text-sm text-slate-600">
                                    {line.description}
                                </span>
                            ) : null}
                            <span className="text-xs text-slate-500 tabular-nums">
                                Qty {line.qty} × {money(line.priceCents)}
                            </span>
                        </div>
                        <span className="text-[15px] font-semibold whitespace-nowrap text-slate-900 tabular-nums">
                            {money(line.qty * line.priceCents)}
                        </span>
                    </li>
                ))}
                {invoice.lateFees.map((fee) => (
                    <li key={fee.name} className="flex items-start gap-3 py-4">
                        <CircleAlert
                            className="mt-0.5 h-5 w-5 flex-none text-roman-700"
                            aria-label="Late fee"
                        />
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className="text-[15px] font-semibold text-roman-700">
                                {fee.name}
                            </span>
                            <span className="text-xs text-slate-600">
                                Added {fee.appliedOn} · invoice was due {invoice.due}
                            </span>
                        </div>
                        <span className="text-[15px] font-semibold whitespace-nowrap text-roman-700 tabular-nums">
                            {money(fee.amountCents)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
