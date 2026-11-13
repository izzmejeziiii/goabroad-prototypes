import { Suspense } from "react";
import LeadsTable from "../../components/lead-threshold/leads/LeadsTable";
import HelpLink from "../../components/lead-threshold/shell/HelpLink";
import UpgradeVersionSwitcher from "../../components/lead-threshold/UpgradeVersionSwitcher";
import { toUpgradeVersion } from "../../components/lead-threshold/upgradeVersion";

/* Inquiries/ClientInquiries.js: 24px top padding, the table, the help bubble.
   ?upgrade=request|plans picks the upgrade flow version (default: request). */
export default async function LeadThresholdLeadsPage({
    searchParams,
}: {
    searchParams: Promise<{ upgrade?: string }>;
}) {
    const upgradeVersion = toUpgradeVersion((await searchParams).upgrade);
    return (
        <div className="pt-6">
            <Suspense>
                <LeadsTable upgradeVersion={upgradeVersion} />
            </Suspense>
            <HelpLink />
            <UpgradeVersionSwitcher current={upgradeVersion} />
        </div>
    );
}
