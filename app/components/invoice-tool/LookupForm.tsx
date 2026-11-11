"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, RotateCcw } from "lucide-react";
import { business, findInvoice, invoices } from "./data";
import { clearOverrides } from "./store";
import { Notice, buttonPrimary, inputClass, sectionTitle, textLink } from "./ui";

type Errors = { number?: string; email?: string; form?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LookupForm() {
    const router = useRouter();
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [pending, setPending] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const next: Errors = {};
        if (!number.trim())
            next.number = "Enter the invoice number from the top of your invoice.";
        if (!EMAIL_RE.test(email.trim()))
            next.email = "Enter the email address the invoice was sent to.";
        setErrors(next);
        if (next.number || next.email) return;

        setPending(true);
        // Stand-in for the server lookup.
        window.setTimeout(() => {
            const invoice = findInvoice(number, email);
            if (invoice) {
                router.push(`/invoice-tool/${invoice.token}`);
                return;
            }
            setPending(false);
            setErrors({
                form: `We couldn't find an invoice with that number and email. Check both against the invoice email we sent you, or contact ${business.billingEmail}.`,
            });
        }, 650);
    };

    return (
        <div className="flex flex-col gap-12">
            <form onSubmit={submit} noValidate className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h2 className={sectionTitle}>Find Your Invoice</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="invoiceNumber"
                                className="text-sm font-medium text-slate-700"
                            >
                                Invoice number
                            </label>
                            <input
                                id="invoiceNumber"
                                name="invoiceNumber"
                                className={inputClass}
                                placeholder="GA-10482"
                                autoComplete="off"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                aria-invalid={!!errors.number || undefined}
                                aria-describedby="invoiceNumber-hint"
                            />
                            <span
                                id="invoiceNumber-hint"
                                className={
                                    errors.number
                                        ? "text-sm text-red-600"
                                        : "text-sm text-slate-500"
                                }
                            >
                                {errors.number ?? "At the top of your invoice."}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700"
                            >
                                Email address on the invoice
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={inputClass}
                                placeholder="you@example.com"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={!!errors.email || undefined}
                                aria-describedby="email-hint"
                            />
                            <span
                                id="email-hint"
                                className={
                                    errors.email
                                        ? "text-sm text-red-600"
                                        : "text-sm text-slate-500"
                                }
                            >
                                {errors.email ??
                                    "We only show the invoice to the address it was sent to."}
                            </span>
                        </div>
                    </div>
                    {errors.form ? <Notice tone="error">{errors.form}</Notice> : null}
                </div>
                <div>
                    <button type="submit" className={buttonPrimary} disabled={pending}>
                        {pending ? (
                            "Looking up your invoice…"
                        ) : (
                            <>
                                Find My Invoice
                                <ArrowRight className="h-4 w-4" aria-hidden />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <DemoInvoices
                onFill={(n, e) => {
                    setNumber(n);
                    setEmail(e);
                    setErrors({});
                }}
            />
        </div>
    );
}

/** Prototype-only helper: every demo invoice, with a way to fill the form or
 *  jump in the way the "Pay this invoice" email link would. */
function DemoInvoices({ onFill }: { onFill: (number: string, email: string) => void }) {
    const [cleared, setCleared] = useState(false);
    return (
        <section
            aria-labelledby="demo-invoices"
            className="rounded-xl border border-dashed border-sun-500 bg-sun-200/25 p-5"
        >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="demo-invoices" className="text-sm font-semibold text-slate-900">
                    Demo invoices{" "}
                    <span className="font-normal text-slate-600">· prototype only</span>
                </h2>
                <button
                    type="button"
                    onClick={() => {
                        clearOverrides();
                        setCleared(true);
                        window.setTimeout(() => setCleared(false), 1800);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cobalt-500 hover:text-cobalt-700"
                >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    {cleared ? "Demo reset" : "Reset demo"}
                </button>
            </div>
            <p className="mt-1 text-sm text-slate-600">
                Fill the form with one, or open it the way the link in the invoice email
                would — no lookup needed.
            </p>
            <ul className="mt-4 divide-y divide-sun-300/60">
                {invoices.map((inv) => (
                    <li
                        key={inv.token}
                        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5"
                    >
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                                {inv.scenario}
                            </p>
                            <p className="truncate text-xs tabular-nums text-slate-600">
                                {inv.number} · {inv.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <button
                                type="button"
                                onClick={() => onFill(inv.number, inv.email)}
                                className={textLink}
                            >
                                Fill form
                            </button>
                            <Link
                                href={`/invoice-tool/${inv.token}`}
                                className="inline-flex items-center gap-1 font-semibold text-cobalt-500 hover:text-cobalt-700"
                            >
                                <Mail className="h-3.5 w-3.5" aria-hidden />
                                Email link
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
