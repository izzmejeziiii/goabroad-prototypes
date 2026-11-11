"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import CopyButton from "./CopyButton";
import { money } from "./data";
import type { TransferMethod } from "./types";
import { buttonSecondary, inputClass, sectionTitle } from "./ui";

/** Details for a bank transfer, wire, Wise or PayPal payment. Rendered inside
 *  the page's pay form; the sidebar button confirms "I've sent it". */
export default function TransferPanel({
    method,
    amountCents,
    invoiceNumber,
    reference,
    onReferenceChange,
}: {
    method: TransferMethod;
    amountCents: number;
    invoiceNumber: string;
    reference: string;
    onReferenceChange: (value: string) => void;
}) {
    const [linkOpened, setLinkOpened] = useState(false);
    const rows = method.rows(money(amountCents), invoiceNumber);
    const inputId = `ref-${method.id}`;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className={sectionTitle}>{method.heading}</h2>
                    <span className="rounded-full bg-sun-200 px-2.5 py-0.5 text-xs font-semibold text-cobalt-700">
                        Demo details
                    </span>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-600">
                    {method.intro(invoiceNumber)}
                </p>
            </div>

            <dl className="rounded-xl border border-slate-200 bg-white px-5">
                {rows.map((row, i) => (
                    <div
                        key={row.label}
                        className={
                            "flex flex-wrap items-start justify-between gap-x-6 gap-y-1 py-3.5" +
                            (i > 0 ? " border-t border-slate-100" : "")
                        }
                    >
                        <dt className="pt-0.5 text-sm text-slate-600">{row.label}</dt>
                        <dd className="flex items-start gap-1.5 text-right">
                            {row.copy ? (
                                <CopyButton value={row.value} label={row.label} />
                            ) : null}
                            <span className="whitespace-pre-line pt-0.5 text-[15px] font-semibold tabular-nums text-slate-900">
                                {row.value}
                            </span>
                        </dd>
                    </div>
                ))}
            </dl>

            {method.link ? (
                <div className="flex flex-col items-start gap-2">
                    <button
                        type="button"
                        className={buttonSecondary}
                        onClick={() => setLinkOpened(true)}
                    >
                        {method.link.label}
                        <ExternalLink className="h-4 w-4" aria-hidden />
                    </button>
                    {linkOpened ? (
                        <p className="text-sm text-slate-600" role="status">
                            In the live tool this opens GoAbroad&rsquo;s {method.title}{" "}
                            payment page in a new tab.
                        </p>
                    ) : null}
                </div>
            ) : null}

            <div className="flex flex-col gap-1.5 sm:max-w-sm">
                <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
                    {method.referenceLabel}{" "}
                    <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <input
                    id={inputId}
                    name="customerReference"
                    className={inputClass}
                    maxLength={64}
                    autoComplete="off"
                    value={reference}
                    onChange={(e) => onReferenceChange(e.target.value)}
                    aria-describedby={`${inputId}-hint`}
                />
                <span id={`${inputId}-hint`} className="text-sm text-slate-500">
                    Helps us match your payment faster. Once it&rsquo;s sent, press
                    &ldquo;I&rsquo;ve sent {money(amountCents)}&rdquo; and we&rsquo;ll
                    watch for it.
                </span>
            </div>
        </div>
    );
}
