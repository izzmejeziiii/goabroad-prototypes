"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";
import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import Card from "@/app/components/admin-dashboard/shared/Card";
import Button from "@/app/components/admin-dashboard/shared/Button";
import Stepper from "@/app/components/admin-dashboard/shared/Stepper";
import {
    FormField,
    Input,
} from "@/app/components/admin-dashboard/shared/Form";
import { getInvoice } from "@/app/components/admin-dashboard/data";

const money = (n: number) => `$${n.toLocaleString()}.00`;
const steps = ["Payment method", "Review & pay"];

export default function PayInvoicePage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const inv = getInvoice(Number(id));
    const [step, setStep] = useState(0);
    const [method, setMethod] = useState<"saved" | "new">("saved");

    if (!inv) {
        return (
            <div className="mx-auto max-w-2xl">
                <BackLink href="/admin/invoices" label="Back to invoices" />
                <p className="text-slate-500">Invoice not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <BackLink
                href={`/admin/invoices/${inv.id}`}
                label="Back to invoice"
            />
            <h1 className="text-xl font-bold text-slate-900">
                Pay {inv.number}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Amount due{" "}
                <span className="font-semibold text-slate-700">
                    {money(inv.amount)}
                </span>
            </p>

            <div className="my-6">
                <Stepper steps={steps} current={step} />
            </div>

            <Card>
                {step === 0 && (
                    <div className="space-y-4">
                        <label
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                                method === "saved"
                                    ? "border-brand-400 bg-brand-50/50"
                                    : "border-slate-200"
                            }`}
                        >
                            <input
                                type="radio"
                                name="method"
                                checked={method === "saved"}
                                onChange={() => setMethod("saved")}
                                className="text-brand-500"
                            />
                            <div className="flex-1">
                                <div className="text-sm font-medium text-slate-800">
                                    Visa ending 4242
                                </div>
                                <div className="text-xs text-slate-400">
                                    Expires 08/28
                                </div>
                            </div>
                        </label>

                        <label
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                                method === "new"
                                    ? "border-brand-400 bg-brand-50/50"
                                    : "border-slate-200"
                            }`}
                        >
                            <input
                                type="radio"
                                name="method"
                                checked={method === "new"}
                                onChange={() => setMethod("new")}
                                className="text-brand-500"
                            />
                            <span className="text-sm font-medium text-slate-800">
                                Use a new card
                            </span>
                        </label>

                        {method === "new" && (
                            <div className="space-y-4 rounded-lg bg-slate-50 p-4">
                                <FormField label="Cardholder name">
                                    <Input placeholder="Name on card" />
                                </FormField>
                                <FormField label="Card number">
                                    <Input placeholder="1234 1234 1234 1234" />
                                </FormField>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField label="Expiry">
                                        <Input placeholder="MM / YY" />
                                    </FormField>
                                    <FormField label="CVC">
                                        <Input placeholder="123" />
                                    </FormField>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Invoice</span>
                            <span className="text-slate-700">{inv.number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">
                                Payment method
                            </span>
                            <span className="text-slate-700">
                                {method === "saved"
                                    ? "Visa ending 4242"
                                    : "New card"}
                            </span>
                        </div>
                        <div className="flex justify-between border-t border-slate-100 pt-4">
                            <span className="font-semibold text-slate-900">
                                Total
                            </span>
                            <span className="text-lg font-bold text-slate-900">
                                {money(inv.amount)}
                            </span>
                        </div>
                        <p className="flex items-center gap-1.5 text-xs text-slate-400">
                            <FiLock className="h-3.5 w-3.5" /> Secure payment —
                            prototype only, no charge is made.
                        </p>
                    </div>
                )}
            </Card>

            <div className="mt-5 flex justify-between">
                {step === 0 ? (
                    <span />
                ) : (
                    <Button variant="outline" onClick={() => setStep(0)}>
                        Back
                    </Button>
                )}
                {step === 0 ? (
                    <Button onClick={() => setStep(1)}>Continue to review</Button>
                ) : (
                    <Button
                        variant="cta"
                        icon={FiLock}
                        onClick={() =>
                            router.push(`/admin/invoices/${inv.id}/receipt`)
                        }
                    >
                        Pay {money(inv.amount)}
                    </Button>
                )}
            </div>
        </div>
    );
}
