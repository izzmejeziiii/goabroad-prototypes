import type {
    ReactNode,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    SelectHTMLAttributes,
} from "react";

const base =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30";

export function FormField({
    label,
    hint,
    children,
}: {
    label: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
            {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
        </div>
    );
}

export function Input({
    className = "",
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return <input className={`${base} ${className}`} {...props} />;
}

export function Textarea({
    className = "",
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea className={`${base} ${className}`} {...props} />;
}

export function Select({
    className = "",
    children,
    ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select className={`${base} ${className}`} {...props}>
            {children}
        </select>
    );
}
