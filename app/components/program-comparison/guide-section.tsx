"use client";

import { Fragment, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { PiCaretDownBold } from "react-icons/pi";
import type { GuideSection } from "./types";

interface GuideSectionContentProps {
    guideTitle: string;
    guideSections: GuideSection[];
    isOpenReadMore: boolean;
    onToggleReadMore: () => void;
}

/**
 * "How to Study Abroad" — tabbed guide sections. The CMS ships HTML, so the
 * body is rendered as-is and styled by the `.guide-content` rules in globals.
 */
const textLength = (html: string) => html.replace(/(<([^>]+)>)/gi, "").trim().length;

export default function GuideSectionContent({
    guideTitle,
    guideSections,
    isOpenReadMore,
    onToggleReadMore,
}: GuideSectionContentProps) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isReadMore, setIsReadMore] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () =>
            setIsMobile(window.matchMedia("(max-width: 767px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        setIsReadMore(isOpenReadMore);
    }, [isOpenReadMore]);

    // Sections short enough to fit uncollapsed don't get a Read More toggle.
    const limit = isMobile ? 700 : 1500;

    return (
        <div id="guides" className="flex w-full flex-col gap-4">
            <h2 className="flex w-full items-center justify-between gap-2 pl-4 text-2xl font-bold lg:pl-0">
                {guideTitle}
            </h2>
            <div className="flex w-full flex-col gap-4 rounded-md border p-4 lg:p-8">
                <div className="w-full">
                    <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
                        <div className="scrollbar-hide w-full overflow-x-auto">
                            <TabList className="flex gap-3 lg:w-full">
                                {guideSections.map((section) => (
                                    <Tab as={Fragment} key={section.id}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected
                                                        ? "bg-secondary-500 text-white"
                                                        : "bg-neutral-100 text-slate-700 hover:bg-neutral-200"
                                                } w-full text-nowrap rounded-md px-5 py-2 text-xs font-bold focus:outline-none md:text-sm lg:py-2.5`}
                                            >
                                                {section.title}
                                            </button>
                                        )}
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                        <div className="mt-6 border-b"></div>
                        <TabPanels>
                            {guideSections.map((section) => (
                                <TabPanel key={section.id}>
                                    <div className="guide-content flex flex-col">
                                        <div className="mt-4 flex flex-col">
                                            <div
                                                className={clsx("guide-content", {
                                                    "line-clamp-15": !isReadMore,
                                                })}
                                                dangerouslySetInnerHTML={{
                                                    __html: section.content,
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    setIsReadMore(!isReadMore);
                                                    onToggleReadMore();
                                                }}
                                                className={clsx(
                                                    "mt-2 flex items-center gap-2 text-sm font-bold hover:underline",
                                                    {
                                                        hidden:
                                                            textLength(
                                                                section.content,
                                                            ) <=
                                                            limit + 50,
                                                    },
                                                )}
                                            >
                                                {isReadMore ? "Read Less" : "Read More"}
                                                <PiCaretDownBold
                                                    className={`${
                                                        isReadMore
                                                            ? "rotate-180 transform"
                                                            : ""
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div>
    );
}
