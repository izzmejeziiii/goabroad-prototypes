"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";
import { SummaryBody, type SummaryData } from "./Summary";

/** Mobile payment summary as a bottom sheet (option D). Collapsed it shows a
 *  grab handle, "Amount due" (or "Total today") with the amount, and the pay
 *  button.
 *  Tap the handle or the total row, or drag up, to slide the full summary
 *  open; drag down, tap outside or press Escape to close. Hidden from lg up,
 *  where the sticky sidebar card does this job. */
export default function MobilePayBar({
    data,
    note,
    children,
}: {
    data: SummaryData;
    note: string;
    /** The pay button, shared with the desktop card. */
    children?: React.ReactNode;
}) {
    // The collapsed row shows what's charged today, or the amount due when no
    // fee changes it.
    const bottom = data.grand ?? data.result;
    const [open, setOpen] = useState(false);
    const panelId = useId();
    const drag = useRef<{ y: number; moved: boolean } | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Drag zone (handle + total row): a short vertical drag opens or closes
    // the sheet; a tap without movement toggles it.
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        drag.current = { y: e.clientY, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        if (!d) return;
        const dy = e.clientY - d.y;
        if (Math.abs(dy) < 24) return;
        d.moved = true;
        d.y = e.clientY;
        setOpen(dy < 0);
    };
    const onPointerUp = () => {
        const d = drag.current;
        drag.current = null;
        if (d && !d.moved) setOpen((o) => !o);
    };

    return (
        <div data-paybar className="lg:hidden print:hidden">
            {open ? (
                <button
                    type="button"
                    aria-label="Close payment details"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-30 bg-slate-900/40"
                />
            ) : null}
            <section
                aria-label="Payment summary"
                className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border border-b-0 border-slate-200 bg-slate-50 shadow-bar"
                style={{
                    paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
                    paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
                    paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
                }}
            >
                <div
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => (drag.current = null)}
                    className="cursor-grab touch-none select-none active:cursor-grabbing"
                >
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        aria-label={
                            open ? "Hide payment details" : "Show payment details"
                        }
                        // Pointer taps are handled by the drag zone; this only
                        // answers keyboard presses (detail 0) so taps don't double-toggle.
                        onClick={(e) => {
                            if (e.detail === 0) setOpen((o) => !o);
                        }}
                        className="flex h-6 w-full items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-500/20"
                    >
                        <span aria-hidden className="h-1 w-9 rounded-full bg-slate-300" />
                    </button>

                    <div
                        id={panelId}
                        inert={!open}
                        className={cn(
                            "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                    >
                        <div className="overflow-hidden">
                            <div className="flex max-h-[55vh] touch-pan-y flex-col gap-4 overflow-y-auto border-b border-slate-200 pt-3 pb-4">
                                <SummaryBody data={data} />
                                <p className="text-xs leading-relaxed text-slate-500">
                                    {note}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-baseline justify-between gap-4 pt-2 pb-3">
                        <span className="text-sm text-slate-600">{bottom.label}</span>
                        <span className="text-xl font-bold text-slate-900 tabular-nums">
                            {bottom.value}
                        </span>
                    </div>
                </div>
                {children}
            </section>
        </div>
    );
}
