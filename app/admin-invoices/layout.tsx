import type { Metadata } from "next";
import { Suspense } from "react";
import { InvoiceStoreProvider } from "../components/admin-invoices/store";
import ViewSwitcher from "../components/admin-invoices/ViewSwitcher";

export const metadata: Metadata = {
    title: "Admin Invoices | GoAbroad Prototypes",
    description:
        "Copy of the gacom-admin-redesign invoice pages, internal (staff) admin and client admin, with a toggle between the two views.",
    robots: { index: false, follow: false },
};

/* Stands on its own like the real admin: no GoAbroad site header or footer
   (both suppress themselves on /admin*). The store keeps demo changes in
   this browser and is shared by both views. */
export default function AdminInvoicesLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <InvoiceStoreProvider>
            {children}
            <Suspense fallback={null}>
                <ViewSwitcher />
            </Suspense>
        </InvoiceStoreProvider>
    );
}
