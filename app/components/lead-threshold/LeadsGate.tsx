"use client";

import { useState } from "react";
import Link from "next/link";
import { MdCheckCircle, MdLock } from "react-icons/md";
import { PiCrownSimpleFill } from "react-icons/pi";
import { BASE_PATH, FREE_LEADS_PER_YEAR } from "./data";
import PlanPicker from "./PlanPicker";
import PremiumPanel from "./PremiumPanel";
import { FOCUS_RING } from "./ui";
import type { UpgradeVersion } from "./upgradeVersion";

/* The "upgrade to view" panel over the locked leads, on the dashboard's
   Latest Leads card and on the Leads tab. "Upgrade to unlock" either sends
   the request to the account manager straight away (V1, the dashboard spec:
   an email saying the client wants to unlock more leads), opens the plan
   picker first (V2), opens the premium panel (V3, which also puts a crown
   on the gate) or goes to the Compare plans page (V4). V1 to V3 end in the
   sent state here. */

const UPGRADE_BUTTON = `inline-flex items-center justify-center gap-2 rounded-lg bg-sun-500 px-5 py-2 text-sm font-semibold text-cobalt-700 no-underline transition-colors hover:bg-sun-400 ${FOCUS_RING}`;

const LeadsGate = ({
    lockedCount,
    version,
}: {
    lockedCount: number;
    version: UpgradeVersion;
}) => {
    const [requested, setRequested] = useState(false);
    // V2 and V3: the plan the request named, once sent
    const [requestedPlan, setRequestedPlan] = useState<string | null>(null);
    const [pickerOpen, setPickerOpen] = useState(false);
    const premium = version === "premium";
    const sendPlanRequest = (planName: string) => {
        setRequestedPlan(planName);
        setRequested(true);
    };

    return (
        <div
            className="flex w-full max-w-sm flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-center font-inter shadow-lg"
            aria-live="polite"
        >
            {requested ? (
                <>
                    {premium ? (
                        <span
                            className="flex size-10 items-center justify-center rounded-lg bg-sun-500 text-cobalt-700"
                            aria-hidden="true"
                        >
                            <PiCrownSimpleFill className="size-6" />
                        </span>
                    ) : (
                        <MdCheckCircle
                            className="size-10 text-fern-600"
                            aria-hidden="true"
                        />
                    )}
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
                        {premium ? (
                            <PiCrownSimpleFill className="size-6" />
                        ) : (
                            <MdLock className="size-6" />
                        )}
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
                    {version === "page" ? (
                        <Link
                            href={`${BASE_PATH}/upgrade?upgrade=page`}
                            className={UPGRADE_BUTTON}
                        >
                            Upgrade to unlock
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={() =>
                                version === "request"
                                    ? setRequested(true)
                                    : setPickerOpen(true)
                            }
                            className={UPGRADE_BUTTON}
                        >
                            {premium && (
                                <PiCrownSimpleFill
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            )}
                            Upgrade to unlock
                        </button>
                    )}
                </>
            )}
            {version === "plans" && (
                <PlanPicker
                    open={pickerOpen}
                    onClose={() => setPickerOpen(false)}
                    onSent={sendPlanRequest}
                />
            )}
            {premium && (
                <PremiumPanel
                    open={pickerOpen}
                    onClose={() => setPickerOpen(false)}
                    onSent={sendPlanRequest}
                />
            )}
        </div>
    );
};

export default LeadsGate;
