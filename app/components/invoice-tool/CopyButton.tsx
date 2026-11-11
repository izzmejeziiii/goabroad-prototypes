"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function CopyButton({ value, label }: { value: string; label: string }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            // Clipboard blocked: the value is still on screen to select by hand.
        }
    };
    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
            className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500/40",
                copied
                    ? "text-fern-700"
                    : "text-cobalt-500 hover:bg-slate-100 hover:text-cobalt-700",
            )}
        >
            {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden />
            ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden />
            )}
            {copied ? "Copied" : "Copy"}
        </button>
    );
}
