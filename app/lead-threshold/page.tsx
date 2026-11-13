import Dashboard from "../components/lead-threshold/dashboard/Dashboard";
import { toUpgradeVersion } from "../components/lead-threshold/upgradeVersion";

/* ?upgrade=request|plans picks the upgrade flow version (default: request). */
export default async function LeadThresholdDashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ upgrade?: string }>;
}) {
    const { upgrade } = await searchParams;
    return <Dashboard upgradeVersion={toUpgradeVersion(upgrade)} />;
}
