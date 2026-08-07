import type { StatusTone } from "../types";
import { pillTone } from "./tones";

interface StatusPillProps {
    label: string;
    tone?: StatusTone;
}

export default function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${pillTone[tone]}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {label}
        </span>
    );
}
