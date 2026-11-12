"use client";

import { Lock } from "lucide-react";
import {
    addressLines,
    countries,
    postalLabel,
    regionLabel,
    subdivisions,
} from "./regions";
import type { BillingAddress } from "./types";
import { inputClass, sectionTitle, textLink } from "./ui";

export type AddressErrors = Partial<Record<keyof BillingAddress, string>>;

/** Card: the billing address comes filled in from the client's GoAbroad
 *  account. "Change" opens the same address as editable fields, for a card
 *  billed somewhere else. The sidebar button then opens checkout. */
export default function CardPanel({
    company,
    address,
    editing,
    onEdit,
    onReset,
    onAddressChange,
    errors,
}: {
    company: string;
    address: BillingAddress;
    editing: boolean;
    onEdit: () => void;
    /** Go back to the address on the account. */
    onReset: () => void;
    onAddressChange: (next: BillingAddress) => void;
    errors: AddressErrors;
}) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <h2 className={sectionTitle}>Billing address</h2>
                <p className="text-[15px] text-slate-600">
                    {editing
                        ? "The address your card statement goes to."
                        : "From your GoAbroad account. Change it if your card is billed to a different address."}
                </p>
            </div>
            {editing ? (
                <AddressFields
                    address={address}
                    onChange={onAddressChange}
                    errors={errors}
                    onReset={onReset}
                />
            ) : (
                <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
                    <address className="flex flex-col text-[15px] leading-relaxed text-slate-700 not-italic">
                        <span className="font-semibold text-slate-900">{company}</span>
                        {addressLines(address).map((line) => (
                            <span key={line}>{line}</span>
                        ))}
                    </address>
                    <button
                        type="button"
                        onClick={onEdit}
                        className={textLink + " text-sm"}
                    >
                        Change
                    </button>
                </div>
            )}
            <p className="flex items-start gap-2 text-sm text-slate-600">
                <Lock className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
                You&rsquo;ll enter your card on Stripe&rsquo;s secure checkout page, then
                come back here. In this prototype, Pay skips straight to the result.
            </p>
        </div>
    );
}

function AddressFields({
    address,
    onChange,
    errors,
    onReset,
}: {
    address: BillingAddress;
    onChange: (next: BillingAddress) => void;
    errors: AddressErrors;
    onReset: () => void;
}) {
    const regions = subdivisions[address.country];
    const set = (patch: Partial<BillingAddress>) => onChange({ ...address, ...patch });

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-3">
                <Field id="country" label="Country" error={errors.country} wide>
                    <select
                        id="country"
                        className={inputClass}
                        value={address.country}
                        onChange={(e) => set({ country: e.target.value, region: "" })}
                        aria-invalid={!!errors.country || undefined}
                        autoComplete="country"
                    >
                        <option value="">Select</option>
                        {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field id="line1" label="Street address" error={errors.line1} wide>
                    <input
                        id="line1"
                        className={inputClass}
                        value={address.line1}
                        onChange={(e) => set({ line1: e.target.value })}
                        autoComplete="address-line1"
                        aria-invalid={!!errors.line1 || undefined}
                    />
                </Field>
                <Field id="city" label="City" error={errors.city}>
                    <input
                        id="city"
                        className={inputClass}
                        value={address.city}
                        onChange={(e) => set({ city: e.target.value })}
                        autoComplete="address-level2"
                        aria-invalid={!!errors.city || undefined}
                    />
                </Field>
                <Field
                    id="region"
                    label={regionLabel(address.country)}
                    error={errors.region}
                >
                    {regions ? (
                        <select
                            id="region"
                            className={inputClass}
                            value={address.region}
                            onChange={(e) => set({ region: e.target.value })}
                            aria-invalid={!!errors.region || undefined}
                            autoComplete="address-level1"
                        >
                            <option value="">Select</option>
                            {regions.map((r) => (
                                <option key={r.code} value={r.code}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id="region"
                            className={inputClass}
                            value={address.region}
                            onChange={(e) => set({ region: e.target.value })}
                            autoComplete="address-level1"
                            aria-invalid={!!errors.region || undefined}
                        />
                    )}
                </Field>
                <Field
                    id="postalCode"
                    label={postalLabel(address.country)}
                    error={errors.postalCode}
                >
                    <input
                        id="postalCode"
                        className={inputClass}
                        value={address.postalCode}
                        onChange={(e) => set({ postalCode: e.target.value })}
                        autoComplete="postal-code"
                        aria-invalid={!!errors.postalCode || undefined}
                    />
                </Field>
            </div>
            <button
                type="button"
                onClick={onReset}
                className={textLink + " w-fit text-sm"}
            >
                Use the address on my account
            </button>
        </div>
    );
}

/** Checks an edited address before checkout. */
export function validateAddress(a: BillingAddress): AddressErrors {
    const errs: AddressErrors = {};
    if (!a.country) errs.country = "Choose the country on your card statement.";
    if (!a.line1.trim()) errs.line1 = "Enter the street address.";
    if (!a.city.trim()) errs.city = "Enter the city.";
    if (a.country && subdivisions[a.country] && !a.region)
        errs.region = "Choose one from the list.";
    if (a.country === "US" && !/^\d{5}(-\d{4})?$/.test(a.postalCode.trim()))
        errs.postalCode = "Enter a 5-digit ZIP code.";
    return errs;
}

function Field({
    id,
    label,
    error,
    wide,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    wide?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className={"flex flex-col gap-1.5" + (wide ? " sm:col-span-3" : "")}>
            <label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
            {error ? (
                <span className="text-sm text-red-600" role="alert">
                    {error}
                </span>
            ) : null}
        </div>
    );
}
