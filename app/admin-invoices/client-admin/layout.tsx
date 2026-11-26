import ClientShell from "../../components/admin-invoices/client/shell/ClientShell";

/* Client admin pages: the client header + sidebar from
   src/views/ClientAdmin/ClientAdmin.js. */
export default function ClientAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <ClientShell>{children}</ClientShell>;
}
