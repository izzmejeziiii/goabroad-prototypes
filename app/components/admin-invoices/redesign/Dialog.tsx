"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { buttonPrimary, buttonSecondary } from "./ui";

/* The editor's dialogs (confirm void / delete, the send confirmation, the
   exit and leave prompts), with the real editor's titles and wording.
   Portalled so they sit above the admin shell's app bar and pills. */

type Action = { label: string; onClick: () => void };

const Dialog = ({
    title,
    body,
    children,
    primary,
    secondary,
    onClose,
}: {
    title: string;
    body?: ReactNode;
    children?: ReactNode;
    primary: Action;
    /** Defaults to Cancel, which closes. */
    secondary?: Action;
    onClose: () => void;
}) =>
    createPortal(
        <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4 font-inter text-slate-700 antialiased" role="presentation">
            <div className="absolute inset-0 bg-slate-900/30" aria-hidden onClick={onClose} />
            <div role="alertdialog" aria-modal="true" aria-label={title} className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                {body && <p className="mt-1 text-sm text-slate-600">{body}</p>}
                {children && <div className="mt-4">{children}</div>}
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" className={clsx(buttonSecondary, "!px-4 !py-2")} onClick={secondary?.onClick ?? onClose}>
                        {secondary?.label ?? "Cancel"}
                    </button>
                    <button type="button" autoFocus className={clsx(buttonPrimary, "!px-4 !py-2")} onClick={primary.onClick}>
                        {primary.label}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );

export default Dialog;
