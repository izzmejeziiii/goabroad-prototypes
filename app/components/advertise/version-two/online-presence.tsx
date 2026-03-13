import { BsPeople } from "react-icons/bs";
import { PiBriefcase, PiGraduationCap } from "react-icons/pi";
import InteractiveComparison from "./interactive-comparison";
import ListingGraphic from "./listing-graphic";

export default function OnlinePresence() {
    return (
        <section className="w-full h-full flex flex-col items-center justify-center gap-16">
            <div className="space-y-8 w-full">
                <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                    Online Presence That Drives Action
                </h2>
                <div className="space-y-6 w-full">
                    <div className="space-y-2">
                        <p className="text-slate-700">
                            GoAbroad visitors are planning life-changing
                            experiences, not just casually browsing. Visibility
                            on GoAbroad connects you directly with:
                        </p>
                    </div>
                    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(405px,1fr))] gap-8">
                        <div className="border border-gray-300 rounded-lg p-6 text-slate-700 w-full flex gap-4 hover:shadow-md items-start">
                            <div className="bg-primary-50 text-cobalt-500 rounded-md p-3">
                                <PiGraduationCap size={24} />
                            </div>
                            <p>
                                Students actively searching for programs abroad
                            </p>
                        </div>
                        <div className="border border-gray-300 rounded-lg p-6 text-slate-700 w-full flex gap-4 hover:shadow-md items-start">
                            <div className="bg-primary-50 text-cobalt-500 rounded-md p-3">
                                <PiBriefcase size={24} />
                            </div>
                            <p>
                                Professionals seeking internships, teaching, or
                                volunteer opportunities
                            </p>
                        </div>
                        <div className="border border-gray-300 rounded-lg p-6 text-slate-700 w-full flex gap-4 hover:shadow-md items-start">
                            <div className="bg-primary-50 text-cobalt-500 rounded-md p-3">
                                <BsPeople size={23} />
                            </div>
                            <p>
                                Advisors and institutions researching trusted
                                partners
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <InteractiveComparison />
            <ListingGraphic />
        </section>
    );
}
