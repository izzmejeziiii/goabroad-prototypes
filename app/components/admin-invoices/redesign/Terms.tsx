"use client";

import clsx from "clsx";
import { AlertCircle, CalendarClock, CalendarDays, Layers, Minus, Plus, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mdyLong, money } from "../format";
import { useDraft } from "./DraftContext";
import { invoiceTotal, settled, simpleDueDate, termsTotal } from "./draft";
import { DateInput, MoneyInput, Select, buttonSecondary, errorText, iconButton } from "./ui";

/* Payment terms, laid out as three cards that say what they mean, with
   the real editor's rules (PaymentTerms / PaymentTermDetails):
   - Upon receipt and 30 days set a due date when picked; it stays editable.
   - Partial and overdue invoices can only use installments; paid and void
     ones can't switch.
   - Installments: drafts, pending and unpaid choose how many; partial and
     overdue ones get Recompute instead. Changing the count, the items or the
     fee re-splits the unpaid, untouched payments. The last amount balances
     the rest; paid payments can't change; any payment can be added, and
     an unpaid one removed while there are more than two. */

const Choice = ({
    icon: Icon,
    title,
    detail,
    selected,
    disabled,
    onSelect,
}: {
    icon: LucideIcon;
    title: string;
    detail: string;
    selected: boolean;
    disabled?: boolean;
    onSelect: () => void;
}) => (
    <button
        type="button"
        role="radio"
        aria-checked={selected}
        disabled={disabled}
        onClick={onSelect}
        className={clsx(
            "flex items-start gap-3 rounded-xl border bg-white p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-500/20 disabled:cursor-not-allowed disabled:opacity-60",
            selected ? "border-cobalt-700 ring-1 ring-cobalt-700" : "border-slate-200 hover:border-slate-400",
        )}
    >
        <Icon className={clsx("mt-0.5 size-5 shrink-0", selected ? "text-cobalt-500" : "text-slate-400")} />
        <span className="flex min-w-0 flex-col">
            <span className="text-sm font-semibold text-slate-900">{title}</span>
            <span className="text-sm text-slate-600">{detail}</span>
        </span>
        <span
            aria-hidden
            className={clsx(
                "ml-auto mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full border-2",
                selected ? "border-cobalt-700" : "border-slate-300",
            )}
        >
            {selected && <span className="size-2 rounded-full bg-cobalt-700" />}
        </span>
    </button>
);

const COUNTS = Array.from({ length: 11 }, (_, i) => i + 2);

