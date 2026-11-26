"use client";

import clsx from "clsx";
import { ACCESS_LEVEL } from "./constants";

/* Copy of src/views/Client/Invoices/InvoicesDrawerTabs.js: full-width MUI
   Tabs in the secondary (pink) colour over a grey[200] rule, 32px above
   the tab's content; labels in 0.9rem regular, not uppercased. Activity
   Log only shows above access level 1. */

const tabLabels = [
    { name: "Payments", key: "payments-tab" },
    { name: "Comments", key: "comments-tab" },
    { name: "Comm Logs", key: "communications-tab" },
    { name: "Activity Log", key: "activity-tab" },
];

const InvoicesDrawerTabs = ({ tabSelected, onChange }: { tabSelected: number; onChange: (tab: number) => void }) => {
    const visible = tabLabels.filter((t) => t.key !== "activity-tab" || ACCESS_LEVEL > 1);
    return (
        <div className="mb-8 flex min-h-12 overflow-hidden border-0 border-b border-solid !border-[#eeeeee]">
            <div role="tablist" className="relative flex w-full flex-auto whitespace-nowrap">
                {visible.map((tab, i) => (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={tabSelected === i}
                        onClick={() => onChange(i)}
                        className={clsx(
                            "relative inline-flex min-h-12 min-w-[72px] max-w-none flex-[1_1_0] shrink items-center justify-center overflow-hidden whitespace-normal px-4 py-3 text-center text-[0.9rem] font-normal normal-case leading-[1.25] tracking-[0.02857em]",
                            tabSelected === i ? "text-[#e91e63]" : "text-[rgba(0,0,0,0.6)]",
                        )}
                    >
                        {tab.name}
                        {tabSelected === i && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#e91e63]" />}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InvoicesDrawerTabs;
