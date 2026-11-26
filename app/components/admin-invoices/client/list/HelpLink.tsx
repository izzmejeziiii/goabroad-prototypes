"use client";

import clsx from "clsx";
import { useState } from "react";
import { PiQuestionLight, PiXCircleFill } from "react-icons/pi";

/* Copy of src/components/HelpLink/HelpLink.js (the client user can create
   programs, so it shows): a round cobalt "?" button at the bottom right,
   with the "Need help creating a program?" bubble above it until it's
   dismissed (the real one remembers that in the user cookie) and again on
   hover. The real one sits at bottom-5 right-5, where this prototype keeps
   its view switcher, so it's raised to sit just above it. */

const HELP_URL = "https://drive.google.com/file/d/1ro1lka0StPHRfgveG15DXHCE1CbAp13S/view";

const HelpLink = () => {
    const [active, setActive] = useState(true);
    const [hovered, setHovered] = useState(false);
    const showLabel = active || hovered;

    return (
        <div className="fixed bottom-[76px] right-5 z-50">
            <a href={HELP_URL} target="_blank" rel="noreferrer" className="!no-underline">
                <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <div
                        className={clsx(
                            "absolute bottom-full right-0 mb-3 transition-all duration-300",
                            showLabel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                        )}
                    >
                        <div className="relative rounded-2xl border-2 border-solid !border-[#0A5E85] bg-white px-4 py-2.5 shadow-lg">
                            <p className="m-0 w-[135px] text-sm font-semibold leading-snug text-[#0A5E85]">
                                Need help creating a{" "}program?
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
                                    className="absolute -right-2 -top-2 rounded-full bg-white p-0"
                                >
                                    <PiXCircleFill className="h-5 w-5 text-[#0A5E85] hover:text-[#084B6A]" />
                                </button>
                            )}
                            <svg className="absolute right-4 top-full -mt-[2px] h-[13px] w-[18px]" viewBox="0 0 18 13" aria-hidden="true">
                                <path d="M1 0 L11 13 L17 0" className="fill-white stroke-[#0A5E85]" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A5E85] shadow-lg transition-colors hover:bg-[#084B6A]">
                        <PiQuestionLight className="h-7 w-7 text-white" />
                    </div>
                </div>
            </a>
        </div>
    );
};

export default HelpLink;
