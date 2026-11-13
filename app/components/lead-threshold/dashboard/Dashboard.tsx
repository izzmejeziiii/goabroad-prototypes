import HelpLink from "../shell/HelpLink";
import UpgradeVersionSwitcher from "../UpgradeVersionSwitcher";
import type { UpgradeVersion } from "../upgradeVersion";
import AccountOverview from "./AccountOverview";
import LeadsCard from "./LeadsCard";
import NeedsAttention from "./NeedsAttention";
import ProfileCompletion from "./ProfileCompletion";
import QuickActions from "./QuickActions";
import { AdvertiseCard, BadgesCard, SubscriptionCard } from "./SideCards";

/* Copy of Dashboard/DashboardContainer.js on PR 784, for a listing client
   with the Leads tab: Quick Actions, then Needs Your Attention beside the
   Profile card, then Account Overview, then Latest Leads beside Your Badges,
   Your Subscription and Advertise With Us. */

// font-inter: goabroad.com's typeface, scoped to the dashboard content.
const Dashboard = ({ upgradeVersion }: { upgradeVersion: UpgradeVersion }) => (
    <div className="flex flex-col gap-8 py-6 font-inter">
        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-3">
            <NeedsAttention className="lg:col-span-2" />
            <ProfileCompletion />
        </div>

        <AccountOverview />

        <div className="grid items-start gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <LeadsCard upgradeVersion={upgradeVersion} />
            </div>
            <div className="flex flex-col gap-6">
                <BadgesCard />
                <SubscriptionCard />
                <AdvertiseCard />
            </div>
        </div>

        <HelpLink />
        <UpgradeVersionSwitcher current={upgradeVersion} />
    </div>
);

export default Dashboard;
