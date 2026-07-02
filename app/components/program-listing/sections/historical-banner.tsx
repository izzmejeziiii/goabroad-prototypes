"use client";

import { MdHistory } from "react-icons/md";
import { useVersion } from "../version-context";
import { BRAND_BLUE } from "../data";

export const HistoricalBanner = () => {
    const { active, restoreCurrent, diffMode } = useVersion();
    if (active.current || diffMode) return null;
    return (
        <div
            className="w-full"
            style={{
                background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, #1f4d6e 100%)`,
            }}
        >
            <div className="max-w-[1200px] mx-auto px-4 lg:px-0 py-3 flex items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-3">
                    <MdHistory className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">
                            You&rsquo;re viewing version {active.id} from{" "}
                            {active.absolute}
                        </span>
                        <span className="text-xs text-white/80">
                            Edited by {active.author} · Changes highlighted
                            below
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/40 hover:bg-white/10"
                    >
                        Restore this version
                    </button>
                    <button
                        type="button"
                        onClick={restoreCurrent}
                        className="text-xs font-bold px-3 py-1.5 rounded-md bg-sun-500 hover:bg-sun-600 text-white"
                    >
                        Back to current
                    </button>
                </div>
            </div>
        </div>
    );
};
