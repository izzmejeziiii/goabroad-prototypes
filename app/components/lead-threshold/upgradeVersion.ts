/* Two takes on what "Upgrade to unlock" does, switchable with ?upgrade=:

   request  V1: sends the request to the account manager straight away, as
            the dashboard spec describes.
   plans    V2: opens a plan comparison first; the request names the plan
            the client picked. */

export const UPGRADE_VERSIONS = [
    { id: "request", label: "V1 · Request" },
    { id: "plans", label: "V2 · Plan picker" },
] as const;

export type UpgradeVersion = (typeof UPGRADE_VERSIONS)[number]["id"];

export const toUpgradeVersion = (value?: string): UpgradeVersion =>
    UPGRADE_VERSIONS.find((v) => v.id === value)?.id ?? "request";
