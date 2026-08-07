"use client";

import { useState } from "react";
import { FiChevronDown, FiPlus, FiTrash2 } from "react-icons/fi";
import CounterInput from "../../shared/CounterInput";
import { Textarea } from "../../shared/Form";

export default function StepFaq() {
    const [rows, setRows] = useState([0, 1, 2]);
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Frequently Asked Questions
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Please provide 3–5 questions and answers travelers commonly
                    ask.
                </p>
            </div>

            <div className="space-y-3">
                {rows.map((r, i) => (
                    <div
                        key={r}
                        className="overflow-hidden rounded-xl border border-slate-200"
                    >
                        <div className="flex items-center justify-between gap-3 px-4 py-3">
                            <button
                                onClick={() =>
                                    setOpen((o) => (o === r ? null : r))
                                }
                                className="flex-1 text-left text-sm font-medium text-slate-800"
                            >
                                Question #{i + 1}
                            </button>
                            <div className="flex items-center gap-2">
                                {rows.length > 3 && (
                                    <button
                                        onClick={() =>
                                            setRows((x) => x.filter((v) => v !== r))
                                        }
                                        className="text-slate-300 hover:text-roman-500"
                                    >
                                        <FiTrash2 className="h-4 w-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        setOpen((o) => (o === r ? null : r))
                                    }
                                >
                                    <FiChevronDown
                                        className={`h-4 w-4 text-slate-400 transition-transform ${
                                            open === r ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                        {open === r && (
                            <div className="space-y-3 border-t border-slate-100 px-4 py-4">
                                <CounterInput
                                    max={70}
                                    placeholder="Enter question here..."
                                />
                                <Textarea rows={4} placeholder="Enter answer here..." />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {rows.length < 5 && (
                <button
                    onClick={() => setRows((x) => [...x, Math.max(...x) + 1])}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-cobalt-600 transition-colors hover:border-cobalt-400"
                >
                    <FiPlus className="h-4 w-4" />
                    Add New Question
                </button>
            )}
        </div>
    );
}
