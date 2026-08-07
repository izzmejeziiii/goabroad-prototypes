"use client";

import { useState } from "react";
import { FiChevronDown, FiPlus, FiTrash2 } from "react-icons/fi";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { faqs, provider } from "../data";

export default function DashboardFaq() {
    const [open, setOpen] = useState<number | null>(faqs[0]?.id ?? null);

    return (
        <Card
            title="Frequently Asked Questions"
            action={
                <Button variant="outline" size="sm" icon={FiPlus}>
                    Add New Question
                </Button>
            }
        >
            <p className="-mt-1 mb-4 text-sm text-slate-500">
                {provider.name}&apos;s most commonly asked questions. Enter at
                least 3 and a max of 5 questions.
            </p>
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200">
                {faqs.map((f) => (
                    <li key={f.id}>
                        <button
                            onClick={() =>
                                setOpen((o) => (o === f.id ? null : f.id))
                            }
                            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50"
                        >
                            <span className="text-sm font-medium text-slate-800">
                                {f.question}
                            </span>
                            <span className="flex items-center gap-2">
                                <FiTrash2 className="h-4 w-4 text-slate-300 hover:text-roman-500" />
                                <FiChevronDown
                                    className={`h-4 w-4 text-slate-400 transition-transform ${
                                        open === f.id ? "rotate-180" : ""
                                    }`}
                                />
                            </span>
                        </button>
                        {open === f.id && (
                            <div className="px-4 pb-4 text-sm text-slate-600">
                                {f.answer}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </Card>
    );
}
