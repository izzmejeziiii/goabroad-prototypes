"use client";

import { useState } from "react";
import { FaFacebookF, FaXTwitter, FaLink, FaCheck } from "react-icons/fa6";
import { cn } from "./utils";

type ShareLinksProps = {
    url: string;
    title?: string;
    className?: string;
};

type CopiedKey = "instagram" | "link" | null;

async function copyToClipboard(text: string): Promise<boolean> {
    if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        window.isSecureContext
    ) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // fall through to legacy path
        }
    }
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        return ok;
    } catch {
        return false;
    }
}

export function ShareLinks({ url, title = "", className }: ShareLinksProps) {
    const [copied, setCopied] = useState<CopiedKey>(null);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    async function handleCopy(key: Exclude<CopiedKey, null>) {
        const ok = await copyToClipboard(url);
        if (!ok) return;
        setCopied(key);
        setTimeout(() => setCopied(null), 1800);
    }

    function openPopup(shareHref: string) {
        const width = 600;
        const height = 600;
        const left =
            typeof window !== "undefined"
                ? window.screenX + (window.outerWidth - width) / 2
                : 0;
        const top =
            typeof window !== "undefined"
                ? window.screenY + (window.outerHeight - height) / 2
                : 0;
        window.open(
            shareHref,
            "share-popup",
            `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`,
        );
    }

    const buttonClass =
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e8ecea] bg-white text-[#1A3628] transition-colors hover:bg-[#EAF0EA] hover:text-[#1f5a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5a2c] focus-visible:ring-offset-2";

    return (
        <div
            className={cn("flex items-center gap-2", className)}
            role="group"
            aria-label="Share this campaign"
        >
            <button
                type="button"
                onClick={() =>
                    openPopup(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                    )
                }
                aria-label="Share on Facebook"
                className={buttonClass}
            >
                <FaFacebookF className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
                type="button"
                onClick={() =>
                    openPopup(
                        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
                    )
                }
                aria-label="Share on X"
                className={buttonClass}
            >
                <FaXTwitter className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
                type="button"
                onClick={() => handleCopy("link")}
                aria-label={copied === "link" ? "Link copied" : "Copy link"}
                className={cn(
                    buttonClass,
                    copied === "link" &&
                        "border-[#1f5a2c] bg-[#EAF0EA] text-[#1f5a2c]",
                )}
            >
                {copied === "link" ? (
                    <FaCheck className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <FaLink className="h-4 w-4" aria-hidden="true" />
                )}
            </button>
        </div>
    );
}
