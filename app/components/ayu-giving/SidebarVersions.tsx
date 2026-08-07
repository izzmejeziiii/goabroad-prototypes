"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CampaignDetailSidebar } from "./CampaignDetailSidebar";
import { CampaignDetailSidebarStepper } from "./sidebar/CampaignDetailSidebarStepper";
import { CampaignDetailSidebarModal } from "./sidebar/CampaignDetailSidebarModal";
import { CampaignDetailSidebarBand } from "./sidebar/CampaignDetailSidebarBand";
import type { SidebarCampaign } from "./sidebar/shared";

type VersionId = "v1" | "v2" | "v3" | "v4";

const VERSIONS: { id: VersionId; label: string; note: string }[] = [
    {
        id: "v1",
        label: "V1 · Accordion",
        note: "Original — collapsed rows, floating total bar",
    },
    {
        id: "v2",
        label: "V2 · Step by step",
        note: "One step at a time, CTA in flow",
    },
    {
        id: "v3",
        label: "V3 · Dialog checkout",
        note: "Short sidebar, nothing pinned; checkout opens in a dialog",
    },
    {
        id: "v4",
        label: "V4 · Full-width band",
        note: "Whole form across the top in 3 columns; CTA in view on load",
    },
];

function isVersionId(v: string | null): v is VersionId {
    return v === "v1" || v === "v2" || v === "v3" || v === "v4";
}

export function SidebarVersions({
    campaign,
    isLoggedIn,
    initialVersion,
}: {
    campaign: SidebarCampaign;
    isLoggedIn: boolean;
    /** From `?sidebar=v1|v2|v3|v4`, so a single version is shareable by link. */
    initialVersion?: string;
}) {
    const [version, setVersion] = useState<VersionId>(
        isVersionId(initialVersion ?? null)
            ? (initialVersion as VersionId)
            : "v2",
    );
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const active = VERSIONS.find((v) => v.id === version) ?? VERSIONS[1];

    /** Keep the choice in the URL so a reload doesn't snap back to the default. */
    function selectVersion(id: VersionId) {
        setVersion(id);
        const url = new URL(window.location.href);
        url.searchParams.set("sidebar", id);
        window.history.replaceState(null, "", url);
    }

    return (
        <>
            {version === "v1" && (
                <CampaignDetailSidebar
                    campaign={campaign}
                    isLoggedIn={isLoggedIn}
                />
            )}
            {version === "v2" && (
                <CampaignDetailSidebarStepper
                    campaign={campaign}
                    isLoggedIn={isLoggedIn}
                />
            )}
            {version === "v3" && (
                <CampaignDetailSidebarModal
                    campaign={campaign}
                    isLoggedIn={isLoggedIn}
                />
            )}
            {version === "v4" && (
                <CampaignDetailSidebarBand
                    campaign={campaign}
                    isLoggedIn={isLoggedIn}
                />
            )}

            {mounted &&
                createPortal(
                    // Bottom-left, not the repo's usual bottom-right: on this
                    // page the right side is the sidebar being compared.
                    <div className="fixed bottom-4 left-4 z-[60] w-56 overflow-hidden rounded-md bg-white shadow-lg">
                        <div className="bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                            Sidebar Version
                        </div>
                        <div className="flex flex-col gap-1 p-2">
                            {VERSIONS.map((v) => (
                                <button
                                    key={v.id}
                                    type="button"
                                    onClick={() => selectVersion(v.id)}
                                    aria-pressed={version === v.id}
                                    className={`rounded-md px-3 py-2 text-left text-xs font-bold transition-colors ${
                                        version === v.id
                                            ? "bg-blue-100 text-slate-900"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    {v.label}
                                </button>
                            ))}
                        </div>
                        <p className="border-t border-slate-100 px-3 py-2 text-[11px] leading-snug text-slate-500">
                            {active.note}
                        </p>
                    </div>,
                    document.body,
                )}
        </>
    );
}
