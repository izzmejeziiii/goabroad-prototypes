"use client";

import clsx from "clsx";
import { useState } from "react";
import { MdCancel, MdClose, MdInfo, MdOutlineAttachFile } from "react-icons/md";
import { Button } from "../../mui";
import { DialogBox } from "../../results-table/primitives/DialogBox";
import { OutlinedTextField } from "../../results-table/primitives/Input";
import type { StaffRow } from "./constants";
import { BBCodeGuide, bbcodeToReact } from "./bbcode";

/* Copy of src/components/RemindClientDialog/RemindClientDialog.js: the
   single-invoice reminder. A Recipients box (MUI Autocomplete, multiple +
   freeSolo, outlined small) pre-filled with the billing contact, whose
   chips the theme's MuiChip override turns 0.7rem UPPERCASE and pink when
   the address is invalid; a Subject field in 1.25rem / 600; the "EMAIL
   TEMPLATE" textarea (12 rows) with the supported-tags info icon; and View
   Preview / Send Reminder / Cancel. The preview renders the BBCode and the
   PDF attachment link. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type RecipientOption = { id: number; email: string; name: string; type: string; is_billing: boolean; is_primary: boolean };

/** recipientUtils.buildRecipientState for the client's contacts. */
export const buildRecipientState = (
    contacts: { id: number; email: string; firstname: string; lastname: string; is_billing?: boolean; is_primary?: boolean }[],
) => {
    const recipientOptions: RecipientOption[] = contacts
        .filter((c) => c && c.email)
        .map((c) => ({
            id: c.id,
            email: c.email,
            name: [c.firstname, c.lastname].filter(Boolean).join(" ").trim(),
            type: c.is_billing ? "Billing" : c.is_primary ? "Primary" : "Secondary",
            is_billing: !!c.is_billing,
            is_primary: !!c.is_primary,
        }));
    const billing = recipientOptions.filter((o) => o.is_billing);
    const primary = recipientOptions.filter((o) => o.is_primary);
    return { recipientOptions, recipients: (billing.length ? billing : primary).map((o) => o.email) };
};

const TITLE = "m-0 text-[1.25rem] font-semibold leading-[1.5] tracking-[0.00938em] text-[#424242]";

