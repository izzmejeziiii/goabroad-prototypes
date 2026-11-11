import type { Metadata } from "next";
import Link from "next/link";
import { business } from "../components/invoice-tool/data";

export const metadata: Metadata = {
    title: "Pay an Invoice | GoAbroad Prototypes",
    description:
        "Prototype of a no-login page where GoAbroad clients find an invoice and pay it.",
    robots: { index: false, follow: false },
};

/* Stands on its own like the real pay page: no GoAbroad site header or footer
   (both suppress themselves on /invoice-tool). Each page opens the card with
   the brand band, since the band's step tracker depends on the page. */
export default function InvoiceToolLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen w-full bg-slate-100 px-4 py-6 selection:bg-sun-200 selection:text-cobalt-700 sm:px-6 sm:py-10 max-lg:has-[[data-paybar]]:pb-44 print:bg-white print:p-0">
            <div className="mx-auto max-w-5xl">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-slate-600 print:hidden">
                    <Link
                        href="/"
                        className="font-semibold text-cobalt-500 hover:text-cobalt-700"
                    >
                        ‹ All prototypes
                    </Link>
                    <span>Prototype · demo invoices, no real payments</span>
                </div>
                <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 print:shadow-none print:ring-0">
                    <main>{children}</main>
                    <footer className="mx-5 mt-14 border-t border-slate-200 pt-6 pb-8 text-sm text-slate-600 sm:mx-10 sm:pb-10 lg:mx-14">
                        Questions about your invoice? Email{" "}
                        <a
                            href={`mailto:${business.billingEmail}`}
                            className="font-semibold text-cobalt-500 underline underline-offset-2 hover:text-cobalt-700"
                        >
                            {business.billingEmail}
                        </a>
                        .
                    </footer>
                </div>
            </div>
        </div>
    );
}
