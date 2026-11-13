"use client";

import { useState } from "react";
import { MdCheckCircle, MdLock } from "react-icons/md";
import { FREE_LEADS_PER_YEAR } from "./data";
import PlanPicker from "./PlanPicker";
import { FOCUS_RING } from "./ui";
import type { UpgradeVersion } from "./upgradeVersion";

/* The "upgrade to view" panel over the locked leads, on the dashboard's
   Latest Leads card and on the Leads tab. "Upgrade to unlock" either sends
   the request to the account manager straight away (V1, the dashboard spec:
   an email saying the client wants to unlock more leads) or opens the plan
   picker first (V2). Here both end in the sent state. */

const UPGRADE_BUTTON = `inline-flex items-center justify-center rounded-lg bg-sun-500 px-5 py-2 text-sm font-semibold text-cobalt-700 no-underline transition-colors hover:bg-sun-400 ${FOCUS_RING}`;

const LeadsGate = ({
    lockedCount,
    version,
}: {
    lockedCount: number;
    version: UpgradeVersion;
}) => {
    const [requested, setRequested] = useState(false);
    // V2: the plan the request named, once sent
    const [requestedPlan, setRequestedPlan] = useState<string | null>(null);
    const [pickerOpen, setPickerOpen] = useState(false);

    return (
        <div
            className="flex w-full max-w-sm flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-center font-inter shadow-lg"
            aria-live="polite"
        >
            {requested ? (
                <>
                    <MdCheckCircle
                        className="size-10 text-fern-600"
                        aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1">
                        <h4 className="text-base font-semibold text-neutral-800">
                            Request sent
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-600">
                            {requestedPlan ? (
                                <>
                                    We&apos;ve let your account manager know
                                    you&apos;re interested in the{" "}
                                    {requestedPlan} plan. They&apos;ll be in
                                    touch about upgrading.
                                </>
                            ) : (
                                <>
                                    We&apos;ve let your account manager know
                                    you&apos;d like to unlock more leads.
                                    They&apos;ll be in touch about upgrading.
                                </>
                            )}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <span
                        className="flex size-10 items-center justify-center rounded-lg bg-sun-500 text-cobalt-700"
                        aria-hidden="true"
                    >
                        <MdLock className="size-6" />
                    </span>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-base font-semibold text-neutral-800">
                            {lockedCount} more {lockedCount === 1 ? "lead" : "leads"}{" "}
                            ready to unlock
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-600">
                            Free accounts can see {FREE_LEADS_PER_YEAR} leads a
                            year. Upgrade to see who else is interested in your
                            programs.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            version === "plans"
                                ? setPickerOpen(true)
                                : setRequested(true)
                        }
                        className={UPGRADE_BUTTON}
                    >
                        Upgrade to unlock
                    </button>
                </>
            )}
            {version === "plans" && (
                <PlanPicker
                    open={pickerOpen}
                    onClose={() => setPickerOpen(false)}
                    onSent={(planName) => {
                        setRequestedPlan(planName);
                        setRequested(true);
                    }}
                />
            )}
        </div>
    );
};

export default LeadsGate;
