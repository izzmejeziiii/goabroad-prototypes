"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { FOCUS_RING, SECONDARY_BUTTON } from "./ui";

/* The "Request sent" confirmation V2 and V3 share. Each closes its own plan
   picker (V2's modal, V3's side panel) as it opens this small one, so the
   confirmation is the same size and shape whichever way the client came.
   The plan name is the caller's to keep until the modal has faded out. */

const RequestSentModal = ({
    open,
    onClose,
    planName,
}: {
    open: boolean;
    onClose: () => void;
    planName?: string;
}) => (
    // lt-root: the dialog portals out of the shell, so it takes the route's
    // base styles (pinned v3 colours, pointer buttons) itself.
    <Dialog open={open} onClose={onClose} className="lt-root relative z-[1300] font-inter">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-slate-900/40 transition-opacity duration-200 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
                transition
                className="relative flex w-full max-w-md flex-col items-center gap-3 rounded-2xl bg-white px-6 pb-8 pt-10 text-center shadow-xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 sm:px-10"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className={`absolute right-4 top-4 inline-flex rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 ${FOCUS_RING}`}
                >
                    <MdClose className="size-5" />
                </button>
                <MdCheckCircle className="size-12 text-fern-600" aria-hidden="true" />
                <DialogTitle className="mt-2 text-2xl font-bold tracking-tight text-neutral-800">
                    Request sent
                </DialogTitle>
                <p className="text-sm leading-relaxed text-slate-600">
                    We&apos;ve let your account manager know you&apos;re
                    interested in the{" "}
                    <span className="font-semibold text-neutral-800">
                        {planName}
                    </span>{" "}
                    plan. They&apos;ll be in touch to help you upgrade.
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    className={`${SECONDARY_BUTTON} mt-2`}
                >
                    Done
                </button>
            </DialogPanel>
        </div>
    </Dialog>
);

export default RequestSentModal;
