import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";

type Variant = "primary" | "cta" | "outline" | "ghost" | "danger" | "cobalt";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm",
    cta: "bg-sun-500 text-slate-900 hover:bg-sun-600 shadow-sm",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-roman-500 text-white hover:bg-roman-600 shadow-sm",
    cobalt: "bg-cobalt-500 text-white hover:bg-cobalt-600 shadow-sm",
};

const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    icon?: IconType;
    children?: ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    icon: Icon,
    children,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {Icon && <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />}
            {children}
        </button>
    );
}
