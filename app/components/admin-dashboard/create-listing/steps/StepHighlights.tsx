"use client";

import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import CounterInput from "../../shared/CounterInput";

export default function StepHighlights() {
    const [rows, setRows] = useState([0, 1, 2]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Program Highlights
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Provide a maximum of <strong>5</strong> highlights that make
                    your program stand out.
                </p>
            </div>

            <div className="space-y-4">
                {rows.map((r, i) => (
                    <div key={r} className="rounded-xl border border-slate-200 p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-700">
                                Highlight #{i + 1}
                            </span>
                            {rows.length > 1 && (
                                <button
                                    onClick={() =>
                                        setRows((x) => x.filter((v) => v !== r))
                                    }
                                    className="text-slate-300 hover:text-roman-500"
                                >
                                    <FiTrash2 className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <CounterInput
                            min={25}
                            max={200}
                            placeholder="Enter Program Highlight (Max of 5)"
                        />
                    </div>
                ))}
            </div>

            {rows.length < 5 && (
                <button
                    onClick={() => setRows((x) => [...x, Math.max(...x) + 1])}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-cobalt-600 transition-colors hover:border-cobalt-400"
                >
                    <FiPlus className="h-4 w-4" />
                    Add Highlight
                </button>
            )}
        </div>
    );
}
