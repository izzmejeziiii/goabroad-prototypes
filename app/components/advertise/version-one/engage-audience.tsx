import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function EngageAudience() {
    return (
        <section className="w-full">
            <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                Reach a Global, Engaged Audience
            </h2>
            <p className="text-slate-700 mb-4">
                GoAbroad attracts a worldwide audience of motivated
                international learners and decision-makers, which means we
                deliver meaningful reach beyond what generic platforms can
                offer.
            </p>
            <p className="text-slate-700 mb-4">Our reach includes:</p>
            <ul className="text-slate-700 mb-4 space-y-4 ml-4">
                <li className="flex gap-2 items-center">
                    <IoIosCheckmarkCircleOutline
                        size={20}
                        className="text-cobalt-500"
                    />
                    Millions of annual users researching global opportunities
                </li>
                <li className="flex gap-2 items-center">
                    <IoIosCheckmarkCircleOutline
                        size={20}
                        className="text-cobalt-500"
                    />
                    A highly engaged audience with strong conversion intent
                </li>
                <li className="flex gap-2 items-center">
                    <IoIosCheckmarkCircleOutline
                        size={20}
                        className="text-cobalt-500"
                    />
                    Visitors from 190+ countries
                </li>
            </ul>
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 mt-8">
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        12 million+
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Monthly Impressions
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        15,000+
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Visitors A Day
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        6 million
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Visitors Every Year
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        90,000+
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Reviews
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        29
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Years In Service
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        5,019
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Travel Articles
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        10,000+
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Verified Programs
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        120,000+
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Social Media Followers
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        320,000+
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        MyGoAbroad Community Members
                    </span>
                </div>
                <div className="border border-gray-200 rounded-md flex flex-col items-center gap-1 justify-center p-6">
                    <span className="font-bold text-[28px] lg:text-[32px] text-sun-500 text-center">
                        80,000+
                    </span>
                    <span className="text-slate-800 font-semibold text-sm text-center">
                        Newsletter Subscribers
                    </span>
                </div>
            </div>
        </section>
    );
}
