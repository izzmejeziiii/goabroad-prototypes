"use client";

import { Clock, CreditCard, Info, Landmark, Mail, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { FaPaypal } from "react-icons/fa";
import CopyButton from "../../invoice-tool/CopyButton";
import { buttonPrimary } from "../../invoice-tool/ui";
import { WIRE_DETAILS } from "../data";
import { pendingPaymentText } from "../mui";
import type { PendingPayment } from "../types";

/* The original View invoice's Payment Methods (PaymentMethods.tsx), in
   /invoice-tool's look, same wording: the USD note, a pending bank payment
   if there is one, the online option (clients who can pay online only:
   "Fastest", with its button), then wire (with copyable details), Zelle,
   PayPal and check, and the Advertiser Terms line. Staff never get the
   online option, as in the original. */

const link = "font-semibold text-cobalt-500 underline underline-offset-2 hover:text-cobalt-700";

const Method = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
    <div className="flex gap-4 border-t border-slate-200 py-4">
        <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 text-[15px] leading-relaxed text-slate-700">
            <p className="font-semibold text-slate-900">{title}</p>
            {children}
        </div>
    </div>
);

/** PaymentMethods.js onlineMethod: the label, note and button for what can
    be paid online. */
const onlineMethod = (cardAllowed: boolean, bankAllowed: boolean) =>
    cardAllowed && bankAllowed
        ? {
              label: "Pay online with card or U.S. bank account",
              note: "Card payments post right away. Bank payments take 2 to 4 business days to clear.",
              button: "Pay online",
          }
        : bankAllowed
          ? { label: "Pay online from a U.S. bank account", note: "Bank payments take 2 to 4 business days to clear.", button: "Pay by bank" }
          : { label: "Pay online with a credit card", note: "Card payments post right away.", button: "Pay by card" };

const PaymentMethodsView = ({
    pendingPayment,
    onPayOnline,
    cardAllowed = true,
    bankAllowed = false,
}: {
    pendingPayment: PendingPayment | null;
    /** Clients who can pay online: shows the online option. */
    onPayOnline?: () => void;
    cardAllowed?: boolean;
    bankAllowed?: boolean;
}) => {
    const online = onlineMethod(cardAllowed, bankAllowed);
    return (
    <div className="flex flex-col">
        <p className="mb-4 flex items-center gap-1.5 text-sm text-slate-600">
            <Info className="size-4 shrink-0" aria-hidden />
            Invoices are in USD, and payments must be made in USD.
        </p>
        {pendingPayment && (
            <div className="mb-4 rounded-xl bg-sun-200/60 p-4 text-[15px] text-cobalt-700">
                <p className="flex items-center gap-1.5 font-semibold">
                    <Clock className="size-4" aria-hidden />
                    {pendingPaymentText(pendingPayment)}.
                </p>
                <p className="mt-1">
                    It usually clears in 2 to 4 business days, and the invoice is marked paid once it does. There&apos;s no need to pay again.
                </p>
            </div>
        )}
        {!pendingPayment && onPayOnline && (
            <div className="mb-4 rounded-xl border-2 border-cobalt-500 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="w-fit rounded-full bg-sun-200 px-2.5 py-0.5 text-xs font-semibold text-cobalt-700">Fastest</span>
                        <p className="mt-1 text-[15px] font-semibold text-slate-900">{online.label}</p>
                        <p className="text-[15px] text-slate-600">{online.note}</p>
                    </div>
                    <div className="flex gap-1.5 text-slate-400">
                        {cardAllowed && <CreditCard className="size-6" aria-hidden />}
                        {bankAllowed && <Landmark className="size-6" aria-hidden />}
                    </div>
                </div>
                <button type="button" className={`${buttonPrimary} mt-4`} onClick={onPayOnline}>
                    {online.button}
                </button>
            </div>
        )}
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Other ways to pay</p>
        <Method icon={<Landmark className="size-5" />} title="Wire transfer">
            <p>
                Send the transfer in USD, then email{" "}
                <a className={link} href="mailto:billing@goabroad.com">
                    billing@goabroad.com
                </a>{" "}
                once it&apos;s sent.
            </p>
            <dl className="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-4">
                {WIRE_DETAILS.map(({ label, value, copy }) => (
                    <div key={label} className="flex min-h-11 items-center justify-between gap-3 py-1.5">
                        <dt className="text-sm text-slate-600">{label}</dt>
                        <dd className="flex items-center gap-1 text-right text-sm text-slate-900">
                            <span className={copy ? "font-mono" : ""}>{value}</span>
                            {copy && <CopyButton value={value} label={copy} />}
                        </dd>
                    </div>
                ))}
            </dl>
        </Method>
        <Method icon={<Zap className="size-5" />} title="Zelle">
            <p>
                Send to the tag <strong>GoAbroad</strong>. U.S. bank accounts only; transfer limits vary by bank.
            </p>
        </Method>
        <Method icon={<FaPaypal className="size-5" />} title="PayPal">
            <p>
                Send in USD to{" "}
                <a className={link} href="mailto:billing@goabroad.com">
                    billing@goabroad.com
                </a>{" "}
                and let us know once it&apos;s sent.
            </p>
        </Method>
        <Method icon={<Mail className="size-5" />} title="Check">
            <p>Make it out in USD and mail it to:</p>
            <p>
                GoAbroad.com LLC
                <br />
                4309 Fox Grove Dr.
                <br />
                Fort Collins, CO, 80524 USA
            </p>
        </Method>
        <p className="border-t border-slate-200 pt-4 text-sm text-slate-600">
            By agreeing to the advertising package outlined above and paying this invoice, you consent to{" "}
            <a className={link} href="https://www.goabroad.com/advertise/terms" target="_blank" rel="noreferrer">
                GoAbroad&apos;s Advertiser Terms &amp; Conditions and Advertiser Policy
            </a>
            .
        </p>
    </div>
    );
};

export default PaymentMethodsView;
