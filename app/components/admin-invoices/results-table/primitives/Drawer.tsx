"use client";

import clsx from "clsx";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* MUI's temporary <Drawer> for anchor="right" (the invoice summary, record
   payment and edit payment drawers) and anchor="bottom" (the global
   filters): theme backdrop rgba(0,0,0,.2), or none when BackdropProps
   invisible, the theme paper shadow 0 2px 15px rgba(0,0,0,.07), and the
   225ms ease-out slide in. */

const KEYFRAMES = `@keyframes ai-drawer-right{from{transform:translateX(100%)}to{transform:none}}@keyframes ai-drawer-bottom{from{transform:translateY(100%)}to{transform:none}}@keyframes ai-fade{from{opacity:0}to{opacity:1}}`;

export const SlideDrawer = ({
    open,
    onClose,
    anchor = "right",
    invisibleBackdrop,
    className,
    id,
    children,
}: {
    open: boolean;
    onClose?: () => void;
    anchor?: "right" | "bottom";
    invisibleBackdrop?: boolean;
    className?: string;
    id?: string;
    children: ReactNode;
}) => {
    useEffect(() => {
        if (!open || !onClose) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || typeof document === "undefined") return null;
    return createPortal(
        <div id={id} className="lt-root fixed inset-0 z-[1200] antialiased" role="presentation">
            <style>{KEYFRAMES}</style>
            <div
                aria-hidden="true"
                onClick={onClose}
                className={clsx(
                    "fixed inset-0 [-webkit-tap-highlight-color:transparent]",
                    !invisibleBackdrop && "animate-[ai-fade_225ms_cubic-bezier(0.4,0,0.2,1)] bg-[rgba(0,0,0,0.2)]",
                )}
            />
            <div
                role="dialog"
                aria-modal="true"
                className={clsx(
                    "fixed z-[1200] box-border flex flex-col overflow-y-auto bg-white text-[rgba(0,0,0,0.87)] shadow-[0_2px_15px_0_rgba(0,0,0,0.07)] outline-0",
                    anchor === "right"
                        ? "right-0 top-0 h-full animate-[ai-drawer-right_225ms_cubic-bezier(0,0,0.2,1)]"
                        : "inset-x-0 bottom-0 top-auto max-h-full animate-[ai-drawer-bottom_225ms_cubic-bezier(0,0,0.2,1)]",
                    className,
                )}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
};
