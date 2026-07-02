"use client";

import { useState } from "react";
import { MdHistory } from "react-icons/md";
import { HiChevronDown, HiPlus } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useVersion } from "../version-context";
import { faqs, BRAND_BLUE } from "../data";
import { DiffListItems } from "../diff-primitives";

export const FAQ = () => {
    const [active, setActive] = useState(0);
    const {
        active: activeVersion,
        changedFields,
        diffMode,
        previewMode,
        previousVersion,
    } = useVersion();
    const faqsChanged = changedFields.has("faqs");
    const faqAnswers: Record<string, string> = faqs.reduce(
        (acc, f) => ({ ...acc, [f.question]: f.answer }),
        {}
    );

    if (diffMode && faqsChanged) {
        return (
            <div className="max-w-[1200px] mx-auto h-full py-6 w-full px-4 lg:px-0">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-2xl">
                        Frequently Asked Questions
                    </h2>
                    <div className="flex items-center gap-2">
                        <MdHistory
                            className="w-4 h-4"
                            style={{ color: BRAND_BLUE }}
                        />
                        <span
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: BRAND_BLUE }}
                        >
                            FAQs changed
                        </span>
                    </div>
                </div>
                <DiffListItems
                    current={activeVersion.data.faqs}
                    previous={previousVersion.data.faqs}
                />
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto h-full py-6 w-full px-4 lg:px-0">
            <h2 className="font-bold text-2xl">Frequently Asked Questions</h2>
            <div className="mt-4">
                {activeVersion.data.faqs.map((question, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-2 border-b border-slate-200 py-4"
                    >
                        <div
                            className="text-left text-pacific-500 cursor-pointer flex justify-between items-center"
                            onClick={() =>
                                setActive(active === i ? -1 : i)
                            }
                        >
                            <p className="flex items-center justify-between gap-2 font-medium text-base">
                                {question}
                            </p>
                            <div className="flex gap-2 items-center">
                                <HiChevronDown
                                    className={`w-5 h-5 text-gray-500 transition-transform ${
                                        active === i ? "rotate-180" : ""
                                    }`}
                                />
                                {!previewMode && (
                                <button
                                    type="button"
                                    className="w-5 h-5 text-gray-500"
                                >
                                    <FaTrash className="w-4 h-4 text-red-500" />
                                </button>
                                )}
                            </div>
                        </div>
                        {active === i && (
                            <p className="text-sm text-slate-700">
                                {faqAnswers[question] ||
                                    "Answer is being prepared."}
                            </p>
                        )}
                    </div>
                ))}
                {!previewMode && (
                    <button
                        type="button"
                        className="w-full mt-4 flex items-center gap-2 bg-primary-300 hover:bg-primary-200 text-white rounded-md py-3 justify-center font-bold"
                    >
                        <HiPlus className="text-lg text-white" />
                        Add FAQ
                    </button>
                )}
            </div>
        </div>
    );
};
