"use client";

import { Lock } from "lucide-react";
import {
    countries,
    countryName,
    postalLabel,
    regionLabel,
    regionName,
    subdivisions,
} from "./regions";
import type { BillingAddress, CardQuote } from "./types";
import { inputClass, sectionTitle } from "./ui";

export type AddressErrors = Partial<Record<keyof BillingAddress, string>>;

const feeNote =
    "rounded-xl border border-dashed border-sun-500 bg-sun-200/25 px-5 py-4 text-sm leading-relaxed text-slate-700";

/** Card step 1: billing address (decides the card fee). Step 2: the address is
 *  locked and the fee is final; the sidebar button opens checkout. */
export default function CardPanel({
    address,
    onAddressChange,
    errors,
    quote,
}: {
    address: BillingAddress;
    onAddressChange: (next: BillingAddress) => void;
    errors: AddressErrors;
    quote: CardQuote | null;
}) {
    if (quote) {
        const region = regionName(address.country, address.region);
        return (
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <h2 className={sectionTitle}>Billing address</h2>
                    <p className="text-[15px] text-slate-600">
                        Confirmed for this invoice. The card fee below is final.
                    </p>
                </div>
                <dl className="rounded-xl border border-slate-200 bg-white px-5">
                    <Row label="Country" value={countryName(address.country)} first />
                    {region ? (
                        <Row label={regionLabel(address.country)} value={region} />
                    ) : null}
                    {address.postalCode ? (
                        <Row
                            label={postalLabel(address.country)}
                            value={address.postalCode}
                        />
                    ) : null}
                </dl>
                <p className={feeNote}>{quote.disclosure}</p>
                <p className="flex items-start gap-2 text-sm text-slate-600">
                    <Lock className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
                    You&rsquo;ll enter your card on Stripe&rsquo;s secure checkout page,
                    then come back here. In this prototype, Pay skips straight to the
                    result.
                </p>
            </div>
        );
    }

    const regions = subdivisions[address.country];
    const set = (patch: Partial<BillingAddress>) =>
        onAddressChange({ ...address, ...patch });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <h2 className={sectionTitle}>Billing address</h2>
                <p className="text-[15px] text-slate-600">
                    The address your card statement goes to. It decides whether a card fee
                    applies.
                </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
            <p className={feeNote}>
                Confirm the address to see whether a card fee applies. It can&rsquo;t be
                changed afterwards for this invoice.
            </p>
        </div>
    );
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
        <div className={"flex flex-col gap-1.5" + (wide ? " sm:col-span-2" : "")}>
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

function Row({ label, value, first }: { label: string; value: string; first?: boolean }) {
    return (
        <div
            className={
                "flex justify-between gap-6 py-3.5" +
                (first ? "" : " border-t border-slate-100")
            }
        >
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="text-[15px] font-semibold text-slate-900">{value}</dd>
        </div>
    );
}
