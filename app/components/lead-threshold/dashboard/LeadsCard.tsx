import Link from "next/link";
import {
    BASE_PATH,
    isFreeAccount,
    leadName,
    lockedLeadCount,
    viewableLeads,
} from "../data";
import { formatShort } from "../format";
import { CardLink, DashboardCard, TEXT_LINK } from "../ui";
import LeadsGate from "../LeadsGate";
import type { UpgradeVersion } from "../upgradeVersion";

/* Latest Leads (Dashboard/LeadsCard.js on PR 784), with the lead threshold:
   up to 10 rows. A free account's viewable leads come first; the rest of
   the 10 are blurred placeholder rows under an "upgrade to view" panel
   ("[X] more leads ready to unlock" + "Upgrade to unlock", from the
   dashboard spec's Unlock Leads section). Paid accounts get 10 real rows. */

export const LATEST_LEADS_LIMIT = 10;

// Both tables share these widths (table-fixed) so the blurred rows line up
// with the real ones.
const Columns = () => (
    <colgroup>
        <col className="w-[20%]" />
        <col className="w-[22%]" />
        <col className="w-[42%]" />
        <col className="w-[16%]" />
    </colgroup>
);

/* Stand-ins drawn under the blur. They are not real leads: the client never
   receives a locked lead's details, only the count. */
const PLACEHOLDER_ROWS = [
    ["Nov 00, 2026", "Xxxxxx Xxxxxxx", "Xxxxxxxx Xxxxxxxxxxx in Xxxxx Xxxx"],
    ["Nov 00, 2026", "Xxxxx Xxxxxxxx", "Xxxxxxxx Xxxxxx Xxxxxxxxx in Xxxxxxxx"],
    ["Oct 00, 2026", "Xxxx Xxxxxx", "Xxxxx Xxxxxxx in Xxxxx Xxxx"],
    ["Oct 00, 2026", "Xxxxxx Xxxxxx", "Xxxxxxxxx Xxxxxx Xxxxxxxxxx in Xxxxx"],
    ["Oct 00, 2026", "Xxxxx Xxxxxxxxx", "Xxxxxxxx Xxxxxxxxxxx in Xxxxx Xxxx"],
];

const CELL = "px-5 py-4";

const LeadsCard = ({ upgradeVersion }: { upgradeVersion: UpgradeVersion }) => {
    const shown = viewableLeads.slice(0, LATEST_LEADS_LIMIT);
    const lockedRows = isFreeAccount
        ? Math.min(
              LATEST_LEADS_LIMIT - shown.length,
              lockedLeadCount,
              PLACEHOLDER_ROWS.length,
          )
        : 0;

    return (
        <DashboardCard
            title="Latest Leads"
            action={<CardLink href={`${BASE_PATH}/leads`}>View all leads</CardLink>}
        >
            {shown.length === 0 && lockedRows === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-slate-500">
                    No leads yet. New leads will show up here.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-left text-sm">
                        <Columns />
                        <thead className="border-b border-slate-100 bg-slate-50 text-xs text-slate-500">
                            <tr>
                                <th className="px-5 py-2.5 font-semibold">Date</th>
                                <th className="px-5 py-2.5 font-semibold">Lead</th>
                                <th className="px-5 py-2.5 font-semibold">
                                    Program of interest
                                </th>
                                <th className="px-5 py-2.5">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {shown.map((lead) => (
                                <tr key={lead.id}>
                                    <td className={`${CELL} whitespace-nowrap tabular-nums text-slate-500`}>
                                        {formatShort(lead.inquiryDate)}
                                    </td>
                                    <td className={`${CELL} font-semibold text-neutral-800`}>
                                        {leadName(lead) || "--"}
                                    </td>
                                    <td className={CELL}>{lead.programName || "--"}</td>
                                    <td className={`${CELL} whitespace-nowrap text-right`}>
                                        <Link
                                            href={`${BASE_PATH}/leads?lead=${lead.id}`}
                                            className={TEXT_LINK}
                                        >
                                            View lead
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {lockedRows > 0 && (
                        <div className="relative border-t border-slate-100">
                            <table
                                className="pointer-events-none w-full table-fixed select-none text-left text-sm blur-[5px]"
                                aria-hidden="true"
                            >
                                <Columns />
                                <tbody className="divide-y divide-slate-100 text-slate-600">
                                    {PLACEHOLDER_ROWS.slice(0, lockedRows).map(
                                        ([date, name, program], i) => (
                                            <tr key={i}>
                                                <td className={`${CELL} whitespace-nowrap text-slate-500`}>
                                                    {date}
                                                </td>
                                                <td className={`${CELL} font-semibold text-neutral-800`}>
                                                    {name}
                                                </td>
                                                <td className={CELL}>{program}</td>
                                                <td className={`${CELL} text-right font-semibold text-cobalt-500`}>
                                                    View lead
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                            {/* Wash over the blur so the panel reads first */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/30 to-white/80 p-4">
                                <LeadsGate
                                    lockedCount={lockedLeadCount}
                                    version={upgradeVersion}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </DashboardCard>
    );
};

export default LeadsCard;
