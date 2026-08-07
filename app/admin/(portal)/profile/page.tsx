import BackLink from "@/app/components/admin-dashboard/shared/BackLink";
import CompanyProfile from "@/app/components/admin-dashboard/dashboard/CompanyProfile";

export default function ProfilePage() {
    return (
        <div className="mx-auto max-w-5xl">
            <BackLink href="/admin/dashboard" label="Back to dashboard" />
            <CompanyProfile />
        </div>
    );
}
