"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FormField, Select } from "../../shared/Form";
import ChipsBox from "../../shared/ChipsBox";

export default function StepDirectory() {
    const [cards, setCards] = useState([0]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Choose a Directory
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Pick the directories and categories your program should
                    appear in.
                </p>
            </div>

            <div className="space-y-4">
                {cards.map((c) => (
                    <div
                        key={c}
                        className="space-y-4 rounded-xl border border-slate-200 p-5"
                    >
                        {cards.length > 1 && (
                            <div className="flex justify-end">
                                <button
                                    onClick={() =>
                                        setCards((x) => x.filter((v) => v !== c))
                                    }
                                    className="text-xs font-medium text-roman-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                        <FormField label="Directories">
                            <Select defaultValue="">
                                <option value="" disabled>
                                    Select a directory…
                                </option>
                                <option>Volunteer Abroad</option>
                                <option>Language Schools</option>
                                <option>Teach Abroad</option>
                                <option>Intern Abroad</option>
                                <option>Gap Year</option>
                            </Select>
                        </FormField>
                        <FormField label="Type">
                            <ChipsBox
                                options={[
                                    "Community Development",
                                    "Healthcare",
                                    "Education",
                                    "Conservation",
                                    "Childcare",
                                ]}
                                placeholder="Add a type…"
                            />
                        </FormField>
                        <FormField label="Timing">
                            <ChipsBox
                                options={["Summer", "Fall", "Winter", "Spring", "Year Round"]}
                                placeholder="Add timing…"
                            />
                        </FormField>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setCards((x) => [...x, Math.max(...x) + 1])}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-cobalt-600 transition-colors hover:border-cobalt-400"
            >
                <FiPlus className="h-4 w-4" />
                Add Directory
            </button>

            <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                    type="checkbox"
                    className="rounded border-slate-300 text-cobalt-500"
                />
                Is the program offered online?
            </label>
        </div>
    );
}
