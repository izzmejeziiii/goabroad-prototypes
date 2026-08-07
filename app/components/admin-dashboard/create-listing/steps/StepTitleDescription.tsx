"use client";

import { FormField, Input, Select } from "../../shared/Form";
import CounterInput from "../../shared/CounterInput";

export default function StepTitleDescription() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Program Title and Description
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Start with the basics — a clear title and a compelling
                    description travelers will love.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Choose Client">
                    <Select defaultValue="Global Trek Volunteers">
                        <option>Global Trek Volunteers</option>
                    </Select>
                </FormField>
                <FormField label="URL Slug">
                    <Input placeholder="community-health-volunteer" />
                </FormField>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
                <h2 className="text-lg font-semibold text-slate-800">Title</h2>
                <p className="mb-2 text-sm text-slate-500">
                    Between 20 and 60 characters.
                </p>
                <CounterInput
                    min={20}
                    max={60}
                    placeholder="Enter Program Title Here..."
                />
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
                <h2 className="text-lg font-semibold text-slate-800">
                    Description
                </h2>
                <p className="mb-2 text-sm text-slate-500">
                    Between 500 and 1200 characters.
                </p>
                <CounterInput
                    multiline
                    rows={8}
                    min={500}
                    max={1200}
                    placeholder="Enter description here..."
                />
            </div>
        </div>
    );
}
