"use client";

import { useState, type ReactNode } from "react";
import { FaPaypal } from "react-icons/fa";
import {
    MdCheck,
    MdContentCopy,
    MdInfoOutline,
    MdOutlineAccountBalance,
    MdOutlineBolt,
    MdOutlineCreditCard,
    MdOutlineSchedule,
    MdMailOutline,
} from "react-icons/md";
import { WIRE_DETAILS } from "../data";
import { Button, pendingPaymentText, Tooltip } from "../mui";
import type { PendingPayment } from "../types";

/* Copy of src/views/ClientAdmin/Tools/ViewInvoice/PaymentMethods.js
   (origin/dev): the online option (only when the viewer can pay online),
   a pending bank payment notice, then wire, Zelle, PayPal and check. The
   wire numbers are placeholders in the real format. */

const linkClass = "font-bold !text-primary-500 underline";

const onlineMethod = (cardAllowed: boolean, bankAllowed: boolean) => {
    if (cardAllowed && bankAllowed) {
        return {
            label: "Pay online with card or U.S. bank account",
            note: "Card payments post right away. Bank payments take 2 to 4 business days to clear.",
            button: "Pay online",
        };
    }
    if (bankAllowed) {
        return {
            label: "Pay online from a U.S. bank account",
            note: "Bank payments take 2 to 4 business days to clear.",
            button: "Pay by bank",
        };
    }
    return {
        label: "Pay online with a credit card",
        note: "Card payments post right away.",
        button: "Pay by card",
    };
};

const CopyButton = ({ value, label }: { value: string; label: string }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };
    return (
        <Tooltip title={copied ? "Copied" : `Copy ${label}`}>
            <button
                type="button"
                aria-label={`Copy ${label}`}
                onClick={copy}
                className="inline-flex items-center justify-center rounded-full p-[5px] text-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.04)]"
            >
                {copied ? <MdCheck className="size-4" /> : <MdContentCopy className="size-4" />}
            </button>
        </Tooltip>
    );
};

const OtherMethod = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
    <div className="flex gap-3 border-t border-gray-200 py-3">
        <div className="mt-0.5 text-xl text-gray-500">{icon}</div>
        <div className="min-w-0 flex-1">
            <p className="font-semibold">{title}</p>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);

const PaymentMethods = ({
    onPayByCard,
    cardAllowed = true,
    bankAllowed = false,
    pendingPayment = null,
}: {
    onPayByCard?: () => void;
    cardAllowed?: boolean;
    bankAllowed?: boolean;
    pendingPayment?: PendingPayment | null;
}) => {
    const online = onlineMethod(cardAllowed, bankAllowed);

    return (
        <div className="flex flex-col text-sm text-gray-800">
            <p className="mb-3 flex items-center gap-1 text-xs text-gray-600">
                <MdInfoOutline className="size-[14px]" />
                Invoices are in USD, and payments must be made in USD.
            </p>
            {pendingPayment && (
                <div className="mb-2 rounded-lg bg-primary-50 p-4 text-primary-800">
                    <p className="flex items-center gap-1 font-semibold">
                        <MdOutlineSchedule className="size-[18px]" />
                        {pendingPaymentText(pendingPayment)}.
                    </p>
                    <p className="mt-1">
                        It usually clears in 2 to 4 business days, and the invoice is marked paid once it
                        does. There&apos;s no need to pay again.
                    </p>
                </div>
            )}
            {!pendingPayment && onPayByCard && (
                <div className="mb-2 rounded-lg border-2 !border-primary-500 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <span className="rounded bg-primary-50 px-2 py-0.5 text-xs text-primary-800">Fastest</span>
                            <p className="mt-2 font-semibold">{online.label}</p>
                            <p className="text-gray-600">{online.note}</p>
                        </div>
                        <div className="flex gap-1 text-2xl text-gray-500">
                            {cardAllowed && <MdOutlineCreditCard />}
                            {bankAllowed && <MdOutlineAccountBalance />}
                        </div>
                    </div>
                    <Button variant="contained" color="primary" className="!mt-3" onClick={onPayByCard}>
                        {online.button}
                    </Button>
                </div>
            )}
            <p className="mb-1 mt-3 text-xs text-gray-600">Other ways to pay</p>
            <OtherMethod icon={<MdOutlineAccountBalance />} title="Wire transfer">
                <p>
                    Send the transfer in USD, then email{" "}
                    <a className={linkClass} href="mailto:billing@goabroad.com">
                        billing@goabroad.com
                    </a>{" "}
                    once it&apos;s sent.
                </p>
                <dl className="mt-2 rounded bg-gray-50 px-3 py-1">
                    {WIRE_DETAILS.map(({ label, value, copy }) => (
                        <div
                            key={label}
                            className="flex min-h-[32px] items-center justify-between gap-3 border-b border-gray-200 last:border-b-0"
                        >
                            <dt className="text-gray-600">{label}</dt>
                            <dd className="flex items-center text-right text-gray-800">
                                <span className={copy ? "font-mono" : ""}>{value}</span>
                                {copy && <CopyButton value={value} label={copy} />}
                            </dd>
                        </div>
                    ))}
                </dl>
            </OtherMethod>
            <OtherMethod icon={<MdOutlineBolt />} title="Zelle">
                <p>
                    Send to the tag <strong>GoAbroad</strong>. U.S. bank accounts only; transfer limits vary by
                    bank.
                </p>
            </OtherMethod>
            <OtherMethod icon={<FaPaypal />} title="PayPal">
                <p>
                    Send in USD to{" "}
                    <a className={linkClass} href="mailto:billing@goabroad.com">
                        billing@goabroad.com
                    </a>{" "}
                    and let us know once it&apos;s sent.
                </p>
            </OtherMethod>
            <OtherMethod icon={<MdMailOutline />} title="Check">
                <p>Make it out in USD and mail it to:</p>
                <p>GoAbroad.com LLC</p>
                <p>4309 Fox Grove Dr.</p>
                <p>Fort Collins, CO, 80524 USA</p>
            </OtherMethod>
            <p className="border-t border-gray-200 pt-3 text-xs text-gray-600">
                By agreeing to the advertising package outlined above and paying this invoice, you consent to{" "}
                <a className={linkClass} href="https://www.goabroad.com/advertise/terms" target="_blank" rel="noreferrer">
                    GoAbroad&apos;s Advertiser Terms &amp; Conditions and Advertiser Policy
                </a>
                .
            </p>
        </div>
    );
};

export default PaymentMethods;
