import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import DashboardFaq from "@/app/components/admin-dashboard/dashboard/DashboardFaq";

export default function FaqPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <BackLink href="/admin/dashboard" label="Back to dashboard" />
            <DashboardFaq />
        </div>
    );
}
