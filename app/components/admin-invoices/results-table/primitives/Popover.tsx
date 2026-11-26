"use client";

import clsx from "clsx";
import {
    useEffect,
    useLayoutEffect,
    useRef,
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/* MUI Popover / Menu / MenuItem, the parts the results table and its
   dialogs open: a portal paper placed against its anchor (anchorOrigin +
   transformOrigin, kept 16px inside the window like marginThreshold), an
   invisible backdrop that closes it, and the theme's Menu paper (0 2px 15px
   rgba(0,0,0,.05), 4px corners) with MenuList padding 0 (theme MuiList). */

export type Origin = {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
};

const offset = (size: number, where: string) =>
    where === "center" ? size / 2 : where === "bottom" || where === "right" ? size : 0;

export const Popover = ({
    anchorEl,
    open,
    onClose,
    anchorOrigin = { vertical: "top", horizontal: "left" },
    transformOrigin = { vertical: "top", horizontal: "left" },
    matchAnchorWidth,
    paperClassName,
    children,
}: {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    anchorOrigin?: Origin;
    transformOrigin?: Origin;
    /** Select menus: minWidth = the anchor's width. */
    matchAnchorWidth?: boolean;
    paperClassName?: string;
    children: ReactNode;
}) => {
    const paperRef = useRef<HTMLDivElement>(null);
    const { vertical: av, horizontal: ah } = anchorOrigin;
    const { vertical: tv, horizontal: th } = transformOrigin;

    // Placed imperatively once the paper has a size, like MUI's Popover.
    useLayoutEffect(() => {
        const paper = paperRef.current;
        if (!open || !anchorEl || !paper) return;
        const a = anchorEl.getBoundingClientRect();
        if (matchAnchorWidth) paper.style.minWidth = `${a.width}px`;
        const p = paper.getBoundingClientRect();
        const margin = 16;
        const top = a.top + offset(a.height, av) - offset(p.height, tv);
        const left = a.left + offset(a.width, ah) - offset(p.width, th);
        paper.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - p.height - margin))}px`;
        paper.style.left = `${Math.max(margin, Math.min(left, window.innerWidth - p.width - margin))}px`;
        paper.style.visibility = "visible";
    }, [open, anchorEl, av, ah, tv, th, matchAnchorWidth]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || typeof document === "undefined") return null;
    return createPortal(
        <div
            className="lt-root fixed inset-0 z-[1300] antialiased"
            role="presentation"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="fixed inset-0" aria-hidden="true" onClick={onClose} />
            <div
                ref={paperRef}
                className={clsx(
                    "invisible absolute left-0 top-0 max-h-[calc(100%-32px)] min-w-4 overflow-y-auto overflow-x-hidden rounded-[4px] bg-white text-[rgba(0,0,0,0.87)] shadow-[0_2px_15px_0_rgba(0,0,0,0.05)] outline-0",
                    paperClassName,
                )}
            >
                <ul role="menu" className="m-0 list-none p-0">
                    {children}
                </ul>
            </div>
        </div>,
        document.body,
    );
};

/** A MenuItem. dense: minHeight 32 and body2's line-height; otherwise 48px
    tall below 600px and auto above. The theme sets 0.9rem and padding 8 on
    both (disableGutters only drops MUI's 16px sides, which the theme's
    padding already replaces). */
export const MenuItem = ({
    onClick,
    children,
    dense,
    selected,
    disabled,
    className,
}: {
    onClick?: (e: MouseEvent<HTMLLIElement>) => void;
    children: ReactNode;
    dense?: boolean;
    selected?: boolean;
    disabled?: boolean;
    className?: string;
}) => (
    <li
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e: KeyboardEvent<HTMLLIElement>) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onClick?.(e as unknown as MouseEvent<HTMLLIElement>);
            }
        }}
        className={clsx(
            "relative box-border flex cursor-pointer select-none items-center justify-start whitespace-nowrap p-2 text-[0.9rem] no-underline outline-0",
            dense
                ? "min-h-8 leading-[1.43] tracking-[0.01071em]"
                : "min-h-12 leading-[1.5] tracking-[0.00938em] sm:min-h-0",
            selected
                ? "bg-[rgba(3,169,244,0.08)] hover:bg-[rgba(3,169,244,0.12)]"
                : "hover:bg-[rgba(0,0,0,0.04)]",
            disabled && "pointer-events-none opacity-[0.38]",
            className,
        )}
    >
        {children}
    </li>
);