const Recipients = ({
    options,
    value,
    onChange,
}: {
    options: RecipientOption[];
    value: string[];
    onChange: (emails: string[]) => void;
}) => {
    const [input, setInput] = useState("");
    const [focused, setFocused] = useState(false);
    const invalid = (email: string) => !EMAIL_RE.test((email || "").trim());
    const hasInvalid = value.some(invalid);
    const none = value.length === 0;
    const error = hasInvalid || none;
    const available = options.filter((o) => !value.includes(o.email));
    const shrink = focused || value.length > 0 || input !== "";

    const add = (emails: string[]) =>
        onChange(Array.from(new Set(emails.map((e) => e.trim()).filter((e) => e !== ""))));

    return (
        <div className="group/ac relative w-full">
            <div className="relative inline-flex w-full min-w-0 flex-col align-top">
                <label
                    className={clsx(
                        "pointer-events-none absolute left-0 top-0 z-[1] block origin-top-left whitespace-nowrap text-[1rem] leading-[1.4375em] tracking-[0.00938em] transition-transform duration-200",
                        shrink ? "translate-x-[14px] translate-y-[-9px] scale-75" : "translate-x-[14px] translate-y-[9px]",
                        error ? "text-[#d32f2f]" : focused ? "text-[#03a9f4]" : "text-[rgba(0,0,0,0.6)]",
                    )}
                >
                    Recipients
                </label>
                <div className="relative box-border flex max-h-[120px] cursor-text flex-wrap items-start overflow-y-auto rounded-[4px] py-[6px] pl-[6px] pr-[60px] text-[1rem] leading-[1.4375em] text-[rgba(0,0,0,0.87)]">
                    {value.map((email) => (
                        <span
                            key={email}
                            title={email}
                            className={clsx(
                                "m-[3px] inline-flex h-6 min-h-[25px] max-w-full items-center justify-center whitespace-nowrap rounded-2xl align-middle text-[0.7rem] uppercase",
                                invalid(email) ? "bg-[#e91e63] text-white" : "bg-[rgba(0,0,0,0.08)] text-[rgba(0,0,0,0.87)]",
                            )}
                        >
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap px-2">{email}</span>
                            <MdCancel
                                role="button"
                                aria-label="Delete"
                                onClick={() => onChange(value.filter((v) => v !== email))}
                                className={clsx(
                                    "-ml-1 mr-[5px] size-4 cursor-pointer",
                                    invalid(email) ? "text-[rgba(255,255,255,0.7)] hover:text-white" : "text-[rgba(0,0,0,0.26)] hover:text-[rgba(0,0,0,0.4)]",
                                )}
                            />
                        </span>
                    ))}
                    <input
                        value={input}
                        placeholder={shrink ? "Select a contact or type an email" : undefined}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setTimeout(() => setFocused(false), 150)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && input.trim()) {
                                e.preventDefault();
                                add([...value, input]);
                                setInput("");
                            } else if (e.key === "Backspace" && !input && value.length) {
                                onChange(value.slice(0, -1));
                            }
                        }}
                        className="m-0 box-content h-[1.4375em] min-w-[30px] flex-grow border-0 bg-transparent py-[2.5px] pl-2 pr-1 font-[inherit] text-current outline-0 placeholder:opacity-[0.42]"
                    />
                    {value.length > 0 && (
                        <button
                            type="button"
                            aria-label="Clear"
                            onClick={() => onChange([])}
                            className="invisible absolute right-[9px] top-[7px] inline-flex rounded-full p-1 text-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.04)] group-hover/ac:visible"
                        >
                            <MdClose className="size-5" />
                        </button>
                    )}
                    <fieldset
                        aria-hidden="true"
                        className={clsx(
                            "pointer-events-none absolute inset-x-0 bottom-0 top-[-5px] m-0 min-w-0 overflow-hidden rounded-[inherit] border border-solid px-2 py-0 text-left",
                            error ? "!border-[#d32f2f]" : focused ? "border-2 !border-[#03a9f4]" : "!border-[rgba(0,0,0,0.23)] group-hover/ac:!border-[rgba(0,0,0,0.87)]",
                            error && focused && "border-2",
                        )}
                    >
                        <legend className={clsx("invisible block h-[11px] overflow-hidden whitespace-nowrap p-0 text-[0.75em]", shrink ? "max-w-full" : "max-w-[0.01px]")}>
                            <span className="inline-block px-[5px] opacity-0">Recipients</span>
                        </legend>
                    </fieldset>
                </div>
                <p
                    className={clsx(
                        "mx-[14px] mb-0 mt-[3px] text-left text-[0.75rem] leading-[1.66] tracking-[0.03333em]",
                        error ? "text-[#d32f2f]" : "text-[rgba(0,0,0,0.6)]",
                    )}
                >
                    {hasInvalid
                        ? "Remove the highlighted invalid email address(es)."
                        : none
                          ? "Add at least one recipient to send the reminder."
                          : "Pre-filled with the client’s billing contact. Pick from the client’s contacts or type an email to add another recipient."}
                </p>
            </div>
            {focused && available.length > 0 && (
                <ul className="absolute inset-x-0 top-[calc(100%-22px)] z-[1300] m-0 max-h-[40vh] list-none overflow-auto rounded-[4px] bg-white py-2 shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]">
                    {available
                        .filter((o) => `${o.name} ${o.email}`.toLowerCase().includes(input.toLowerCase()))
                        .map((option) => (
                            <li
                                key={option.email}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    add([...value, option.email]);
                                    setInput("");
                                }}
                                className="flex min-h-12 cursor-pointer items-center px-4 py-[6px] hover:bg-[rgba(0,0,0,0.04)] sm:min-h-0"
                            >
                                <div className="flex flex-col">
                                    <span className="break-all text-sm text-gray-800">{option.name || option.email}</span>
                                    {option.name && (
                                        <span className="break-all text-xs text-gray-500">
                                            {option.email}
                                            {option.type ? ` · ${option.type}` : ""}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

const RemindClientDialog = ({
    open,
    message,
    subject,
    invoice,
    recipientOptions,
    recipients,
    onMessageChange,
    onSubjectChange,
    onRecipientsChange,
    onOk,
    onCancel,
}: {
    open: boolean;
    message: string;
    subject: string;
    invoice: StaffRow | null;
    recipientOptions: RecipientOption[];
    recipients: string[];
    onMessageChange: (value: string) => void;
    onSubjectChange: (value: string) => void;
    onRecipientsChange: (emails: string[]) => void;
    onOk: () => void;
    onCancel: () => void;
}) => {
    const [openPreview, setOpenPreview] = useState(false);
    const [openGuide, setOpenGuide] = useState(false);
    const invalid = recipients.some((e) => !EMAIL_RE.test((e || "").trim()));
    const pdfFileName = invoice?.pdf?.file_name || "";

    return (
        <>
            {/* maxWidth={false}; the backdrop doesn't close it, Escape cancels */}
            <DialogBox open={open} actions="" maxWidth={false} disableBackdropClick onClose={onCancel}>
                <div className="mb-4">
                    <Recipients options={recipientOptions} value={recipients} onChange={onRecipientsChange} />
                </div>
                <OutlinedTextField
                    fullWidth
                    value={subject}
                    onChange={(e) => onSubjectChange(e.target.value)}
                    label="Subject"
                    inputClassName="!text-[1.25rem] !font-semibold"
                />
                <hr className="m-0 h-0 border-0 border-t border-solid !border-[#e5e7eb] text-inherit" />
                <div className="mt-4 w-[750px] flex-auto overflow-y-auto p-0">
                    <div className="mb-2 flex items-center gap-1">
                        <label className="block font-bold uppercase text-gray-500">Email Template</label>
                        <span title="View supported tags" onClick={() => setOpenGuide(true)}>
                            <MdInfo className="size-5 cursor-pointer text-gray-500 hover:text-gray-700" />
                        </span>
                    </div>
                    <OutlinedTextField
                        fullWidth
                        multiline
                        minRows={12}
                        value={message}
                        onChange={(e) => onMessageChange(e.target.value)}
                        className="mt-2"
                    />
                </div>
                <div className="flex flex-none items-center justify-end gap-2 p-2">
                    <Button data-cy="dialog-box-primary-cta" onClick={() => setOpenPreview(true)} color="primary" variant="contained">
                        View Preview
                    </Button>
                    <Button
                        data-cy="dialog-box-primary-cta"
                        onClick={onOk}
                        color="primary"
                        variant="contained"
                        disabled={invalid || recipients.length === 0}
                    >
                        Send Reminder
                    </Button>
                    <Button data-cy="dialog-box-cancel" onClick={onCancel} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </div>
            </DialogBox>
            <DialogBox
                open={openPreview}
                maxWidth={false}
                actions="Cancel"
                stringOverride={{ secondaryAction: "Close" }}
                onCancel={() => setOpenPreview(false)}
                onClose={() => setOpenPreview(false)}
            >
                <p className={TITLE}>{subject}</p>
                <hr className="m-0 h-0 border-0 border-t border-solid !border-[#e5e7eb] text-inherit" />
                <div className="mt-4 w-[750px] flex-auto overflow-y-auto p-0">
                    <div>{bbcodeToReact(message)}</div>
                    {pdfFileName && (
                        <>
                            <hr className="mb-4 h-0 border-0 border-t border-solid !border-[#e5e7eb]" />
                            <p className="m-0 text-sm leading-[1.5] text-[#757575]">Attachment:</p>
                            <MdOutlineAttachFile className="mr-1 inline text-[14px] text-[#757575]" />
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="text-sm !text-[#1FB3D4] !no-underline hover:!underline"
                            >
                                {pdfFileName}
                            </a>
                        </>
                    )}
                </div>
            </DialogBox>
            <DialogBox
                open={openGuide}
                maxWidth={false}
                actions="Ok"
                stringOverride={{ primaryAction: "Close" }}
                onClose={() => setOpenGuide(false)}
            >
                <p className={TITLE}>Supported Tags</p>
                <hr className="m-0 h-0 border-0 border-t border-solid !border-[#e5e7eb] text-inherit" />
                <div className="mt-4 w-[750px] flex-auto overflow-y-auto p-0">
                    <BBCodeGuide />
                </div>
            </DialogBox>
        </>
    );
};

export default RemindClientDialog;
