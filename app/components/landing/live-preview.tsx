"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

/** True when the visitor asked the OS for less motion. */
export function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return reduced;
}

type LivePreviewProps = {
    src: string;
    title: string;
    /** The desktop viewport the prototype renders at before scaling down. */
    virtualWidth?: number;
    /** Visible height of that viewport. Ignored when `fill` is set. */
    virtualHeight?: number;
    /** Render the page this tall so `pan` can glide down through it. */
    scrollHeight?: number;
    /** Glide down through the page (hover on the wall tiles). */
    pan?: boolean;
    /** Let the visitor click and scroll inside the page. */
    interactive?: boolean;
    /** Load straight away instead of when scrolled near. */
    eager?: boolean;
    /** Take the parent's height instead of a fixed aspect ratio. */
    fill?: boolean;
    /** On a narrow frame, render the page at the frame's real width (its
        phone layout) instead of shrinking the desktop page. */
    responsive?: boolean;
    className?: string;
};

/**
 * A prototype running live in a scaled-down iframe. Same-origin, so it is
 * the real page with its real data, not a screenshot. The frame mounts
 * only when it scrolls near the viewport, so a wall of them stays light.
 */
export function LivePreview({
    src,
    title,
    virtualWidth = 1280,
    virtualHeight = 800,
    scrollHeight,
    pan = false,
    interactive = false,
    eager = false,
    fill = false,
    responsive = false,
    className,
}: LivePreviewProps) {
    const box = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [near, setNear] = useState(eager);
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const el = box.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ w: width, h: height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (near || !box.current) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true);
                    io.disconnect();
                }
            },
            { rootMargin: "400px 0px" },
        );
        io.observe(box.current);
        return () => io.disconnect();
    }, [near]);

    const pageWidth = responsive && size.w && size.w < 720 ? size.w : virtualWidth;
    const scale = size.w ? size.w / pageWidth : 0;
    const visibleH = fill && scale ? size.h / scale : virtualHeight;
    const frameH = Math.max(scrollHeight ?? 0, visibleH);
    const panBy = pan && !reduced ? (frameH - visibleH) * scale : 0;
    const loaded = loadedSrc === src;

    return (
        <div
            ref={box}
            className={cn("relative isolate overflow-hidden bg-white", className)}
            style={fill ? undefined : { aspectRatio: `${virtualWidth} / ${virtualHeight}` }}
        >
            {near && scale > 0 && (
                <div
                    className="absolute top-0 left-0 origin-top-left"
                    style={{
                        width: pageWidth,
                        height: frameH,
                        transform: `translateY(${-panBy}px) scale(${scale})`,
                        transition: pan
                            ? "transform 9s cubic-bezier(0.45, 0, 0.55, 1)"
                            : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <iframe
                        key={src}
                        src={src}
                        title={`Live preview: ${title}`}
                        tabIndex={interactive ? 0 : -1}
                        aria-hidden={interactive ? undefined : true}
                        onLoad={() => setLoadedSrc(src)}
                        className="block h-full w-full border-0 bg-white"
                        style={{ pointerEvents: interactive ? "auto" : "none" }}
                    />
                </div>
            )}

            {/* Loading state: a quiet page skeleton until the frame paints. */}
            <div
                aria-hidden
                className={cn(
                    "pointer-events-none absolute inset-0 flex flex-col gap-[6%] bg-slate-50 p-[6%] transition-opacity duration-500",
                    loaded ? "opacity-0" : "opacity-100",
                )}
            >
                <div className="flex items-center gap-[4%]">
                    <div className="h-2.5 w-[14%] animate-pulse rounded-full bg-slate-200" />
                    <div className="ml-auto h-2.5 w-[30%] animate-pulse rounded-full bg-slate-200" />
                </div>
                <div className="h-[34%] w-full animate-pulse rounded-md bg-slate-200/80" />
                <div className="grid flex-1 grid-cols-3 gap-[4%]">
                    <div className="animate-pulse rounded-md bg-slate-200/70" />
                    <div className="animate-pulse rounded-md bg-slate-200/70" />
                    <div className="animate-pulse rounded-md bg-slate-200/70" />
                </div>
            </div>
            {!loaded && near && (
                <span className="sr-only" role="status">
                    Loading preview of {title}
                </span>
            )}
        </div>
    );
}
