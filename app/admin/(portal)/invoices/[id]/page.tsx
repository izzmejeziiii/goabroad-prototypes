"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCreditCard, FiDownload } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import PageHeader from "@/app/components/admin-dashboard/shared/PageHeader";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import StatusPill from "@/app/components/admin-dashboard/shared/StatusPill";
import { getInvoice, provider } from "@/app/components/admin-dashboard/data";

const money = (n: number) => `$${n.toLocaleString()}.00`;

export default function InvoiceDetailPage() {
    const { id } = useParams<{ id: string }>();
    const inv = getInvoice(Number(id));

    if (!inv) {
        return (
            <div className="mx-auto max-w-3xl">
                <BackLink href="/admin/invoices" label="Back to invoices" />
                <p className="text-slate-500">Invoice not found.</p>
            </div>
        );
    }

    const unpaid = inv.status.tone === "danger";

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <BackLink href="/admin/invoices" label="Back to invoices" />
                <PageHeader
                    title={inv.number}
                    description={inv.description}
                    actions={
                        unpaid ? (
                            <Link href={`/admin/invoices/${inv.id}/pay`}>
                                <Button variant="cta" icon={FiCreditCard}>
                                    Pay now
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="outline" icon={FiDownload}>
                                Download PDF
                            </Button>
                        )
                    }
                />
            </div>

            {/* Invoice document */}
            <Card bodyClassName="p-0">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 p-6">
                    <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Billed from
                        </div>
                        <div className="mt-1 font-semibold text-slate-800">GoAbroad.com</div>
                        <div className="text-sm text-slate-500">
                            8 The Green, Dover, DE 19901, USA
                            <br />
                            billing@goabroad.com
                        </div>
                    </div>
                    <div className="sm:text-right">
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Billed to
                        </div>
                        <div className="mt-1 font-semibold text-slate-800">{provider.name}</div>
                        <div className="text-sm text-slate-500">
                            Av. El Sol 123
                            <br />
                            {provider.location}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 border-b border-slate-100 p-6 text-sm">
                    <div>
                        <div className="text-xs text-slate-400">Invoice Number</div>
                        <div className="font-medium text-slate-700">{inv.number}</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">Invoice Date</div>
                        <div className="font-medium text-slate-700">{inv.issued}</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">Status</div>
                        <StatusPill label={inv.status.label} tone={inv.status.tone} />
                    </div>
                </div>

                {/* Line items */}
                <div className="overflow-x-auto p-6">
                    <table className="w-full min-w-max text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                                <th className="pb-2 font-semibold">Invoice Item</th>
                                <th className="pb-2 text-center font-semibold">Start Date</th>
                                <th className="pb-2 text-center font-semibold">End Date</th>
                                <th className="pb-2 text-center font-semibold">Qty</th>
                                <th className="pb-2 text-right font-semibold">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inv.items.map((line) => (
                                <tr key={line.label}>
                                    <td className="py-3 text-slate-600">{line.label}</td>
                                    <td className="py-3 text-center text-slate-500">Jul 01, 2026</td>
                                    <td className="py-3 text-center text-slate-500">Sep 30, 2026</td>
                                    <td className="py-3 text-center text-slate-500">1</td>
                                    <td className="py-3 text-right text-slate-700">{money(line.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Summary */}
                    <div className="mt-4 ml-auto max-w-xs space-y-1.5 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Subtotal</span>
                            <span className="text-slate-700">{money(inv.amount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Total Discount</span>
                            <span className="text-slate-700">{money(0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Transaction Fees</span>
                            <span className="text-slate-700">{money(0)}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-100 pt-2">
                            <span className="font-semibold text-slate-900">Invoice Total (USD)</span>
                            <span className="text-lg font-bold text-slate-900">{money(inv.amount)}</span>
                        </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                        *Exchange rate and other processing fees may apply.
                    </p>
                </div>
            </Card>

            {/* Payment terms + history */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card title="Payment Terms">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Due {inv.due}</span>
                        <span className="font-semibold text-slate-800">
                            {unpaid ? money(inv.amount) : money(0)}
                        </span>
                    </div>
                </Card>
                <Card title="Payment History">
                    {unpaid ? (
                        <p className="text-sm text-slate-400">No payments yet.</p>
                    ) : (
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">{inv.issued}</span>
                            <span className="font-semibold text-slate-800">{money(inv.amount)}</span>
                        </div>
                    )}
                </Card>
            </div>

            <Card title="Message">
                <p className="text-sm text-slate-500">
                    Thank you for partnering with GoAbroad! Reach out to your
                    account manager with any billing questions.
                </p>
            </Card>
        </div>
    );
}
