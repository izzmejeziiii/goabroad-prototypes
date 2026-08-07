import MasterSearch from "@/app/components/admin-dashboard/staff/MasterSearch";
import ContentCounters from "@/app/components/admin-dashboard/staff/ContentCounters";
import TeamPanel from "@/app/components/admin-dashboard/staff/TeamPanel";
import SalesProgress from "@/app/components/admin-dashboard/staff/SalesProgress";
import { staffUser } from "@/app/components/admin-dashboard/staff-data";

export default function StaffDashboardPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Welcome back, {staffUser.firstName} 👋
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Your content queue and account tools at a glance.
                </p>
            </div>

            <MasterSearch />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ContentCounters />
                </div>
                <SalesProgress />
            </div>

            <TeamPanel />
        </div>
    );
}
