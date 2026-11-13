"use client";

import { useState, type ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

/* The client admin frame from src/views/ClientAdmin/ClientAdmin.js: a
   full-height flex row with the absolute AppBar over the content, the docked
   Drawer, and the #f2f4f7 content pane (80px top padding clears the AppBar).
   The profile banner the old shell reserved 50px for is gone on PR 784. */

const ClientAdminShell = ({ children }: { children: ReactNode }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="lt-root relative z-[1] flex h-screen w-full overflow-hidden antialiased">
            <Header expanded={expanded} onToggle={() => setExpanded((v) => !v)} />
            <Sidebar expanded={expanded} />
            <main className="relative grow overflow-y-auto bg-[#f2f4f7] px-[35px] pb-[60px] pt-20">
                {children}
            </main>
        </div>
    );
};

export default ClientAdminShell;
