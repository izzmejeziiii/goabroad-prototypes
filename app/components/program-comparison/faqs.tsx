"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import type { GuideSection } from "./types";

const FaqContent = ({
    faq,
    isOpen,
    updateOpenFaq,
}: {
    faq: GuideSection;
    isOpen: boolean;
    updateOpenFaq: (id: number) => void;
}) => (
    <div className="group">
        <div className="flex flex-col gap-2 border-b py-4 group-last-of-type:border-0">
            <button
                className="text-cobalt-500 text-left text-base font-bold"
                onClick={() => updateOpenFaq(faq.id)}
            >
                <h3 className="flex items-center justify-between gap-2">
                    {faq.title}
                    <div className="flex items-center rounded-full p-2 group-hover:bg-gray-200">
                        <FaChevronRight
                            className={`${
                                isOpen ? "-rotate-90!" : ""
                            } inline rotate-90 text-xs text-neutral-500`}
                        />
                    </div>
                </h3>
            </button>
            <div
                className={`text-sm transition-all duration-300 ${
                    !isOpen
                        ? "max-h-0 overflow-hidden opacity-0"
                        : "max-h-screen opacity-100"
                }`}
                dangerouslySetInnerHTML={{ __html: faq.content }}
            />
        </div>
    </div>
);

export default function Faqs({ faqs }: { faqs: GuideSection[] }) {
    const [currentOpen, setCurrentOpen] = useState(0);

    const updateOpenFaq = (id: number) =>
        setCurrentOpen(id === currentOpen ? 0 : id);

    return (
        <div id="faqs" className="flex w-full flex-col gap-4 rounded-md">
            <h2 className="flex items-center gap-2 px-4 text-2xl font-bold lg:px-0">
                Frequently Asked Questions
            </h2>
            <div className="faq-answer flex flex-col rounded-md bg-slate-50 p-4 pt-0 lg:p-8 lg:pt-4">
                {faqs.map((faq, index) => (
                    <FaqContent
                        key={`faq-${index}`}
                        faq={faq}
                        isOpen={currentOpen === faq.id}
                        updateOpenFaq={updateOpenFaq}
                    />
                ))}
            </div>
        </div>
    );
}
