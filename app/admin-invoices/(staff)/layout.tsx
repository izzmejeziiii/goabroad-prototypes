import StaffShell from "../../components/admin-invoices/staff/shell/StaffShell";

/* Internal admin pages: the staff header + sidebar from
   src/layouts/Dashboard.js (the invoice editor draws the same frame). */
export default function StaffLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <StaffShell>{children}</StaffShell>;
}
