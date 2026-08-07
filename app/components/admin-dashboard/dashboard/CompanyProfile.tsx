"use client";

import { useState } from "react";
import { FiEdit2, FiPlus } from "react-icons/fi";
import {
    FaFacebook,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
    FaLinkedin,
} from "react-icons/fa6";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { FormField, Input, Select, Textarea } from "../shared/Form";
import { provider } from "../data";

const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);
const socials = [FaFacebook, FaInstagram, FaXTwitter, FaYoutube, FaLinkedin];

export default function CompanyProfile() {
    const [editing, setEditing] = useState(false);
    const dis = !editing;

    return (
        <Card
            title="Company Profile"
            action={
                editing ? (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button size="sm" onClick={() => setEditing(false)}>
                            Save Changes
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={FiEdit2}
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </Button>
                )
            }
        >
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Column 1 */}
                <div className="space-y-4">
                    <FormField label="Public Name">
                        <Input
                            disabled={dis}
                            defaultValue={provider.name}
                            maxLength={60}
                        />
                    </FormField>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            disabled={dis}
                            defaultChecked
                            className="rounded border-slate-300 text-brand-500"
                        />
                        Show on Frontend
                    </label>
                    <FormField label="Website">
                        <Input
                            disabled={dis}
                            defaultValue={`https://${provider.website}`}
                        />
                    </FormField>
                    <FormField label="Year Founded">
                        <Select disabled={dis} defaultValue="2016">
                            {years.map((y) => (
                                <option key={y}>{y}</option>
                            ))}
                        </Select>
                    </FormField>
                    <div className="space-y-3">
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Address
                        </div>
                        <Input
                            disabled={dis}
                            placeholder="Street Address"
                            defaultValue="Av. El Sol 123"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <Input disabled={dis} placeholder="City" defaultValue="Cusco" />
                            <Input disabled={dis} placeholder="State" defaultValue="Cusco" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Input disabled={dis} placeholder="Zip Code" defaultValue="08002" />
                            <Input disabled={dis} placeholder="Country" defaultValue="Peru" />
                        </div>
                        <Input
                            disabled={dis}
                            placeholder="Timezone"
                            defaultValue="America/Lima"
                        />
                    </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                    <FormField label="Phone">
                        <Input disabled={dis} defaultValue="+51 84 221190" />
                    </FormField>
                    <FormField label="Fax">
                        <Input disabled={dis} placeholder="—" />
                    </FormField>
                    <div className="space-y-3">
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Billing Address
                        </div>
                        <Input
                            disabled={dis}
                            placeholder="Street Address"
                            defaultValue="Av. El Sol 123"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <Input disabled={dis} placeholder="City" defaultValue="Cusco" />
                            <Input disabled={dis} placeholder="State" defaultValue="Cusco" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Input disabled={dis} placeholder="Zip Code" defaultValue="08002" />
                            <Input disabled={dis} placeholder="Country" defaultValue="Peru" />
                        </div>
                        <Input disabled={dis} placeholder="Other Info" />
                    </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-5">
                    <div>
                        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Social Media
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {socials.map((Icon, i) => (
                                <span
                                    key={i}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600"
                                >
                                    <Icon className="h-4 w-4" />
                                </span>
                            ))}
                            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400 hover:border-brand-400 hover:text-brand-500">
                                <FiPlus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Awards
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {["2025", "2024", "2023"].map((y) => (
                                <span
                                    key={y}
                                    className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-sun-200/60 text-[10px] font-bold text-sun-700"
                                >
                                    ★<span>{y}</span>
                                </span>
                            ))}
                            <button className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-400 hover:border-brand-400 hover:text-brand-500">
                                <FiPlus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Company Description
                        </div>
                        <Textarea
                            disabled={dis}
                            rows={5}
                            defaultValue="Global Trek Volunteers connects travelers with meaningful volunteer and study programs across Peru — community health, education, and conservation, all with strong local support."
                        />
                        <div className="mt-1 flex items-center justify-between">
                            <span className="text-xs text-slate-400">218/1500</span>
                            <Button variant="outline" size="sm" disabled={dis}>
                                Submit for Approval
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
