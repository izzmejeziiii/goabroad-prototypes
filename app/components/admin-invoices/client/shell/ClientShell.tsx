"use client";

import { useState, type ReactNode } from "react";
import ClientHeader from "./ClientHeader";
import ClientSidebar from "./ClientSidebar";

/* The client admin frame from src/views/ClientAdmin/ClientAdmin.js: a
   full-height flex row with the absolute AppBar over the content, the docked
   Drawer (open by default), and the #f2f4f7 content pane padded
   80px 35px 60px. */

const ClientShell = ({ children }: { children: ReactNode }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="lt-root relative z-[1] flex h-screen w-full overflow-hidden antialiased">
            <ClientHeader expanded={expanded} onToggle={() => setExpanded((v) => !v)} />
            <ClientSidebar expanded={expanded} />
            <main className="relative min-w-0 grow overflow-y-auto bg-[#f2f4f7] px-[35px] pb-[60px] pt-20">
                {children}
            </main>
        </div>
    );
};

export default ClientShell;
