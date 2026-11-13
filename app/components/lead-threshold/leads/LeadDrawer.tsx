"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { leadName } from "../data";
import { formatNumeric } from "../format";
import type { Lead } from "../types";

/* Copy of Inquiries/InquiriesDrawer.js: a 420px right MUI Drawer with an
   invisible backdrop, one "Inquiry Summary" tab and a card of label/value
   pairs. Leads from the Online Advisor feed add Directory, Travel Timeline and
   Destination(s); the Leads tab only lists Inquire Here leads today, so their
   empty row (and its extra divider) is kept as the real drawer renders it. */

const Detail = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="my-6">
        <span className="mx-6 mb-0 text-[11px] uppercase leading-[2.66] tracking-[0.08333em] text-[#9e9e9e]">
            {label}
        </span>
        <p className="mx-6 text-[0.875rem] font-bold leading-[1.43] tracking-[0.01071em] text-[#757575]">
            {children}
        </p>
    </div>
);

const Row = ({ children }: { children?: ReactNode }) => (
    <div className="flex w-full flex-wrap">{children}</div>
);

const Half = ({ children }: { children: ReactNode }) => (
    <div className="max-w-[50%] basis-1/2">{children}</div>
);

const Divider = () => (
    <hr className="m-0 shrink-0 border-0 border-b border-solid border-b-[rgba(0,0,0,0.12)]" />
);

const LeadDrawer = ({
    lead,
    onClose,
}: {
    lead: Lead | null;
    onClose: () => void;
}) => {
    const open = !!lead;
    // Keep the last lead on screen while the drawer slides out.
    const [shown, setShown] = useState(lead);
    if (lead && lead !== shown) setShown(lead);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return (
        <div
            className={clsx("fixed inset-0 z-[1200]", !open && "pointer-events-none")}
            aria-hidden={!open}
        >
            {/* invisible backdrop: a click outside closes the drawer */}
            <div className="absolute inset-0" onClick={onClose} />
            <aside
                role="dialog"
                aria-label="Inquiry Summary"
                className={clsx(
                    "absolute right-0 top-0 flex h-full flex-col overflow-y-auto bg-white shadow-[0_2px_15px_0_rgba(0,0,0,0.07)] transition-transform duration-[225ms] ease-[cubic-bezier(0,0,0.2,1)]",
                    open ? "translate-x-0" : "translate-x-full",
                )}
            >
                {shown && (
                    <div className="flex h-full w-[420px] flex-col px-6 pb-6 pt-3">
                        {/* Tabs: one tab, pink text (secondary), blue indicator */}
                        <div className="mb-8 flex min-h-12 border-b border-solid border-b-[#eeeeee]">
                            <div
                                role="tab"
                                aria-selected="true"
                                className="relative inline-flex min-h-12 min-w-[72px] max-w-[360px] items-center justify-center px-4 py-3 text-[0.9rem] font-normal leading-[1.25] tracking-[0.02857em] text-[#e91e63]"
                            >
                                Inquiry Summary
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#03a9f4]" />
                            </div>
                        </div>

                        <div className="mb-6 min-w-[275px] overflow-hidden rounded-sm bg-white shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]">
                            <div className="h-full overflow-y-auto pb-6">
                                <Row>
                                    <Half>
                                        <Detail label="Inquirer Name">
                                            {leadName(shown)}
                                        </Detail>
                                    </Half>
                                    <Half>
                                        <Detail label="Date of Inquiry">
                                            {formatNumeric(shown.inquiryDate)}
                                        </Detail>
                                    </Half>
                                </Row>
                                <Divider />
                                <Row>
                                    <Half>
                                        <Detail label="Citizenship">
                                            {shown.citizenship}
                                        </Detail>
                                    </Half>
                                    <Half>
                                        <Detail label="Date of Birth">
                                            {formatNumeric(shown.birthdate)}
                                        </Detail>
                                    </Half>
                                </Row>
                                <Divider />
                                <Row>
                                    <Half>
                                        <Detail label="Email Address">
                                            {shown.email}
                                        </Detail>
                                    </Half>
                                    {shown.phone && (
                                        <Half>
                                            <Detail label="Phone Number">
                                                {shown.phone}
                                            </Detail>
                                        </Half>
                                    )}
                                </Row>
                                <Divider />
                                <Row>
                                    <Half>
                                        <Detail label="Program Name">
                                            {shown.programName}
                                        </Detail>
                                    </Half>
                                </Row>
                                <Divider />
                                <Row />
                                <Divider />
                                <Row>
                                    <Half>
                                        <label className="my-6 inline-flex cursor-default items-center align-middle">
                                            <span className="inline-flex p-[9px] text-black/[0.26]">
                                                {shown.isCurrentStudent ? (
                                                    <MdCheckBox className="size-6" />
                                                ) : (
                                                    <MdCheckBoxOutlineBlank className="size-6" />
                                                )}
                                            </span>
                                            <span className="text-[0.875rem] leading-normal text-black/[0.38]">
                                                Current Student
                                            </span>
                                        </label>
                                    </Half>
                                    {shown.schoolName && (
                                        <Half>
                                            <Detail label="School Name">
                                                {shown.schoolName}
                                            </Detail>
                                        </Half>
                                    )}
                                </Row>
                                {[
                                    {
                                        label: "How did you find your program?",
                                        value: shown.referralSource || "N/A",
                                    },
                                    { label: "Message", value: shown.message },
                                ].map(({ label, value }) => (
                                    <Fragment key={label}>
                                        <Divider />
                                        <Row>
                                            <div className="basis-full">
                                                <Detail label={label}>{value}</Detail>
                                            </div>
                                        </Row>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
};

export default LeadDrawer;
