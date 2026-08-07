"use client";

import { FiAward, FiArrowUpRight } from "react-icons/fi";
import { FormField, Input } from "../../shared/Form";
import Button from "../../shared/Button";

export default function StepPremium() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Your Listing Plan
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Set up lead capture and see how to reach more travelers.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <FiAward className="h-6 w-6" />
                    </span>
                    <h2 className="mt-4 text-lg font-semibold text-slate-800">
                        You have a Basic Program Listing
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Upgrade to Premium for a hero image, photo gallery, a
                        partner website link, and priority placement in search.
                    </p>
                    <Button variant="cobalt" icon={FiArrowUpRight} className="mt-4">
                        Upgrade to Premium
                    </Button>
                </div>

                <div className="rounded-xl border border-cobalt-200 bg-cobalt-500/5 p-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Lead Capture Email
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Traveler inquiries for this program will be sent here.
                    </p>
                    <div className="mt-4">
                        <FormField label="Email address">
                            <Input defaultValue="inquiries@globaltrekvolunteers.org" />
                        </FormField>
                    </div>
                </div>
            </div>
        </div>
    );
}
