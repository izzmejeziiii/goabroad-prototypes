export type VersionSnapshot = {
    id: string;
    timestamp: string;
    absolute: string;
    dateGroup: "today" | "yesterday" | "thisWeek" | "earlier";
    author: string;
    avatar: string;
    isSystem?: boolean;
    current?: boolean;
    changes: string[];
    data: {
        name: string;
        description: string;
        highlights: string[];
        hero_image: string;
        locations: string[];
        types: string[];
        startsAt: string;
        ageRequirement: string;
        accommodations: string[];
        faqs: string[];
        ctas: string[];
        gallery: string[];
    };
};

export type DesignVersion = "v1" | "v2" | "v3";

export type VersionContextValue = {
    active: VersionSnapshot;
    isHistorical: boolean;
    changedFields: Set<string>;
    viewVersion: (id: string) => void;
    restoreCurrent: () => void;
    designVersion: DesignVersion;
    diffMode: boolean;
    // When true, the inline diff should only highlight what was added/changed
    // in the recent edit (used by V3). When false, the full GitHub-style diff
    // with both removed and added is shown (used by V2).
    omitRemoved: boolean;
    // When true, the listing is being rendered in visitor-preview mode —
    // edit icons / admin affordances should be hidden and no diff annotations
    // shown. This is set inside the Preview overlay.
    previewMode: boolean;
    openPreview: () => void;
    previousVersion: VersionSnapshot;
};

export type DiffField = {
    field: string;
    type: "text" | "image" | "list";
    left: string | string[];
    right: string | string[];
};
