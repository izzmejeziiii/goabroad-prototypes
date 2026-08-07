"use client";

import { useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

export default function SuccessBanner({ message }: { message: string }) {
    const [open, setOpen] = useState(true);
    if (!open) return null;
    return (
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-fern-300 bg-fern-200/40 px-4 py-3 text-sm font-medium text-fern-700">
            <FiCheckCircle className="h-5 w-5 shrink-0" />
            <span className="flex-1">{message}</span>
            <button
                onClick={() => setOpen(false)}
                className="text-fern-700/70 hover:text-fern-700"
                aria-label="Dismiss"
            >
                <FiX className="h-4 w-4" />
            </button>
        </div>
    );
}
