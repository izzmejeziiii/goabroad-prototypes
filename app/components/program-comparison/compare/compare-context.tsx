"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";

export type CompareVersion = "v1" | "v2";

/** A program card flattened into the fields the comparison table shows. */
export interface ComparableProgram {
    id: string;
    title: string;
    providerName: string;
    providerLogo: string;
    image: string;
    imageAlt: string;
    rating: number | null;
    reviewsCount: number | null;
    isVerified: boolean;
    description: string;
    programUrl: string;
    webUrl: string;
    matchedProgramsCount?: number;
    /** Where the program was picked up — shown when comparing across pages. */
    sourceLabel: string;
}

export const MAX_COMPARE = 3;
export const MIN_COMPARE = 2;

interface CompareState {
    version: CompareVersion;
    /** V1 only: the explicit mode that reveals a checkbox on every card. */
    compareMode: boolean;
    selected: ComparableProgram[];
}

const STORAGE_KEY = "program-comparison:compare";
const defaultState: CompareState = {
    version: "v1",
    compareMode: false,
    selected: [],
};

/**
 * A tiny store outside React so the picks survive the hop between the directory
 * and the search results (and a reload), read through useSyncExternalStore.
 */
let state: CompareState = defaultState;
const listeners = new Set<() => void>();

function persist() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                version: state.version,
                compareMode: state.compareMode,
                selected: state.selected,
            }),
        );
    } catch {
        // A blocked or full localStorage just means the picks don't persist.
    }
}

function setState(next: Partial<CompareState>) {
    state = { ...state, ...next };
    persist();
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

const getSnapshot = () => state;
const getServerSnapshot = () => defaultState;

if (typeof window !== "undefined") {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            state = {
                version: parsed.version === "v2" ? "v2" : "v1",
                compareMode: !!parsed.compareMode,
                selected: Array.isArray(parsed.selected)
                    ? parsed.selected.slice(0, MAX_COMPARE)
                    : [],
            };
        }
    } catch {
        state = defaultState;
    }
}

interface CompareContextValue extends CompareState {
    setVersion: (version: CompareVersion) => void;
    startCompareMode: () => void;
    cancelCompareMode: () => void;
    isSelected: (id: string) => boolean;
    toggle: (program: ComparableProgram) => void;
    remove: (id: string) => void;
    clear: () => void;
    canCompare: boolean;
    isFull: boolean;
    isOpen: boolean;
    openCompare: () => void;
    closeCompare: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const { version, compareMode, selected } = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback((program: ComparableProgram) => {
        const exists = state.selected.some((item) => item.id === program.id);
        if (exists) {
            setState({
                selected: state.selected.filter((item) => item.id !== program.id),
            });
            return;
        }
        if (state.selected.length >= MAX_COMPARE) return;
        setState({ selected: [...state.selected, program] });
    }, []);

    const value = useMemo<CompareContextValue>(
        () => ({
            version,
            compareMode,
            selected,
            // Switching flows starts the visitor from a clean slate.
            setVersion: (next) => {
                setIsOpen(false);
                setState({ version: next, compareMode: false, selected: [] });
            },
            startCompareMode: () => setState({ compareMode: true }),
            cancelCompareMode: () =>
                setState({ compareMode: false, selected: [] }),
            isSelected: (id) => selected.some((item) => item.id === id),
            toggle,
            remove: (id) =>
                setState({
                    selected: state.selected.filter((item) => item.id !== id),
                }),
            clear: () => setState({ selected: [] }),
            canCompare: selected.length >= MIN_COMPARE,
            isFull: selected.length >= MAX_COMPARE,
            isOpen,
            openCompare: () => setIsOpen(true),
            closeCompare: () => setIsOpen(false),
        }),
        [compareMode, isOpen, selected, toggle, version],
    );

    return (
        <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error("useCompare must be used inside a CompareProvider");
    }
    return context;
}
