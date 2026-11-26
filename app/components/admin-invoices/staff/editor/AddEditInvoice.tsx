"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/AddEditInvoice.js (with
   AddEditInvoiceContainer.js and the provider's NavigationPrompt): what
   sits in <main> under the toolbar spacer on /invoice/edit/:id and
   /invoice/create. The staff shell around it is the route group layout.

   Load: LinearProgress until the store has read localStorage, then the
   store's invoice mapped into the editor (unknown id → NotFound).
   Save: the source posts, then goes to /client-accounts/invoices (its
   redirectToInvoice → /invoice/view/:id branch is never switched on), so
   this writes to the store and goes to the staff list at BASE. */

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BASE, providers } from "../../data";
import { DialogBox, LinearProgress, Paper } from "../../mui";
import { useInvoices } from "../../store";
import type { Invoice } from "../../types";
import ActivityLogCTA from "./ActivityLogCTA";
import Comments from "./Comments";
import { EditorProvider, useEditor } from "./EditorContext";
import InvoiceBody from "./InvoiceBody";
import InvoiceCTAs, { type SaveInvoice } from "./InvoiceCTAs";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceMessage from "./InvoiceMessage";
import {
    activity,
    createState,
    currentSnapshot,
    editState,
    newInvoiceExtras,
    toInvoicePatch,
    withProvider,
} from "./mapping";
import NotFound from "./NotFound";
import Renewal from "./Renewal";
import SaleType from "./SaleType";
import type { EditorState, PageDialog } from "./types";
import { WarningAlert } from "./ui/controls";
import { ReactSelect } from "./ui/ReactSelect";

/** Where every successful save lands (the source's /client-accounts/invoices,
    or /client/profile/:id after a create opened with ?provider_id=). */
const AFTER_SAVE = BASE;

const VOID_STATUS = 6;

/** /providers-for-listing?sort=+name */
const PROVIDER_OPTIONS = [...providers]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((p) => ({ value: p.id, label: p.name }));

/** AddEditInvoice.getStatus */
const getStatus = (status: string | number, current: number) => {
    const map: Record<string, number> = { draft: 0, pending: 1, unpaid: 2, partial: 3, overdue: 4, paid: 5, void: 6 };
    return typeof status === "string" && status in map ? map[status] : current;
};

