import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import InteractiveComparison from "./interactive-comparison";
import ListingGraphic from "./listing-graphic";

export default function OnlinePresence() {
    return (
        <section className="w-full flex flex-col items-center gap-8">
            <div className="space-y-4 w-full">
                <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                    Online Presence That Drives Action
                </h2>
                <p className="text-slate-700 mb-4">
                    GoAbroad visitors are planning life-changing experiences,
                    not just casually browsing.
                </p>
                <p className="text-slate-700 mb-4">
                    Visibility on GoAbroad connects you directly with:
                </p>
                <ul className="space-y-4 mb-4 ml-4">
                    <li className="flex gap-2 items-start">
                        <IoIosCheckmarkCircleOutline
                            size={20}
                            className="text-cobalt-500 shrink-0 mt-1"
                        />
                        <p>Students actively searching for programs abroad</p>
                    </li>
                    <li className="flex gap-2 items-start">
                        <IoIosCheckmarkCircleOutline
                            size={20}
                            className="text-cobalt-500 shrink-0 mt-1"
                        />
                        <p>
                            Professionals seeking internships, teaching, or
                            volunteer opportunities
                        </p>
                    </li>
                    <li className="flex gap-2 items-start">
                        <IoIosCheckmarkCircleOutline
                            size={20}
                            className="text-cobalt-500 shrink-0 mt-1"
                        />
                        <p>
                            Advisors and institutions researching trusted
                            partners
                        </p>
                    </li>
                </ul>
            </div>
            <InteractiveComparison />
            <ListingGraphic />
        </section>
    );
}
