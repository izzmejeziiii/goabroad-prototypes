import { Fragment } from "react";
import Link from "next/link";
import { Check, Lock, MapPin, Plane } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { business } from "./data";

/* Server-safe building blocks and class strings. CopyButton (client) lives in
   its own file so server components can import from here. */

export const pageTitle = "text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl";
export const sectionTitle = "text-lg font-semibold text-slate-900";
export const lede = "text-base leading-relaxed text-slate-600";

/** Padding for the card body under the brand band. */
export const bodyPad = "px-5 pt-8 sm:px-10 sm:pt-10 lg:px-14";

/* goabroad.com's form field, copied from its live inputs: grey border and a
   small shadow at rest; blue-500 border with a 3px blue-300 ring on focus;
   red-600 border and text with a red-300 ring when invalid; grey when
   disabled. 16px text on phones (stops iOS zooming in), 14px from sm up. */
export const inputClass =
    "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-700 shadow-sm outline-none transition-shadow placeholder:text-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-sm aria-invalid:border-red-600 aria-invalid:text-red-600 aria-invalid:focus:border-red-600 aria-invalid:focus:ring-red-300";

/* GoAbroad's red button (#dc625a with white text), as on goabroad.com's
   "Apply Now" button, sized like its main CTAs: 14px semibold text,
   px-7 py-3, about 44px tall. */
export const buttonPrimary =
    "inline-flex items-center justify-center gap-2 rounded-lg bg-roman-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-roman-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-roman-300/60 disabled:cursor-wait disabled:opacity-70";

export const buttonSecondary =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-500/20";

export const textLink =
    "font-semibold text-cobalt-500 underline underline-offset-2 hover:text-cobalt-700";

/** The deep-blue band across the top of the card: the logo centred, the page
 *  label and the route-style step tracker. Leave `step` out to hide the
 *  tracker. The logo sits straight on the blue, as on the goabroad.com hero. */
export function BrandBand({ step }: { step?: 1 | 2 | 3 }) {
    return (
        <div className="rounded-t-2xl bg-cobalt-700 px-5 pt-8 pb-8 sm:px-10 sm:pt-10 sm:pb-10 lg:px-14">
            <div className="relative flex items-center justify-center">
                <Link
                    href="/invoice-tool"
                    aria-label={`${business.name} — pay an invoice`}
                    className="rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sun-300/70"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={business.logo}
                        alt={business.name}
                        className="h-16 w-auto"
                    />
                </Link>
                <span className="absolute top-0 right-0 hidden items-center gap-1.5 text-sm font-medium text-white/80 sm:inline-flex">
                    <Lock className="h-3.5 w-3.5" aria-hidden />
                    Pay an Invoice
                </span>
            </div>
            {step ? <Progress step={step} className="mt-8" /> : null}
        </div>
    );
}

/** The two steps drawn as a short flight route — Invoice → Payment → Paid —
 *  in white and orange on the brand band, each label under its stop. Step 3
 *  means the invoice is paid. */
export function Progress({ step, className }: { step: 1 | 2 | 3; className?: string }) {
    const stops = ["Invoice", "Payment"];
    return (
        <ol
            aria-label={step === 3 ? "Invoice paid" : `Step ${step} of ${stops.length}`}
            className={cn("flex items-start gap-2 sm:gap-3", className)}
        >
            {stops.map((label, i) => {
                const n = i + 1;
                const done = n < step;
                const current = n === step;
                return (
                    <Fragment key={label}>
                        <li
                            aria-current={current ? "step" : undefined}
                            className="flex flex-none flex-col items-center gap-1.5"
                        >
                            <span
                                className={cn(
                                    "grid h-8 w-8 place-items-center rounded-full text-sm font-bold",
                                    done && "bg-white text-cobalt-700",
                                    current && "bg-sun-500 text-cobalt-700",
                                    !done &&
                                        !current &&
                                        "border-2 border-white/40 text-white/80",
                                )}
                            >
                                {done ? (
                                    <Check
                                        className="h-4 w-4"
                                        strokeWidth={3}
                                        aria-hidden
                                    />
                                ) : (
                                    n
                                )}
                            </span>
                            <span
                                className={cn(
                                    "text-sm",
                                    done || current
                                        ? "font-semibold text-white"
                                        : "text-white/75",
                                )}
                            >
                                {label}
                            </span>
                        </li>
                        <li aria-hidden className="relative mt-[15px] min-w-4 flex-1">
                            <span
                                className={cn(
                                    "block border-t-2 border-dashed",
                                    done ? "border-white/70" : "border-white/30",
                                )}
                            />
                            {n + 1 === step ? (
                                <Plane className="absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 rotate-45 bg-cobalt-700 fill-current text-sun-500" />
                            ) : null}
                        </li>
                    </Fragment>
                );
            })}
            <li className="flex flex-none flex-col items-center gap-1.5">
                <span
                    className={cn(
                        "grid h-8 w-8 place-items-center rounded-full",
                        step === 3
                            ? "bg-sun-500 text-cobalt-700"
                            : "border-2 border-dashed border-white/40 text-sun-500",
                    )}
                >
                    <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span
                    className={cn(
                        "text-sm",
                        step === 3 ? "font-semibold text-white" : "text-white/75",
                    )}
                >
                    Paid
                </span>
            </li>
        </ol>
    );
}

type PillTone = "overdue" | "paid" | "waiting" | "partial";
const pillTones: Record<PillTone, string> = {
    overdue: "bg-roman-200/45 text-roman-700",
    paid: "bg-fern-200/45 text-fern-700",
    waiting: "bg-sun-200 text-cobalt-700",
    partial: "bg-slate-100 text-slate-700",
};

export function Pill({ tone, children }: { tone: PillTone; children: React.ReactNode }) {
    return (
        <span
            className={cn(
                "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 align-middle text-sm font-semibold tracking-normal",
                pillTones[tone],
            )}
        >
            {children}
        </span>
    );
}

export function Notice({
    tone,
    children,
    id,
}: {
    tone: "info" | "error";
    children: React.ReactNode;
    id?: string;
}) {
    return (
        <p
            id={id}
            role={tone === "error" ? "alert" : undefined}
            className={cn(
                "rounded-lg px-4 py-3 text-sm leading-relaxed",
                tone === "error"
                    ? "bg-roman-200/35 text-roman-700"
                    : "bg-slate-100 text-slate-700",
            )}
        >
            {children}
        </p>
    );
}