const Installments = () => {
    const { draft, status, can, setInstallments, setTermDate, setTermAmount, addTerm, removeTerm, recomputeTerms } = useDraft();
    const terms = draft.customTerms;
    const total = invoiceTotal(draft);
    const off = Math.round((total - termsTotal(draft)) * 100) / 100;
    // Partial / overdue (with more than one payment) recompute instead of
    // choosing a count, as in the real editor
    const choosingCount = status < 3 || (status === 4 && terms.length <= 1);
    const paidStatus = !can.editTerms;
    const counts = COUNTS.includes(terms.length) ? COUNTS : [terms.length, ...COUNTS].sort((a, b) => a - b);

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3 text-sm text-slate-700">
                {choosingCount ? (
                    <>
                        Split {money(total)} into
                        <Select
                            aria-label="Number of payments"
                            className="w-20"
                            value={terms.length}
                            disabled={paidStatus}
                            onChange={(e) => setInstallments(Number(e.target.value))}
                        >
                            {counts.map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </Select>
                        payment{terms.length === 1 ? "" : "s"}
                    </>
                ) : (
                    <>
                        <span className="font-medium text-slate-900">Your payment terms</span>
                        <button type="button" className={clsx(buttonSecondary, "ml-auto !px-3 !py-1.5")} disabled={paidStatus} onClick={recomputeTerms}>
                            <RefreshCw className="size-4" /> Recompute
                        </button>
                    </>
                )}
            </div>

            <div className="grid grid-cols-[5.5rem_11rem_9rem_auto] items-center gap-x-3 gap-y-2">
                <span />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">Due date</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">Amount due</span>
                <span />
                {terms.map((t, i) => {
                    const done = settled(t);
                    const isLast = i === terms.length - 1 && terms.length > 1;
                    return (
                        <div key={t.id} className="contents">
                            <span className="text-sm text-slate-600">
                                Payment {i + 1}
                                {t.paid > 0 && <span className="block text-xs text-fern-700">{done ? "Paid" : `${money(t.paid)} paid`}</span>}
                            </span>
                            <DateInput
                                aria-label={`Payment ${i + 1} due date`}
                                value={t.dueDate}
                                disabled={done || paidStatus}
                                onChange={(e) => setTermDate(t.id, e.target.value)}
                            />
                            {/* What's left to pay; the last one balances the rest */}
                            <MoneyInput
                                aria-label={`Payment ${i + 1} amount`}
                                value={Math.round((t.amount - t.paid) * 100) / 100}
                                disabled={isLast || done || paidStatus}
                                title={isLast ? "The last payment covers what's left" : undefined}
                                onChange={(n) => setTermAmount(t.id, n)}
                            />
                            <span className="flex gap-1">
                                {!paidStatus && (
                                    <>
                                        <button type="button" aria-label="Add a payment" title="Add a payment" className={clsx(iconButton, "!text-cobalt-500 hover:!bg-cobalt-500/10")} onClick={addTerm}>
                                            <Plus className="size-4" />
                                        </button>
                                        {t.paid === 0 && terms.length > 2 && (
                                            <button
                                                type="button"
                                                aria-label={`Remove payment ${i + 1}`}
                                                title="Remove this payment"
                                                className={clsx(iconButton, "!text-red-600 hover:!bg-red-50")}
                                                onClick={() => removeTerm(t.id)}
                                            >
                                                <Minus className="size-4" />
                                            </button>
                                        )}
                                    </>
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>

            {off === 0 ? (
                <p className="text-xs text-slate-500">Adds up to the invoice total.</p>
            ) : (
                <p className="flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="size-3.5" />
                    {off > 0 ? `${money(off)} still to schedule.` : `${money(-off)} over the invoice total.`}
                </p>
            )}
        </div>
    );
};

const Terms = () => {
    const { draft, set, setTerms, problems, showErrors, can } = useDraft();
    const due = (option: "upon_receipt" | "30_days") =>
        mdyLong(draft.terms === option ? draft.dueDate : simpleDueDate(option, draft.invoiceDate));

    return (
        <div className="flex flex-col gap-4">
            <div role="radiogroup" aria-label="Payment terms" className="grid gap-3 md:grid-cols-3">
                <Choice
                    icon={CalendarDays}
                    title="Upon receipt"
                    detail={`Due ${due("upon_receipt")}`}
                    selected={draft.terms === "upon_receipt"}
                    disabled={!can.simpleTerms}
                    onSelect={() => setTerms("upon_receipt")}
                />
                <Choice
                    icon={CalendarClock}
                    title="30 days"
                    detail={`Due ${due("30_days")}`}
                    selected={draft.terms === "30_days"}
                    disabled={!can.simpleTerms}
                    onSelect={() => setTerms("30_days")}
                />
                <Choice
                    icon={Layers}
                    title="Installments"
                    detail={draft.terms === "custom" ? `${draft.customTerms.length} payment${draft.customTerms.length === 1 ? "" : "s"}` : "Split into payments"}
                    selected={draft.terms === "custom"}
                    disabled={!can.customTerms}
                    onSelect={() => setTerms("custom")}
                />
            </div>

            {draft.terms === "custom" ? (
                <Installments />
            ) : (
                // The real "Payment Due Date": set by the option, editable
                <label className="flex items-center gap-3 text-sm text-slate-700">
                    Payment due date
                    <DateInput className="!w-44" aria-label="Payment due date" value={draft.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
                </label>
            )}
            {showErrors && problems.terms && <p className={errorText}>{problems.terms}</p>}
        </div>
    );
};

export default Terms;
