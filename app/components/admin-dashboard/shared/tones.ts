import type { StatusTone } from "../types";

/** Soft badge backgrounds + readable text per status tone */
export const pillTone: Record<StatusTone, string> = {
    success: "bg-fern-200/60 text-fern-700",
    warning: "bg-sun-200/70 text-sun-700",
    danger: "bg-roman-200/70 text-roman-700",
    info: "bg-primary-100 text-primary-700",
    brand: "bg-brand-100 text-brand-700",
    neutral: "bg-slate-100 text-slate-600",
};

/** Tinted square backgrounds for stat / icon chips */
export const iconTone: Record<StatusTone, string> = {
    success: "bg-fern-200/60 text-fern-700",
    warning: "bg-sun-200/70 text-sun-700",
    danger: "bg-roman-200/70 text-roman-700",
    info: "bg-primary-100 text-primary-700",
    brand: "bg-brand-100 text-brand-600",
    neutral: "bg-slate-100 text-slate-500",
};
