import Link from "next/link";
import type { ReactNode } from "react";
import { MdAdd, MdEdit, MdQuestionAnswer } from "react-icons/md";
import { BASE_PATH } from "../data";
import { FOCUS_RING, SectionTitle } from "../ui";

/* Copy of Dashboard/QuickActions.js on PR 784. "Create a Program" opens the
   create-program flow there; here it goes to the Programs placeholder.

   Styled as goabroad.com's quick-link card (slate-200 border that turns
   cobalt on hover) with its slate-50 icon tile, which fills cobalt. */

const CARD_CLASSES = `group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left no-underline transition-colors hover:border-cobalt-500 ${FOCUS_RING}`;

const ACTIONS: {
    key: string;
    icon: ReactNode;
    title: string;
    description: string;
    href: string;
}[] = [
    {
        key: "create-program",
        icon: <MdAdd className="size-6" />,
        title: "Create a Program",
        description: "Add a new program listing",
        href: `${BASE_PATH}/programs`,
    },
    {
        key: "quick-action-view-leads",
        icon: <MdQuestionAnswer className="size-6" />,
        title: "View Leads",
        description: "See your newest leads",
        href: `${BASE_PATH}/leads`,
    },
    {
        key: "quick-action-edit-profile",
        icon: <MdEdit className="size-6" />,
        title: "Edit Profile",
        description: "Update your description, FAQs and social links",
        href: `${BASE_PATH}/profile`,
    },
];

const QuickActions = () => (
    <section aria-labelledby="quick-actions-title">
        <SectionTitle id="quick-actions-title">Quick Actions</SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
            {ACTIONS.map(({ key, href, icon, title, description }) => (
                <Link key={key} href={href} className={CARD_CLASSES}>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-cobalt-500 transition-colors group-hover:bg-cobalt-500 group-hover:text-white">
                        {icon}
                    </span>
                    <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-neutral-800">
                            {title}
                        </span>
                        <span className="text-sm leading-snug text-slate-500">
                            {description}
                        </span>
                    </span>
                </Link>
            ))}
        </div>
    </section>
);

export default QuickActions;
