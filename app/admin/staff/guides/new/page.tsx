"use client";

import CmsEditor from "@/app/components/admin-dashboard/staff/CmsEditor";
import Card from "@/app/components/admin-dashboard/shared/Card";
import { FormField, Input, Select } from "@/app/components/admin-dashboard/shared/Form";

export default function NewGuidePage() {
    return (
        <CmsEditor kind="Guide" backHref="/admin/staff/guides" backLabel="Back to guides">
            <Card title="Guide details">
                <div className="space-y-4">
                    <FormField label="Author">
                        <Select defaultValue="Bianca Reyes">
                            <option>Bianca Reyes</option>
                            <option>Alex Rivera</option>
                        </Select>
                    </FormField>
                    <FormField label="Page URL">
                        <Input placeholder="/volunteer-abroad/guide" />
                    </FormField>
                    <FormField
                        label="Quick links"
                        hint="Section anchors shown at the top of the guide."
                    >
                        <Input placeholder="e.g. Costs, Requirements, FAQs" />
                    </FormField>
                </div>
            </Card>
        </CmsEditor>
    );
}
