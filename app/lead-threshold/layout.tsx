import type { Metadata } from "next";
import ClientAdminShell from "../components/lead-threshold/shell/ClientAdminShell";

export const metadata: Metadata = {
    title: "Lead Threshold | GoAbroad Prototypes",
    description:
        "Prototype of the client admin dashboard (gacom-admin-redesign PR 784) as the base for limiting free accounts to 5 viewable leads a year.",
    robots: { index: false, follow: false },
};

/* Stands on its own like the real client admin: no GoAbroad site header or
   footer (both suppress themselves on /lead-threshold). */
export default function LeadThresholdLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <ClientAdminShell>{children}</ClientAdminShell>;
}
