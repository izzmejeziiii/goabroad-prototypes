"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Heart,
    Share2,
    ShieldCheck,
    Users,
    Clock,
    ChevronDown,
} from "./icons";
import { ShareButtons } from "./ShareButtons";
import { RecentDonations } from "./RecentDonations";
import { QuickDonateButtons } from "./QuickDonateButtons";
import { Checkbox } from "./ui/Checkbox";
import { Badge } from "./ui/Badge";
import { daysLeft } from "./utils";

interface SidebarCampaign {
    id: string;
    slug: string;
    title?: string;
    organization_name?: string;
    organization_slug?: string | null;
    end_date: string;
    goal_amount: number;
    collected?: number;
    donor_count?: number;
}

const TIP_PRESETS = [0, 10, 12, 15, 20] as const;

const APP_URL = "https://ayugiving.org";

/** Accordion rows: every section stays listed with its current value, one open at a time. */
type SectionId = "amount" | "tip" | "payment" | "details";

function DonateSection({ id, label, value, required, open, onToggle, children }: { id: SectionId; label: string; value: string; required?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const wasOpen = useRef(open);

    // Bring a newly opened section into view inside the scrolling panel, once the expand
    // transition has settled. Only on a closed→open transition, so neither the first
    // render nor StrictMode's double-invoked effect can scroll the page on mount.
    useEffect(() => {
        const previouslyOpen = wasOpen.current;
        wasOpen.current = open;
        if (!open || previouslyOpen) return;
        const t = setTimeout(() => {
            const el = ref.current;
            if (!el) return;
            const scroller = el.closest<HTMLElement>("[data-donate-scroller]");
            // scrollIntoView({block:"nearest"}) only guarantees the section's *edge* is in
            // view, which bottom-aligns a section taller than the remaining space and
            // leaves its last fields clipped. Align its top instead, and only when it
            // does not already fit.
            if (scroller && scroller.scrollHeight > scroller.clientHeight) {
                const er = el.getBoundingClientRect();
                const sr = scroller.getBoundingClientRect();
                if (er.bottom > sr.bottom || er.top < sr.top) {
                    scroller.scrollTop += er.top - sr.top - 8;
                }
                return;
            }
            el.scrollIntoView({ block: "nearest" });
        }, 320);
        return () => clearTimeout(t);
    }, [open]);

    return (
        <div
            ref={ref}
            // A little scroll-margin so an expanded section never lands flush against the
            // scrollport edge when scrollIntoView bottom-aligns it.
            className={`rounded-xl border bg-white transition-colors lg:scroll-mb-4 ${open ? "border-[#1f5a2c]/30" : "border-[#e8ecea]"}`}
        >
            <button type="button" id={`donate-row-${id}`} aria-expanded={open} aria-controls={`donate-section-${id}`} onClick={onToggle} className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5a2c] focus-visible:ring-offset-2">
                <span className="shrink-0 text-sm font-medium text-[#1A3628]">{label}</span>
                <span className="flex min-w-0 items-center gap-2">
                    {value && <span className="truncate text-sm font-semibold text-[#1f5a2c]">{value}</span>}
                    {required && (
                        <Badge variant="destructive" className="shrink-0 px-2 py-0 text-[11px]">
                            Required
                        </Badge>
                    )}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-[#6b7a72] transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </span>
            </button>
            <div id={`donate-section-${id}`} inert={!open} className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                    <div className="border-t border-[#e8ecea] px-4 pb-4 pt-3">{children}</div>
                </div>
            </div>
        </div>
    );
}

export function CampaignDetailSidebar({ campaign, isLoggedIn }: { campaign: SidebarCampaign; isLoggedIn: boolean }) {
    const pathname = usePathname();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [showShare, setShowShare] = useState(false);
    const [guestEmail, setGuestEmail] = useState("");
    const [guestName, setGuestName] = useState("");
    const [tipPercent, setTipPercent] = useState<number>(15); // default per business plan §7.2
    const [customTip, setCustomTip] = useState<string>("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
    const [openSection, setOpenSection] = useState<SectionId | null>("amount");
    const [focusRow, setFocusRow] = useState<SectionId | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const focusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const checkoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Collapsing a section makes it `inert`, which blurs whatever inside it was focused —
    // so hand focus to the row that took its place instead of dropping it on <body>.
    useEffect(() => {
        if (!focusRow) return;
        document.getElementById(`donate-row-${focusRow}`)?.focus();
        // Clearing the request is what ends the cascade, not what starts one.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFocusRow(null);
    }, [focusRow]);

    useEffect(
        () => () => {
            if (focusTimer.current) clearTimeout(focusTimer.current);
            if (checkoutTimer.current) clearTimeout(checkoutTimer.current);
        },
        [],
    );

    const goal = Number(campaign.goal_amount);
    const collected = Number(campaign.collected ?? 0);
    const donors = Number(campaign.donor_count ?? 0);
    const days = daysLeft(campaign.end_date);
    const ended = days <= 0;
    const percent = goal > 0 ? Math.min(100, Math.round((collected / goal) * 100)) : 0;

    const raisedDollars = (collected / 100).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const goalDollars = (goal / 100).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const base = campaign.organization_slug ? `/campaigns/${campaign.organization_slug}/${campaign.slug}` : `/campaigns/${campaign.slug}`;

    const donationCents = selectedAmount ? Math.round(selectedAmount * 100) : 0;
    const tipCentsView = tipPercent === -1 ? Math.max(0, Math.round((parseFloat(customTip) || 0) * 100)) : Math.round((donationCents * tipPercent) / 100);
    const fmtC = (c: number) => `$${(c / 100).toFixed(2)}`;

    const guestDetailsMissing = !isLoggedIn && (!guestEmail.trim() || !guestName.trim());

    const tipLabel = tipPercent === -1 ? `${fmtC(tipCentsView)} custom` : tipPercent === 0 ? "No tip" : `${tipPercent}% · ${fmtC(tipCentsView)}`;

    function toggleSection(id: SectionId) {
        setOpenSection((current) => (current === id ? null : id));
    }

    /**
     * Prototype stand-in for the real checkout call. No payment provider is
     * wired up here, so the button still runs through its busy state and then
     * reports back instead of redirecting to Stripe/PayPal.
     */
    function startCheckout(amountDollars: number) {
        setError("");
        setNotice("");
        const cents = Math.round(amountDollars * 100);
        if (cents < 100) {
            setError("Minimum donation is $1.");
            return;
        }
        setLoading(true);
        if (checkoutTimer.current) clearTimeout(checkoutTimer.current);
        checkoutTimer.current = setTimeout(() => {
            checkoutTimer.current = null;
            setLoading(false);
            setNotice("Prototype — no payment was processed.");
        }, 900);
    }

    function handleAmountSelect(amount: number) {
        setSelectedAmount(amount);
        setError("");
        setNotice("");
        setOpenSection("tip");
        setFocusRow("tip");
    }

    /**
     * The CTA stays enabled even when guest details are missing — instead of a dead
     * button, it opens and focuses the section that still needs input.
     */
    function handleDonateClick() {
        if (!selectedAmount) return;
        if (guestDetailsMissing) {
            setOpenSection("details");
            setError("Add your email and name to continue.");
            const target = !guestEmail.trim() ? emailRef : nameRef;
            if (focusTimer.current) clearTimeout(focusTimer.current);
            focusTimer.current = setTimeout(() => {
                focusTimer.current = null;
                // Don't yank focus if the donor already started typing in either field.
                const active = document.activeElement;
                if (active === emailRef.current || active === nameRef.current) return;
                target.current?.focus();
            }, 340);
            return;
        }
        startCheckout(selectedAmount);
    }

    // The panel is height-bounded and scrolls internally so the action bar below can pin.
    // Scroll chaining is deliberately left on (no overscroll-contain): once the panel
    // bottoms out the wheel should keep scrolling the page, not dead-end over the sidebar.
    return (
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)]">
            {/* The action bar is a sibling of this scroller, never a child of it: as a child
                its sticky containing block would run past the Share and Recent Donations
                cards, so it would release at the end of the scroll range and take the CTA
                off-panel — the very failure this layout exists to prevent. */}
            <div
                // tabIndex + role/label so keyboard-only users can reach and scroll the
                // bounded region (it has no other focusable descendant past "See All").
                tabIndex={0}
                role="region"
                aria-label="Donate and campaign details"
                data-donate-scroller=""
                // Block layout, NOT flex: as flex children the cards inherit `flex-shrink: 1`
                // and get squeezed below their content height once the panel overflows,
                // which collapses the accordion's `1fr` row to 0px.
                className="space-y-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5a2c] focus-visible:ring-offset-2 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:[scrollbar-gutter:stable]"
            >
                <div className="rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm">
                    <p className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-extrabold text-[#1A3628]">${raisedDollars}</span>
                        <span className="text-sm text-[#6b7a72]">of ${goalDollars} goal</span>
                    </p>

                    <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#EAF0EA]" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Donation progress">
                        <div className="h-full rounded-full bg-linear-to-r from-[#1f5a2c] to-[#6FAE7A] transition-[width] duration-500" style={{ width: `${percent}%` }} />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#FFFCF5] p-3 text-center">
                        <div>
                            <p className="text-base font-bold text-[#1A3628]">{percent}%</p>
                            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[#6b7a72]">Funded</p>
                        </div>
                        <div className="border-x border-[#e8ecea]">
                            <p className="inline-flex items-center justify-center gap-1 text-base font-bold text-[#1A3628]">
                                <Users className="h-3.5 w-3.5 text-[#1f5a2c]" aria-hidden="true" />
                                {donors}
                            </p>
                            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[#6b7a72]">{donors === 1 ? "Donor" : "Donors"}</p>
                        </div>
                        <div>
                            <p className="inline-flex items-center justify-center gap-1 text-base font-bold text-[#1A3628]">
                                <Clock className="h-3.5 w-3.5 text-[#1f5a2c]" aria-hidden="true" />
                                {days > 0 ? days : 0}
                            </p>
                            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[#6b7a72]">{days > 0 ? "Days left" : "Ended"}</p>
                        </div>
                    </div>

                    {/* ── Donate: every choice stays listed as a row, one open at a time ── */}
                    {ended ? (
                        <p className="mt-6 rounded-xl bg-[#EAF0EA] px-4 py-3 text-center text-sm font-medium text-[#1A3628]">This campaign has ended.</p>
                    ) : (
                        <div className="mt-6 space-y-2 border-t border-[#e8ecea] pt-6">
                            <DonateSection id="amount" label="Amount" value={selectedAmount ? `$${selectedAmount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : "Choose"} open={openSection === "amount"} onToggle={() => toggleSection("amount")}>
                                <QuickDonateButtons onSelectAmount={handleAmountSelect} loading={loading} selectedAmount={selectedAmount} hideLabel />
                            </DonateSection>

                            {selectedAmount && (
                                <>
                                    <DonateSection id="tip" label="Tip to AYU Giving" value={tipLabel} open={openSection === "tip"} onToggle={() => toggleSection("tip")}>
                                        <p className="mb-2 text-xs text-[#6b7a72]">Optional, separate from your donation. 100% funds platform operations.</p>
                                        <div className="flex flex-wrap gap-2" role="group" aria-label="Tip selection">
                                            {TIP_PRESETS.map((p) => (
                                                <button key={p} type="button" onClick={() => setTipPercent(p)} aria-pressed={tipPercent === p} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${tipPercent === p ? "border-[#1f5a2c] bg-[#1f5a2c] text-white" : "border-[#e8ecea] text-[#6b7a72] hover:border-[#1f5a2c]/40 hover:bg-[#EAF0EA]"}`}>
                                                    {p === 0 ? "No tip" : `${p}%`}
                                                </button>
                                            ))}
                                            <button type="button" onClick={() => setTipPercent(-1)} aria-pressed={tipPercent === -1} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${tipPercent === -1 ? "border-[#1f5a2c] bg-[#1f5a2c] text-white" : "border-[#e8ecea] text-[#6b7a72] hover:border-[#1f5a2c]/40 hover:bg-[#EAF0EA]"}`}>
                                                Custom
                                            </button>
                                        </div>
                                        {tipPercent === -1 && (
                                            <div className="relative mt-2">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6b7a72]">$</span>
                                                <input type="number" min="0" step="0.01" value={customTip} onChange={(e) => setCustomTip(e.target.value)} aria-label="Custom tip amount in dollars" className="w-full rounded-xl border border-[#e8ecea] bg-[#FFFCF5] py-2.5 pl-7 pr-3 text-sm text-[#1A3628] focus:border-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c]/30" />
                                            </div>
                                        )}
                                    </DonateSection>

                                    <DonateSection id="payment" label="Pay with" value={paymentMethod === "stripe" ? "Card" : "PayPal"} open={openSection === "payment"} onToggle={() => toggleSection("payment")}>
                                        <div className="flex gap-2" role="group" aria-label="Payment method">
                                            {(
                                                [
                                                    ["stripe", "Card"],
                                                    ["paypal", "PayPal"],
                                                ] as const
                                            ).map(([value, label]) => (
                                                <button key={value} type="button" onClick={() => setPaymentMethod(value)} aria-pressed={paymentMethod === value} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${paymentMethod === value ? "border-[#1f5a2c] bg-[#1f5a2c] text-white" : "border-[#e8ecea] text-[#6b7a72] hover:border-[#1f5a2c]/40 hover:bg-[#EAF0EA]"}`}>
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </DonateSection>

                                    {!isLoggedIn && (
                                        <DonateSection id="details" label="Your details" value={guestName.trim() || guestEmail.trim()} required={guestDetailsMissing} open={openSection === "details"} onToggle={() => toggleSection("details")}>
                                            <div className="space-y-3">
                                                <div>
                                                    <label htmlFor="guest-email" className="mb-1 block text-xs font-medium text-[#1A3628]">
                                                        Email{" "}
                                                        <span className="text-red-500" aria-hidden="true">
                                                            *
                                                        </span>
                                                        <span className="sr-only">(required)</span>
                                                    </label>
                                                    <input
                                                        id="guest-email"
                                                        ref={emailRef}
                                                        type="email"
                                                        required
                                                        value={guestEmail}
                                                        onChange={(e) => {
                                                            setGuestEmail(e.target.value);
                                                            setError("");
                                                        }}
                                                        placeholder="your@email.com"
                                                        aria-required="true"
                                                        className="w-full rounded-xl border border-[#e8ecea] bg-white px-3.5 py-2.5 text-sm text-[#1A3628] placeholder:text-[#6b7a72] focus:border-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c]/30"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="guest-name" className="mb-1 block text-xs font-medium text-[#1A3628]">
                                                        Name{" "}
                                                        <span className="text-red-500" aria-hidden="true">
                                                            *
                                                        </span>
                                                        <span className="sr-only">(required)</span>
                                                    </label>
                                                    <input
                                                        id="guest-name"
                                                        ref={nameRef}
                                                        type="text"
                                                        required
                                                        value={guestName}
                                                        onChange={(e) => {
                                                            setGuestName(e.target.value);
                                                            setError("");
                                                        }}
                                                        placeholder="Your name"
                                                        aria-required="true"
                                                        className="w-full rounded-xl border border-[#e8ecea] bg-white px-3.5 py-2.5 text-sm text-[#1A3628] placeholder:text-[#6b7a72] focus:border-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c]/30"
                                                    />
                                                </div>
                                            </div>
                                        </DonateSection>
                                    )}

                                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e8ecea] px-4 py-3 text-sm text-[#1A3628]">
                                        <Checkbox checked={isAnonymous} onCheckedChange={(c) => setIsAnonymous(c === true)} className="mt-0.5" />
                                        <span>
                                            Make this donation anonymous <span className="text-[#6b7a72]">— your name won&apos;t be shown publicly.</span>
                                        </span>
                                    </label>

                                    <dl className="space-y-1.5 rounded-xl bg-[#FFFCF5] p-4 text-sm">
                                        <div className="flex justify-between">
                                            <dt className="text-[#6b7a72]">Donation</dt>
                                            <dd className="font-medium text-[#1A3628]">{fmtC(donationCents)}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-[#6b7a72]">Tip</dt>
                                            <dd className="font-medium text-[#1A3628]">{fmtC(tipCentsView)}</dd>
                                        </div>
                                    </dl>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Errors before an amount is picked have no pinned bar to live in. */}
                {error && (ended || !selectedAmount) && (
                    <p className="rounded-xl bg-white px-4 py-3 text-sm text-red-600 shadow-sm" role="alert" aria-live="polite">
                        {error}
                    </p>
                )}

                <div className="rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setShowShare((v) => !v)}
                        aria-expanded={showShare}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1B211A] bg-white px-5 py-3.5 text-sm font-semibold text-[#1B211A] transition-colors hover:border-[#1f5a2c] hover:text-[#1f5a2c] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2"
                    >
                        <Share2 className="h-4 w-4" aria-hidden="true" />
                        Share Campaign
                    </button>

                    {showShare && (
                        <div className="mt-4">
                            <ShareButtons url={`${APP_URL}${base}`} title={campaign.title || "Support this campaign"} />
                        </div>
                    )}

                    <div className="mt-6 flex gap-3 rounded-xl bg-[#FFFCF5] p-5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0EA] text-[#1f5a2c]" aria-hidden="true">
                            <ShieldCheck className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-[#1f5a2c]">AYU Guarantee</p>
                            <p className="mt-1 text-xs leading-relaxed text-[#6b7a72]">Donations are protected. If something goes wrong, we&apos;ll work with you to make it right.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[#e8ecea] bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[#1A3628]">Recent Donations</h3>
                        <Link href="#" className="text-xs font-semibold text-[#1f5a2c] hover:underline">
                            See All
                        </Link>
                    </div>
                    <RecentDonations limit={5} showHeader={false} />
                </div>
            </div>

            {/* ── Action bar: total + CTA stay in view however tall the form gets. On desktop
                it is the panel's non-scrolling footer; on mobile it rides the viewport
                bottom while the donation area is on screen. ── */}
            {!ended && selectedAmount && (
                <div className="sticky bottom-0 z-30 rounded-2xl border border-[#e8ecea] bg-white p-4 shadow-bar lg:shrink-0">
                    <div className="mb-2 flex items-baseline justify-between gap-2">
                        <span className="text-sm text-[#6b7a72]">
                            Total · {fmtC(donationCents)} + {fmtC(tipCentsView)} tip
                        </span>
                        <span className="text-base font-bold text-[#1A3628]">{fmtC(donationCents + tipCentsView)}</span>
                    </div>

                    {error && (
                        <p className="mb-2 text-sm text-red-600" role="alert" aria-live="polite">
                            {error}
                        </p>
                    )}

                    {notice && (
                        <p className="mb-2 text-sm font-medium text-[#1f5a2c]" role="status" aria-live="polite">
                            {notice}
                        </p>
                    )}

                    <button type="button" onClick={handleDonateClick} disabled={loading} aria-busy={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5a2c] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#184823] focus:outline-none focus:ring-2 focus:ring-[#1f5a2c] focus:ring-offset-2 disabled:opacity-50">
                        <Heart className="h-4 w-4" aria-hidden="true" />
                        {loading ? "Processing…" : `Donate ${fmtC(donationCents + tipCentsView)}`}
                    </button>

                    {!isLoggedIn && (
                        <p className="mt-2 text-center text-xs text-[#6b7a72]">
                            Have an account?{" "}
                            <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} className="font-medium text-[#1f5a2c] hover:underline">
                                Log in
                            </Link>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
