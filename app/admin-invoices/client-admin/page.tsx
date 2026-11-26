import { redirect } from "next/navigation";

export default function ClientAdminIndex() {
    redirect("/admin-invoices/client-admin/invoices");
}
