"use client";

import { MdClose } from "react-icons/md";
import { useVersion, VersionContext } from "../version-context";
import { BRAND_BLUE } from "../data";
import { ListingBody } from "../listing-body";

export const PreviewModal = ({ onClose }: { onClose: () => void }) => {
    const ctx = useVersion();
    return (
        <div className="fixed inset-0 z-[70] bg-white overflow-y-auto font-inter">
            {/* Preview chrome bar */}
            <div
                className="sticky top-0 z-[80] text-white flex items-center justify-between px-6 py-2.5 shadow-md"
                style={{
                    background: `linear-gradient(90deg, #0f172a 0%, ${BRAND_BLUE} 100%)`,
                }}
            >
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-sun-500 text-slate-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[10px]">
                        Preview
                    </span>
                    <span className="text-sm font-medium">
                        Viewing the listing as visitors will see it
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/30 rounded-md px-3 py-1.5"
                >
                    <MdClose className="w-4 h-4" />
                    Exit Preview
                </button>
            </div>
            <VersionContext.Provider
                value={{
                    ...ctx,
                    diffMode: false,
                    omitRemoved: false,
                    previewMode: true,
                }}
            >
                <div className="w-full flex flex-col items-center pb-12">
                    <ListingBody />
                </div>
            </VersionContext.Provider>
        </div>
    );
};
