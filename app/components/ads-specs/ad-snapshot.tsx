"use client";

import { useEffect, useState } from "react";

/* Live example snapshots, read from the ad snapshot tool's manifest on
   Cloudinary (goabroad-snapshot.netlify.app uploads them). The tool writes
   captures over fixed public ids — ads-specs/<ad-id>-<viewport> — and
   records each upload's VERSIONED url in ads-specs/manifest.json, so a new
   capture gets a new URL and no cache can ever serve a stale image. Cards
   whose ads have no snapshot yet render nothing at all. */

const MANIFEST_URL =
    "https://res.cloudinary.com/gacom/raw/upload/ads-specs/manifest.json";

type Manifest = {
    updatedAt: string;
    entries: Record<
        string,
        { url: string; version: number; updatedAt: string }
    >;
};

/* One fetch per page load, shared by every card. */
let manifestPromise: Promise<Manifest | null> | null = null;
function loadManifest() {
    manifestPromise ??= fetch(`${MANIFEST_URL}?t=${Date.now()}`, {
        cache: "no-store",
    })
        .then((res) => (res.ok ? (res.json() as Promise<Manifest>) : null))
        .catch(() => null);
    return manifestPromise;
}

/* The specs page shows the desktop capture only — mobile snapshots stay
   available on Cloudinary/the tool but aren't displayed here. */
const VIEWPORTS = ["desktop"] as const;

type Shot = {
    key: string;
    url: string;
    viewport: (typeof VIEWPORTS)[number];
    updatedAt: string;
};

export default function AdSnapshot({ ids }: { ids: string[] }) {
    const [shots, setShots] = useState<Shot[]>([]);

    useEffect(() => {
        let alive = true;
        loadManifest().then((manifest) => {
            if (!alive || !manifest) return;
            const found: Shot[] = [];
            for (const id of ids) {
                for (const viewport of VIEWPORTS) {
                    const entry =
                        manifest.entries[`ads-specs/${id}-${viewport}`];
                    if (entry) {
                        found.push({
                            key: `${id}-${viewport}`,
                            url: entry.url,
                            viewport,
                            updatedAt: entry.updatedAt,
                        });
                    }
                }
            }
            setShots(found);
        });
        return () => {
            alive = false;
        };
    }, [ids]);

    if (shots.length === 0) return null;

    return (
        <div className="mb-6 rounded-xl bg-slate-50 px-5 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Live example{shots.length > 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap items-start gap-6">
                {shots.map((shot) => (
                    <figure key={shot.key} className="min-w-0">
                        <a
                            href={shot.url}
                            target="_blank"
                            rel="noreferrer"
                            title="Open full size"
                            className="block"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={shot.url}
                                alt={`Current ${shot.viewport} example of this placement`}
                                loading="lazy"
                                className="max-h-72 max-w-full rounded-lg border border-slate-200 bg-white"
                            />
                        </a>
                        <figcaption className="mt-1.5 text-[11px] font-medium text-slate-500">
                            {shot.viewport} · captured{" "}
                            {new Date(shot.updatedAt).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                },
                            )}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
}
