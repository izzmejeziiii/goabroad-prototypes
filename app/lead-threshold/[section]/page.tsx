import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_PATH } from "../../components/lead-threshold/data";
import { DashboardCard } from "../../components/lead-threshold/ui";

/* The other client admin tabs exist in the real app but aren't part of this
   prototype, so their sidebar links land here instead of a 404. */

const SECTIONS: Record<string, string> = {
    reviews: "Reviews",
    programs: "Programs",
    ads: "Ads",
    mygoabroad: "MyGoAbroad",
    profile: "Profile",
    users: "Contacts",
    invoices: "Invoices",
    interviews: "Interviews",
    articles: "Articles",
};

export function generateStaticParams() {
    return Object.keys(SECTIONS).map((section) => ({ section }));
}

export default async function LeadThresholdSectionPage({
    params,
}: {
    params: Promise<{ section: string }>;
}) {
    const { section } = await params;
    const label = SECTIONS[section];
    if (!label) notFound();

    return (
        <div className="py-6">
            <DashboardCard title={label}>
                <div className="flex flex-col items-start gap-3 p-4">
                    <p className="text-sm text-gray-700">
                        The {label} tab isn&apos;t part of the lead threshold
                        prototype.
                    </p>
                    <Link
                        href={BASE_PATH}
                        className="rounded-sm border border-cobalt-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cobalt-300 no-underline hover:bg-primary-50"
                    >
                        Back to dashboard
                    </Link>
                </div>
            </DashboardCard>
        </div>
    );
}
