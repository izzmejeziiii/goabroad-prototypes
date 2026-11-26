"use client";

import { useState, type ReactNode } from "react";
import StaffHeader from "./StaffHeader";
import StaffSidebar from "./StaffSidebar";

/* The staff frame from src/layouts/Dashboard.js (the editor,
   AddEditInvoice.js, draws the same one): a full-height flex row with the
   absolute AppBar, the permanent Drawer (collapsed by default), and the
   #f2f4f7 <main> padded 40px 35px 60px under a theme.mixins.toolbar spacer
   (64px from 600px up, 56px below). */

const StaffShell = ({ children }: { children: ReactNode }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="lt-root relative z-[1] flex h-screen w-full overflow-hidden antialiased">
            <StaffHeader expanded={expanded} onToggle={() => setExpanded((v) => !v)} />
            <StaffSidebar expanded={expanded} />
            <main className="min-w-0 grow overflow-y-auto bg-[#f2f4f7] px-[35px] pb-[60px] pt-10">
                <div className="min-h-14 sm:min-h-16" />
                {children}
            </main>
        </div>
    );
};

export default StaffShell;
