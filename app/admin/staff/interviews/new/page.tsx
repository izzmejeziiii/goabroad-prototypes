"use client";

import { FiUploadCloud } from "react-icons/fi";
import CmsEditor from "@/app/components/admin-dashboard/staff/CmsEditor";
import Card from "@/app/components/admin-dashboard/shared/Card";
import { FormField, Input, Select } from "@/app/components/admin-dashboard/shared/Form";

export default function NewInterviewPage() {
    return (
        <CmsEditor kind="Interview" backHref="/admin/staff/interviews" backLabel="Back to interviews">
            <Card title="Interviewee">
                <div className="space-y-4">
                    <FormField label="Interviewee name">
                        <Input placeholder="Full name" />
                    </FormField>
                    <FormField label="Type">
                        <Select defaultValue="Alumni">
                            <option>Alumni</option>
                            <option>Staff</option>
                        </Select>
                    </FormField>
                    <FormField label="Client">
                        <Select defaultValue="Global Trek Volunteers">
                            <option>Global Trek Volunteers</option>
                            <option>Maximo Impact Peru</option>
                            <option>Andes Language Co.</option>
                        </Select>
                    </FormField>
                    <FormField label="Headshot">
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-6 text-slate-400">
                            <FiUploadCloud className="h-6 w-6" />
                            <span className="mt-1 text-xs">Upload photo</span>
                        </div>
                    </FormField>
                </div>
            </Card>
        </CmsEditor>
    );
}
