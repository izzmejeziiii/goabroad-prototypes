"use client";

import type { ReactNode } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "../../mui";

/* src/components/DialogBox/DialogBox.js on mui.tsx's Dialog, with the two
   things the shared DialogBox doesn't take: the Slide-up transition the
   real one always uses, and maxWidth={false} (RemindClientDialog's 750px
   template). Paper min-width 400 and 16px padding, a centred title, the
   content padded 16 (overflow unset), Ok (contained primary) / Cancel
   (contained secondary). */

const KEYFRAMES = "@keyframes ai-dialog-up{from{transform:translateY(100vh)}to{transform:none}}";

export const DialogBox = ({
    open,
    title,
    contentText,
    children,
    actions = "Ok",
    stringOverride,
    onOk,
    onCancel,
    onClose,
    disableBackdropClick,
    disabledButton,
    maxWidth = true,
}: {
    open: boolean;
    title?: string;
    contentText?: ReactNode;
    children?: ReactNode;
    actions?: "" | "Ok" | "OkCancel" | "Cancel";
    stringOverride?: { primaryAction?: string; secondaryAction?: string };
    onOk?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    disableBackdropClick?: boolean;
    disabledButton?: boolean;
    /** false: no 600px cap. */
    maxWidth?: boolean;
}) => (
    <>
        {open && <style>{KEYFRAMES}</style>}
        <Dialog
            open={open}
            onClose={disableBackdropClick ? undefined : onClose}
            maxWidth={maxWidth ? "max-w-[600px]" : "max-w-none"}
            paperClassName="min-w-[400px] p-4 animate-[ai-dialog-up_225ms_cubic-bezier(0,0,0.2,1)]"
        >
            {!!title && (
                <DialogTitle align="center">
                    <span data-cy="dialog-box-title">{title}</span>
                </DialogTitle>
            )}
            <div className="flex justify-center" />
            {children ? (
                <div className="flex-auto overflow-visible p-4">{children}</div>
            ) : contentText ? (
                <div className="flex-auto overflow-visible p-4">
                    {/* DialogContentText is a body1 Typography: 0.875rem (theme) */}
                    <div className="m-0 text-[0.875rem] leading-[1.5] tracking-[0.00938em] text-[rgba(0,0,0,0.6)]">{contentText}</div>
                </div>
            ) : null}
            {actions && (
                <DialogActions>
                    {(actions === "Ok" || actions === "OkCancel") && (
                        <Button
                            data-cy="dialog-box-primary-cta"
                            variant="contained"
                            color="primary"
                            onClick={onOk ?? onClose}
                            disabled={disabledButton}
                        >
                            {stringOverride?.primaryAction || "Ok"}
                        </Button>
                    )}
                    {(actions === "Cancel" || actions === "OkCancel") && (
                        <Button data-cy="dialog-box-cancel" variant="contained" color="secondary" onClick={onCancel ?? onClose}>
                            {stringOverride?.secondaryAction || "Cancel"}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    </>
);
