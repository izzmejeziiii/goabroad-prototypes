"use client";

import { useState } from "react";
import { PiQuestionLight, PiXCircleFill } from "react-icons/pi";

/* Copy of src/components/HelpLink/HelpLink.js: the floating "Need help
   creating a program?" bubble. Dismissing the label hides it until hover;
   the real app remembers that in the user cookie, the prototype per visit. */

const HELP_URL =
    "https://drive.google.com/file/d/1ro1lka0StPHRfgveG15DXHCE1CbAp13S/view";

const HelpLink = () => {
    const [active, setActive] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const showLabel = active || isHovered;

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <a
                href={HELP_URL}
                target="_blank"
                rel="noreferrer"
                className="no-underline"
            >
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
                            showLabel
                                ? "translate-y-0 opacity-100"
                                : "pointer-events-none translate-y-2 opacity-0"
                        }`}
                    >
                        <div className="relative rounded-2xl border-2 border-cobalt-500 bg-white px-4 py-2.5 shadow-lg">
                            <p className="w-[135px] text-sm font-semibold leading-snug text-cobalt-500">
                                Need help creating a&nbsp;program?
                            </p>
                            {active && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setActive(false);
                                    }}
                                    aria-label="Hide help label"
                                    className="absolute -right-2 -top-2 rounded-full bg-white"
                                >
                                    <PiXCircleFill className="size-5 text-cobalt-500 hover:text-cobalt-600" />
                                </button>
                            )}
                            <svg
                                className="absolute right-4 top-full -mt-[2px] h-[13px] w-[18px]"
                                viewBox="0 0 18 13"
                                aria-hidden="true"
                            >
                                <path
                                    d="M1 0 L11 13 L17 0"
                                    className="fill-white stroke-cobalt-500"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-full bg-cobalt-500 shadow-lg transition-colors hover:bg-cobalt-600">
                        <PiQuestionLight className="size-7 text-white" />
                    </div>
                </div>
            </a>
        </div>
    );
};

export default HelpLink;
