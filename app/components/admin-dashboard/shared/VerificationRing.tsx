import type { ReactNode } from "react";

interface VerificationRingProps {
    percent: number;
    size?: number;
    stroke?: number;
    children?: ReactNode;
    trackClassName?: string;
    progressClassName?: string;
}

export default function VerificationRing({
    percent,
    size = 76,
    stroke = 6,
    children,
    trackClassName = "text-white/15",
    progressClassName = "text-sun-500",
}: VerificationRingProps) {
    const r = (size - stroke) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div
            className="relative inline-flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={stroke}
                    stroke="currentColor"
                    className={trackClassName}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    stroke="currentColor"
                    className={progressClassName}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
