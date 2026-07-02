"use client";

import { useState } from "react";
import { VersionContext } from "../components/program-listing/version-context";
import { versionHistory } from "../components/program-listing/data";
import { computeChangedFields } from "../components/program-listing/diff-utils";
import { StickyAdminHeaderV1, StickyAdminHeaderV2 } from "../components/program-listing/header/sticky-admin-header";
import { DesignVersionToggle } from "../components/program-listing/header/design-version-toggle";
import { HistoricalBanner } from "../components/program-listing/sections/historical-banner";
import { ListingBody } from "../components/program-listing/listing-body";
import { PreviewModal } from "../components/program-listing/modals/preview-modal";
import type { DesignVersion } from "../components/program-listing/types";

function ProgramListingContent({
    designVersion,
}: {
    designVersion: DesignVersion;
}) {
    const topPadding =
        designVersion === "v2" ? "pt-[150px]" : "pt-[156px]";
    return (
        <div
            className={`w-full flex flex-col items-center bg-white pb-12 ${topPadding} font-inter`}
        >
            {designVersion === "v2" ? (
                <StickyAdminHeaderV2 />
            ) : (
                <StickyAdminHeaderV1 />
            )}
            <HistoricalBanner />
            <ListingBody />
        </div>
    );
}

export default function ProgramListingPage() {
    const [activeId, setActiveId] = useState(versionHistory[0].id);
    const [designVersion, setDesignVersion] = useState<DesignVersion>("v1");
    const [previewOpen, setPreviewOpen] = useState(false);
    const previousVersion = versionHistory[1];
    const currentVersion = versionHistory[0];
    // In V2 (inline diff) and V3 (summary only) the listing always shows the
    // current version and renders the most recent edit (v_prev → v_current)
    // inline so users can see what changed.
    const showDiffOverlay =
        designVersion === "v2" || designVersion === "v3";
    const active = showDiffOverlay
        ? currentVersion
        : (versionHistory.find((v) => v.id === activeId) ?? currentVersion);
    const diffMode = showDiffOverlay;
    const omitRemoved = designVersion === "v3";
    const isHistorical = !active.current;
    const changedFields = diffMode
        ? computeChangedFields(previousVersion)
        : isHistorical
          ? computeChangedFields(active)
          : new Set<string>();

    return (
        <VersionContext.Provider
            value={{
                active,
                isHistorical,
                changedFields,
                viewVersion: setActiveId,
                restoreCurrent: () => setActiveId(versionHistory[0].id),
                designVersion,
                diffMode,
                omitRemoved,
                previewMode: false,
                openPreview: () => setPreviewOpen(true),
                previousVersion,
            }}
        >
            <ProgramListingContent designVersion={designVersion} />
            <DesignVersionToggle
                value={designVersion}
                onChange={setDesignVersion}
            />
            {previewOpen && (
                <PreviewModal onClose={() => setPreviewOpen(false)} />
            )}
        </VersionContext.Provider>
    );
}
