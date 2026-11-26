"use client";

import HelpLink from "./HelpLink";
import { InvoicesProvider } from "./InvoicesProvider";
import ResultsMain from "./ResultsMain";

/* /client-admin/invoices in the real admin:
   src/views/ClientAdmin/Invoices/ClientInvoices.js, the client's invoice
   list padded 24px from the top, with the help link. */
const ClientInvoices = () => (
    <InvoicesProvider>
        <div className="pt-6">
            <ResultsMain />
            <HelpLink />
        </div>
    </InvoicesProvider>
);

export default ClientInvoices;