const EditorPage = ({ original }: { original?: Invoice }) => {
    const { state, handleStateChange, hasChanges } = useEditor();
    const { invoices, createInvoice, updateInvoice } = useInvoices();
    const router = useRouter();
    const pathname = usePathname();
    const [dialog, setDialog] = useState<PageDialog>({ open: false });
    const [leaveTo, setLeaveTo] = useState<string | null>(null);
    const leaving = useRef(false);

    /** NavigationPrompt `when`: on /invoice/create only a different path
        asks; anywhere else any navigation with changes does. */
    const shouldBlock = (next: string | null) => {
        if (leaving.current) return false;
        if (pathname === `${BASE}/invoice/create`) {
            const nextPath = next ? new URL(next, window.location.origin).pathname : false;
            return pathname !== nextPath ? hasChanges() : false;
        }
        return hasChanges();
    };

    const navigate = (path: string) => (shouldBlock(path) ? setLeaveTo(path) : router.push(path));

    // In-app links (sidebar, header, view switcher) go through the prompt.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!a || a.target === "_blank" || a.origin !== window.location.origin) return;
            const href = a.pathname + a.search + a.hash;
            if (!shouldBlock(href)) return;
            e.preventDefault();
            e.stopPropagation();
            setLeaveTo(href);
        };
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    });

    // A reload or tab close still gets the browser's own prompt.
    useEffect(() => {
        if (!shouldBlock(null)) return;
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    });

    const handleClientDropdownChange = (option: { value: number; label: string }) => {
        if (state.is_new) {
            window.history.pushState(null, "", `${BASE}/invoice/create?provider_id=${option.value}`);
        }
        handleStateChange((s) => withProvider(s, option, invoices));
    };

    const handleSaveInvoice: SaveInvoice = (isSend, statusIn) => {
        const s: EditorState = state;
        const status = getStatus(statusIn, s.invoice.status);
        handleStateChange({ previous_content: currentSnapshot(s) });
        // The source reads selectedProvider.value here and throws without one.
        if (!s.selectedProvider) return;
        leaving.current = true;
        setDialog({ actions: "", open: true, title: s.is_new ? "Saving..." : "Updating...", content: "" });
        window.setTimeout(() => {
            const patch = toInvoicePatch(s, status, original);
            if (s.is_new) {
                const extras = newInvoiceExtras(invoices, patch.provider_id);
                const email = extras.email || patch.email;
                createInvoice({
                    ...patch,
                    ...extras,
                    email,
                    activities: [
                        activity(status === 0 ? "Created invoice as draft" : "Created invoice"),
                        ...(isSend ? [activity(`Sent invoice to ${email}`, 1)] : []),
                    ],
                });
            } else if (original) {
                const current = invoices.find((i) => i.id === original.id) ?? original;
                updateInvoice(original.id, {
                    ...patch,
                    activities: [
                        ...current.activities,
                        activity("Updated invoice"),
                        ...(isSend ? [activity(`Sent invoice to ${patch.email}`, 1)] : []),
                    ],
                });
            }
            router.push(AFTER_SAVE);
        }, 600);
    };

    const closeDialog = () => setDialog({ open: false });

    return (
        <div>
            {state.invoice.status === VOID_STATUS && (
                <WarningAlert className="mb-6" dataCy="void-invoice-alert">
                    This invoice is void, so its items and bulk actions are disabled. Duplicate the invoice from
                    the invoices list to bill these items again.
                </WarningAlert>
            )}
            {/* paper: centred, the dropdown 300px max; the Fab pinned right */}
            <Paper className="relative mb-6 flex items-center justify-center p-6 [&>div]:w-full [&>div]:max-w-[300px]">
                <ReactSelect
                    options={PROVIDER_OPTIONS}
                    value={state.selectedProvider}
                    onChange={(option) =>
                        option && handleClientDropdownChange({ value: Number(option.value), label: option.label })
                    }
                    placeholder="Type here to choose a client"
                    isDisabled={state.invoice.status > 2}
                    loadTimeout={1000}
                />
                {!state.is_new && (
                    <ActivityLogCTA
                        invoiceId={state.invoice.id}
                        className="!absolute right-6 top-1/2 -translate-y-1/2"
                    />
                )}
            </Paper>
            <InvoiceHeader />
            <InvoiceBody handleDialogBox={setDialog} />
            <InvoiceMessage />
            <Renewal />
            <SaleType />
            {!state.is_new && state.invoice.id !== null && <Comments invoiceID={state.invoice.id} />}
            <InvoiceCTAs handleDialogBox={setDialog} handleSaveInvoice={handleSaveInvoice} navigate={navigate} />
            <DialogBox
                actions={dialog.actions}
                title={dialog.title}
                contentText={dialog.content}
                open={dialog.open}
                onOk={dialog.onOk}
                onCancel={dialog.onCancel}
                onClose={closeDialog}
                stringOverride={dialog.stringOverride}
                disableBackdropClick
            />
            <DialogBox
                open={leaveTo !== null}
                title="Leave Invoice Tool?"
                disableBackdropClick
                contentText="Leave Invoice Tool? Your changes will not be saved."
                actions="OkCancel"
                onClose={() => setLeaveTo(null)}
                onOk={() => {
                    const to = leaveTo;
                    leaving.current = true;
                    setLeaveTo(null);
                    if (to) router.push(to);
                }}
            />
        </div>
    );
};

/** Builds the provider's state once the store is ready (so the URL's
    ?provider_id= and saved invoices are readable). */
const Loaded = ({ original }: { original?: Invoice }) => {
    const { invoices } = useInvoices();
    const [initial] = useState<EditorState>(() => {
        if (original) return editState(original);
        const s = createState();
        // InvoiceHeader.parseUrlParams: preselect ?provider_id= on create.
        const id = Number(new URLSearchParams(window.location.search).get("provider_id"));
        const provider = providers.find((p) => p.id === id);
        return provider ? { ...s, ...withProvider(s, { value: provider.id, label: provider.name }, invoices) } : s;
    });
    return (
        <EditorProvider initial={initial}>
            <EditorPage original={original} />
        </EditorProvider>
    );
};

const AddEditInvoice = ({ id }: { id?: string }) => {
    const { ready, getInvoice } = useInvoices();
    if (!ready) return <LinearProgress />;
    if (id === undefined) return <Loaded key="create" />;
    const invoice = getInvoice(id);
    if (!invoice) return <NotFound />;
    return <Loaded key={id} original={invoice} />;
};

export default AddEditInvoice;
