import Link from "next/link";
import { BASE_PATH, checklist, client } from "../data";
import type { Checklist } from "../types";
import { DashboardCard, TEXT_LINK } from "../ui";

/* Copy of Dashboard/ProfileCompletion.js on PR 784: the completion % in the
   header, a progress bar, and only the missing checklist items, each with an
   Add action. */

const PROFILE = `${BASE_PATH}/profile`;

const CHECKLIST_ITEMS: {
    key: string;
    label: string;
    checks?: (keyof Checklist)[];
}[] = [
    { key: "logo", label: "Logo" },
    { key: "url", label: "Website URL" },
    { key: "address", label: "Physical address" },
    { key: "billing", label: "Billing address" },
    { key: "description", label: "Company description" },
    { key: "socialmedia", label: "Social media links" },
    { key: "recognition", label: "Recognitions" },
    { key: "listing", label: "Program listing" },
    { key: "business", label: "Business registration" },
    {
        key: "reviews-interviews",
        label: "Reviews and interviews verification",
        checks: ["reviews", "interviews"],
    },
    { key: "inquiry", label: "Inquiry preferences" },
];

/* Where each Add goes. In the real app Logo opens the sidebar uploader and
   the verification items open the verification drawer; the prototype has
   neither, so those Adds are inert buttons. */
const ACTIONS: Record<string, { href?: string }> = {
    logo: {},
    url: { href: `${PROFILE}#website` },
    address: { href: `${PROFILE}#address` },
    billing: { href: `${PROFILE}#billing-address` },
    description: { href: `${PROFILE}#description` },
    socialmedia: { href: `${PROFILE}#social-media` },
    recognition: { href: `${PROFILE}#awards` },
    listing: { href: `${BASE_PATH}/programs` },
    business: {},
    "reviews-interviews": {},
    inquiry: { href: `${BASE_PATH}/users` },
};

const ProfileCompletion = ({ className }: { className?: string }) => {
    const { accountProgress } = client;
    const missing = CHECKLIST_ITEMS.filter(({ key, checks }) =>
        (checks ?? [key as keyof Checklist]).some(
            (check) => checklist[check] === false,
        ),
    );

    return (
        <DashboardCard
            title="Profile"
            action={
                <span className="text-base font-bold text-cobalt-500">
                    {accountProgress}%
                </span>
            }
            className={className}
        >
            <div className="flex flex-col gap-3 p-5">
                <div
                    className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label="Profile completion"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={accountProgress}
                >
                    <div
                        className="h-full rounded-full bg-cobalt-500"
                        style={{ width: `${accountProgress}%` }}
                    />
                </div>
                {missing.length === 0 ? (
                    <p className="text-sm text-slate-600">
                        Your profile is complete.
                    </p>
                ) : (
                    <>
                        <p className="text-sm text-slate-500">
                            Finish these to reach 100%:
                        </p>
                        <ul className="flex flex-col gap-2.5">
                            {missing.map(({ key, label }) => {
                                const { href } = ACTIONS[key] ?? {};
                                return (
                                    <li
                                        key={key}
                                        className="flex items-center justify-between gap-3 text-sm text-slate-700"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span
                                                className="size-3.5 shrink-0 rounded-full border-2 border-slate-300"
                                                aria-hidden="true"
                                            />
                                            {label}
                                        </span>
                                        {href ? (
                                            <Link
                                                href={href}
                                                className={TEXT_LINK}
                                                aria-label={`Add ${label}`}
                                            >
                                                Add
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                className={TEXT_LINK}
                                                aria-label={`Add ${label}`}
                                            >
                                                Add
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </DashboardCard>
    );
};

export default ProfileCompletion;
