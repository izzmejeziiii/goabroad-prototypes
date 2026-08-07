"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/app/components/admin-dashboard/shared/Button";
import ProgressBar from "@/app/components/admin-dashboard/create-listing/ProgressBar";
import StepTitleDescription from "@/app/components/admin-dashboard/create-listing/steps/StepTitleDescription";
import StepHighlights from "@/app/components/admin-dashboard/create-listing/steps/StepHighlights";
import StepDirectory from "@/app/components/admin-dashboard/create-listing/steps/StepDirectory";
import StepProgramDetails from "@/app/components/admin-dashboard/create-listing/steps/StepProgramDetails";
import StepFaq from "@/app/components/admin-dashboard/create-listing/steps/StepFaq";
import StepPremium from "@/app/components/admin-dashboard/create-listing/steps/StepPremium";
import StepPreview from "@/app/components/admin-dashboard/create-listing/steps/StepPreview";
import StepThankYou from "@/app/components/admin-dashboard/create-listing/steps/StepThankYou";

const STEP_LABELS = [
    "Title & Description",
    "Highlights",
    "Directory",
    "Program Details",
    "FAQ",
    "Premium",
    "Preview",
];

export default function NewProgramPage() {
    const [step, setStep] = useState(0);
    const [detailsTab, setDetailsTab] = useState(0);

    if (step === 7) {
        return <StepThankYou />;
    }

    const next = () => {
        if (step === 3 && detailsTab < 3) {
            setDetailsTab((t) => t + 1);
            return;
        }
        setStep((s) => s + 1);
    };

    const prev = () => {
        if (step === 3 && detailsTab > 0) {
            setDetailsTab((t) => t - 1);
            return;
        }
        setStep((s) => Math.max(0, s - 1));
    };

    return (
        <div className="mx-auto max-w-4xl">
            {/* Sticky progress */}
            <div className="sticky top-0 z-20 mb-8 bg-slate-50 py-4">
                <ProgressBar steps={STEP_LABELS} current={step} />
            </div>

            {step === 0 && <StepTitleDescription />}
            {step === 1 && <StepHighlights />}
            {step === 2 && <StepDirectory />}
            {step === 3 && (
                <StepProgramDetails tab={detailsTab} setTab={setDetailsTab} />
            )}
            {step === 4 && <StepFaq />}
            {step === 5 && <StepPremium />}
            {step === 6 && <StepPreview />}

            {/* Bottom nav */}
            <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                <Link href="/admin/programs">
                    <Button variant="ghost">
                        {step === 0 ? "Exit" : "Save as Draft & Exit"}
                    </Button>
                </Link>
                <div className="flex gap-2">
                    {step > 0 && (
                        <Button variant="outline" onClick={prev}>
                            Previous
                        </Button>
                    )}
                    {step < 6 ? (
                        <Button variant="cobalt" onClick={next}>
                            Next
                        </Button>
                    ) : (
                        <Button variant="cobalt" onClick={() => setStep(7)}>
                            Submit for Approval
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
