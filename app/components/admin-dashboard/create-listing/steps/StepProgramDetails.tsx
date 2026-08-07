"use client";

import { FormField, Input, Textarea } from "../../shared/Form";
import ChipsBox from "../../shared/ChipsBox";
import ToggleGroup from "../../shared/ToggleGroup";

const tabs = [
    "Location & Timing",
    "Eligibility Requirements",
    "Program Costs",
    "Application Details",
];

export default function StepProgramDetails({
    tab,
    setTab,
}: {
    tab: number;
    setTab: (n: number) => void;
}) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Program Details
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Complete each section so travelers know exactly what to
                    expect.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {tabs.map((t, i) => (
                    <button
                        key={t}
                        onClick={() => setTab(i)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            tab === i
                                ? "bg-cobalt-500 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="space-y-5 rounded-xl border border-slate-200 p-5">
                {tab === 0 && (
                    <>
                        <FormField label="Locations">
                            <ChipsBox
                                options={["Cusco, Peru", "Lima, Peru", "Sacred Valley, Peru", "Arequipa, Peru"]}
                                placeholder="Add a location…"
                            />
                        </FormField>
                        <FormField label="Program Availability">
                            <ToggleGroup
                                multiple
                                options={["2026", "2027", "2028", "Year Round"]}
                                defaultValue={["Year Round"]}
                            />
                        </FormField>
                    </>
                )}

                {tab === 1 && (
                    <>
                        <FormField label="Participation Guidelines">
                            <ChipsBox
                                options={["United States", "United Kingdom", "Germany", "Canada", "Australia"]}
                                placeholder="Add nationalities…"
                            />
                        </FormField>
                        <FormField label="Group Types">
                            <ToggleGroup
                                multiple
                                options={["Solo", "Couples", "Family", "Groups"]}
                            />
                        </FormField>
                        <FormField label="Language Skills Required">
                            <ChipsBox
                                options={["English", "Spanish", "None required"]}
                                placeholder="Add a language…"
                            />
                        </FormField>
                        <FormField label="Accepted Education Levels">
                            <ChipsBox
                                options={["High School", "Undergraduate", "Graduate", "No requirement"]}
                                placeholder="Add an education level…"
                            />
                        </FormField>
                        <FormField label="Age Requirement">
                            <ToggleGroup
                                options={["18–24", "25–34", "35–49", "50+", "Open to All Ages"]}
                                defaultValue={["Open to All Ages"]}
                            />
                        </FormField>
                    </>
                )}

                {tab === 2 && (
                    <>
                        <FormField label="Starting Price (USD)">
                            <div className="flex items-center gap-3">
                                <Input placeholder="1240" className="max-w-40" />
                                <label className="flex items-center gap-2 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 text-cobalt-500"
                                    />
                                    Free
                                </label>
                            </div>
                        </FormField>
                        <FormField label="Inclusive Pricing">
                            <ChipsBox
                                options={["Accommodation", "Meals", "Airport pickup", "Orientation", "Excursions"]}
                                placeholder="Add an inclusion…"
                            />
                        </FormField>
                        <FormField label="Exclusions">
                            <ChipsBox
                                options={["Flights", "Visa fees", "Insurance", "Personal expenses"]}
                                placeholder="Add an exclusion…"
                            />
                        </FormField>
                        <FormField label="Refund Policy">
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                {["Full refund", "Partial refund", "No refund"].map((r, i) => (
                                    <label key={r} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="refund"
                                            defaultChecked={i === 1}
                                            className="text-cobalt-500"
                                        />
                                        {r}
                                    </label>
                                ))}
                            </div>
                        </FormField>
                        <FormField label="Refund Policy URL (optional)">
                            <Input placeholder="https://…" />
                        </FormField>
                    </>
                )}

                {tab === 3 && (
                    <>
                        <FormField label="Accommodation Options">
                            <ToggleGroup
                                multiple
                                options={["Homestay", "Hostel", "Apartment", "Dormitory", "Guesthouse"]}
                                defaultValue={["Homestay"]}
                            />
                        </FormField>
                        <FormField label="Application Procedure">
                            <ChipsBox
                                options={["Online form", "Deposit", "Interview", "Application fee"]}
                                placeholder="Add a step…"
                            />
                        </FormField>
                        <FormField label="Payment Terms (optional)">
                            <ChipsBox
                                options={["Full payment", "50% deposit", "Installments"]}
                                placeholder="Add a term…"
                            />
                        </FormField>
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                className="rounded border-slate-300 text-cobalt-500"
                            />
                            Academic credit eligible
                        </label>
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    className="rounded border-slate-300 text-cobalt-500"
                                />
                                Offers salary &amp; compensation
                            </label>
                            <Textarea
                                rows={3}
                                placeholder="Explain the compensation (if any)…"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
