import Link from "next/link";
import clsx from "clsx";
import { MdReceiptLong } from "react-icons/md";
import { BASE_PATH, DEMO_TODAY, renewalInvoice } from "../data";
import { formatShort } from "../format";
import { FOCUS_RING, SECONDARY_BUTTON } from "../ui";

/* The renewal invoice callout at the top of Needs Your Attention. The PO
   asked for the renewal invoice to stand out ("a banner somewhere or
   highlights inside the Needs Your Attention card"); this in-card panel was
   picked over a top banner, a slim strip and a pinned row (2026-11-13). It
   takes the place of the card's plain "balance due" row.

   Orange (GoAbroad's accent, the `highlight`/`sun` scales) marks "pay
   attention" without the red of an error; text on it stays neutral-800,
   slate-600 or highlight-800 for contrast. */

const PAY_HREF = `${BASE_PATH}/invoices?payment_status=unpaid`;
const VIEW_HREF = `${BASE_PATH}/invoices`;

const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
}).format(renewalInvoice.amount);
const dueDate = formatShort(renewalInvoice.dueDate);
const daysLeft = Math.round(
    (Date.parse(renewalInvoice.dueDate) - Date.parse(DEMO_TODAY)) / 86_400_000,
);
const dueIn = `Due in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}`;

/* goabroad.com's red CTA (the "Apply Now" red, secondary-500 = roman-500
   #dc625a), darkening to secondary-600 on hover. White on it is 3.6:1,
   under AA for 14px text; secondary-700 (#9c4640, 6.2:1) is the AA shade. */
const PAY_BUTTON = `inline-flex items-center justify-center rounded-lg bg-secondary-500 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-secondary-600 hover:text-white ${FOCUS_RING}`;

const InvoiceIcon = ({ className }: { className?: string }) => (
    <span
        className={clsx(
            "flex shrink-0 items-center justify-center rounded-lg bg-sun-500 text-cobalt-700",
            className,
        )}
        aria-hidden="true"
    >
        <MdReceiptLong className="size-6" />
    </span>
);

// flex-wrap: in a narrow card (two thirds of a 1024px window) the buttons
// drop under the details instead of squeezing them.
const RenewalCallout = () => (
    <div className="px-5 pt-5">
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-highlight-200 bg-highlight-50 p-4">
            <div className="flex min-w-[15rem] flex-1 items-center gap-4">
                <InvoiceIcon className="size-11" />
                <div className="flex min-w-0 flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-neutral-800">
                            Renewal invoice {renewalInvoice.number}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-highlight-100 px-2.5 py-0.5 text-xs font-semibold text-highlight-800">
                            {dueIn}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600">
                        <span className="text-lg font-bold tabular-nums text-neutral-800">
                            {amount}
                        </span>{" "}
                        due on {dueDate}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
                <Link href={VIEW_HREF} className={SECONDARY_BUTTON}>
                    View invoice
                </Link>
                <Link href={PAY_HREF} className={PAY_BUTTON}>
                    Pay invoice
                </Link>
            </div>
        </div>
    </div>
);

export default RenewalCallout;
