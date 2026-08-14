"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function OAIBanner() {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <div
            className={`compare-shift fixed bottom-4 right-4 z-50 flex h-[40px] w-[40px] items-center justify-center gap-4 rounded-full bg-slate-500 px-4 text-white shadow-md ${
                showHelp ? "w-auto rounded-md" : ""
            }`}
        >
            {showHelp && (
                <Link
                    href="https://www.goabroad.com/onlineadvisor"
                    className="text-sm underline"
                >
                    Want to Get Matched with Programs?
                </Link>
            )}
            <button
                aria-label="Online Advisor"
                onClick={() => setShowHelp(!showHelp)}
            >
                <AiOutlineQuestionCircle className="text-3xl" />
            </button>
        </div>
    );
}
