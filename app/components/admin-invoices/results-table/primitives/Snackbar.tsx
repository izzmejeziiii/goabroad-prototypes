"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* notistack v3's <SnackbarProvider> / enqueueSnackbar with its defaults:
   bottom-left, 5s, 288px minimum, 6px 16px (20px left with the variant
   icon), 0.875rem, success #43a047 / error #d32f2f, elevation-6 shadow. */

type Variant = "success" | "error" | "default";
type Snack = { id: number; message: string; variant: Variant };

const Ctx = createContext<{ enqueueSnackbar: (message: string, opts?: { variant?: Variant }) => void } | null>(null);

const ICONS: Record<string, string> = {
    success: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",
    error: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2, 6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
};

const BG: Record<Variant, string> = { success: "#43a047", error: "#d32f2f", default: "#313131" };

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snacks, setSnacks] = useState<Snack[]>([]);

    const enqueueSnackbar = useCallback((message: string, opts?: { variant?: Variant }) => {
        const id = Date.now() + Math.random();
        setSnacks((s) => [...s, { id, message, variant: opts?.variant ?? "default" }].slice(-3));
        setTimeout(() => setSnacks((s) => s.filter((x) => x.id !== id)), 5000);
    }, []);

    return (
        <Ctx.Provider value={{ enqueueSnackbar }}>
            {children}
            {snacks.length > 0 &&
                typeof document !== "undefined" &&
                createPortal(
                    <div className="lt-root pointer-events-none fixed bottom-[14px] left-5 z-[1400] flex flex-col-reverse gap-[6px] antialiased">
                        {snacks.map((s) => (
                            <div
                                key={s.id}
                                role="alert"
                                className="pointer-events-auto flex min-w-[288px] flex-wrap items-center rounded-[4px] py-[6px] pr-4 text-[0.875rem] leading-[1.43] tracking-[0.01071em] text-white shadow-[0px_3px_5px_-1px_rgba(0,0,0,0.2),0px_6px_10px_0px_rgba(0,0,0,0.14),0px_1px_18px_0px_rgba(0,0,0,0.12)]"
                                style={{ backgroundColor: BG[s.variant], paddingLeft: ICONS[s.variant] ? 20 : 16 }}
                            >
                                <div className="flex items-center py-2">
                                    {ICONS[s.variant] && (
                                        <svg viewBox="0 0 24 24" className="me-2 size-5 fill-current" aria-hidden="true">
                                            <path d={ICONS[s.variant]} />
                                        </svg>
                                    )}
                                    {s.message}
                                </div>
                            </div>
                        ))}
                    </div>,
                    document.body,
                )}
        </Ctx.Provider>
    );
};

export const useSnackbar = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useSnackbar needs <SnackbarProvider>");
    return ctx;
};
