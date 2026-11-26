import clsx from "clsx";
import { Tooltip } from "../../mui";

/* Copy of src/components/Icons/TeamIcon.js: a 16px (24px large) round
   badge with the team's initials in 8px white type and its tooltip. */

const VARIANTS: Record<string, { initial: string; label: string; bg: string }> = {
    duo: { initial: "SD", label: "Sales Duo", bg: "#e5748e" },
    "sales-duo": { initial: "SD", label: "Sales Duo", bg: "#e5748e" },
    pirates: { initial: "CP", label: "Corporate Pirates", bg: "#a8639e" },
    "corporate-pirates": { initial: "CP", label: "Corporate Pirates", bg: "#a8639e" },
    express: { initial: "SE", label: "Sales Express", bg: "#ffc107" },
    "sales-express": { initial: "SE", label: "Sales Express", bg: "#ffc107" },
    tycoons: { initial: "TT", label: "The Tycoons", bg: "#974044" },
    "the-tycoons": { initial: "TT", label: "The Tycoons", bg: "#974044" },
    sharks: { initial: "SS", label: "Sales Sharks", bg: "#02b3b6" },
    wolves: { initial: "SW", label: "Sales Wolves", bg: "#f8bb2b" },
    content: { initial: "CT", label: "Content", bg: "#f57c00" },
    "content-team": { initial: "CT", label: "Content", bg: "#f57c00" },
    unassigned: { initial: "U", label: "Unassigned", bg: "#9e9e9e" },
    oai: { initial: "OAI", label: "Preferred OAI", bg: "#4E97D1" },
};

const TeamIcon = ({ variant, size }: { variant: string; size?: "large" }) => {
    const v = VARIANTS[variant];
    return (
        <Tooltip title={v?.label || "Unassigned"} placement="top">
            <p
                className={clsx(
                    "m-0 inline-flex items-center justify-center rounded-[50px] align-middle tracking-[0.00938em] text-white",
                    size === "large" ? "size-6 text-[12px]" : "size-4 text-[8px]",
                )}
                style={{ background: v?.bg }}
            >
                {v?.initial || "U"}
            </p>
        </Tooltip>
    );
};

export default TeamIcon;
