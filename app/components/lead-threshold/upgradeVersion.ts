/* Four takes on what "Upgrade to unlock" does, switchable with ?upgrade=:

   request  V1: sends the request to the account manager straight away, as
            the dashboard spec describes.
   plans    V2: opens a plan comparison first; the request names the plan
            the client picked.
   premium  V3: opens a "premium" side panel instead: a before/after of the
            client's leads, what every premium plan includes, and the tiers
            as a stacked list; the request names the plan picked.
   page     V4: the in-app Compare plans page (/lead-threshold/upgrade):
            every tier side by side, feature by feature, a button per plan. */

export const UPGRADE_VERSIONS = [
    { id: "request", label: "V1 · Request" },
    { id: "plans", label: "V2 · Plan picker" },
    { id: "premium", label: "V3 · Premium panel" },
    { id: "page", label: "V4 · Plans page" },
] as const;

export type UpgradeVersion = (typeof UPGRADE_VERSIONS)[number]["id"];

export const toUpgradeVersion = (value?: string): UpgradeVersion =>
    UPGRADE_VERSIONS.find((v) => v.id === value)?.id ?? "request";
