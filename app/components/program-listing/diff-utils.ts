import type { VersionSnapshot, DiffField } from "./types";
import { versionHistory } from "./data";

export const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

export const computeChangedFields = (snapshot: VersionSnapshot) => {
    const current = versionHistory[0].data;
    const s = new Set<string>();
    if (snapshot.data.name !== current.name) s.add("name");
    if (snapshot.data.description !== current.description)
        s.add("description");
    if (!arraysEqual(snapshot.data.highlights, current.highlights))
        s.add("highlights");
    if (snapshot.data.hero_image !== current.hero_image) s.add("hero_image");
    if (!arraysEqual(snapshot.data.locations, current.locations))
        s.add("locations");
    if (!arraysEqual(snapshot.data.types, current.types)) s.add("types");
    if (snapshot.data.startsAt !== current.startsAt) s.add("startsAt");
    if (snapshot.data.ageRequirement !== current.ageRequirement)
        s.add("ageRequirement");
    if (!arraysEqual(snapshot.data.accommodations, current.accommodations))
        s.add("accommodations");
    if (!arraysEqual(snapshot.data.faqs, current.faqs)) s.add("faqs");
    if (!arraysEqual(snapshot.data.ctas, current.ctas)) s.add("ctas");
    if (!arraysEqual(snapshot.data.gallery, current.gallery))
        s.add("gallery");
    return s;
};

export const computeDiff = (a: VersionSnapshot, b: VersionSnapshot): DiffField[] => {
    const diffs: DiffField[] = [];
    if (a.data.name !== b.data.name) {
        diffs.push({
            field: "Program Title",
            type: "text",
            left: a.data.name,
            right: b.data.name,
        });
    }
    if (a.data.hero_image !== b.data.hero_image) {
        diffs.push({
            field: "Hero Image",
            type: "image",
            left: a.data.hero_image,
            right: b.data.hero_image,
        });
    }
    if (a.data.description !== b.data.description) {
        diffs.push({
            field: "Description",
            type: "text",
            left: a.data.description,
            right: b.data.description,
        });
    }
    if (!arraysEqual(a.data.highlights, b.data.highlights)) {
        diffs.push({
            field: "Program Highlights",
            type: "list",
            left: a.data.highlights,
            right: b.data.highlights,
        });
    }
    if (!arraysEqual(a.data.locations, b.data.locations)) {
        diffs.push({
            field: "Locations",
            type: "list",
            left: a.data.locations,
            right: b.data.locations,
        });
    }
    if (!arraysEqual(a.data.types, b.data.types)) {
        diffs.push({
            field: "Types & Subjects",
            type: "list",
            left: a.data.types,
            right: b.data.types,
        });
    }
    if (a.data.startsAt !== b.data.startsAt) {
        diffs.push({
            field: "Starts At",
            type: "text",
            left: a.data.startsAt,
            right: b.data.startsAt,
        });
    }
    if (a.data.ageRequirement !== b.data.ageRequirement) {
        diffs.push({
            field: "Age Requirement",
            type: "text",
            left: a.data.ageRequirement,
            right: b.data.ageRequirement,
        });
    }
    if (!arraysEqual(a.data.accommodations, b.data.accommodations)) {
        diffs.push({
            field: "Accommodation Options",
            type: "list",
            left: a.data.accommodations,
            right: b.data.accommodations,
        });
    }
    if (!arraysEqual(a.data.faqs, b.data.faqs)) {
        diffs.push({
            field: "FAQs",
            type: "list",
            left: a.data.faqs,
            right: b.data.faqs,
        });
    }
    return diffs;
};

export const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const summarizeDiff = (d: DiffField) => {
    if (d.type === "list") {
        const left = d.left as string[];
        const right = d.right as string[];
        const added = right.filter((x) => !left.includes(x)).length;
        const removed = left.filter((x) => !right.includes(x)).length;
        return { added, removed, edited: 0 };
    }
    return { added: 0, removed: 0, edited: 1 };
};

export const aggregateChanges = (diffs: DiffField[]) => {
    let added = 0,
        removed = 0,
        edited = 0;
    diffs.forEach((d) => {
        const s = summarizeDiff(d);
        added += s.added;
        removed += s.removed;
        edited += s.edited;
    });
    return { added, removed, edited };
};

export const summarizeField = (
    field: string,
    prev: VersionSnapshot,
    cur: VersionSnapshot
): string | null => {
    const a = prev.data;
    const b = cur.data;
    switch (field) {
        case "name":
            return "Program title was updated";
        case "description":
            return "Description was rewritten";
        case "highlights":
            return "Program highlights were edited";
        case "hero_image":
            return "Hero image was replaced";
        case "locations": {
            const added = b.locations.filter((x) => !a.locations.includes(x))
                .length;
            const removed = a.locations.filter((x) => !b.locations.includes(x))
                .length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `Locations · ${parts.join(", ")}`;
        }
        case "types": {
            const added = b.types.filter((x) => !a.types.includes(x)).length;
            const removed = a.types.filter((x) => !b.types.includes(x)).length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `Types & Subjects · ${parts.join(", ")}`;
        }
        case "startsAt":
            return `Starting price updated · ${a.startsAt} → ${b.startsAt}`;
        case "ageRequirement":
            return `Age requirement · ${a.ageRequirement} → ${b.ageRequirement}`;
        case "accommodations": {
            const added = b.accommodations.filter(
                (x) => !a.accommodations.includes(x)
            ).length;
            const removed = a.accommodations.filter(
                (x) => !b.accommodations.includes(x)
            ).length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `Accommodation Options · ${parts.join(", ")}`;
        }
        case "faqs": {
            const added = b.faqs.filter((x) => !a.faqs.includes(x)).length;
            const removed = a.faqs.filter((x) => !b.faqs.includes(x)).length;
            const parts = [];
            if (added) parts.push(`+${added} added`);
            if (removed) parts.push(`−${removed} removed`);
            return `FAQs · ${parts.join(", ")}`;
        }
        case "ctas": {
            const added = b.ctas.filter((x) => !a.ctas.includes(x));
            const removed = a.ctas.filter((x) => !b.ctas.includes(x));
            const parts = [];
            if (added.length) parts.push(`+${added.join(", ")}`);
            if (removed.length) parts.push(`−${removed.join(", ")}`);
            return `Hero CTAs · ${parts.join(" · ")}`;
        }
        case "gallery": {
            const added = b.gallery.length - a.gallery.length;
            return `Media Gallery · ${
                added > 0
                    ? `+${added} new photo(s) added`
                    : `${Math.abs(added)} photo(s) removed`
            }`;
        }
        default:
            return null;
    }
};
