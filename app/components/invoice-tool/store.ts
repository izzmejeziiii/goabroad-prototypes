import type { RecordedPayment, TransferClaim } from "./types";

/** What the payer did in this browser — layered on top of the demo data so a
 *  refresh keeps the "waiting" or "paid" state. Read it with
 *  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot). */
export interface InvoiceOverride {
    claim?: TransferClaim;
    payment?: RecordedPayment;
}

const KEY = "goabroad-invoice-tool-demo";
const listeners = new Set<() => void>();

// Fallback copy, used only when browser storage is blocked.
let memory: string | null = null;

const emit = () => listeners.forEach((l) => l());

export function subscribe(listener: () => void) {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
}

export function getSnapshot(): string {
    if (memory !== null) return memory;
    try {
        return window.localStorage.getItem(KEY) ?? "{}";
    } catch {
        return "{}";
    }
}

export const getServerSnapshot = () => "{}";

export function parseOverrides(raw: string): Record<string, InvoiceOverride> {
    try {
        return JSON.parse(raw) ?? {};
    } catch {
        return {};
    }
}

export function writeOverride(token: string, override: InvoiceOverride) {
    const all = parseOverrides(getSnapshot());
    all[token] = override;
    const next = JSON.stringify(all);
    try {
        window.localStorage.setItem(KEY, next);
        memory = null;
    } catch {
        // Storage blocked: the in-memory copy carries this visit.
        memory = next;
    }
    emit();
}

export function clearOverrides() {
    try {
        window.localStorage.removeItem(KEY);
        memory = null;
    } catch {
        memory = "{}";
    }
    emit();
}
