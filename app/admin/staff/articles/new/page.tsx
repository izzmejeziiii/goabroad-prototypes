"use client";

import CmsEditor from "@/app/components/admin-dashboard/staff/CmsEditor";
import Card from "@/app/components/admin-dashboard/shared/Card";
import ChipsBox from "@/app/components/admin-dashboard/shared/ChipsBox";
import { FormField, Select } from "@/app/components/admin-dashboard/shared/Form";

export default function NewArticlePage() {
    return (
        <CmsEditor kind="Article" backHref="/admin/staff/articles" backLabel="Back to articles">
            <Card title="Article details">
                <div className="space-y-4">
                    <FormField label="Directory">
                        <Select defaultValue="Volunteer Abroad">
                            <option>Volunteer Abroad</option>
                            <option>Teach Abroad</option>
                            <option>Gap Year</option>
                            <option>Language Schools</option>
                        </Select>
                    </FormField>
                    <FormField label="Author">
                        <Select defaultValue="Bianca Reyes">
                            <option>Bianca Reyes</option>
                            <option>Alex Rivera</option>
                        </Select>
                    </FormField>
                    <FormField label="Topics / Tags">
                        <ChipsBox
                            options={["Volunteer", "Peru", "Budget", "First-timers", "Health"]}
                            placeholder="Add a topic…"
                        />
                    </FormField>
                    <FormField label="End CTA">
                        <Select defaultValue="">
                            <option value="" disabled>
                                Select an end CTA…
                            </option>
                            <option>Directory CTA</option>
                            <option>Program CTA</option>
                            <option>None</option>
                        </Select>
                    </FormField>
                </div>
            </Card>
        </CmsEditor>
    );
}
