"use client";

import { SnackbarProvider } from "../../results-table/primitives/Snackbar";
import ClientTabs from "./ClientTabs";
import GlobalFiltersContainer from "./GlobalFiltersContainer";
import { InvoicesProvider } from "./InvoicesProvider";
import RecordPaymentDrawer from "./RecordPaymentDrawer";
import ResultsMain from "./ResultsMain";

/* /client-accounts/invoices in the real admin: src/views/Client/Client.js's
   tab strip with Invoices selected, then ClientInvoices.js
   (SnackbarProvider > InvoicesProvider > InvoicesContainer: the global
   filter drawer, the results, and the record / edit payment drawers). */
const StaffInvoices = () => (
    <>
        <ClientTabs selected={1} />
        <SnackbarProvider>
            <InvoicesProvider>
                <GlobalFiltersContainer />
                <ResultsMain />
                <RecordPaymentDrawer />
            </InvoicesProvider>
        </SnackbarProvider>
    </>
);

export default StaffInvoices;
