"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UPGRADE_VERSIONS, type UpgradeVersion } from "./upgradeVersion";

/* Prototype-only control for flipping the upgrade flow between versions, in
   the brand-blue pill the other prototypes' version toggles use. Each option
   is a link (?upgrade=…), so a version can be shared directly. Shown on the
   dashboard and the Leads tab, the two places with the gate. */

const BRAND_BLUE = "#295d82";

const UpgradeVersionSwitcher = ({ current }: { current: UpgradeVersion }) => {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Upgrade flow versions"
            className="fixed bottom-5 left-1/2 z-40 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full p-1 pl-3 font-inter text-white shadow-lg"
            style={{
                background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, #1f4d6e 100%)`,
            }}
        >
            <span className="hidden shrink-0 rounded bg-sun-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 sm:inline">
                Prototype
            </span>
            <span className="hidden shrink-0 text-xs font-medium text-white/80 lg:inline">
                Upgrade flow
            </span>
            <div className="flex items-center gap-0.5 rounded-full bg-white/10 p-0.5">
                {UPGRADE_VERSIONS.map(({ id, label }) => {
                    const active = id === current;
                    return (
                        <Link
                            key={id}
                            href={`${pathname}?upgrade=${id}`}
                            scroll={false}
                            aria-current={active ? "page" : undefined}
                            className={clsx(
                                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold no-underline transition-colors",
                                active
                                    ? "bg-white shadow-sm"
                                    : "text-white/80 hover:text-white",
                            )}
                            style={active ? { color: BRAND_BLUE } : undefined}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default UpgradeVersionSwitcher;
