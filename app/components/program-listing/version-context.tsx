"use client";

import { createContext, useContext } from "react";
import type { VersionContextValue } from "./types";

export const VersionContext = createContext<VersionContextValue | null>(null);

export const useVersion = () => {
    const ctx = useContext(VersionContext);
    if (!ctx) throw new Error("VersionContext missing");
    return ctx;
};
