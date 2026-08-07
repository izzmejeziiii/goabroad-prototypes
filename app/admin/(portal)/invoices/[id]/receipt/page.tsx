"use client";

import { useParams } from "next/navigation";
import SuccessScreen from "@/app/components/admin-dashboard/shared/SuccessScreen";
import { getInvoice } from "@/app/components/admin-dashboard/data";

const money = (n: number) => `$${n.toLocaleString()}.00`;

export default function ReceiptPage() {
    const { id } = useParams<{ id: string }>();
    const inv = getInvoice(Number(id));

    return (
        <div className="mx-auto max-w-md">
            <SuccessScreen
                title="Payment successful"
                message={`Your payment${
                    inv ? ` for ${inv.number}` : ""
                } has been received. A receipt is on its way to your inbox.`}
                primaryHref="/admin/invoices"
                primaryLabel="Back to invoices"
                secondaryHref="/admin/dashboard"
                secondaryLabel="Go to dashboard"
            >
                {inv && (
                    <div className="mt-6 w-full rounded-xl border border-slate-200 bg-white p-5 text-left text-sm">
                        <div className="flex justify-between py-1.5">
                            <span className="text-slate-400">Invoice</span>
                            <span className="text-slate-700">{inv.number}</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                            <span className="text-slate-400">Amount paid</span>
                            <span className="font-semibold text-slate-900">
                                {money(inv.amount)}
                            </span>
                        </div>
                        <div className="flex justify-between py-1.5">
                            <span className="text-slate-400">Method</span>
                            <span className="text-slate-700">
                                Visa ending 4242
                            </span>
                        </div>
                        <div className="flex justify-between py-1.5">
                            <span className="text-slate-400">Date</span>
                            <span className="text-slate-700">Jul 24, 2026</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                            <span className="text-slate-400">Reference</span>
                            <span className="text-slate-700">TXN-90418</span>
                        </div>
                    </div>
                )}
            </SuccessScreen>
        </div>
    );
}
